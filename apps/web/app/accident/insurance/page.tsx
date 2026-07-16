import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";

export const metadata: Metadata = pageMeta({
  title: "자동차보험 진료절차",
  description:
    "백세한방병원 자동차보험 한방 진료 절차 — 사고 접수부터 보험사 정산 안내까지 4단계로 정리했습니다.",
  path: ROUTES.accident.insurance,
});

const ACCIDENT_CATEGORY = GNB.find((g) => g.href === ROUTES.accident.root);

export default function AccidentInsurancePage() {
  return (
    <ClinicalGuidePage
      category="교통사고"
      categoryEyebrow="INSURANCE PROCESS"
      categoryHref={ROUTES.accident.root}
      lnbItems={ACCIDENT_CATEGORY?.children ?? []}
      visualPath={ROUTES.accident.insurance}
      title="자동차보험 한방 진료, 절차부터 친절히 안내드립니다"
      description="사고 접수부터 보험사 정산까지, 4단계로 정리해 드립니다."
      overviewTitle="자동차보험 한방 진료란?"
      overview="교통사고로 인한 후유 증상은 사고 접수번호와 보험사 정보를 확인한 뒤 자동차보험 진료 절차를 안내받을 수 있습니다. 적용 범위와 정산 방식은 사고 상황과 보험사 확인 내용에 따라 달라질 수 있습니다."
      topics={[
        { title: "상태확인", description: "현재 불편과 병력을 함께 확인", href: ROUTES.accident.insurance },
        { title: "개별안내", description: "진료 후 방향을 안내", href: ROUTES.accident.insurance },
        { title: "문의 및 예약", description: "1668-0103", href: ROUTES.accident.insurance },
      ]}
      process={["사고 접수번호를 준비해 주세요.", "보험사 정보를 확인합니다.", "내원하여 진료를 시작합니다.", "정산까지 병원에서 안내드립니다."]}
      notice="보험 적용 범위와 절차는 사고 상황에 따라 차이가 있을 수 있습니다."
      stats={[
        { eyebrow: "절차", value: "4단계", caption: "접수부터 정산까지" },
        { eyebrow: "정산 안내", value: "보험사 확인", caption: "사고 상황별 안내", accent: true },
        { eyebrow: "보험 적용", value: "한약 포함", caption: "한약·침·약침·추나" },
        { eyebrow: "진료시간", value: "월-토", caption: "토요일 오전" },
      ]}
    />
  );
}
