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
  title: "수족냉증",
  description:
    "백세한방병원 수족냉증 클리닉 — 말초 순환·기허·양허로 인한 손발 차가움을 보양 한약·뜸·침·약침으로 다스립니다.",
  path: ROUTES.immunity.coldHandFoot,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.immunity.root);

const SELF_CHECK = [
  "여름에도 손발이 차갑게 느껴집니다",
  "추운 곳에 가면 손발이 더 시립니다",
  "손발 저림·통증이 자주 동반됩니다",
  "생리통·생리불순이 함께 나타납니다",
  "쉽게 지치고 추위를 많이 탑니다",
  "소화가 잘 안 되고 배가 차갑습니다",
  "수면 시 손발이 차서 잠들기 어렵습니다",
];

const TREATMENTS = [
  { num: "01", title: "보양 한약", desc: "양기와 순환을 함께 보충하는 체질 맞춤 한약을 처방합니다." },
  { num: "02", title: "뜸 치료", desc: "복부·하지 경혈에 뜸을 떠서 양기와 순환을 끌어올립니다." },
  { num: "03", title: "침·전기침", desc: "말초 순환과 자율신경 균형을 다스려 손발 온도를 회복시킵니다." },
  { num: "04", title: "약침", desc: "한약 추출액을 정밀하게 주입해 순환과 회복을 함께 돕습니다." },
];

const PROCESS = [
  { num: "01", title: "문진·체질 진단", desc: "냉증의 양상과 동반 증상을 함께 살핍니다." },
  { num: "02", title: "한방 변별", desc: "진맥과 체질 분석으로 원인을 파악합니다." },
  { num: "03", title: "맞춤 치료", desc: "보양 한약·뜸·침·약침을 함께 진행합니다.", highlight: true },
  { num: "04", title: "회복·관리", desc: "운동·식이·반신욕 가이드를 함께 안내드립니다." },
];

const SELF_CARE = [
  "주 2~3회 반신욕으로 하체를 따뜻하게 해주세요",
  "찬 음식과 차가운 음료를 줄여 주세요",
  "복부와 하체를 보온할 수 있는 옷을 권해 드립니다",
  "주 3회 이상 걷기 운동으로 순환을 도와주세요",
  "꽉 끼는 양말·신발은 피해 주세요",
  "스트레칭으로 어깨·골반의 긴장을 풀어 주세요",
];

const FAQS = [
  {
    question: "수족냉증은 병이 아닌 체질 아닌가요?",
    answer:
      "체질적 요인도 있지만, 일상생활에 불편을 줄 정도라면 진료가 필요합니다. 호르몬·자율신경 변화나 다른 질환의 신호일 수도 있습니다.",
  },
  {
    question: "여성에게 더 흔한 이유가 있나요?",
    answer:
      "여성은 근육량이 적고 호르몬 변화가 크기 때문에 수족냉증을 더 많이 호소합니다. 한방에서는 체질·생리 패턴과 함께 살핍니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "체질과 증상 정도에 따라 다르며, 평균 2~4개월 단위로 진행합니다. 계절에 따라 처방과 강도를 조정해 드립니다.",
  },
  {
    question: "운동만으로도 좋아질 수 있나요?",
    answer:
      "운동은 큰 도움이 되지만, 양허·기허 등 체질적 원인이 있다면 한약 보양과 함께할 때 회복이 더 빠릅니다.",
  },
];

export default function ColdHandFootPage() {
  const ld = medicalConditionJsonLd("수족냉증", [
    "보양 한약",
    "뜸 치료",
    "침 치료",
    "약침 치료",
  ]);

  return (
    <>
      <Script id="ld-immunity-cold" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "COLD HAND & FOOT",
          title: (
            <>
              손발이 차다면,<br />
              <span className="text-accent-300">순환과 양기를 함께 채워 보세요</span>
            </>
          ),
          description: (
            <>
              말초 순환 저하와 기허·양허로 인한 수족냉증을 다스립니다.<br className="hidden sm:block" />
              보양 한약·뜸·침·약침과 생활 가이드를 함께 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "면역·만성", href: ROUTES.immunity.root },
            { label: "수족냉증" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "보양 한방", caption: "한약·뜸·침·약침" },
            { eyebrow: "평균 기간", value: "2~4개월", caption: "체질·증상별 차이" },
            { eyebrow: "한방 진단", value: "기허·양허", caption: "체질별 변별", accent: true },
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
            수족냉증이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            수족냉증은 외부 온도와 무관하게 손발이 차가운 상태가 지속되는 증상을 말합니다. 단순한
            추위가 아니라 말초 순환 저하나 자율신경 불균형, 호르몬 변화 등이 원인일 수 있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한의학에서는 수족냉증을 기허·양허·혈허로 변별해 봅니다. 백세한방병원은 보양 한약을
            중심으로 뜸·침·약침을 함께 사용해 양기와 순환을 회복하도록 도와드립니다.
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
              수족냉증 치료 방법
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
              운동·식이·반신욕 가이드
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
                손발이 시린 일상이 불편하다면,<br />순환과 양기를 함께 채워 보세요.
              </>
            }
            description="수족냉증은 체질 보강과 생활 관리가 함께 가는 것이 좋습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
