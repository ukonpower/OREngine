# Research: scene-builderスキルの充実化

## タスク概要

scene-builderスキルを、agent-deviceスキルの優れた構造パターンとClaude Code公式ベストプラクティスに基づいて改善する。現在は1つのSKILL.mdと1つのreference.mdのみで構成されているが、プログレッシブ・ディスクロージャー、ワークフロー指向設計、リファレンス分割などを導入して充実させる。

## 現在のscene-builderスキル構造

```
.claude/skills/scene-builder/
├── SKILL.md        (~141行、フロントマター + 全内容を1ファイルに)
└── reference.md    (~251行、APIリファレンス全体を1ファイルに)
```

### 現在の問題点

| 問題 | 詳細 |
|------|------|
| **descriptionが弱い** | トリガーフレーズが具体的でない。三人称形式でない |
| **SKILL.mdにcurl例が多い** | ワークフローのcurlコマンド例が長く、コンテキストを消費 |
| **リファレンス未分割** | reference.mdにAPI全体（エンティティ、マテリアル、シェーダー、テクスチャ等）が詰め込まれている |
| **ワークフローが少ない** | 新規シーン構築と既存シーンへの追加の2パターンのみ |
| **Decision Mapなし** | ユーザーの意図に応じた分岐ガイドがない |
| **エラーハンドリング記述なし** | API呼び出し失敗時の対処法がない |
| **examplesディレクトリなし** | 実行可能なサンプルスクリプトがない |
| **scriptsディレクトリなし** | ヘルパースクリプトがない |
| **allowed-toolsが狭い** | `Bash(curl:*)` のみ。`Bash(python3:*)` 等の追加検討余地あり |

## agent-deviceスキルの構造分析（参考モデル）

```
skills/agent-device/
├── SKILL.md
└── references/
    ├── batching.md           - バッチ操作の詳細
    ├── coordinate-system.md  - 座標系
    ├── logs-and-debug.md     - ログとデバッグ
    ├── perf-metrics.md       - パフォーマンスメトリクス
    ├── permissions.md        - パーミッション
    ├── remote-tenancy.md     - リモートテナンシー
    ├── session-management.md - セッション管理
    ├── snapshot-refs.md      - スナップショット参照
    └── video-recording.md    - ビデオ録画
```

### agent-deviceの優れたパターン

1. **Decision Map**: `->` 矢印を使った1行ルーティングルール（「No target yet → `devices` → pick → `open`」形式）。LLMがパターンマッチしやすい
2. **Canonical Flows**: 番号付き・名前付きの完全なコマンドシーケンス（few-shot例として機能）
3. **Command Skeleton**: コマンドを論理グループで整理。構文のみ、最小限の説明
4. **Guardrails セクション**: 「常にXする」「決してYしない」形式の行動制約（コマンドドキュメントと分離）
5. **Common Mistakes セクション**: 既知のアンチパターンを明示
6. **リファレンス分割**: 9個のファイルに分割。SKILL.mdは「Router, not Manual」
7. **Stop Conditions**: リファレンス内に「この戦略を諦めて別のアプローチに切り替えるタイミング」を明示
8. **「Open references only if blocked」**: リファレンスは問題発生時のみ読む指示
9. **全体で約400行**: 重い詳細はreferences/に委譲してトークン効率を確保

## Claude Code公式スキルベストプラクティス

### プログレッシブ・ディスクロージャー（3段階）

1. **メタデータ（name + description）**: 常にコンテキストに存在（~100語）
2. **SKILL.md本文**: スキルがトリガーされたとき（理想は1,500-2,000語、最大5k語）
3. **バンドルリソース**: 必要に応じて（references/, scripts/, examples/, assets/）

### 必須ルール

- **descriptionは三人称**: 「This skill should be used when the user asks to...」
- **具体的なトリガーフレーズ**: ユーザーが言いそうな具体的な言葉を含める
- **本文は命令形/不定詞形**: 「You should...」ではなく「To accomplish X, do Y」
- **SKILL.mdは軽量に**: 1,500-2,000語が理想、詳細はreferences/へ
- **リソースへの参照を明記**: SKILL.md内でreferences/やexamples/の存在を示す
- **情報の重複を避ける**: SKILL.mdとreferences/で同じ情報を書かない

### ディレクトリ構成ベストプラクティス

```
skill-name/
├── SKILL.md           - コア概念、ワークフロー概要、リソースへのポインタ
├── references/        - 詳細ドキュメント（必要に応じてロード）
├── examples/          - 実行可能なサンプル
├── scripts/           - ユーティリティスクリプト
└── assets/            - 出力に使うテンプレート等
```

### 追加調査で判明したポイント（Gemini検索 + Web調査）

- SKILL.md は500行/5,000語以下が理想
- `${CLAUDE_SKILL_DIR}` でスキルディレクトリへのパスを参照可能
- `$ARGUMENTS` でスキル呼び出し時の引数にアクセス可能
- description予算はコンテキストウィンドウの2%（超過するとスキルが除外される）
- `disable-model-invocation: true` で手動呼び出し専用にできる（副作用のあるスキル向け）
- `!command` でシェルコマンドの結果をスキル内容に埋め込める
- 「ultrathink」をスキル内容に含めると拡張思考モードが有効になる
- コアの指示は100-300語が最適（コンテキストウィンドウ節約）

## scene-builderに適用すべき改善案

### 1. ディレクトリ構造の再設計

```
.claude/skills/scene-builder/
├── SKILL.md                          - コア（軽量化、Decision Map、標準フロー概要）
├── references/
│   ├── api-entities.md               - エンティティ操作API（CRUD、バッチ、フィールド設定）
│   ├── api-resources.md              - マテリアル・テクスチャ・シェーダーAPI
│   ├── components-catalog.md         - コンポーネント一覧と全フィールド詳細
│   └── troubleshooting.md            - エラーハンドリング・トラブルシューティング
├── examples/
│   ├── basic-scene.sh                - 基本シーン構築の完全なcurlスクリプト
│   ├── add-entities.sh              - エンティティ追加フロー
│   └── material-workflow.sh          - マテリアル作成・割当の一連のフロー
└── scripts/
    └── check-server.sh               - サーバー起動確認・ステータスチェック
```

### 2. SKILL.md の再構成（Router哲学）

現在のSKILL.mdから以下を分離・再構成:

**残す（SKILL.md内）:**
- Decision Map: 「何をしたいか？」→ 適切なフロー/リファレンスへの分岐
- 前提条件（サーバー起動確認）
- 鉄則（既存シーン確認必須）
- 標準フロー概要（curlの詳細例はexamples/へ）
- 重要なルール
- リソースへのポインタ一覧

**移動（references/へ）:**
- APIエンドポイント詳細 → `references/api-entities.md`, `references/api-resources.md`
- コンポーネント一覧・フィールド → `references/components-catalog.md`
- curlコマンドの完全な例 → `examples/`

### 3. descriptionの改善

現在:
```yaml
description: >
  OREngineのシーンをREST APIで構築・修正する。シーン作成、エンティティ追加・削除、
  コンポーネント設定、オブジェクト配置などシーン操作全般を担当する。
```

改善案:
```yaml
description: >
  This skill should be used when the user asks to "シーンを作って", "エンティティを追加",
  "オブジェクトを配置", "マテリアルを設定", "ライトを追加", "カメラを配置",
  "シーンを修正", "コンポーネントを追加", "シェーダーを作成", "テクスチャを設定",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  or 3D object placement in OREngine. Operates via REST API against localhost:3001.
```

### 4. Decision Mapの追加

```
何をしたい？
├── 新規シーンを作りたい → examples/basic-scene.sh 参照
├── 既存シーンにオブジェクト追加 → examples/add-entities.sh 参照
├── マテリアル・テクスチャを設定 → references/api-resources.md + examples/material-workflow.sh
├── コンポーネントのフィールドを知りたい → references/components-catalog.md
├── APIエンドポイントの詳細 → references/api-entities.md / api-resources.md
└── うまくいかない → references/troubleshooting.md
```

### 5. 新規追加コンテンツ

#### troubleshooting.md に含めるべき内容
- サーバー未起動時のエラーと対処法
- ブラウザ未接続時の制限事項
- UUID不正時のエラー
- コンポーネント名が見つからない場合
- フィールドパスが不正な場合
- 保存に失敗する場合

#### components-catalog.md に含めるべき内容
- 各コンポーネントの全フィールド一覧（現在のreference.mdより詳細に）
- geometry/type ごとの固有フィールド
- PostProcessPipeline の postprocess 配列の意味（[bloom, blur, fxaa, colorGrading]等）
- コンポーネント間の依存関係

## 制約・注意点

- ファイルパスは `.claude/skills/scene-builder/` 以下（プロジェクト直下のスキル）
- `allowed-tools: Bash(curl:*)` のフロントマター設定は維持
- 現在のreference.mdからreferences/への移行時、情報の欠落に注意
- 現在のSKILL.mdで機能しているワークフロー（バッチAPI、保存フロー）の動作を壊さない
- SKILL.md本文は1,500-2,000語（日本語の場合は文字数で約3,000-4,000文字）を目標

## 関連ファイル・シンボル

| ファイル | 役割 |
|---------|------|
| `.claude/skills/scene-builder/SKILL.md` | 現在のスキル本体（141行） |
| `.claude/skills/scene-builder/reference.md` | 現在のAPIリファレンス（251行） |
| `server/index.ts` | REST APIサーバー実装（エンドポイント定義） |
| `src/ts/Resources/_data/componentList.ts` | 利用可能コンポーネント一覧 |

## 参考になる既存実装

- **agent-device skill**: Decision Map、リファレンス9分割、Router哲学
  - URL: `https://github.com/callstackincubator/agent-device/tree/main/skills/agent-device`
- **plugin-dev/hook-development skill**: SKILL.md 1,651語、references/ 3ファイル、examples/ 3ファイル、scripts/ 3ファイル
- **plugin-dev/skill-development skill**: スキル開発の公式ガイド自体が参考パターン
- **Claude Code公式**: プログレッシブ・ディスクロージャー3段階モデル
