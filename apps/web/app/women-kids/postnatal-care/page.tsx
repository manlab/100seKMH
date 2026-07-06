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
  title: "산후조리",
  description:
    "백세한방병원 산후조리 클리닉 — 출산 후 어혈을 다스리고 회복을 돕는 산후 한약·침·뜸·추나로 산모의 건강과 체형 회복을 안내합니다.",
  path: ROUTES.womenKids.postnatalCare,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.womenKids.root);

const SELF_CHECK = [
  "출산 후 부종이 잘 가라앉지 않습니다",
  "허리·골반 통증이 지속됩니다",
  "수유로 인한 피로와 손목 통증이 있습니다",
  "체형 변화·뱃살이 회복되지 않습니다",
  "오로(惡露)가 길게 이어집니다",
  "수면 부족으로 회복이 더딥니다",
  "감정 기복이 크고 산후 우울감이 있습니다",
];

const TREATMENTS = [
  { num: "01", title: "산후 한약", desc: "어혈 → 회복 → 보양 단계별로 산후 회복에 맞춰 한약을 처방합니다." },
  { num: "02", title: "침·뜸", desc: "복부·하지·골반 경혈을 자극해 회복과 순환을 돕습니다." },
  { num: "03", title: "추나(체형)", desc: "출산으로 벌어진 골반과 변화된 체형 정렬을 단계적으로 잡아 드립니다." },
  { num: "04", title: "통증 관리", desc: "손목·허리·어깨 등 산후 통증을 침·약침으로 함께 다스립니다." },
];

const PROCESS = [
  { num: "01", title: "산후 문진", desc: "출산 형태·회복 정도·동반 증상을 함께 살핍니다." },
  { num: "02", title: "단계 평가", desc: "어혈 단계 / 회복 단계 / 보양 단계를 진단해 드립니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·뜸·추나를 단계에 맞춰 진행합니다.", highlight: true },
  { num: "04", title: "회복 관리", desc: "체형·통증 회복까지 정기 점검으로 안내드립니다." },
];

const SELF_CARE = [
  "출산 후 무리한 활동·다이어트는 피해 주세요",
  "찬 바람과 찬 음식을 피해 주세요",
  "충분한 수면과 휴식을 우선해 주세요",
  "수유 시 바른 자세로 손목·어깨를 보호해 주세요",
  "가벼운 산후 스트레칭부터 시작해 주세요",
  "수분과 단백질을 충분히 섭취해 주세요",
];

const FAQS = [
  {
    question: "산후조리 한약은 언제 시작하는 것이 좋나요?",
    answer:
      "보통 출산 후 2~3주부터 어혈 단계 한약을 시작하시며, 회복 정도에 따라 단계를 조정합니다. 진료 후 정확한 시점을 안내드립니다.",
  },
  {
    question: "모유 수유 중에도 한약을 복용할 수 있나요?",
    answer:
      "수유 중에 안전하게 복용 가능한 한약을 처방해 드립니다. 진료 시 수유 여부를 알려 주시면 처방을 조정합니다.",
  },
  {
    question: "제왕절개도 산후조리가 필요한가요?",
    answer:
      "제왕절개도 어혈과 회복 관리는 동일하게 필요합니다. 수술 부위 회복 정도를 확인한 후 단계별로 진행해 드립니다.",
  },
  {
    question: "산후 추나는 언제부터 가능한가요?",
    answer:
      "보통 출산 후 4~6주 이후부터 골반·체형 추나를 시작합니다. 회복 상태에 따라 시점을 조정해 드립니다.",
  },
  {
    question: "산후 우울감도 한방으로 도움이 되나요?",
    answer:
      "한약과 침으로 마음의 안정과 수면 회복을 함께 다스릴 수 있습니다. 필요시 협진도 안내해 드립니다.",
  },
];

export default function PostnatalCarePage() {
  const ld = medicalConditionJsonLd("산후조리", [
    "산후 한약",
    "침 치료",
    "뜸 치료",
    "추나(체형)",
  ]);

  return (
    <>
      <Script id="ld-women-postnatal" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "POSTNATAL CARE",
          title: (
            <>
              산후조리,<br />
              <span className="text-accent-300">회복부터 체형까지 한자리에서</span>
            </>
          ),
          description: (
            <>
              출산 후 어혈을 다스리고 보양으로 회복을 단단하게 도와드립니다.<br className="hidden sm:block" />
              산후 한약·침·뜸·추나로 산모의 건강과 체형까지 함께 봅니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "여성·소아", href: ROUTES.womenKids.root },
            { label: "산후조리" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "산후 한방", caption: "어혈→회복→보양" },
            { eyebrow: "권장 시기", value: "출산 후 2~3주", caption: "회복기 권장", accent: true },
            { eyebrow: "평균 기간", value: "1~3개월", caption: "단계별 진행" },
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
            산후조리란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            산후조리는 출산 후 어혈을 풀고 부족해진 기·혈을 보충해 산모의 몸을 회복시키는 한방
            관리 과정입니다. 적절한 시기에 시작하면 산후 부종·통증·체형 변화 등을 함께 다스릴 수
            있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            백세한방병원은 출산 직후 어혈 단계, 회복 단계, 보양 단계로 구분해 산후 한약을 처방합니다.
            침·뜸으로 회복을 돕고, 추나로 골반·체형 정렬까지 단계적으로 살펴 드립니다.
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
              산후조리 치료 방법
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
              내원부터 회복 관리까지, 4단계
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
              산후 자가 관리 가이드
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
                출산 후 회복이 더디다면,<br />단계별 산후조리부터 시작하세요.
              </>
            }
            description="산후조리는 회복기 시점을 놓치지 않는 것이 중요합니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
