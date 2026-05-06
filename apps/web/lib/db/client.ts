import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { requireDb } from "../env";
import * as schema from "./schema";

/**
 * Drizzle client — Vercel Postgres (Neon) connection-pooled `sql` 사용.
 *
 * - Vercel runtime: POSTGRES_URL 자동 주입.
 * - 로컬: `vercel env pull .env.local` 또는 .env 에 POSTGRES_URL 직접 설정.
 * - import 만으로 연결을 만들지 않도록 first-use 시 requireDb() 검증.
 */

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function db() {
  if (!_db) {
    requireDb(); // POSTGRES_URL 미설정 시 명확한 에러
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export { schema };
