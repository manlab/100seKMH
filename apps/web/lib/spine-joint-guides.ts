import { ROUTES } from "@/lib/navigation";

type Guide = {
  title: string;
  description: string;
  overviewTitle: string;
  overview: string;
  topics: { title: string; description: string }[];
  notice: string;
};

export const spineJointGuides: Record<"disc" | "stenosis" | "shoulder" | "knee" | "sports", Guide> = {
  disc: {
    title: "디스크 통증 진료 안내",
    description: "목과 허리의 통증, 저림 등 현재 불편을 확인하고 진료 상담을 안내합니다.",
    overviewTitle: "현재 증상과 생활 속 불편을 함께 확인합니다",
    overview: "목이나 허리의 통증과 저림은 발생 시점, 자세, 일상 활동, 기존 검사·치료 이력에 따라 다르게 나타날 수 있습니다. 진료 시 현재 불편과 이전 검사 결과를 확인한 뒤 상담 방향을 안내합니다.",
    topics: [
      { title: "증상 확인", description: "통증 부위, 저림, 움직임의 불편처럼 현재 느끼는 변화를 확인합니다." },
      { title: "생활 습관 상담", description: "업무 자세, 수면 환경, 반복 동작 등 일상 속 부담 요인을 함께 살펴봅니다." },
      { title: "진료 방향 안내", description: "현재 상태와 검사 이력에 따라 필요한 진료 상담을 안내합니다." },
    ],
    notice: "갑작스러운 근력 저하, 감각 이상, 대소변 조절의 변화처럼 급성 증상이 있으면 응급의료기관 또는 관련 진료과에 먼저 문의해 주세요.",
  },
  stenosis: {
    title: "척추관협착증 진료 안내",
    description: "걷거나 서 있을 때 나타나는 불편과 기존 진단·치료 이력을 확인해 상담합니다.",
    overviewTitle: "걷기와 일상 활동의 변화를 함께 살핍니다",
    overview: "척추관협착증으로 진단받았거나 의심 증상이 있는 경우, 불편의 양상과 이전 검사·치료 이력을 함께 확인하는 것이 중요합니다. 진료 시 걷기, 자세 변화, 일상 활동에서 느끼는 불편을 상담합니다.",
    topics: [
      { title: "불편 양상 확인", description: "걷는 거리, 서 있는 시간, 자세 변화에 따른 불편을 확인합니다." },
      { title: "검사 이력 확인", description: "기존 영상 검사와 진단·치료 이력을 알고 계신 범위에서 확인합니다." },
      { title: "생활 관리 상담", description: "현재 상태에 따라 일상 활동과 진료 상담 방향을 안내합니다." },
    ],
    notice: "다리 힘이 급격히 떨어지거나 감각 변화가 심해지는 경우에는 관련 진료과에 신속히 문의해 주세요.",
  },
  shoulder: {
    title: "오십견·어깨 통증 진료 안내",
    description: "어깨 움직임의 제한과 통증 양상을 확인하고 진료 상담을 안내합니다.",
    overviewTitle: "움직임의 변화와 통증 양상을 함께 확인합니다",
    overview: "어깨 통증과 움직임 제한은 발생 시점, 반복 동작, 외상, 다른 질환에 따라 원인이 달라질 수 있습니다. 진료 시 일상 동작에서 불편한 부분과 이전 검사·치료 이력을 확인합니다.",
    topics: [
      { title: "움직임 확인", description: "팔을 들거나 뒤로 돌릴 때 느끼는 제한과 불편을 확인합니다." },
      { title: "통증 양상 상담", description: "통증의 위치, 시간대, 생활에 미치는 영향을 함께 살펴봅니다." },
      { title: "진료 이력 확인", description: "외상 여부와 기존 검사·치료 내용을 확인해 상담 방향을 정합니다." },
    ],
    notice: "외상 후 어깨 변형, 심한 부기, 갑작스러운 움직임 제한이 있으면 영상 검사와 관련 진료과 상담이 우선 필요할 수 있습니다.",
  },
  knee: {
    title: "무릎관절통 진료 안내",
    description: "보행과 계단 이동에서 느끼는 무릎 불편을 확인하고 상담합니다.",
    overviewTitle: "무릎 통증과 일상 활동의 관계를 살핍니다",
    overview: "무릎 불편은 활동량, 자세, 과거 외상, 체중 변화, 기존 관절 질환과 관련될 수 있습니다. 진료 시 통증이 나타나는 동작과 이전 진단·치료 이력을 함께 확인합니다.",
    topics: [
      { title: "활동 시 불편", description: "걷기, 계단, 앉았다 일어나기처럼 불편한 동작을 확인합니다." },
      { title: "이전 이력 확인", description: "외상과 검사·치료 이력을 알고 계신 범위에서 확인합니다." },
      { title: "상담 방향 안내", description: "현재 상태에 따라 필요한 진료와 생활 관리 상담을 안내합니다." },
    ],
    notice: "무릎이 심하게 붓거나 열감, 변형, 체중 부하가 어려운 증상이 있으면 관련 진료과에 먼저 문의해 주세요.",
  },
  sports: {
    title: "스포츠 손상 진료 안내",
    description: "운동 중 또는 이후 발생한 불편의 양상과 활동 이력을 확인해 상담합니다.",
    overviewTitle: "운동과 일상 활동의 변화를 함께 확인합니다",
    overview: "운동 중 발생한 통증과 불편은 부위, 동작, 손상 시점, 이전 부상에 따라 다르게 나타날 수 있습니다. 진료 시 불편이 생긴 상황과 현재 활동 제한을 확인하고 상담 방향을 안내합니다.",
    topics: [
      { title: "발생 상황 확인", description: "어떤 운동과 동작에서 불편이 시작됐는지 함께 확인합니다." },
      { title: "현재 활동 제한", description: "운동과 일상 동작에서 달라진 부분을 확인합니다." },
      { title: "검사·진료 이력", description: "이전 부상, 검사, 치료 이력을 확인해 상담합니다." },
    ],
    notice: "심한 부기, 변형, 체중 부하 불가, 지속되는 통증이 있으면 운동을 중단하고 관련 진료과에 문의해 주세요.",
  },
};

export const spineJointTopicLinks = [
  { title: "추나치료", href: ROUTES.spineJoint.chuna },
  { title: "도수치료", href: ROUTES.spineJoint.manualTherapy },
  { title: "디스크", href: ROUTES.spineJoint.disc },
  { title: "척추관협착증", href: ROUTES.spineJoint.stenosis },
  { title: "오십견·어깨 통증", href: ROUTES.spineJoint.shoulder },
  { title: "무릎관절통", href: ROUTES.spineJoint.knee },
  { title: "스포츠 손상", href: ROUTES.spineJoint.sports },
];
