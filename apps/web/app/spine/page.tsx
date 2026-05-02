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
  title: "통증클리닉",
  description:
    "백세한방병원 통증클리닉 — 디스크, 척추관협착증, 오십견, 무릎관절통, 스포츠 손상까지. 한약·침·약침·추나로 통증의 원인을 함께 봅니다.",
  path: "/spine",
});

const SPINE_CATEGORY = GNB.find((g) => g.href === "/spine")!;

const SYMPTOMS = [
  { label: "목 디스크", href: "/spine/disc" },
  { label: "허리 디스크", href: "/spine/disc" },
  { label: "척추관협착증", href: "/spine/stenosis" },
  { label: "오십견", href: "/spine/shoulder" },
  { label: "회전근개 손상", href: "/spine/shoulder" },
  { label: "무릎 관절통", href: "/spine/knee" },
  { label: "퇴행성 관절염", href: "/spine/knee" },
  { label: "스포츠 손상", href: "/spine/sports" },
  { label: "근육 통증", href: "/spine/sports" },
  { label: "테니스엘보", href: "#" },
];

const USPS = [
  {
    Icon: Activity,
    title: "정확한 원인 파악",
    desc: "체질·자세·근육 상태를 함께 보고, 필요한 경우 영상검사 안내까지 진행합니다. 표면 증상이 아닌 원인 기반의 치료 계획을 세웁니다.",
  },
  {
    Icon: Layers,
    title: "통합 한방 치료",
    desc: "한약·침·약침·봉침·추나·물리치료까지 한자리에서 함께 받으실 수 있도록 동선을 설계했습니다. 치료가 분산되지 않습니다.",
  },
  {
    Icon: Clock,
    title: "365일 정기 진료",
    desc: "통증은 시간을 가리지 않습니다. 평일·주말·공휴일 모두 진료해 회복 기간 동안 치료가 끊기지 않도록 합니다.",
  },
  {
    Icon: Shield,
    title: "사후 관리·생활지도",
    desc: "치료 종료 후에도 자세·생활 습관 가이드를 제공합니다. 재발 위험을 줄이기 위한 운동 동작과 주의사항까지 함께 안내드립니다.",
  },
];

const TREATMENTS = [
  { num: "01", title: "한약", desc: "체질·증상에 맞춰 처방. 통증 완화와 회복기 보양을 함께 봅니다." },
  { num: "02", title: "침·전기침", desc: "통증 부위와 경혈을 함께 자극해 근육 긴장과 통증 신호를 완화합니다." },
  { num: "03", title: "약침·봉침", desc: "한약 추출액을 정밀하게 주입해 염증·근육 긴장을 직접 풀어드립니다." },
  { num: "04", title: "추나·물리치료", desc: "추나(밀고 당기는 수기치료)와 물리치료로 자세·근막 정렬을 잡아드립니다." },
];

const PROCESS = [
  { num: "01", title: "접수·문진", desc: "증상·과거 병력·생활 습관을 먼저 살펴봅니다." },
  { num: "02", title: "정밀 진단", desc: "진맥·자세 분석, 필요한 경우 영상검사 안내." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·약침·추나를 환자 상태에 맞춰 조합.", highlight: true },
  { num: "04", title: "경과 점검", desc: "정기적으로 변화 확인 후 치료 강도를 조절." },
  { num: "05", title: "사후 관리", desc: "자세·운동 가이드 안내, 재발 위험을 줄여드립니다." },
];

const SELF_CHECK = [
  "목·허리 통증이 2주 이상 지속됩니다",
  "팔·다리가 저리거나 감각이 둔합니다",
  "걸을 때 다리가 무거워 자주 쉬게 됩니다",
  "팔을 들거나 옷을 입을 때 어깨가 아픕니다",
  "계단을 오르내릴 때 무릎이 시큰합니다",
  "운동·반복 동작 후 통증이 가라앉지 않습니다",
];

const FAQS = [
  {
    question: "예약 없이 방문해도 진료받을 수 있나요?",
    answer:
      "예약 없이도 방문 진료가 가능합니다. 다만 대기 시간이 길어질 수 있어, 가능하시다면 전화 또는 온라인 상담으로 미리 안내받으시는 편을 권해 드립니다.",
  },
  {
    question: "자동차보험으로 한방 치료를 받을 수 있나요?",
    answer:
      "교통사고 후유증의 경우 자동차보험 적용으로 한방 치료가 가능합니다. 사고 접수 번호와 보험사 정보를 가지고 오시면 절차 안내를 도와드립니다.",
  },
  {
    question: "한약 처방은 보험 적용이 되나요?",
    answer:
      "일부 단미·복합 한약은 건강보험 적용이 가능하며, 맞춤 처방 한약은 비급여로 안내됩니다. 비용은 비급여 항목 페이지에서 확인하실 수 있습니다.",
  },
  {
    question: "치료 기간은 보통 얼마나 걸리나요?",
    answer:
      "환자 상태와 증상의 정도에 따라 다릅니다. 첫 진료에서 예상 치료 기간과 빈도를 함께 안내드리며, 경과에 따라 치료 강도를 조정해 드립니다.",
  },
  {
    question: "입원 치료도 가능한가요?",
    answer:
      "통증으로 일상생활이 어려운 경우, 교통사고 후유증으로 집중 치료가 필요한 경우 입원 치료를 진행할 수 있습니다. 자세한 사항은 입원 안내 페이지를 참고해 주세요.",
  },
];

export default function SpinePage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "SPINE & JOINT PAIN CLINIC",
        title: (
          <>
            통증의 뿌리부터<br />
            <span className="text-accent-300">바로잡는 한방 치료</span>
          </>
        ),
        description: (
          <>
            한약·침·약침·추나·물리치료를 함께 사용해 통증의 원인을 함께 살핍니다.<br className="hidden sm:block" />
            비수술 한방 치료로 일상으로의 회복까지 책임지고 안내드리겠습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "진료안내" },
          { label: "통증클리닉" },
        ],
        stats: [
          { eyebrow: "치료 방식", value: "비수술 한방", caption: "한약·침·약침·추나" },
          { eyebrow: "진료 시간", value: "365일", caption: "평일·주말·공휴일" },
          { eyebrow: "치료 협력", value: "필요시 협진", caption: "영상검사 안내 가능" },
          { eyebrow: "자동차보험", value: "교통사고 진료", caption: "절차 안내 가능", accent: true },
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
        title: "통증클리닉",
        eyebrow: "PAIN CLINIC",
        items: SPINE_CATEGORY.children ?? [],
      }}
    >
      {/* Overview */}
      <Reveal as="section">
        <Eyebrow>CLINIC OVERVIEW</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          한방의 4가지 치료를 함께,<br className="hidden sm:block" />
          부위별로 맞춤 진료합니다
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원 통증클리닉은 디스크·협착증·관절 통증과 같은 척추·관절 질환을 한방 비수술
          치료로 봅니다. 증상의 표면이 아니라 원인을 함께 살피고, 한약·침·약침·추나·물리치료를
          환자 상태에 맞게 조합해 드립니다.
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
            백세한방병원 통증클리닉이 다른 점
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            통증은 한 가지 원인만 있는 경우가 드뭅니다. 자세, 근육, 신경, 생활 습관까지 함께
            살펴 종합적인 진료 계획을 세웁니다.
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
            백세한방병원의 통증 치료 방법
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
            내원부터 회복까지, 5단계 진료 과정
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
              이런 증상이 있다면 진료가 필요합니다
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
              통증으로 일상이 흔들린다면,<br />먼저 전화 한 통 부탁드립니다.
            </>
          }
          description="증상에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
