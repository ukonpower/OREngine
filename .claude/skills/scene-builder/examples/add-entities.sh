#!/bin/bash
# 既存シーンにエンティティを追加するフロー
# Usage: bash add-entities.sh [ProjectName]

PROJECT="${1:-Project0}"
BASE="http://localhost:3001/api"

# 1. 現在のシーン確認
echo "=== Current Scene ==="
curl -s "$BASE/projects/$PROJECT/editor/scene" | python3 -m json.tool

# 2. 単一エンティティ作成
RESULT=$(curl -s -X POST "$BASE/projects/$PROJECT/editor/entity" \
  -H "Content-Type: application/json" \
  -d '{"parentUuid": "0", "name": "NewObject"}')
UUID=$(echo $RESULT | python3 -c "import sys,json; print(json.load(sys.stdin)['uuid'])")
echo "Created entity: $UUID"

# 3. コンポーネント追加
COMP=$(curl -s -X POST "$BASE/projects/$PROJECT/editor/entity/$UUID/component" \
  -H "Content-Type: application/json" \
  -d '{"componentName": "Mesh"}')
COMP_UUID=$(echo $COMP | python3 -c "import sys,json; print(json.load(sys.stdin)['uuid'])")
echo "Added component: $COMP_UUID"

# 4. フィールド一括設定
curl -s -X POST "$BASE/projects/$PROJECT/editor/fields" \
  -H "Content-Type: application/json" \
  -d "{\"fields\": [
    {\"targetUuid\": \"$UUID\", \"path\": \"position\", \"value\": [0, 1, 0]},
    {\"targetUuid\": \"$COMP_UUID\", \"path\": \"geometry/type\", \"value\": \"Sphere\"}
  ]}"

# 5. 保存
curl -s -X POST "$BASE/projects/$PROJECT/editor/save"

echo "Done: Entity added to $PROJECT"
