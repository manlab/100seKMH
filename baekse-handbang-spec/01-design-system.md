# 01. 디자인 시스템 (Design Tokens)

> 이 문서의 모든 토큰은 `tailwind.config.ts` 와 `globals.css` 에 동일한 이름으로 매핑되어 있습니다. 두 파일이 SSOT(Single Source of Truth)이고, 이 문서는 사람이 읽기 위한 해설판입니다.

---

## 1. 컬러 팔레트

### 1.1 Primary — Deep Navy (브랜드 메인)

로고 "100 백세한방병원"의 글자색에서 추출. 헤더, 푸터, H1~H3, 주요 버튼, 테두리에 사용.

| Token | HEX | 용도 |
|---|---|---|
| `primary-50`  | `#F1F5FA` | 매우 옅은 배경 (섹션 구분용) |
| `primary-100` | `#DCE5F1` | 카드 hover, 비활성 칩 |
| `primary-200` | `#B7C7DD` | divider, 보조 보더 |
| `primary-300` | `#92A9C9` | placeholder, disabled 텍스트 |
| `primary-400` | `#4F6E9F` | 보조 텍스트 (링크 hover 등) |
| **`primary-500`** | **`#143A6B`** | **★ 브랜드 메인 — 헤더, H1, 1차 버튼, 강조 텍스트** |
| `primary-600` | `#102E55` | 1차 버튼 hover, 푸터 배경 |
| `primary-700` | `#0C2340` | 다크 모드 surface (선택) |
| `primary-800` | `#08172A` | 거의 검정에 가까운 음영 |
| `primary-900` | `#040C15` | 텍스트 maximum contrast |

### 1.2 Accent — Healing Teal (포인트)

로고 삼각형 마크에서 추출. CTA 보조 강조, 아이콘 컬러, 호버 라인, "더보기" 화살표, 데이터 시각화 포인트에 사용. **메인의 5~10%만 차지하도록 절제해서 사용.**

| Token | HEX | 용도 |
|---|---|---|
| `accent-50`  | `#F1F8FA` | hover 배경 |
| `accent-100` | `#DAEAEE` | 알림 배경 |
| `accent-200` | `#B5D5DD` | divider variant |
| `accent-300` | `#8FBFCC` | 비활성 아이콘 |
| `accent-400` | `#6AAABA` | 활성 아이콘 보조 |
| **`accent-500`** | **`#4A8E9C`** | **★ 포인트 — CTA 액센트, 화살표, 강조 라인** |
| `accent-600` | `#3B727D` | accent hover |
| `accent-700` | `#2C555E` | 진한 배경에 얹는 강조 |
| `accent-800` | `#1E393F` | 다크 surface |
| `accent-900` | `#0F1C1F` | 거의 사용 안 함 |

### 1.3 Neutral (Slate)

본문, 보더, 배경 전반. Tailwind 기본 `slate` 와 호환되도록 매핑.

| Token | HEX | 용도 |
|---|---|---|
| `neutral-0`   | `#FFFFFF` | 카드, 입력창 배경 |
| `neutral-50`  | `#F8FAFC` | 페이지 배경 (메인 BG) |
| `neutral-100` | `#F1F5F9` | 섹션 교차 배경 |
| `neutral-200` | `#E2E8F0` | 보더, divider |
| `neutral-300` | `#CBD5E1` | input border |
| `neutral-400` | `#94A3B8` | 보조 메타 (날짜 등) |
| `neutral-500` | `#64748B` | 본문 보조 텍스트 |
| `neutral-600` | `#475569` | **본문 (기본 텍스트)** |
| `neutral-700` | `#334155` | 강조 본문 |
| `neutral-800` | `#1E293B` | H4~H5 |
| `neutral-900` | `#0F172A` | 가장 진한 텍스트 (선택) |

### 1.4 Semantic

| Token | HEX | 용도 |
|---|---|---|
| `success-500` | `#059669` | 진료 가능, 예약 완료 |
| `warning-500` | `#D97706` | 점심시간, 휴진 안내 |
| `danger-500`  | `#DC2626` | 휴진일, 필수 입력 누락 |
| `info-500`    | `#0EA5E9` | 일반 안내 (잘 안 씀, 가능하면 accent로 대체) |

### 1.5 사용 비율 가이드 (60-30-10 룰)

- **60%** Neutral 0/50/100 — 페이지 배경과 카드
- **30%** Primary 500/600 — 헤더, 푸터, 타이틀, 1차 버튼
- **10%** Accent 500 — CTA 화살표, 핵심 강조, 차트 포인트

---

## 2. 타이포그래피

### 2.1 폰트 패밀리

```css
--font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
             "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif;
--font-display: "Pretendard Variable", Pretendard, sans-serif; /* 헤드라인용, weight 700~800 */
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
--font-tabular: var(--font-sans); /* font-feature-settings: "tnum" 1 */
```

Pretendard는 한글·영문·숫자가 모두 균형 잡힌 무료 가변 폰트. CDN(`https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css`) 또는 `npm i pretendard` 로 설치.

### 2.2 타입 스케일

기준: 1rem = 16px. 모든 텍스트는 `rem` 사용 (모바일 자동 축소를 위해).

| Token | size / line-height | weight | 용도 |
|---|---|---|---|
| `display-2xl` | 64 / 72 | 800 | 메인 비주얼 헤드라인 (데스크톱) |
| `display-xl`  | 56 / 64 | 800 | 메인 비주얼 헤드라인 (태블릿) |
| `display-lg`  | 48 / 56 | 700 | 서브 페이지 비주얼 |
| `display-md`  | 40 / 48 | 700 | 섹션 헤드라인 강조 |
| `h1` | 36 / 44 | 700 | 페이지 H1 |
| `h2` | 30 / 40 | 700 | 섹션 H2 |
| `h3` | 24 / 32 | 600 | 카드 타이틀 / 서브섹션 |
| `h4` | 20 / 28 | 600 | 리스트 헤더 |
| `h5` | 18 / 26 | 600 | 작은 섹션 |
| `body-lg` | 18 / 30 | 400 | 본문 강조 (인사말 등) |
| `body-md` | 16 / 26 | 400 | **★ 기본 본문** |
| `body-sm` | 14 / 22 | 400 | 보조 설명 |
| `caption` | 13 / 18 | 400 | 메타, 날짜, 캡션 |
| `overline` | 12 / 16 | 600 | 카테고리 라벨 (대문자, 자간 0.08em) |

모바일 (< 768px) 에서는 `display-*`, `h1~h2` 자동으로 한 단계 축소:
- `display-2xl` → 40 / 48
- `display-lg`  → 32 / 40
- `h1` → 28 / 36
- `h2` → 24 / 32

### 2.3 텍스트 디테일

- **letter-spacing**: 한글 본문 `-0.01em`, 헤드라인 `-0.02em` (Pretendard는 한글 자간이 살짝 넓어서 살짝 조여줌)
- **word-break**: `keep-all` (한글 어절 단위 줄바꿈)
- **숫자**: 전화번호·진료시간은 `font-variant-numeric: tabular-nums`
- **링크**: 본문 내 링크는 `text-primary-500 underline-offset-4 hover:underline`

---

## 3. 간격(Spacing) 스케일

4px 그리드 기반. Tailwind 기본 스케일과 동일.

| Token | px | 용도 예시 |
|---|---|---|
| `0`  | 0 | flush |
| `1`  | 4 | 아이콘과 텍스트 사이 |
| `2`  | 8 | 칩 패딩 |
| `3`  | 12 | 입력창 padding-y |
| `4`  | 16 | 카드 내부 작은 간격 |
| `5`  | 20 | 모바일 좌우 패딩 |
| `6`  | 24 | 카드 padding |
| `8`  | 32 | 컴포넌트 사이 |
| `10` | 40 | 섹션 내부 그룹 사이 |
| `12` | 48 | 카드 그리드 gap |
| `16` | 64 | 섹션 사이 (모바일) |
| `20` | 80 | 섹션 사이 (데스크톱) |
| `24` | 96 | 큰 섹션 사이 |
| `32` | 128 | 히어로 후 첫 섹션 |

### 3.1 컨테이너 / 그리드

```
container.narrow = 768px   (글 위주: 인사말, 약관)
container.base   = 1200px  (★ 기본 — 카드 그리드, 콘텐츠 영역)
container.wide   = 1440px  (히어로 영역, 풀브리드 시각화)
```

좌우 패딩(gutter):
- 모바일 (< 640px): 20px
- 태블릿 (640~1024px): 32px
- 데스크톱 (≥ 1024px): 40px

12-column grid, gap = 24px (데스크톱) / 16px (모바일).

### 3.2 섹션 vertical rhythm

```
section.spacing.sm = py-12  (48px)  — 보조 섹션
section.spacing.md = py-16  (64px)  — 일반 섹션 (모바일 기본)
section.spacing.lg = py-20  (80px)  — 데스크톱 기본
section.spacing.xl = py-24  (96px)  — 강조 섹션
```

---

## 4. 라운딩 / 그림자 / 보더

### 4.1 Border Radius

| Token | px | 용도 |
|---|---|---|
| `rounded-sm` | 4 | 작은 칩 |
| `rounded-md` | 8 | 입력창, 작은 카드 |
| `rounded-lg` | 12 | **★ 일반 카드, 버튼** |
| `rounded-xl` | 16 | 큰 카드, 모달 |
| `rounded-2xl` | 24 | 히어로 카드 |
| `rounded-3xl` | 32 | 블록 시각 강조 |
| `rounded-full` | 9999 | 아이콘 버튼, 아바타 |

### 4.2 Shadow (모두 primary 톤이 살짝 섞인 푸른빛 그림자)

```css
--shadow-sm:  0 1px 2px  rgba(20, 58, 107, 0.05);
--shadow-md:  0 4px 12px rgba(20, 58, 107, 0.08);
--shadow-lg:  0 8px 24px rgba(20, 58, 107, 0.10);
--shadow-xl:  0 16px 48px rgba(20, 58, 107, 0.14);
--shadow-card: 0 2px 8px rgba(20, 58, 107, 0.06), 0 0 0 1px rgba(20, 58, 107, 0.04);
--shadow-cta:  0 8px 20px rgba(74, 142, 156, 0.30);  /* accent용 — CTA 버튼에만 */
```

### 4.3 Border

- 기본 보더: `1px solid var(--neutral-200)` (= `#E2E8F0`)
- 강조 보더: `1px solid var(--primary-200)`
- 입력창 focus: `2px solid var(--accent-500)` + outline 제거

---

## 5. 모션 / 트랜지션

```css
--ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);  /* 모든 hover, slide */
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1); /* 시퀀셜 진입 */
--duration-fast: 150ms;  /* 마이크로 인터랙션 (버튼 색상) */
--duration-base: 250ms;  /* ★ 기본 — hover, 카드 lift */
--duration-slow: 400ms;  /* 페이지 진입, 큰 변화 */
--duration-hero: 700ms;  /* 히어로 슬라이드 페이드 */
```

기본 hover 패턴:
```css
.card { transition: all var(--duration-base) var(--ease-out-soft); }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
```

---

## 6. 컴포넌트 스타일 가이드

### 6.1 버튼

세 가지 변형 + 두 가지 크기 + 두 가지 상태(default/hover).

```tsx
// Primary (1차 액션)
"bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg"

// Secondary (2차)
"bg-white text-primary-500 border border-primary-500 hover:bg-primary-50"

// Accent CTA (전화/예약 같은 핵심 1개)
"bg-accent-500 text-white hover:bg-accent-600 shadow-cta"

// Ghost (메뉴 / 연결만)
"text-primary-500 hover:text-accent-600 hover:underline underline-offset-4"
```

크기:
- `lg`: padding 16px 28px, font-size 16px, line-height 24px → 총 56px 높이
- `md` (★기본): padding 12px 22px, font-size 15px → 총 44px 높이
- `sm`: padding 8px 16px, font-size 13px → 총 32px 높이

라운딩: `rounded-lg`. 가장 강조하는 메인 CTA 버튼만 `rounded-full` (캡슐).

### 6.2 카드

3가지 카드 타입:

**(a) 진료 카테고리 카드** — 메인 페이지의 6개 클리닉 안내
- 비율: 4:5 (세로형) on desktop, 16:9 on mobile
- 배경: `bg-image` 이미지 + 그라디언트 오버레이 (`from-primary-900/70 to-primary-500/20`)
- 텍스트: 흰색 H3 + body-sm 설명 + 화살표 아이콘 (accent-300)
- hover: 이미지 scale 1.05, 그라디언트 더 어둡게

**(b) 일반 정보 카드** — 의료진, 시설, FAQ
- 배경: `bg-white`
- 보더: `border border-neutral-200`
- 그림자: `shadow-card` (기본) / `shadow-lg` (hover)
- 라운딩: `rounded-xl`
- 패딩: 24px (모바일) / 32px (데스크톱)

**(c) 프로미넌트 카드** — 진료시간, 대표번호 같은 핵심 정보
- 배경: `bg-primary-500` 또는 `bg-primary-50`
- 텍스트: 흰색 또는 primary-900
- 강조 숫자: `font-display` `text-display-md`

### 6.3 입력창

```
height: 48px (mobile) / 52px (desktop)
border: 1px solid neutral-300
radius: rounded-md (8px)
padding: 0 16px
focus: border-accent-500, ring-4 ring-accent-100
font: body-md
placeholder: neutral-400
```

라벨은 위에 띄우는 방식 (floating 라벨 X) — 의료 사이트는 명확함이 우선.

### 6.4 네비게이션

**Top GNB (데스크톱, ≥1024px)**:
- 높이: 96px (로고 영역 56px + 메뉴 영역 56px) — 미래한방병원처럼 2단 레이아웃
- 배경: `bg-white`, 스크롤 시 `shadow-md` + 높이 64px로 축소
- 메뉴: H4 사이즈, primary-700, hover 시 accent-500 + 하단 2px accent 언더라인 (transition)
- 메가 메뉴: hover 시 펼쳐지는 2depth, 흰 배경 + 좌측 카테고리 설명 + 우측 메뉴 리스트

**Mobile GNB (< 1024px)**:
- 햄버거 → 풀스크린 오버레이 (오른쪽에서 슬라이드)
- 배경: `bg-primary-500` 또는 흰색 + 좌측 4px accent 라인
- 메뉴: 1depth 클릭 시 아코디언으로 2depth 펼침
- 하단 고정 영역: 전화/상담 quick CTA (3개 버튼 그리드)

### 6.5 히어로 슬라이더

- 비율: 1920x720 (≥3:1) / 모바일 16:9
- 슬라이드 3장, 자동 전환 6초, 페이드 트랜지션
- 텍스트는 좌측 정렬 (50% 폭), 배경 이미지 우측 정렬
- 텍스트 영역에 `bg-gradient-to-r from-primary-900/60 via-primary-700/30 to-transparent`
- dot 인디케이터: 하단 중앙, 활성 dot은 accent-500 길게 늘어남 (32px)

### 6.6 푸터

- 배경: `bg-primary-700`
- 텍스트: `text-primary-100` 본문, `text-white` 강조
- 4단 그리드 (≥768px): [로고+소개] [진료안내] [고객지원] [SNS+연락처]
- 모바일: 1단 스택, 각 섹션 아코디언

### 6.7 모바일 하단 고정 퀵 메뉴

미래한방병원에도 있는 패턴 — **모바일에서는 무조건 필수**. 4분할 그리드, 높이 64px, 흰 배경 + 상단 1px 보더.

```
[온라인상담] [전화걸기] [진료시간] [블로그/카톡]
```

전화걸기 버튼만 accent-500 배경 + 흰 글자로 강조.

---

## 7. 아이콘

- **시스템 아이콘**: `lucide-react` (24px 기준, stroke-width 1.5)
- **진료 카테고리 아이콘**: 커스텀 SVG 6세트
  - 척추·관절: 척추 실루엣
  - 추나·교정: 자세 라인
  - 교통사고: 차량 + 십자
  - 면역·만성: 방패 + 약초
  - 여성·소아: 어머니와 아이 라인
  - 한약·보양: 탕약 그릇 + 약초
- 색상: 기본 `text-primary-500`, hover/활성 `text-accent-500`

---

## 8. 접근성 / 반응형 / 다크모드

### 접근성
- 모든 컬러 조합 WCAG AA 통과 (text-on-primary-500: 7.5:1 ✓)
- focus visible: `ring-2 ring-accent-500 ring-offset-2`
- skip-to-content 링크 포함
- alt 텍스트, aria-label 누락 금지
- 글자 크기 200% 확대해도 레이아웃 깨지지 않게

### 반응형 (Tailwind 기본 브레이크포인트)
```
sm:  640px
md:  768px
lg:  1024px  ← 데스크톱 GNB 전환점
xl:  1280px  ← 메인 컨테이너
2xl: 1536px
```

모바일 우선 (mobile-first) 작성.

### 다크모드
**지원하지 않음** (의료 사이트 특성상 항상 라이트). `prefers-color-scheme: dark` 도 무시. body에 `color-scheme: light` 명시.

---

## 9. 한국 의료 사이트 특화 규칙

- **본문 줄바꿈**: 한국어 의료 정보는 한 문장이 2~3줄 이상 길어지면 가독성 급락. 카피 작성 시 한 문장 35자 내외로 끊기.
- **숫자 강조**: "1년 365일", "031-0000-0000" 같은 숫자는 항상 `font-display` + 색상 강조.
- **지도**: 카카오맵이 한국에서 가장 익숙. 좌표는 WGS84.
- **법정 표기 의무**: 병원명, 대표자, 주소, 사업자등록번호, 의료기관 종별 → 푸터에 누락 없이.
- **광고법 주의**: 의료광고 심의 대상 표현 ("최고", "유일", 환자 후기 직접 인용) 회피. "전문적", "체계적", "맞춤형" 같은 안전한 표현 위주.
