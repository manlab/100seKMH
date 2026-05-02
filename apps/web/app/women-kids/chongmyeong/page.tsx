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
  title: "총명탕",
  description:
    "백세한방병원 총명탕 — 학생·수험생을 위한 집중력·기억력 보양 한약. 체질별 총명탕과 침·약침·부항으로 학습 컨디션을 안내합니다.",
  path: ROUTES.womenKids.chongmyeong,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.womenKids.root);

const SELF_CHECK = [
  "공부할 때 집중이 잘 되지 않습니다",
  "외운 내용이 잘 기억나지 않습니다",
  "두통·눈의 피로가 자주 동반됩니다",
  "장시간 앉아 있으면 어깨·목이 아픕니다",
  "수면이 얕고 아침에 개운하지 않습니다",
  "시험 직전 긴장과 불안이 큽니다",
  "식욕이 줄고 쉽게 지칩니다",
];

const TREATMENTS = [
  { num: "01", title: "체질별 총명탕", desc: "체질과 학습 컨디션에 맞춰 보양 한약을 처방해 드립니다." },
  { num: "02", title: "침·전기침", desc: "두통·어깨 결림과 자율신경 균형을 함께 다스립니다." },
  { num: "03", title: "약침", desc: "한약 추출액을 정밀하게 주입해 회복과 컨디션을 돕습니다." },
  { num: "04", title: "부항·생활 코칭", desc: "근육 긴장을 풀고 수면·자세 가이드로 학습 일상을 안내합니다." },
];

const PROCESS = [
  { num: "01", title: "학습 문진", desc: "학습량·수면·체력 등 컨디션을 자세히 살핍니다." },
  { num: "02", title: "체질 진단", desc: "진맥과 체질 분석으로 부족한 부분을 진단합니다." },
  { num: "03", title: "맞춤 처방", desc: "총명탕과 침·약침·부항을 함께 안내합니다.", highlight: true },
  { num: "04", title: "컨디션 관리", desc: "시험 시기·학습 일정에 맞춰 정기 점검을 진행합니다." },
];

const SELF_CARE = [
  "취침·기상 시간을 일정하게 유지해 주세요",
  "공부 1시간마다 5~10분씩 일어나 움직여 주세요",
  "단백질·견과류·녹황색 채소를 충분히 드세요",
  "카페인·당분 과다 섭취를 줄여 주세요",
  "눈의 피로를 풀기 위해 먼 곳을 자주 바라봐 주세요",
  "시험 전 깊은 호흡으로 긴장을 풀어 주세요",
];

const FAQS = [
  {
    question: "총명탕은 언제부터 먹는 것이 좋나요?",
    answer:
      "큰 시험을 앞두고 있다면 2~3개월 전부터 미리 복용하시기를 권해 드립니다. 평소 학습 컨디션 관리용으로도 가능합니다.",
  },
  {
    question: "총명탕은 누구나 같은 처방인가요?",
    answer:
      "체질과 컨디션에 따라 처방이 달라집니다. 진맥과 체질 분석을 통해 맞춤 총명탕을 안내해 드립니다.",
  },
  {
    question: "어린이도 복용할 수 있나요?",
    answer:
      "초등학생 이상부터 체질 평가 후 복용이 가능합니다. 연령과 체질에 맞춰 처방을 조정해 드립니다.",
  },
  {
    question: "다른 보약과 함께 복용해도 되나요?",
    answer:
      "복용 중인 한약·영양제가 있다면 진료 시 알려 주세요. 중복을 피해 처방을 조율해 드립니다.",
  },
];

export default function ChongmyeongPage() {
  const ld = medicalConditionJsonLd("총명탕", [
    "체질별 총명탕",
    "침 치료",
    "약침 치료",
    "부항",
  ]);

  return (
    <>
      <Script id="ld-women-chongmyeong" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "CHONGMYEONG-TANG",
          title: (
            <>
              총명탕,<br />
              <span className="text-accent-300">학습 컨디션을 단단히 보양합니다</span>
            </>
          ),
          description: (
            <>
              학생·수험생을 위한 집중력·기억력 보양 한약을 안내드립니다.<br className="hidden sm:block" />
              체질별 총명탕과 침·약침·부항으로 학습 일상을 도와드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "여성·소아", href: ROUTES.womenKids.root },
            { label: "총명탕" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "체질 한방", caption: "총명탕·침·약침" },
            { eyebrow: "권장 연령", value: "초·중·고", caption: "학습기 전반" },
            { eyebrow: "권장 시기", value: "시험 2~3개월 전", caption: "사전 보양 권장", accent: true },
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
            총명탕이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            총명탕은 집중력·기억력·정신적 피로 회복을 돕는 전통 한약 처방을 토대로 한 보양 한약입니다.
            학습량이 많은 학생과 수험생, 시험을 앞둔 분들의 컨디션 관리에 도움이 됩니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            백세한방병원은 체질과 학습 환경을 함께 평가해 총명탕을 처방합니다. 침·약침·부항으로
            두통·어깨 결림·피로를 함께 다스리고, 시험 시즌 컨디션을 단단하게 도와드립니다.
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
              총명탕 치료 방법
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
              내원부터 컨디션 관리까지, 4단계
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
              학습 컨디션 가이드
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
                시험을 앞두고 컨디션이 걱정된다면,<br />체질 평가부터 시작해 보세요.
              </>
            }
            description="총명탕은 학습 컨디션을 단단히 잡아주는 든든한 동반자입니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
