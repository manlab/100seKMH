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
  title: "만성피로",
  description:
    "백세한방병원 만성피로 클리닉 — 6개월 이상 지속되는 피로를 한의학 허증(기허·혈허·음허·양허) 변별로 살펴, 보양 한약·침·뜸·약침으로 회복을 돕습니다.",
  path: ROUTES.immunity.fatigue,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.immunity.root);

const SELF_CHECK = [
  "충분히 자도 아침에 개운하지 않습니다",
  "오후가 되면 무기력하고 졸음이 쏟아집니다",
  "사소한 일에도 쉽게 지치고 회복이 더딥니다",
  "집중력·기억력이 떨어진 듯합니다",
  "잔병치레가 잦고 면역이 약해진 느낌입니다",
  "근육통·관절통이 자주 동반됩니다",
  "수면이 얕아지고 자주 깹니다",
];

const TREATMENTS = [
  { num: "01", title: "보양 한약", desc: "허증을 변별해 기·혈·음·양 각각을 보충하는 맞춤 한약을 처방합니다." },
  { num: "02", title: "침·뜸", desc: "장부 기능과 순환을 함께 다스려 회복 속도를 끌어올립니다." },
  { num: "03", title: "약침", desc: "보양 한약 추출액을 정밀하게 주입해 피로 회복을 돕습니다." },
  { num: "04", title: "생활 관리", desc: "수면·식이·운동 가이드를 함께 제공해 재발을 줄여 드립니다." },
];

const PROCESS = [
  { num: "01", title: "문진·체질 진단", desc: "피로의 양상과 동반 증상을 자세히 살펴봅니다." },
  { num: "02", title: "허증 변별", desc: "진맥과 체질 분석으로 부족한 부분을 파악합니다." },
  { num: "03", title: "맞춤 치료", desc: "보양 한약·침·뜸·약침을 함께 진행합니다.", highlight: true },
  { num: "04", title: "회복 관리", desc: "체력 회복을 점검하며 생활 가이드를 안내드립니다." },
];

const SELF_CARE = [
  "수면 시간을 일정하게 유지해 주세요",
  "아침에는 가벼운 햇볕을 쬐어 주세요",
  "단백질·미네랄이 풍부한 식사를 권해 드립니다",
  "주 3회 이상 가벼운 유산소 운동을 권해 드립니다",
  "카페인·과음을 줄여 수면 질을 높여 주세요",
  "스트레스 관리를 위해 짧은 휴식을 자주 가져 주세요",
];

const FAQS = [
  {
    question: "단순 피로와 만성피로는 어떻게 구분하나요?",
    answer:
      "충분한 휴식에도 6개월 이상 회복되지 않고, 일상생활에 지장을 주는 정도가 지속되면 만성피로 가능성이 높습니다. 진료를 통해 정확히 살펴 드립니다.",
  },
  {
    question: "보약과는 어떻게 다른가요?",
    answer:
      "보약은 체질 보강을 위한 일반 처방이며, 만성피로 한약은 부족한 허증을 정확히 변별해 처방합니다. 단순 보약과 달리 증상별 맞춤이 핵심입니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "허증의 정도와 동반 증상에 따라 다르며, 평균 2~4개월 단위로 진행합니다. 경과에 따라 처방과 강도를 조정해 드립니다.",
  },
  {
    question: "양방 검사에서 이상이 없는데도 피로한 경우는?",
    answer:
      "혈액·내분비 검사에서 이상이 없어도 한의학적 허증으로 설명되는 경우가 많습니다. 한방 진료로 별도 변별을 받아 보시기를 권해 드립니다.",
  },
];

export default function FatiguePage() {
  const ld = medicalConditionJsonLd("만성피로", [
    "보양 한약",
    "침 치료",
    "뜸 치료",
    "약침 치료",
  ]);

  return (
    <>
      <Script id="ld-immunity-fatigue" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "CHRONIC FATIGUE",
          title: (
            <>
              만성피로,<br />
              <span className="text-accent-300">허증을 채워 회복합니다</span>
            </>
          ),
          description: (
            <>
              6개월 이상 지속되는 피로를 한의학 허증 변별로 살핍니다.<br className="hidden sm:block" />
              보양 한약·침·뜸·약침으로 체력 회복까지 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "면역·만성", href: ROUTES.immunity.root },
            { label: "만성피로" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "보양 한방", caption: "허증별 맞춤 처방" },
            { eyebrow: "평균 기간", value: "2~4개월", caption: "체질·증상별 차이" },
            { eyebrow: "한방 변별", value: "4가지 허증", caption: "기·혈·음·양", accent: true },
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
          title: "면역·만성",
          eyebrow: "IMMUNITY CARE",
          items: CATEGORY?.children ?? [],
        }}
      >
        <Reveal as="section">
          <Eyebrow>OVERVIEW</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            만성피로란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            만성피로는 충분한 휴식에도 회복되지 않는 피로가 6개월 이상 지속되는 상태를 말합니다.
            단순 피로감뿐 아니라 집중력 저하·근육통·수면 장애·소화 불량 등이 함께 나타날 수 있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한의학에서는 허증을 기허·혈허·음허·양허로 변별해 살핍니다. 백세한방병원은 진맥과 문진으로
            부족한 부분을 정확히 파악한 뒤, 보양 한약을 중심으로 침·뜸·약침을 함께 안내해 드립니다.
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
              만성피로 치료 방법
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
              내원부터 회복까지, 4단계
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
              회복을 돕는 자가 관리
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
                이유 없는 피로가 지속된다면,<br />허증 변별부터 받아 보세요.
              </>
            }
            description="만성피로는 부족한 곳을 정확히 채우는 것이 회복의 시작입니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
