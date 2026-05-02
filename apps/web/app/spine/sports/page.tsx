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
  title: "스포츠 손상",
  description:
    "백세한방병원 스포츠 손상 클리닉 — 운동 후 근육·인대 손상을 침·약침·추나·운동 재활로 함께 살펴 일상과 운동 복귀를 도와드립니다.",
  path: ROUTES.spine.sports,
});

const SPINE_CHILDREN = GNB.find((g) => g.href === ROUTES.spine.root)?.children ?? [];

const RECOMMENDED = [
  "운동 후 통증이 며칠 동안 가라앉지 않습니다",
  "특정 동작에서 무릎·발목 통증이 반복됩니다",
  "근육이 자주 뭉치고 회복이 더딥니다",
  "발목·손목 염좌 후유증이 남아있습니다",
  "운동 복귀 시기가 궁금합니다",
  "재발 없는 회복 계획을 받고 싶습니다",
];

const TREATMENTS = [
  { num: "01", title: "침·전기침", desc: "통증 부위 경혈을 자극해 근육 긴장과 통증을 완화합니다." },
  { num: "02", title: "약침 요법", desc: "근육·인대 손상 부위 염증을 정밀하게 살펴드립니다." },
  { num: "03", title: "추나·도수치료", desc: "근막과 관절 정렬을 잡아 회복 속도를 높여드립니다." },
  { num: "04", title: "맞춤 한약", desc: "근육·인대 회복과 회복기 보양을 함께 살피는 처방입니다." },
  { num: "05", title: "운동 재활", desc: "단계별 회복 운동으로 안전한 복귀를 도와드립니다." },
];

const PROCESS = [
  { num: "01", title: "초진·문진", desc: "손상 부위·운동 종류·통증 양상을 확인합니다." },
  { num: "02", title: "정밀 진단", desc: "근골격계 검사와 필요 시 영상 검사를 안내드립니다." },
  { num: "03", title: "맞춤 치료", desc: "침·약침·도수치료를 단계별로 진행합니다.", highlight: true },
  { num: "04", title: "복귀 관리", desc: "운동 복귀 시점과 재발 예방까지 함께 안내합니다." },
];

const SELF_CARE = [
  "운동 전·후 충분한 준비운동과 정리운동을 합니다",
  "급성기 24~48시간은 휴식과 냉찜질이 도움됩니다",
  "통증을 참고 운동을 지속하지 않습니다",
  "근육 균형을 위한 좌우 대칭 운동을 합니다",
  "수면과 영양 관리로 회복 속도를 높여드립니다",
  "재발 방지를 위한 근력·유연성 운동을 꾸준히 합니다",
];

const FAQS = [
  {
    question: "운동 복귀는 언제부터 가능한가요?",
    answer:
      "손상 부위와 정도에 따라 다릅니다. 통증이 가라앉았다고 해서 바로 복귀하면 재발 위험이 있어, 진료 시 단계별 운동 가이드를 함께 안내해 드립니다.",
  },
  {
    question: "운동 직후 응급 상황엔 어떻게 대처해야 하나요?",
    answer:
      "통증과 부종이 심한 경우 우선 안정과 냉찜질, 거상이 도움됩니다. 24~48시간 후에도 통증이 심하거나 보행이 어렵다면 빠른 진료를 권해 드립니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "급성기·만성기 여부와 손상 정도에 따라 다릅니다. 첫 진료에서 예상 치료 일정과 빈도를 안내드리며, 경과에 따라 조정해 드립니다.",
  },
  {
    question: "재발 예방 운동도 함께 안내받을 수 있나요?",
    answer:
      "치료 후 재발 예방을 위한 근력·유연성 운동을 함께 안내드립니다. 운동 종목에 맞는 동작 가이드도 함께 제공해 드립니다.",
  },
];

export default function SportsPage() {
  const ld = medicalConditionJsonLd("스포츠 손상", ["침·전기침", "약침", "추나", "도수치료", "한약", "운동재활"]);

  return (
    <>
      <Script id="ld-spine-sports" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "SPORTS INJURY",
          title: (
            <>
              스포츠 손상,<br />
              <span className="text-accent-300">안전한 회복과 복귀를 함께</span>
            </>
          ),
          description: (
            <>
              운동 후 근육·인대 손상과 반복되는 통증을 함께 살펴드립니다.<br className="hidden sm:block" />
              침·약침·추나·운동 재활로 안전한 회복과 운동 복귀를 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "통증클리닉", href: ROUTES.spine.root },
            { label: "스포츠 손상" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "비수술 한방", caption: "침·약침·재활" },
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
            스포츠 손상이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            스포츠 손상은 운동 중 또는 운동 후 발생하는 근육·인대·관절의 손상을 말합니다. 급성 염좌부터
            반복적인 사용으로 생기는 만성 통증까지 범위가 넓고, 적절한 회복 없이 무리하면 재발 위험이
            높아질 수 있습니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한방에서는 침·약침·추나·도수치료를 함께 사용해 손상 부위를 살피고, 단계별 운동 재활로
            안전한 운동 복귀까지 안내드립니다. 재발 없는 회복을 위한 근력·유연성 가이드도 함께 제공해
            드립니다.
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
              백세한방병원의 스포츠 손상 치료 방법
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
                운동 후 통증이 반복된다면,<br />지금 바로 상담받아보세요.
              </>
            }
            description="손상 부위와 운동 종목에 맞춰 가능한 진료 일정과 회복 계획을 안내해 드리겠습니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
