import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import Script from "next/script";
import { ArrowRight, Phone, Activity, Layers, Clock, Shield } from "lucide-react";
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
  title: "디스크 (목·허리)",
  description:
    "백세한방병원 디스크 클리닉 — 목·허리 추간판 탈출, 신경 압박으로 인한 저린 증상과 방사통을 한약·약침·추나·봉침·물리치료로 살펴드립니다.",
  path: ROUTES.spine.disc,
});

const SPINE_CHILDREN = GNB.find((g) => g.href === ROUTES.spine.root)?.children ?? [];

const RECOMMENDED = [
  "목·허리 통증이 2주 이상 가라앉지 않습니다",
  "팔이나 다리로 저림·방사통이 내려옵니다",
  "기침·재채기 시 허리 통증이 심해집니다",
  "오래 앉아 있거나 서 있기가 어렵습니다",
  "특정 자세에서 손·발 감각이 둔합니다",
  "수술 외 한방 비수술 치료를 원합니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "체질·증상에 맞춰 처방해 염증과 통증을 함께 살펴드립니다." },
  { num: "02", title: "약침·봉침", desc: "정제된 한약 추출액을 정밀하게 주입해 염증을 완화합니다." },
  { num: "03", title: "추나 요법", desc: "비뚤어진 척추 정렬을 부드럽게 잡아 신경 압박을 줄여드립니다." },
  { num: "04", title: "침·전기침", desc: "통증 부위 경혈을 자극해 근육 긴장과 통증 신호를 풀어드립니다." },
  { num: "05", title: "물리·도수치료", desc: "근막과 인대를 이완해 회복 속도를 함께 끌어올려드립니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "통증 양상·생활 습관을 자세히 살펴드립니다." },
  { num: "02", title: "정밀 진단", desc: "자세 분석과 진맥, 필요 시 영상검사를 안내드립니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·약침·추나를 단계별로 조합해 진행합니다.", highlight: true },
  { num: "04", title: "회복 관리", desc: "경과를 정기 점검하고 재발 예방까지 도와드립니다." },
];

const SELF_CARE = [
  "장시간 같은 자세를 피하고 1시간마다 일어납니다",
  "허리 베개·바른 의자로 척추 곡선을 지켜드립니다",
  "무거운 물건은 무릎을 굽혀 들어올립니다",
  "걷기·수영 등 가벼운 유산소 운동을 꾸준히 합니다",
  "복부·둔부 코어 근육을 강화해드립니다",
  "급성기에는 무리한 스트레칭을 피해주세요",
];

const FAQS = [
  {
    question: "수술하지 않고 한방 치료만으로 좋아질 수 있나요?",
    answer:
      "신경 마비나 대소변 장애 같은 응급 소견이 없는 경우, 한방 비수술 치료로 증상을 살펴드릴 수 있습니다. 환자 상태에 따라 치료 계획을 안내해 드립니다.",
  },
  {
    question: "MRI 검사가 꼭 필요한가요?",
    answer:
      "초진 진찰과 자세 분석으로 1차 평가를 진행합니다. 필요하다고 판단될 경우 영상 검사를 받을 수 있도록 안내해 드립니다.",
  },
  {
    question: "치료 기간은 보통 어느 정도인가요?",
    answer:
      "급성기·만성기 여부와 증상 정도에 따라 다릅니다. 첫 진료에서 예상 치료 기간과 빈도를 안내드리고, 경과에 따라 조정해 드립니다.",
  },
  {
    question: "치료받는 동안 일상생활이나 운동은 가능한가요?",
    answer:
      "치료 시기에 맞춰 가능한 활동 범위를 안내해 드립니다. 초기에는 휴식과 자세 관리를 우선하고, 회복기에는 단계별 운동을 함께 권해 드립니다.",
  },
];

export default function DiscPage() {
  permanentRedirect(ROUTES.spineJoint.disc);

  const ld = medicalConditionJsonLd("디스크 (목·허리)", [
    "한약",
    "약침",
    "봉침",
    "추나",
    "침·전기침",
    "물리치료",
  ]);

  return (
    <>
      <Script id="ld-spine-disc" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "DISC CLINIC",
          title: (
            <>
              목·허리 디스크,<br />
              <span className="text-accent-300">한방 비수술로 살펴드립니다</span>
            </>
          ),
          description: (
            <>
              추간판 탈출과 신경 압박으로 인한 저린 증상·방사통을 함께 살펴드립니다.<br className="hidden sm:block" />
              한약·약침·추나·봉침·물리치료로 통증의 원인부터 회복까지 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "통증클리닉", href: ROUTES.spine.root },
            { label: "디스크 (목·허리)" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "비수술 한방", caption: "한약·약침·추나" },
            { eyebrow: "평균 기간", value: "개인별 안내", caption: "초진 시 상담" },
            { eyebrow: "보험 적용", value: "일부 가능", caption: "비급여 별도" },
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
          title: "통증클리닉",
          eyebrow: "PAIN CLINIC",
          items: SPINE_CHILDREN,
        }}
      >
        {/* 1. About */}
        <Reveal as="section">
          <Eyebrow>ABOUT</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            디스크(추간판 탈출증)란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            디스크는 척추뼈 사이의 추간판이 제자리를 벗어나 신경을 누르며 통증을 일으키는 상태를
            말합니다. 목 디스크는 어깨·팔까지, 허리 디스크는 엉덩이·다리까지 저린 증상이나 방사통이
            나타나는 것이 특징입니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            잘못된 자세, 무리한 동작, 노화와 같은 다양한 원인으로 발생하며 초기에 적절히 살펴드리지
            않으면 만성 통증으로 이어질 수 있습니다. 한방에서는 약물·시술·수기치료를 함께 사용해
            원인을 함께 살펴드립니다.
          </p>
        </Reveal>

        {/* 2. Recommended */}
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

        {/* 3. Treatment */}
        <span id="treatment" className="block scroll-mt-24" aria-hidden="true" />
        <Reveal as="section">
          <header className="mb-7 lg:mb-9">
            <Eyebrow>TREATMENT</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              백세한방병원의 디스크 치료 방법
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

        {/* 4. Process */}
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

        {/* 5. Self-care */}
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

        {/* 6. FAQ */}
        <Reveal as="section">
          <header className="mb-7 lg:mb-9">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              자주 묻는 질문
            </h2>
          </header>
          <FaqAccordion items={FAQS} />
        </Reveal>

        {/* 7. CTA */}
        <Reveal as="section">
          <InContentCta
            title={
              <>
                디스크 통증으로 일상이 흔들린다면,<br />먼저 전화 한 통 부탁드립니다.
              </>
            }
            description="증상에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
