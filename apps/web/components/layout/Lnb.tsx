"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/navigation";
import { SITE } from "@/lib/site";

type Props = {
  /** LNB 헤더 라벨 (예: "통증클리닉") */
  title: string;
  /** 카테고리 영문 라벨 (예: "PAIN CLINIC") */
  eyebrow?: string;
  /** 자식 네비 항목 */
  items: NavItem[];
  /** 우측 CTA 카드 노출 여부 (기본 true) */
  showCtaCard?: boolean;
};

/**
 * 서브 페이지 좌측 LNB. 데스크톱 sticky.
 * 현재 경로(pathname) 기반 자동 활성화 — usePathname 필요로 'use client'.
 */
export function Lnb({ title, eyebrow, items, showCtaCard = true }: Props) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block lg:col-span-3" aria-label={`${title} 하위 메뉴`}>
      <div className="sticky top-[116px]">
        <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-card">
          <div className="px-4 py-4 border-b border-neutral-200">
            {eyebrow && (
              <span className="block text-[11px] tracking-[0.18em] font-semibold text-accent-600">
                {eyebrow}
              </span>
            )}
            <h2 className="mt-1 text-[18px] font-bold text-primary-700">{title}</h2>
          </div>
          <ul className="py-2 text-[14px]">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors",
                      isActive
                        ? "text-primary-700 bg-primary-50 font-semibold"
                        : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <ChevronRight size={14} aria-hidden="true" className="text-accent-600" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {showCtaCard && (
          <div className="mt-4 rounded-2xl bg-primary-700 text-white p-5 overflow-hidden relative">
            {/* banner-grain placeholder via inline gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 22% 28%, rgba(74,142,156,0.18), transparent 42%), radial-gradient(circle at 80% 70%, rgba(143,191,204,0.10), transparent 48%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <span className="text-[11px] tracking-[0.18em] font-semibold text-accent-300">
                CONSULT
              </span>
              <p className="mt-2 text-[15px] font-semibold text-white leading-snug">
                통증으로 일상이 어렵다면<br />전화 한 통이면 됩니다.
              </p>
              <a
                href={`tel:${SITE.contact.representative}`}
                className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-accent-500 text-white text-[13px] font-semibold shadow-cta hover:bg-accent-600 transition-colors"
              >
                <Phone size={14} aria-hidden="true" />
                <span className="tabular">{SITE.contact.representative}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
