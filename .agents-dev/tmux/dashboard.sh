#!/usr/bin/env bash
# dashboard.sh — watch the latest log file for one role and re-render every 2s.
# Usage: dashboard.sh codex | gemini
#
# Polls .agents-dev/log/<role>-*.md, picks the newest, and shows its tail
# with colorised verdict / section headings. Restarts cleanly on Ctrl-C.

set -euo pipefail

ROLE="${1:-}"
case "$ROLE" in
  codex|gemini) ;;
  *) echo "Usage: dashboard.sh {codex|gemini}" >&2; exit 2 ;;
esac

LOG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../log" && pwd)"

colorize() {
  awk '
    BEGIN {
      GREEN_BG = "\033[1;42m\033[30m"
      RED_BG   = "\033[1;41m\033[37m"
      YEL_BG   = "\033[1;43m\033[30m"
      MAGENTA  = "\033[1;35m"
      CYAN     = "\033[1;36m"
      DIM      = "\033[2m"
      RST      = "\033[0m"
    }
    /^SHIP$/                       { printf "%s %s %s\n", GREEN_BG, $0, RST; next }
    /^NEEDS-FIX$/                  { printf "%s %s %s\n", RED_BG,   $0, RST; next }
    /^DISCUSS$/                    { printf "%s %s %s\n", YEL_BG,   $0, RST; next }
    /^## NEED RESEARCH/            { printf "%s%s%s\n",    MAGENTA,  $0, RST; next }
    /^## (Blockers|Major|Nits|Question|Focus|Research)/ { printf "%s%s%s\n", CYAN, $0, RST; next }
    /^---$/                        { printf "%s%s%s\n",    DIM,      $0, RST; next }
    { print }
  '
}

ROLE_UPPER="$(echo "$ROLE" | tr '[:lower:]' '[:upper:]')"

trap 'tput cnorm 2>/dev/null || true; exit 0' INT TERM
tput civis 2>/dev/null || true

while true; do
  LATEST="$(ls -1t "$LOG_DIR/$ROLE"-*.md 2>/dev/null | head -1 || true)"
  ROWS="$(tput lines 2>/dev/null || echo 24)"
  BODY_ROWS=$(( ROWS - 4 ))
  (( BODY_ROWS < 5 )) && BODY_ROWS=5

  printf '\033[H\033[2J'
  printf '\033[1;34m━━━ %s dashboard ━━━\033[0m\n' "$ROLE_UPPER"
  if [[ -z "$LATEST" ]]; then
    printf '  (no logs yet — call ask-%s.sh to generate)\n' "$ROLE"
  else
    printf '  \033[2m%s\033[0m\n\n' "$(basename "$LATEST")"
    tail -n "$BODY_ROWS" "$LATEST" | colorize
  fi
  sleep 2
done
