import { z } from "zod";

/**
 * 온라인 상담 폼 입력 검증 스키마.
 * 클라이언트와 서버에서 동일하게 사용 (re-validation on server).
 */

// 한국 휴대전화: 010-xxxx-xxxx (xxxx 4자리는 3자리도 허용)
const PHONE_REGEX = /^01[0-9][- ]?\d{3,4}[- ]?\d{4}$/;

export const CounselFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "이름은 2자 이상 입력해 주세요.")
    .max(30, "이름은 30자 이하로 입력해 주세요."),

  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "휴대전화 번호 형식이 올바르지 않습니다. (예: 010-0000-0000)"),

  password: z
    .string()
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(20, "비밀번호는 20자 이하여야 합니다."),

  title: z
    .string()
    .trim()
    .min(5, "제목은 5자 이상 입력해 주세요.")
    .max(100, "제목은 100자 이하로 입력해 주세요."),

  content: z
    .string()
    .trim()
    .min(20, "상담 내용은 20자 이상 입력해 주세요.")
    .max(2000, "상담 내용은 2000자 이하로 입력해 주세요."),

  isPrivate: z.boolean(),

  // 일반 개인정보(이름·연락처·비밀번호) 수집·이용 동의 — 개인정보보호법 §15
  agreed: z.boolean().refine((v) => v === true, {
    message: "개인정보 수집·이용에 동의해 주세요.",
  }),

  // 민감정보(증상·병력 등 건강 관련) 처리 동의 — 개인정보보호법 §23
  // 일반 동의와 분리해서 별도로 받아야 법적 효력이 인정된다.
  agreedSensitive: z.boolean().refine((v) => v === true, {
    message: "민감정보(증상·건강정보) 처리에 동의해 주세요.",
  }),

  // Honeypot — 봇이 채울 가능성이 높은 빈 필드. UI에 노출되지 않음.
  // 값이 있으면 봇으로 간주하고 silent fail.
  website: z.string().max(0).optional(),
});

export type CounselFormValues = z.infer<typeof CounselFormSchema>;

/**
 * 폼 기본값. checkbox는 모두 unchecked, 비공개 옵션만 선체크.
 */
export const counselDefaults: CounselFormValues = {
  name: "",
  phone: "",
  password: "",
  title: "",
  content: "",
  isPrivate: true,
  agreed: false,
  agreedSensitive: false,
  website: "",
};
