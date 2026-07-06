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
  title: "생리통·월경불순",
  description:
    "백세한방병원 생리통·월경불순 클리닉 — 원발성·속발성 생리통과 주기 이상을 어혈·기체·한증 변별로 살펴 한약·침·뜸·약침으로 다스립니다.",
  path: ROUTES.womenKids.menstruation,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.womenKids.root);

const SELF_CHECK = [
  "월경 전후 통증이 일상생활을 방해합니다",
  "월경 주기가 28일에서 자주 벗어납니다",
  "월경량이 너무 많거나 적습니다",
  "덩어리진 어혈이 자주 보입니다",
  "월경 전후 두통·소화불량·부종이 있습니다",
  "월경 직전 감정 기복이 큽니다",
  "손발이 차고 아랫배가 늘 차갑습니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "어혈·기체·한증 변별에 따라 주기별로 한약을 처방합니다." },
  { num: "02", title: "침·뜸", desc: "자궁 순환과 호르몬 균형을 다스리는 경혈을 자극합니다." },
  { num: "03", title: "약침", desc: "한약 추출액을 정밀하게 주입해 통증과 어혈을 다스립니다." },
  { num: "04", title: "생활 코칭", desc: "식이·운동·수면 가이드로 주기 안정과 통증 완화를 돕습니다." },
];

const PROCESS = [
  { num: "01", title: "월경 문진", desc: "주기·양·통증 양상과 동반 증상을 자세히 살핍니다." },
  { num: "02", title: "한방 변별", desc: "어혈·기체·한증 등 체질과 원인을 진단합니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·뜸·약침을 주기별로 진행합니다.", highlight: true },
  { num: "04", title: "주기 관리", desc: "주기 안정과 통증 완화를 정기 점검으로 안내드립니다." },
];

const SELF_CARE = [
  "아랫배를 따뜻하게 유지해 주세요",
  "찬 음식과 자극적인 음식을 피해 주세요",
  "주 3회 이상 가벼운 운동을 권해 드립니다",
  "월경 전 카페인·당분 섭취를 줄여 주세요",
  "스트레스 관리와 충분한 수면이 도움이 됩니다",
  "월경 일지로 주기·증상을 기록해 주세요",
];

const FAQS = [
  {
    question: "진통제로 잘 조절되는데 한방 치료가 필요한가요?",
    answer:
      "진통제로 일시적 완화가 되어도 매월 반복되는 통증은 체질과 자궁 환경의 신호일 수 있습니다. 근본 원인을 변별해 살피는 것이 좋습니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "주기 안정과 통증 완화를 기준으로 평균 3~6개월 단위로 진행합니다. 체질과 증상에 따라 강도를 조정해 드립니다.",
  },
  {
    question: "피임약과 한약을 함께 복용해도 되나요?",
    answer:
      "복용 중인 약이 있다면 진료 시 알려 주세요. 상호작용을 살핀 후 처방을 조정해 드립니다.",
  },
  {
    question: "월경불순이 심한데 임신 준비도 가능한가요?",
    answer:
      "주기를 안정시키는 것이 임신 준비의 첫걸음입니다. 임신 계획이 있으시다면 진료 시 함께 알려 주세요.",
  },
];

export default function MenstruationPage() {
  const ld = medicalConditionJsonLd("생리통·월경불순", [
    "맞춤 한약",
    "침 치료",
    "뜸 치료",
    "약침 치료",
  ]);

  return (
    <>
      <Script id="ld-women-menstruation" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "MENSTRUATION CARE",
          title: (
            <>
              생리통·월경불순,<br />
              <span className="text-accent-300">원인을 변별해 다스립니다</span>
            </>
          ),
          description: (
            <>
              원발성·속발성 생리통과 주기 이상을 한방 변별로 살핍니다.<br className="hidden sm:block" />
              어혈·기체·한증 변별 후 한약·침·뜸·약침을 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "여성·소아", href: ROUTES.womenKids.root },
            { label: "생리통·월경불순" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "체질 한방", caption: "어혈·기체·한증" },
            { eyebrow: "평균 기간", value: "3~6개월", caption: "주기 안정 기준" },
            { eyebrow: "권장 시기", value: "월경 전후", caption: "주기별 처방", accent: true },
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
          title: "여성·소아",
          eyebrow: "WOMEN & KIDS",
          items: CATEGORY?.children ?? [],
        }}
      >
        <Reveal as="section">
          <Eyebrow>OVERVIEW</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            생리통·월경불순이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            생리통은 원인이 명확하지 않은 원발성과, 자궁내막증 등 질환에 의한 속발성으로 구분합니다.
            월경불순은 주기·양·기간이 일정하지 않은 상태를 말하며, 호르몬·체질·생활 환경의 영향을
            함께 받습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한의학에서는 어혈·기체·한증 등으로 변별해 살핍니다. 백세한방병원은 월경 전·중·후 주기에
            맞춰 한약을 처방하고, 침·뜸·약침으로 자궁 환경과 순환을 함께 다스려 드립니다.
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
              생리통·월경불순 치료 방법
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
              내원부터 주기 관리까지, 4단계
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
              월경 자가 관리 가이드
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
                매달 반복되는 생리통,<br />원인부터 살펴보세요.
              </>
            }
            description="주기 안정과 통증 완화는 체질 변별이 출발입니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
