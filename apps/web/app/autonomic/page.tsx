import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "자율신경실조증",
  description: "반복되는 수면, 피로, 두통, 어지럼 등 일상 불편에 대한 백세한방병원 진료 안내입니다.",
  path: ROUTES.autonomic.root,
});

const items = GNB.find((item) => item.href === ROUTES.autonomic.root)?.children ?? [];

export default function AutonomicPage() {
  return (
    <ClinicalGuidePage
      category="자율신경실조증"
      categoryEyebrow="AUTONOMIC CARE GUIDE"
      categoryHref={ROUTES.autonomic.root}
      lnbItems={items}
      visualPath={ROUTES.autonomic.root}
      title="반복되는 일상 불편을 함께 살핍니다"
      description="수면, 피로, 두통, 어지럼처럼 일상에 영향을 주는 변화를 확인하고 진료 상담을 안내합니다."
      overviewTitle="증상만이 아니라 생활 변화도 함께 확인합니다"
      overview="반복되는 불편은 수면, 스트레스, 생활 리듬, 복용 중인 약, 다른 질환 등 여러 요인과 관련될 수 있습니다. 진료 시 증상 시작 시점과 생활 변화를 함께 확인하고 개별 상태에 맞춰 상담합니다."
      topics={[
        { title: "자율신경실조증이란", description: "반복되는 불편의 원인을 단정하지 않고 현재 증상과 생활 패턴을 함께 확인합니다." },
        { title: "자가 확인", description: "현재 느끼는 불편을 정리해 의료진 상담에 활용할 수 있습니다.", href: ROUTES.autonomic.selfCheck },
        { title: "진료 안내", description: "증상과 병력, 복용 중인 약을 확인한 뒤 상담 방향을 안내합니다.", href: ROUTES.autonomic.care },
      ]}
      process={["현재 증상과 생활 변화를 확인합니다.", "기존 질환과 복용 중인 약을 확인합니다.", "개별 상태에 맞는 진료 상담을 안내합니다.", "필요한 경우 관련 진료과 상담을 권합니다."]}
      selfCheck={["잠을 자도 피로가 가시지 않습니다.", "잠들기 어렵거나 자주 깹니다.", "두통이나 어지럼이 반복됩니다.", "가슴이 두근거리거나 답답하게 느껴집니다.", "소화가 불편하거나 속이 더부룩합니다.", "손발이 차거나 땀이 평소와 다르게 납니다.", "긴장하면 몸의 불편이 더 커집니다.", "일상 리듬이 흐트러져 생활에 불편이 있습니다."]}
      notice="갑작스러운 흉통, 호흡 곤란, 실신, 마비감, 심한 두통 같은 증상은 응급의료기관 또는 관련 진료과에 먼저 문의해 주세요."
    />
  );
}
