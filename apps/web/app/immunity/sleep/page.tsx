import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import Script from "next/script";
import { ArrowRight, Phone } from "lucide-react";
import { pageMeta, medicalConditionJsonLd } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "수면장애·두통",
  description:
    "백세한방병원 수면장애·두통 클리닉 — 입면·유지·조기 각성과 두통을 한방 변별(심허·간울·담음)로 살펴, 한약·침·뜸·약침으로 다스립니다.",
  path: ROUTES.immunity.sleep,
});

const CATEGORY = GNB.find((g) => g.href === ROUTES.immunity.root);

const SELF_CHECK = [
  "잠들기까지 30분 이상 걸립니다",
  "밤중에 자주 깨고 다시 잠들기 어렵습니다",
  "이른 새벽에 깨고 다시 잠들지 못합니다",
  "두통이 주 2회 이상 반복됩니다",
  "수면 후에도 개운하지 않습니다",
  "스트레스가 쌓이면 두통이 심해집니다",
  "낮 동안 졸음·집중력 저하가 있습니다",
];

const TREATMENTS = [
  { num: "01", title: "맞춤 한약", desc: "심허·간울·담음 등 변별에 따라 마음과 몸의 균형을 다스리는 한약을 처방합니다." },
  { num: "02", title: "침·뜸", desc: "수면과 두통 관련 경혈을 자극해 자율신경 균형을 회복시켜 드립니다." },
  { num: "03", title: "약침", desc: "한약 추출액을 정밀하게 주입해 긴장과 통증을 완화합니다." },
  { num: "04", title: "수면 위생 코칭", desc: "수면 환경·습관 점검과 가이드로 회복을 단단하게 만듭니다." },
];

const PROCESS = [
  { num: "01", title: "수면·두통 문진", desc: "수면 양상과 두통 빈도·강도를 자세히 살핍니다." },
  { num: "02", title: "한방 변별", desc: "진맥과 체질 분석으로 원인 패턴을 파악합니다." },
  { num: "03", title: "맞춤 치료", desc: "한약·침·뜸·약침을 함께 진행합니다.", highlight: true },
  { num: "04", title: "회복·관리", desc: "수면 위생과 생활 가이드를 함께 안내드립니다." },
];

const SELF_CARE = [
  "취침·기상 시간을 일정하게 유지해 주세요",
  "잠들기 1시간 전 스마트폰·TV 사용을 줄여 주세요",
  "낮잠은 30분 이내로 짧게 유지해 주세요",
  "카페인은 오후 2시 이전까지만 권해 드립니다",
  "잠들기 어려우면 침대를 잠시 떠나 주세요",
  "두통이 심할 때는 충분한 수분 섭취가 도움이 됩니다",
];

const FAQS = [
  {
    question: "수면제와 한약을 함께 복용해도 되나요?",
    answer:
      "복용 중인 약이 있다면 진료 시 알려 주세요. 상호작용을 살핀 후 한약 복용 시점을 조율해 드립니다. 점진적으로 의존을 낮추는 방향도 함께 안내드립니다.",
  },
  {
    question: "치료 기간은 얼마나 걸리나요?",
    answer:
      "수면 패턴과 두통 빈도에 따라 차이가 있으며, 평균 2~4개월 단위로 진행합니다. 경과에 따라 강도를 조정해 드립니다.",
  },
  {
    question: "두통과 수면장애가 함께 있는 경우 어떻게 보나요?",
    answer:
      "두 증상은 자율신경 균형과 깊이 연관됩니다. 함께 변별해 통합적으로 살피는 것이 회복에 더 효과적입니다.",
  },
  {
    question: "한약만으로도 좋아질 수 있나요?",
    answer:
      "한약만으로 회복되는 경우도 있지만, 침·뜸·생활 관리와 함께할 때 회복 속도가 더 빠릅니다. 진료 후 단계별로 안내드립니다.",
  },
];

export default function SleepPage() {
  permanentRedirect(ROUTES.autonomic.root);

  const ld = medicalConditionJsonLd("수면장애·두통", [
    "맞춤 한약",
    "침 치료",
    "뜸 치료",
    "약침 치료",
  ]);

  return (
    <>
      <Script id="ld-immunity-sleep" type="application/ld+json">
        {JSON.stringify(ld)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "SLEEP & HEADACHE",
          title: (
            <>
              수면장애·두통,<br />
              <span className="text-accent-300">원인부터 다스리는 한방 진료</span>
            </>
          ),
          description: (
            <>
              잠들기 어려움·자주 깸·이른 각성에 두통까지, 한방 변별로 살핍니다.<br className="hidden sm:block" />
              한약·침·뜸·약침과 수면 위생 가이드를 함께 안내드립니다.
            </>
          ),
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "면역·만성", href: ROUTES.immunity.root },
            { label: "수면장애·두통" },
          ],
          stats: [
            { eyebrow: "치료 방식", value: "변별 한방", caption: "심허·간울·담음" },
            { eyebrow: "평균 기간", value: "2~4개월", caption: "증상별 차이" },
            { eyebrow: "동반 가이드", value: "수면 위생", caption: "생활 관리 안내", accent: true },
            { eyebrow: "진료시간", value: "월-토", caption: "토요일 오전" },
          ],
          actions: (
            <>
              <Button href="#treatment" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                치료 방법 보기 <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
                <Phone size={16} aria-hidden="true" />
                지금 전화 상담
              </Button>
            </>
          ),
        }}
        lnb={{
          title: "면역·만성",
          eyebrow: "IMMUNITY CARE",
          items: CATEGORY?.children ?? [],
        }}
      >
        <Reveal as="section">
          <Eyebrow>OVERVIEW</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            수면장애·두통이란?
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            수면장애는 입면 곤란·수면 유지 곤란·이른 각성으로 나타나며, 두통과 함께 동반되는 경우가
            많습니다. 두통은 긴장성·편두통·자율신경 관련 등 원인이 다양합니다.
          </p>
          <p className="mt-3 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
            한방에서는 수면장애와 두통을 심허·간울·담음 등으로 변별해 살핍니다. 백세한방병원은
            한약을 중심으로 침·뜸·약침을 함께 적용하고, 수면 위생 가이드까지 안내해 드립니다.
          </p>
        </Reveal>

        <Reveal as="section">
          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
            <header className="mb-5 lg:mb-6">
              <Eyebrow>SELF CHECK</Eyebrow>
              <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
                이런 분들께 추천드립니다
              </h2>
            </header>
            <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
              {SELF_CHECK.map((s, i) => (
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

        <Reveal as="section">
          <header id="treatment" className="mb-7 lg:mb-9">
            <Eyebrow>TREATMENT</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              수면장애·두통 치료 방법
            </h2>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <Reveal as="section">
          <header className="mb-8 lg:mb-10">
            <Eyebrow>CARE PROCESS</Eyebrow>
            <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
              내원부터 회복까지, 4단계
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
            <Eyebrow>SELF CARE</Eyebrow>
            <h2 className="mt-2 text-[24px] lg:text-[28px] font-bold text-primary-700 leading-snug">
              수면 위생 가이드
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
                잠 못 이루는 밤이 반복된다면,<br />원인부터 함께 살펴보세요.
              </>
            }
            description="수면장애와 두통은 자율신경의 균형 회복이 핵심입니다."
          />
        </Reveal>
      </SubLayout>
    </>
  );
}
