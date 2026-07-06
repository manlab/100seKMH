import type { Metadata } from "next";
import Image from "next/image";
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
    "백세한방병원 시설 안내. 9층 접수·진료실, 10·13·14층 입원실, 12층 진료·치료실 등 실제 시설 사진과 층별 공간을 안내합니다.",
  path: "/about/facility",
});

const ABOUT_LNB_ITEMS =
  GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

type FacilityImage = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

type FloorFacility = {
  floor: string;
  title: string;
  spaces: string[];
  image: FacilityImage;
};

const FACILITY_IMAGES = {
  receptionDesk: {
    src: "/images/facility/reception-desk.webp",
    alt: "백세한방병원 접수데스크와 안내 공간",
    title: "접수데스크",
    caption: "내원 접수와 진료 안내를 도와드리는 9층 접수 공간",
  },
  treatmentRoom: {
    src: "/images/facility/treatment-room.webp",
    alt: "백세한방병원 치료실 침상과 치료 장비",
    title: "치료실",
    caption: "치료 동선을 고려해 정돈된 진료·치료 공간",
  },
  xrayRoom: {
    src: "/images/facility/xray-room.webp",
    alt: "백세한방병원 X-ray 촬영실",
    title: "X-ray실",
    caption: "진료에 필요한 영상 확인을 위한 촬영 공간",
  },
  inpatientRoom: {
    src: "/images/facility/inpatient-room.webp",
    alt: "백세한방병원 입원실 침상과 창가 공간",
    title: "입원실",
    caption: "회복과 휴식을 고려한 입원 병실",
  },
  oxygenTherapy: {
    src: "/images/facility/oxygen-therapy.webp",
    alt: "백세한방병원 고압산소치료실 장비",
    title: "고압산소치료실",
    caption: "전문 치료 장비를 갖춘 12층 치료 공간",
  },
  patientLounge: {
    src: "/images/facility/patient-lounge.webp",
    alt: "백세한방병원 환자 대기 라운지와 복도",
    title: "환자 라운지",
    caption: "내원객과 입원 환자를 위한 쾌적한 공용 공간",
  },
  therapyCorridor: {
    src: "/images/facility/therapy-corridor.webp",
    alt: "백세한방병원 치료실 앞 유리 복도",
    title: "치료실 동선",
    caption: "진료실과 치료실을 잇는 밝고 정돈된 동선",
  },
  seminarRoom: {
    src: "/images/facility/seminar-room.webp",
    alt: "백세한방병원 세미나실과 회의 테이블",
    title: "세미나실",
    caption: "의료진 협업과 교육을 위한 세미나 공간",
  },
  mainLounge: {
    src: "/images/facility/main-lounge.webp",
    alt: "백세한방병원 넓은 라운지와 대기 소파",
    title: "메인 라운지",
    caption: "편안하게 대기할 수 있는 넓은 라운지",
  },
  wardLounge: {
    src: "/images/facility/ward-lounge.webp",
    alt: "백세한방병원 병동 라운지와 복도",
    title: "병동 라운지",
    caption: "입원 병동과 연결된 휴식 공간",
  },
} satisfies Record<string, FacilityImage>;

const FLOOR_FACILITIES: FloorFacility[] = [
  {
    floor: "9층",
    title: "접수 및 진료실",
    spaces: [
      "접수데스크",
      "원장실",
      "진료실 1(양의)",
      "진료실 2",
      "고주파치료실",
      "처치실",
      "침구실",
      "조제실",
      "X-ray실",
    ],
    image: FACILITY_IMAGES.receptionDesk,
  },
  {
    floor: "10층",
    title: "입원실",
    spaces: ["1인실", "2인실", "4인실", "직원휴게실", "라운지"],
    image: FACILITY_IMAGES.inpatientRoom,
  },
  {
    floor: "12층",
    title: "진료 및 치료실",
    spaces: [
      "고압산소치료실",
      "대표원장 진료실",
      "총괄이사실",
      "도수치료실 1",
      "도수치료실 2",
      "세미나실",
      "탈의실",
      "임상병리실",
    ],
    image: FACILITY_IMAGES.oxygenTherapy,
  },
  {
    floor: "13층",
    title: "입원실",
    spaces: ["2인실", "4인실", "라운지"],
    image: FACILITY_IMAGES.patientLounge,
  },
  {
    floor: "14층",
    title: "입원실",
    spaces: ["1인실", "2인실", "원내식당", "라운지"],
    image: FACILITY_IMAGES.wardLounge,
  },
];

const GALLERY_IMAGES: FacilityImage[] = [
  FACILITY_IMAGES.receptionDesk,
  FACILITY_IMAGES.treatmentRoom,
  FACILITY_IMAGES.xrayRoom,
  FACILITY_IMAGES.inpatientRoom,
  FACILITY_IMAGES.oxygenTherapy,
  FACILITY_IMAGES.patientLounge,
  FACILITY_IMAGES.therapyCorridor,
  FACILITY_IMAGES.seminarRoom,
  FACILITY_IMAGES.mainLounge,
  FACILITY_IMAGES.wardLounge,
];

export default function FacilityPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "FACILITY TOUR",
        title: (
          <>
            환자 동선까지 고려한
            <br />
            <span className="text-accent-300">정성스러운 진료 공간</span>
          </>
        ),
        description: (
          <>
            9층·10층·12층·13층·14층에 걸쳐
            <br className="hidden sm:block" />
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
          {
            eyebrow: "치료 시설",
            value: "고압산소·도수",
            caption: "12층 치료실",
          },
          { eyebrow: "접수", value: "9층", caption: "접수·진료", accent: true },
        ],
        actions: (
          <>
            <Button
              href={ROUTES.about.location}
              variant="secondary"
              size="lg"
              className="bg-white text-primary-700 hover:bg-primary-50"
            >
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
          환자분 동선과 회복까지
          <br className="hidden sm:block" />
          <span className="text-accent-600">함께 살핀 진료 공간</span>
        </h2>
        <p className="mt-4 text-[15px] lg:text-[17px] text-neutral-600 leading-relaxed max-w-[760px]">
          백세한방병원은 부산 서면 MMM메디컬센터 9층, 10층, 12층, 13층, 14층에서
          접수·진료·치료·입원 공간을 운영합니다. 실제 시설 사진과 층별 구성을
          확인하시고 방문 동선을 미리 살펴보세요.
        </p>
      </Reveal>

      {/* Facilities grid */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>FACILITY BY FLOOR</Eyebrow>
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
              <div className="relative aspect-[4/3] bg-primary-100">
                <Image
                  src={f.image.src}
                  alt={f.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary-900/55 via-primary-900/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-[18px] font-bold text-primary-700 tabular shadow">
                  {f.floor}
                </div>
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="text-[16px] lg:text-[17px] font-bold text-primary-700">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] text-neutral-500 leading-relaxed">
                  {f.image.caption}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2 text-[12px] lg:text-[13px] text-neutral-600">
                  {f.spaces.map((space) => (
                    <li
                      key={space}
                      className="rounded-full bg-neutral-50 border border-neutral-200 px-3 py-1"
                    >
                      {space}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-neutral-500">
          ※ 세부 시설 이용 가능 여부는 진료 일정과 병동 운영 상황에 따라 달라질
          수 있습니다.
        </p>
      </Reveal>

      {/* Photo gallery */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>PHOTO GALLERY</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            실제 공간 사진
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            접수, 진료, 치료, 입원, 라운지 공간을 대표 사진으로 구성했습니다.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {GALLERY_IMAGES.map((image, index) => (
            <figure
              key={image.src}
              className={
                index === 0
                  ? "sm:col-span-2 rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-card"
                  : "rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-card"
              }
            >
              <div className="relative aspect-[16/9] bg-primary-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 66vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  className="object-cover transition-transform duration-base ease-out-soft hover:scale-[1.03]"
                />
              </div>
              <figcaption className="p-4">
                <strong className="block text-[14px] font-bold text-primary-700">
                  {image.title}
                </strong>
                <span className="mt-1 block text-[12px] text-neutral-500 leading-relaxed">
                  {image.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              직접 방문해 둘러보고 싶으시다면,
              <br />
              먼저 전화 한 통 부탁드립니다.
            </>
          }
          description="방문 일정과 안내를 도와드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
