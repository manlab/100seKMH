import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "암 통합치료",
  description: "백세한방병원 암 통합치료 안내. 수술 후 회복, 항암 치료 중 불편, 전이·재발 관리와 관련한 진료 상담 정보를 안내합니다.",
  path: ROUTES.cancer.root,
});

const items = GNB.find((item) => item.href === ROUTES.cancer.root)?.children ?? [];

export default function CancerPage() {
  return (
    <ClinicalGuidePage
      category="암 통합치료"
      categoryEyebrow="INTEGRATIVE CANCER CARE"
      categoryHref={ROUTES.cancer.root}
      lnbItems={items}
      visualPath={ROUTES.cancer.postSurgery}
      title="암 치료 과정의 불편을 함께 살핍니다"
      description="현재 치료 이력과 일상 속 불편을 확인한 뒤, 필요한 진료와 상담 방향을 안내합니다."
      overviewTitle="치료 과정과 회복기에 필요한 진료를 안내합니다"
      overview="암 치료 과정에서 겪는 피로, 식사, 수면, 통증 등은 개인의 치료 이력과 현재 상태에 따라 다르게 나타날 수 있습니다. 백세한방병원은 주치료 의료진의 계획을 존중하며, 진료 전 현재 상태와 복용 중인 약을 함께 확인합니다."
      topics={[
        { title: "수술 후 회복", description: "수술 이후의 컨디션 변화와 생활 불편을 확인하고, 회복기에 필요한 진료 상담을 안내합니다.", href: ROUTES.cancer.postSurgery },
        { title: "항암 부작용 관리", description: "항암 치료 중 나타나는 불편에 대해 현재 치료 일정과 증상을 확인한 뒤 상담 방향을 안내합니다.", href: ROUTES.cancer.chemoCare },
        { title: "전이·재발 관리", description: "검사·치료 계획은 담당 의료진과 논의하고, 일상 관리와 진료 상담이 필요한 부분을 함께 확인합니다.", href: ROUTES.cancer.recurrenceCare },
      ]}
      process={["현재 치료 이력과 불편을 확인합니다.", "복용 중인 약과 검사·치료 일정을 확인합니다.", "개별 상태에 맞는 진료 방향을 상담합니다.", "진료 후 변화를 확인하며 안내를 조정합니다."]}
      notice="암의 진단과 표준 치료 계획은 관련 진료과 의료진의 판단이 우선입니다. 현재 받고 있는 치료와 복용 중인 약을 진료 전 알려 주세요."
    />
  );
}
