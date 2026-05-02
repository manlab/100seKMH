import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { pageMeta, medicalOrgJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileQuickBar } from "@/components/layout/MobileQuickBar";
import "./globals.css";

export const metadata: Metadata = pageMeta({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#143A6B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <Script
          id="ld-medical-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(medicalOrgJsonLd())}
        </Script>
      </head>
      <body>
        <a href="#main" className="skip-link">
          본문 바로가기
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileQuickBar />
      </body>
    </html>
  );
}
