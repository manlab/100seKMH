import Link from "next/link";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };
export type StatCard = { eyebrow: string; value: string; caption?: string; accent?: boolean };

type Props = {
  /** 페이지 카테고리 라벨 (예: "PAIN CLINIC") */
  eyebrow?: string;
  /** 페이지 타이틀 — h1으로 렌더링 */
  title: React.ReactNode;
  /** 부가 설명 */
  description?: React.ReactNode;
  /** 브레드크럼: 홈 > 카테고리 > 현재 페이지 */
  breadcrumb: Crumb[];
  /** 우측 4분할 stat 카드 (선택) */
  stats?: StatCard[];
  /** 페이지 컴팩트 변형 (법적 페이지) */
  compact?: boolean;
  /** 추가 CTA 버튼 (선택) */
  actions?: React.ReactNode;
};

/**
 * 서브 페이지 상단 비주얼 (sub-hero).
 * - 기본 60vh / compact 시 40vh
 * - 좌측 텍스트 + 우측 4 stat cards (그리드 12-col)
 */
export function SubVisual({
  eyebrow,
  title,
  description,
  breadcrumb,
  stats,
  compact = false,
  actions,
}: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden text-white",
        // gradient + radial overlays — globals.css의 .sub-hero 패턴을 인라인으로
        "bg-[radial-gradient(circle_at_18%_30%,rgba(74,142,156,0.22),transparent_45%),radial-gradient(circle_at_86%_65%,rgba(143,191,204,0.16),transparent_50%),linear-gradient(135deg,#0C2340_0%,#143A6B_55%,#102E55_100%)]"
      )}
    >
      {/* decorative blobs */}
      <div
        className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-accent-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-32 -bottom-32 w-[420px] h-[420px] rounded-full bg-accent-400/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative container max-w-container-base",
          compact ? "py-12 lg:py-16" : "py-16 lg:py-28"
        )}
      >
        {/* breadcrumb */}
        <nav aria-label="현재 위치" className="text-[13px] text-primary-100/85 mb-6 lg:mb-10">
          <ol className="flex items-center gap-2 flex-wrap">
            {breadcrumb.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className={i === breadcrumb.length - 1 ? "text-white font-semibold" : ""}>
                    {c.label}
                  </span>
                )}
                {i < breadcrumb.length - 1 && (
                  <span aria-hidden="true" className="text-primary-100/40">/</span>
                )}
              </span>
            ))}
          </ol>
        </nav>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className={cn(stats ? "lg:col-span-7" : "lg:col-span-12")}>
            {eyebrow && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-[11px] tracking-[0.18em] font-semibold text-accent-200">
                {eyebrow}
              </span>
            )}
            <h1
              className={cn(
                "mt-5 text-balanced font-extrabold text-white leading-[1.15]",
                compact
                  ? "text-[28px] sm:text-[34px] lg:text-[42px]"
                  : "text-[34px] sm:text-[42px] lg:text-[56px]"
              )}
            >
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.75] text-primary-100/95 max-w-[560px]">
                {description}
              </p>
            )}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>

          {stats && (
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-2xl border p-5 sm:p-6",
                      s.accent
                        ? "bg-accent-500/95 border-accent-400/40 text-white"
                        : "bg-white/10 backdrop-blur-sm border-white/15"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[11px] tracking-[0.18em] font-semibold",
                        s.accent ? "text-accent-100" : "text-accent-200"
                      )}
                    >
                      {s.eyebrow}
                    </span>
                    <p
                      className={cn(
                        "mt-2 font-bold",
                        "text-white text-[20px] sm:text-[22px]",
                        s.value.match(/^\d/) ? "tabular" : ""
                      )}
                    >
                      {s.value}
                    </p>
                    {s.caption && (
                      <p
                        className={cn(
                          "mt-1 text-[12px]",
                          s.accent ? "text-accent-50/90" : "text-primary-100/85"
                        )}
                      >
                        {s.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
