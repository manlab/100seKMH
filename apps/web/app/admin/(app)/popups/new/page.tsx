import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { homePopupDefaults } from "@/lib/popup-schema";
import { PopupForm } from "../_components/PopupForm";

export const dynamic = "force-dynamic";

export default function AdminNewPopupPage() {
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
        <h1 className="text-[20px] font-bold text-primary-700">새 팝업 등록</h1>
        <p className="mt-1 text-[13px] text-neutral-500">
          게시 상태와 노출 기간에 맞춰 메인페이지에 레이어 팝업으로 노출됩니다.
        </p>
      </header>

      <PopupForm mode={{ kind: "create" }} initialValues={homePopupDefaults} />
    </section>
  );
}
