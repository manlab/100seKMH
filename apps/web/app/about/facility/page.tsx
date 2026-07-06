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
    "백세한방병원 시설 안내. 9층 접수·진료실, 10·13·14층 입원실, 12층 진료·치료실 등 층별 시설을 안내합니다.",
  path: "/about/facility",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

type FloorFacility = {
  floor: string;
  title: string;
  spaces: string[];
  tone: "primary" | "accent" | "deep" | "soft";
};

const TONES: Record<FloorFacility["tone"], string> = {
  primary: "from-primary-100 via-primary-200 to-primary-300",
  accent: "from-accent-100 via-accent-200 to-primary-200",
  deep: "from-primary-200 via-primary-300 to-primary-400",
  soft: "from-neutral-100 via-primary-100 to-accent-100",
};

const FLOOR_FACILITIES: FloorFacility[] = [
  {
    floor: "9층",
    title: "접수 및 진료실",
    spaces: ["접수데스크", "원장실", "진료실 1(양의)", "진료실 2", "고주파치료실", "처치실", "침구실", "조제실", "X-ray실"],
    tone: "primary",
  },
  {
    floor: "10층",
    title: "입원실",
    spaces: ["1인실", "2인실", "4인실", "직원휴게실", "라운지"],
    tone: "accent",
  },
  {
    floor: "12층",
    title: "진료 및 치료실",
    spaces: ["고압산소치료실", "대표원장 진료실", "총괄이사실", "도수치료실 1", "도수치료실 2", "세미나실", "탈의실", "임상병리실"],
    tone: "deep",
  },
  {
    floor: "13층",
    title: "입원실",
    spaces: ["2인실", "4인실", "라운지"],
    tone: "soft",
  },
  {
    floor: "14층",
    title: "입원실",
    spaces: ["1인실", "2인실", "원내식당", "라운지"],
    tone: "primary",
  },
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
            9층·10층·12층·13층·14층에 걸쳐<br className="hidden sm:block" />
            접수, 진료, 치료, 입원 공간을 체계적으로 운영합니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "시설 둘러보기" },
        ],
        stats: [
          { eyebrow: "운영 층", value: "5개 층", caption: "9·10·12·13·14F" },
          { eyebrow: "입원 시설", value: "1·2·4인실", caption: "10·13·14층" },
          { eyebrow: "치료 시설", value: "고압산소·도수", caption: "12층 치료실" },
          { eyebrow: "접수", value: "9층", caption: "접수·진료", accent: true },
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
          백세한방병원은 부산 서면 MMM메디컬센터 9층, 10층, 12층, 13층, 14층에서 접수·진료·치료·입원
          공간을 운영합니다. 층별 시설 구성을 확인하시고 방문 동선을 미리 살펴보세요.
        </p>
      </Reveal>

      {/* Facilities grid */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>FACILITY GALLERY</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            층별 시설 둘러보기
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {FLOOR_FACILITIES.map((f) => (
            <article
              key={f.floor}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card overflow-hidden transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              {/* TODO(client-asset): 시설 사진으로 교체 */}
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${TONES[f.tone]}`}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.3),transparent_60%)]" />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/85 backdrop-blur-sm px-4 py-2 text-[18px] font-bold text-primary-700 tabular shadow">
                  {f.floor}
                </div>
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="text-[16px] lg:text-[17px] font-bold text-primary-700">{f.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2 text-[12px] lg:text-[13px] text-neutral-600">
                  {f.spaces.map((space) => (
                    <li key={space} className="rounded-full bg-neutral-50 border border-neutral-200 px-3 py-1">
                      {space}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-neutral-500">
          ※ 세부 시설 이용 가능 여부는 진료 일정과 병동 운영 상황에 따라 달라질 수 있습니다.
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
