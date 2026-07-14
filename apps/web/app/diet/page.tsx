import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "다이어트", description: "생활 습관과 건강 상태를 함께 확인하는 백세한방병원 체중 관리 상담 안내입니다.", path: ROUTES.diet.root });
const items = GNB.find((item) => item.href === ROUTES.diet.root)?.children ?? [];

export default function DietPage() {
  return <ClinicalGuidePage category="다이어트" categoryEyebrow="WEIGHT MANAGEMENT GUIDE" categoryHref={ROUTES.diet.root} lnbItems={items} visualPath={ROUTES.diet.root} title="생활 습관과 건강 상태를 함께 확인합니다" description="현재 생활 리듬과 건강 상태를 살펴보고 체중 관리 상담 방향을 안내합니다." overviewTitle="개별 생활 패턴을 바탕으로 상담합니다" overview="체중 변화에는 식사, 수면, 활동량, 스트레스, 기존 질환과 복용 중인 약 등 여러 요인이 관여할 수 있습니다. 진료 시 현재 생활 패턴과 건강 상태를 확인한 뒤 개별 상황에 맞는 상담을 안내합니다." topics={[{ title: "다이어트 소개", description: "체중 관리 상담에서 확인하는 생활 습관과 건강 상태를 안내합니다." }, { title: "비만의 원인", description: "일반적인 생활 습관 요인과 건강 상태를 구분해 살펴봅니다.", href: ROUTES.diet.causes }, { title: "다이어트가 필요한 경우", description: "현재 생활에서 느끼는 불편과 건강 상태를 바탕으로 상담합니다.", href: ROUTES.diet.guide }]} process={["현재 생활 패턴과 건강 상태를 상담합니다.", "기존 질환과 복용 중인 약을 확인합니다.", "개별 상황에 맞는 관리 상담을 안내합니다.", "필요한 경우 관련 진료과 상담을 권합니다."]} notice="상담 내용과 진료 방향은 개인의 건강 상태에 따라 달라질 수 있으며, 구체적인 내용은 진료 후 안내합니다." />;
}
