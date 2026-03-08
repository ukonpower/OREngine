# Plan: ドキュメントのADR化

## 概要
`docs/` の詳細実装仕様ドキュメント（10ファイル・3,536行）をADR（Architecture Decision Records）スタイルに移行する。「コードから読み取れる情報」を削除し、「設計判断の理由」のみを残すことで、ドキュメント陳腐化リスクとメンテナンスコストを削減する。

## 実装ステップ

### 1. ADRディレクトリ作成とADR執筆

- **対象ファイル**: `docs/adr/` ディレクトリ（新規作成）
- **変更内容**: 以下のADRを新規作成する。各ADRには既存ドキュメントから「なぜ」の部分を抽出して記述する。

#### ADR一覧

| ADR | タイトル | 元ドキュメント | 抽出する設計判断 |
|-----|---------|--------------|----------------|
| 001 | ブラウザファースト設計 | `architecture.md` | なぜブラウザがsource of truthなのか、なぜサーバーではなく |
| 002 | WebSocket委譲パターン | `architecture.md` | なぜREST→WS→ブラウザの委譲か（Undo/Redo対応のため） |
| 003 | Entity-Component継承階層 | `entity-component-system.md` | なぜEventEmitter→Serializable→Entity/Component構造なのか |
| 004 | Serializableフィールドシステム | `serializable-system.md` | なぜスラッシュ区切りフラットパス、なぜgetter/setter方式 |
| 005 | Deferredレンダリングパイプライン | `rendering-pipeline.md` | なぜこの描画順序か、なぜdeferred+forward混合か |
| 006 | GBufferレイアウトとDepth共有 | `rendering-pipeline.md` | なぜ5テクスチャ、なぜEmission分散、なぜdepth共有 |
| 007 | エディタContext体系 | `editor-ui-architecture.md` | なぜOREngine/OREditor/MouseMenu/InputWindow分離か |

- **注意点**: ADRの「コンテキスト」と「理由」セクションはユーザー（設計者）の判断が必要。コードから推測できる範囲で草稿を書き、ユーザーにレビューしてもらう

#### ADRテンプレート

```markdown
# ADR-{番号}: {タイトル}

## ステータス
承認済み

## コンテキスト
{この設計判断に至った背景・課題}

## 決定
{何を決定したか}

## 理由
{なぜこの決定に至ったか、代替案との比較}

## 結果
{この決定によって生じる影響、トレードオフ}

## 関連コード
{実装の起点となるファイルパス}
```

---

### 2. 旧ドキュメントの削除

- **対象ファイル**: `docs/` 直下の全10ファイル
- **変更内容**: 以下を削除する

| 削除ファイル | 理由 |
|------------|------|
| `architecture.md` | ADR-001, 002に設計意思を移行。残りはコードが正 |
| `component-fields.md` | フィールドパス・デフォルト値はコードの`field()`呼び出しが正 |
| `editor-rest-api.md` | ルーティングコードが正。主要パターンはCLAUDE.mdに既存 |
| `editor-ui-architecture.md` | ADR-007に設計意思を移行。残りはコードが正 |
| `entity-component-system.md` | ADR-003に設計意思を移行。残りはコードが正 |
| `project-api.md` | ルーティングコードが正 |
| `rendering-pipeline.md` | ADR-005, 006に設計意思を移行。残りはコードが正 |
| `resource-api.md` | ルーティングコードが正 |
| `serializable-system.md` | ADR-004に設計意思を移行。残りはコードが正 |
| `shader-reference.md` | GLSLソースが正 |

---

### 3. CLAUDE.mdの更新

- **対象ファイル**: `CLAUDE.md`
- **変更内容**: ドキュメントセクションをADR体系に合わせて書き換える

#### 3a. 「ドキュメント」セクションの書き換え

**Before（現在）:**
```markdown
## ドキュメント
仕様の詳細は `docs/` ディレクトリに記載されている。**実装を変更した場合は、関連するドキュメントも必ず同時に更新すること。** コード変更とドキュメント更新は同じコミットに含める。特に以下の変更時は対応するドキュメントの確認・更新が必須:
- Entity/Component/Serializableのインターフェース変更 → `entity-component-system.md`, `serializable-system.md`
- レンダリングパイプライン・描画フェーズ・GBuffer変更 → `rendering-pipeline.md`
- エディタUI・hooks・パネル変更 → `editor-ui-architecture.md`
- REST API変更 → `editor-rest-api.md`, `project-api.md`, `resource-api.md`
- シェーダーモジュール・uniform変更 → `shader-reference.md`
- コンポーネントフィールド変更 → `component-fields.md`

### 内部実装仕様
（10ファイル分のリスト）
```

**After:**
```markdown
## 設計ドキュメント（ADR）
`docs/adr/` に設計判断の記録（Architecture Decision Records）がある。ADRには「なぜその設計にしたか」が記述されている。**設計の根幹を変更する場合のみ**、対応するADRを更新または新規追加する。日常的なコード変更ではADRの更新は不要。

- `docs/adr/001-browser-first-architecture.md` - ブラウザファースト設計
- `docs/adr/002-websocket-delegation-pattern.md` - WebSocket委譲パターン
- `docs/adr/003-entity-component-hierarchy.md` - Entity-Component継承階層
- `docs/adr/004-serializable-field-system.md` - Serializableフィールドシステム
- `docs/adr/005-deferred-rendering-pipeline.md` - Deferredレンダリングパイプライン
- `docs/adr/006-gbuffer-layout-and-depth-sharing.md` - GBufferレイアウトとDepth共有
- `docs/adr/007-editor-context-architecture.md` - エディタContext体系
```

#### 3b. 「シーン作成」セクション内の参照更新

**Before:**
```markdown
- 詳細: `docs/shader-reference.md`
```

**After:**
```markdown
- シェーダーモジュール: GLSLソース `packages/maxpower/Component/Renderer/ShaderParser/shaderModules/` を参照
```

---

## 変更対象ファイル一覧

- [x] `docs/adr/001-browser-first-architecture.md` - 新規作成
- [x] `docs/adr/002-websocket-delegation-pattern.md` - 新規作成
- [x] `docs/adr/003-entity-component-hierarchy.md` - 新規作成
- [x] `docs/adr/004-serializable-field-system.md` - 新規作成
- [x] `docs/adr/005-deferred-rendering-pipeline.md` - 新規作成
- [x] `docs/adr/006-gbuffer-layout-and-depth-sharing.md` - 新規作成
- [x] `docs/adr/007-editor-context-architecture.md` - 新規作成
- [x] `docs/architecture.md` - 削除
- [x] `docs/component-fields.md` - 削除
- [x] `docs/editor-rest-api.md` - 削除
- [x] `docs/editor-ui-architecture.md` - 削除
- [x] `docs/entity-component-system.md` - 削除
- [x] `docs/project-api.md` - 削除
- [x] `docs/rendering-pipeline.md` - 削除
- [x] `docs/resource-api.md` - 削除
- [x] `docs/serializable-system.md` - 削除
- [x] `docs/shader-reference.md` - 削除
- [x] `CLAUDE.md` - ドキュメントセクション書き換え

## 考慮事項・リスク

1. **REST APIリファレンス喪失**: 旧ドキュメント削除でClaude Codeがエンドポイント一覧を失う。**対策**: CLAUDE.mdの「シーン作成」セクションに主要なAPIパターン（バッチAPI、シェーダー/マテリアル作成）は既に記載済み。必要時はルーティングコード（`server/routes/`）を直接読む運用とする
2. **ADRの「理由」が不十分**: コードから推測してADRを書くため、設計者の真意と異なる可能性がある。**対策**: ADR草稿をユーザーにレビューしてもらい、修正サイクルを回す
3. **MEMORYへの影響**: auto-memoryのMEMORY.mdにドキュメント対応表がある。**対策**: MEMORY.mdも同時に更新する

## テスト方針
- ドキュメント変更のみでコード変更なし。`npm run typecheck` / `npm run build` への影響はない
- CLAUDE.mdの構文が正しいことを目視確認
