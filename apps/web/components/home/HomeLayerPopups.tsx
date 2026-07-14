"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { HomePopupView } from "@/lib/home-popups";
import { cn } from "@/lib/cn";

const DISMISS_KEY_PREFIX = "baekse-home-popup-dismissed";
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true" &&
      (element.offsetWidth > 0 ||
        element.offsetHeight > 0 ||
        element.getClientRects().length > 0),
  );
}

function todayKey() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(
    new Date(),
  );
}

function storageKey(id: string) {
  return `${DISMISS_KEY_PREFIX}:${id}:${todayKey()}`;
}

function isDismissedToday(id: string) {
  try {
    return window.localStorage.getItem(storageKey(id)) === "1";
  } catch {
    return false;
  }
}

function dismissToday(id: string) {
  try {
    window.localStorage.setItem(storageKey(id), "1");
  } catch {
    // Ignore storage failures; close for this page view still works.
  }
}

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

export function HomeLayerPopups({ items }: { items: HomePopupView[] }) {
  const [visible, setVisible] = useState<HomePopupView[]>([]);
  const dialogRef = useRef<HTMLElement>(null);
  const current = visible[0];

  useEffect(() => {
    setVisible(items.filter((item) => !isDismissedToday(item.id)));
  }, [items]);

  useEffect(() => {
    if (!current) return;

    const dialog = dialogRef.current;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusTimer = window.setTimeout(() => {
      const firstFocusable = dialog ? getFocusableElements(dialog)[0] : null;
      (firstFocusable ?? dialog)?.focus();
    }, 0);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setVisible((prev) => prev.slice(1));
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusableElements = getFocusableElements(dialog);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (
          activeElement === firstFocusable ||
          activeElement === dialog ||
          !(activeElement instanceof Node && dialog.contains(activeElement))
        ) {
          event.preventDefault();
          lastFocusable.focus();
        }
        return;
      }

      if (
        activeElement === lastFocusable ||
        !(activeElement instanceof Node && dialog.contains(activeElement))
      ) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [current]);

  if (!current) return null;

  const close = () => setVisible((prev) => prev.slice(1));
  const closeForToday = () => {
    dismissToday(current.id);
    close();
  };
  const isImageOnly =
    current.displayType === "image" && Boolean(current.imageUrl);
  const hasCta = !isImageOnly && Boolean(current.linkLabel && current.linkUrl);
  const imageOnlyContent = current.imageUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current.imageUrl}
      alt={current.title}
      className="block h-auto max-h-[calc(100dvh-9rem)] max-w-full object-contain"
    />
  ) : null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-900/60 px-4 py-8 backdrop-blur-sm"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-labelledby={
          isImageOnly ? undefined : `home-popup-title-${current.id}`
        }
        aria-label={isImageOnly ? current.title : undefined}
        className={cn(
          "relative w-full overflow-hidden bg-white shadow-2xl",
          isImageOnly
            ? "max-w-[560px] rounded-[28px]"
            : "max-w-[520px] rounded-3xl",
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="팝업 닫기"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow-sm transition-colors hover:bg-primary-50"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {isImageOnly ? (
          <>
            <div className="flex justify-center bg-neutral-100">
              {current.linkUrl ? (
                isExternalUrl(current.linkUrl) ? (
                  <a
                    href={current.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    aria-label={`${current.title} 자세히 보기`}
                    className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
                  >
                    {imageOnlyContent}
                  </a>
                ) : (
                  <Link
                    href={current.linkUrl}
                    onClick={close}
                    aria-label={`${current.title} 자세히 보기`}
                    className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
                  >
                    {imageOnlyContent}
                  </Link>
                )
              ) : (
                imageOnlyContent
              )}
            </div>
            <div className="flex h-12 items-center border-t border-neutral-200 bg-white px-4">
              <button
                type="button"
                onClick={closeForToday}
                className="text-[13px] font-semibold text-neutral-600 transition-colors hover:text-primary-700"
              >
                오늘 하루 보지 않기
              </button>
            </div>
          </>
        ) : (
          <>
            {current.imageUrl && (
              <div
                aria-hidden="true"
                className="h-52 bg-primary-50 bg-cover bg-center"
                style={{ backgroundImage: `url(${current.imageUrl})` }}
              />
            )}

            <div className="p-6 sm:p-8">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-accent-600">
                NOTICE
              </p>
              <h2
                id={`home-popup-title-${current.id}`}
                className="mt-2 text-[24px] font-bold leading-snug text-primary-700"
              >
                {current.title}
              </h2>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-neutral-700">
                {current.content}
              </p>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={closeForToday}
                  className="h-11 rounded-full border border-neutral-200 px-4 text-[13px] font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                >
                  오늘 하루 보지 않기
                </button>
                {hasCta &&
                  current.linkUrl &&
                  current.linkLabel &&
                  (isExternalUrl(current.linkUrl) ? (
                    <a
                      href={current.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-primary-700"
                    >
                      {current.linkLabel}
                    </a>
                  ) : (
                    <Link
                      href={current.linkUrl}
                      onClick={close}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-primary-700"
                    >
                      {current.linkLabel}
                    </Link>
                  ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
