import type { Metadata } from "next";
import { ClinicalGuidePage } from "@/components/clinical/ClinicalGuidePage";
import { GNB, ROUTES } from "@/lib/navigation";
import { pageMeta } from "@/lib/seo";
import { spineJointGuides } from "@/lib/spine-joint-guides";

const guide = spineJointGuides.disc;
const items = GNB.find((item) => item.href === ROUTES.spineJoint.root)?.children ?? [];
export const metadata: Metadata = pageMeta({ title: guide.title, description: guide.description, path: ROUTES.spineJoint.disc });
export default function SpineJointDiscPage() { return <ClinicalGuidePage category="척추관절통증" categoryEyebrow="SPINE & JOINT CARE" categoryHref={ROUTES.spineJoint.root} lnbItems={items} {...guide} />; }
