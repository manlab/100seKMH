import * as crypto from "node:crypto";
import { eq, lt, and } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import { db, schema } from "./db/client";
import type { AdminUser } from "./db/schema";
import { verifyPassword } from "./crypto";
import { SESSION_COOKIE } from "./auth-constants";

export { SESSION_COOKIE };

/**
 * 타이밍 공격 방어용 bcrypt 해시 — 존재하지 않는 어드민 이메일 로그인 시도에서
 * 실제 비밀번호 검증과 동일한 cost(12) 의 bcrypt 비교를 수행하기 위해 사용한다.
 * 모듈 첫 로드 시 한 번만 계산되며 결과는 캐시.
 */
let _timingPadHash: string | null = null;
async function getTimingPadHash(): Promise<string> {
  if (!_timingPadHash) {
    _timingPadHash = await bcrypt.hash("__timing-pad__", 12);
  }
  return _timingPadHash;
}

/**
 * 어드민 세션 — 쿠키에 plaintext token, DB 에 token 의 SHA-256 hash 저장.
 *
 *  생성 흐름:
 *   1) loginAdmin(email, password) → 비밀번호 검증
 *   2) createSession(adminId)      → 토큰 생성 + DB 에 hash 저장 + 토큰 반환
 *   3) HTTP layer 에서 쿠키로 토큰 set
 *
 *  검증 흐름:
 *   1) 쿠키에서 토큰 추출
 *   2) verifySession(token)        → hash 매칭 + 만료 체크 → AdminUser 반환
 *
 * 토큰은 32 bytes (256 bit) 임의값. HMAC 서명은 불필요 — DB 에 hash 저장으로 충분.
 */

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8시간

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** email + plain password → AdminUser. 실패 시 null. */
export async function loginAdmin(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const rows = await db()
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, email.toLowerCase().trim()))
    .limit(1);
  const admin = rows[0];
  if (!admin) {
    // 타이밍 공격 방어 — 존재하지 않는 계정도 동일 cost(12) 의 bcrypt 비교를 수행.
    // 잘못된 형식의 hash 를 넣으면 bcryptjs 가 즉시 false 를 리턴해 패딩이 깨진다.
    await verifyPassword(password, await getTimingPadHash());
    return null;
  }
  const ok = await verifyPassword(password, admin.passwordHash);
  if (!ok) return null;

  await db()
    .update(schema.adminUsers)
    .set({ lastLoginAt: new Date() })
    .where(eq(schema.adminUsers.id, admin.id));

  return admin;
}

export type CreatedSession = {
  token: string;
  expiresAt: Date;
};

/** 새 세션 생성 — 토큰 plaintext 반환 (호출 측에서 쿠키 설정). */
export async function createSession(adminId: string): Promise<CreatedSession> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db().insert(schema.adminSessions).values({
    tokenHash: hashToken(token),
    adminId,
    expiresAt,
  });

  return { token, expiresAt };
}

/** 토큰 검증 → AdminUser. 실패/만료 시 null. */
export async function verifySession(token: string | undefined): Promise<AdminUser | null> {
  if (!token) return null;
  const tokenHash = hashToken(token);

  const rows = await db()
    .select({
      session: schema.adminSessions,
      admin: schema.adminUsers,
    })
    .from(schema.adminSessions)
    .innerJoin(schema.adminUsers, eq(schema.adminSessions.adminId, schema.adminUsers.id))
    .where(eq(schema.adminSessions.tokenHash, tokenHash))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (row.session.expiresAt.getTime() < Date.now()) {
    // 만료된 세션은 즉시 정리
    await db()
      .delete(schema.adminSessions)
      .where(eq(schema.adminSessions.tokenHash, tokenHash));
    return null;
  }
  return row.admin;
}

/** 로그아웃 — 토큰의 세션 row 제거. */
export async function destroySession(token: string | undefined): Promise<void> {
  if (!token) return;
  await db()
    .delete(schema.adminSessions)
    .where(eq(schema.adminSessions.tokenHash, hashToken(token)));
}

/** 만료된 세션 일괄 정리 — admin login 시점이나 cron 에서 호출. */
export async function gcExpiredSessions(): Promise<void> {
  await db()
    .delete(schema.adminSessions)
    .where(lt(schema.adminSessions.expiresAt, new Date()));
}

/** 동일 admin 의 다른 모든 세션 종료 — 비번 변경 / 의심 활동 시. */
export async function destroyAllSessionsFor(adminId: string): Promise<void> {
  await db()
    .delete(schema.adminSessions)
    .where(and(eq(schema.adminSessions.adminId, adminId)));
}
