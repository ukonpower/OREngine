# Research: マテリアル設定問題 & スキル配置・改善

## タスク概要
1. マテリアルが設定されていない問題の調査（実装の問題か、API呼び出しの問題か）
2. scene-builderスキルをClaude Codeから使えるよう正しく配置する
3. スキルでシーン編集時に既存シーン状況を必ず把握してから操作するよう改善

## 調査結果

### 1. マテリアル設定問題

**結論: マテリアル自体は正常に動作している。`material/name: ""` は「デフォルトマテリアル使用」を意味する正常な状態。**

#### マテリアルの仕組み

- `Mesh` コンポーネントの `material/name` フィールドでマテリアルを指定
- `""` (空文字) = `(None)` = デフォルトマテリアル (`new Material()`) を使用
- 名前付きマテリアルを使うには、事前にリソースとして登録されたマテリアルが必要
- `Mesh.getMaterialInstance(name)` でリソースから取得 → `_rebuildMaterial()` で適用

#### マテリアル処理フロー（`packages/maxpower/Component/Mesh/index.ts`）
```typescript
// 270-282行: マテリアルリビルド
private _rebuildMaterial() {
    if ( ! this._materialType ) return; // 空文字列ではreturn（デフォルトMaterial維持）
    const instance = Mesh.getMaterialInstance( this._materialType );
    if ( instance ) { this.material = instance; }
}
```

- `_materialType = ""` → `!""` は `true` → early return → `defaultMaterial` のまま
- `_materialType = "SomeName"` → `getMaterialInstance("SomeName")` で検索 → 存在すれば適用

#### 現状のProject0シーン
- 全Meshコンポーネントの `material/name` は `""` (デフォルトマテリアル)
- デフォルトマテリアルは `const defaultMaterial = new Material()` (10行目)
- 基本的なレンダリングは行われる（グレー/白のベーシックシェーディング）

#### APIでのマテリアル設定は正常
- バッチAPI: `"material/name": ""` → `props['material/name'] = ""` → 正しく保存される
- フィールドAPI: `targetUuid=コンポーネントUUID, path="material/name", value="MaterialName"` → 正しく設定される

**問題ではない理由**: `material/name: ""` はUIでも `(None)` と表示される正規の選択肢（201行目）。名前付きマテリアルを使いたい場合はリソース側でマテリアルアセットを作成する必要がある。

### 2. スキル配置問題

**結論: `skill/scene-builder.md` はClaude Codeのスキル認識パスにない。`.claude/commands/` に移動する必要がある。**

| 項目 | 現状 | あるべき姿 |
|------|------|-----------|
| ファイル配置 | `skill/scene-builder.md` | `.claude/commands/scene-builder.md` |
| ディレクトリ | `skill/` （Claude Code非認識） | `.claude/commands/` （スラッシュコマンドとして認識） |
| 使い方 | 手動で参照するしかない | `/scene-builder` で呼び出し可能 |

#### Claude Codeのスキル配置ルール
- **プロジェクトスコープ**: `.claude/commands/*.md` に配置 → `/コマンド名` で使用可能
- **ユーザースコープ**: `~/.claude/commands/*.md` に配置 → 全プロジェクトで使用可能
- YAMLフロントマター（`name`, `description`, `allowed-tools`）はそのまま使える

### 3. スキル内容の改善点

#### 3a. 既存シーン状況把握の必須化
現在のスキルの「ワークフロー」セクションのStep 1に「現在のシーン確認」があるが、弱い表現。
**強制的に最初に行うよう改善が必要。**

改善案:
- Step 1を「**必須**: 既存シーン状況の把握」に変更
- シーンツリー取得を**任意の操作の前提条件**として明記
- 既存エンティティの一覧を確認してから操作する旨を強調

#### 3b. マテリアル説明の追加
スキルの「利用可能なコンポーネント」セクションで `material/name` の説明が不足。

改善案:
- `material/name: ""` は「デフォルトマテリアル（None）」であることを明記
- 名前付きマテリアルはリソース登録済みのものしか使えないことを注記

## 関連ファイル・シンボル
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `skill/scene-builder.md` | - | 現在のスキルファイル（移動対象） |
| `packages/maxpower/Component/Mesh/index.ts` | `Mesh`, `_rebuildMaterial` | Meshコンポーネント、マテリアル処理 |
| `packages/orengine/ts/Engine/Resources/index.ts` | `getMaterialInstance` | マテリアルインスタンス管理 |
| `src/ts/Resources/index.ts:178-179` | static関数設定 | `Mesh.getMaterialList/Instance` のセットアップ |
| `projects/Project0/scene.json` | - | 現在のシーンデータ |

## 修正計画

### 修正1: スキルファイル移動（優先度: 高）
- `skill/scene-builder.md` → `.claude/commands/scene-builder.md` に移動
- `skill/` ディレクトリは削除

### 修正2: スキル内容改善 - シーン状況把握の必須化（優先度: 高）
- ワークフローの冒頭に「既存シーン確認は全操作の前提条件」と明記
- Step 1 を「**必須: 既存シーン状態の確認**」に強化
- 既存シーンへの追加・修正の場合、現在のエンティティ一覧を把握してから操作する旨を追加

### 修正3: スキル内容改善 - マテリアル説明追加（優先度: 中）
- `material/name` フィールドの説明を追加
- `""` = デフォルトマテリアル、名前付きマテリアルはリソース登録済みのもの

### 修正4: 不要な `skill/` ディレクトリの削除（優先度: 低）
- Claude Code非認識パスなので削除
