# OREngine アーキテクチャ

## 全体構成

```
┌─────────────────────┐       REST API        ┌─────────────────────┐
│    ブラウザ (Vite)    │ ◄──── /api/... ─────► │  Express サーバー     │
│                     │                       │  (port 3001)        │
│  EditorAPIBridge    │ ◄── WebSocket ──────► │  EditorWSBridge      │
│  (クライアント)       │     /ws/editor        │  (サーバー)           │
└─────────────────────┘                       └─────────────────────┘
         │
         │ ws://localhost:3100
         ▼
┌─────────────────────┐
│  Blender (BLidge)   │  ※ オプション
└─────────────────────┘
```

- **サーバー**: Express.js（port 3001）+ WebSocket（`ws`パッケージ）
- **ブラウザ**: Vite dev server（port 3000）からプロキシ経由でサーバーに接続
- **通信方式**: REST API + WebSocket のハイブリッド

## ブラウザファースト設計

OREngineの最も重要な設計原則は**ブラウザファースト**。

- **ブラウザ接続中**: ブラウザがデータの正（source of truth）。REST APIへの書き込み操作はWebSocket経由でブラウザに委譲される
- **ブラウザ未接続時**: サーバーのオンメモリ状態（`ProjectData`）で処理。ただしUndo/Redoは使用不可

```
【ブラウザ接続中】
外部クライアント → REST API → WebSocket → ブラウザで実行
                                         ↓
                               syncRequest/syncResponse
                                         ↓
                              サーバーのオンメモリ状態を同期

【ブラウザ未接続時】
外部クライアント → REST API → ProjectData.dispatch() → EntityStoreで直接処理
```

## サーバー構成

### エントリポイント

`server/index.ts`

- ポート: `process.env.ORENGINE_SERVER_PORT || 3001`
- JSONペイロード上限: 50MB

### モジュール一覧

| モジュール | ファイル | 役割 |
|---|---|---|
| `projectsRouter` | `server/routes/projects.ts` | プロジェクトCRUD |
| `sceneRouter` | `server/routes/scene.ts` | シーン/エディタデータの読み書き |
| `editorRouter` | `server/routes/editor.ts` | エディタ操作API（ブラウザファースト） |
| `componentsRouter` | `server/routes/components.ts` | コンポーネントファイル管理 |
| `materialsRouter` | `server/routes/materials.ts` | マテリアル(.mat)管理 |
| `shadersRouter` | `server/routes/shaders.ts` | シェーダー管理 |
| `EditorWSBridge` | `server/ws/index.ts` | WebSocket通信ブリッジ |
| `ProjectManager` | `server/Project/index.ts` | プロジェクトオンメモリ管理 |
| `ProjectData` | `server/Project/ProjectData/index.ts` | 個別プロジェクトデータ |
| `EntityStore` | `server/Project/EntityStore/index.ts` | エンティティツリー操作 |

## ブラウザ側構成

### 通信関連クラス

| クラス | ファイル | 役割 |
|---|---|---|
| `Editor` | `packages/orengine/ts/Editor/index.ts` | エディタ本体。APIBridgeを保持 |
| `EditorAPI` | `packages/orengine/ts/Editor/EditorAPI/index.ts` | コマンドベースAPI（Undo/Redo対応） |
| `EditorAPIBridge` | `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` | WebSocket双方向通信 |
| `BLidge` | `packages/maxpower/BLidge/index.ts` | Blender連携WebSocket |

### 通信の流れ

```
OREditor (React Component)
  ↓ useOREditorContext hook
Editor class
  ↓
EditorAPI (ローカル操作 / CommandManager)
  ↓
EditorAPIBridge (WebSocket通信)
  ↓
Express Server
```

---

## WebSocket 仕様

### 接続情報

| 項目 | 値 |
|---|---|
| パス | `/ws/editor` |
| URL（ブラウザ→サーバー） | `ws(s)://<host>/ws/editor` |
| 実装（サーバー） | Node.js `ws` パッケージ |
| 自動再接続 | 切断後3秒間隔 |
| タイムアウト（BridgeRequest） | 10秒 |
| タイムアウト（syncRequest） | 5秒 |

### メッセージ型

#### サーバー → ブラウザ

| type | 説明 | ペイロード |
|---|---|---|
| `syncRequest` | シーンスナップショットを要求 | `{ type, id, projectName }` |
| `executeAction` | 操作実行を指示（Fire & Forget） | `{ type, projectName, action, params }` |
| `statePush` | 再接続時の状態プッシュ | `{ type, sceneData?, resources? }` |
| (Legacy) | BridgeRequest形式 | `{ id, action, params }` |

#### ブラウザ → サーバー

| type | 説明 | ペイロード |
|---|---|---|
| `syncResponse` | スナップショット返却 | `{ type: 'syncResponse', id, sceneData }` |
| (Legacy) | BridgeResponse形式 | `{ id, success, data?, error? }` |

### サーバー側メソッド（`EditorWSBridge`）

```typescript
// Legacy BridgeRequest送信（レスポンス待ち、タイムアウト10秒）
send(action: string, params: Record<string, unknown>, timeout?: number): Promise<BridgeResponse>

// シーンスナップショット要求（タイムアウト5秒）
requestSync(projectName: string, timeout?: number): Promise<SceneFileData | null>

// 操作実行指示（Fire & Forget）
executeAction(projectName: string, action: string, params: Record<string, unknown>): void
```

### ブラウザ側アクション（`EditorAPIBridge._dispatch()`）

WebSocket経由で受信したアクションをブラウザ内で実行する。EditorAPI/CommandManagerを通じてUndo/Redo対応。

| アクション | 説明 |
|---|---|
| `getStatus` | 接続状態、Undo/Redo可否、選択エンティティ |
| `getScene` | シーンツリー全体 |
| `getEntity` | エンティティ詳細 |
| `searchEntities` | 名前検索 |
| `getAvailableComponents` | 利用可能コンポーネント一覧 |
| `getComponentDetail` | コンポーネント詳細（フィールド含む） |
| `createEntity` | エンティティ作成 |
| `deleteEntity` | エンティティ削除 |
| `selectEntity` | エンティティ選択 |
| `addComponent` | コンポーネント追加 |
| `removeComponent` | コンポーネント削除 |
| `setField` | フィールド値変更 |
| `undo` / `redo` | Undo/Redo |
| `getResources` | 全リソース一覧取得 |
| `addMaterial` / `removeMaterial` / `updateMaterial` / `getMaterial` | マテリアル操作 |
| `addTexture` / `removeTexture` / `updateTexture` / `getTexture` | テクスチャ操作 |
| `notifyShaderAdded` / `notifyShaderRemoved` | シェーダー変更通知 |

---

## リソース操作のブラウザファースト設計

リソース（マテリアル・テクスチャ）操作もエディタ操作と同じブラウザファーストパターン:

```
【ブラウザ接続中】
外部クライアント → REST API → WebSocket → ブラウザで実行（CommandManager経由、Undo/Redo可能）
                                         ↓
                              persistResourceChange() → ファイル永続化

【ブラウザ未接続時】
外部クライアント → REST API → persistResourceChange() → ファイル永続化
                            → ProjectData.markDirty()
```

## 再接続同期（statePush）

ブラウザ切断中にAPI経由で変更された状態を再接続時にブラウザへプッシュする:

```
【ブラウザ切断中】
外部クライアント → REST API → ファイル更新 + ProjectData._dirty = true

【ブラウザ再接続時】
WebSocket connection イベント
  ↓
サーバー: dirty フラグ確認
  ↓ dirty == true の場合
サーバー → ブラウザ: { type: "statePush", sceneData, resources }
  ↓
ブラウザ: Engine.deserialize(sceneData) でシーン復元
        + Resources の差分適用（マテリアル/テクスチャの追加・削除・更新）
  ↓
CommandManager.clear() （切断中の変更はundo不可）
ProjectData._dirty = false
```

---

## データ構造

### SceneFileData（scene.json）

```typescript
interface SceneFileData {
  name: string;                    // プロジェクト名
  scene: SceneDataEntity;          // ルートエンティティ
  [key: string]: unknown;          // timeline等
}

interface SceneDataEntity {
  name: string;
  uuid: string;
  pos?: number[];                  // [x, y, z]
  rot?: number[];                  // [x, y, z] オイラー角
  scale?: number[];                // [x, y, z]
  components?: SceneDataComponent[];
  childs?: SceneDataEntity[];
}

interface SceneDataComponent {
  name: string;
  uuid: string;
  props?: Record<string, unknown>;
}
```

### editor.json

```json
{
  "camera/position": [0, 1, 5],
  "camera/target": [0, 0, 0]
}
```

### APIレスポンス型

```typescript
interface EntityTreeResponse {
  uuid: string;
  name: string;
  position: { x: number; y: number; z: number };
  euler: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  components: { uuid: string; name: string }[];
  children: EntityTreeResponse[];
}

interface EntityDetailResponse {
  uuid: string;
  name: string;
  position: { x: number; y: number; z: number };
  euler: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  components: { uuid: string; name: string; fields: Record<string, unknown> }[];
  childrenCount: number;
  parentUuid: string | null;
}
```

---

## ファイル配置

```
projects/
  .active                          # アクティブプロジェクト名
  {projectName}/
    scene.json                     # シーンデータ
    editor.json                    # エディタ設定
    globals.ts                     # グローバルエクスポート
    index.ts                       # リソース初期化

src/ts/Resources/
  Components/                      # コンポーネントソース（各 index.ts）
  Materials/                       # マテリアル（*.mat JSON）
  Shaders/                         # シェーダー（各 index.vs / index.fs）
```

---

## データフロー

### 起動時

```
EditorPage:
  1. GET /api/projects/:name/scene   → シーンデータ取得
  2. GET /api/projects/:name/editor  → エディタ設定取得
  3. OREngine/OREditor コンポーネント初期化
  4. Editor → EditorAPIBridge → WebSocket接続 (/ws/editor)
```

### 保存時（Ctrl+S）

```
ブラウザ:
  1. Editor.save() → "save" イベント発火
  2. OREditor の onSave コールバック →
     POST /api/projects/:name/scene  (シーンデータ)
     POST /api/projects/:name/editor (エディタ設定)
```

### 外部からのAPI操作（ブラウザ接続中）

```
  1. REST API受信（例: POST .../editor/entity）
  2. bridge.send(action, params) → WebSocket → ブラウザで実行
  3. 書き込み操作後: bridge.requestSync() → syncRequest/syncResponse
  4. project.syncFromBrowser(snapshot) → オンメモリ状態更新
  5. レスポンス返却
```

### 外部からのAPI操作（ブラウザ未接続時）

```
  1. REST API受信
  2. project.dispatch(action, params) → EntityStoreで直接処理
  3. レスポンス返却
```

---

## BLidge（Blender連携）

オプションのBlender連携WebSocket。エディタサーバーとは別の接続。

| 項目 | 値 |
|---|---|
| 接続先 | `ws://localhost:3100`（デフォルト） |
| 方向 | Blender → ブラウザ（片方向） |
| 実装 | `packages/maxpower/BLidge/index.ts` |
| コンポーネント | `BLidgeClient`（`src/ts/Resources/Components/Utilities/BLidgeClient/`） |

### メッセージ

| type | 説明 |
|---|---|
| `sync/scene` | シーン構造同期 |
| `sync/timeline` | タイムラインフレーム同期 |
