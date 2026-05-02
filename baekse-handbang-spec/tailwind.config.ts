import type { Config } from "tailwindcss";

/**
 * 백세한방병원 — Tailwind 설정
 * 이 파일은 디자인 시스템(01-design-system.md)의 Single Source of Truth 입니다.
 * 토큰 추가/변경 시 반드시 디자인 시스템 문서도 함께 업데이트하세요.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class", // class 기반이지만, 실제로는 다크모드 미지원 (사용 안 함)
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px
        sm: "1.5rem",       // 24px
        md: "2rem",         // 32px
        lg: "2.5rem",       // 40px
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#143A6B",
          50:  "#F1F5FA",
          100: "#DCE5F1",
          200: "#B7C7DD",
          300: "#92A9C9",
          400: "#4F6E9F",
          500: "#143A6B", // ★ 브랜드 메인
          600: "#102E55",
          700: "#0C2340",
          800: "#08172A",
          900: "#040C15",
        },
        accent: {
          DEFAULT: "#4A8E9C",
          50:  "#F1F8FA",
          100: "#DAEAEE",
          200: "#B5D5DD",
          300: "#8FBFCC",
          400: "#6AAABA",
          500: "#4A8E9C", // ★ 브랜드 액센트
          600: "#3B727D",
          700: "#2C555E",
          800: "#1E393F",
          900: "#0F1C1F",
        },
        neutral: {
          0:   "#FFFFFF",
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        success: { DEFAULT: "#059669", 500: "#059669", 600: "#047857" },
        warning: { DEFAULT: "#D97706", 500: "#D97706", 600: "#B45309" },
        danger:  { DEFAULT: "#DC2626", 500: "#DC2626", 600: "#B91C1C" },
        info:    { DEFAULT: "#0EA5E9", 500: "#0EA5E9", 600: "#0284C7" },
      },

      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "맑은 고딕",
          "sans-serif",
        ],
        display: [
          "Pretendard Variable",
          "Pretendard",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },

      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }]
        "display-2xl": ["4rem", { lineHeight: "1.125", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-xl":  ["3.5rem", { lineHeight: "1.143", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-lg":  ["3rem", { lineHeight: "1.167", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md":  ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h1":          ["2.25rem", { lineHeight: "1.222", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2":          ["1.875rem", { lineHeight: "1.333", letterSpacing: "-0.015em", fontWeight: "700" }],
        "h3":          ["1.5rem", { lineHeight: "1.333", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h4":          ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h5":          ["1.125rem", { lineHeight: "1.444", letterSpacing: "-0.005em", fontWeight: "600" }],
        "body-lg":     ["1.125rem", { lineHeight: "1.667", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-md":     ["1rem", { lineHeight: "1.625", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-sm":     ["0.875rem", { lineHeight: "1.571", letterSpacing: "-0.005em", fontWeight: "400" }],
        "caption":     ["0.8125rem", { lineHeight: "1.385", letterSpacing: "0", fontWeight: "400" }],
        "overline":    ["0.75rem", { lineHeight: "1.333", letterSpacing: "0.08em", fontWeight: "600" }],
      },

      spacing: {
        // 4px 그리드 — Tailwind 기본 + 의료 사이트 자주 쓰는 보조값
        "18": "4.5rem",   // 72
        "22": "5.5rem",   // 88
        "26": "6.5rem",   // 104
        "30": "7.5rem",   // 120
      },

      maxWidth: {
        "container-narrow": "768px",
        "container-base":   "1200px",
        "container-wide":   "1440px",
      },

      borderRadius: {
        sm:  "0.25rem",  // 4
        md:  "0.5rem",   // 8
        lg:  "0.75rem",  // 12 — ★ 카드/버튼 기본
        xl:  "1rem",     // 16
        "2xl": "1.5rem", // 24
        "3xl": "2rem",   // 32
      },

      boxShadow: {
        // 모두 primary 톤이 살짝 섞인 푸른빛 그림자
        sm:    "0 1px 2px rgba(20, 58, 107, 0.05)",
        md:    "0 4px 12px rgba(20, 58, 107, 0.08)",
        lg:    "0 8px 24px rgba(20, 58, 107, 0.10)",
        xl:    "0 16px 48px rgba(20, 58, 107, 0.14)",
        card:  "0 2px 8px rgba(20, 58, 107, 0.06), 0 0 0 1px rgba(20, 58, 107, 0.04)",
        cta:   "0 8px 20px rgba(74, 142, 156, 0.30)", // accent용
        focus: "0 0 0 4px rgba(74, 142, 156, 0.20)",
      },

      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },

      transitionDuration: {
        fast:  "150ms",
        base:  "250ms",
        slow:  "400ms",
        hero:  "700ms",
      },

      backgroundImage: {
        "gradient-hero":
          "linear-gradient(90deg, rgba(8,23,42,0.65) 0%, rgba(20,58,107,0.30) 60%, rgba(20,58,107,0) 100%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(8,23,42,0.0) 50%, rgba(8,23,42,0.65) 100%)",
        "gradient-primary":
          "linear-gradient(135deg, #143A6B 0%, #4A8E9C 100%)",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to:   { transform: "translateX(0)" },
        },
        "dot-grow": {
          from: { width: "8px" },
          to:   { width: "32px" },
        },
      },

      animation: {
        "fade-in": "fade-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slide-in-right 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "dot-grow": "dot-grow 250ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
