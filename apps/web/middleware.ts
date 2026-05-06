import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth-constants";

/**
 * /admin/* 보호 — 세션 쿠키가 없으면 로그인으로 리다이렉트.
 *
 * 가벼운 체크만 (쿠키 존재 + 비어있지 않음). 진짜 검증은 서버 컴포넌트의
 * `verifySession()` 에서 DB 조회로 수행 — 미들웨어가 매 요청마다 DB 를 때리는
 * 비용을 회피하기 위함.
 */

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const cookie = req.cookies.get(SESSION_COOKIE);
  if (!cookie?.value) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
