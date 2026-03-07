# Research: BLidger glTFメッシュのマテリアル上書きが反映されない問題

## タスク概要
BLidgerのglTFタイプのメッシュに対して、エディタUIからマテリアルを上書き設定しても反映されなくなった。

## 根本原因

**BLidger glTFの非同期ロードが、ユーザー設定のマテリアルを常に上書きしている。**

### 実行順序の問題

`BLidgeClient.onSyncScene` が呼ばれた時の処理順:

1. **同期** エンティティツリー構築 → BLidgerコンストラクタ実行
   - `entity.addComponent(Mesh)` でMeshを追加（`packages/maxpower/Component/BLidger/index.ts:159`）
   - `this._blidge.gltfPrm.then(...)` でglTF非同期ロード開始（`:161`）
2. **同期** `applyAttachments(this.blidgeRoot)` 実行（`src/ts/Resources/Components/Utilities/BLidgeClient/index.ts:371`）
   - 保存済みのMeshプロパティをデシリアライズ
   - `_materialType` が復元 → `_rebuildMaterial()` → `this.material = ユーザー選択マテリアル` ✅
3. **非同期（後で実行）** glTF Promiseが解決（BLidger `:161-180`）
   - `mesh.material = gltfMesh.material` → **ユーザーのマテリアルを上書き** ❌

### 該当コード（BLidger:157-181）
```ts
} else if ( this.node.type == 'gltf' ) {
    const mesh = entity.addComponent( Mesh );
    this._blidge.gltfPrm.then( gltf => {
        const gltfEntity = gltf.scene.findEntityByName( this.node.name );
        if ( gltfEntity ) {
            const gltfMesh = gltfEntity.getComponent( Mesh );
            if ( gltfMesh ) {
                mesh.geometry = gltfMesh.geometry;
                mesh.material = gltfMesh.material;  // ← ここが常に上書き
            }
        }
        entity.noticeEventParent( "update/blidge/scene", [ entity ] );
    } );
}
```

**ポイント**: `gltfPrm` が既にresolveされていても、`.then()` コールバックはマイクロタスクキューに入るため、同期処理（applyAttachments）の**後**に必ず実行される。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Component/BLidger/index.ts` | `BLidger` | Blenderノードからエンティティを構築。glTFメッシュのgeometry/materialを設定 |
| `src/ts/Resources/Components/Utilities/BLidgeClient/index.ts` | `BLidgeClient`, `applyAttachments`, `serializeAttachments` | シーン同期、ユーザーのコンポーネント設定（attachments）の保存・復元 |
| `packages/maxpower/Component/Mesh/index.ts` | `Mesh`, `_materialType`, `_rebuildMaterial` | メッシュコンポーネント。`material/name` フィールドでマテリアル選択、`_rebuildMaterial()` で反映 |
| `packages/maxpower/Component/Renderer/index.ts:817-820` | Renderer (renderPass内) | 描画時に `MaterialOverride` → `mesh.material` の優先順位でマテリアルを決定 |
| `packages/maxpower/Component/MaterialOverride/index.tsx` | `MaterialOverride` | タグ `"materialOverride"` によるマテリアル上書きコンポーネント（現在どこからも追加されていない） |

## 依存関係

- `BLidgeClient.onSyncScene` → `BLidger` constructor → `Mesh.addComponent`
- `BLidgeClient.onSyncScene` → `applyAttachments` → `Mesh.deserialize` → `_rebuildMaterial`
- `BLidger` constructor → `gltfPrm.then` (async) → `mesh.material = ...` (上書き)
- `Mesh._rebuildMaterial` → `Mesh.getMaterialInstance` → `Engine.resources.getMaterialInstance`

## 既存パターン

- **attachments機構**（`ccef9f9`で追加）: BLidgeClient がBLidgeエンティティのユーザー追加コンポーネント・設定をシリアライズ/デシリアライズする仕組み。`onSyncScene` のエンティティツリー構築後に `applyAttachments` を呼ぶ。
- **Mesh.material/nameフィールド**: Meshの `material/name` フィールドでマテリアル名を選択し、`_rebuildMaterial()` で `Mesh.getMaterialInstance` 経由でインスタンスを取得・設定。
- **MaterialOverrideコンポーネント**: Renderer描画時に `getComponentsByTag("materialOverride")` でチェック。存在すればそのマテリアルを使用。ただし現在コンポーネントリストに登録されておらず、コード上どこからも `addComponent` されていない。

## 修正方針の候補

### 案1: BLidgerでユーザー設定マテリアルを保護（推奨）
BLidgerのglTFコールバック内で、Meshに既にユーザー設定のマテリアルがある場合は上書きしない。
- `Mesh` に `_materialType` の公開ゲッター（例: `get materialType()`）を追加
- BLidger側で `if (!mesh.materialType) mesh.material = gltfMesh.material;` とする
- `getMaterialInstance` が undefined を返す場合のフォールバックとしてglTFマテリアルも保持

### 案2: BLidgeClientで glTFロード後にattachmentsを再適用
BLidger の glTFコールバックが `update/blidge/scene` イベントを発火するので、BLidgeClient側でこれを受けて `applyAttachments` を再度呼ぶ。
- 問題点: 毎回全attachmentsを再適用するのは無駄が大きい。イベントの重複発火にも注意が必要。

### 案3: BLidgerにglTF materialのみ別保持
BLidgerがglTFのmaterialを `gltfMaterial` として保持し、Meshにはgeometryのみ設定。materialの設定はMeshの `_rebuildMaterial` に任せ、フォールバックとしてglTFマテリアルを使う。
- 大きなリファクタリングが必要

## 制約・注意点
- `_materialType` は `Mesh` のprivateフィールド。外部からアクセスするにはgetterの追加が必要。
- glTFのgeometryは常にセットすべき（ユーザーがgeometryを上書きするケースは想定しない）。
- `applyAttachments` は `onSyncScene` の度に呼ばれるため、WebSocket再接続時にも正しく動作する必要がある。
- `Mesh.getMaterialInstance` が undefined を返す場合（リソース未ロード時）は、glTFのmaterialをフォールバックとして使うべき。

## 参考になる既存実装
- `BLidger` の cube/sphere/cylinder/plane タイプ: geometryのみ設定し、materialはMeshのデフォルトまたはユーザー設定に任せている。glTFだけが geometry + material の両方を上書きしている点が異なる。
