import type { Metadata } from "next";
import { SITE } from "./site";

type PageMetaInput = {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
};

/**
 * 페이지 metadata 헬퍼.
 * - title: "X - 백세한방병원" 패턴 적용
 * - canonical, og, twitter 자동 채움
 */
export function pageMeta({
  title,
  description = SITE.description,
  path = "",
  ogImage = "/og-image.jpg",
  noindex = false,
}: PageMetaInput): Metadata {
  const fullTitle = title === SITE.name ? `${SITE.name} — ${SITE.tagline}` : `${title} - ${SITE.name}`;
  const url = `${SITE.url}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "ko_KR",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/**
 * MedicalOrganization JSON-LD (메인·공통).
 */
export function medicalOrgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: SITE.url,
    telephone: `+82-${SITE.contact.representative.replace(/-/g, "-")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.address,
      addressCountry: "KR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    medicalSpecialty: ["TraditionalKoreanMedicine"],
  };
}

/**
 * MedicalCondition JSON-LD (2depth 페이지용).
 */
export function medicalConditionJsonLd(name: string, treatments: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name,
    possibleTreatment: treatments.map((t) => ({
      "@type": "MedicalProcedure",
      name: t,
    })),
  };
}
