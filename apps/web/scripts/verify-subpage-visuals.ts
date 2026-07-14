import fs from "node:fs";
import path from "node:path";

import { SUBPAGE_VISUALS } from "../lib/subpage-visuals";

const requiredPaths = [
  "/about/greeting",
  "/about/doctors",
  "/about/facility",
  "/about/location",
  "/cancer/post-surgery",
  "/cancer/chemo-care",
  "/cancer/recurrence-care",
  "/accident/aftercare",
  "/accident/insurance",
  "/accident/system",
  "/autonomic",
  "/autonomic/self-check",
  "/autonomic/care",
  "/spine-joint/chuna",
  "/spine-joint/manual-therapy",
  "/spine-joint/disc",
  "/spine-joint/stenosis",
  "/spine-joint/shoulder",
  "/spine-joint/knee",
  "/spine-joint/sports",
  "/diet",
  "/diet/causes",
  "/diet/guide",
  "/community/notice",
  "/community/counsel",
  "/community/faq",
  "/community/non-covered",
  "/community/documents",
] as const;

const failures: string[] = [];
const registryPaths = Object.keys(SUBPAGE_VISUALS);

if (registryPaths.length !== requiredPaths.length) {
  failures.push(
    `Registry must contain ${requiredPaths.length} visible subpages; found ${registryPaths.length}.`,
  );
}

for (const route of requiredPaths) {
  const visual = SUBPAGE_VISUALS[route];

  if (!visual) {
    failures.push(`${route}: missing visual registry entry.`);
    continue;
  }

  if (!visual.bodyAlt.trim()) {
    failures.push(`${route}: bodyAlt must not be empty.`);
  }

  for (const [kind, assetPath] of Object.entries({ hero: visual.hero, body: visual.body })) {
    if (!assetPath.startsWith("/images/")) {
      failures.push(`${route}: ${kind} must be a project public image path.`);
      continue;
    }

    const localPath = path.join(process.cwd(), "public", assetPath.slice(1));
    if (!fs.existsSync(localPath)) {
      failures.push(`${route}: ${kind} asset is missing (${assetPath}).`);
    }
  }
}

for (const route of registryPaths) {
  if (!requiredPaths.includes(route as (typeof requiredPaths)[number])) {
    failures.push(`${route}: not a visible GNB subpage.`);
  }
}

if (failures.length > 0) {
  console.error("Subpage visual verification failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Subpage visual verification passed for ${requiredPaths.length} routes.`);
