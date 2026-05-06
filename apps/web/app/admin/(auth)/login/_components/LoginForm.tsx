"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "로그인에 실패했습니다.");
        setBusy(false);
        return;
      }
      router.replace(next ?? "/admin/counsels");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-danger-500/30 bg-danger-50 px-3 py-2 text-[13px] text-danger-600"
        >
          <AlertTriangle size={14} aria-hidden="true" />
          {error}
        </div>
      )}
      <div>
        <label htmlFor="adm-email" className="block text-[12px] font-semibold text-neutral-700 mb-1">
          이메일
        </label>
        <input
          id="adm-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-11 px-4 rounded-lg border border-neutral-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>
      <div>
        <label htmlFor="adm-pw" className="block text-[12px] font-semibold text-neutral-700 mb-1">
          비밀번호
        </label>
        <input
          id="adm-pw"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 px-4 rounded-lg border border-neutral-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        className="w-full h-11 rounded-lg bg-primary-600 text-white text-[14px] font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
      >
        {busy ? (
          <>
            <Loader2 size={14} aria-hidden="true" className="animate-spin" /> 로그인 중
          </>
        ) : (
          "로그인"
        )}
      </button>
    </form>
  );
}
