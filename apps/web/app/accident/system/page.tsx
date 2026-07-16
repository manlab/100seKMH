import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = pageMeta({
  title: "치료·입원 시스템",
  description:
    "백세한방병원 교통사고 치료·입원 상담 안내 — 현재 불편과 통원 가능 여부, 병실 운영 상황을 확인해 안내합니다.",
  path: ROUTES.accident.system,
});

const ACCIDENT_CATEGORY = GNB.find((g) => g.href === ROUTES.accident.root);

const ADMISSION_TARGET = [
  "통증이나 불편으로 일상생활에 지장이 있는 분",
  "두통·어지럼·수면 불편이 함께 있는 분",
  "통원 일정 조율이 어려운 분",
  "사고 직후 현재 상태 확인이 필요한 분",
  "거주지나 직장 상황으로 통원이 어려운 분",
  "일상 복귀 전 상태 점검이 필요한 분",
];

const DAILY_SCHEDULE = [
  { time: "09:00", title: "상태 확인", desc: "현재 불편과 밤사이 변화를 확인합니다." },
  { time: "11:00", title: "진료 상담", desc: "통증 부위와 움직임의 불편을 상담합니다." },
  { time: "14:00", title: "치료 안내", desc: "의료진 판단에 따라 필요한 진료를 안내합니다." },
  { time: "16:00", title: "경과 확인", desc: "당일 상태와 이후 상담 방향을 확인합니다." },
];

export default function AccidentSystemPage() {
  return (
    <ClinicalGuidePage
      category="교통사고"
      categoryEyebrow="TREATMENT & ADMISSION"
      categoryHref={ROUTES.accident.root}
      lnbItems={ACCIDENT_CATEGORY?.children ?? []}
      visualPath={ROUTES.accident.system}
      title="입원 상담이 필요할 때 현재 상태부터 확인합니다"
      description="통증 정도, 통원 가능 여부, 병실 운영 상황을 확인한 뒤 입원 상담 방향을 안내합니다."
      overviewTitle="입원 여부는 진료 후 함께 판단합니다"
      overview="교통사고 후 불편은 증상, 생활 환경, 통원 가능 여부에 따라 상담 내용이 달라질 수 있습니다. 백세한방병원은 현재 상태와 병실 운영 상황을 확인한 뒤 필요한 안내를 드립니다."
      topics={ADMISSION_TARGET.map((t) => ({ title: t, description: "입원 상담 시 함께 확인하는 사항입니다.", href: ROUTES.accident.system }))}
      process={DAILY_SCHEDULE.map((s) => `${s.time} ${s.title}: ${s.desc}`)}
      stats={[
        { eyebrow: "입원 안내", value: "개별 판단", caption: "진료 후 필요 여부 확인" },
        { eyebrow: "병실", value: "운영 상황", caption: "방문 시점에 따라 안내" },
        { eyebrow: "보험", value: "보험사 확인", caption: "접수 정보 확인", accent: true },
        { eyebrow: "상담", value: "현재 상태", caption: "증상과 통원 가능 여부" },
      ]}
      notice="입원 여부는 외래 진료 후 의료진이 함께 판단해 드립니다."
    />
  );
}
