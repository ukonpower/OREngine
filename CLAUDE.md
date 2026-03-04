# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド
- `npm run dev` - 開発サーバー起動（express + vite）
- `npm run build` - プロダクションビルド
- `npm run lint` - ESLint実行
- `npm run typecheck` - TypeScript型チェック（コーディング後に必ず実行すること）

## Git
- コミットメッセージは日本語で記述すること

## コードスタイル（eslint-config-mdcs / MrDoob Code Style）
- インデント: **タブ**
- 括弧内スペース: `( value )`, `[ item ]`, `{ key: value }`
- セミコロン必須
- padded-blocks: ブロック・クラス・switchの開始/終了に空行
- import順序: builtin → external → internal → parent → sibling → index → object → type（アルファベット順、グループ間に空行）

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
- `@typescript-eslint/no-explicit-any`: off（anyの使用は許可）
- `@typescript-eslint/no-namespace`: off
- jsx: react-jsx

## パスエイリアス
- `glpower` → `packages/glpower/packages/glpower/src`
- `maxpower` → `packages/maxpower`
- `orengine/*` → `packages/orengine/*`
- `~project/*` → `projects/default/*`
- `~/*` → `src/*`

## アーキテクチャ
- **glpower**: WebGL低レベルラッパー（Vector, Matrix, Quaternion, EventEmitter, GLPowerFrameBuffer等）
- **maxpower**: エンジンコア。Entity-Componentシステム、Serializable基底クラスによるシリアライズ/デシリアライズ、Renderer、Geometry、Material、PostProcess
- **orengine**: エディタUI（React）+ Engineクラス。tsx/components以下にパネル・入力・ビューコンポーネント
- **src/**: アプリケーションエントリ。EditorPage, ProjectSelectPage等
- 継承階層: `EventEmitter` → `Serializable` → `Entity` / `Component`
