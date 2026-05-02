import type { Metadata } from "next";
import Script from "next/script";
import { AlertTriangle } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { Reveal } from "@/components/layout/Reveal";

export const metadata: Metadata = pageMeta({
  title: "개인정보처리방침",
  description:
    "백세한방병원의 개인정보 수집·이용·보유·파기 등 처리에 관한 방침입니다. 의료법 및 개인정보 보호법에 따라 환자의 개인정보를 안전하게 관리합니다.",
  path: ROUTES.legal.privacy,
});

// TODO(legal-review): 본 처리방침은 표준 양식 기반의 placeholder입니다.
// 개원 직전 의료법 및 개인정보보호법 전문 자문을 받아 최종 확정해야 합니다.
type Section = {
  id: string;
  num: string;
  title: string;
};

const SECTIONS: Section[] = [
  { id: "section-1", num: "1", title: "수집 항목" },
  { id: "section-2", num: "2", title: "수집·이용 목적" },
  { id: "section-3", num: "3", title: "보유 및 이용 기간" },
  { id: "section-4", num: "4", title: "제3자 제공" },
  { id: "section-5", num: "5", title: "처리 위탁" },
  { id: "section-6", num: "6", title: "정보 주체의 권리" },
  { id: "section-7", num: "7", title: "안전성 확보 조치" },
  { id: "section-8", num: "8", title: "개인정보 보호책임자" },
  { id: "section-9", num: "9", title: "변경 사항 통지" },
  { id: "section-10", num: "10", title: "권익 침해 구제" },
];

const COLLECT_ITEMS = [
  {
    category: "진료 접수",
    items: "성명, 생년월일, 성별, 연락처, 주소, 주민등록번호(법령상 필요 시)",
    method: "내원 접수서, 홈페이지 예약 폼",
  },
  {
    category: "온라인 상담",
    items: "성명, 연락처, 이메일, 상담 내용",
    method: "홈페이지 상담 폼, 카카오톡 채널",
  },
  {
    category: "진료 과정",
    items: "병력, 가족력, 진료 기록, 검사 결과, 처방 내역, 영상 자료",
    method: "진료·검사 과정에서 의료진이 작성",
  },
  {
    category: "보험 청구",
    items: "보험사명, 보험증권번호, 사고 접수번호 (자동차보험·실손 청구 시)",
    method: "보험 청구 신청서",
  },
  {
    category: "자동 수집",
    items: "접속 IP, 쿠키, 접속 로그, 브라우저 정보",
    method: "홈페이지 이용 시 자동 생성",
  },
];

const RETENTION = [
  { item: "진료 기록부", period: "10년", basis: "의료법 시행규칙 제15조" },
  { item: "처방전", period: "2년", basis: "의료법 시행규칙 제15조" },
  { item: "진단서 등의 부본", period: "3년", basis: "의료법 시행규칙 제15조" },
  { item: "방사선 사진 및 그 소견서", period: "5년", basis: "의료법 시행규칙 제15조" },
  {
    item: "환자 명부",
    period: "5년",
    basis: "의료법 시행규칙 제15조",
  },
  {
    item: "온라인 상담 기록",
    period: "3년",
    basis: "전자상거래 등에서의 소비자보호법",
  },
  {
    item: "접속 기록(로그)",
    period: "3개월",
    basis: "통신비밀보호법",
  },
];

const ENTRUST = [
  {
    consignee: "OOO (전자의무기록 EMR 운영사)",
    task: "진료 정보 시스템 운영·유지보수",
  },
  {
    consignee: "OOO (결제 대행사)",
    task: "진료비 카드/간편결제 처리",
  },
  {
    consignee: "OOO (문자 발송 사업자)",
    task: "예약 안내, 진료 알림 발송",
  },
  {
    consignee: "OOO (홈페이지 호스팅)",
    task: "홈페이지 서버 운영 및 데이터 백업",
  },
];

const SAFETY = [
  {
    title: "관리적 조치",
    desc: "내부관리계획 수립·시행, 정기적인 직원 교육, 접근 권한 관리.",
  },
  {
    title: "기술적 조치",
    desc: "개인정보 처리시스템 접근 권한 통제, 접속 기록 보관, 보안 프로그램 설치 및 갱신, 암호화 저장·전송.",
  },
  {
    title: "물리적 조치",
    desc: "전산실·자료 보관실의 접근 통제, 잠금장치 설치, CCTV 운영.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `개인정보처리방침 - ${SITE.name}`,
  url: `${SITE.url}${ROUTES.legal.privacy}`,
  inLanguage: "ko-KR",
  isPartOf: {
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  },
  about: {
    "@type": "Thing",
    name: "개인정보 처리방침",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Script id="ld-legal-privacy" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <SubLayout
        hero={{
          eyebrow: "PRIVACY POLICY",
          title: "개인정보처리방침",
          description:
            "의료법 및 개인정보 보호법에 따라 환자의 개인정보를 안전하게 수집·이용·보관합니다.",
          breadcrumb: [
            { label: "홈", href: ROUTES.home },
            { label: "약관 및 정책" },
            { label: "개인정보처리방침" },
          ],
          compact: true,
        }}
      >
        {/* TODO(legal-review): 처리방침 본문은 placeholder입니다. 개원 전 의료법·개보법 전문가 검토 필수. */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* TOC sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[116px]">
              <p className="text-[12px] tracking-[0.18em] font-semibold text-accent-600 mb-4">
                ON THIS PAGE
              </p>
              <nav aria-label="개인정보처리방침 목차">
                <ol className="space-y-2 text-[14px]">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block py-1.5 px-3 rounded-md text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        <span className="text-accent-600 font-semibold mr-2 tabular">
                          {s.num}.
                        </span>
                        {s.title}
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

            <Reveal>
              <p className="text-[15px] leading-[1.85] text-neutral-700 mb-10">
                백세한방병원(이하 '병원')은 「개인정보 보호법」 및 「의료법」 등
                관계 법령에 따라 환자(정보주체)의 개인정보를 안전하게 보호하기 위해
                다음과 같이 개인정보 처리방침을 수립·공개합니다.
              </p>
            </Reveal>

            <article className="prose-content">
              {/* 1. 수집 항목 */}
              <Reveal as="section">
                <section id="section-1" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-0 text-primary-700 font-bold">
                    1. 수집 항목
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    병원은 진료 및 서비스 제공을 위해 필요한 최소한의 개인정보를
                    수집합니다.
                  </p>
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-[14px] border-collapse">
                      <thead>
                        <tr className="bg-primary-50 text-primary-700">
                          <th className="text-left p-3 border border-neutral-200 font-semibold w-[120px]">
                            구분
                          </th>
                          <th className="text-left p-3 border border-neutral-200 font-semibold">
                            수집 항목
                          </th>
                          <th className="text-left p-3 border border-neutral-200 font-semibold w-[200px]">
                            수집 방법
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {COLLECT_ITEMS.map((row) => (
                          <tr key={row.category}>
                            <td className="p-3 border border-neutral-200 font-semibold text-neutral-800">
                              {row.category}
                            </td>
                            <td className="p-3 border border-neutral-200 text-neutral-700 leading-relaxed">
                              {row.items}
                            </td>
                            <td className="p-3 border border-neutral-200 text-neutral-600">
                              {row.method}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>

              {/* 2. 수집·이용 목적 */}
              <Reveal as="section">
                <section id="section-2" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    2. 수집·이용 목적
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    수집한 개인정보는 다음의 목적을 위해 이용되며, 목적 외의 용도로는
                    이용되지 않습니다.
                  </p>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-neutral-700 leading-[1.85] list-disc pl-6">
                    <li>진료, 처방, 의료 상담 및 진료 기록의 작성·관리</li>
                    <li>진료 예약, 진료 안내 및 결과 통보</li>
                    <li>진료비 청구·수납 및 보험(건강보험·자동차보험·실손) 청구 처리</li>
                    <li>의료법령에 따른 진단서, 처방전, 진료 기록 등 발급</li>
                    <li>온라인 상담 응대 및 민원 처리</li>
                    <li>병원 내 의료 안전 및 분쟁 대응</li>
                  </ul>
                </section>
              </Reveal>

              {/* 3. 보유 및 이용 기간 */}
              <Reveal as="section">
                <section id="section-3" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    3. 보유 및 이용 기간
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    병원은 의료법 및 관계 법령에서 정한 보존 기간 동안 개인정보를
                    안전하게 보관하며, 보존 기간이 경과하거나 처리 목적이 달성된
                    개인정보는 지체 없이 파기합니다.
                  </p>
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-[14px] border-collapse">
                      <thead>
                        <tr className="bg-primary-50 text-primary-700">
                          <th className="text-left p-3 border border-neutral-200 font-semibold">
                            기록 종류
                          </th>
                          <th className="text-left p-3 border border-neutral-200 font-semibold w-[100px]">
                            보존 기간
                          </th>
                          <th className="text-left p-3 border border-neutral-200 font-semibold w-[220px]">
                            법적 근거
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {RETENTION.map((row) => (
                          <tr key={row.item}>
                            <td className="p-3 border border-neutral-200 text-neutral-800">
                              {row.item}
                            </td>
                            <td className="p-3 border border-neutral-200 font-semibold text-primary-700 tabular">
                              {row.period}
                            </td>
                            <td className="p-3 border border-neutral-200 text-neutral-600">
                              {row.basis}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>

              {/* 4. 제3자 제공 */}
              <Reveal as="section">
                <section id="section-4" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    4. 제3자 제공
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    병원은 원칙적으로 환자의 개인정보를 제3자에게 제공하지 않습니다.
                    다만 다음의 경우에는 예외적으로 제공할 수 있습니다.
                  </p>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-neutral-700 leading-[1.85] list-disc pl-6">
                    <li>환자가 사전에 동의한 경우</li>
                    <li>법령에 특별한 규정이 있거나 수사기관이 법률에 정해진 절차와 방법에 따라 요구한 경우</li>
                    <li>건강보험심사평가원·국민건강보험공단 등 관계 기관에 의료법령에 따라 의무적으로 청구·신고하는 경우</li>
                    <li>자동차보험 청구 시 보험사에 진료내역서 등 청구 자료를 제공하는 경우(환자 동의)</li>
                  </ul>
                </section>
              </Reveal>

              {/* 5. 처리 위탁 */}
              <Reveal as="section">
                <section id="section-5" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    5. 처리 위탁
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    병원은 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를
                    외부 전문 업체에 위탁하고 있으며, 위탁계약 시 개인정보가 안전하게
                    관리되도록 필요한 사항을 규정하고 있습니다.
                  </p>
                  {/* TODO(legal-review): 실제 수탁 업체명·위탁 업무 내역으로 교체 필요. */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-[14px] border-collapse">
                      <thead>
                        <tr className="bg-primary-50 text-primary-700">
                          <th className="text-left p-3 border border-neutral-200 font-semibold w-[260px]">
                            수탁자
                          </th>
                          <th className="text-left p-3 border border-neutral-200 font-semibold">
                            위탁 업무 내용
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ENTRUST.map((row) => (
                          <tr key={row.consignee}>
                            <td className="p-3 border border-neutral-200 text-neutral-800">
                              {row.consignee}
                            </td>
                            <td className="p-3 border border-neutral-200 text-neutral-700">
                              {row.task}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>

              {/* 6. 정보 주체의 권리 */}
              <Reveal as="section">
                <section id="section-6" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    6. 정보 주체의 권리
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    환자는 정보 주체로서 자신의 개인정보에 대하여 다음과 같은 권리를
                    행사할 수 있습니다.
                  </p>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-neutral-700 leading-[1.85] list-disc pl-6">
                    <li>개인정보의 열람 요구</li>
                    <li>오류 등이 있을 경우 정정·삭제 요구</li>
                    <li>처리 정지 요구</li>
                    <li>동의 철회</li>
                  </ul>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    권리 행사는 서면, 전화, 이메일 등을 통해 요청하실 수 있으며,
                    병원은 지체 없이 조치합니다. 다만 의료법 등 법령에 따라 보존
                    의무가 있는 진료기록은 삭제 요구가 제한될 수 있습니다.
                  </p>
                </section>
              </Reveal>

              {/* 7. 안전성 확보 조치 */}
              <Reveal as="section">
                <section id="section-7" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    7. 안전성 확보 조치
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    병원은 개인정보의 안전성 확보를 위해 다음의 조치를 취하고 있습니다.
                  </p>
                  <div className="mt-5 grid sm:grid-cols-3 gap-4">
                    {SAFETY.map((s) => (
                      <div
                        key={s.title}
                        className="rounded-xl border border-neutral-200 bg-white p-5"
                      >
                        <h3 className="text-[15px] font-bold text-primary-700">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* 8. 개인정보 보호책임자 */}
              <Reveal as="section">
                <section id="section-8" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    8. 개인정보 보호책임자
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    병원은 개인정보의 처리에 관한 업무를 총괄해서 책임지고, 개인정보
                    처리와 관련한 환자의 불만 처리 및 피해 구제 등을 위해 아래와 같이
                    개인정보 보호책임자를 지정하고 있습니다.
                  </p>
                  {/* TODO(legal-review): 보호책임자 성명·직책·연락처를 실제 정보로 교체. */}
                  <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/60 p-6">
                    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
                      <div>
                        <dt className="text-[12px] tracking-[0.16em] font-semibold text-neutral-500">
                          성명
                        </dt>
                        <dd className="mt-1 font-semibold text-primary-700">OOO</dd>
                      </div>
                      <div>
                        <dt className="text-[12px] tracking-[0.16em] font-semibold text-neutral-500">
                          직책
                        </dt>
                        <dd className="mt-1 font-semibold text-primary-700">
                          개인정보 보호책임자
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[12px] tracking-[0.16em] font-semibold text-neutral-500">
                          연락처
                        </dt>
                        <dd className="mt-1 font-semibold text-primary-700 tabular">
                          031-0000-0000
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[12px] tracking-[0.16em] font-semibold text-neutral-500">
                          이메일
                        </dt>
                        <dd className="mt-1 font-semibold text-primary-700">
                          privacy@baeksehospital.kr
                        </dd>
                      </div>
                    </dl>
                  </div>
                </section>
              </Reveal>

              {/* 9. 변경 사항 통지 */}
              <Reveal as="section">
                <section id="section-9" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    9. 변경 사항 통지
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    본 개인정보 처리방침은 법령·정책·보안 기술의 변경에 따라 내용이
                    추가·삭제·수정될 수 있으며, 변경 시 시행일 7일 전부터 홈페이지를
                    통해 공지합니다. 다만, 환자의 권리에 중요한 영향을 미치는 변경의
                    경우 시행일 30일 전부터 공지합니다.
                  </p>
                </section>
              </Reveal>

              {/* 10. 권익 침해 구제 */}
              <Reveal as="section">
                <section id="section-10" className="scroll-mt-[120px]">
                  <h2 className="text-h2 mt-12 lg:mt-14 text-primary-700 font-bold">
                    10. 권익 침해 구제
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-neutral-700">
                    개인정보 침해로 인한 신고나 상담이 필요한 경우 아래 기관에
                    문의하실 수 있습니다.
                  </p>
                  <ul className="mt-4 space-y-2 text-[14px] text-neutral-700 leading-relaxed">
                    <li>
                      <span className="font-semibold text-primary-700">개인정보 침해신고센터</span>{" "}
                      (국번 없이 118 / privacy.kisa.or.kr)
                    </li>
                    <li>
                      <span className="font-semibold text-primary-700">개인정보 분쟁조정위원회</span>{" "}
                      (1833-6972 / www.kopico.go.kr)
                    </li>
                    <li>
                      <span className="font-semibold text-primary-700">대검찰청 사이버수사과</span>{" "}
                      (국번 없이 1301 / www.spo.go.kr)
                    </li>
                    <li>
                      <span className="font-semibold text-primary-700">경찰청 사이버수사국</span>{" "}
                      (국번 없이 182 / ecrm.cyber.go.kr)
                    </li>
                  </ul>
                </section>
              </Reveal>
            </article>

            {/* Footer */}
            <Reveal>
              <footer className="mt-16 lg:mt-20 pt-8 border-t border-neutral-200">
                <dl className="grid sm:grid-cols-2 gap-4 text-[14px]">
                  <div>
                    <dt className="text-[12px] tracking-[0.18em] font-semibold text-neutral-500">
                      시행일
                    </dt>
                    {/* TODO(legal-review): 시행일 확정 필요. */}
                    <dd className="mt-1 font-semibold text-primary-700 tabular">
                      2026.MM.DD
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[12px] tracking-[0.18em] font-semibold text-neutral-500">
                      최종 개정일
                    </dt>
                    {/* TODO(legal-review): 최종 개정일 확정 필요. */}
                    <dd className="mt-1 font-semibold text-primary-700 tabular">
                      2026.MM.DD
                    </dd>
                  </div>
                </dl>
              </footer>
            </Reveal>
          </div>
        </div>
      </SubLayout>
    </>
  );
}
