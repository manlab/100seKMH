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
  title: "교통사고 후유증",
  description:
    "백세한방병원 교통사고 후유증 — 외상 직후의 통증과 자율신경계 증상까지. 한약·침·약침·추나·도수치료를 자동차보험으로 안내합니다.",
  path: ROUTES.accident.aftercare,
});

const ACCIDENT_CATEGORY = GNB.find((g) => g.href === ROUTES.accident.root);

const SELF_CHECK = [
  "사고 이후 목·허리 통증이 가시지 않습니다",
  "두통·어지러움·이명이 새로 생겼습니다",
  "팔다리 저림·감각 둔화가 반복됩니다",
  "잠을 자도 피로가 풀리지 않습니다",
  "사고 장면이 떠올라 불안하거나 잠들기 어렵습니다",
  "외상이 보이지 않지만 몸이 무겁습니다",
  "기존 통증이 사고 이후 더 심해졌습니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "어혈을 풀고 회복을 돕는 처방으로, 사고 직후·회복기 단계별로 안내드립니다." },
  { num: "02", title: "침·전기침", desc: "긴장된 근육과 통증 신호를 함께 다스려 일상 회복을 돕습니다." },
  { num: "03", title: "약침·봉침", desc: "한약 추출액을 정밀하게 주입해 염증과 근막 긴장을 직접 풀어드립니다." },
  { num: "04", title: "추나·도수치료", desc: "사고 충격으로 틀어진 척추·골반의 정렬을 단계적으로 잡아드립니다." },
  { num: "05", title: "물리치료", desc: "온열·전기·견인 등 보조요법으로 한방 치료의 효과를 함께 끌어올립니다." },
  { num: "06", title: "심신 안정 관리", desc: "수면·불안 증상이 함께 있는 경우 한약과 침으로 안정 회복을 돕습니다." },
];

const PROCESS = [
  { num: "01", title: "내원·접수", desc: "사고 접수번호와 보험사 정보를 가지고 내원해 주세요." },
  { num: "02", title: "정밀 진단", desc: "문진·진맥·자세 분석으로 후유 증상을 함께 살핍니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·약침·추나를 환자 상태에 맞춰 진행합니다.", highlight: true },
  { num: "04", title: "사후 관리", desc: "회복 단계에 따라 자세·생활 가이드를 함께 안내드립니다." },
];

const SELF_CARE = [
  "사고 직후에는 무리한 운동·스트레칭을 피해 주세요",
  "통증이 있는 부위는 따뜻하게 유지해 주세요",
  "수분을 충분히 섭취해 어혈 순환을 도와주세요",
  "장시간 같은 자세를 피하고 자주 자세를 바꿔주세요",
  "수면 시간을 일정하게 유지해 자율신경 회복을 도와주세요",
  "불안·놀람이 있다면 가까운 분과 충분히 대화를 나눠 주세요",
];

const FAQS = [
  {
    question: "합의 후에도 한방 치료를 받을 수 있나요?",
    answer:
      "합의가 종료된 이후에는 자동차보험 적용이 제한될 수 있습니다. 다만 본인 또는 실손보험으로 치료를 이어가시는 분들도 많습니다. 합의 전 충분한 회복 기간을 확보하시기를 권해 드립니다.",
  },
  {
    question: "외상이 보이지 않는데 치료가 필요할까요?",
    answer:
      "가벼운 추돌이라도 근육·인대·자율신경에는 충격이 전달됩니다. 며칠 뒤 통증이나 두통·어지러움이 나타나는 경우가 많아, 사고 직후 진료를 받아 보시는 편을 권해 드립니다.",
  },
  {
    question: "한약 처방도 자동차보험으로 가능한가요?",
    answer:
      "교통사고 후유증의 경우 첩약·탕약 등 한약 처방도 자동차보험 적용 범위에 포함됩니다. 진료 후 본인 부담금 없이 안내받으실 수 있도록 자세히 설명드립니다.",
  },
  {
    question: "치료 기간은 보통 얼마나 걸리나요?",
    answer:
      "사고 충격의 정도와 후유 증상에 따라 차이가 있습니다. 첫 진료에서 예상 치료 기간과 빈도를 함께 안내드리며, 경과에 따라 강도를 조정해 드립니다.",
  },
  {
    question: "입원 치료가 필요한 경우는 어떤 경우인가요?",
    answer:
      "통증이 심해 일상생활이 어려운 경우, 두통·어지러움·수면 장애가 함께 있는 경우 입원 치료를 권해 드릴 수 있습니다. 입원 시스템 페이지에서 자세한 안내를 확인하실 수 있습니다.",
  },
];

export default function AccidentAftercarePage() {
  const ld = medicalConditionJsonLd("교통사고 후유증", [
    "한약",
    "침·전기침",
    "약침·봉침",
    "추나·도수치료",
    "물리치료",
  ]);

  return (
    <>
      <Script id="ld-accident-aftercare" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "ACCIDENT AFTERCARE",
          title: (
            <>
              교통사고 후유증,<br />
              <span className="text-accent-300">한방 통합 치료로 회복합니다</span>
            </>
          ),
          description: (
            <>
              사고 직후부터 회복기까지, 외상 통증과 자율신경계 증상을 함께 살핍니다.<br className="hidden sm:block" />
              자동차보험 안내까지 한자리에서 도와드리겠습니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "교통사고", href: ROUTES.accident.root },
            { label: "교통사고 후유증" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "비수술 한방", caption: "한약·침·약침·추나" },
            { eyebrow: "평균 기간", value: "2~6주", caption: "증상별 차이 있음" },
            { eyebrow: "보험", value: "자동차보험", caption: "본인 부담금 0원", accent: true },
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
          title: "교통사고",
          eyebrow: "ACCIDENT CARE",
          items: ACCIDENT_CATEGORY?.children ?? [],
        }}
      >
        <Reveal as="section">
          <Eyebrow>OVERVIEW</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            교통사고 후유증이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            교통사고 후유증은 사고 당시 외상으로 끝나는 것이 아니라, 시간이 지나면서 통증·두통·
            어지러움·자율신경계 증상으로 나타나는 경우가 많습니다. 외상이 가볍더라도 척추·근막·
            신경계에 받은 충격은 점차 일상으로 드러나기 때문입니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한방에서는 사고로 인한 어혈을 풀고, 긴장된 근육과 자율신경의 균형을 회복하는 데 중점을
            둡니다. 백세한방병원은 한약·침·약침·추나·도수치료를 통합적으로 제공하며, 자동차보험
            적용 절차까지 한자리에서 안내해 드립니다.
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
              한방 통합 치료 방법
            </h2>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              내원부터 회복까지, 4단계 절차
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
              회복기 자가 관리 가이드
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
                교통사고 직후라면,<br />지금 바로 진료 상담을 받아 보세요.
              </>
            }
            description="자동차보험 절차부터 한방 통합 치료까지, 한자리에서 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
