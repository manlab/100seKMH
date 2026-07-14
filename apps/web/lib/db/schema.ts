import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";
import type { HomePopupDisplayType } from "../home-popup-types";

/**
 * 온라인 상담.
 *
 * 암호화 정책 (KISA 안전성 확보조치 기준 2024):
 *  - phoneEncrypted: AES-256-GCM (식별정보 §29)
 *  - contentEncrypted, replyEncrypted: AES-256-GCM (민감정보 §23)
 *  - passwordHash: bcrypt cost 12 (단방향)
 *  - name, title: 평문 — 마스킹은 표시단에서.
 *
 * 파기 정책: soft-delete 미사용. 보유기간 만료 시 hard-delete (개인정보보호법 §21).
 */
export const counsels = pgTable(
  "counsels",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // 작성자 정보 — 식별정보(이름·전화번호) 모두 컬럼 암호화. KISA §29.
    nameEncrypted: text("name_encrypted").notNull(),
    phoneEncrypted: text("phone_encrypted").notNull(),
    passwordHash: text("password_hash").notNull(),

    // 본문
    title: varchar("title", { length: 100 }).notNull(),
    contentEncrypted: text("content_encrypted").notNull(),
    isPrivate: boolean("is_private").notNull().default(true),

    // 동의 시각 (개인정보보호법 §15·§23 — 동의 받은 시점 기록 의무)
    agreedAt: timestamp("agreed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    agreedSensitiveAt: timestamp("agreed_sensitive_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    // 답변
    replyEncrypted: text("reply_encrypted"),
    repliedAt: timestamp("replied_at", { withTimezone: true }),
    repliedBy: varchar("replied_by", { length: 60 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    createdIdx: index("counsels_created_idx").on(t.createdAt),
  }),
);

export type Counsel = typeof counsels.$inferSelect;
export type NewCounsel = typeof counsels.$inferInsert;

/**
 * 어드민 계정. 운영팀 staff 가 답변 작성 시 사용.
 * 인증: email + password (bcrypt). 세션은 admin_sessions 테이블.
 */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: varchar("display_name", { length: 60 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;

/**
 * 어드민 세션. 쿠키에는 token (HMAC 서명된 식별자) 가 저장되고,
 * 서버는 token 의 hash 를 이 테이블에서 조회해 검증.
 */
export const adminSessions = pgTable(
  "admin_sessions",
  {
    tokenHash: text("token_hash").primaryKey(),
    adminId: uuid("admin_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    adminIdIdx: index("admin_sessions_admin_idx").on(t.adminId),
    expiresIdx: index("admin_sessions_expires_idx").on(t.expiresAt),
  }),
);

export type AdminSession = typeof adminSessions.$inferSelect;

/**
 * 공지사항. 작성자는 어드민, 노출은 공개. 본문은 plain text (줄바꿈 보존).
 *
 * 정렬: is_pinned DESC → published_at DESC (고정 공지가 최상단).
 * 카테고리: 진료안내 / 이벤트 / 휴진 / 시설 (UI 와 동기).
 */
export const NOTICE_CATEGORIES = [
  "진료안내",
  "이벤트",
  "휴진",
  "시설",
] as const;
export type NoticeCategory = (typeof NOTICE_CATEGORIES)[number];

export const notices = pgTable(
  "notices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    content: text("content").notNull(),
    category: varchar("category", { length: 20 })
      .notNull()
      .$type<NoticeCategory>(),

    isPinned: boolean("is_pinned").notNull().default(false),
    isPublished: boolean("is_published").notNull().default(true),
    viewCount: integer("view_count").notNull().default(0),

    authorId: uuid("author_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    authorName: varchar("author_name", { length: 60 }),

    publishedAt: timestamp("published_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    pinnedPublishedIdx: index("notices_pinned_published_idx").on(
      t.isPinned,
      t.publishedAt,
    ),
    categoryIdx: index("notices_category_idx").on(t.category),
  }),
);

export type Notice = typeof notices.$inferSelect;
export type NewNotice = typeof notices.$inferInsert;

/**
 * 메인페이지 레이어 팝업. 어드민이 등록·관리하고 공개 홈에서 노출한다.
 *
 * 본문은 plain text 로 저장·렌더링한다. HTML 입력/렌더링은 허용하지 않는다.
 * 노출 조건: is_published=true AND (starts_at IS NULL OR starts_at <= now)
 *           AND (ends_at IS NULL OR ends_at >= now)
 */
export const homePopups = pgTable(
  "home_popups",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    displayType: varchar("display_type", { length: 16 })
      .notNull()
      .default("content")
      .$type<HomePopupDisplayType>(),
    title: varchar("title", { length: 120 }).notNull(),
    content: text("content").notNull(),
    imageUrl: varchar("image_url", { length: 500 }),
    linkLabel: varchar("link_label", { length: 40 }),
    linkUrl: varchar("link_url", { length: 500 }),
    isPublished: boolean("is_published").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    startsAt: timestamp("starts_at", { withTimezone: true }),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    authorId: uuid("author_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    authorName: varchar("author_name", { length: 60 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    publishedScheduleIdx: index("home_popups_published_schedule_idx").on(
      t.isPublished,
      t.startsAt,
      t.endsAt,
      t.sortOrder,
      t.createdAt,
    ),
  }),
);

export type HomePopup = typeof homePopups.$inferSelect;
export type NewHomePopup = typeof homePopups.$inferInsert;

/**
 * Rate limit — IP 별 카운터. Vercel serverless 의 in-memory 한계를 DB 로 우회.
 * 만료된 row 는 cleanup 시점이나 다음 호출 시 갱신.
 */
export const rateLimits = pgTable("rate_limits", {
  key: varchar("key", { length: 128 }).primaryKey(),
  count: integer("count").notNull().default(0),
  resetAt: timestamp("reset_at", { withTimezone: true }).notNull(),
});

export type RateLimit = typeof rateLimits.$inferSelect;
