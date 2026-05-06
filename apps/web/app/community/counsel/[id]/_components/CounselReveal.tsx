"use client";

import { useState } from "react";
import { Loader2, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Revealed = {
  id: string;
  title: string;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  reply: string | null;
  repliedAt: string | null;
  repliedBy: string | null;
};

type State =
  | { kind: "locked"; error?: string }
  | { kind: "loading" }
  | { kind: "revealed"; data: Revealed };

export function CounselReveal({ id, hasReply }: { id: string; hasReply: boolean }) {
  const [state, setState] = useState<State>({ kind: "locked" });
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;
    setState({ kind: "loading" });
    try {
      const res = await fetch(`/api/counsels/${id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as
        | { ok: true; counsel: Revealed }
        | { ok: false; error: string };
      if (!res.ok || !data.ok) {
        setState({
          kind: "locked",
          error: !data.ok ? data.error : "확인에 실패했습니다.",
        });
        return;
      }
      setState({ kind: "revealed", data: data.counsel });
      setPassword("");
    } catch {
      setState({ kind: "locked", error: "네트워크 오류가 발생했습니다." });
    }
  }

  if (state.kind === "revealed") {
    const c = state.data;
    return (
      <div className="space-y-6">
        <section>
          <h3 className="text-[14px] font-bold text-primary-700 mb-3">상담 내용</h3>
          <p className="whitespace-pre-wrap text-[14px] lg:text-[15px] text-neutral-800 leading-relaxed">
            {c.content}
          </p>
        </section>

        {c.reply ? (
          <section className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} aria-hidden="true" className="text-emerald-600" />
              <h3 className="text-[14px] font-bold text-emerald-800">병원 답변</h3>
              {c.repliedAt && (
                <span className="text-[12px] text-emerald-700 tabular">
                  {c.repliedAt.slice(0, 10)}
                </span>
              )}
              {c.repliedBy && (
                <span className="text-[12px] text-emerald-700">— {c.repliedBy}</span>
              )}
            </div>
            <p className="whitespace-pre-wrap text-[14px] text-neutral-800 leading-relaxed">
              {c.reply}
            </p>
          </section>
        ) : (
          <p className="text-[13px] text-neutral-500">아직 답변이 등록되지 않았습니다.</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 text-primary-600 mb-4">
        <Lock size={22} aria-hidden="true" />
      </div>
      <p className="text-[14px] text-neutral-700 mb-1">
        비공개 글입니다. 작성 시 입력한 비밀번호를 입력해 주세요.
      </p>
      {hasReply ? (
        <p className="text-[12px] text-emerald-700">병원 답변이 등록되어 있습니다.</p>
      ) : (
        <p className="text-[12px] text-neutral-500">아직 답변 등록 전입니다.</p>
      )}

      {state.kind === "locked" && state.error && (
        <div
          role="alert"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-danger-500/30 bg-danger-50 px-3 py-2 text-[13px] text-danger-600"
        >
          <AlertTriangle size={14} aria-hidden="true" />
          {state.error}
        </div>
      )}

      <div className="mt-5 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
        <label htmlFor="cs-detail-pw" className="sr-only">비밀번호</label>
        <input
          id="cs-detail-pw"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cn(
            "h-11 px-4 rounded-lg border bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors flex-1",
            state.kind === "locked" && state.error
              ? "border-danger-500"
              : "border-neutral-200"
          )}
        />
        <button
          type="submit"
          disabled={state.kind === "loading" || !password}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-primary-600 text-white text-[14px] font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {state.kind === "loading" ? (
            <>
              <Loader2 size={14} aria-hidden="true" className="animate-spin" />
              확인 중
            </>
          ) : (
            "확인"
          )}
        </button>
      </div>
    </form>
  );
}
