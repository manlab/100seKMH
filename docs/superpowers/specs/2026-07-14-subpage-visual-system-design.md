# Subpage Visual System Design

## Owner And Persona

- **Persona:** Healthcare Visual Content Director
- **Audience:** Patients and caregivers comparing care information before a call or visit.
- **Objective:** Make every visible submenu page feel complete and credible while avoiding imagery that implies a treatment result, depicts an identifiable patient, or misrepresents the hospital's facilities.

## Scope

Apply one background image to the hero of every visible dropdown page and at least one contextual image inside that page's content. The 26 dropdown pages are:

| Category | Dropdown pages |
| --- | --- |
| 백세한방병원 | 인사말, 의료진 소개, 층별 안내, 오시는 길 |
| 암 통합치료 | 수술 후 회복, 항암 부작용 관리, 전이·재발 관리 |
| 교통사고 | 사고 후 증상, 자동차보험 진료, 입원 시스템 |
| 자율신경실조증 | 자가 확인, 진료 안내 |
| 척추관절통증 | 추나, 도수치료, 디스크, 척추관협착증, 어깨 통증, 무릎 통증, 스포츠 손상 |
| 다이어트 | 원인 확인, 생활 관리 안내 |
| 커뮤니티 | 공지사항, 온라인 상담, 자주 묻는 질문, 비급여 항목, 서류 발급 안내 |

Category landing pages inherit their category's visual direction with a distinct responsive crop. Legacy hidden routes remain functional but are outside this visual rollout.

## Image Sources

### Supplied Source Images

Reuse only supplied hospital images where the scene is a truthful representation of the facility:

- Reception and corridor: greeting, location, consultation, documents.
- X-ray, treatment room, inpatient room, ward lounge, therapy room: accident, admission, spine/joint pathways.
- Doctor portraits and staff/facility scenes: doctor introduction and care-process content.
- Supplied clinical stock images: use only when their visual meaning matches the nearby non-promotional explanatory copy.

The source DOCX media is reference-only until copied into versioned project assets. Extracted files are never referenced directly from the Downloads directory.

### Generated Images

Generate editorial healthcare images for gaps in the supplied set: recovery routines, calm symptom consultation, sleep and stress context, nutrition and lifestyle management, and educational document contexts.

Generated image constraints:

- Korean adults only where people are visible; no identifiable logo, text, medical chart, or branded uniform.
- No before/after body comparisons, needles entering skin, surgery, emergency scenes, diagnostic certainty, cure claims, or visualized organs presented as patient-specific evidence.
- Calm daylight, clean clinical or home setting, respectful neutral expressions, ample negative space for hero copy.
- No gradients, text overlays, watermarks, or decorative graphics baked into the images.

## Visual Direction

- **Theme:** clean structural healthcare.
- **Hero composition:** 16:9 or wider, image on the full section with a neutral solid translucent navy scrim for text readability. The scrim is an accessibility contrast layer, not a color gradient.
- **Content composition:** responsive `next/image` blocks with meaningful alt text; decorative images use empty alt text.
- **Variation:** adjacent pages do not reuse the same primary framing. Category consistency comes from light, camera distance, and color temperature rather than filters.
- **Performance:** WebP output, explicit dimensions, `sizes`, responsive crop, and lazy-loaded content images. Only the above-the-fold hero image is prioritized.

## Asset Matrix

| Page group | Hero source | Content source | Intent |
| --- | --- | --- | --- |
| 병원소개/의료진/시설/오시는 길 | supplied reception, corridor, doctor, floor-guide scenes | supplied facility details | Establish actual place and people. |
| 암 통합치료 | generated recovery, quiet consultation, care-plan scene | supplied/generated calm support scenes | Explain supportive consultation without promising outcomes. |
| 교통사고 | supplied X-ray, corridor, inpatient scenes | supplied accident illustration and treatment space | Explain procedures and visit flow. |
| 자율신경실조증 | generated rest, sleep, and consultation scenes | generated daily-life discomfort scenes | Explain symptoms as a reason to consult, not a diagnosis. |
| 척추관절통증 | supplied manual therapy, spine model, treatment-room scenes | supplied/generated movement and consultation scenes | Explain body-area and conservative-care context. |
| 다이어트 | generated lifestyle meal planning and everyday movement | generated nutrition and habit scenes | Support healthy routine consultation without before/after claims. |
| 커뮤니티 | supplied reception/document space or generated calm desk scenes | supplied document and consultation scenes | Make informational tasks feel human and credible. |

## Component Architecture

1. Add a typed visual registry keyed by route. Each entry contains hero source, hero alt, focal position, and an optional body image with caption/alt.
2. Extend `SubVisual` and `SubLayout` with an optional image configuration. Existing pages without a registry entry retain the existing solid background until they are assigned.
3. Add a reusable semantic content-image component for body sections. It supports full-width and split layouts but does not turn each section into a card.
4. Update the 26 dropdown pages and category landing pages to consume the registry. Reuse visuals only within an intentional category pairing.

## Accessibility And Safety

- Hero text must maintain WCAG-readable contrast over every crop. The image is decorative because the heading/description communicate page purpose; the same hero alt is not repeated.
- Content images include concise Korean alt text describing visible context, not medical interpretation.
- No image is used as evidence for outcomes, patient testimonials, or treatment effectiveness.
- Generated people and rooms are labeled in the asset manifest as illustrative; actual facility images retain their truthful context.

## Verification

1. Asset inventory confirms every matrix route has a hero and content image.
2. Script verifies image dimensions, project-local paths, and route registry coverage.
3. Type-check, lint, and production Next build pass.
4. Desktop and mobile screenshots verify readable hero copy, crop stability, no horizontal overflow, no image-only information, and no overlapping text.
5. External reviewer checks route coverage, accessibility semantics, image loading, and medical-claim risk before deployment.

## Decisions

- All 26 visible dropdown pages receive individual hero image assignments and at least one contextual content image.
- Supplied facility photos are not altered to depict unavailable services.
- Generated images supplement, rather than replace, the real hospital photography.
- Images are delivered as project-local, versioned assets and documented in a manifest for future review.
