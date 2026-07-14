import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "자율신경실조증 진료 안내",
  description: "증상, 병력, 생활 패턴을 확인하는 백세한방병원 자율신경실조증 진료 상담 안내입니다.",
  path: ROUTES.autonomic.care,
});

const items = GNB.find((item) => item.href === ROUTES.autonomic.root)?.children ?? [];

export default function AutonomicCarePage() {
  return (
    <ClinicalGuidePage
      category="자율신경실조증"
      categoryEyebrow="AUTONOMIC CARE GUIDE"
      categoryHref={ROUTES.autonomic.root}
      lnbItems={items}
      visualPath={ROUTES.autonomic.care}
      title="현재 상태에 맞춰 진료를 안내합니다"
      description="증상, 병력, 생활 패턴을 확인한 뒤 개별 상태에 맞는 상담 방향을 안내합니다."
      overviewTitle="진료 전 현재 상태를 충분히 확인합니다"
      overview="같은 증상이라도 원인과 필요한 진료는 다를 수 있습니다. 진료 시 현재 증상, 이전 검사·치료 이력, 복용 중인 약, 생활 패턴을 확인하고 필요한 경우 관련 진료과 상담을 안내합니다."
      topics={[{ title: "문진", description: "증상 시작 시점, 빈도, 생활에 미치는 영향을 확인합니다." }, { title: "병력 확인", description: "기존 질환, 검사 이력, 복용 중인 약을 함께 확인합니다." }, { title: "상담 방향", description: "현재 상태에 따라 필요한 진료와 생활 관리 상담을 안내합니다." }]}
      process={["현재 불편과 생활 패턴을 상담합니다.", "기존 병력과 복용 중인 약을 확인합니다.", "개별 상태에 맞는 진료 방향을 안내합니다.", "필요한 경우 관련 진료과 상담을 권합니다."]}
      notice="진료 내용과 빈도, 비용은 현재 상태와 진료 계획에 따라 달라질 수 있으며, 진료 후 안내합니다."
    />
  );
}
