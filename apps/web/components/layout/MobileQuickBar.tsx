import Link from "next/link";
import { MessageSquare, Phone, Clock, Globe } from "lucide-react";
import { ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";

/**
 * 모바일 하단 고정 퀵 메뉴 — 4분할 그리드.
 * 키보드 활성화 시 숨김 처리는 향후 추가.
 */
export function MobileQuickBar() {
  return (
    <nav
      className="lg:hidden mobile-quickbar fixed bottom-0 inset-x-0 z-30 grid grid-cols-4 h-16 bg-white border-t border-neutral-200 shadow-[0_-4px_12px_rgba(20,58,107,0.06)]"
      aria-label="모바일 빠른 메뉴"
    >
      <Link
        href={ROUTES.community.counsel}
        className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-primary-700"
      >
        <MessageSquare size={20} aria-hidden="true" />
        온라인상담
      </Link>
      <a
        href={`tel:${SITE.contact.representative}`}
        className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold bg-[#0F3866] text-white"
      >
        <Phone size={20} aria-hidden="true" />
        전화걸기
      </a>
      <Link
        href={ROUTES.about.hours}
        className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-primary-700"
      >
        <Clock size={20} aria-hidden="true" />
        진료시간
      </Link>
      <a
        href={SITE.social.blog}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-primary-700"
      >
        <Globe size={20} aria-hidden="true" />
        블로그/카톡
      </a>
    </nav>
  );
}
