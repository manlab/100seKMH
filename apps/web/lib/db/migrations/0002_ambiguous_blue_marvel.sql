CREATE TABLE "home_popups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(120) NOT NULL,
	"content" text NOT NULL,
	"image_url" varchar(500),
	"link_label" varchar(40),
	"link_url" varchar(500),
	"is_published" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"author_id" uuid,
	"author_name" varchar(60),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_popups" ADD CONSTRAINT "home_popups_author_id_admin_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "home_popups_published_schedule_idx" ON "home_popups" USING btree ("is_published","starts_at","ends_at","sort_order","created_at");