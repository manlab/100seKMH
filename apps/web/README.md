# 백세한방병원 웹사이트

Next.js 14 App Router + TypeScript strict + Tailwind CSS 3.4 + Pretendard. 온라인 상담은 Postgres(Neon) + Drizzle ORM + 어드민 콘솔.

> **GitHub → Vercel 배포 흐름**: 상세 셋업·운영은 [`DEPLOY.md`](./DEPLOY.md) 참고.

## 로컬 개발 (선택)

```bash
cd apps/web
npm install
cp .env.example .env.local   # POSTGRES_URL, 암호화 키 등
npm run dev                  # http://localhost:3030
```

## 빌드 / 타입체크

```bash
npm run type-check           # tsc --noEmit
npm run build                # drizzle-kit migrate && next build
npm run start                # production 서버 (port 3030)
npm run db:generate          # 스키마 변경 후 마이그레이션 SQL 생성
npm run db:studio            # Drizzle Studio (DB 시각화)
```

## 환경변수 (필수)

| 키 | 설명 | 예시 |
|---|---|---|
| `POSTGRES_URL` | Neon 연결 (Vercel 자동 주입) | `postgres://...neon.tech/...` |
| `POSTGRES_URL_NON_POOLING` | 마이그레이션용 (Vercel 자동 주입) | `postgres://...` |
| `PHONE_ENC_KEY` | 식별·민감정보 AES-256 키 (hex 64자) | `openssl rand -hex 32` |
| `ADMIN_SESSION_SECRET` | 어드민 세션 토큰 비밀 (≥32자) | `openssl rand -hex 32` |
| `ADMIN_SEED_TOKEN` | 첫 어드민 1회 생성용 토큰 | `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | 사이트 공개 URL | `https://baeksehospital.kr` |

## Vercel 배포

### 모노레포 — 반드시 Root Directory 지정

이 프로젝트는 모노레포 구조입니다 (`/apps/web`이 Next.js 앱). Vercel 프로젝트 생성 시:

| 설정 | 값 |
|---|---|
| **Framework Preset** | Next.js (자동 감지) |
| **Root Directory** | `apps/web` ⚠️ 필수 |
| **Build Command** | `npm run build` (`drizzle-kit migrate && next build`) |
| **Output Directory** | `.next` (기본) |
| **Install Command** | `npm install` (기본) |

**Region**: `icn1` (서울) — `vercel.json`에 명시되어 있어 자동 적용

### 배포 옵션

**A. GitHub 연동 (권장)** — push 자동 배포
1. GitHub repo 생성 후 push
2. Vercel 대시보드 → "Add New" → "Project" → repo 선택
3. Root Directory를 `apps/web`로 변경
4. 환경변수 입력 (위 표 참고)
5. "Deploy" 클릭

**B. Vercel CLI 직접 배포**
```bash
npm i -g vercel
cd apps/web
vercel              # 첫 배포 — Root, 환경변수 등 인터랙티브 설정
vercel --prod       # 이후 production 배포
```

## 도메인 연결

Vercel Project Settings → Domains → Add Domain:
- `baeksehospital.kr` (구매한 도메인 입력)
- Vercel이 표시하는 DNS 레코드(A/CNAME)를 도메인 등록 업체(가비아·후이즈 등)의 DNS 관리에 등록
- 자동 SSL 발급 (Let's Encrypt)

## 프로젝트 구조

```
apps/web/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (Header/Footer/MobileQuickBar)
│   ├── page.tsx                # 메인
│   ├── not-found.tsx           # 404
│   ├── error.tsx               # 500 boundary
│   ├── sitemap.ts              # /sitemap.xml 자동 생성
│   ├── robots.ts               # /robots.txt 자동 생성
│   ├── api/counsel/route.ts    # 온라인 상담 API
│   └── {about,spine,...}/      # 41개 페이지
├── components/
│   ├── layout/                 # Header, Footer, MobileDrawer, SubVisual, Lnb...
│   ├── ui/                     # Button, Section, Eyebrow, FaqAccordion, InContentCta
│   └── icons/BrandLogo.tsx     # 인라인 SVG 풀 로고
├── lib/
│   ├── cn.ts                   # className 병합
│   ├── navigation.ts           # ROUTES + GNB (single source)
│   ├── site.ts                 # 사이트 메타·연락처 placeholder
│   ├── seo.ts                  # pageMeta, JSON-LD 헬퍼
│   ├── env.ts                  # 타입-안전 ENV 액세스
│   ├── counsel-schema.ts       # zod 스키마 (클라/서버 공유)
│   └── rate-limit.ts           # 인메모리 IP rate limit
└── public/favicon.svg
```

## 주요 기능

- **42개 페이지** (메인 1 + 클리닉 5 + 2depth 21 + about 7 + 커뮤니티 5 + 법적 3) + 404/500/sitemap/robots
- **온라인 상담**: react-hook-form + zod + DB 저장·어드민 답변, honeypot, IP rate limit
- **SEO**: JSON-LD (MedicalOrganization, MedicalCondition, FAQPage), sitemap, robots, canonical, OG
- **접근성**: skip-link, aria-label, focus-visible, reduced-motion, semantic HTML
- **반응형**: Mobile drawer + Mobile QuickBar, max-w-container-base 1320px

## 운영 체크리스트 (개원 D-day)

- [ ] `lib/site.ts` placeholder를 실제 값으로 교체 (전화·주소·사업자번호·대표자명)
- [ ] 의료진 사진/약력 (`app/about/doctors/page.tsx`)
- [ ] 시설 사진 18~22장 (`app/about/facility/page.tsx`)
- [ ] 구글 지도 임베드 확인 (`/about/location`)
- [ ] 약관/개인정보 법무 검토 (`app/legal/*`)
- [ ] 비급여 항목 표 확정 (`app/community/non-covered/page.tsx`)
- [ ] 네이버 서치어드바이저·구글 서치콘솔 등록 + sitemap 제출
- [ ] Lighthouse Mobile 90+ 검증

---

© 2026 BAEKSE KOREAN MEDICINE HOSPITAL.
