import { z } from "zod";
import { HOME_POPUP_DISPLAY_TYPES } from "./home-popup-types";

const optionalUrl = z
  .string()
  .trim()
  .max(500, "URL은 500자 이하.")
  .refine(
    (value) => !value || value.startsWith("/") || /^https?:\/\//.test(value),
    "URL은 /로 시작하거나 http(s) URL이어야 합니다.",
  );

const optionalDateTime = z
  .string()
  .trim()
  .max(40, "일시는 40자 이하.")
  .refine(
    (value) => !value || !Number.isNaN(Date.parse(value)),
    "올바른 일시를 입력해 주세요.",
  );

/** 메인페이지 레이어 팝업 작성/수정 입력 검증. */
export const HomePopupFormSchema = z
  .object({
    displayType: z.enum(HOME_POPUP_DISPLAY_TYPES).default("content"),
    title: z
      .string()
      .trim()
      .min(2, "제목은 2자 이상 입력해 주세요.")
      .max(120, "제목은 120자 이하."),
    content: z.string().trim().max(5000, "본문은 5,000자 이하."),
    imageUrl: optionalUrl.default(""),
    linkLabel: z.string().trim().max(40, "버튼 문구는 40자 이하.").default(""),
    linkUrl: optionalUrl.default(""),
    isPublished: z.boolean(),
    sortOrder: z.coerce.number().int().min(0).max(999).default(0),
    startsAt: optionalDateTime.default(""),
    endsAt: optionalDateTime.default(""),
  })
  .superRefine((value, context) => {
    if (value.displayType === "content" && !value.content) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["content"],
        message: "본문을 입력해 주세요.",
      });
    }

    if (value.displayType === "image" && !value.imageUrl) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["imageUrl"],
        message: "이미지 단독 팝업에는 이미지를 등록해 주세요.",
      });
    }

    if (value.displayType === "content" && value.linkLabel && !value.linkUrl) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkUrl"],
        message: "버튼 문구를 입력했다면 이동 URL도 입력해 주세요.",
      });
    }

    if (value.displayType === "content" && value.linkUrl && !value.linkLabel) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkLabel"],
        message: "이동 URL을 입력했다면 버튼 문구도 입력해 주세요.",
      });
    }

    if (
      value.startsAt &&
      value.endsAt &&
      new Date(value.startsAt) > new Date(value.endsAt)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endsAt"],
        message: "종료일시는 시작일시 이후여야 합니다.",
      });
    }
  });

export type HomePopupFormValues = z.infer<typeof HomePopupFormSchema>;

export const homePopupDefaults: HomePopupFormValues = {
  displayType: "content",
  title: "",
  content: "",
  imageUrl: "",
  linkLabel: "",
  linkUrl: "",
  isPublished: true,
  sortOrder: 0,
  startsAt: "",
  endsAt: "",
};

export function toDateTimeLocalValue(value: Date | null): string {
  if (!value) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}T${pad(
    value.getHours(),
  )}:${pad(value.getMinutes())}`;
}
