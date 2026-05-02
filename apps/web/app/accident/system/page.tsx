import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "치료·입원 시스템",
  description:
    "백세한방병원 교통사고 치료·입원 시스템 안내 — 입원 대상, 입원실 종류, 일과 안내까지. 집중 한방 치료로 회복을 돕습니다.",
  path: ROUTES.accident.system,
});

const ACCIDENT_CATEGORY = GNB.find((g) => g.href === ROUTES.accident.root);

const ADMISSION_TARGET = [
  "통증이 심해 일상생활이 어려우신 분",
  "두통·어지러움·수면 장애가 함께 있으신 분",
  "통원 치료만으로는 회복이 더디신 분",
  "사고 직후 단기간 집중 치료가 필요하신 분",
  "타지 거주 등으로 통원이 어려우신 분",
  "직업·일상 복귀를 빠르게 준비하셔야 하는 분",
];

const ROOM_TYPES = [
  { num: "01", title: "1인실", desc: "프라이빗한 공간에서 충분한 휴식과 회복에 집중하실 수 있습니다." },
  { num: "02", title: "2인실", desc: "동반 보호자 또는 함께 입원하시는 분과 사용하실 수 있는 객실입니다." },
  { num: "03", title: "3인실", desc: "조용한 분위기에서 합리적인 비용으로 입원 치료를 받으실 수 있습니다." },
  { num: "04", title: "4인실", desc: "기본 입원실로, 보험 적용 범위 내에서 안정적인 회복을 돕습니다." },
];

const DAILY_SCHEDULE = [
  { time: "09:00", title: "침 치료", desc: "긴장된 근육과 통증 부위를 다스리는 아침 침 치료를 진행합니다." },
  { time: "11:00", title: "추나치료", desc: "사고 충격으로 틀어진 척추·골반의 정렬을 잡아드립니다." },
  { time: "14:00", title: "약침 치료", desc: "한약 추출액을 정밀하게 주입해 염증·근막 긴장을 풀어드립니다." },
  { time: "16:00", title: "회진·경과 점검", desc: "담당 의료진이 회복 정도를 살피고 다음 치료 계획을 안내드립니다." },
];

const PROCESS = [
  { num: "01", title: "입원 결정", desc: "외래 진료 후 의료진이 입원 필요 여부를 판단해 안내드립니다." },
  { num: "02", title: "치료 일정 수립", desc: "예상 입원 기간과 치료 계획을 함께 상담해 드립니다." },
  { num: "03", title: "통합 진료 진행", desc: "한약·침·약침·추나·물리치료를 매일 일정에 따라 진행합니다.", highlight: true },
  { num: "04", title: "퇴원 후 관리", desc: "퇴원 후에도 통원 치료와 생활 가이드로 회복을 이어갑니다." },
];

const SELF_CARE = [
  "입원 중에는 수면 시간을 일정하게 유지해 주세요",
  "치료 일정에 늦지 않도록 미리 준비해 주세요",
  "통증이 심해질 경우 바로 의료진에게 알려주세요",
  "병실 내에서는 무리한 동작을 피해 주세요",
  "보호자 동반은 병동 안내에 따라 진행해 주세요",
  "퇴원 후에도 통원 치료를 일정 기간 이어가 주세요",
];

const FAQS = [
  {
    question: "입원 기간은 보통 얼마나 걸리나요?",
    answer:
      "사고 후유 증상의 정도와 회복 속도에 따라 차이가 있습니다. 평균 1~3주 사이로 진행되며, 첫 진료에서 예상 기간을 함께 안내드리고 경과에 따라 조정합니다.",
  },
  {
    question: "1인실·2인실 입원도 자동차보험 적용이 되나요?",
    answer:
      "기본 입원실(4인실 등)은 자동차보험 적용 범위에 포함되며, 1인실·2인실 등 상급 병실은 차액이 발생할 수 있습니다. 입원 상담 시 자세히 안내해 드립니다.",
  },
  {
    question: "보호자가 함께 머무를 수 있나요?",
    answer:
      "병실 종류와 환자 상태에 따라 보호자 동반이 가능합니다. 면회 시간과 보호자 안내는 병동 운영 규정에 따라 별도로 안내해 드립니다.",
  },
  {
    question: "입원 중 외출이 가능한가요?",
    answer:
      "치료 일정에 지장이 없는 범위에서 의료진과 상의 후 외출이 가능합니다. 다만 회복기에는 충분한 휴식을 권해 드립니다.",
  },
  {
    question: "퇴원 후에도 치료를 계속 받을 수 있나요?",
    answer:
      "퇴원 후에도 통원 치료를 통해 회복을 이어가실 수 있습니다. 자동차보험 적용 기간 내에는 동일한 보험으로 치료가 가능합니다.",
  },
];

export default function AccidentSystemPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "TREATMENT & ADMISSION",
        title: (
          <>
            집중 한방 치료가 필요할 때,<br />
            <span className="text-accent-300">백세한방병원의 입원 시스템</span>
          </>
        ),
        description: (
          <>
            통증이 심하거나 통원만으로는 회복이 더딘 경우, 입원 치료로 집중 회복을 돕습니다.<br className="hidden sm:block" />
            매일 정해진 일과로 한약·침·약침·추나를 통합 진료해 드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "교통사고", href: ROUTES.accident.root },
          { label: "치료·입원 시스템" },
        ],
        stats: [
          { eyebrow: "치료 방식", value: "통합 한방", caption: "한약·침·약침·추나" },
          { eyebrow: "평균 기간", value: "1~3주", caption: "증상별 차이 있음" },
          { eyebrow: "보험", value: "자동차보험", caption: "기본 입원실 적용", accent: true },
          { eyebrow: "진료시간", value: "365일", caption: "주말·공휴일 진료" },
        ],
        actions: (
          <>
            <Button href="#schedule" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              일과 안내 보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              지금 전화 상담
            </Button>
          </>
        ),
      }}
      lnb={{
        title: "교통사고",
        eyebrow: "ACCIDENT CARE",
        items: ACCIDENT_CATEGORY?.children ?? [],
      }}
    >
      <Reveal as="section">
        <Eyebrow>OVERVIEW</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          치료·입원 시스템 안내
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          교통사고 후유 증상은 단기간 집중 치료가 회복 속도에 큰 영향을 줍니다. 백세한방병원은
          입원 치료가 필요한 분들을 위해 매일 정해진 일과로 한약·침·약침·추나·물리치료를 통합
          진료하고 있습니다.
        </p>
        <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          1인실부터 4인실까지 다양한 입원실을 운영하며, 자동차보험 적용 범위 내에서 본인 부담 없이
          치료를 받으실 수 있도록 도와드립니다. 보호자 동반·면회 등 병동 운영 안내까지 친절히
          설명드립니다.
        </p>
      </Reveal>

      <Reveal as="section">
        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
          <header className="mb-5 lg:mb-6">
            <Eyebrow>WHO IS IT FOR</Eyebrow>
            <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
              이런 분들께 입원 치료를 권해 드립니다
            </h2>
          </header>
          <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            {ADMISSION_TARGET.map((s, i) => (
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
            ※ 입원 여부는 외래 진료 후 의료진이 함께 판단해 드립니다.
          </p>
        </div>
      </Reveal>

      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>ROOM TYPES</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            입원실 종류
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROOM_TYPES.map((t) => (
            <article
              key={t.num}
              className="rounded-2xl border border-neutral-200 bg-white p-5 lg:p-6 hover:border-primary-200 transition-colors"
            >
              <span className="text-[11px] tracking-[0.18em] font-semibold text-accent-600 tabular">ROOM {t.num}</span>
              <h3 className="mt-2 text-[17px] font-bold text-primary-700">{t.title}</h3>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{t.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section">
        <header id="schedule" className="mb-7 lg:mb-9">
          <Eyebrow>DAILY SCHEDULE</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            입원 일과 안내
          </h2>
        </header>
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-card overflow-hidden">
          {DAILY_SCHEDULE.map((s, i) => (
            <div
              key={s.time}
              className={
                "flex items-start gap-4 lg:gap-6 p-5 lg:p-6 " +
                (i !== DAILY_SCHEDULE.length - 1 ? "border-b border-neutral-200" : "")
              }
            >
              <span className="shrink-0 inline-flex items-center justify-center min-w-[72px] h-10 rounded-md bg-primary-50 text-primary-700 font-bold text-[14px] tabular">
                {s.time}
              </span>
              <div>
                <h3 className="text-[16px] font-bold text-primary-700">{s.title}</h3>
                <p className="mt-1 text-[13px] lg:text-[14px] text-neutral-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section">
        <header className="mb-8 lg:mb-10">
          <Eyebrow>CARE PROCESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            입원 결정부터 퇴원 후 관리까지
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
          <Eyebrow>GUIDE</Eyebrow>
          <h2 className="mt-2 text-[24px] lg:text-[28px] font-bold text-primary-700 leading-snug">
            입원 중 안내사항
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
              집중 회복이 필요하다면,<br />입원 상담을 받아 보세요.
            </>
          }
          description="입원 대상·입원실·치료 일정까지 환자분 상황에 맞춰 친절히 안내해 드립니다."
        />
      </Reveal>
    </SubLayout>
  );
}
