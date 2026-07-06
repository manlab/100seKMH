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
  title: "척추측만증",
  description:
    "백세한방병원 척추측만증 클리닉 — 어깨·골반 비대칭과 자세 변형을 추나·운동·한약·슬링으로 함께 살펴 자세를 단계적으로 잡아드립니다.",
  path: ROUTES.posture.scoliosis,
});

const POSTURE_CHILDREN = GNB.find((g) => g.href === ROUTES.posture.root)?.children ?? [];

const RECOMMENDED = [
  "어깨 높이가 좌우 다르다는 말을 듣습니다",
  "치마·바지가 한쪽으로 돌아가곤 합니다",
  "골반·등의 좌우 비대칭이 보입니다",
  "허리·등 통증이 자주 반복됩니다",
  "사진을 찍으면 몸이 기울어 보입니다",
  "성장기 자녀의 자세가 걱정됩니다",
];

const TREATMENTS = [
  { num: "01", title: "추나 요법", desc: "비뚤어진 척추 정렬을 부드럽게 잡아드립니다." },
  { num: "02", title: "교정 운동", desc: "약화된 근육을 강화해 자세를 안정적으로 잡아드립니다." },
  { num: "03", title: "슬링·도수치료", desc: "체간 안정화 운동으로 좌우 균형을 회복하실 수 있도록 합니다." },
  { num: "04", title: "맞춤 한약", desc: "성장기·체질에 맞춰 근골격을 함께 살피는 처방입니다." },
  { num: "05", title: "자세 분석", desc: "체형 측정으로 변화를 정기적으로 확인해드립니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "발견 시기·증상·생활 자세를 확인합니다." },
  { num: "02", title: "체형 분석", desc: "자세 분석과 필요 시 영상 검사를 안내드립니다." },
  { num: "03", title: "맞춤 치료", desc: "추나·운동·도수치료를 단계별로 조합합니다.", highlight: true },
  { num: "04", title: "정기 관리", desc: "체형 변화를 정기 점검하며 운동을 조정해드립니다." },
];

const SELF_CARE = [
  "한쪽으로 무거운 가방을 메지 않습니다",
  "다리를 꼬는 자세는 피해주세요",
  "오래 앉을 때 양쪽 균형을 잡고 앉습니다",
  "스마트폰은 눈높이까지 올려 사용합니다",
  "코어·등 근력 운동을 꾸준히 합니다",
  "자기 전 좌우 균형 스트레칭을 함께 합니다",
];

const FAQS = [
  {
    question: "청소년기에 발견하면 어떻게 관리해야 하나요?",
    answer:
      "성장기는 자세 변화가 빠른 시기입니다. 정기적인 체형 분석과 함께 추나·운동치료로 진행 정도를 살피고, 필요 시 영상 검사도 함께 안내드립니다.",
  },
  {
    question: "보조기를 꼭 착용해야 하나요?",
    answer:
      "측만증의 각도와 진행 속도, 성장 단계에 따라 다릅니다. 영상 검사 결과를 바탕으로 적절한 관리 방법을 함께 상담해 드립니다.",
  },
  {
    question: "성인이 된 후에도 교정이 가능한가요?",
    answer:
      "성인은 척추 변화 속도가 느려지지만, 자세·근육 균형은 꾸준한 관리로 개선할 수 있습니다. 통증과 자세 불편을 함께 살펴드립니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "측만 정도와 연령에 따라 다릅니다. 첫 진료에서 예상 치료 일정을 안내드리며, 정기적으로 변화를 확인하면서 조정해 드립니다.",
  },
];

export default function ScoliosisPage() {
  const ld = medicalConditionJsonLd("척추측만증", ["추나", "교정 운동", "슬링치료", "도수치료", "한약"]);

  return (
    <>
      <Script id="ld-posture-scoliosis" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "SCOLIOSIS",
          title: (
            <>
              척추측만증,<br />
              <span className="text-accent-300">자세부터 함께 잡아드립니다</span>
            </>
          ),
          description: (
            <>
              어깨·골반 비대칭과 척추 측방 만곡을 함께 살펴드립니다.<br className="hidden sm:block" />
              추나·운동·한약·슬링치료로 자세를 단계적으로 회복하실 수 있도록 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "추나·교정", href: ROUTES.posture.root },
            { label: "척추측만증" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "추나·운동", caption: "한방 통합" },
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
            척추측만증이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            척추측만증은 척추가 정상 정렬에서 벗어나 옆으로 휘어진 상태를 말합니다. 어깨와 골반의
            높이 차이, 등의 비대칭이 대표적인 외형 변화이며, 진행 정도에 따라 통증·피로감으로 이어질
            수 있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            특히 성장기에는 변화가 빨라 정기 점검이 중요합니다. 한방에서는 추나로 척추 정렬을
            잡아드리고, 교정 운동과 슬링·도수치료로 좌우 근력의 균형을 단계별로 회복하실 수 있도록
            도와드립니다.
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
              백세한방병원의 측만증 치료 방법
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
                자세의 비대칭이 신경 쓰이신다면,<br />지금 바로 체형 분석을 받아보세요.
              </>
            }
            description="측만 정도와 연령에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
