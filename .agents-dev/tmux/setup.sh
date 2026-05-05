#!/usr/bin/env bash
# setup.sh — partition the current tmux window into the 3-CLI harness layout.
#
#   ┌────────────────────────┬───────────────────┐
#   │                        │  CODEX dashboard  │
#   │  PM (claude)           ├───────────────────┤
#   │                        │  GEMINI dashboard │
#   └────────────────────────┴───────────────────┘
#
# Run this from inside an existing tmux session. The left pane keeps your
# current shell — start `claude` there manually so you can see the auth flow.

set -euo pipefail

if [[ -z "${TMUX:-}" ]]; then
  cat >&2 <<EOF
Not inside a tmux session. Start one first, e.g.:

  tmux new-session -s 100seKMH
  bash .agents-dev/tmux/setup.sh

EOF
  exit 1
fi

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DASH="$PROJECT_ROOT/.agents-dev/tmux/dashboard.sh"

if [[ ! -x "$DASH" ]]; then
  echo "dashboard.sh not executable: $DASH" >&2
  exit 1
fi

# Split the current (left) pane horizontally → new pane on the right (40% width).
tmux split-window -h -p 40 -c "$PROJECT_ROOT" "bash '$DASH' codex"

# Split the right pane vertically → new pane below (50% of right column).
tmux split-window -v -p 50 -c "$PROJECT_ROOT" "bash '$DASH' gemini"

# Return focus to the left (PM) pane.
tmux select-pane -t 0

cat <<'EOF'
✅ 3-pane layout ready.
   • left pane:        run `claude` here (PM session)
   • right top pane:   Codex log dashboard (verdict-coloured)
   • right bottom:     Gemini log dashboard
EOF
