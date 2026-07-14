import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "도수치료 안내",
  description: "도수치료 상담 전 현재 증상과 움직임의 불편을 확인하는 백세한방병원 안내입니다.",
  path: ROUTES.spineJoint.manualTherapy,
});

const items = GNB.find((item) => item.href === ROUTES.spineJoint.root)?.children ?? [];

export default function ManualTherapyPage() {
  return (
    <ClinicalGuidePage
      category="척추관절통증"
      categoryEyebrow="SPINE & JOINT CARE"
      categoryHref={ROUTES.spineJoint.root}
      lnbItems={items}
      visualPath={ROUTES.spineJoint.manualTherapy}
      title="도수치료 진료 안내"
      description="증상과 움직임의 불편을 확인한 뒤, 상담이 필요한지 개별 상태에 맞춰 안내합니다."
      overviewTitle="개별 상태를 확인한 뒤 진료 방향을 안내합니다"
      overview="도수치료 상담 여부와 진료 계획은 통증 부위, 현재 움직임, 외상 여부, 검사·치료 이력에 따라 달라질 수 있습니다. 진료 시 현재 상태를 확인하고 필요한 진료 방향을 안내합니다."
      topics={[{ title: "움직임 확인", description: "일상에서 제한되는 동작과 불편한 움직임을 확인합니다." }, { title: "통증 상담", description: "통증의 위치와 변화, 생활에 미치는 영향을 함께 살펴봅니다." }, { title: "개별 진료 안내", description: "현재 상태에 따라 필요한 진료와 상담 방향을 안내합니다." }]}
      process={["현재 불편과 활동 제한을 상담합니다.", "기존 이력과 현재 상태를 확인합니다.", "개별 상태에 따른 진료 방향을 안내합니다.", "필요한 경우 관련 진료과 상담을 권합니다."]}
      notice="도수치료의 적용 여부와 내용은 진료 후 결정되며, 모든 환자에게 동일하게 적용되지 않습니다."
    />
  );
}
