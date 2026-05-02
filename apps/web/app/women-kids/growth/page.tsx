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
  title: "성장 클리닉",
  description:
    "백세한방병원 성장 클리닉 — 4-15세 한방 성장 관리. 성장 한약·침·뜸·추나로 성장기 키와 체형, 자세까지 함께 안내합니다.",
  path: ROUTES.womenKids.growth,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.womenKids.root);

const SELF_CHECK = [
  "또래보다 키가 작다고 느낍니다",
  "최근 1년 성장 속도가 더딥니다",
  "식욕이 적고 자주 배가 아픕니다",
  "수면이 얕고 자주 깹니다",
  "자세가 구부정하거나 한쪽으로 치우칩니다",
  "운동 후 회복이 더디고 쉽게 지칩니다",
  "사춘기 변화가 또래보다 빠른 듯합니다",
];

const TREATMENTS = [
  { num: "01", title: "성장 한약", desc: "비위와 신장을 보강해 성장 잠재력을 함께 끌어올리는 한약을 처방합니다." },
  { num: "02", title: "침·뜸", desc: "성장과 소화·수면 관련 경혈을 부드럽게 자극합니다." },
  { num: "03", title: "추나(자세)", desc: "성장기에 자주 나타나는 자세 불균형을 단계적으로 잡아 드립니다." },
  { num: "04", title: "생활 코칭", desc: "수면·운동·식이 가이드로 성장기 일상을 단단하게 만듭니다." },
];

const PROCESS = [
  { num: "01", title: "성장 평가", desc: "키·체중·성장 속도와 체질을 함께 살핍니다." },
  { num: "02", title: "체질·자세 진단", desc: "진맥과 자세 분석으로 성장에 영향을 주는 요인을 파악합니다." },
  { num: "03", title: "맞춤 치료", desc: "성장 한약·침·뜸·추나를 함께 진행합니다.", highlight: true },
  { num: "04", title: "성장 관리", desc: "정기 점검과 생활 가이드로 성장을 단계적으로 도와드립니다." },
];

const SELF_CARE = [
  "10시 이전 취침으로 성장 호르몬 분비를 도와주세요",
  "주 3회 이상 줄넘기·농구 등 점프 운동을 권해 드립니다",
  "단백질·칼슘·비타민D가 풍부한 식사를 권해 드립니다",
  "탄산음료·인스턴트 음식을 줄여 주세요",
  "스마트폰 사용 시간을 줄이고 자세를 바르게 해주세요",
  "햇볕을 매일 20~30분 쬐어 주세요",
];

const FAQS = [
  {
    question: "몇 살부터 성장 한약을 먹일 수 있나요?",
    answer:
      "보통 4세 이후 체질 평가를 통해 성장 한약을 시작할 수 있습니다. 성장 도약기 직전이 권장 시기입니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "평균 3~6개월 단위로 진행하며, 성장 속도와 체질에 따라 조정합니다. 정기 점검으로 변화를 확인해 드립니다.",
  },
  {
    question: "성조숙증 우려도 함께 볼 수 있나요?",
    answer:
      "사춘기 변화가 빠르게 나타난다면 진료 시 함께 살펴 드립니다. 필요 시 영상검사·협진도 안내해 드립니다.",
  },
  {
    question: "키 외에 자세도 함께 봐주시나요?",
    answer:
      "성장기에는 자세 불균형이 자주 나타납니다. 추나로 척추·골반 정렬을 함께 잡아 드립니다.",
  },
];

export default function GrowthPage() {
  const ld = medicalConditionJsonLd("성장 클리닉", [
    "성장 한약",
    "침 치료",
    "뜸 치료",
    "추나(자세)",
  ]);

  return (
    <>
      <Script id="ld-women-growth" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "GROWTH CLINIC",
          title: (
            <>
              성장기 우리 아이,<br />
              <span className="text-accent-300">한방으로 단단히 키우세요</span>
            </>
          ),
          description: (
            <>
              4-15세 한방 성장 관리로 키와 체형, 자세까지 함께 살핍니다.<br className="hidden sm:block" />
              성장 한약·침·뜸·추나와 수면·운동·식이 가이드를 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "여성·소아", href: ROUTES.womenKids.root },
            { label: "성장 클리닉" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "성장 한방", caption: "한약·침·뜸·추나" },
            { eyebrow: "권장 연령", value: "4-15세", caption: "성장기 전반" },
            { eyebrow: "권장 시기", value: "성장 도약기", caption: "초·중기 권장", accent: true },
            { eyebrow: "진료시간", value: "365일", caption: "평일·주말·공휴일" },
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
          title: "여성·소아",
          eyebrow: "WOMEN & KIDS",
          items: CATEGORY?.children ?? [],
        }}
      >
        <Reveal as="section">
          <Eyebrow>OVERVIEW</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            성장 클리닉이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            성장기는 키와 체형의 큰 변화가 일어나는 시기입니다. 충분한 영양과 수면, 운동이 중요하지만,
            체질과 자세, 소화·수면 상태가 함께 받쳐주어야 잠재력을 충분히 발휘할 수 있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한방에서는 비위·신장·골격을 함께 살피며, 성장 한약과 침·뜸·추나로 도움을 드립니다.
            백세한방병원은 4-15세 아이들에 맞춰 체질·자세·생활 습관을 함께 안내해 드립니다.
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
              성장 클리닉 치료 방법
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
              평가부터 성장 관리까지, 4단계
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
              수면·운동·식이 가이드
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
                성장기는 한 번뿐인 시기입니다.<br />지금 평가부터 시작해 보세요.
              </>
            }
            description="성장 한약과 자세 관리로 잠재력을 단단하게 키워 드립니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
