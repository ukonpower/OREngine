---
name: orengine
description: >
  OREngineの3Dシーン構築・コンポーネント開発・シェーダー作成を行うワークフロースキル。
  REST API経由でエンティティ作成・配置・マテリアル設定・保存を自動化し、スクリーンショットで結果確認する。
  Use when user asks to "シーンを作って", "エンティティを追加", "オブジェクトを配置",
  "マテリアルを設定", "ライトを追加", "カメラを配置", "シーンを修正", "コンポーネントを追加",
  "コンポーネントを作成", "シェーダーを作成", "シェーダーを書いて", "テクスチャを設定",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  component development, shader programming, or 3D object placement in OREngine.
  Do NOT use for general TypeScript/JavaScript questions, GLSL syntax reference,
  or non-OREngine 3D engine work.
allowed-tools: Bash(curl:*), Bash(bash:*), Bash(chmod:*), Read, Write, Edit, Glob, Grep
metadata:
  author: ukonpower
  version: 1.1.0
---

# OREngine スキル

OREngineのシーン構築・コンポーネント開発・リソース管理を行うスキル。
REST APIでエンティティ操作、ファイル編集でシェーダー・コンポーネント開発を行う。
リファレンスは詳細が必要な場合のみClaudeが自動参照する。

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

### Flow 1.5: シーン確認（スクリーンショット）

**シーン構築後・変更後は必ずスクリーンショットで結果を目視確認する。**

```bash
# 1. タイムラインを適切なフレームに移動（アニメーションがある場合）
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/timeline/seek \
  -H "Content-Type: application/json" -d '{"frame": 0}'

# 2. カメラを見やすい位置に移動
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/camera/position \
  -H "Content-Type: application/json" \
  -d '{"eye": {"x": 5, "y": 3, "z": 5}, "target": {"x": 0, "y": 0, "z": 0}}'

# 3. スクリーンショット取得（JPEG推奨: サイズが小さい）
curl -s "http://localhost:3001/api/projects/{PROJECT}/editor/screenshot?format=jpeg&quality=0.7" \
  | python3 -c "import sys,json,base64; d=json.load(sys.stdin); open('/tmp/orengine_screenshot.jpg','wb').write(base64.b64decode(d['image'].split(',')[1]))"

# 4. スクリーンショットをReadツールで確認
# → Read /tmp/orengine_screenshot.jpg
```

**カメラ位置の目安:**
- シーン全体を見渡す: `eye: {x:8, y:5, z:8}`, `target: {x:0, y:0, z:0}`
- 正面から: `eye: {x:0, y:1, z:5}`, `target: {x:0, y:0, z:0}`
- 上から: `eye: {x:0, y:10, z:0.1}`, `target: {x:0, y:0, z:0}`
- 特定オブジェクト注視: targetをオブジェクトのpositionに設定

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
   - `componentList.ts` への手動登録は不要（Viteプラグインが自動生成する）

開発パターンの詳細は `references/component-development.md` を参照。

## Examples

### Example 1: 新規シーンの構築
ユーザー: 「赤い球体と青い床のシーンを作って」

アクション:
1. GET /projects でプロジェクト確認
2. DELETE + POST /projects でシーン初期化
3. POST /editor/entities でエンティティ一括作成（Floor, Sphere, Light, Camera）
4. POST /materials でカスタムマテリアル作成
5. POST /editor/fields でマテリアル割当
6. POST /editor/save で保存
7. スクリーンショットで結果確認

Result: ライティング付きの赤い球体が青い床の上に配置されたシーン

### Example 2: 既存シーンへのオブジェクト追加
ユーザー: 「シーンにライトをもう一つ追加して」

アクション:
1. GET /editor/scene で現状のシーンツリー確認
2. POST /editor/entity で新規エンティティ作成
3. POST /editor/entity/:uuid/component で Light コンポーネント追加
4. POST /editor/fields で位置・強度設定
5. POST /editor/save で保存
6. スクリーンショットで結果確認

Result: 既存シーンを維持したまま新しいライトが追加された

### Example 3: カスタムシェーダーの作成
ユーザー: 「グラデーションのシェーダーを作って」

アクション:
1. POST /shaders でシェーダーテンプレート作成
2. src/ts/Resources/Shaders/ のファイルを直接編集（index.vs, index.fs）
3. POST /materials でマテリアル作成、シェーダー割当
4. npm run typecheck で型チェック
5. GET /editor/shader-errors でシェーダーエラー確認

Result: カスタムGLSLシェーダーが適用されたマテリアル

## Guardrails

- **scene.jsonを直接編集しない。** エンティティ操作は必ずREST API経由
- **操作前にGET /editor/sceneで現状確認する。** 操作後にも確認して結果を報告する
- **エンティティ作成後は必ずsaveを呼ぶ**
- **ルートエンティティのUUIDは `"0"`**
- **バッチAPIを活用して効率的に操作する**
- **フィールド設定のtargetUuidはコンポーネントUUID**（エンティティUUIDではない）
- **コンポーネント作成後は `npm run typecheck` で型チェックを実行する**
- **同じAPIが3回失敗したら `references/troubleshooting.md` を確認する**
- **プロジェクトが複数存在する場合は、操作対象をユーザーに確認してから進める**（`check-server.sh` の Browser Connection 欄で接続中プロジェクトを確認できる）
- **Meshコンポーネントを持つエンティティを作成・シェーダーを編集したら、必ずシェーダーエラーを確認する**
  ```bash
  curl -s http://localhost:3001/api/projects/{PROJECT}/editor/shader-errors | python3 -m json.tool
  ```
  `errors` 配列が空でない場合はシェーダーを修正してから次の作業へ進む。
- **シーン構築・変更後は必ずスクリーンショットを取得して結果を目視確認する**（Flow 1.5 参照）
  - カメラ位置をシーンに合わせて調整してから撮影する
  - アニメーションがある場合はフレームをシークして複数時点を確認する
  - スクリーンショットで問題を発見したら修正してから次の作業へ進む

## Common Issues

### サーバーに接続できない（ECONNREFUSED）
原因: 開発サーバーが起動していない
対処: `npm run dev` を実行してサーバーを起動

### 503 Service Unavailable
原因: ブラウザがOREngineエディタに接続していない
対処: ブラウザで http://localhost:3001 を開く

### シェーダーコンパイルエラー
原因: GLSL構文エラー
対処: `GET /editor/shader-errors` で詳細確認 → `references/shader-guide.md` 参照

### フィールド設定が反映されない
原因: targetUuid にエンティティUUIDを使っている（コンポーネントUUIDが必要）
対処: `GET /editor/entity/:uuid` でコンポーネントのUUIDを確認し、それを targetUuid に使う

詳細は `references/troubleshooting.md` を参照。

## References

詳細が必要な場合のみ参照する:

- **[references/api-scene.md](references/api-scene.md)** - シーン操作API（エンティティCRUD・フィールド設定・保存）
- **[references/api-resources.md](references/api-resources.md)** - マテリアル・シェーダー・テクスチャAPI
- **[references/components-catalog.md](references/components-catalog.md)** - ビルトインコンポーネント一覧とフィールド
- **[references/component-development.md](references/component-development.md)** - カスタムコンポーネント開発ガイド
- **[references/shader-guide.md](references/shader-guide.md)** - シェーダー記述ガイド（インクルード・GBuffer出力）
- **[references/troubleshooting.md](references/troubleshooting.md)** - エラー対処・Stop Conditions
