import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "시설 안내",
  description:
    "백세한방병원 시설을 둘러보세요. 진료실·치료실·입원실·탕전실까지 환자 동선을 고려해 설계했습니다.",
  path: "/about/facility",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

type Facility = {
  name: string;
  desc: string;
  tone: "primary" | "accent" | "deep" | "soft";
};

const TONES: Record<Facility["tone"], string> = {
  primary: "from-primary-100 via-primary-200 to-primary-300",
  accent: "from-accent-100 via-accent-200 to-primary-200",
  deep: "from-primary-200 via-primary-300 to-primary-400",
  soft: "from-neutral-100 via-primary-100 to-accent-100",
};

const FACILITIES: Facility[] = [
  { name: "병원 외관", desc: "환자 동선과 접근성을 고려한 입구 설계.", tone: "primary" },
  { name: "1층 로비", desc: "넓고 밝은 대기 공간으로 편안하게 머무실 수 있습니다.", tone: "soft" },
  { name: "원무 접수", desc: "신속하고 친절한 접수·수납 안내가 이뤄집니다.", tone: "accent" },
  { name: "진료 대기실", desc: "프라이버시를 고려한 좌석 배치로 편안한 대기를 돕습니다.", tone: "primary" },
  { name: "원장 진료실", desc: "체질·증상을 충분히 듣는 1:1 진료 공간.", tone: "deep" },
  { name: "한의사 진료실", desc: "각 클리닉별 전문 진료가 이루어지는 공간입니다.", tone: "soft" },
  { name: "침 치료실", desc: "프라이버시를 고려한 개별 침대 구성.", tone: "primary" },
  { name: "약침·봉침실", desc: "정밀 시술이 가능한 청결한 치료 환경을 갖췄습니다.", tone: "accent" },
  { name: "추나 치료실", desc: "체형 분석·추나 시술을 위한 전용 공간입니다.", tone: "deep" },
  { name: "물리치료실", desc: "전기·온열 치료 장비가 체계적으로 배치되어 있습니다.", tone: "soft" },
  { name: "도수 치료실", desc: "정밀한 도수 치료를 위한 개별 룸을 운영합니다.", tone: "primary" },
  { name: "재활 운동실", desc: "재활 운동 동작을 지도받을 수 있는 운동 공간.", tone: "accent" },
  { name: "한약 탕전실", desc: "GMP 기준에 따라 한약을 정성스럽게 달여 드립니다.", tone: "deep" },
  { name: "한약 보관실", desc: "온도·습도가 관리되는 청결한 한약재 보관 공간.", tone: "soft" },
  { name: "1인 입원실", desc: "프라이버시가 중요한 환자분을 위한 1인 전용 입원실.", tone: "primary" },
  { name: "다인 입원실", desc: "체계적인 동선으로 편안한 입원 치료가 가능합니다.", tone: "accent" },
  { name: "환자 식당", desc: "회복기에 맞춘 식단을 정성스럽게 준비해 드립니다.", tone: "deep" },
  { name: "옥상 정원", desc: "산책과 휴식을 위한 자연 친화 공간을 제공합니다.", tone: "soft" },
];

export default function FacilityPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "FACILITY TOUR",
        title: (
          <>
            환자 동선까지 고려한<br />
            <span className="text-accent-300">정성스러운 진료 공간</span>
          </>
        ),
        description: (
          <>
            진료실, 치료실, 입원실, 탕전실까지<br className="hidden sm:block" />
            환자분이 머무시는 모든 공간을 정성껏 설계했습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "시설 둘러보기" },
        ],
        stats: [
          { eyebrow: "총 시설", value: "18개 공간", caption: "진료·치료·입원" },
          { eyebrow: "입원 시설", value: "1·2·3·4인실", caption: "맞춤형 입원" },
          { eyebrow: "한약 시설", value: "GMP 탕전", caption: "위생 관리 철저" },
          { eyebrow: "운영 원칙", value: "동선 설계", caption: "체계적 진료", accent: true },
        ],
        actions: (
          <>
            <Button href={ROUTES.about.location} variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              <MapPin size={16} aria-hidden="true" />
              오시는 길
            </Button>
            <Button href={ROUTES.about.admission} variant="accent" size="lg">
              입원 안내 보기 <ArrowRight size={16} aria-hidden="true" />
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
      {/* Intro */}
      <Reveal as="section">
        <Eyebrow>FACILITY OVERVIEW</Eyebrow>
        <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
          환자분 동선과 회복까지<br className="hidden sm:block" />
          <span className="text-accent-600">함께 살핀 진료 공간</span>
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원은 진료부터 치료, 입원, 회복까지 환자분이 머무시는 모든 공간을 정성껏
          설계했습니다. 동선이 짧고, 대기가 편하며, 프라이버시가 보호되는 진료 공간을 만나보세요.
        </p>
      </Reveal>

      {/* Facilities grid */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>FACILITY GALLERY</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            18개 시설 둘러보기
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {FACILITIES.map((f) => (
            <article
              key={f.name}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card overflow-hidden transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              {/* TODO(client-asset): 시설 사진으로 교체 */}
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${TONES[f.tone]}`}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.3),transparent_60%)]" />
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="text-[16px] lg:text-[17px] font-bold text-primary-700">{f.name}</h3>
                <p className="mt-2 text-[13px] lg:text-[14px] text-neutral-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-neutral-500">
          ※ 시설 사진은 개원 후 실제 사진으로 교체 예정입니다.
        </p>
      </Reveal>

      {/* CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              직접 방문해 둘러보고 싶으시다면,<br />
              먼저 전화 한 통 부탁드립니다.
            </>
          }
          description="방문 일정과 안내를 도와드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
