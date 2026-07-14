import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { ROUTES, GNB } from "@/lib/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "찾을 수 없는 페이지",
  description: "찾으시는 페이지를 찾을 수 없습니다. 백세한방병원 주요 진료 카테고리에서 원하시는 페이지로 이동하세요.",
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="container max-w-container-base py-16 lg:py-24">
      <div className="text-center max-w-[640px] mx-auto">
        <div className="relative inline-block mb-6">
          <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="56" fill="none" stroke="#DCE5F1" strokeWidth="2" />
            <circle cx="60" cy="60" r="44" fill="#143A6B" />
            <text
              x="60"
              y="70"
              textAnchor="middle"
              fontFamily="Pretendard, sans-serif"
              fontWeight="700"
              fontSize="22"
              fill="#FFFFFF"
              className="tabular"
            >
              404
            </text>
            <rect x="84" y="20" width="14" height="14" transform="rotate(45 91 27)" fill="#4A8E9C" />
          </svg>
        </div>

        <span className="inline-block text-[12px] tracking-[0.2em] font-semibold text-accent-600 mb-3">
          PAGE NOT FOUND
        </span>
        <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-primary-700 leading-tight text-balanced">
          찾으시는 페이지를<br />
          <span className="text-accent-600">찾을 수 없습니다.</span>
        </h1>
        <p className="mt-5 text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed">
          주소가 변경되었거나 삭제된 페이지일 수 있습니다.<br className="hidden sm:block" />
          아래 진료 안내에서 원하시는 페이지로 이동해 주세요.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Button href={ROUTES.home} variant="primary" size="lg">
            홈으로 가기 <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
            <Phone size={16} aria-hidden="true" />
            <span className="tabular">{SITE.contact.representative}</span>
          </Button>
        </div>
      </div>

      <section className="mt-16 lg:mt-20">
        <h2 className="text-[14px] tracking-[0.2em] font-semibold text-accent-600 text-center mb-6">
          CLINIC GUIDE
        </h2>
        <p className="text-center text-[18px] lg:text-[22px] font-bold text-primary-700 mb-8">
          진료 카테고리 바로가기
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 max-w-[1080px] mx-auto">
          {GNB.filter((item) => !item.hidden).slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-2 p-5 lg:p-6 rounded-2xl bg-white border border-neutral-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-base ease-out-soft"
            >
              <span className="text-[13px] font-semibold text-primary-700 text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
