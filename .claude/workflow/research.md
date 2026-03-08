# Research: ドキュメントのADR化検討

## タスク概要
現在の `docs/` ディレクトリに含まれる詳細な実装仕様ドキュメントを、ADR（Architecture Decision Records）スタイルに移行すべきか検討する。目的は「仕様が変わった時にドキュメントとの不整合が生じて混乱を招く」問題の解消。

## 現在のドキュメント分析

### ファイル一覧と行数

| ファイル | 行数 | 分類 | 内容の性質 |
|---------|------|------|-----------|
| `architecture.md` | 344 | 混合 | 全体構成図 + WebSocket仕様詳細 + データ構造定義 |
| `component-fields.md` | 136 | 詳細リファレンス | REST APIフィールドパス・型・デフォルト値の一覧表 |
| `editor-rest-api.md` | 736 | 詳細リファレンス | 全REST APIエンドポイント + curlサンプル |
| `editor-ui-architecture.md` | 412 | 混合 | React構造概要 + hooks API詳細 + コンポーネントProps定義 |
| `entity-component-system.md` | 314 | 詳細仕様 | クラスプロパティ一覧 + メソッドシグネチャ + ライフサイクル |
| `project-api.md` | 286 | 詳細リファレンス | プロジェクト管理REST API全エンドポイント |
| `rendering-pipeline.md` | 255 | 混合 | パイプライン概念図 + GBuffer具体的レイアウト + FB共有詳細 |
| `resource-api.md` | 577 | 詳細リファレンス | リソース管理REST API全エンドポイント |
| `serializable-system.md` | 253 | 詳細仕様 | フィールドAPI詳細 + serialize/deserialize仕様 |
| `shader-reference.md` | 228 | 詳細リファレンス | uniform/varying/モジュール全一覧 |
| **合計** | **3,536** | | |

### 問題の分析

#### 1. 変更コストが高い
- CLAUDE.mdに「**実装を変更した場合は、関連するドキュメントも必ず同時に更新すること**」というルールがある
- 6つの対応表（Entity変更→2ドキュメント更新、API変更→3ドキュメント更新...）を管理
- 実際にドキュメント更新を忘れると、次回Claude Codeが間違った仕様に基づいてコーディングするリスク

#### 2. コードから読み取れる情報の重複
現在のドキュメントの多くは「コードを読めばわかる情報」を人間可読にしたもの:
- **REST APIエンドポイント**: ルーティングコードから自明
- **クラスプロパティ一覧**: TypeScriptの型定義から自明
- **フィールドパス・デフォルト値**: `field()` 呼び出しから自明
- **uniform/varying一覧**: GLSLソースから自明
- **curlサンプル**: エンドポイント定義から生成可能

#### 3. コードから読み取り**にくい**情報（＝ADRに残すべき）
- **ブラウザファースト設計**: なぜサーバーではなくブラウザが source of truth なのか
- **WebSocket委譲パターン**: なぜREST→WebSocket→ブラウザという回り道をするのか（Undo/Redo対応のため）
- **GBufferレイアウトの理由**: なぜ5テクスチャなのか、なぜEmissionが3つに分散しているのか
- **depth共有の理由**: なぜforwardBuffer/uiBufferがgBuffer.depthを共有するのか
- **描画パイプラインの順序**: なぜこの順序で描画するのか
- **Serializableパターンの採用理由**: なぜEntity/Componentの共通基底としてSerializableを使うのか
- **フィールドシステムのパス設計**: なぜスラッシュ区切りのフラットパスなのか

### カテゴリ別の判定

#### A. 削除候補（コードが正、ドキュメントが陳腐化リスク大）
- `component-fields.md`: フィールドパス・デフォルト値はコードの `field()` 呼び出しが正
- `editor-rest-api.md`: エンドポイント定義・パラメータはルーティングコードが正
- `project-api.md`: 同上
- `resource-api.md`: 同上
- `shader-reference.md`: uniform/varyingはGLSLソースが正

#### B. ADR化候補（設計意思を残し、詳細仕様は削除）
- `architecture.md`: ブラウザファースト設計の「なぜ」、WebSocket委譲パターンの「なぜ」を残す
- `rendering-pipeline.md`: パイプライン順序の「なぜ」、GBuffer設計の「なぜ」、depth共有の「なぜ」を残す
- `entity-component-system.md`: Serializable継承階層の「なぜ」、更新ループ設計の「なぜ」を残す
- `serializable-system.md`: フィールドシステムの設計意図を残す
- `editor-ui-architecture.md`: Context体系の設計意図を残す

### CLAUDE.mdへの影響

現在CLAUDE.mdには以下のセクションがある:
1. **ドキュメント対応表**: 6エントリの変更→ドキュメント更新マッピング
2. **シーン作成（REST API経由）**: component-fields.mdの一部重複
3. **docs/ への参照**: 10ファイルへの参照

ADR化すると:
- ドキュメント対応表は大幅に簡素化（ADRは設計の根幹が変わった時のみ更新）
- REST APIの使い方はCLAUDE.mdのシーン作成セクションに集約可能
- docs/の参照先が減る

## 提案するADR構成

```
docs/
  adr/
    001-browser-first-architecture.md     ← なぜブラウザがsource of truthなのか
    002-websocket-delegation-pattern.md   ← なぜREST→WS→ブラウザの委譲なのか
    003-serializable-field-system.md      ← なぜフィールドシステムを設計したか
    004-deferred-rendering-pipeline.md    ← なぜこのパイプライン構成なのか
    005-gbuffer-layout.md                 ← なぜこのGBufferレイアウトなのか
    006-entity-component-hierarchy.md     ← なぜEventEmitter→Serializable→Entity/Componentなのか
    007-editor-context-architecture.md    ← なぜこのContext体系なのか
    008-depth-sharing-strategy.md         ← なぜFB間でdepthを共有するのか
```

### ADRテンプレート案

```markdown
# ADR-{番号}: {タイトル}

## ステータス
承認済み / 廃止

## コンテキスト
{この設計判断に至った背景・課題}

## 決定
{何を決定したか}

## 理由
{なぜこの決定に至ったか、代替案との比較}

## 結果
{この決定によって生じる影響、トレードオフ}

## 関連コード
{実装の起点となるファイルパス（詳細はコードを参照）}
```

## 制約・注意点

1. **REST APIリファレンスの扱い**: 現在のドキュメントはClaude CodeがAPIを叩くときのリファレンスとしても使われている。ADR化で削除すると、Claude Codeがルーティングコードを毎回読む必要がある。CLAUDE.mdの「シーン作成」セクションに最低限のAPIパターン（バッチAPI等）を残すか検討が必要
2. **shader-reference.md**: シェーダーのuniform/module一覧は「使えるもの一覧」としてコードを読まなくても参照できる価値がある。ただしGLSLソースの `#include` ファイルを読めば同じ情報は取れる
3. **移行コスト**: 既存の10ドキュメントを整理してADR化する作業量は中程度
4. **CLAUDE.mdの更新**: ドキュメント対応表、docs参照部分の書き換えが必要

## 参考になる既存実装
- CLAUDE.mdの「シーン作成（REST API経由）」セクション: すでにAPIの要点を凝縮したスタイルで書かれており、ADR化後のAPIガイドのモデルになる
