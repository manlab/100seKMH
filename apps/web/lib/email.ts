import { Resend } from "resend";
import { env } from "./env";
import type { CounselFormValues } from "./counsel-schema";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(env.RESEND_API_KEY);
  return _resend;
}

/** XSS 방지용 HTML escape — 환자 입력을 본문에 안전하게 삽입. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatPhone(phone: string): string {
  // 010xxxxxxxx → 010-xxxx-xxxx 정규화
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return phone;
}

/** 운영팀에게 보낼 상담 알림 이메일 HTML. */
function counselEmailHtml(data: CounselFormValues): string {
  const phone = escapeHtml(formatPhone(data.phone));
  const submittedAt = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>온라인 상담 알림</title>
</head>
<body style="margin:0;padding:24px;background:#F1F5FA;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#334155;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;">
    <div style="background:#143A6B;color:#fff;padding:20px 28px;">
      <p style="margin:0;font-size:11px;letter-spacing:0.18em;color:#8FBFCC;font-weight:600;">BAEKSE KOREAN MEDICINE</p>
      <h1 style="margin:6px 0 0;font-size:18px;font-weight:700;color:#fff;">새 온라인 상담 ${data.isPrivate ? "<span style='display:inline-block;margin-left:8px;padding:2px 8px;border-radius:9999px;background:#4A8E9C;font-size:11px;font-weight:600;'>비공개</span>" : ""}</h1>
    </div>
    <div style="padding:24px 28px;">
      <h2 style="margin:0 0 8px;font-size:18px;color:#0C2340;font-weight:700;line-height:1.4;">${escapeHtml(data.title)}</h2>
      <p style="margin:0 0 20px;font-size:12px;color:#94A3B8;">${submittedAt} 접수</p>

      <table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.7;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;width:80px;">이름</td>
          <td style="padding:10px 0;border-bottom:1px solid #F1F5F9;color:#0C2340;font-weight:600;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;">연락처</td>
          <td style="padding:10px 0;border-bottom:1px solid #F1F5F9;color:#0C2340;font-weight:600;font-feature-settings:'tnum';">
            <a href="tel:${phone}" style="color:#3B727D;text-decoration:none;">${phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#64748B;vertical-align:top;">공개 여부</td>
          <td style="padding:10px 0;color:#0C2340;">${data.isPrivate ? "비공개 (본인+담당자만 열람)" : "공개"}</td>
        </tr>
      </table>

      <div style="margin-top:24px;padding:18px 20px;background:#F1F5FA;border-radius:12px;border-left:4px solid #4A8E9C;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;color:#3B727D;font-weight:600;">상담 내용</p>
        <p style="margin:0;font-size:14px;line-height:1.75;color:#0C2340;white-space:pre-wrap;word-break:keep-all;">${escapeHtml(data.content)}</p>
      </div>

      <p style="margin:24px 0 0;font-size:11px;color:#94A3B8;line-height:1.5;">
        ※ 본 메일은 <a href="${env.SITE_URL}/community/counsel" style="color:#3B727D;">백세한방병원 온라인 상담 폼</a>에서 자동 생성되었습니다. 비밀번호는 보안상 메일에 포함되지 않으며, 글 수정·삭제는 사이트에서 비밀번호 입력으로 진행됩니다.
      </p>
    </div>
  </div>
</body>
</html>`;
}

/** 운영팀에게 상담 알림 메일 전송. Resend 미설정 시 dev 로그로 대체. */
export async function sendCounselEmail(data: CounselFormValues): Promise<{ ok: boolean; id?: string; error?: string }> {
  const resend = getResend();

  if (!resend) {
    // Dev fallback — 콘솔에만 기록 (실제 발송 X)
    if (env.isDev) {
      // eslint-disable-next-line no-console
      console.log("[counsel] (dev) email would be sent →", env.COUNSEL_TO_EMAIL, "\n", {
        title: data.title,
        name: data.name,
        phone: formatPhone(data.phone),
        isPrivate: data.isPrivate,
      });
      return { ok: true, id: "dev-mock" };
    }
    return { ok: false, error: "이메일 서비스가 구성되지 않았습니다." };
  }

  const subject = `[온라인 상담${data.isPrivate ? " · 비공개" : ""}] ${data.title}`;
  const phone = formatPhone(data.phone);

  try {
    const { data: result, error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: [env.COUNSEL_TO_EMAIL],
      subject,
      html: counselEmailHtml(data),
      replyTo: undefined, // 환자 이메일은 폼에서 받지 않음. 답변은 사이트 내에서.
      headers: {
        "X-Entity-Ref-ID": `counsel-${Date.now()}`,
      },
      // 텍스트 폴백
      text: `[새 상담${data.isPrivate ? " · 비공개" : ""}]\n\n제목: ${data.title}\n이름: ${data.name}\n연락처: ${phone}\n공개 여부: ${data.isPrivate ? "비공개" : "공개"}\n\n--- 상담 내용 ---\n${data.content}`,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[counsel] resend error:", error);
      return { ok: false, error: error.message ?? "이메일 전송 실패" };
    }

    return { ok: true, id: result?.id };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[counsel] send exception:", e);
    return { ok: false, error: "이메일 전송 중 예외가 발생했습니다." };
  }
}
