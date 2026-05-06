import { NextResponse, type NextRequest } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { NOTICE_CATEGORIES, type NoticeCategory } from "@/lib/db/schema";
import { parsePage } from "@/lib/pagination";

export const runtime = "nodejs";

/**
 * GET /api/notices?category=<진료안내|...>&page=<n>
 *
 * 정렬: 고정 공지(is_pinned) → 최신 순.
 * 게시 안 된 글(is_published=false)은 응답에 포함되지 않는다.
 */

const PAGE_SIZE = 10;

function parseCategory(s: string | null): NoticeCategory | undefined {
  if (!s) return undefined;
  return (NOTICE_CATEGORIES as readonly string[]).includes(s)
    ? (s as NoticeCategory)
    : undefined;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const page = parsePage(searchParams.get("page"));
  const category = parseCategory(searchParams.get("category"));
  const offset = (page - 1) * PAGE_SIZE;

  const where = category
    ? and(eq(schema.notices.isPublished, true), eq(schema.notices.category, category))
    : eq(schema.notices.isPublished, true);

  const totalRows = await db()
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.notices)
    .where(where);
  const total = totalRows[0]?.n ?? 0;

  const rows = await db()
    .select({
      id: schema.notices.id,
      title: schema.notices.title,
      category: schema.notices.category,
      isPinned: schema.notices.isPinned,
      viewCount: schema.notices.viewCount,
      publishedAt: schema.notices.publishedAt,
    })
    .from(schema.notices)
    .where(where)
    .orderBy(desc(schema.notices.isPinned), desc(schema.notices.publishedAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return NextResponse.json({
    ok: true,
    items: rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category as NoticeCategory,
      isPinned: r.isPinned,
      viewCount: r.viewCount,
      date: r.publishedAt.toISOString().slice(0, 10),
    })),
    page,
    pageSize: PAGE_SIZE,
    total,
  });
}
