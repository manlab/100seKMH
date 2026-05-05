# 3-AI 협업 사용 가이드 (100seKMH)

Claude Code(PM) + Codex(Reviewer) + Gemini(Researcher) 셋이 한 프로젝트에서 분업하는 셋업의 실전 매뉴얼.

> 컨셉 출처: [pandas-studio/agent-harness-tutorial](https://github.com/pandas-studio/agent-harness-tutorial) (CC BY-NC-ND 4.0). 본 셋업은 컨셉만 차용해 직접 작성됨.

---

## 1. 30초 요약

```bash
# 1) 프로젝트 루트에서
claude

# 2) Claude 세션에서 자연어로 시키면 끝
> 폼에 추가한 동의 박스, Codex 리뷰 받고 의료광고법 표시 의무는 Gemini 한테 확인해줘
```

`CLAUDE.md` 의 라우팅 정책에 따라 Claude 가 알아서 `ask-codex.sh` / `ask-gemini.sh` 를 부르고 verdict 까지 정리해서 답함. 수동 호출 / tmux 대시보드는 **선택 사항**.

---

## 2. 누가 무엇을 하는가

| 역할 | 누구 | 잘 하는 일 | 못 하는 일 |
|---|---|---|---|
| **PM + Coder** | Claude Code | 라우팅, 코드 작성, 결과 종합 | (혼자) 최신 라이브러리 변경점 추적 |
| **Researcher** | Gemini | 스펙·법령·표준·문서 1차 출처 인용 | 코드 작성·수정 |
| **Reviewer** | Codex | 작업 후 `SHIP` / `NEEDS-FIX` / `DISCUSS` 판정 + blocker 적출 | 단순 typo·자명한 사실 |

흐름:
```
PM ──(코딩 전, 사실 확인)──► Gemini
PM ──(코딩 후, 검증)──────► Codex
                              │
                              ▼ NEEDS-FIX 시
PM ──(research 첨부 재리뷰)──► Codex (--with-research <file>)
```

---

## 3. Tmux 셋업

### 3.A — Tmux 안 써도 됨 (권장 시작점)

가장 간단한 방법. 그냥 터미널 한 개에서:
```bash
cd /Volumes/HAGIBIS/HomeDirectoryExtra/Desktop/DEV/100seKMH
claude
```

Claude 세션에서 자연어로 일을 시키면 됨. 호출 결과는 모두 `.agents-dev/log/` 에 남음. 시각화가 필요해지면 그때 tmux 도입.

### 3.B — Tmux 3-pane 자동 분할

영상처럼 좌측 PM / 우측 상하단 대시보드 레이아웃.

```bash
tmux new-session -s 100seKMH
bash .agents-dev/tmux/setup.sh        # 자동 3-pane 분할
# 좌측 pane 에서:
claude
```

레이아웃:
```
┌──────────────────────┬───────────────────┐
│                      │  CODEX dashboard  │ ← 최신 codex 응답 tail
│  PM (claude)         │  (verdict 색상)   │   SHIP=초록 / FIX=빨강 / DISCUSS=노랑
│                      ├───────────────────┤
│                      │  GEMINI dashboard │ ← 최신 gemini 응답 tail
└──────────────────────┴───────────────────┘
```

### 3.C — 이미 분할된 tmux 에서 dashboard 만 띄우기

이미 원하는 대로 분할이 되어있다면 `setup.sh` 무시하고 원하는 pane 에서 직접:
```bash
bash .agents-dev/tmux/dashboard.sh codex     # 한 페인
bash .agents-dev/tmux/dashboard.sh gemini    # 다른 페인
```

### 3.D — Tmux 키바인딩 (선택)

`prefix + R` 한 방으로 3-pane 분할하고 싶다면:
```bash
sed "s|__PROJECT_ROOT__|$(pwd)|g" \
    .agents-dev/tmux/keybinding.conf.template > /tmp/100sekmh-keys.conf
echo "source-file /tmp/100sekmh-keys.conf" >> ~/.tmux.conf
# tmux 재시작 후, 세션 안에서: prefix+R
```

> ⚠️ **헷갈리지 말 것**: 옆 pane 에서 `gemini` / `codex` 인터랙티브 세션을 띄워도 **Claude 의 라우팅에는 사용되지 않음**. 사용자 본인이 직접 대화하기 위한 것. Claude 가 호출할 때는 매번 별도 비대화형 프로세스(`-p` / `exec`) 를 spawn 함.

---

## 4. 사용법 — 자연어 라우팅 (메인)

### 4.A — 트리거 문구 패턴

Claude 세션에서 다음 같이 말하면 자동 라우팅:

| 의도 | 예시 자연어 |
|---|---|
| Codex 리뷰만 | "방금 추가한 X, Codex 한테 리뷰 받아줘" |
| Gemini 리서치만 | "Schema.org MedicalOrganization 의 medicalSpecialty 권장 vocabulary 가 뭔지 Gemini 에 물어봐" |
| 둘 다 + 종합 | "X 코드 Codex 리뷰 받고, 관련 의료광고법 표시 의무는 Gemini 에 확인해서 verdict 정리해줘" |
| 리서치 후 코딩 | "Y 라이브러리 0.3 마이그레이션 변경점 Gemini 에 먼저 확인하고 그 결과대로 우리 코드 수정해줘" |

### 4.B — 라우팅이 안 일어나는 케이스 (Claude 가 직접 처리)

`CLAUDE.md` 정책상 다음은 외부 호출 안 함:
- repo 안의 파일을 `Read`/`grep` 으로 답할 수 있는 질문
- 단순 typo, 한 줄 수정, 파일 위치 확인
- 빌드/타입체크로 즉시 검증 가능한 것

### 4.C — `## NEED RESEARCH` 자동 처리

Codex 리뷰 결과 끝에 `## NEED RESEARCH` 블록이 붙으면 Claude 가:
1. 각 질문을 Gemini 에 forward
2. 답변을 `.agents-dev/log/research-<ts>.md` 로 저장
3. `ask-codex.sh --with-research <file> "<원래 focus>"` 로 재리뷰
4. 사용자에게 차단 요인 / 큰 발견은 즉시 보고

---

## 5. 사용법 — 수동 호출 (디버깅 / 단발 질의)

```bash
# Gemini 에 사실 확인
.agents-dev/scripts/ask-gemini.sh "Next.js 15 App Router 의 metadata.viewport 정의 위치는?"

# Codex 에 코드 리뷰 요청
.agents-dev/scripts/ask-codex.sh "apps/web/lib/email.ts 의 Resend 호출에서 PII 누출 가능성"

# 리서치 결과 첨부해서 리뷰 (NEED RESEARCH 후속)
.agents-dev/scripts/ask-codex.sh --with-research .agents-dev/log/gemini-20260505-214718-26550.md \
                                 "위 focus 동일"
```

stdout 으로 흐르는 건 **모델 응답뿐** (verdict 가 line 1 보장). 진단 로그는 `*.transcript.log` 별도 저장.

---

## 6. Output Contract

### 6.A — Codex 응답 형식

```
SHIP | NEEDS-FIX | DISCUSS         ← line 1, 정확히 한 단어
## Blockers                        ← 필수 수정 항목 (없으면 섹션 생략)
## Major                           ← 중요 발견
## Nits                            ← 사소한 스타일/명료성 (선택)
## NEED RESEARCH                   ← 정보 부족 시 끝에 붙음 (선택)
- <집중 질문 1>
- <집중 질문 2>
```

### 6.B — Gemini 응답 형식

```
1줄 직답
- 근거 1 (출처 URL)
- 근거 2 (출처 URL)
- ...  (3~8개)
```

법제처/개인정보위/KWCAG/Schema.org/MDN 등 **1차 출처 URL** 인용 의무.

---

## 7. 로그 파일 명세

호출 1회당 다음 파일들이 `.agents-dev/log/` 에 떨어짐 (모두 gitignored):

| 파일 | 내용 | 누가 읽나 |
|---|---|---|
| `<role>-<ts>-<pid>.md` | 헤더 + 질문/focus + 모델 응답만 | 대시보드 / PM |
| `<role>-<ts>-<pid>.transcript.log` | CLI 배너·툴 호출·진행·stderr | 사람 (디버깅) |
| `codex-<ts>-<pid>.response.md` | codex 의 최종 메시지만 (`--output-last-message`) | PM (verdict 분기) |

`<ts>` = `YYYYMMDD-HHMMSS`, `<pid>` = 호출 프로세스 PID (동시 호출 충돌 방지).

---

## 8. 실전 사례 — 온라인 상담 폼 보강 (실제로 돌렸던 데모)

작업 의뢰:
> "온라인 상담 폼에 개인정보보호법 준수 보강 적용해줘"

라우팅 흐름:

```
PM (Claude) ──► Gemini: "의료기관 상담 폼에서 폼에 명시 의무인 4대 항목은?
                        법제처 1차 출처 인용해서."
            ◄── Gemini: 4가지 모두 필수 + 민감정보(§23) 별도 동의 + 강조표시(§22)
                        의무 (법제처 / 개인정보위 가이드 URL)

PM ──► counsel-schema.ts: agreedSensitive 필드 추가
PM ──► CounselForm.tsx:   4대 고지 박스 + 민감정보 별도 동의 + aria 연결

PM ──► Codex (research 첨부): "변경된 두 파일만 검토. 4대 고지 + 접근성"
    ◄── Codex: NEEDS-FIX
                Blocker — 거부 안내 문구가 실제 동작과 불일치
                Major  — 새 체크박스에 id+aria-describedby 누락

PM ──► fix: 안내 문구 정정 + id+aria 연결
PM ──► Codex (재리뷰): "위 두 finding 수정 확인"
    ◄── Codex: SHIP (npm run type-check 도 자체 통과 확인)
```

산출물: `apps/web/lib/counsel-schema.ts` + `apps/web/app/community/counsel/_components/CounselForm.tsx`, +114 / -12 라인.

전체 로그는 `.agents-dev/log/{gemini,codex}-20260505-*.md` 에서 확인 가능.

---

## 9. 비용 / 보안 주의

### 9.A — 비용

| CLI | 호출당 비용 (대략) |
|---|---|
| Codex (`gpt-5.4` 기본) | $0.05 ~ $0.30 |
| Gemini | $0.05 ~ $0.10 |

repo 안에서 답이 나오는 질문은 직접 처리. 외부 호출은 진짜로 모르는 것에 한정.

### 9.B — 보안 (절대 외부 송신 금지)

- 환자 정보 / 진료 기록 / 의료진 PI
- API 키, `.env`, OAuth 토큰
- 상담 폼 실 데이터, 데이터베이스 dump
- 결제·청구·보험 정보

→ 프롬프트에 절대 포함하지 말 것. 코드의 **구조** 만 리뷰 대상.

### 9.C — 운영 사이트 자동 수정 금지

- 루트의 정적 HTML(`백세한방병원 *.html`) 은 운영 사이트의 단일 진실 원본
- Claude 가 일괄 자동 수정하지 않음 (CLAUDE.md 정책)
- 반드시 백업 / 사용자 승인 후 수정

---

## 10. 자주 부딪히는 문제

### Q1. "리뷰했다는데 옆 페인에 아무 것도 안 떴어"

A. 백그라운드 호출 시 detached 프로세스라 사용자 터미널에 안 보임. 증거는 `.agents-dev/log/` 의 timestamp + transcript.log 의 CLI 배너. 실시간으로 보고 싶으면 옆 페인에 `dashboard.sh` 띄울 것 (§3.C).

### Q2. "옆 페인에 직접 띄운 gemini / codex 인터랙티브 세션은 Claude 가 쓰나?"

A. **안 씀**. Claude 의 ask-*.sh 는 매번 새 비대화형 프로세스를 spawn. 옆 페인의 인터랙티브 세션은 사람이 직접 쓰는 별도 자원.

### Q3. "Codex 리뷰가 너무 비싼 것 같다"

A. focus 를 좁힐 것. "전체 코드 베이스 리뷰" 대신 "방금 변경한 파일 N 개만, 항목 M 가지만". `ask-codex.sh "<focus>"` 의 focus 문구가 직접 비용을 좌우함.

### Q4. "Gemini 가 quota 초과로 retry 했다"

A. transcript.log 에 `Attempt 1 failed: ... quota will reset` 가 보이면 사용자 계정의 무료/유료 quota 한도. Google One AI Pro 라도 분당 한도 있음. 5초 정도 자동 retry 후 보통 성공.

### Q5. "verdict 가 line 1 이 아니다"

A. CLI 배너가 stdout 에 섞이면 발생. 현재 wrapper 는 `--output-last-message` 와 stderr 분리로 방지. 만약 line 1 이 아닌 응답이 나오면 wrapper 가 손상된 것 — `git diff .agents-dev/scripts/` 확인.

---

## 11. 추가 작업 시 체크리스트

- [ ] 진료 / 환자 / 결제 등 민감 데이터가 프롬프트에 들어가지 않는지 확인
- [ ] focus 가 충분히 좁은지 (전체 < 디렉토리 < 파일 < 함수)
- [ ] 변경 후 `apps/web` 에서 `npm run type-check` / `npm run lint` 확인
- [ ] Codex verdict 가 SHIP 일 때까지 반복
- [ ] 운영 페이지(`백세한방병원 *.html`) 직접 수정 시 백업 후 진행
