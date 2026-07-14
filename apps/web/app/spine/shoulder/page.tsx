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
  title: "오십견·회전근개",
  description:
    "백세한방병원 어깨 클리닉 — 오십견과 회전근개 손상으로 인한 야간통, 운동 제한을 한약·약침·침·추나·도수치료로 살펴드립니다.",
  path: ROUTES.spine.shoulder,
});

const SPINE_CHILDREN = GNB.find((g) => g.href === ROUTES.spine.root)?.children ?? [];

const RECOMMENDED = [
  "팔을 들거나 옷을 입을 때 어깨가 아픕니다",
  "밤에 아파 잠을 깊이 자기 어렵습니다",
  "어깨 운동 범위가 점점 줄어들고 있습니다",
  "특정 동작에서 어깨에 힘이 빠집니다",
  "팔을 뒤로 돌리기가 힘듭니다",
  "수술 전 한방 보존 치료를 원합니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "어깨 관절막 염증과 회복을 함께 살피는 처방입니다." },
  { num: "02", title: "약침 요법", desc: "어깨 관절·인대 부위 염증을 정밀하게 살펴드립니다." },
  { num: "03", title: "침·전기침", desc: "어깨 주변 경혈을 자극해 통증과 긴장을 완화합니다." },
  { num: "04", title: "추나·도수치료", desc: "굳어진 관절막을 부드럽게 풀고 가동 범위를 회복합니다." },
  { num: "05", title: "운동 재활", desc: "단계별 어깨 운동으로 안정성을 회복하실 수 있도록 합니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "통증 시작 시점·운동 범위를 자세히 확인합니다." },
  { num: "02", title: "정밀 진단", desc: "어깨 관절 검사와 필요 시 영상 검사를 안내합니다." },
  { num: "03", title: "맞춤 치료", desc: "약침·추나·도수치료를 단계별로 진행합니다.", highlight: true },
  { num: "04", title: "회복 관리", desc: "운동 재활과 재발 예방까지 함께 안내드립니다." },
];

const SELF_CARE = [
  "어깨를 따뜻하게 유지해주세요",
  "수건을 활용한 가벼운 스트레칭이 도움됩니다",
  "무거운 가방을 한쪽 어깨로 메지 않습니다",
  "야간통이 심한 시기엔 베개로 팔을 받쳐드립니다",
  "통증이 있는 동작은 무리하지 않습니다",
  "꾸준한 어깨 가동 운동으로 굳음을 예방합니다",
];

const FAQS = [
  {
    question: "오십견은 시간이 지나면 자연스럽게 좋아지나요?",
    answer:
      "일부 호전 사례가 있지만 심한 야간통과 운동 제한을 그대로 두면 굳음이 심해질 수 있습니다. 적절한 시기에 치료를 시작하시는 편을 권해 드립니다.",
  },
  {
    question: "회전근개가 파열된 경우에도 한방 치료가 가능한가요?",
    answer:
      "파열의 정도에 따라 다릅니다. 부분 파열은 보존적 한방 치료가 가능한 경우가 많고, 완전 파열은 수술적 치료가 필요할 수 있어 영상 검사로 함께 평가합니다.",
  },
  {
    question: "치료 기간은 보통 얼마나 걸리나요?",
    answer:
      "굳음의 정도와 통증에 따라 다릅니다. 첫 진료에서 예상 치료 일정과 빈도를 함께 안내드립니다.",
  },
  {
    question: "치료 중 운동은 어떻게 해야 하나요?",
    answer:
      "치료 시기에 맞춰 가능한 운동을 단계별로 안내드립니다. 무리한 동작은 오히려 통증을 키울 수 있어 진료 시 가이드를 받으시는 편을 권해 드립니다.",
  },
];

export default function ShoulderPage() {
  permanentRedirect(ROUTES.spineJoint.shoulder);

  const ld = medicalConditionJsonLd("오십견·회전근개", ["한약", "약침", "침·전기침", "추나", "도수치료", "운동재활"]);

  return (
    <>
      <Script id="ld-spine-shoulder" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "SHOULDER CLINIC",
          title: (
            <>
              오십견·회전근개,<br />
              <span className="text-accent-300">움직임을 다시 회복합니다</span>
            </>
          ),
          description: (
            <>
              어깨 관절막 염증과 야간통, 옷 입기 어려움까지 함께 살펴드립니다.<br className="hidden sm:block" />
              한약·약침·침·추나·도수치료로 일상의 움직임을 다시 회복하실 수 있도록 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "통증클리닉", href: ROUTES.spine.root },
            { label: "오십견·회전근개" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "비수술 한방", caption: "한약·약침·도수" },
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
        <Reveal as="section">
          <Eyebrow>ABOUT</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            오십견·회전근개 손상이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            오십견은 어깨 관절막이 굳어져 통증과 운동 제한이 생기는 상태이며, 회전근개 손상은 어깨를
            움직이는 힘줄이 손상된 상태입니다. 두 질환 모두 야간통과 특정 동작에서의 통증이 공통적인
            특징입니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            방치하면 어깨가 점점 굳어 일상 동작이 어려워질 수 있습니다. 한방에서는 한약·약침·침·추나·
            도수치료를 함께 사용해 염증과 굳음을 살펴드리고, 단계적인 운동 재활까지 함께 안내드립니다.
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
              백세한방병원의 어깨 치료 방법
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
                어깨 통증으로 잠을 설치신다면,<br />지금 바로 상담받아보세요.
              </>
            }
            description="환자분 어깨 상태에 맞춰 가능한 진료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
