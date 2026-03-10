# Research: スクリプト生成Meshのgeometry/materialフィールド編集制御

## タスク概要

- スクリプト（Componentコード）から追加されたMeshのgeometry/materialフィールドはエディタで編集不可にしたい
- ユーザーがエディタから手動追加したMeshのgeometry/materialフィールドはエディタで編集可にしたい

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Serializable/index.ts` | `Serializable`, `SerializableFieldOpt`, `fieldDir()` | フィールド定義の基底。`hidden` オプションで表示/非表示を制御 |
| `packages/maxpower/Component/Mesh/index.ts` | `Mesh` | geometry/materialフィールドを `fieldDir()` で定義 |
| `packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx` | `ComponentView`, `disableEdit` | `component.initiator !== "user"` で `data-disable_component` を設定（CSS opacity 0.5のみ） |
| `packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx` | `SerializeFieldViewDir` | `opt.hidden` を評価してフィールドの表示/非表示を決定 |
| `packages/orengine/ts/Editor/Commands/AddComponentCommand/index.ts` | `AddComponentCommand` | エディタからのコンポーネント追加時に `initiator = "user"` をセット |

## initiator の仕組み

- `Serializable` のデフォルト: `this.initiator = 'script'`
- エディタから追加: `AddComponentCommand.execute()` で `this.instance.initiator = "user"`
- スクリプトから追加: initiator は "script" のまま（デフォルト）
- God系（Gizmo/Helper）: `initiator = "god"`

## 現状の編集制御

```tsx
// ComponentView/index.tsx
const disableEdit = component.initiator !== "user";
// → data-disable_component="true" で CSS opacity: 0.5 を適用するだけ
// → 実際にフィールドの編集は防げていない（入力は操作可能）
```

`SerializeFieldView` / `SerializeFieldViewValue` には `readOnly` の概念は伝わっていない。

## fieldDir の hidden オプション

```typescript
// Serializable/index.ts
public fieldDir( name:string, opt?: SerializableFieldOpt ) {
    this.field( dir + "/", () => null, undefined, { ...opt, isFolder: true } );
    // → フォルダ自体の opt (hidden 含む) が serializeToDirectory() で保持される
    ...
}
```

`SerializeFieldViewDir` は各フィールド（フォルダ含む）の `opt.hidden` を評価し、`true` ならそのエントリをスキップ（描画しない）。

`hidden` には関数 `(value) => boolean` を渡せるため、**実行時に `this.initiator` を参照して動的に制御できる**。

## 実装方針

`Mesh/index.ts` の `fieldDir` 呼び出しに `hidden` オプションを追加する:

```typescript
const geo = this.fieldDir( "geometry", {
    hidden: () => this.initiator !== "user"
} );

const mat = this.fieldDir( "material", {
    hidden: () => this.initiator !== "user"
} );
```

- `initiator` が `"user"` でない場合（= スクリプト由来）→ geometry/material フォルダごと非表示
- `initiator` が `"user"` の場合（= エディタ追加）→ 通常表示

## 依存関係

- `Mesh` → `fieldDir()` → `Serializable.field()` でフォルダのoptを格納
- `serializeToDirectory()` → フォルダの opt を子ノードに付与
- `SerializeFieldViewDir` → `opt.hidden` を評価してスキップ

## 制約・注意点

- `hidden` 関数はレンダリングのたびに評価される。構築時ではなく実行時に `this.initiator` を参照するため、コンストラクタ完了後に `initiator` が `"user"` へ変更されても正しく動作する
- 変更対象は `packages/maxpower/Component/Mesh/index.ts` のみ（最小変更）
- geometry/material フォルダ全体が非表示になる（子フィールドも含む）
- `fieldDir` の2つ目引数 `opt` は既存コードで使われていない → 安全に追加可能

## 参考になる既存実装

- `geo.field("width", ..., { hidden: () => this._geometryType !== "Cube" && ... })` → 既存の条件付き hidden の使用例
- `SerializeFieldViewDir/index.tsx` L25-37: hidden の評価ロジック
