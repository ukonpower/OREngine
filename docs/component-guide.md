# コンポーネント作成ガイド

OREngineにおけるコンポーネントの作成方針をまとめたガイド。

## コンポーネントとは

コンポーネントはEntityに追加して振る舞いを付与する仕組み。継承階層は以下の通り:

```
EventEmitter → Serializable → Component
```

- **EventEmitter**: イベントの発行・購読
- **Serializable**: シリアライズ/デシリアライズ、エディタUIとの連携（フィールドシステム）
- **Component**: Entityへのアタッチ、ライフサイクル管理

**1つのコンポーネント = 1つの責務**。描画、動き、データ入力などの役割ごとにコンポーネントを分ける。

## コンポーネントが必要かどうか

カスタムコンポーネントを作る前に、ビルトイン機能だけで実現できないかを検討する。

### コンポーネントが不要なケース

ただ画面に何かを表示するだけであれば、カスタムコンポーネントは不要。エディタやREST API経由で以下の操作をすれば十分:

1. エンティティを作成
2. Meshコンポーネントを追加（ビルトイン）
3. ジオメトリタイプを設定（Cube, Sphere, Plane等）
4. マテリアルを作成・割当
5. 必要ならシェーダーを作成してマテリアルに紐づけ

```bash
# 例: APIでCubeメッシュを持つエンティティを作成
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entities \
  -H "Content-Type: application/json" \
  -d '{"entities": [{
    "name": "MyCube",
    "position": [0, 1, 0],
    "components": [{
      "componentName": "Mesh",
      "fields": { "geometry/type": "Cube", "material/name": "MyMaterial" }
    }]
  }]}'
```

シェーダーだけで実現できるアニメーション（頂点変形、UV スクロール、色の変化等）も、シェーダーファイルを編集するだけでよい。

### コンポーネントが必要なケース

以下のような**コードによる動的な制御**が必要な場合にカスタムコンポーネントを作成する:

- **毎フレームの更新ロジック**: オブジェクトの移動・回転・カメラ制御などをTypeScriptで記述したい
- **プログラム的なジオメトリ生成**: インスタンシングやプロシージャルなジオメトリ構築が必要
- **外部データとの連携**: オーディオ入力、MIDIデバイス、WebSocket等からのデータ取得
- **複数エンティティの連携制御**: 他のEntityやComponentを参照して動的に振る舞いを変える
- **カスタムレンダリング**: 特殊なdrawTypeや複数パスの描画が必要

**迷ったら**: まずシェーダー + ビルトインMeshで試す。それで足りなければコンポーネントを作る。

## はじめに: 最小のコンポーネント

最小のコンポーネントは以下の通り。Y軸回転だけを行う `ObjectRotate` の例:

```typescript
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class ObjectRotate extends MXP.Component {

	private speed: number;
	private rotQuaternion: GLP.Quaternion;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.speed = 1;
		this.rotQuaternion = new GLP.Quaternion();

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.rotQuaternion.setFromEuler( new GLP.Euler( 0, - 0.4 * event.timeDelta * this.speed, 0 ) );
		this.entity.quaternion.multiply( this.rotQuaternion );

	}

}
```

これを `src/ts/Resources/Components/<グループ>/<名前>/index.ts` に配置するだけで、Viteプラグインが自動検出してエディタのコンポーネント一覧に登録する。手動登録は不要。

## コンポーネントの3つのカテゴリ

作りたいコンポーネントが何をするかによって、基本的なアプローチが決まる。

### A. ビジュアルコンポーネント（Mesh生成型）

**プログラム的にジオメトリやインスタンシングを構築して描画したいとき**に使う。単純な形状の表示であればビルトインのMeshコンポーネント + シェーダーで十分（「コンポーネントが必要かどうか」を参照）。インスタンシング、プロシージャルジオメトリ、特殊なdrawType等が必要な場合にカスタムコンポーネントとして実装する。

方針:
- constructorで全構築を完結させる
- updateImplは基本的に不要（シェーダー側でアニメーションする場合が多い）
- disposeでMeshを必ず除去する

```typescript
export class MyVisual extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.CubeGeometry();
		const material = new MXP.Material( {
			frag: myFrag,
			vert: myVert,
			phase: [ 'deferred' ],
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
```

判断ポイント:
- 不透明でライティングを受ける → phase: `deferred`
- 半透明・パーティクル・特殊描画 → phase: `forward`
- 同じジオメトリを大量に描画 → インスタンシング
- 影を落としたい → phase に `shadowMap` を追加
- 環境マップに映り込む → phase に `envMap` を追加

代表例: `Dust`（パーティクル）、`GridCross`（インスタンシング）、`EyeRings`（deferred + shadowMap）

### B. 制御コンポーネント（Transform操作型）

**オブジェクトの動きやカメラ制御**を行うとき。Meshは追加せず、Entityのposition/quaternionを毎フレーム操作する。

方針:
- updateImplでTransformを更新する
- パラメータはSerializableフィールドで公開するとエディタから調整できる

```typescript
export class CameraOrbitAnim extends MXP.Component {

	private time: number;
	private radius: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.time = 0;
		this.radius = 6.0;

		this.field( "radius", () => this.radius, v => this.radius = v as number );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.time += event.timeDelta;
		const angle = this.time * 0.3;

		this.entity.position.set(
			Math.cos( angle ) * this.radius,
			1.5,
			Math.sin( angle ) * this.radius
		);
		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );

	}

}
```

判断ポイント:
- 通常は `updateImpl` のみで十分
- matrixWorld確定後に処理が必要 → `finalizeImpl` を使う
- レンダリング直前に最終調整 → `beforeRenderImpl` を使う
- 他のコンポーネントより後に実行したい → `this.order` を大きくする

代表例: `ObjectRotate`、`CameraOrbitAnim`、`VJCamera`（updateImpl + finalizeImpl）

### C. データ/ユーティリティコンポーネント

**外部デバイスやデータソースとの橋渡し**を行うとき。データを取得してuniformに流し、他のコンポーネントのシェーダーから参照できるようにする。

方針:
- constructor で外部リソースの初期化
- updateImpl でデータを取得してuniformを更新
- 非同期初期化が必要な場合は初期化完了フラグで制御

代表例: `AudioTexture`（Web Audio → テクスチャ）、`UniformControls`（時間・解像度 → globalUniforms）

## ライフサイクル

Componentは以下のライフサイクルメソッドを持つ。すべて `protected xxxImpl()` をオーバーライドして使う:

| メソッド | タイミング | 主な用途 |
|---------|----------|---------|
| `updateImpl` | 毎フレーム（update フェーズ） | Transform更新、データ取得 |
| `postUpdateImpl` | update後 | update結果に依存する処理 |
| `finalizeImpl` | matrixWorld確定後 | lookAt適用、ワールド座標系での計算 |
| `beforeRenderImpl` | レンダリング直前 | 最終的なmatrixWorld調整 |
| `afterRenderImpl` | レンダリング後 | 後処理 |

**どれを使うか**:
- ほとんどの場合は `updateImpl` だけで十分
- Entity の worldMatrix が確定した後に処理が必要なら `finalizeImpl`
- カメラのviewMatrix設定など、レンダリング直前に確定させたい処理は `beforeRenderImpl`

### order プロパティ

同一ライフサイクル内での実行順序を制御する。デフォルトは 0。値が小さい順に実行される。

```typescript
this.order = 9999; // 他のコンポーネントより後に実行
```

例: `LookAt` コンポーネントは `order = 9999` にして、他の位置更新が完了した後にlookAtを適用する。

## レンダリングフェーズの選び方

Materialの `phase` オプションで描画パイプラインを指定する。

| フェーズ | 説明 | 使う場面 |
|---------|------|---------|
| `deferred` | GBufferに出力。エンジンのライティング処理を受ける | 不透明な通常オブジェクト |
| `forward` | 直接フォワードレンダリング | パーティクル、半透明、特殊エフェクト |
| `shadowMap` | シャドウマップに描画 | 影を落としたいオブジェクト |
| `envMap` | 環境マップに描画 | 反射に映り込むオブジェクト |

指定しない場合のデフォルトは `deferred`。複数指定可能:

```typescript
const material = new MXP.Material( {
	phase: [ 'deferred', 'shadowMap' ], // ライティング + 影
} );
```

## ユニフォームの扱い方

シェーダーにデータを渡すuniformの設定方法。

### 一括取得（推奨）

Engine全体のユニフォーム（時間、解像度、カメラ等）をまとめて取得する:

```typescript
import { Engine } from 'orengine';
import { gl } from '~/ts/Globals';

const material = new MXP.Material( {
	uniforms: MXP.UniformsUtils.merge( Engine.getInstance( gl ).uniforms ),
} );
```

### 個別選択

必要なユニフォームだけを選んで使う:

```typescript
import { globalUniforms } from '~/ts/Globals';

const material = new MXP.Material( {
	uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time ),
} );
```

### カスタムuniform の追加

既存のuniformにマージして追加:

```typescript
const material = new MXP.Material( {
	uniforms: MXP.UniformsUtils.merge(
		Engine.getInstance( gl ).uniforms,
		{
			uMyValue: { value: 1.0, type: "1f" },
			uMyTexture: { value: null, type: "1i" },
		}
	),
} );
```

## Serializableフィールド（エディタ連携）

`this.field()` を使うと、パラメータをエディタUIから編集可能にできる。エディタから操作したいパラメータにだけ定義する。

### 基本

```typescript
this.field( "radius", () => this.radius, v => this.radius = v as number );
this.field( "speed", () => this.speed, v => this.speed = v as number );
```

### フォルダでグループ化

```typescript
const settings = this.fieldDir( "Settings" );
settings.field( "value", () => this._value, v => this._value = v );
```

### セレクトボックス

```typescript
this.field( "deviceId", () => this._deviceId, ( v ) => { this._deviceId = v; }, {
	format: { type: "select", list: () => this._deviceList }
} );
```

### 非同期で選択肢が変わる場合

```typescript
navigator.mediaDevices?.enumerateDevices().then( devices => {
	this._deviceList = devices.map( d => ( { value: d.deviceId, label: d.label } ) );
	this.noticeField( "deviceId" ); // UIに更新を通知
} );
```

## シェーダーとHMR

### ファイル配置

シェーダーはコンポーネントディレクトリ内の `shaders/` に置く:

```
MyComponent/
├── index.ts
└── shaders/
    ├── myShader.vs    (vertex shader)
    └── myShader.fs    (fragment shader)
```

### HMR（Hot Module Replacement）対応

開発中にシェーダーを編集すると即座に反映される仕組み。`hotGet` / `hotUpdate` を使う:

```typescript
import myFrag from './shaders/myShader.fs';
import myVert from './shaders/myShader.vs';

// Material作成時に hotGet でラップ
const material = new MXP.Material( {
	frag: MXP.hotGet( 'myShaderFrag', myFrag ),
	vert: MXP.hotGet( 'myShaderVert', myVert ),
} );

// HMR受け入れ
if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/myShader.fs', ( module ) => {

		if ( module ) {

			material.frag = MXP.hotUpdate( 'myShaderFrag', module.default );
			material.requestUpdate();

		}

	} );

	import.meta.hot.accept( './shaders/myShader.vs', ( module ) => {

		if ( module ) {

			material.vert = MXP.hotUpdate( 'myShaderVert', module.default );
			material.requestUpdate();

		}

	} );

}
```

`hotGet` / `hotUpdate` のキー名はプロジェクト全体でユニークにすること。

## disposeとリソース管理

**追加したものは必ず片付ける。**

### Meshを追加した場合

```typescript
public dispose(): void {

	super.dispose();
	this.entity.removeComponent( MXP.Mesh );

}
```

### タイマーやイベントリスナーを使った場合

constructorで `this.once("dispose", ...)` を使ってクリーンアップを登録する:

```typescript
const interval = setInterval( tick, 1000 );

this.once( "dispose", () => {

	window.clearInterval( interval );

} );
```

### 何も追加していない場合

制御系コンポーネント（ObjectRotate等）のように、Entityのプロパティを操作するだけなら dispose のオーバーライドは不要。

## ディレクトリ配置と自動登録

### ディレクトリ構造

```
src/ts/Resources/Components/
├── <グループ名>/              ← カテゴリ別（PascalCase）
│   └── <コンポーネント名>/     ← PascalCase
│       ├── index.ts           ← export class Xxx extends MXP.Component（必須）
│       └── shaders/           ← （オプション）
│           ├── xxx.vs
│           └── xxx.fs
└── _PostProcess/              ← 先頭 _ はスキャン対象外
```

### 自動登録の条件

Viteプラグイン（`plugins/ResourceManager`）が以下の条件でコンポーネントを自動検出する:

- `src/ts/Resources/Components/` 以下にある
- `index.ts` に `export class Xxx` がある
- ディレクトリ名が `_` で始まっていない

検出されたコンポーネントは `componentList.ts` に自動登録される。このファイルは手動編集禁止。

### コンストラクタ引数

コンポーネント生成時に引数を受け取りたい場合は `ComponentParams` にジェネリクスを指定する:

```typescript
export class Dust extends MXP.Component {

	constructor( params: MXP.ComponentParams<{num?: number} | void> ) {

		super( params );

		const count = params.args?.num || 2048;

	}

}
```

エディタからのコンポーネント追加では引数なしで生成されるため、`| void` を付けて引数なしでも動くようにする。

### インスタンシング

同じジオメトリを大量に描画する場合はインスタンシングを使う。`setAttribute` に `instanceDivisor: 1` を指定する:

```typescript
const posArray: number[] = [];

for ( let i = 0; i < num; i ++ ) {

	posArray.push( x, y, z );

}

geometry.setAttribute( "instancePos", new Float32Array( posArray ), 3, {
	instanceDivisor: 1
} );
```

頂点シェーダー側で `in vec3 instancePos;` として受け取る。
