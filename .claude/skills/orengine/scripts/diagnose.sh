#!/bin/bash
# OREngine 一括診断スクリプト
# Usage: bash diagnose.sh [PROJECT_NAME]

BASE="http://localhost:3001/api"
PROJECT="${1:-$(curl -s "$BASE/projects" | python3 -c "import sys,json; p=json.load(sys.stdin); print(p[0] if p else '')" 2>/dev/null)}"

if [ -z "$PROJECT" ]; then
  echo "ERROR: No project found. Is the server running?"
  exit 1
fi

echo "=== Diagnose: $PROJECT ==="

echo -e "\n--- Vite Errors ---"
curl -s "$BASE/projects/$PROJECT/editor/vite-errors" | python3 -m json.tool

echo -e "\n--- Shader Errors ---"
curl -s "$BASE/projects/$PROJECT/editor/shader-errors" | python3 -m json.tool 2>/dev/null || echo "(requires browser)"

echo -e "\n--- Console Errors (error/warn) ---"
curl -s "$BASE/projects/$PROJECT/editor/console-errors?level=error,warn" | python3 -m json.tool 2>/dev/null || echo "(requires browser)"

echo -e "\n--- Console Logs (log/info) ---"
curl -s "$BASE/projects/$PROJECT/editor/console-errors?level=log,info" | python3 -m json.tool 2>/dev/null || echo "(requires browser)"

echo -e "\n--- Recent HMR Events ---"
curl -s "$BASE/projects/$PROJECT/editor/hmr-events" | python3 -m json.tool

echo -e "\n--- Registered Components ---"
curl -s "$BASE/projects/$PROJECT/editor/components" | python3 -m json.tool

echo -e "\n--- Server Log (last 30 lines) ---"
tail -30 /tmp/orengine-server.log 2>/dev/null || echo "(no server log file)"

echo -e "\n--- Vite Log (last 30 lines) ---"
tail -30 /tmp/orengine-vite.log 2>/dev/null || echo "(no vite log file)"
