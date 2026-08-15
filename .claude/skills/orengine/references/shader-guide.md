# シェーダー記述ガイド

## ファイル配置

シェーダーは使用するコンポーネントと同じディレクトリに置き、TS から `import` する。**マテリアル / シェーダーを作る独立 API は存在しない**。編集はすべて Read/Write/Edit ツールによるファイル直接編集。

```
projects/{PROJECT}/Resources/Components/{Group}/{Name}/
├── index.ts   # import frag from './index.fs'
├── index.vs
└── index.fs
```

```ts
import frag from './index.fs';
import vert from './index.vs';

const material = new MXP.Material( { vert, frag, /* ... */ } );
```

## メッシュ用シェーダーテンプレート

### 頂点シェーダー（index.vs）

```glsl
#include <module:common>
#include <part:vert_h>

void main( void ) {

	#include <part:vert_in>

	// ここでカスタム処理（頂点変形など）

	#include <part:vert_out>

}
```

### フラグメントシェーダー（index.fs）

```glsl
#include <module:common>
#include <part:frag_h>

void main( void ) {

	#include <part:frag_in>

	// outColor に色を設定
	outColor = vec4( 1.0 );

	#include <part:frag_out>

}
```

## テクスチャ用シェーダーテンプレート

```glsl
#include <module:common>
#include <part:frag_h>

layout ( location = 0 ) out vec4 outColor;

void main( void ) {

	outColor = vec4( vUv, 0.0, 1.0 );

}
```

## インクルードシステム

`#include <module:名前>` / `#include <part:名前>` でビルトインのGLSLモジュール / パーツを利用可能。実体は `packages/maxpower/webgl/ShaderParser` の `shaderModules/名前.module.glsl` / `shaderParts/名前.part.glsl` で、ビルド時に動的解決される（ファイルを置くだけで登録不要。解決できないとビルドエラー）。

### モジュール

| インクルード | 説明 |
|------------|------|
| `<module:common>` | グローバル定数、構造体、ヘルパー関数、float ↔ RGBA 変換 |
| `<module:random>` | 乱数・ハッシュ関数 |
| `<module:noise_value>` | Value ノイズ |
| `<module:noise_simplex>` | Simplex ノイズ |
| `<module:noise_cyclic>` | Cyclic ノイズ |
| `<module:sdf>` | SDF 関数（Ray Marching用） |
| `<module:rotate>` | 回転行列 |
| `<module:light>` | ライティング計算 |
| `<module:pmrem>` | PMREM 関数 |

### パーツ（メッシュシェーダー用）

| インクルード | 説明 |
|------------|------|
| `<part:vert_h>` | Vertex shader の in/out 宣言 |
| `<part:vert_in>` | Vertex shader の入力準備 |
| `<part:vert_out>` | Vertex shader の出力設定 |
| `<part:frag_h>` | Fragment shader の in/out 宣言 |
| `<part:frag_in>` | Fragment shader の入力準備 |
| `<part:frag_out>` | Fragment shader の出力書き込み（GBuffer へ） |
| `<part:uni_time>` | 時間ユニフォーム宣言 |

### Ray Marching用パーツ

| インクルード | 説明 |
|------------|------|
| `<part:rm_h>` | Ray Marching ヘッダー |
| `<module:rm_normal>` | 法線計算 |
| `<part:rm_ray_obj>` | オブジェクト空間レイ |
| `<part:rm_out_obj>` | オブジェクト空間出力 |

## GBuffer出力（frag_out）

`<part:frag_out>` が書き込む出力:

```
outColor0 = vec4( outPos, outEmission.x );          // 位置 + emission.x
outColor1 = vec4( normalize(outNormal), emission.y ); // 法線 + emission.y
outColor2 = vec4( outColor.xyz, 0.0 );              // アルベド
outColor3 = vec4( roughness, metallic, ssn, env );   // PBR パラメータ
outColor4 = vec4( velocity, 0.0, emission.z );       // velocity + emission.z
```

### `<part:vert_in>` で展開される書き込み可能変数（頂点シェーダー）

| 変数 | 型 | 説明 |
|------|----|------|
| `outPos` | vec3 | 頂点位置（変形に使う） |
| `outNormal` | vec3 | 法線 |
| `outUv` | vec2 | UV座標 |

### `<part:frag_in>` で展開される書き込み可能変数（フラグメントシェーダー）

| 変数 | 型 | デフォルト | 説明 |
|------|-----|----------|------|
| `outColor` | vec4 | `vec4(1.0)` | アルベドカラー |
| `outRoughness` | float | `0.5` | ラフネス |
| `outMetalic` | float | `0.0` | メタリック ⚠️ スペル注意（`l` が1つ） |
| `outEmission` | vec3 | `vec3(0.0)` | エミッション |
| `outNormal` | vec3 | 頂点法線 | 法線（上書き可） |
| `outPos` | vec3 | `vPos` | フラグメント位置（読み取り用） |

## ユニフォーム

シェーダー内で `uniform` 宣言すると自動的にエディタUIに表示される。

```glsl
uniform float uSpeed;           // float スライダー
uniform vec3 uColor;            // vec3 入力
uniform sampler2D uNoiseTex;    // テクスチャ参照
```

自動抽出対象の型: `float`, `vec2`, `vec3`, `vec4`, `int`, `sampler2D`

## デフォルトシェーダー

`MXP.Material` のコンストラクタに `vert` / `frag` を渡さない場合、`packages/maxpower/Material/shaders/basic.{vs,fs}` が使用される。試作中に GLSL を書きたくないときはこれで十分。
