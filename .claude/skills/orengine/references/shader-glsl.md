# GLSL シェーダーガイド（WebGL バックエンド）

WebGPU のプロジェクトでは読まない（`shader-wgsl.md` を読む）。パスの書き方は SKILL.md の「最初に」を参照。

## 置き場所と読み込み

コンポーネントと同じディレクトリの `shaders/` に `.vs` / `.fs` で置き、TS から import して `MXP.Material` の `vert` / `frag` に渡す（`component-development.md`）。

```ts
import fragSrc from './shaders/main.fs';
import vertSrc from './shaders/main.vs';
```

実物: `demo-webgl/Resources/Components/Samples/*/*/shaders/`。`vert` / `frag` を省略すると `packages/maxpower/webgl/Material/shaders/basic.{vs,fs}` が使われる。

## メッシュ用の雛形

頂点シェーダー:

```glsl
#include <module:common>
#include <part:vert_h>

void main( void ) {

	#include <part:vert_in>

	// outPos / outNormal / outUv を書き換えて頂点を動かす

	#include <part:vert_out>

}
```

フラグメントシェーダー:

```glsl
#include <module:common>
#include <part:frag_h>

void main( void ) {

	#include <part:frag_in>

	// outColor / outRoughness / outMetallic / outEmission 等を書き換える

	#include <part:frag_out>

}
```

- `vert_h` / `frag_h` に行列・時間（`uTime` / `uTimeF` / `uTimeE` / `uTimeEF`）・`uResolution`・varying（`vUv` / `vNormal` / `vPos` 等）の宣言が入っている。自分で宣言し直さない
- 独自の varying は `out` / `in` で自分で宣言する（`demo-webgl` の `OREngineCube/shaders/main.vs` の `vNoise`）
- 同じシェーダーが `phase` のパスごとに `IS_DEFERRED` / `IS_FORWARD`（forward と envMap）/ `IS_DEPTH`（shadowMap）を define してコンパイルされる。`frag_out` がパスに合わせて書き分けるので、ふつうは意識しなくてよい

## 書き換える変数

`<part:vert_in>`（`packages/maxpower/webgl/backend/ShaderParser/shaderParts/vert_in.part.glsl`）:

| 変数 | 初期値 |
|---|---|
| `outPos` | `position`（ローカル座標） |
| `outNormal` | `normal` |
| `outUv` | `uv` |

`<part:frag_in>`（同 `frag_in.part.glsl`）:

| 変数 | 型 | 初期値 | 意味 |
|---|---|---|---|
| `outColor` | vec4 | `vec4(1.0)` | アルベド。forward ではこれがそのまま出力色 |
| `outNormal` | vec3 | `normalize(vNormal)` | ワールド法線 |
| `outNormalMap` | vec3 | `vec3(0.0)` | 接空間の法線。`USE_NORMAL_MAP` を define したときだけ使われる |
| `outRoughness` | float | `0.5` | |
| `outMetallic` | float | `0.0` | **`outMetallic`（l が2つ）** |
| `outEmission` | vec3 | `vec3(0.0)` | 発光 |
| `outSSN` | float | `0.0` | gBuffer の material.z に入る値 |
| `outEnv` | float | `1.0` | 環境マップの効き |
| `outSSS` | float | `0.0` | SSS（肌の表面下散乱）の強さ 0〜1。gBuffer の albedo.w に入る。レンダラーの `pipeline/sss/enabled` が true のときだけ効く（deferred のみ） |
| `outPos` | vec3 | `vPos` | ワールド位置。深度もここから計算される |

`<part:frag_out>` がこれらを gBuffer（deferred）・出力色（forward）・深度（shadowMap）へ書き出す。

## include

`#include <module:名前>` / `#include <part:名前>` は `packages/maxpower/webgl/backend/ShaderParser/` の `shaderModules/名前.module.glsl` / `shaderParts/名前.part.glsl` にビルド時に解決される。解決できない名前はビルドエラー。一覧はそのディレクトリを ls して確かめる。

よく使うもの:

| include | 中身 |
|---|---|
| `<module:common>` | `PI` / `TPI` / `HPI` / `saturate`・イージング・`hsv2rgb` などの定数と関数 |
| `<module:noise_value>` | `noiseValue( vec3 )` / `fbm( vec3 )` |
| `<module:noise_simplex>` / `<module:noise_cyclic>` | `noiseSimplex( vec3 / vec4 )` / `noiseCyc( vec3 )` |
| `<module:random>` | `random( vec2 )` / `hash( vec3 )` |
| `<module:rotate>` | `rotate( rad )`（mat2）/ `makeRotationDir` |
| `<module:sky>` | `skyPosition( vNormal )` — 空の模様用の仮想ワールド座標（向き × 500）。空の球はカメラに追従するので `outPos` でなくこれで模様を作る |
| `<module:sdf>` | `sdSphere` / `sdBox` 等の距離関数と `opAdd` 等 |
| `<part:rm_h>` / `<module:rm_normal>` | レイマーチ用の `SDFResult` 構造体 / 法線 `N( pos, delta )`（`SDFResult D( vec3 p )` を先に定義しておく） |
| `<part:rm_ray_obj>` / `<part:rm_ray_world>` | レイの始点・方向（`rayPos` / `rayDir`）。`rm_ray_obj` はメッシュ表面から、`rm_ray_world` はカメラ位置から。`rm_ray_world` は `uViewMatrixInverse` / `uProjectionMatrixInverse` を使うので自分で `uniform mat4` 宣言する（値はレンダラーが渡す） |
| `<part:rm_out_obj>` | レイマーチの結果（`rayPos` / `outNormal`）をワールドへ戻して `outPos` と深度に書く |

`light` / `pmrem` / `lighting_*` はレンダラー内部のシェーディング用で、コンポーネントのシェーダーでは通常使わない。

## 独自の uniform

GLSL で `uniform float uSpeed;` のように宣言し、同じ名前を Material の `uniforms` に渡す（`component-development.md` の「uniform」）。名前は `uXxx`（プレイヤービルドの mangle から守られるのはこの形だけ）。

## 生成テクスチャ（`.tex`）用の雛形

`.tex` の `frag` が指すシェーダーはメッシュ用ではなく、全画面に1回描くだけのもの。出力は自分で宣言する（`demo-webgl/Resources/Textures/shaders/noise.fs`）。

```glsl
#include <module:common>
#include <part:frag_h>

layout ( location = 0 ) out vec4 outColor;

void main( void ) {

	outColor = vec4( vUv, 0.0, 1.0 );

}
```

## minify の注意

GLSL は dev でも shader_minifier を通る（壊れたらすぐ分かるように、意図的）。

- ソースに `//[` `//]` を書かない（minifier の verbatim マーカーで、宣言側と名前が食い違って壊れる）
- 保存後に `npx tsx scripts/scene.ts errors` でコンパイルエラーを見る。minify 後のソースは `tmp/shader-minified/` にダンプされる
