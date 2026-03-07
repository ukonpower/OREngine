# Research: リソース選択UIの編集ボタン追加 & 右パネル上下分割

## タスク概要
1. **リソース選択UIに「編集ボタン」を追加** - Meshのmaterial/nameセレクト等で、選択中のリソース名の横に「編集」ボタンを配置。押すとAssetViewerでそのアセットが選択され、下部のアセット編集パネルで編集できる
2. **右パネルの上下分割** - 現在EntityPropertyとAssetPropertyが同じパネルで排他表示されている。右パネルを上下に分割し、上=EntityProperty、下=AssetProperty（独立した編集エリア）にする

## 現状の構造

### レイアウト（PC版）
```
┌─────────┬────────────────────┬──────────┐
│ Scene   │     Screen         │ Property │ ← PanelContainer (Property/Project/Renderer タブ)
│ (左300px)│                    │ (右300px) │
│         ├────────────────────┤          │
│ Timer   │     Assets         │          │
│         │     (下200px)       │          │
└─────────┴────────────────────┴──────────┘
│                  Timeline (下160px)       │
└──────────────────────────────────────────┘
```
- 右パネル: `PanelContainer` に Property/Project/Renderer の3タブ
- Property: `EntityProperty` コンポーネント1つが入っている

### EntityProperty の動作
- `propertyTarget` フィールド（"entity" | "asset"）で表示内容を**排他的に**切り替え
- `selectedEntityId` → エンティティのプロパティを表示
- `selectedAsset` → AssetPropertyView を表示（material/texture/component/shader）
- エンティティ選択時 → `propertyTarget = "entity"` に自動切替
- アセット選択時 → `propertyTarget = "asset"` に自動切替

### AssetViewer の動作
- 下部パネルにグリッド表示（Components/Materials/Shaders/Textures フォルダ）
- アイテムクリック → `editor.setField("selectedAsset", ...)` → EntityPropertyがアセット表示に切り替わる
- `AssetGrid` でアイテムを選択、右クリックでコンテキストメニュー（Open in Editor / Delete）

### リソース選択UI（InputSelect）
- `format: { type: "select", list: ... }` で定義
- `Value` → `InputSelect` → ネイティブ `<select>` で描画
- Mesh の `material/name`: `Mesh.getMaterialList()` からセレクトリスト生成
- MaterialResource の `vert`/`frag`: シェーダーセレクトリスト
- TextureResource の `frag`: シェーダーセレクトリスト
- MaterialResource の uniform sampler2D: `_textureResources` からテクスチャリスト

## 関連ファイル・シンボル

### レイアウト・パネル
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/tsx/components/OREditor/index.tsx` | `OREditor` | エディタ全体レイアウト定義 |
| `packages/orengine/tsx/components/LayoutSplit/index.tsx` | `LayoutSplit`, `LayoutSplit.Item` | パネル分割コンポーネント |
| `packages/orengine/tsx/components/Panel/index.tsx` | `Panel` | パネルラッパー |
| `packages/orengine/tsx/components/PanelContainer/index.tsx` | `PanelContainer`, `PanelContainer.Tab` | タブ付きパネルコンテナ |

### プロパティ表示
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/tsx/components/Panels/EntityProperty/index.tsx` | `EntityProperty`, `AssetPropertyView` | プロパティパネル本体 |
| `packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx` | `ComponentView` | コンポーネント表示 |
| `packages/orengine/tsx/components/Panels/EntityProperty/ComponentList/index.tsx` | `ComponentList` | コンポーネント一覧 |
| `packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx` | `SerializeFieldViewValue` | フィールド値の描画 |

### アセットビューワー
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/tsx/components/Panels/AssetViewer/index.tsx` | `AssetViewer` | アセット一覧パネル |
| `packages/orengine/tsx/components/Panels/AssetViewer/AssetGrid/index.tsx` | `AssetGrid` | アセットグリッド表示 |

### 入力コンポーネント
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/tsx/components/Input/InputSelect/index.tsx` | `InputSelect` | セレクトボックス（ネイティブ`<select>`） |
| `packages/orengine/tsx/components/Value/index.tsx` | `Value` | 値の型に応じた入力コンポーネント分岐 |

### エディタ状態管理
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Editor/index.ts` | `Editor`, `SelectedAssetInfo` | エディタ状態管理 |
| `packages/orengine/tsx/components/OREditor/Hooks/useOREditorContext/index.tsx` | `useOREditorContext` | エディタコンテキスト |
| `packages/orengine/tsx/components/OREditor/Context/OREditorContext/index.tsx` | `OREditorContext` | コンテキストProvider |

### リソース管理
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Component/Mesh/index.ts` | `Mesh` | material/name フィールド定義（format: select） |
| `packages/orengine/ts/Engine/Resources/index.ts` | `Resources` | リソース管理全体 |
| `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` | `MaterialResource` | マテリアルリソース |
| `packages/orengine/ts/Engine/Resources/TextureResource/index.ts` | `TextureResource` | テクスチャリソース |
| `packages/maxpower/Serializable/index.ts` | `SerializableFieldFormat` 等 | フィールドフォーマット型定義 |

## 依存関係
- `OREditor` → `LayoutSplit` + `PanelContainer` → `EntityProperty` / `AssetViewer`
- `EntityProperty` → `useSerializableField(gui, "propertyTarget")` / `useSerializableField(gui, "selectedAsset")`
- `AssetViewer.onSelect()` → `editor.setField("selectedAsset", ...)` → `Editor._propertyTarget = "asset"` → `EntityProperty` がアセット表示に切替
- `Value` → `format.type == "select"` → `InputSelect`
- `Mesh.material/name` → `format: { type: "select", list: getMaterialList() }`

## 既存パターン

### フィールドフォーマットの種類
- `vector`: ベクトル入力
- `select`: セレクトボックス（`list` にSelectList配列）
- `array`: 配列入力
- `entity`: エンティティ参照（InputEntityRef）
- `component`: コンポーネント参照（InputComponentRef）

### 「リソース参照型select」のパターン
material/nameやuniform sampler2D等は `format: { type: "select" }` で、`list` にリソース名一覧を返す関数を渡している。現状これらは「どのリソースタイプを参照しているか」の情報を持たない。

### エディタ状態の切替パターン
- `editor.setField("selectedEntityId", id)` → 自動で `propertyTarget = "entity"`
- `editor.setField("selectedAsset", info)` → 自動で `propertyTarget = "asset"`
- 排他制御: エンティティ選択するとアセット表示が消え、アセット選択するとエンティティ表示が消える

## 制約・注意点

1. **排他表示の廃止が必要**: 現在EntityPropertyはentity/assetの排他表示。上下分割するにはこの排他ロジックを変更する必要がある
2. **format.type拡張の検討**: 「編集ボタン付きselect」を実現するには、formatに `resourceType` 等の情報を追加するか、新しいformat typeを追加する必要がある
3. **InputSelectの拡張**: ネイティブ`<select>`の横にボタンを追加するか、新しいコンポーネント（InputResourceSelect等）を作る必要がある
4. **AssetViewerとの連携**: 編集ボタン押下時にAssetViewerのナビゲーション（currentPath）を適切なフォルダに移動させる必要がある
5. **モバイルレイアウト**: PC版とモバイル版で別レイアウトがある。モバイル版への対応も考慮が必要

## 参考になる既存実装
- `InputEntityRef` / `InputComponentRef`: `InputSelect` を拡張したリソース参照入力の例
- `AssetGrid` の `buildContextMenu`: アセットの右クリックメニュー（Open in Editor / Delete）
- `MaterialExplorer`: マテリアル一覧+詳細表示の独立パネル（現在は使われていない可能性あり）
- `Editor.field("selectedAsset", ...)`: アセット選択状態の管理パターン
