export type VisualSource = "supplied" | "generated";

export type SubpageVisual = {
  hero: string;
  heroPosition: string;
  body: string;
  bodyAlt: string;
  source: VisualSource;
};

/**
 * Visible GNB subpages each receive an explicit visual pair. Keeping paths in
 * one registry makes asset coverage reviewable before a release.
 */
export const SUBPAGE_VISUALS: Record<string, SubpageVisual> = {
  "/about/greeting": {
    hero: "/images/renewal/supplied/reception-hero.webp",
    heroPosition: "center 48%",
    body: "/images/renewal/supplied/therapy-corridor.webp",
    bodyAlt: "백세한방병원 내부 치료 공간",
    source: "supplied",
  },
  "/about/doctors": {
    hero: "/images/renewal/supplied/medical-team-hero.webp",
    heroPosition: "center 35%",
    body: "/images/renewal/supplied/doctor-consultation.webp",
    bodyAlt: "환자와 상담하는 의료진",
    source: "supplied",
  },
  "/about/facility": {
    hero: "/images/renewal/supplied/facility-corridor-hero.webp",
    heroPosition: "center 50%",
    body: "/images/renewal/supplied/floor-directory.webp",
    bodyAlt: "백세한방병원 층별 안내",
    source: "supplied",
  },
  "/about/location": {
    hero: "/images/renewal/supplied/reception-direction-hero.webp",
    heroPosition: "center 48%",
    body: "/images/renewal/supplied/reception-hero.webp",
    bodyAlt: "백세한방병원 접수 공간",
    source: "supplied",
  },
  "/cancer/post-surgery": {
    hero: "/images/renewal/generated/cancer-recovery.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/cancer-followup.webp",
    bodyAlt: "밝은 진료 공간에서 회복 상담을 받는 성인 환자",
    source: "generated",
  },
  "/cancer/chemo-care": {
    hero: "/images/renewal/generated/cancer-followup.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/cancer-recovery.webp",
    bodyAlt: "차분한 상담 공간의 의료진과 성인 환자",
    source: "generated",
  },
  "/cancer/recurrence-care": {
    hero: "/images/renewal/generated/cancer-recovery.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/cancer-followup.webp",
    bodyAlt: "진료 기록을 함께 확인하는 의료진과 성인 환자",
    source: "generated",
  },
  "/accident/aftercare": {
    hero: "/images/renewal/supplied/traffic-aftercare-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/supplied/back-consultation.webp",
    bodyAlt: "등과 허리 불편감에 관해 상담하는 성인",
    source: "supplied",
  },
  "/accident/insurance": {
    hero: "/images/renewal/supplied/xray-room-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/supplied/reception-direction-hero.webp",
    bodyAlt: "병원 접수 공간",
    source: "supplied",
  },
  "/accident/system": {
    hero: "/images/renewal/supplied/inpatient-room-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/supplied/medical-team-hero.webp",
    bodyAlt: "진료 공간의 의료진",
    source: "supplied",
  },
  "/autonomic": {
    hero: "/images/renewal/generated/autonomic-care.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/autonomic-check.webp",
    bodyAlt: "차분한 진료실에서 생활 습관을 상담하는 성인",
    source: "generated",
  },
  "/autonomic/self-check": {
    hero: "/images/renewal/generated/autonomic-check.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/autonomic-care.webp",
    bodyAlt: "건강 상태를 기록하는 성인",
    source: "generated",
  },
  "/autonomic/care": {
    hero: "/images/renewal/generated/autonomic-care.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/walking-recovery.webp",
    bodyAlt: "안정된 상담 환경에서 진료 계획을 듣는 성인",
    source: "generated",
  },
  "/spine-joint/chuna": {
    hero: "/images/renewal/supplied/chuna-treatment-hero.webp",
    heroPosition: "center 40%",
    body: "/images/renewal/supplied/manual-therapy-body.webp",
    bodyAlt: "치료실에서 자세를 확인하는 장면",
    source: "supplied",
  },
  "/spine-joint/manual-therapy": {
    hero: "/images/renewal/supplied/manual-therapy-hero.webp",
    heroPosition: "center 42%",
    body: "/images/renewal/supplied/shoulder-exam.webp",
    bodyAlt: "어깨 상태를 살피는 진료 장면",
    source: "supplied",
  },
  "/spine-joint/disc": {
    hero: "/images/renewal/supplied/spine-model-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/supplied/back-consultation.webp",
    bodyAlt: "허리 불편감에 관해 상담하는 성인",
    source: "supplied",
  },
  "/spine-joint/stenosis": {
    hero: "/images/renewal/supplied/spine-model-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/walking-recovery.webp",
    bodyAlt: "밝은 실내에서 천천히 걷는 성인",
    source: "supplied",
  },
  "/spine-joint/shoulder": {
    hero: "/images/renewal/supplied/shoulder-exam.webp",
    heroPosition: "center 42%",
    body: "/images/renewal/generated/sports-recovery.webp",
    bodyAlt: "편안한 실내에서 어깨 움직임을 확인하는 성인",
    source: "supplied",
  },
  "/spine-joint/knee": {
    hero: "/images/renewal/supplied/knee-exam-hero.webp",
    heroPosition: "center 45%",
    body: "/images/renewal/generated/sports-recovery.webp",
    bodyAlt: "밝은 실내에서 무릎 움직임을 확인하는 성인",
    source: "supplied",
  },
  "/spine-joint/sports": {
    hero: "/images/renewal/generated/sports-recovery.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/walking-recovery.webp",
    bodyAlt: "운동 전후 컨디션을 점검하는 성인",
    source: "generated",
  },
  "/diet": {
    hero: "/images/renewal/generated/diet-guide.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/diet-guide.webp",
    bodyAlt: "건강한 식사 계획을 상담하는 성인",
    source: "generated",
  },
  "/diet/causes": {
    hero: "/images/renewal/generated/autonomic-check.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/diet-guide.webp",
    bodyAlt: "일상 습관을 기록하는 성인",
    source: "generated",
  },
  "/diet/guide": {
    hero: "/images/renewal/generated/diet-guide.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/diet-guide.webp",
    bodyAlt: "영양 균형을 고려한 식사 준비 장면",
    source: "generated",
  },
  "/community/notice": {
    hero: "/images/renewal/supplied/reception-hero.webp",
    heroPosition: "center 48%",
    body: "/images/renewal/supplied/facility-corridor-hero.webp",
    bodyAlt: "병원 내부 복도",
    source: "supplied",
  },
  "/community/counsel": {
    hero: "/images/renewal/generated/community-consultation.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/community-guidance.webp",
    bodyAlt: "온라인 상담을 준비하는 성인",
    source: "generated",
  },
  "/community/faq": {
    hero: "/images/renewal/generated/community-guidance.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/community-guidance.webp",
    bodyAlt: "안내 자료를 살펴보는 성인",
    source: "generated",
  },
  "/community/non-covered": {
    hero: "/images/renewal/supplied/reception-direction-hero.webp",
    heroPosition: "center 48%",
    body: "/images/renewal/supplied/floor-directory.webp",
    bodyAlt: "병원 내 안내 표지",
    source: "supplied",
  },
  "/community/documents": {
    hero: "/images/renewal/supplied/facility-corridor-hero.webp",
    heroPosition: "center 45%",
    body: "/images/renewal/supplied/reception-hero.webp",
    bodyAlt: "병원 접수 공간",
    source: "supplied",
  },
};

export function getSubpageVisual(pathname: string) {
  return SUBPAGE_VISUALS[pathname];
}
