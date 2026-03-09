#!/bin/bash
# マテリアル作成 → Meshへの割当フロー
# Usage: bash material-workflow.sh [ProjectName]

PROJECT="${1:-Project0}"
BASE="http://localhost:3001/api"

# 1. 現在のリソース確認
echo "=== Current Resources ==="
curl -s "$BASE/projects/$PROJECT/editor/resources" | python3 -m json.tool

# 2. マテリアル作成（ファイルシステム直接）
echo "=== Creating Material ==="
curl -s -X POST "$BASE/materials" \
  -H "Content-Type: application/json" \
  -d '{"name": "MyMaterial"}'

# 3. シェーダー作成（マテリアルに使用するシェーダー）
echo "=== Creating Shader ==="
curl -s -X POST "$BASE/shaders" \
  -H "Content-Type: application/json" \
  -d '{"name": "MyShader", "template": "mesh"}'

# 4. Meshコンポーネントにマテリアルを割当
# まずエンティティのコンポーネントUUIDを取得
echo "=== Scene Tree ==="
curl -s "$BASE/projects/$PROJECT/editor/scene" | python3 -m json.tool

echo ""
echo "To assign material to a Mesh component, use:"
echo "curl -s -X POST $BASE/projects/$PROJECT/editor/field \\"
echo "  -H 'Content-Type: application/json' \\"
echo '  -d '"'"'{"targetUuid": "<COMPONENT_UUID>", "path": "material/name", "value": "MyMaterial"}'"'"''
echo ""

# 5. 保存
curl -s -X POST "$BASE/projects/$PROJECT/editor/save"

echo "Done: Material workflow for $PROJECT"
