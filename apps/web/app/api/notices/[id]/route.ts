import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";

export const runtime = "nodejs";

/**
 * GET /api/notices/:id — 상세 + 조회수 +1.
 * 게시 안 된 공지는 404.
 */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 조회수 증가는 best-effort. 실패해도 본문 반환.
  await db()
    .update(schema.notices)
    .set({ viewCount: sql`${schema.notices.viewCount} + 1` })
    .where(and(eq(schema.notices.id, params.id), eq(schema.notices.isPublished, true)));

  const rows = await db()
    .select()
    .from(schema.notices)
    .where(and(eq(schema.notices.id, params.id), eq(schema.notices.isPublished, true)))
    .limit(1);
  const n = rows[0];
  if (!n) {
    return NextResponse.json({ ok: false, error: "공지를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    notice: {
      id: n.id,
      title: n.title,
      content: n.content,
      category: n.category,
      isPinned: n.isPinned,
      viewCount: n.viewCount,
      authorName: n.authorName,
      publishedAt: n.publishedAt.toISOString(),
    },
  });
}
