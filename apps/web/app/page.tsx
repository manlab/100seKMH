import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ROUTES } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";
import { HomeLayerPopups } from "@/components/home/HomeLayerPopups";
import { getActiveHomePopups } from "@/lib/home-popups";

export const metadata: Metadata = pageMeta({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export const dynamic = "force-dynamic";

type ClinicCard = {
  href: string;
  eyebrow: string;
  title: string;
  desc: string;
  image?: string;
  big?: boolean;
  accent?: boolean;
  largeTitle?: boolean;
};

const CLINICS: ClinicCard[] = [
  {
    href: ROUTES.cancer.root,
    eyebrow: "01 INTEGRATIVE CANCER CARE",
    title: "암 통합치료 안내",
    desc: "환자 상태에 맞춘 맞춤형 통합암 치료와 회복 관리를 제공합니다.",
    image: "/images/renewal/generated/cancer-recovery.webp",
    big: true,
  },
  {
    href: ROUTES.accident.root,
    eyebrow: "02 TRAFFIC ACCIDENT",
    title: "교통사고",
    desc: "사고 후 증상과 자동차보험 진료절차를 안내합니다.",
    largeTitle: true,
  },
  {
    href: ROUTES.autonomic.root,
    eyebrow: "03 AUTONOMIC CARE",
    title: "자율신경실조증",
    desc: "일상에 반복되는 불편을 진료와 함께 살펴봅니다.",
    largeTitle: true,
  },
  {
    href: ROUTES.spineJoint.root,
    eyebrow: "04 SPINE & JOINT",
    title: "척추관절통증",
    desc: "척추·관절 통증의 원인을 면밀히 살펴 맞춤형 치료를 제공합니다.",
    image: "/images/renewal/supplied/spine-model-hero.webp",
    big: true,
  },
  {
    href: ROUTES.diet.root,
    eyebrow: "05 WEIGHT MANAGEMENT",
    title: "다이어트",
    desc: "생활 습관과 건강 상태를 함께 확인하는 체중 관리 상담.",
    largeTitle: true,
  },
  {
    href: ROUTES.about.doctors,
    eyebrow: "06 MEDICAL TEAM",
    title: "의료진 소개",
    desc: "한방 전문성을 갖춘 의료진이 책임감을 가지고 진료합니다.",
    accent: true,
    largeTitle: true,
  },
];

export default async function HomePage() {
  const popups = await getActiveHomePopups();

  return (
    <>
      <HomeLayerPopups items={popups} />

      <h1 className="sr-only">
        {SITE.name} — {SITE.tagline}
      </h1>

      {/* HERO — TODO: Hero slider 컴포넌트로 분리 */}
      <section className="relative isolate h-[520px] sm:h-[560px] lg:h-[640px] overflow-hidden bg-primary-700 text-white">
        <Image
          src="/images/renewal/supplied/reception-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-primary-900/55 lg:hidden" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[58%] bg-primary-900/60 lg:block" />
        <div className="relative z-10 container max-w-container-base h-full flex items-center">
          <div className="max-w-[640px]">
            <Eyebrow variant="light" className="text-accent-200">BAEKSE KOREAN MEDICINE HOSPITAL</Eyebrow>
            <h2 className="mt-5 text-balanced text-[36px] sm:text-[44px] lg:text-[58px] leading-[1.15] font-extrabold text-white">
              백세 건강의 시작,<br />
              <span className="text-accent-200">백세한방병원</span>입니다
            </h2>
            <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.7] text-white/90 max-w-[480px]">
              정성스러운 한방 치료로 환자 한 분 한 분의<br className="hidden sm:block" />
              오랜 건강을 함께 만들어 갑니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#clinics" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                진료 안내 <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href={ROUTES.community.counsel} variant="outline-white" size="lg">
                온라인 상담
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 클리닉 카드 그리드 */}
      <Section id="clinics" bg="neutral-50" spacing="lg">
        <Reveal as="header" className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <Eyebrow className="mb-3">CLINIC GUIDE</Eyebrow>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-primary-700 leading-tight text-balanced">
            부위와 증상에 따른 정성스러운 진료
          </h2>
          <p className="mt-4 text-[15px] sm:text-[17px] text-neutral-600 max-w-[640px]">
            한방의 6개 클리닉을 중심으로, 환자 한 분 한 분의 체질과 생활 습관을 살펴<br className="hidden sm:block" />
            맞춤형 진료 계획을 세워드립니다.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {CLINICS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={
                "group relative overflow-hidden rounded-2xl shadow-card h-[300px] sm:h-[340px] lg:h-[420px] transition-all duration-base ease-out-soft hover:-translate-y-1 hover:shadow-xl " +
                (c.accent
                  ? "bg-accent-500 text-white col-span-1"
                  : c.big
                    ? "bg-primary-700 md:col-span-2 lg:col-span-2 text-white"
                    : "bg-white border border-neutral-200")
              }
            >
              {c.image && (
                <>
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-slow group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-primary-900/50" />
                </>
              )}
              <div className={c.big || c.accent ? "absolute inset-x-0 bottom-0 z-10 p-6 lg:p-8 text-white" : "flex-1 p-5 lg:p-6 flex flex-col h-full"}>
                <Eyebrow variant={c.big || c.accent ? "light" : "default"}>{c.eyebrow}</Eyebrow>
                <h3
                  className={
                    "mt-2 font-bold leading-snug " +
                    (c.big
                      ? "text-[22px] lg:text-[28px] text-white"
                      : c.accent
                      ? "text-[20px] lg:text-[24px] text-white"
                      : c.largeTitle
                      ? "text-[24px] lg:text-[28px] text-primary-700"
                      : "text-[18px] lg:text-[20px] text-primary-700")
                  }
                >
                  {c.title}
                </h3>
                <p
                  className={
                    "mt-2 text-[13px] lg:text-[14px] leading-relaxed " +
                    (c.big || c.accent ? "text-primary-100/95 max-w-[420px]" : "text-neutral-600 flex-1")
                  }
                >
                  {c.desc}
                </p>
                <span
                  className={
                    "mt-4 inline-flex items-center gap-2 text-[13px] font-semibold " +
                    (c.big || c.accent ? "text-accent-300" : "text-accent-600")
                  }
                >
                  자세히 보기 <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section bg="primary" spacing="xl">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <Eyebrow variant="light">WEEKDAY & SATURDAY CARE</Eyebrow>
            <h2 className="mt-3 text-[28px] sm:text-[34px] lg:text-[44px] font-bold text-white text-balanced leading-[1.2]">
              회복이 필요한 모든 순간,<br />
              백세한방병원이 함께합니다.
            </h2>
            <p className="mt-5 text-[15px] sm:text-[17px] text-primary-100/90 leading-relaxed max-w-[640px]">
              환자 중심의 진료와 체계적인 치료로 건강한 일상을 위해 최선을 다하겠습니다.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button
              href={`tel:${SITE.contact.representative}`}
              external
              variant="accent"
              size="lg"
              className="h-14 justify-between !bg-[#0F3866] !shadow-none hover:!bg-[#0b2d52] hover:!shadow-none"
            >
              <span className="inline-flex items-center gap-2">
                <Phone size={18} aria-hidden="true" />
                지금 전화 상담하기
              </span>
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={ROUTES.community.counsel} variant="outline-white" size="lg" className="justify-between h-14">
              <span>온라인으로 상담 남기기</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
