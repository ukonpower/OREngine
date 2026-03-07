# Research: TextureResource導入 & シェーダー選択UIの統一

## タスク概要
1. テクスチャデータを `TextureResource` クラス（Serializable継承）で管理する（ShaderResource/MaterialResourceと同じパターン）
2. エディタのテクスチャ表示をSerializeFieldViewベースに統一する
3. シェーダーの選択UIをマテリアルと同じselectフォーマットにする

## 現状の分析

### テクスチャの現在の管理方法
- **プレーンオブジェクト**: `ResourceTextureItem = { name, frag?, resolution?, filter?, updateEveryFrame? }`
- `Resources`クラス内で `_textureList: ResourceTextureItem[]` として配列管理
- `_textures: Map<string, GLPowerTexture>` にテクスチャインスタンスを保持
- テクスチャリソースにはSerializableベースのクラスが**存在しない**

### ShaderResource（参考パターン）
- `GLP.EventEmitter` を継承（Serializableではない）
- `packages/orengine/ts/Engine/Resources/ShaderResource/index.ts`
- プロパティ: `name`, `source`
- `updateSource()` でソース更新 → `"update"` イベント発火
- シンプルなイベントエミッタパターン

### MaterialResource（参考パターン）
- `MXP.Serializable` を継承
- `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts`
- `field()` APIでエディタ表示可能なフィールドを定義:
  - `vert`: select形式（シェーダーリストからvert系をフィルタ）
  - `frag`: select形式（シェーダーリストからfrag系をフィルタ）
  - `phase`, `drawType`, `blending`, `useLight`, `depthTest`, `depthWrite`, `cullFace`
- `_buildShaderSelectList()` でシェーダー名に `/vert` `/frag` サフィックスでフィルタ
- シェーダーリソースの `"update"` イベントをリッスンしてマテリアル更新
- Propertyパネルでは `<SerializeFieldView target={resource} />` で自動表示

### テクスチャのエディタUI（現状）
- **TextureExplorer** (`packages/orengine/tsx/components/Panels/TextureExplorer/index.tsx`):
  - リストで表示、クリックで選択→TextureDetail表示
- **TextureDetail** (`TextureExplorer/TextureDetail/index.tsx`):
  - **手動のInputSelect/InputBoolean** でフィールドを個別に描画
  - shader, resolution(w/h), filter, updateEveryFrame
  - `Engine.resources.updateTextureResource()` を直接呼び出し
- **PropertyPanel（EntityProperty）** (`Panels/EntityProperty/index.tsx`):
  - `case "texture":` → `<TextureDetail name={asset.name} />` を表示
  - MaterialはSerializeFieldView、TextureはTextureDetail（手動）

### AssetViewer
- `packages/orengine/tsx/components/Panels/AssetViewer/`
- 4タイプ（component/material/shader/texture）を統合表示
- `buildEntries.ts` でアセット一覧を構築
- `AssetGrid` でアイコングリッド表示
- 選択時に `editor.setField("selectedAsset", ...)` で PropertyPanel に通知

### テクスチャデータの永続化
- **textureList.ts** (`src/ts/Resources/_data/textureList.ts`): ハードコードされたテクスチャリスト
- **サーバーAPI** (`server/routes/textures.ts`): `.tex` JSONファイルによるCRUD
- **EditorPage** (`src/tsx/components/pages/EditorPage/index.tsx`): 保存時に `exportTextureConfigs()` → PUT API → sync API

### Meshコンポーネントでのマテリアル選択
- `packages/maxpower/Component/Mesh/index.ts`
- `Mesh.getMaterialList` static callback → selectリスト生成
- `Mesh.getMaterialInstance` でインスタンス取得
- `field("name", ..., { format: { type: "select", list: () => ... } })` パターン

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Engine/Resources/index.ts` | `Resources`, `ResourceTextureItem`, `ResourceTextureData` | リソース管理の中心 |
| `packages/orengine/ts/Engine/Resources/ShaderResource/index.ts` | `ShaderResource` | シェーダーリソースクラス |
| `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` | `MaterialResource` | マテリアルリソースクラス（Serializable） |
| `packages/orengine/ts/Engine/TexProcedural/index.ts` | `TexProcedural` | プロシージャルテクスチャ生成 |
| `packages/orengine/tsx/components/Panels/TextureExplorer/index.tsx` | `TextureExplorer` | テクスチャ一覧UI |
| `packages/orengine/tsx/components/Panels/TextureExplorer/TextureDetail/index.tsx` | `TextureDetail` | テクスチャ詳細UI（手動描画） |
| `packages/orengine/tsx/components/Panels/TextureExplorer/TextureCreateForm/index.tsx` | `TextureCreateForm` | テクスチャ作成UI |
| `packages/orengine/tsx/components/Panels/MaterialExplorer/MaterialDetail/index.tsx` | `MaterialDetail` | マテリアル詳細UI（SerializeFieldView） |
| `packages/orengine/tsx/components/Panels/EntityProperty/index.tsx` | `EntityProperty`, `AssetPropertyView` | Property表示の切り替え |
| `packages/orengine/tsx/components/Panels/AssetViewer/buildEntries.ts` | `buildTextureEntries` | テクスチャのAssetViewerエントリ構築 |
| `packages/orengine/tsx/components/Panels/AssetViewer/AssetGrid/index.tsx` | `AssetGrid`, `deleteAsset` | アセットグリッドUI |
| `src/ts/Resources/index.ts` | `initResouces`, `initResourceInstances` | リソース初期化 |
| `src/ts/Resources/_data/textureList.ts` | `TEXTURELIST` | テクスチャ定義データ |
| `server/routes/textures.ts` | `texturesRouter` | テクスチャREST API |
| `src/tsx/components/pages/EditorPage/index.tsx` | - | 保存時テクスチャ同期 |
| `packages/maxpower/Component/Mesh/index.ts` | `Mesh` | マテリアル選択UIの参考実装 |

## 依存関係

- `Resources` → `ResourceTextureItem`（プレーンオブジェクト）: テクスチャリソースの定義
- `Resources` → `ShaderResource`: シェーダーリソースの管理
- `Resources` → `MaterialResource`: マテリアルリソースの管理
- `MaterialResource` → `ShaderResource`: シェーダーの参照と `"update"` イベント購読
- `TextureDetail` → `Resources.updateTextureResource()`: テクスチャ更新
- `TextureDetail` → `Resources.shaderList`: シェーダーリスト取得（テクスチャのshaderフィールド用）
- `EntityProperty` → `TextureDetail`: テクスチャ詳細表示（手動UI）
- `EntityProperty` → `SerializeFieldView`: マテリアル詳細表示（自動UI）
- `EditorPage` → `Resources.exportTextureConfigs()`: テクスチャ保存
- `TexProcedural` → フラグシェーダーソース: テクスチャ生成
- `Resources._buildTexture()` → `ResourceTextureItem.frag`: テクスチャの実体化

## 既存パターン

### MaterialResourceのSerializableパターン
- Serializable継承 → `field()` でUI表示用フィールド定義
- select形式のフィールド: `{ format: { type: "select", list: () => [...] } }`
- PropertyパネルではSerializeFieldViewコンポーネントで自動描画
- serialize/deserializeメソッドで永続化

### テクスチャのシェーダー選択（TextureDetail）
- 現在は全シェーダーリストを表示（vert/fragフィルタなし）
- `Engine.resources.shaderList` を直接参照
- InputSelectで表示（Serializableのfieldではない）

## 制約・注意点

1. **テクスチャリストの管理方式の変更**: 現在 `_textureList: ResourceTextureItem[]` → `Map<string, TextureResource>` に変更必要
2. **`exportTextureConfigs()` の互換性**: EditorPageからの保存処理が依存
3. **`buildTextureInstances()`**: ResourceTextureItemのfragプロパティを使ってTexProceduralを生成 → TextureResourceに移行時に対応必要
4. **`rebuildTexture()`**: テクスチャ再生成のロジック → TextureResourceに内包するか外に残すか
5. **テクスチャのシェーダーフィールド**: MaterialResourceと同様にShaderResourceを参照してフィルタリングすべき（fragのみ）
6. **`_applyTextureUniforms()`**: テクスチャ名でGLPowerTextureを取得 → TextureResource導入後も名前ベースのルックアップが必要
7. **TextureExplorer/TextureDetail**: TextureResourceがSerializableになればTextureDetailは不要になりSerializeFieldViewで代替可能
8. **initResouces()での登録方法**: `addTextureResource(name, data)` のシグネチャ変更が必要

## 参考になる既存実装

- **MaterialResource** (`packages/orengine/ts/Engine/Resources/MaterialResource/index.ts`):
  - Serializable継承、fieldでUI定義、シェーダー選択のselectパターン
  - `_buildShaderSelectList()` でシェーダーをvert/fragでフィルタ
- **Resources.addMaterial()**: MaterialResourceのインスタンス化とMapへの登録パターン
- **EntityProperty case "material"**: `SerializeFieldView` での表示
- **Mesh.field("material/name")**: select形式でマテリアルリストを表示するパターン
