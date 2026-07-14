import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import type { NavItem } from "@/lib/navigation";
import { ROUTES } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { SubLayout } from "@/components/layout/SubLayout";
import { ContentImage } from "@/components/layout/ContentImage";
import { Reveal } from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InContentCta } from "@/components/ui/InContentCta";
import { getSubpageVisual } from "@/lib/subpage-visuals";

type GuideLink = {
  title: string;
  description: string;
  href?: string;
};

type GuidePageProps = {
  category: string;
  categoryEyebrow: string;
  categoryHref: string;
  lnbItems: NavItem[];
  title: string;
  description: string;
  overviewTitle: string;
  overview: string;
  topics: GuideLink[];
  process?: string[];
  selfCheck?: string[];
  notice?: string;
  visualPath: string;
};

export function ClinicalGuidePage({
  category,
  categoryEyebrow,
  categoryHref,
  lnbItems,
  title,
  description,
  overviewTitle,
  overview,
  topics,
  process,
  selfCheck,
  notice,
  visualPath,
}: GuidePageProps) {
  const visual = getSubpageVisual(visualPath);

  return (
    <SubLayout
      hero={{
        eyebrow: categoryEyebrow,
        title,
        description,
        breadcrumb: [
          { label: "홈", href: ROUTES.home },
          { label: category, href: categoryHref },
          { label: title },
        ],
        image: visual && { src: visual.hero, position: visual.heroPosition },
        stats: [
          { eyebrow: "진료 안내", value: "상태 확인", caption: "현재 불편과 병력을 함께 확인" },
          { eyebrow: "상담", value: "개별 안내", caption: "진료 후 방향을 안내" },
          { eyebrow: "진료 시간", value: "월-토", caption: "일요일 휴진" },
          { eyebrow: "문의", value: SITE.contact.representative, caption: "대표 번호", accent: true },
        ],
        actions: (
          <>
            <Button href="#guide" variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              진료 안내 보기 <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="lg">
              <Phone size={16} aria-hidden="true" />
              전화 상담
            </Button>
          </>
        ),
      }}
      lnb={{ title: category, eyebrow: categoryEyebrow, items: lnbItems }}
    >
      <Reveal as="section" className="grid gap-8 break-keep lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <Eyebrow>GUIDE OVERVIEW</Eyebrow>
          <h2 id="guide" className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            {overviewTitle}
          </h2>
          <p className="mt-4 max-w-[760px] text-[15px] lg:text-[17px] leading-relaxed text-neutral-600">
            {overview}
          </p>
        </div>
        {visual && <ContentImage src={visual.body} alt={visual.bodyAlt} className="lg:col-span-5" />}
      </Reveal>

      <Reveal as="section" className="break-keep">
        <header className="mb-7 lg:mb-9">
          <Eyebrow>CARE GUIDE</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            함께 확인하는 내용
          </h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {topics.map((topic, index) => {
            const content = (
              <>
                <span className="text-[11px] font-semibold tracking-[0.18em] text-accent-600">GUIDE {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[18px] font-bold text-primary-700">{topic.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{topic.description}</p>
                {topic.href && (
                  <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-accent-600">
                    자세히 보기 <ArrowRight size={14} aria-hidden="true" />
                  </span>
                )}
              </>
            );

            return topic.href ? (
              <Link
                key={topic.title}
                href={topic.href}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-base ease-out-soft hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
              >
                {content}
              </Link>
            ) : (
              <article key={topic.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
                {content}
              </article>
            );
          })}
        </div>
      </Reveal>

      {selfCheck && (
        <Reveal as="section" className="break-keep">
          <Eyebrow>SELF CHECK</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            현재 불편을 확인해 보세요
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2" aria-label="자가 확인 항목">
            {selfCheck.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-[14px] leading-relaxed text-neutral-700">
                <Check size={18} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">
            이 항목은 진단을 위한 검사가 아니며, 증상이 지속되거나 일상에 불편이 있다면 의료진과 상담해 주세요.
          </p>
        </Reveal>
      )}

      {process && (
        <Reveal as="section" className="break-keep">
          <Eyebrow>CARE PROCESS</Eyebrow>
          <h2 className="mt-2 text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-primary-700 leading-tight text-balanced">
            진료는 이렇게 안내됩니다
          </h2>
          <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <li key={step} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
                <span className="text-[12px] font-semibold tracking-[0.18em] text-accent-600">STEP {String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-[15px] font-semibold leading-relaxed text-primary-700">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      )}

      {notice && (
        <Reveal as="aside" className="break-keep rounded-2xl border border-primary-100 bg-primary-50 p-6 text-[14px] leading-relaxed text-primary-700">
          <p className="font-semibold">진료 전 확인</p>
          <p className="mt-2">{notice}</p>
        </Reveal>
      )}

      <Reveal as="section">
        <InContentCta
          title="현재 상태에 맞는 진료 안내가 필요하신가요?"
          description="증상과 치료 이력, 생활 불편을 함께 확인한 뒤 진료 방향을 안내해 드립니다."
        />
      </Reveal>
    </SubLayout>
  );
}
