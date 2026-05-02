import type { Metadata } from "next";
import { ArrowRight, Phone, Leaf, Droplets, Flame, FlaskConical, ShieldCheck, PackageCheck } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "한약·탕전 안내",
  description:
    "백세한방병원 한약·탕전실 안내. 체질·증상에 맞춘 맞춤 처방, GMP 기준의 위생적인 5단계 탕전 과정을 소개합니다.",
  path: "/about/herbal",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

const PHILOSOPHY: string[] = [
  "한약은 같은 처방이라도 환자의 체질과 증상, 생활 습관에 따라 효과가 다르게 나타납니다.",
  "백세한방병원은 모든 한약을 환자분의 체질·맥·복부 진찰 결과에 맞게 정성스럽게 처방합니다.",
  "또한 한약재는 GMP 기준에 맞는 검증된 약재만을 선별해 사용하며, 탕전 전 과정의 위생과 안전성을 점검합니다.",
  "환자분이 안심하고 드실 수 있는 한약을 만들기 위해, 처방부터 포장까지 정성을 다하겠습니다.",
];

const PRESCRIPTIONS = [
  { Icon: Leaf, title: "보양 한약", desc: "기력이 떨어지고 피로가 누적된 분께. 체질에 맞는 보양 한약으로 회복을 돕습니다." },
  { Icon: Droplets, title: "다이어트 한약", desc: "체중 감량과 체질 개선을 함께. 식이·생활 지도와 함께 안내드립니다." },
  { Icon: ShieldCheck, title: "면역 한약", desc: "잦은 감기·비염·만성피로로 어려운 분께 면역 균형을 도와드리는 처방." },
  { Icon: Flame, title: "성장 한약", desc: "성장기 자녀의 체질을 살펴, 건강한 성장과 면역을 함께 봅니다." },
  { Icon: PackageCheck, title: "산후 한약", desc: "출산 후 회복기 어머니를 위한 정성스러운 산후 보약." },
  { Icon: FlaskConical, title: "갱년기 한약", desc: "여성 갱년기 증상의 균형을 함께 살피는 맞춤 한약 처방." },
];

const PROCESS = [
  { num: "01", title: "진찰·처방", desc: "체질·맥·증상을 종합해 환자분께 맞는 한약을 처방해 드립니다." },
  { num: "02", title: "약재 선별", desc: "GMP 기준에 맞는 검증된 한약재만 선별해 사용합니다." },
  { num: "03", title: "전탕(달이기)", desc: "정해진 시간과 온도로 한약 성분이 충분히 우러나도록 달입니다.", highlight: true },
  { num: "04", title: "위생 포장", desc: "위생 환경에서 1회분 단위로 정성스럽게 포장합니다." },
  { num: "05", title: "전달·복약 안내", desc: "복용법과 보관법을 함께 안내해 드립니다." },
];

const SAFETY = [
  "GMP 인증 한약재만을 선별해 사용합니다",
  "잔류 농약·중금속 검사 결과를 확인합니다",
  "탕전실은 위생 관리 매뉴얼에 따라 청결을 유지합니다",
  "포장 단위마다 처방·복용법을 함께 안내드립니다",
];

export default function HerbalPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "HERBAL MEDICINE",
        title: (
          <>
            체질에 맞춘 한약,<br />
            <span className="text-accent-300">정성스러운 탕전 과정</span>
          </>
        ),
        description: (
          <>
            모든 한약은 환자분의 체질·증상에 맞춰 처방되며,<br className="hidden sm:block" />
            GMP 기준의 위생적인 탕전 과정을 거쳐 전달드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "한약·탕전 안내" },
        ],
        stats: [
          { eyebrow: "처방 방식", value: "체질 맞춤", caption: "1:1 진료 처방" },
          { eyebrow: "탕전 과정", value: "5단계 관리", caption: "위생·안전 점검" },
          { eyebrow: "약재 기준", value: "GMP 인증", caption: "검증 약재 사용" },
          { eyebrow: "안전 관리", value: "전 과정 점검", caption: "복약 지도까지", accent: true },
        ],
        actions: (
          <>
            <Button href="#process" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              탕전 과정 보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              한약 상담
            </Button>
          </>
        ),
      }}
      lnb={{
        title: "병원소개",
        eyebrow: "ABOUT US",
        items: ABOUT_LNB_ITEMS,
      }}
    >
      {/* Philosophy */}
      <Reveal as="section">
        <Eyebrow>HERBAL PHILOSOPHY</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          한약은 사람마다 다릅니다,<br className="hidden sm:block" />
          <span className="text-accent-600">처방도 그래야 합니다</span>
        </h2>
        <div className="mt-6 lg:mt-8 space-y-4 text-[15px] lg:text-[17px] text-neutral-700 leading-[1.85] max-w-[760px]">
          {PHILOSOPHY.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      {/* Prescriptions */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>PRESCRIPTIONS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            대표 한약 처방 안내
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            아래는 자주 처방되는 한약 종류입니다. 같은 처방이라도 환자분의 체질과 증상에 따라
            구성과 분량이 달라질 수 있습니다.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {PRESCRIPTIONS.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
                <p.Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[18px] font-bold text-primary-700">{p.title}</h3>
              <p className="mt-2 text-[14px] text-neutral-600 leading-relaxed">{p.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Process */}
      <Reveal as="section">
        <header id="process" className="mb-8 lg:mb-10">
          <Eyebrow>HERBAL PROCESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            처방부터 전달까지, 5단계 탕전 과정
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

      {/* Safety */}
      <Reveal as="section">
        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
          <header className="mb-5 lg:mb-6">
            <Eyebrow>SAFETY</Eyebrow>
            <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
              안심하고 드실 수 있도록, 안전성 관리
            </h2>
          </header>
          <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            {SAFETY.map((s, i) => (
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
            ※ 한약 처방·복용 안내는 진료 후 의료진의 안내에 따라 주십시오.
          </p>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              어떤 한약이 맞을지 궁금하시다면,<br />
              먼저 진료 상담을 받아 보십시오.
            </>
          }
          description="체질과 증상을 충분히 듣고, 맞춤 처방을 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
