import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { toDateTimeLocalValue } from "@/lib/popup-schema";
import { PopupForm } from "../_components/PopupForm";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default async function AdminEditPopupPage({ params }: Props) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound();

  const rows = await db()
    .select()
    .from(schema.homePopups)
    .where(eq(schema.homePopups.id, params.id))
    .limit(1);
  const popup = rows[0];
  if (!popup) notFound();

  return (
    <section className="max-w-3xl">
      <Link
        href="/admin/popups"
        className="mb-4 inline-flex items-center gap-2 text-[13px] text-primary-600 hover:text-primary-700"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        목록으로
      </Link>

      <header className="mb-6">
        <h1 className="text-[20px] font-bold text-primary-700">팝업 수정</h1>
        <p className="mt-1 text-[13px] text-neutral-500 tabular">
          작성: {popup.createdAt.toISOString().slice(0, 16).replace("T", " ")}
          {popup.authorName ? ` · ${popup.authorName}` : ""}
        </p>
      </header>

      <PopupForm
        mode={{ kind: "edit", id: popup.id }}
        initialValues={{
          displayType: popup.displayType,
          title: popup.title,
          content: popup.content,
          imageUrl: popup.imageUrl ?? "",
          linkLabel: popup.linkLabel ?? "",
          linkUrl: popup.linkUrl ?? "",
          isPublished: popup.isPublished,
          sortOrder: popup.sortOrder,
          startsAt: toDateTimeLocalValue(popup.startsAt),
          endsAt: toDateTimeLocalValue(popup.endsAt),
        }}
      />
    </section>
  );
}
