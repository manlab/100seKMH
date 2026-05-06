import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ShieldCheck } from "lucide-react";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { LoginForm } from "./_components/LoginForm";

type Props = {
  searchParams: { next?: string };
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: Props) {
  // 이미 로그인 상태면 곧장 어드민 홈으로
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    const admin = await verifySession(token);
    if (admin) redirect(searchParams.next ?? "/admin/counsels");
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white shadow-card p-7">
        <div className="text-center mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-600 mb-3">
            <ShieldCheck size={20} aria-hidden="true" />
          </span>
          <h1 className="text-[18px] font-bold text-primary-700">어드민 로그인</h1>
          <p className="mt-1 text-[12px] text-neutral-500">백세한방병원 운영팀 전용</p>
        </div>
        <LoginForm next={searchParams.next} />
      </div>
    </div>
  );
}
