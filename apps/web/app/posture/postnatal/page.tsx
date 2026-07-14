import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
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
  title: "산후 체형교정",
  description:
    "백세한방병원 산후 체형교정 — 출산 후 골반·복부·자세 변화를 산후 한약·추나·운동·도수치료로 단계적으로 함께 살펴드립니다.",
  path: ROUTES.posture.postnatal,
});

const POSTURE_CHILDREN = GNB.find((g) => g.href === ROUTES.posture.root)?.children ?? [];

const RECOMMENDED = [
  "출산 후 골반이 벌어진 느낌이 듭니다",
  "허리·골반 통증이 자주 있습니다",
  "예전 체형으로 회복이 더디게 느껴집니다",
  "복부 근력이 약해 자세 유지가 어렵습니다",
  "산후 체중·부종 관리가 필요합니다",
  "수유 중에도 안전한 한방 관리를 원합니다",
];

const TREATMENTS = [
  { num: "01", title: "산후 한약", desc: "체질·수유 여부를 고려한 회복기 한약을 처방합니다." },
  { num: "02", title: "추나 요법", desc: "출산으로 변화된 골반·척추 정렬을 부드럽게 잡아드립니다." },
  { num: "03", title: "도수치료", desc: "복부·골반 근육 회복을 단계적으로 도와드립니다." },
  { num: "04", title: "산후 운동", desc: "안전한 코어 운동으로 자세와 근력을 함께 회복합니다." },
  { num: "05", title: "정기 관리", desc: "산후 시기별 변화를 확인하며 치료를 조정해드립니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "출산 시기·수유 여부·증상을 확인합니다." },
  { num: "02", title: "체형 분석", desc: "골반·복부·자세를 측정해 현재 상태를 평가합니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·추나·도수치료를 시기에 맞춰 진행합니다.", highlight: true },
  { num: "04", title: "회복 관리", desc: "운동 가이드와 자세 관리까지 함께 안내드립니다." },
];

const SELF_CARE = [
  "수유 시 한쪽으로만 안지 않습니다",
  "허리에 무리 가지 않는 자세로 아기를 안습니다",
  "충분한 휴식과 수면으로 회복을 도와드립니다",
  "산후 시기에 맞춰 가벼운 운동을 시작합니다",
  "복부·골반 근력 회복 운동을 단계별로 합니다",
  "차가운 환경과 찬 음식은 피해주세요",
];

const FAQS = [
  {
    question: "산후 체형 관리는 언제 시작하는 게 좋나요?",
    answer:
      "분만 형태와 회복 상태에 따라 다릅니다. 일반적으로 산후 한약은 분만 직후부터, 추나·도수치료는 회복 경과를 보며 시작하시며 자세한 시기는 진료 시 안내해 드립니다.",
  },
  {
    question: "모유 수유 중에도 한약을 복용할 수 있나요?",
    answer:
      "수유 중에도 안전하게 복용 가능한 한약을 처방해 드립니다. 진료 시 수유 여부와 아기의 상태를 함께 확인 후 처방을 조정해 드립니다.",
  },
  {
    question: "제왕절개 후에도 추나 치료가 가능한가요?",
    answer:
      "제왕절개 후 회복 경과에 따라 가능 시기가 다릅니다. 수술 부위 회복을 함께 살피면서 적절한 시기에 추나 치료를 시작할 수 있도록 안내드립니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "산후 회복은 개인차가 큽니다. 첫 진료에서 출산 시기와 체형 상태를 함께 평가해 예상 일정을 안내드리며, 경과에 따라 조정해 드립니다.",
  },
];

export default function PostnatalPage() {
  permanentRedirect(ROUTES.spineJoint.chuna);

  const ld = medicalConditionJsonLd("산후 체형교정", ["산후 한약", "추나", "도수치료", "산후 운동"]);

  return (
    <>
      <Script id="ld-posture-postnatal" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "POSTNATAL CARE",
          title: (
            <>
              산후 체형교정,<br />
              <span className="text-accent-300">출산 전 자세를 함께 회복합니다</span>
            </>
          ),
          description: (
            <>
              출산 후 골반·복부·자세 변화를 시기에 맞춰 함께 살펴드립니다.<br className="hidden sm:block" />
              산후 한약·추나·운동·도수치료로 안전하고 단계적인 회복을 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "추나·교정", href: ROUTES.posture.root },
            { label: "산후 체형교정" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "한약·추나", caption: "산후 통합 관리" },
            { eyebrow: "평균 기간", value: "개인별 안내", caption: "초진 시 상담" },
            { eyebrow: "보험 적용", value: "추나 보험", caption: "연간 한도 적용" },
            { eyebrow: "진료 시간", value: "토요일", caption: "오전 진료", accent: true },
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
          title: "추나·교정",
          eyebrow: "POSTURE",
          items: POSTURE_CHILDREN,
        }}
      >
        <Reveal as="section">
          <Eyebrow>ABOUT</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            산후 체형교정이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            출산 후에는 임신 기간 동안 변화한 골반·척추·복부 근육이 서서히 제자리를 찾아갑니다. 다만
            자연 회복 과정에서 정렬이 어긋나거나 근력이 충분히 돌아오지 않으면 통증과 자세 변화로
            이어질 수 있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한방에서는 산후 한약으로 회복기 체력을 살피고, 추나로 골반·척추 정렬을 잡으며, 도수치료와
            산후 운동으로 복부·골반 근력을 단계적으로 회복하실 수 있도록 도와드립니다. 수유 중에도
            안전한 처방으로 안내드립니다.
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
              백세한방병원의 산후 교정 치료 방법
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
                산후 회복이 더디게 느껴지신다면,<br />지금 바로 산후 진료를 받아보세요.
              </>
            }
            description="출산 시기와 체형 상태에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
