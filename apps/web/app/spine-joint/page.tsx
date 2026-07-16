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
const topicDescriptions: Record<string, string> = {
  추나치료: "움직임 제한과 통증 부위를 확인한 뒤 진료 상담 방향을 안내합니다.",
  도수치료: "일상에서 불편한 동작과 활동 제한을 함께 살펴봅니다.",
  디스크: "목·허리 통증, 저림, 자세 변화에 따른 불편을 확인합니다.",
  척추관협착증: "걷기와 서 있기, 자세 변화에 따른 불편을 정리합니다.",
  "오십견·어깨 통증": "팔을 들거나 뒤로 돌릴 때의 제한과 통증 양상을 확인합니다.",
  무릎관절통: "보행, 계단 이동, 앉았다 일어나기에서 느끼는 불편을 살핍니다.",
  "스포츠 손상": "운동 중 발생한 상황과 현재 활동 제한을 함께 확인합니다.",
};

export default function SpineJointPage() {
  return (
    <ClinicalGuidePage
      category="척추관절통증"
      categoryEyebrow="SPINE & JOINT CARE"
      categoryHref={ROUTES.spineJoint.root}
      lnbItems={items}
      visualPath={ROUTES.spineJoint.root}
      title="척추와 관절의 불편을 부위별로 살핍니다"
      description="목·허리, 어깨, 무릎, 운동 손상처럼 통증이 나타나는 부위와 생활 속 불편을 함께 확인합니다."
      overviewTitle="통증 부위와 움직임의 변화를 함께 확인합니다"
      overview="척추와 관절의 불편은 발생 부위, 반복 동작, 외상 여부, 기존 검사·치료 이력에 따라 다르게 나타날 수 있습니다. 진료 시 통증이 생기는 동작과 생활 속 제한을 함께 정리합니다."
      topics={spineJointTopicLinks.map((topic) => ({ title: topic.title, href: topic.href, description: topicDescriptions[topic.title] ?? "현재 상태와 관련 정보를 확인하는 진료 안내를 제공합니다." }))}
      guideTitle="진료 전 함께 확인하는 사항"
      stats={[
        { eyebrow: "부위", value: "목·허리", caption: "통증과 저림 양상 확인" },
        { eyebrow: "관절", value: "어깨·무릎", caption: "움직임 제한과 활동 불편 확인" },
        { eyebrow: "이력", value: "검사·치료", caption: "기존 자료와 복용약 참고" },
      ]}
      process={["통증 부위와 불편한 동작을 확인합니다.", "기존 검사·치료 이력을 함께 정리합니다.", "생활 속 부담 요인을 상담합니다.", "현재 상태에 맞는 진료 방향을 안내합니다."]}
      notice="갑작스러운 마비감, 심한 외상, 급격한 통증 악화처럼 응급 평가가 필요한 증상은 응급의료기관 또는 관련 진료과에 먼저 문의해 주세요."
    />
  );
}
