import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { db, schema } from "@/lib/db/client";
import { NoticeFormSchema } from "@/lib/notice-schema";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const runtime = "nodejs";

/** POST /api/admin/notices — 새 공지 등록. */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const admin = await verifySession(token);
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청 형식입니다." }, { status: 400 });
  }
  const parsed = NoticeFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "입력값을 확인해 주세요.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;
  const safeAuthorName = admin.displayName?.trim() || "운영팀";

  const inserted = await db()
    .insert(schema.notices)
    .values({
      title: data.title,
      content: data.content,
      category: data.category,
      isPinned: data.isPinned,
      isPublished: data.isPublished,
      authorId: admin.id,
      authorName: safeAuthorName,
    })
    .returning({ id: schema.notices.id });

  return NextResponse.json({ ok: true, id: inserted[0]?.id });
}
