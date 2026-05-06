import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, sql } from "drizzle-orm";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { env } from "@/lib/env";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";
import { type NoticeCategory } from "@/lib/db/schema";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

const CATEGORY_BADGE: Record<NoticeCategory, string> = {
  진료안내: "bg-primary-50 text-primary-700",
  이벤트: "bg-accent-50 text-accent-700",
  휴진: "bg-neutral-100 text-neutral-700",
  시설: "bg-emerald-50 text-emerald-700",
};

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!env.POSTGRES_URL || !/^[0-9a-f-]{36}$/i.test(params.id)) {
    return pageMeta({ title: "공지사항", path: "/community/notice" });
  }
  const rows = await db()
    .select({ title: schema.notices.title })
    .from(schema.notices)
    .where(and(eq(schema.notices.id, params.id), eq(schema.notices.isPublished, true)))
    .limit(1);
  const title = rows[0]?.title ?? "공지사항";
  return pageMeta({
    title,
    description: `백세한방병원 공지 — ${title}`,
    path: `/community/notice/${params.id}`,
  });
}

export default async function NoticeDetailPage({ params }: Props) {
  if (!env.POSTGRES_URL) notFound();
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound();

  // 조회수 +1 (best-effort, 실패해도 본문 노출)
  await db()
    .update(schema.notices)
    .set({ viewCount: sql`${schema.notices.viewCount} + 1` })
    .where(and(eq(schema.notices.id, params.id), eq(schema.notices.isPublished, true)));

  const rows = await db()
    .select()
    .from(schema.notices)
    .where(and(eq(schema.notices.id, params.id), eq(schema.notices.isPublished, true)))
    .limit(1);
  const n = rows[0];
  if (!n) notFound();

  const category = n.category as NoticeCategory;

  return (
    <SubLayout
      hero={{
        eyebrow: "COMMUNITY",
        title: <>공지사항</>,
        description: <>{n.title}</>,
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "커뮤니티" },
          { label: "공지사항", href: ROUTES.community.notice },
          { label: n.title.length > 18 ? n.title.slice(0, 18) + "…" : n.title },
        ],
      }}
      lnb={{ title: "커뮤니티", eyebrow: "COMMUNITY", items: COMMUNITY_LNB }}
    >
      <Reveal as="section">
        <article className="rounded-2xl border border-neutral-200 bg-white shadow-card overflow-hidden">
          <header className="px-6 py-6 lg:px-8 lg:py-7 border-b border-neutral-200 bg-primary-50/40">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className={
                  "inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold " +
                  CATEGORY_BADGE[category]
                }
              >
                {category}
              </span>
              {n.isPinned && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent-500 text-white text-[12px] font-semibold">
                  공지
                </span>
              )}
            </div>
            <h1 className="text-[20px] lg:text-[26px] font-bold text-primary-700 leading-tight">
              {n.title}
            </h1>
            <dl className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] lg:text-[13px] text-neutral-500 tabular">
              <div className="inline-flex items-center gap-1.5">
                <Calendar size={12} aria-hidden="true" />
                <dt className="sr-only">등록일</dt>
                <dd>{n.publishedAt.toISOString().slice(0, 10)}</dd>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Eye size={12} aria-hidden="true" />
                <dt className="sr-only">조회수</dt>
                <dd>{n.viewCount.toLocaleString()}</dd>
              </div>
              {n.authorName && (
                <div>
                  <dt className="sr-only">작성</dt>
                  <dd>{n.authorName}</dd>
                </div>
              )}
            </dl>
          </header>

          <div className="p-6 lg:p-8">
            <p className="whitespace-pre-wrap text-[14px] lg:text-[15px] text-neutral-800 leading-relaxed">
              {n.content}
            </p>
          </div>
        </article>

        <div className="mt-6">
          <Link
            href={ROUTES.community.notice}
            className="inline-flex items-center gap-2 text-[13px] text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            공지사항 목록으로
          </Link>
        </div>
      </Reveal>
    </SubLayout>
  );
}
