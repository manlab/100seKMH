import type { Metadata } from "next";
import { ArrowRight, Phone, Activity, Layers, Clock, Shield } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { InContentCta } from "@/components/ui/InContentCta";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "면역·만성 클리닉",
  description:
    "백세한방병원 면역·만성 클리닉 — 비염·천식, 만성피로, 수면장애, 두통, 수족냉증까지. 체질별 한약과 침·약침으로 면역과 컨디션을 함께 봅니다.",
  path: "/immunity",
});

const IMMUNITY_CATEGORY = GNB.find((g) => g.href === "/immunity")!;

const SYMPTOMS = [
  { label: "알레르기 비염", href: ROUTES.immunity.rhinitis },
  { label: "만성 비염", href: ROUTES.immunity.rhinitis },
  { label: "천식", href: ROUTES.immunity.rhinitis },
  { label: "만성피로", href: ROUTES.immunity.fatigue },
  { label: "면역저하", href: ROUTES.immunity.fatigue },
  { label: "수면장애", href: ROUTES.immunity.sleep },
  { label: "두통", href: ROUTES.immunity.sleep },
  { label: "편두통", href: ROUTES.immunity.sleep },
  { label: "수족냉증", href: ROUTES.immunity.coldHandFoot },
  { label: "잦은 감기", href: ROUTES.immunity.fatigue },
];

const USPS = [
  {
    Icon: Activity,
    title: "체질별 면역 진료",
    desc: "같은 증상도 체질에 따라 처방이 달라집니다. 진맥·문진을 통해 환자 체질을 먼저 살피고, 맞춤 진료 계획을 세웁니다.",
  },
  {
    Icon: Layers,
    title: "맞춤 한약 처방",
    desc: "체질·증상·생활 패턴에 맞춰 한약을 처방합니다. 면역과 컨디션을 함께 관리하시도록 안내드립니다.",
  },
  {
    Icon: Clock,
    title: "침뜸·부항 통합",
    desc: "한약과 함께 침·뜸·부항·약침을 통합적으로 사용해 치료 효과를 함께 살핍니다.",
  },
  {
    Icon: Shield,
    title: "생활 습관 가이드",
    desc: "치료와 함께 식이·수면·운동 가이드를 안내드려, 호전 상태를 오래 유지하시도록 돕습니다.",
  },
];

const TREATMENTS = [
  { num: "01", title: "한약", desc: "체질·증상에 맞춰 처방. 면역과 회복기 보양을 함께 봅니다." },
  { num: "02", title: "침·뜸", desc: "경혈을 자극해 기혈 순환을 돕고, 만성 증상의 흐름을 완화합니다." },
  { num: "03", title: "약침", desc: "한약 추출액을 정밀 주입해 효과를 빠르게 살피는 데 활용합니다." },
  { num: "04", title: "부항", desc: "혈류 순환과 어혈 해소를 돕는 부항 치료를 함께 진행합니다." },
];

const PROCESS = [
  { num: "01", title: "접수·문진", desc: "증상·생활 패턴·식이·수면을 먼저 살펴봅니다." },
  { num: "02", title: "체질 진단", desc: "진맥·체질 분석을 통해 면역 상태를 평가합니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·뜸·약침을 환자 상태에 맞춰 조합합니다.", highlight: true },
  { num: "04", title: "경과 점검", desc: "정기적으로 컨디션 변화를 확인하고 강도를 조정합니다." },
  { num: "05", title: "사후 관리", desc: "유지 식이·생활 가이드 안내, 재발 위험을 줄여드립니다." },
];

const SELF_CHECK = [
  "환절기마다 비염·기침이 반복됩니다",
  "잠을 자도 피로가 가시지 않습니다",
  "감기에 자주 걸리고 회복이 느립니다",
  "두통·편두통이 자주 반복됩니다",
  "손발이 차고 추위에 약합니다",
  "잠들기 어렵거나 자주 깹니다",
];

const FAQS = [
  {
    question: "한약 처방은 보험 적용이 되나요?",
    answer:
      "일부 단미·복합 한약은 건강보험 적용이 가능하며, 맞춤 처방 한약은 비급여로 안내됩니다. 비용은 비급여 항목 페이지에서 확인하실 수 있습니다.",
  },
  {
    question: "한약은 얼마나 복용하나요?",
    answer:
      "환자 상태와 증상에 따라 보통 4~12주 정도를 안내드립니다. 첫 진료에서 예상 기간과 빈도를 함께 안내드리며, 경과에 따라 조정해 드립니다.",
  },
  {
    question: "양약과 함께 복용해도 되나요?",
    answer:
      "복용 중인 약 정보를 진료 시 알려주시면 함께 검토합니다. 필요한 경우 복용 시간을 분리하거나, 일부 약물과의 병용은 신중히 안내드립니다.",
  },
  {
    question: "체질 진단은 어떻게 하나요?",
    answer:
      "진맥·문진·생활 패턴 평가를 통해 체질과 면역 상태를 함께 살펴봅니다. 체질 진단 결과는 처방·치료 방향에 반영됩니다.",
  },
  {
    question: "어린이도 진료받을 수 있나요?",
    answer:
      "소아 면역·잦은 감기·비염 등으로 진료받으실 수 있습니다. 연령과 체중에 맞춘 처방·시술로 진행하니, 자세한 사항은 여성·소아 클리닉 안내도 함께 참고해 주세요.",
  },
];

export default function ImmunityPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "IMMUNITY & CHRONIC CARE CLINIC",
        title: (
          <>
            면역과 컨디션을<br />
            <span className="text-accent-300">체질부터 함께 봅니다</span>
          </>
        ),
        description: (
          <>
            비염·만성피로·수면장애·수족냉증 같은 만성 증상을 체질부터 살핍니다.<br className="hidden sm:block" />
            한약·침·뜸·약침을 통합적으로 사용해 면역과 일상 컨디션을 함께 안내드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "진료안내" },
          { label: "면역·만성" },
        ],
        stats: [
          { eyebrow: "치료 방식", value: "체질 한방", caption: "맞춤 한약·침" },
          { eyebrow: "진료 시간", value: "365일", caption: "평일·주말·공휴일" },
          { eyebrow: "진단 방식", value: "체질 분석", caption: "진맥·문진" },
          { eyebrow: "관리 방식", value: "생활 가이드", caption: "식이·수면 안내", accent: true },
        ],
        actions: (
          <>
            <Button href="#symptoms" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              증상별 진료 보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              지금 전화 상담
            </Button>
          </>
        ),
      }}
      lnb={{
        title: "면역·만성",
        eyebrow: "IMMUNITY CLINIC",
        items: IMMUNITY_CATEGORY.children ?? [],
      }}
    >
      {/* Overview */}
      <Reveal as="section">
        <Eyebrow>CLINIC OVERVIEW</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          체질부터 살피는<br className="hidden sm:block" />
          맞춤 한방 면역 진료
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원 면역·만성 클리닉은 비염·만성피로·수면장애·수족냉증 같은 반복되는
          만성 증상을 체질 단위에서 함께 봅니다. 같은 증상도 환자에 따라 처방이 다른 한방의
          특성을 살려, 한약·침·뜸·약침을 통합적으로 안내드립니다.
        </p>

        <div id="symptoms" className="mt-7 lg:mt-9">
          <h3 className="text-[14px] font-semibold text-primary-600 mb-3">이 클리닉에서 다루는 증상</h3>
          <ul className="flex flex-wrap gap-2">
            {SYMPTOMS.map((s, i) => (
              <li key={i}>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-primary-50 text-primary-700 text-[13px] font-semibold hover:bg-primary-100 transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* USPs */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>WHY BAEKSE</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            백세한방병원 면역·만성 클리닉이 다른 점
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            만성 증상은 한 번의 처방으로 끝나지 않습니다. 체질 진단부터 사후 관리까지
            함께 진행해야 변화가 오래 유지됩니다.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {USPS.map((u) => (
            <article
              key={u.title}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
                <u.Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[18px] lg:text-[20px] font-bold text-primary-700">{u.title}</h3>
              <p className="mt-2 text-[14px] lg:text-[15px] text-neutral-600 leading-relaxed">{u.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Treatment methods */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>TREATMENT</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            백세한방병원의 면역·만성 치료 방법
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TREATMENTS.map((t) => (
            <article
              key={t.num}
              className="rounded-2xl border border-neutral-200 bg-white p-5 lg:p-6 hover:border-primary-200 transition-colors"
            >
              <span className="text-[11px] tracking-[0.18em] font-semibold text-accent-600 tabular">METHOD {t.num}</span>
              <h3 className="mt-2 text-[17px] font-bold text-primary-700">{t.title}</h3>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{t.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Process */}
      <Reveal as="section">
        <header className="mb-8 lg:mb-10">
          <Eyebrow>CARE PROCESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            내원부터 사후 관리까지, 5단계 진료 과정
          </h2>
        </header>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          {PROCESS.map((p) => (
            <li key={p.num} className="bg-white border border-neutral-200 rounded-2xl p-5 lg:p-6 shadow-card">
              <span
                className={
                  "inline-flex items-center justify-center w-12 h-12 rounded-full text-white tabular text-[18px] font-bold " +
                  (p.highlight ? "bg-accent-500 shadow-cta" : "bg-primary-500 shadow-md")
                }
              >
                {p.num}
              </span>
              <h3 className="mt-4 text-[16px] font-bold text-primary-700">{p.title}</h3>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Self check */}
      <Reveal as="section">
        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
          <header className="mb-5 lg:mb-6">
            <Eyebrow>SELF CHECK</Eyebrow>
            <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
              이런 신호가 반복된다면 면역 진료가 필요합니다
            </h2>
          </header>
          <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            {SELF_CHECK.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] lg:text-[15px] text-neutral-700">
                <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-accent-500 text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] text-neutral-500">
            ※ 자가 점검은 일반적인 안내이며, 정확한 진단은 내원 후 진료를 통해 안내드립니다.
          </p>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            자주 묻는 질문
          </h2>
        </header>
        <FaqAccordion items={FAQS} />
      </Reveal>

      {/* In-content CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              만성 증상이 반복된다면,<br />체질부터 함께 살펴보세요.
            </>
          }
          description="진료 가능 일정과 한약 처방 절차를 함께 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
