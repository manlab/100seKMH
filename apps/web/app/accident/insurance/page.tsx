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
  title: "자동차보험 진료절차",
  description:
    "백세한방병원 자동차보험 한방 진료 절차 — 사고 접수부터 정산까지 4단계로 안내드립니다. 본인 부담금 없이 한약·침·약침·추나 치료를 받으실 수 있습니다.",
  path: ROUTES.accident.insurance,
});

const ACCIDENT_CATEGORY = GNB.find((g) => g.href === ROUTES.accident.root);

const NEEDS = [
  "교통사고 후 한방 치료를 받고 싶으신 분",
  "자동차보험 절차를 처음 접하시는 분",
  "본인 부담금 없이 진료를 받고 싶으신 분",
  "보험사 처리 절차가 복잡해 망설여지시는 분",
  "한약 처방까지 함께 받고 싶으신 분",
  "치료비 정산 흐름을 미리 알고 싶으신 분",
];

const COVERED = [
  { num: "01", title: "한약(첩약)", desc: "어혈·통증·자율신경 회복을 위한 맞춤 한약 처방을 자동차보험으로 안내해 드립니다." },
  { num: "02", title: "침·전기침", desc: "긴장된 근육과 통증을 다스리는 침 치료가 보험 적용 범위에 포함됩니다." },
  { num: "03", title: "약침·봉침", desc: "한약 추출액을 정밀하게 주입하는 약침 치료도 자동차보험으로 가능합니다." },
  { num: "04", title: "추나치료", desc: "사고로 틀어진 척추·골반 정렬을 잡는 추나치료가 보험 적용됩니다." },
  { num: "05", title: "물리치료", desc: "온열·전기·견인 등 보조 물리치료까지 한자리에서 안내드립니다." },
  { num: "06", title: "입원 치료", desc: "통증이 심하거나 집중 치료가 필요한 경우 입원 치료도 가능합니다." },
];

const PROCESS = [
  { num: "01", title: "사고 접수", desc: "사고 직후 보험사에 사고 접수를 진행하고 접수번호를 받아 주세요." },
  { num: "02", title: "보험사 정보 확인", desc: "보험사명·접수번호·담당자 연락처를 확인해 주시기 바랍니다." },
  { num: "03", title: "병원 내원·진료", desc: "접수번호 지참 후 내원, 한방 통합 진료를 시작합니다.", highlight: true },
  { num: "04", title: "보험사 정산", desc: "치료비는 보험사와 직접 정산되어 본인 부담금이 없습니다." },
];

const SELF_CARE = [
  "사고 직후 가능한 빠르게 보험사에 접수해 주세요",
  "외상이 없어도 진료를 받아 보시는 편이 안전합니다",
  "치료 일지·진료확인서를 잘 보관해 주세요",
  "합의 전 충분한 회복 기간을 확보하시기를 권해 드립니다",
  "치료 중에는 무리한 운동·스트레칭을 피해 주세요",
];

const FAQS = [
  {
    question: "자동차보험 진료 시 본인 부담금이 있나요?",
    answer:
      "교통사고 한방 진료의 경우 보험사가 치료비를 직접 정산하기 때문에, 환자 본인이 부담하시는 금액은 없습니다. 진료 시작 전 자세한 절차를 안내해 드립니다.",
  },
  {
    question: "가해자·피해자 모두 자동차보험 진료가 가능한가요?",
    answer:
      "피해자뿐 아니라 가해자(과실 비율이 있는 경우)도 자동차보험 또는 본인 보험을 통해 한방 치료를 받으실 수 있습니다. 보험 적용 범위는 사고 상황에 따라 안내드립니다.",
  },
  {
    question: "합의 후에도 치료를 이어갈 수 있나요?",
    answer:
      "합의가 종료된 이후에는 자동차보험 적용이 제한될 수 있습니다. 다만 본인 또는 실손보험으로 이어가시는 분들도 많으니, 합의 전 회복 정도를 충분히 확인해 주세요.",
  },
  {
    question: "한약 처방도 자동차보험 적용이 되나요?",
    answer:
      "교통사고 후유증의 경우 첩약·탕약 등 한약 처방이 보험 적용 범위에 포함됩니다. 진료 후 처방 안내 시 함께 설명드립니다.",
  },
  {
    question: "필요한 서류가 무엇인가요?",
    answer:
      "보험사 사고 접수번호와 담당자 연락처만 가지고 오시면 됩니다. 신분증을 함께 지참해 주시면 접수가 빠르게 진행됩니다.",
  },
];

export default function AccidentInsurancePage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "INSURANCE PROCESS",
        title: (
          <>
            자동차보험 한방 진료,<br />
            <span className="text-accent-300">절차부터 친절히 안내드립니다</span>
          </>
        ),
        description: (
          <>
            사고 접수부터 보험사 정산까지, 4단계로 정리해 드립니다.<br className="hidden sm:block" />
            본인 부담금 없이 한방 통합 치료를 받으실 수 있습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "교통사고", href: ROUTES.accident.root },
          { label: "자동차보험 진료절차" },
        ],
        stats: [
          { eyebrow: "절차", value: "4단계", caption: "접수부터 정산까지" },
          { eyebrow: "본인 부담금", value: "0원", caption: "보험사 직접 정산", accent: true },
          { eyebrow: "보험 적용", value: "한약 포함", caption: "한약·침·약침·추나" },
          { eyebrow: "진료시간", value: "365일", caption: "평일·주말·공휴일" },
        ],
        actions: (
          <>
            <Button href="#process" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              진료 절차 보기 <ArrowRight size={16} aria-hidden="true" />
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
          자동차보험 한방 진료란?
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          교통사고로 인한 후유 증상은 자동차보험을 통해 한방 치료를 받으실 수 있습니다. 한약·침·
          약침·추나·물리치료 등이 보험 적용 범위에 포함되며, 치료비는 보험사가 직접 정산하기
          때문에 환자 본인이 부담하시는 금액은 없습니다.
        </p>
        <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원은 보험사 접수 확인부터 진료, 정산까지 한자리에서 안내해 드립니다. 절차가
          처음이거나 복잡하게 느껴지시는 분도 부담 없이 진료를 시작하실 수 있도록 도와드립니다.
        </p>
      </Reveal>

      <Reveal as="section">
        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
          <header className="mb-5 lg:mb-6">
            <Eyebrow>WHO IS IT FOR</Eyebrow>
            <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
              이런 분들께 추천드립니다
            </h2>
          </header>
          <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            {NEEDS.map((s, i) => (
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
            ※ 보험 적용 범위와 절차는 사고 상황에 따라 차이가 있을 수 있습니다.
          </p>
        </div>
      </Reveal>

      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>COVERED ITEMS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            자동차보험 적용 항목
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COVERED.map((t) => (
            <article
              key={t.num}
              className="rounded-2xl border border-neutral-200 bg-white p-5 lg:p-6 hover:border-primary-200 transition-colors"
            >
              <span className="text-[11px] tracking-[0.18em] font-semibold text-accent-600 tabular">ITEM {t.num}</span>
              <h3 className="mt-2 text-[17px] font-bold text-primary-700">{t.title}</h3>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{t.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section">
        <header id="process" className="mb-8 lg:mb-10">
          <Eyebrow>PROCESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            사고 접수부터 정산까지, 4단계
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
            진료 전·중 안내사항
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
              자동차보험 절차가 막막하다면,<br />전화 한 통으로 안내드리겠습니다.
            </>
          }
          description="사고 접수번호와 보험사 정보만 가지고 오시면, 진료부터 정산까지 도와드립니다."
        />
      </Reveal>
    </SubLayout>
  );
}
