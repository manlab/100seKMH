"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, MessageSquare, Phone, Clock } from "lucide-react";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
  activeCategory: string | null;
};

/**
 * 모바일 풀스크린 드로어. ESC 닫기, 포커스 순환, 배경 스크롤 잠금을 처리한다.
 */
export function MobileDrawer({ open, onClose, activeCategory }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusCloseButton = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          "#mobileDrawer a[href], #mobileDrawer button:not([disabled]), #mobileDrawer summary",
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(focusCloseButton);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobileDrawer"
      role="dialog"
      aria-modal="true"
      aria-label="모바일 메뉴"
      className="fixed inset-0 z-50 lg:hidden bg-white"
    >
      <div className="flex items-center justify-between h-14 border-b border-neutral-200 px-5">
        <span className="font-bold text-primary-700">메뉴</span>
        <button
          type="button"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="메뉴 닫기"
          className="inline-flex items-center justify-center w-11 h-11 rounded-md text-primary-700 hover:bg-primary-50"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>

      <nav
        className="overflow-y-auto h-[calc(100%-56px-72px)] px-2 py-3"
        aria-label="모바일 주메뉴"
      >
        {GNB.filter((item) => !item.hidden).map((item) => {
          const itemSeg = item.href.split("/")[1] ?? null;
          const isActive = activeCategory === itemSeg;
          return (
            <details
              key={item.label}
              open={isActive}
              className="group border-b border-neutral-200"
            >
              <summary className="cursor-pointer list-none px-3 py-4 flex items-center justify-between font-semibold text-primary-700">
                {item.label}
                <span className="text-neutral-400 group-open:rotate-180 transition-transform" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <ul className="pb-3 pl-3 text-[14px] text-neutral-600">
                <li>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 font-medium text-primary-600 hover:text-primary-700"
                  >
                    {item.label} 전체보기
                  </Link>
                </li>
                {item.children?.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block px-3 py-2 hover:text-primary-600"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </nav>

      <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 gap-2 p-3 bg-white border-t border-neutral-200">
        <Link
          href={ROUTES.community.counsel}
          className="flex flex-col items-center justify-center h-14 rounded-md bg-primary-50 text-primary-600 text-[12px] font-semibold gap-1"
        >
          <MessageSquare size={16} aria-hidden="true" />
          온라인 상담
        </Link>
        <a
          href={`tel:${SITE.contact.representative}`}
          className="flex flex-col items-center justify-center h-14 rounded-md bg-accent-500 text-white text-[12px] font-semibold gap-1"
        >
          <Phone size={16} aria-hidden="true" />
          전화걸기
        </a>
        <Link
          href={ROUTES.about.hours}
          className="flex flex-col items-center justify-center h-14 rounded-md bg-primary-50 text-primary-600 text-[12px] font-semibold gap-1"
        >
          <Clock size={16} aria-hidden="true" />
          진료시간
        </Link>
      </div>
    </div>
  );
}
