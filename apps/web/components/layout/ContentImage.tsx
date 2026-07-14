import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** A stable, responsive editorial image block for subpage content. */
export function ContentImage({ src, alt, className, priority = false }: Props) {
  return (
    <figure className={cn("overflow-hidden rounded-lg bg-neutral-100", className)}>
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
    </figure>
  );
}
