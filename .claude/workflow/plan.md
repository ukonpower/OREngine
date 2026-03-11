# Plan: サーバー単独でのシーン構築API対応

## 概要

ブラウザが接続されていないときでもREST APIでシーン編集を続行でき、ブラウザが再接続されたら変更が反映される仕組みを実装する。ブラウザ接続中はWS委譲（現状維持）、未接続時はサーバー側のSceneDataEditorでフォールバック処理する。

## レビュー反映サマリ

Codexレビューの5つの指摘を反映:

1. **ブラウザ手動編集の同期** → WS委譲後のpull同期を廃止し、ブラウザ側CommandManagerからのデバウンスpush同期に変更
2. **UUID方式** → `crypto.randomUUID()` を廃止し、既存sceneの最大UUID値からの単調増加hex allocatorに変更
3. **再接続時のstatePush** → 差分適用ではなくフルリロード（`Engine.load()` 相当）。dirtyフラグの代わりにrevision管理
4. **オフライン時のレスポンス形式** → `getComponentDetail` はオフライン時503のまま。`getEntity` のコンポーネントfieldsはexport済みpropsのみと明示
5. **コンポーネント一覧・操作の互換性** → built-in（Light, Camera, Mesh等）を含める。`addComponent` は同クラス既存分を置換する動作にする

## 実装ステップ

### 1. SceneDataEditor クラスの実装

- **対象ファイル**: `server/SceneDataEditor/index.ts`（新規作成）
- **変更内容**: `SceneFileData` のJSON構造を直接操作するクラスを実装する。`EditorAPIBridge._dispatch()` がブラウザ側で行っている処理のサーバー側等価物。
- **対象アクション（最小集合）**: `getScene`, `getEntity`, `searchEntities`, `createEntity`, `deleteEntity`, `addComponent`, `removeComponent`, `setField`

```typescript
import type { SceneFileData, SceneDataEntity, SceneDataComponent } from '../Project/types';

export class SceneDataEditor {

	private _data: SceneFileData;
	private _nextUuid: number; // 単調増加hex allocator

	constructor( data: SceneFileData ) {

		this._data = data;
		this._nextUuid = this._scanMaxUuid( data.scene ) + 1;

	}

	// --- 読み取り系 ---
	getScene(): object { /* _data.scene をツリー構造レスポンスに変換 */ }
	getEntity( uuid: string ): object { /* UUID検索 → エンティティ詳細 */ }
	searchEntities( query: string ): object[] { /* 名前検索 */ }

	// --- 書き込み系 ---
	createEntity( parentUuid: string, name: string ): { uuid: string; name: string } {
		/* _allocUuid() で新UUID取得、childs に追加 */
	}
	deleteEntity( uuid: string ): void { /* ツリーから削除 */ }
	addComponent( uuid: string, componentName: string ): { uuid: string; componentName: string } {
		/* 同名コンポーネントが既存なら置換（削除→追加）、なければ追加 */
	}
	removeComponent( uuid: string, componentName: string ): void { /* components から削除 */ }
	setField( targetUuid: string, path: string, value: unknown ): void { /* エンティティ or コンポーネントのフィールド設定 */ }

	// --- ヘルパー ---
	private _allocUuid(): string { /* _nextUuid を8桁hex文字列にして返し、インクリメント */ }
	private _scanMaxUuid( entity: SceneDataEntity ): number {
		/* ツリー全体を再帰走査し、エンティティ・コンポーネントのUUIDの最大値（数値変換）を返す */
	}
	private _findEntity( uuid: string ): SceneDataEntity | null { /* 再帰検索 */ }
	private _findEntityParent( uuid: string ): { parent: SceneDataEntity; index: number } | null { /* 親と位置 */ }
	private _findComponent( uuid: string ): { entity: SceneDataEntity; component: SceneDataComponent; index: number } | null { /* UUID でコンポーネント検索 */ }

}
```

- **注意点**:
  - UUID生成は**単調増加hex allocator**を使用。コンストラクタでscene全体を走査し最大UUID値を取得、以降は `_nextUuid++` で連番を振る。ブラウザ側 `GLP.ID.genUUID()` と同じ8桁hex形式
  - `addComponent` はブラウザ側と同様に**同クラスの既存コンポーネントを置換**する動作にする（単純pushではない）
  - `setField` のパスマッピング: `position` → `pos`, `euler` → `rot`, `scale` → `scale`。コンポーネントのフィールドは `props` に格納
  - `getScene`, `getEntity` のレスポンス形式はブラウザ側 `_buildSceneTree()`, `_serializeEntity()` と同じ形式にする。ただし**コンポーネントのfieldsはexport済みprops（scene.jsonに保存された値）のみ**であり、ブラウザ側のようなserialize()由来の完全なフィールド情報は含まない
  - `_findEntity` はエンティティのUUID検索、`_findComponent` はコンポーネントのUUID検索。`setField` は両方を対象にする

### 2. handleActionInternal のフォールバック分岐

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: `handleActionInternal` でブラウザ未接続時に SceneDataEditor へフォールバックする。ブラウザ接続中はWS委譲のみ（pull同期は行わない。同期はブラウザ側pushに任せる）。

```typescript
async function handleActionInternal(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
): Promise<any> {

	const bridge = getWSBridge();

	// ブラウザ接続中 → 従来通りWS委譲
	if ( bridge && bridge.isProjectConnected( projectName ) ) {

		const result = await bridge.send( projectName, action, params );

		if ( ! result.success ) throw new Error( result.error );

		// ※ syncRequest は行わない（ブラウザ側pushで同期される）

		if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {
			await persistResourceChange( action, params, result.data );
		}

		return result.data;

	}

	// ブラウザ未接続 → SceneDataEditor でフォールバック
	return handleActionLocal( projectName, action, params );

}
```

- **注意点**: 旧計画のWS委譲後syncRequestを廃止。代わりにステップ5のブラウザ側push同期で常時最新状態をサーバーに送る

### 3. handleActionLocal（サーバー側ローカル処理）の実装

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: SceneDataEditor を使ってローカルでアクションを処理する関数を追加。

```typescript
import { SceneDataEditor } from '../SceneDataEditor';

const WRITE_ACTIONS = new Set( [
	'createEntity', 'deleteEntity', 'addComponent', 'removeComponent', 'setField',
] );

function handleActionLocal(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
): unknown {

	const project = projectManager.getProject( projectName );
	const sceneData = project.getSceneFileData();
	const editor = new SceneDataEditor( sceneData );

	let result: unknown;

	switch ( action ) {

		case 'getScene':
			result = editor.getScene();
			break;

		case 'getEntity':
			result = editor.getEntity( params.uuid as string );
			break;

		case 'searchEntities':
			result = editor.searchEntities( params.query as string || '' );
			break;

		case 'createEntity':
			result = editor.createEntity( params.parentUuid as string || '0', params.name as string || 'New Entity' );
			break;

		case 'deleteEntity':
			editor.deleteEntity( params.uuid as string );
			result = { success: true };
			break;

		case 'addComponent':
			result = editor.addComponent( params.uuid as string, params.componentName as string );
			break;

		case 'removeComponent':
			editor.removeComponent( params.uuid as string, params.componentName as string );
			result = { success: true };
			break;

		case 'setField':
			editor.setField( params.targetUuid as string, params.path as string, params.value );
			result = { success: true };
			break;

		case 'getAvailableComponents':
			result = getAvailableComponentsFromFiles();
			break;

		case 'getStatus':
			result = { connected: false, canUndo: false, canRedo: false, selectedEntityId: null };
			break;

		// ブラウザ必須のアクション
		case 'getShaderErrors':
		case 'getComponentDetail':
		case 'selectEntity':
		case 'undo':
		case 'redo':
			throw new Error( `Action '${action}' requires browser connection` );

		default:
			throw new Error( `Unknown action: ${action}` );

	}

	// 書き込み操作後に revision をインクリメント
	if ( WRITE_ACTIONS.has( action ) ) {

		project.incrementRevision();

	}

	return result;

}
```

- **注意点**:
  - SceneDataEditor のコンストラクタに渡す `sceneData` は ProjectData が保持する参照そのもの。SceneDataEditor が内部で変更すると ProjectData のオンメモリ状態もそのまま変わる（明示的セーブまでファイルには書き込まない）
  - `getComponentDetail` はオフライン時は503を返す。serialize()由来のフィールド情報はランタイムが必要なため

### 4. getAvailableComponentsFromFiles の実装

- **対象ファイル**: `server/routes/editor.ts`（または `server/SceneDataEditor/index.ts`）
- **変更内容**: `src/ts/Resources/Components/` をスキャンしてコンポーネント一覧を返す。**built-inコンポーネント（Light, Camera, Mesh等）も含める。**

```typescript
// built-in コンポーネント（Componentsディレクトリにはないがブラウザ側では利用可能）
const BUILTIN_COMPONENTS = [
	{ name: 'Light', className: 'Light' },
	{ name: 'Camera', className: 'Camera' },
	{ name: 'Mesh', className: 'Mesh' },
];

function getAvailableComponentsFromFiles(): { name: string; className: string }[] {

	// 既存の scanComponentTree (server/routes/components.ts) を再利用
	const scanned = scanComponentTree();

	return [ ...BUILTIN_COMPONENTS, ...scanned ];

}
```

- **注意点**: 既に `server/routes/components.ts` に類似のスキャンロジック（`scanComponentTree`）がある。それを再利用またはインポートする。built-inコンポーネントのリストはハードコードし、maxpowerのコンポーネント一覧と合わせる

### 5. ブラウザ側からのデバウンスpush同期

- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPIBridge/index.ts`（ブラウザ側）
- **変更内容**: CommandManager の change イベントを監視し、デバウンス付きでサーバーへ現在のシーン状態をpush送信する。

```typescript
// EditorAPIBridge のコンストラクタまたは初期化で
this._editor.commandManager.on( 'change', () => {

	this._debouncedSyncToServer();

} );

private _syncTimer: number | null = null;

private _debouncedSyncToServer(): void {

	if ( this._syncTimer !== null ) {
		clearTimeout( this._syncTimer );
	}

	this._syncTimer = window.setTimeout( () => {

		this._syncTimer = null;
		this._syncToServer();

	}, 500 ); // 500msデバウンス

}

private _syncToServer(): void {

	// 現在のシーン状態をシリアライズ
	const sceneData = this._engine.projectSerializer.serialize();

	// WebSocket経由でサーバーに送信
	this._ws?.send( JSON.stringify( {
		type: 'syncPush',
		sceneData,
	} ) );

}
```

- **注意点**:
  - これにより旧計画のWS委譲後syncRequest（pull方式）が不要になる。ブラウザでの手動編集もAPI経由の編集も、CommandManager経由で変更が検知されサーバーに送られる
  - デバウンス間隔は500msを想定。頻繁な操作（ドラッグ等）でサーバーを圧迫しないため
  - ブラウザ単独動作（サーバーなし）の場合はWS未接続なので送信が無視される。既存動作に影響なし

### 6. サーバー側 syncPush の受信処理

- **対象ファイル**: `server/ws/index.ts`
- **変更内容**: ブラウザからの `syncPush` メッセージを受信し、ProjectData を更新する。

```typescript
if ( msg.type === 'syncPush' && msg.sceneData ) {

	const projectName = this._clients.get( ws );
	if ( ! projectName ) return;

	const project = this._getProject?.( projectName );
	if ( ! project ) return;

	project.syncFromBrowser( msg.sceneData );
	return;

}
```

- **注意点**: `syncFromBrowser` は revision をリセットする（ブラウザが最新のsource of truthであるため）

### 7. ブラウザ再接続時の statePush（フルリロード方式）

- **対象ファイル**: `server/ws/index.ts`
- **変更内容**: WebSocket の `connection` イベントで `register` メッセージを受信した際、サーバー側で変更があればブラウザに `statePush` を送信する。ブラウザ側は**フルリロード**で適用する。

```typescript
if ( msg.type === 'register' && msg.projectName ) {

	this._clients.set( ws, msg.projectName );

	// サーバー側で変更があればブラウザに送信
	this._pushStateIfModified( ws, msg.projectName );
	return;

}
```

```typescript
private async _pushStateIfModified( ws: WebSocket, projectName: string ) {

	const project = this._getProject?.( projectName );
	if ( ! project || project.revision === 0 ) return;

	const sceneData = project.getSceneFileData();

	ws.send( JSON.stringify( {
		type: 'statePush',
		sceneData,
		fullReload: true, // ブラウザ側でフルリロードを指示
	} ) );

}
```

- **注意点**: `EditorWSBridge` から `ProjectData` にアクセスする手段が必要。コンストラクタで `projectManager` への参照を渡すか、コールバックを注入する

### 8. ブラウザ側 statePush のフルリロード処理

- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPIBridge/index.ts`
- **変更内容**: `_handleStatePush` でサーバーから `fullReload: true` を受信した場合、差分適用ではなく `Engine.load()` 相当のフルリロードを行う。

```typescript
private _handleStatePush( data: { sceneData: SceneFileData; fullReload?: boolean } ): void {

	if ( data.fullReload ) {

		// フルリロード: 既存シーンを破棄して新規ロード
		this._engine.load( data.sceneData );
		// CommandManager をクリア（サーバー操作分はUndo不可）
		this._editor.commandManager.clear();
		return;

	}

	// 従来の差分適用パス（既存実装）
	// ...

}
```

- **注意点**: フルリロードにより、サーバー側で行われた削除操作（removeComponent, deleteEntity）も正しく反映される。差分適用では「存在しなくなったコンポーネント/エンティティ」の検出が困難だった問題を根本解決

### 9. ProjectData に revision 管理を追加

- **対象ファイル**: `server/Project/ProjectData/index.ts`
- **変更内容**: dirtyフラグの代わりにrevisionカウンタで状態変更を追跡する。

```typescript
export class ProjectData {

	private _revision = 0;

	get revision(): number { return this._revision; }

	// SceneDataEditor がデータを変更したらインクリメント
	incrementRevision(): void { this._revision++; }

	syncFromBrowser( sceneData: SceneFileData ): void {

		this._sceneData = sceneData;
		this._revision = 0; // ブラウザが最新のsource of truth → リセット

	}

	save(): void {

		if ( this._sceneData ) {
			this._writeSceneFile( this._sceneData );
		}

	}

}
```

- **注意点**: revisionが0はブラウザ同期済み（または初期状態）、0より大きい場合はサーバー側で変更あり。再接続時の statePush 判定に使用

### 10. save エンドポイントの調整

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: ブラウザ未接続時もオンメモリ状態をセーブできるようにする。ブラウザ接続中はpush同期で既にProjectDataが最新なので、追加のsyncRequestは不要。

```typescript
editorRouter.post( '/projects/:projectName/editor/save', async ( req, res ) => {

	try {

		const project = projectManager.getProject( req.params.projectName );

		// オンメモリ状態をファイルに書き込み（ブラウザ有無に関わらず）
		// ブラウザ接続中ならpush同期で既にProjectDataは最新
		project.save();
		res.json( { success: true } );

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

} );
```

---

## 変更対象ファイル一覧

- [x] `server/SceneDataEditor/index.ts` — 新規: SceneDataEditor クラス（単調増加UUID allocator、addComponent置換動作）
- [x] `server/routes/editor.ts` — handleActionInternal のフォールバック分岐、handleActionLocal、getAvailableComponentsFromFiles（built-in含む）
- [x] `server/ws/index.ts` — syncPush受信処理、ブラウザ再接続時の statePush（フルリロード指示）
- [x] `server/Project/ProjectData/index.ts` — revision管理追加（dirtyフラグの代わり）
- [x] `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` — デバウンスpush同期、statePushフルリロード処理

## API契約（オフライン時の制約）

オフライン（ブラウザ未接続）時のAPI動作について明示:

| アクション | オフライン時の動作 |
|-----------|-----------------|
| `getScene`, `getEntity`, `searchEntities` | 正常動作。ただしコンポーネントfieldsはexport済みpropsのみ |
| `createEntity`, `deleteEntity` | 正常動作 |
| `addComponent`, `removeComponent` | 正常動作（同クラス既存分は置換） |
| `setField` | 正常動作 |
| `getAvailableComponents` | 正常動作（built-in含む） |
| `getStatus` | `{ connected: false, canUndo: false, canRedo: false }` |
| `getComponentDetail` | **503 エラー**（serialize()にランタイム必要） |
| `getShaderErrors` | **503 エラー**（GPU必要） |
| `selectEntity`, `undo`, `redo` | **503 エラー**（ブラウザUI/CommandManager必要） |
| `getMaterial`, `getTexture`, `getResources` | 将来対応予定（.mat/.texファイル読み取りで可能） |
| `addMaterial`, `updateMaterial` 等 | 将来対応予定（persistResourceChange のロジック流用） |

## 考慮事項・リスク

- **push同期のデバウンス間隔**: 500msを想定。頻繁なドラッグ操作等でサーバーを圧迫しないため。パフォーマンスに応じて調整
- **SceneDataEditor のレスポンス形式**: ブラウザ側 `_buildSceneTree()` / `_serializeEntity()` と同じ形式にする。ただしコンポーネントfieldsはpropsのみという差異を許容
- **UUID 互換性**: サーバー側の単調増加allocatorがブラウザ側 `GLP.ID.genUUID()` と衝突しないよう、既存sceneの最大UUID値+1から開始。ブラウザ再接続後はブラウザ側のallocatorが引き継ぐ
- **リソース操作（マテリアル/テクスチャ）のフォールバック**: 初期実装ではスコープ外。将来対応予定
- **同時編集の競合**: ブラウザ接続中はWS委譲なので競合しない。ブラウザ未接続時は単一のサーバープロセスが操作するので競合しない。切り替え時はpush同期/statePushで整合性を保つ
- **CommandManager のクリア**: フルリロード時にUndoバッファがクリアされる。サーバー操作分はUndo不可。ユーザーへの影響は限定的（ブラウザ閉じて再開した時点でUndoが消えるのは自然な挙動）

## テスト方針

1. **ブラウザ未接続でAPI操作**: サーバー起動 → ブラウザ接続せず → `POST /editor/entity` → `GET /editor/scene` で確認
2. **明示的セーブ**: API操作後に scene.json が変更されていないことを確認 → `POST /editor/save` → scene.json が更新されることを確認
3. **ブラウザ再接続**: サーバーでAPI操作 → ブラウザ開く → statePush（fullReload）でシーンが反映されることを確認
4. **ハンドオフ（API→ブラウザ閉→API→ブラウザ再開）**: ブラウザ開 → API操作（WS委譲）→ ブラウザ閉 → API操作（SceneDataEditor）→ ブラウザ再開 → 全操作が反映されていることを確認
5. **ハンドオフ（ブラウザ手動編集→閉→API）**: ブラウザで手動編集 → push同期でサーバーに反映されることを確認 → ブラウザ閉 → API操作（SceneDataEditor）→ 手動編集分が消失していないことを確認
6. **ブラウザ単独動作**: サーバー起動なし → ブラウザでシーン編集が正常に動作することを確認
7. **addComponent 置換動作**: 同クラスのコンポーネントを2回追加 → 重複せず置換になることを確認
8. **UUID連番**: API操作で複数エンティティ作成 → UUIDが既存最大値からの連番であることを確認
9. **deleteEntity/removeComponent の再接続反映**: サーバーで削除操作 → ブラウザ再接続 → フルリロードで削除が正しく反映されていることを確認
