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
  title: "추나·체형교정",
  description:
    "백세한방병원 추나·체형교정 클리닉 — 척추측만증, 일자목·거북목, 골반비대칭, 산후 체형까지. 한방 추나·약침으로 자세를 바로잡습니다.",
  path: "/posture",
});

const POSTURE_CATEGORY = GNB.find((g) => g.href === "/posture")!;

const SYMPTOMS = [
  { label: "척추측만증", href: ROUTES.posture.scoliosis },
  { label: "일자목", href: ROUTES.posture.forwardHead },
  { label: "거북목", href: ROUTES.posture.forwardHead },
  { label: "골반비대칭", href: ROUTES.posture.pelvis },
  { label: "휜다리(O·X자)", href: ROUTES.posture.pelvis },
  { label: "산후 체형", href: ROUTES.posture.postnatal },
  { label: "자세 불균형", href: ROUTES.posture.forwardHead },
  { label: "어깨 비대칭", href: ROUTES.posture.scoliosis },
];

const USPS = [
  {
    Icon: Activity,
    title: "정밀 자세 진단",
    desc: "전신 자세·골반 정렬·근육 긴장도를 함께 살펴보고, 체형 변화의 원인을 찾는 데 집중합니다. 단순 교정이 아닌 분석 기반의 진료 계획을 세웁니다.",
  },
  {
    Icon: Layers,
    title: "한방 추나·약침",
    desc: "정규 교육과정을 이수한 한의사가 추나(밀고 당기는 수기치료)와 약침을 함께 진행해 자세와 근막을 부드럽게 정돈합니다.",
  },
  {
    Icon: Clock,
    title: "단계별 교정 계획",
    desc: "한 번의 시술이 아닌 단계별 교정 일정을 안내드립니다. 변화에 맞춰 강도를 조절해 무리 없이 진행하실 수 있습니다.",
  },
  {
    Icon: Shield,
    title: "사후 자세 관리",
    desc: "교정 이후에도 일상에서 유지할 수 있는 자세 습관과 운동 가이드를 함께 안내합니다. 변화가 오래 유지되도록 도와드립니다.",
  },
];

const TREATMENTS = [
  { num: "01", title: "한약", desc: "체질·증상에 맞춰 처방. 근골격 회복과 부종·통증 완화를 함께 봅니다." },
  { num: "02", title: "추나", desc: "정규 추나요법으로 척추·골반·관절 정렬을 단계적으로 잡아드립니다." },
  { num: "03", title: "약침", desc: "한약 추출액을 정밀 주입해 굳어진 근막과 통증 부위를 부드럽게 풀어드립니다." },
  { num: "04", title: "운동·도수치료", desc: "교정 효과를 유지하기 위한 운동 동작과 도수치료를 함께 안내합니다." },
];

const PROCESS = [
  { num: "01", title: "접수·문진", desc: "자세 변화 시점·생활 습관·통증 여부를 먼저 살펴봅니다." },
  { num: "02", title: "정밀 진단", desc: "체형 분석·정렬 평가, 필요한 경우 영상검사를 안내드립니다." },
  { num: "03", title: "맞춤 교정", desc: "추나·약침·한약을 환자 상태에 맞춰 단계별로 조합합니다.", highlight: true },
  { num: "04", title: "경과 점검", desc: "정기적으로 자세 변화를 확인하고 강도를 조절해 드립니다." },
  { num: "05", title: "사후 관리", desc: "유지 운동·생활 자세 가이드 안내, 재발 위험을 줄여드립니다." },
];

const SELF_CHECK = [
  "거울로 보면 어깨 높이가 다릅니다",
  "오래 앉아 있으면 목·허리가 자주 아픕니다",
  "신발 한쪽 굽이 유난히 빨리 닳습니다",
  "허리띠 위치가 좌우 다르게 느껴집니다",
  "산후 체형이 회복되지 않습니다",
  "사진에서 머리가 앞으로 나와 보입니다",
];

const FAQS = [
  {
    question: "추나요법이란 무엇인가요?",
    answer:
      "추나는 한의사가 손이나 신체 일부를 이용해 척추·관절·근막을 밀고 당겨 정렬을 잡는 한방 수기치료입니다. 정규 교육과정을 이수한 한의사가 진행합니다.",
  },
  {
    question: "추나요법은 건강보험이 적용되나요?",
    answer:
      "추나요법 일부는 건강보험 급여 항목으로 적용됩니다. 적응증·횟수에 따라 본인부담률이 달라질 수 있어, 진료 시 비용 안내를 함께 받으실 수 있습니다.",
  },
  {
    question: "치료 중 통증이 있나요?",
    answer:
      "환자 상태와 부위에 따라 자극의 정도가 다릅니다. 무리한 강도가 아닌 환자가 견딜 수 있는 범위에서 단계적으로 진행하므로, 통증이 심하다면 바로 알려주시면 됩니다.",
  },
  {
    question: "몇 회 정도 받아야 하나요?",
    answer:
      "교정 목표와 상태에 따라 다릅니다. 첫 진료에서 예상 횟수와 빈도를 함께 안내드리며, 경과에 따라 조정해 드립니다.",
  },
  {
    question: "임산부도 받을 수 있나요?",
    answer:
      "임신 시기와 산모 상태에 따라 가능 여부가 달라집니다. 임신 중·산후 회복기 환자분께서는 미리 상담을 통해 안전한 시점·방법을 안내받으시는 편을 권해 드립니다.",
  },
];

export default function PosturePage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "POSTURE & ALIGNMENT CLINIC",
        title: (
          <>
            틀어진 자세를<br />
            <span className="text-accent-300">단계별로 바로잡습니다</span>
          </>
        ),
        description: (
          <>
            정밀 자세 진단부터 한방 추나·약침, 사후 운동 관리까지.<br className="hidden sm:block" />
            무리 없는 단계적 교정으로 변화를 오래 유지할 수 있도록 안내드리겠습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "진료안내" },
          { label: "추나·교정" },
        ],
        stats: [
          { eyebrow: "치료 방식", value: "한방 추나", caption: "정규 추나요법" },
          { eyebrow: "진료 시간", value: "월-토", caption: "토요일 오전" },
          { eyebrow: "진단 방식", value: "체형 분석", caption: "정렬·근막 평가" },
          { eyebrow: "보험 적용", value: "추나 급여", caption: "적응증 기준 적용", accent: true },
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
        title: "추나·교정",
        eyebrow: "POSTURE CLINIC",
        items: POSTURE_CATEGORY.children ?? [],
      }}
    >
      {/* Overview */}
      <Reveal as="section">
        <Eyebrow>CLINIC OVERVIEW</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          틀어진 정렬을 단계별로,<br className="hidden sm:block" />
          무리 없이 바로잡습니다
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원 추나·체형교정 클리닉은 척추측만증·일자목·골반 비대칭·산후 체형 같은
          정렬 문제를 한방 비수술 치료로 봅니다. 표면적인 자세가 아니라 원인을 함께 살피고,
          한약·추나·약침·운동치료를 환자 상태에 맞게 조합해 드립니다.
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
            백세한방병원 추나·교정 클리닉이 다른 점
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            자세 변화는 한 번의 시술로 끝나지 않습니다. 정밀 진단부터 사후 관리까지
            단계별로 함께 진행해야 변화가 오래 유지됩니다.
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
            백세한방병원의 추나·교정 치료 방법
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
              이런 신호가 있다면 자세 진료가 필요합니다
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
              자세가 신경 쓰인다면,<br />먼저 전화 한 통 부탁드립니다.
            </>
          }
          description="진료 가능 일정과 추나·약침 절차를 함께 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
