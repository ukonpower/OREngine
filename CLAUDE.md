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
- **必須**: コード変更後は `npm run typecheck` で型チェックを実行し、続けて `npm run lint --fix` でESLintエラーを自動修正する

### ライブラリ利用時のドキュメント参照
- **必須**: 新しいライブラリを追加する場合、`context7` MCPサーバーでドキュメントを調査してから作業を開始する

## コマンド

```bash
npm run dev          # 開発サーバー起動（express + vite）
npm run build        # player バンドルのプロダクションビルド
npm run build:static # static (エディタ込み HTML) のビルド
npm run lint         # ESLint実行
npm run typecheck    # TypeScript型チェック
```

OREngine 自体の開発エントリは `orengine/host/` に集約されている:

- `host/index.ts` / `host/runner.ts` - `runDev` / `runBuildPlayer` / `runBuildStatic` の API
- `host/app/` - 全プロジェクト共通の `index.html` / `static.html` / `src/` / `Resources/registry.ts`

`scripts/run.mjs` がこれらを呼び出して `demo/` を駆動する。projectDir 引数を変えれば任意のプロジェクトディレクトリで動作するため、外部リポ（ORShorts 等）からも `orengine/host` を import して利用できる（`exports."./host"` で公開）。

`runDev` は express（`host/server/factory.ts`）と vite devサーバーを同一プロセスで起動する。express は `scene.json` / `editor.json` / コンポーネントファイル / `.tex` の読み書きを行うファイルI/O層のみで、シーン編集用の操作APIは持たない。シーンの編集は `scene.json` の直接編集で行い、vite のプロジェクトwatch（`host/vite/plugins/ProjectWatchReload`）が外部からの変更を検知してブラウザを自動リロードする。

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
- **モジュールディレクトリ（クラス/コンポーネントを持つ葉ノード）**: PascalCase（`Entity/`, `Component/`, `Serializable/`, `OREditor/`, `Hierarchy/`, `Block/`）。各モジュールは `index.ts`（または `index.tsx`）をエントリポイントとする
- **カテゴリディレクトリ（複数モジュールをまとめる中間層）**: lowercase（`engine/`, `editor/`, `lib/`, `components/`, `features/`, `hooks/`, `contexts/`, `primitives/`, `composites/`, `pages/`, `styles/`）
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
- `orengine` → `packages/orengine/index.ts`（**ランタイム専用エントリ**: core + builtin。エディタ関心事を含まない）
- `orengine/editor` → `packages/orengine/editor.ts`（エディタ中核ロジック: `editor/lib`）
- `orengine/react` → `packages/orengine/react.tsx`（Reactエントリ: editor/components + editor/features）
- `orengine/core` → `packages/orengine/core/index.ts`
- `orengine/player` → `packages/orengine/player.ts`
- `orengine/server` → `host/server/factory.ts`（express ベースのファイルI/O API）
- `orengine/host` → `host/index.ts`
- `orengine/configs` → `host/vite/configs.ts`
- `orengine/*` → `packages/orengine/*`（その他のサブパス）

`orengine`（ランタイム）から `orengine/editor` / `orengine/react`（エディタ）への import は eslint-plugin-boundaries（`eslint.config.mjs`）でエラーになる。playerビルドにエディタコードが混入するのを機械的に防ぐための境界。

## コンポーネント追加ルール
- `<project>/Resources/Components/<グループ>/<名前>/index.ts` に `export class Xxx extends MXP.Component` を置くだけで自動認識される
- `packages/orengine/builtin/Components/<グループ>/<名前>/index.ts` にビルトインコンポーネントを追加できる
- 自動認識の実体は `import.meta.glob`（`host/app/Resources/registry.ts` と `packages/orengine/builtin/index.ts`）。登録名は export されたクラス名になる
- 先頭が `_` のディレクトリはスキャン対象外

## プロジェクト構造（demo / 外部プロジェクト共通）
プロジェクトディレクトリの中身は `Resources/` / `scene.json` / `editor.json` / `public/` のみ。HTML / src / vite config 等のボイラープレートはすべて `host/app/` に集約されている。

プロジェクト固有のデータは Vite の `resolve.alias` 経由で参照する:
- `@or-scene` → `<projectDir>/scene.json`
- `@or-editor` → `<projectDir>/editor.json`
- `@or-resources/*` → `<projectDir>/Resources/*`

## アクティブプロジェクト切替
- ルート直下の `orengine.config.json` の `project` で切替
- 一時切替は `ORENGINE_PROJECT=<name> npm run dev`
