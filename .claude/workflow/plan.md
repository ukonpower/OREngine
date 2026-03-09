# Plan: スキル配置修正 & シーン編集ワークフロー改善

## 概要
scene-builderスキルをClaude Codeから `/scene-builder` で呼び出せるよう正しいパスに配置し、
スキル内容を改善する（既存シーン確認の必須化、マテリアル説明追加）。

マテリアル設定自体は正常動作（`material/name: ""` = デフォルトマテリアル）であり、エンジン側のコード修正は不要。

## 実装ステップ

### 1. `.claude/commands/` ディレクトリ作成 & スキル移動
- **変更内容**:
  - `.claude/commands/` ディレクトリを作成
  - `skill/scene-builder.md` の内容を改善して `.claude/commands/scene-builder.md` に書き出す
  - `skill/` ディレクトリと `skill/scene-builder.md` を削除

### 2. スキル内容改善 - シーン状況確認の必須化
- **対象ファイル**: `.claude/commands/scene-builder.md`
- **変更内容**: ワークフローセクションの冒頭に「全操作の前提条件」として既存シーン確認を追加

  現在の `## ワークフロー > ### Step 1: 現在のシーン確認` を以下に置き換え:

  ```markdown
  ## 鉄則: 操作前の既存シーン確認（必須）

  **すべてのシーン操作の前に、必ず以下を実行して既存シーンの状態を把握すること。**
  この手順を省略してシーン操作を始めてはならない。

  ```bash
  # 1. プロジェクト一覧確認
  curl -s http://localhost:3001/api/projects | python3 -m json.tool

  # 2. シーンツリー取得（全エンティティの名前・UUID・構成）
  curl -s http://localhost:3001/api/projects/{PROJECT}/editor/scene | python3 -m json.tool
  ```

  取得結果から以下を把握する:
  - 既存エンティティの名前・UUID・親子関係
  - 重複作成を防ぐため、追加したいエンティティが既に存在しないか確認
  - 修正・削除対象のエンティティのUUIDを特定
  ```

### 3. スキル内容改善 - マテリアル説明追加
- **対象ファイル**: `.claude/commands/scene-builder.md`
- **変更内容**: Meshコンポーネントのテーブル後に以下を追加

  ```markdown
  ### material/name の値について

  | 値 | 説明 |
  |----|------|
  | `""` | デフォルトマテリアル（None）- 基本的なグレーシェーディング |
  | `"MaterialName"` | リソース登録済みの名前付きマテリアル |

  ※ 名前付きマテリアルはプロジェクトリソースとして事前登録が必要。
  バッチAPIで `"material/name": ""` を指定した場合はデフォルトマテリアルが適用される（正常動作）。
  ```

### 4. 不要な `skill/` ディレクトリの削除
- **変更内容**: `skill/scene-builder.md` と `skill/` ディレクトリを削除
- **注意点**: gitの追跡から外す

## 変更対象ファイル一覧
- [x] `.claude/commands/scene-builder.md` - 新規作成（改善済みスキル）
- [x] `skill/scene-builder.md` - 削除
- [x] `skill/` ディレクトリ - 削除

## 考慮事項・リスク
- フロントマター（`name`, `description`, `allowed-tools`）はそのまま維持
- `.claude/commands/` はgit管理されるため、コミット対象
- Claude Codeの再起動後にスキルが認識される

## テスト方針
- 移動後に `/scene-builder` でスキルが呼び出せることを確認
- スキル内容の「操作前確認」セクションが先頭にあることを目視確認
