# カスタムコンポーネント開発ガイド

## ファイル構成

```
src/ts/Resources/Components/{Category}/{ComponentName}/index.ts
```

各コンポーネントは1ディレクトリ = 1 `index.ts` ファイル。

## 手順

### 1. コンポーネントクラスを作成

```typescript
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class MyComponent extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// 毎フレーム実行される

	}

}
```

### 2. componentList.ts に登録

`src/ts/Resources/_data/componentList.ts` にインポートとエントリを追加:

```typescript
import { MyComponent } from '../Components/Category/MyComponent';

export const COMPONENTLIST: {[key: string]: any} = {
	Category: {
		MyComponent,
		// ...
	},
	// ...
};
```

階層的なグループ構造で登録する。カテゴリキーがエディタUIのグループ名になる。

## ライフサイクルメソッド

| メソッド | タイミング | 用途 |
|---------|----------|------|
| `updateImpl(event)` | 毎フレーム（enabled時） | メインロジック |
| `postUpdateImpl(event)` | update後 | 依存する後処理 |
| `beforeRenderImpl(event)` | レンダリング前 | レンダリング準備 |
| `afterRenderImpl(event)` | レンダリング後 | レンダリング後の処理 |

## ComponentUpdateEvent

```typescript
interface ComponentUpdateEvent {
	timeDelta: number;       // 前フレームからの経過時間
	timeCode: number;        // 現在の時間コード
	resolution: GLP.Vector;  // レンダリング解像度
	renderer: MXP.Renderer;  // レンダラーインスタンス
	playing: boolean;        // 再生中かどうか
}
```

## Serializableフィールド（エディタUI連携）

コンストラクタ内で `this.field()` / `this.fieldDir()` を使ってエディタに表示するフィールドを定義。

```typescript
constructor( params: MXP.ComponentParams ) {

	super( params );

	// 数値フィールド
	this.field( "speed", 1.0 );

	// ベクトルフィールド
	this.field( "offset", new GLP.Vector( 0, 0, 0 ), { format: { type: "vector" } } );

	// セレクトフィールド
	this.field( "mode", "normal", {
		format: {
			type: "select",
			selectList: [ "normal", "fast", "slow" ]
		}
	} );

	// フォルダグループ
	const dir = this.fieldDir( "settings" );
	dir.field( "enabled", true );
	dir.field( "intensity", 0.5 );

}
```

フィールドの値は `this.field("name")` で取得可能。変更はエディタUIから自動的に反映される。

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
// 同じEntityの他コンポーネントを取得
const mesh = this.entity.getComponent( MXP.Mesh );

// タグで検索
const target = this.entity.getComponentByTag<MXP.Component>( "target" );

// 子Entityから検索
this.entity.children.forEach( child => {
	const comp = child.getComponent( MyOtherComponent );
});
```

## importパターン

```typescript
import * as GLP from 'glpower';        // Vector, Matrix, Quaternion, EventEmitter等
import * as MXP from 'maxpower';       // Component, Entity, Mesh, Material等
import { Engine } from 'orengine';     // エディタ・エンジン連携（リソース取得等）
import { gl } from '~/ts/Globals';     // WebGL2コンテキスト
```

## 実装例: 自動回転コンポーネント

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

		this.rotQuaternion.setFromEuler(
			new GLP.Euler( 0, - 0.4 * event.timeDelta * this.speed, 0 )
		);

		this.entity.quaternion.multiply( this.rotQuaternion );

	}

}
```

## 注意事項

- クラス名はPascalCase
- `protected` フィールドはアンダースコアプレフィックス `_`
- コンポーネント作成後は `npm run typecheck` で型チェックを実行すること
- `order` プロパティで実行順序を制御可能（デフォルト: 0、小さいほど先に実行）
