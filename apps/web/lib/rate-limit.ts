/**
 * 매우 단순한 인메모리 rate limit (placeholder).
 * 운영 시 Upstash Redis 또는 @vercel/kv로 교체 권장.
 *
 * 동일 IP로 1분에 5회 이상 요청 시 차단.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1분
const MAX = 5;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec?: number;
};

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX - 1 };
  }

  if (bucket.count >= MAX) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: MAX - bucket.count };
}

/** 메모리 누수 방지용 — 주기적으로 만료된 버킷 정리 (가벼운 GC). */
export function cleanupBuckets() {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (v.resetAt < now) buckets.delete(k);
  }
}
