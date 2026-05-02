import type { Metadata } from "next";
import { Award, Phone, ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "의료진 소개",
  description:
    "백세한방병원 의료진을 소개합니다. 한방·양방 협진 경험을 갖춘 한의사가 환자분의 회복을 함께 봅니다.",
  path: "/about/doctors",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

type Doctor = {
  name: string;
  role: string;
  qualifications: string[];
  fields: string[];
  /** 사진 자리 그라디언트 톤 */
  tone: "primary" | "accent" | "deep";
};

const LEAD_DOCTORS: Doctor[] = [
  {
    name: "OOO 대표원장",
    role: "통증·척추 클리닉",
    qualifications: [
      "OO대학교 한의학 박사",
      "전 OO한방병원 진료원장",
      "대한한방병원협회 정회원",
      "대한추나의학회 정회원",
      "척추신경추나의학회 인정의",
    ],
    fields: ["디스크", "협착증", "추나·교정"],
    tone: "primary",
  },
  {
    name: "OOO 진료원장",
    role: "교통사고·재활 클리닉",
    qualifications: [
      "OO대학교 한의학 석사",
      "전 OO한방병원 진료부장",
      "대한한방병원협회 정회원",
      "대한약침학회 정회원",
      "교통사고 한방진료 임상 다수",
    ],
    fields: ["교통사고", "후유증", "약침"],
    tone: "accent",
  },
  {
    name: "OOO 진료원장",
    role: "면역·여성 클리닉",
    qualifications: [
      "OO대학교 한의학 석사",
      "전 OO한방병원 진료의",
      "대한한방소아과학회 정회원",
      "대한한방부인과학회 정회원",
      "면역·만성질환 임상 다수",
    ],
    fields: ["면역", "산후조리", "성장"],
    tone: "deep",
  },
];

const ASSOC_DOCTORS: Doctor[] = [
  {
    name: "OOO 한의사",
    role: "통증·재활 진료",
    qualifications: [
      "OO대학교 한의학 학사",
      "대한한방병원협회 정회원",
      "근골격계 한방 진료 임상 다수",
      "약침·봉침 시술 다수",
    ],
    fields: ["근골격계", "약침"],
    tone: "primary",
  },
  {
    name: "OOO 한의사",
    role: "면역·만성 진료",
    qualifications: [
      "OO대학교 한의학 학사",
      "대한한방내과학회 정회원",
      "만성피로·소화기 임상 다수",
      "체질 진료 임상 다수",
    ],
    fields: ["만성피로", "체질 한약"],
    tone: "accent",
  },
];

const TONES: Record<Doctor["tone"], string> = {
  primary: "from-primary-100 via-primary-200 to-primary-300",
  accent: "from-accent-100 via-accent-200 to-primary-200",
  deep: "from-primary-200 via-primary-300 to-primary-400",
};

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="rounded-2xl bg-white border border-neutral-200 shadow-card overflow-hidden transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl">
      {/* TODO(client-asset): 의료진 프로필 사진 교체 */}
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${TONES[doctor.tone]}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.35),transparent_60%)]" />
      </div>
      <div className="p-6 lg:p-7">
        <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] font-semibold text-accent-600">
          <Award size={12} aria-hidden="true" /> {doctor.role}
        </span>
        <h3 className="mt-2 text-[20px] lg:text-[22px] font-bold text-primary-700">{doctor.name}</h3>

        <ul className="mt-4 space-y-1.5 text-[13px] lg:text-[14px] text-neutral-600 leading-relaxed">
          {doctor.qualifications.map((q, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-accent-500 shrink-0" aria-hidden="true" />
              <span>{q}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2">
          {doctor.fields.map((f, i) => (
            <li
              key={i}
              className="inline-flex items-center h-7 px-3 rounded-full bg-primary-50 text-primary-700 text-[12px] font-semibold"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function DoctorsPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "MEDICAL TEAM",
        title: (
          <>
            전문성을 갖춘 의료진이<br />
            <span className="text-accent-300">함께 진료합니다</span>
          </>
        ),
        description: (
          <>
            한방·양방 협진 경험을 갖춘 의료진이 협력해<br className="hidden sm:block" />
            환자분의 회복을 처음부터 끝까지 함께 살핍니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "의료진 소개" },
        ],
        stats: [
          { eyebrow: "진료 의료진", value: "5인 진료", caption: "한의사 협진 체계" },
          { eyebrow: "진료 분야", value: "5개 클리닉", caption: "통합 한방 진료" },
          { eyebrow: "협진 가능", value: "필요시 협진", caption: "영상검사 안내" },
          { eyebrow: "경력 합계", value: "임상 다수", caption: "체계적 진료 경험", accent: true },
        ],
        actions: (
          <>
            <Button href={ROUTES.about.facility} variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              시설 둘러보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              진료 예약
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
      {/* Lead doctors */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>LEAD PHYSICIANS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            진료를 책임지는 대표 의료진
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            각 클리닉의 진료를 책임지는 의료진을 소개합니다. 환자분의 체질과 일상까지 함께 보고
            정성스럽게 진료해 드립니다.
          </p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {LEAD_DOCTORS.map((d) => (
            <DoctorCard key={d.name} doctor={d} />
          ))}
        </div>
      </Reveal>

      {/* Associate doctors */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>ASSOCIATE DOCTORS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            협진을 함께하는 한의사
          </h2>
        </header>
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {ASSOC_DOCTORS.map((d) => (
            <DoctorCard key={d.name} doctor={d} />
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              어떤 의료진에게 진료받으실지<br />
              먼저 상담받아 보십시오.
            </>
          }
          description="증상에 맞는 의료진과 진료 일정을 함께 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
