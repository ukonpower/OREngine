# Research: コンポーネント作成マニュアル

## タスク概要
Samplesコンポーネント群を調査し、コンポーネントの作成方針・設計パターンをドキュメント化するための調査。細かな実装よりも「どういう方針でコンポーネントを作成するか」に焦点を当てる。

## コンポーネントの分類

Samples以下の21コンポーネント + 標準コンポーネントを分析した結果、以下の3カテゴリに分類できる:

### カテゴリA: ビジュアルコンポーネント（Mesh生成型）
Geometry + Material + Mesh を構築して描画するコンポーネント。コンポーネント数最多。

| コンポーネント | ジオメトリ | インスタンシング | レンダリングフェーズ |
|-------------|-----------|---------------|-----------------|
| Dust | カスタム（POINTS） | なし | forward |
| GridCross | CubeGeometry | あり（instancePos, instanceRot） | forward |
| FlashLine | CylinderGeometry | あり（oPos） | forward, envMap |
| VectorField | CubeGeometry | あり（instancePos, instanceId） | forward |
| EyeRings | RingGeometry | あり（instance） | deferred, shadowMap |
| Text | PlaneGeometry | あり（geoMatrix, uvMatrix） | デフォルト |

### カテゴリB: 制御コンポーネント（Transform操作型）
Entityのposition/quaternionを操作するコンポーネント。Meshを追加しない。

| コンポーネント | 操作対象 | ライフサイクル |
|-------------|---------|-------------|
| ObjectRotate | entity.quaternion | updateImpl |
| CameraOrbitAnim | entity.position + lookAt | updateImpl |
| CameraFloating | entity.position + lookAt + DoF | updateImpl |
| VJCamera | entity.position + matrixWorld | updateImpl + finalizeImpl |
| LookAt | entity.matrixWorld | beforeRenderImpl |

### カテゴリC: データ/ユーティリティコンポーネント
外部デバイスやデータソースとの橋渡し。

| コンポーネント | 役割 |
|-------------|------|
| AudioTexture | Web Audio API → テクスチャ → uniform |
| MIDIMIX / LPD8 | MIDI デバイス → uniform |
| UniformControls | 時間・解像度 → globalUniforms |

## 既存パターン

### パターン1: コンストラクタ完結型（最も一般的）
constructorでGeometry・Material・Meshをすべて構築し、updateImplが不要なパターン。
**該当**: Dust, GridCross, FlashLine, VectorField, EyeRings, Text

```typescript
export class XxxComponent extends MXP.Component {
    constructor( params: MXP.ComponentParams ) {
        super( params );
        const geometry = new MXP.XxxGeometry( ... );
        geometry.setAttribute( "instanceXxx", new Float32Array(...), N, { instanceDivisor: 1 } );
        const material = new MXP.Material( { frag, vert, phase, uniforms } );
        this.entity.addComponent( MXP.Mesh, { geometry, material } );
        // HMR設定
    }
    public dispose(): void {
        super.dispose();
        this.entity.removeComponent( MXP.Mesh );
    }
}
```

### パターン2: updateImpl駆動型
毎フレームEntityのTransformを更新するパターン。
**該当**: ObjectRotate, CameraOrbitAnim, CameraFloating, 各カメラコントロール

```typescript
export class XxxComponent extends MXP.Component {
    constructor( params: MXP.ComponentParams ) {
        super( params );
        // パラメータ初期化 + Serializableフィールド定義
    }
    protected updateImpl( event: MXP.ComponentUpdateEvent ): void {
        // entity.position / entity.quaternion の操作
    }
}
```

### パターン3: 複数ライフサイクル利用型
updateImpl + finalizeImpl（または beforeRenderImpl）を組み合わせるパターン。
**該当**: VJCamera, LookAt

- `updateImpl`: Entity位置の更新
- `finalizeImpl`: matrixWorld確定後のlookAt適用
- `beforeRenderImpl`: レンダリング直前の最終調整

## レンダリングフェーズの使い分け

| フェーズ | 用途 | 例 |
|---------|------|-----|
| `deferred` | 不透明オブジェクト。GBufferに出力。ライティング対応 | EyeRings |
| `forward` | 半透明・特殊描画。直接フォワードレンダリング | Dust, GridCross, FlashLine |
| `shadowMap` | シャドウマップに描画 | EyeRings |
| `envMap` | 環境マップに描画 | FlashLine |
| 指定なし | デフォルト（deferred） | Text |

**方針**: 不透明で通常のライティングを受けるオブジェクトは `deferred`、パーティクルや半透明エフェクトは `forward`。影を落としたい場合は `shadowMap` を追加。

## ユニフォームの取得方法（2パターン）

### Engine.getInstance(gl).uniforms
エンジン全体のユニフォームセットを一括取得。
```typescript
uniforms: MXP.UniformsUtils.merge( Engine.getInstance( gl ).uniforms )
```

### globalUniforms から個別選択
必要なユニフォームだけを選択的にマージ。
```typescript
uniforms: MXP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time )
```

## HMRパターン

シェーダーのホットリロード対応。推奨パターン:

```typescript
// 初期値をhotGetで取得
const mat = new MXP.Material( {
    frag: MXP.hotGet( 'uniqueKey', fragShader ),
    vert: MXP.hotGet( 'uniqueKey', vertShader ),
} );
// HMR時にhotUpdateで更新
import.meta.hot.accept( './shaders/xxx.fs', ( module ) => {
    mat.frag = MXP.hotUpdate( 'uniqueKey', module.default );
    mat.requestUpdate();
} );
```

## Serializableフィールドシステム

エディタUIでパラメータを編集可能にする仕組み。

```typescript
// 基本使用
this.field( "radius", () => this.radius, v => this.radius = v as number );

// フォルダ構造化
const settings = this.fieldDir( "Settings" );
settings.field( "value", () => this._value, v => this._value = v );

// セレクト形式
this.field( "deviceId", () => this._deviceId, v => { ... }, {
    format: { type: "select", list: () => this._deviceList }
} );

// 値変更通知（非同期でリストが変わった場合等）
this.noticeField( "fieldName" );
```

## コンストラクタ引数パターン

```typescript
// 引数なし（一般的）
constructor( params: MXP.ComponentParams ) { ... }

// カスタム引数あり
constructor( params: MXP.ComponentParams<{num?: number} | void> ) {
    const count = params.args?.num || 2048;
}
```

## disposeパターン

| パターン | 方法 | 該当 |
|---------|------|------|
| Mesh追加型 | `super.dispose(); this.entity.removeComponent( MXP.Mesh );` | Dust, FlashLine等 |
| タイマー管理型 | `this.once( "dispose", () => clearInterval(id) );` | VJCamera |
| 制御型 | disposeオーバーライド不要 | ObjectRotate, CameraOrbitAnim |

## order プロパティ
コンポーネントの実行順序を制御。デフォルト: 0。
- LookAt: `this.order = 9999`（他の位置更新より後に実行）
- CameraFloating: `this.order = 1`

## ディレクトリ構造規約

```
src/ts/Resources/Components/
├── <グループ名>/           ← カテゴリ別グループ
│   └── <コンポーネント名>/  ← PascalCase
│       ├── index.ts        ← export class Xxx extends MXP.Component（必須）
│       └── shaders/        ← シェーダーファイル（オプション）
│           ├── xxx.vs
│           └── xxx.fs
└── _PostProcess/           ← アンダースコアプレフィックスはスキャン対象外
```

- Viteプラグインが `export class Xxx` を自動検出して `componentList.ts` に登録
- 手動登録は不要

## 関連ファイル

| ファイル | 役割 |
|---------|------|
| `packages/maxpower/Component/index.ts` | Component基底クラス |
| `packages/maxpower/Serializable/index.ts` | フィールドシステム基底 |
| `src/ts/Globals/index.ts` | globalUniforms定義 |
| `plugins/ResourceManager/` | Viteプラグイン（自動登録） |

## 制約・注意点

- `_data/` 以下のファイル（componentList.ts等）は自動生成のため手動編集禁止
- ディレクトリ名が `_` 始まりのものは自動スキャン対象外（_PostProcess等）
- HMRのキー名はプロジェクト全体でユニークにする必要がある
- `Engine.getInstance(gl)` でgl contextが必要（`~/ts/Globals` からimport）
- Meshを追加したコンポーネントは必ずdisposeでremoveComponentすること
