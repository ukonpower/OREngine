# Research: orengineスキルの見直し（Anthropic公式ガイド準拠）

## タスク概要

Anthropic公式「The Complete Guide to Building Skills for Claude」の内容に基づき、OREngineのorengineスキルを見直す。PDFガイドのベストプラクティスと現状のスキル構造を比較し、改善点を特定する。

## 現状のスキル構成

### 2つのバージョンが存在
| バージョン | パス | 行数 | 特徴 |
|-----------|------|------|------|
| ローカル版 | `.claude/skills/orengine/SKILL.md` | 178行 | progressive disclosure対応、references/あり |
| プラグイン版 | `plugins/.../orengine-tools/.../scene-builder/SKILL.md` | 318行 | APIリファレンス全インライン、references/なし |

### ローカル版のファイル構造
```
.claude/skills/orengine/
├── SKILL.md                              # 178行
├── scripts/
│   └── check-server.sh
└── references/
    ├── api-scene.md                      # 201行
    ├── api-resources.md                  # 85行
    ├── components-catalog.md             # 80行
    ├── component-development.md          # 182行
    ├── shader-guide.md                   # 159行
    └── troubleshooting.md               # 93行
```
合計: SKILL.md 178行 + references 800行 = 978行

## PDFガイドのベストプラクティスとの比較

### 1. Description（トリガー記述）— 要改善

**ガイドの推奨構造:** `[What it does] + [When to use it] + [Key capabilities]`

**現状のdescription:**
```yaml
description: >
  This skill should be used when the user asks to "シーンを作って", "エンティティを追加",
  "オブジェクトを配置", "マテリアルを設定", ...
  or mentions scene construction, entity manipulation, component development,
  shader programming, or 3D object placement in OREngine.
```

**問題点:**
- 「What it does」（何をするか）が完全に欠落。トリガーフレーズの羅列のみ
- ガイドのBad example の逆パターン: トリガーはあるが目的がない
- descriptionの構造: `[目的] + [トリガー] + [主要機能]` にリストラクチャすべき

**ガイドの良い例との比較:**
```
# ガイドの良い例
"Manages Linear project workflows including sprint planning, task creation,
and status tracking. Use when user mentions 'sprint', 'Linear tasks',
'project planning', or asks to 'create tickets'."

# 現状（悪い）
"This skill should be used when the user asks to 'シーンを作って'..."
→ 何をするスキルなのかが書かれていない
```

### 2. Progressive Disclosure（段階的開示）— ローカル版は良好

**ガイドの3レベルシステム:**
- Level 1（YAML frontmatter）: 常にロード → トリガー判定用
- Level 2（SKILL.md body）: 関連時にロード → コアワークフロー
- Level 3（references/）: 必要時のみClaudeが参照 → 詳細リファレンス

**ローカル版: ✅ 概ね良好**
- SKILL.md: Decision Map + Canonical Flows + Guardrails
- references/: 詳細API・カタログ・ガイド
- 「リファレンスは問題が発生したときのみ参照する」と明記 ✅

**プラグイン版: ❌ 非対応**
- 318行のSKILL.mdにAPIリファレンス全体がインライン
- references/なし → Level 2と3が混在

### 3. SKILL.md本体の構造 — Examplesが欠落

**ガイドの推奨構造:** Instructions → Steps → **Examples** → **Troubleshooting**

**現状:**
- 前提条件 ✅
- Decision Map ✅（良い工夫）
- 鉄則（操作前確認） ✅
- Canonical Flows ✅
- Guardrails ✅
- References リスト ✅
- **Examples セクション ❌ 欠落** — ガイドが強く推奨
- **Troubleshooting（インライン） ❌ 欠落** — references/にはあるが、よくあるエラーのクイックフィックスがSKILL.md内にない

### 4. 命名・構造ルール — ✅ 準拠

| 項目 | 現状 | 判定 |
|------|------|------|
| SKILL.md命名 | `SKILL.md` | ✅ |
| フォルダ名 | `orengine` / `scene-builder` | ✅ kebab-case |
| README.md | なし | ✅ 正しい |
| allowed-tools | あり | ✅ |

### 5. metadataフィールド — ❌ なし

ガイドは author, version, mcp-server などの metadata を推奨。

### 6. negative trigger — ❌ なし

ガイドは overtriggering 防止のため、negative trigger（「Do NOT use for...」）を推奨。
現状、一般的なTypeScript/GLSL質問でもトリガーしうる。

### 7. エラーハンドリング指示 — 要改善

ガイドは「Include error handling」を強く推奨。現状のGuardrailsセクションにエラー時の対処が一部あるが、具体的なエラーメッセージと対処法のペアが不足。

## 主要な改善ポイントまとめ

### 優先度高
1. **description改善**: `[目的] + [トリガー] + [主要機能]` に再構成
2. **Examplesセクション追加**: 具体的な使用シナリオ2-3個
3. **プラグイン版の更新**: references/を活用したprogressive disclosure対応

### 優先度中
4. **Troubleshootingのインライン化**: よくあるエラー（サーバー未起動、ブラウザ未接続、503）のクイックフィックス
5. **metadataフィールド追加**: version, author
6. **negative trigger追加**: 一般プログラミングやGLSL文法の質問ではトリガーしないよう明示

### 優先度低
7. **SKILL.mdサイズ**: 178行は「5,000 words以下」推奨の範囲内で問題なし

## 関連ファイル

| ファイル | 役割 |
|---------|------|
| `.claude/skills/orengine/SKILL.md` | ローカル版メインスキル（**主な改善対象**） |
| `.claude/skills/orengine/scripts/check-server.sh` | サーバー状態確認スクリプト |
| `.claude/skills/orengine/references/*.md` | 6つのリファレンスファイル |
| `plugins/.../orengine-tools/.../scene-builder/SKILL.md` | プラグイン版スキル |

## 制約・注意点

- ローカル版は**このプロジェクト専用**（`.claude/skills/`配下）
- プラグイン版は**claude-plugins リポジトリ**で管理（別リポジトリ）
- description内でXMLタグ（`<` `>`）は使用禁止
- description は 1024文字以内

## PDFガイドから特に重要なポイント

- descriptionは「Claudeがスキルをロードするか判断する最重要フィールド」
- 「What it does + When to use it + Key capabilities」の構造
- Progressive disclosureの3レベル設計
- Examples と Troubleshooting は recommended structure の必須要素
- negative trigger で overtriggering を防止
- 「Instructions too verbose → Keep instructions concise, Use bullet points」
- 「Critical instructions at the top, Use ## Important headers」
