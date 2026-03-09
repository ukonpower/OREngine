---
name: scene-builder
description: >
  This skill should be used when the user asks to "シーンを作って", "エンティティを追加",
  "オブジェクトを配置", "マテリアルを設定", "ライトを追加", "カメラを配置",
  "シーンを修正", "コンポーネントを追加", "シェーダーを作成", "テクスチャを設定",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  or 3D object placement in OREngine. Operates via REST API against localhost:3001.
allowed-tools: Bash(curl:*), Bash(bash:*), Bash(chmod:*)
---

# Scene Builder - OREngine REST API シーン構築

OREngineのEditor REST APIでシーンを構築・修正するスキル。
**scene.jsonを直接編集せず、必ずREST API経由で操作する。**
リファレンスは問題が発生したときのみ参照する。

## 前提条件

- 開発サーバーが `http://localhost:3001` で起動していること（`npm run dev`）
- サーバー状態確認: `bash ${CLAUDE_SKILL_DIR}/scripts/check-server.sh`

## Decision Map

何をしたいかに応じて適切なフローへ進む:

- 新規シーン構築 → Flow 1 + `examples/basic-scene.sh`
- 既存シーンにオブジェクト追加 → Flow 2 + `examples/add-entities.sh`
- マテリアル・テクスチャ設定 → Flow 3 + `examples/material-workflow.sh`
- コンポーネントの詳細・フィールド → `references/components-catalog.md`
- エンティティAPI仕様 → `references/api-entities.md`
- マテリアル・シェーダーAPI仕様 → `references/api-resources.md`
- エラー・うまくいかない → `references/troubleshooting.md`

## 鉄則: 操作前の既存シーン確認（必須）

**すべてのシーン操作の前に、必ず以下を実行して既存シーンの状態を把握する。**
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

## Canonical Flows

### Flow 1: 新規シーン構築

プロジェクト再作成 → バッチAPIでエンティティ一括作成 → 保存。
完全な例は `examples/basic-scene.sh` を参照。

```bash
# 概要: DELETE project → POST project → POST /editor/entities (batch) → POST /editor/save
curl -s -X DELETE http://localhost:3001/api/projects/{PROJECT}
curl -s -X POST http://localhost:3001/api/projects -H "Content-Type: application/json" -d '{"name": "{PROJECT}"}'
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entities -H "Content-Type: application/json" -d '{"entities": [...]}'
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/save
```

### Flow 2: 既存シーンへのエンティティ追加

シーン確認 → エンティティ作成 → コンポーネント追加 → フィールド設定 → 保存。
完全な例は `examples/add-entities.sh` を参照。

```bash
# 概要: GET /editor/scene → POST /editor/entity → POST component → POST /editor/fields → POST /editor/save
```

### Flow 3: マテリアル設定

リソース確認 → マテリアル作成 → Meshコンポーネントに割当 → 保存。
完全な例は `examples/material-workflow.sh` を参照。

```bash
# 概要: GET /editor/resources → POST /materials → POST /editor/field (material/name) → POST /editor/save
```

## Command Skeleton

### プロジェクト
```
GET    /api/projects                           # 一覧
POST   /api/projects         {name}            # 作成
DELETE /api/projects/:name                     # 削除
```

### シーン読み取り
```
GET /api/projects/:p/editor/scene              # シーンツリー
GET /api/projects/:p/editor/entity/:uuid       # エンティティ詳細
GET /api/projects/:p/editor/search?q=name      # 名前検索
GET /api/projects/:p/editor/components         # コンポーネント一覧
GET /api/projects/:p/editor/resources          # リソース一覧
GET /api/projects/:p/editor/status             # ステータス
```

### エンティティ操作
```
POST   /api/projects/:p/editor/entity          {parentUuid, name}           # 作成
POST   /api/projects/:p/editor/entities        {entities: [...]}            # バッチ作成
DELETE /api/projects/:p/editor/entity/:uuid                                 # 削除
POST   /api/projects/:p/editor/entity/:uuid/component  {componentName}     # コンポーネント追加
DELETE /api/projects/:p/editor/entity/:uuid/component/:name                 # コンポーネント削除
```

### フィールド設定
```
POST /api/projects/:p/editor/field             {targetUuid, path, value}    # 単一
POST /api/projects/:p/editor/fields            {fields: [...]}             # バッチ
POST /api/projects/:p/editor/entity/:uuid/lookAt  {target: [x,y,z]}       # 向き設定
```

### 保存・Undo/Redo
```
POST /api/projects/:p/editor/save              # 保存
POST /api/projects/:p/editor/undo              # 元に戻す（ブラウザ接続時のみ）
POST /api/projects/:p/editor/redo              # やり直す（ブラウザ接続時のみ）
```

### リソース管理
```
GET/POST/PUT/DELETE /api/materials/:name        # マテリアルファイル
GET/POST/PUT/DELETE /api/textures/:name         # テクスチャファイル
GET/POST/DELETE     /api/shaders/:name          # シェーダー
GET/POST/DELETE     /api/components/:path       # コンポーネントリソース
```

## Guardrails

- **scene.jsonを直接編集しない。** 必ずREST API経由で操作する
- **操作前にGET /editor/sceneで現状確認する。** 操作後にも確認して結果を報告する
- **エンティティ作成後は必ずsaveを呼ぶ**
- **ルートエンティティのUUIDは `"0"`**
- **バッチAPIを活用して効率的に操作する**（1エンティティずつ作成するのではなく一括で）
- **フィールド設定のtargetUuidはコンポーネントUUID**（エンティティUUIDではない）
- **同じAPIが3回失敗したら `references/troubleshooting.md` を確認する**

## Common Mistakes

- **エンティティUUIDでフィールド設定**: コンポーネントレベルのフィールド（geometry/type等）は**コンポーネントUUID**をtargetUuidに指定する
- **parentUuid省略**: ルート直下に配置する場合も `"0"` を明示する
- **保存忘れ**: エンティティ操作後に `POST /editor/save` を呼ばないとシーンが永続化されない
- **シーン未確認で操作開始**: 既存エンティティと重複するオブジェクトを作成してしまう

## References

詳細が必要な場合のみ参照する:

- **[references/api-entities.md](references/api-entities.md)** - エンティティ操作APIの全仕様
- **[references/api-resources.md](references/api-resources.md)** - マテリアル・テクスチャ・シェーダーAPI
- **[references/components-catalog.md](references/components-catalog.md)** - コンポーネント一覧とフィールド詳細
- **[references/troubleshooting.md](references/troubleshooting.md)** - エラー対処・Stop Conditions

## Examples

実行可能なスクリプト:

- **[examples/basic-scene.sh](examples/basic-scene.sh)** - 基本シーン構築（Floor + Light + Camera）
- **[examples/add-entities.sh](examples/add-entities.sh)** - エンティティ追加フロー
- **[examples/material-workflow.sh](examples/material-workflow.sh)** - マテリアル作成・割当フロー
