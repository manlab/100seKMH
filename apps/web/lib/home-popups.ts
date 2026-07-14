import { and, desc, eq, gte, isNull, lte, or } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { env } from "@/lib/env";

export type HomePopupView = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  linkLabel: string | null;
  linkUrl: string | null;
};

/**
 * 메인페이지에 현재 노출할 레이어 팝업.
 * DB 장애가 홈 전체 장애로 번지지 않도록 best-effort 로 빈 배열을 반환한다.
 */
export async function getActiveHomePopups(limit = 3): Promise<HomePopupView[]> {
  const now = new Date();

  if (!env.POSTGRES_URL) return [];

  try {
    return await db()
      .select({
        id: schema.homePopups.id,
        title: schema.homePopups.title,
        content: schema.homePopups.content,
        imageUrl: schema.homePopups.imageUrl,
        linkLabel: schema.homePopups.linkLabel,
        linkUrl: schema.homePopups.linkUrl,
      })
      .from(schema.homePopups)
      .where(
        and(
          eq(schema.homePopups.isPublished, true),
          or(isNull(schema.homePopups.startsAt), lte(schema.homePopups.startsAt, now)),
          or(isNull(schema.homePopups.endsAt), gte(schema.homePopups.endsAt, now))
        )
      )
      .orderBy(desc(schema.homePopups.sortOrder), desc(schema.homePopups.createdAt))
      .limit(limit);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[home-popups] failed to load", error);
    return [];
  }
}
