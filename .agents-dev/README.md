# .agents-dev — 3-CLI 협업 셋업

이 디렉토리는 Claude Code (PM) 가 외부 CLI 두 대(Codex, Gemini)를 보조로 부려서 작업하기 위한 셋업이다. 라우팅 규칙은 프로젝트 루트 [`CLAUDE.md`](../CLAUDE.md) 에 있다.

> 📖 **사용법 전체 매뉴얼: [GUIDE.md](./GUIDE.md)** — tmux 셋업 / 자연어 라우팅 / 수동 호출 / 출력 계약 / 실전 사례 / 문제 해결.

> 컨셉 출처: [pandas-studio/agent-harness-tutorial](https://github.com/pandas-studio/agent-harness-tutorial) (CC BY-NC-ND 4.0). 본 셋업의 모든 파일은 컨셉만 차용해 직접 작성된 것이며, 원 저장소의 코드는 포함되지 않는다.

## 구조

```
.agents-dev/
├── README.md              ← 이 파일
├── scripts/
│   ├── ask-codex.sh       ← Codex(reviewer) 호출 래퍼
│   └── ask-gemini.sh      ← Gemini(researcher) 호출 래퍼
└── log/                   ← 호출별 출력 로그 (gitignored)
    └── .gitkeep
```

## 사용

PM(Claude Code) 세션에서 자연어로 일을 시키면 알아서 라우팅한다. 예:

```
입원안내 페이지에 추가한 schema.org MedicalOrganization JSON-LD,
Codex 리뷰 받고 의료광고법상 표시 의무 사항은 Gemini 한테 확인해줘.
```

수동 호출도 가능 (디버깅 / 단일 질의용):

```bash
# 리서치
.agents-dev/scripts/ask-gemini.sh "Schema.org MedicalOrganization 의 medicalSpecialty 값 권장 vocabulary 가 뭔가?"

# 리뷰
.agents-dev/scripts/ask-codex.sh "apps/web/src/app/page.tsx 의 새 Hero 섹션 마크업/접근성"

# 리서치 결과 첨부해서 리뷰
.agents-dev/scripts/ask-codex.sh --with-research .agents-dev/log/gemini-20260101-120000.md "위 focus 동일"
```

## 출력 계약

- **Codex** 응답 첫 줄은 `SHIP` / `NEEDS-FIX` / `DISCUSS` 중 하나. 이어서 `## Blockers`, `## Major`, `## Nits` 섹션. 정보 부족 시 끝에 `## NEED RESEARCH` 블록.
- **Gemini** 응답은 1줄 직답 + 3~8 bullet + 1차 출처 URL.

## 로그 파일

호출당 두 개 (codex의 경우 셋) 의 파일이 `.agents-dev/log/` 에 떨어진다 (모두 gitignored):

| 파일 | 내용 |
|---|---|
| `<role>-<ts>-<pid>.md` | 헤더 + 질문/focus + 모델 응답만 (대시보드/소비자가 읽는 정본) |
| `<role>-<ts>-<pid>.transcript.log` | CLI 배너·툴 호출·진행 로그·stderr (디버깅용) |
| `codex-<ts>-<pid>.response.md` | codex 의 최종 메시지만 (`--output-last-message` 결과) |

stdout 으로 흐르는 텍스트는 **모델 응답뿐**이므로, PM(Claude)은 첫 줄을 신뢰하고 verdict 를 분기할 수 있다.

## 비용 / 보안 주의

- Codex / Gemini 둘 다 외부 제공자(OpenAI / Google) 로 프롬프트가 송신된다.
- 환자 정보, 의료진 개인정보, API 키, `.env` 내용은 절대 프롬프트에 포함하지 않는다.
- 호출 1회 ≈ $0.05–0.20. repo 안에서 답이 나오는 질문은 직접 처리.

## 라이선스

본 셋업의 컨셉 원본은 CC BY-NC-ND 4.0 라이선스다. 본 디렉토리의 스크립트와 문서는 원본을 복사하지 않고 직접 작성되었으므로 본 프로젝트(100seKMH)의 라이선스를 따른다.
