"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, AlertTriangle, Trash2, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { NOTICE_CATEGORIES } from "@/lib/db/schema";
import type { NoticeFormValues } from "@/lib/notice-schema";

type Mode =
  | { kind: "create" }
  | { kind: "edit"; id: string };

type Props = {
  mode: Mode;
  initialValues: NoticeFormValues;
};

type ToggleFieldProps = {
  checked: boolean;
  description: string;
  id: string;
  label: string;
  offLabel: string;
  onChange: (checked: boolean) => void;
  onLabel: string;
};

function ToggleField({
  checked,
  description,
  id,
  label,
  offLabel,
  onChange,
  onLabel,
}: ToggleFieldProps) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-[76px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-primary-200 hover:bg-primary-50/40"
    >
      <span>
        <span className="block text-[13px] font-semibold text-neutral-800">{label}</span>
        <span className="mt-0.5 block text-[12px] leading-snug text-neutral-500">{description}</span>
      </span>
      <span className="relative inline-flex shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="h-7 w-12 rounded-full bg-neutral-300 transition-colors peer-checked:bg-primary-600 peer-focus-visible:ring-4 peer-focus-visible:ring-primary-200"
        />
        <span
          aria-hidden="true"
          className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"
        />
        <span className="sr-only">{checked ? onLabel : offLabel}</span>
      </span>
    </label>
  );
}

export function NoticeForm({ mode, initialValues }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<NoticeFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "save" | "delete">(null);

  function update<K extends keyof NoticeFormValues>(k: K, v: NoticeFormValues[K]) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError(null);

    if (values.title.trim().length < 2) {
      setError("제목은 2자 이상 입력해 주세요.");
      return;
    }
    if (values.content.trim().length < 5) {
      setError("본문은 5자 이상 입력해 주세요.");
      return;
    }

    setBusy("save");
    try {
      const url =
        mode.kind === "create" ? "/api/admin/notices" : `/api/admin/notices/${mode.id}`;
      const method = mode.kind === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; id?: string; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "저장에 실패했습니다.");
        setBusy(null);
        return;
      }
      router.replace("/admin/notices");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setBusy(null);
    }
  }

  async function onDelete() {
    if (mode.kind !== "edit") return;
    if (busy) return;
    if (!confirm("이 공지를 정말 삭제할까요? 복구할 수 없습니다.")) return;
    setBusy("delete");
    try {
      const res = await fetch(`/api/admin/notices/${mode.id}`, { method: "DELETE" });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "삭제에 실패했습니다.");
        setBusy(null);
        return;
      }
      router.replace("/admin/notices");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setBusy(null);
    }
  }

  const inputBase =
    "w-full h-11 px-4 rounded-lg border bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors border-neutral-200";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-danger-500/30 bg-danger-50 px-3 py-2 text-[13px] text-danger-600"
        >
          <AlertTriangle size={14} aria-hidden="true" className="mt-0.5" />
          {error}
        </div>
      )}

      <div>
        <label htmlFor="nf-title" className="block text-[12px] font-semibold text-neutral-700 mb-1">
          제목 <span className="text-accent-600">*</span>
        </label>
        <input
          id="nf-title"
          type="text"
          required
          maxLength={200}
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="공지 제목"
          className={inputBase}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.8fr)_minmax(240px,1fr)_minmax(280px,1fr)]">
        <div>
          <label htmlFor="nf-cat" className="block text-[12px] font-semibold text-neutral-700 mb-1">
            카테고리 <span className="text-accent-600">*</span>
          </label>
          <select
            id="nf-cat"
            required
            value={values.category}
            onChange={(e) => update("category", e.target.value as NoticeFormValues["category"])}
            className={inputBase}
          >
            {NOTICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <ToggleField
          id="nf-pinned"
          checked={values.isPinned}
          onChange={(checked) => update("isPinned", checked)}
          label="상단 고정"
          description="공지 목록 최상단에 고정합니다."
          onLabel="상단 고정 켜짐"
          offLabel="상단 고정 꺼짐"
        />
        <ToggleField
          id="nf-published"
          checked={values.isPublished}
          onChange={(checked) => update("isPublished", checked)}
          label="게시 상태"
          description={values.isPublished ? "저장 즉시 공개됩니다." : "임시저장으로 보관됩니다."}
          onLabel="게시"
          offLabel="임시저장"
        />
      </div>

      <div>
        <label htmlFor="nf-content" className="block text-[12px] font-semibold text-neutral-700 mb-1">
          본문 <span className="text-accent-600">*</span>
        </label>
        <textarea
          id="nf-content"
          rows={14}
          required
          maxLength={20000}
          value={values.content}
          onChange={(e) => update("content", e.target.value)}
          placeholder="줄바꿈은 그대로 표시됩니다."
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-white text-[14px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-200 resize-y transition-colors border-neutral-200"
          )}
        />
        <p className="mt-1.5 text-[12px] text-neutral-500 tabular">
          {values.content.length.toLocaleString()} / 20,000자
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        {mode.kind === "edit" && (
          <button
            type="button"
            onClick={onDelete}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white border border-danger-500/40 text-danger-600 text-[14px] font-semibold hover:bg-danger-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mr-auto"
          >
            {busy === "delete" ? (
              <Loader2 size={14} aria-hidden="true" className="animate-spin" />
            ) : (
              <Trash2 size={14} aria-hidden="true" />
            )}
            삭제
          </button>
        )}
        <button
          type="submit"
          disabled={busy !== null}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary-600 text-white text-[14px] font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {busy === "save" ? (
            <>
              <Loader2 size={14} aria-hidden="true" className="animate-spin" />
              저장 중
            </>
          ) : mode.kind === "create" ? (
            <>
              <Send size={14} aria-hidden="true" />
              공지 등록
            </>
          ) : (
            <>
              <Save size={14} aria-hidden="true" />
              수정 저장
            </>
          )}
        </button>
      </div>
    </form>
  );
}
