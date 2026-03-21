# Research: ヘルパー選択時のワイヤーフレーム色変更

## タスク概要
メッシュを持つエンティティを選択するとアウトラインが出るが、ヘルパー（empty, camera, light等のワイヤーフレーム表示）はMeshコンポーネントを持たないためアウトラインが出ず、選択状態がわかりづらい。ヘルパーのワイヤーフレームの色を選択中に変更して視覚的フィードバックを追加する。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Editor/Helpers/EntityHelper.ts` | `EntityHelper` | ヘルパーのワイヤーフレーム描画エンティティを生成。各タイプ毎に色を`uColor` uniformで設定 |
| `packages/orengine/ts/Editor/HelperManager/index.ts` | `HelperManager` | ヘルパーの生成・管理・レンダリング。`render()`で全ヘルパーを描画 |
| `packages/orengine/ts/Editor/SelectionOutline/index.ts` | `SelectionOutline` | 選択エンティティのアウトライン描画。**Meshコンポーネントがないとスキップ**（L53） |
| `packages/orengine/ts/Editor/index.ts` | `Editor` | 描画順序を統括。`_animate()`内で helper→wireframe→gizmo→outline の順に描画 |
| `packages/orengine/ts/Editor/shaders/gizmo.fs` | - | ヘルパー/Gizmoの共通フラグメントシェーダー。`uniform vec3 uColor`で色を出力 |

## 依存関係
- `Editor._animate()` → `HelperManager.render()` → `EntityHelper`のエンティティを`renderCamera`で描画
- `Editor._animate()` → `SelectionOutline.render()` → 選択エンティティのMeshがある場合のみアウトライン描画
- `EntityHelper`のマテリアルは`uColor` uniformで色を設定（コンストラクタで固定値）
- `HelperManager.render()`は現在`selectedEntity`の情報を受け取っていない

## 既存パターン

### ヘルパーの色設定（EntityHelper._getColor）
```ts
case 'empty': return [ 0.8, 0.5, 0.2 ];
case 'camera': return [ 0.6, 0.8, 1.0 ];
case 'spotLight': return [ 1.0, 0.9, 0.4 ];
case 'directionalLight': return [ 1.0, 0.9, 0.4 ];
```
色はコンストラクタ時にMaterial uniformの`value`配列に設定され、その後変更されない。

### Materialのuniforms構造
```ts
const mat = new MXP.Material( {
    uniforms: { uColor: { value: color, type: '3fv' } },
} );
```
`value`は配列参照で渡されているため、この配列の要素を書き換えればGPUに反映される。

### SelectionOutlineのスキップ条件
```ts
const mesh = selectedEntity.getComponent( MXP.Mesh );
if ( ! mesh ) return; // ヘルパー対象のエンティティはMeshなしなのでスキップ
```

### Editor._animate()の描画順序（関連部分）
```ts
this._helperManager.render( cameraMode, cameraEntity, engine );
this._wireframeRenderer.render( cameraMode, cameraEntity, engine );
this._gizmoManager.render( selectedEntity, cameraEntity, engine );
this._selectionOutline.render( selectedEntity, cameraEntity, engine );
```
HelperManager.render()にはselectedEntityが渡されていない。

## 制約・注意点

1. **HelperManager.render()にselectedEntityを渡す必要がある**: 現在のシグネチャは`render(cameraMode, cameraEntity, engine)`で選択情報がない
2. **EntityHelperの色は参照渡しの配列**: `uColor`のvalue配列の要素を直接書き換えれば色変更可能。新しい配列を代入する必要はない
3. **毎フレーム色を設定する必要がある**: 選択が解除されたら元の色に戻す必要がある
4. **選択色はSelectionOutlineと統一感を持たせるべき**: SelectionOutlineの色は`new GLP.Vector( 1.0, 0.6, 0.0 )`（オレンジ系）

## 実装方針

### HelperManagerで選択ヘルパーの色を変更
1. `EntityHelper`に`setSelected(selected: boolean)`メソッドを追加
   - 選択時: `uColor`の値を選択色（例: `[1.0, 0.6, 0.0]` SelectionOutlineと同じオレンジ）に変更
   - 非選択時: 元の色に戻す
   - 元の色は`_baseColor`として保持
2. `HelperManager.render()`に`selectedEntityId`引数を追加
3. render()内のtraverse時に、entityのUUIDがselectedEntityIdと一致するかチェックし、`setSelected()`を呼ぶ
4. `Editor._animate()`の`_helperManager.render()`呼び出しにselectedEntityのIDを渡す

### 変更箇所まとめ
1. `EntityHelper`: `_baseColor`プロパティ追加、`setSelected()`メソッド追加
2. `HelperManager.render()`: シグネチャに`selectedEntityId`追加、render内で選択色切り替え
3. `Editor._animate()`: `_helperManager.render()`にselectedEntityId を渡す
