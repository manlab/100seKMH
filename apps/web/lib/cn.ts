import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스 병합 유틸 — 컴포넌트의 className prop과 기본 클래스를 충돌 없이 합칩니다.
 * 예: cn("px-4 py-2", className) → twMerge가 충돌 키(예: px-4 vs px-6)를 정리해 줍니다.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
