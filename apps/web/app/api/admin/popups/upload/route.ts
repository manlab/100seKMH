import { put } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

function safeName(name: string) {
  const withoutExt = name.replace(/\.[^.]+$/, "");
  const normalized = withoutExt
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return normalized || "popup";
}

/** POST /api/admin/popups/upload — 팝업 이미지 Blob 업로드. */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const admin = await verifySession(token);
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 업로드 요청입니다." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "이미지 파일을 선택해 주세요." }, { status: 400 });
  }

  const extension = ALLOWED_TYPES.get(file.type);
  if (!extension) {
    return NextResponse.json(
      { ok: false, error: "jpg, png, webp, gif 이미지만 업로드할 수 있습니다." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { ok: false, error: "이미지는 5MB 이하로 업로드해 주세요." },
      { status: 400 }
    );
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        error: "이미지 저장소 설정이 없습니다. Vercel Blob 연결을 확인해 주세요.",
      },
      { status: 500 }
    );
  }

  const pathname = `popups/${Date.now()}-${safeName(file.name)}.${extension}`;
  try {
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch {
    return NextResponse.json(
      { ok: false, error: "이미지 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
