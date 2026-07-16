import Link from "next/link";
import { Phone } from "lucide-react";
import { FOOTER_LINKS, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { BrandLogo } from "@/components/icons/BrandLogo";

/**
 * 글로벌 푸터 — 4단 그리드 (≥md), 모바일 1단 스택.
 * 사업자등록번호·대표자·주소 placeholder 포함 (의료법 표기 의무).
 */
export function Footer() {
  return (
    <footer className="bg-primary-700 text-primary-100">
      <div className="container max-w-container-base py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* 로고 + 소개 */}
          <div className="md:col-span-4">
            <Link href={ROUTES.home} aria-label={`${SITE.name} 홈으로`} className="inline-flex max-w-full">
              <BrandLogo variant="light" className="h-6 lg:h-8 w-auto max-w-full" />
            </Link>
            <p className="mt-5 text-[13px] leading-relaxed text-primary-100/85">
              정성스러운 한방 치료로 환자 한 분 한 분의<br className="hidden sm:block" />
              오랜 건강을 함께 만들어 갑니다.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-[14px] font-semibold mb-4">진료 안내</h4>
            <ul className="space-y-2.5 text-[13px]">
              {FOOTER_LINKS.clinics.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-[14px] font-semibold mb-4">고객 지원</h4>
            <ul className="space-y-2.5 text-[13px]">
              {FOOTER_LINKS.support.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white text-[14px] font-semibold mb-4">연락처</h4>
            <dl className="space-y-2 text-[13px]">
              <div className="flex gap-3">
                <dt className="w-12 text-primary-100/70">대표</dt>
                <dd className="tabular text-white font-semibold">{SITE.contact.representative}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-12 text-primary-100/70">상담</dt>
                <dd className="tabular text-white font-semibold">{SITE.contact.counsel}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-12 text-primary-100/70">주소</dt>
                <dd>{SITE.contact.address}</dd>
              </div>
            </dl>
            <a
              href={`tel:${SITE.contact.representative}`}
              className="mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#0F3866] text-white text-[13px] font-semibold hover:bg-[#0b2d52] transition-colors"
            >
              <Phone size={14} aria-hidden="true" />
              전화로 상담 예약 →
            </a>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8 lg:my-10" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-[12px] text-primary-100/70">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {FOOTER_LINKS.legal.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    i === 0
                      ? "text-white hover:text-accent-300 font-semibold transition-colors"
                      : "hover:text-accent-300 transition-colors"
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="tabular">
            대표자 {SITE.contact.representativeName} &nbsp;|&nbsp; 사업자등록번호{" "}
            {SITE.contact.businessNumber}
          </p>
        </div>
        <p className="mt-4 text-[12px] text-primary-100/55 tracking-[0.05em]">
          COPYRIGHT © 2026 BAEKSE KOREAN MEDICINE HOSPITAL. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
