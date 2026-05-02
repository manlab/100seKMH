"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 시맨틱 태그 변경 (header, section, article 등) — 기본 "div" */
  as?: "div" | "section" | "article" | "header" | "footer" | "aside" | "ul" | "ol";
};

/**
 * 스크롤 진입 시 fade-up + blur-in 애니메이션 래퍼.
 * IntersectionObserver — once trigger.
 */
export function Reveal({ children, className, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const cls = cn("reveal", visible && "is-visible", className);

  // ref-cast: 모든 요소 타입은 HTMLElement를 상속하므로 안전
  switch (as) {
    case "section":
      return <section ref={ref as never} className={cls}>{children}</section>;
    case "article":
      return <article ref={ref as never} className={cls}>{children}</article>;
    case "header":
      return <header ref={ref as never} className={cls}>{children}</header>;
    case "footer":
      return <footer ref={ref as never} className={cls}>{children}</footer>;
    case "aside":
      return <aside ref={ref as never} className={cls}>{children}</aside>;
    case "ul":
      return <ul ref={ref as never} className={cls}>{children}</ul>;
    case "ol":
      return <ol ref={ref as never} className={cls}>{children}</ol>;
    default:
      return <div ref={ref} className={cls}>{children}</div>;
  }
}
