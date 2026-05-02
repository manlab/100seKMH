import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/community/counsel/new", "/admin/", "/api/"],
        crawlDelay: 1,
      },
      // 한국 검색엔진 우대
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Yeti", allow: "/" }, // Naver
      { userAgent: "Daumoa", allow: "/" }, // Daum/Kakao
      // AI 학습 봇 차단 (의료 데이터 보호)
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
