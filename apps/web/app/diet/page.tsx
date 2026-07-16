import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "다이어트",
  description: "생활 습관과 건강 상태를 함께 확인하는 백세한방병원 체중 관리 상담 안내입니다.",
  path: ROUTES.diet.root,
});

const items = GNB.find((item) => item.href === ROUTES.diet.root)?.children ?? [];

export default function DietPage() {
  return (
    <ClinicalGuidePage
      category="다이어트"
      categoryEyebrow="WEIGHT MANAGEMENT GUIDE"
      categoryHref={ROUTES.diet.root}
      lnbItems={items}
      visualPath={ROUTES.diet.root}
      title="체중보다 먼저 생활 리듬을 함께 살핍니다"
      description="식사, 수면, 활동량, 스트레스와 현재 건강 상태를 확인해 체중 관리 상담 방향을 안내합니다."
      overviewTitle="개별 생활 패턴을 바탕으로 상담합니다"
      overview="체중 변화에는 식사 습관, 수면, 활동량, 스트레스, 기존 질환과 복용 중인 약 등 여러 요인이 관여할 수 있습니다. 진료 시 현재 생활 패턴과 건강 상태를 확인한 뒤 개인 상황에 맞춰 상담합니다."
      topics={[
        {
          title: "생활 리듬 확인",
          description: "식사 시간, 수면, 활동량처럼 매일 반복되는 습관을 먼저 정리합니다.",
        },
        {
          title: "체중 변화 요인",
          description: "생활 습관과 건강 상태를 함께 살피며 원인을 단정하지 않습니다.",
          href: ROUTES.diet.causes,
        },
        {
          title: "상담이 필요한 경우",
          description: "일상 불편과 건강 상태를 바탕으로 진료 상담이 필요한지 확인합니다.",
          href: ROUTES.diet.guide,
        },
      ]}
      guideTitle="진료 전 함께 확인하는 사항"
      stats={[
        { eyebrow: "식사", value: "섭취 리듬", caption: "식사 시간과 패턴 확인" },
        { eyebrow: "생활", value: "수면·활동", caption: "일상 에너지 흐름 확인" },
        { eyebrow: "건강", value: "기존 상태", caption: "질환과 복용약 참고" },
      ]}
      process={[
        "현재 생활 패턴과 건강 상태를 상담합니다.",
        "기존 질환과 복용 중인 약을 확인합니다.",
        "일상에서 조정할 수 있는 부분을 함께 살핍니다.",
        "개인 상황에 맞는 상담 방향을 안내합니다.",
      ]}
      notice="상담 내용과 진료 방향은 개인의 건강 상태에 따라 달라질 수 있으며, 구체적인 내용은 진료 후 안내합니다."
    />
  );
}
