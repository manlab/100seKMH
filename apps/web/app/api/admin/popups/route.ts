import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { db, schema } from "@/lib/db/client";
import { HomePopupFormSchema } from "@/lib/popup-schema";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const runtime = "nodejs";

function toNullable(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function toDateOrNull(value: string) {
  return value ? new Date(value) : null;
}

/** POST /api/admin/popups — 새 메인 팝업 등록. */
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

  const parsed = HomePopupFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "입력값을 확인해 주세요.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const inserted = await db()
    .insert(schema.homePopups)
    .values({
      title: data.title,
      content: data.content,
      imageUrl: toNullable(data.imageUrl),
      linkLabel: toNullable(data.linkLabel),
      linkUrl: toNullable(data.linkUrl),
      isPublished: data.isPublished,
      sortOrder: data.sortOrder,
      startsAt: toDateOrNull(data.startsAt),
      endsAt: toDateOrNull(data.endsAt),
      authorId: admin.id,
      authorName: admin.displayName?.trim() || "운영팀",
    })
    .returning({ id: schema.homePopups.id });

  return NextResponse.json({ ok: true, id: inserted[0]?.id });
}
