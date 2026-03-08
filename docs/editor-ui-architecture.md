# OREngine エディタ UI アーキテクチャ仕様

エディタUIの React コンポーネント構造、hooks、状態管理の内部仕様。

---

## 全体構造

```
EditorPage (src/tsx/components/pages/EditorPage/)
  └─ OREngine (packages/orengine/tsx/components/OREngine/)
       └─ OREditor (packages/orengine/tsx/components/OREditor/)
            ├─ LayoutSplit (レイアウト分割)
            │    ├─ Hierarchy (エンティティツリー)
            │    ├─ Screen (3Dビューポート)
            │    ├─ EntityProperty / AssetProperty (プロパティ)
            │    ├─ AssetViewer (リソース一覧)
            │    ├─ Timeline (アニメーション)
            │    └─ ...
            ├─ MouseMenu (右クリックメニュー)
            └─ InputWindow (モーダル入力)
```

---

## Context 体系

### OREngineContext

```typescript
// Provider: OREngine コンポーネント内
// Value: { engine: Engine, load: (data) => void }
const { engine } = useOREngine();
```

Engine インスタンスのライフサイクルを管理。プロジェクトデータのロード関数を提供。

### OREditorContext

```typescript
// Provider: OREditor コンポーネント内
// Value: { engine: Engine, editor: Editor, projectName?: string }
const { editor, engine, projectName } = useOREditor();
```

Editor と Engine の両方にアクセスできる主要コンテキスト。ほとんどのパネルコンポーネントがこれを使用。

### MouseMenuContext

```typescript
// Provider: OREditor コンポーネント内
// Value: { pushContent, closeAll, containerRef }
const { pushContent, closeAll } = useMouseMenu();

// 使用例: 右クリックメニュー
pushContent( <Picker list={items} onPick={handlePick} /> );
```

### InputWindowContext

```typescript
// Provider: OREditor コンポーネント内
// Value: { open, close }
const { open: openInputWindow } = useInputWindow();

// 使用例: モバイルでのテキスト入力
openInputWindow({ type: "text", value: currentValue, onSubmit: handleSubmit });
```

### SerializeFieldViewContext

```typescript
// Provider: SerializeFieldView コンポーネント内
// Value: { target: Serializable }
const { target } = useSerializeFieldView();
```

---

## 主要 Hooks

### useWatchSerializable

```typescript
function useWatchSerializable(
  serializable: Serializable | undefined,
  deps?: string[]
): { fields: SerializeField }
```

Serializable の `"fields/update"` イベントをリッスンし、フィールド値が変更されたら再描画をトリガーする。

- `deps` を指定すると、そのパスに関係する変更のみで再描画
- `deps` 省略時は全てのフィールド変更で再描画

```typescript
// 全フィールドを監視
const { fields } = useWatchSerializable( entity );

// 特定フィールドのみ監視
const { fields } = useWatchSerializable( editor, [ "selectedEntityId" ] );
```

### useSerializableField

```typescript
function useSerializableField<T>(
  serializable: Serializable,
  path: string
): [T | undefined, (value: T) => void]
```

単一フィールドの値と setter を提供する React フック。内部で `useWatchSerializable` を使用。

```typescript
const [gizmoMode, setGizmoMode] = useSerializableField<string>( editor, "gizmoMode" );
```

### useLayout

```typescript
function useLayout(): { isPC: boolean, isSP: boolean }
```

ウィンドウ幅に応じたレスポンシブレイアウト判定。閾値は 900px。

- `isPC = true`: 幅 > 900px（デスクトップレイアウト）
- `isSP = true`: 幅 ≤ 900px（モバイルレイアウト）

---

## Editor クラス（TypeScript 側）

**ファイル**: `packages/orengine/ts/Editor/index.ts`

Editor は `Serializable` を継承し、エディタの状態をフィールドシステムで管理する。

### 主要フィールド

| フィールドパス | 型 | 説明 |
|--------------|-----|------|
| `enableRender` | boolean | レンダリング有効/無効 |
| `resolutionScale` | number | 解像度スケール（0.125〜1.0） |
| `resolution/width` | number | 解像度幅 |
| `resolution/height` | number | 解像度高さ |
| `viewType` | string | `"render"` or `"debug"` |
| `cameraMode` | string | `"scene"` or `"preview"` |
| `gizmoMode` | string | `"translate"`, `"rotate"`, `"scale"` |
| `helpers/show` | boolean | ヘルパー表示 |
| `helpers/wireframe` | boolean | ワイヤーフレーム表示 |
| `helpers/empty` | boolean | 空エンティティ表示 |
| `helpers/camera` | boolean | カメラヘルパー表示 |
| `helpers/light` | boolean | ライトヘルパー表示 |
| `camera/position` | number[3] | エディタカメラ位置 |
| `camera/target` | number[3] | エディタカメラターゲット |
| `frameLoop/enabled` | boolean | フレームループ有効 |
| `frameLoop/start` | number | ループ開始フレーム |
| `frameLoop/end` | number | ループ終了フレーム |

### 選択状態（フィールドではなくプロパティ）

```typescript
editor.selectedEntityId: string | null     // 選択中エンティティのUUID
editor.selectedAsset: SelectedAssetInfo | null  // 選択中アセット
editor.propertyTarget: "entity" | "asset"  // プロパティパネルの表示対象
```

### 主要メソッド

```typescript
editor.selectEntity( entity | null )      // エンティティ選択
editor.createEntity( parent, name )       // エンティティ作成
editor.deleteEntity( entity )             // エンティティ削除
editor.save()                             // 保存イベント発火
editor.exportEditor()                     // エディタ状態をシリアライズ
editor.exportEngine()                     // エンジン状態をシリアライズ
```

### イベント

```typescript
editor.on( "save", ( projectData, editorData ) => { ... } );
```

### 内部マネージャ

| マネージャ | 役割 |
|-----------|------|
| `EditorCamera` | オービットカメラ制御 |
| `GizmoManager` | Transform ギズモ（移動/回転/スケール）の描画 |
| `HelperManager` | シーンヘルパー（軸、グリッド等）の描画 |
| `WireframeRenderer` | ワイヤーフレームモードの描画 |
| `SelectionOutline` | 選択エンティティのアウトライン描画 |
| `PointerHandler` | マウス/ポインタ入力処理 |
| `KeyboardHandler` | キーボードショートカット処理 |
| `FrameDebugger` | フレームデバッガー |
| `CommandManager` | Undo/Redo 管理 |

---

## OREditor コンポーネント

**ファイル**: `packages/orengine/tsx/components/OREditor/index.tsx`

### Props

```typescript
interface OREditorProps {
  onSave?: OREditorSaveCallback;
  editorData?: MXP.SerializeField;
  projectName?: string;
  midiMixController?: MIDIMIXController;
}
```

### レイアウト

`useLayout()` でPC/モバイルを判定し、異なるレイアウトを提供:

**PC レイアウト**（幅 > 900px）:
```
┌─────────────┬───────────────────┬────────────────┐
│ Hierarchy   │                   │ EntityProperty │
│ (300px)     │   Screen          │ (300px)        │
│             │   (flex)          │                │
│ GPUTimer    │                   │ AssetProperty  │
│             ├───────────────────┤ (35%)          │
│             │ AssetViewer       │                │
├─────────────┴───────────────────┴────────────────┤
│ Timeline (160px)                                  │
└───────────────────────────────────────────────────┘
```

**モバイルレイアウト**（幅 ≤ 900px）:
- タブベースの切り替え式
- Scene/Property, Assets, Project, Renderer, MIDI, Timeline

---

## LayoutSplit コンポーネント

**ファイル**: `packages/orengine/tsx/components/LayoutSplit/index.tsx`

Flexbox ベースのパネル分割コンポーネント:

```tsx
<LayoutSplit direction="horizontal">
  <LayoutSplit.Item size="300px">
    {/* 固定幅パネル */}
  </LayoutSplit.Item>
  <LayoutSplit.Item flex={1}>
    {/* 残りを埋めるパネル */}
  </LayoutSplit.Item>
</LayoutSplit>
```

**LayoutSplit.Item の Props**:

| Prop | 型 | 説明 |
|------|-----|------|
| `flex` | number | flex-grow 値（デフォルト: 1） |
| `size` | string | 固定サイズ（例: "300px", "35%"）。指定時は flex-grow=0 |
| `overflow` | boolean | overflow: auto を有効化 |
| `padding` | boolean | 内側にパディングを追加 |

---

## パネル一覧

**ファイル**: `packages/orengine/tsx/components/Panels/`

| パネル | 説明 |
|-------|------|
| `Screen` | 3Dビューポート。WebGLキャンバスのマウント、カメラ/ギズモ操作、表示オプションオーバーレイ |
| `Hierarchy` | エンティティツリー表示。再帰的に HierarchyNode を描画。エンティティの作成・削除・選択 |
| `EntityProperty` | 選択エンティティの transform とコンポーネント一覧を表示・編集 |
| `AssetViewer` | リソース（Components/Materials/Shaders/Textures）のグリッド表示、パンくずナビ |
| `AssetProperty` | 選択アセットの詳細プロパティ表示。マテリアル/テクスチャ/コンポーネント/シェーダー |
| `Timeline` | タイムラインコントロール。キーフレーム編集、ループ、BPM設定 |
| `ProjectControl` | プロジェクト保存・選択・プレビュー起動 |
| `RendererSettings` | レンダラー設定（解像度、パイプラインエフェクト） |
| `GPUTimer` | GPU パフォーマンスタイミング表示 |
| `AudioView` | オーディオ波形表示 |
| `MIDIMIXEmu` | MIDI コントローラーエミュレーション |

---

## 入力コンポーネント

**ファイル**: `packages/orengine/tsx/components/Input/`

全入力コンポーネントは共通の `ValueProps<T>` パターンに従う:

```typescript
interface ValueProps<T> {
  value: T;
  onChange?: ( value: T ) => void;
  disabled?: boolean;
  readOnly?: boolean;
}
```

| コンポーネント | 入力型 | 特記事項 |
|--------------|-------|---------|
| `InputNumber` | number | ドラッグで値変更（0.05 × step / pixel）、モバイルではモーダル入力 |
| `InputText` | string | モバイルではモーダル入力 |
| `InputCheckBox` | boolean | カスタムチェックアイコン |
| `InputSelect` | string | ドロップダウン、value/label ペアまたは文字列配列 |
| `InputEntityRef` | string (uuid) | エンティティ参照ドロップダウン。engine.root.traverse() でリスト構築 |
| `InputComponentRef` | string (uuid) | コンポーネント参照ドロップダウン。`EntityPath > ComponentName` 形式 |
| `InputResourceSelect` | string (name) | リソース選択。編集ボタンで AssetViewer にナビゲート |

---

## SerializeFieldView

**ファイル**: `packages/orengine/tsx/components/SerializeFieldView/index.tsx`

Serializable オブジェクトのフィールドを再帰的にUIとして描画する汎用コンポーネント。

```tsx
<SerializeFieldView target={component} />
<SerializeFieldView target={entity} filter="geometry" />
```

**描画ロジック**:
1. `target.serializeToDirectory()` でフィールドのディレクトリ構造を取得
2. `SerializeFieldDirectory` を再帰的に走査:
   - `type: "folder"` → `Block`（折りたたみ可能）で囲み、子を再帰描画
   - `type: "value"` → 値の型と `opt.format` に応じた入力コンポーネントを描画
3. 値の型による入力コンポーネントの選択:
   - 配列 + `format.type == "vector"` → `Vector` コンポーネント
   - 配列（その他） → `ValueArray`
   - number → `InputNumber`
   - string → `InputText`
   - boolean → `InputCheckBox`
   - function → `Button`（クリックで関数を実行）
   - `format.type == "select"` → `InputSelect`
   - `format.type == "entity"` → `InputEntityRef`
   - `format.type == "component"` → `InputComponentRef`
   - `format.type == "resource"` → `InputResourceSelect`

---

## データフロー

### プロパティ編集の流れ

```
ユーザー操作（InputNumber 等）
  ↓ onChange( newValue )
SerializeFieldViewValue
  ↓ target.setField( path, newValue )
Serializable.deserialize()
  ↓ setter 呼び出し → 内部状態更新
Serializable.noticeField( path )
  ↓ emit( "fields/update/" + path )
  ↓ emit( "fields/update", [[ path ]] )
useWatchSerializable
  ↓ イベントリスナーが setState → 再描画
UI が新しい値で再描画
```

### エンティティ選択の流れ

```
Hierarchy でエンティティをクリック
  ↓
editor.selectEntity( entity )
  ↓ selectedEntityId を更新
  ↓ noticeField( "selectedEntityId" )
EntityProperty が useWatchSerializable で検知
  ↓ entity.findEntityByUUID( selectedEntityId )
EntityProperty が選択エンティティの transform + コンポーネントを表示
```

### アセットナビゲーションの流れ

```
AssetViewer でアセットをクリック
  ↓
editor.selectedAsset = { name, assetType, path }
editor.propertyTarget = "asset"
  ↓
AssetProperty が selectedAsset を監視
  ↓ assetType に応じた詳細ビューを描画
    - material → マテリアル設定（SerializeFieldView）
    - texture → テクスチャ設定
    - component → コンポーネントソースパス
    - shader → シェーダーソースパス
```

---

## 新しいパネルの追加手順

1. `packages/orengine/tsx/components/Panels/` に新ディレクトリを作成
2. `index.tsx` と `index.module.scss` を作成
3. `useOREditor()` でエディタ/エンジンにアクセス
4. `OREditor` の `LayoutSplit` 構成に追加

```tsx
// packages/orengine/tsx/components/Panels/MyPanel/index.tsx
import { useOREditor } from '../../../hooks/useOREditor';
import { Panel } from '../../Panel';

export const MyPanel = () => {
  const { editor, engine } = useOREditor();
  // ...
  return <Panel>...</Panel>;
};
```
