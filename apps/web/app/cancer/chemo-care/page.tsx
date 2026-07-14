import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "항암 부작용 관리 안내",
  description: "항암 치료 중 일상 속 불편에 관한 백세한방병원 진료 상담 안내입니다.",
  path: ROUTES.cancer.chemoCare,
});

const items = GNB.find((item) => item.href === ROUTES.cancer.root)?.children ?? [];

export default function CancerChemoCarePage() {
  return (
    <ClinicalGuidePage
      category="암 통합치료"
      categoryEyebrow="INTEGRATIVE CANCER CARE"
      categoryHref={ROUTES.cancer.root}
      lnbItems={items}
      visualPath={ROUTES.cancer.chemoCare}
      title="항암 치료 중 불편에 관한 진료 안내"
      description="현재 항암 일정과 몸 상태를 확인한 뒤, 일상 속 불편에 대한 상담 방향을 안내합니다."
      overviewTitle="치료 일정과 현재 상태를 함께 확인합니다"
      overview="항암 치료 중 나타나는 증상과 불편은 치료 종류, 일정, 동반 질환에 따라 달라질 수 있습니다. 진료 전 항암 치료를 받는 의료기관, 치료 일정, 복용 중인 약을 알려 주시면 현재 상태를 확인하는 데 도움이 됩니다."
      topics={[
        { title: "치료 일정 확인", description: "예정된 항암 일정과 최근 치료 경과를 확인합니다." },
        { title: "일상 불편 상담", description: "식사, 수면, 피로처럼 일상에 영향을 주는 변화를 함께 살펴봅니다." },
        { title: "복용 약 확인", description: "현재 복용 중인 처방약과 건강 관련 제품을 확인한 뒤 상담합니다." },
      ]}
      process={["항암 치료 정보와 현재 상태를 확인합니다.", "불편한 증상과 생활 변화를 상담합니다.", "담당 의료진의 계획을 고려해 진료 방향을 안내합니다.", "필요한 경우 기존 치료기관과의 상담을 권합니다."]}
      notice="고열, 출혈, 호흡 곤란, 심한 탈수 등 응급 증상이 있으면 항암 치료를 받는 의료기관에 즉시 문의해 주세요."
    />
  );
}
