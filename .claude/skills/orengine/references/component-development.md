# カスタムコンポーネント開発ガイド

## コンポーネントが必要かどうか

カスタムコンポーネントを作る前に、ビルトイン機能だけで実現できないか検討する。

### コンポーネントが不要なケース

ただ画面に何かを表示するだけであれば、カスタムコンポーネントは不要。エディタやREST API経由で以下を行うだけで十分:

1. エンティティを作成
2. Meshコンポーネントを追加（ビルトイン）
3. ジオメトリタイプを設定（Cube, Sphere, Plane等）
4. マテリアルを作成・割当
5. 必要ならシェーダーを作成してマテリアルに紐づけ

シェーダーだけで実現できるアニメーション（頂点変形、UVスクロール、色の変化等）も、シェーダーファイルの編集だけでよい。

### コンポーネントが必要なケース

以下のような**コードによる動的な制御**が必要な場合にカスタムコンポーネントを作成する:

- **毎フレームの更新ロジック**: オブジェクトの移動・回転・カメラ制御などをTypeScriptで記述したい
- **プログラム的なジオメトリ生成**: インスタンシングやプロシージャルなジオメトリ構築が必要
- **外部データとの連携**: オーディオ入力、MIDIデバイス、WebSocket等からのデータ取得
- **複数エンティティの連携制御**: 他のEntityやComponentを参照して動的に振る舞いを変える
- **カスタムレンダリング**: 特殊なdrawTypeや複数パスの描画が必要

**迷ったら**: まずシェーダー + ビルトインMeshで試す。それで足りなければコンポーネントを作る。

## ファイル構成と自動登録

```
src/ts/Resources/Components/{Category}/{ComponentName}/
├── index.ts        ← export class Xxx extends MXP.Component（必須）
└── shaders/        ← （オプション）
    ├── xxx.vs
    └── xxx.fs
```

Viteプラグイン（`plugins/ResourceManager`）が `export class Xxx` を自動検出して `componentList.ts` に登録する。**手動登録は不要**。ディレクトリ名が `_` で始まるものはスキャン対象外。

## コンポーネントの3つのカテゴリ

### A. ビジュアルコンポーネント（Mesh生成型）

プログラム的にジオメトリやインスタンシングを構築して描画するとき。constructorで全構築を完結させる。

```typescript
export class MyVisual extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.CubeGeometry();
		const material = new MXP.Material( {
			frag: myFrag, vert: myVert,
			phase: [ 'deferred' ],
			uniforms: MXP.UniformsUtils.merge( Engine.getInstance( gl ).uniforms ),
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
- 不透明でライティングあり → phase: `deferred`
- 半透明・パーティクル → phase: `forward`
- 大量描画 → インスタンシング（`setAttribute` に `instanceDivisor: 1`）
- 影を落とす → phase に `shadowMap` 追加

### B. 制御コンポーネント（Transform操作型）

オブジェクトの動きやカメラ制御。Meshは追加せず、updateImplでTransformを操作する。

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

		this.entity.position.set( Math.cos( angle ) * this.radius, 1.5, Math.sin( angle ) * this.radius );
		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );

	}

}
```

### C. データ/ユーティリティコンポーネント

外部デバイスやデータソースとの橋渡し。データを取得してuniformに流す。

## ライフサイクルメソッド

すべて `protected xxxImpl()` をオーバーライドして使う:

| メソッド | タイミング | 用途 |
|---------|----------|------|
| `updateImpl(event)` | 毎フレーム（enabled時） | Transform更新、データ取得 |
| `postUpdateImpl(event)` | update後 | update結果に依存する処理 |
| `finalizeImpl(event)` | matrixWorld確定後 | lookAt適用、ワールド座標系での計算 |
| `beforeRenderImpl(event)` | レンダリング直前 | 最終的なmatrixWorld調整 |
| `afterRenderImpl(event)` | レンダリング後 | 後処理 |

ほとんどの場合は `updateImpl` だけで十分。`order` プロパティ（デフォルト: 0）で実行順序を制御可能。

## ComponentUpdateEvent

```typescript
interface ComponentUpdateEvent {
	timeDelta: number;       // 前フレームからの経過時間
	timeCode: number;        // 現在の時間コード
	timeElapsed: number;     // 経過時間
	resolution: GLP.Vector;  // レンダリング解像度
	renderer: MXP.Renderer;  // レンダラーインスタンス
	playing: boolean;        // 再生中かどうか
}
```

## ユニフォームの扱い方

```typescript
// 一括取得（推奨）
uniforms: MXP.UniformsUtils.merge( Engine.getInstance( gl ).uniforms )

// 個別選択
uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )

// カスタム追加
uniforms: MXP.UniformsUtils.merge( Engine.getInstance( gl ).uniforms, {
	uMyValue: { value: 1.0, type: "1f" },
} )
```

## Serializableフィールド（エディタUI連携）

エディタから操作したいパラメータにだけ定義する。

```typescript
// 基本
this.field( "radius", () => this.radius, v => this.radius = v as number );

// フォルダグループ
const dir = this.fieldDir( "Settings" );
dir.field( "value", () => this._value, v => this._value = v );

// セレクト
this.field( "deviceId", () => this._deviceId, v => { this._deviceId = v; }, {
	format: { type: "select", list: () => this._deviceList }
} );

// 非同期で選択肢が変わる場合
this.noticeField( "fieldName" );
```

## シェーダーHMR

開発中にシェーダー編集を即座に反映する仕組み:

```typescript
const material = new MXP.Material( {
	frag: MXP.hotGet( 'myFrag', myFrag ),
	vert: MXP.hotGet( 'myVert', myVert ),
} );

if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/my.fs', ( module ) => {

		if ( module ) {

			material.frag = MXP.hotUpdate( 'myFrag', module.default );
			material.requestUpdate();

		}

	} );

}
```

`hotGet` / `hotUpdate` のキー名はプロジェクト全体でユニークにすること。

## disposeとリソース管理

**追加したものは必ず片付ける。**

| パターン | 方法 |
|---------|------|
| Mesh追加した | `super.dispose(); this.entity.removeComponent( MXP.Mesh );` |
| タイマー管理 | `this.once( "dispose", () => clearInterval(id) );` |
| 何も追加していない | disposeオーバーライド不要 |

## Entityへのアクセス

```typescript
this.entity              // 自分が属するEntity
this.entity.position     // 位置 (Vector)
this.entity.quaternion   // 回転 (Quaternion)
this.entity.scale        // スケール (Vector)
this.entity.matrixWorld  // ワールド行列
this.entity.children     // 子Entity配列
this.entity.parent       // 親Entity
```

## 他のコンポーネントとの連携

```typescript
const mesh = this.entity.getComponent( MXP.Mesh );
const target = this.entity.getComponentByTag<MXP.Component>( "target" );
```

## importパターン

```typescript
import * as GLP from 'glpower';        // Vector, Matrix, Quaternion, EventEmitter等
import * as MXP from 'maxpower';       // Component, Entity, Mesh, Material等
import { Engine } from 'orengine';     // エンジンインスタンス（uniforms取得等）
import { gl } from '~/ts/Globals';     // WebGL2コンテキスト
import { globalUniforms } from '~/ts/Globals';  // グローバルユニフォーム
```

## コンストラクタ引数

```typescript
// 引数あり（エディタからは引数なしで生成されるので | void を付ける）
constructor( params: MXP.ComponentParams<{num?: number} | void> ) {
	super( params );
	const count = params.args?.num || 2048;
}
```

## 注意事項

- クラス名はPascalCase
- `protected` フィールドはアンダースコアプレフィックス `_`
- コンポーネント作成後は `npm run typecheck` で型チェックを実行すること
