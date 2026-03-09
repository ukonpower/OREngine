# Plan: scene-builderスキルの充実化

## 概要

scene-builderスキルを、agent-deviceスキルの「Router, not Manual」パターンとClaude Code公式のプログレッシブ・ディスクロージャーに基づいて再構成する。

**主な変更:**
- SKILL.mdを軽量なルーターに再構成（Decision Map + Canonical Flows + Guardrails）
- reference.mdをreferences/ディレクトリに分割（4ファイル）
- examples/にcurlスクリプト例を追加（3ファイル）
- scripts/にユーティリティスクリプトを追加（1ファイル）
- descriptionにトリガーフレーズを追加

## 実装ステップ

### 1. ディレクトリ構造の作成

- **変更内容**: references/, examples/, scripts/ ディレクトリを作成
- **コマンド**:
  ```bash
  mkdir -p .claude/skills/scene-builder/{references,examples,scripts}
  ```

### 2. references/api-entities.md の作成

- **対象ファイル**: `.claude/skills/scene-builder/references/api-entities.md`
- **変更内容**: 現在のreference.mdからエンティティ操作関連のAPIを移動
- **含める内容**:
  - プロジェクト管理API（GET/POST/DELETE/PUT /projects）
  - シーン読み取りAPI（GET /editor/scene, /editor/entity/:uuid, /editor/search 等）
  - エンティティ操作API（POST/DELETE /editor/entity）
  - コンポーネント操作API（POST/DELETE /editor/entity/:uuid/component）
  - フィールド設定API（POST /editor/field, /editor/fields）
  - バッチ操作API（POST /editor/entities）
  - Undo/Redo, Save
  - オブジェクトコントロール（lookAt）

### 3. references/api-resources.md の作成

- **対象ファイル**: `.claude/skills/scene-builder/references/api-resources.md`
- **変更内容**: 現在のreference.mdからリソース管理APIを移動
- **含める内容**:
  - マテリアル管理API（Editor経由 + ファイルシステム直接）
  - テクスチャ管理API（Editor経由 + ファイルシステム直接）
  - シェーダー管理API
  - コンポーネントリソース管理API

### 4. references/components-catalog.md の作成

- **対象ファイル**: `.claude/skills/scene-builder/references/components-catalog.md`
- **変更内容**: 現在のreference.mdからコンポーネント一覧を移動・拡充
- **含める内容**:
  - 利用可能コンポーネント一覧テーブル（Mesh, Light, Camera等）
  - 各コンポーネントの全フィールド詳細
  - Mesh geometry/type の値とジオメトリ固有フィールド
  - material/name の値と説明
  - コンポーネントの組み合わせパターン（例: Camera + MainCamera + ShakeViewer + PostProcessPipeline）

### 5. references/troubleshooting.md の作成

- **対象ファイル**: `.claude/skills/scene-builder/references/troubleshooting.md`
- **変更内容**: 新規作成。エラーハンドリングとトラブルシューティング
- **含める内容**:
  - サーバー未起動時（connection refused）→ `npm run dev` で起動
  - ブラウザ未接続時の制限（Undo/Redo不可、一部リソースAPI制限）
  - UUID不正時のエラー
  - コンポーネント名が見つからない場合 → `GET /editor/components` で確認
  - フィールドパス不正時 → `GET /editor/entity/:uuid/component/:name` でfieldsDirectory確認
  - 保存失敗時の対処
  - Stop Conditions: いつアプローチを変えるべきか

### 6. examples/basic-scene.sh の作成

- **対象ファイル**: `.claude/skills/scene-builder/examples/basic-scene.sh`
- **変更内容**: 現在のSKILL.mdの「新規シーン構築」curlコマンドを独立スクリプトとして抽出
- **内容概要**:
  ```bash
  #!/bin/bash
  # 基本シーン構築: Floor + Light + Camera
  PROJECT="${1:-Project0}"
  # プロジェクト作成 → バッチエンティティ作成 → 保存
  ```

### 7. examples/add-entities.sh の作成

- **対象ファイル**: `.claude/skills/scene-builder/examples/add-entities.sh`
- **変更内容**: 現在のSKILL.mdの「既存シーンへのエンティティ追加」curlコマンドを抽出
- **内容概要**:
  ```bash
  #!/bin/bash
  # 既存シーンにエンティティを追加するフロー
  # エンティティ作成 → コンポーネント追加 → フィールド設定 → 保存
  ```

### 8. examples/material-workflow.sh の作成

- **対象ファイル**: `.claude/skills/scene-builder/examples/material-workflow.sh`
- **変更内容**: マテリアル作成→割当の一連フローのサンプル
- **内容概要**:
  ```bash
  #!/bin/bash
  # マテリアル作成 → Meshへの割当 → 保存
  ```

### 9. scripts/check-server.sh の作成

- **対象ファイル**: `.claude/skills/scene-builder/scripts/check-server.sh`
- **変更内容**: サーバー起動確認ユーティリティ
- **内容概要**:
  ```bash
  #!/bin/bash
  # サーバー起動確認、プロジェクト一覧表示、接続ステータス確認
  curl -sf http://localhost:3001/api/projects > /dev/null 2>&1 && echo "OK" || echo "NOT RUNNING"
  ```

### 10. SKILL.md の再構成

- **対象ファイル**: `.claude/skills/scene-builder/SKILL.md`
- **変更内容**: Router哲学に基づく軽量化・再構成
- **新しい構造**:

```markdown
---
name: scene-builder
description: >
  This skill should be used when the user asks to "シーンを作って", "エンティティを追加",
  "オブジェクトを配置", "マテリアルを設定", "ライトを追加", "カメラを配置",
  "シーンを修正", "コンポーネントを追加", "シェーダーを作成", "テクスチャを設定",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  or 3D object placement in OREngine. Operates via REST API against localhost:3001.
allowed-tools: Bash(curl:*), Bash(bash:*), Bash(chmod:*)
---

# Scene Builder

(purpose: 1-2行)

## 前提条件
(サーバー起動確認 - scripts/check-server.sh への参照)

## Decision Map

- 新規シーン構築 → Canonical Flow 1 + examples/basic-scene.sh
- 既存シーンにオブジェクト追加 → Canonical Flow 2 + examples/add-entities.sh
- マテリアル・テクスチャ設定 → Canonical Flow 3 + references/api-resources.md
- コンポーネントの詳細を知りたい → references/components-catalog.md
- API仕様の詳細 → references/api-entities.md / api-resources.md
- うまくいかない → references/troubleshooting.md

## 鉄則: 操作前の既存シーン確認（必須）
(現在の内容を維持、curlコマンド2つのみ)

## Canonical Flows
### Flow 1: 新規シーン構築（概要のみ、詳細はexamples/へ）
### Flow 2: 既存シーンへのエンティティ追加（概要のみ）
### Flow 3: マテリアル設定フロー（概要のみ）

## Command Skeleton
(APIエンドポイントの論理グループ一覧、構文のみ)

## Guardrails
- scene.jsonを直接編集しない。必ずREST API経由
- エンティティ作成後は必ず save を呼ぶ
- ルートエンティティの UUID は "0"
- バッチAPIを活用して効率的に操作する
- コンポーネントのフィールド設定にはコンポーネントUUIDを使う
- 操作前後に GET /editor/scene で確認する

## Common Mistakes
- エンティティUUIDをフィールド設定のtargetUuidに使う（正: コンポーネントUUID）
- parentUuidを省略する（正: "0" を明示）
- 保存を忘れる

## References
(references/ディレクトリの各ファイルへのリンク)
```

### 11. 旧reference.md の削除

- **対象ファイル**: `.claude/skills/scene-builder/reference.md`
- **変更内容**: 内容がreferences/に分割されたため削除

## 変更対象ファイル一覧

- [x] `.claude/skills/scene-builder/references/api-entities.md` - 新規作成
- [x] `.claude/skills/scene-builder/references/api-resources.md` - 新規作成
- [x] `.claude/skills/scene-builder/references/components-catalog.md` - 新規作成
- [x] `.claude/skills/scene-builder/references/troubleshooting.md` - 新規作成
- [x] `.claude/skills/scene-builder/examples/basic-scene.sh` - 新規作成
- [x] `.claude/skills/scene-builder/examples/add-entities.sh` - 新規作成
- [x] `.claude/skills/scene-builder/examples/material-workflow.sh` - 新規作成
- [x] `.claude/skills/scene-builder/scripts/check-server.sh` - 新規作成
- [x] `.claude/skills/scene-builder/SKILL.md` - 再構成（Router哲学）
- [x] `.claude/skills/scene-builder/reference.md` - 削除

## 考慮事項・リスク

- **情報欠落リスク**: reference.md → references/ 分割時に情報が抜ける可能性
  - 対策: reference.mdの全セクションをマッピングし、漏れをチェック
- **SKILL.md語数**: 日本語のため語数カウントが英語と異なる。500行以下・5,000語以下を目標
  - 対策: 完成後に行数チェック
- **allowed-tools拡張**: `Bash(bash:*)` と `Bash(chmod:*)` を追加してexamples/scripts実行を許可
  - リスク: 過度な権限付与 → bashスクリプトはcurl操作のみなので問題なし
- **旧reference.mdからの参照**: SKILL.md内の `[reference.md](reference.md)` リンクを更新する必要あり

## テスト方針

- SKILL.mdの行数が500行以下であること確認
- references/の各ファイルが参照可能であること確認
- examples/のスクリプトが `bash examples/basic-scene.sh` で実行可能であること確認
- scripts/check-server.sh が正しくサーバー状態を返すこと確認
- スキルが「シーンを作って」等のトリガーで呼び出されること確認（descriptionの有効性）
