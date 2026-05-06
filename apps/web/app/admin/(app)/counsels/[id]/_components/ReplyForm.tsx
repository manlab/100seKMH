"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  existingReply: string | null;
  repliedAt: string | null;
  repliedBy: string | null;
};

export function ReplyForm({ id, existingReply, repliedAt, repliedBy }: Props) {
  const router = useRouter();
  const [text, setText] = useState(existingReply ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (text.trim().length < 5) {
      setError("답변은 5자 이상 입력해 주세요.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/counsels/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: text }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "저장에 실패했습니다.");
        setBusy(false);
        return;
      }
      router.refresh();
      setBusy(false);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 lg:p-7"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 size={16} aria-hidden="true" className="text-emerald-600" />
        <h2 className="text-[15px] font-bold text-emerald-800">병원 답변</h2>
        {repliedAt && (
          <span className="ml-2 text-[12px] text-emerald-700 tabular">
            마지막 저장 {repliedAt.slice(0, 16).replace("T", " ")}
            {repliedBy ? ` · ${repliedBy}` : ""}
          </span>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-3 flex items-start gap-2 rounded-lg border border-danger-500/30 bg-danger-50 px-3 py-2 text-[13px] text-danger-600"
        >
          <AlertTriangle size={14} aria-hidden="true" className="mt-0.5" />
          {error}
        </div>
      )}

      <label htmlFor="adm-reply" className="sr-only">답변 내용</label>
      <textarea
        id="adm-reply"
        rows={8}
        required
        placeholder="환자분께 전달할 답변을 작성해 주세요. (5자 이상)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={cn(
          "w-full px-4 py-3 rounded-lg border bg-white text-[14px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-y transition-colors",
          error ? "border-danger-500" : "border-emerald-200"
        )}
      />

      <div className="mt-4 flex items-center justify-end">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-emerald-600 text-white text-[14px] font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-cta"
        >
          {busy ? (
            <>
              <Loader2 size={14} aria-hidden="true" className="animate-spin" /> 저장 중
            </>
          ) : (
            <>
              <Send size={14} aria-hidden="true" />
              {existingReply ? "답변 수정" : "답변 등록"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
