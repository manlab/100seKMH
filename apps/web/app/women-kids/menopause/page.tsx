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
  title: "갱년기",
  description:
    "백세한방병원 갱년기 클리닉 — 폐경 전후 호르몬 변화로 인한 안면홍조·불면·우울감을 한약·침·뜸·약침으로 단계별로 안내합니다.",
  path: ROUTES.womenKids.menopause,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.womenKids.root);

const SELF_CHECK = [
  "안면홍조와 발한이 자주 나타납니다",
  "잠을 깊게 자기 어렵습니다",
  "감정 기복이 심하고 우울감이 있습니다",
  "관절통·근육통이 새로 생겼습니다",
  "기억력·집중력 저하가 느껴집니다",
  "월경 주기가 불규칙해졌습니다",
  "쉽게 피로하고 회복이 더딥니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "음허·기허·간울 등 변별에 따라 호르몬 변화기 균형을 회복하도록 처방합니다." },
  { num: "02", title: "침·뜸", desc: "자율신경과 순환의 균형을 다스리는 경혈을 자극합니다." },
  { num: "03", title: "약침", desc: "한약 추출액을 정밀하게 주입해 안면홍조·통증·수면을 함께 살핍니다." },
  { num: "04", title: "생활 코칭", desc: "식이·운동·수면 가이드로 변화기 일상을 단단하게 만듭니다." },
];

const PROCESS = [
  { num: "01", title: "갱년기 문진", desc: "증상의 양상과 일상 영향도를 자세히 살핍니다." },
  { num: "02", title: "한방 변별", desc: "체질·진맥으로 음허·기허·간울 등을 진단합니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·뜸·약침을 함께 진행합니다.", highlight: true },
  { num: "04", title: "균형 관리", desc: "단계 변화를 점검하며 처방과 가이드를 조정해 드립니다." },
];

const SELF_CARE = [
  "수면 시간을 일정하게 유지해 주세요",
  "주 3회 이상 걷기·요가 등 가벼운 운동을 권해 드립니다",
  "콩·견과류·녹황색 채소를 충분히 섭취해 주세요",
  "카페인·과음·매운 음식은 줄여 주세요",
  "스트레스 관리를 위한 호흡·명상이 도움이 됩니다",
  "감정 변화는 가까운 분과 자주 나눠 주세요",
];

const FAQS = [
  {
    question: "호르몬 치료와 한방 치료를 함께 받을 수 있나요?",
    answer:
      "복용 중인 약이 있다면 진료 시 알려 주세요. 상호작용을 살핀 후 한약 복용 시점을 조율해 드립니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "평균 3~6개월 단위로 진행하며, 단계 변화에 따라 처방을 조정합니다. 증상 완화 정도에 맞춰 강도를 조절합니다.",
  },
  {
    question: "폐경 전부터 시작해도 되나요?",
    answer:
      "폐경 전 변화기부터 한방 관리를 시작하시면, 증상 발현을 줄이는 데 도움이 됩니다. 진료를 통해 시점을 안내해 드립니다.",
  },
  {
    question: "갱년기 우울감도 한방으로 도움이 되나요?",
    answer:
      "한약과 침으로 자율신경 균형과 마음의 안정을 함께 다스릴 수 있습니다. 필요 시 협진도 안내해 드립니다.",
  },
];

export default function MenopausePage() {
  const ld = medicalConditionJsonLd("갱년기", [
    "맞춤 한약",
    "침 치료",
    "뜸 치료",
    "약침 치료",
  ]);

  return (
    <>
      <Script id="ld-women-menopause" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "MENOPAUSE CARE",
          title: (
            <>
              갱년기,<br />
              <span className="text-accent-300">몸과 마음의 변화를 함께 다스립니다</span>
            </>
          ),
          description: (
            <>
              폐경 전후 호르몬 변화로 나타나는 다양한 증상을 살핍니다.<br className="hidden sm:block" />
              한약·침·뜸·약침과 생활 가이드로 균형을 회복해 드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "여성·소아", href: ROUTES.womenKids.root },
            { label: "갱년기" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "체질 한방", caption: "한약·침·뜸·약침" },
            { eyebrow: "평균 기간", value: "3~6개월", caption: "단계별 안내" },
            { eyebrow: "변화 단계", value: "폐경 전·중·후", caption: "시기별 처방", accent: true },
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
            갱년기란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            갱년기는 폐경을 전후한 시기로, 여성호르몬 변화와 함께 안면홍조·발한·불면·우울감·관절통
            등이 나타나는 시기입니다. 개인마다 시작 시기와 증상이 다르며, 일상에 큰 영향을 줄 수
            있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한의학에서는 갱년기를 음허·기허·간울 등으로 변별합니다. 백세한방병원은 한약을 중심으로
            침·뜸·약침을 함께 적용해 호르몬 변화기에 맞는 균형을 회복하도록 도와드립니다.
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
              갱년기 치료 방법
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
              내원부터 균형 관리까지, 4단계
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
              갱년기 자가 관리 가이드
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
                갱년기 변화로 일상이 흔들린다면,<br />균형 회복부터 시작해 보세요.
              </>
            }
            description="갱년기는 단계별 한방 관리가 큰 도움이 될 수 있습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
