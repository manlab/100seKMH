/**
 * 환경변수 타입-안전 액세스.
 * 사용처에서 `env.RESEND_API_KEY` 식으로 접근 — 누락 시 dev/prod 분기 처리.
 */

export const env = {
  /** Resend API 키 — 미설정 시 이메일 전송은 dev 로그로 대체. */
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",

  /** 상담 글이 도착할 병원 운영팀 이메일. */
  COUNSEL_TO_EMAIL: process.env.COUNSEL_TO_EMAIL ?? "ops@baeksehospital.kr",

  /** 발신자 이메일 — Resend에 verified domain이 필요. dev에서는 onboarding@resend.dev 사용 가능. */
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? "백세한방병원 <onboarding@resend.dev>",

  /** 사이트 공개 URL (이메일 본문 링크용). */
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://baeksehospital.kr",

  NODE_ENV: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === "production",
  isDev: process.env.NODE_ENV !== "production",
} as const;

export type Env = typeof env;
