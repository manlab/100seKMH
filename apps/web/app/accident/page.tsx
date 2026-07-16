import type { Metadata } from "next";
import Image from "next/image";
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
  title: "교통사고 한방치료",
  description:
    "백세한방병원 교통사고 한방 진료 안내 — 사고 후 목·허리 통증, 두통, 손저림, 외상 후 피로 등 후유 증상을 확인하고 자동차보험 절차를 안내합니다.",
  path: "/accident",
});

const ACCIDENT_CATEGORY = GNB.find((g) => g.href === "/accident")!;

const SYMPTOMS = [
  { label: "목·허리 통증", href: ROUTES.accident.aftercare },
  { label: "두통·어지럼", href: ROUTES.accident.aftercare },
  { label: "손저림", href: ROUTES.accident.aftercare },
  { label: "흉통", href: ROUTES.accident.aftercare },
  { label: "어깨결림", href: ROUTES.accident.aftercare },
  { label: "외상 후 피로", href: ROUTES.accident.aftercare },
  { label: "수면장애", href: ROUTES.accident.aftercare },
  { label: "외상 후 트라우마", href: ROUTES.accident.aftercare },
];

const USPS = [
  {
    Icon: Activity,
    title: "자동차보험 진료",
    desc: "사고 접수번호와 보험사 정보를 확인한 뒤 자동차보험 한방 진료 절차를 안내드립니다.",
  },
  {
    Icon: Layers,
    title: "한방 통증 관리",
    desc: "한약·침·약침·추나·물리치료 등 현재 상태에 맞는 진료 방향을 함께 살핍니다.",
  },
  {
    Icon: Clock,
    title: "입원 상담 안내",
    desc: "통원이 어렵거나 집중 진료가 필요한 경우, 진료 후 입원 필요 여부와 일정을 안내드립니다.",
  },
  {
    Icon: Shield,
    title: "보험사 절차 안내",
    desc: "접수·합의·서류 발급까지 보험사와의 절차를 환자분께서 헤매지 않도록 안내해 드립니다.",
  },
];

const TREATMENTS = [
  { num: "01", title: "한약", desc: "체질과 현재 증상을 확인한 뒤 필요한 처방 방향을 안내합니다." },
  { num: "02", title: "침·약침", desc: "통증 부위와 몸 상태를 함께 살펴 필요한 치료 계획을 세웁니다." },
  { num: "03", title: "추나", desc: "사고 이후 불편한 움직임과 자세 변화를 확인해 진료합니다." },
  { num: "04", title: "물리·도수", desc: "근육 긴장과 일상 움직임의 불편을 함께 확인합니다." },
];

const PROCESS = [
  {
    num: "01",
    title: "내원·접수",
    desc: "사고 접수번호와 보험사 정보를 확인합니다.",
    image: "/images/renewal/supplied/reception-direction-hero.webp",
  },
  {
    num: "02",
    title: "상태 확인",
    desc: "사고 경위, 현재 증상, 기존 병력을 함께 살핍니다.",
    image: "/images/renewal/supplied/back-consultation.webp",
  },
  {
    num: "03",
    title: "진료 계획 안내",
    desc: "한약·침·약침·추나 등 필요한 진료 방향을 안내합니다.",
    highlight: true,
    image: "/images/renewal/supplied/chuna-treatment-hero.webp",
  },
  {
    num: "04",
    title: "경과 확인",
    desc: "진료 중 느끼는 변화와 불편을 계속 확인합니다.",
    image: "/images/renewal/supplied/xray-room-hero.webp",
  },
  {
    num: "05",
    title: "생활 관리",
    desc: "일상 복귀 과정에서 필요한 자세·생활 안내를 제공합니다.",
    image: "/images/renewal/generated/walking-recovery.webp",
  },
];

const SELF_CHECK = [
  "사고 후 며칠이 지나도 통증이 가라앉지 않습니다",
  "목을 돌리거나 허리를 숙이기 어렵습니다",
  "두통·어지럼이 자주 반복됩니다",
  "팔·손이 저리고 감각이 둔합니다",
  "잠을 자도 피로가 풀리지 않습니다",
  "사고 장면이 떠올라 마음이 불편합니다",
];

const FAQS = [
  {
    question: "자동차보험으로 한약 처방도 받을 수 있나요?",
    answer:
      "교통사고 후유증의 경우 자동차보험 적용으로 첩약(한약) 처방이 가능합니다. 처방 횟수·기간은 적응증과 보험사 기준에 따라 안내드립니다.",
  },
  {
    question: "보험 합의 후에도 치료받을 수 있나요?",
    answer:
      "원칙적으로 합의 이후에는 자동차보험 적용이 어렵습니다. 다만 합의 전 충분한 치료를 받으시는 편을 권해 드리며, 합의 시점은 보험사·담당자와 상의 후 결정하셔야 합니다.",
  },
  {
    question: "입원 치료는 어떻게 진행되나요?",
    answer:
      "통증이 심하거나 통원이 어려운 경우 진료 후 입원 필요 여부를 함께 확인합니다. 입원 상담과 일정은 현재 상태와 병동 상황에 따라 안내드립니다.",
  },
  {
    question: "보험사 처리는 어떻게 시작하나요?",
    answer:
      "사고 접수번호와 보험사 정보를 가지고 내원해 주시면, 병원에서 보험사로 청구 절차를 진행합니다. 절차가 처음이라 어려우시다면 전화로 안내받으실 수 있습니다.",
  },
  {
    question: "외상이 없는데 치료가 필요한가요?",
    answer:
      "사고 직후에는 외상이 없어 보여도, 며칠 뒤부터 목·허리 통증, 두통, 어지럼 같은 후유증이 나타날 수 있습니다. 증상이 가벼울 때 진료를 시작하시는 편을 권해 드립니다.",
  },
];

export default function AccidentPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "TRAFFIC ACCIDENT CARE",
        title: (
          <>
            교통사고 후유증,<br />
            <span className="text-accent-300">현재 증상부터 함께 확인합니다</span>
          </>
        ),
        description: (
          <>
            사고 직후의 통증부터 시간이 지나 나타나는 후유 증상까지<br className="hidden sm:block" />
            현재 상태와 자동차보험 절차를 함께 확인해 안내드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "진료안내" },
          { label: "교통사고" },
        ],
        image: {
          src: "/images/renewal/generated/traffic-accident-care-hero.webp",
          position: "center",
        },
        stats: [
          { eyebrow: "보험 처리", value: "자동차보험", caption: "절차 안내" },
          { eyebrow: "진료 시간", value: "월-토", caption: "토요일 오전" },
          { eyebrow: "입원", value: "상담 안내", caption: "진료 후 확인" },
          { eyebrow: "절차 안내", value: "직접 안내", caption: "접수·서류 도움", accent: true },
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
        title: "교통사고",
        eyebrow: "ACCIDENT CARE",
        items: ACCIDENT_CATEGORY.children ?? [],
      }}
    >
      {/* Overview */}
      <Reveal as="section">
        <Eyebrow>CLINIC OVERVIEW</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          사고 직후부터 회복기까지,<br className="hidden sm:block" />
          한방 진료로 함께 봅니다
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원은 교통사고 후 나타나는 통증과 후유 증상을 한방 진료로 함께 살핍니다.
          사고 접수번호와 보험사 정보를 확인한 뒤, 현재 불편과 생활 상황에 맞춰 필요한 진료 방향을
          안내드립니다.
        </p>

        <div id="symptoms" className="mt-7 lg:mt-9">
          <h3 className="text-[14px] font-semibold text-primary-600 mb-3">함께 확인하는 증상</h3>
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
            백세한방병원의 교통사고 진료 안내
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            교통사고는 통증뿐 아니라 보험 처리, 입원 상담, 생활 관리 안내가 함께 필요한 경우가 많습니다.
            처음 오시는 분도 절차를 이해하실 수 있도록 차근차근 안내드립니다.
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
            백세한방병원의 교통사고 한방 치료
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
            접수부터 사후 관리까지, 5단계 진료 과정
          </h2>
        </header>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          {PROCESS.map((p) => (
            <li key={p.num} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
              <div className="relative aspect-[4/3] bg-primary-50">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span
                  className={
                    "absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-white tabular text-[15px] font-bold " +
                    (p.highlight ? "bg-[#0F3866]" : "bg-primary-500")
                  }
                >
                  {p.num}
                </span>
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="text-[16px] font-bold text-primary-700">{p.title}</h3>
                <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{p.desc}</p>
              </div>
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
              이런 신호가 있다면 진료가 필요합니다
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
              사고 후 불편이 남아 있다면,<br />진료 상담을 받아보세요.
            </>
          }
          description="자동차보험 처리 절차와 진료 일정을 현재 상황에 맞춰 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
