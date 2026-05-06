import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { noticeDefaults } from "@/lib/notice-schema";
import { NoticeForm } from "../_components/NoticeForm";

export const dynamic = "force-dynamic";

export default function AdminNewNoticePage() {
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
        <h1 className="text-[20px] font-bold text-primary-700">새 공지 작성</h1>
        <p className="mt-1 text-[13px] text-neutral-500">
          저장 즉시 공개됩니다. 임시저장이 필요하면 “게시” 체크 해제 후 저장.
        </p>
      </header>

      <NoticeForm mode={{ kind: "create" }} initialValues={noticeDefaults} />
    </section>
  );
}
