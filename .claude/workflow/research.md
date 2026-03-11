# Research: サーバー単独でのシーン構築API対応

## タスク概要
ブラウザが接続されていなくても、サーバーのREST APIだけでシーン構築（エンティティ作成、コンポーネント追加、フィールド設定等）ができる仕組みを作る。ブラウザが接続されている場合は従来通りWebSocket委譲パターンでブラウザ側で処理する。

## ユーザー要件（確定）

### ユースケース: APIとブラウザの共同編集
```
1. ブラウザ開いてる → APIで編集 → ブラウザにリアルタイム反映
2. ブラウザでちょっと手動調整
3. ブラウザ閉じる → APIでの編集を続行（サーバーだけで処理）
4. ブラウザを再度開く → API操作の結果が全部反映されてる
5. またブラウザで調整、またAPI操作…の繰り返し
```

### 要件
1. **共同編集**: APIとブラウザの両方からシーンを編集でき、APIの操作がブラウザにリアルタイム反映される
2. **シームレスなハンドオフ**: ブラウザの開閉をまたいでAPI編集を続行できる
3. **明示的セーブ**: API操作でscene.jsonを即座に上書きしない。セーブは明示的に行う
4. **ブラウザ単独動作の維持**: サーバーなしでもブラウザだけでシーン編集できる既存の仕組みを壊さない

## 現状のアーキテクチャ

### データフロー（現状）
```
[REST API] → editor.ts/handleActionInternal()
  ↓
  ブラウザ接続中？
    Yes → WebSocket Bridge → ブラウザ EditorAPIBridge._dispatch() → EditorAPI/CommandManager → 結果返却
    No  → throw new Error('Browser not connected') → 503エラー
```

**核心的な問題**: ブラウザ未接続時は全ての editor API が 503 を返す。サーバー側にはシーンデータを操作するロジックが一切ない。

### ADR設計思想
- **ADR-001**: ブラウザファースト設計。ブラウザ接続中はブラウザがsource of truth
- **ADR-002**: WebSocket委譲パターン。書き込みはWS経由でブラウザに委譲

ADR-001に「ブラウザ未接続時のみサーバーのオンメモリ状態（ProjectData）で直接処理する」と記載あり。しかし現状の実装ではこのフォールバックが未実装。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `server/routes/editor.ts` | `handleActionInternal()`, `handleAction()` | REST APIルーティング、ブラウザ委譲 |
| `server/ws/index.ts` | `EditorWSBridge` | WebSocketブリッジ（サーバー↔ブラウザ） |
| `server/Project/ProjectData/index.ts` | `ProjectData` | プロジェクトデータ管理（scene.json読み書き） |
| `server/Project/types.ts` | `SceneFileData`, `SceneDataEntity`, `SceneDataComponent` | シーンデータの型定義 |
| `server/Project/index.ts` | `ProjectManager`, `projectManager` | プロジェクト管理シングルトン |
| `server/SceneDataEditor/` | (空ディレクトリ) | シーンデータ編集用に用意されたと思われる |
| `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` | `EditorAPIBridge._dispatch()` | ブラウザ側アクション実行（全アクションのswitch文） |
| `packages/orengine/ts/Editor/EditorAPI/index.ts` | `EditorAPI` | CommandManager経由のエンティティ・コンポーネント操作 |
| `packages/orengine/ts/Engine/ProjectSerializer/index.ts` | `ProjectSerializer`, `OREngineDataEntity` | Entity↔JSONシリアライズ/デシリアライズ |
| `packages/orengine/ts/Engine/index.ts` | `Engine` | エンジンコア（WebGL2依存） |
| `packages/orengine/ts/Engine/Resources/index.ts` | `Resources` | コンポーネント/マテリアル/シェーダー/テクスチャのリソース管理 |

## 依存関係

### ブラウザ側アクション実行チェーン
```
EditorAPIBridge._dispatch()
  → EditorAPI.createEntity() / setField() / addComponent() 等
    → CommandManager.execute() (Undo/Redo管理)
      → Entity/Component 操作
```

### サーバー側の現在の処理
```
editor.ts handleActionInternal()
  → getWSBridge() → bridge.send() (WebSocket委譲)
  → ブラウザ未接続時は Error('Browser not connected')
```

### シーンデータ構造（scene.json = SceneFileData）
```typescript
interface SceneFileData {
  name: string;
  scene: SceneDataEntity; // ルートエンティティ
  [key: string]: unknown; // renderer, timeline等の追加データ
}
interface SceneDataEntity {
  name: string; uuid: string;
  pos?: number[]; rot?: number[]; scale?: number[];
  components?: SceneDataComponent[];
  childs?: SceneDataEntity[];
}
interface SceneDataComponent {
  name: string; uuid: string;
  props?: Record<string, unknown>;
}
```

## ブラウザ側 _dispatch() がサポートするアクション一覧

### 読み取り系
- `getStatus` - 接続状態、Undo/Redo可否
- `getScene` - シーンツリー全体
- `getEntity` - 個別エンティティ詳細
- `searchEntities` - エンティティ名検索
- `getAvailableComponents` - 利用可能コンポーネント一覧
- `getComponentDetail` - コンポーネント詳細
- `getResources` - マテリアル/テクスチャ/シェーダー一覧
- `getMaterial` / `getTexture` - 個別リソース
- `getShaderErrors` - シェーダーエラー

### 書き込み系
- `createEntity` - エンティティ作成
- `deleteEntity` - エンティティ削除
- `selectEntity` - エンティティ選択
- `addComponent` - コンポーネント追加
- `removeComponent` - コンポーネント削除
- `setField` - フィールド値設定
- `addMaterial` / `updateMaterial` / `removeMaterial`
- `addTexture` / `updateTexture` / `removeTexture`
- `undo` / `redo`

## サーバー側で実装が必要な範囲

### 実装可能（JSONデータ操作のみ）
- `getScene` - scene.jsonのツリー構造を返す
- `getEntity` - UUIDでエンティティを検索
- `searchEntities` - 名前でエンティティを検索
- `createEntity` - scene.jsonにエンティティノードを追加
- `deleteEntity` - scene.jsonからエンティティノードを削除
- `addComponent` - エンティティにコンポーネント定義を追加
- `removeComponent` - エンティティからコンポーネント定義を削除
- `setField` - エンティティ/コンポーネントのフィールド値を変更
- `getAvailableComponents` - componentList.ts をパースして取得可能
- `getResources` - .mat/.tex ファイルから読み取り
- `addMaterial` / `removeMaterial` - .matファイル操作（既に persistResourceChange で部分実装あり）
- `addTexture` / `removeTexture` - .texファイル操作（同上）

### 実装困難（WebGL/ランタイム依存）
- `getShaderErrors` - シェーダーコンパイルはGPU必要
- `getComponentDetail` - コンポーネントのserialize()はインスタンス必要（ただしpropsから部分対応可能）
- `selectEntity` - エディタUI操作のみ
- `undo` / `redo` - CommandManagerはブラウザ側のみ

## 既存パターン

### UUID生成
- ブラウザ側: `Serializable` 基底クラスで自動生成
- サーバー側: 独自にUUID生成が必要（crypto.randomUUID() 等）

### scene.json の操作
- `ProjectData.getSceneFileData()` で読み取り
- `ProjectData.syncFromBrowser()` でオンメモリ更新
- `ProjectData.save()` でファイル書き込み

### ブラウザ再接続時の同期
- `EditorAPIBridge._handleStatePush()` がサーバーからの状態プッシュを処理
- `sceneData` と `resources`（materials/textures）をまとめて受信・適用

### setField のパスマッピング
EditorAPIBridge._dispatch() の `setField` は `_findSerializable(uuid)` で対象を検索:
- エンティティのUUID → position/euler/scale 等のフィールドに対応
- コンポーネントのUUID → コンポーネントの props に対応

サーバー側では scene.json の構造上:
- エンティティの `position` → `pos` フィールド（number[3]）
- エンティティの `euler` → `rot` フィールド（number[3]）
- エンティティの `scale` → `scale` フィールド（number[3]）
- コンポーネントの props → `components[].props` オブジェクト内のキー

## 設計方針: データフロー（確定）

### 2つのモードと切り替え

**モード1: ブラウザ接続中** → 現状のWS委譲を維持
```
API操作 → WS bridge.send() → ブラウザが実行 → 画面に即反映 → 結果返却
                                                  ↓
                                           syncRequestでProjectDataも更新
```
- 共同編集が自然に成立（ブラウザが常にsource of truth）
- ブラウザの手動操作もそのまま有効
- **追加**: 各WS委譲操作の後に syncRequest で ProjectData を最新に保つ
  → ブラウザが閉じた瞬間にサーバーが最新状態を持っている保証

**モード2: ブラウザ未接続** → SceneDataEditor（新規）がフォールバック処理
```
API操作 → SceneDataEditor が ProjectData._sceneData を直接操作
```
- ProjectData のオンメモリ状態（モード1で常に同期済み、またはscene.jsonから遅延ロード）を操作
- scene.json には書き込まない

**ブラウザ再接続時**:
```
ブラウザがWSに接続 → サーバーがProjectDataの現在の状態を statePush → ブラウザに反映
```

**明示的セーブ時（POST /editor/save）**:
```
ブラウザ接続中ならsyncRequestで最新取得 → ProjectData.save() → scene.json 書き込み
```

### ハンドオフのシナリオ
```
1. ブラウザ開、API操作 → WS委譲 → ブラウザが処理、ProjectDataも同期
2. ブラウザ閉じる       → ProjectData は最新状態を保持
3. API操作を続行       → SceneDataEditor が ProjectData を操作
4. ブラウザ再度開く     → statePush でAPI操作分がブラウザに反映
5. ブラウザで手動調整   → ブラウザ内で処理
6. API操作             → WS委譲 → ブラウザが処理、ProjectDataも同期
```

## 制約・注意点

1. **明示的セーブ**: API操作でscene.jsonを即座に上書きしない。変更はProjectData._sceneDataにのみ保持
2. **WS委譲後のProjectData同期**: ブラウザ接続中のAPI操作後にsyncRequestでサーバー側状態を更新。ブラウザ切断時のハンドオフを保証
3. **ブラウザ再接続時のstatePush**: サーバーで変更されたProjectDataの内容をブラウザに送信。既存の`_handleStatePush()`を活用
4. **Undo/Redo**: WS委譲中はブラウザのCommandManagerが管理。SceneDataEditor操作はUndo/Redo対象外。ブラウザ再接続時のstatePushでCommandManagerはクリアされる
5. **ブラウザ単独動作**: サーバー起動なしでもブラウザは完全に動作。今回の変更はサーバー側のみ
6. **コンポーネントの解決**: サーバー側は名前ベースの操作のみ（ランタイムなし）
7. **setField の対象UUID解決**: エンティティ・コンポーネント両方のUUID検索が必要

## 参考になる既存実装

- `EditorAPIBridge._dispatch()` (packages/orengine/ts/Editor/EditorAPIBridge/index.ts) - 全アクションの処理ロジックのリファレンス
- `ProjectSerializer` (packages/orengine/ts/Engine/ProjectSerializer/index.ts) - シリアライズ/デシリアライズの参考
- `persistResourceChange()` (server/routes/editor.ts:27-145) - マテリアル/テクスチャのファイル永続化
- `EditorAPIBridge._handleStatePush()` - ブラウザ再接続時の状態同期処理
