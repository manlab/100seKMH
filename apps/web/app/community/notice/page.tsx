import type { Metadata } from "next";
import Link from "next/link";
import { and, desc, eq, sql } from "drizzle-orm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { db, schema } from "@/lib/db/client";
import { env } from "@/lib/env";
import { NOTICE_CATEGORIES, type NoticeCategory } from "@/lib/db/schema";
import { parsePage } from "@/lib/pagination";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMeta({
  title: "공지사항",
  description:
    "백세한방병원 공지사항 — 진료안내, 이벤트, 휴진, 시설 안내까지 병원의 새로운 소식을 확인하실 수 있습니다.",
  path: "/community/notice",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

const CATEGORY_FILTERS = [
  { label: "전체", value: "all" },
  ...NOTICE_CATEGORIES.map((c) => ({ label: c, value: c })),
] as const;

const CATEGORY_BADGE: Record<NoticeCategory, string> = {
  진료안내: "bg-primary-50 text-primary-700",
  이벤트: "bg-accent-50 text-accent-700",
  휴진: "bg-neutral-100 text-neutral-700",
  시설: "bg-emerald-50 text-emerald-700",
};

const PAGE_SIZE = 10;

type Props = {
  searchParams: { category?: string; page?: string };
};

type NoticeRow = {
  id: string;
  no: number;
  category: NoticeCategory;
  title: string;
  date: string;
  views: number;
  pinned: boolean;
};

function parseCategory(s: string | undefined): NoticeCategory | undefined {
  if (!s) return undefined;
  return (NOTICE_CATEGORIES as readonly string[]).includes(s)
    ? (s as NoticeCategory)
    : undefined;
}

async function fetchNotices(
  category: NoticeCategory | undefined,
  page: number
): Promise<{ rows: NoticeRow[]; total: number }> {
  if (!env.POSTGRES_URL) return { rows: [], total: 0 };
  try {
    const where = category
      ? and(eq(schema.notices.isPublished, true), eq(schema.notices.category, category))
      : eq(schema.notices.isPublished, true);

    const totalResult = await db()
      .select({ n: sql<number>`count(*)::int` })
      .from(schema.notices)
      .where(where);
    const total = totalResult[0]?.n ?? 0;

    const offset = (page - 1) * PAGE_SIZE;
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

    return {
      total,
      rows: rows.map((r, i) => ({
        id: r.id,
        no: total - offset - i,
        category: r.category as NoticeCategory,
        title: r.title,
        date: r.publishedAt.toISOString().slice(0, 10),
        views: r.viewCount,
        pinned: r.isPinned,
      })),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[notice page] DB fetch failed", err);
    return { rows: [], total: 0 };
  }
}

function buildHref(category: NoticeCategory | undefined, page: number): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${ROUTES.community.notice}?${qs}` : ROUTES.community.notice;
}

export default async function NoticePage({ searchParams }: Props) {
  const category = parseCategory(searchParams.category);
  const page = parsePage(searchParams.page);
  const { rows: NOTICES, total } = await fetchNotices(category, page);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <SubLayout
      hero={{
        eyebrow: "COMMUNITY",
        title: (
          <>
            병원의 새로운 소식,<br />
            <span className="text-accent-300">공지사항</span>
          </>
        ),
        description: (
          <>
            진료안내·이벤트·휴진 일정 등 백세한방병원의 최신 소식을 확인하실 수 있습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "커뮤니티" },
          { label: "공지사항" },
        ],
      }}
      lnb={{ title: "커뮤니티", eyebrow: "COMMUNITY", items: COMMUNITY_LNB }}
    >
      {/* Filters */}
      <Reveal as="section">
        <Eyebrow>NOTICE</Eyebrow>
        <h2 className="mt-2 text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-primary-700 leading-tight">
          전체 공지사항
        </h2>
        <p className="mt-3 text-[14px] text-neutral-600">
          카테고리별로 공지를 확인하실 수 있습니다. (총 {total}건)
        </p>

        <div className="mt-6">
          <ul className="flex flex-wrap gap-2" aria-label="공지 카테고리">
            {CATEGORY_FILTERS.map((c) => {
              const isActive = (c.value === "all" && !category) || c.value === category;
              const href =
                c.value === "all"
                  ? ROUTES.community.notice
                  : buildHref(c.value as NoticeCategory, 1);
              return (
                <li key={c.value}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      "inline-flex items-center h-9 px-4 rounded-full text-[13px] font-semibold transition-colors " +
                      (isActive
                        ? "bg-primary-700 text-white"
                        : "bg-primary-50 text-primary-700 hover:bg-primary-100")
                    }
                  >
                    {c.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      {/* Table */}
      <Reveal as="section">
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
          <table className="w-full text-[14px]">
            <caption className="sr-only">백세한방병원 공지사항 목록</caption>
            <thead className="bg-primary-50/60 text-primary-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[80px]">번호</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[110px]">카테고리</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">제목</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[120px] hidden md:table-cell">등록일</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold w-[80px] hidden md:table-cell">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {NOTICES.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[14px] text-neutral-500">
                    등록된 공지가 없습니다.
                  </td>
                </tr>
              )}
              {NOTICES.map((n) => (
                <tr key={n.id} className="hover:bg-primary-50/40 transition-colors">
                  <td className="px-4 py-3 tabular text-neutral-500">
                    {n.pinned ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-500 text-white text-[11px] font-semibold">
                        공지
                      </span>
                    ) : (
                      n.no
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold " +
                        CATEGORY_BADGE[n.category]
                      }
                    >
                      {n.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`${ROUTES.community.notice}/${n.id}`}
                      className="text-primary-700 hover:text-accent-600 hover:underline underline-offset-4 font-semibold"
                    >
                      {n.title}
                    </Link>
                    <div className="mt-1 text-[12px] text-neutral-500 md:hidden tabular">
                      {n.date} · 조회 {n.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 tabular hidden md:table-cell">{n.date}</td>
                  <td className="px-4 py-3 text-neutral-500 tabular text-right hidden md:table-cell">
                    {n.views.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="페이지" className="mt-8 flex items-center justify-center gap-1">
            <Link
              href={buildHref(category, Math.max(1, page - 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={
                "inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 transition-colors " +
                (page === 1
                  ? "pointer-events-none text-neutral-300"
                  : "text-neutral-500 hover:bg-primary-50 hover:text-primary-700")
              }
            >
              <ChevronLeft size={16} aria-hidden="true" />
              <span className="sr-only">이전 페이지</span>
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={buildHref(category, p)}
                aria-current={p === page ? "page" : undefined}
                className={
                  "inline-flex items-center justify-center w-9 h-9 rounded-lg text-[13px] font-semibold tabular transition-colors " +
                  (p === page
                    ? "bg-primary-700 text-white"
                    : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700")
                }
              >
                {p}
              </Link>
            ))}
            <Link
              href={buildHref(category, Math.min(totalPages, page + 1))}
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : undefined}
              className={
                "inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 transition-colors " +
                (page === totalPages
                  ? "pointer-events-none text-neutral-300"
                  : "text-neutral-500 hover:bg-primary-50 hover:text-primary-700")
              }
            >
              <ChevronRight size={16} aria-hidden="true" />
              <span className="sr-only">다음 페이지</span>
            </Link>
          </nav>
        )}
      </Reveal>
    </SubLayout>
  );
}
