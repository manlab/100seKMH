import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type Props = {
  items: FaqItem[];
  className?: string;
};

/**
 * FAQ 아코디언 — semantic <details> 기반.
 * CSS-only 회전 화살표 (chev), keep-all 한글 줄바꿈.
 */
export function FaqAccordion({ items, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-neutral-200 shadow-card overflow-hidden divide-y divide-neutral-200",
        className
      )}
    >
      {items.map((item, i) => (
        <details key={i} className="faq group">
          <summary className="flex items-start gap-4 p-5 lg:p-6 cursor-pointer">
            <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-600 font-bold text-[14px]">
              Q
            </span>
            <span className="flex-1 text-[15px] lg:text-[16px] font-semibold text-primary-700">
              {item.question}
            </span>
            <span className="chev shrink-0 mt-1 text-neutral-400 transition-transform group-open:rotate-180 group-open:text-accent-600">
              <ChevronDown size={20} aria-hidden="true" />
            </span>
          </summary>
          <div className="px-5 lg:px-6 pb-5 lg:pb-6 pl-16 lg:pl-[88px]">
            <div className="text-[14px] lg:text-[15px] text-neutral-600 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
