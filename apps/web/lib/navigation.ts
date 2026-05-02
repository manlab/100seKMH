/**
 * 사이트 네비게이션 데이터 — Single source of truth.
 * GNB / 메가메뉴 / 모바일 드로어 / LNB / 푸터 모두 이 데이터를 참조합니다.
 */

export type NavItem = {
  label: string;
  href: string;
  /** 1depth 카테고리의 하위 메뉴(메가메뉴, LNB) */
  children?: NavItem[];
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
      { label: "인사말", href: ROUTES.about.greeting },
      { label: "의료진 소개", href: ROUTES.about.doctors },
      { label: "시설 둘러보기", href: ROUTES.about.facility },
      { label: "한약·탕전 안내", href: ROUTES.about.herbal },
      { label: "입원 안내", href: ROUTES.about.admission },
      { label: "진료시간", href: ROUTES.about.hours },
      { label: "오시는 길", href: ROUTES.about.location },
    ],
  },
  {
    label: "통증클리닉",
    href: ROUTES.spine.root,
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
    children: [
      { label: "척추측만증", href: ROUTES.posture.scoliosis },
      { label: "일자목·거북목", href: ROUTES.posture.forwardHead },
      { label: "골반·휜다리", href: ROUTES.posture.pelvis },
      { label: "산후 체형교정", href: ROUTES.posture.postnatal },
    ],
  },
  {
    label: "교통사고",
    href: ROUTES.accident.root,
    children: [
      { label: "교통사고 후유증", href: ROUTES.accident.aftercare },
      { label: "자동차보험 진료절차", href: ROUTES.accident.insurance },
      { label: "치료·입원 시스템", href: ROUTES.accident.system },
    ],
  },
  {
    label: "면역·만성",
    href: ROUTES.immunity.root,
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
    children: [
      { label: "산후조리", href: ROUTES.womenKids.postnatalCare },
      { label: "생리통·월경불순", href: ROUTES.womenKids.menstruation },
      { label: "갱년기", href: ROUTES.womenKids.menopause },
      { label: "성장 클리닉", href: ROUTES.womenKids.growth },
      { label: "총명탕", href: ROUTES.womenKids.chongmyeong },
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
];

export const FOOTER_LINKS = {
  clinics: [
    { label: "통증클리닉", href: ROUTES.spine.root },
    { label: "추나·교정", href: ROUTES.posture.root },
    { label: "교통사고", href: ROUTES.accident.root },
    { label: "면역·만성", href: ROUTES.immunity.root },
    { label: "여성·소아", href: ROUTES.womenKids.root },
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

/**
 * 활성 카테고리(GNB / LNB 하이라이트용)를 path에서 추출합니다.
 * 예: "/spine/disc" → "spine"
 */
export function getActiveCategory(pathname: string): string | null {
  if (pathname === "/" || pathname === "") return null;
  const segs = pathname.split("/").filter(Boolean);
  return segs[0] ?? null;
}
