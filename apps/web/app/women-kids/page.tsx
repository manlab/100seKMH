import type { Metadata } from "next";
import { ArrowRight, Phone, Activity, Layers, Clock, Shield } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { InContentCta } from "@/components/ui/InContentCta";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "여성·소아 클리닉",
  description:
    "백세한방병원 여성·소아 클리닉 — 산후조리, 생리통·월경불순, 갱년기, 성장 클리닉, 총명탕까지. 시기별·체질별 한방 진료를 안내드립니다.",
  path: "/women-kids",
});

const WOMEN_KIDS_CATEGORY = GNB.find((g) => g.href === "/women-kids")!;

const SYMPTOMS = [
  { label: "산후 회복", href: ROUTES.womenKids.postnatalCare },
  { label: "산후 부종", href: ROUTES.womenKids.postnatalCare },
  { label: "생리통", href: ROUTES.womenKids.menstruation },
  { label: "월경불순", href: ROUTES.womenKids.menstruation },
  { label: "갱년기 안면홍조", href: ROUTES.womenKids.menopause },
  { label: "갱년기 불면", href: ROUTES.womenKids.menopause },
  { label: "성장 부진", href: ROUTES.womenKids.growth },
  { label: "식욕부진", href: ROUTES.womenKids.growth },
  { label: "집중력 저하", href: ROUTES.womenKids.chongmyeong },
  { label: "한약 보양", href: ROUTES.womenKids.chongmyeong },
];

const USPS = [
  {
    Icon: Activity,
    title: "시기별 진료",
    desc: "산전·산후, 가임기·갱년기, 성장기·청소년기까지 시기별 변화를 함께 살피며 진료 방향을 안내드립니다.",
  },
  {
    Icon: Layers,
    title: "부드러운 한방",
    desc: "여성·소아의 체질에 맞춰 부드러운 처방·시술로 진행합니다. 무리한 자극이 아닌 안전한 강도를 우선합니다.",
  },
  {
    Icon: Clock,
    title: "체질·성장 분석",
    desc: "여성 체질 평가, 소아 성장·발달 평가를 통해 진료 계획을 세웁니다. 맞춤 처방을 위한 기초가 됩니다.",
  },
  {
    Icon: Shield,
    title: "가족 단위 관리",
    desc: "산모·아이·갱년기 여성까지 한 가족이 함께 진료받으실 수 있도록 일정·동선을 안내드립니다.",
  },
];

const TREATMENTS = [
  { num: "01", title: "산후 한약", desc: "산후 어혈·부종·기력 회복을 함께 살피는 산후 한약을 처방합니다." },
  { num: "02", title: "여성 한약", desc: "생리통·월경불순·갱년기 증상을 체질에 맞춰 처방합니다." },
  { num: "03", title: "성장 한약", desc: "성장기 아이의 식욕·체력·성장을 함께 살피는 한약을 처방합니다." },
  { num: "04", title: "침·약침", desc: "부드러운 침·약침으로 통증·기혈 순환을 함께 살핍니다." },
];

const PROCESS = [
  { num: "01", title: "접수·문진", desc: "월경 주기·산후 시기·아이 성장 정보를 먼저 확인합니다." },
  { num: "02", title: "체질 진단", desc: "진맥·체질·성장 평가로 진료 계획을 세웁니다." },
  { num: "03", title: "맞춤 진료", desc: "한약·침·약침을 환자 시기·체질에 맞춰 조합합니다.", highlight: true },
  { num: "04", title: "경과 점검", desc: "정기적으로 변화를 확인하고 처방·강도를 조정합니다." },
  { num: "05", title: "사후 관리", desc: "유지 식이·생활 가이드 안내, 호전 상태를 오래 유지하시도록 돕습니다." },
];

const SELF_CHECK = [
  "출산 후 부종·기력 회복이 더디게 느껴집니다",
  "생리통이 점점 심해지고 약이 잘 듣지 않습니다",
  "월경 주기가 불규칙합니다",
  "갱년기 안면홍조·불면이 반복됩니다",
  "또래에 비해 키 성장이 더디게 느껴집니다",
  "아이가 식욕이 없고 자주 피곤해합니다",
];

const FAQS = [
  {
    question: "산후 한약은 언제부터 복용하나요?",
    answer:
      "보통 출산 후 2~3주부터 산모 회복 정도와 수유 여부를 함께 살펴 처방을 안내드립니다. 모유 수유 중 복용 여부도 함께 상담받으실 수 있습니다.",
  },
  {
    question: "수유 중에도 한약을 복용할 수 있나요?",
    answer:
      "수유 중에도 안전한 처방으로 진행하는 것이 일반적입니다. 다만 약재 선택과 용량은 신중히 안내드리니, 진료 시 수유 상황을 알려주시면 함께 검토합니다.",
  },
  {
    question: "성장 한약은 몇 살부터 가능한가요?",
    answer:
      "보통 만 5~16세 사이 성장기 아이를 대상으로 안내드립니다. 성장 평가와 체질 진단 후 처방 여부와 시점을 함께 안내드립니다.",
  },
  {
    question: "갱년기 증상도 한방으로 치료할 수 있나요?",
    answer:
      "갱년기 안면홍조·불면·기분 변화 등은 한약·침·약침으로 함께 살펴봅니다. 증상의 강도와 체질에 따라 처방·치료 강도를 조정해 안내드립니다.",
  },
  {
    question: "총명탕은 어떤 아이에게 도움이 되나요?",
    answer:
      "집중력·체력·식욕 같은 학습기 컨디션을 함께 살피는 처방입니다. 단순 학습 보조가 아닌 체질·생활 패턴 평가 후 안내드립니다.",
  },
];

export default function WomenKidsPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "WOMEN & KIDS CLINIC",
        title: (
          <>
            엄마와 아이,<br />
            <span className="text-accent-300">시기에 맞는 한방 진료</span>
          </>
        ),
        description: (
          <>
            산후조리부터 생리통·갱년기, 성장기 아이의 체력·집중력까지.<br className="hidden sm:block" />
            시기와 체질에 맞춘 부드러운 한방 진료를 안내드리겠습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "진료안내" },
          { label: "여성·소아" },
        ],
        stats: [
          { eyebrow: "치료 방식", value: "체질 한방", caption: "맞춤 처방" },
          { eyebrow: "진료 시간", value: "365일", caption: "평일·주말·공휴일" },
          { eyebrow: "진료 대상", value: "전 연령", caption: "산모·여성·아이" },
          { eyebrow: "관리 방식", value: "가족 단위", caption: "함께 진료 가능", accent: true },
        ],
        actions: (
          <>
            <Button href="#symptoms" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              증상별 진료 보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              지금 전화 상담
            </Button>
          </>
        ),
      }}
      lnb={{
        title: "여성·소아",
        eyebrow: "WOMEN & KIDS",
        items: WOMEN_KIDS_CATEGORY.children ?? [],
      }}
    >
      {/* Overview */}
      <Reveal as="section">
        <Eyebrow>CLINIC OVERVIEW</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          시기와 체질에 맞춘<br className="hidden sm:block" />
          여성·소아 한방 진료
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원 여성·소아 클리닉은 산후조리·생리통·갱년기·성장 같은 시기별 변화를
          함께 살핍니다. 부드러운 처방과 시술로 진행하며, 가족이 함께 진료받으실 수
          있도록 일정과 동선을 안내드립니다.
        </p>

        <div id="symptoms" className="mt-7 lg:mt-9">
          <h3 className="text-[14px] font-semibold text-primary-600 mb-3">이 클리닉에서 다루는 증상</h3>
          <ul className="flex flex-wrap gap-2">
            {SYMPTOMS.map((s, i) => (
              <li key={i}>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-primary-50 text-primary-700 text-[13px] font-semibold hover:bg-primary-100 transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* USPs */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>WHY BAEKSE</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            백세한방병원 여성·소아 클리닉이 다른 점
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            여성과 아이는 시기·체질에 따라 진료 방향이 달라집니다. 무리하지 않는
            부드러운 한방 진료로, 변화의 시기에 맞춰 함께 살핍니다.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {USPS.map((u) => (
            <article
              key={u.title}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
                <u.Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[18px] lg:text-[20px] font-bold text-primary-700">{u.title}</h3>
              <p className="mt-2 text-[14px] lg:text-[15px] text-neutral-600 leading-relaxed">{u.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Treatment methods */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>TREATMENT</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            백세한방병원의 여성·소아 치료 방법
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

      {/* Process */}
      <Reveal as="section">
        <header className="mb-8 lg:mb-10">
          <Eyebrow>CARE PROCESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            내원부터 사후 관리까지, 5단계 진료 과정
          </h2>
        </header>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
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

      {/* Self check */}
      <Reveal as="section">
        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
          <header className="mb-5 lg:mb-6">
            <Eyebrow>SELF CHECK</Eyebrow>
            <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
              이런 신호가 있다면 진료가 필요합니다
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

      {/* FAQ */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            자주 묻는 질문
          </h2>
        </header>
        <FaqAccordion items={FAQS} />
      </Reveal>

      {/* In-content CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              가족이 함께 받는 한방 진료,<br />언제든 전화 부탁드립니다.
            </>
          }
          description="시기·체질에 맞춘 진료 일정과 처방 절차를 함께 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
