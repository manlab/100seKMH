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
  title: "척추관협착증",
  description:
    "백세한방병원 척추관협착증 클리닉 — 신경관이 좁아지며 생기는 보행 장애와 다리 무거움을 한약·약침·추나·물리치료로 보존적으로 살펴드립니다.",
  path: ROUTES.spine.stenosis,
});

const SPINE_CHILDREN = GNB.find((g) => g.href === ROUTES.spine.root)?.children ?? [];

const RECOMMENDED = [
  "조금만 걸어도 다리가 무거워 자주 쉬게 됩니다",
  "허리를 펴면 통증이 더 심해집니다",
  "쪼그려 앉으면 통증이 잠시 가라앉습니다",
  "엉덩이부터 다리로 저린 느낌이 내려옵니다",
  "야간에 종아리 저림이 심해집니다",
  "수술 전 한방 보존 치료를 받고 싶습니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "신경 염증과 근육 긴장을 함께 살피는 처방을 진행합니다." },
  { num: "02", title: "약침·봉침", desc: "협착 부위 신경 주변 염증을 정밀하게 살펴드립니다." },
  { num: "03", title: "추나 요법", desc: "척추 정렬을 부드럽게 조정해 신경 부담을 줄여드립니다." },
  { num: "04", title: "침·전기침", desc: "신경 압박으로 인한 저림과 통증 신호를 완화해드립니다." },
  { num: "05", title: "물리·운동치료", desc: "허리·골반 근력을 단계적으로 회복시켜드립니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "보행 거리·저림 양상을 자세히 확인합니다." },
  { num: "02", title: "정밀 진단", desc: "자세 분석과 필요 시 영상 검사를 안내드립니다." },
  { num: "03", title: "맞춤 치료", desc: "약침·추나·한약을 환자 상태에 맞춰 조합합니다.", highlight: true },
  { num: "04", title: "회복 관리", desc: "보행 거리 회복과 재발 예방을 함께 안내드립니다." },
];

const SELF_CARE = [
  "오래 서 있을 때는 한쪽 발을 받침대에 올려둡니다",
  "허리를 살짝 굽힌 자세가 보행에 도움됩니다",
  "수영·실내 자전거로 척추 부담을 줄여드립니다",
  "복부·둔부 코어 근력을 꾸준히 키워드립니다",
  "장거리 보행 시 중간에 충분히 쉬어드립니다",
  "차가운 환경은 증상을 악화시킬 수 있습니다",
];

const FAQS = [
  {
    question: "수술과 한방 보존 치료, 어떻게 다른가요?",
    answer:
      "수술은 좁아진 신경관을 직접 넓히는 방법이며, 한방 보존 치료는 신경 주변 염증과 근육 긴장을 살펴 증상을 완화하는 방향입니다. 환자 상태에 따라 적절한 시점을 함께 안내드립니다.",
  },
  {
    question: "어느 시기까지 한방 치료가 가능한가요?",
    answer:
      "신경 마비나 대소변 장애 같은 응급 소견이 없는 보존 단계에서 한방 치료가 가능합니다. 영상 검사와 진찰을 종합해 적합 여부를 안내드립니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "협착 정도와 증상에 따라 다릅니다. 보통 일정 기간 이상 꾸준한 치료가 필요하며, 첫 진료에서 예상 일정을 안내해 드립니다.",
  },
  {
    question: "걷기 운동은 해도 되나요?",
    answer:
      "통증이 심하지 않은 범위 내에서 짧게 걷고 충분히 쉬는 방식을 권해 드립니다. 자세한 운동량은 진료 시 안내드립니다.",
  },
];

export default function StenosisPage() {
  const ld = medicalConditionJsonLd("척추관협착증", ["한약", "약침", "봉침", "추나", "침·전기침", "물리치료"]);

  return (
    <>
      <Script id="ld-spine-stenosis" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "SPINAL STENOSIS",
          title: (
            <>
              척추관협착증,<br />
              <span className="text-accent-300">보존적 한방 치료로 살펴드립니다</span>
            </>
          ),
          description: (
            <>
              신경관이 좁아지며 생기는 보행 장애와 다리 무거움을 함께 살펴드립니다.<br className="hidden sm:block" />
              한약·약침·추나·물리치료로 일상의 보행을 다시 회복하실 수 있도록 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "통증클리닉", href: ROUTES.spine.root },
            { label: "척추관협착증" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "비수술 한방", caption: "보존적 진료" },
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
            척추관협착증이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            척추관협착증은 척추 신경이 지나가는 통로가 좁아져 신경을 압박하는 질환입니다. 노화로 인한
            인대·뼈의 변화로 발생하며, 걷다가 다리가 무거워 잠시 쉬어야 다시 걸을 수 있는 보행 장애가
            대표 증상입니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            허리를 펴면 증상이 심해지고 굽히면 잠시 완화되는 양상이 특징입니다. 한방에서는 신경 주변
            염증과 척추 정렬을 함께 살펴드리며, 보존적 치료로 보행 거리와 일상을 회복하실 수 있도록
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
              백세한방병원의 협착증 치료 방법
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
                보행이 점점 어려워진다면,<br />지금 바로 상담받아보세요.
              </>
            }
            description="환자분 상태에 맞춰 가능한 보존 치료 일정과 절차를 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
