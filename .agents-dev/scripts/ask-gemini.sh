#!/usr/bin/env bash
# ask-gemini.sh — fetch research / spec / regulation answers from Gemini.
# Usage:
#   ask-gemini.sh "<question>"
#
# Stdout carries ONLY the model's response (no CLI banner, no warnings).
# Stderr from gemini is preserved in a separate transcript file for debugging.
# The main log file ends with the clean response so dashboards / consumers
# can rely on the response shape.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_DIR="$PROJECT_ROOT/.agents-dev/log"
mkdir -p "$LOG_DIR"
TS="$(date +%Y%m%d-%H%M%S)-$$"
LOG_FILE="$LOG_DIR/gemini-$TS.md"
TRANSCRIPT_FILE="$LOG_DIR/gemini-$TS.transcript.log"

if [[ $# -lt 1 || -z "${1:-}" ]]; then
  echo "Usage: ask-gemini.sh \"<question>\"" >&2
  exit 2
fi

QUESTION="$1"

read -r -d '' SYSTEM_PREAMBLE <<'EOF' || true
You are the **Researcher** in a 3-CLI team for the 100seKMH (백세한방병원)
Korean hospital website (Next.js + static HTML). Claude Code (PM) is calling
you to verify facts before code is written.

## Output contract

- Lead with a 1-line direct answer.
- Then 3–8 bullets with the supporting facts.
- Cite primary sources with full URLs (official docs, RFCs, 법제처/법령정보,
  네이버 검색 가이드, KWCAG, Schema.org, MDN).
- Prefer Korean-language primary sources when the question concerns Korean
  law (의료법, 의료광고법, 개인정보보호법) or Korean web standards.
- Distinguish "the spec says X" from "common practice is Y".
- Do not write or modify code. Do not speculate without sources.

If the question is too broad or unanswerable as stated, say so in one line
and ask the PM for the missing context — do not pad with guesses.
EOF

PROMPT="$SYSTEM_PREAMBLE

## Question
$QUESTION"

cd "$PROJECT_ROOT"
echo "→ gemini -p   (q: $QUESTION)" >&2
echo "  log:        $LOG_FILE" >&2
echo "  transcript: $TRANSCRIPT_FILE" >&2
echo "" >&2

{
  printf '# Gemini research — %s\n\n' "$TS"
  printf '**Question:** %s\n\n' "$QUESTION"
  printf -- '---\n\n'
} > "$LOG_FILE"

# Capture stdout (clean response) separately from stderr (CLI warnings).
# Tee splits stdout to both the log and the user's terminal.
set +e
gemini -p "$PROMPT" 2>> "$TRANSCRIPT_FILE" | tee -a "$LOG_FILE"
EXIT="${PIPESTATUS[0]}"
set -e

echo "" >&2
echo "📝 saved: $LOG_FILE" >&2
exit "$EXIT"
