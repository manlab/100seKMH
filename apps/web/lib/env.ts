import { z } from "zod";

/**
 * 환경변수 — Zod 로 부팅 시 형태 검증.
 *
 * 정책:
 *  - 누락은 빌드/dev 에서 막지 않음 (defaults / optional). Next.js 빌드 단계에서
 *    DB 가 아직 안 깔린 시나리오를 깨지 않기 위함.
 *  - 실제 사용처(예: db client, crypto util)에서 `requireXxx()` 헬퍼로 강제.
 *  - 운영 모드에서 필수 변수가 비어있으면 첫 호출 시 명확한 에러로 실패.
 */

const envSchema = z.object({
  // === Postgres (Vercel Storage → Postgres 연결 시 자동 주입) ===
  POSTGRES_URL: z.string().url().optional(),
  POSTGRES_URL_NON_POOLING: z.string().url().optional(),

  // === 암호화 / 인증 비밀 ===
  /** AES-256-GCM 키 (hex 64자 = 32 bytes). `openssl rand -hex 32` 로 생성. */
  PHONE_ENC_KEY: z
    .string()
    .regex(/^[0-9a-fA-F]{64}$/, "PHONE_ENC_KEY must be 64 hex chars (32 bytes)")
    .optional(),
  /** 어드민 세션 토큰 서명 비밀 (≥32자). `openssl rand -hex 32` 권장. */
  ADMIN_SESSION_SECRET: z.string().min(32).optional(),

  /**
   * 첫 어드민 생성용 시크릿 토큰 (≥32자).
   * `/api/admin/seed` 가 admin_users 가 비어있을 때 한 번만 동작 — 토큰 일치 필요.
   * 첫 어드민 생성 후에는 노출되어도 추가 어드민 생성 안 됨.
   */
  ADMIN_SEED_TOKEN: z.string().min(32).optional(),

  // === 사이트 ===
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://www.xn--vh3bpa59b04lwmilrx.kr"),

  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  // 형태가 틀린 경우 (예: PHONE_ENC_KEY 가 잘못된 길이) 는 부팅 차단
  // eslint-disable-next-line no-console
  console.error("[env] validation failed:", parsed.error.flatten().fieldErrors);
  throw new Error("Environment variable validation failed. See server logs.");
}

const data = parsed.data;

export const env = {
  POSTGRES_URL: data.POSTGRES_URL ?? "",
  POSTGRES_URL_NON_POOLING: data.POSTGRES_URL_NON_POOLING ?? "",
  PHONE_ENC_KEY: data.PHONE_ENC_KEY ?? "",
  ADMIN_SESSION_SECRET: data.ADMIN_SESSION_SECRET ?? "",
  ADMIN_SEED_TOKEN: data.ADMIN_SEED_TOKEN ?? "",
  SITE_URL: data.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: data.NODE_ENV,
  isProd: data.NODE_ENV === "production",
  isDev: data.NODE_ENV !== "production",
} as const;

export type Env = typeof env;

/** DB 사용 직전 호출 — 미설정이면 명확한 에러로 실패. */
export function requireDb(): { url: string } {
  if (!env.POSTGRES_URL) {
    throw new Error(
      "POSTGRES_URL not set. Vercel Dashboard → Storage → Postgres → Connect to project, " +
        "또는 로컬에서 .env.local 에 POSTGRES_URL=<connection string> 추가."
    );
  }
  return { url: env.POSTGRES_URL };
}

/** 암호화 키 사용 직전 호출. */
export function requireCryptoKeys(): { phoneKey: Buffer; sessionSecret: string } {
  if (!env.PHONE_ENC_KEY) {
    throw new Error("PHONE_ENC_KEY not set. `openssl rand -hex 32` 로 생성하여 .env 에 추가.");
  }
  if (!env.ADMIN_SESSION_SECRET) {
    throw new Error("ADMIN_SESSION_SECRET not set. `openssl rand -hex 32` 로 생성하여 .env 에 추가.");
  }
  return {
    phoneKey: Buffer.from(env.PHONE_ENC_KEY, "hex"),
    sessionSecret: env.ADMIN_SESSION_SECRET,
  };
}
