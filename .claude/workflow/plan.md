# Plan: orengineスキルの見直し（Anthropic公式ガイド準拠）

## 概要

Anthropic公式「The Complete Guide to Building Skills for Claude」のベストプラクティスに基づき、
ローカル版orengineスキル（`.claude/skills/orengine/SKILL.md`）を改善する。
主な改善: description再構成、Examplesセクション追加、Troubleshootingインライン化、negative trigger追加。

**スコープ**: ローカル版のSKILL.mdのみ。プラグイン版（orengine-tools）は別タスクとする。

## 実装ステップ

### 1. YAML frontmatter の description 改善

- **対象ファイル**: `.claude/skills/orengine/SKILL.md`
- **変更内容**: descriptionを `[What it does] + [When to use it] + [Key capabilities]` 構造に再構成
- **現状**:
  ```yaml
  description: >
    This skill should be used when the user asks to "シーンを作って", "エンティティを追加",
    "オブジェクトを配置", "マテリアルを設定", ...
  ```
- **改善後**:
  ```yaml
  description: >
    OREngineの3Dシーン構築・コンポーネント開発・シェーダー作成を行うワークフロースキル。
    REST API経由でエンティティ作成・配置・マテリアル設定・保存を自動化し、スクリーンショットで結果確認する。
    Use when user asks to "シーンを作って", "エンティティを追加", "オブジェクトを配置",
    "マテリアルを設定", "ライトを追加", "カメラを配置", "シーンを修正", "コンポーネントを追加",
    "コンポーネントを作成", "シェーダーを作成", "シェーダーを書いて", "テクスチャを設定",
    "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
    component development, shader programming, or 3D object placement in OREngine.
    Do NOT use for general TypeScript/JavaScript questions, GLSL syntax reference,
    or non-OREngine 3D engine work.
  ```
- **ポイント**:
  - 先頭2行で「何をするスキルか」を明記（What it does）
  - 既存のトリガーフレーズは維持（When to use it）
  - 末尾にnegative trigger追加（Do NOT use for...）
  - 1024文字以内に収める

### 2. metadata フィールド追加

- **対象ファイル**: `.claude/skills/orengine/SKILL.md`
- **変更内容**: frontmatterにmetadataを追加
- **追加内容**:
  ```yaml
  metadata:
    author: ukonpower
    version: 1.1.0
  ```

### 3. Examples セクション追加

- **対象ファイル**: `.claude/skills/orengine/SKILL.md`
- **変更内容**: Guardrails セクションの前に Examples セクションを追加
- **内容**: 3つの代表的ユースケースの例

```markdown
## Examples

### Example 1: 新規シーンの構築
ユーザー: 「赤い球体と青い床のシーンを作って」

アクション:
1. GET /projects でプロジェクト確認
2. DELETE + POST /projects でシーン初期化
3. POST /editor/entities でエンティティ一括作成（Floor, Sphere, Light, Camera）
4. POST /materials でカスタムマテリアル作成
5. POST /editor/fields でマテリアル割当
6. POST /editor/save で保存
7. スクリーンショットで結果確認

Result: ライティング付きの赤い球体が青い床の上に配置されたシーン

### Example 2: 既存シーンへのオブジェクト追加
ユーザー: 「シーンにライトをもう一つ追加して」

アクション:
1. GET /editor/scene で現状のシーンツリー確認
2. POST /editor/entity で新規エンティティ作成
3. POST /editor/entity/:uuid/component で Light コンポーネント追加
4. POST /editor/fields で位置・強度設定
5. POST /editor/save で保存
6. スクリーンショットで結果確認

Result: 既存シーンを維持したまま新しいライトが追加された

### Example 3: カスタムシェーダーの作成
ユーザー: 「グラデーションのシェーダーを作って」

アクション:
1. POST /shaders でシェーダーテンプレート作成
2. src/ts/Resources/Shaders/ のファイルを直接編集（index.vs, index.fs）
3. POST /materials でマテリアル作成、シェーダー割当
4. npm run typecheck で型チェック
5. GET /editor/shader-errors でシェーダーエラー確認

Result: カスタムGLSLシェーダーが適用されたマテリアル
```

### 4. Troubleshooting インライン化

- **対象ファイル**: `.claude/skills/orengine/SKILL.md`
- **変更内容**: Guardrails セクションの後に、よくあるエラーのクイックフィックスを追加
- **内容**:

```markdown
## Common Issues

### サーバーに接続できない（ECONNREFUSED）
原因: 開発サーバーが起動していない
対処: `npm run dev` を実行してサーバーを起動

### 503 Service Unavailable
原因: ブラウザがOREngineエディタに接続していない
対処: ブラウザで http://localhost:3001 を開く

### シェーダーコンパイルエラー
原因: GLSL構文エラー
対処: `GET /editor/shader-errors` で詳細確認 → `references/shader-guide.md` 参照

### フィールド設定が反映されない
原因: targetUuid にエンティティUUIDを使っている（コンポーネントUUIDが必要）
対処: `GET /editor/entity/:uuid` でコンポーネントのUUIDを確認し、それを targetUuid に使う

詳細は `references/troubleshooting.md` を参照。
```

### 5. SKILL.md本体の微調整

- **対象ファイル**: `.claude/skills/orengine/SKILL.md`
- **変更内容**:
  - 冒頭の説明文を少し具体化（「何ができるか」を簡潔に）
  - Decision Mapのリファレンスへの誘導文を「必要な場合のみ参照」から「詳細が必要な場合のみClaudeが自動参照する」に変更（progressive disclosureの意図を明確化）

## 変更対象ファイル一覧

- [x] `.claude/skills/orengine/SKILL.md` - frontmatter改善、Examples追加、Troubleshooting追加、微調整

## 最終的なSKILL.md構造（改善後）

```
---
name: orengine
description: [What it does] + [When to use it] + [Do NOT use for]
allowed-tools: ...
metadata:
  author: ukonpower
  version: 1.1.0
---

# OREngine スキル
（冒頭説明 - 簡潔に）

## 前提条件

## Decision Map

## 鉄則: 操作前の既存シーン確認（必須）

## Canonical Flows
### Flow 1: シーン構築
### Flow 1.5: シーン確認（スクリーンショット）
### Flow 2: リソース作成
### Flow 3: シェーダー編集
### Flow 4: コンポーネント開発

## Examples              ← NEW
### Example 1: 新規シーン構築
### Example 2: 既存シーンへの追加
### Example 3: カスタムシェーダー

## Guardrails

## Common Issues         ← NEW

## References
```

## 考慮事項・リスク

- **description文字数**: 1024文字以内に収める必要あり。改善案は約450文字なので余裕あり
- **SKILL.mdサイズ**: Examples + Troubleshooting追加で約40行増加 → 約220行。ガイドの「5,000 words以下」推奨に十分収まる
- **プラグイン版との乖離**: ローカル版のみ改善するため、プラグイン版との差はさらに広がる。別タスクでプラグイン版も更新が望ましい

## テスト方針

- 改善後のdescriptionでスキルが適切にトリガーされるか手動テスト
  - ✅ トリガーすべき: 「シーンを作って」「エンティティを追加して」「シェーダーを書いて」
  - ✅ トリガーすべき: 「オブジェクトを3つ配置して」（言い換え）
  - ❌ トリガーすべきでない: 「TypeScriptのジェネリクスの使い方を教えて」
  - ❌ トリガーすべきでない: 「GLSLのvec4の構文を教えて」
- `npm run typecheck` で型エラーがないこと確認（コード変更なしなので不要だが念のため）
