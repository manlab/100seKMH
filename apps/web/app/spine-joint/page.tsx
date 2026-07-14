import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";
import { spineJointTopicLinks } from "@/lib/spine-joint-guides";

export const metadata: Metadata = pageMeta({
  title: "척추관절통증",
  description: "디스크, 척추관협착증, 어깨·무릎 통증, 스포츠 손상과 추나·도수치료에 관한 백세한방병원 진료 안내입니다.",
  path: ROUTES.spineJoint.root,
});

const items = GNB.find((item) => item.href === ROUTES.spineJoint.root)?.children ?? [];

export default function SpineJointPage() {
  return (
    <ClinicalGuidePage
      category="척추관절통증"
      categoryEyebrow="SPINE & JOINT CARE"
      categoryHref={ROUTES.spineJoint.root}
      lnbItems={items}
      visualPath={ROUTES.spineJoint.chuna}
      title="척추와 관절의 불편을 함께 살핍니다"
      description="통증 부위, 생활 습관, 이전 검사·치료 이력을 확인하고 진료 상담을 안내합니다."
      overviewTitle="현재 불편과 일상 활동의 변화를 확인합니다"
      overview="척추와 관절의 통증은 발생 부위와 생활 습관, 외상 여부, 기존 질환에 따라 다르게 나타날 수 있습니다. 진료 시 불편한 동작과 현재 증상, 이전 검사·치료 이력을 함께 확인합니다."
      topics={spineJointTopicLinks.map((topic) => ({ title: topic.title, href: topic.href, description: "현재 상태와 관련 정보를 확인하는 진료 안내를 제공합니다." }))}
      process={["통증 부위와 생활 속 불편을 확인합니다.", "기존 검사·치료 이력을 함께 확인합니다.", "현재 상태에 맞는 진료 방향을 안내합니다.", "필요한 경우 관련 진료과 상담을 권합니다."]}
      notice="갑작스러운 마비감, 심한 외상, 급격한 통증 악화처럼 응급 평가가 필요한 증상은 응급의료기관 또는 관련 진료과에 먼저 문의해 주세요."
    />
  );
}
