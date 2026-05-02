"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";

/**
 * Next.js App Router error boundary — 500/runtime error 페이지.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(client-asset): 운영 시 에러 추적 (Sentry 등)으로 전송
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <div className="container max-w-container-base py-16 lg:py-24">
      <div className="text-center max-w-[640px] mx-auto">
        <div className="relative inline-block mb-6">
          <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="56" fill="none" stroke="#FEF3C7" strokeWidth="2" />
            <circle cx="60" cy="60" r="44" fill="#143A6B" />
            <g transform="translate(60 60)" className="animate-pulse">
              <path d="M0 -22 L20 16 L-20 16 Z" fill="#D97706" stroke="#FEF3C7" strokeWidth="2" strokeLinejoin="round" />
              <path d="M0 -8 L0 6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="11" r="1.8" fill="#FFFFFF" />
            </g>
            <rect x="84" y="20" width="14" height="14" transform="rotate(45 91 27)" fill="#4A8E9C" />
          </svg>
        </div>

        <span className="inline-block text-[12px] tracking-[0.2em] font-semibold text-warning-600 mb-3">
          SERVICE ERROR
        </span>
        <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-primary-700 leading-tight text-balanced">
          일시적인 오류가<br />
          <span className="text-warning-500">발생했습니다.</span>
        </h1>
        <p className="mt-5 text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed">
          잠시 후 다시 시도해 주세요. 문제가 계속되면<br className="hidden sm:block" />
          아래 전화로 직접 문의 부탁드립니다.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Button onClick={reset} variant="primary" size="lg">
            <RefreshCw size={16} aria-hidden="true" />
            새로고침
          </Button>
          <Button href={ROUTES.home} variant="secondary" size="lg">
            홈으로 가기
          </Button>
        </div>
      </div>

      <section className="mt-14 lg:mt-20 max-w-[760px] mx-auto">
        <p className="text-center text-[14px] tracking-[0.2em] font-semibold text-accent-600 mb-6">
          EMERGENCY CONTACT
        </p>
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
          <Link
            href={`tel:${SITE.contact.representative}`}
            className="rounded-2xl bg-white border border-neutral-200 shadow-card p-6 hover:border-accent-300 hover:shadow-lg transition-all"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600">
              <Phone size={22} aria-hidden="true" />
            </span>
            <span className="block mt-3 text-[12px] text-neutral-500">대표 전화</span>
            <span className="block tabular mt-1 text-[22px] lg:text-[24px] font-bold text-primary-700">
              {SITE.contact.representative}
            </span>
          </Link>
          <Link
            href={`tel:${SITE.contact.counsel}`}
            className="rounded-2xl bg-accent-500 text-white p-6 shadow-cta hover:bg-accent-600 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 text-white">
              <AlertTriangle size={22} aria-hidden="true" />
            </span>
            <span className="block mt-3 text-[12px] text-accent-50/85">상담 직통</span>
            <span className="block tabular mt-1 text-[22px] lg:text-[24px] font-bold">
              {SITE.contact.counsel}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
