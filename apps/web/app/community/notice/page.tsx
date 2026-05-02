import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMeta({
  title: "공지사항",
  description:
    "백세한방병원 공지사항 — 진료안내, 이벤트, 휴진, 시설 안내까지 병원의 새로운 소식을 확인하실 수 있습니다.",
  path: "/community/notice",
});

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

const CATEGORIES = [
  { label: "전체", value: "all" },
  { label: "진료안내", value: "진료안내" },
  { label: "이벤트", value: "이벤트" },
  { label: "휴진", value: "휴진" },
  { label: "시설", value: "시설" },
] as const;

type NoticeRow = {
  no: number;
  category: "진료안내" | "이벤트" | "휴진" | "시설";
  title: string;
  date: string;
  views: number;
  pinned?: boolean;
};

// TODO(client-asset): 실제 공지 데이터 / API 연동
const NOTICES: NoticeRow[] = [
  { no: 10, category: "진료안내", title: "365일 진료 운영 안내 — 평일·주말·공휴일 모두 진료합니다", date: "2026-04-22", views: 2418, pinned: true },
  { no: 9, category: "휴진", title: "5월 가정의 달 진료 일정 안내", date: "2026-04-18", views: 1206 },
  { no: 8, category: "시설", title: "여성 전용 입원실 리뉴얼 완료 안내", date: "2026-04-12", views: 982 },
  { no: 7, category: "진료안내", title: "교통사고 한방 진료 — 자동차보험 처리 안내", date: "2026-04-05", views: 1764 },
  { no: 6, category: "이벤트", title: "봄철 환절기 면역 한약 상담 캠페인", date: "2026-03-28", views: 1521 },
  { no: 5, category: "진료안내", title: "추나·체형교정 클리닉 신규 개설 안내", date: "2026-03-20", views: 1843 },
  { no: 4, category: "휴진", title: "3월 정기 휴진일 안내", date: "2026-03-10", views: 644 },
  { no: 3, category: "시설", title: "탕전실 위생 점검 결과 공지", date: "2026-03-02", views: 528 },
  { no: 2, category: "진료안내", title: "온라인 상담 운영 시간 변경 안내", date: "2026-02-22", views: 712 },
  { no: 1, category: "이벤트", title: "신환 한약 첫 상담 안내 캠페인", date: "2026-02-12", views: 998 },
];

const CATEGORY_BADGE: Record<NoticeRow["category"], string> = {
  진료안내: "bg-primary-50 text-primary-700",
  이벤트: "bg-accent-50 text-accent-700",
  휴진: "bg-neutral-100 text-neutral-700",
  시설: "bg-emerald-50 text-emerald-700",
};

export default function NoticePage() {
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
      lnb={{
        title: "커뮤니티",
        eyebrow: "COMMUNITY",
        items: COMMUNITY_LNB,
      }}
    >
      {/* Filters */}
      <Reveal as="section">
        <Eyebrow>NOTICE</Eyebrow>
        <h2 className="mt-2 text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-primary-700 leading-tight">
          전체 공지사항
        </h2>
        <p className="mt-3 text-[14px] text-neutral-600">
          카테고리 또는 검색어로 원하는 공지를 찾아보실 수 있습니다.
        </p>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2" role="tablist" aria-label="공지 카테고리">
            {CATEGORIES.map((c) => (
              <li key={c.value}>
                <button
                  type="button"
                  className={
                    "inline-flex items-center h-9 px-4 rounded-full text-[13px] font-semibold transition-colors " +
                    (c.value === "all"
                      ? "bg-primary-700 text-white"
                      : "bg-primary-50 text-primary-700 hover:bg-primary-100")
                  }
                  aria-pressed={c.value === "all"}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
          {/* TODO(client-asset): wire search to API/state */}
          <form role="search" className="relative w-full max-w-sm">
            <label htmlFor="notice-search" className="sr-only">
              공지 검색
            </label>
            <Search
              size={16}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              id="notice-search"
              type="search"
              name="q"
              placeholder="공지 제목 검색"
              className="w-full h-10 pl-9 pr-4 rounded-full border border-neutral-200 bg-white text-[13px] text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </form>
        </div>
      </Reveal>

      {/* Table */}
      <Reveal as="section">
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
          <table className="w-full text-[14px]">
            <caption className="sr-only">백세한방병원 공지사항 목록</caption>
            <thead className="bg-primary-50/60 text-primary-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[80px]">
                  번호
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[110px]">
                  카테고리
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  제목
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[120px] hidden md:table-cell">
                  등록일
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold w-[80px] hidden md:table-cell">
                  조회
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {NOTICES.map((n) => (
                <tr key={n.no} className="hover:bg-primary-50/40 transition-colors">
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
                      href={`${ROUTES.community.notice}#${n.no}`}
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
        <nav aria-label="페이지" className="mt-8 flex items-center justify-center gap-1">
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            aria-label="이전 페이지"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              type="button"
              className={
                "inline-flex items-center justify-center w-9 h-9 rounded-lg text-[13px] font-semibold tabular transition-colors " +
                (p === 1
                  ? "bg-primary-700 text-white"
                  : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700")
              }
              aria-current={p === 1 ? "page" : undefined}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            aria-label="다음 페이지"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </nav>
      </Reveal>
    </SubLayout>
  );
}
