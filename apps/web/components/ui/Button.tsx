import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "outline-white";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg",
  secondary:
    "bg-white text-primary-600 border border-primary-200 hover:bg-primary-50",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-cta",
  ghost:
    "text-primary-500 hover:text-accent-600 hover:underline underline-offset-4",
  "outline-white":
    "border border-white/40 text-white hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-7 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

/**
 * 통합 Button — `<button>` 또는 `<a>`/`<Link>`로 렌더링.
 * - 기본 변형: primary / secondary / accent / ghost / outline-white
 * - 크기: sm(36px) / md(44px) / lg(48px)
 * - pill: rounded-full (메인 CTA에만 사용)
 */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", pill = true, className, children } = props;
  const base = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors whitespace-nowrap",
    pill ? "rounded-full" : "rounded-lg",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if ("href" in props && props.href) {
    if (props.external) {
      const opensNewWindow = !props.href.startsWith("tel:");
      return (
        <a
          href={props.href}
          target={opensNewWindow ? "_blank" : undefined}
          rel={opensNewWindow ? "noopener noreferrer" : undefined}
          className={base}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={base}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, pill: _p, className: _c, children: _ch, ...rest } = props as ButtonProps;
  return (
    <button {...rest} className={base}>
      {children}
    </button>
  );
}
