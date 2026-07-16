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
      title="몸의 리듬이 흔들릴 때, 일상부터 차분히 확인합니다"
      description="수면, 피로, 두근거림, 어지럼처럼 반복되는 불편을 생활 변화와 함께 정리해 진료 상담에 활용합니다."
      overviewTitle="불편이 반복되는 흐름을 함께 살핍니다"
      overview="몸의 불편은 하나의 증상만으로 설명하기 어려울 때가 많습니다. 잠, 식사, 업무 강도, 스트레스, 복용 중인 약, 기존 질환을 함께 확인하면 현재 상태를 더 차분히 정리할 수 있습니다."
      topics={[
        { title: "증상 기록하기", description: "수면, 피로, 두근거림, 소화 불편처럼 반복되는 변화를 먼저 정리합니다.", href: ROUTES.autonomic.selfCheck },
        { title: "생활 변화 살피기", description: "최근 업무, 식사, 스트레스, 수면 리듬의 변화를 현재 불편과 함께 확인합니다." },
        { title: "진료 전 준비", description: "기존 질환과 검사 이력, 복용 중인 약을 정리해 상담에 참고합니다.", href: ROUTES.autonomic.care },
      ]}
      guideTitle="진료 전 함께 확인하는 사항"
      stats={[
        { eyebrow: "기록", value: "증상 흐름", caption: "시작 시점과 반복 상황 정리" },
        { eyebrow: "생활", value: "리듬 변화", caption: "수면·식사·스트레스 확인" },
        { eyebrow: "상담", value: "진료 준비", caption: "병력과 복용약을 함께 확인" },
      ]}
      process={["현재 증상과 시작 시점을 정리합니다.", "수면과 식사, 스트레스 변화를 확인합니다.", "기존 병력과 복용 중인 약을 함께 살핍니다.", "현재 상태에 맞는 상담 방향을 안내합니다."]}
      selfCheck={["잠을 자도 피로가 가시지 않습니다.", "잠들기 어렵거나 자주 깹니다.", "두통이나 어지럼이 반복됩니다.", "가슴이 두근거리거나 답답하게 느껴집니다.", "소화가 불편하거나 속이 더부룩합니다.", "손발이 차거나 땀이 평소와 다르게 납니다.", "긴장하면 몸의 불편이 더 커집니다.", "일상 리듬이 흐트러져 생활에 불편이 있습니다."]}
      notice="갑작스러운 흉통, 호흡 곤란, 실신, 마비감, 심한 두통 같은 증상은 응급의료기관 또는 관련 진료과에 먼저 문의해 주세요."
    />
  );
}
