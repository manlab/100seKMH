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
  title: "일자목·거북목",
  description:
    "백세한방병원 일자목·거북목 클리닉 — 경추 정상 만곡 소실로 인한 목·어깨 통증과 두통을 추나·침·도수·운동으로 함께 살펴드립니다.",
  path: ROUTES.posture.forwardHead,
});

const POSTURE_CHILDREN = GNB.find((g) => g.href === ROUTES.posture.root)?.children ?? [];

const RECOMMENDED = [
  "목과 어깨에 묵직한 통증이 자주 있습니다",
  "거울을 보면 머리가 앞으로 나와 있습니다",
  "장시간 컴퓨터·스마트폰을 사용합니다",
  "두통과 눈의 피로감이 잦습니다",
  "잠자고 일어나도 목이 개운하지 않습니다",
  "팔까지 저린 증상이 가끔 있습니다",
];

const TREATMENTS = [
  { num: "01", title: "추나 요법", desc: "경추 만곡과 자세 정렬을 부드럽게 잡아드립니다." },
  { num: "02", title: "침·전기침", desc: "목·어깨 경혈을 자극해 긴장과 통증을 풀어드립니다." },
  { num: "03", title: "도수치료", desc: "굳은 근막과 깊은 근육을 단계별로 이완해드립니다." },
  { num: "04", title: "교정 운동", desc: "약해진 목·어깨 근력을 회복하는 운동을 안내합니다." },
  { num: "05", title: "맞춤 한약", desc: "근육 긴장과 만성 피로를 함께 살피는 처방입니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "통증 양상·생활 자세를 자세히 확인합니다." },
  { num: "02", title: "자세 분석", desc: "경추 정렬 측정으로 현재 상태를 평가합니다." },
  { num: "03", title: "맞춤 치료", desc: "추나·침·도수치료를 단계별로 조합합니다.", highlight: true },
  { num: "04", title: "운동 관리", desc: "교정 운동과 자세 가이드를 정기적으로 안내합니다." },
];

const SELF_CARE = [
  "스마트폰은 눈높이까지 올려서 봅니다",
  "1시간마다 일어나 목·어깨 스트레칭을 합니다",
  "모니터 높이를 눈높이에 맞춰드립니다",
  "베개 높이는 너무 높지 않게 조절합니다",
  "어깨와 등 근력 운동을 꾸준히 합니다",
  "취침 전 목 뒤·어깨 마사지가 도움됩니다",
];

const FAQS = [
  {
    question: "자세 교정에는 보통 얼마나 시간이 걸리나요?",
    answer:
      "오랜 시간 굳어진 자세이기 때문에 한두 번 치료로 완전히 바뀌기는 어렵습니다. 꾸준한 치료와 생활 속 운동을 함께하시면 단계적으로 변화하실 수 있습니다.",
  },
  {
    question: "베개는 어떤 것을 쓰는 것이 좋을까요?",
    answer:
      "너무 높거나 너무 낮은 베개는 경추에 부담을 줄 수 있습니다. 환자분 체형과 수면 자세에 맞는 베개를 진료 시 함께 안내해 드립니다.",
  },
  {
    question: "두통이 자주 있는데 일자목과 관련이 있나요?",
    answer:
      "목·어깨 근육의 만성 긴장은 두통과 어지럼을 동반하기도 합니다. 자세와 두통을 함께 살펴드리는 진료가 도움이 될 수 있습니다.",
  },
  {
    question: "치료 후에도 관리가 필요한가요?",
    answer:
      "자세 습관은 다시 굳어지기 쉬워, 치료 후에도 운동과 생활 가이드를 꾸준히 따르시는 편을 권해 드립니다. 정기적인 점검도 함께 안내드립니다.",
  },
];

export default function ForwardHeadPage() {
  permanentRedirect(ROUTES.spineJoint.chuna);

  const ld = medicalConditionJsonLd("일자목·거북목", ["추나", "침·전기침", "도수치료", "교정 운동", "한약"]);

  return (
    <>
      <Script id="ld-posture-forward-head" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "FORWARD HEAD POSTURE",
          title: (
            <>
              일자목·거북목,<br />
              <span className="text-accent-300">목 정렬부터 함께 잡아드립니다</span>
            </>
          ),
          description: (
            <>
              경추 정상 만곡 소실로 인한 목·어깨 통증과 두통을 함께 살펴드립니다.<br className="hidden sm:block" />
              추나·침·도수·운동으로 자세부터 단계적으로 회복하실 수 있도록 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "추나·교정", href: ROUTES.posture.root },
            { label: "일자목·거북목" },
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
            일자목·거북목이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            정상적인 경추는 부드러운 C자 곡선을 가지고 있습니다. 일자목·거북목은 이 곡선이 점차
            소실되어 머리가 어깨보다 앞으로 나오게 되는 자세 변화입니다. 장시간 스마트폰·컴퓨터 사용이
            대표적인 원인입니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            머리가 앞으로 나올수록 목 뒤 근육의 부담이 커지고, 이는 만성 통증·두통·어깨 결림으로
            이어질 수 있습니다. 한방에서는 추나로 정렬을 잡아드리고, 도수치료와 교정 운동으로 자세를
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
              백세한방병원의 일자목 치료 방법
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
                목·어깨 통증이 일상이 되었다면,<br />지금 바로 자세 분석을 받아보세요.
              </>
            }
            description="환자분 자세에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
