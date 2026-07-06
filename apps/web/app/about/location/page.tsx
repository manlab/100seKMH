import type { Metadata } from "next";
import { MapPin, Phone, Bus, Train, Car, ArrowRight, Building2 } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "오시는 길",
  description:
    "백세한방병원 오시는 길 안내. 주소, 대중교통(지하철·버스), 자가용·주차 안내까지 한눈에 정리했습니다.",
  path: "/about/location",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

const TRANSIT = [
  {
    Icon: Train,
    title: "지하철",
    items: [
      "부산 서면 중심가 MMM메디컬센터로 방문해 주세요",
      "건물 도착 후 9층 접수데스크에서 안내받으실 수 있습니다",
    ],
  },
  {
    Icon: Bus,
    title: "버스",
    items: [
      "부산진구 서면로 32 인근 정류장을 이용해 주세요",
      "하차 후 MMM메디컬센터 9층 접수데스크로 오시면 됩니다",
    ],
  },
  {
    Icon: Car,
    title: "자가용·주차",
    items: [
      "주소: 부산광역시 부산진구 서면로 32 MMM메디컬센터",
      "방문 전 대표번호로 주차 가능 여부를 확인해 주세요",
      "진료·입원 안내는 9층 접수데스크에서 도와드립니다",
    ],
  },
];

export default function LocationPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "DIRECTIONS",
        title: (
          <>
            가까이에서 정성스럽게,<br />
            <span className="text-accent-300">백세한방병원 오시는 길</span>
          </>
        ),
        description: (
          <>
            대중교통·자가용 모두 편리하게 이용하실 수 있습니다.<br className="hidden sm:block" />
            처음 방문하시는 분도 어렵지 않게 오실 수 있도록 안내드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "오시는 길" },
        ],
        stats: [
          { eyebrow: "위치", value: "부산 서면", caption: "MMM메디컬센터" },
          { eyebrow: "주차", value: "사전 문의", caption: "대표번호 안내" },
          { eyebrow: "전화", value: SITE.contact.representative, caption: "대표 번호" },
          { eyebrow: "운영", value: "월-토 진료", caption: "일요일 휴진", accent: true },
        ],
        actions: (
          <>
            <Button href={`tel:${SITE.contact.representative}`} external variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              <Phone size={16} aria-hidden="true" />
              전화 문의
            </Button>
            <Button href={ROUTES.about.hours} variant="accent" size="lg">
              진료시간 보기 <ArrowRight size={16} aria-hidden="true" />
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
      {/* Map placeholder */}
      <Reveal as="section">
        <Eyebrow>MAP</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          지도로 보는 병원 위치
        </h2>
        <div className="mt-6 lg:mt-8 rounded-2xl overflow-hidden border border-neutral-200 shadow-card">
          {/* TODO(client-asset): 카카오맵 임베드로 교체 */}
          <div
            className="relative aspect-[16/9] bg-gradient-to-br from-primary-100 via-accent-100 to-primary-200"
            role="img"
            aria-label={`${SITE.name} 위치 지도 (자리표시자)`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.45),transparent_60%)]" />
            {/* grid lines for map feel */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(12,35,64,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,35,64,0.08) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden="true"
            />
            {/* center marker */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-4 rounded-full bg-accent-500/30 animate-pulse" aria-hidden="true" />
                <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-500 text-white shadow-cta">
                  <MapPin size={28} aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[12px] font-semibold text-primary-700 shadow">
              <MapPin size={12} aria-hidden="true" /> {SITE.name}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Address card */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>ADDRESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            병원 주소·연락처
          </h2>
        </header>
        <div className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-8 grid sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600 shrink-0">
              <Building2 size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12px] tracking-[0.18em] font-semibold text-accent-600">ADDRESS</p>
              <p className="mt-1 text-[15px] lg:text-[16px] font-bold text-primary-700 leading-snug">
                {SITE.contact.address}
              </p>
              <p className="mt-2 text-[12px] text-neutral-500">
                ※ 자세한 위치는 지도와 함께 확인해 주십시오.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600 shrink-0">
              <Phone size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12px] tracking-[0.18em] font-semibold text-accent-600">CONTACT</p>
              <p className="mt-1 text-[18px] lg:text-[20px] font-bold text-primary-700 tabular">
                {SITE.contact.representative}
              </p>
              <p className="mt-1 text-[13px] text-neutral-600">
                상담 전용: <span className="tabular">{SITE.contact.counsel}</span>
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Transit / driving */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>HOW TO COME</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            교통·주차 안내
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            대중교통과 자가용 모두 편리합니다. 처음 방문하시는 분께는 전화 안내도 도와드립니다.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {TRANSIT.map((t) => (
            <article
              key={t.title}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
                <t.Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[18px] font-bold text-primary-700">{t.title}</h3>
              <ul className="mt-3 space-y-2 text-[14px] text-neutral-600 leading-relaxed">
                {t.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-accent-500 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              길이 헷갈리신다면,<br />
              먼저 전화로 안내받아 보십시오.
            </>
          }
          description="대중교통·주차 안내까지 친절하게 도와드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
