# Research: ブラウザ未接続時のフォールバック削除・ブラウザ前提シンプル化

## タスク概要
現在、ブラウザが未接続の場合にサーバーがAPIリクエストをフォールバック処理しているロジックをすべて削除し、「ブラウザが繋がっている前提」でシンプルに実装する。ブラウザが繋がっていない場合はエラーを返す。

---

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `server/routes/editor.ts` | `handleActionInternal`, `handleAction`, `syncFromBrowser`, `MUTATING_ACTIONS`, `RESOURCE_MUTATING_ACTIONS`, `persistResourceChange` | 主たる変更対象。ブラウザ未接続フォールバック処理がここに集中している |
| `server/ws/index.ts` | `EditorWSBridge`, `_pushDirtyState`, `requestSync`, `send`, `executeAction` | WebSocketブリッジ。`_pushDirtyState` は dirty 状態をブラウザへ push する（フォールバック不要になれば削除対象） |
| `server/Project/ProjectData/index.ts` | `ProjectData`, `dispatch()`, `_entityStore`, `dirty/markDirty/clearDirty`, `getResourcesSnapshot()` | サーバーサイドのフォールバック実装の中核。`dispatch()` と EntityStore、dirty 管理が削除対象 |
| `server/Project/EntityStore/index.ts` | `EntityStore` | サーバーサイドのシーン操作実装（`dispatch()` からのみ使用）→ **削除対象** |
| `server/Project/EntityStore/EntityStore.test.ts` | - | EntityStore のテスト → **削除対象** |
| `server/Project/index.ts` | `ProjectManager` | ProjectData を管理。`getProject()` は save/scene.ts からも使用。ほぼそのまま |
| `server/routes/scene.ts` | `sceneRouter.get('/projects/:name/scene')` | `try/catch` でフォールバックしてファイル読み取り → 簡略化可能 |

---

## 現状の処理フロー

### `handleActionInternal` (editor.ts)
```
ブラウザ接続あり → bridge.send() でブラウザへ委譲
                  → RESOURCE_MUTATING_ACTIONS なら persistResourceChange() でファイル保存

ブラウザ接続なし → projectManager.dispatch() でサーバーサイド処理  ← 削除対象
                  → RESOURCE_MUTATING_ACTIONS なら persistResourceChange() + markDirty()  ← 削除対象
                  → MUTATING_ACTIONS なら project.dispatch() + markDirty()  ← 削除対象
                  → それ以外は project.dispatch()  ← 削除対象
```

### `_pushDirtyState` (ws/index.ts)
```
ブラウザ再接続時 → project.dirty をチェック → dirty ならシーンデータをブラウザへ push
```
フォールバックがなければ dirty になることがないため、この関数は不要。

### `syncFromBrowser` (editor.ts の関数)
```
MUTATING_ACTIONS 後に呼ばれる → bridge.requestSync() でブラウザから最新状態を取得
                                → project.syncFromBrowser(snapshot) でサーバーのメモリ状態を更新
```
`save` エンドポイントがすでに save 前に `requestSync()` しているため、各変更後の sync は不要。

---

## 削除対象

### 完全削除
- `server/Project/EntityStore/index.ts` ── `dispatch()` からしか使われない
- `server/Project/EntityStore/EntityStore.test.ts` ── テスト

### `server/routes/editor.ts` から削除
- `MUTATING_ACTIONS` セット（使用箇所: フォールバック + syncFromBrowser 呼び出し）
- `syncFromBrowser()` 関数（`handleAction` 内での呼び出しも含む）
- `handleActionInternal` の `else`（未接続）ブランチ全体

### `server/Project/ProjectData/index.ts` から削除
- `_entityStore: EntityStore` フィールドと `EntityStore` インポート
- `dispatch()` メソッド全体
- `_getAvailableComponents()` メソッド
- `_scanComponents()` メソッド
- `dirty/markDirty/clearDirty()` （dirty 状態管理）
- `getResourcesSnapshot()` メソッド（`_pushDirtyState` からのみ使用）
- `_readMaterialFiles()`, `_readTextureFiles()` メソッド

### `server/ws/index.ts` から削除
- `_pushDirtyState()` メソッドと connection 時の呼び出し

### `server/routes/scene.ts` の簡略化
- `sceneRouter.get('/projects/:name/scene')` の `try/catch` フォールバック削除
  - `projectManager.getProject()` で `getSceneFileData()` を呼ぶシンプルな形に

---

## 残すもの（変更後も必要）

| 場所 | 残す理由 |
|------|---------|
| `ProjectData.save()` + `_writeSceneFile()` | saveエンドポイントがファイル保存に使用 |
| `ProjectData.syncFromBrowser(sceneData)` + `_sceneData` | saveエンドポイントがブラウザからsync後に保存 |
| `ProjectData.getSceneFileData()` + `_readSceneFile()` | scene.ts GET エンドポイントが使用 |
| `ProjectData._ensureLoaded()` | getSceneFileData() から使用 |
| `persistResourceChange()` | ブラウザ接続時も resource mutation でファイル保存が必要 |
| `RESOURCE_MUTATING_ACTIONS` | persistResourceChange() の条件判定に使用 |
| `EditorWSBridge.send()`, `requestSync()`, `executeAction()` | 全て引き続き使用 |
| `ProjectManager` | save/scene endpoints から使用 |

---

## 変更後のシンプルなフロー

```
API リクエスト
  ↓
bridge.send(projectName, action, params)
  ↓
ブラウザ未接続 → 503 "Browser not connected" エラー
ブラウザ接続中 → ブラウザが処理 → 結果を返す
  ↓ (RESOURCE_MUTATING_ACTIONS の場合)
persistResourceChange() でファイルに保存
  ↓
res.json(result)
```

---

## 制約・注意点

1. `EntityStore.test.ts` を削除する場合、テストランナーが壊れないか確認
2. `ProjectData` から `dispatch()` を削除すると、`getAvailableComponents` アクションも消える。これはブラウザ側の `getAvailableComponents` 実装が担うことになる（ブラウザ前提なので問題なし）
3. `RESOURCE_MUTATING_ACTIONS` による `persistResourceChange` は**ブラウザ接続時でも必要**（ブラウザが material/texture を操作した後、サーバーのファイルにも保存する必要がある）
4. `scene.ts` POST エンドポイントも `project.syncFromBrowser()` を呼んでいるが、これは file save を伴うエンドポイントのため残す

---

## 参考になる既存実装

- `editorRouter.post('/editor/undo')`, `('/editor/redo')` — すでに「ブラウザ接続前提、未接続ならエラー」のシンプル実装になっている：
  ```ts
  if (bridge && bridge.connected) {
      bridge.executeAction(...);
      res.json({ success: true });
  } else {
      res.status(400).json({ error: 'Undo requires browser connection' });
  }
  ```
  これを全アクションに統一するイメージ。
