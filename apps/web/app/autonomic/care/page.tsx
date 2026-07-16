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
      title="증상과 생활 패턴을 함께 듣고 진료를 안내합니다"
      description="현재 불편, 이전 검사·치료 이력, 복용 중인 약을 확인한 뒤 상담 방향을 정리합니다."
      overviewTitle="원인을 단정하기보다 필요한 확인부터 시작합니다"
      overview="같은 불편이라도 생활 리듬, 병력, 복용 중인 약, 최근 스트레스에 따라 상담 내용이 달라질 수 있습니다. 진료 전 확인한 정보를 바탕으로 현재 상태에 맞는 방향을 안내합니다."
      topics={[{ title: "증상 문진", description: "시작 시점, 반복되는 상황, 일상에 미치는 영향을 확인합니다." }, { title: "이력 확인", description: "기존 질환, 검사 이력, 복용 중인 약과 건강 관련 제품을 함께 봅니다." }, { title: "생활 상담", description: "수면, 식사, 업무 강도, 스트레스처럼 조정이 필요한 부분을 살핍니다." }]}
      guideTitle="진료 전 함께 확인하는 사항"
      stats={[
        { eyebrow: "문진", value: "현재 불편", caption: "증상과 빈도 확인" },
        { eyebrow: "이력", value: "검사·복용약", caption: "기존 자료를 함께 참고" },
        { eyebrow: "상담", value: "생활 리듬", caption: "일상 변화까지 확인" },
      ]}
      process={["현재 불편과 반복 상황을 상담합니다.", "기존 병력과 복용 중인 약을 확인합니다.", "수면과 식사, 스트레스 흐름을 함께 살핍니다.", "현재 상태에 맞는 진료 방향을 안내합니다."]}
      notice="진료 내용과 빈도, 비용은 현재 상태와 진료 계획에 따라 달라질 수 있으며, 진료 후 안내합니다."
    />
  );
}
