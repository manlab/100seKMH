import Link from "next/link";
import { desc } from "drizzle-orm";
import { CheckCircle2, Clock3, EyeOff, Plus, TimerOff } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import type { HomePopup } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

type Status = {
  Icon: typeof CheckCircle2;
  className: string;
  label: string;
};

function popupStatus(popup: HomePopup, now = new Date()): Status {
  if (!popup.isPublished) {
    return {
      Icon: EyeOff,
      label: "임시",
      className: "bg-neutral-100 text-neutral-600",
    };
  }
  if (popup.startsAt && popup.startsAt > now) {
    return {
      Icon: Clock3,
      label: "예약",
      className: "bg-primary-50 text-primary-700",
    };
  }
  if (popup.endsAt && popup.endsAt < now) {
    return {
      Icon: TimerOff,
      label: "만료",
      className: "bg-neutral-100 text-neutral-500",
    };
  }
  return {
    Icon: CheckCircle2,
    label: "게시",
    className: "bg-emerald-50 text-emerald-700",
  };
}

function formatDate(value: Date | null) {
  if (!value) return "—";
  return value.toISOString().slice(0, 16).replace("T", " ");
}

function formatPeriod(popup: HomePopup) {
  if (!popup.startsAt && !popup.endsAt) return "상시";
  return `${formatDate(popup.startsAt)} ~ ${formatDate(popup.endsAt)}`;
}

export default async function AdminPopupsPage() {
  const rows = await db()
    .select()
    .from(schema.homePopups)
    .orderBy(
      desc(schema.homePopups.sortOrder),
      desc(schema.homePopups.createdAt),
    );
  const now = new Date();

  return (
    <section>
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-primary-700">메인 팝업</h1>
          <p className="mt-1 text-[13px] text-neutral-500">
            메인페이지 레이어 팝업을 등록하고 노출 기간을 관리합니다. 전체{" "}
            {rows.length}건
          </p>
        </div>
        <Link
          href="/admin/popups/new"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary-600 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus size={14} aria-hidden="true" />
          팝업 등록
        </Link>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
        <table className="w-full text-[14px]">
          <caption className="sr-only">메인 팝업 관리 목록</caption>
          <thead className="bg-primary-50/60 text-primary-700">
            <tr>
              <th
                scope="col"
                className="w-[90px] px-4 py-3 text-left font-semibold"
              >
                상태
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                제목
              </th>
              <th
                scope="col"
                className="w-[270px] px-4 py-3 text-left font-semibold"
              >
                노출 기간
              </th>
              <th
                scope="col"
                className="w-[80px] px-4 py-3 text-right font-semibold"
              >
                정렬
              </th>
              <th
                scope="col"
                className="w-[120px] px-4 py-3 text-left font-semibold"
              >
                작성자
              </th>
              <th
                scope="col"
                className="w-[140px] px-4 py-3 text-left font-semibold"
              >
                수정일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-neutral-500"
                >
                  등록된 팝업이 없습니다. 우측 상단 “팝업 등록” 으로 첫 팝업을
                  등록하세요.
                </td>
              </tr>
            )}
            {rows.map((popup) => {
              const status = popupStatus(popup, now);
              const StatusIcon = status.Icon;
              return (
                <tr
                  key={popup.id}
                  className="transition-colors hover:bg-primary-50/40"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${status.className}`}
                    >
                      <StatusIcon size={10} aria-hidden="true" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/popups/${popup.id}`}
                      className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                    >
                      {popup.title}
                    </Link>
                    {popup.displayType === "image" && (
                      <span className="ml-2 rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
                        이미지 단독
                      </span>
                    )}
                    {popup.linkUrl && (
                      <span className="ml-2 rounded-full bg-accent-50 px-2 py-0.5 text-[11px] font-semibold text-accent-700">
                        {popup.displayType === "image" ? "이미지 클릭" : "버튼"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-neutral-500 tabular">
                    {formatPeriod(popup)}
                  </td>
                  <td className="px-4 py-3 text-right text-neutral-600 tabular">
                    {popup.sortOrder}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {popup.authorName ?? (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-500 tabular">
                    {formatDate(popup.updatedAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
