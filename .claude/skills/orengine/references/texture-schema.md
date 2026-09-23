# 生成テクスチャ（`.tex`）

シェーダーで描いて作るテクスチャ（ノイズ等）を JSON で定義する。ファイルを直接編集して作る。パスの書き方は SKILL.md の「最初に」を参照。

実物: `demo-webgl/Resources/Textures/`（`noise.tex` / `hash.tex` 等）。WebGPU の demo には `.tex` の実例が無い。

## 配置

```
<projectDir>/Resources/Textures/
├── noise.tex
└── shaders/
    └── noise.fs
```

- テクスチャ名はファイル名（`noise.tex` → `noise`）
- 先頭が `_` のファイル・ディレクトリは対象外
- 読み込みは `host/vite/plugins/TexLoader`（`frag` をビルド時に import へ変換する）と `host/app/Resources/registryCommon.ts`

## 書式

```jsonc
{
	"frag": "./shaders/noise.fs",   // .tex からの相対パス
	"resolution": [ 1024, 1024 ],   // 省略時 [1024, 1024]
	"filter": "linear",             // "linear"（省略時）| "nearest"
	"updateEveryFrame": true,       // true なら毎フレーム描き直す
	"textures": {                   // 他の .tex を読む（省略可）
		"uSrc": "noise"             // シェーダー上の名前 : テクスチャ名
	}
}
```

- `textures` の参照先は先に作られる。循環していると作られずに飛ばされる
- シェーダー上の名前は `uXxx`（プレイヤービルドの mangle から守られるのはこの形だけ）

## シェーダー

- WebGL: GLSL。雛形は `shader-glsl.md` の「生成テクスチャ用の雛形」。`textures` で渡したものは `uniform sampler2D uSrc;` で読む
- WebGPU: `frag` は WGSL を指す。全画面パスとして `@fragment fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f` を書く（`input.uv` が使える）。`frame` と、`textures` で渡した名前の `texture_2d<f32>`・サンプラー `ppSampler` が前置される（`packages/maxpower/webgpu/PostProcess/index.ts` の `shaderSource`、頂点側は `PostProcess/shaders/fullscreen.wgsl`）。demo に実例が無いので、書くときはこの2ファイルと `Renderer/PipelinePostProcess/shaders/*.wgsl` を読んでから書く

## コンポーネントから使う

`Engine.resources.getTexture( '<名前>' )` で取る（`import { Engine } from 'orengine'`）。

WebGL（`demo-webgl` の `OREngineCube`）:

```ts
uniforms: MXP.UniformsUtils.merge( engine.uniforms, {
	uNoiseTex: { value: Engine.resources.getTexture( "noise" ), type: "1i" }
} )
```

WebGPU: Material の `textures` に渡すと、WGSL に `<名前>: texture_2d<f32>` と `<名前>Sampler: sampler` が生える（`packages/maxpower/webgpu/Material/index.ts` の `MaterialParam.textures`）。テクスチャの実体ができるまでそのマテリアルは描かれない。
