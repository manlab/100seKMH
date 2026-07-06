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
  title: "골반·휜다리",
  description:
    "백세한방병원 골반·휜다리 클리닉 — 골반 비대칭과 하지 정렬 변형으로 인한 자세·통증 문제를 추나·약침·도수·운동으로 함께 살펴드립니다.",
  path: ROUTES.posture.pelvis,
});

const POSTURE_CHILDREN = GNB.find((g) => g.href === ROUTES.posture.root)?.children ?? [];

const RECOMMENDED = [
  "다리 길이가 좌우 다르게 느껴집니다",
  "걸을 때 무게 중심이 한쪽으로 쏠립니다",
  "오래 앉으면 골반이 무겁고 불편합니다",
  "신발 한쪽이 더 빨리 닳습니다",
  "다리가 휘어 보인다는 말을 듣습니다",
  "허리·무릎 통증이 자주 반복됩니다",
];

const TREATMENTS = [
  { num: "01", title: "추나 요법", desc: "비뚤어진 골반과 하지 정렬을 부드럽게 잡아드립니다." },
  { num: "02", title: "약침 요법", desc: "골반 주변 근막과 인대 긴장을 정밀하게 살펴드립니다." },
  { num: "03", title: "도수치료", desc: "골반·고관절 근육을 단계별로 이완해 균형을 회복합니다." },
  { num: "04", title: "교정 운동", desc: "골반·하지 안정화 운동으로 자세를 함께 유지합니다." },
  { num: "05", title: "체형 분석", desc: "정기 측정으로 변화를 확인하며 운동을 조정합니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "자세·생활 습관·통증 양상을 확인합니다." },
  { num: "02", title: "체형 분석", desc: "골반·하지 정렬을 측정해 현재 상태를 평가합니다." },
  { num: "03", title: "맞춤 치료", desc: "추나·약침·도수치료를 단계별로 조합합니다.", highlight: true },
  { num: "04", title: "정기 관리", desc: "교정 운동과 자세 변화를 함께 점검해드립니다." },
];

const SELF_CARE = [
  "다리를 꼬는 자세는 피해주세요",
  "오래 앉을 때 양쪽 균형을 잡고 앉습니다",
  "걸을 때 보폭과 좌우 균형을 의식합니다",
  "고관절·골반 스트레칭을 매일 합니다",
  "허벅지 안쪽·둔부 근력 운동을 합니다",
  "무거운 짐은 양쪽으로 균형 있게 듭니다",
];

const FAQS = [
  {
    question: "임신·출산 후 골반은 회복될 수 있나요?",
    answer:
      "출산 후 골반은 시간이 지나면서 자연 회복되지만, 이전 상태로 완전히 돌아오기 위해서는 자세·근력 관리가 함께 필요합니다. 산후 시기에 맞춰 진료를 안내드립니다.",
  },
  {
    question: "운동만으로도 교정이 가능한가요?",
    answer:
      "운동은 매우 중요하지만, 이미 굳어진 정렬은 추나·도수치료의 도움을 함께 받으시면 더 효율적입니다. 진료를 통해 현재 상태를 함께 평가해 드립니다.",
  },
  {
    question: "성인 휜다리도 교정이 가능한가요?",
    answer:
      "휜다리의 원인과 정도에 따라 다릅니다. 근육·관절 정렬 문제로 인한 경우 추나·운동치료로 자세 균형을 함께 회복하실 수 있습니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "체형 변형의 정도와 연령에 따라 다릅니다. 첫 진료에서 예상 일정과 빈도를 안내드리며, 변화에 따라 조정해 드립니다.",
  },
];

export default function PelvisPage() {
  const ld = medicalConditionJsonLd("골반·휜다리", ["추나", "약침", "도수치료", "교정 운동"]);

  return (
    <>
      <Script id="ld-posture-pelvis" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "PELVIS & LEG ALIGNMENT",
          title: (
            <>
              골반·휜다리,<br />
              <span className="text-accent-300">정렬과 균형을 함께 잡아드립니다</span>
            </>
          ),
          description: (
            <>
              골반 비대칭과 하지 정렬 변형으로 인한 자세·통증 문제를 함께 살펴드립니다.<br className="hidden sm:block" />
              추나·약침·도수·운동치료로 균형 잡힌 자세를 단계적으로 회복하실 수 있도록 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "추나·교정", href: ROUTES.posture.root },
            { label: "골반·휜다리" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "추나·도수", caption: "한방 통합" },
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
            골반·휜다리란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            골반 비대칭은 골반의 좌우 높이나 기울기가 균형을 잃은 상태이며, 휜다리는 무릎과 발의
            정렬이 정상에서 벗어난 상태를 말합니다. 잘못된 자세, 출산, 좌우 비대칭 동작 같은 다양한
            원인으로 발생합니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            골반과 다리의 정렬은 척추·무릎·발목까지 이어지는 전체 자세의 기본이 됩니다. 한방에서는
            추나로 정렬을 잡고, 약침과 도수치료로 주변 근육 긴장을 살피며, 운동치료로 안정성을
            단계적으로 회복하실 수 있도록 도와드립니다.
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
              백세한방병원의 골반·휜다리 치료 방법
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
                골반과 다리의 균형이 신경 쓰이신다면,<br />지금 바로 체형 분석을 받아보세요.
              </>
            }
            description="환자분 정렬 상태에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
