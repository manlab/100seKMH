import { NextResponse, type NextRequest } from "next/server";
import { CounselFormSchema } from "@/lib/counsel-schema";
import { sendCounselEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import * as crypto from "node:crypto";
import { db, schema } from "@/lib/db/client";
import { encryptField, hashPassword } from "@/lib/crypto";

/** Resend SDK + bcrypt + AES 모두 Node 런타임 (edge 미지원). */
export const runtime = "nodejs";

type CounselApiResponse =
  | { ok: true; id?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "anonymous";
}

export async function POST(req: NextRequest): Promise<NextResponse<CounselApiResponse>> {
  // 1) Rate limit
  const ip = clientIp(req);
  const rl = await rateLimit(`counsel:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `요청이 너무 잦습니다. ${rl.retryAfterSec ?? 60}초 후 다시 시도해 주세요.`,
      },
      {
        status: 429,
        headers: rl.retryAfterSec ? { "Retry-After": String(rl.retryAfterSec) } : {},
      }
    );
  }

  // 2) Body 파싱
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  // 3) Honeypot — 봇은 silent success
  if (body && typeof body === "object" && "website" in body) {
    const hp = (body as { website?: unknown }).website;
    if (typeof hp === "string" && hp.length > 0) {
      // eslint-disable-next-line no-console
      console.warn("[counsel] honeypot triggered from", ip);
      return NextResponse.json({ ok: true });
    }
  }

  // 4) Zod 재검증
  const parsed = CounselFormSchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return NextResponse.json(
      {
        ok: false,
        error: "입력값을 확인해 주세요.",
        fieldErrors: flat.fieldErrors as Record<string, string[]>,
      },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // 5) DB 영속화 — 암호화 후 저장 (KISA 안전성 확보조치 §29).
  // 식별정보(이름/전화) + 민감정보(본문) 모두 컬럼 암호화. AAD 에 row id + 필드명을
  // 묶어 다른 행으로 ciphertext 가 transplant 되지 못하게 한다.
  const id = crypto.randomUUID();
  try {
    await db()
      .insert(schema.counsels)
      .values({
        id,
        nameEncrypted: encryptField(data.name, "name", id),
        phoneEncrypted: encryptField(data.phone, "phone", id),
        passwordHash: await hashPassword(data.password),
        title: data.title,
        contentEncrypted: encryptField(data.content, "content", id),
        isPrivate: data.isPrivate,
      });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[counsel] DB insert failed", e);
    return NextResponse.json(
      { ok: false, error: "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }

  // 6) 운영팀 이메일 알림 — 실패해도 사용자에게는 성공 응답.
  // 글은 DB 에 들어갔고, 운영팀이 어드민 콘솔에서 확인 가능.
  const emailResult = await sendCounselEmail(data);
  if (!emailResult.ok) {
    // eslint-disable-next-line no-console
    console.error("[counsel] email notify failed (글은 저장됨)", emailResult.error);
  }

  return NextResponse.json({ ok: true, id });
}

/**
 * GET /api/counsels — 공개 목록 (페이징).
 * 비공개 글은 제목·작성자가 마스킹된 상태로 반환. 본문은 어떤 경우에도 미반환.
 */
type CounselListItem = {
  id: string;
  no: number;
  status: "답변완료" | "답변대기";
  title: string; // 비공개면 "비공개 글입니다"
  authorMasked: string; // 김O준
  date: string; // YYYY-MM-DD
  isPrivate: boolean;
};

const PAGE_SIZE = 10;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const offset = (page - 1) * PAGE_SIZE;

  const { desc, sql } = await import("drizzle-orm");
  const { maskName, decryptField } = await import("@/lib/crypto");

  const total = await db()
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.counsels);
  const totalCount = total[0]?.n ?? 0;

  const rows = await db()
    .select({
      id: schema.counsels.id,
      nameEncrypted: schema.counsels.nameEncrypted,
      title: schema.counsels.title,
      isPrivate: schema.counsels.isPrivate,
      createdAt: schema.counsels.createdAt,
      repliedAt: schema.counsels.repliedAt,
    })
    .from(schema.counsels)
    .orderBy(desc(schema.counsels.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  const items: CounselListItem[] = rows.map((r, i) => {
    let authorMasked: string;
    try {
      authorMasked = maskName(decryptField(r.nameEncrypted, "name", r.id));
    } catch {
      authorMasked = "***";
    }
    return {
      id: r.id,
      no: totalCount - offset - i,
      status: r.repliedAt ? "답변완료" : "답변대기",
      title: r.isPrivate ? "비공개 글입니다" : r.title,
      authorMasked,
      date: r.createdAt.toISOString().slice(0, 10),
      isPrivate: r.isPrivate,
    };
  });

  return NextResponse.json({
    ok: true,
    items,
    page,
    pageSize: PAGE_SIZE,
    total: totalCount,
  });
}
