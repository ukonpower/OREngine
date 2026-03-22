# Plan: エンジンのスカイボックスにマテリアルが設定されない問題の修正

## 概要
scene.jsonで`sky/material: "SkyBox"`を設定したが、RendererSkyにマテリアルが適用されていない。コードフロー上は正しく動作するはずだが、実際には設定されていない。考えられる原因と対策を実装する。

## 原因分析

コードフロー上は、`engine.load()` → `renderer.deserialize()` → `sky.materialType = "SkyBox"` → `_rebuildMaterial()` → `Mesh.getMaterialInstance("SkyBox")` で正しく動作するはずだが、以下の可能性がある：

1. **サーバーキャッシュ**: devサーバーが古い scene.json（`sky/material: ""`）をキャッシュしている
2. **`_rebuildMaterial`の失敗黙殺**: `getMaterialInstance`が`undefined`を返した時、何もログを出さずにスキップしている
3. **RendererSkyの`_rebuildMaterial`と`Mesh._rebuildMaterial`は同じパターンだが、Meshは正常に動いているので、根本的なフロー問題ではない**

## 実装ステップ

### 1. devサーバーの再起動確認（手動）
- `npm run dev`を再起動してサーバーキャッシュをクリアし、scene.jsonを再読み込みさせる
- これで解決する場合、以降のステップは不要

### 2. `_rebuildMaterial`にデバッグログを追加
- **対象ファイル**: `packages/maxpower/Component/Renderer/index.ts`
- **変更内容**: `_rebuildMaterial`でマテリアルが見つからない場合にwarningを出す
- **コードスニペット**:
  ```typescript
  private _rebuildMaterial(): void {
      if ( ! this._materialType ) {
          this.mesh.material = this.material;
          return;
      }
      const instance = Mesh.getMaterialInstance( this._materialType );
      if ( instance ) {
          this.mesh.material = instance;
      } else if ( import.meta.env.DEV ) {
          console.warn( `[RendererSky] Material "${this._materialType}" not found` );
      }
  }
  ```
- **注意点**: `import.meta.env.DEV` で本番環境ではログを出さない

### 3. `materialType`セッターに再試行メカニズムを追加（必要な場合のみ）
もしステップ2のwarningが出る場合、マテリアルがまだ登録されていないタイミングで`_rebuildMaterial`が呼ばれている可能性がある。その場合、`resources`の`update`イベントを監視して再試行する方法を検討する。
- **対象ファイル**: `packages/maxpower/Component/Renderer/index.ts`
- **注意点**: Rendererはmaxpower（エンジン）側なので、`Engine.resources`には直接依存できない。`Mesh.getMaterialInstance`のstatic callbackに依存するのみ。

## 変更対象ファイル一覧
- [x] `packages/maxpower/Component/Renderer/index.ts` - `_rebuildMaterial`にデバッグログ追加

## 考慮事項・リスク
- devサーバー再起動で解決する場合、コード変更は最小限（デバッグログ追加のみ）で済む
- マテリアル登録タイミング問題の場合、Rendererレベルでの再試行が必要になる可能性がある

## テスト方針
- `npm run dev`を再起動し、ブラウザコンソールでwarningが出ないことを確認
- エディタのRendererパネルでsky materialが"SkyBox"になっていることを確認
- SkyBoxのプロシージャルシェーダーが描画されていることを目視確認
- `npm run typecheck` でエラーなし
