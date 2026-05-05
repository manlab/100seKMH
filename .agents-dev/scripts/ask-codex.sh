#!/usr/bin/env bash
# ask-codex.sh — request a code review from Codex (reviewer role)
# Usage:
#   ask-codex.sh "<focus>"
#   ask-codex.sh --with-research <research-file> "<focus>"
#
# Output contract: the agent's **final message** is the only thing the consumer
# sees on stdout, so the verdict (SHIP / NEEDS-FIX / DISCUSS) is on line 1.
# The full codex CLI transcript (banner, exec traces, reasoning) is preserved
# separately for debugging.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_DIR="$PROJECT_ROOT/.agents-dev/log"
mkdir -p "$LOG_DIR"
TS="$(date +%Y%m%d-%H%M%S)-$$"
LOG_FILE="$LOG_DIR/codex-$TS.md"
TRANSCRIPT_FILE="$LOG_DIR/codex-$TS.transcript.log"
RESPONSE_FILE="$LOG_DIR/codex-$TS.response.md"

RESEARCH_FILE=""
if [[ "${1:-}" == "--with-research" ]]; then
  if [[ $# -lt 3 ]]; then
    echo "ask-codex.sh: --with-research requires <file> and <focus>" >&2
    exit 2
  fi
  RESEARCH_FILE="$2"
  shift 2
fi

if [[ $# -lt 1 || -z "${1:-}" ]]; then
  echo "Usage: ask-codex.sh [--with-research <file>] \"<focus>\"" >&2
  exit 2
fi

FOCUS="$1"

read -r -d '' SYSTEM_PREAMBLE <<'EOF' || true
You are the **Reviewer** in a 3-CLI team for the 100seKMH (백세한방병원) Korean
hospital website. The repo contains a Next.js app under apps/web/ and a set of
static HTML pages at the project root. Claude Code (PM) is calling you and will
relay your verdict to the user.

## Output contract (strict)

Line 1 MUST be exactly one of:
  SHIP        — safe to commit / merge as-is
  NEEDS-FIX   — has blockers; do not merge
  DISCUSS     — judgement call needed from the user

Then:
  ## Blockers   — must-fix items (omit section if none)
  ## Major      — significant findings worth attention
  ## Nits       — small style / clarity points (optional)

If you cannot decide because you lack information about library behavior,
Korean medical regulations, accessibility standards, or anything you cannot
verify from the repo, append at the very end:

  ## NEED RESEARCH
  - <one focused question>
  - <one focused question>

Do NOT speculate beyond what you can read in the working tree.
EOF

PROMPT="$SYSTEM_PREAMBLE

## Review focus
$FOCUS"

if [[ -n "$RESEARCH_FILE" ]]; then
  if [[ ! -f "$RESEARCH_FILE" ]]; then
    echo "ask-codex.sh: research file not found: $RESEARCH_FILE" >&2
    exit 2
  fi
  PROMPT="$PROMPT

## Research provided (from Gemini, via PM)
$(cat "$RESEARCH_FILE")"
fi

cd "$PROJECT_ROOT"
echo "→ codex exec  (focus: $FOCUS)" >&2
echo "  log:        $LOG_FILE" >&2
echo "  transcript: $TRANSCRIPT_FILE" >&2
echo "" >&2

{
  printf '# Codex review — %s\n\n' "$TS"
  printf '**Focus:** %s\n\n' "$FOCUS"
  if [[ -n "$RESEARCH_FILE" ]]; then
    printf '**Research:** %s\n\n' "$RESEARCH_FILE"
  fi
  printf -- '---\n\n'
} > "$LOG_FILE"

# `--output-last-message` writes ONLY the agent's final response (verdict + sections)
# to the given file. The full transcript (banner, tool calls, reasoning) goes to
# the transcript log. We never merge stderr into stdout, so the consumer reads a
# clean verdict-first stream.
set +e
codex exec --output-last-message "$RESPONSE_FILE" "$PROMPT" \
  > "$TRANSCRIPT_FILE" 2>> "$TRANSCRIPT_FILE"
EXIT=$?
set -e

if [[ ! -s "$RESPONSE_FILE" ]]; then
  echo "ask-codex.sh: codex produced no response (exit=$EXIT). See $TRANSCRIPT_FILE" >&2
  exit "$EXIT"
fi

# Append the clean response to the main log AND emit it on stdout.
cat "$RESPONSE_FILE" >> "$LOG_FILE"
cat "$RESPONSE_FILE"

echo "" >&2
echo "📝 saved: $LOG_FILE" >&2
exit "$EXIT"
