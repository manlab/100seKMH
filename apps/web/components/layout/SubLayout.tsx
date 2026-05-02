import { SubVisual, type Crumb, type StatCard } from "./SubVisual";
import { Lnb } from "./Lnb";
import type { NavItem } from "@/lib/navigation";

type Props = {
  /** Sub-hero 영역에 전달 */
  hero: {
    eyebrow?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    breadcrumb: Crumb[];
    stats?: StatCard[];
    actions?: React.ReactNode;
    compact?: boolean;
  };
  /** LNB 설정 — 생략 시 LNB 미표시 (전체폭 컨텐츠) */
  lnb?: {
    title: string;
    eyebrow?: string;
    items: NavItem[];
    showCtaCard?: boolean;
  };
  children: React.ReactNode;
};

/**
 * 서브 페이지 표준 레이아웃: SubVisual + (LNB | 12-col grid).
 * - lnb 있을 때: 좌(3) + 우(9) 그리드
 * - lnb 없을 때: 전체폭 (max-w-container-base 컨테이너)
 */
export function SubLayout({ hero, lnb, children }: Props) {
  return (
    <>
      <SubVisual {...hero} />

      <div className="container max-w-container-base py-12 lg:py-20">
        {lnb ? (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <Lnb {...lnb} />
            <div className="lg:col-span-9 space-y-16 lg:space-y-24">{children}</div>
          </div>
        ) : (
          <div className="space-y-16 lg:space-y-24">{children}</div>
        )}
      </div>
    </>
  );
}
