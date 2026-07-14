import assert from "node:assert/strict";

const baseUrl = new URL(process.argv[2] ?? "http://127.0.0.1:3030");

const publicPaths = [
  "/cancer",
  "/cancer/post-surgery",
  "/cancer/chemo-care",
  "/cancer/recurrence-care",
  "/autonomic",
  "/autonomic/self-check",
  "/autonomic/care",
  "/spine-joint",
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
];

const legacyRedirects = {
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

function endpoint(path) {
  return new URL(path, baseUrl).toString();
}

for (const path of publicPaths) {
  const response = await fetch(endpoint(path), { redirect: "manual" });
  assert.equal(response.status, 200, `${path} must return 200`);
}

for (const [path, destination] of Object.entries(legacyRedirects)) {
  const response = await fetch(endpoint(path), { redirect: "manual" });
  assert.equal(response.status, 308, `${path} must return 308`);
  assert.equal(new URL(response.headers.get("location"), baseUrl).pathname, destination, `${path} must redirect to ${destination}`);
}

const sitemapResponse = await fetch(endpoint("/sitemap.xml"));
assert.equal(sitemapResponse.status, 200, "/sitemap.xml must return 200");
const sitemap = await sitemapResponse.text();

for (const path of publicPaths) {
  assert.match(
    sitemap,
    new RegExp(`<loc>https?://[^<]+${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`),
    `${path} must be in sitemap`,
  );
}

for (const path of Object.keys(legacyRedirects)) {
  assert.doesNotMatch(sitemap, new RegExp(`<loc>https?://[^<]+${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`), `${path} must not be in sitemap`);
}

console.log(`Verified ${publicPaths.length} public routes and ${Object.keys(legacyRedirects).length} legacy redirects at ${baseUrl.origin}.`);
