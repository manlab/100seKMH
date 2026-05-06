/**
 * scripts/seed-admin.ts — 초기 어드민 계정 생성 CLI.
 *
 * 사용:
 *   cd apps/web
 *   npm run db:seed-admin -- --email ops@baeksehospital.kr --password '강한비밀번호' --name '운영팀'
 *
 * 동일 email 이 이미 있으면 비밀번호만 갱신.
 */

import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { hashPassword } from "@/lib/crypto";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  return process.argv[i + 1];
}

async function main() {
  const email = arg("email");
  const password = arg("password");
  const name = arg("name") ?? "운영팀";

  if (!email || !password) {
    // eslint-disable-next-line no-console
    console.error(
      "Usage: npm run db:seed-admin -- --email <email> --password <pw> [--name <displayName>]"
    );
    process.exit(2);
  }
  if (password.length < 12) {
    // eslint-disable-next-line no-console
    console.error("password 는 12자 이상 권장합니다.");
    process.exit(2);
  }

  const passwordHash = await hashPassword(password);

  const existing = await db()
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, email.toLowerCase().trim()))
    .limit(1);

  if (existing[0]) {
    await db()
      .update(schema.adminUsers)
      .set({ passwordHash, displayName: name })
      .where(eq(schema.adminUsers.id, existing[0].id));
    // eslint-disable-next-line no-console
    console.log(`✓ admin '${email}' 비밀번호/이름 갱신`);
  } else {
    const inserted = await db()
      .insert(schema.adminUsers)
      .values({ email: email.toLowerCase().trim(), passwordHash, displayName: name })
      .returning({ id: schema.adminUsers.id });
    // eslint-disable-next-line no-console
    console.log(`✓ admin '${email}' 신규 생성  id=${inserted[0]?.id}`);
  }
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
