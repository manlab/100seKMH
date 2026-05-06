import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LogOut, Megaphone, MessageCircle, ShieldCheck } from "lucide-react";
import { ROUTES } from "@/lib/navigation";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { LogoutButton } from "./_components/LogoutButton";

export const metadata: Metadata = {
  title: "어드민 — 백세한방병원",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  // 미들웨어가 쿠키 존재만 검증 — 진짜 검증은 여기서.
  // 만료/위조된 토큰은 로그인 페이지로 리다이렉트.
  const token = cookies().get(SESSION_COOKIE)?.value;
  const admin = await verifySession(token);
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-primary-700 text-white">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-8 h-14 flex items-center gap-6">
          <Link href={ROUTES.home} className="font-bold text-[15px]">
            백세한방병원
          </Link>
          <span className="text-[12px] text-primary-200 inline-flex items-center gap-1">
            <ShieldCheck size={12} aria-hidden="true" /> 어드민
          </span>
          <nav className="ml-auto flex items-center gap-5 text-[13px]">
            <Link
              href="/admin/notices"
              className="inline-flex items-center gap-1.5 text-primary-100 hover:text-white"
            >
              <Megaphone size={14} aria-hidden="true" />
              공지
            </Link>
            <Link
              href="/admin/counsels"
              className="inline-flex items-center gap-1.5 text-primary-100 hover:text-white"
            >
              <MessageCircle size={14} aria-hidden="true" />
              상담 글
            </Link>
            <span className="text-[12px] text-primary-200 hidden sm:inline">
              {admin.displayName ?? admin.email}
            </span>
            <LogoutButton>
              <span className="inline-flex items-center gap-1.5 text-primary-100 hover:text-white">
                <LogOut size={14} aria-hidden="true" />
                로그아웃
              </span>
            </LogoutButton>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-screen-xl px-4 lg:px-8 py-8">{children}</main>
    </div>
  );
}
