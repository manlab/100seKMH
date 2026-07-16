# Korean Clinical Hero Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Korean traffic-accident consultation hero image and replace the cancer hero with a Korean clinical consultation image.

**Architecture:** Store both generated WebP assets under the existing renewal generated-image directory. Attach the accident image to the route-local `SubLayout` hero and route the cancer hero through the centralized visual registry; retain the shared `SubVisual` layout and overlay unchanged.

**Tech Stack:** Next.js 14 App Router, React, Next Image, TypeScript, Tailwind CSS, built-in image generation.

## Global Constraints

- Generate photorealistic horizontal clinical images with no text, logos, watermark, crash scene, or treatment-outcome claim.
- Use Korean adult patients and Korean medical professionals in modern clinical settings.
- Preserve the existing left-side hero copy area and place primary people toward the right.
- Add project-bound images only under `apps/web/public/images/renewal/generated/`.
- Leave unrelated visual registry entries and the shared overlay unchanged.

---

### Task 1: Generate and store the two hero assets

**Files:**
- Create: `apps/web/public/images/renewal/generated/traffic-accident-care-hero.webp`
- Create: `apps/web/public/images/renewal/generated/cancer-integrative-care-hero.webp`

**Interfaces:**
- Produces: two public paths consumed by `HeroImage.src` and `SUBPAGE_VISUALS["/cancer"].hero`.

- [ ] **Step 1: Generate the traffic-accident hero image**

Use the built-in image generator with this prompt:

```text
Use case: photorealistic-natural
Asset type: Korean hospital website subpage hero
Primary request: a Korean adult patient consulting with a Korean medical professional about neck and lower-back discomfort after a traffic accident
Scene/backdrop: bright, modern Korean medicine clinic consultation room with subtle, believable medical details
Subject: one Korean adult patient seated at right with a Korean clinician listening and checking posture or shoulder/neck mobility; calm, respectful consultation
Style/medium: premium editorial clinical photography, realistic skin tones, natural detail
Composition/framing: wide horizontal 16:9 composition; reserve the left 45 percent with soft, uncluttered clinic background for white website copy; place people and clinical interaction mainly on the right
Lighting/mood: calm daylight, reassuring and professional
Constraints: no visible injuries, no vehicle, no accident scene, no text, no logos, no watermark, no treatment claim
```

- [ ] **Step 2: Generate the cancer-integrative-care hero image**

Use the built-in image generator with this prompt:

```text
Use case: photorealistic-natural
Asset type: Korean hospital website subpage hero
Primary request: a Korean middle-aged or older adult patient having a calm integrative-care consultation with a Korean medical professional
Scene/backdrop: modern, warm Korean clinic consultation room
Subject: Korean patient seated at right, Korean clinician beside them discussing care notes with a respectful, supportive expression; no identifiable hospital brand
Style/medium: premium editorial clinical photography, realistic Korean faces, natural skin tones
Composition/framing: wide horizontal 16:9 composition; reserve the left 45 percent with soft, uncluttered room background for white website copy; place people and consultation details mainly on the right
Lighting/mood: calm soft daylight, dignified and reassuring
Constraints: no medical procedure, no text, no logos, no watermark, no diagnosis display, no treatment-outcome claim
```

- [ ] **Step 3: Copy the accepted generated files into the public asset directory**

Copy the generated image paths returned by the image-generation tool into `apps/web/public/images/renewal/generated/` with the filenames listed above, then convert them to WebP at quality 86 using `cwebp`.

Expected: both commands identify readable WebP image files.

- [ ] **Step 4: Inspect the two asset compositions**

Open each asset and confirm that the left text area has no cropped face and that no unwanted text or logo appears.

### Task 2: Attach generated assets to the accident and cancer hero routes

**Files:**
- Modify: `apps/web/app/accident/page.tsx:111-151`
- Modify: `apps/web/lib/subpage-visuals.ts:57-65`

**Interfaces:**
- Consumes: `/images/renewal/generated/traffic-accident-care-hero.webp` and `/images/renewal/generated/cancer-integrative-care-hero.webp` from Task 1.
- Produces: rendered background image for `/accident` and the visual registry hero for `/cancer`.

- [ ] **Step 1: Confirm current asset validation fails before the new image files exist**

Run:

```bash
cd apps/web && npm run verify:subpage-visuals
```

Expected: PASS before registry modification; the script establishes the baseline asset-availability contract.

- [ ] **Step 2: Add the accident hero image reference**

In the `hero` object passed to `SubLayout` in `apps/web/app/accident/page.tsx`, add the route-local image field:

```tsx
image: {
  src: "/images/renewal/generated/traffic-accident-care-hero.webp",
  position: "center",
},
```

- [ ] **Step 3: Replace the cancer registry hero with the Korean consultation image**

Replace the `/cancer` registry entry fields in `apps/web/lib/subpage-visuals.ts`:

```ts
hero: "/images/renewal/generated/cancer-integrative-care-hero.webp",
heroPosition: "center",
source: "generated",
```

- [ ] **Step 4: Run the registry asset verification**

Run:

```bash
cd apps/web && npm run verify:subpage-visuals
```

Expected: `Subpage visual verification passed for 30 routes.`

- [ ] **Step 5: Commit the route and asset changes**

```bash
git add apps/web/app/accident/page.tsx apps/web/lib/subpage-visuals.ts apps/web/public/images/renewal/generated/traffic-accident-care-hero.webp apps/web/public/images/renewal/generated/cancer-integrative-care-hero.webp
git commit -m "feat(site): add Korean clinical hero images"
```

### Task 3: Verify rendering and release

**Files:**
- Verify: `apps/web/app/accident/page.tsx`
- Verify: `apps/web/lib/subpage-visuals.ts`

**Interfaces:**
- Consumes: asset references from Task 2.
- Produces: verified production build and deployed visual update.

- [ ] **Step 1: Run static checks and production build**

```bash
cd apps/web && npm run type-check
cd apps/web && npm run lint
cd apps/web && npm run build
git diff --check
```

Expected: each command exits with status 0.

- [ ] **Step 2: Review production rendering at desktop and mobile sizes**

Start the production server with `npm run start`, then inspect `/accident` and `/cancer` at 1440px and 390px widths. Confirm that each hero image loads, the existing text remains readable, and the primary faces stay clear of the left copy area.

- [ ] **Step 3: Push the commits and confirm Vercel production readiness**

```bash
git push origin main
vercel ls 100se-kmh --scope iffors-projects
```

Expected: `main` is pushed and the latest production deployment reports `Ready`.

## Plan Self-Review

- Spec coverage: Task 1 implements both Korean clinical images, Task 2 applies the required route mappings, and Task 3 verifies visual output and release status.
- Placeholder scan: no unresolved implementation placeholders remain.
- Type consistency: both public paths are strings consumed by the existing `HeroImage` and `SubpageVisual` interfaces; no interface changes are required.
