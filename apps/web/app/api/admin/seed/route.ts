import { NextResponse, type NextRequest } from "next/server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/lib/db/client";
import { hashPassword } from "@/lib/crypto";
import { env } from "@/lib/env";

export const runtime = "nodejs";

/**
 * 첫 어드민 계정 1회 생성용 부트스트랩 엔드포인트.
 *
 * 동작 조건 (모두 만족해야 200):
 *   1) ADMIN_SEED_TOKEN 환경변수가 설정돼 있음
 *   2) 요청 헤더 `x-seed-token` 이 ADMIN_SEED_TOKEN 과 일치
 *   3) admin_users 테이블이 비어있음 (첫 어드민이 없을 때만 동작 — 자기-잠금)
 *
 * 이미 어드민이 존재하면 409 로 거절. 토큰이 노출되어도 추가 어드민 생성 불가.
 *
 * 사용 예 (배포 후 1회):
 *   curl -X POST https://baeksehospital.kr/api/admin/seed \
 *     -H 'Content-Type: application/json' \
 *     -H 'x-seed-token: <ADMIN_SEED_TOKEN 값>' \
 *     -d '{"email":"ops@baeksehospital.kr","password":"강한비밀번호12자이상","displayName":"운영팀"}'
 */

const Body = z.object({
  email: z.string().email().max(255),
  password: z.string().min(12).max(200),
  displayName: z.string().trim().min(1).max(60).optional(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!env.ADMIN_SEED_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_SEED_TOKEN 미설정. Vercel 환경변수에 추가 후 재배포하세요." },
      { status: 503 }
    );
  }

  const provided = req.headers.get("x-seed-token");
  if (!provided || provided !== env.ADMIN_SEED_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // admin_users 가 이미 있으면 더 이상 동작 X
  const existing = await db()
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.adminUsers);
  if ((existing[0]?.n ?? 0) > 0) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "어드민 계정이 이미 존재합니다. 추가 어드민은 운영중인 어드민 콘솔(예정) 또는 SQL 편집기에서 생성하세요.",
      },
      { status: 409 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청 형식입니다." }, { status: 400 });
  }
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "email / password(≥12자) 가 필요합니다.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }
  const { email, password, displayName } = parsed.data;

  const passwordHash = await hashPassword(password);
  const inserted = await db()
    .insert(schema.adminUsers)
    .values({
      email: email.toLowerCase().trim(),
      passwordHash,
      displayName: displayName ?? "운영팀",
    })
    .returning({ id: schema.adminUsers.id, email: schema.adminUsers.email });

  return NextResponse.json({
    ok: true,
    admin: inserted[0],
    message: "첫 어드민 생성 완료. 이 엔드포인트는 자동으로 잠겼습니다 (추가 어드민 생성 불가).",
  });
}

/** 토큰 노출/우회 시도 방지 — GET 등 다른 메서드는 명시적으로 405. */
export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
