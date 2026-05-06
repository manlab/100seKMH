import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/lib/db/client";
import { decryptField, verifyPassword } from "@/lib/crypto";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const VerifyBody = z.object({
  password: z.string().min(1).max(100),
});

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "anonymous";
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = params.id;
  // UUID 형식 가벼운 검증 — 잘못된 ID 는 즉시 거부
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  // Rate limit: 같은 IP 가 같은 글에 대해 시도하는 빈도 제한
  const rl = await rateLimit(`verify:${clientIp(req)}:${id}`, 5);
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `시도가 너무 잦습니다. ${rl.retryAfterSec ?? 60}초 후 다시 시도해 주세요.`,
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청 형식입니다." }, { status: 400 });
  }
  const parsed = VerifyBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "비밀번호를 입력해 주세요." }, { status: 400 });
  }

  const rows = await db()
    .select()
    .from(schema.counsels)
    .where(eq(schema.counsels.id, id))
    .limit(1);
  const counsel = rows[0];
  if (!counsel) {
    return NextResponse.json({ ok: false, error: "글을 찾을 수 없습니다." }, { status: 404 });
  }

  const ok = await verifyPassword(parsed.data.password, counsel.passwordHash);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "비밀번호가 일치하지 않습니다." },
      { status: 401 }
    );
  }

  // 검증 성공 — 본문 / 답변 복호화해서 반환
  let content: string;
  let reply: string | null = null;
  try {
    content = decryptField(counsel.contentEncrypted, "content", counsel.id);
    if (counsel.replyEncrypted) {
      reply = decryptField(counsel.replyEncrypted, "reply", counsel.id);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[counsel verify] decrypt failed", e);
    return NextResponse.json(
      { ok: false, error: "본문 복호화 실패. 운영팀에 문의해 주세요." },
      { status: 500 }
    );
  }

  // 어드민 식별정보(이메일) 가 환자에게 새지 않도록 별도 필드로 분리.
  // reply route 에서 displayName 만 저장하지만, 과거 데이터에 이메일이
  // 들어 있을 가능성을 감안해 응답 시 한 번 더 검증.
  const repliedByDisplay =
    counsel.repliedBy && !counsel.repliedBy.includes("@") ? counsel.repliedBy : "운영팀";

  return NextResponse.json({
    ok: true,
    counsel: {
      id: counsel.id,
      title: counsel.title,
      content,
      isPrivate: counsel.isPrivate,
      createdAt: counsel.createdAt.toISOString(),
      reply,
      repliedAt: counsel.repliedAt?.toISOString() ?? null,
      repliedBy: counsel.repliedAt ? repliedByDisplay : null,
    },
  });
}
