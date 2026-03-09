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
else
  echo "Server: NOT RUNNING"
  echo "Start with: npm run dev"
  exit 1
fi
