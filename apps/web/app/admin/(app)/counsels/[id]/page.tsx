import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft, CheckCircle2, Clock, Lock, Phone } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { decryptField, maskName, maskPhoneLast4 } from "@/lib/crypto";
import { ReplyForm } from "./_components/ReplyForm";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default async function AdminCounselDetailPage({ params }: Props) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound();

  const rows = await db()
    .select()
    .from(schema.counsels)
    .where(eq(schema.counsels.id, params.id))
    .limit(1);
  const c = rows[0];
  if (!c) notFound();

  // 관리자는 본문 / 답변 / 식별정보 복호화 권한 있음
  let content: string;
  let phone: string;
  let name: string;
  let reply: string | null = null;
  try {
    content = decryptField(c.contentEncrypted, "content", c.id);
    phone = decryptField(c.phoneEncrypted, "phone", c.id);
    name = decryptField(c.nameEncrypted, "name", c.id);
    if (c.replyEncrypted) reply = decryptField(c.replyEncrypted, "reply", c.id);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[admin counsel detail] decrypt failed", e);
    return (
      <div className="rounded-xl border border-danger-500/30 bg-danger-50 p-6 text-danger-700">
        본문 복호화 실패. 환경변수 PHONE_ENC_KEY 가 글 작성 시점과 동일한지 확인하세요.
      </div>
    );
  }

  const replied = !!c.repliedAt;

  return (
    <article className="space-y-6">
      <Link
        href="/admin/counsels"
        className="inline-flex items-center gap-2 text-[13px] text-primary-600 hover:text-primary-700"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        목록으로
      </Link>

      <header className="rounded-2xl border border-neutral-200 bg-white shadow-card p-6 lg:p-7">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold " +
              (replied ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")
            }
          >
            {replied ? (
              <><CheckCircle2 size={12} aria-hidden="true" /> 답변완료</>
            ) : (
              <><Clock size={12} aria-hidden="true" /> 답변대기</>
            )}
          </span>
          {c.isPrivate && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[12px] font-semibold">
              <Lock size={11} aria-hidden="true" /> 비공개
            </span>
          )}
        </div>
        <h1 className="text-[20px] lg:text-[24px] font-bold text-primary-700">{c.title}</h1>
        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-6 text-[13px]">
          <div className="flex gap-2">
            <dt className="text-neutral-500 w-16">작성자</dt>
            <dd className="text-neutral-800 font-semibold">
              {name} <span className="text-neutral-500">({maskName(name)})</span>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-neutral-500 w-16 inline-flex items-center gap-1">
              <Phone size={12} aria-hidden="true" /> 연락처
            </dt>
            <dd className="text-neutral-800 tabular">
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="text-primary-600 underline underline-offset-2"
              >
                {phone}
              </a>
              <span className="ml-2 text-neutral-400">({maskPhoneLast4(phone)})</span>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-neutral-500 w-16">작성일</dt>
            <dd className="text-neutral-800 tabular">
              {c.createdAt.toISOString().slice(0, 16).replace("T", " ")}
            </dd>
          </div>
        </dl>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white shadow-card p-6 lg:p-7">
        <h2 className="text-[15px] font-bold text-primary-700 mb-3">상담 내용</h2>
        <p className="whitespace-pre-wrap text-[14px] lg:text-[15px] text-neutral-800 leading-relaxed">
          {content}
        </p>
      </section>

      <ReplyForm
        id={c.id}
        existingReply={reply}
        repliedAt={c.repliedAt?.toISOString() ?? null}
        repliedBy={c.repliedBy}
      />
    </article>
  );
}
