# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発ワークフロー

### Git運用ルール
- **絶対禁止**: ユーザーの明示的な指示なしに `git commit` や `git push` を実行しない
- **必須**: コミットには `/commit` コマンドを利用する
- **必須**: コミットメッセージは日本語で記述する

### 開発サーバー運用ルール
- **絶対禁止**: `npm run dev` を勝手に起動しない
- **例外**: ユーザーが明示的に開発サーバーの起動を指示した場合のみ実行する

### コード変更後の確認
- **必須**: コード変更後は `npm run typecheck` で型チェックを実行する
- **必須**: コミット前に `npm run lint` を実行し、ESLintエラーを修正する

### ライブラリ利用時のドキュメント参照
- **必須**: 新しいライブラリを追加する場合、`context7` MCPサーバーでドキュメントを調査してから作業を開始する

## コマンド

```bash
npm run dev        # 開発サーバー起動（express + vite）
npm run build      # プロダクションビルド
npm run lint       # ESLint実行
npm run typecheck  # TypeScript型チェック
```

## コードスタイル（eslint-config-mdcs / MrDoob Code Style）
- インデント: **タブ**
- 括弧内スペース: `( value )`, `[ item ]`, `{ key: value }`
- セミコロン必須
- padded-blocks: ブロック・クラス・switch の開始/終了に空行
- import順序: builtin → external → internal → parent → sibling → index → object → type（アルファベット順、グループ間に空行）

## コメントの書き方
- **簡潔でわかりやすく**書く。何をしているかはコード自体で伝わるようにし、コメントは **なぜ** そうしているか等の補足に留める
- **禁止**: 実装差分・変更履歴を説明するコメント（`// 〜を追加`, `// 旧実装を削除`, `// 〜のため修正` 等）は書かない。差分は git で追える
- **関数の先頭**: その関数が何をしているかをざっくり一行で説明するコメントを書く

```ts
// エンティティのワールド行列を再計算して子に伝搬する
public updateMatrix() {
	// ...
}
```

- **セクション区切りコメント**: 大きなファイルで視覚的に構造を示したい場合、以下の形式を使用する

```ts
/*-------------------------------
	XXXXX
-------------------------------*/
```

  - クラス内のメンバーをカテゴリごとにまとめる、長いモジュールのセクションを区切る等の用途
  - 短いファイルには不要

## 実装方針
- **後方互換性は考慮しない**。シンプルでフラットな実装を優先する（旧APIのエイリアス保持、deprecated ラッパー、移行期間のための分岐などは書かない）
- 後方互換性が必要な場合はユーザーが明示的に指示する
- 使われなくなったコード・フィールド・型は残さず削除する

## 命名規則
- **クラス/インターフェース/型**: PascalCase（`Entity`, `ComponentUpdateEvent`, `RenderStack`）
- **メソッド/関数/変数**: camelCase（`updateImpl`, `matrixWorld`, `autoMatrixUpdate`）
- **protectedフィールド**: アンダースコアプレフィックス `_`（`_entity`, `_enabled`, `_tag`）
- **privateフィールド**: サフィックス `_` またはプレフィックスなし（`fields_`, `componentsSorted`）
- **ディレクトリ/モジュール**: PascalCase（`Entity/`, `Component/`, `Serializable/`）、各モジュールは `index.ts` をエントリポイントとする
- **Reactコンポーネント**: PascalCase関数コンポーネント（`const Screen = () => {}`）
- **Reactフック**: `use` プレフィックス camelCase（`useOREditor`, `useSerializableField`）
- **SCSSモジュール**: `index.module.scss`、BEM風ネスト（`&_tabs`, `&_right`）
- **パッケージ名前空間**: `import * as GLP from 'glpower'`, `import * as MXP from 'maxpower'`

## TypeScript設定
- strict: true
- noUnusedLocals / noUnusedParameters: true
- `@typescript-eslint/no-explicit-any`: off（`any` の使用は許可）
- `@typescript-eslint/no-namespace`: off
- jsx: react-jsx

## パスエイリアス
- `glpower` → `packages/glpower/packages/glpower/src`
- `maxpower` → `packages/maxpower`
- `orengine` / `orengine/*` → `packages/orengine/*`

## コンポーネント追加ルール
- `<project>/Resources/Components/<グループ>/<名前>/index.ts` に `export class Xxx extends MXP.Component` を置くだけで自動認識される
- `<project>/Resources/_data/componentList.ts` などは Vite プラグイン（`vite-plugins/ResourceManager`）が自動生成する。**手動で編集してはいけない**（`npm run dev` / `npm run build` で上書きされる）
- 先頭が `_` のディレクトリはスキャン対象外

## 設計ドキュメント（ADR）
- `docs/adr/` に設計判断の記録（Architecture Decision Records）がある
- **参照**: 関連する設計領域のコードを変更する前に、対応するADRを読んで設計意図を理解すること
- **更新が必要**: 設計の根幹（アーキテクチャパターン、データフロー方向、継承構造等）を変更するとき
- **更新不要**: APIエンドポイント追加、フィールド追加、UIコンポーネント追加、バグ修正、リファクタリング等の日常的な変更
- ADRには「なぜその設計にしたか」を書く。実装の詳細（API仕様、フィールド一覧等）はコードが正（source of truth）
- 既存の設計判断を廃止する場合は、ステータスを「廃止」に変更し、後継ADRへの参照を記載する

## アクティブプロジェクト切替
- ルート直下の `orengine.config.json` の `project` で切替
- 一時切替は `ORENGINE_PROJECT=<name> npm run dev`
