# Plan: マテリアルのテクスチャが反映されない問題の修正

## 概要

マテリアルにテクスチャを設定しても反映されない。根本原因は2つ:
1. `.tex`ファイルのfrag参照が消失している（`"shader": "Noise"` → `"frag": ""`に書き換えられた）
2. `updateTextureListForDir`ジェネレータが旧キー`shader`のみ読み、新キー`frag`を読めない

これにより`_textures` Mapが空のまま、`applyUniform`でテクスチャが無言で失敗する。

## 実装ステップ

### 1. `updateTextureListForDir`のキー対応修正

- **対象ファイル**: `plugins/ResourceManager/index.ts`
- **変更内容**: `tex.config.frag`（新形式）と`tex.config.shader`（旧形式）の両方に対応
- **コードスニペット**:
  ```typescript
  // L393-407を修正: shader キーを廃止し frag キーのみ読む
  const fragName = tex.config.frag || undefined;
  ```
- **注意点**: 旧`shader`キーは廃止。`.tex`ファイル側で`frag`キーに統一する

### 2. `.tex`ファイルのfrag参照を修正

- **対象ファイル**: `src/ts/Resources/Textures/*.tex`（4ファイル）
- **変更内容**: 各テクスチャの`frag`フィールドに正しいシェーダー参照名を設定
- **具体的な変更**:

  `hash.tex`:
  ```json
  {
    "frag": "Hash/frag",
    "resolution": [512, 512],
    "filter": "nearest",
    "updateEveryFrame": false
  }
  ```

  `noise.tex`:
  ```json
  {
    "frag": "Noise/frag",
    "resolution": [1024, 1024],
    "filter": "linear",
    "updateEveryFrame": true
  }
  ```

  `noiseCyclic.tex`:
  ```json
  {
    "frag": "NoiseCyclic/frag",
    "resolution": [1024, 1024],
    "filter": "linear",
    "updateEveryFrame": false
  }
  ```

  `noiseCyclicAnime.tex` (元々`"shader": "NoiseCyclic"`を参照していた):
  ```json
  {
    "frag": "NoiseCyclic/frag",
    "resolution": [512, 512],
    "filter": "linear",
    "updateEveryFrame": true
  }
  ```

### 3. 動作確認

- Vite再ビルドで`textureList.ts`が自動再生成されることを確認
- `npm run typecheck`で型エラーがないことを確認

## 変更対象ファイル一覧

- [x] `plugins/ResourceManager/index.ts` - `updateTextureListForDir`で旧`shader`キーを廃止し`frag`キーに変更
- [x] `src/ts/Resources/Textures/hash.tex` - frag: `"Hash/frag"` を設定
- [x] `src/ts/Resources/Textures/noise.tex` - frag: `"Noise/frag"` を設定
- [x] `src/ts/Resources/Textures/noiseCyclic.tex` - frag: `"NoiseCyclic/frag"` を設定
- [x] `src/ts/Resources/Textures/noiseCyclicAnime.tex` - frag: `"NoiseCyclic/frag"` を設定

## 考慮事項・リスク

1. **textureList.ts再生成**: `.tex`ファイル修正後、Viteのchokidarウォッチャーが検知して自動再生成される。開発サーバー非起動時は`npm run dev`で再生成される
2. **globalUniformsのuNoiseTex**: `src/ts/Resources/index.ts:191`の`Engine.resources.getTexture("noise")`も修正により正常に動くようになる（`_textures`にnoiseが入るため）
3. **今後の`.tex`保存**: エディタからTextureResourceを更新・保存すると`"frag": "Noise/frag"`形式で書き出されるため、ジェネレータ修正（Step 1）により正常に読める
4. **旧`shader`キー**: 廃止する。今後は`frag`キーに統一

## テスト方針

- `npm run typecheck`で型エラーなし
- `npm run dev`で以下を手動確認:
  - マテリアル（OREngineCube等）のテクスチャuniform（uNoiseTex）が3Dビューに反映される
  - エディタのマテリアルPropertyパネルでテクスチャドロップダウンからテクスチャを変更 → 反映される
  - ページリロード後もテクスチャが正常に表示される
