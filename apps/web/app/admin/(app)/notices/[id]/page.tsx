import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { type NoticeCategory } from "@/lib/db/schema";
import { NoticeForm } from "../_components/NoticeForm";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default async function AdminEditNoticePage({ params }: Props) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound();

  const rows = await db()
    .select()
    .from(schema.notices)
    .where(eq(schema.notices.id, params.id))
    .limit(1);
  const n = rows[0];
  if (!n) notFound();

  return (
    <section className="max-w-3xl">
      <Link
        href="/admin/notices"
        className="inline-flex items-center gap-2 text-[13px] text-primary-600 hover:text-primary-700 mb-4"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        목록으로
      </Link>

      <header className="mb-6">
        <h1 className="text-[20px] font-bold text-primary-700">공지 수정</h1>
        <p className="mt-1 text-[13px] text-neutral-500 tabular">
          작성: {n.publishedAt.toISOString().slice(0, 16).replace("T", " ")}
          {n.authorName ? ` · ${n.authorName}` : ""}
        </p>
      </header>

      <NoticeForm
        mode={{ kind: "edit", id: n.id }}
        initialValues={{
          title: n.title,
          content: n.content,
          category: n.category as NoticeCategory,
          isPinned: n.isPinned,
          isPublished: n.isPublished,
        }}
      />
    </section>
  );
}
