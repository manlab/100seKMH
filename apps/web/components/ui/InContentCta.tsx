import { Phone } from "lucide-react";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { SITE } from "@/lib/site";
import { ROUTES } from "@/lib/navigation";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

/**
 * 페이지 본문 내부 강조 CTA 배너 (전화/온라인 상담).
 */
export function InContentCta({
  eyebrow = "CONSULT",
  title,
  description,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary-700 text-white p-8 lg:p-12">
      <div className="relative grid lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8">
          <Eyebrow variant="light">{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[24px] sm:text-[28px] lg:text-[34px] font-bold leading-tight text-white text-balanced">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-[14px] lg:text-[15px] text-primary-100/90 leading-relaxed max-w-[560px]">
              {description}
            </p>
          )}
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
          <Button href={`tel:${SITE.contact.representative}`} external variant="accent" size="md" className="justify-between">
            <span className="inline-flex items-center gap-2 tabular">
              <Phone size={16} aria-hidden="true" />
              {SITE.contact.representative}
            </span>
            <span aria-hidden="true">→</span>
          </Button>
          <Button href={ROUTES.community.counsel} variant="outline-white" size="md" className="justify-between">
            <span>온라인 상담</span>
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
