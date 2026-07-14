import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { HomePopupFormSchema } from "@/lib/popup-schema";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const runtime = "nodejs";

async function requireAdmin() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return await verifySession(token);
}

function badId() {
  return NextResponse.json(
    { ok: false, error: "잘못된 요청입니다." },
    { status: 400 },
  );
}

function toNullable(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function toDateOrNull(value: string) {
  return value ? new Date(value) : null;
}

/** PUT /api/admin/popups/:id — 메인 팝업 수정. */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const admin = await requireAdmin();
  if (!admin)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) return badId();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "잘못된 요청 형식입니다." },
      { status: 400 },
    );
  }

  const parsed = HomePopupFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "입력값을 확인해 주세요.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const result = await db()
    .update(schema.homePopups)
    .set({
      displayType: data.displayType,
      title: data.title,
      content: data.content,
      imageUrl: toNullable(data.imageUrl),
      linkLabel: toNullable(data.linkLabel),
      linkUrl: toNullable(data.linkUrl),
      isPublished: data.isPublished,
      sortOrder: data.sortOrder,
      startsAt: toDateOrNull(data.startsAt),
      endsAt: toDateOrNull(data.endsAt),
      updatedAt: new Date(),
    })
    .where(eq(schema.homePopups.id, params.id))
    .returning({ id: schema.homePopups.id });

  if (!result[0]) {
    return NextResponse.json(
      { ok: false, error: "팝업을 찾을 수 없습니다." },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true });
}

/** DELETE /api/admin/popups/:id — 메인 팝업 삭제. */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const admin = await requireAdmin();
  if (!admin)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) return badId();

  const deleted = await db()
    .delete(schema.homePopups)
    .where(eq(schema.homePopups.id, params.id))
    .returning({ id: schema.homePopups.id });

  if (!deleted[0]) {
    return NextResponse.json(
      { ok: false, error: "팝업을 찾을 수 없습니다." },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true });
}
