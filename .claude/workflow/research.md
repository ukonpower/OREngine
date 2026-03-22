# Research: Renderer Sky設定のデフォルトシェーダー復元問題

## タスク概要
エディタでRendererのSky設定（マテリアル/シェーダー）を一度変更すると、デフォルトのシェーダーに戻せなくなる問題への対応を検討する。

## 現状の仕組み

### RendererSky クラス (`packages/maxpower/Component/Renderer/index.ts:25-106`)

- コンストラクタでデフォルトMaterialを生成（`this.material`）
  - `skyFrag`（`shaders/sky.fs`）をフラグメントシェーダーとして使用
  - uniforms: `uSkyColor`, `uGroundColor`, `uSkyIntensity`
- `_materialType: string` でカスタムマテリアル名を管理（デフォルト: `""`）
- `materialType` setter → `_rebuildMaterial()`:
  - `""` → `this.mesh.material = this.material`（デフォルト復元）
  - それ以外 → `Mesh.getMaterialInstance(name)` でカスタムマテリアルに切替

### Renderer側のフィールド定義 (`index.ts:388-426`)

```ts
// sky/material フィールド
skyDir.field( "material",
    () => this.sky.materialType,
    ( v: string ) => { this.sky.materialType = v; },
    {
        format: {
            type: "resource",
            resourceType: "material",
            list: () => {
                const list = [ { label: "(Default)", value: "" } ];
                Mesh.getMaterialList().forEach( m => list.push( { label: m.name, value: m.name } ) );
                return list;
            }
        }
    }
);
```

**重要**: `{ label: "(Default)", value: "" }` が選択肢に含まれており、UIドロップダウンで "(Default)" を選べばデフォルトに戻る仕組み自体は存在する。

### シリアライズ・デシリアライズ

- `Engine.field("renderer")` で Renderer の全フィールドがプロジェクト保存時にシリアライズされる
- `sky/material: ""` もシリアライズ対象 → 空文字列でもフィールドは保存される
- デシリアライズ時: `field.set("")` → `sky.materialType = ""` → デフォルト復元

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Component/Renderer/index.ts` | `RendererSky`, `Renderer` | Sky管理、フィールド定義 |
| `packages/maxpower/Component/Renderer/shaders/sky.fs` | - | デフォルトSkyシェーダー |
| `packages/maxpower/Serializable/index.ts` | `Serializable` | フィールドシステム基盤 |
| `packages/orengine/tsx/components/Panels/RendererSettings/index.tsx` | `RendererSettings` | エディタUI |
| `packages/orengine/tsx/components/Input/InputResourceSelect/index.tsx` | `InputResourceSelect` | リソース選択UI |
| `packages/orengine/tsx/components/Input/InputSelect/index.tsx` | `InputSelect` | セレクトボックスUI |
| `packages/orengine/tsx/components/Value/index.tsx` | `Value` | フィールド値描画分岐 |
| `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` | `MaterialResource` | マテリアルリソース管理 |
| `packages/orengine/ts/Engine/index.ts` | `Engine` | Rendererフィールド登録 |

## 依存関係

- `RendererSettings` → `SerializeFieldView` → `Value` → `InputResourceSelect` → `InputSelect`
- `Renderer.field("sky/material")` → `RendererSky.materialType` setter → `_rebuildMaterial()`
- `_rebuildMaterial()` → `Mesh.getMaterialInstance()` (カスタム) or `this.material` (デフォルト)
- `Engine.field("renderer")` → `Renderer.serialize/deserialize` （プロジェクト保存/読み込み）

## 問題の分析

### 現状で「戻せる」部分
- **sky/material フィールド**: ドロップダウンに "(Default)" オプションがあり、選択すれば `materialType = ""` → デフォルトシェーダーに復元される

### 現状で「戻せない」可能性がある部分

1. **UXの発見しにくさ**: "(Default)" オプションが存在することがユーザーにとって直感的でない可能性
2. **色/強度のリセット不可**: `skyColor`, `groundColor`, `intensity` にはリセット機構がない
   - デフォルト値: `skyColor=(1,1,1)`, `groundColor=(0.3,0.3,0.3)`, `intensity=1.0`
   - 一度変更すると、元の値を覚えていないと戻せない
3. **一括リセット不可**: Sky設定全体を「初期状態に戻す」ボタンがない
4. **MaterialResource内のシェーダー選択**: MaterialResource の vert/frag フィールドは `(None)` がデフォルトで、「デフォルトに戻す」概念がない（これは今回のスコープ外かもしれない）

## 既存パターン

### リソース選択のデフォルト値パターン
- `sky/material`: `{ label: "(Default)", value: "" }` — 空文字列でデフォルトに戻る
- `MaterialResource.drawType`: `{ label: "(Default)", value: "" }` — 同様のパターン
- `MaterialResource.vert/frag`: `{ label: "(None)", value: "" }` — 「なし」を意味する空文字列

### Serializableフィールドシステムの制約
- フィールドに `defaultValue` 概念がない
- 個別フィールドの「リセット」UIが存在しない
- getter/setter のみで、初期値の記録/復元の仕組みがない

## 制約・注意点

- `RendererSky.material`（デフォルトMaterial）はリソースシステムに登録されていない内部オブジェクト
- デフォルトシェーダー `sky.fs` は `import skyFrag from './shaders/sky.fs'` で直接読み込み
- `Mesh.getMaterialList()` にはリソースシステム登録済みのマテリアルのみが含まれる
- Serializableフィールドシステム全体に「デフォルト値」の概念を追加すると影響が大きい

## 対応案

### 案A: Sky設定に「デフォルトに戻す」ボタンを追加（最小スコープ）
- RendererSettings UIに「Reset Sky」ボタンを追加
- クリック時に `skyColor=(1,1,1)`, `groundColor=(0.3,0.3,0.3)`, `intensity=1.0`, `material=""` に一括リセット
- **メリット**: 実装が簡単、影響範囲が小さい
- **デメリット**: Sky専用の解決策

### 案B: Serializableフィールドに `defaultValue` を追加（汎用）
- `field()` の opt に `defaultValue` を追加
- UIに各フィールドの「リセット」アイコンを表示
- **メリット**: 全フィールドで使える汎用的な仕組み
- **デメリット**: Serializable全体の変更が必要、影響範囲が大きい

### 案C: materialフィールドの現状維持 + 色/強度にのみリセット対応
- material ドロップダウンの "(Default)" は既に動作するので変更不要
- `skyColor`, `groundColor`, `intensity` にデフォルト値リセットを追加
- **メリット**: 本当に必要な箇所だけ対応

## 参考になる既存実装

- `MaterialResource.drawType` のデフォルト選択肢パターン (`index.ts:182-186`)
- `MaterialResource._buildShaderSelectList` の `(None)` パターン (`index.ts:361-378`)
- `InputResourceSelect` の編集ボタン表示制御 (`value` が truthy の場合のみ表示)
