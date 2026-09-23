# WGSL シェーダーガイド（WebGPU バックエンド）

WebGL のプロジェクトでは読まない（`shader-glsl.md` を読む）。パスの書き方は SKILL.md の「最初に」を参照。

実物: `demo-webgpu/Resources/Components/Samples/*/*/shaders/*.wgsl`、ORShorts の `project/Resources/Components/Objects/Skybox/shaders/skybox.wgsl`。

## 仕組み

1マテリアル = 1つの WGSL。Material の `wgsl` に渡した本体の**先頭に、宣言部をエンジンが自動で前置**して完成形を作る（`packages/maxpower/webgpu/backend/Bindings/index.ts` の `buildShaderSource`）。本体に書くのは entry point と自分の関数だけ。

```ts
import fragWgsl from './shaders/main.wgsl';

const material = new MXP.Material( {
	name: 'MyVisual',
	phase: [ 'shadowMap', 'deferred' ],
	wgsl: MXP.standardVertexWgsl + fragWgsl,
} );
```

- `MXP.standardVertexWgsl` は頂点を動かさない標準の `vsMain`（`packages/maxpower/webgpu/Material/shaders/standardVertex.wgsl`）。頂点を動かさないならこれを前に連結し、フラグメントだけ書く
- `wgsl` を省略すると `packages/maxpower/webgpu/Material/shaders/basic.wgsl`（既定マテリアル）で描かれる

## entry point と phase

`phase` に入れたパスごとに、決まった名前の関数が使われる。**入れた phase の entry point が無いとパイプラインの作成に失敗する**。

| phase | 使う entry point | 戻り値 |
|---|---|---|
| 共通 | `@vertex fn vsMain( input: VertexInput ) -> VertexOutput` | |
| `deferred` | `@fragment fn fsDeferred( input: VertexOutput ) -> GBufferOutput` | `packGBuffer( input, surface )` |
| `forward` / `envMap` | `@fragment fn fsForward( input: VertexOutput ) -> @location(0) vec4f` | 色（forward はアルファブレンドで重なる） |
| `shadowMap` | `vsMain` だけ（深度を書く） | |

- `fsForward` は上のシグネチャどおりに書く。エンジンがこの宣言を探して別名に書き換え、forward 用の entry point を生成するため（引数名は自由）
- レイマーチのように面と実体の深度がずれる形は、`fsDeferred` の戻り値を `GBufferDepthOutput`（`withDepth( g, depth )` で作る）にし、影用に `fsShadow` を定義して `@builtin(frag_depth)` を返す。詳しくは `Bindings/index.ts` の該当コメントと `Material/index.ts` の `hasShadowFragment`

## deferred の書き方（Surface）

`demo-webgpu/Resources/Components/Samples/Objects/OREngineLogo/shaders/main.wgsl`:

```wgsl
#include <module:noise>

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	let vNoise = noiseValue( vec3f( frame.uTimeE * 8.0 ) );

	let orPart = step( input.worldPosition.x, - 0.2 );
	let flash = ( 1.0 - smoothstep( 0.0, 0.3, vNoise ) ) * orPart;

	surface.albedo = vec3f( 1.0 );
	surface.emission = vec3f( ( 1.0 - flash * 0.7 ) * 3.0 );
	surface.roughness = 0.3;

	return packGBuffer( input, surface );

}
```

`defaultSurface( input )` で土台を作り、フィールドを書き換えて `packGBuffer` で返す。`Surface` の定義は `packages/maxpower/webgpu/backend/Bindings/shaders/gbuffer.wgsl`:

| フィールド | 型 | 初期値 |
|---|---|---|
| `albedo` | vec3f | `vec3f( 0.8 )` |
| `normal` | vec3f | `normalize( input.normal )`（ワールド法線） |
| `roughness` | f32 | `0.5` |
| `metallic` | f32 | `0.0` |
| `emission` | vec3f | `vec3f( 0.0 )` |
| `envIntensity` | f32 | `1.0` |

## 前置される名前

本体から使える名前。定義は `Bindings/index.ts`（`FRAME_FIELDS` / `OBJECT_FIELDS`）と `Bindings/shaders/vertexOutput.wgsl`。

| 名前 | 中身 |
|---|---|
| `VertexInput` | 頂点属性。`position` / `normal` / `uv` の3つだけで、独自の属性は足せない（`backend/GeometryBuffer` の `ATTRIBUTES`） |
| `VertexOutput` | `position`（clip）/ `normal`（ワールド）/ `uv` / `worldPosition` / `velocity` |
| `frame.<名前>` | `uTime`（タイムラインの秒）/ `uTimeE`（エンジン起動からの秒）/ `uTimeF` / `uTimeEF` / `uDeltaTime` / `uResolution` / `uAspectRatio` / `uCameraPosition` / `uCameraNear` / `uCameraFar` / カメラの行列 |
| `object.<名前>` | `uModelMatrix` / `uNormalMatrix` / `uModelMatrixPrev` |
| `material.<名前>` | Material の `uniforms` に渡したもの（`component-development.md` の「uniform」） |
| `defaultSurface` / `packGBuffer` / `GBufferOutput` | deferred 用 |
| `sampleEnvMap( dir, roughness )` / `refractionTexture` | forward 系（`fsForward`）専用。`fsDeferred` から参照するとパイプライン作成に失敗する |

`frame` / `object` / `material` は GLSL と違い構造体のメンバーなので、`uTime` ではなく `frame.uTime` と書く。

外から名前を与えるシェーダーは、冒頭コメントに前置される名前を書いておく（demo の慣習）:

```wgsl
// 前置される宣言: VertexOutput / frame（Bindings）
```

## 頂点を動かす（独自の vsMain）

`standardVertexWgsl` を連結せず、自分で `vsMain` を書く。`VertexOutput` のメンバーをすべて埋める。`velocity`（モーションブラー用の画面上の移動量）は前フレームの行列（`object.uModelMatrixPrev` / `frame.uViewMatrixPrev` / `frame.uProjectionMatrixPrev`）で同じ頂点を射影して出すか、`vec2f( 0.0 )` にする。書き方は `standardVertex.wgsl` と `demo-webgpu` の `Samples/Particles/YakiSoba/shaders/yakiSoba.wgsl`（`@builtin(instance_index)` でインスタンスごとに位置を変える例）を読む。

## include

同じファイルは1回だけ展開される。

- `#include "./相対パス.wgsl"` — 近くのファイルへの分割
- `#include <module:名前>` — `<projectDir>/Resources/shaders/名前.wgsl`。ファイルを置くだけで使える（登録は不要）。見つからなければビルドエラー

**エンジン側に WGSL のビルトインモジュールは無い**（GLSL の `<module:noise_value>` 等に当たるものは無い）。ノイズ等はプロジェクトの `Resources/shaders/` に自分で置く（`demo-webgpu/Resources/shaders/noise.wgsl` に `noiseValue` / `noiseFbm` / `rotate2d` がある）。

## HMR

`.wgsl` を import したコンポーネントで `import.meta.hot.accept` し、`material.wgsl` を差し替えて `MXP.requestShaderReload()` を呼ぶ（`component-development.md` の「シェーダーの HMR」）。`standardVertexWgsl` を連結しているなら、差し替え時も同じく連結する。

## 確認

- WGSL のコンパイルエラー・パイプライン作成の失敗は `npx tsx scripts/scene.ts errors` の **`gpu`** に出る（`shader` は GLSL 用）
- WGSL は minify されない（shader_minifier は GLSL 専用）
