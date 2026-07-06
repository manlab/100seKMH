import type { Metadata } from "next";
import Script from "next/script";
import { ArrowRight, Phone } from "lucide-react";
import { pageMeta, medicalConditionJsonLd } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "비염·천식",
  description:
    "백세한방병원 비염·천식 클리닉 — 알레르기·만성 염증으로 인한 콧물·코막힘·기침을 체질 한약·침·뜸·약침으로 다스립니다.",
  path: ROUTES.immunity.rhinitis,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.immunity.root);

const SELF_CHECK = [
  "맑은 콧물·재채기가 환절기마다 반복됩니다",
  "코막힘으로 잠을 깊게 자기 어렵습니다",
  "기침이 2주 이상 가시지 않습니다",
  "찬바람·먼지에 코·기관지가 민감합니다",
  "두통·집중력 저하가 함께 나타납니다",
  "약을 끊으면 다시 증상이 생깁니다",
  "감기에 자주 걸리고 회복이 더딥니다",
];

const TREATMENTS = [
  { num: "01", title: "체질 한약", desc: "체질·증상에 맞춰 면역과 호흡기를 조화롭게 다스리는 한약을 처방합니다." },
  { num: "02", title: "침·뜸", desc: "코·기관지·폐 경혈을 자극해 만성 염증과 점막 기능을 다스립니다." },
  { num: "03", title: "약침", desc: "한약 추출액을 정밀하게 주입해 코점막·기관지의 염증을 완화합니다." },
  { num: "04", title: "환경·생활 관리", desc: "환절기 식이·수면·운동 가이드로 재발 위험을 줄여 드립니다." },
];

const PROCESS = [
  { num: "01", title: "문진·체질 판단", desc: "증상·과거력·생활 환경을 함께 살펴봅니다." },
  { num: "02", title: "정밀 진단", desc: "진맥·체질 분석으로 면역 균형을 평가합니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·뜸·약침을 환자 상태에 맞춰 진행합니다.", highlight: true },
  { num: "04", title: "재발 관리", desc: "계절·환경 변화에 맞춰 사후 관리 가이드를 안내드립니다." },
];

const SELF_CARE = [
  "실내 온도와 습도를 일정하게 유지해 주세요",
  "환절기에는 따뜻한 물을 자주 드셔 주세요",
  "찬 음식·자극적인 음식을 피해 주세요",
  "주 2~3회 이상 가벼운 유산소 운동을 권해 드립니다",
  "수면 시간을 규칙적으로 유지해 면역 회복을 도와주세요",
  "외출 후에는 코 세척과 손 씻기를 꼭 해주세요",
];

const FAQS = [
  {
    question: "한약 치료 기간은 얼마나 걸리나요?",
    answer:
      "보통 3~6개월 단위로 체질 한약을 복용하시며, 증상 완화 정도와 계절 변화에 따라 조정합니다. 첫 진료 시 예상 기간을 함께 안내드립니다.",
  },
  {
    question: "어린이도 한방 치료가 가능한가요?",
    answer:
      "소아 비염·천식은 체질 한약과 침·뜸을 함께 사용해 부드럽게 다스릴 수 있습니다. 연령과 증상에 맞춰 처방을 조정해 드립니다.",
  },
  {
    question: "양약과 함께 복용해도 되나요?",
    answer:
      "이미 복용 중인 약이 있으시다면 진료 시 함께 알려 주세요. 상호작용을 살핀 후 한약 복용 시점을 조율해 드립니다.",
  },
  {
    question: "환절기 외에도 치료가 필요한가요?",
    answer:
      "환절기 직전 1~2개월 전부터 미리 체질 한약을 복용하시면 발현을 줄이는 데 도움이 됩니다. 평소 체질 관리를 꾸준히 권해 드립니다.",
  },
  {
    question: "비염과 천식은 함께 치료할 수 있나요?",
    answer:
      "비염과 천식은 같은 호흡기·면역 계통의 문제로 자주 동반됩니다. 한방에서는 두 증상을 함께 살피며 통합적으로 치료합니다.",
  },
];

export default function RhinitisPage() {
  const ld = medicalConditionJsonLd("비염·천식", [
    "체질 한약",
    "침 치료",
    "뜸 치료",
    "약침 치료",
  ]);

  return (
    <>
      <Script id="ld-immunity-rhinitis" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "RHINITIS & ASTHMA",
          title: (
            <>
              비염·천식,<br />
              <span className="text-accent-300">체질부터 다스리는 한방 치료</span>
            </>
          ),
          description: (
            <>
              만성 염증과 면역 균형을 함께 살펴, 환절기마다 반복되는 증상을 다스립니다.<br className="hidden sm:block" />
              체질 한약·침·뜸·약침을 통합적으로 안내해 드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "면역·만성", href: ROUTES.immunity.root },
            { label: "비염·천식" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "체질 한방", caption: "한약·침·뜸·약침" },
            { eyebrow: "평균 기간", value: "3~6개월", caption: "체질·증상별 차이" },
            { eyebrow: "권장 시기", value: "환절기 전", caption: "예방 관리 가능", accent: true },
            { eyebrow: "진료시간", value: "월-토", caption: "토요일 오전" },
          ],
          actions: (
            <>
              <Button href="#treatment" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                치료 방법 보기 <ArrowRight size={16} aria-hidden="true" />
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
          eyebrow: "IMMUNITY CARE",
          items: CATEGORY?.children ?? [],
        }}
      >
        <Reveal as="section">
          <Eyebrow>OVERVIEW</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            비염·천식이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            비염은 코점막의 만성 염증으로 콧물·재채기·코막힘이 반복되는 질환입니다. 천식은 기관지가
            예민해져 기침·호흡곤란이 발생하는 만성 염증성 질환으로, 두 가지가 함께 나타나는 경우가
            많습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한방에서는 폐·비위 기능과 면역 균형을 함께 살피는 체질 진료를 진행합니다. 백세한방병원은
            체질 한약을 중심으로 침·뜸·약침을 통합 적용하고, 환절기 관리까지 함께 안내해 드립니다.
          </p>
        </Reveal>

        <Reveal as="section">
          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
            <header className="mb-5 lg:mb-6">
              <Eyebrow>SELF CHECK</Eyebrow>
              <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
                이런 분들께 추천드립니다
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

        <Reveal as="section">
          <header id="treatment" className="mb-7 lg:mb-9">
            <Eyebrow>TREATMENT</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              비염·천식 치료 방법
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

        <Reveal as="section">
          <header className="mb-8 lg:mb-10">
            <Eyebrow>CARE PROCESS</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              내원부터 재발 관리까지, 4단계
            </h2>
          </header>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
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

        <Reveal as="section">
          <header className="mb-6 lg:mb-7">
            <Eyebrow>SELF CARE</Eyebrow>
            <h2 className="mt-2 text-[24px] lg:text-[28px] font-bold text-primary-700 leading-snug">
              환절기 자가 관리 가이드
            </h2>
          </header>
          <ul className="grid sm:grid-cols-2 gap-3">
            {SELF_CARE.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] lg:text-[15px] text-neutral-700">
                <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary-100 text-primary-600 text-[12px] font-bold tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section">
          <header className="mb-7 lg:mb-9">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              자주 묻는 질문
            </h2>
          </header>
          <FaqAccordion items={FAQS} />
        </Reveal>

        <Reveal as="section">
          <InContentCta
            title={
              <>
                환절기마다 반복되는 증상,<br />체질부터 다스려 보세요.
              </>
            }
            description="비염·천식은 평소 체질 관리가 중요합니다. 진료 상담으로 시작해 보세요."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
