import "dotenv/config";
import type { Config } from "drizzle-kit";

const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
if (!url) {
  throw new Error(
    "drizzle.config: POSTGRES_URL or POSTGRES_URL_NON_POOLING required. " +
      "`.env.local` 에 설정 후 다시 실행."
  );
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
  verbose: true,
  strict: true,
} satisfies Config;
