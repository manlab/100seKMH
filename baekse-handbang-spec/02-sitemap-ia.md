# 02. 사이트맵 / 정보 구조 (IA) / 라우트

> Next.js 14 App Router 기준 폴더 구조 1:1 매핑.

---

## 1. 사이트맵 (한눈에 보기)

```
/  (메인)
├─ /about                       백세한방병원
│  ├─ /about/greeting             인사말
│  ├─ /about/doctors              의료진 소개
│  ├─ /about/facility             시설 둘러보기
│  ├─ /about/herbal               한약·탕전 안내
│  ├─ /about/admission            입원 안내
│  ├─ /about/hours                진료시간
│  └─ /about/location             오시는 길
│
├─ /spine                       척추·관절 클리닉
│  ├─ /spine/disc                 디스크 (목/허리)
│  ├─ /spine/stenosis             척추관협착증
│  ├─ /spine/shoulder             오십견·회전근개
│  ├─ /spine/knee                 무릎관절통
│  └─ /spine/sports               스포츠 손상
│
├─ /posture                     추나·체형교정
│  ├─ /posture/scoliosis          척추측만증
│  ├─ /posture/forward-head       일자목·거북목
│  ├─ /posture/pelvis             골반 비대칭·휜다리
│  └─ /posture/postnatal          산후 체형교정
│
├─ /accident                    교통사고 한방치료
│  ├─ /accident/aftercare         교통사고 후유증
│  ├─ /accident/insurance         자동차보험 진료절차
│  └─ /accident/system            치료·입원 시스템
│
├─ /immunity                    면역·만성 클리닉
│  ├─ /immunity/rhinitis          비염·천식
│  ├─ /immunity/fatigue           만성피로
│  ├─ /immunity/sleep             수면장애·두통
│  └─ /immunity/cold-hand-foot    수족냉증
│
├─ /women-kids                  여성·소아 클리닉
│  ├─ /women-kids/postnatal-care   산후조리
│  ├─ /women-kids/menstruation     생리통·월경불순
│  ├─ /women-kids/menopause        갱년기
│  ├─ /women-kids/growth           성장 클리닉
│  └─ /women-kids/chongmyeong      총명탕
│
├─ /community                   커뮤니티
│  ├─ /community/notice            공지사항
│  ├─ /community/notice/[id]       공지 상세
│  ├─ /community/counsel           온라인 상담 (글쓰기/리스트)
│  ├─ /community/counsel/[id]      상담 상세
│  ├─ /community/faq               자주묻는 질문
│  ├─ /community/non-covered       비급여 항목 안내
│  └─ /community/documents         서류 발급 안내
│
└─ /legal                       법적 고지
   ├─ /legal/terms                  이용약관
   ├─ /legal/privacy                개인정보처리방침
   └─ /legal/patient-rights         환자 권리장전
```

총 **루트 1 + 카테고리 7 + 세부 36 ≈ 44개 페이지** (동적 상세 제외).

---

## 2. App Router 폴더 구조

```
app/
├─ layout.tsx                    # 루트 레이아웃 (헤더, 푸터, 폰트, 메타)
├─ page.tsx                      # 메인
├─ globals.css                   # CSS 변수
├─ not-found.tsx                 # 404
├─ error.tsx                     # 에러 바운더리
│
├─ (marketing)/                  # 라우트 그룹: 마케팅성 페이지 공통 레이아웃
│  ├─ layout.tsx                  # 서브 비주얼 + LNB 포함 레이아웃
│  ├─ about/
│  │  ├─ greeting/page.tsx
│  │  ├─ doctors/page.tsx
│  │  ├─ facility/page.tsx
│  │  ├─ herbal/page.tsx
│  │  ├─ admission/page.tsx
│  │  ├─ hours/page.tsx
│  │  └─ location/page.tsx
│  ├─ spine/
│  │  ├─ disc/page.tsx
│  │  └─ ...
│  ├─ posture/
│  ├─ accident/
│  ├─ immunity/
│  └─ women-kids/
│
├─ community/
│  ├─ layout.tsx
│  ├─ notice/
│  │  ├─ page.tsx                  # 리스트
│  │  └─ [id]/page.tsx             # 상세
│  ├─ counsel/
│  │  ├─ page.tsx
│  │  ├─ new/page.tsx              # 글쓰기
│  │  └─ [id]/page.tsx
│  ├─ faq/page.tsx
│  ├─ non-covered/page.tsx
│  └─ documents/page.tsx
│
├─ legal/
│  ├─ terms/page.tsx
│  ├─ privacy/page.tsx
│  └─ patient-rights/page.tsx
│
└─ api/
   ├─ counsel/route.ts            # 상담 글 등록
   └─ contact/route.ts            # 문의 (선택)

components/
├─ layout/
│  ├─ Header.tsx                   # 데스크톱 GNB
│  ├─ MobileNav.tsx
│  ├─ Footer.tsx
│  ├─ MobileQuickBar.tsx           # 하단 고정
│  ├─ SubVisual.tsx                # 서브페이지 상단 비주얼
│  └─ Lnb.tsx                      # 좌측 보조 네비
├─ home/
│  ├─ HeroSlider.tsx
│  ├─ ClinicCardGrid.tsx
│  ├─ AboutBanner.tsx
│  ├─ NoticeBoard.tsx
│  ├─ QuickService.tsx
│  ├─ LocationMap.tsx
│  ├─ HoursCard.tsx
│  └─ BottomCta.tsx
├─ ui/                            # 디자인 시스템 컴포넌트
│  ├─ Button.tsx
│  ├─ Card.tsx
│  ├─ Section.tsx
│  ├─ Container.tsx
│  ├─ Heading.tsx
│  ├─ Tag.tsx
│  ├─ Accordion.tsx
│  ├─ Tabs.tsx
│  └─ ...
└─ icons/
   └─ ClinicIcons.tsx              # 6개 진료 카테고리 커스텀 SVG

lib/
├─ navigation.ts                   # 메뉴 데이터 (단일 출처)
├─ seo.ts                          # 페이지별 메타 생성
├─ format.ts                       # 전화번호, 날짜 포맷
└─ map.ts                          # 카카오맵 로더

content/                           # MDX 또는 JSON 콘텐츠
├─ clinics/                        # 진료 페이지 콘텐츠
├─ doctors.json
├─ facility.json
└─ faq.json

public/
├─ images/
│  ├─ logo/                        # 로고 SVG/PNG
│  ├─ hero/                        # 메인 비주얼
│  ├─ doctors/                     # 의료진 사진
│  ├─ facility/                    # 시설 사진
│  └─ clinic/                      # 진료 페이지 비주얼
└─ favicon.ico, og-image.jpg, etc.
```

---

## 3. 글로벌 네비게이션 (메가 메뉴)

데스크톱 헤더는 미래한방병원 스타일과 유사하게 **2단 구조**(상단 유틸리티 + 하단 GNB).

### 3.1 상단 유틸리티 바

좌측 로고 / 우측 [로그인] [회원가입] [오시는 길] [전화 031-XXX-XXXX]
모바일에서는 햄버거 + 로고 + 전화 아이콘만.

### 3.2 GNB (메가 메뉴)

| 1depth | 2depth |
|---|---|
| 백세한방병원 | 인사말 / 의료진 / 시설 / 한약·탕전 / 입원안내 / 진료시간 / 오시는 길 |
| 척추·관절 | 디스크 / 협착증 / 오십견 / 무릎관절 / 스포츠 손상 |
| 추나·교정 | 척추측만증 / 일자목·거북목 / 골반·휜다리 / 산후교정 |
| 교통사고 | 후유증 / 자동차보험 절차 / 치료·입원 시스템 |
| 면역·만성 | 비염·천식 / 만성피로 / 수면·두통 / 수족냉증 |
| 여성·소아 | 산후조리 / 생리통 / 갱년기 / 성장 / 총명탕 |
| 커뮤니티 | 공지사항 / 온라인 상담 / FAQ / 비급여 / 서류발급 |

### 3.3 LNB (서브 페이지 좌측 네비)

서브 페이지에서는 좌측에 LNB 고정. 1depth 카테고리 아래 현재 카테고리의 모든 2depth가 펼쳐져 있고, 현재 페이지는 accent-500 배경으로 강조.

---

## 4. 메인 페이지 섹션 순서

1. **Hero Slider** (3장 자동슬라이드)
2. **Clinic Card Grid** (6개 진료 카테고리 카드 + 의료진 소개 카드)
3. **About Banner** ("백세 건강을 위한 정성스러운 한방진료" 같은 강조 띠)
4. **Notice / Quick Service** (3단: 공지사항 + 블로그/웹툰 + 자주찾는 서비스)
5. **Location + Hours** (지도 + 진료시간 + 대표번호)
6. **Bottom CTA** (개원 안내 / 평일·토요일 진료시간 강조 배너)
7. **Footer**

(상세는 `03-content-spec.md` 참고)

---

## 5. URL / SEO 규칙

- 모든 라우트는 lowercase, kebab-case
- 메타 타이틀 패턴: `{페이지명} - 백세한방병원`
- 메타 디스크립션: 페이지마다 자연어 1~2문장 (140자 이내)
- og:image: 페이지별 비주얼이 있으면 그것, 없으면 기본 og-image.jpg
- canonical 자동 설정
- sitemap.xml 자동 생성 (`next-sitemap` 또는 App Router의 `sitemap.ts`)
- robots.txt: 전체 허용 + admin 경로(`/community/counsel/new` 등) 일부 disallow
- 구조화 데이터 (JSON-LD):
  - 메인: `MedicalOrganization` + `MedicalClinic` + `LocalBusiness`
  - 진료 페이지: `MedicalCondition` + `MedicalProcedure`
  - 의료진: `Physician`
  - FAQ 페이지: `FAQPage`
  - 위치: `Place` + `GeoCoordinates`

---

## 6. 분석 / 마케팅 태그 슬롯

`<head>` 또는 `<body>` 끝에 들어갈 자리만 미리 비워둠 (실제 ID는 개원 후 발급):

- Google Analytics 4 (GA4)
- Google Search Console verification
- Naver Search Advisor verification
- 네이버 애널리틱스 (wcs)
- Meta Pixel (광고 집행 시)
- 카카오 픽셀 (선택)

`lib/analytics.ts` 에서 일괄 관리, 환경변수로 ON/OFF.

---

## 7. 데이터 소스 / 백엔드 전략

개원 초기에는 **헤드리스 백엔드 없이** 다음 방식으로 운영 가능:

| 영역 | 1차(개원 직후) | 2차(트래픽 늘면) |
|---|---|---|
| 의료진/시설/진료 콘텐츠 | MDX/JSON 파일 | Sanity / Strapi |
| 공지사항 | MDX 파일 | DB + 어드민 |
| 온라인 상담 | API Route → DB 저장 | DB + 어드민 + 답변 페이지 |
| FAQ | JSON | CMS |
| 비급여 항목 | 정적 표 (CSV → JSON) | CMS |

`api/counsel/route.ts` 는 상담 내용을 DB에 저장하고 어드민에서 확인·답변하는 흐름으로 운영한다.

---

## 8. 페이지 우선순위 (개원 D-Day까지 빌드 순서)

**P0 — 개원일에 무조건 있어야**
- `/` 메인
- `/about/greeting`, `/about/doctors`, `/about/hours`, `/about/location`
- `/community/notice` (개원 안내 1건)
- 푸터의 법적 페이지 3개 (`/legal/*`)

**P1 — 개원 1~2주 안에**
- 진료 카테고리 1depth 인트로 페이지 6개 (각 카테고리 첫 진입)
- `/about/facility`
- `/community/non-covered`

**P2 — 개원 1개월 안에**
- 모든 진료 2depth 상세 페이지
- `/community/counsel`, `/community/faq`
- `/about/herbal`, `/about/admission`

**P3 — 운영하면서**
- 블로그/웹툰 연동, 후기 게시판, 영상 콘텐츠
