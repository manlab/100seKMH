import type { Metadata } from "next";
import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { Lock, MessageSquare, Phone } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { db, schema } from "@/lib/db/client";
import { maskName, decryptField } from "@/lib/crypto";
import { env } from "@/lib/env";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CounselForm } from "./_components/CounselForm";

export const metadata: Metadata = pageMeta({
  title: "온라인 상담",
  description:
    "백세한방병원 온라인 상담 — 진료·증상·예약 관련 문의를 비공개로 남겨주시면, 한의사 또는 상담 담당자가 답변드립니다.",
  path: "/community/counsel",
});

// 글이 즉시 반영되도록 — 캐시 비활성. 트래픽이 늘면 ISR 로 전환 검토.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

type CounselRow = {
  id: string;
  no: number;
  status: "답변완료" | "답변대기";
  title: string;
  author: string;
  date: string;
  isPrivate: boolean;
};

const PAGE_SIZE = 10;

async function fetchCounselList(): Promise<CounselRow[]> {
  // DB 미설정 환경 (예: 빌드 타임, env 누락) 에서는 빈 목록으로 폴백.
  if (!env.POSTGRES_URL) return [];
  try {
    const totalResult = await db()
      .select({ n: sql<number>`count(*)::int` })
      .from(schema.counsels);
    const totalCount = totalResult[0]?.n ?? 0;

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
      .limit(PAGE_SIZE);

    return rows.map((r, i) => {
      let author: string;
      try {
        author = maskName(decryptField(r.nameEncrypted, "name", r.id));
      } catch {
        author = "***";
      }
      return {
        id: r.id,
        no: totalCount - i,
        status: r.repliedAt ? "답변완료" : "답변대기",
        title: r.isPrivate ? "비공개 글입니다" : r.title,
        author,
        date: r.createdAt.toISOString().slice(0, 10),
        isPrivate: r.isPrivate,
      };
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[counsel page] DB fetch failed", err);
    return [];
  }
}

export default async function CounselPage() {
  const COUNSELS = await fetchCounselList();
  return (
    <SubLayout
      hero={{
        eyebrow: "COMMUNITY",
        title: (
          <>
            궁금한 점, 편하게 남겨주세요.<br />
            <span className="text-accent-300">온라인 상담</span>
          </>
        ),
        description: (
          <>
            진료·증상·예약·보험 등 어떤 문의도 비공개로 남기실 수 있습니다.<br className="hidden sm:block" />
            한의사 또는 담당자가 확인 후 답변드리겠습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "커뮤니티" },
          { label: "온라인 상담" },
        ],
      }}
      lnb={{
        title: "커뮤니티",
        eyebrow: "COMMUNITY",
        items: COMMUNITY_LNB,
      }}
    >
      {/* Notice box */}
      <Reveal as="section">
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 lg:p-7">
          <div className="flex items-start gap-4">
            <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white text-primary-600">
              <Lock size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[16px] lg:text-[18px] font-bold text-primary-700">
                온라인 상담은 비공개로 운영됩니다
              </h2>
              <ul className="mt-3 space-y-1.5 text-[13px] lg:text-[14px] text-neutral-700 leading-relaxed">
                <li>· 모든 상담은 비공개 처리되며, 본인과 담당자만 확인하실 수 있습니다.</li>
                <li>· 의료법상 진단·처방은 직접 진료 후 안내드릴 수 있어, 일반 안내 위주로 답변드립니다.</li>
                <li>· 빠른 안내가 필요하시면 대표번호 {SITE.contact.representative} 로 전화 주셔도 됩니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Counsel list */}
      <Reveal as="section">
        <header className="mb-6 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <Eyebrow>RECENT</Eyebrow>
            <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700">최근 상담 글</h2>
          </div>
          <Link
            href="#write"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary-700 text-white text-[13px] font-semibold hover:bg-primary-600 transition-colors"
          >
            <MessageSquare size={14} aria-hidden="true" />
            상담 글쓰기
          </Link>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
          <table className="w-full text-[14px]">
            <caption className="sr-only">온라인 상담 글 목록</caption>
            <thead className="bg-primary-50/60 text-primary-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[70px]">
                  번호
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[100px]">
                  상태
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  제목
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[100px] hidden md:table-cell">
                  작성자
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[120px] hidden md:table-cell">
                  등록일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {COUNSELS.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[14px] text-neutral-500">
                    아직 등록된 상담 글이 없습니다. 첫 상담을 남겨보세요.
                  </td>
                </tr>
              )}
              {COUNSELS.map((c) => {
                const labelCell = (
                  <span className="inline-flex items-center gap-2 text-primary-700 font-semibold">
                    {c.isPrivate && (
                      <Lock size={13} aria-hidden="true" className="text-neutral-400" />
                    )}
                    {c.title}
                  </span>
                );
                return (
                  <tr key={c.id} className="hover:bg-primary-50/40 transition-colors">
                    <td className="px-4 py-3 tabular text-neutral-500">{c.no}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold " +
                          (c.status === "답변완료"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-neutral-100 text-neutral-600")
                        }
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/community/counsel/${c.id}`}
                        className="hover:underline underline-offset-2"
                        aria-label={`상담글 ${c.no}번 ${c.isPrivate ? "비공개 글 — 비밀번호로 확인" : c.title}`}
                      >
                        {labelCell}
                      </Link>
                      <div className="mt-1 text-[12px] text-neutral-500 md:hidden tabular">
                        {c.author} · {c.date}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 hidden md:table-cell">{c.author}</td>
                    <td className="px-4 py-3 text-neutral-500 tabular hidden md:table-cell">{c.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Write form */}
      <Reveal as="section">
        <header id="write" className="mb-6">
          <Eyebrow>WRITE</Eyebrow>
          <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700">상담 글쓰기</h2>
          <p className="mt-2 text-[14px] text-neutral-600">
            아래 정보를 남겨주시면 담당자가 비공개로 확인 후 답변드립니다.
          </p>
        </header>

        <CounselForm />


        <div className="mt-6 flex items-center gap-3 text-[13px] text-neutral-500">
          <Phone size={14} aria-hidden="true" />
          <span>
            급한 문의는 대표번호{" "}
            <Button href={`tel:${SITE.contact.representative}`} external variant="ghost" size="sm" className="px-1 h-auto tabular">
              {SITE.contact.representative}
            </Button>
            로 전화 주세요.
          </span>
        </div>
      </Reveal>
    </SubLayout>
  );
}