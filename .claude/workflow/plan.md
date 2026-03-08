# Plan: OREngine 実装仕様ドキュメント整備

## 概要
OREngineの内部実装仕様をドキュメント化する。主な目的はClaude Codeがコーディング代行時に正確な実装を行えるようにすること。ユーザー向けガイド（チュートリアル、操作説明等）は将来Webページとして別途整備するため、今回のスコープ外。

既存ドキュメント（REST API仕様、シェーダーリファレンス）は充実しているが、**内部アーキテクチャの実装仕様**が不足している。

## 実装ステップ

### 1. `docs/entity-component-system.md` の作成

- **対象ファイル**: `docs/entity-component-system.md`（新規）
- **変更内容**: Entity-Componentシステムの詳細仕様書
- **記載内容**:
  - **Entityクラス**:
    - 継承階層: `EventEmitter → Serializable → Entity`
    - Transform: `position`(Vector), `euler`(Euler), `quaternion`(Quaternion), `scale`(Vector)
    - `matrix` / `matrixWorld` / `matrixWorldPrev` の関係
    - `autoMatrixUpdate` による自動行列更新
    - 親子関係: `add()`, `remove()`, `parent`, `children`
    - コンポーネント管理: `addComponent<T>()`, `removeComponent<T>()`, `getComponent<T>()`
    - 検索: `findEntityByName()`, `findEntityByUUID()`, `getComponentByTag<T>()`
    - イベント伝播: `noticeEventChilds()`, `noticeEventParent()`
    - `traverse()` によるツリー走査
  - **Componentクラス**:
    - 継承: `Serializable → Component`
    - コンストラクタ: `ComponentParams<TArgs>` で `entity` と `args` を受け取る
    - ライフサイクルメソッド（実装でオーバーライド）:
      - `updateImpl(event)` - 毎フレーム更新
      - `postUpdateImpl(event)` - update後の処理
      - `beforeRenderImpl(event)` - レンダリング前
      - `afterRenderImpl(event)` - レンダリング後
      - `dispose()` - 破棄
    - `order` プロパティによる実行順制御
    - `_tag` によるタグベースの検索
    - `enabled` による有効/無効制御
  - **EntityUpdateEvent / ComponentUpdateEvent**:
    - `timeElapsed`, `timeDelta` (秒)
    - `timeCode`, `timeCodeFrame` (タイムラインコード)
    - `playing` (再生中か)
    - `renderer`, `resolution`
    - `matrix` (親のmatrixWorld)
    - `forceDraw`
  - **更新ループ**: `Entity.update()` → updateImpl → 各コンポーネントupdate → updateMatrix → 子Entity.update()
- **注意点**: コードから読み取った正確な情報を記載。推測は含めない

### 2. `docs/serializable-system.md` の作成

- **対象ファイル**: `docs/serializable-system.md`（新規）
- **変更内容**: Serializableクラスのフィールドシステム仕様
- **記載内容**:
  - **Serializableクラス**: `EventEmitter` を継承、`uuid` を自動生成
  - **フィールド登録API**:
    - `field<T>(path, getter, setter?, opt?)` - 読み書き可能フィールド
    - `field<T>(path, getter, opt?)` - 読み取り専用フィールド（自動で`readOnly=true`, `noExport=true`）
    - `fieldDir(name, opt?)` - ディレクトリ（フォルダ）の作成。チェーンで子フィールドを追加可能
    - `removeField(path)` - フィールド削除
  - **フィールドパス**: スラッシュ区切り（`"geometry/type"`, `"material/name"`）
    - `serializeToDirectory()` でスラッシュを分割してフォルダ構造に変換
  - **SerializableFieldOpt**:
    - `isFolder` - フォルダとして表示
    - `noExport` - エクスポート時に除外
    - `hidden` - UIで非表示（booleanまたは関数）
    - `readOnly` - 読み取り専用
    - `format` - UI表示形式:
      - `vector` - ベクトル入力
      - `select` - セレクトボックス（`list`指定）
      - `array` - 配列表示
      - `entity` - エンティティ参照
      - `component` - コンポーネント参照
      - `resource` - リソース参照（material/texture/shader）
  - **serialize/deserialize**:
    - `serialize(event?)` → `SerializeField`（フラットなkey-value）
    - `deserialize(props)` → 各フィールドのsetterを呼び出し
    - `serializeToDirectory()` → `SerializeFieldDirectory`（ネストしたフォルダ構造）
    - モード: `"view"`（デフォルト）と `"export"`
  - **イベント**: `fields/update/{path}`, `fields/update`
  - **Entityでの使用例**: name, position, euler, scale, children, components がフィールドとして登録
  - **Componentでの使用例**: enabled, tag + 各コンポーネント固有のフィールド

### 3. `docs/rendering-pipeline.md` の作成

- **対象ファイル**: `docs/rendering-pipeline.md`（新規）
- **変更内容**: レンダリングパイプラインの仕様書
- **記載内容**:
  - **描画フェーズ順序**:
    1. `envMap` - 環境マップ生成
    2. `shadowMap` - シャドウマップ生成
    3. `deferred` - GBuffer書き込み
    4. Deferred Shading（PostProcess）
    5. `forward` - フォワード描画（gBuffer.depth共有）
    6. Pipeline PostProcess（DOF, MotionBlur, SSR等）
    7. Camera PostProcess
    8. blit: backBuffer → uiBuffer
    9. `ui` - UI描画（gBuffer.depth共有）
    10. blit: uiBuffer → デフォルトFB
  - **GBufferレイアウト** (5ターゲット):
    - outColor0: Position XYZ + Emission.X
    - outColor1: Normal XYZ + Emission.Y
    - outColor2: Base Color XYZ
    - outColor3: Roughness, Metallic, SSN, EnvMapIntensity
    - outColor4: Velocity XY + Emission.Z
  - **FrameBufferの共有関係**:
    - gBuffer: 独自depthTexture
    - shadingBuffer: depth無し
    - forwardBuffer: gBuffer.depth共有
    - uiBuffer: gBuffer.depth共有
  - **Material.phase**: `"shadowMap"`, `"deferred"`, `"forward"`, `"envMap"`, `"ui"` のどのフェーズで描画されるか
  - **PostProcessPass**: 画面全体クアッド描画。入力テクスチャ→出力FBO
  - **エディタ描画**（Engine.update後）:
    - Helper → uiBuffer
    - Wireframe → uiBuffer
    - Gizmo → uiBuffer
    - SelectionOutline → uiBuffer → デフォルトFB

### 4. `docs/editor-ui-architecture.md` の作成

- **対象ファイル**: `docs/editor-ui-architecture.md`（新規）
- **変更内容**: エディタUIのReactアーキテクチャ仕様
- **記載内容**:
  - **コンポーネント階層**: OREditor → LayoutSplit → 各Panel
  - **主要Hooks**: useOREditor, useOREngine, useSerializableField, useWatchSerializable, useLayout
  - **状態管理**: Editorクラスのイベント → React hooks → UI更新
  - **パネル追加手順**: 新パネルコンポーネントの作り方、LayoutSplitへの組み込み
  - **入力コンポーネント**: InputNumber, InputText, InputSelect, InputCheckBox 等の使い方
  - **SerializeFieldView**: Serializableオブジェクトの汎用エディタUI

### 5. `CLAUDE.md` の更新

- **対象ファイル**: `CLAUDE.md`
- **変更内容**: 新規ドキュメントへの参照を「ドキュメント」セクションに追加
- **追加する参照**:
  ```markdown
  - `docs/entity-component-system.md` - Entity-Componentシステム仕様（ライフサイクル、フィールド、更新ループ）
  - `docs/serializable-system.md` - Serializableフィールドシステム仕様（フィールド登録、serialize/deserialize）
  - `docs/rendering-pipeline.md` - レンダリングパイプライン仕様（描画フェーズ、GBuffer、PostProcess）
  - `docs/editor-ui-architecture.md` - エディタUIアーキテクチャ（React構造、hooks、状態管理）
  ```

## 変更対象ファイル一覧

- [x] `docs/entity-component-system.md` - 新規: Entity-Componentシステム仕様
- [x] `docs/serializable-system.md` - 新規: Serializableフィールドシステム仕様
- [x] `docs/rendering-pipeline.md` - 新規: レンダリングパイプライン仕様
- [x] `docs/editor-ui-architecture.md` - 新規: エディタUIアーキテクチャ
- [x] `CLAUDE.md` - 更新: ドキュメント参照追加

## 考慮事項・リスク

1. **正確性**: ドキュメントはソースコードから読み取った情報に基づくこと。推測や誤った情報は混乱の元
   - 対策: 各ドキュメント作成前に関連コードを再確認

2. **メンテナンスコスト**: ドキュメントが多すぎると陳腐化リスクが高い
   - 対策: 「概念・設計意図・制約」に焦点を当て、変わりやすい実装詳細は避ける。型定義やAPI仕様は既存ドキュメントに委譲

3. **CLAUDE.md肥大化**: 新規ドキュメントの参照をCLAUDE.mdに追加する際、200行制限を意識
   - 対策: 簡潔なリスト形式で追加。説明はdocs内に書く

## テスト方針
- 各ドキュメント作成後、記載内容が実際のコードと整合しているか確認
- CLAUDE.md更新後、ドキュメントセクションのリンクが正しいか確認
