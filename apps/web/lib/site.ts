/**
 * 사이트 메타 정보 — placeholder 값. 개원 시 교체 필요.
 */
export const SITE = {
  name: "백세한방병원",
  nameEn: "Baekse Korean Medicine Hospital",
  tagline: "정성스러운 한방, 100년의 건강",
  url: "https://www.xn--vh3bpa59b04lwmilrx.kr",
  description:
    "부산 서면의 백세한방병원. 척추·관절, 추나·교정, 교통사고, 면역·만성, 여성·소아 클리닉과 입원실을 운영하는 한방병원입니다.",

  // TODO(client-asset): 개원 시 실제 값으로 교체
  contact: {
    representative: "1668-0103",
    counsel: "1668-0103",
    address: "부산광역시 부산진구 서면로 32, 9F, 10F, 12F, 13F, 14F (부전동, mmm메디컬센터)",
    businessNumber: "610-96-11438",
    representativeName: "신승협",
  },

  // 진료시간
  hours: {
    weekday: "09:00~18:00",
    saturday: "09:00~13:00",
    sunday: "휴진",
    holiday: "방문 전 확인",
    lunch: "12:30~13:30",
  },

  social: {
    blog: "#", // TODO(client-asset): 네이버 블로그 URL
    instagram: "#", // TODO(client-asset)
    youtube: "#", // TODO(client-asset)
    kakao: "#", // TODO(client-asset)
  },
} as const;
