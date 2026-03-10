# Plan: スクリプト生成Meshのgeometry/materialフィールド編集制御

## 概要

スクリプトから追加されたMeshコンポーネントのgeometry/materialフィールドをエディタで非表示にし、ユーザーがエディタから手動追加したMeshのみ編集できるようにする。

`Serializable.fieldDir()` の `hidden` オプションに `() => this.initiator !== "user"` を渡すことで、`initiator` が `"script"` のときはフォルダごと非表示になる。変更ファイルは1つのみ。

## 実装ステップ

### 1. Mesh の geometry/material fieldDir に hidden オプションを追加

- **対象ファイル**: `packages/maxpower/Component/Mesh/index.ts`
- **変更内容**: `fieldDir("geometry")` と `fieldDir("material")` の第2引数に `{ hidden: () => this.initiator !== "user" }` を追加する

- **変更前**:
  ```typescript
  const geo = this.fieldDir( "geometry" );
  // ...
  const mat = this.fieldDir( "material" );
  ```

- **変更後**:
  ```typescript
  const geo = this.fieldDir( "geometry", {
      hidden: () => this.initiator !== "user"
  } );
  // ...
  const mat = this.fieldDir( "material", {
      hidden: () => this.initiator !== "user"
  } );
  ```

- **注意点**:
  - `hidden` は関数クロージャなのでレンダリング時に `this.initiator` を動的参照する
  - `AddComponentCommand.execute()` でコンストラクタ完了後に `initiator = "user"` がセットされるが、`hidden` は遅延評価なので問題なく動作する

## 変更対象ファイル一覧

- [x] `packages/maxpower/Component/Mesh/index.ts` - geometry/material の `fieldDir` に `hidden` オプションを追加

## 考慮事項・リスク

- **既存シーンへの影響なし**: スクリプト由来のMeshのgeometry/materialは元々エディタで変更しても意味がなかった（スクリプトが直接インスタンスを渡すため）。非表示にするだけで機能的な変化はない
- **デシリアライズへの影響なし**: `hidden` はUI表示のみに影響し、`serialize()`/`deserialize()` には影響しない。保存・読み込みは従来通り動作する
- **BLidgeClient 由来のMesh**: `BLidgeClient` でも `component.initiator = "user"` をセットしている（L252）。このパスで追加されたMeshは編集可能のまま

## テスト方針

1. スクリプトから `entity.addComponent(MXP.Mesh, { geometry, material })` で追加したMeshのプロパティパネルで geometry/material フォルダが非表示になることを確認
2. エディタの ComponentAdd から Mesh を追加したとき、geometry/material フォルダが表示・編集できることを確認
3. `npm run typecheck` でエラーがないことを確認
