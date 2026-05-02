import type { Metadata } from "next";
import Script from "next/script";
import { AlertTriangle } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";

export const metadata: Metadata = pageMeta({
  title: "이용약관",
  description:
    "백세한방병원 홈페이지 및 진료 서비스 이용에 관한 약관입니다. 진료 예약·취소, 개인정보 처리, 분쟁 해결 등 환자와 병원 간의 권리·의무를 안내합니다.",
  path: ROUTES.legal.terms,
});

// TODO(legal-review): 본 약관은 표준 양식 기반의 placeholder입니다.
// 개원 직전 법률 자문(변호사·의료법 전문가)을 거쳐 최종 확정해야 합니다.
type Article = {
  id: string;
  num: string;
  title: string;
  paragraphs: string[];
};

const ARTICLES: Article[] = [
  {
    id: "article-1",
    num: "제1조",
    title: "목적",
    paragraphs: [
      "본 약관은 백세한방병원(이하 '병원'이라 합니다)이 운영하는 공식 홈페이지 및 진료 관련 서비스(이하 '서비스'라 합니다)의 이용 조건과 절차, 환자(이하 '이용자'라 합니다)와 병원의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.",
      "본 약관은 의료법, 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계 법령에 위배되지 않는 범위에서 적용됩니다.",
    ],
  },
  {
    id: "article-2",
    num: "제2조",
    title: "정의",
    paragraphs: [
      "본 약관에서 사용하는 용어의 정의는 다음과 같습니다.",
      "1. '서비스'란 병원이 운영하는 홈페이지, 온라인 상담, 진료 예약, 진료 안내 등 이용자에게 제공하는 일체의 서비스를 의미합니다.",
      "2. '이용자'란 본 약관에 동의하고 병원이 제공하는 서비스를 이용하는 자를 의미합니다.",
      "3. '진료 정보'란 진료 과정에서 생성·수집되는 의료 기록, 처방 내역, 검사 결과 등 일체의 정보를 의미합니다.",
    ],
  },
  {
    id: "article-3",
    num: "제3조",
    title: "약관의 효력 및 변경",
    paragraphs: [
      "본 약관은 홈페이지 화면에 게시함으로써 그 효력이 발생하며, 이용자가 서비스에 가입하거나 진료를 이용함으로써 본 약관에 동의한 것으로 간주합니다.",
      "병원은 관계 법령의 변경, 진료 정책의 변동 등 합리적인 사유가 있을 경우 본 약관을 변경할 수 있으며, 변경된 약관은 시행일 7일 전(이용자에게 불리한 변경의 경우 30일 전)부터 홈페이지에 공지합니다.",
      "이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있으며, 변경된 약관 시행일 이후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 봅니다.",
    ],
  },
  {
    id: "article-4",
    num: "제4조",
    title: "이용 신청 및 승낙",
    paragraphs: [
      "이용자는 병원이 정한 절차에 따라 본 약관에 동의하고 필요한 정보를 제공함으로써 서비스 이용을 신청할 수 있습니다.",
      "병원은 다음 각 호에 해당하는 경우 이용 신청에 대한 승낙을 거부하거나 사후에 이용을 제한할 수 있습니다.",
      "1. 신청 시 허위 정보를 기재하거나 타인의 정보를 도용한 경우",
      "2. 본 약관 또는 관계 법령을 위반한 사실이 확인된 경우",
      "3. 그 밖에 병원이 합리적으로 부적절하다고 판단하는 경우",
    ],
  },
  {
    id: "article-5",
    num: "제5조",
    title: "진료 예약 및 취소",
    paragraphs: [
      "이용자는 홈페이지, 전화, 카카오톡 등 병원이 제공하는 채널을 통해 진료를 예약할 수 있으며, 예약 시 정확한 인적 사항과 연락처를 제공해야 합니다.",
      "예약의 변경 또는 취소는 진료 예정일 전일까지 가능하며, 별도의 위약금은 발생하지 않습니다. 다만 무단 미방문이 반복되는 경우 병원은 향후 예약을 제한할 수 있습니다.",
      "병원의 사정(의료진 변동, 천재지변 등)으로 인해 예약된 진료가 변경되는 경우 병원은 사전에 이용자에게 통지하고 일정 조정을 안내합니다.",
    ],
  },
  {
    id: "article-6",
    num: "제6조",
    title: "진료의 거부",
    paragraphs: [
      "병원은 의료법 제15조에 따라 정당한 사유 없이 진료를 거부하지 아니합니다. 다만 다음 각 호에 해당하는 경우 진료를 거부하거나 다른 의료기관으로의 전원을 안내할 수 있습니다.",
      "1. 병원의 진료 영역(한방 진료)을 벗어난 응급·중증 질환으로 다른 전문 의료기관의 즉각적인 진료가 필요한 경우",
      "2. 이용자가 의료진의 진료 행위를 폭언·폭력 등으로 방해하여 정상적인 진료가 불가능한 경우",
      "3. 그 밖에 의료법령에서 정한 정당한 사유가 있는 경우",
    ],
  },
  {
    id: "article-7",
    num: "제7조",
    title: "개인정보의 보호",
    paragraphs: [
      "병원은 이용자의 개인정보를 보호하기 위해 개인정보 보호법, 의료법 등 관계 법령에 따라 개인정보 처리방침을 수립·운영합니다.",
      "개인정보의 수집 항목, 이용 목적, 보유 기간, 제3자 제공 여부 등 자세한 사항은 별도 게시된 개인정보처리방침을 참고해 주시기 바랍니다.",
      "이용자는 본인의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 언제든지 요청할 수 있으며, 병원은 관계 법령에 따라 신속히 조치합니다.",
    ],
  },
  {
    id: "article-8",
    num: "제8조",
    title: "손해배상 및 책임의 한계",
    paragraphs: [
      "병원은 이용자에게 발생한 손해 중 병원의 고의 또는 중대한 과실로 인한 손해에 대해서는 관계 법령이 정하는 바에 따라 배상 책임을 부담합니다.",
      "다만 천재지변, 정전, 통신 장애 등 불가항력적 사유 또는 이용자의 귀책사유로 인해 발생한 손해에 대해서는 병원이 책임을 지지 아니합니다.",
      "의료 행위와 관련된 분쟁은 의료법, 의료사고 피해구제 및 의료분쟁 조정 등에 관한 법률에 따라 처리됩니다.",
    ],
  },
  {
    id: "article-9",
    num: "제9조",
    title: "분쟁 해결",
    paragraphs: [
      "병원은 이용자가 제기하는 정당한 의견이나 불만을 신속히 처리하기 위해 노력하며, 처리에 장기간이 소요되는 경우 이용자에게 그 사유와 처리 일정을 통보합니다.",
      "본 약관과 관련된 분쟁은 한국의 법령을 준거법으로 하며, 분쟁 해결을 위한 소송의 관할은 민사소송법에 따른 관할 법원으로 합니다.",
      "의료 분쟁의 경우 한국의료분쟁조정중재원의 조정·중재 절차를 우선 활용할 수 있습니다.",
    ],
  },
  {
    id: "article-10",
    num: "제10조",
    title: "부칙",
    paragraphs: [
      "본 약관은 2026년 OO월 OO일부터 시행합니다.",
      "본 약관 시행 이전에 가입한 이용자에게도 본 약관이 적용됩니다.",
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `이용약관 - ${SITE.name}`,
  url: `${SITE.url}${ROUTES.legal.terms}`,
  inLanguage: "ko-KR",
  isPartOf: {
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  },
  about: {
    "@type": "Thing",
    name: "병원 이용약관",
  },
};

export default function TermsPage() {
  return (
    <>
      <Script id="ld-legal-terms" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "TERMS OF SERVICE",
          title: "이용약관",
          description:
            "백세한방병원 홈페이지 및 진료 서비스 이용에 관한 약관입니다. 환자와 병원 간의 권리·의무를 안내드립니다.",
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "약관 및 정책" },
            { label: "이용약관" },
          ],
          compact: true,
        }}
      >
        {/* TODO(legal-review): 약관 본문은 placeholder입니다. 개원 전 법률 검토 필수. */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* TOC sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[116px]">
              <p className="text-[12px] tracking-[0.18em] font-semibold text-accent-600 mb-4">
                ON THIS PAGE
              </p>
              <nav aria-label="이용약관 목차">
                <ol className="space-y-2 text-[14px]">
                  {ARTICLES.map((a) => (
                    <li key={a.id}>
                      <a
                        href={`#${a.id}`}
                        className="block py-1.5 px-3 rounded-md text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        <span className="text-accent-600 font-semibold mr-1.5 tabular">
                          {a.num}
                        </span>
                        {a.title}
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
                className="rounded-lg bg-amber-50 border-l-4 border-warning-500 p-5 lg:p-6 mb-10 lg:mb-14"
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

            {/* Articles */}
            <article className="prose-content">
              {ARTICLES.map((a) => (
                <Reveal as="section" key={a.id}>
                  <section id={a.id} className="scroll-mt-[120px]">
                    <h2 className="text-h2 mt-12 lg:mt-14 first:mt-0 text-primary-700 font-bold">
                      {a.num} ({a.title})
                    </h2>
                    <div className="mt-4 space-y-4">
                      {a.paragraphs.map((p, i) => (
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

            {/* Footer / 시행일 */}
            <Reveal>
              <footer className="mt-16 lg:mt-20 pt-8 border-t border-neutral-200">
                <dl className="grid sm:grid-cols-2 gap-4 text-[14px]">
                  <div>
                    <dt className="text-[12px] tracking-[0.18em] font-semibold text-neutral-500">
                      시행일
                    </dt>
                    {/* TODO(legal-review): 정확한 시행일을 확정해 주세요. */}
                    <dd className="mt-1 font-semibold text-primary-700 tabular">
                      2026.MM.DD
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[12px] tracking-[0.18em] font-semibold text-neutral-500">
                      최종 개정일
                    </dt>
                    {/* TODO(legal-review): 최종 개정일을 확정해 주세요. */}
                    <dd className="mt-1 font-semibold text-primary-700 tabular">
                      2026.MM.DD
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-[12px] text-neutral-500 leading-relaxed">
                  본 약관과 관련된 문의는 {SITE.contact.representative} 또는 병원
                  대표 채널을 통해 접수해 주시기 바랍니다.
                </p>
              </footer>
            </Reveal>
          </div>
        </div>
      </SubLayout>
    </>
  );
}
