# Korean Clinical Hero Images

## Goal

Replace the empty traffic-accident hero background and the non-Korean cancer-care hero background with medically appropriate Korean clinical photography.

## Assets

- `traffic-accident-care-hero.webp`: Korean adult patient in a modern Korean medicine clinic consultation. The clinician checks neck or lower-back discomfort after a traffic accident. The left side remains visually quiet for the existing hero copy; the people and consultation details sit toward the right.
- `cancer-integrative-care-hero.webp`: Korean middle-aged or older patient consulting with a Korean medical professional in a calm clinic setting. The left side remains visually quiet for the existing hero copy; the consultation sits toward the right.

Both assets are photorealistic, horizontal hero images, contain no text, no logos, no vehicle-crash depiction, and make no treatment-outcome claims.

## Integration

- Add the traffic-accident asset to the `/accident` `SubLayout` hero directly, which fixes its missing image reference.
- Change the `/cancer` visual mapping in `subpage-visuals.ts` to the Korean consultation image. Its related cancer subpages continue using their existing images.
- Keep the shared `SubVisual` overlay and all existing content, controls, and layout unchanged.

## Verification

- Confirm both assets are local project files under `apps/web/public/images/renewal/generated/`.
- Verify `/accident` and `/cancer` at desktop and mobile widths: no blank background, readable copy, and no cropped primary faces in the copy area.
- Run type checking, linting, production build, and a clean diff check before deployment.
