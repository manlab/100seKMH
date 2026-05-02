"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { GNB, getActiveCategory, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { BrandLogo } from "@/components/icons/BrandLogo";
import { MobileDrawer } from "./MobileDrawer";
import { cn } from "@/lib/cn";

/**
 * 백세한방병원 GNB 헤더.
 * - 데스크톱: 유틸리티 바 + GNB(메가메뉴) + 우측 CTA
 * - 모바일: 햄버거 → MobileDrawer
 * - 스크롤 시 헤더 압축 (84px → 64px)
 */
export function Header() {
  const pathname = usePathname();
  const activeCategory = getActiveCategory(pathname);
  const [isScrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // route 변경 시 드로어 닫기
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white border-b border-neutral-200 transition-shadow duration-200",
          isScrolled && "shadow-md"
        )}
      >
        {/* 유틸리티 바 (데스크톱 전용) */}
        <div className="hidden lg:block bg-primary-500 text-primary-100">
          <div className="container max-w-container-base flex items-center justify-between h-9 text-[13px]">
            <div className="flex items-center gap-2 text-primary-100/90">
              <span className="inline-flex w-1.5 h-1.5 rounded-full bg-accent-400" aria-hidden="true" />
              <span>1년 365일 진료 · 평일·주말·공휴일 모두 진료합니다</span>
            </div>
            <nav aria-label="유틸리티" className="flex items-center gap-5">
              <Link href="#" className="hover:text-white transition-colors">
                로그인
              </Link>
              <span className="text-primary-300/60" aria-hidden="true">|</span>
              <Link href="#" className="hover:text-white transition-colors">
                회원가입
              </Link>
              <span className="text-primary-300/60" aria-hidden="true">|</span>
              <Link href={ROUTES.about.location} className="hover:text-white transition-colors">
                오시는 길
              </Link>
              <span className="text-primary-300/60" aria-hidden="true">|</span>
              <a
                href={`tel:${SITE.contact.representative}`}
                className="tabular hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Phone size={14} aria-hidden="true" />
                <strong className="text-white">{SITE.contact.representative}</strong>
              </a>
            </nav>
          </div>
        </div>

        {/* 메인 GNB */}
        <div
          className={cn(
            "container max-w-container-base flex items-center justify-between h-14 transition-[height] duration-200",
            isScrolled ? "lg:h-16" : "lg:h-[84px]"
          )}
        >
          {/* 로고 */}
          <Link href={ROUTES.home} aria-label={`${SITE.name} 홈으로`} className="flex items-center shrink-0">
            <BrandLogo className="h-5 sm:h-6 lg:h-7 w-auto" />
          </Link>

          {/* 데스크톱 GNB */}
          <nav className="hidden lg:flex items-center" aria-label="주메뉴">
            <ul className="flex items-center gap-1">
              {GNB.map((item) => {
                const itemSeg = item.href.split("/")[1] ?? null;
                const isActive = activeCategory === itemSeg;
                return (
                  <li key={item.label} className="gnb-item relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "gnb-link px-3 xl:px-4 py-5 text-[15px] font-semibold hover:text-accent-600",
                        isActive ? "is-active" : "text-primary-700"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="mega absolute left-0 top-full w-[260px] bg-white border border-neutral-200 shadow-lg rounded-b-xl p-3">
                        <ul className="text-[14px] text-neutral-700">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-3 py-2 rounded-md hover:bg-primary-50 hover:text-primary-600"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 우측 CTA (데스크톱) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href={ROUTES.community.counsel}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14px] font-semibold text-primary-600 border border-primary-200 hover:bg-primary-50 transition-colors whitespace-nowrap"
            >
              온라인 상담
            </Link>
            <a
              href={`tel:${SITE.contact.representative}`}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14px] font-semibold text-white bg-accent-500 hover:bg-accent-600 shadow-cta transition-colors whitespace-nowrap"
            >
              <Phone size={16} aria-hidden="true" />
              전화 예약
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
            aria-controls="mobileDrawer"
            aria-expanded={drawerOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-primary-700 hover:bg-primary-50 transition-colors"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeCategory={activeCategory}
      />
    </>
  );
}
