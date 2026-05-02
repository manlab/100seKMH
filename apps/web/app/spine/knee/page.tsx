import type { Metadata } from "next";
import Script from "next/script";
import { ArrowRight, Phone } from "lucide-react";
import { medicalConditionJsonLd, pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "무릎관절통",
  description:
    "백세한방병원 무릎 클리닉 — 퇴행성 관절염, 연골 마모로 인한 무릎 통증을 한약·약침·봉침·도수치료로 함께 살펴드립니다.",
  path: ROUTES.spine.knee,
});

const SPINE_CHILDREN = GNB.find((g) => g.href === ROUTES.spine.root)?.children ?? [];

const RECOMMENDED = [
  "계단을 오르내릴 때 무릎이 시큰합니다",
  "쪼그려 앉기·일어서기가 어렵습니다",
  "걷고 난 뒤 무릎이 붓고 뻣뻣합니다",
  "무릎에서 마찰음·소리가 자주 납니다",
  "오래 서 있으면 무릎이 무겁습니다",
  "수술 전 한방 보존 치료를 받고 싶습니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "관절 염증과 노화로 인한 약화를 함께 살피는 처방입니다." },
  { num: "02", title: "약침·봉침", desc: "무릎 관절 부위 염증을 정밀하게 살펴드립니다." },
  { num: "03", title: "침·전기침", desc: "무릎 주변 경혈 자극으로 통증과 부종을 완화합니다." },
  { num: "04", title: "추나·도수치료", desc: "골반·다리 정렬을 함께 잡아 무릎 부담을 줄여드립니다." },
  { num: "05", title: "운동·재활", desc: "허벅지 근력 강화로 무릎 부담을 단계별로 줄여드립니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "통증 양상·생활 동작을 자세히 확인합니다." },
  { num: "02", title: "정밀 진단", desc: "관절 검사와 필요 시 영상 검사를 안내드립니다." },
  { num: "03", title: "맞춤 치료", desc: "약침·봉침·도수치료를 단계별로 진행합니다.", highlight: true },
  { num: "04", title: "회복 관리", desc: "근력 운동 가이드와 재발 예방까지 안내드립니다." },
];

const SELF_CARE = [
  "체중 관리로 무릎 부담을 줄여드립니다",
  "걷기·수영 등 무릎에 충격이 적은 운동을 권합니다",
  "장시간 쪼그려 앉는 자세는 피해주세요",
  "허벅지 앞뒤 근력 운동을 꾸준히 합니다",
  "차가운 환경에 무릎이 노출되지 않게 합니다",
  "통증이 심한 시기엔 무릎 보호대 활용이 도움됩니다",
];

const FAQS = [
  {
    question: "인공관절 수술 외에 다른 방법이 있을까요?",
    answer:
      "관절염의 정도에 따라 다릅니다. 보존 단계에서는 약침·봉침·한약·도수치료 같은 한방 비수술 치료를 통해 통증을 살펴드릴 수 있습니다.",
  },
  {
    question: "운동은 어떻게 하는 것이 좋을까요?",
    answer:
      "무릎에 충격이 적은 걷기·수영·실내 자전거를 권해 드립니다. 통증이 심한 시기에는 운동 강도를 줄이고 진료 시 단계별 가이드를 안내드립니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "관절염 정도와 통증에 따라 다릅니다. 첫 진료에서 예상 치료 일정과 빈도를 안내드리며 경과에 따라 조정해 드립니다.",
  },
  {
    question: "한약 복용 중에 다른 약과 같이 먹어도 되나요?",
    answer:
      "현재 복용 중인 약을 진료 시 알려주세요. 약물 간 상호작용을 고려해 한약 처방을 조정하거나 복용 시간을 안내해 드립니다.",
  },
];

export default function KneePage() {
  const ld = medicalConditionJsonLd("무릎관절통", ["한약", "약침", "봉침", "침·전기침", "추나", "도수치료"]);

  return (
    <>
      <Script id="ld-spine-knee" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "KNEE CLINIC",
          title: (
            <>
              무릎관절통,<br />
              <span className="text-accent-300">한방 비수술로 함께 살펴드립니다</span>
            </>
          ),
          description: (
            <>
              퇴행성 관절염과 연골 마모로 인한 무릎 통증을 함께 살펴드립니다.<br className="hidden sm:block" />
              한약·약침·봉침·도수치료로 일상의 보행과 활동을 회복하실 수 있도록 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "통증클리닉", href: ROUTES.spine.root },
            { label: "무릎관절통" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "비수술 한방", caption: "약침·봉침·도수" },
            { eyebrow: "평균 기간", value: "개인별 안내", caption: "초진 시 상담" },
            { eyebrow: "보험 적용", value: "일부 가능", caption: "비급여 별도" },
            { eyebrow: "진료 시간", value: "365일", caption: "주말·공휴일 진료", accent: true },
          ],
          actions: (
            <>
              <Button href="#treatment" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                치료 방법 보기 <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
                <Phone size={16} aria-hidden="true" />
                전화 상담
              </Button>
            </>
          ),
        }}
        lnb={{
          title: "통증클리닉",
          eyebrow: "PAIN CLINIC",
          items: SPINE_CHILDREN,
        }}
      >
        <Reveal as="section">
          <Eyebrow>ABOUT</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            무릎관절통이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            무릎관절통은 노화로 연골이 마모되거나 관절 주변 인대·근육이 약해져 발생하는 통증입니다.
            계단 통증, 쪼그려 앉기 어려움, 무릎이 붓는 증상이 대표적이며 일상 동작에 큰 불편을 줄 수
            있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            방치하면 관절 변형까지 이어질 수 있어 적절한 시기에 치료를 시작하는 것이 좋습니다.
            한방에서는 약침·봉침으로 염증을 살피고, 도수치료와 운동 재활로 무릎 주변 근력을 함께
            회복하실 수 있도록 도와드립니다.
          </p>
        </Reveal>

        <Reveal as="section">
          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
            <header className="mb-5 lg:mb-6">
              <Eyebrow>RECOMMENDED FOR</Eyebrow>
              <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
                이런 분들께 추천드립니다
              </h2>
            </header>
            <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
              {RECOMMENDED.map((s, i) => (
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

        <span id="treatment" className="block scroll-mt-24" aria-hidden="true" />
        <Reveal as="section">
          <header className="mb-7 lg:mb-9">
            <Eyebrow>TREATMENT</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              백세한방병원의 무릎 치료 방법
            </h2>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TREATMENTS.map((t) => (
              <article key={t.num} className="rounded-2xl border border-neutral-200 bg-white p-5 lg:p-6 hover:border-primary-200 transition-colors">
                <span className="text-[11px] tracking-[0.18em] font-semibold text-accent-600 tabular">METHOD {t.num}</span>
                <h3 className="mt-2 text-[17px] font-bold text-primary-700">{t.title}</h3>
                <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{t.desc}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal as="section">
          <header className="mb-8 lg:mb-10">
            <Eyebrow>PROCESS</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              치료·관리 4단계
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
          <header className="mb-6">
            <Eyebrow>SELF-CARE</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              생활 속 자가 관리
            </h2>
          </header>
          <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            {SELF_CARE.map((s, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl bg-white border border-neutral-200 p-4 text-[14px] text-neutral-700">
                <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 text-primary-600 font-bold tabular text-[12px]">
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
                무릎 통증으로 일상이 불편하시다면,<br />지금 바로 상담받아보세요.
              </>
            }
            description="환자분 무릎 상태에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
