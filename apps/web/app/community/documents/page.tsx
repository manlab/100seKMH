import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ClipboardList,
  Stethoscope,
  Bed,
  Receipt,
  FileSignature,
  MapPin,
  Phone,
  Printer,
  Users,
  Info,
} from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { GNB, ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMeta({
  title: "서류 발급 안내",
  description:
    "백세한방병원 서류 발급 안내 — 진료확인서, 소견서, 진료기록사본, 입퇴원확인서 등 발급 가능한 서류와 신청 방법을 안내합니다.",
  path: "/community/documents",
});

const COMMUNITY_LNB = GNB.find((g) => g.href === ROUTES.community.notice)?.children ?? [];

const DOCUMENTS = [
  {
    Icon: FileText,
    title: "진료확인서",
    desc: "진료 사실을 확인하는 서류. 학교·직장 제출용으로 자주 발급됩니다.",
    fee: "₩ 3,000",
  },
  {
    Icon: Stethoscope,
    title: "소견서",
    desc: "담당 한의사가 작성하는 진료 소견 서류. 보험·재진료 안내 시 활용됩니다.",
    fee: "₩ 10,000",
  },
  {
    Icon: ClipboardList,
    title: "진료기록사본",
    desc: "진료 기록 원본의 사본. 환자 본인 또는 위임자가 신청할 수 있습니다.",
    fee: "₩ 1,000 / 매 (1매 추가 ₩ 100)",
  },
  {
    Icon: Bed,
    title: "입퇴원확인서",
    desc: "입원·퇴원 일자와 사유를 기재한 서류. 보험 청구 시 자주 활용됩니다.",
    fee: "₩ 3,000",
  },
  {
    Icon: Receipt,
    title: "진료비 영수증·세부내역서",
    desc: "당일 진료비 영수증과 세부내역서. 실손보험 청구 시 함께 제출합니다.",
    fee: "무료",
  },
  {
    Icon: FileSignature,
    title: "기타 (수수료 별도)",
    desc: "장애진단서·후유장해진단서 등 특수 서류는 별도 안내드립니다.",
    fee: "별도 문의",
  },
];

const METHODS = [
  {
    Icon: MapPin,
    title: "방문 신청",
    desc: "원무과에서 신분증 제시 후 신청하실 수 있습니다.",
    detail: "본인 신분증 (대리인은 위임장·환자 신분증 사본 필요)",
  },
  {
    Icon: Phone,
    title: "전화 신청",
    desc: "대표번호로 전화 후 신청 가능 여부를 안내받으실 수 있습니다.",
    detail: SITE.contact.representative,
  },
  {
    Icon: Printer,
    title: "팩스·우편",
    desc: "신청서·신분증 사본을 보내주시면 검토 후 회신드립니다.",
    detail: "TODO(client-asset): 팩스 번호",
  },
];

const REQUIRED_DOCS = [
  "본인 신청: 신분증 (주민등록증·운전면허증·여권 등)",
  "대리 신청: 위임장 + 환자 신분증 사본 + 대리인 신분증",
  "친족 신청: 가족관계증명서 등 친족 확인 서류",
  "법정대리인(미성년자) 신청: 가족관계증명서 + 법정대리인 신분증",
];

export default function DocumentsPage() {
  return (
    <SubLayout visualPath={ROUTES.community.documents}
      hero={{
        eyebrow: "COMMUNITY",
        title: (
          <>
            필요한 서류,<br />
            <span className="text-accent-300">간편하게 발급해 드립니다</span>
          </>
        ),
        description: (
          <>
            진료확인서·소견서·진료기록사본·입퇴원확인서 등 자주 찾으시는 서류를 정리했습니다.<br className="hidden sm:block" />
            방문·전화·팩스로 신청하실 수 있습니다.
          </>
        ),
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: "커뮤니티" },
          { label: "서류 발급 안내" },
        ],
      }}
      lnb={{
        title: "커뮤니티",
        eyebrow: "COMMUNITY",
        items: COMMUNITY_LNB,
      }}
    >
      {/* Documents grid */}
      <Reveal as="section">
        <Eyebrow>DOCUMENTS</Eyebrow>
        <h2 className="mt-2 text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-primary-700 leading-tight">
          발급 가능한 서류 6종
        </h2>
        <p className="mt-3 text-[14px] text-neutral-600 max-w-[640px]">
          아래 서류를 발급해 드립니다. 비용은 보건복지부 고시 기준에 따른 일반적인 가격이며, 실제 발급 시
          항목·매수에 따라 달라질 수 있습니다.
        </p>

        <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {DOCUMENTS.map((d) => (
            <article
              key={d.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card hover:border-accent-200 hover:shadow-xl transition-all duration-base ease-out-soft"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600">
                <d.Icon size={22} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[17px] font-bold text-primary-700">{d.title}</h3>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{d.desc}</p>
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[12px] font-semibold tabular">
                {d.fee}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Methods */}
      <Reveal as="section">
        <header className="mb-7">
          <Eyebrow>HOW TO APPLY</Eyebrow>
          <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700">신청 방법 3가지</h2>
        </header>
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-5">
          {METHODS.map((m) => (
            <article
              key={m.title}
              className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-card"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-600">
                <m.Icon size={22} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[17px] font-bold text-primary-700">{m.title}</h3>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{m.desc}</p>
              <p className="mt-3 text-[13px] text-primary-700 font-semibold tabular">{m.detail}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Required docs */}
      <Reveal as="section">
        <header className="mb-7">
          <Eyebrow>REQUIRED</Eyebrow>
          <h2 className="mt-2 text-[22px] lg:text-[26px] font-bold text-primary-700">신청 시 필요한 서류</h2>
        </header>
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-card p-6 lg:p-8">
          <ul className="space-y-3">
            {REQUIRED_DOCS.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] lg:text-[15px] text-neutral-700">
                <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary-50 text-primary-700 tabular text-[12px] font-bold">
                  {i + 1}
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Proxy notice */}
      <Reveal as="section">
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 lg:p-7">
          <div className="flex items-start gap-4">
            <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white text-primary-600">
              <Users size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[16px] lg:text-[18px] font-bold text-primary-700">대리 발급 안내</h2>
              <ul className="mt-3 space-y-1.5 text-[13px] lg:text-[14px] text-neutral-700 leading-relaxed">
                <li>· 의료법 제21조에 따라 환자 본인 외에는 위임장·신분증 사본 등 확인 서류가 필요합니다.</li>
                <li>· 친족 신청 시 가족관계증명서 등 친족 확인 서류를 함께 제출해 주세요.</li>
                <li>· 미성년자는 법정대리인이 신청할 수 있으며, 가족관계 확인 서류가 필요합니다.</li>
                <li>· 사망 환자의 서류는 별도 절차가 있으니, 미리{" "}
                  <Link href={ROUTES.community.counsel} className="text-primary-600 underline underline-offset-2">
                    온라인 상담
                  </Link>{" "}
                  또는 전화로 안내받아 주세요.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Footer note */}
      <Reveal as="section">
        <div className="flex items-start gap-3 text-[12px] text-neutral-500">
          <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
          <p>
            본 안내는 일반적인 절차이며, 환자 상태·서류 종류에 따라 추가 서류가 필요할 수 있습니다.
            발급에 시간이 걸릴 수 있으니, 가능하면 미리 전화로 안내받으시는 편을 권해 드립니다.
          </p>
        </div>
      </Reveal>
    </SubLayout>
  );
}
