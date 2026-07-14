# Subpage Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give all 28 visible submenu pages a route-specific hero background and a contextual content image using supplied hospital photography and safe generated editorial healthcare imagery.

**Architecture:** `apps/web/lib/subpage-visuals.ts` is a typed source of truth keyed by pathname. `SubVisual` consumes optional hero configuration through `SubLayout`, and a reusable `ContentImage` renders semantic body imagery. All imported and generated WebP assets live below `apps/web/public/images/renewal/` and a verifier guarantees full route coverage.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, `next/image`, built-in image generation, Sharp.

## Global Constraints

- Persona: Healthcare Visual Content Director owns source authenticity, image alt text, and medical-advertising safety.
- Cover the 28 visible dropdown pages listed in `docs/superpowers/specs/2026-07-14-subpage-visual-system-design.md`.
- Use actual facility images only where they truthfully show the hospital; generated images are illustrative and never promise outcomes.
- Do not use patient-identifying photos, before/after bodies, treatment-result claims, image text, watermarks, or visual gradients.
- Hero assets are local WebP at 16:9 or wider with a solid CSS contrast scrim. Body images have concise Korean alt text.
- Keep `AGENTS.md`, `.agents-dev/backups/`, and `tmp/` untracked.

---

### Task 1: Add A Typed Visual Registry And Coverage Verifier

**Files:**
- Create: `apps/web/lib/subpage-visuals.ts`
- Create: `apps/web/scripts/verify-subpage-visuals.mjs`
- Modify: `apps/web/package.json`

**Interfaces:**
- Produces `type SubpageVisual = { hero: string; heroPosition: string; body: string; bodyAlt: string; source: "supplied" | "generated" }`.
- Produces `SUBPAGE_VISUALS: Record<string, SubpageVisual>` and `getSubpageVisual(pathname: string)`.
- Produces `npm run verify:subpage-visuals`.

- [ ] Add the exact 28 required dropdown paths to `verify-subpage-visuals.mjs`, including `/autonomic` and `/diet` because both are visible dropdown targets.
- [ ] Run `node scripts/verify-subpage-visuals.mjs` before registry creation. Expected: non-zero exit that identifies missing coverage.
- [ ] Implement `SubpageVisual`, the registry, and verifier file checks using `existsSync(join(process.cwd(), "public", assetPath))`.
- [ ] Add `"verify:subpage-visuals": "node scripts/verify-subpage-visuals.mjs"` to package scripts.
- [ ] Run `npm run verify:subpage-visuals`. Expected: it lists only unassigned route assets until Tasks 2 and 3 complete.
- [ ] Commit with `git add apps/web/lib/subpage-visuals.ts apps/web/scripts/verify-subpage-visuals.mjs apps/web/package.json && git commit -m "feat(web): add subpage visual registry"`.

### Task 2: Import Truthful Supplied Hospital Images

**Files:**
- Create: `apps/web/public/images/renewal/supplied/*.webp`
- Create: `docs/renewal-image-manifest.md`

**Interfaces:**
- Supplies project-local WebP copies of selected DOCX media under `/images/renewal/supplied/`.
- Documents source file, intended route, scene truth, output dimensions, and Korean alt text.

- [ ] Select supplied reception, corridor, X-ray, treatment room, inpatient room, ward lounge, manual therapy, spine model, floor directory, doctor portraits, traffic illustration, and document scenes. Exclude unrelated screenshots, price tables, and clinical portraits without a page context.
- [ ] Convert selections to WebP at quality 82 without changing the pictured scene; use route-oriented names such as `reception-hero.webp`, `xray-room-hero.webp`, and `treatment-room-body.webp`.
- [ ] Add a manifest row such as `| reception-hero.webp | DOCX image1.jpeg | /about/greeting | Hospital reception desk | 백세한방병원 접수 공간 |` for each asset.
- [ ] Run `find public/images/renewal/supplied -name '*.webp' -print0 | xargs -0 sips -g pixelWidth -g pixelHeight`. Expected: hero candidates are at least 1200 px wide and body images at least 800 px wide.
- [ ] Commit with `git add apps/web/public/images/renewal/supplied docs/renewal-image-manifest.md && git commit -m "feat(web): add supplied hospital visual assets"`.

### Task 3: Generate The Editorial Healthcare Asset Set

**Files:**
- Create: `apps/web/public/images/renewal/generated/*.webp`
- Modify: `docs/renewal-image-manifest.md`

**Interfaces:**
- Supplies project-local generated hero and body images for routes lacking truthful hospital photography.
- Adds manifest rows with `source: generated` and illustrative scene descriptions.

- [ ] Generate individual cancer and autonomic scenes: recovery-rest consultation, treatment-plan conversation, supportive follow-up desk, calm sleep routine, stress consultation, and symptom note-taking.
- [ ] Generate individual spine, diet, and community scenes: movement assessment, shoulder mobility discussion, knee activity guidance, sports recovery conversation, balanced meal planning, daily walking routine, document guidance desk, online consultation workspace, and FAQ reading scene.
- [ ] Reject outputs with text, watermarks, visible logos, implausible anatomy, invasive treatment, before/after comparison, or an implied outcome.
- [ ] Convert accepted assets to WebP; record `Generated`, route use, illustrative scene truth, and a Korean alt text in the manifest.
- [ ] Commit with `git add apps/web/public/images/renewal/generated docs/renewal-image-manifest.md && git commit -m "feat(web): add clinical editorial image assets"`.

### Task 4: Build Image-Aware Shared Layout Components

**Files:**
- Modify: `apps/web/components/layout/SubVisual.tsx`
- Modify: `apps/web/components/layout/SubLayout.tsx`
- Modify: `apps/web/components/clinical/ClinicalGuidePage.tsx`
- Create: `apps/web/components/content/ContentImage.tsx`

**Interfaces:**
- `SubVisual` accepts `image?: { src: string; position: string }`.
- `SubLayout.hero` passes optional image configuration unchanged.
- `ContentImage` accepts `src`, `alt`, `caption?`, `priority?`, and `position?`.

- [ ] Implement `ContentImage` with `next/image`, `width={1440}`, `height={900}`, explicit `sizes`, `object-cover`, and a semantic optional `figcaption`.
- [ ] Place the decorative hero image absolutely in `SubVisual` with `aria-hidden="true"` and a solid `bg-primary-950/70` contrast scrim. Preserve the hero heading, breadcrumb, and text hierarchy above it.
- [ ] Resolve a clinical guide visual from `getSubpageVisual(pathname)` and render `ContentImage` after the overview paragraph without duplicating shared-page code.
- [ ] Run `npm run type-check && npm run lint`. Expected: both exit 0.
- [ ] Commit with `git add apps/web/components/layout/SubVisual.tsx apps/web/components/layout/SubLayout.tsx apps/web/components/clinical/ClinicalGuidePage.tsx apps/web/components/content/ContentImage.tsx && git commit -m "feat(web): support subpage visual imagery"`.

### Task 5: Assign Visuals To Every Dropdown Page

**Files:**
- Modify: `apps/web/lib/subpage-visuals.ts`
- Modify: `apps/web/app/about/{greeting,doctors,facility,location}/page.tsx`
- Modify: `apps/web/app/accident/{aftercare,insurance,system}/page.tsx`
- Modify: `apps/web/app/community/{notice,counsel,faq,non-covered,documents}/page.tsx`
- Modify: `apps/web/app/autonomic/{page,self-check,care}/page.tsx`
- Modify: `apps/web/app/cancer/{post-surgery,chemo-care,recurrence-care}/page.tsx`
- Modify: `apps/web/app/spine-joint/{chuna,manual-therapy,disc,stenosis,shoulder,knee,sports}/page.tsx`
- Modify: `apps/web/app/diet/{page,causes,guide}/page.tsx`

**Interfaces:**
- Each required route resolves exactly one `SubpageVisual`.
- Each page passes its visual to `SubLayout` or its shared clinical-guide path.

- [ ] Fill the registry with supplied images where truthful: greeting uses reception; facility uses corridor/floor directory; accident insurance uses X-ray; accident system uses inpatient room; chuna uses supplied manual therapy; spine content uses the supplied spine model.
- [ ] Fill cancer, autonomic, diet, and community entries with generated illustrations. Assign specific movement and consultation scenes to spine symptom pages.
- [ ] Add one `ContentImage` after the first explanatory section on non-shared about, accident, and community pages. Do not reuse a hero image as a body image unless it is an actual facility context.
- [ ] Run `npm run verify:subpage-visuals`. Expected: `Verified 28 submenu visual assignments` and zero missing assets.
- [ ] Commit with `git add apps/web/lib/subpage-visuals.ts apps/web/app && git commit -m "feat(web): add visuals across submenu pages"`.

### Task 6: Verify, Review, And Deploy

**Files:**
- Modify: `docs/renewal-image-manifest.md` only when final audit corrects an entry.

**Interfaces:**
- Visual route verification, render QA, production build, and pre-commit review form release evidence.

- [ ] Start the app and run `npm run type-check && npm run lint && npm run verify:subpage-visuals && node scripts/verify-renewal-routes.mjs http://127.0.0.1:3030`. Expected: all commands exit 0.
- [ ] Run `npx next build`. Expected: complete production compilation without errors.
- [ ] Inspect supplied, generated, and community examples at desktop and 390 px mobile widths. Confirm readable hero copy, stable crops, no horizontal overflow, no text overlap, and no CSS gradients.
- [ ] Run `.agents-dev/scripts/ask-codex.sh` focused on route coverage, image semantics, accessibility, performance, and medical-advertising risk. If it returns `NEEDS-FIX`, report before editing.
- [ ] Commit reviewed implementation with `git add apps/web docs/renewal-image-manifest.md && git commit -m "feat(site): add visual system to submenu pages"`.
- [ ] Deploy with `git push origin codex/hospital-renewal:main` and verify the Vercel production status plus representative live routes.

## Plan Self-Review

- **Spec coverage:** Tasks 1-5 implement asset coverage, supplied/generate split, shared layout, and every page assignment. Task 6 covers accessibility, visual QA, reviewer, and deployment.
- **Placeholder scan:** The plan contains no unresolved or deferred implementation work.
- **Type consistency:** `SubpageVisual`, `getSubpageVisual`, `ContentImage`, and `SubVisual.image` are defined before their consumers.
