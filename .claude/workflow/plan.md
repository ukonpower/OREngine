# Plan: ブラウザ未接続フォールバック削除・ブラウザ前提シンプル化

## 概要

サーバーAPIがブラウザ未接続時にサーバーサイドでフォールバック処理している実装を全て削除し、「常にブラウザが接続されている前提」でシンプルに実装する。ブラウザが未接続の場合は 503 エラーを返す。

---

## 実装ステップ

### 1. `server/Project/EntityStore/` ディレクトリを削除

- **対象ファイル**:
  - `server/Project/EntityStore/index.ts`
  - `server/Project/EntityStore/EntityStore.test.ts`
- **変更内容**: ディレクトリごと削除する。`EntityStore` は `ProjectData.dispatch()` からのみ使用されており、dispatch() を削除すれば参照がなくなる。

---

### 2. `server/Project/ProjectData/index.ts` をスリム化

- **対象ファイル**: `server/Project/ProjectData/index.ts`
- **変更内容**: 以下のメンバーを全て削除する。残すのは `save()`、`syncFromBrowser()`、`getSceneFileData()` と関連のプライベートメソッドのみ。

**削除するメンバー:**
- `import { EntityStore }` + `_entityStore` フィールド
- `dirty`, `markDirty()`, `clearDirty()` （dirty状態管理）
- `getResourcesSnapshot()`, `_readMaterialFiles()`, `_readTextureFiles()`
- `dispatch()` メソッド全体
- `_getAvailableComponents()`, `_scanComponents()` メソッド

**変更後のクラス構造（概要）:**
```typescript
export class ProjectData {
    private _name: string;
    private _projectDir: string;
    private _sceneData: SceneFileData | null = null;

    get name(): string { ... }

    getSceneFileData(): SceneFileData { ... }    // scene.ts GET で使用
    syncFromBrowser( sceneData: SceneFileData ): void { ... }  // save で使用
    save(): void { ... }                         // save エンドポイントで使用

    private _ensureLoaded(): SceneFileData { ... }
    private _readSceneFile(): SceneFileData { ... }
    private _writeSceneFile( data: SceneFileData ): void { ... }
}
```

---

### 3. `server/ws/index.ts` から `_pushDirtyState` を削除

- **対象ファイル**: `server/ws/index.ts`
- **変更内容**:
  - `_pushDirtyState()` メソッドを削除
  - `connection` ハンドラ内の `this._pushDirtyState(ws, msg.projectName)` 呼び出しを削除
  - `projectManager` のインポートを削除（`_pushDirtyState` が唯一の使用箇所）

**変更前 (connection ハンドラ内):**
```typescript
if ( msg.type === 'register' && msg.projectName ) {
    this._clients.set( ws, msg.projectName );
    this._pushDirtyState( ws, msg.projectName );  // ← 削除
    return;
}
```

**変更後:**
```typescript
if ( msg.type === 'register' && msg.projectName ) {
    this._clients.set( ws, msg.projectName );
    return;
}
```

---

### 4. `server/routes/editor.ts` をシンプル化

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: `handleActionInternal` からフォールバックブランチを削除し、ブラウザ未接続時は即エラーにする。`MUTATING_ACTIONS` と `syncFromBrowser()` 関数も削除する。

**削除するもの:**
- `MUTATING_ACTIONS` セット
- `syncFromBrowser()` 関数
- `projectManager` のインポート（editor.ts内での使用がなくなる）
- `handleAction()` 内の `syncFromBrowser()` 呼び出し

**`handleActionInternal` 変更前:**
```typescript
async function handleActionInternal( projectName, action, params ) {
    const bridge = getWSBridge();
    const browserConnected = bridge && bridge.isProjectConnected( projectName );

    if ( browserConnected ) {
        const result = await bridge!.send( projectName, action, params );
        if ( !result.success ) throw new Error( result.error );
        if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {
            await persistResourceChange( action, params, result.data );
        }
        return result.data;
    } else {
        // ←── このelseブランチ全体を削除
        const project = projectManager.getProject( projectName );
        if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) { ... }
        else if ( MUTATING_ACTIONS.has( action ) ) { ... }
        else { ... }
    }
}
```

**`handleActionInternal` 変更後:**
```typescript
async function handleActionInternal( projectName: string, action: string, params: Record<string, unknown> ) {

    const bridge = getWSBridge();

    if ( !bridge || !bridge.isProjectConnected( projectName ) ) {
        throw new Error( 'Browser not connected' );
    }

    const result = await bridge.send( projectName, action, params );

    if ( !result.success ) throw new Error( result.error );

    if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {
        await persistResourceChange( action, params, result.data );
    }

    return result.data;

}
```

**`handleAction` 変更前:**
```typescript
async function handleAction( projectName, action, params, res ) {
    try {
        const data = await handleActionInternal( projectName, action, params );
        if ( MUTATING_ACTIONS.has( action ) ) {
            await syncFromBrowser( projectName );  // ← 削除
        }
        res.json( data );
    } catch ( err ) {
        res.status( 400 ).json( ... );
    }
}
```

**`handleAction` 変更後:**
```typescript
async function handleAction( projectName: string, action: string, params: Record<string, unknown>, res: express.Response ) {

    try {
        const data = await handleActionInternal( projectName, action, params );
        res.json( data );
    } catch ( err: any ) {
        res.status( 503 ).json( { error: err.message || String( err ) } );
    }

}
```

> ※ エラーステータスは 503 (Service Unavailable) を使用。ブラウザ未接続は「サービス一時不能」が適切。

---

### 5. `server/routes/scene.ts` の scene GET を簡略化

- **対象ファイル**: `server/routes/scene.ts`
- **変更内容**: `sceneRouter.get('/projects/:name/scene')` の `try/catch` フォールバック（ファイル直接読み込み）を削除してシンプルにする。

**変更前:**
```typescript
sceneRouter.get( '/projects/:name/scene', ( req, res ) => {
    try {
        const project = projectManager.getProject( req.params.name );
        const sceneData = project.getSceneFileData();
        res.json( sceneData );
    } catch {
        // ProjectManager に無い場合はファイルから読む（フォールバック）
        const projectDir = resolveProjectDir( req.params.name );
        if ( !projectDir ) { res.status( 400 ).json(...); return; }
        readJsonFile( path.join( projectDir, 'scene.json' ), res );
    }
} );
```

**変更後:**
```typescript
sceneRouter.get( '/projects/:name/scene', ( req, res ) => {

    try {
        const project = projectManager.getProject( req.params.name );
        res.json( project.getSceneFileData() );
    } catch ( err: any ) {
        res.status( 500 ).json( { error: err.message || 'Failed to get scene' } );
    }

} );
```

> ※ `readJsonFile`, `writeJsonFile`, `resolveProjectDir` の各ヘルパー関数も、他の使用箇所（POST `/scene`, GET/POST `/editor`）があるため残す。

---

## 変更対象ファイル一覧

- [x] `server/Project/EntityStore/index.ts` — **ファイル削除**
- [x] `server/Project/EntityStore/EntityStore.test.ts` — **ファイル削除**
- [x] `server/Project/ProjectData/index.ts` — dispatch, dirty管理, getResourcesSnapshot等を削除してスリム化
- [x] `server/ws/index.ts` — `_pushDirtyState` と `projectManager` インポートを削除
- [x] `server/routes/editor.ts` — `handleActionInternal` の else ブランチ、`MUTATING_ACTIONS`、`syncFromBrowser` を削除
- [x] `server/routes/scene.ts` — scene GET のフォールバック削除

---

## 考慮事項・リスク

- **`getAvailableComponents` アクション**: `dispatch()` 削除後はブラウザ側が処理することになる。ブラウザ接続前提なので問題なし。
- **`RESOURCE_MUTATING_ACTIONS` と `persistResourceChange` は残す**: ブラウザ接続時もマテリアル/テクスチャのファイル保存は必要。
- **`scene.ts` の POST `/scene`**: `project.syncFromBrowser()` を呼んでいるが、これはファイル保存を伴うエンドポイントのため変更しない。
- **エラーステータス**: `handleAction` のキャッチで 503 を返すことで、呼び出し側がブラウザ未接続と判別できる。

## テスト方針

1. `npm run typecheck` でエラーがないことを確認
2. ブラウザを開いた状態でエンティティ作成・削除・フィールド変更が正常に動作することを確認
3. ブラウザを閉じた状態でAPIリクエストを送ると 503 が返ることを確認
