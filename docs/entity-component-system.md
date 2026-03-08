# OREngine Entity-Component システム仕様

Entity-Componentシステムの内部実装仕様。ファイルパスは `packages/maxpower/` 配下。

## クラス継承階層

```
EventEmitter (glpower)
  └─ Serializable (maxpower/Serializable/)
       ├─ Entity (maxpower/Entity/)
       │    └─ Engine (orengine/ts/Engine/)
       └─ Component (maxpower/Component/)
            ├─ Mesh
            ├─ Camera / Light
            ├─ Renderer
            └─ カスタムコンポーネント
```

---

## Entity

**ファイル**: `packages/maxpower/Entity/index.ts`

### プロパティ

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `name` | `string` | エンティティ名 |
| `position` | `GLP.Vector` | ローカル位置 (x, y, z) |
| `euler` | `GLP.Euler` | ローカル回転（オイラー角、ラジアン） |
| `quaternion` | `GLP.Quaternion` | ローカル回転（クォータニオン） |
| `scale` | `GLP.Vector` | ローカルスケール |
| `matrix` | `GLP.Matrix` | ローカル変換行列 |
| `matrixWorld` | `GLP.Matrix` | ワールド変換行列（親の matrixWorld × matrix） |
| `matrixWorldPrev` | `GLP.Matrix` | 前フレームのワールド行列（モーションベクトル用） |
| `autoMatrixUpdate` | `boolean` | `update()` 内で自動的に `updateMatrix()` を呼ぶか（デフォルト: `true`） |
| `parent` | `Entity \| null` | 親エンティティ |
| `children` | `Entity[]` | 子エンティティ配列 |
| `components` | `Map<typeof Component, Component>` | コンポーネントマップ（クラス → インスタンス） |
| `visible` | `boolean` | 可視性フラグ |
| `userData` | `any` | 任意のユーザーデータ |

### 行列更新

`updateMatrix( updateParent?: boolean )`:

1. `quaternion.updated` が `true` なら euler をクォータニオンから算出、そうでなければクォータニオンをeulerから算出
2. `matrix` を position, quaternion, scale から構築
3. `matrixWorld` = 親の `matrixWorld` × `matrix`
4. `updateParent = true` なら親の行列を先に再帰更新

**注意**: `euler` と `quaternion` はどちらを変更しても `updateMatrix()` 時に同期される。`quaternion.updated` フラグで判定。

### 親子関係

```typescript
entity.add( child );      // child.parent が設定され、children に追加
entity.remove( child );   // children から削除
```

- `add()` 時に child が既に別の parent を持つ場合、自動的に `remove()` される

### コンポーネント管理

```typescript
// 追加（同じクラスの既存コンポーネントは自動削除）
const mesh = entity.addComponent( MXP.Mesh, { geometry, material } );

// 取得
const mesh = entity.getComponent( MXP.Mesh );           // クラスで取得
const camera = entity.getComponentByTag<Camera>( "camera" ); // タグで取得
const list = entity.getComponentsByTag<Light>( "light" );     // タグで複数取得
const comp = entity.getComponentByUUID( uuid );              // UUIDで取得

// 削除
entity.removeComponent( MXP.Mesh );
entity.removeComponentByUUID( uuid );
```

- `addComponent<T>( ComponentClass, args? )` は `new ComponentClass({ entity: this, args })` でインスタンス化
- コンポーネントは `order` プロパティでソートされ、update の実行順が決まる
- 1つの Entity に同じクラスのコンポーネントは1つだけ

### 検索

```typescript
entity.findEntityByName( "Camera" );   // 名前で再帰検索
entity.findEntityByUUID( uuid );       // UUIDで再帰検索
entity.getRootEntity();                // ルートまで遡る
entity.getScenePath( root? );          // "/root/parent/child" 形式のパス
entity.traverse( cb );                 // 全子孫を走査
entity.isVisibleTraverse();            // 親まで遡って可視性を確認
```

### イベント伝播

```typescript
entity.noticeEventChilds( "eventName", data );  // 自分 + 全子孫に発火
entity.noticeEventParent( "eventName", data );   // 自分 + 全親に発火
```

### 破棄

```typescript
entity.dispose();           // 親から除去 + 全コンポーネント dispose
entity.disposeRecursive();  // 自身 + 全子孫を再帰的に dispose
```

---

## Component

**ファイル**: `packages/maxpower/Component/index.ts`

### コンストラクタ

```typescript
export type ComponentParams<TArgs = void> = TArgs extends void
  ? { entity: Entity; args?: TArgs }
  : { entity: Entity; args: TArgs };

constructor( params: ComponentParams<any> )
```

- `entity`: コンポーネントが属する Entity への参照
- `args`: コンポーネント固有の初期化引数

### プロパティ

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `_entity` | `Entity` | 所属エンティティ（protected） |
| `_enabled` | `boolean` | 有効/無効（`enabled` getter/setter） |
| `_tag` | `string` | タグ文字列（`getComponentByTag` で使用） |
| `order` | `number` | 実行順序（小さいほど先に実行、デフォルト: 0） |
| `disableEdit` | `boolean` | エディタでの編集を無効化 |

### ライフサイクル

```
コンストラクタ
  ↓
updateImpl(event)         ← 毎フレーム（enabled時のみ）
  ↓
postUpdateImpl(event)     ← update後の処理（enabled時のみ）
  ↓
beforeRenderImpl(event)   ← レンダリング前（enabled時のみ）
  ↓
afterRenderImpl(event)    ← レンダリング後（enabled時のみ）
  ↓
dispose()                 ← 破棄時
```

全てのライフサイクルメソッドは `protected` で、サブクラスでオーバーライドする:

```typescript
export class MyComponent extends MXP.Component {
  constructor( params: MXP.ComponentParams ) {
    super( params );
  }
  protected updateImpl( event: MXP.ComponentUpdateEvent ) {
    // 毎フレーム実行される処理
  }
}
```

### デフォルトフィールド

Component は Serializable を継承しているため、以下のフィールドが自動登録される:
- `enabled` (boolean) - hidden, noExport
- `tag` (string) - readOnly, noExport, タグが空文字の場合は hidden

---

## 更新ループ

`Entity.update( event: EntityUpdateEvent )` の実行順序:

```
1. entity.updateImpl( event )           ← Entity自身のカスタム処理
2. for each component (orderでソート済み):
     component.update( event )          ← enabled時のみ updateImpl 呼び出し
3. if ( autoMatrixUpdate ):
     entity.updateMatrix()              ← ローカル行列 → ワールド行列計算
4. for each child:
     child.update( childEvent )         ← 子Entityを再帰更新
```

**beforeRender / afterRender** は update ループとは別に、`Renderer.render()` の前後で呼ばれる:

```
entity.onBeforeRender( event )
  ↓ for each component: beforeRenderImpl
  ↓ for each child: onBeforeRender
renderer.render( ... )
entity.onAfterRender( event )
  ↓ matrixWorldPrev = matrixWorld のコピー
  ↓ for each component: afterRenderImpl
  ↓ for each child: onAfterRender
```

---

## EntityUpdateEvent / ComponentUpdateEvent

```typescript
interface EntityUpdateEvent {
  timeElapsed: number;       // 累積経過時間（秒）
  timeDelta: number;         // 前フレームからの差分（秒）
  timeCode: number;          // タイムラインコード（秒）
  timeCodeFrame: number;     // タイムラインコード（フレーム）
  playing: boolean;          // 再生中かどうか
  renderer: MXP.Renderer;   // レンダラーインスタンス
  resolution: GLP.Vector;   // 画面解像度
  matrix?: GLP.Matrix;      // 親のmatrixWorld（子Entityに伝播）
  visibility?: boolean;     // 可視性フラグ
  forceDraw?: boolean;       // 強制描画フラグ
}

// ComponentUpdateEvent は EntityFinalizeEvent を継承
// EntityFinalizeEvent は EntityUpdateEvent に renderStack? を追加
type ComponentUpdateEvent = EntityFinalizeEvent & {}
```

---

## RenderStack

`Renderer.getRenderStack( entity )` でシーンツリーを走査し、各エンティティの Mesh コンポーネントの `material.visibilityFlag` に基づいて描画リストを構築する:

```typescript
type RenderStack = {
  light: Entity[];       // Light コンポーネントを持つエンティティ
  envMap: Entity[];      // phase に "envMap" を含むマテリアル
  shadowMap: Entity[];   // phase に "shadowMap" を含むマテリアル
  deferred: Entity[];    // phase に "deferred" を含むマテリアル
  forward: Entity[];     // phase に "forward" を含むマテリアル
  ui: Entity[];          // phase に "ui" を含むマテリアル
}
```

---

## コンポーネント実装パターン

### 基本的なコンポーネント

```typescript
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class Rotator extends MXP.Component {

  private _speed: number;

  constructor( params: MXP.ComponentParams ) {

    super( params );

    this._speed = 1.0;

    // エディタUIに表示するフィールドを登録
    this.field( "speed", () => this._speed, v => this._speed = v, { step: 0.1 } );

  }

  protected updateImpl( event: MXP.ComponentUpdateEvent ) {

    this._entity.euler.y += this._speed * event.timeDelta;

  }

}
```

### 引数付きコンポーネント

```typescript
type MyArgs = { initialValue: number };

export class MyComponent extends MXP.Component {

  private _value: number;

  constructor( params: MXP.ComponentParams<MyArgs> ) {

    super( params );

    this._value = params.args.initialValue;

  }

}

// 使用時
entity.addComponent( MyComponent, { initialValue: 42 } );
```

### タグ付きコンポーネント

```typescript
export class Camera extends MXP.Component {

  constructor( params: MXP.ComponentParams ) {

    super( params );

    this._tag = "camera";  // getComponentByTag("camera") で取得可能に

  }

}
```
