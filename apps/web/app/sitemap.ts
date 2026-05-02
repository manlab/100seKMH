import type { MetadataRoute } from "next";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";

/**
 * Next.js App Router 자동 sitemap.
 * Production 빌드 시 /sitemap.xml 생성.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 모든 라우트 수집 (GNB 카테고리 + 자식)
  const allRoutes: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: ROUTES.home, priority: 1.0, changefreq: "weekly" },
  ];

  for (const cat of GNB) {
    allRoutes.push({ path: cat.href, priority: 0.9, changefreq: "weekly" });
    if (cat.children) {
      for (const c of cat.children) {
        allRoutes.push({ path: c.href, priority: 0.7, changefreq: "monthly" });
      }
    }
  }

  // 법적 페이지
  for (const path of Object.values(ROUTES.legal)) {
    allRoutes.push({ path, priority: 0.3, changefreq: "yearly" });
  }

  // 중복 제거 (GNB 중복 가능)
  const seen = new Set<string>();
  const unique = allRoutes.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });

  return unique.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}
