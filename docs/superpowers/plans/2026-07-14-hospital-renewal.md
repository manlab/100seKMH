# 백세한방병원 홈페이지 리뉴얼 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 원고의 7개 GNB 구조와 신규 진료 안내 페이지를 구현하면서 기존 검색 유입과 의료광고 검토 게이트를 보존한다.

**Architecture:** `apps/web/lib/navigation.ts`를 전역 메뉴와 신규 URL의 단일 정보원으로 확장한다. 신규 랜딩·하위 페이지는 현재 `SubLayout` 기반으로 만들고, Next.js `redirect()`를 이용해 오래된 척추·추나·수면 경로를 새 canonical 경로로 308 이관한다. sitemap은 새 공개 경로와 GNB에서 제거되어도 유지되는 기존 임상 경로를 모두 포함한다.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS 3, Lucide React, Vercel.

## Global Constraints

- 의료 결과·기간·비용·안전성·재발 방지를 보장하거나 비교 우위를 주장하는 문구를 새로 공개하지 않는다.
- 확정 전인 층별 시설, 지도 서비스, 협력기관, 의료진·진료 자격 정보는 기존 검증된 정보만 유지한다.
- 기존 URL의 경로 보존은 `redirect()`가 내보내는 308 영구 리다이렉트를 사용한다.
- 새 페이지는 `pageMeta`로 canonical, Open Graph, Twitter 메타데이터를 제공한다.
- 모든 텍스트 블록은 한국어 줄바꿈을 고려해 기존 `text-balanced`, `leading-relaxed` 패턴을 따른다.
- 사용자가 만든 기존 미커밋 변경을 되돌리거나 덮어쓰지 않는다.

---

### Task 1: 리뉴얼 정보구조와 공통 링크 데이터 적용

**Files:**
- Modify: `apps/web/lib/navigation.ts`
- Modify: `apps/web/app/page.tsx`
- Modify: `apps/web/app/not-found.tsx`
- Modify: `apps/web/components/layout/Footer.tsx`
- Test: `apps/web/scripts/verify-renewal-routes.mjs`

**Interfaces:**
- Consumes: `NavItem`, `ROUTES`, `GNB`, `FOOTER_LINKS` from `apps/web/lib/navigation.ts`.
- Produces: `ROUTES.cancer`, `ROUTES.autonomic`, `ROUTES.spineJoint`, `ROUTES.diet`; all header, drawer, LNB, footer, sitemap consumers use the revised `GNB` data.

- [ ] **Step 1: Write route-data verification script**

Create `apps/web/scripts/verify-renewal-routes.mjs` to import the built sitemap output through HTTP and validate the routes below after the server starts:

```js
const expectedPublicPaths = [
  "/cancer", "/cancer/post-surgery", "/cancer/chemo-care", "/cancer/recurrence-care",
  "/autonomic", "/autonomic/self-check", "/autonomic/care",
  "/spine-joint", "/spine-joint/chuna", "/spine-joint/manual-therapy",
  "/spine-joint/disc", "/spine-joint/stenosis", "/spine-joint/shoulder",
  "/spine-joint/knee", "/spine-joint/sports",
  "/diet", "/diet/causes", "/diet/guide",
];

for (const path of expectedPublicPaths) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${path} must be public`);
}
```

- [ ] **Step 2: Run the script before implementation**

Run: `node apps/web/scripts/verify-renewal-routes.mjs http://127.0.0.1:3030`

Expected: failure because the new routes do not exist.

- [ ] **Step 3: Extend navigation data**

Add route groups and use these GNB entries in order:

```ts
{ label: "백세한방병원", href: ROUTES.about.greeting, children: [
  { label: "병원소개", href: ROUTES.about.greeting },
  { label: "의료진 소개", href: ROUTES.about.doctors },
  { label: "층별 안내", href: ROUTES.about.facility },
  { label: "오시는 길", href: ROUTES.about.location },
] },
{ label: "암 통합치료", href: ROUTES.cancer.root, children: [...] },
{ label: "교통사고", href: ROUTES.accident.root, children: [...] },
{ label: "자율신경실조증", href: ROUTES.autonomic.root, children: [...] },
{ label: "척추관절통증", href: ROUTES.spineJoint.root, children: [...] },
{ label: "다이어트", href: ROUTES.diet.root, children: [...] },
{ label: "커뮤니티", href: ROUTES.community.notice, children: [...] },
```

Retain `ROUTES.spine`, `ROUTES.posture`, `ROUTES.immunity`, and `ROUTES.womenKids` so legacy pages compile until their explicit migration tasks run. Revise `FOOTER_LINKS.clinics` to point only to the new public clinical roots plus 교통사고.

- [ ] **Step 4: Update home and 404 navigation**

Replace clinic card destinations and labels in `apps/web/app/page.tsx` with the new GNB structure. Keep the home hero image and the existing no-gradient work unchanged. Ensure `apps/web/app/not-found.tsx` continues to list the first six clinical/intro GNB entries without assuming the old labels.

- [ ] **Step 5: Run route-data type verification**

Run: `npm run type-check --prefix apps/web`

Expected: exit code 0.

- [ ] **Step 6: Commit**

```bash
git add apps/web/lib/navigation.ts apps/web/app/page.tsx apps/web/app/not-found.tsx apps/web/components/layout/Footer.tsx apps/web/scripts/verify-renewal-routes.mjs
git commit -m "feat(web): adopt renewal navigation structure"
```

### Task 2: 암 통합치료와 자율신경실조증 페이지 구현

**Files:**
- Create: `apps/web/app/cancer/page.tsx`
- Create: `apps/web/app/cancer/post-surgery/page.tsx`
- Create: `apps/web/app/cancer/chemo-care/page.tsx`
- Create: `apps/web/app/cancer/recurrence-care/page.tsx`
- Create: `apps/web/app/autonomic/page.tsx`
- Create: `apps/web/app/autonomic/self-check/page.tsx`
- Create: `apps/web/app/autonomic/care/page.tsx`
- Modify: `apps/web/app/sitemap.ts`
- Test: `apps/web/scripts/verify-renewal-routes.mjs`

**Interfaces:**
- Consumes: `ROUTES.cancer`, `ROUTES.autonomic`, `GNB`, `pageMeta`, `SubLayout`, `InContentCta`.
- Produces: seven public server-rendered pages with canonical metadata and valid LNB data.

- [ ] **Step 1: Add the failing route checks**

Use the Task 1 script and confirm all `/cancer/*` and `/autonomic/*` checks fail before their page files exist.

- [ ] **Step 2: Build shared safe-copy page composition**

For each root page, use this layout sequence: `SubLayout` hero, overview, three linked topics, care-process explanation, consultation CTA. Use explanatory copy such as “진료 시 현재 상태와 치료 계획을 함께 안내합니다.” Do not use “완치”, “재발 방지”, “효과 보장”, “안전한 치료”, or fixed duration/cost copy.

- [ ] **Step 3: Build cancer child pages**

Create each cancer child page with: a condition-specific heading, an explanatory scope section, a “진료 전 확인” list, and a consultation CTA. The recurrence page must state that standard cancer treatment decisions are made with the relevant treating medical team and must not imply replacement of surgery, chemotherapy, radiation therapy, or follow-up.

- [ ] **Step 4: Build autonomic child pages**

The self-check page must render the eight supplied check items as an unchecked list. Place this disclaimer immediately after the list:

```tsx
<p className="mt-5 text-sm leading-relaxed text-neutral-600">
  이 항목은 진단을 위한 검사가 아니며, 증상이 지속되거나 일상에 불편이 있다면 의료진과 상담해 주세요.
</p>
```

The care page must explain that assessment and care plans depend on the individual’s symptoms and medical history, without score, duration, cost, or outcome claims.

- [ ] **Step 5: Add sitemap entries**

Add the 7 new paths manually or derive them from `GNB` and confirm no duplicate path appears in `sitemap()` output.

- [ ] **Step 6: Run route checks and type check**

Run:

```bash
node apps/web/scripts/verify-renewal-routes.mjs http://127.0.0.1:3030
npm run type-check --prefix apps/web
```

Expected: all cancer and autonomic paths return 200; type check exits 0.

- [ ] **Step 7: Commit**

```bash
git add apps/web/app/cancer apps/web/app/autonomic apps/web/app/sitemap.ts apps/web/scripts/verify-renewal-routes.mjs
git commit -m "feat(web): add cancer and autonomic care guides"
```

### Task 3: 척추관절통증과 다이어트 페이지 구현

**Files:**
- Create: `apps/web/app/spine-joint/page.tsx`
- Create: `apps/web/app/spine-joint/chuna/page.tsx`
- Create: `apps/web/app/spine-joint/manual-therapy/page.tsx`
- Create: `apps/web/app/spine-joint/disc/page.tsx`
- Create: `apps/web/app/spine-joint/stenosis/page.tsx`
- Create: `apps/web/app/spine-joint/shoulder/page.tsx`
- Create: `apps/web/app/spine-joint/knee/page.tsx`
- Create: `apps/web/app/spine-joint/sports/page.tsx`
- Create: `apps/web/app/diet/page.tsx`
- Create: `apps/web/app/diet/causes/page.tsx`
- Create: `apps/web/app/diet/guide/page.tsx`
- Modify: `apps/web/app/sitemap.ts`
- Test: `apps/web/scripts/verify-renewal-routes.mjs`

**Interfaces:**
- Consumes: the revised `ROUTES`, clinical copy already present in `/spine` and `/posture`, and shared layout components.
- Produces: canonical replacements for all legacy spine child pages and three diet pages.

- [ ] **Step 1: Create spine-joint root and treatment pages**

The root page links to 추나치료, 도수치료, and five symptom guides. The chuna page identifies it as a treatment provided after an individual assessment. The manual-therapy page does not claim that every patient receives manual therapy or that it is delivered by a specific profession until the hospital confirms the staffing statement.

- [ ] **Step 2: Move symptom guide content to canonical paths**

Copy each existing `/spine/{slug}` page into `/spine-joint/{slug}` and update only these values: metadata path, category breadcrumb, LNB list, heading labels, and canonical route references. Keep clinically reviewed content unchanged in this mechanical move.

- [ ] **Step 3: Create diet pages with conservative information copy**

Use “체중 관리 상담”, “생활 습관과 건강 상태를 함께 확인”, and “개인 상태에 따라 상담 방향이 달라질 수 있음”. Do not state expected loss, duration, “요요 없음”, “체질 개선”, or “살이 잘 안 찌는 몸”. The cause page must distinguish general lifestyle information from diagnosis.

- [ ] **Step 4: Add the new paths to sitemap and route test script**

Add every `/spine-joint/*` and `/diet/*` public page. Verify sitemap has one entry for each path.

- [ ] **Step 5: Run route and static quality checks**

Run:

```bash
node apps/web/scripts/verify-renewal-routes.mjs http://127.0.0.1:3030
npm run type-check --prefix apps/web
npm run lint --prefix apps/web
```

Expected: route status 200 and both commands exit 0.

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/spine-joint apps/web/app/diet apps/web/app/sitemap.ts apps/web/scripts/verify-renewal-routes.mjs
git commit -m "feat(web): add spine joint and diet guides"
```

### Task 4: 기존 URL 영구 이관과 SEO 검증

**Files:**
- Modify: `apps/web/app/spine/page.tsx`
- Modify: `apps/web/app/spine/disc/page.tsx`
- Modify: `apps/web/app/spine/stenosis/page.tsx`
- Modify: `apps/web/app/spine/shoulder/page.tsx`
- Modify: `apps/web/app/spine/knee/page.tsx`
- Modify: `apps/web/app/spine/sports/page.tsx`
- Modify: `apps/web/app/posture/page.tsx`
- Modify: `apps/web/app/posture/scoliosis/page.tsx`
- Modify: `apps/web/app/posture/forward-head/page.tsx`
- Modify: `apps/web/app/posture/pelvis/page.tsx`
- Modify: `apps/web/app/posture/postnatal/page.tsx`
- Modify: `apps/web/app/immunity/sleep/page.tsx`
- Modify: `apps/web/scripts/verify-renewal-routes.mjs`
- Test: `apps/web/scripts/verify-renewal-routes.mjs`

**Interfaces:**
- Consumes: target paths from `ROUTES.spineJoint` and `ROUTES.autonomic`.
- Produces: 308 redirects for the mapping in the design document and 200 responses for all canonical targets.

- [ ] **Step 1: Extend the verification script with redirects**

Add this mapping and validate `status === 308` and the `location` header path:

```js
const redirects = {
  "/spine": "/spine-joint",
  "/spine/disc": "/spine-joint/disc",
  "/spine/stenosis": "/spine-joint/stenosis",
  "/spine/shoulder": "/spine-joint/shoulder",
  "/spine/knee": "/spine-joint/knee",
  "/spine/sports": "/spine-joint/sports",
  "/posture": "/spine-joint/chuna",
  "/posture/scoliosis": "/spine-joint/chuna",
  "/posture/forward-head": "/spine-joint/chuna",
  "/posture/pelvis": "/spine-joint/chuna",
  "/posture/postnatal": "/spine-joint/chuna",
  "/immunity/sleep": "/autonomic",
};
```

- [ ] **Step 2: Confirm redirect checks fail**

Run: `node apps/web/scripts/verify-renewal-routes.mjs http://127.0.0.1:3030`

Expected: redirect checks fail while legacy pages still return 200.

- [ ] **Step 3: Replace legacy page components with redirects**

Use a server component body in each file:

```tsx
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/navigation";

export default function LegacyPage() {
  redirect(ROUTES.spineJoint.root);
}
```

Use the exact target for each path from the table. Do not leave page metadata on redirect-only files.

- [ ] **Step 4: Verify redirects, canonical pages, and sitemap**

Run:

```bash
node apps/web/scripts/verify-renewal-routes.mjs http://127.0.0.1:3030
curl -fsS http://127.0.0.1:3030/sitemap.xml | rg 'https://[^<]+/(cancer|autonomic|spine-joint|diet)'
```

Expected: all redirect mappings return 308; every canonical route returns 200; sitemap includes every new root and child path exactly once.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/spine apps/web/app/posture apps/web/app/immunity/sleep/page.tsx apps/web/scripts/verify-renewal-routes.mjs
git commit -m "feat(web): redirect legacy clinic routes"
```

### Task 5: 공개 전 검토 목록과 사실정보 확인 표기

**Files:**
- Create: `docs/renewal-publication-checklist.md`
- Modify: `apps/web/app/about/facility/page.tsx`
- Modify: `apps/web/app/about/location/page.tsx`
- Test: `rg` content scan

**Interfaces:**
- Consumes: current facility photos and address data, the source documents, and the design document.
- Produces: a publication checklist with named owner/decision fields and pages that do not pretend unverified facts are confirmed.

- [ ] **Step 1: Create publication checklist**

Create sections for medical-ad copy, cancer content, autonomic self-check, diet copy, practitioner/staffing claims, facility floors/rooms, images, map provider, and GNB sign-off. Every row has `확인 주체`, `확인 대상`, `공개 전 상태` and starts as `미확인` unless source code already contains a confirmed operating value.

- [ ] **Step 2: Remove development placeholders in touched patient-facing content**

Replace any development-only asset marker in the revised page set with neutral published copy or move the unresolved item to the checklist. Do not add an in-page warning aimed at patients for internal approval workflow.

- [ ] **Step 3: Preserve facility and map facts until confirmation**

Keep the currently published facility images, floor structure, address, and Google map embed. Add the source-document differences to the checklist instead of changing physical facts from unconfirmed draft text.

- [ ] **Step 4: Run content scans**

Run:

```bash
rg -n "요요 없음|완치|재발 방지|안전한 치료|효과 보장" apps/web/app/{cancer,autonomic,spine-joint,diet} docs/renewal-publication-checklist.md
```

Expected: no result for prohibited public-copy terms; checklist uses only `미확인`, `확인 필요`, or `승인 필요` as workflow states.

- [ ] **Step 5: Commit**

```bash
git add docs/renewal-publication-checklist.md apps/web/app/about/facility/page.tsx apps/web/app/about/location/page.tsx
git commit -m "docs: add renewal publication checklist"
```

### Task 6: Accessibility, build, deployment, and post-deploy validation

**Files:**
- Modify: only files required to fix discovered verification failures
- Test: `apps/web/scripts/verify-renewal-routes.mjs`

**Interfaces:**
- Consumes: all public route pages, redirects, sitemap, and Vercel project configuration.
- Produces: a production deployment verified against the new information architecture.

- [ ] **Step 1: Run static checks**

Run:

```bash
npm run type-check --prefix apps/web
npm run lint --prefix apps/web
npm run build --prefix apps/web
```

Expected: all commands exit 0.

- [ ] **Step 2: Run local accessibility and route smoke checks**

Start `npm run dev --prefix apps/web`, then run the route script. Inspect desktop and mobile header behavior: keyboard focus reaches skip link, every GNB child link, primary CTA, and mobile drawer controls; no horizontal scrolling appears at 390px width.

- [ ] **Step 3: Run reviewer gate before deployment**

Invoke `.agents-dev/scripts/ask-codex.sh "Review the completed renewal changes for routing, SEO metadata, accessibility, and medical-advertising claim regressions. Do not include patient data or secrets."` and save the response log. Apply no `NEEDS-FIX` finding without user confirmation under `AGENTS.md`.

- [ ] **Step 4: Deploy Vercel production**

Use the repository’s existing Vercel deployment workflow. Record the production URL and deployment identifier.

- [ ] **Step 5: Run post-deploy checks**

Run:

```bash
node apps/web/scripts/verify-renewal-routes.mjs https://<production-domain>
curl -fsS https://<production-domain>/sitemap.xml | rg 'https://[^<]+/(cancer|autonomic|spine-joint|diet)'
```

Expected: canonical paths return 200, legacy mappings return 308, and sitemap includes the new canonical entries.

- [ ] **Step 6: Final commit and push**

```bash
git add -A
git commit -m "feat(web): complete hospital renewal"
git push
```

## Plan Self-Review

- **Spec coverage:** Tasks 1–4 implement all seven GNB categories, new pages, canonical metadata, sitemap, and old URL redirects. Task 5 captures medical-advertising and operational approval gates. Task 6 provides accessibility, type, lint, build, reviewer, deployment, and production validation evidence.
- **Placeholder scan:** Implementation steps name all files, routes, expected statuses, and verification commands. `<production-domain>` is intentionally supplied only at deployment because it is external deployment output, not implementation detail.
- **Type consistency:** All route consumers use `ROUTES` and `GNB` from `navigation.ts`; redirect-only files use `redirect()` from `next/navigation`; all new metadata uses `pageMeta`.
