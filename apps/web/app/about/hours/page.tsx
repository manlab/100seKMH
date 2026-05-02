import type { Metadata } from "next";
import { Phone, Clock, MessageCircle, Calendar, AlertCircle, ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "진료시간",
  description:
    "백세한방병원 진료시간 안내. 평일·토요일·일요일·공휴일 모두 진료하며, 점심시간과 휴진 안내, 예약 방법까지 정리했습니다.",
  path: "/about/hours",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

type Schedule = { day: string; hours: string; note?: string; highlight?: boolean };

const SCHEDULE: Schedule[] = [
  { day: "월요일", hours: SITE.hours.weekday },
  { day: "화요일", hours: SITE.hours.weekday },
  { day: "수요일", hours: SITE.hours.weekday },
  { day: "목요일", hours: SITE.hours.weekday },
  { day: "금요일", hours: SITE.hours.weekday },
  { day: "토요일", hours: SITE.hours.saturday, note: "주말 진료" },
  { day: "일요일", hours: SITE.hours.sunday, note: "주말 진료", highlight: true },
  { day: "공휴일", hours: SITE.hours.holiday, note: "공휴일 진료" },
];

const NOTICES = [
  "점심시간은 12:30 — 13:30 입니다 (점심시간에는 진료가 진행되지 않습니다).",
  "설날·추석 당일은 휴진할 수 있으며, 사전에 공지사항으로 안내드립니다.",
  "진료 마감 30분 전까지 접수를 부탁드립니다.",
  "예약 환자분 우선 진료로 대기 시간이 단축됩니다.",
];

export default function HoursPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "OPENING HOURS",
        title: (
          <>
            1년 365일,<br />
            <span className="text-accent-300">언제나 진료합니다</span>
          </>
        ),
        description: (
          <>
            평일·토요일·일요일·공휴일 모두 진료해<br className="hidden sm:block" />
            치료가 끊기지 않도록 진료 일정을 운영하고 있습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "진료시간" },
        ],
        stats: [
          { eyebrow: "평일", value: SITE.hours.weekday, caption: "월요일 — 금요일" },
          { eyebrow: "토요일", value: SITE.hours.saturday, caption: "주말 진료" },
          { eyebrow: "일요일·공휴일", value: SITE.hours.sunday, caption: "365일 운영" },
          { eyebrow: "점심시간", value: SITE.hours.lunch, caption: "진료 중단", accent: true },
        ],
        actions: (
          <>
            <Button href={`tel:${SITE.contact.representative}`} external variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              <Phone size={16} aria-hidden="true" />
              {SITE.contact.representative}
            </Button>
            <Button href={ROUTES.community.counsel} variant="accent" size="lg">
              온라인 상담 <ArrowRight size={16} aria-hidden="true" />
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
      {/* Schedule table */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>SCHEDULE</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            요일별 진료시간
          </h2>
        </header>
        <div className="rounded-2xl bg-white border border-neutral-200 shadow-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-primary-50 text-primary-700">
              <tr>
                <th scope="col" className="py-3.5 px-5 lg:px-6 text-[13px] font-semibold tracking-wide w-[28%]">
                  요일
                </th>
                <th scope="col" className="py-3.5 px-5 lg:px-6 text-[13px] font-semibold tracking-wide">
                  진료시간
                </th>
                <th scope="col" className="py-3.5 px-5 lg:px-6 text-[13px] font-semibold tracking-wide hidden sm:table-cell">
                  비고
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {SCHEDULE.map((s) => (
                <tr
                  key={s.day}
                  className={s.highlight ? "bg-accent-50/60" : ""}
                >
                  <th scope="row" className="py-3.5 px-5 lg:px-6 text-[14px] font-bold text-primary-700">
                    {s.day}
                  </th>
                  <td className="py-3.5 px-5 lg:px-6 text-[14px] text-neutral-700 tabular">
                    {s.hours}
                  </td>
                  <td className="py-3.5 px-5 lg:px-6 text-[12px] text-neutral-500 hidden sm:table-cell">
                    {s.note ?? "-"}
                  </td>
                </tr>
              ))}
              <tr className="bg-neutral-50">
                <th scope="row" className="py-3.5 px-5 lg:px-6 text-[14px] font-bold text-accent-600">
                  점심시간
                </th>
                <td className="py-3.5 px-5 lg:px-6 text-[14px] text-neutral-700 tabular">
                  {SITE.hours.lunch}
                </td>
                <td className="py-3.5 px-5 lg:px-6 text-[12px] text-neutral-500 hidden sm:table-cell">
                  진료 중단
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Notices */}
      <Reveal as="section">
        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 lg:p-8">
          <header className="mb-5 lg:mb-6 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white text-accent-600">
              <AlertCircle size={20} aria-hidden="true" />
            </span>
            <div>
              <Eyebrow>NOTICE</Eyebrow>
              <h2 className="mt-1 text-[22px] lg:text-[26px] font-bold text-primary-700 leading-snug">
                휴진·접수 안내
              </h2>
            </div>
          </header>
          <ul className="space-y-3">
            {NOTICES.map((n, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] lg:text-[15px] text-neutral-700">
                <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-accent-500 text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Reservation CTAs */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>RESERVATION</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            예약·문의 방법 안내
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            전화·카카오톡·온라인 상담 모두 가능합니다. 편하신 방법으로 문의해 주십시오.
          </p>
        </header>
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-5">
          <a
            href={`tel:${SITE.contact.representative}`}
            className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
              <Phone size={24} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[18px] font-bold text-primary-700">전화 예약</h3>
            <p className="mt-2 text-[14px] text-neutral-600 leading-relaxed">
              가장 빠르고 간편한 방법입니다. 진료 시간 내 전화 주십시오.
            </p>
            <p className="mt-4 text-[18px] font-bold text-accent-600 tabular">
              {SITE.contact.representative}
            </p>
          </a>

          <a
            href={SITE.social.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
              <MessageCircle size={24} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[18px] font-bold text-primary-700">카카오톡 상담</h3>
            <p className="mt-2 text-[14px] text-neutral-600 leading-relaxed">
              평일·주말 모두 메시지로 문의 가능합니다. 순차적으로 답변드립니다.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-600">
              카카오톡 채널 <ArrowRight size={14} aria-hidden="true" />
            </p>
          </a>

          <a
            href={ROUTES.community.counsel}
            className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
              <Calendar size={24} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[18px] font-bold text-primary-700">온라인 상담</h3>
            <p className="mt-2 text-[14px] text-neutral-600 leading-relaxed">
              증상을 자세히 적어 보내 주시면, 의료진이 검토 후 안내드립니다.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-600">
              온라인 상담 신청 <ArrowRight size={14} aria-hidden="true" />
            </p>
          </a>
        </div>
      </Reveal>

      {/* Hours summary banner */}
      <Reveal as="section">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8 flex items-start gap-5">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 shrink-0">
            <Clock size={24} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-[18px] font-bold text-primary-700">한눈에 보는 진료시간</h3>
            <p className="mt-2 text-[14px] lg:text-[15px] text-neutral-600 leading-relaxed">
              평일 {SITE.hours.weekday} · 토요일 {SITE.hours.saturday} · 일요일·공휴일 {SITE.hours.sunday} ·
              점심시간 {SITE.hours.lunch}.
            </p>
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              진료 일정이 궁금하시다면,<br />
              먼저 전화 한 통 부탁드립니다.
            </>
          }
          description="가능한 진료 시간과 절차를 함께 안내해 드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
