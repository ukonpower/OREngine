# Plan: Editor REST API の問題修正

## 概要
API経由でのシーン構築作業中に発見された4つの問題について、すべて実装バグと判定し修正する。

## 判定結果

| 問題 | 判定 | 理由 |
|------|------|------|
| 問題1: バッチ作成で parentUuid "0" が見つからない | **実装バグ** | ルートエンティティに `uuid` フィールドがないため `findEntity` が見つけられない |
| 問題2: setField でコンポーネントpropsがネストされる | **実装バグ** | `_setNestedValue` がフラットキーをネスト化する。**修正済み** |
| 問題3: エンティティが重複して保存される | **実装バグ** | `deserializeEntity` が既存子を削除せず再追加 + `save()` が `clearDirty()` しない |
| 問題4: カメラ不在の警告がない | **機能不足**（今回スコープ外） | |

## 実装ステップ

### 1. ルートエンティティのUUID保証（問題1修正）

- **対象ファイル**: `server/Project/ProjectData/index.ts`
- **変更内容**: `_ensureLoaded()` でシーンデータ読み込み後、ルートエンティティに `uuid` がなければ `"0"` を付与
- **コードスニペット**:
  ```typescript
  private _ensureLoaded(): SceneFileData {

      if ( ! this._sceneData ) {

          this._sceneData = this._readSceneFile();

      }

      // ルートエンティティにUUIDがない場合は付与
      if ( this._sceneData.scene && ! this._sceneData.scene.uuid ) {

          this._sceneData.scene.uuid = '0';

      }

      return this._sceneData;

  }
  ```
- **注意点**: `findEntity` は `root.uuid === uuid` で比較するため、uuid が存在すれば動作する。DemoProjectのルートも `"0"` を使用

### 2. バッチAPI の parentUuid 省略対応（問題1修正）

- **対象ファイル**: `server/routes/editor.ts`（バッチエンドポイント 470行付近）
- **変更内容**: `parentUuid` が省略された場合、デフォルトで `"0"`（ルート）を使用
- **コードスニペット**:
  ```typescript
  const createResult = await handleActionInternal(
      projectName, 'createEntity',
      { parentUuid: entityDef.parentUuid || '0', name: entityDef.name }
  );
  ```
- **注意点**: 単体API (`POST /editor/entity`) はブラウザ側が parentUuid 省略時にルートに追加してくれるため動作していた。サーバー側 dispatch でも同じ挙動にする

### 3. `deserializeEntity` の既存子エンティティ処理修正（問題3の主原因修正）

- **対象ファイル**: `packages/orengine/ts/Engine/ProjectSerializer/index.ts`
- **変更内容**: `deserializeEntity` の165-173行で、既存の子エンティティを削除してからデータの子を追加するように修正
- **コードスニペット**:
  ```typescript
  if ( node.childs ) {

      // 既存の子エンティティを全て削除（initiatior="script" のものは残す）
      const existingChildren = [ ...entity.children ];
      existingChildren.forEach( c => {

          if ( c.initiator !== "script" ) {

              entity.remove( c );

          }

      } );

      node.childs.forEach( c => {

          entity.add( _( c ) );

      } );

  }
  ```
- **注意点**:
  - `initiator === "script"` のエンティティはシリアライズ対象外（`serializeEntity` 64行で `if (c.initiator == "script") return` ）なので、deserialize時に削除してはいけない
  - ルートエンティティに対しても安全に動作すること
  - `entity.remove()` メソッドの存在を確認すること（Entity クラスに `remove` または `removeChild` があるはず）

### 4. `save()` で `clearDirty()` を呼ぶ（問題3の副原因修正）

- **対象ファイル**: `server/Project/ProjectData/index.ts`
- **変更内容**: `save()` 完了後に `clearDirty()` を呼び、不要な `_pushDirtyState` を防止
- **コードスニペット**:
  ```typescript
  save(): void {

      if ( this._sceneData ) {

          this._writeSceneFile( this._sceneData );
          this._dirty = false;

      }

  }
  ```
- **注意点**: `save()` 成功後のみ dirty をクリアすること。`_writeSceneFile` が例外を投げた場合は dirty のまま維持されるべき

### 5. saveエンドポイントの `bridge.connected` を修正

- **対象ファイル**: `server/routes/editor.ts`（saveエンドポイント 385行）
- **変更内容**: `bridge.connected`（全クライアント判定）を `bridge.isProjectConnected(projectName)` に変更
- **コードスニペット**:
  ```typescript
  editorRouter.post( '/projects/:projectName/editor/save', async ( req, res ) => {

      try {

          const projectName = req.params.projectName;
          const project = projectManager.getProject( projectName );
          const bridge = getWSBridge();

          if ( bridge && bridge.isProjectConnected( projectName ) ) {

              const snapshot = await bridge.requestSync( projectName );

              if ( snapshot ) {

                  project.syncFromBrowser( snapshot );

              }

          }

          project.save();
          res.json( { success: true } );

      } catch ( err: any ) {

          res.status( 400 ).json( { error: err.message || String( err ) } );

      }

  } );
  ```
- **注意点**: 他のプロジェクトのブラウザが接続されている場合に、無関係なプロジェクトの sync を試みないようにする

### 6. setField テストの更新（問題2のテスト修正）

- **対象ファイル**: `server/Project/EntityStore/EntityStore.test.ts`
- **変更内容**: フラットキー格納に合わせてテスト期待値を修正
- **コードスニペット**:
  ```typescript
  it( 'should set component field', () => {

      store.setField( root, 'comp-1', 'geometry/type', 'Sphere' );
      const comp = store.findComponent( root, 'comp-1' );
      expect( ( comp?.component.props as any )[ 'geometry/type' ] ).toBe( 'Sphere' );

  } );
  ```

## 変更対象ファイル一覧
- [x] `server/Project/ProjectData/index.ts` - ルートUUID保証 + save時clearDirty
- [x] `server/routes/editor.ts` - バッチAPI parentUuid省略対応 + saveエンドポイント修正
- [x] `packages/orengine/ts/Engine/ProjectSerializer/index.ts` - deserializeEntity 既存子削除
- [x] `server/Project/EntityStore/index.ts` - setField修正（済み）+ 未使用_setNestedValue削除
- [x] `server/Project/EntityStore/EntityStore.test.ts` - テスト更新

## 考慮事項・リスク
- **`deserializeEntity` の修正はブラウザ側**: この修正はmaxpowerパッケージではなくorengineパッケージ内。エンジンコアの変更なのでブラウザ再読み込みが必要
- **`entity.remove()` の確認**: Entity クラスに子エンティティ削除メソッドが存在するか事前確認が必要
- **ブラウザ接続/未接続の両パス**: 修正は両方の状態でテストする必要がある
- **問題4は今回スコープ外**: シーンバリデーションは別タスクとして扱う

## テスト方針
- `npm run typecheck` で型チェック
- `EntityStore.test.ts` のテストが通ること
- API経由でProject0を削除→再作成し、バッチAPIでエンティティ+ジオメトリが正しく設定されることを確認
- ブラウザを開いた状態でsave→再読み込みし、エンティティが重複しないことを確認
