"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { HomePopupView } from "@/lib/home-popups";
import { cn } from "@/lib/cn";

const DISMISS_KEY_PREFIX = "baekse-home-popup-dismissed";

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
  const current = visible[0];

  useEffect(() => {
    setVisible(items.filter((item) => !isDismissedToday(item.id)));
  }, [items]);

  useEffect(() => {
    if (!current) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible((prev) => prev.slice(1));
      }
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
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
        role="dialog"
        aria-modal="true"
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
