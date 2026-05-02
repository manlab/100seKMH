import { cn } from "@/lib/cn";

type Bg = "white" | "neutral" | "primary" | "neutral-50";
type Spacing = "sm" | "md" | "lg" | "xl";

const bgClasses: Record<Bg, string> = {
  white: "bg-white",
  neutral: "bg-neutral-50",
  "neutral-50": "bg-neutral-50",
  primary: "bg-primary-700 text-white",
};

const spacingClasses: Record<Spacing, string> = {
  sm: "py-12",
  md: "py-12 lg:py-16",
  lg: "py-16 lg:py-24",
  xl: "py-20 lg:py-28",
};

type Props = {
  id?: string;
  bg?: Bg;
  spacing?: Spacing;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, bg = "white", spacing = "lg", className, children }: Props) {
  return (
    <section id={id} className={cn(bgClasses[bg], spacingClasses[spacing], className)}>
      <div className="container max-w-container-base">{children}</div>
    </section>
  );
}
