export type VisualSource = "supplied" | "generated";

export type SubpageVisual = {
  hero: string;
  heroPosition: string;
  body?: string;
  bodyAlt?: string;
  bodyPosition?: string;
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
    source: "supplied",
  },
  "/about/facility": {
    hero: "/images/renewal/supplied/facility-corridor-hero.webp",
    heroPosition: "center 50%",
    body: "/images/renewal/supplied/reception-hero.webp",
    bodyAlt: "백세한방병원 밝은 접수 공간",
    source: "supplied",
  },
  "/about/location": {
    hero: "/images/renewal/supplied/reception-direction-hero.webp",
    heroPosition: "center 48%",
    source: "supplied",
  },
  "/cancer": {
    hero: "/images/renewal/generated/cancer-integrative-care-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/cancer-integrative-care-hero.webp",
    bodyAlt: "한국인 성인 환자와 의료진이 치료 과정의 불편을 상담하는 장면",
    bodyPosition: "right center",
    source: "generated",
  },
  "/cancer/post-surgery": {
    hero: "/images/renewal/generated/cancer-post-surgery-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/cancer-post-surgery-hero.webp",
    bodyAlt: "한국인 성인 환자와 의료진이 회복기 불편을 상담하는 장면",
    bodyPosition: "right center",
    source: "generated",
  },
  "/cancer/chemo-care": {
    hero: "/images/renewal/generated/cancer-chemo-care-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/cancer-recovery.webp",
    bodyAlt: "차분한 공간에서 컨디션을 살피는 성인 환자",
    source: "generated",
  },
  "/cancer/recurrence-care": {
    hero: "/images/renewal/generated/cancer-recurrence-care-hero.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/cancer-recurrence-care-hero.webp",
    bodyAlt: "한국인 성인 환자와 의료진이 치료 이력을 상담하는 장면",
    bodyPosition: "right center",
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
    body: "/images/doctors/shin-seunghyup.jpg",
    bodyAlt: "신승협 대표원장",
    bodyPosition: "center 24%",
    source: "supplied",
  },
  "/autonomic": {
    hero: "/images/renewal/generated/autonomic-care.webp",
    heroPosition: "center 44%",
    body: "/images/renewal/generated/autonomic-check.webp",
    bodyAlt: "생활 변화와 현재 불편을 정리하는 성인",
    source: "generated",
  },
  "/autonomic/self-check": {
    hero: "/images/renewal/generated/autonomic-check.webp",
    heroPosition: "center 46%",
    body: "/images/renewal/generated/autonomic-care.webp",
    bodyAlt: "진료 전 현재 상태를 정리하는 성인",
    source: "generated",
  },
  "/autonomic/care": {
    hero: "/images/renewal/generated/autonomic-care.webp",
    heroPosition: "center 44%",
    body: "/images/renewal/generated/autonomic-care.webp",
    bodyAlt: "현재 불편을 상담하는 성인과 의료진",
    source: "generated",
  },
  "/spine-joint": {
    hero: "/images/renewal/supplied/spine-model-hero.webp",
    heroPosition: "center 48%",
    body: "/images/renewal/supplied/back-consultation.webp",
    bodyAlt: "허리와 등 불편감에 관해 상담하는 성인",
    source: "supplied",
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
    body: "/images/renewal/supplied/manual-therapy-body.webp",
    bodyAlt: "어깨와 상체 움직임을 확인하는 치료 공간",
    source: "supplied",
  },
  "/spine-joint/knee": {
    hero: "/images/renewal/supplied/knee-exam-hero.webp",
    heroPosition: "center 45%",
    body: "/images/renewal/generated/walking-recovery.webp",
    bodyAlt: "밝은 실내에서 보행 상태를 확인하는 성인",
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
    body: "/images/renewal/generated/diet-herbal-consultation.webp",
    bodyAlt: "한약재를 정리하는 한의학 진료 장면",
    source: "generated",
  },
  "/diet/causes": {
    hero: "/images/renewal/generated/autonomic-check.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/diet-herbal-consultation.webp",
    bodyAlt: "한약재를 정리하는 한의학 진료 장면",
    source: "generated",
  },
  "/diet/guide": {
    hero: "/images/renewal/generated/diet-guide.webp",
    heroPosition: "center",
    body: "/images/renewal/generated/diet-herbal-consultation.webp",
    bodyAlt: "한약재를 정리하는 한의학 진료 장면",
    source: "generated",
  },
  "/community/notice": {
    hero: "/images/renewal/supplied/reception-hero.webp",
    heroPosition: "center 48%",
    source: "supplied",
  },
  "/community/counsel": {
    hero: "/images/renewal/generated/community-consultation.webp",
    heroPosition: "center",
    source: "generated",
  },
  "/community/faq": {
    hero: "/images/renewal/generated/community-guidance.webp",
    heroPosition: "center",
    source: "generated",
  },
  "/community/non-covered": {
    hero: "/images/renewal/supplied/reception-direction-hero.webp",
    heroPosition: "center 48%",
    source: "supplied",
  },
  "/community/documents": {
    hero: "/images/renewal/supplied/facility-corridor-hero.webp",
    heroPosition: "center 45%",
    source: "supplied",
  },
};

export function getSubpageVisual(pathname: string) {
  return SUBPAGE_VISUALS[pathname];
}
