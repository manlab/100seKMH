import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "수술 후 회복 안내",
  description: "암 수술 후 회복기에 느끼는 불편과 생활 관리에 관한 백세한방병원 진료 상담 안내입니다.",
  path: ROUTES.cancer.postSurgery,
});

const items = GNB.find((item) => item.href === ROUTES.cancer.root)?.children ?? [];

export default function CancerPostSurgeryPage() {
  return (
    <ClinicalGuidePage
      category="암 통합치료"
      categoryEyebrow="INTEGRATIVE CANCER CARE"
      categoryHref={ROUTES.cancer.root}
      lnbItems={items}
      title="수술 후 회복기 진료 안내"
      description="수술 이후 달라진 컨디션과 일상 속 불편을 살펴보고 상담 방향을 안내합니다."
      overviewTitle="회복기 상태를 확인하고 진료 방향을 상담합니다"
      overview="수술 후 회복 속도와 불편은 수술 부위, 치료 경과, 기존 질환, 복용 중인 약에 따라 다릅니다. 진료 시 현재 불편과 생활 변화를 확인하고 필요한 상담을 안내합니다."
      topics={[
        { title: "현재 불편 확인", description: "통증, 피로, 식사와 수면 변화처럼 회복기에 느끼는 불편을 함께 확인합니다." },
        { title: "치료 이력 확인", description: "수술 내용과 이후 치료 계획, 복용 중인 약을 확인해 상담 방향을 정합니다." },
        { title: "생활 관리 상담", description: "일상 복귀 과정에서 궁금한 점을 확인하고 개별 상태에 맞춰 안내합니다." },
      ]}
      process={["수술과 현재 치료 이력을 확인합니다.", "회복 중 느끼는 불편을 상담합니다.", "필요한 진료 방향을 함께 안내합니다.", "변화에 따라 상담 내용을 조정합니다."]}
      notice="수술 부위 이상, 발열, 호흡 곤란, 심한 통증 등 급성 증상이 있으면 수술을 받은 의료기관 또는 응급의료기관에 먼저 문의해 주세요."
    />
  );
}
