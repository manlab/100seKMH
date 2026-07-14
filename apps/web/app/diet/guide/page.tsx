import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "다이어트가 필요한 경우", description: "생활 속 불편과 건강 상태를 바탕으로 체중 관리 상담을 안내합니다.", path: ROUTES.diet.guide });
const items = GNB.find((item) => item.href === ROUTES.diet.root)?.children ?? [];

export default function DietGuidePage() {
  return <ClinicalGuidePage category="다이어트" categoryEyebrow="WEIGHT MANAGEMENT GUIDE" categoryHref={ROUTES.diet.root} lnbItems={items} visualPath={ROUTES.diet.guide} title="현재 생활의 불편을 함께 살펴봅니다" description="체중 자체보다 생활 속 불편과 건강 상태를 함께 확인해 상담 방향을 안내합니다." overviewTitle="개별 상황에 맞춰 상담합니다" overview="체중 관리 상담이 필요한지는 현재 건강 상태와 생활의 불편, 기존 질환, 개인 목표에 따라 다르게 판단할 수 있습니다. 진료 시 현재 상태를 확인하고 필요한 상담을 안내합니다." topics={[{ title: "생활 속 불편", description: "활동, 수면, 식사처럼 일상에서 느끼는 불편을 함께 확인합니다." }, { title: "건강 상태", description: "기존 질환과 복용 중인 약을 확인해 상담 방향을 정합니다." }, { title: "상담 목표", description: "개별 생활 패턴과 건강 상태를 바탕으로 실천 가능한 방향을 안내합니다." }]} process={["현재 생활 패턴과 불편을 상담합니다.", "건강 상태와 기존 이력을 확인합니다.", "개별 상황에 맞는 상담 방향을 안내합니다.", "필요한 경우 관련 진료과 상담을 권합니다."]} notice="체중 관리의 방법과 기간, 비용은 개인 상태와 진료 계획에 따라 달라지며, 진료 후 안내합니다." />;
}
