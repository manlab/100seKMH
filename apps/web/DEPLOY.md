# 배포 가이드 — GitHub → Vercel (로컬 dev 없음)

이 프로젝트는 **로컬 개발 환경 없이** GitHub push → Vercel 자동 빌드/배포 흐름으로 운영됩니다. DB 마이그레이션과 어드민 첫 계정도 모두 Vercel/HTTP 안에서 처리되도록 자동화돼 있습니다.

---

## 1회성: 첫 배포 셋업

### 1.1 — Vercel Storage → Neon Postgres 생성

```
Vercel Dashboard → 프로젝트 → Storage → Browse Storage
→ Marketplace Database Providers → Neon (Serverless Postgres) 선택 → Continue
→ Region: Tokyo (ap-northeast-1)
→ Plan: Free (Hobby)
→ Database name: 적당히 (예: baekse-counsel)
→ Connect to Project → 100seKMH 선택
```

자동 주입되는 환경변수 (확인용):
- `POSTGRES_URL`
- `POSTGRES_URL_NON_POOLING`
- 기타 Neon 관련 변수들

### 1.2 — 추가 환경변수 (Vercel → Project → Settings → Environment Variables)

세 개를 직접 추가합니다. **셋 다 production / preview / development 모두 체크**.

| 변수 | 생성 방법 | 용도 |
|---|---|---|
| `PHONE_ENC_KEY` | `openssl rand -hex 32` | AES-256-GCM 키 (이름·전화·내용·답변) |
| `ADMIN_SESSION_SECRET` | `openssl rand -hex 32` | 어드민 세션 토큰 서명 |
| `ADMIN_SEED_TOKEN` | `openssl rand -hex 32` | 첫 어드민 1회 생성용. 생성 후 자동 잠김 |

`openssl rand -hex 32` 가 PC 에 없으면 https://www.random.org/strings/ 또는 Python 한 줄: `python3 -c "import secrets;print(secrets.token_hex(32))"`. 어떻게든 64자 hex 문자열을 만들면 됩니다.

선택 변수:
- `NEXT_PUBLIC_SITE_URL`

### 1.3 — GitHub 에 push → Vercel 빌드 시작

```bash
git push origin main
```

Vercel 빌드 로그에서 다음 흐름 확인:
```
$ npm install
$ npm run build
> drizzle-kit migrate          ← counsels / admin_users / admin_sessions / rate_limits 테이블 생성
> next build                   ← Next.js 컴파일
```

`drizzle-kit migrate` 가 첫 호출이면 모든 테이블을 생성. 이후 배포에서는 신규 마이그레이션만 적용 (idempotent).

빌드 실패 시: Vercel Logs 의 가장 흔한 원인은 `POSTGRES_URL_NON_POOLING` 미주입 → Neon 이 프로젝트와 properly connect 되었는지 다시 확인.

### 1.4 — 배포 완료 후, 첫 어드민 계정 생성 (1회만)

배포된 사이트에 다음 curl 1회:

```bash
curl -X POST https://baeksehospital.kr/api/admin/seed \
  -H 'Content-Type: application/json' \
  -H 'x-seed-token: <ADMIN_SEED_TOKEN 의 실제 값>' \
  -d '{
    "email": "ops@baeksehospital.kr",
    "password": "강한비밀번호12자이상권장",
    "displayName": "운영팀"
  }'
```

성공 응답:
```json
{
  "ok": true,
  "admin": { "id": "...", "email": "ops@baeksehospital.kr" },
  "message": "첫 어드민 생성 완료. 이 엔드포인트는 자동으로 잠겼습니다 (추가 어드민 생성 불가)."
}
```

이후 같은 URL 에 토큰을 들고 다시 호출해도 **409 Conflict** — 자동 잠김.

curl 이 없으면:
- macOS / Linux: 기본 설치
- Windows: `Invoke-WebRequest` 또는 https://reqbin.com 같은 웹 도구
- Vercel 에서 직접 실행하고 싶다면: Vercel Functions 의 "Test" 탭에서 POST 실행 가능

### 1.5 — 어드민 로그인

```
https://baeksehospital.kr/admin/login
```

방금 만든 email + password 로 로그인 → `/admin/counsels` 에서 글 확인 / 답변 작성.

---

## 일상 운영

### 코드 변경 배포

```bash
git push origin main
```

자동으로:
1. Vercel 가 빌드 시작
2. `drizzle-kit migrate` 가 새 마이그레이션 있으면 적용
3. `next build` 성공 시 라이브 트래픽 전환 (rolling deploy)

### 추가 어드민 계정 생성

`/api/admin/seed` 는 첫 어드민 생성 후 잠겨서 재사용 불가. 추가 어드민이 필요하면 두 가지 옵션:

**A) Neon SQL Editor (권장)** — Vercel → Storage → Neon → Open in Neon → SQL Editor

```sql
-- bcrypt 해시는 https://bcrypt-generator.com 등에서 cost=12 로 생성
INSERT INTO admin_users (email, password_hash, display_name)
VALUES ('staff2@baeksehospital.kr', '$2a$12$...', '의료진');
```

**B) 향후 어드민 UI 에 사용자 관리 추가** (현 PR 범위 밖)

### DB 스키마 변경

```bash
# 로컬 dev 환경 없이도 가능 — schema.ts 만 수정 후 push
# 단, 마이그레이션 SQL 도 같이 커밋해야 함.
```

마이그레이션 SQL 생성에는 임시로 빈 PG 인스턴스가 필요. 두 옵션:
- **A**: GitHub Codespaces / Gitpod 에서 일회성 컨테이너 → `npm run db:generate`
- **B**: Neon 새 dev branch 띄워 `POSTGRES_URL_NON_POOLING` 만 들고 GitHub Actions 에서 generate

Codespaces 60시간 무료니 A 가 가장 단순. 가이드 필요하면 별도 문의.

### 비밀번호 잊었을 때 (어드민)

Neon SQL Editor 에서:
```sql
UPDATE admin_users
SET password_hash = '<새 bcrypt cost=12 해시>'
WHERE email = 'ops@baeksehospital.kr';
```

다음 로그인부터 새 비번으로 동작 (기존 세션은 만료까지 유효).

### 사용자 글 / 답변 백업

Neon 의 자동 백업 (Free 7일 PITR) 으로 충분. 명시적 export 필요 시:
```sql
-- Neon SQL Editor 에서
COPY counsels TO STDOUT WITH CSV HEADER;
```

⚠️ 단, content_encrypted / phone_encrypted / reply_encrypted 컬럼은 PHONE_ENC_KEY 가 있어야 복호화 가능. 키 분실 = 데이터 영구 손실.

---

## 트러블슈팅

| 증상 | 확인 |
|---|---|
| Vercel 빌드 실패 — `POSTGRES_URL_NON_POOLING` 없음 | Neon 이 프로젝트와 connect 됐는지, 환경변수 탭에 자동 주입됐는지 |
| `/api/admin/seed` 503 응답 | `ADMIN_SEED_TOKEN` 환경변수 미설정 → 추가 후 재배포 |
| `/api/admin/seed` 401 | 헤더 `x-seed-token` 값 오타 |
| `/api/admin/seed` 409 | 어드민 이미 존재 — 정상 (자동 잠김). 추가 어드민은 SQL editor 로 |
| 상담 폼 제출 시 500 | Vercel Logs 에서 "DB insert failed" 또는 "PHONE_ENC_KEY not set" 확인 |
| 상세 페이지 비밀번호 입력 후 "본문 복호화 실패" | PHONE_ENC_KEY 가 글 작성 당시와 다름 — 키를 절대 변경 X |
