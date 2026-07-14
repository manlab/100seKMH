"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, CheckCircle2, AlertTriangle, Phone, Check } from "lucide-react";
import {
  CounselFormSchema,
  counselDefaults,
  type CounselFormValues,
} from "@/lib/counsel-schema";
import { ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const inputClass =
  "w-full h-11 px-4 rounded-lg border bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors";

function CheckboxField({
  children,
  describedBy,
  error,
  id,
  registration,
}: {
  children: React.ReactNode;
  describedBy?: string;
  error?: boolean;
  id: string;
  registration: UseFormRegisterReturn;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[13px] text-neutral-700">
      <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          className="peer sr-only"
          {...registration}
        />
        <span
          aria-hidden="true"
          className={cn(
            "h-5 w-5 rounded border bg-white transition-colors peer-checked:border-primary-600 peer-checked:bg-primary-600 peer-focus-visible:ring-4 peer-focus-visible:ring-primary-200",
            error ? "border-danger-500" : "border-neutral-300"
          )}
        />
        <Check
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="leading-relaxed">{children}</span>
    </label>
  );
}

export function CounselForm() {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CounselFormValues>({
    resolver: zodResolver(CounselFormSchema),
    defaultValues: counselDefaults,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setState({ kind: "submitting" });

    try {
      const res = await fetch("/api/counsels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setState({
          kind: "error",
          message: data.error ?? "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        });
        return;
      }

      setState({ kind: "success" });
      reset(counselDefaults);
    } catch {
      setState({
        kind: "error",
        message: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.",
      });
    }
  });

  const errClass = (key: keyof CounselFormValues) =>
    cn(inputClass, errors[key] ? "border-danger-500 focus:ring-danger-200" : "border-neutral-200");

  if (state.kind === "success") {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 p-8 lg:p-10 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-500 text-white shadow-cta">
          <CheckCircle2 size={28} aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-[20px] lg:text-[22px] font-bold text-primary-700">
          상담 글이 정상 접수되었습니다
        </h3>
        <p className="mt-3 text-[14px] lg:text-[15px] text-neutral-700 leading-relaxed">
          담당자가 영업일 기준 1~2일 이내에 비공개로 답변드립니다.<br />
          급하시면 아래 대표번호로 직접 문의해 주세요.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${SITE.contact.representative}`}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary-500 text-white text-[14px] font-semibold hover:bg-primary-600 transition-colors"
          >
            <Phone size={16} aria-hidden="true" />
            <span className="tabular">{SITE.contact.representative}</span>
          </a>
          <button
            type="button"
            onClick={() => setState({ kind: "idle" })}
            className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[14px] font-semibold hover:bg-neutral-50 transition-colors"
          >
            새 상담 글 작성
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-neutral-200 bg-white shadow-card p-6 lg:p-8"
    >
      {/* Honeypot — sr-only, 봇에게만 보임 */}
      <div className="sr-only" aria-hidden="true">
        <label>
          웹사이트 (입력하지 마세요)
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {/* 폼 상단 에러 배너 */}
      {state.kind === "error" && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-lg border border-danger-500/30 bg-danger-50 p-4"
        >
          <AlertTriangle size={18} aria-hidden="true" className="mt-0.5 text-danger-500 shrink-0" />
          <p className="text-[13px] lg:text-[14px] text-danger-600 leading-relaxed">{state.message}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          id="cs-name"
          label="이름"
          required
          error={errors.name?.message}
          render={(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              placeholder="이름"
              className={errClass("name")}
              {...register("name")}
            />
          )}
        />
        <Field
          id="cs-phone"
          label="연락처"
          required
          error={errors.phone?.message}
          render={(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="010-0000-0000"
              className={cn(errClass("phone"), "tabular")}
              {...register("phone")}
            />
          )}
        />
        <Field
          id="cs-password"
          label="비밀번호"
          required
          help="비공개 글 확인용 4자 이상"
          error={errors.password?.message}
          render={(props) => (
            <input
              {...props}
              type="password"
              autoComplete="new-password"
              placeholder="4-20자"
              className={errClass("password")}
              {...register("password")}
            />
          )}
        />
        <Field
          id="cs-title"
          label="제목"
          required
          error={errors.title?.message}
          render={(props) => (
            <input
              {...props}
              type="text"
              placeholder="제목을 입력해 주세요"
              className={errClass("title")}
              {...register("title")}
            />
          )}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="cs-content"
          className="block text-[13px] font-semibold text-primary-700 mb-2"
        >
          상담 내용 <span className="text-accent-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cs-content"
          rows={8}
          placeholder="증상·궁금하신 내용을 자세히 적어주시면 더 정확한 안내가 가능합니다. (20-2000자)"
          aria-invalid={errors.content ? "true" : "false"}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-white text-[14px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-200 resize-y transition-colors",
            errors.content ? "border-danger-500 focus:ring-danger-200" : "border-neutral-200"
          )}
          {...register("content")}
        />
        {errors.content && (
          <p className="mt-1.5 text-[12px] text-danger-600">{errors.content.message}</p>
        )}
      </div>

      <div className="mt-7 space-y-5">
        {/* 비공개 옵션 */}
        <CheckboxField id="cs-private" registration={register("isPrivate")}>
          비공개 글로 등록 (본인과 담당자만 확인 가능)
        </CheckboxField>

        {/* 개인정보 수집·이용 안내 — 개인정보보호법 §15 4대 고지 의무 */}
        <section
          aria-labelledby="cs-privacy-heading"
          className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 lg:p-5 text-[13px] leading-relaxed"
        >
          <h3 id="cs-privacy-heading" className="text-[14px] font-bold text-primary-700 mb-3">
            개인정보 수집·이용 안내
          </h3>
          <dl className="grid sm:grid-cols-[100px_1fr] gap-x-4 gap-y-2">
            <dt className="font-semibold text-neutral-700">수집 항목</dt>
            <dd className="text-neutral-700">
              이름, 휴대전화번호, 비밀번호, 상담 제목 및 내용
            </dd>

            <dt className="font-semibold text-neutral-700">수집 목적</dt>
            <dd className="text-neutral-700">
              온라인 상담 답변 및 진료 안내, 본인 확인
            </dd>

            <dt className="font-semibold text-neutral-700">
              보유·이용 기간
            </dt>
            <dd className="text-neutral-700">
              <strong className="font-bold">상담 종료 후 1년</strong>
              <span className="text-neutral-600">
                {" "}(관계 법령상 보존이 필요한 경우 해당 기간 동안 보관)
              </span>
            </dd>

            <dt className="font-semibold text-neutral-700">거부 권리</dt>
            <dd className="text-neutral-700">
              동의를 거부하실 권리가 있습니다.{" "}
              <strong className="font-bold">거부 시 온라인 상담을 신청하실 수 없으며</strong>, 대표번호({SITE.contact.representative})를 통한 전화 문의로 이용해 주셔야 합니다.
            </dd>
          </dl>
          <p className="mt-3 text-[12px] text-neutral-500">
            자세한 사항은{" "}
            <Link
              href={ROUTES.legal.privacy}
              target="_blank"
              rel="noopener"
              className="text-primary-600 underline underline-offset-2"
            >
              개인정보처리방침
            </Link>
            을 참고해 주세요.
          </p>
        </section>

        {/* 일반 개인정보 동의 — 개인정보보호법 §15 */}
        <div>
          <CheckboxField
            id="cs-agreed"
            registration={register("agreed")}
            error={Boolean(errors.agreed)}
            describedBy={errors.agreed ? "cs-agreed-err" : undefined}
          >
            위 개인정보 수집·이용에 동의합니다.{" "}
            <span className="text-accent-600" aria-hidden="true">*</span>
          </CheckboxField>
          {errors.agreed && (
            <p id="cs-agreed-err" className="mt-1.5 ml-7 text-[12px] text-danger-600">
              {errors.agreed.message}
            </p>
          )}
        </div>

        {/* 민감정보(건강정보) 별도 동의 — 개인정보보호법 §23 */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <p className="text-[12px] font-semibold text-amber-800 mb-2">
            민감정보 처리 동의 (개인정보보호법 §23)
          </p>
          <p className="text-[12px] text-neutral-700 leading-relaxed">
            상담 내용에 포함되는{" "}
            <strong className="font-bold">증상·병력 등 건강 관련 정보(민감정보)</strong>
            는 일반 개인정보와 분리해 별도 동의를 받습니다.{" "}
            <strong className="font-bold">동의를 거부하시면 온라인 상담을 신청하실 수 없습니다.</strong>
          </p>
          <div className="mt-3">
            <CheckboxField
              id="cs-agreed-sensitive"
              registration={register("agreedSensitive")}
              error={Boolean(errors.agreedSensitive)}
              describedBy={errors.agreedSensitive ? "cs-agreed-sensitive-err" : undefined}
            >
              위 민감정보 처리에 동의합니다.{" "}
              <span className="text-accent-600" aria-hidden="true">*</span>
            </CheckboxField>
          </div>
          {errors.agreedSensitive && (
            <p id="cs-agreed-sensitive-err" className="mt-1.5 ml-7 text-[12px] text-danger-600">
              {errors.agreedSensitive.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-end">
        <button
          type="button"
          onClick={() => {
            reset(counselDefaults);
            setState({ kind: "idle" });
          }}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[14px] font-semibold hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          초기화
        </button>
        <button
          type="submit"
          disabled={isSubmitting || state.kind === "submitting"}
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-accent-500 text-white text-[14px] font-semibold shadow-cta hover:bg-accent-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting || state.kind === "submitting" ? (
            <>
              <Loader2 size={16} aria-hidden="true" className="animate-spin" />
              전송 중...
            </>
          ) : (
            <>
              <ShieldCheck size={16} aria-hidden="true" />
              상담 글 등록
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** 라벨 + 입력 + 에러 메시지 묶음. */
function Field({
  id,
  label,
  required,
  error,
  help,
  render,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  help?: string;
  render: (props: { id: string; "aria-invalid": "true" | "false"; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const helpId = help ? `${id}-help` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [helpId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-semibold text-primary-700 mb-2">
        {label}{" "}
        {required && (
          <span className="text-accent-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {render({ id, "aria-invalid": error ? "true" : "false", "aria-describedby": describedBy })}
      {help && !error && (
        <p id={helpId} className="mt-1.5 text-[12px] text-neutral-500">
          {help}
        </p>
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-[12px] text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}
