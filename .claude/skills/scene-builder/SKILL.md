---
name: scene-builder
description: >
  OREngineのシーンをREST APIで構築・修正する。シーン作成、エンティティ追加・削除、
  コンポーネント設定、オブジェクト配置などシーン操作全般を担当する。
allowed-tools: Bash(curl:*)
---

# Scene Builder - OREngine Editor REST API によるシーン構築

OREngineの Editor REST API を使ってシーンを構築・修正するスキル。
**scene.json を直接編集せず、必ず REST API 経由で操作すること。**

## 前提条件

- 開発サーバーが `http://localhost:3001` で起動していること（`npm run dev`）
- プロジェクトが存在すること（`GET /api/projects` で確認）

## 鉄則: 操作前の既存シーン確認（必須）

**すべてのシーン操作の前に、必ず以下を実行して既存シーンの状態を把握すること。**
この手順を省略してシーン操作を始めてはならない。

```bash
# 1. プロジェクト一覧確認
curl -s http://localhost:3001/api/projects | python3 -m json.tool

# 2. シーンツリー取得（全エンティティの名前・UUID・構成）
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/scene | python3 -m json.tool

# 3. リソース確認（マテリアル・テクスチャ）
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/resources | python3 -m json.tool
```

取得結果から以下を把握する:
- 既存エンティティの名前・UUID・親子関係
- 重複作成を防ぐため、追加したいエンティティが既に存在しないか確認
- 修正・削除対象のエンティティのUUIDを特定
- 利用可能なマテリアル・テクスチャの名前

## ワークフロー

### 新規シーン構築（プロジェクト再作成）

```bash
# 1. 既存プロジェクト削除
curl -s -X DELETE http://localhost:3001/api/projects/{PROJECT}

# 2. プロジェクト作成
curl -s -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "{PROJECT}"}'

# 3. バッチAPIでエンティティ一括作成
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entities \
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
  }'

# 4. 保存
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/save
```

### 既存シーンへのエンティティ追加

```bash
# 単一エンティティ作成 → コンポーネント追加 → フィールド設定
RESULT=$(curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entity \
  -H "Content-Type: application/json" \
  -d '{"parentUuid": "0", "name": "NewObject"}')
UUID=$(echo $RESULT | python3 -c "import sys,json; print(json.load(sys.stdin)['uuid'])")

# コンポーネント追加
COMP=$(curl -s -X POST "http://localhost:3001/api/projects/{PROJECT}/editor/entity/$UUID/component" \
  -H "Content-Type: application/json" \
  -d '{"componentName": "Mesh"}')
COMP_UUID=$(echo $COMP | python3 -c "import sys,json; print(json.load(sys.stdin)['uuid'])")

# フィールド設定
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/fields \
  -H "Content-Type: application/json" \
  -d "{\"fields\": [
    {\"targetUuid\": \"$UUID\", \"path\": \"position\", \"value\": [0, 1, 0]},
    {\"targetUuid\": \"$COMP_UUID\", \"path\": \"geometry/type\", \"value\": \"Sphere\"}
  ]}"
```

### 結果確認と保存

```bash
# シーン確認
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/scene | python3 -m json.tool

# 保存
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/save
```

## 重要なルール

- **scene.json を直接編集しない。** 必ず REST API 経由で操作すること
- エンティティ作成後は必ず `save` を呼ぶこと
- ルートエンティティの UUID は `"0"`
- バッチAPI を活用して1リクエストで複数エンティティを作成すること（効率的）
- コンポーネントのフィールドを設定するには、コンポーネントの UUID（エンティティの UUID ではない）を `targetUuid` に指定すること
- 操作前に `GET /editor/scene` で現状を確認し、操作後に再度確認して結果をユーザーに報告すること

## 詳細リファレンス

APIの全エンドポイント、コンポーネント一覧、フィールド仕様は [reference.md](reference.md) を参照。
