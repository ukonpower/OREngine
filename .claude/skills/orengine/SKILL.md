---
name: orengine
description: >
  This skill should be used when the user asks to "シーンを作って", "エンティティを追加",
  "オブジェクトを配置", "マテリアルを設定", "ライトを追加", "カメラを配置",
  "シーンを修正", "コンポーネントを追加", "コンポーネントを作成", "シェーダーを作成",
  "シェーダーを書いて", "テクスチャを設定", "シーンを確認", "シーンを保存",
  or mentions scene construction, entity manipulation, component development,
  shader programming, or 3D object placement in OREngine.
allowed-tools: Bash(curl:*), Bash(bash:*), Bash(chmod:*), Read, Write, Edit, Glob, Grep
---

# OREngine スキル

OREngineのシーン構築・コンポーネント開発・リソース管理を行うスキル。
リファレンスは問題が発生したときのみ参照する。

## 前提条件

- 開発サーバーが `http://localhost:3001` で起動していること（`npm run dev`）
- サーバー状態確認: `bash ${CLAUDE_SKILL_DIR}/scripts/check-server.sh`

## Decision Map

何をしたいかに応じて適切なフローへ進む:

- 新規シーン構築 → Flow 1: シーン構築
- 既存シーンにオブジェクト追加 → Flow 1: シーン構築
- マテリアル・シェーダー・テクスチャ作成 → Flow 2: リソース作成
- シェーダーのGLSLコード編集 → Flow 3: シェーダー編集
- カスタムコンポーネント作成 → Flow 4: コンポーネント開発
- エンティティAPI仕様 → `references/api-scene.md`
- リソースAPI仕様 → `references/api-resources.md`
- コンポーネント一覧・フィールド → `references/components-catalog.md`
- コンポーネント開発パターン → `references/component-development.md`
- シェーダー記述リファレンス → `references/shader-guide.md`
- エラー・うまくいかない → `references/troubleshooting.md`

## 鉄則: 操作前の既存シーン確認（必須）

**シーン操作の前に、必ず以下を実行して既存シーンの状態を把握する。**

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

## Canonical Flows

### Flow 1: シーン構築（REST API）

エンティティの作成・配置・フィールド設定・保存はすべてREST API経由。

```bash
# 新規シーン: DELETE project → POST project → POST /editor/entities (batch) → POST /editor/save
curl -s -X DELETE http://localhost:3001/api/projects/{PROJECT}
curl -s -X POST http://localhost:3001/api/projects -H "Content-Type: application/json" -d '{"name": "{PROJECT}"}'
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entities -H "Content-Type: application/json" -d '{"entities": [...]}'
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/save

# 既存シーンへの追加: GET /editor/scene → POST /editor/entity → POST component → POST /editor/fields → POST /editor/save
```

API詳細は `references/api-scene.md` を参照。

### Flow 2: リソース作成（REST API）

マテリアル・シェーダー・テクスチャの作成はREST API経由。

```bash
# マテリアル作成
curl -s -X POST http://localhost:3001/api/materials -H "Content-Type: application/json" -d '{"name": "MyMaterial"}'

# シェーダー作成（テンプレート: "mesh" or "texture"）
curl -s -X POST http://localhost:3001/api/shaders -H "Content-Type: application/json" -d '{"name": "MyShader", "template": "mesh"}'

# Meshコンポーネントにマテリアル割当
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/field \
  -H "Content-Type: application/json" \
  -d '{"targetUuid": "<COMPONENT_UUID>", "path": "material/name", "value": "MyMaterial"}'
```

API詳細は `references/api-resources.md` を参照。

### Flow 3: シェーダー編集（直接コード編集）

シェーダーのGLSLコードは直接ファイルを編集する。

```
src/ts/Resources/Shaders/{ShaderName}/
├── index.vs   # 頂点シェーダー
└── index.fs   # フラグメントシェーダー
```

シェーダーの書き方は `references/shader-guide.md` を参照。

### Flow 4: コンポーネント開発（直接コード編集）

カスタムコンポーネントはコードを直接記述して作成する。

**手順:**
1. `src/ts/Resources/Components/{Category}/{Name}/index.ts` にコンポーネントクラスを実装
2. `src/ts/Resources/_data/componentList.ts` にクラスを登録

開発パターンの詳細は `references/component-development.md` を参照。

## Guardrails

- **scene.jsonを直接編集しない。** エンティティ操作は必ずREST API経由
- **操作前にGET /editor/sceneで現状確認する。** 操作後にも確認して結果を報告する
- **エンティティ作成後は必ずsaveを呼ぶ**
- **ルートエンティティのUUIDは `"0"`**
- **バッチAPIを活用して効率的に操作する**
- **フィールド設定のtargetUuidはコンポーネントUUID**（エンティティUUIDではない）
- **コンポーネント作成後は `npm run typecheck` で型チェックを実行する**
- **同じAPIが3回失敗したら `references/troubleshooting.md` を確認する**

## References

詳細が必要な場合のみ参照する:

- **[references/api-scene.md](references/api-scene.md)** - シーン操作API（エンティティCRUD・フィールド設定・保存）
- **[references/api-resources.md](references/api-resources.md)** - マテリアル・シェーダー・テクスチャAPI
- **[references/components-catalog.md](references/components-catalog.md)** - ビルトインコンポーネント一覧とフィールド
- **[references/component-development.md](references/component-development.md)** - カスタムコンポーネント開発ガイド
- **[references/shader-guide.md](references/shader-guide.md)** - シェーダー記述ガイド（インクルード・GBuffer出力）
- **[references/troubleshooting.md](references/troubleshooting.md)** - エラー対処・Stop Conditions
