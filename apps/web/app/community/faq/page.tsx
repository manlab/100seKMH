import type { Metadata } from "next";
import Script from "next/script";
import { Search } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export const metadata: Metadata = pageMeta({
  title: "자주 묻는 질문",
  description:
    "백세한방병원에 자주 묻는 질문을 모았습니다. 진료·비용·보험·한약·입원·기타 주제별로 답변을 정리했습니다.",
  path: "/community/faq",
});

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

const TABS = [
  { label: "전체", value: "all" },
  { label: "진료", value: "진료" },
  { label: "비용·보험", value: "비용" },
  { label: "한약", value: "한약" },
  { label: "입원", value: "입원" },
  { label: "기타", value: "기타" },
] as const;

type FaqEntry = { category: "진료" | "비용" | "한약" | "입원" | "기타"; question: string; answer: string };

const FAQS: FaqEntry[] = [
  // 진료
  { category: "진료", question: "예약 없이 방문해도 진료받을 수 있나요?", answer: "예약 없이도 방문 진료가 가능합니다. 다만 대기 시간이 길어질 수 있어, 가능하시다면 미리 전화 또는 온라인 상담으로 안내받으시는 편을 권해 드립니다." },
  { category: "진료", question: "진료 시간은 어떻게 되나요?", answer: "평일 09:30~19:30, 주말·공휴일 09:30~17:00 진료합니다. 점심시간은 12:30~13:30입니다." },
  { category: "진료", question: "주차는 가능한가요?", answer: "병원 건물 주차장을 이용하실 수 있습니다. 진료 환자분께는 주차권을 안내해 드립니다." },
  { category: "진료", question: "초진은 얼마나 걸리나요?", answer: "초진은 진맥·문진·체질 평가까지 포함해 보통 30~40분 정도 안내드립니다." },
  // 비용·보험
  { category: "비용", question: "건강보험 적용은 어떻게 되나요?", answer: "침·뜸·부항·일부 한약은 건강보험 적용이 가능합니다. 자세한 항목은 비급여 항목 페이지에서 확인하실 수 있습니다." },
  { category: "비용", question: "자동차보험으로 한방 치료가 가능한가요?", answer: "교통사고 후유증의 경우 자동차보험으로 한방 진료가 가능합니다. 사고 접수 번호와 보험사 정보를 가지고 오시면 절차를 안내드립니다." },
  { category: "비용", question: "실손보험 적용이 되나요?", answer: "한방 진료의 실손보험 적용은 보험사·약관에 따라 다릅니다. 진료 내역서·영수증은 발급해 드릴 수 있어, 가입 보험사로 문의해 주세요." },
  { category: "비용", question: "비급여 비용이 궁금합니다", answer: "비급여 항목과 비용은 비급여 항목 안내 페이지에 정리되어 있습니다. 한약·약침·도수치료 등의 비용을 확인하실 수 있습니다." },
  // 한약
  { category: "한약", question: "한약은 얼마나 복용하나요?", answer: "환자 상태와 증상에 따라 다릅니다. 보통 4~12주 정도를 안내드리며, 첫 진료에서 예상 기간을 함께 안내드립니다." },
  { category: "한약", question: "양약과 함께 복용해도 되나요?", answer: "복용 중인 약 정보를 진료 시 알려주시면 함께 검토합니다. 필요한 경우 복용 시간을 분리하거나, 일부 약물과의 병용은 신중히 안내드립니다." },
  { category: "한약", question: "임신·수유 중 한약 복용이 가능한가요?", answer: "안전한 처방으로 진행하는 것이 일반적입니다. 다만 약재 선택과 용량은 신중히 안내드리니, 진료 시 임신·수유 상황을 알려주세요." },
  { category: "한약", question: "탕전(달임)은 어디서 진행되나요?", answer: "원내 탕전실에서 직접 달이거나, 정식 인증된 외부 탕전원과 협력해 진행합니다. 자세한 내용은 한약·탕전 안내 페이지를 참고해 주세요." },
  // 입원
  { category: "입원", question: "입원실은 어떻게 운영되나요?", answer: "1인실·2인실·4인실이 운영됩니다. 자세한 시설과 비용은 입원 안내 페이지를 참고해 주세요." },
  { category: "입원", question: "교통사고 입원도 가능한가요?", answer: "통증으로 일상이 어려우신 경우, 교통사고 후유증으로 집중 치료가 필요한 경우 입원이 가능합니다. 진료 후 일정을 안내드립니다." },
  { category: "입원", question: "보호자 상주가 가능한가요?", answer: "병실 종류와 환자 상태에 따라 가능 여부가 다릅니다. 자세한 사항은 입원 안내 페이지나 전화로 확인해 주세요." },
  // 기타
  { category: "기타", question: "진료 기록·소견서는 어떻게 받나요?", answer: "서류 발급 안내 페이지를 참고해 주세요. 본인 또는 대리인이 신청하실 수 있으며, 필요한 서류를 함께 안내드립니다." },
  { category: "기타", question: "외국어 진료가 가능한가요?", answer: "기본 안내는 한국어로 진행되며, 환자분께서 통역을 동반하시는 경우 진료가 원활합니다. 필요 시 사전에 문의해 주세요." },
  { category: "기타", question: "온라인 상담 답변은 얼마나 걸리나요?", answer: "보통 1~2 영업일 안에 답변드립니다. 빠른 안내가 필요하시면 대표번호로 전화 주셔도 됩니다." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

// Static, internally-constructed JSON — no untrusted input.
const faqJsonLdString = JSON.stringify(faqJsonLd);

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {faqJsonLdString}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "COMMUNITY",
          title: (
            <>
              자주 묻는 질문을<br />
              <span className="text-accent-300">한 곳에 모았습니다</span>
            </>
          ),
          description: (
            <>
              진료·비용·한약·입원·기타 주제별로 자주 묻는 질문을 정리했습니다.<br className="hidden sm:block" />
              원하는 답변을 바로 찾아보실 수 있습니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "커뮤니티" },
            { label: "자주 묻는 질문" },
          ],
        }}
        lnb={{
          title: "커뮤니티",
          eyebrow: "COMMUNITY",
          items: COMMUNITY_LNB,
        }}
      >
        {/* Tabs + search */}
        <Reveal as="section">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-2 text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-primary-700 leading-tight">
            카테고리별 자주 묻는 질문
          </h2>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ 카테고리">
              {TABS.map((t, i) => (
                <li key={t.value}>
                  <button
                    type="button"
                    className={
                      "inline-flex items-center h-9 px-4 rounded-full text-[13px] font-semibold transition-colors " +
                      (i === 0
                        ? "bg-primary-700 text-white"
                        : "bg-primary-50 text-primary-700 hover:bg-primary-100")
                    }
                    aria-pressed={i === 0}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
            {/* TODO(client-asset): wire FAQ search */}
            <form role="search" className="relative w-full max-w-sm">
              <label htmlFor="faq-search" className="sr-only">
                FAQ 검색
              </label>
              <Search size={16} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                id="faq-search"
                type="search"
                name="q"
                placeholder="키워드로 검색"
                className="w-full h-10 pl-9 pr-4 rounded-full border border-neutral-200 bg-white text-[13px] text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </form>
          </div>
        </Reveal>

        {/* FAQ groups */}
        {(["진료", "비용", "한약", "입원", "기타"] as const).map((cat) => {
          const items = FAQS.filter((f) => f.category === cat).map((f) => ({ question: f.question, answer: f.answer }));
          if (items.length === 0) return null;
          const heading = cat === "비용" ? "비용·보험" : cat;
          return (
            <Reveal key={cat} as="section">
              <header className="mb-5">
                <Eyebrow>{cat.toUpperCase()}</Eyebrow>
                <h3 className="mt-2 text-[20px] lg:text-[24px] font-bold text-primary-700">{heading}</h3>
              </header>
              <FaqAccordion items={items} />
            </Reveal>
          );
        })}
      </SubLayout>
    </>
  );
}
