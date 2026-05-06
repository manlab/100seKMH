import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { CheckCircle2, EyeOff, Plus, Pin } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import type { NoticeCategory } from "@/lib/db/schema";
import { parsePage } from "@/lib/pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

const CATEGORY_BADGE: Record<NoticeCategory, string> = {
  진료안내: "bg-primary-50 text-primary-700",
  이벤트: "bg-accent-50 text-accent-700",
  휴진: "bg-neutral-100 text-neutral-700",
  시설: "bg-emerald-50 text-emerald-700",
};

type Props = { searchParams: { page?: string } };

export default async function AdminNoticesPage({ searchParams }: Props) {
  const page = parsePage(searchParams.page);
  const offset = (page - 1) * PAGE_SIZE;

  const totalRows = await db()
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.notices);
  const total = totalRows[0]?.n ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const rows = await db()
    .select()
    .from(schema.notices)
    .orderBy(desc(schema.notices.isPinned), desc(schema.notices.publishedAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return (
    <section>
      <header className="mb-5 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[20px] font-bold text-primary-700">공지사항</h1>
          <p className="mt-1 text-[13px] text-neutral-500">
            전체 {total}건 · 페이지 {page} / {totalPages}
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary-600 text-white text-[13px] font-semibold hover:bg-primary-700 transition-colors"
        >
          <Plus size={14} aria-hidden="true" />
          공지 작성
        </Link>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
        <table className="w-full text-[14px]">
          <caption className="sr-only">공지사항 관리 목록</caption>
          <thead className="bg-primary-50/60 text-primary-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold w-[80px]">상태</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold w-[100px]">카테고리</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">제목</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold w-[120px]">작성자</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold w-[70px]">조회</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold w-[140px]">게시일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-500">
                  등록된 공지가 없습니다. 우측 상단 “공지 작성” 으로 첫 공지를 등록하세요.
                </td>
              </tr>
            )}
            {rows.map((n) => (
              <tr key={n.id} className="hover:bg-primary-50/40 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    {n.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500 text-white text-[11px] font-semibold">
                        <Pin size={10} aria-hidden="true" /> 고정
                      </span>
                    )}
                    {n.isPublished ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                        <CheckCircle2 size={10} aria-hidden="true" /> 게시
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-semibold">
                        <EyeOff size={10} aria-hidden="true" /> 임시
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      "inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold " +
                      CATEGORY_BADGE[n.category as NoticeCategory]
                    }
                  >
                    {n.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/notices/${n.id}`}
                    className="text-primary-700 font-semibold hover:underline underline-offset-2"
                  >
                    {n.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-600">
                  {n.authorName ?? <span className="text-neutral-400">—</span>}
                </td>
                <td className="px-4 py-3 text-neutral-500 tabular text-right">
                  {n.viewCount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-neutral-500 tabular">
                  {n.publishedAt.toISOString().slice(0, 16).replace("T", " ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-5 flex items-center justify-center gap-2" aria-label="페이지 이동">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/admin/notices" : `/admin/notices?page=${p}`}
              className={
                "inline-flex items-center justify-center min-w-[36px] h-9 px-3 rounded-md text-[13px] " +
                (p === page
                  ? "bg-primary-600 text-white font-semibold"
                  : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50")
              }
            >
              {p}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
