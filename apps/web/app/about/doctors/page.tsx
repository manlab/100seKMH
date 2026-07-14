import type { Metadata } from "next";
import Image from "next/image";
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
    "백세한방병원 의료진을 소개합니다. 신승협 대표원장과 윤성수 진료원장이 환자분의 회복을 함께 봅니다.",
  path: "/about/doctors",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

type Doctor = {
  name: string;
  position: string;
  headline: string;
  image: string;
  imageAlt: string;
  fields: string[];
  education: string[];
  licenses?: string[];
  careers: string[];
  activities: string[];
  publications?: string[];
};

const DOCTORS: Doctor[] = [
  {
    name: "신승협",
    position: "대표원장",
    headline: "오랜 한방병원 진료·운영 경험으로 환자분의 회복을 살핍니다.",
    image: "/images/doctors/shin-seunghyup.jpg",
    imageAlt: "신승협 대표원장 프로필 사진",
    fields: ["한방내과", "약침", "카이로프랙틱", "입원 진료"],
    education: ["동국대 한의대 석사 졸업"],
    licenses: ["한의사 국가고시 면허 취득"],
    careers: [
      "동국대 부속 방배동 한방병원 수련의(서울)",
      "대구 동산 한방병원장 역임(대구)",
      "동산 한의원장 역임",
      "사회복지법인 오복당 한방병원장 역임(부산)",
      "신한의원 원장 역임(포항)",
      "청담요양병원 진료원장 역임(부산)",
      "백산신한의원 원장 역임(부산)",
      "화타한의원 원장(포항)",
    ],
    activities: [
      "대한 한방병원협회 내과전문의 수료",
      "대한 난치병치료학회원",
      "대한 약침학회원",
      "카이로프랙틱 자격 취득",
      "중국 장춘중의학원 명예박사 학위취득",
    ],
  },
  {
    name: "윤성수",
    position: "진료원장 · 한방내과 전문의",
    headline: "한방내과 전문의이자 이학 박사로 통합의학 기반 진료를 제공합니다.",
    image: "/images/doctors/yoon-seongsu.jpg",
    imageAlt: "윤성수 진료원장 프로필 사진",
    fields: ["한방내과", "통합의학", "암 증상 완화", "면역·만성"],
    education: [
      "경희대학교 한의학 학사",
      "차의과대학교 통합의학 석사",
      "차의과대학교 정보의학 박사",
    ],
    licenses: ["한방내과 전문의", "이학 박사"],
    careers: [
      "강동경희대학교 한방병원 일반수련의",
      "강동경희대학교 한방병원 한방암센터 한방내과 전문수련의",
      "前 코로나19 역학조사관",
    ],
    activities: [
      "『암 증상 완화 한의표준임상진료지침』 집필진",
      "대한한의사협회 정회원",
      "한방내과학회 정회원",
      "대한암한의학회 정회원",
      "대한통합암학회 인정의",
      "국제 요가 지도자 자격 RYT200",
    ],
    publications: [
      "Association of Weight Changes with SARS-CoV-2 Infection and Severe COVID-19 Outcomes: A Nationwide Retrospective Cohort Study. J Infect Public Health. 2023",
      "Exercise Frequency Reduction Is Associated With Higher Risk of Infection in Newly Diagnosed Diabetes: A Nationally Representative Cohort Study. J Korean Med Sci. 2023",
      "A Case Report of Surgical Site Infection after Breast Cancer Surgery that Improved with Taglisodog-eum Treatment Alone. Journal of Korean Traditional Oncology. 2023",
      "Health-Screening-Based Chronic Obstructive Pulmonary Disease and Its Effect on Cardiovascular Disease Risk. J Clin Med. 2022",
      "Development and validation of a nonalcoholic fatty liver disease-based self-diagnosis tool for diabetes. Ann Transl Med. 2022",
    ],
  },
];

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h4 className="text-[12px] tracking-[0.16em] font-semibold text-accent-600 uppercase">
        {title}
      </h4>
      <ul className="mt-3 space-y-1.5 text-[13px] lg:text-[14px] text-neutral-600 leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 inline-block h-1 w-1 rounded-full bg-accent-500 shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DoctorProfile({ doctor }: { doctor: Doctor }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-card transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl">
      <div className="grid lg:grid-cols-[360px_1fr]">
        <div className="relative min-h-[420px] bg-primary-100">
          <Image
            src={doctor.image}
            alt={doctor.imageAlt}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover object-top"
            priority={doctor.position === "대표원장"}
          />
          <div className="absolute inset-x-0 bottom-0 bg-primary-900/75 p-6 text-white">
            <p className="text-[12px] tracking-[0.18em] font-semibold text-accent-200">
              {doctor.position}
            </p>
            <h3 className="mt-1 text-[28px] font-bold">{doctor.name} 원장</h3>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] font-semibold text-accent-600">
            <Award size={12} aria-hidden="true" /> MEDICAL TEAM
          </span>
          <p className="mt-3 text-[18px] lg:text-[20px] font-bold text-primary-700 leading-snug">
            {doctor.headline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {doctor.fields.map((field) => (
              <li
                key={field}
                className="inline-flex h-8 items-center rounded-full bg-primary-50 px-3 text-[12px] font-semibold text-primary-700"
              >
                {field}
              </li>
            ))}
          </ul>

          <div className="mt-7 grid md:grid-cols-2 gap-6 lg:gap-7">
            <DetailList title="학력" items={doctor.education} />
            {doctor.licenses ? <DetailList title="자격" items={doctor.licenses} /> : null}
            <DetailList title="경력" items={doctor.careers} />
            <DetailList title="대외활동" items={doctor.activities} />
          </div>

          {doctor.publications ? (
            <section className="mt-7 rounded-2xl bg-primary-50/70 border border-primary-100 p-5">
              <h4 className="text-[12px] tracking-[0.16em] font-semibold text-accent-600 uppercase">
                주요 논문
              </h4>
              <ul className="mt-3 space-y-2 text-[12px] lg:text-[13px] text-neutral-600 leading-relaxed">
                {doctor.publications.map((paper) => (
                  <li key={paper} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1 w-1 rounded-full bg-primary-500 shrink-0" aria-hidden="true" />
                    <span>{paper}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
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
            백세한방병원 대표 의료진이 환자분의 증상과 회복 과정을<br className="hidden sm:block" />
            정성스럽게 살피고 치료 계획을 안내합니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "의료진 소개" },
        ],
        stats: [
          { eyebrow: "대표원장", value: "신승협", caption: "한방병원 진료 경험" },
          { eyebrow: "진료원장", value: "윤성수", caption: "한방내과 전문의" },
          { eyebrow: "진료 분야", value: "통합 한방", caption: "입원·외래 진료" },
          { eyebrow: "대표번호", value: SITE.contact.representative, caption: "진료 문의", accent: true },
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
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>PHYSICIANS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            백세한방병원 의료진
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            환자분의 현재 증상뿐 아니라 회복 과정과 일상 복귀까지 고려해 진료합니다.
          </p>
        </header>
        <div className="space-y-6 lg:space-y-8">
          {DOCTORS.map((doctor) => (
            <DoctorProfile key={doctor.name} doctor={doctor} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section">
        <InContentCta
          title={
            <>
              어떤 진료가 필요하실지<br />
              먼저 상담받아 보십시오.
            </>
          }
          description="증상에 맞는 진료 일정과 방문 절차를 함께 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
