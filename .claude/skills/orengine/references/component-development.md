# コンポーネント開発ガイド

パスの書き方とバックエンドの判定は SKILL.md の「最初に」を参照。サンプルは WebGL / WebGPU を並べているので、該当するほうだけ読む。

実物の手本:
- WebGL: `demo-webgl/Resources/Components/`
- WebGPU: `demo-webgpu/Resources/Components/`（ORShorts なら `project/Resources/Components/` も）

## 配置と登録

```
<projectDir>/Resources/Components/<グループ>/<名前>/
├── index.ts          # export class <名前> extends MXP.Component
└── shaders/          # （任意）WebGL: *.vs / *.fs、WebGPU: *.wgsl
```

- `import.meta.glob`（`host/app/Resources/registry.ts`）が拾って登録する。手動登録は不要
- 登録名は export したクラス名。グループはディレクトリ階層から決まる（エディタのメニュー上の分類だけで、登録名には入らない）
- 先頭が `_` のディレクトリは対象外
- ファイルを追加・編集すると dev サーバーがタブをリロードする。未保存の CLI 操作は消えるので、コンポーネントを作ってからシーンを組む

## 見た目の作り方は2つ

### 判断基準

| 状況 | 使う形 |
|---|---|
| 形をコードで作る（プリミティブ・パーティクル・インスタンシング・独自の頂点） | **自分で Mesh を足す** |
| 形は Blender で作り、BLidge（`BLidgeClient`）で読み込んでいる。見た目（マテリアル・シェーダー）だけ変えたい | **BLidge の Mesh に差し込む** |

BLidge のエンティティで「自分で Mesh を足す」をやると、BLidge が作った Mesh（Blender の形）が置き換わって消える（`Entity.addComponent` は同じクラスのコンポーネントを付け直すと古いほうを捨てる）。逆に、Mesh の無いエンティティで「差し込む」形を使うと何も描かれない。

### A. 自分で Mesh を足す

コンストラクタで Geometry と Material を作り、`addComponent( MXP.Mesh, { geometry, material } )` する。外すときに Mesh が残らないよう dispose で取り除く。

WebGL（`demo-webgl/Resources/Components/Samples/Particles/Dust` と同じ形）:

```ts
import * as MXP from 'maxpower';

import frag from './shaders/myVisual.fs';
import vert from './shaders/myVisual.vs';

export class MyVisual extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.SphereGeometry( { radius: 0.5 } );

		const material = new MXP.Material( {
			name: 'MyVisual',
			phase: [ 'shadowMap', 'deferred' ],
			vert: MXP.hotGet( 'MyVisualVert', vert ),
			frag: MXP.hotGet( 'MyVisualFrag', frag ),
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
```

WebGPU（ORShorts の `project/Resources/Components/Objects/Skybox`）:

```ts
import * as MXP from 'maxpower/webgpu';

import skyboxWgsl from './shaders/skybox.wgsl';

// シーン全体を囲む大きな立方体で背景を黒く塗る
export class Skybox extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.CubeGeometry( {
			width: 200,
			height: 200,
			depth: 200,
		} );

		const material = new MXP.Material( {
			name: 'Skybox',
			phase: [ 'forward' ],
			depthTest: true,
			depthWrite: false,
			cullFace: false,
			wgsl: MXP.standardVertexWgsl + skyboxWgsl,
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/skybox.wgsl', ( m ) => {

				if ( m ) material.wgsl = MXP.standardVertexWgsl + m.default;

				MXP.requestShaderReload();

			} );

		}

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
```

Geometry はビルトインの `MXP.CubeGeometry` / `SphereGeometry` / `PlaneGeometry` / `CylinderGeometry` か、`new MXP.Geometry()` に `setAttribute( 'position', Float32Array, 3 )` 等で頂点を入れて作る。

### B. BLidge の Mesh に差し込む

`demo-webgl` / `demo-webgpu` の `Samples/Objects/OREngineCube` が実例。

WebGL:

```ts
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import fragSrc from './shaders/main.fs';
import vertSrc from './shaders/main.vs';

export class OREngineCube extends MXP.Component {

	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.material = new MXP.Material( {
			name: "OREngineCube",
			phase: [ "shadowMap", "deferred" ],
			vert: MXP.hotGet( "OREngineCubeVert", vertSrc ),
			frag: MXP.hotGet( "OREngineCubeFrag", fragSrc ),
			uniforms: {
				uNoiseTex: { value: Engine.resources.getTexture( "noise" ), type: "1i" }
			}
		} );

		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			mesh.material = this.material;

		}

		// HMR（import.meta.hot.accept）は「シェーダーの HMR」を参照

	}

}
```

WebGPU:

```ts
import * as MXP from 'maxpower/webgpu';

import fragWgsl from './shaders/main.wgsl';

// BLidgerが作ったキューブのメッシュへ独自マテリアルを差し込む
export class OREngineCube extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			const material = new MXP.Material( {
				name: "OREngineCube",
				phase: [ "shadowMap", "deferred" ],
				wgsl: MXP.standardVertexWgsl + fragWgsl,
			} );

			mesh.material = material;

			if ( import.meta.hot ) {

				import.meta.hot.accept( './shaders/main.wgsl', ( m ) => {

					if ( m ) material.wgsl = MXP.standardVertexWgsl + m.default;

					MXP.requestShaderReload();

				} );

			}

		}

	}

}
```

知っておくこと:
- 付け方: BLidge のエンティティに `add-component` する（CLI・GUI とも可）。保存先は root の `BLidgeClient` の `attachments` で、**エンティティ名**で紐づく（`demo-webgl/scenes/main.json` を参照）。Blender 側で名前を変えると外れる
- `BLidgeClient` は同期（読み込み・Blender からの更新）のたびに、attachments のコンポーネントを付け直してコンストラクタを再実行する。BLidge 側の Mesh はその前に作られているので、コンストラクタで `getComponent( MXP.Mesh )` すれば取れる（glTF の Mesh も読み込みを待ってから付け直される）
- Mesh は BLidge のものなので dispose で `removeComponent( MXP.Mesh )` しない
- Blender 側のオブジェクトの種類（cube / sphere / plane / mesh / gltf 等）で Mesh が作られるかが決まる。Empty やカメラには Mesh が無い（`get <entity>` の components に `Mesh` があるかで分かる）
- 背景の空はエンティティではなくレンダラーが持つ。`engine.renderer.sky.mesh.material` に同じ要領で差し込む（両 demo の `Samples/Environment/SkyBox`）

## Material の主なオプション

型の定義: WebGL は `packages/maxpower/webgl/Material/index.ts`、WebGPU は `packages/maxpower/webgpu/Material/index.ts` の `MaterialParam`。

| オプション | 意味 |
|---|---|
| `phase` | 描かれるパス。既定は `[ 'shadowMap', 'deferred' ]`。不透明でライティングを受ける → `deferred`、影を落とす → `shadowMap` を足す、半透明・加算・パーティクル → `forward`、環境マップ（映り込み）に出す → `envMap` |
| `vert` / `frag`（WebGL） | GLSL ソース。省略すると basic シェーダー |
| `wgsl`（WebGPU） | 頂点・フラグメントの entry point をまとめた WGSL。省略すると basic。書き方は `shader-wgsl.md` |
| `uniforms` | 独自の uniform（後述） |
| `depthTest` / `depthWrite` / `cullFace` | 既定は `true` / `true` / `false` |
| `drawType` | `'TRIANGLES'`（既定）/ `'LINES'`、WebGL は `'POINTS'` も |
| `blending`（WebGL） | `'NORMAL'`（既定）/ `'ADD'` / `'DIFF'` |
| `storages` / `textures`（WebGPU） | GPUCompute の出力 / テクスチャを WGSL に束縛する |

インスタンシング: WebGL は `geometry.setAttribute( 'oPos', array, 4, { instanceDivisor: 1 } )` のようにインスタンス属性を足す（`Samples/Effects/FlashLine`）。WebGPU は頂点属性が `position` / `normal` / `uv` に固定でインスタンス属性を足せないので、`addComponent( MXP.Mesh, { geometry, material, instanceCount: N } )` にして、WGSL で `@builtin(instance_index)` からインスタンスごとの値を作るか `storages`（GPUCompute の出力）から読む（`demo-webgpu` の `Samples/Particles/YakiSoba`）。

## uniform

WebGL: GLSL の `uniform` 名と同じキーで渡す。値は `uniforms.uXxx.value` を書き換えれば毎フレーム反映される。

```ts
uniforms: {
	uColor: { value: new MTP.Vector( 1, 0, 0 ), type: '3fv' },
	uNoiseTex: { value: Engine.resources.getTexture( 'noise' ), type: '1i' },
},
```

- 独自の uniform が無ければ `uniforms` は省略してよい（Material が空で持つ）。エンジン共通の uniform を merge する必要は無い
- 時間（`uTime` 等）・行列・解像度はレンダラーが渡すので uniforms に入れなくてよい。シェーダー側の宣言は `<part:vert_h>` / `<part:frag_h>` に入っている
- プレイヤービルドではプロパティ名が短く書き換えられる（terser の mangle）。`u` + 大文字で始まる名前だけが保護されるので、uniform 名は必ず `uXxx` にする

WebGPU: `uniforms` に書いたキーが WGSL の `material.<キー>` になる。

```ts
uniforms: {
	uColor: { value: new MTP.Vector( 1, 0, 0 ), type: '3fv' },
},
```

- 使える型は `1f` / `2f` / `3f` / `4f`（と `fv` 付き）/ `1i` / `Matrix3fv` / `Matrix4fv`（`packages/maxpower/webgpu/backend/UniformBinder` の `TYPE_TO_WGSL`）。テクスチャは uniforms ではなく `textures` に渡す
- uniform の並びは Material を作った時点で決まる。後からキーを足しても WGSL に出ない。値は `material.uniforms.uColor.value` を書き換えれば反映される
- 時間・カメラは `frame.uTime` 等で読めるので uniforms に入れない（`shader-wgsl.md`）

## シェーダーの HMR

シェーダーファイルを保存したときにリロードせず差し替えるための記述。書かなくても動くが、書かないとシェーダーの変更がタブのフルリロードになる。

WebGL: `hotGet` で読み、`accept` の中で `hotUpdate` → `requestUpdate()`。

```ts
this.material = new MXP.Material( {
	vert: MXP.hotGet( "OREngineCubeVert", vertSrc ),
	frag: MXP.hotGet( "OREngineCubeFrag", fragSrc ),
	// ...
} );

if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/main.fs', ( module ) => {

		if ( module ) {

			this.material.frag = MXP.hotUpdate( "OREngineCubeFrag", module.default );
			this.material.requestUpdate();

		}

	} );

}
```

- `hotGet` / `hotUpdate` はキーごとに最新のソースを覚えておく仕組み。コンポーネントが作り直されたとき（BLidge の再同期など）に古いソースへ戻らないようにする。キーはプロジェクト全体で重ならない名前にする

WebGPU: `material.wgsl` を差し替えて `MXP.requestShaderReload()` を呼ぶ（上の Skybox / OREngineCube）。`standardVertexWgsl` を前に連結しているなら差し替え時も連結する。

## ライフサイクル

`protected xxxImpl( event )` を override する。どれもコンポーネントが `enabled` のときだけ呼ばれる。1フレームの順番（`packages/orengine/core/Engine/index.ts` の `step()`）:

| 順 | メソッド | 呼ばれる時点 | 使いどころ |
|---|---|---|---|
| 1 | `commitFrameImpl` | フレームの冒頭。前フレームの描画が終わったあと | 前フレームの値を「前回値」として確定させる（Camera が前フレームの行列を保存している） |
| 2 | `updateImpl` | シーンツリーを親から順に。各エンティティで自分のコンポーネント → 自分の行列更新 → 子 | transform の更新・uniform の更新・データ取得。**ふつうはこれだけで足りる** |
| 3 | `postUpdateImpl` | 全エンティティの update のあと、行列を再計算する前 | 他のエンティティの update 結果に依存して transform を決める（LookAt が注視先の位置を読む） |
| 4 | `prepareRenderImpl` | 全エンティティの行列（`matrixWorld`）が確定したあと、描画の直前 | 確定したワールド座標を使う計算・描画用の値の最終調整（Camera のビュー行列、ShakeViewer の揺れ） |

同じエンティティ内のコンポーネントは `order`（小さい順）で呼ばれる。

`event`（`MXP.ComponentUpdateEvent`）の中身は `packages/maxpower/core/Entity/index.ts` の `EntityUpdateEvent`。よく使うのは `timeDelta`（前フレームからの秒）、`timeCode`（タイムラインの時刻・秒。再生中だけ進む）、`timeElapsed`（エンジン起動からの秒。停止中も進む）、`timeCodeFrame`、`playing`、`resolution`、`renderer`。

## エディタに出すパラメータ（field）

`field()` で登録したものだけがエディタ・CLI の `set`・シーン JSON の `props` から読み書きできる。登録していない public プロパティは JSON に書いても無視される。

```ts
this.field( "radius", () => this.radius, v => this.radius = v as number );

const dir = this.fieldDir( "focus" );   // path は "focus/mode" のようになる
dir.field( "mode", () => this._focusMode, v => this._focusMode = v, {
	format: { type: 'select', list: [ 'auto', 'target', 'manual' ] }
} );
```

- `format` の種類は `packages/maxpower/core/Serializable/index.ts`（`vector` / `color` / `select` / `entity` など）
- 全コンポーネント共通で `enabled` / `tag` が登録済み（`tag` は読み取り専用）
- **entity 参照（`format: { type: 'entity' }`）は uuid で持ち、コンストラクタで解決しない**。シーンを読み込む時点ではまだ自分がツリーに繋がっていないので、`updateImpl` で `this.entity.getRootEntity().findEntityByUUID( uuid )` する（`packages/orengine/builtin/Components/Camera/LookAt` の `updateImpl`）

## コンストラクタ引数

コードから `addComponent( MyComp, { num: 100 } )` で渡す値。エディタ・CLI からは引数なしで作られるので `| void` を付けて省略に備える（`Samples/Particles/Dust`）。

```ts
constructor( params: MXP.ComponentParams<{ num?: number } | void> ) {

	super( params );

	const count = params.args?.num || 2048;

}
```

## dispose

| 何をしたか | dispose でやること |
|---|---|
| `addComponent( MXP.Mesh, ... )` した | `super.dispose(); this.entity.removeComponent( MXP.Mesh );` |
| GPUCompute 等、自前で GPU 資源を作った | その `dispose()` も呼ぶ（YakiSoba） |
| イベント購読・タイマー | `this.once( 'dispose', () => { ... } )` で解除する |
| BLidge の Mesh に差し込んだだけ | 不要 |

## エンティティ・他のコンポーネントに触る

```ts
this.entity.position / quaternion / scale / euler   // ローカル。MTP.Vector 等
this.entity.matrixWorld                             // ワールド行列（prepareRender 以降で確定）
this.entity.parent / children
this.entity.getComponent( MXP.Mesh )                // クラスで引く。1エンティティに同じクラスは1つ
this.entity.getComponentsByTag<MXP.Camera>( 'camera' )[ 0 ]
this.entity.getRootEntity().findEntityByName( 'Name' )
```

- Engine はコンポーネント内の `this.engine` で触る。WebGL は `this.engine as Engine`（`import { Engine } from 'orengine'`）、WebGPU で renderer に触るときは `this.engine as MXP.GPUEngine`
- テクスチャ（`.tex`）は `Engine.resources.getTexture( '<名前>' )`（`texture-schema.md`）
- ベクトル等は `import * as MTP from 'mathpower'`

## 注意

- クラス名は PascalCase で、ディレクトリ名と揃える
- 編集後は `npm run typecheck`、シェーダーを触ったら `errors` と `shot`
