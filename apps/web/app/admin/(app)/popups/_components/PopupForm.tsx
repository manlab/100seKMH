"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ImagePlus,
  Loader2,
  Save,
  Send,
  Trash2,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  HomePopupFormSchema,
  type HomePopupFormValues,
} from "@/lib/popup-schema";

type Mode = { kind: "create" } | { kind: "edit"; id: string };

type Props = {
  mode: Mode;
  initialValues: HomePopupFormValues;
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

const POPUP_TYPE_OPTIONS = [
  {
    value: "content" as const,
    label: "텍스트 팝업",
    description: "제목, 본문, 버튼을 조합해 안내합니다.",
  },
  {
    value: "image" as const,
    label: "이미지 단독",
    description: "등록한 홍보 이미지만 비율을 유지해 표시합니다.",
  },
];

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
        <span className="block text-[13px] font-semibold text-neutral-800">
          {label}
        </span>
        <span className="mt-0.5 block text-[12px] leading-snug text-neutral-500">
          {description}
        </span>
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

export function PopupForm({ mode, initialValues }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<HomePopupFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "save" | "delete">(null);
  const [uploading, setUploading] = useState(false);
  const isImageOnly = values.displayType === "image";

  function update<K extends keyof HomePopupFormValues>(
    key: K,
    value: HomePopupFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError(null);

    const parsed = HomePopupFormSchema.safeParse(values);
    if (!parsed.success) {
      const firstError = Object.values(
        parsed.error.flatten().fieldErrors,
      ).flat()[0];
      setError(firstError ?? "입력값을 확인해 주세요.");
      return;
    }

    setBusy("save");
    try {
      const url =
        mode.kind === "create"
          ? "/api/admin/popups"
          : `/api/admin/popups/${mode.id}`;
      const method = mode.kind === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as {
        ok: boolean;
        id?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "저장에 실패했습니다.");
        setBusy(null);
        return;
      }
      router.replace("/admin/popups");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setBusy(null);
    }
  }

  async function onDelete() {
    if (mode.kind !== "edit") return;
    if (busy) return;
    if (!confirm("이 팝업을 정말 삭제할까요? 복구할 수 없습니다.")) return;

    setBusy("delete");
    try {
      const res = await fetch(`/api/admin/popups/${mode.id}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "삭제에 실패했습니다.");
        setBusy(null);
        return;
      }
      router.replace("/admin/popups");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setBusy(null);
    }
  }

  async function onImageUpload(file: File | undefined) {
    if (!file || uploading) return;
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("이미지는 5MB 이하로 업로드해 주세요.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/popups/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as {
        ok: boolean;
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.url) {
        setError(data.error ?? "이미지 업로드에 실패했습니다.");
        return;
      }
      update("imageUrl", data.url);
    } catch {
      setError("이미지 업로드 중 네트워크 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  }

  const inputBase =
    "w-full h-11 rounded-lg border border-neutral-200 bg-white px-4 text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200";

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

      <fieldset>
        <legend className="mb-1.5 text-[12px] font-semibold text-neutral-700">
          팝업 형식
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {POPUP_TYPE_OPTIONS.map((option) => {
            const isSelected = values.displayType === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-xl border px-4 py-3 transition-colors",
                  isSelected
                    ? "border-primary-500 bg-primary-50 text-primary-800"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50/40",
                )}
              >
                <input
                  type="radio"
                  name="displayType"
                  value={option.value}
                  checked={isSelected}
                  disabled={busy !== null}
                  onChange={() => update("displayType", option.value)}
                  className="sr-only"
                />
                <span className="block text-[13px] font-semibold">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-[12px] leading-snug text-neutral-500">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="pf-title"
          className="mb-1 block text-[12px] font-semibold text-neutral-700"
        >
          {isImageOnly ? "관리용 제목 / 이미지 대체 텍스트" : "제목"}{" "}
          <span className="text-accent-600">*</span>
        </label>
        <input
          id="pf-title"
          type="text"
          required
          maxLength={120}
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder={isImageOnly ? "예: 2026년 7월 진료 안내" : "팝업 제목"}
          className={inputBase}
        />
        {isImageOnly && (
          <p className="mt-1.5 text-[12px] text-neutral-500">
            홈페이지에는 보이지 않으며, 관리자 목록과 이미지 대체 텍스트로
            사용됩니다.
          </p>
        )}
      </div>

      {!isImageOnly && (
        <div>
          <label
            htmlFor="pf-content"
            className="mb-1 block text-[12px] font-semibold text-neutral-700"
          >
            본문 <span className="text-accent-600">*</span>
          </label>
          <textarea
            id="pf-content"
            rows={10}
            required
            maxLength={5000}
            value={values.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder="팝업 본문을 입력하세요. 줄바꿈은 그대로 표시됩니다."
            className={cn(
              "w-full resize-y rounded-lg border border-neutral-200 bg-white px-4 py-3 text-[14px] leading-relaxed transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200",
            )}
          />
          <p className="mt-1.5 text-[12px] text-neutral-500 tabular">
            {values.content.length.toLocaleString()} / 5,000자
          </p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="pf-image"
            className="mb-1 block text-[12px] font-semibold text-neutral-700"
          >
            이미지 {isImageOnly && <span className="text-accent-600">*</span>}
          </label>
          <div className="space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 text-[13px] font-semibold text-primary-700 transition-colors hover:bg-primary-100">
                {uploading ? (
                  <Loader2
                    size={14}
                    aria-hidden="true"
                    className="animate-spin"
                  />
                ) : (
                  <Upload size={14} aria-hidden="true" />
                )}
                {uploading ? "업로드 중" : "이미지 업로드"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={uploading || busy !== null}
                  className="sr-only"
                  onChange={(e) => {
                    void onImageUpload(e.target.files?.[0]);
                    e.currentTarget.value = "";
                  }}
                />
              </label>
              <input
                id="pf-image"
                type="text"
                maxLength={500}
                value={values.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                placeholder="업로드하면 자동 입력됩니다. 직접 URL 입력도 가능"
                className={cn(inputBase, "min-w-0 flex-1")}
              />
            </div>
            <p className="text-[12px] text-neutral-500">
              {isImageOnly
                ? "jpg, png, webp, gif / 5MB 이하. 이미지 단독 팝업은 이미지를 반드시 등록해 주세요."
                : "jpg, png, webp, gif / 5MB 이하. 업로드 후 URL이 자동으로 입력됩니다."}
            </p>
            {values.imageUrl ? (
              <div
                className={cn(
                  "overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50",
                  isImageOnly && "p-3",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={values.imageUrl}
                  alt="팝업 이미지 미리보기"
                  className={cn(
                    isImageOnly
                      ? "mx-auto max-h-80 w-auto max-w-full object-contain"
                      : "h-40 w-full object-cover",
                  )}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="flex h-28 items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-[13px] text-neutral-500">
                <ImagePlus size={16} aria-hidden="true" />
                {isImageOnly
                  ? "이미지 단독 팝업에는 이미지를 등록해 주세요."
                  : "이미지가 없으면 본문만 표시됩니다."}
              </div>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="pf-sort"
            className="mb-1 block text-[12px] font-semibold text-neutral-700"
          >
            정렬값
          </label>
          <input
            id="pf-sort"
            type="number"
            min={0}
            max={999}
            value={values.sortOrder}
            onChange={(e) => update("sortOrder", Number(e.target.value))}
            className={inputBase}
          />
        </div>
      </div>

      {isImageOnly ? (
        <div>
          <label
            htmlFor="pf-link-url"
            className="mb-1 block text-[12px] font-semibold text-neutral-700"
          >
            이미지 클릭 이동 URL
          </label>
          <input
            id="pf-link-url"
            type="text"
            maxLength={500}
            value={values.linkUrl}
            onChange={(e) => update("linkUrl", e.target.value)}
            placeholder="/community/notice 또는 https://..."
            className={inputBase}
          />
          <p className="mt-1.5 text-[12px] text-neutral-500">
            입력하면 버튼 없이 이미지 전체를 클릭해 이동합니다.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label
              htmlFor="pf-link-label"
              className="mb-1 block text-[12px] font-semibold text-neutral-700"
            >
              버튼 문구
            </label>
            <input
              id="pf-link-label"
              type="text"
              maxLength={40}
              value={values.linkLabel}
              onChange={(e) => update("linkLabel", e.target.value)}
              placeholder="자세히 보기"
              className={inputBase}
            />
          </div>
          <div>
            <label
              htmlFor="pf-link-url"
              className="mb-1 block text-[12px] font-semibold text-neutral-700"
            >
              버튼 URL
            </label>
            <input
              id="pf-link-url"
              type="text"
              maxLength={500}
              value={values.linkUrl}
              onChange={(e) => update("linkUrl", e.target.value)}
              placeholder="/community/notice 또는 https://..."
              className={inputBase}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="pf-starts"
            className="mb-1 block text-[12px] font-semibold text-neutral-700"
          >
            노출 시작
          </label>
          <input
            id="pf-starts"
            type="datetime-local"
            value={values.startsAt}
            onChange={(e) => update("startsAt", e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label
            htmlFor="pf-ends"
            className="mb-1 block text-[12px] font-semibold text-neutral-700"
          >
            노출 종료
          </label>
          <input
            id="pf-ends"
            type="datetime-local"
            value={values.endsAt}
            onChange={(e) => update("endsAt", e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      <ToggleField
        id="pf-published"
        checked={values.isPublished}
        onChange={(checked) => update("isPublished", checked)}
        label="게시 상태"
        description={
          values.isPublished
            ? "노출 기간 조건에 맞으면 메인페이지에 표시됩니다."
            : "임시저장으로 보관됩니다."
        }
        onLabel="게시"
        offLabel="임시저장"
      />

      <div className="flex items-center justify-end gap-3 pt-2">
        {mode.kind === "edit" && (
          <button
            type="button"
            onClick={onDelete}
            disabled={busy !== null}
            className="mr-auto inline-flex h-11 items-center gap-2 rounded-lg border border-danger-500/40 bg-white px-5 text-[14px] font-semibold text-danger-600 transition-colors hover:bg-danger-50 disabled:cursor-not-allowed disabled:opacity-60"
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
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-600 px-6 text-[14px] font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy === "save" ? (
            <>
              <Loader2 size={14} aria-hidden="true" className="animate-spin" />
              저장 중
            </>
          ) : mode.kind === "create" ? (
            <>
              <Send size={14} aria-hidden="true" />
              팝업 등록
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
