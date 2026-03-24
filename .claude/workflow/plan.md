# Plan: BLidgeClient の JSON シーン読み込みを静的 import に修正

## 概要
BLidgeClient の JSON モードで `blidge-scene.json` を読み込む方法を修正する。

現状 `fetch()` で動的に読み込む実装になっているが、`blidge-scene.json` は `projects/` 配下にあり publicDir（`src/public/`）には無いためブラウザからアクセスできない。

**方針**: `~project/blidge-scene.json` を静的 import してバンドルに含める。Player ビルドが `~project/scene.json` を静的 import しているのと同じパターン。JSON モードはプロダクション（ビルド後）用途のため、ビルド時にプロジェクトが固定されるのは問題ない。

## 実装ステップ

### 1. BLidgeClient で静的 import に変更し、fetch と jsonPath フィールドを削除
- **対象ファイル**: `packages/orengine/BuiltinResources/Components/Utility/BLidgeClient/index.ts`
- **変更内容**:
  - `import BLidgeSceneData from '~project/blidge-scene.json'` を追加
  - `jsonPath` プロパティとフィールドを削除
  - `reload()` 内の fetch を静的 import データの直接渡しに変更
- **コードスニペット**:
  ```typescript
  // import 追加
  import BLidgeSceneData from '~project/blidge-scene.json';

  // reload() 内の変更
  const reload = async () => {
      if ( this.type == "json" ) {
          await this.blidge.loadScene( BLidgeSceneData as unknown as MXP.BLidgeScene, ... );
          this.emit( "loaded" );
      } else {
          this.blidge.connect( ... );
      }
  };
  ```
  - `jsonPath` プロパティ宣言、初期化、UIフィールド登録を削除

### 2. BLidge.loadScene の BLidgeScene 型を元に戻す（前回の変更のリバート確認）
- **対象ファイル**: `packages/maxpower/BLidge/index.ts`
- **変更内容**: 前の修正で `frame` のガードを追加していたが、正しいデータが渡されるようになるので不要。ただし現時点で既にリバート済みなので、変更がないことを確認するのみ。

## 変更対象ファイル一覧
- [ ] `packages/orengine/BuiltinResources/Components/Utility/BLidgeClient/index.ts` - 静的 import に変更、jsonPath 削除

## 考慮事項・リスク
- `blidge-scene.json` がプロジェクトに存在しない場合、ビルドエラーになる（意図的：BLidge 連携を使わないプロジェクトはそもそも BLidgeClient を使わない）
- JSON がバンドルに含まれるため、ファイルが大きい場合はバンドルサイズに影響する（scene.glb は別途 fetch なので GLB は影響なし）

## テスト方針
- `npm run typecheck` で型エラーが無いことを確認
- `npm run dev` でエディタ起動時にクラッシュしないことを確認
