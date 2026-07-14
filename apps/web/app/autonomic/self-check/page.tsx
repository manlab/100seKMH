import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "자율신경실조증 자가 확인",
  description: "반복되는 일상 불편을 정리해 의료진 상담에 활용할 수 있는 자가 확인 항목입니다.",
  path: ROUTES.autonomic.selfCheck,
});

const items = GNB.find((item) => item.href === ROUTES.autonomic.root)?.children ?? [];
const selfCheck = ["잠을 자도 피로가 가시지 않습니다.", "잠들기 어렵거나 자주 깹니다.", "두통이나 어지럼이 반복됩니다.", "가슴이 두근거리거나 답답하게 느껴집니다.", "소화가 불편하거나 속이 더부룩합니다.", "손발이 차거나 땀이 평소와 다르게 납니다.", "긴장하면 몸의 불편이 더 커집니다.", "일상 리듬이 흐트러져 생활에 불편이 있습니다."];

export default function AutonomicSelfCheckPage() {
  return (
    <ClinicalGuidePage
      category="자율신경실조증"
      categoryEyebrow="AUTONOMIC CARE GUIDE"
      categoryHref={ROUTES.autonomic.root}
      lnbItems={items}
      title="현재 불편을 정리해 보세요"
      description="진료 전 현재 느끼는 불편과 생활 변화를 정리하는 데 활용할 수 있습니다."
      overviewTitle="증상과 생활 리듬을 함께 돌아봅니다"
      overview="아래 항목은 질병을 판정하거나 진단을 대신하지 않습니다. 불편이 시작된 시점, 빈도, 생활에 미치는 영향을 함께 기록해 두면 상담에 도움이 될 수 있습니다."
      topics={[{ title: "증상 시작 시점", description: "불편이 언제 시작됐는지와 반복되는 상황을 정리합니다." }, { title: "생활 변화", description: "수면, 식사, 업무, 스트레스처럼 최근 달라진 생활 리듬을 확인합니다." }, { title: "복용 중인 약", description: "현재 복용 중인 약과 건강 관련 제품을 진료 시 알려 주세요." }]}
      selfCheck={selfCheck}
      notice="불편이 심해지거나 갑작스러운 증상이 나타나면 자가 확인 결과와 관계없이 의료진과 상담해 주세요."
    />
  );
}
