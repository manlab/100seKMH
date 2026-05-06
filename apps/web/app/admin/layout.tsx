import type { Metadata } from "next";

/**
 * /admin/* 공통 메타 — 검색 인덱싱 차단. 헤더/네비게이션은 (app) 그룹의
 * layout 에서 따로 그려지며, 로그인 페이지는 (auth) 그룹에서 자체 레이아웃.
 */

export const metadata: Metadata = {
  title: "어드민 — 백세한방병원",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
