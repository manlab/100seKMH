import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { loginAdmin, createSession, SESSION_COOKIE } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";

export const runtime = "nodejs";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(200),
});

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "anonymous";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Brute-force 방지 — IP 별 분당 5회
  const rl = await rateLimit(`admin-login:${clientIp(req)}`, 5);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: `시도가 너무 잦습니다. ${rl.retryAfterSec ?? 60}초 후 다시 시도.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청 형식입니다." }, { status: 400 });
  }
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "이메일/비밀번호를 확인해 주세요." }, { status: 400 });
  }

  const admin = await loginAdmin(parsed.data.email, parsed.data.password);
  if (!admin) {
    return NextResponse.json(
      { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const session = await createSession(admin.id);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: env.isProd,
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt,
  });
  return res;
}
