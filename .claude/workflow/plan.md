# Plan: BLidger glTFメッシュのマテリアル上書きが反映されない問題の修正

## 概要

BLidgerのglTFタイプメッシュに対して、エディタUIでマテリアルを設定しても反映されない。
原因はBLidgerのglTF非同期ロードコールバックが `mesh.material` を無条件に上書きするため、
`applyAttachments` で復元されたユーザー設定マテリアルが毎回消される。

## 実装ステップ

### 1. Meshに `materialType` 公開ゲッターを追加

- **対象ファイル**: `packages/maxpower/Component/Mesh/index.ts`
- **変更内容**: privateフィールド `_materialType` を外部から読み取れるようにゲッターを追加
- **コードスニペット**:
  ```typescript
  // _geometryType, _materialType 定義の後あたりに追加
  public get materialType() {

      return this._materialType;

  }
  ```
- **注意点**: setterは不要。既存の `material/name` フィールドのsetterが `_rebuildMaterial()` を呼ぶ設計を維持する

### 2. BLidgerのglTFコールバックでマテリアル上書きを条件付きにする

- **対象ファイル**: `packages/maxpower/Component/BLidger/index.ts`
- **変更内容**: glTF Promiseコールバック内で、Meshに既にユーザー設定のマテリアルがある場合はmaterial上書きをスキップ
- **コードスニペット**:
  ```typescript
  } else if ( this.node.type == 'gltf' ) {

      const mesh = entity.addComponent( Mesh );

      this._blidge.gltfPrm.then( gltf => {

          const gltfEntity = gltf.scene.findEntityByName( this.node.name );

          if ( gltfEntity ) {

              const gltfMesh = gltfEntity.getComponent( Mesh );

              if ( gltfMesh ) {

                  mesh.geometry = gltfMesh.geometry;

                  if ( ! mesh.materialType ) {

                      mesh.material = gltfMesh.material;

                  }

              }

          }

          entity.noticeEventParent( "update/blidge/scene", [ entity ] );

      } );

  }
  ```
- **注意点**: `mesh.materialType` が空文字列 `""` の場合はユーザー未設定と判断してglTFマテリアルを使用する。`_materialType` のデフォルト値は `""` なので、falsy判定（`!mesh.materialType`）で問題ない

### 3. 型チェック

- `npm run typecheck` で型エラーがないことを確認

## 変更対象ファイル一覧

- [x] `packages/maxpower/Component/Mesh/index.ts` - `materialType` 公開ゲッターを追加
- [x] `packages/maxpower/Component/BLidger/index.ts` - glTFコールバック内のmaterial設定を条件付きに変更

## 考慮事項・リスク

1. **フォールバック動作**: ユーザーがマテリアルを未設定の場合は従来通りglTFのマテリアルが使われる。既存動作に影響なし
2. **`getMaterialInstance` が undefined を返すケース**: `_rebuildMaterial()` 内で `getMaterialInstance` が undefined を返した場合、`this.material` は更新されない（既存の動作）。この場合、`_materialType` は設定されているがmaterialインスタンスが得られない状態になる。ユーザーが有効なマテリアル名を選択していれば問題ない
3. **WebSocket再接続時**: `onSyncScene` が再度呼ばれ BLidger が再作成されるが、`applyAttachments` → glTFコールバックの順序は変わらないため、同じ修正で正しく動作する
4. **他のメッシュタイプへの影響**: cube/sphere/cylinder/plane/meshタイプはglTFを使わないため影響なし

## テスト方針

- `npm run typecheck` で型エラーなし
- `npm run dev` で以下を手動確認:
  - glTFメッシュのエンティティにMeshコンポーネントの `material/name` でマテリアルを選択 → 反映される
  - ページリロード後もマテリアル設定が維持される
  - マテリアル未設定のglTFメッシュは従来通りglTFのマテリアルで描画される
  - WebSocket再接続（Blender側で再送信）後もマテリアル設定が維持される
