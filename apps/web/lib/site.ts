/**
 * 사이트 메타 정보 — placeholder 값. 개원 시 교체 필요.
 */
export const SITE = {
  name: "백세한방병원",
  nameEn: "Baekse Korean Medicine Hospital",
  tagline: "정성스러운 한방, 100년의 건강",
  url: "https://baeksehospital.kr",
  description:
    "백세 건강의 시작, 백세한방병원. 척추·관절, 추나·교정, 교통사고, 면역·만성, 여성·소아 클리닉을 운영하는 한방병원입니다. 1년 365일 진료.",

  // TODO(client-asset): 개원 시 실제 값으로 교체
  contact: {
    representative: "031-0000-0000",
    counsel: "031-0000-1111",
    address: "경기도 OO시 OO로 OOO, OOO빌딩 O층",
    businessNumber: "OOO-OO-OOOOO",
    representativeName: "OOO",
  },

  // 진료시간 (개원 시 확정)
  hours: {
    weekday: "09:30 — 19:30",
    saturday: "09:30 — 17:00",
    sunday: "09:30 — 17:00",
    holiday: "09:30 — 17:00",
    lunch: "12:30 — 13:30",
  },

  social: {
    blog: "#", // TODO(client-asset): 네이버 블로그 URL
    instagram: "#", // TODO(client-asset)
    youtube: "#", // TODO(client-asset)
    kakao: "#", // TODO(client-asset)
  },
} as const;
