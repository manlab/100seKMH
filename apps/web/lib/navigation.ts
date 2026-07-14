/**
 * 사이트 네비게이션 데이터 — Single source of truth.
 * GNB / 메가메뉴 / 모바일 드로어 / LNB / 푸터 모두 이 데이터를 참조합니다.
 */

export type NavItem = {
  label: string;
  href: string;
  /** 1depth 카테고리의 하위 메뉴(메가메뉴, LNB) */
  children?: NavItem[];
  /** 기존 URL의 LNB·sitemap 유지용 비노출 카테고리 */
  hidden?: boolean;
};

export const ROUTES = {
  home: "/",
  about: {
    greeting: "/about/greeting",
    doctors: "/about/doctors",
    facility: "/about/facility",
    herbal: "/about/herbal",
    admission: "/about/admission",
    hours: "/about/hours",
    location: "/about/location",
  },
  cancer: {
    root: "/cancer",
    postSurgery: "/cancer/post-surgery",
    chemoCare: "/cancer/chemo-care",
    recurrenceCare: "/cancer/recurrence-care",
  },
  autonomic: {
    root: "/autonomic",
    selfCheck: "/autonomic/self-check",
    care: "/autonomic/care",
  },
  spineJoint: {
    root: "/spine-joint",
    chuna: "/spine-joint/chuna",
    manualTherapy: "/spine-joint/manual-therapy",
    disc: "/spine-joint/disc",
    stenosis: "/spine-joint/stenosis",
    shoulder: "/spine-joint/shoulder",
    knee: "/spine-joint/knee",
    sports: "/spine-joint/sports",
  },
  diet: {
    root: "/diet",
    causes: "/diet/causes",
    guide: "/diet/guide",
  },
  spine: {
    root: "/spine",
    disc: "/spine/disc",
    stenosis: "/spine/stenosis",
    shoulder: "/spine/shoulder",
    knee: "/spine/knee",
    sports: "/spine/sports",
  },
  posture: {
    root: "/posture",
    scoliosis: "/posture/scoliosis",
    forwardHead: "/posture/forward-head",
    pelvis: "/posture/pelvis",
    postnatal: "/posture/postnatal",
  },
  accident: {
    root: "/accident",
    aftercare: "/accident/aftercare",
    insurance: "/accident/insurance",
    system: "/accident/system",
  },
  immunity: {
    root: "/immunity",
    rhinitis: "/immunity/rhinitis",
    fatigue: "/immunity/fatigue",
    sleep: "/immunity/sleep",
    coldHandFoot: "/immunity/cold-hand-foot",
  },
  womenKids: {
    root: "/women-kids",
    postnatalCare: "/women-kids/postnatal-care",
    menstruation: "/women-kids/menstruation",
    menopause: "/women-kids/menopause",
    growth: "/women-kids/growth",
    chongmyeong: "/women-kids/chongmyeong",
  },
  community: {
    notice: "/community/notice",
    counsel: "/community/counsel",
    faq: "/community/faq",
    nonCovered: "/community/non-covered",
    documents: "/community/documents",
  },
  legal: {
    terms: "/legal/terms",
    privacy: "/legal/privacy",
    patientRights: "/legal/patient-rights",
  },
} as const;

export const GNB: NavItem[] = [
  {
    label: "백세한방병원",
    href: ROUTES.about.greeting,
    children: [
      { label: "병원소개", href: ROUTES.about.greeting },
      { label: "의료진 소개", href: ROUTES.about.doctors },
      { label: "층별 안내", href: ROUTES.about.facility },
      { label: "오시는 길", href: ROUTES.about.location },
    ],
  },
  {
    label: "암 통합치료",
    href: ROUTES.cancer.root,
    children: [
      { label: "수술 후 회복", href: ROUTES.cancer.postSurgery },
      { label: "항암 부작용 관리", href: ROUTES.cancer.chemoCare },
      { label: "전이·재발 관리", href: ROUTES.cancer.recurrenceCare },
    ],
  },
  {
    label: "교통사고",
    href: ROUTES.accident.root,
    children: [
      { label: "교통사고 후유증", href: ROUTES.accident.aftercare },
      { label: "자동차보험 진료절차", href: ROUTES.accident.insurance },
      { label: "치료 프로세스", href: ROUTES.accident.system },
    ],
  },
  {
    label: "자율신경실조증",
    href: ROUTES.autonomic.root,
    children: [
      { label: "자율신경실조증이란", href: ROUTES.autonomic.root },
      { label: "자가 확인", href: ROUTES.autonomic.selfCheck },
      { label: "진료 안내", href: ROUTES.autonomic.care },
    ],
  },
  {
    label: "척추관절통증",
    href: ROUTES.spineJoint.root,
    children: [
      { label: "추나치료", href: ROUTES.spineJoint.chuna },
      { label: "도수치료", href: ROUTES.spineJoint.manualTherapy },
      { label: "디스크", href: ROUTES.spineJoint.disc },
      { label: "척추관협착증", href: ROUTES.spineJoint.stenosis },
      { label: "오십견", href: ROUTES.spineJoint.shoulder },
      { label: "무릎관절통", href: ROUTES.spineJoint.knee },
      { label: "스포츠 손상", href: ROUTES.spineJoint.sports },
    ],
  },
  {
    label: "다이어트",
    href: ROUTES.diet.root,
    children: [
      { label: "다이어트 소개", href: ROUTES.diet.root },
      { label: "비만의 원인", href: ROUTES.diet.causes },
      { label: "다이어트가 필요한 경우", href: ROUTES.diet.guide },
    ],
  },
  {
    label: "커뮤니티",
    href: ROUTES.community.notice,
    children: [
      { label: "공지사항", href: ROUTES.community.notice },
      { label: "온라인 상담", href: ROUTES.community.counsel },
      { label: "자주묻는 질문", href: ROUTES.community.faq },
      { label: "비급여 항목", href: ROUTES.community.nonCovered },
      { label: "서류 발급 안내", href: ROUTES.community.documents },
    ],
  },
  {
    label: "통증클리닉",
    href: ROUTES.spine.root,
    hidden: true,
    children: [
      { label: "디스크 (목·허리)", href: ROUTES.spine.disc },
      { label: "척추관협착증", href: ROUTES.spine.stenosis },
      { label: "오십견·회전근개", href: ROUTES.spine.shoulder },
      { label: "무릎관절통", href: ROUTES.spine.knee },
      { label: "스포츠 손상", href: ROUTES.spine.sports },
    ],
  },
  {
    label: "추나·교정",
    href: ROUTES.posture.root,
    hidden: true,
    children: [
      { label: "척추측만증", href: ROUTES.posture.scoliosis },
      { label: "일자목·거북목", href: ROUTES.posture.forwardHead },
      { label: "골반·휜다리", href: ROUTES.posture.pelvis },
      { label: "산후 체형교정", href: ROUTES.posture.postnatal },
    ],
  },
  {
    label: "면역·만성",
    href: ROUTES.immunity.root,
    hidden: true,
    children: [
      { label: "비염·천식", href: ROUTES.immunity.rhinitis },
      { label: "만성피로", href: ROUTES.immunity.fatigue },
      { label: "수면장애·두통", href: ROUTES.immunity.sleep },
      { label: "수족냉증", href: ROUTES.immunity.coldHandFoot },
    ],
  },
  {
    label: "여성·소아",
    href: ROUTES.womenKids.root,
    hidden: true,
    children: [
      { label: "산후조리", href: ROUTES.womenKids.postnatalCare },
      { label: "생리통·월경불순", href: ROUTES.womenKids.menstruation },
      { label: "갱년기", href: ROUTES.womenKids.menopause },
      { label: "성장 클리닉", href: ROUTES.womenKids.growth },
      { label: "총명탕", href: ROUTES.womenKids.chongmyeong },
    ],
  },
];

export const FOOTER_LINKS = {
  clinics: [
    { label: "암 통합치료", href: ROUTES.cancer.root },
    { label: "교통사고", href: ROUTES.accident.root },
    { label: "자율신경실조증", href: ROUTES.autonomic.root },
    { label: "척추관절통증", href: ROUTES.spineJoint.root },
    { label: "다이어트", href: ROUTES.diet.root },
  ],
  support: [
    { label: "공지사항", href: ROUTES.community.notice },
    { label: "온라인 상담", href: ROUTES.community.counsel },
    { label: "자주묻는 질문", href: ROUTES.community.faq },
    { label: "비급여 항목", href: ROUTES.community.nonCovered },
    { label: "서류 발급 안내", href: ROUTES.community.documents },
  ],
  legal: [
    { label: "개인정보처리방침", href: ROUTES.legal.privacy },
    { label: "이용약관", href: ROUTES.legal.terms },
    { label: "환자권리장전", href: ROUTES.legal.patientRights },
    { label: "비급여 항목", href: ROUTES.community.nonCovered },
  ],
} as const;

/** 새 canonical 경로로 영구 이관되어 sitemap에서 제외할 기존 URL */
export const LEGACY_REDIRECT_PATHS = [
  ROUTES.spine.root,
  ROUTES.spine.disc,
  ROUTES.spine.stenosis,
  ROUTES.spine.shoulder,
  ROUTES.spine.knee,
  ROUTES.spine.sports,
  ROUTES.posture.root,
  ROUTES.posture.scoliosis,
  ROUTES.posture.forwardHead,
  ROUTES.posture.pelvis,
  ROUTES.posture.postnatal,
  ROUTES.immunity.sleep,
] as const;

/**
 * 활성 카테고리(GNB / LNB 하이라이트용)를 path에서 추출합니다.
 * 예: "/spine/disc" → "spine"
 */
export function getActiveCategory(pathname: string): string | null {
  if (pathname === "/" || pathname === "") return null;
  const segs = pathname.split("/").filter(Boolean);
  return segs[0] ?? null;
}
