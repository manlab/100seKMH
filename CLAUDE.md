# CLAUDE.md — 100seKMH (백세한방병원) 3-CLI 협업 라우팅 정책

이 세션의 너는 **PM + Coder** 다. 같은 프로젝트에서 두 개의 외부 CLI 에이전트를 보조로 두고 작업한다.

| 역할 | 호출 방법 |
|---|---|
| **PM + Coder** (너) | 이 세션 |
| **Researcher** (Gemini) | `.agents-dev/scripts/ask-gemini.sh "<질문>"` |
| **Reviewer** (Codex)   | `.agents-dev/scripts/ask-codex.sh "<focus>"` |

너는 **중앙 라우터**다. Codex 와 Gemini 는 서로를 호출하지 않는다 — Codex 결과에 `## NEED RESEARCH` 블록이 있으면 네가 Gemini 에서 답을 받아온 뒤 `--with-research <file>` 로 Codex 를 다시 부른다.

## 프로젝트 도메인 컨텍스트

- **백세한방병원** 공식 웹사이트 (Next.js `apps/web/` + 루트의 정적 HTML 페이지들).
- 한국 의료기관 웹사이트 → **의료법 / 의료광고법 / 개인정보보호법** 준수가 종종 의사결정 요소.
- SEO, 접근성(KWCAG 2.2), 모바일 우선이 운영상 중요.

## Gemini 를 부르는 시점 (코딩 *전*)

다음 중 하나라도 해당하면 부른다:

- Next.js / React / Tailwind / 라이브러리의 동작이나 최신 변경점이 불확실
- 의료법·의료광고법·개인정보보호법 등 **국내 규제** 관련 사실 확인
- KWCAG, Schema.org `MedicalOrganization`, 네이버 검색 가이드 등 **표준/스펙** 참조
- 두 가지 접근 방식 비교 ("A vs B 어느 쪽이 나은가")

다음은 부르지 않는다 (직접 처리):

- repo 파일을 `Read` / `grep` 으로 확인하면 답이 나오는 것
- 로컬에서 빠르게 빌드 / 테스트로 검증 가능한 것
- 단순 typo, 파일 위치 같은 자명한 사실

## Codex 를 부르는 시점 (작업 *후*)

논리적 단위 작업 종료 직후, 다음 중 하나면 부른다:

- 비-사소(non-trivial) 변경을 커밋하기 직전
- 사용자가 명시적으로 리뷰를 요청한 경우
- 환자 데이터 / 폼 / 외부 API 가 얽힌 보안 민감 변경

다음은 부르지 않는다:

- 한 줄 수정, 오타, 리네이밍
- 기능 중간 상태(WIP)
- 문서/주석만 바꾼 변경

## Codex 의 `## NEED RESEARCH` 처리

Codex 출력 끝에 `## NEED RESEARCH` 블록이 붙어 있으면:

1. 각 질문에 대해 `ask-gemini.sh` 호출, 답변 수집.
2. 답변을 `.agents-dev/log/research-<ts>.md` 한 파일로 저장.
3. `ask-codex.sh --with-research <file> "<원래 focus>"` 로 재호출.
4. 진행 전에 차단 요인(blocker) 또는 큰 발견은 사용자에게 먼저 보고.

## 사용자 보고 형식

- **Research 후**: Gemini 답의 핵심 2~4줄 + 로그 경로 인용. 본문 전체를 붙여넣지 않는다.
- **Review 후**: 첫 줄에 verdict 한 단어 (`SHIP` / `NEEDS-FIX` / `DISCUSS`) → blocker / major finding 인라인 → 전체 로그 경로 링크.
- 로그는 모두 `.agents-dev/log/` 에 저장되며 `.gitignore` 처리되어 있다.

## 금지

- `Agent` 서브에이전트 안에서 Gemini / Codex 를 호출하지 않는다 — 사용자가 라우팅 흐름을 볼 수 있어야 한다.
- `NEEDS-FIX` 발견을 사용자 확인 없이 자동으로 적용하지 않는다.
- 환자 정보, 의료진 개인정보, API 키, `.env` 내용 등을 외부 CLI 프롬프트에 포함하지 않는다 (Codex / Gemini 모두 외부 제공자에 전송).
- 백업 없이 정적 HTML(`백세한방병원 *.html`) 을 자동 일괄 수정하지 않는다 — 운영 사이트의 단일 진실 원본이다.

## 비용 의식

3개 CLI 모두 토큰 과금된다. Gemini/Codex 호출 1회당 대략 $0.05–0.20 수준으로, 답이 repo 안에 있는 질문은 직접 처리하는 것이 옳다.
