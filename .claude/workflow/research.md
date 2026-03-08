# Research: SelectionOutline アウトライン表示不具合の修正

## タスク概要
コミット `9067111` でエディタ描画を uiBuffer に統一した際、SelectionOutline が uiBuffer に対して同一パスで読み書きする状態になり、アウトラインが正しく表示されなくなった。

## 原因分析

### コミット前の動作（正常）
- `outlinePass.renderTarget = null` → デフォルトFBに直接書き込み
- `renderPostProcess` の `input` = `uiBuffer` → `uBackBuffer0` として uiBuffer のテクスチャを読み込み
- **読み込み元（uiBuffer）と書き込み先（デフォルトFB）が別** → 正常動作

### コミット後の動作（バグ）
- `outlinePass.setRendertarget( uiBuffer )` → uiBuffer に書き込み
- `renderPostProcess` の `input` = `uiBuffer` → `uBackBuffer0` として uiBuffer のテクスチャを読み込み
- **読み込み元と書き込み先が同じ uiBuffer** → WebGL undefined behavior

### renderPostProcess の仕組み（Renderer L867-975）
- `input` パラメータの `.textures` が最初のパスの `backbuffers` になる
- 各パスで `backbuffers` が `uBackBuffer0`, `uBackBuffer1`, ... としてuniformに設定される
- パスの `renderTarget` が書き込み先になる

### outline シェーダーの動作
```glsl
vec4 scene = texture( uBackBuffer0, vUv );  // uiBufferから既存シーンを読み込み
// ... エッジ検出 ...
outColor = mix( scene, vec4( uOutlineColor, 1.0 ), edge );  // uiBufferに書き込み ← 同じバッファ！
```

## 関連ファイル・シンボル
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| packages/orengine/ts/Editor/SelectionOutline/index.ts | SelectionOutline | アウトライン描画 |
| packages/orengine/ts/Editor/index.ts | Editor.render() L370~ | エディタ描画統括、uiBuffer→デフォルトFBへのblit |
| packages/maxpower/Component/Renderer/index.ts | Renderer.renderPostProcess() L867-975 | PostProcess描画 |
| packages/maxpower/PostProcess/PostProcessPass/index.ts | PostProcessPass | パス管理 |
| packages/orengine/ts/Editor/shaders/outline.fs | - | outlineシェーダー |

## 修正方針

**最もシンプルな修正**: outlinePass の出力先を一旦 PostProcessPass の内部バッファに書き、2パス目で uiBuffer に書き込む。
または、outlinePass 用に専用の中間バッファを用意し、読み書きを分離する。

具体的には、`_outlinePostProcess` を2パス構成にする:
1. パス1: uiBuffer(input) → 内部バッファ（outlinePass: エッジ検出＋合成）
2. パス2: 内部バッファ → uiBuffer（単純コピー）

もしくは最もシンプルに: outlinePass の `renderTarget` を設定せず（内部バッファ利用）、別の blitパスで uiBuffer に書き込む。

## 制約・注意点
- uiBuffer への最終出力は必須（Editor.render() で uiBuffer → デフォルトFB に blit するため）
- outline シェーダーはシーンカラー（uBackBuffer0）とマスク（uMaskTexture）を合成する
- 他のエディタ描画（Helper, Wireframe, Gizmo）も uiBuffer に描画済み → outlineはそれらの上に重なる必要あり
