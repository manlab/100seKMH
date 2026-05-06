import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { CheckCircle2, Clock, Lock } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { maskName, decryptField } from "@/lib/crypto";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

type Search = { searchParams: { page?: string } };

export default async function AdminCounselsPage({ searchParams }: Search) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const offset = (page - 1) * PAGE_SIZE;

  const totalRows = await db()
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.counsels);
  const total = totalRows[0]?.n ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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

  const decoratedRows = rows.map((r) => {
    let nameMasked: string;
    try {
      nameMasked = maskName(decryptField(r.nameEncrypted, "name", r.id));
    } catch {
      nameMasked = "***";
    }
    return { ...r, nameMasked };
  });

  return (
    <section>
      <header className="mb-5 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[20px] font-bold text-primary-700">온라인 상담</h1>
          <p className="mt-1 text-[13px] text-neutral-500">
            전체 {total}건 · 페이지 {page} / {totalPages}
          </p>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
        <table className="w-full text-[14px]">
          <caption className="sr-only">상담 글 관리 목록</caption>
          <thead className="bg-primary-50/60 text-primary-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold w-[100px]">상태</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">제목</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold w-[120px]">작성자</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold w-[140px]">등록일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {decoratedRows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-neutral-500">
                  등록된 상담이 없습니다.
                </td>
              </tr>
            )}
            {decoratedRows.map((r) => {
              const replied = !!r.repliedAt;
              return (
                <tr key={r.id} className="hover:bg-primary-50/40 transition-colors">
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold " +
                        (replied
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700")
                      }
                    >
                      {replied ? (
                        <>
                          <CheckCircle2 size={12} aria-hidden="true" /> 답변완료
                        </>
                      ) : (
                        <>
                          <Clock size={12} aria-hidden="true" /> 답변대기
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/counsels/${r.id}`}
                      className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:underline underline-offset-2"
                    >
                      {r.isPrivate && (
                        <Lock size={13} aria-hidden="true" className="text-neutral-400" />
                      )}
                      {r.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{r.nameMasked}</td>
                  <td className="px-4 py-3 text-neutral-500 tabular">
                    {r.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-5 flex items-center justify-center gap-2" aria-label="페이지 이동">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/admin/counsels" : `/admin/counsels?page=${p}`}
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
