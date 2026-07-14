import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .max(500, "URL은 500자 이하.")
  .refine(
    (value) => !value || value.startsWith("/") || /^https?:\/\//.test(value),
    "URL은 /로 시작하거나 http(s) URL이어야 합니다."
  );

const optionalDateTime = z
  .string()
  .trim()
  .max(40, "일시는 40자 이하.")
  .refine((value) => !value || !Number.isNaN(Date.parse(value)), "올바른 일시를 입력해 주세요.");

/** 메인페이지 레이어 팝업 작성/수정 입력 검증. */
export const HomePopupFormSchema = z
  .object({
    title: z.string().trim().min(2, "제목은 2자 이상 입력해 주세요.").max(120, "제목은 120자 이하."),
    content: z.string().trim().min(1, "본문을 입력해 주세요.").max(5000, "본문은 5,000자 이하."),
    imageUrl: optionalUrl.default(""),
    linkLabel: z.string().trim().max(40, "버튼 문구는 40자 이하.").default(""),
    linkUrl: optionalUrl.default(""),
    isPublished: z.boolean(),
    sortOrder: z.coerce.number().int().min(0).max(999).default(0),
    startsAt: optionalDateTime.default(""),
    endsAt: optionalDateTime.default(""),
  })
  .refine((value) => !value.linkLabel || value.linkUrl, {
    path: ["linkUrl"],
    message: "버튼 문구를 입력했다면 이동 URL도 입력해 주세요.",
  })
  .refine((value) => !value.linkUrl || value.linkLabel, {
    path: ["linkLabel"],
    message: "이동 URL을 입력했다면 버튼 문구도 입력해 주세요.",
  })
  .refine(
    (value) => !value.startsAt || !value.endsAt || new Date(value.startsAt) <= new Date(value.endsAt),
    {
      path: ["endsAt"],
      message: "종료일시는 시작일시 이후여야 합니다.",
    }
  );

export type HomePopupFormValues = z.infer<typeof HomePopupFormSchema>;

export const homePopupDefaults: HomePopupFormValues = {
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
    value.getHours()
  )}:${pad(value.getMinutes())}`;
}
