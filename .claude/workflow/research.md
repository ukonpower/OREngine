# Research: マテリアルのテクスチャが反映されない問題

## タスク概要
マテリアルにテクスチャを設定しても描画に反映されない。

## 根本原因

2段階の問題が重なっている:

### 原因1: `.tex`ファイルのfrag参照が消失

- **元の`.tex`形式**: `{ "shader": "Noise" }` （コミット93a0dc9で作成）
- **現在の`.tex`形式**: `{ "frag": "" }` （コミット915df35で上書き）

コミット915df35の`updateTexture`サーバーアクションで、TextureResourceのシリアライズ結果が`.tex`ファイルに書き戻された。TextureResourceは`frag`フィールド（旧形式の`shader`とは異なるキー）で管理しており、旧形式の`shader`キーを読めなかったため`_frag = ""`で初期化された。結果、全`.tex`ファイルの`frag`が空になった。

### 原因2: `updateTextureListForDir`ジェネレータのキー不一致

`plugins/ResourceManager/index.ts:394` で `tex.config.shader` を読んでいるが、新しい`.tex`形式は `"frag"` キーを使用。ジェネレータが`frag`を認識できず、生成される`textureList.ts`で全テクスチャの`frag: undefined`になる。

### 結果のフロー

```
.tex("frag":"") → updateTextureListForDir(reads "shader" key → not found)
  → textureList.ts(frag: undefined) → addTextureResource(_frag="")
  → _buildTexture(fragSource=undefined → return null)
  → _textures Map is EMPTY → applyUniform silently fails
```

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `plugins/ResourceManager/index.ts` | `updateTextureListForDir` | `.tex` → `textureList.ts`ジェネレータ。`tex.config.shader`を読む（L394） |
| `src/ts/Resources/_data/textureList.ts` | `TEXTURELIST` | 自動生成。現在全テクスチャの`frag: undefined` |
| `src/ts/Resources/Textures/*.tex` | - | テクスチャ設定ファイル。現在`"frag": ""`（本来は`"Noise/frag"`等） |
| `packages/orengine/ts/Engine/Resources/index.ts` | `Resources._buildTexture`, `applyUniform` callback | テクスチャビルド＆uniform適用。`_textures`マップ管理 |
| `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` | `MaterialResource._rebuildUniformFields` | uniform UIフィールド生成・applyUniform呼び出し |
| `packages/orengine/ts/Engine/Resources/TextureResource/index.ts` | `TextureResource` | テクスチャリソース。`frag`フィールドでシェーダー参照 |
| `src/ts/Resources/index.ts` | `initResouces`, `initResourceInstances` | 初期化フロー |
| `server/routes/editor.ts` | `updateTexture` handler | `.tex`ファイル書き出し |

## 依存関係

- `.tex`ファイル → `updateTextureListForDir`（ビルド時） → `textureList.ts` → `initResouces` → `addTextureResource` → `TextureResource`
- `TextureResource._frag` → `_bindShaderResource` → `ShaderResource` → `fragSource`
- `Resources._buildTexture` → `fragSource` → `TexProcedural` → `_textures` Map
- `_textures` Map → `applyUniform` callback → `material.uniforms[name]` → Renderer

## テクスチャとシェーダーの対応表

| テクスチャ | .texファイル | 対応シェーダー | シェーダー存在 |
|-----------|-------------|--------------|-------------|
| hash | `Textures/hash.tex` | `Hash/frag` (`Shaders/Hash/index.fs`) | ✓ |
| noise | `Textures/noise.tex` | `Noise/frag` (`Shaders/Noise/index.fs`) | ✓ |
| noiseCyclic | `Textures/noiseCyclic.tex` | `NoiseCyclic/frag` (`Shaders/NoiseCyclic/index.fs`) | ✓ |
| noiseCyclicAnime | `Textures/noiseCyclicAnime.tex` | 要確認 | ? |

## 修正が必要な箇所

### 1. `updateTextureListForDir`のキー対応修正
**ファイル**: `plugins/ResourceManager/index.ts:394`
- `tex.config.frag`も読むように修正
- 新形式: `"frag": "Noise/frag"` → そのまま使用
- 旧形式: `"shader": "Noise"` → `"Noise/frag"`に変換（後方互換）

### 2. `.tex`ファイルの修正
全`.tex`ファイルの`frag`を正しいシェーダー名に設定:
- `hash.tex`: `"frag": "Hash/frag"`
- `noise.tex`: `"frag": "Noise/frag"`
- `noiseCyclic.tex`: `"frag": "NoiseCyclic/frag"`
- `noiseCyclicAnime.tex`: 要確認（専用シェーダーがあるか）

### 3. noiseCyclicAnimeの確認
専用のシェーダーディレクトリが存在するか、NoiseCyclicを共用するか確認が必要。

## 制約・注意点

- `initResourceInstances`の`setGlobalUniforms`で`uNoiseTex`がハードコードされているが、これも`_textures.get("noise")`が`undefined`を返すため壊れている（テクスチャビルド問題を修正すれば自動解消）
- `.tex`ファイルを修正後、Viteの再ビルドで`textureList.ts`が自動再生成される
- `_reapplyTextureUniforms`は`buildTextureInstances`後に呼ばれるため、テクスチャが正しくビルドされれば初期化時のuniform適用は動く

## 参考になる既存実装

- `updateMaterialListForDir`（同ファイル内L196-275）: `.mat`ファイルから`shader`キーを読み`vert`/`frag`に変換する類似パターン
