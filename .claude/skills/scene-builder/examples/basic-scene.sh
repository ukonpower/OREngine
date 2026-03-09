#!/bin/bash
# 基本シーン構築: Floor + Light + Camera
# Usage: bash basic-scene.sh [ProjectName]

PROJECT="${1:-Project0}"
BASE="http://localhost:3001/api"

# 1. 既存プロジェクト削除
curl -s -X DELETE "$BASE/projects/$PROJECT"

# 2. プロジェクト作成
curl -s -X POST "$BASE/projects" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"$PROJECT\"}"

# 3. バッチAPIでエンティティ一括作成
curl -s -X POST "$BASE/projects/$PROJECT/editor/entities" \
  -H "Content-Type: application/json" \
  -d '{
    "entities": [
      {
        "name": "Floor",
        "parentUuid": "0",
        "position": [0, -0.5, 0],
        "scale": [5, 1, 5],
        "components": [
          { "componentName": "Mesh", "fields": { "geometry/type": "Plane" } }
        ]
      },
      {
        "name": "MainLight",
        "parentUuid": "0",
        "position": [3, 4, 2],
        "euler": [-0.8, 0.5, 0],
        "components": [
          { "componentName": "Light" }
        ]
      },
      {
        "name": "Camera",
        "parentUuid": "0",
        "position": [0, 1.5, 4],
        "euler": [-0.2, 0, 0],
        "components": [
          { "componentName": "ShakeViewer", "fields": { "power": 0.15, "speed": 1 } },
          { "componentName": "PostProcessPipeline", "fields": { "postprocess": [true, true, true, true] } },
          { "componentName": "MainCamera" }
        ]
      }
    ]
  }' | python3 -m json.tool

# 4. 保存
curl -s -X POST "$BASE/projects/$PROJECT/editor/save"

echo "Done: Basic scene created for $PROJECT"
