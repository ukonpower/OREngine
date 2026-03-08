# Research: ドキュメント整備計画

## タスク概要
OREngineのドキュメントを整備する。対象読者は2つ:
1. **ユーザー（開発者）**: OREngineを使ってシーンやコンポーネントを作る人
2. **Claude Code（AI）**: コーディングを代行する際に参照するドキュメント

## 現状のドキュメント

### 既存ドキュメント一覧
| ファイル | 内容 | 対象読者 | 状態 |
|---------|------|---------|------|
| `README.md` | プロジェクト概要、インストール、実行方法 | ユーザー | 基本的な内容あり |
| `CLAUDE.md` | コードスタイル、命名規則、パスエイリアス、API概要 | Claude Code | 充実 |
| `docs/architecture.md` | サーバー/ブラウザ構成、WebSocket、データ構造 | 両方 | 充実 |
| `docs/editor-rest-api.md` | エディタ操作REST API全仕様 | Claude Code | 充実 |
| `docs/project-api.md` | プロジェクト管理API | Claude Code | 充実 |
| `docs/resource-api.md` | リソース（コンポーネント/マテリアル/シェーダー/テクスチャ）管理API | Claude Code | 充実 |
| `docs/shader-reference.md` | シェーダーuniform/varying/モジュール全リファレンス | 両方 | 充実 |
| `docs/component-fields.md` | Mesh/Light/Camera等のフィールド一覧 | Claude Code | 充実 |

### 現状の評価

**強い領域:**
- REST API仕様は非常に詳細（editor, project, resource全て網羅）
- シェーダーリファレンスは完全（uniform、varying、モジュール一覧）
- CLAUDE.mdによるコードスタイル・規約の指示

**不足している領域:**

#### 1. ユーザー向けドキュメントがほぼ不在
- エンジンの使い方（エディタUIの操作方法）がない
- コンポーネントの作り方のガイドがない
- シェーダーの書き方チュートリアルがない
- マテリアル/テクスチャの作成ワークフローがない

#### 2. Claude Code向けのアーキテクチャ理解に必要な情報が分散
- Entity-Componentシステムの詳細仕様（ライフサイクル、フィールドシステム）がない
- Serializableの仕組み（fields、serialize/deserialize）のドキュメントがない
- Rendererのパイプライン（Deferred → PostProcess）の説明がない
- エディタUIの構造（React コンポーネント階層、hooks）のドキュメントがない

#### 3. 開発ガイド的なものがない
- 新規コンポーネントを追加する手順
- 新規シェーダーを追加する手順
- エディタUIパネルを追加する手順
- カスタムPostProcessを追加する手順

## 提案するドキュメント構成

### A. ユーザー向け（Getting Started / Guides）

| ドキュメント | 内容 | 優先度 |
|------------|------|-------|
| `docs/getting-started.md` | セットアップ〜最初のシーン作成まで | 高 |
| `docs/editor-guide.md` | エディタUI操作ガイド（パネル説明、ショートカット、ギズモ操作） | 高 |
| `docs/component-guide.md` | カスタムコンポーネント作成ガイド（ライフサイクル、フィールド定義、実例） | 高 |
| `docs/shader-guide.md` | シェーダー作成ガイド（メッシュ用/テクスチャ用、#includeの使い方、実例） | 中 |
| `docs/material-texture-guide.md` | マテリアル・テクスチャの作成と設定ガイド | 中 |

### B. Claude Code向け（内部仕様 / Architecture Deep Dive）

| ドキュメント | 内容 | 優先度 |
|------------|------|-------|
| `docs/entity-component-system.md` | Entity-Componentシステム詳細仕様 | 高 |
| `docs/serializable-system.md` | Serializableクラスのフィールドシステム、シリアライズ/デシリアライズ仕様 | 高 |
| `docs/rendering-pipeline.md` | レンダリングパイプライン（GBuffer → Deferred → PostProcess → Forward → UI） | 中 |
| `docs/editor-ui-architecture.md` | エディタUIのReactコンポーネント構造、hooks、状態管理 | 中 |
| `docs/build-system.md` | Viteプラグイン構成、リソース自動生成、ShaderMinifier | 低 |

### C. 既存ドキュメントの改善

| ドキュメント | 改善点 |
|------------|-------|
| `README.md` | docsへのリンク整理、ドキュメント一覧の追加 |
| `docs/architecture.md` | パッケージ間依存関係の図を追加 |
| `CLAUDE.md` | 新規ドキュメントへの参照を追加 |

## 関連ファイル・シンボル（ドキュメント化が必要な主要コード）

### Entity-Componentシステム
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Serializable/index.ts` | `Serializable`, `SerializableField` | フィールドシステム基底 |
| `packages/maxpower/Entity/index.ts` | `Entity` | シーングラフノード |
| `packages/maxpower/Component/index.ts` | `Component`, `ComponentUpdateEvent` | コンポーネント基底 |

### レンダリング
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Component/Renderer/index.ts` | `Renderer` | メインレンダラー |
| `packages/maxpower/Component/Renderer/DeferredRenderer/index.ts` | `DeferredRenderer` | Deferred Rendering |
| `packages/maxpower/Component/Renderer/PipelinePostProcess/index.ts` | `PipelinePostProcess` | ポストプロセスチェーン |
| `packages/maxpower/Material/index.ts` | `Material` | マテリアルクラス |

### エディタ
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Engine/index.ts` | `Engine` | エンジン本体 |
| `packages/orengine/ts/Editor/index.ts` | `Editor` | エディタ本体 |
| `packages/orengine/ts/Editor/CommandManager/index.ts` | `CommandManager` | Undo/Redo管理 |
| `packages/orengine/tsx/OREditor/index.tsx` | `OREditor` | エディタReactコンポーネント |

## 各ドキュメントの詳細内容案

### docs/entity-component-system.md（高優先度・Claude Code向け）
- **Entityクラス**: 親子関係、transform（position/euler/scale）、matrixWorldの自動計算、コンポーネントの追加/削除
- **Componentクラス**: ライフサイクル（`setEntityImpl` → `finalizeImpl` → `updateImpl` → `disposeImpl`）、`ComponentUpdateEvent`の中身
- **フィールドシステム**: `registerFields()` によるフィールド定義、フィールドパス（`"geometry/type"`のスラッシュ区切り）、型、selectオプション
- **コンポーネント検索**: `getComponent<T>()`、`getComponentsByTag()`
- **イベントシステム**: `notice()` と `watchNotice()` によるコンポーネント間通信

### docs/serializable-system.md（高優先度・Claude Code向け）
- **SerializableFieldの型**: `number`, `boolean`, `string`, `vec2`/`vec3`/`vec4`, `select`
- **serialize/deserialize**: `SceneDataEntity`/`SceneDataComponent` とのマッピング
- **フィールドのディレクトリ構造**: ネストしたフォルダとしての表現（`fieldsDirectory`）
- **`props`フィールド**: シリアライズ時のprops変換ルール

### docs/rendering-pipeline.md（中優先度・Claude Code向け）
- **描画フェーズ**: `shadowMap` → `deferred`(GBuffer) → deferred shading → `forward` → pipeline PostProcess → camera PostProcess → `ui`
- **GBufferレイアウト**: 5つのレンダーターゲット（position+emission, normal+emission, baseColor, roughness/metallic/SSN/env, velocity+emission）
- **FrameBufferの共有関係**: gBuffer.depth が forwardBuffer/uiBuffer で共有
- **PostProcessPass**: クアッド描画によるスクリーンスペースエフェクト
- **Material.phase**: どのフェーズで描画されるかの指定方法

### docs/component-guide.md（高優先度・ユーザー向け）
- **基本構造**: MXP.Componentの継承、コンストラクタ、registerFields
- **ライフサイクル例**: 初期化 → 毎フレーム更新 → 破棄
- **フィールド定義の実例**: 数値スライダー、セレクトボックス、ベクトル入力
- **実例**: 回転するコンポーネント、マウスに追従するコンポーネント等
- **REST API/UIからの追加方法**

### docs/shader-guide.md（中優先度・ユーザー向け）
- **メッシュ用シェーダーの書き方**: vert_h/vert_in/vert_out、frag_h/frag_in/frag_outの役割
- **テクスチャ用シェーダーの書き方**: vUvを使ったプロシージャルテクスチャ
- **ユーティリティモジュール活用**: noise, sdf, randomの使い方
- **実例**: グラデーションマテリアル、ノイズテクスチャ、レイマーチング
- **デバッグのコツ**: outEmissionで光らせて確認等

### docs/editor-guide.md（高優先度・ユーザー向け）
- **パネル構成**: Hierarchy, EntityProperty, Screen, Timeline, AssetViewer等
- **エンティティ操作**: 作成、削除、選択、transform変更
- **ギズモ**: 移動/回転/スケールの切り替え
- **キーボードショートカット**: Ctrl+S（保存）、Ctrl+Z/Y（Undo/Redo）、Space（再生）等
- **リソース管理**: マテリアル/シェーダー/テクスチャの追加・編集

### docs/editor-ui-architecture.md（中優先度・Claude Code向け）
- **Reactコンポーネント階層**: OREditor → LayoutSplit → 各Panel
- **hooks**: useOREditor, useOREngine, useSerializableField, useWatchSerializable
- **状態管理**: Editor クラスのイベント → React hooks → UI更新
- **パネル追加手順**: 新しいパネルコンポーネントの作り方

## 制約・注意点

1. **docs/ は CLAUDE.md から参照されている**: 新規ドキュメントを追加したら CLAUDE.md のドキュメントセクションも更新が必要
2. **コードとドキュメントの同期**: 既存のREST APIドキュメントは実装と同期されているが、内部仕様ドキュメントは実装変更時に陳腐化しやすい
3. **ドキュメントの粒度**: Claude Code向けは実装の詳細を含むべきだが、あまり細かすぎるとメンテナンスコストが高い。「概念・設計意図・制約」に焦点を当て、具体的なAPI/型は既存ドキュメントに委譲すべき
4. **対象読者の分離**: ユーザー向けガイドとClaude Code向け仕様書は明確に分離した方が良い。Claude Code向けはCLAUDE.mdに参照を入れることで活用される

## 参考になる既存実装
- `src/ts/Resources/Components/_Samples/` - サンプルコンポーネント群。コンポーネントガイドの実例として使える
- `src/ts/Resources/Shaders/` - 実際のシェーダー群。シェーダーガイドの実例として使える
- `server/routes/components.ts` のコンポーネントテンプレート生成 - コンポーネント作成ガイドで参照

## 推奨する作成順序

### Phase 1（高優先度 - Claude Codeの生産性向上）
1. `docs/entity-component-system.md` - コーディング時に最も参照頻度が高い
2. `docs/serializable-system.md` - フィールド操作の理解に不可欠
3. `docs/component-guide.md` - ユーザーにもClaude Codeにも有用

### Phase 2（中優先度 - 理解の深化）
4. `docs/rendering-pipeline.md` - レンダリング関連の変更時に必要
5. `docs/shader-guide.md` - シェーダー作成のハウツー
6. `docs/editor-guide.md` - エディタ操作の理解

### Phase 3（低優先度 - 網羅性）
7. `docs/editor-ui-architecture.md` - UI変更時に参照
8. `docs/material-texture-guide.md` - マテリアル/テクスチャ作成ガイド
9. `docs/getting-started.md` - 新規ユーザー向け
10. `docs/build-system.md` - ビルド設定変更時に参照
