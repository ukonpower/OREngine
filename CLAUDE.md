# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクトの目的と最重要制約（64kb intro）
- OREngine の主目的は **64kb intro 制作**。最終成果物は player ビルド（`npm run build` → `dist/player/out.html`）であり、この **packed サイズが最重要指標**
- エディタ（React UI / server）は制作を支える道具であって主役ではない。player ビルドに editor / server の関心事を持ち込まない（eslint-plugin-boundaries で機械的に防止している）
- core / builtin に機能を足すときは「それは64kランタイムに必要か」を必ず問う。エディタ都合の機能は editor 側に置く
- ランタイム（player に入るコード）には外部依存を追加しない
- サイズへの影響は必ず `npm run build` の packed（out.html）サイズで実測して判断する。minify前のコード量や gzip 前のバンドルサイズで判断しない
- tree-shaking を壊すパターンを避ける: `import * as NS` したメンバーを `extends` しない（extends 対象は named import にする）、`export namespace` を使わない（個別 `export function` にする）

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
npm run build        # player バンドルのプロダクションビルド + compeko で自己解凍 html にパック（dist/player/out.html）
npm run build:static # static (エディタ込み HTML) のビルド
npm run lint         # ESLint実行
npm run typecheck    # TypeScript型チェック
```

OREngine 自体の開発エントリは `orengine/host/` に集約されている:

- `host/index.ts` / `host/runner.ts` - `runDev` / `runBuildPlayer` / `runBuildStatic` の API
- `host/app/` - 全プロジェクト共通の `index.html` / `static.html` / `src/` / `Resources/registry.ts`

`scripts/run.mjs` がこれらを呼び出して `demo-webgl/` / `demo-webgpu/` を駆動する。projectDir 引数を変えれば任意のプロジェクトディレクトリで動作するため、外部リポ（ORShorts 等）からも `orengine/host` を import して利用できる（`exports."./host"` で公開）。

`runDev` は express（`host/server/factory.ts`）と vite devサーバーを同一プロセスで起動する。express は `scene.json` / `editor.json` の読み書きを行うファイルI/O層のみで、シーン編集用の操作APIは持たない。コンポーネントファイルや `.tex` の編集は直接ファイル編集で行う。シーンの編集は `scene.json` の直接編集で行い、vite のプロジェクトwatch（`host/vite/plugins/ProjectWatchReload`）が外部からの変更を検知してブラウザを自動リロードする。

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
- **極力シンプルに実装する**。動く最小のコードを書き、将来の拡張を見越した抽象化・設定オプション・汎用化は書かない（必要になった時点で書く）
- **後方互換性は考慮しない**。シンプルでフラットな実装を優先する（旧APIのエイリアス保持、deprecated ラッパー、移行期間のための分岐などは書かない）
- 後方互換性が必要な場合はユーザーが明示的に指示する
- 使われなくなったコード・フィールド・型は残さず削除する
- 同じ機能に二重の経路（例: REST 経由とファイル直編集の併存）を作らない。1機能1経路

## シェーダー実装の注意
シェーダーはビルド時に `#include <module:名前>` / `#include <part:名前>` を解決した完成形を shader_minifier で一括minifyする方式（`host/vite/plugins` の ShaderBuilder）。dev でも minify が走るのは意図的（minifier による破壊を保存→リロードで即検知するカナリア）。この前提から:

- モジュール/part を個別・断片のまま minify に渡す方式へ戻さない
- include は `#include <module:名前>` / `#include <part:名前>` 形式。`webgl/ShaderParser` の `shaderModules/名前.module.glsl` / `shaderParts/名前.part.glsl` をビルド時に動的解決するので、ファイルを置くだけで登録は不要。解決できない include はビルドエラーになる
- ソースに `//[` `//]`（minifier の verbatim マーカー）を書かない（区間内だけリネームされず宣言側と食い違って壊れる）
- uniform 構造体のフィールド名（CPU側が `'directionalLight[0].direction'` 形式で参照する名前）はローダーが自動抽出して保護している。この形式の参照を増やしたら minify 後の描画を確認する
- minify 結果の構文検証はブラウザ不要で `glslangValidator`（`brew install glslang`）に最終結合形を食わせると確実。デバッグダンプは `tmp/shader-minified/`

## WGSL（WebGPUバックエンド）の注意
WGSLは `.wgsl` ファイルに置き、`import xxxWgsl from './xxx.wgsl'` で読む。ローダーは `host/vite/plugins/WgslLoader` で、GLSL側の ShaderBuilder とは別系統（shader_minifier はGLSL専用なのでWGSLはminifyしない）。

- 置き場所は、使う側と同じディレクトリの `shaders/`。1シェーダー1ファイル
- include は2形式（同じファイルは1回だけ展開される）: 近くのファイルへの分割は `#include "./相対パス.wgsl"`、プロジェクト共有モジュールは `#include <module:名前>`（`<projectDir>/Resources/shaders/名前.wgsl` を解決。ファイルを置くだけで登録は不要）
- 束縛の宣言（`@group ... var<uniform>` や uniform struct）と、パス生成時に値が決まる定数（ぼかし重み・カーネル等）はTS側が完成形の先頭に前置する。WGSLファイル側は、外から与えられる名前を冒頭コメントに書いておく
- 新しい `.wgsl` を足しても設定変更は不要（拡張子で拾う）
- `.wgsl` はHMR対応。`.wgsl` を直接 import するモジュールが `import.meta.hot.accept` でソースを差し替え、`webgpu/backend/HotReload` の `requestShaderReload()` で Renderer / EditorDraw が資源を作り直す。複数箇所から import されるモジュール（Bindings / Lights / PostProcess / Material のようなハブ）に `.wgsl` を足したら、そのモジュール自身に accept を書く（書かないとHMRがエントリまで波及してフルリロードに落ちる）
- HMR対象外（変更はフルリロード）: `standardVertex.wgsl`（コンポーネント側で連結キャプチャされるため）、エディタギズモの `flat.wgsl` / `mask.wgsl`（生成済み Material が配布先に保持されるため）

## 命名規則
- **クラス/インターフェース/型**: PascalCase（`Entity`, `ComponentUpdateEvent`, `RenderStack`）
- **メソッド/関数/変数**: camelCase（`updateImpl`, `matrixWorld`, `autoMatrixUpdate`）
- **protectedフィールド**: アンダースコアプレフィックス `_`（`_entity`, `_enabled`, `_tag`）
- **privateフィールド**: サフィックス `_` またはプレフィックスなし（`fields_`, `componentsSorted`）
- **モジュールディレクトリ（非React層。`index.ts` から `export *` される公開モジュール）**: PascalCase ディレクトリ + `index.ts`（`Entity/`, `Component/`, `Serializable/`, `EngineContract/`）:
  - 1ファイルで収まるモジュールも直置き `.ts` にせずディレクトリを掘る（`glpower/GLPowerBuffer/index.ts`, `mathpower/Vector/index.ts`）
  - interface だけのモジュールも同じ（`Contracts/Engine.ts` ではなく `Contracts/EngineContract/index.ts`）
  - 関数しか持たないモジュールも同じ。ディレクトリ名は関数名ではなく名詞のモジュール名にする（`setupCameraPostProcess.ts` → `CameraPostProcess/index.ts`、`hotReload.ts` → `HotReload/index.ts`）
- **カテゴリディレクトリ（複数モジュールをまとめる中間層）**: 役割で分ける層は lowercase（`engine/`, `editor/`, `lib/`, `components/`, `ui/`, `features/`, `hooks/`, `contexts/`, `providers/`, `pages/`, `styles/`）。同種のモジュールを集める層は PascalCase の複数形（`Components/`, `Geometries/`, `Resources/`, `Contracts/`）。**兄弟が1つしかない中間層は作らない**（`mathpower/Math/` のようにパッケージ内で唯一のカテゴリは情報を持たないのでパッケージ直下へ展開する）
- **Reactコンポーネント**: PascalCase関数コンポーネント（`const Screen = () => {}`）、`ComponentName/index.tsx` + `index.module.scss`
- **React層の hooks / contexts / providers / lib**: ディレクトリを掘らず直置きファイル（`hooks/useOREditor.ts`, `contexts/OREditorContext.tsx`, `providers/OREditorProvider.tsx`, `lib/types.ts`）。詳細は「editor の React 層構造」を参照
- **Reactフック**: `use` プレフィックス camelCase（`useOREditor`, `useSerializableField`）
- **SCSSモジュール**: `index.module.scss`、BEM風ネスト（`&_tabs`, `&_right`）
- **パッケージ名前空間**: `import * as BSP from 'basepower'`, `import * as MTP from 'mathpower'`, `import * as GLP from 'glpower'`, `import * as MXP from 'maxpower'`。extends する対象は namespace 経由にせず named import で取る（tree-shaking のため）

## editor の React 層構造（components / features）
`packages/orengine/editor` の React 層は vibecoding-template-next の feature 設計に合わせる。

```
editor/
├── components/
│   ├── ui/       # 汎用UIコンポーネント（Button, Panel, Input 等。features に依存しない）
│   └── pages/    # 画面コンポーネント（features を組み立てる組成層。EditorPage 等）
├── features/     # 機能単位（PascalCase）
│   └── {FeatureName}/
│       ├── index.tsx + index.module.scss  # メインコンポーネント（主要UIがある場合のみ）
│       ├── components/   # 機能専用サブコンポーネント（ComponentName/index.tsx）
│       ├── hooks/        # カスタムHooks（useXxx.ts 直置き）
│       ├── providers/    # Context Provider 実装（XxxProvider.tsx 直置き）
│       ├── contexts/     # React Context 定義（XxxContext.tsx 直置き。feature 内部専用）
│       └── lib/          # 非Reactロジック（レンダラー・純ロジック・型定義）
├── lib/          # エディタ中核の非React層（Editor クラス・gizmo・入力等。dir+index.ts 形式）
└── styles/       # 共有Sass partial
```

- 依存方向は `pages → features → components/ui` の一方向。`components/ui` から features を import しない（既知の例外: `ui/Input` の一部が InputWindow feature に依存している）
- feature の主要UIは `{FeatureName}/index.tsx` に置く。`features/Timeline/components/Timeline/` のように feature 名を二重に掘らない
- Context は「定義を `contexts/`、Provider 実装を `providers/`」に分離する。Context 値の生成ロジックは `hooks/useXxxContext.ts` に置く

## TypeScript設定
- strict: true
- noUnusedLocals / noUnusedParameters: true
- `@typescript-eslint/no-explicit-any`: off（`any` の使用は許可）
- `@typescript-eslint/no-namespace`: off
- jsx: react-jsx

## パスエイリアス
- `basepower` → `packages/basepower`（EventEmitter・ID・共有型などドメイン非依存の最下層基盤。他パッケージに依存しない）
- `mathpower` → `packages/mathpower`（ベクトル・行列・クォータニオン等の数学。basepower のみに依存）
- `glpower` → `packages/glpower`（素の WebGL API ラッパー。basepower / mathpower のみに依存）
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

## プロジェクト構造（demo-webgl・demo-webgpu / 外部プロジェクト共通）
プロジェクトディレクトリの中身は `Resources/` / `scene.json` / `editor.json` / `public/` のみ。HTML / src / vite config 等のボイラープレートはすべて `host/app/` に集約されている。

プロジェクト固有のデータは Vite の `resolve.alias` 経由で参照する:
- `@or-scene` → `<projectDir>/scene.json`
- `@or-editor` → `<projectDir>/editor.json`
- `@or-resources/*` → `<projectDir>/Resources/*`

## アクティブプロジェクト切替
- ルート直下の `orengine.config.json` の `project` で切替
- 一時切替は `ORENGINE_PROJECT=<name> npm run dev`
