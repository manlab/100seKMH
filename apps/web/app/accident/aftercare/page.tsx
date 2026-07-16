import type { Metadata } from "next";
import { pageMeta, medicalConditionJsonLd } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";

export const metadata: Metadata = pageMeta({
  title: "교통사고 후유증",
  description:
    "백세한방병원 교통사고 후유증 — 외상 직후의 통증과 자율신경계 증상까지. 한약·침·약침·추나·도수치료를 자동차보험으로 안내합니다.",
  path: ROUTES.accident.aftercare,
});

const ACCIDENT_CATEGORY = GNB.find((g) => g.href === ROUTES.accident.root);

export default function AccidentAftercarePage() {
  const ld = medicalConditionJsonLd("교통사고 후유증", [
    "한약",
    "침·전기침",
    "약침·봉침",
    "추나·도수치료",
    "물리치료",
  ]);

  return (
    <>
      <script id="ld-accident-aftercare" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ClinicalGuidePage
        category="교통사고"
        categoryEyebrow="ACCIDENT AFTERCARE"
        categoryHref={ROUTES.accident.root}
        lnbItems={ACCIDENT_CATEGORY?.children ?? []}
        visualPath={ROUTES.accident.aftercare}
        title="교통사고 후유증, 현재 증상부터 함께 살핍니다"
        description="사고 직후부터 회복기까지, 외상 통증과 자율신경계 불편을 함께 확인합니다."
        overviewTitle="확대된 통증과 자율신경 증상, 함께 살핍니다"
        overview="교통사고 후유증은 사고 당시 외상으로 끝나는 것이 아니라, 시간이 지나면서 통증·두통·어지러움·자율신경계 증상으로 나타나는 경우가 많습니다. 외상이 가볍더라도 척추·근막·신경계에 받은 충격은 점차 일상으로 드러나기 때문입니다."
        topics={[
          { title: "상태확인", description: "현재 불편과 병력을 함께 확인합니다.", href: ROUTES.accident.aftercare },
          { title: "개별안내", description: "진료 후 방향을 안내", href: ROUTES.accident.aftercare },
          { title: "진료 상담이 필요하신가요?", description: "1668-0103", href: ROUTES.accident.aftercare },
        ]}
        process={[
          "현재 치료 이력과 불편을 확인합니다.",
          "사고 이후 느끼는 변화를 상담합니다.",
          "필요한 진료 방향을 함께 안내합니다.",
          "상태 변화에 따라 상담 내용을 조정합니다.",
        ]}
        notice="마비, 의식 저하, 호흡 곤란, 심한 두통 등 급성 증상이 있으면 응급의료기관에 먼저 문의해 주세요."
        stats={[
          { eyebrow: "상태확인", value: "현재 불편과 병력을 함께 확인", caption: "진료 전 상태와 병력 확인" },
          { eyebrow: "개별안내", value: "진료 후 방향을 안내", caption: "진료 후 방향 안내" },
          { eyebrow: "진료 상담이 필요하신가요?", value: "1668-0103", caption: "대표 번호", accent: true },
        ]}
      />
    </>
  );
}
