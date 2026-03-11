#!/bin/bash
# OREngine開発サーバーの状態確認
# Usage: bash check-server.sh

BASE="http://localhost:3001/api"

echo "=== Server Status ==="
if curl -sf "$BASE/projects" > /dev/null 2>&1; then
  echo "Server: RUNNING (localhost:3001)"
  echo ""
  echo "=== Projects ==="
  curl -s "$BASE/projects" | python3 -m json.tool
  echo ""
  echo "=== Browser Connection ==="
  for project in $(curl -s "$BASE/projects" | python3 -c "import sys,json; [print(p) for p in json.load(sys.stdin)]" 2>/dev/null); do
    status=$(curl -s "$BASE/projects/$project/editor/status" 2>/dev/null)
    connected=$(echo "$status" | python3 -c "import sys,json; d=json.load(sys.stdin); print('CONNECTED' if d.get('connected') else 'disconnected')" 2>/dev/null || echo "unknown")
    echo "  $project: $connected"
  done
else
  echo "Server: NOT RUNNING"
  echo "Start with: npm run dev"
  exit 1
fi
