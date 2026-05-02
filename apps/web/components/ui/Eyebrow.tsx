import { cn } from "@/lib/cn";

/**
 * 섹션 라벨 (overline 스타일).
 * 예: "PAIN CLINIC" / "FAQ" / "TREATMENT"
 */
export function Eyebrow({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block text-[12px] tracking-[0.2em] font-semibold",
        variant === "light" ? "text-accent-300" : "text-accent-600",
        className
      )}
    >
      {children}
    </span>
  );
}
