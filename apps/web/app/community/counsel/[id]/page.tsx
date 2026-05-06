import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft, Lock } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { maskName, decryptField } from "@/lib/crypto";
import { env } from "@/lib/env";
import { ROUTES, GNB } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { CounselReveal } from "./_components/CounselReveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

type Props = { params: { id: string } };

export const metadata: Metadata = pageMeta({
  title: "상담 상세",
  description: "백세한방병원 온라인 상담 상세 — 비밀번호 입력 후 본문 확인.",
  path: "/community/counsel",
  noindex: true,
});

export default async function CounselDetailPage({ params }: Props) {
  if (!env.POSTGRES_URL) notFound();
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound();

  const rows = await db()
    .select({
      id: schema.counsels.id,
      nameEncrypted: schema.counsels.nameEncrypted,
      title: schema.counsels.title,
      isPrivate: schema.counsels.isPrivate,
      createdAt: schema.counsels.createdAt,
      repliedAt: schema.counsels.repliedAt,
    })
    .from(schema.counsels)
    .where(eq(schema.counsels.id, params.id))
    .limit(1);

  const counsel = rows[0];
  if (!counsel) notFound();

  let authorMasked: string;
  try {
    authorMasked = maskName(decryptField(counsel.nameEncrypted, "name", counsel.id));
  } catch {
    authorMasked = "***";
  }

  const status = counsel.repliedAt ? "답변완료" : "답변대기";
  const displayTitle = counsel.isPrivate ? "비공개 글입니다" : counsel.title;

  return (
    <SubLayout
      hero={{
        eyebrow: "COMMUNITY",
        title: <>온라인 상담 상세</>,
        description: <>비밀번호 입력 후 본문과 답변을 확인하실 수 있습니다.</>,
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "커뮤니티" },
          { label: "온라인 상담", href: ROUTES.community.counsel },
          { label: "상세" },
        ],
      }}
      lnb={{ title: "커뮤니티", eyebrow: "COMMUNITY", items: COMMUNITY_LNB }}
    >
      <Reveal as="section">
        <article className="rounded-2xl border border-neutral-200 bg-white shadow-card overflow-hidden">
          <header className="px-6 py-5 lg:px-7 border-b border-neutral-200 bg-primary-50/40">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={
                  "inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold " +
                  (status === "답변완료"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-neutral-100 text-neutral-600")
                }
              >
                {status}
              </span>
              {counsel.isPrivate && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 text-[12px] font-semibold">
                  <Lock size={11} aria-hidden="true" /> 비공개
                </span>
              )}
            </div>
            <h2 className="text-[18px] lg:text-[22px] font-bold text-primary-700">
              {displayTitle}
            </h2>
            <p className="mt-1 text-[12px] lg:text-[13px] text-neutral-500 tabular">
              {authorMasked} · {counsel.createdAt.toISOString().slice(0, 10)}
            </p>
          </header>

          <div className="p-6 lg:p-7">
            <CounselReveal id={counsel.id} hasReply={!!counsel.repliedAt} />
          </div>
        </article>

        <div className="mt-6">
          <Link
            href={ROUTES.community.counsel}
            className="inline-flex items-center gap-2 text-[13px] text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            상담 목록으로 돌아가기
          </Link>
        </div>
      </Reveal>
    </SubLayout>
  );
}
