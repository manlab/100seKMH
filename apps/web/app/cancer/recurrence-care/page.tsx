import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "전이·재발 관리 안내",
  description: "전이·재발 치료 과정에서 필요한 진료 상담과 일상 관리 안내를 제공합니다.",
  path: ROUTES.cancer.recurrenceCare,
});

const items = GNB.find((item) => item.href === ROUTES.cancer.root)?.children ?? [];

export default function CancerRecurrenceCarePage() {
  return (
    <ClinicalGuidePage
      category="암 통합치료"
      categoryEyebrow="INTEGRATIVE CANCER CARE"
      categoryHref={ROUTES.cancer.root}
      lnbItems={items}
      title="전이·재발 치료 과정의 진료 상담"
      description="검사와 치료 계획을 확인하고, 현재 일상에 필요한 진료 상담을 안내합니다."
      overviewTitle="담당 의료진의 치료 계획을 바탕으로 상담합니다"
      overview="전이·재발 여부의 진단과 치료 선택은 관련 진료과 의료진의 검사와 판단을 바탕으로 합니다. 백세한방병원은 현재 치료 계획을 대체하지 않으며, 치료 과정에서 느끼는 불편과 생활 관리에 대한 상담을 안내합니다."
      topics={[
        { title: "검사·치료 계획 확인", description: "현재 검사 결과와 치료 계획을 알고 계신 범위에서 확인합니다." },
        { title: "일상 불편 상담", description: "통증, 피로, 수면, 식사처럼 생활에 영향을 주는 변화를 함께 살펴봅니다." },
        { title: "진료 협력", description: "필요한 경우 현재 치료를 받는 의료기관과의 상담을 우선 권합니다." },
      ]}
      process={["현재 진단과 치료 계획을 확인합니다.", "생활 불편과 복용 약을 함께 확인합니다.", "개별 상태에 맞는 진료 상담을 안내합니다.", "변화가 있으면 담당 의료진과 상담하도록 안내합니다."]}
      notice="수술, 항암치료, 방사선치료, 정기 추적 검사와 관련한 결정은 담당 의료진과 상의해 주세요."
    />
  );
}
