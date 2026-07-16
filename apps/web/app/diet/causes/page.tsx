import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "비만의 원인",
  description: "생활 습관과 건강 상태를 함께 살펴보는 체중 관리 상담 안내입니다.",
  path: ROUTES.diet.causes,
});

const items = GNB.find((item) => item.href === ROUTES.diet.root)?.children ?? [];

export default function DietCausesPage() {
  return (
    <ClinicalGuidePage
      category="다이어트"
      categoryEyebrow="WEIGHT MANAGEMENT GUIDE"
      categoryHref={ROUTES.diet.root}
      lnbItems={items}
      visualPath={ROUTES.diet.causes}
      title="체중 변화와 관련된 요인을 함께 확인합니다"
      description="식사, 수면, 활동량, 스트레스처럼 생활 속 요인을 현재 건강 상태와 함께 살펴봅니다."
      overviewTitle="한 가지 원인으로 단정하지 않습니다"
      overview="체중 변화는 생활 습관뿐 아니라 건강 상태, 복용 중인 약, 호르몬·대사 관련 문제 등 다양한 요인과 관련될 수 있습니다. 이 페이지는 일반적인 생활 정보를 제공하며, 개인의 상태를 진단하거나 원인을 확정하지 않습니다."
      topics={[
        {
          title: "식사와 활동",
          description: "식사 시간, 섭취 패턴, 활동량처럼 일상 리듬과 관련된 요인을 확인합니다.",
        },
        {
          title: "수면과 스트레스",
          description: "수면의 질과 스트레스 변화를 생활 패턴과 함께 상담합니다.",
        },
        {
          title: "건강 상태",
          description: "기존 질환과 복용 중인 약을 확인하고 필요한 경우 관련 진료과 상담을 안내합니다.",
        },
      ]}
      guideTitle="진료 전 함께 확인하는 사항"
      stats={[
        { eyebrow: "패턴", value: "식사·활동", caption: "일상 리듬 확인" },
        { eyebrow: "컨디션", value: "수면·스트레스", caption: "최근 변화 확인" },
        { eyebrow: "건강", value: "병력·복용약", caption: "상담 전 참고" },
      ]}
      notice="짧은 기간의 급격한 체중 변화, 심한 피로, 부종 등 건강 변화가 있으면 관련 진료과와 먼저 상담해 주세요."
    />
  );
}
