import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "추나치료 안내",
  description: "현재 상태를 확인한 뒤 추나치료 상담이 필요한지 안내하는 백세한방병원 페이지입니다.",
  path: ROUTES.spineJoint.chuna,
});

const items = GNB.find((item) => item.href === ROUTES.spineJoint.root)?.children ?? [];

export default function ChunaPage() {
  return (
    <ClinicalGuidePage
      category="척추관절통증"
      categoryEyebrow="SPINE & JOINT CARE"
      categoryHref={ROUTES.spineJoint.root}
      lnbItems={items}
      title="추나치료 진료 안내"
      description="현재 불편과 움직임의 변화를 확인한 뒤, 개별 상태에 맞는 진료 상담을 안내합니다."
      overviewTitle="진료 전 현재 상태를 충분히 확인합니다"
      overview="추나치료의 적용 여부와 진료 계획은 통증 부위, 움직임 제한, 기존 질환, 검사·치료 이력에 따라 달라질 수 있습니다. 진료 시 현재 상태를 확인한 뒤 필요한 상담 방향을 안내합니다."
      topics={[{ title: "현재 불편 확인", description: "통증 부위, 움직임 제한, 일상에 미치는 영향을 함께 확인합니다." }, { title: "이전 이력 확인", description: "기존 검사와 치료 이력, 복용 중인 약을 확인합니다." }, { title: "진료 상담", description: "개별 상태에 따라 필요한 진료와 생활 관리 상담을 안내합니다." }]}
      process={["증상과 생활 속 불편을 상담합니다.", "현재 상태와 관련 이력을 확인합니다.", "필요한 진료 방향을 안내합니다.", "진료 후 변화를 확인하며 상담을 조정합니다."]}
      notice="급성 외상, 골절 의심, 심한 신경학적 증상이 있는 경우에는 관련 진료과 평가가 우선 필요할 수 있습니다."
    />
  );
}
