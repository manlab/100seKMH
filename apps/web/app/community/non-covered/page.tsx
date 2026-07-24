import type { Metadata } from "next";
import Link from "next/link";
import { Info, Filter, Search } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMeta({
  title: "비급여 항목 안내",
  description:
    "백세한방병원 비급여 항목 안내 — 한약·약침·추나·시술·서류 발급 등 주요 비급여 진료 항목을 안내드립니다.",
  path: "/community/non-covered",
});

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

const FILTERS = [
  { label: "전체", value: "all" },
  { label: "한약", value: "한약" },
  { label: "약침", value: "약침" },
  { label: "추나", value: "추나" },
  { label: "시술", value: "시술" },
  { label: "서류", value: "서류" },
] as const;

type Row = {
  category: "한약" | "약침" | "추나" | "시술" | "서류";
  name: string;
  unit: string;
  price: string;
  note?: string;
};

const ROWS: Row[] = [
  // 한약 5
  { category: "한약", name: "면역·체력 보양 한약", unit: "1일 2회 / 30일", price: "", note: "체질·증상에 따라 차등" },
  { category: "한약", name: "산후조리 한약", unit: "1일 2회 / 30일", price: "" },
  { category: "한약", name: "성장 한약 (소아)", unit: "1일 2회 / 30일", price: "", note: "연령·체중에 따라 차등" },
  { category: "한약", name: "갱년기 한약", unit: "1일 2회 / 30일", price: "" },
  { category: "한약", name: "총명탕 (학습기)", unit: "1일 2회 / 30일", price: "" },
  // 약침 3
  { category: "약침", name: "일반 약침", unit: "1회", price: "20,000~200,000" },
  { category: "약침", name: "봉약침", unit: "1회", price: "", note: "사전 알레르기 검사 필요" },
  { category: "약침", name: "자하거 약침", unit: "1회", price: "" },
  // 추나 2
  { category: "추나", name: "단순 추나 (비급여 회차)", unit: "1회", price: "", note: "보험 적용 횟수 초과 시" },
  { category: "추나", name: "복잡 추나 (비급여 회차)", unit: "1회", price: "", note: "보험 적용 횟수 초과 시" },
  // 시술 2
  { category: "시술", name: "도수치료", unit: "1회 (30분)", price: "" },
  { category: "시술", name: "체외충격파", unit: "1회", price: "" },
  // 서류 3
  { category: "서류", name: "진료확인서·소견서", unit: "1부", price: "" },
  { category: "서류", name: "입퇴원확인서", unit: "1부", price: "" },
  { category: "서류", name: "진료기록사본", unit: "1매", price: "" },
];

const CATEGORY_BADGE: Record<Row["category"], string> = {
  한약: "bg-primary-50 text-primary-700",
  약침: "bg-accent-50 text-accent-700",
  추나: "bg-emerald-50 text-emerald-700",
  시술: "bg-amber-50 text-amber-700",
  서류: "bg-neutral-100 text-neutral-700",
};

export default function NonCoveredPage() {
  return (
    <SubLayout visualPath={ROUTES.community.nonCovered}
      hero={{
        eyebrow: "COMMUNITY",
        title: (
          <>
            비급여 항목을<br />
            <span className="text-accent-300">투명하게 안내드립니다</span>
          </>
        ),
        description: (
          <>
            한약·약침·추나·시술·서류 발급까지 백세한방병원의 주요 비급여 항목을 정리했습니다.<br className="hidden sm:block" />
            진료 시 환자분께 다시 한번 안내드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "커뮤니티" },
          { label: "비급여 항목" },
        ],
      }}
      lnb={{
        title: "커뮤니티",
        eyebrow: "COMMUNITY",
        items: COMMUNITY_LNB,
      }}
    >
      {/* Notice */}
      <Reveal as="section">
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 lg:p-7">
          <div className="flex items-start gap-4">
            <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white text-primary-600">
              <Info size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[16px] lg:text-[18px] font-bold text-primary-700">
                비급여 항목 안내 사항
              </h2>
              <ul className="mt-3 space-y-1.5 text-[13px] lg:text-[14px] text-neutral-700 leading-relaxed">
                <li>· 비급여 비용은 확정 후 별도 안내 예정입니다.</li>
                <li>· 환자 상태·체질·시술 난이도에 따라 진료 내용은 달라질 수 있습니다.</li>
                <li>· 진료 전 필요한 항목을 안내드리며, 동의 후 진료가 진행됩니다.</li>
                <li>· 자세한 항목 문의는{" "}
                  <Link href={ROUTES.community.counsel} className="text-primary-600 underline underline-offset-2">
                    온라인 상담
                  </Link>{" "}
                  또는 대표번호로 부탁드립니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Filters + search */}
      <Reveal as="section">
        <header className="mb-5">
          <Eyebrow>NON-COVERED</Eyebrow>
          <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700">전체 비급여 항목</h2>
        </header>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2" role="tablist" aria-label="비급여 항목 카테고리">
            {FILTERS.map((f, i) => (
              <li key={f.value}>
                <button
                  type="button"
                  className={
                    "inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold transition-colors " +
                    (i === 0
                      ? "bg-primary-700 text-white"
                      : "bg-primary-50 text-primary-700 hover:bg-primary-100")
                  }
                  aria-pressed={i === 0}
                >
                  {i === 0 && <Filter size={13} aria-hidden="true" />}
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
          {/* TODO(client-asset): wire to search/filter state */}
          <form role="search" className="relative w-full max-w-sm">
            <label htmlFor="nc-search" className="sr-only">
              비급여 항목 검색
            </label>
            <Search size={16} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              id="nc-search"
              type="search"
              name="q"
              placeholder="항목명 검색"
              className="w-full h-10 pl-9 pr-4 rounded-full border border-neutral-200 bg-white text-[13px] text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </form>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
          <table className="w-full text-[14px] min-w-[640px]">
            <caption className="sr-only">비급여 항목별 비용 안내</caption>
            <thead className="bg-primary-50/60 text-primary-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[100px]">
                  분류
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  항목명
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[160px]">
                  단위
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold w-[200px]">
                  비용 (원)
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold w-[200px] hidden lg:table-cell">
                  비고
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {ROWS.map((r, i) => (
                <tr key={i} className="hover:bg-primary-50/40 transition-colors">
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold " +
                        CATEGORY_BADGE[r.category]
                      }
                    >
                      {r.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-primary-700 font-semibold">
                    {r.name}
                    {r.note && (
                      <div className="mt-1 text-[12px] text-neutral-500 lg:hidden">{r.note}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{r.unit}</td>
                  <td className="px-4 py-3 text-right tabular text-neutral-800 font-semibold">{r.price}</td>
                  <td className="px-4 py-3 text-neutral-500 text-[13px] hidden lg:table-cell">
                    {r.note ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[12px] text-neutral-500">
          ※ 비용 항목은 확정 후 업데이트 예정입니다.
          (보건복지부 고시 「비급여 진료비용 등의 공개에 관한 기준」 준수)
        </p>
      </Reveal>
    </SubLayout>
  );
}
