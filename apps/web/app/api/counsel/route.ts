import { NextResponse, type NextRequest } from "next/server";
import { CounselFormSchema } from "@/lib/counsel-schema";
import { sendCounselEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

/** Resend SDK는 Node 런타임 필요 (edge X). */
export const runtime = "nodejs";

/** 클라이언트로 노출되는 응답 형태 — 민감한 details는 클라이언트에서 검증으로 충분. */
type CounselApiResponse =
  | { ok: true; id?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function clientIp(req: NextRequest): string {
  // Vercel/CDN 뒤 일반적인 헤더 순서
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "anonymous";
}

export async function POST(req: NextRequest): Promise<NextResponse<CounselApiResponse>> {
  // 1) Rate limit (IP 기반)
  const ip = clientIp(req);
  const rl = rateLimit(`counsel:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `요청이 너무 잦습니다. ${rl.retryAfterSec ?? 60}초 후 다시 시도해 주세요.`,
      },
      {
        status: 429,
        headers: rl.retryAfterSec ? { "Retry-After": String(rl.retryAfterSec) } : {},
      }
    );
  }

  // 2) Body 파싱
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  // 3) Honeypot — 봇이 채우는 필드. 값이 있으면 silent success (봇에게 정상으로 보이게).
  if (body && typeof body === "object" && "website" in body) {
    const hp = (body as { website?: unknown }).website;
    if (typeof hp === "string" && hp.length > 0) {
      // eslint-disable-next-line no-console
      console.warn("[counsel] honeypot triggered from", ip);
      return NextResponse.json({ ok: true });
    }
  }

  // 4) Zod 재검증 (서버는 항상 다시 검증)
  const parsed = CounselFormSchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return NextResponse.json(
      {
        ok: false,
        error: "입력값을 확인해 주세요.",
        fieldErrors: flat.fieldErrors as Record<string, string[]>,
      },
      { status: 400 }
    );
  }

  // 5) 이메일 전송
  const result = await sendCounselEmail(parsed.data);
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: result.error ?? "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}

/** 그 외 메서드는 405. */
export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } });
}
