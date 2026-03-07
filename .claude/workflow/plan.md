# Plan: リソースAPI ブラウザ同期（Undo/Redo対応 + 再接続同期）

## 概要

シェーダー・テクスチャ・マテリアルのREST APIによる追加・編集・削除を、ブラウザのオンメモリ状態（`Resources`クラス）と同期させる。
既存のエディタAPI（`editor.ts`）のブラウザファースト設計パターンを踏襲し、リソースAPIでも同様の委譲・同期メカニズムを構築する。
リソース操作もCommandManagerを経由しUndo/Redoに対応する。
さらに、ブラウザ切断中にサーバー側で行われた変更を再接続時にブラウザへプッシュする仕組みを、シーン操作・リソース操作の両方に対して新規実装する。

## 現状と課題

### 現状のリソースAPI
- `server/routes/shaders.ts` / `materials.ts` / `textures.ts` でファイルCRUDが実装済み
- **ファイル操作のみ**で、ブラウザの `Resources` クラスとの同期がない
- API経由でマテリアルを作成しても、ブラウザのレンダリングに反映されない

### エディタAPIのブラウザファースト設計（参考パターン）
```
REST API → bridge.send(action, params) → ブラウザの_dispatch()で実行
                                        → bridge.requestSync() → オンメモリ同期
```
- `EditorAPIBridge._dispatch()` にアクションハンドラが定義
- 書き込み操作はEditorAPI経由でCommandManager通過（Undo/Redo対応）
- 書き込み操作後は `requestSync()` でシーンスナップショットを取得・同期
- ブラウザ未接続時は `ProjectData.dispatch()` でサーバー側直接処理

### 再接続時の同期問題（既存の問題）
- ブラウザ切断中にAPIでシーン変更 → `ProjectData._sceneData` が更新される
- ブラウザ再接続 → WebSocketが繋がるだけで、サーバーのオンメモリ状態はブラウザに反映されない
- `EditorAPIBridge._connect()` に `onopen` ハンドラがない
- **シーン操作でも同じ問題が存在**

### 既存のCommandパターン
```
Command インターフェース: { name, execute(), undo(), mergeWith?() }
既存コマンド:
  - AddComponentCommand: entity.addComponent() / entity.removeComponent()
  - RemoveComponentCommand: serialize() でスナップショット保存 → undo時にdeserialize()で復元
  - CreateEntityCommand / DeleteEntityCommand
  - SetFieldCommand: oldValue/newValue保持、mergeWith() で連続変更をまとめる
```
`EditorAPI` がCommandManagerを持ち、`_dispatch()` は `this._api.addComponent()` 等を呼ぶ。

## 設計方針

### ブラウザファースト（エディタAPIパターンの踏襲）

リソース操作もエディタ操作と同じパターンで実装:

1. **ブラウザ接続中**: REST API → WebSocket → ブラウザの `_dispatch()` → `EditorAPI` → `CommandManager` → 実行 → ファイル保存
2. **ブラウザ未接続時**: REST API → サーバーオンメモリ処理 + ファイル保存
3. **ブラウザ再接続時**: サーバーがオンメモリ状態をプッシュ → ブラウザが `deserialize()` で適用

### 再接続同期設計（案A: サーバー→ブラウザへ状態プッシュ）

```
【ブラウザ切断中】
外部クライアント → REST API → ProjectData.dispatch() → オンメモリ更新
                            → persistResourceChange() → ファイル更新
                            → ProjectData._dirty = true

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

### Undo/Redo戦略

| 操作 | Commandパターン | Undo動作 |
|---|---|---|
| addMaterial | `AddMaterialCommand` | `Resources.removeMaterial()` |
| removeMaterial | `RemoveMaterialCommand` | config スナップショットから `Resources.addMaterial()` で復元 |
| updateMaterial | 既存の `SetFieldCommand` を再利用 | oldValue/newValue のスワップ |
| addTexture | `AddTextureCommand` | `Resources.removeTextureResource()` |
| removeTexture | `RemoveTextureCommand` | config スナップショットから `Resources.addTextureResource()` で復元 |
| updateTexture | 既存の `SetFieldCommand` を再利用 | oldValue/newValue のスワップ |

### 新規アクション

EditorAPIBridgeの`_dispatch()`に以下のアクションを追加:

| アクション | 説明 | パラメータ | Undo対応 |
|---|---|---|---|
| `getResources` | リソース一覧を取得 | - | 不要 |
| `addMaterial` | マテリアル追加 | `{ name, config }` | AddMaterialCommand |
| `updateMaterial` | マテリアル更新 | `{ name, config }` | SetFieldCommand |
| `removeMaterial` | マテリアル削除 | `{ name }` | RemoveMaterialCommand |
| `getMaterial` | マテリアル詳細取得 | `{ name }` | 不要 |
| `addTexture` | テクスチャ追加 | `{ name, config }` | AddTextureCommand |
| `updateTexture` | テクスチャ更新 | `{ name, config }` | SetFieldCommand |
| `removeTexture` | テクスチャ削除 | `{ name }` | RemoveTextureCommand |
| `getTexture` | テクスチャ詳細取得 | `{ name }` | 不要 |

## 実装ステップ

### 1. AddMaterialCommand の作成

- **対象ファイル**: `packages/orengine/ts/Editor/Commands/AddMaterialCommand/index.ts`（新規）
- **コードスニペット**:
  ```typescript
  import { Engine } from '../../../Engine';

  import { Command } from '../../CommandManager';

  export class AddMaterialCommand implements Command {

      public name = "AddMaterial";

      constructor(
          private _materialName: string,
          private _config: Record<string, unknown>,
      ) {}

      public execute() {

          Engine.resources.addMaterial( this._materialName, this._config );

      }

      public undo() {

          Engine.resources.removeMaterial( this._materialName );

      }

  }
  ```

### 2. RemoveMaterialCommand の作成

- **対象ファイル**: `packages/orengine/ts/Editor/Commands/RemoveMaterialCommand/index.ts`（新規）
- **コードスニペット**:
  ```typescript
  import { Engine } from '../../../Engine';

  import { Command } from '../../CommandManager';

  export class RemoveMaterialCommand implements Command {

      public name = "RemoveMaterial";
      private _snapshot: Record<string, unknown> | null = null;

      constructor(
          private _materialName: string,
      ) {}

      public execute() {

          const resource = Engine.resources.getMaterial( this._materialName );

          if ( resource ) {

              this._snapshot = resource.serialize( { mode: "export" } ) as Record<string, unknown>;

          }

          Engine.resources.removeMaterial( this._materialName );

      }

      public undo() {

          if ( this._snapshot ) {

              Engine.resources.addMaterial( this._materialName, this._snapshot );

          }

      }

  }
  ```

### 3. AddTextureCommand の作成

- **対象ファイル**: `packages/orengine/ts/Editor/Commands/AddTextureCommand/index.ts`（新規）
- **コードスニペット**:
  ```typescript
  import { Engine } from '../../../Engine';

  import { Command } from '../../CommandManager';

  export class AddTextureCommand implements Command {

      public name = "AddTexture";

      constructor(
          private _textureName: string,
          private _config: Record<string, unknown>,
      ) {}

      public execute() {

          Engine.resources.addTextureResource( this._textureName, this._config );

      }

      public undo() {

          Engine.resources.removeTextureResource( this._textureName );

      }

  }
  ```

### 4. RemoveTextureCommand の作成

- **対象ファイル**: `packages/orengine/ts/Editor/Commands/RemoveTextureCommand/index.ts`（新規）
- **コードスニペット**:
  ```typescript
  import { Engine } from '../../../Engine';

  import { Command } from '../../CommandManager';

  export class RemoveTextureCommand implements Command {

      public name = "RemoveTexture";
      private _snapshot: Record<string, unknown> | null = null;

      constructor(
          private _textureName: string,
      ) {}

      public execute() {

          const resource = Engine.resources.getTextureResource( this._textureName );

          if ( resource ) {

              this._snapshot = resource.serialize( { mode: "export" } ) as Record<string, unknown>;

          }

          Engine.resources.removeTextureResource( this._textureName );

      }

      public undo() {

          if ( this._snapshot ) {

              Engine.resources.addTextureResource( this._textureName, this._snapshot );

          }

      }

  }
  ```

### 5. EditorAPI にリソース操作メソッドを追加

- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPI/index.ts`
- **変更内容**: CommandManager経由でリソース操作を実行するメソッドを追加
- **コードスニペット**:
  ```typescript
  import { AddMaterialCommand } from '../Commands/AddMaterialCommand';
  import { RemoveMaterialCommand } from '../Commands/RemoveMaterialCommand';
  import { AddTextureCommand } from '../Commands/AddTextureCommand';
  import { RemoveTextureCommand } from '../Commands/RemoveTextureCommand';

  /*-------------------------------
      Material
  -------------------------------*/

  public addMaterial( name: string, config: Record<string, unknown> ): void {

      this._commandManager.execute(
          new AddMaterialCommand( name, config )
      );

  }

  public removeMaterial( name: string ): void {

      this._commandManager.execute(
          new RemoveMaterialCommand( name )
      );

  }

  public updateMaterial( name: string, config: Record<string, unknown> ): void {

      const resource = Engine.resources.getMaterial( name );
      if ( ! resource ) throw new Error( `Material not found: ${name}` );

      const fields = Object.keys( config );
      for ( const field of fields ) {

          const oldValue = resource.getField( field );
          this._commandManager.execute(
              new SetFieldCommand( resource, field, oldValue as MXP.SerializeFieldValue, config[ field ] as MXP.SerializeFieldValue )
          );

      }

  }

  /*-------------------------------
      Texture
  -------------------------------*/

  public addTexture( name: string, config: Record<string, unknown> ): void {

      this._commandManager.execute(
          new AddTextureCommand( name, config )
      );

  }

  public removeTexture( name: string ): void {

      this._commandManager.execute(
          new RemoveTextureCommand( name )
      );

  }

  public updateTexture( name: string, config: Record<string, unknown> ): void {

      const resource = Engine.resources.getTextureResource( name );
      if ( ! resource ) throw new Error( `Texture not found: ${name}` );

      const fields = Object.keys( config );
      for ( const field of fields ) {

          const oldValue = resource.getField( field );
          this._commandManager.execute(
              new SetFieldCommand( resource, field, oldValue as MXP.SerializeFieldValue, config[ field ] as MXP.SerializeFieldValue )
          );

      }

  }
  ```

### 6. EditorAPIBridge にリソースアクション + statePush ハンドラを追加

- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPIBridge/index.ts`
- **変更内容**:
  1. `_dispatch()` にリソース操作アクションを追加
  2. `_handleMessage()` に `statePush` ハンドラを追加
  3. `_connect()` の WebSocket `onopen` は不要（サーバー側が `connection` イベントでプッシュする）
- **コードスニペット（_handleMessage に追加）**:
  ```typescript
  case 'statePush':
      this._handleStatePush( msg );
      break;
  ```
- **コードスニペット（_handleStatePush メソッド）**:
  ```typescript
  private _handleStatePush( msg: {
      sceneData?: any;
      resources?: {
          materials: { name: string; config: any }[];
          textures: { name: string; config: any }[];
      };
  } ) {

      // シーンデータの適用
      if ( msg.sceneData ) {

          this._engine.deserialize( msg.sceneData );
          this._engine.emit( "update/graph" );

      }

      // リソースの差分適用
      if ( msg.resources ) {

          const { materials, textures } = msg.resources;

          // マテリアル: 既存をクリアして再登録
          const currentMaterials = Engine.resources.materialList.map( m => m.name );
          for ( const name of currentMaterials ) {

              Engine.resources.removeMaterial( name );

          }

          for ( const m of materials ) {

              Engine.resources.addMaterial( m.name, m.config );

          }

          // テクスチャ: 既存をクリアして再登録
          const currentTextures = Engine.resources.textureList.map( t => t.name );
          for ( const name of currentTextures ) {

              Engine.resources.removeTextureResource( name );

          }

          for ( const t of textures ) {

              Engine.resources.addTextureResource( t.name, t.config );

          }

      }

      // 切断中の変更はundo不可なのでCommandManagerをクリア
      this._api.commandManager.clear();

  }
  ```
- **コードスニペット（_dispatch に追加するリソースアクション）**:
  ```typescript
  // --- リソース読み取り ---
  case 'getResources': {

      return {
          materials: Engine.resources.materialList.map( m => ( {
              name: m.name,
              config: m.serialize( { mode: "export" } ),
          } ) ),
          textures: Engine.resources.textureList.map( t => ( {
              name: t.name,
              config: t.serialize( { mode: "export" } ),
          } ) ),
          shaders: Engine.resources.shaderList.map( s => ( {
              name: s.name,
          } ) ),
      };

  }

  // --- マテリアル操作 ---
  case 'addMaterial': {

      const { name, config } = params as { name: string; config: any };
      this._api.addMaterial( name, config || {} );
      return { name };

  }

  case 'updateMaterial': {

      const { name, config } = params as { name: string; config: any };
      this._api.updateMaterial( name, config );
      const resource = Engine.resources.getMaterial( name );
      return { name, config: resource?.serialize( { mode: "export" } ) };

  }

  case 'removeMaterial': {

      const { name } = params as { name: string };
      this._api.removeMaterial( name );
      return { success: true };

  }

  case 'getMaterial': {

      const { name } = params as { name: string };
      const resource = Engine.resources.getMaterial( name );
      if ( ! resource ) throw new Error( `Material not found: ${name}` );

      return { name, config: resource.serialize( { mode: "export" } ) };

  }

  // --- テクスチャ操作 ---
  case 'addTexture': {

      const { name, config } = params as { name: string; config: any };
      this._api.addTexture( name, config || {} );
      return { name };

  }

  case 'updateTexture': {

      const { name, config } = params as { name: string; config: any };
      this._api.updateTexture( name, config );
      const resource = Engine.resources.getTextureResource( name );
      return { name, config: resource?.serialize( { mode: "export" } ) };

  }

  case 'removeTexture': {

      const { name } = params as { name: string };
      this._api.removeTexture( name );
      return { success: true };

  }

  case 'getTexture': {

      const { name } = params as { name: string };
      const resource = Engine.resources.getTextureResource( name );
      if ( ! resource ) throw new Error( `Texture not found: ${name}` );

      return { name, config: resource.serialize( { mode: "export" } ) };

  }

  // --- シェーダー通知 ---
  case 'notifyShaderAdded': {

      Engine.resources.emit( "update" );
      return { success: true };

  }

  case 'notifyShaderRemoved': {

      Engine.resources.emit( "update" );
      return { success: true };

  }
  ```

### 7. ProjectData にdirtyフラグとリソース状態管理を追加

- **対象ファイル**: `server/Project/ProjectData/index.ts`
- **変更内容**: 切断中に変更があったかを追跡する `_dirty` フラグと、リソース状態の取得メソッドを追加
- **コードスニペット**:
  ```typescript
  import * as fs from 'fs';
  import * as path from 'path';

  export class ProjectData {

      // 既存プロパティに追加
      private _dirty: boolean = false;

      // --- dirty管理 ---

      get dirty(): boolean {

          return this._dirty;

      }

      markDirty(): void {

          this._dirty = true;

      }

      clearDirty(): void {

          this._dirty = false;

      }

      // --- リソース状態取得（ファイルから読み込み） ---

      getResourcesSnapshot(): {
          materials: { name: string; config: any }[];
          textures: { name: string; config: any }[];
      } {

          return {
              materials: this._readMaterialFiles(),
              textures: this._readTextureFiles(),
          };

      }

      private _readMaterialFiles(): { name: string; config: any }[] {

          const materialsDir = path.resolve( this._projectDir, '../../src/ts/Resources/Materials' );

          if ( ! fs.existsSync( materialsDir ) ) return [];

          const items: { name: string; config: any }[] = [];

          const files = fs.readdirSync( materialsDir ).filter( f => f.endsWith( '.mat' ) );

          for ( const file of files ) {

              const name = path.basename( file, '.mat' );
              const config = JSON.parse( fs.readFileSync( path.join( materialsDir, file ), 'utf-8' ) );
              items.push( { name, config } );

          }

          return items;

      }

      private _readTextureFiles(): { name: string; config: any }[] {

          const texturesDir = path.resolve( this._projectDir, '../../src/ts/Resources/Textures' );

          if ( ! fs.existsSync( texturesDir ) ) return [];

          const items: { name: string; config: any }[] = [];

          const files = fs.readdirSync( texturesDir ).filter( f => f.endsWith( '.tex' ) );

          for ( const file of files ) {

              const name = path.basename( file, '.tex' );
              const config = JSON.parse( fs.readFileSync( path.join( texturesDir, file ), 'utf-8' ) );
              items.push( { name, config } );

          }

          return items;

      }

  }
  ```
- **注意点**: `dispatch()` の書き込みアクション実行後に `this._dirty = true` を設定する。

### 8. EditorWSBridge に再接続時のstatePushを追加

- **対象ファイル**: `server/ws/index.ts`
- **変更内容**: `connection` イベントで、dirtyなProjectDataがあればstatePushメッセージを送信
- **コードスニペット**:
  ```typescript
  import { projectManager } from '../Project';

  // constructor 内の connection ハンドラに追加:
  this._wss.on( 'connection', ( ws ) => {

      this._client = ws;

      // 切断中に変更があった場合、再接続時にstatePushを送信
      this._pushDirtyState( ws );

      ws.on( 'message', ( raw ) => { /* 既存のメッセージ処理 */ } );

      ws.on( 'close', () => {

          if ( this._client === ws ) this._client = null;

      } );

  } );

  // 新規メソッド:
  private _pushDirtyState( ws: WebSocket ) {

      // アクティブプロジェクト名を取得
      const activeProjectPath = path.resolve( __dirname, '../../projects/.active' );
      let activeProject: string | null = null;

      try {

          activeProject = fs.readFileSync( activeProjectPath, 'utf-8' ).trim();

      } catch {

          return;

      }

      if ( ! activeProject ) return;

      try {

          const project = projectManager.getProject( activeProject );

          if ( ! project.dirty ) return;

          const payload: any = {
              type: 'statePush',
          };

          // シーンデータ
          payload.sceneData = project.getSceneFileData();

          // リソースデータ
          payload.resources = project.getResourcesSnapshot();

          ws.send( JSON.stringify( payload ) );
          project.clearDirty();

      } catch ( err ) {

          console.error( 'Failed to push dirty state:', err );

      }

  }
  ```
- **注意点**: `fs` と `path` のimportを追加。`projectManager` をimportする。

### 9. editor.ts にリソースAPIエンドポイント追加 + dirtyフラグ管理

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: リソースAPIエンドポイント追加、handleAction拡張、persistResourceChange追加、ブラウザ未接続時のdirtyフラグ設定
- **コードスニペット**:
  ```typescript
  import * as fs from 'fs';
  import * as path from 'path';
  import { fileURLToPath } from 'url';

  const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
  const MATERIALS_DIR = path.resolve( __dirname, '../../src/ts/Resources/Materials' );
  const TEXTURES_DIR = path.resolve( __dirname, '../../src/ts/Resources/Textures' );
  const SHADERS_DIR = path.resolve( __dirname, '../../src/ts/Resources/Shaders' );

  const RESOURCE_MUTATING_ACTIONS = new Set( [
      'addMaterial', 'updateMaterial', 'removeMaterial',
      'addTexture', 'updateTexture', 'removeTexture',
  ] );
  ```
- **handleAction 更新**:
  ```typescript
  async function handleAction( ... ) {

      // ... 既存のロジック ...

      if ( browserConnected ) {

          // ... bridge.send() → 既存のMUTATING_ACTIONS同期 ...

          // リソース変更のファイル永続化
          if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {

              await persistResourceChange( action, params, result.data );

          }

          res.json( result.data );

      } else {

          // ブラウザ未接続時
          if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {

              await persistResourceChange( action, params, params );

              // dirtyフラグを立てる
              const project = projectManager.getProject( projectName );
              project.markDirty();

              res.json( { success: true } );

          } else if ( MUTATING_ACTIONS.has( action ) ) {

              const project = projectManager.getProject( projectName );
              const data = project.dispatch( action, params );

              // dirtyフラグを立てる
              project.markDirty();

              res.json( data );

          } else {

              const project = projectManager.getProject( projectName );
              const data = project.dispatch( action, params );
              res.json( data );

          }

      }

  }
  ```
- **エンドポイント追加**: ステップ7（前回のplan）と同一のため省略。

### 10. ドキュメント更新

- **対象ファイル**: `docs/editor-rest-api.md`, `docs/resource-api.md`, `docs/architecture.md`
- **変更内容**:
  - `editor-rest-api.md`: リソース操作APIセクションを追加（Undo/Redo対応であることを明記）
  - `resource-api.md`: エディタAPI経由のリソース操作について注記を追加
  - `architecture.md`:
    - ブラウザファースト設計のリソース操作フロー追加
    - **再接続同期（statePush）のフロー追加**
    - WebSocketメッセージ型に `statePush` を追加

## 変更対象ファイル一覧

- [x] `packages/orengine/ts/Editor/Commands/AddMaterialCommand/index.ts` - **新規**: マテリアル追加コマンド
- [x] `packages/orengine/ts/Editor/Commands/RemoveMaterialCommand/index.ts` - **新規**: マテリアル削除コマンド
- [x] `packages/orengine/ts/Editor/Commands/AddTextureCommand/index.ts` - **新規**: テクスチャ追加コマンド
- [x] `packages/orengine/ts/Editor/Commands/RemoveTextureCommand/index.ts` - **新規**: テクスチャ削除コマンド
- [x] `packages/orengine/ts/Editor/EditorAPI/index.ts` - リソース操作メソッド追加
- [x] `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` - リソースアクション + statePushハンドラ追加
- [x] `server/Project/ProjectData/index.ts` - dirtyフラグ + getResourcesSnapshot()
- [x] `server/ws/index.ts` - connection時のstatePush送信
- [x] `server/routes/editor.ts` - リソースAPIエンドポイント追加、handleAction拡張、persistResourceChange追加、dirtyフラグ管理
- [x] `docs/editor-rest-api.md` - リソース操作APIドキュメント
- [x] `docs/resource-api.md` - エディタAPI経由の注記追加
- [x] `docs/architecture.md` - リソース操作フロー + 再接続同期フロー追加

## 既存APIとの整理

| API | パス | 用途 | ブラウザ同期 | Undo/Redo |
|---|---|---|---|---|
| リソースAPI（既存） | `/api/shaders`, `/api/materials`, `/api/textures` | ファイル操作のみ | なし | なし |
| エディタリソースAPI（新規） | `/api/projects/:name/editor/materials`, etc. | ブラウザ同期つき | あり | あり |

## WebSocketメッセージ型一覧（更新後）

### サーバー → ブラウザ

| type | 説明 | ペイロード |
|---|---|---|
| `syncRequest` | シーンスナップショット要求 | `{ type, id, projectName }` |
| `executeAction` | 操作実行指示（Fire & Forget） | `{ type, projectName, action, params }` |
| **`statePush`** | **再接続時の状態プッシュ（新規）** | `{ type, sceneData?, resources? }` |
| (Legacy) | BridgeRequest形式 | `{ id, action, params }` |

### ブラウザ → サーバー

| type | 説明 | ペイロード |
|---|---|---|
| `syncResponse` | スナップショット返却 | `{ type, id, sceneData }` |
| (Legacy) | BridgeResponse形式 | `{ id, success, data?, error? }` |

## Undo/Redoの注意点

1. **ブラウザ接続中のリソース操作**: CommandManager経由なのでundo/redo可能。
2. **ブラウザ切断中の操作**: サーバー直接処理。再接続時にstatePushで全状態を上書きし、CommandManager.clear()するのでundo不可。
3. **updateMaterialのundo粒度**: 複数フィールドの同時更新は個別のSetFieldCommandになるが、`mergeWith()`で連続同一パスの変更はまとめられる。
4. **add→undo→redo**: AddMaterialCommandのundo()はremoveMaterial()を呼ぶ。redo()はexecute()を再度呼ぶ。configデータはCommand内に保持されるので復元可能。

## 考慮事項・リスク

1. **statePushのタイミング**: WebSocket `connection` イベントは接続確立直後。ブラウザ側のEngineが初期化済みであることが前提。初回接続（まだEngineが未初期化）の場合はdirtyがfalseなのでstatePushは発生しない。
2. **シェーダー**: ソースファイル変更はVite HMRが処理。statePushにはシェーダー状態は含めない（HMRで管理されるため）。
3. **テクスチャインスタンス**: statePushでテクスチャリソースを再登録した場合、GPUインスタンス（TexProcedural）の再構築が必要。`addTextureResource` 後の `buildTextureInstances()` 呼び出しを考慮。
4. **リソースのクリア&再登録のコスト**: statePushでは既存リソースを全削除→再登録する。大量のリソースがある場合パフォーマンス影響あり。ただし再接続は稀なイベントなので許容範囲。
5. **ブラウザ未接続時のリソース読み取りAPI**: `getResources`, `getMaterial`, `getTexture` をブラウザ未接続時に処理するには、`ProjectData.dispatch()` にリソース読み取りハンドラを追加するか、ファイルから直接読み取り。

## テスト方針

- `npm run typecheck` で型エラーがないことを確認
- `npm run lint` でリントエラーがないことを確認
- `npm run dev` で以下を手動確認:
  - **リソースAPI基本操作**:
    - `curl POST /api/projects/default/editor/materials` でマテリアル追加 → ブラウザのAssetViewerに反映
    - `curl PUT /api/projects/default/editor/materials/:name` でマテリアル更新 → ブラウザのPropertyパネルに反映
    - `curl DELETE /api/projects/default/editor/materials/:name` でマテリアル削除 → ブラウザのAssetViewerから消える
    - テクスチャについても同様
    - シェーダー追加/削除でブラウザのリソースリストが更新される
  - **Undo/Redo**:
    - マテリアル追加後に `POST /editor/undo` → マテリアルが消える → `POST /editor/redo` → マテリアルが復元
    - マテリアル削除後にundo → マテリアルが復元（configも含めて）
  - **再接続同期**:
    - ブラウザを閉じる → API経由でエンティティ追加 + マテリアル追加 → ブラウザを再度開く → シーンとリソースが反映されている
    - ブラウザを閉じる → API経由でマテリアル削除 → ブラウザを再度開く → マテリアルが消えている
    - 再接続後にUndo/Redoスタックがクリアされていること（切断中の変更はundo不可）
  - ブラウザ未接続時もAPIが動作する（サーバーオンメモリ + ファイル操作）
