import { z } from "zod";
import { NOTICE_CATEGORIES } from "./db/schema";

/**
 * 공지사항 작성/수정 입력 검증.
 * 어드민 폼과 API 둘 다 동일 schema 사용.
 */
export const NoticeFormSchema = z.object({
  title: z.string().trim().min(2, "제목은 2자 이상 입력해 주세요.").max(200, "제목은 200자 이하."),
  content: z
    .string()
    .trim()
    .min(5, "본문은 5자 이상 입력해 주세요.")
    .max(20000, "본문은 20,000자 이하."),
  category: z.enum(NOTICE_CATEGORIES, { errorMap: () => ({ message: "카테고리를 선택해 주세요." }) }),
  isPinned: z.boolean(),
  isPublished: z.boolean(),
});

export type NoticeFormValues = z.infer<typeof NoticeFormSchema>;

export const noticeDefaults: NoticeFormValues = {
  title: "",
  content: "",
  category: "진료안내",
  isPinned: false,
  isPublished: true,
};
