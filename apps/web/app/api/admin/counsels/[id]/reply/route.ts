import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/lib/db/client";
import { encryptField } from "@/lib/crypto";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const runtime = "nodejs";

const Body = z.object({
  reply: z.string().trim().min(5).max(5000),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  // 미들웨어가 쿠키 존재만 검증 — 라우트에서 진짜 검증
  const token = cookies().get(SESSION_COOKIE)?.value;
  const admin = await verifySession(token);
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!/^[0-9a-f-]{36}$/i.test(params.id)) {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
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
      { ok: false, error: "답변은 5자 이상 5000자 이하여야 합니다." },
      { status: 400 }
    );
  }

  // 어드민 이메일은 환자에게 노출 금지 (어드민/사용자 경계 보호).
  // 별도 displayName 이 없으면 generic '운영팀' 으로 표기.
  const safeDisplayName = admin.displayName?.trim() || "운영팀";

  const result = await db()
    .update(schema.counsels)
    .set({
      replyEncrypted: encryptField(parsed.data.reply, "reply", params.id),
      repliedAt: new Date(),
      repliedBy: safeDisplayName,
      updatedAt: new Date(),
    })
    .where(eq(schema.counsels.id, params.id))
    .returning({ id: schema.counsels.id });

  if (!result[0]) {
    return NextResponse.json({ ok: false, error: "글을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
