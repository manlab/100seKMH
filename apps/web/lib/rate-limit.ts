import { sql } from "drizzle-orm";
import { db, schema } from "./db/client";

/**
 * DB 기반 rate limit — IP/key 별 토큰버킷.
 *
 * Vercel serverless 의 in-memory 인스턴스 격리 문제를 해결하기 위해
 * Postgres 단일 source of truth 로 카운팅. 동일 윈도우 내 동시 호출은
 * `INSERT ... ON CONFLICT DO UPDATE` 의 원자성에 의존.
 *
 * 단발 호출이 잦은 폼 제출에서 1회 추가 쿼리 비용 vs 어뷰즈 방어 trade-off
 * — Hobby tier 에서도 무리 없는 수준.
 */

const WINDOW_MS = 60_000; // 1분
const DEFAULT_MAX = 5;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec?: number;
};

export async function rateLimit(key: string, max = DEFAULT_MAX): Promise<RateLimitResult> {
  const now = new Date();
  const reset = new Date(now.getTime() + WINDOW_MS);

  const result = await db()
    .insert(schema.rateLimits)
    .values({ key, count: 1, resetAt: reset })
    .onConflictDoUpdate({
      target: schema.rateLimits.key,
      set: {
        count: sql`CASE
          WHEN ${schema.rateLimits.resetAt} < NOW()
            THEN 1
          ELSE ${schema.rateLimits.count} + 1
        END`,
        resetAt: sql`CASE
          WHEN ${schema.rateLimits.resetAt} < NOW()
            THEN ${reset}
          ELSE ${schema.rateLimits.resetAt}
        END`,
      },
    })
    .returning({
      count: schema.rateLimits.count,
      resetAt: schema.rateLimits.resetAt,
    });

  const row = result[0];
  if (!row) return { ok: true, remaining: max - 1 };

  const ok = row.count <= max;
  const remaining = Math.max(0, max - row.count);
  if (!ok) {
    const retryAfterSec = Math.max(1, Math.ceil((row.resetAt.getTime() - now.getTime()) / 1000));
    return { ok: false, remaining, retryAfterSec };
  }
  return { ok: true, remaining };
}
