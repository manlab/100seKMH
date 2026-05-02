import type { Metadata } from "next";
import Script from "next/script";
import { AlertTriangle, Heart, ShieldCheck } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";

export const metadata: Metadata = pageMeta({
  title: "환자 권리장전",
  description:
    "백세한방병원은 보건복지부 표준 환자 권리·의무 장전을 준수합니다. 환자의 5가지 권리와 4가지 의무를 안내합니다.",
  path: ROUTES.legal.patientRights,
});

// TODO(legal-review): 보건복지부 표준 환자권리장전을 기반으로 작성된 placeholder입니다.
// 개원 직전 의료법 자문을 거쳐 병원 내 게시 의무사항도 함께 점검해 주세요.
type RightOrDuty = {
  id: string;
  num: string;
  title: string;
  paragraphs: string[];
};

const RIGHTS: RightOrDuty[] = [
  {
    id: "right-1",
    num: "1",
    title: "진료받을 권리",
    paragraphs: [
      "환자는 자신의 건강을 보호받기 위해 적절한 의료 서비스를 받을 권리가 있으며, 성별·나이·종교·신분·경제적 사정 등을 이유로 부당한 차별을 받지 아니합니다.",
      "병원은 정당한 사유 없이 진료를 거부할 수 없으며, 응급 상황 시 적절한 응급조치를 취하거나 다른 의료기관으로의 신속한 이송을 지원해야 합니다.",
    ],
  },
  {
    id: "right-2",
    num: "2",
    title: "알 권리 및 자기결정권",
    paragraphs: [
      "환자는 담당 의사·간호사로부터 질병 상태, 치료 방법, 의학적 연구 대상 여부, 진료비 등에 관하여 충분한 설명을 듣고 자세히 물어볼 권리가 있습니다.",
      "환자는 충분한 설명을 들은 후 동의 여부를 결정할 권리가 있으며, 의료진의 권유와 다른 본인의 결정을 자유롭게 표명할 수 있습니다.",
    ],
  },
  {
    id: "right-3",
    num: "3",
    title: "비밀을 보호받을 권리",
    paragraphs: [
      "환자는 진료와 관련된 신체상·건강상의 비밀과 사생활을 침해받지 아니하며, 의료인과 의료기관은 환자의 동의 없이 또는 법령이 정한 경우를 제외하고는 비밀을 누설·발표하지 못합니다.",
      "병원은 환자의 진료 정보를 안전하게 관리하기 위해 관계 법령에 따른 보안 조치를 마련하고 시행합니다.",
    ],
  },
  {
    id: "right-4",
    num: "4",
    title: "상담·조정을 신청할 권리",
    paragraphs: [
      "환자는 의료 서비스 관련 분쟁이 발생한 경우 한국의료분쟁조정중재원 등에 상담 및 조정 신청을 할 수 있습니다.",
      "병원은 환자의 정당한 이의 제기에 대해 성실히 답변하며, 분쟁 해결을 위해 협조합니다.",
    ],
  },
  {
    id: "right-5",
    num: "5",
    title: "존엄과 가치를 보호받을 권리",
    paragraphs: [
      "환자는 한 인간으로서의 존엄과 가치를 존중받으며, 진료 과정 전반에서 신체적·정신적으로 보호받을 권리가 있습니다.",
      "병원은 환자의 사생활과 명예를 존중하고, 환자의 의견에 귀 기울이며, 환자가 안심하고 치료받을 수 있는 환경을 조성합니다.",
    ],
  },
];

const DUTIES: RightOrDuty[] = [
  {
    id: "duty-6",
    num: "6",
    title: "의료인에 대한 신뢰·존중 의무",
    paragraphs: [
      "환자는 자신의 건강 관련 정보를 의료인에게 정확하게 알리고, 의료인의 치료 계획을 신뢰하고 존중해야 합니다.",
      "환자와 보호자는 의료인 및 다른 환자의 안전을 위해 진료실, 입원실 등 병원 내에서 폭언·폭력·성희롱 등의 행위를 해서는 안 됩니다.",
    ],
  },
  {
    id: "duty-7",
    num: "7",
    title: "부정한 방법으로 진료받지 않을 의무",
    paragraphs: [
      "환자는 진료 전 본인의 신분을 정확히 밝혀야 하며, 타인의 명의를 사용하거나 허위 진술 등 부정한 방법으로 진료를 받아서는 안 됩니다.",
      "건강보험·자동차보험·실손보험 등의 청구 시에도 사실에 부합하는 정보를 제공해야 합니다.",
    ],
  },
  {
    id: "duty-8",
    num: "8",
    title: "진료비 지불 의무",
    paragraphs: [
      "환자는 진료가 이루어진 후 약정된 진료비를 정해진 절차에 따라 지불할 의무가 있습니다.",
      "비급여 항목은 진료 전 안내된 비용을 확인하고, 궁금한 점은 사전에 충분히 문의해 주시기 바랍니다.",
    ],
  },
  {
    id: "duty-9",
    num: "9",
    title: "의료기관 규정 준수 의무",
    paragraphs: [
      "환자는 병원이 정한 진료 시간, 면회 시간, 흡연·음주 금지, 안전 수칙 등 원내 규정과 안내를 준수해야 합니다.",
      "감염병 예방을 위한 마스크 착용, 손 위생 등 공중 보건상의 필요 조치에도 협조해 주시기 바랍니다.",
    ],
  },
];

const ALL_TOC: RightOrDuty[] = [...RIGHTS, ...DUTIES];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `환자 권리장전 - ${SITE.name}`,
  url: `${SITE.url}${ROUTES.legal.patientRights}`,
  inLanguage: "ko-KR",
  isPartOf: {
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  },
  about: {
    "@type": "Thing",
    name: "환자 권리와 의무",
  },
};

export default function PatientRightsPage() {
  return (
    <>
      <Script id="ld-legal-patient-rights" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "PATIENT BILL OF RIGHTS",
          title: "환자 권리장전",
          description:
            "백세한방병원은 보건복지부 표준 환자 권리·의무 장전에 따라 모든 환자분의 권리를 존중하고 보호합니다.",
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "약관 및 정책" },
            { label: "환자 권리장전" },
          ],
          compact: true,
        }}
      >
        {/* TODO(legal-review): 환자 권리장전은 보건복지부 표준 양식 기반의 placeholder입니다. */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* TOC sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[116px]">
              <p className="text-[12px] tracking-[0.18em] font-semibold text-accent-600 mb-4">
                ON THIS PAGE
              </p>
              <nav aria-label="환자 권리장전 목차">
                <p className="text-[11px] tracking-[0.16em] font-semibold text-primary-600 mt-1 mb-2">
                  RIGHTS · 권리
                </p>
                <ol className="space-y-1.5 text-[14px] mb-5">
                  {RIGHTS.map((r) => (
                    <li key={r.id}>
                      <a
                        href={`#${r.id}`}
                        className="block py-1.5 px-3 rounded-md text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        <span className="text-accent-600 font-semibold mr-2 tabular">
                          {r.num}.
                        </span>
                        {r.title}
                      </a>
                    </li>
                  ))}
                </ol>
                <p className="text-[11px] tracking-[0.16em] font-semibold text-primary-600 mt-1 mb-2">
                  DUTIES · 의무
                </p>
                <ol className="space-y-1.5 text-[14px]">
                  {DUTIES.map((d) => (
                    <li key={d.id}>
                      <a
                        href={`#${d.id}`}
                        className="block py-1.5 px-3 rounded-md text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        <span className="text-accent-600 font-semibold mr-2 tabular">
                          {d.num}.
                        </span>
                        {d.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 max-w-container-narrow">
            {/* Warning box */}
            <Reveal>
              <div
                role="note"
                className="rounded-lg bg-amber-50 border-l-4 border-warning-500 p-5 lg:p-6 mb-8 lg:mb-10"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    size={20}
                    className="text-warning-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[14px] font-bold text-warning-600 mb-1">
                      검토 안내
                    </p>
                    <p className="text-[13px] lg:text-[14px] text-neutral-700 leading-relaxed">
                      본 페이지의 약관/방침은 표준 양식 기반의 placeholder입니다. 개원
                      직전 변호사 또는 의료법 전문가의 검토를 받아 최종 확정됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Hero statement */}
            <Reveal>
              <div className="rounded-2xl bg-primary-50 border border-primary-100 p-7 lg:p-9 mb-12 lg:mb-16">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent-500 text-white">
                  <Heart size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <p className="mt-4 text-[18px] lg:text-[20px] font-bold text-primary-700 leading-relaxed">
                  백세한방병원은 모든 환자의 권리와 의무를 존중하며,<br className="hidden sm:block" />
                  정성스러운 진료를 약속드립니다.
                </p>
                <p className="mt-3 text-[14px] text-neutral-600 leading-relaxed">
                  본 환자 권리장전은 보건복지부 표준안에 기반하며, 의료법 및 관련
                  법령에서 정한 환자의 권리와 의무를 안내합니다.
                </p>
              </div>
            </Reveal>

            <article>
              {/* RIGHTS */}
              <Reveal>
                <header className="mb-8">
                  <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] font-semibold text-accent-600">
                    <Heart size={14} aria-hidden="true" />
                    PATIENT RIGHTS
                  </span>
                  <h2 className="mt-2 text-[26px] lg:text-[32px] font-bold text-primary-700 leading-tight">
                    환자의 권리
                  </h2>
                  <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
                    환자는 다음의 권리를 보장받으며, 병원은 이를 존중하고 보호합니다.
                  </p>
                </header>
              </Reveal>

              {RIGHTS.map((r) => (
                <Reveal as="section" key={r.id}>
                  <section id={r.id} className="scroll-mt-[120px]">
                    <h3 className="text-h3 mt-10 lg:mt-12 first:mt-0 text-primary-700 font-bold flex items-baseline gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent-500 text-white text-[14px] font-bold tabular shrink-0">
                        {r.num}
                      </span>
                      <span>{r.title}</span>
                    </h3>
                    <div className="mt-4 space-y-3 pl-12">
                      {r.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="text-[15px] leading-[1.85] text-neutral-700"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}

              {/* Visual divider */}
              <Reveal>
                <div className="my-16 lg:my-20 flex items-center gap-4">
                  <div className="h-px flex-1 bg-neutral-200" />
                  <span className="text-[11px] tracking-[0.24em] font-semibold text-neutral-400">
                    PATIENT DUTIES
                  </span>
                  <div className="h-px flex-1 bg-neutral-200" />
                </div>
              </Reveal>

              {/* DUTIES */}
              <Reveal>
                <header className="mb-8">
                  <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] font-semibold text-accent-600">
                    <ShieldCheck size={14} aria-hidden="true" />
                    PATIENT DUTIES
                  </span>
                  <h2 className="mt-2 text-[26px] lg:text-[32px] font-bold text-primary-700 leading-tight">
                    환자의 의무
                  </h2>
                  <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
                    환자는 안전하고 효과적인 진료를 위해 다음 의무를 함께 지켜
                    주시기 바랍니다.
                  </p>
                </header>
              </Reveal>

              {DUTIES.map((d) => (
                <Reveal as="section" key={d.id}>
                  <section id={d.id} className="scroll-mt-[120px]">
                    <h3 className="text-h3 mt-10 lg:mt-12 first:mt-0 text-primary-700 font-bold flex items-baseline gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-600 text-white text-[14px] font-bold tabular shrink-0">
                        {d.num}
                      </span>
                      <span>{d.title}</span>
                    </h3>
                    <div className="mt-4 space-y-3 pl-12">
                      {d.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="text-[15px] leading-[1.85] text-neutral-700"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </article>

            {/* Footer */}
            <Reveal>
              <footer className="mt-16 lg:mt-20 pt-8 border-t border-neutral-200">
                <p className="text-[13px] text-neutral-500 leading-relaxed">
                  본 환자 권리장전은 보건복지부 표준안을 기반으로 작성되었습니다.
                  관련 문의는 {SITE.contact.representative} 또는 병원 대표 채널을
                  통해 접수해 주시기 바랍니다.
                </p>
                <p className="mt-2 text-[12px] text-neutral-400">
                  ※ 의료기관은 의료법 제4조에 따라 환자의 권리 등을 게시할 의무가
                  있으며, 본 장전은 해당 의무를 충족하기 위해 마련되었습니다.
                </p>
                {/* ALL_TOC referenced for completeness validation */}
                <span hidden aria-hidden="true" data-toc-count={ALL_TOC.length} />
              </footer>
            </Reveal>
          </div>
        </div>
      </SubLayout>
    </>
  );
}
