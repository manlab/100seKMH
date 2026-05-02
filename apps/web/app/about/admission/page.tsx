import type { Metadata } from "next";
import { ArrowRight, Phone, Bed, Activity, Stethoscope, HeartPulse, Utensils, Users } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InContentCta } from "@/components/ui/InContentCta";

export const metadata: Metadata = pageMeta({
  title: "입원 안내",
  description:
    "백세한방병원 입원 안내. 입원 대상, 입원실 종류(1·2·3·4인실), 입원 절차와 면회·식사 안내까지 한눈에 정리했습니다.",
  path: "/about/admission",
});

const ABOUT_LNB_ITEMS = GNB.find((g) => g.href === ROUTES.about.greeting)?.children ?? [];

const TARGETS = [
  { Icon: Activity, title: "교통사고 후유증", desc: "사고 후 통증·어지럼증·집중 치료가 필요한 환자분." },
  { Icon: Stethoscope, title: "급성·만성 통증", desc: "디스크·협착증·관절통 등으로 일상이 어려우신 분." },
  { Icon: HeartPulse, title: "산후 회복", desc: "출산 후 회복·산후풍 관리가 필요한 산모." },
  { Icon: Users, title: "수술 후 한방 재활", desc: "수술·치료 이후 한방 재활이 필요한 환자분." },
];

type Room = {
  type: string;
  beds: string;
  features: string[];
  tone: "primary" | "accent" | "deep" | "soft";
};

const TONES: Record<Room["tone"], string> = {
  primary: "from-primary-100 via-primary-200 to-primary-300",
  accent: "from-accent-100 via-accent-200 to-primary-200",
  deep: "from-primary-200 via-primary-300 to-primary-400",
  soft: "from-neutral-100 via-primary-100 to-accent-100",
};

const ROOMS: Room[] = [
  {
    type: "1인 입원실",
    beds: "1인 사용",
    features: ["프라이버시 보호", "보호자 침대 제공", "전용 화장실", "TV·냉장고"],
    tone: "primary",
  },
  {
    type: "2인 입원실",
    beds: "2인 사용",
    features: ["프라이버시 커튼", "보호자 의자", "공용 화장실", "수납 공간"],
    tone: "accent",
  },
  {
    type: "3인 입원실",
    beds: "3인 사용",
    features: ["넓은 동선 확보", "보호자 의자", "공용 화장실", "수납 공간"],
    tone: "deep",
  },
  {
    type: "4인 입원실",
    beds: "4인 사용",
    features: ["기본 입원실", "프라이버시 커튼", "공용 화장실", "수납 공간"],
    tone: "soft",
  },
];

const PROCESS = [
  { num: "01", title: "진료·상담", desc: "내원 후 진료를 통해 입원 필요 여부를 안내드립니다." },
  { num: "02", title: "입원 결정", desc: "환자 상태에 맞는 입원실 종류와 기간을 함께 정합니다." },
  { num: "03", title: "입원 수속", desc: "원무과에서 보험·서류 안내를 받으시고 수속을 진행합니다.", highlight: true },
  { num: "04", title: "입원 치료", desc: "정기 회진·치료·재활 운동·식사가 체계적으로 이뤄집니다." },
  { num: "05", title: "퇴원·사후관리", desc: "퇴원 후 외래 일정과 자세·생활 가이드를 안내드립니다." },
];

export default function AdmissionPage() {
  return (
    <SubLayout
      hero={{
        eyebrow: "ADMISSION",
        title: (
          <>
            집중 치료가 필요한 분께<br />
            <span className="text-accent-300">체계적인 입원 진료</span>
          </>
        ),
        description: (
          <>
            교통사고 후유증·급성 통증·산후 회복까지<br className="hidden sm:block" />
            한방 입원 진료로 정성스럽게 돌봐 드립니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "병원소개" },
          { label: "입원 안내" },
        ],
        stats: [
          { eyebrow: "입원실 종류", value: "1·2·3·4인실", caption: "맞춤형 선택" },
          { eyebrow: "회진 운영", value: "정기 회진", caption: "의료진 협진" },
          { eyebrow: "식사 제공", value: "회복식 식단", caption: "환자 맞춤" },
          { eyebrow: "보험 적용", value: "자동차보험 가능", caption: "절차 안내", accent: true },
        ],
        actions: (
          <>
            <Button href="#process" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              입원 절차 보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              입원 문의
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
      {/* Targets */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>WHO IT IS FOR</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            이런 분께 입원 진료를 권해 드립니다
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-[760px]">
            통원 치료만으로는 일상이 어렵거나, 집중적인 한방 치료가 필요한 환자분께 입원 진료를
            안내드립니다.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {TARGETS.map((t) => (
            <article
              key={t.title}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7 transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
                <t.Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[18px] lg:text-[20px] font-bold text-primary-700">{t.title}</h3>
              <p className="mt-2 text-[14px] lg:text-[15px] text-neutral-600 leading-relaxed">{t.desc}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Rooms */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>ROOM TYPES</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            입원실 종류 안내
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {ROOMS.map((r) => (
            <article
              key={r.type}
              className="rounded-2xl bg-white border border-neutral-200 shadow-card overflow-hidden transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              {/* TODO(client-asset): 입원실 사진 교체 */}
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${TONES[r.tone]}`}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.3),transparent_60%)]" />
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-semibold text-primary-700">
                  <Bed size={12} aria-hidden="true" /> {r.beds}
                </div>
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="text-[17px] font-bold text-primary-700">{r.type}</h3>
                <ul className="mt-3 space-y-1.5 text-[13px] text-neutral-600">
                  {r.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-accent-500 shrink-0" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-[12px] text-neutral-500">
          ※ 입원실 비용·이용 가능 여부는 진료 시 안내드립니다.
        </p>
      </Reveal>

      {/* Process */}
      <Reveal as="section">
        <header id="process" className="mb-8 lg:mb-10">
          <Eyebrow>ADMISSION PROCESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            입원부터 퇴원까지, 5단계 절차
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

      {/* Visiting & Meals */}
      <Reveal as="section">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>VISITING & MEALS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            면회·식사 안내
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          <article className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
              <Users size={24} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[18px] font-bold text-primary-700">면회 안내</h3>
            <ul className="mt-3 space-y-2 text-[14px] text-neutral-600 leading-relaxed">
              <li>· 평일·주말 면회 가능 시간: 10:00 — 20:00</li>
              <li>· 환자 회복을 위해 1회 면회 인원은 2명 이내로 부탁드립니다.</li>
              <li>· 감염병 유행 시기에는 면회가 제한될 수 있습니다.</li>
              <li>· 만 12세 이하 어린이 면회는 보호자 동반이 필요합니다.</li>
            </ul>
          </article>
          <article className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 lg:p-7">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
              <Utensils size={24} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[18px] font-bold text-primary-700">식사 안내</h3>
            <ul className="mt-3 space-y-2 text-[14px] text-neutral-600 leading-relaxed">
              <li>· 1일 3식 회복기 맞춤 식단을 제공해 드립니다.</li>
              <li>· 알레르기·식이 제한이 있으신 경우 사전에 알려 주십시오.</li>
              <li>· 산후·당뇨·저염 식단도 별도 안내가 가능합니다.</li>
              <li>· 식사 시간: 아침 8시 / 점심 12시 / 저녁 6시.</li>
            </ul>
          </article>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section">
        <InContentCta
          title={
            <>
              입원 진료가 필요하시다면,<br />
              먼저 전화로 상담받아 보십시오.
            </>
          }
          description="입원실 안내와 진료 절차를 도와드리겠습니다."
        />
      </Reveal>
    </SubLayout>
  );
}
