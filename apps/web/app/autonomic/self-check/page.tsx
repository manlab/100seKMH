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
      visualPath={ROUTES.autonomic.selfCheck}
      title="지금 느끼는 불편을 진료 전 정리합니다"
      description="반복되는 몸의 변화를 항목별로 체크해 상담 때 빠뜨리지 않도록 준비합니다."
      overviewTitle="체크 결과보다 변화의 흐름이 중요합니다"
      overview="자가 확인은 진단을 대신하지 않습니다. 언제부터, 어떤 상황에서, 얼마나 자주 불편한지 정리해 두면 현재 상태를 설명하는 데 도움이 됩니다."
      topics={[{ title: "수면과 피로", description: "잠드는 시간, 자주 깨는지, 쉬어도 피로가 남는지 확인합니다." }, { title: "두근거림과 어지럼", description: "답답함, 두통, 어지럼이 나타나는 상황과 빈도를 정리합니다." }, { title: "소화와 체온 변화", description: "속 불편, 땀, 손발 차가움처럼 함께 느끼는 변화를 살핍니다." }]}
      guideTitle="진료 전 함께 확인하는 사항"
      stats={[
        { eyebrow: "기록", value: "시작 시점", caption: "처음 불편했던 때 확인" },
        { eyebrow: "빈도", value: "반복 상황", caption: "자주 나타나는 조건 정리" },
        { eyebrow: "상담", value: "참고 자료", caption: "진료 시 설명에 활용" },
      ]}
      selfCheck={selfCheck}
      notice="불편이 심해지거나 갑작스러운 증상이 나타나면 자가 확인 결과와 관계없이 의료진과 상담해 주세요."
    />
  );
}
