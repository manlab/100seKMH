import type { Metadata } from "next";
import { ArrowRight, Phone, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "인사말",
  description:
    "백세한방병원 원장 인사말 — 환자 한 분 한 분의 체질과 일상을 함께 살피는 정성스러운 한방 진료를 약속드립니다.",
  path: "/about/greeting",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

const GREETING_PARAGRAPHS: string[] = [
  "백세한방병원 홈페이지를 찾아 주신 모든 분들께 진심으로 감사드립니다.",
  "사람의 몸은 저마다의 체질과 생활 습관, 살아온 시간이 깊이 새겨져 있습니다. 같은 증상이라도 그 뿌리는 결코 같지 않다고 저희는 믿습니다.",
  "그래서 백세한방병원은 표면의 증상만을 빠르게 누르기보다, 환자분의 체질과 일상을 먼저 듣고 살핍니다. 그 위에 한약·침·약침·추나·물리치료를 환자분 상태에 맞게 정성스럽게 조합해 드립니다.",
  "통증 클리닉, 추나·교정 클리닉, 교통사고 클리닉, 면역·만성 클리닉, 여성·소아 클리닉까지 — 한자리에서 통합된 한방 진료를 받으실 수 있도록 동선을 설계했습니다.",
  "치료가 끝난 뒤에도 자세와 생활 습관을 함께 안내드려, 같은 통증으로 다시 찾아오시는 일을 줄이는 것이 저희의 목표입니다.",
  "백 년의 건강을 함께 그려 가는 동반자가 되겠습니다. 작은 불편함이라도 편하게 말씀해 주십시오. 정성껏 듣고, 정성껏 진료하겠습니다.",
];

const PROMISES = [
  {
    Icon: Heart,
    title: "정성스러운 진료",
    desc: "환자분의 이야기를 충분히 듣고, 체질과 일상까지 함께 살펴 진료 계획을 세워드립니다.",
  },
  {
    Icon: ShieldCheck,
    title: "안전한 한약·치료",
    desc: "GMP 기준에 맞는 한약재를 사용하고, 탕전 전 과정의 위생과 안전성을 점검합니다.",
  },
  {
    Icon: Sparkles,
    title: "체계적인 통합 한방",
    desc: "한약·침·약침·추나·물리치료까지 한자리에서 받으실 수 있도록 동선을 설계했습니다.",
  },
  {
    Icon: Users,
    title: "전문성을 갖춘 의료진",
    desc: "한방·양방 진료 경험을 갖춘 의료진이 협력해 환자분의 회복을 함께 돕습니다.",
  },
];

export default function GreetingPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "GREETING",
        title: (
          <>
            안녕하십니까,<br />
            <span className="text-accent-300">백세한방병원입니다</span>
          </>
        ),
        description: (
          <>
            환자 한 분 한 분의 체질과 일상을 함께 살피는<br className="hidden sm:block" />
            정성스러운 한방 진료를 약속드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "인사말" },
        ],
        stats: [
          { eyebrow: "진료 철학", value: "체질 맞춤", caption: "사람 중심의 한방" },
          { eyebrow: "통합 진료", value: "5개 클리닉", caption: "한자리에서 진료" },
          { eyebrow: "운영 시간", value: "월-토 진료", caption: "일요일 휴진" },
          { eyebrow: "환자 약속", value: "정성 진료", caption: "끝까지 함께 봅니다", accent: true },
        ],
        actions: (
          <>
            <Button href={ROUTES.about.doctors} variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              의료진 소개 보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              전화 상담
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
      {/* Greeting message */}
      <Reveal as="section">
        <Eyebrow>HEADLINE</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          백 년의 건강을 함께 그려 가는<br className="hidden sm:block" />
          <span className="text-accent-600">정성스러운 한방 동반자</span>
        </h2>

        <div className="mt-7 lg:mt-9 space-y-5 text-[15px] lg:text-[17px] text-neutral-700 leading-[1.85] max-w-[760px]">
          {GREETING_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Signature placeholder */}
        <div className="mt-10 lg:mt-12 flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-200 shrink-0"
            aria-hidden="true"
          />
          <div>
            <p className="text-[13px] tracking-[0.18em] font-semibold text-accent-600">DIRECTOR</p>
            {/* TODO(client-asset): 원장 성함·서명 이미지 교체 */}
            <p className="mt-1 text-[18px] font-bold text-primary-700">
              백세한방병원 대표원장 {SITE.contact.representativeName}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Promises (USPs) */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>OUR PROMISE</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            환자분께 드리는 네 가지 약속
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            진료실 안에서만이 아니라, 회복기와 일상까지 함께 살피겠습니다. 백세한방병원이 환자분께
            드리는 약속입니다.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {PROMISES.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
                <p.Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[18px] lg:text-[20px] font-bold text-primary-700">{p.title}</h3>
              <p className="mt-2 text-[14px] lg:text-[15px] text-neutral-600 leading-relaxed">{p.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* CTA: doctors */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              어떤 의료진이 진료하는지<br />
              먼저 확인해 보고 싶으시다면.
            </>
          }
          description="백세한방병원 의료진의 진료 분야와 자격을 한눈에 확인하실 수 있습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
