# カスタムコンポーネント開発ガイド

## 基本方針

**見た目のあるオブジェクト（独自 Geometry / Material / シェーダーを持つもの）は、対応するカスタムコンポーネントを 1 つ作る。** Geometry と Material はコンポーネントのコンストラクタ内で生成し、`this.entity.addComponent(MXP.Mesh, { geometry, material })` で組み込む。

マテリアルや `.mat` ファイルを別管理する仕組みは廃止された。Material は使う側のコンポーネントが所有する。

## ファイル配置と自動登録

```
projects/{PROJECT}/Resources/Components/{Group}/{Name}/
├── index.ts        # export class Xxx extends MXP.Component（必須）
├── index.vs        # （任意）頂点シェーダー
└── index.fs        # （任意）フラグメントシェーダー
```

ResourceManager の Vite プラグインが `export class` を自動検出して登録する。**手動登録不要**。`_data/` 以下は自動生成のため**手動編集禁止**（読み取りは可）。先頭が `_` のディレクトリはスキャン対象外。

新規コンポーネントファイルを Write すると ResourceManager が `_data/componentList.ts` を再生成し、Vite がフルリロードを発行する。scene.json への参照追加はファイル編集のため保存内容が消えることはないが、**コンポーネント登録（HMR再生成）が完了する前に scene.json 側で参照すると一時的に描画されない**ことがあるので、コンポーネント追加 → `_data/componentList.ts` に反映されたことを確認 → scene.json 編集の順で進めるとよい。

## コンポーネントの3カテゴリ

### A. ビジュアルコンポーネント（Geometry + Material + Mesh を持つ）

最も基本のパターン。

```ts
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import frag from './index.fs';
import vert from './index.vs';

export class MyVisual extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		const geometry = new MXP.SphereGeometry( { radius: 0.5 } );

		const material = new MXP.Material( {
			vert,
			frag,
			phase: [ 'deferred', 'shadowMap' ],
			useLight: true,
			uniforms: MXP.UniformsUtils.merge( engine.uniforms ),
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
- 不透明 + ライティング → `phase: ['deferred']`
- 半透明・パーティクル → `phase: ['forward']`
- 影を落とす → `phase` に `'shadowMap'` を追加
- 大量描画 → インスタンシング（`setAttribute` に `instanceDivisor: 1`）

### B. 制御コンポーネント（Transform 操作型）

Mesh は持たず、`updateImpl` で entity の transform を操作する。

```ts
export class CameraOrbitAnim extends MXP.Component {

	private _time = 0;
	private _radius = 6;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.field( "radius", () => this._radius, v => this._radius = v as number );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this._time += event.timeDelta;
		const a = this._time * 0.3;
		this.entity.position.set( Math.cos( a ) * this._radius, 1.5, Math.sin( a ) * this._radius );
		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );

	}

}
```

### C. データ / ユーティリティコンポーネント

外部入力（オーディオ・WebSocket・MIDI 等）を取り込んで uniform やシーンに反映する。

## ライフサイクル

`protected xxxImpl()` をオーバーライドして使う。

| メソッド | タイミング | 用途 |
|---|---|---|
| `updateImpl(event)` | 毎フレーム（enabled 時） | Transform 更新・データ取得 |
| `postUpdateImpl(event)` | update 後 | update 結果に依存する処理 |
| `finalizeImpl(event)` | matrixWorld 確定後 | ワールド座標系での計算 |
| `beforeRenderImpl(event)` | レンダ直前 | 最終調整 |
| `afterRenderImpl(event)` | レンダ後 | 後処理 |

通常は `updateImpl` のみで十分。

## ComponentUpdateEvent

```ts
interface ComponentUpdateEvent {
	timeDelta: number;
	timeCode: number;
	timeElapsed: number;
	resolution: GLP.Vector;
	renderer: MXP.Renderer;
	playing: boolean;
}
```

## ユニフォーム

```ts
// グローバル uniform をまとめて取り込む（推奨）
uniforms: MXP.UniformsUtils.merge( engine.uniforms )

// カスタム追加
uniforms: MXP.UniformsUtils.merge(
	engine.uniforms,
	{ uMyValue: { value: 1.0, type: '1f' } },
)
```

## エディタ UI 連携（field）

エディタから操作したいパラメータだけを公開する。**`field()` で登録した path だけが scene.json の `props` 経由で設定できる**（未登録の public プロパティを `props` に書いても silent skip される）。

```ts
this.field( "radius", () => this._radius, v => this._radius = v as number );

const dir = this.fieldDir( "Settings" );
dir.field( "value", () => this._value, v => this._value = v );

this.field( "deviceId", () => this._deviceId, v => { this._deviceId = v; }, {
	format: { type: "select", list: () => this._deviceList }
} );
```

## シェーダー HMR

開発中に `.vs` / `.fs` の変更を即反映する。

```ts
const material = new MXP.Material( {
	frag: MXP.hotGet( 'myFrag', frag ),
	vert: MXP.hotGet( 'myVert', vert ),
} );

if ( import.meta.hot ) {

	import.meta.hot.accept( './index.fs', ( m ) => {

		if ( m ) {

			material.frag = MXP.hotUpdate( 'myFrag', m.default );
			material.requestUpdate();

		}

	} );

}
```

`hotGet` / `hotUpdate` のキー名はプロジェクト全体でユニークに。

## dispose

追加したものは必ず片付ける。

| パターン | 対処 |
|---|---|
| Mesh を addComponent した | `super.dispose(); this.entity.removeComponent( MXP.Mesh );` |
| タイマー登録 | `this.once( 'dispose', () => clearInterval( id ) );` |
| 何も追加していない | dispose オーバーライド不要 |

## エンティティとコンポーネントへのアクセス

```ts
this.entity                  // 自分が属する Entity
this.entity.position         // GLP.Vector
this.entity.quaternion       // GLP.Quaternion
this.entity.scale            // GLP.Vector
this.entity.matrixWorld      // ワールド行列
this.entity.children
this.entity.parent

this.entity.getComponent( MXP.Mesh )
this.entity.getComponentByTag( 'target' )
```

## import パターン

```ts
import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';
```

グローバルの `gl` / `globalUniforms` は存在しない。Engine へのアクセスはコンポーネント内で `const engine = this.engine as Engine;`（注入済み参照）を使う。

## コンストラクタ引数

```ts
// エディタからは引数なしで生成されるので | void を付ける
constructor( params: MXP.ComponentParams<{ num?: number } | void> ) {

	super( params );
	const count = params.args?.num ?? 2048;

}
```

## 注意

- クラス名は **PascalCase**、ディレクトリ名と一致
- `protected` フィールドは `_` プレフィックス
- 編集後は `npm run typecheck` を必ず実行
- シェーダーを書いた / 編集した場合は agent-browser スキルでエディタページを開き、ブラウザコンソールと見た目を確認する（専用の観測 API は存在しない）
