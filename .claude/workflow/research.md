# Research: Editor REST API の不便な点の調査

## タスク概要
API経由でProject0を作成しシーンを構築する作業中に遭遇した問題を調査し、改善すべき点を特定する。

## 遭遇した問題一覧

### 問題1: バッチエンティティ作成で parentUuid "0" が見つからない
- `POST /api/projects/:name/editor/entities` で `parentUuid: "0"` を指定すると `Parent entity not found: 0` エラー
- 単体 `POST /api/projects/:name/editor/entity`（parentUuid省略）は成功する
- バッチAPIの便利さが活かせず、個別にエンティティを1つずつ作成する必要があった

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| server/Project/EntityStore/index.ts:105-107 | `createEntity()` | parentUuidでエンティティを検索し子として追加 |
| server/routes/editor.ts:500-503 | batch endpoint | バッチ作成時に `parentUuid` を `createEntity` に渡す |

**根本原因**: ルートエンティティのUUIDが `"0"` だが、scene.jsonの初期構造では `uuid` フィールド自体が存在しない場合がある。`findEntity` がルートを見つけられない。

### 問題2: setField でコンポーネントpropsが正しく設定されない
- `geometry/type` を `"Cube"` に設定しても、フラットキー `"geometry/type"` ではなくネストされたオブジェクト `{ geometry: { type: "Cube" } }` として保存された
- APIは `success: true` を返すが、実際にはジオメトリが空のまま
- サーバー再起動 + 再設定が必要だった

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| server/Project/EntityStore/index.ts:196 | `setField()` → `_setNestedValue()` | コンポーネントpropsへのフィールド設定 |
| server/Project/EntityStore/index.ts:299-321 | `_setNestedValue()` | `/` をネスト区切りとして分割 |
| packages/maxpower/Component/Mesh/index.ts:48 | Mesh component | `fieldDir("geometry")` でフィールド定義 |

**根本原因**: `_setNestedValue()` が `/` をオブジェクトネストの区切りとして解釈するが、scene.jsonのコンポーネントpropsはフラットキー（`"geometry/type"`）で格納される。**修正済み**: 直接代入 `compResult.component.props[fieldPath] = value` に変更。

### 問題3: エンティティが重複して保存される
- scene.jsonを確認すると、各エンティティが2回ずつ出現していた
- Floor, Cube, Sphere, Cylinder, MainLight, Camera がすべて重複

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| packages/orengine/ts/Engine/ProjectSerializer/index.ts:165-173 | `deserializeEntity()` | **主原因**: 既存の子エンティティを削除せずに新規追加する |
| server/Project/ProjectData/index.ts:133-141 | `save()` | `clearDirty()` を呼ばない |
| server/ws/index.ts:191-215 | `_pushDirtyState()` | ブラウザ接続時にdirtyなプロジェクトのシーンをプッシュ |
| packages/orengine/ts/Editor/EditorAPIBridge/index.ts:123-174 | `_handleStatePush()` | `engine.deserialize(sceneData)` を呼ぶ |

**根本原因（2つの問題の複合）**:

1. **`ProjectSerializer.deserializeEntity` の子エンティティ処理（主原因）**: 165-173行で `node.childs.forEach(c => entity.add(_(c)))` が既存の子をチェック/削除せず新規追加する。同じデータでdeserializeすると子が重複する。

2. **`save()` が `clearDirty()` を呼ばない**: APIでエンティティ作成 → `markDirty()` → save → dirty のまま。ブラウザがWebSocket接続した際に `_pushDirtyState` が発火し、save済みのデータを再度プッシュ → ブラウザが `engine.deserialize()` → `deserializeEntity` が既存のルートに同じ子を再追加 → 重複。

**再現フロー**:
1. ブラウザ未接続でAPIからエンティティ作成 → `markDirty()`
2. `POST /editor/save` → scene.json保存（dirtyはクリアされない）
3. ブラウザでProject0を開く → scene.jsonをHTTP経由でロード → `deserializeEntity` でルートに子を作成
4. ブラウザがWebSocket接続 → `register` メッセージ送信
5. サーバーの `_pushDirtyState` → `project.dirty = true` → scene.jsonのデータをブラウザにプッシュ
6. ブラウザの `_handleStatePush` → `engine.deserialize(sceneData)` → `deserializeEntity` が**既存の子を保持したまま**同じ子を再追加 → **重複発生**

### 問題4: カメラ不在の警告がない
- Meshエンティティのみ作成してカメラを忘れたが、APIからの警告なし
- シーンバリデーション機構が存在しない

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| server/Project/ProjectData/index.ts:169-221 | `dispatch()` | アクション実行（バリデーションなし） |

**根本原因**: シーンの整合性チェック（必須コンポーネントの存在確認等）がサーバー側に存在しない。

## 依存関係
- `editor.ts`（ルーター） → `ProjectData`（プロジェクトデータ管理） → `EntityStore`（エンティティCRUD）
- `editor.ts` → `syncFromBrowser()`（WebSocket経由でブラウザと同期）
- `EntityStore._setNestedValue()` → scene.jsonの `props` 構造に依存
- `_pushDirtyState()`（ws/index.ts） → `ProjectData.dirty` → `engine.deserialize()` → `ProjectSerializer.deserializeEntity()`
- `ProjectData.save()` は `clearDirty()` を呼ばない → dirty状態が永続する

## 既存パターン
- **フラットキーパターン**: コンポーネントpropsは `"geometry/type"`, `"material/name"` のようにフラットキーで格納される
- **ブラウザ同期パターン**: ブラウザ接続中はブラウザが正（source of truth）、未接続時はサーバーが正
- **バッチ+個別API**: 単体APIは安定、バッチAPIに問題あり

## 制約・注意点
- `_setNestedValue` は `_setEntityField` 内でも使われている可能性があるため、削除はしない（コンポーネントpropsのみ直接代入に変更）
- ブラウザ接続の有無でデータフローが変わるため、修正時は両方のパスを考慮する必要がある
- テスト（`EntityStore.test.ts` 239-241行）がネスト構造を期待しているため、修正後はテストも更新が必要
- `deserializeEntity` は**ルートエンティティの既存子を保持したまま**データの子を追加する設計。これは差分更新を意図したものではなく、単に既存子の削除処理が欠落している
- `save()` で `clearDirty()` を呼ばないことで、不要な `statePush` が発生する。ただし `clearDirty()` だけでは `deserializeEntity` の重複問題は根本解決しない（別のトリガーでdeserializeが呼ばれた場合に再発する）
- `syncFromBrowser` のsaveエンドポイント（editor.ts:385）は `bridge.connected`（全クライアント）で判定しているが、`bridge.isProjectConnected(projectName)` であるべき

## 参考になる既存実装
- `server/routes/editor.ts:297-301`: 単体エンティティ作成（安定動作）
- `server/routes/editor.ts:334-338`: 単体フィールド設定
- `packages/maxpower/Serializable/index.ts:155-189`: `serializeToDirectory` でのフィールドパス処理（UI表示用のネスト変換）

## 優先度
| 問題 | 重要度 | 修正済み |
|------|--------|---------|
| 問題2: setField のフラットキー問題 | 高 | ✅ 修正済み（要テスト更新） |
| 問題1: バッチ作成のparentUuid | 高 | ❌ |
| 問題3: エンティティ重複 | 高 | ❌ |
| 問題4: シーンバリデーション | 中 | ❌ |
