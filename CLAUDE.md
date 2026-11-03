# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクトの目的と最重要制約（64kb intro）
- OREngine の主目的は **64kb intro 制作**。最終成果物は player ビルド（`npm run player:build` → `dist/player/out.html`）であり、この **packed サイズが最重要指標**
- エディタ（React UI / server）は制作を支える道具であって主役ではない。player ビルドに editor / server の関心事を持ち込まない（eslint-plugin-boundaries で機械的に防止している）
- core / builtin に機能を足すときは「それは64kランタイムに必要か」を必ず問う。エディタ都合の機能は editor 側に置く
- ランタイム（player に入るコード）には外部依存を追加しない
- サイズへの影響は必ず `npm run player:build` の packed（out.html）サイズで実測して判断する。minify前のコード量や gzip 前のバンドルサイズで判断しない
- tree-shaking を壊すパターンを避ける: `import * as NS` したメンバーを `extends` しない（extends 対象は named import にする）、`export namespace` を使わない（個別 `export function` にする）

## リポジトリ構成

### パッケージとパスエイリアス
- `basepower` → `packages/basepower`（EventEmitter・ID・共有型などドメイン非依存の最下層基盤。他パッケージに依存しない）
- `mathpower` → `packages/mathpower`（ベクトル・行列・クォータニオン等の数学。basepower のみに依存）
- `glpower` → `packages/glpower`（素の WebGL API ラッパー。basepower / mathpower のみに依存）
- `uipower` → `packages/uipower`（エディタ UI プリミティブとデザイントークン。react 以外に依存しない。エンジン・editor への依存は禁止）
- `maxpower` → `packages/maxpower/webgl`（エンジン本体。core + WebGLバックエンドの束。`packages/maxpower` は `core` / `webgl` / `webgpu` / `headless` の4分割）
- `maxpower/webgpu` → `packages/maxpower/webgpu`（WebGPUバックエンド）
- `@or-renderer` → 選択中レンダラーのバックエンド。vite がビルド時に `maxpower/webgl` か `webgpu` へ固定する（player ビルドへの WebGPU コード混入防止）。tsconfig 上は webgl 固定
- `orengine` → `packages/orengine/index.ts`（**ランタイム専用エントリ**。エディタ関心事を含まない）
- `orengine/editor` → `packages/orengine/editor/lib/index.ts`（エディタ中核ロジック）
- `orengine/react` → `packages/orengine/react.tsx`（Reactエントリ: editor/components + editor/features）
- `orengine/core` → `packages/orengine/core/index.ts`
- `orengine/player` → `packages/orengine/player/index.ts`
- `orengine/server` → `host/server/factory.ts`（express ベースのファイルI/O API。プロジェクト側サーバー拡張の型 `EditorServerExtension` もここから）
- `orengine/host` → `host/index.ts`
- `orengine/configs` → `host/vite/configs.ts`
- `orengine/*` → `packages/orengine/*`（その他のサブパス）

### 開発エントリ（host/）
OREngine 自体の開発エントリは `host/` に集約されている:

- `host/index.ts` / `host/runner.ts` - `runDev` / `runBuildPlayer` / `runBuildStatic` の API
- `host/app/` - 全プロジェクト共通の `index.html` / `static.html` / `src/` / `Resources/registry.ts`

`scripts/run.ts` がこれらを呼び出して `demo-webgl/` / `demo-webgpu/` を駆動する。projectDir 引数を変えれば任意のプロジェクトディレクトリで動作するため、外部リポ（ORShorts 等）からも `orengine/host` を import して利用できる（`exports."./host"` で公開）。

`runDev` は express（`host/server/factory.ts`）と vite devサーバーを同一プロセスで起動する。express は `scenes/<name>.json` / `editor.json` の読み書き（シーン一覧の取得を含む）を行うファイルI/O層のみで、シーンを編集する処理は持たない。シーンの編集はエディタ内の `EditorAPI`（`packages/orengine/editor/lib/EditorAPI`）が唯一の実装で、GUI と下記のシーン CLI（AgentBridge）はどちらもここを通る。人間は `scenes/<name>.json` を直接編集してもよく、vite のプロジェクトwatch（`host/vite/plugins/ProjectWatchReload`）が外部からの変更・シーンファイルの増減を検知してブラウザを自動リロードする（リロードでタブ上の未保存の変更は消える）。コンポーネントファイルや `.tex` の編集は直接ファイル編集で行う。

### シーン CLI（AgentBridge）
dev サーバー起動中に、開いているエディタタブ（無ければ headless Chromium）でシーンを観測・編集・撮影する CLI（`npx tsx scripts/scene.ts help` で一覧）。使う前・AgentBridge を触る前に `packages/orengine/editor/lib/AgentBridge/CLAUDE.md` を読む

### プロジェクトディレクトリ（demo-webgl・demo-webgpu / 外部プロジェクト共通）
プロジェクトディレクトリの中身は `Resources/` / `scenes/` / `editor.json` / `public/` / `editor/` のみ。HTML / src / vite config 等のボイラープレートはすべて `host/app/` に集約されている。

プロジェクト固有のデータは Vite の `resolve.alias` 経由で参照する:
- `@or-scene` → `<projectDir>/scenes/<scene>.json`（`scene` は `OrengineConfigOptions.scene` / `HostRunOptions.scene`。省略時 `main`）
- `@or-editor` → `<projectDir>/editor.json`
- `@or-resources/*` → `<projectDir>/Resources/*`
- `@or-project-editor/*` → `<projectDir>/editor/*`

### エディタ拡張・フィールド UI・コンポーネントパネル
プロジェクトからエディタにパネル・API route を足す `<projectDir>/editor/`、フィールドごとの UI とコンポーネント専用パネルを足す `Resources/Components/**/editor.tsx`。書く前に `packages/orengine/editor/features/OREditor/lib/CLAUDE.md` を読む

### 点の編集の部品・エディタの選択と親の付け替え
編集領域・モーダル・`PointTransformModal`・`PointSelection`・`PointerDrag` と、エンティティの複数選択・`TransformTargets`・親の付け替えの仕様は `packages/orengine/editor/lib/CLAUDE.md`

### キーフレームアニメーション
フィールドにキーを打って player で再生する仕組み（Animation コンポーネント・シーンの `curves`・Timeline の KeyEditor・BLidge のカーブ）。仕様は `packages/orengine/editor/lib/KeyFrameField/CLAUDE.md`（maxpower の Animation・BLidge・KeyEditor を触るときも読む）

### Cloner（テンプレートの複製）
直下の子をテンプレートとして並べ方の数だけ実行時に複製する builtin コンポーネント。仕様は `packages/orengine/builtin/Components/Utility/Cloner/CLAUDE.md`

### Music（音）
楽器の GLSL から曲を作って鳴らす builtin コンポーネント（webgl のみ）。仕様は `packages/orengine/builtin/Components/Utility/Music/CLAUDE.md`、Music パネル・ピアノロールは `packages/orengine/editor/features/OREditor/features/Music/CLAUDE.md`（楽器や Music を読むコンポーネントを書くときも読む）

### アクティブプロジェクト・レンダラー切替
- 環境変数 `ORENGINE_PROJECT=<name>` / `ORENGINE_RENDERER=<webgl|webgpu|headless>` で切替（デフォルトは demo-webgl / webgl。`npm run wgpu` は webgpu + demo-webgpu のショートカット）。設定ファイルは無い（個人の作業状態を tracked ファイルに持たせない）
- dev サーバーの HTTPS 証明書は `ORENGINE_HTTPS_CERT` / `ORENGINE_HTTPS_KEY`（ファイルパス）で指定できる。両方あればその証明書で、無ければ webgpu 時のみ `@vitejs/plugin-basic-ssl` の自己署名証明書で立つ。mkcert 等で作った信頼済みの証明書を渡すと別ホストでも警告が出ない
- 個人の環境に依存する `ORENGINE_*`（証明書のパス等）は、リポジトリ直下の `.env.local`（`*.local` で gitignore 済み）に書けば `scripts/run.ts` が起動時に読む。シェルで指定した値が優先される
- 指定したプロジェクトディレクトリが存在しなければ `host/template/project` から雛形が生成される

### シーン（プロジェクト内の複数シーン）
- 1プロジェクトは `scenes/<name>.json` を複数持てる。各ファイルは自己完結（`name` / `scene` / `renderer` / `timeline`）で、シーン同士に関係は無い。共有するのは `Resources/` だけ
- シーン名 = ファイル名。英数字・`-`・`_` のみ（サーバーとエディタの両方で同じ制限）
- エディタは editor.json の `scene` キー（最後に開いたシーン）か一覧の先頭を開く。切替・新規作成は Scene パネルから。切替は `engine.load()` の差し替えで、未保存の変更は捨てられる
- player / static ビルドと `@or-scene` は1シーンだけを焼き込む。どれにするかは `ORENGINE_SCENE=<name>`（省略時 `main`）。ランタイムにシーンの概念は無く、実行時に別シーンを読みたい場合は利用側が JSON を用意して `engine.load()` を呼ぶ

### コンポーネント追加ルール
- `<project>/Resources/Components/<グループ>/<名前>/index.ts` に `export class Xxx extends MXP.Component` を置くだけで自動認識される
- `packages/orengine/builtin/Components/<グループ>/<名前>/index.ts` にビルトインコンポーネントを追加できる
- 自動認識の実体は `import.meta.glob`（`host/app/Resources/registry.ts` と `packages/orengine/builtin/index.ts`）。登録名は export されたクラス名になる
- 先頭が `_` のディレクトリはスキャン対象外

### ライブラリ（コンポーネントが名前で引く部品）
- コンポーネントが種類と名前で引く部品（Cloner の並べ方など）。`Engine.resources.addLibraryItem( kind, name, item )` / `getLibraryItem<T>( kind, name )` / `getLibraryItemNames( kind )`。中身の型は使うコンポーネントが決める
- builtin は `packages/orengine/builtin/Library/<種類>/<名前>/index.ts`、プロジェクトは `<project>/Resources/Library/<種類>/<名前>/index.ts` に `export default` で置くと、ディレクトリ名で登録される（同じ種類・名前はプロジェクトが上書き）
- player ビルドは、シーンで使われているものだけを焼き込む。コンポーネントの `index.ts` と同じディレクトリに `player.ts` を置き、`collectLibraryRefs( props ) → { kind, name }[]` を export すると、`PlayerRegistry` がシーンに置かれたそのコンポーネントの props ごとに呼ぶ。`player.ts` は Node（tsx）から直接読まれるので、ブラウザ向けのモジュールを import しない
- player ビルドでは、フィールド名 `a/b` の区切りごとの名前も terser の改名から外している（`host/vite/sceneScan.ts`）。オブジェクトのキーからフィールド名を組み立てるコンポーネント（Cloner の `params/<キー>`）があるため

## 開発ワークフロー

### ルール
- **絶対禁止**: ユーザーの明示的な指示なしに `git commit` や `git push` を実行しない
- **絶対禁止**: `npm run dev` を勝手に起動しない（ユーザーが明示的に指示した場合のみ実行する）
- **必須**: コミットメッセージは日本語で記述する
- **必須**: コード変更後は `npm run typecheck` で型チェックを実行し、続けて `npm run lint --fix` でESLintエラーを自動修正する
- **必須**: エンジン（`packages/maxpower` / `glpower` / `mathpower`、`packages/orengine` の core / builtin、GLSL / WGSL のシェーダーとそのビルド）を変更したら、影響のありそうなシーンを `npm run scene-shots` で撮り、描画に問題が無いことを確かめてから完了とする。手順は「シーンの撮影（scene-shots）」の節。scene-shots は専用のポートで dev サーバーを立て、終わったら閉じるので、上の `npm run dev` の禁止には当たらない。指示を待たずに実行する

### issue 運用
- TODO は GitHub issue で管理する。テンプレは `.github/ISSUE_TEMPLATE/`
- issue は2種類あるが、どちらも最終的に「そのまま着手できる粒度」へ収束させる
  - **タスク**（`task.md`）: 修正・変更の内容が決まっているもの。起票した時点で着手できる
  - **提案**（`proposal.md`）: 「こうしたい」から始まるもの。`needs-design` ラベル付きで起票し、issue 上の議論で本文の「仕様」節を埋める
- `needs-design` が付いている間は実装に着手しない。ラベルが外れている＝着手可
- 複数 PR に分かれるほど大きい提案は、仕様が固まった時点で子 issue を切り、親 issue から参照する
- 実装は issue に対応するブランチを切って行い、PR 本文に `Refs #<issue番号>` を書く
- PR のマージ先はリリースブランチなので `Closes #N` を書いても自動クローズされない。**PR がマージされたら issue を手動でクローズする**

### ブランチ運用
- `main` からリリースブランチ `release/vX.Y.Z`（例: `release/v0.0.1`）を切る
- `main` / リリースブランチへの直接コミットは禁止（branch protection でも強制）。作業はリリースブランチから対応ブランチ（`feature/xxx` 等）を切って行う
- 作業開始時に現在のブランチが作業内容と乖離している場合（リリースブランチ上にいる場合も含む）は、最新のリリースブランチから新しく対応ブランチを切ってから作業する
- 対応ブランチは PR 経由でリリースブランチへマージする
- PR の head ブランチは、マージされたら削除する。リモートは GitHub の「Automatically delete head branches」で自動削除される。`release/*` も main へのマージで消えるが、リリース時点のコードはタグ（`vX.Y.Z`）で残る。ローカルのブランチは自動では消えないので、マージ後に `git fetch --prune` してから `git branch -d <branch>` で消す
- 緊急修正のみ `hotfix/xxx` を `main` から切り、PR 経由で `main` へ直接マージする
- リリースは、リリースブランチを PR 経由で `main` へマージして行う。リリース時は GitHub にリリースを作成する
- リリース前に `package.json` の `version` をリリース番号に合わせて更新する（`npm version X.Y.Z --no-git-tag-version` で package-lock.json ごと更新し、PR 経由でリリースブランチへ入れる）
- PR のマージはすべて merge commit で行う（squash / rebase はリポジトリ設定で無効）
- バージョン番号はセマンティックバージョニングに従う。リリースブランチを切るのはユーザーだが、番号を提案するときは変更内容から major / minor / patch を判断する

### PR の書き方
- PR 本文は変更ファイル一覧の羅列ではなく、**実装のコアとなる実際のコードを引用しながら**説明する。「何を・なぜ・どう実現したか」を、その判断が現れているコード片（クラスの骨格、主要メソッド、データ構造など）を示して伝える
- ユーザーが直接触る API（`orengine` ランタイム API、コンポーネントの拡張点、エディタから使う関数など）を追加・変更した場合は、**利用側から見た使い方のイメージコード**を載せる（実際の呼び出し例。読者が自分のコードに書くとどうなるかが分かる形）
- 引用するコードは PR の差分からそのまま抜く。本文用に書き直したり簡略化しすぎたりしない（説明と実装が食い違わないようにするため）

### コマンド
```bash
npm run shader-minifier:setup # shader_minifier + mono のセットアップ（macOS / Linux。CI と同じ 1.6.0 に固定）
npm run dev          # 開発サーバー起動（express + vite）
npm run wgpu         # WebGPUレンダラーで開発サーバー起動（プロジェクトは既定で demo-webgpu）
npm run player:build # player バンドルのプロダクションビルド + compeko で自己解凍 html にパック（dist/player/out.html）
npm run editor:build # エディタ込み HTML のビルド（GitHub Pages のエディタデモ配信物）
npm run storybook:dev # Storybook 開発サーバー起動（port 6006）
npm run vrt          # Storybook をビルドして VRT（スクリーンショット比較テスト）を実行
npm run vrt:update   # VRT の基準スクリーンショットを更新
npm run scene-shots  # demo-webgl / demo-webgpu の全シーンを撮影して tests/scene-shots へ置く（ローカル Mac 専用。SCENES=foo,bar で絞れる）
npm run lint         # ESLint実行
npm run typecheck    # TypeScript型チェック + 全scssのコンパイル検証
```

### Storybook / VRT
- stories はコンポーネントと同居させる（`packages/uipower/**/*.stories.tsx` と `packages/orengine/editor/**/*.stories.tsx`）。設定は `.storybook/`（main.ts / vite.config.ts / decorators / fixtures）
- VRT（見た目のスクリーンショット比較テスト）は `tests/vrt/`（Playwright）。見た目に影響する変更をしたら `npm run vrt` で確認し、意図した変更なら `npm run vrt:update` で基準画像を更新する

### シーンの撮影（scene-shots）
3D の描画・ポストプロセスの変化と、webgl / webgpu の違いをファイルで確かめる仕組み（#245）。

- `npm run scene-shots` で demo-webgl（webgl）と demo-webgpu（webgpu）の全シーン（`scenes/*.json`）を撮り、`tests/scene-shots/<シーン名>-webgl.png` / `<シーン名>-webgpu.png` に置く（git 管理）。サブディレクトリは作らず `tests/scene-shots` の直下に並べるので、エクスプローラーの名前順で同じシーンの webgl と webgpu が隣に並ぶ。片方の demo にしか無いシーンは1枚だけになる
- 見方: 描画に関わる変更をしたら実行し、PNG の git の差分で描画の変化を見る。webgl と webgpu の違いは隣に並ぶ同じシーンの2枚で見比べる。比較用のビューアーは無い
- エンジンを変更したときの確認（「ルール」の節の必須項目）:
  - 撮るシーン: シーン名は描画の機能ごとに付けている（`light-*` / `material-*` / `post-*` など）ので、変更した機能のシーンを `SCENES=` で絞って撮る。レンダラーの土台（パイプライン・共有のシェーダーモジュール・ライティング）のように多くのシーンに効く変更や、どのシーンに効くか絞れない変更は全シーンを撮る
  - 確かめ方: 撮ったら `git status tests/scene-shots` で書き換わった PNG を見る。書き換わった PNG は変更前（`git show HEAD:<パス>` を scratchpad などへ書き出す）と変更後の両方を開いて見比べ、変化が変更の意図どおりかを判断する。真っ黒・描画の欠け・色や明るさのずれ・webgl と webgpu の食い違いのような意図しない変化があれば直して撮り直す。`[scene-shots] … でエラーが出ています` の出力も見る（エラーがあっても撮影は失敗扱いにならないため）
  - 意図どおりの変化なら、書き換わった PNG は変更と一緒に残す。完了の報告には、撮ったシーンと、書き換わった PNG ごとの判断を書く
- シーンを絞る: `SCENES=foo,bar npm run scene-shots`（カンマ区切り・名前の完全一致）。足したシーン・直したシーンだけを撮るとき用。撮るシーンが無いバックエンドは dev サーバーもブラウザも立てない。どちらの demo にも無い名前は撮る前にエラーで止まる。古い PNG の削除は絞り込みに関係なく全シーンで判断するので、絞っても他のシーンの PNG は消えない。環境変数で受けるのは、Playwright が CLI の位置引数を spec ファイルの絞り込みに使うため
- 撮り方は全シーン共通: 960x540、時刻 1 秒（`shot --time 1 --frames 60 --size 960x540` と同じ。0 秒から 1/60 秒ずつ 60 コマ進め、時間方向に積むパスを落ち着かせる）。シーンのエラー（`errors` と同じ内容）があれば `[scene-shots] <シーン名>（<バックエンド>）でエラーが出ています` と中身を出す。エラーがあっても撮影は続け、失敗扱いにはしない
- 書き換えの条件: Playwright の `toMatchSnapshot` と `updateSnapshots: 'changed'`（`tests/scene-shots/playwright.config.ts`）。無い PNG は書き、許容誤差（`threshold: 0.1`・`maxDiffPixels: 100`。根拠の実測は設定ファイルのコメント）を超えて変わった PNG だけを書き換える。誤差以内ならファイルに触れないので、何も変えずに撮り直しても git の差分は出ない（GPU の誤差などで、画素は撮るたびに少しずつ変わる）。どちらの demo にも無くなったシーンは2枚とも、片方から消えたシーンはその PNG を消す（消すのは `<シーン名>-webgl.png` / `<シーン名>-webgpu.png` の形のファイルだけで、spec・設定ファイルには触れない）。誤差以内の差も含めて撮り直すときは `npm run scene-shots -- --update-snapshots=all`
- 撮影の内部の流れ（開き直し・待ち方）とポートの割り当ては `tests/scene-shots/CLAUDE.md`
- ローカルの Mac 専用（Metal で描くため。CI には載せない）。main だけの今は1回約10秒

### CI / GitHub Pages
- `.github/workflows/deploy-pages.yml` — main への push でのみエディタデモと Storybook を gh-pages ブランチのルートへデプロイ（ルート = エディタデモ、`/storybook/`）。release/* への push ではデプロイしない
- `.github/workflows/pr-preview.yml` — main 向けの PR（主に release/* → main）ごとに `/pr-preview/pr-N/` へプレビューをデプロイし、リンクを PR にコメントする。release/* 向けの PR（feature/* → release/* 等）ではデプロイしない
- サブパス配信は `BASE_PATH` 環境変数で行う

## コーディング規約

### 実装方針
- **極力シンプルに実装する**。動く最小のコードを書き、将来の拡張を見越した抽象化・設定オプション・汎用化は書かない（必要になった時点で書く）
- **後方互換性は考慮しない**。シンプルでフラットな実装を優先する（旧APIのエイリアス保持、deprecated ラッパー、移行期間のための分岐などは書かない）
- 後方互換性が必要な場合はユーザーが明示的に指示する
- 使われなくなったコード・フィールド・型は残さず削除する
- 同じ機能に二重の経路（例: REST 経由とファイル直編集の併存）を作らない。1機能1経路

### 命名規則
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

### コメントの書き方
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

## editor の React 層構造（components / features）
`packages/orengine/editor` の React 層（components / features / hooks / contexts / lib）の置き方と依存方向は `packages/orengine/editor/CLAUDE.md`

## シェーダー実装の注意（GLSL）
シェーダーはビルド時に `#include <module:名前>` / `#include <part:名前>` を解決した完成形を shader_minifier で一括minifyする方式（`host/vite/plugins` の ShaderBuilder）。dev でも minify が走るのは意図的（minifier による破壊を保存→リロードで即検知するカナリア）。この前提から:

- モジュール/part を個別・断片のまま minify に渡す方式へ戻さない
- include は `#include <module:名前>` / `#include <part:名前>` 形式。`webgl/ShaderParser` の `shaderModules/名前.module.glsl` / `shaderParts/名前.part.glsl` をビルド時に動的解決するので、ファイルを置くだけで登録は不要。解決できない include はビルドエラーになる
- ソースに `//[` `//]`（minifier の verbatim マーカー）を書かない（区間内だけリネームされず宣言側と食い違って壊れる）
- uniform 構造体のフィールド名（CPU側が `'directionalLight[0].direction'` 形式で参照する名前）はローダーが自動抽出して保護している。この形式の参照を増やしたら minify 後の描画を確認する
- minify 結果の構文検証はブラウザ不要で `glslangValidator`（`brew install glslang`）に最終結合形を食わせると確実。デバッグダンプは `tmp/shader-minified/`

## WGSL（WebGPUバックエンド）の注意
WGSLは `.wgsl` ファイルに置き、`import xxxWgsl from './xxx.wgsl'` で読む。ローダーは `host/vite/plugins/WgslLoader` で、GLSL側の ShaderBuilder とは別系統（shader_minifier はGLSL専用なのでWGSLはminifyしない）。

- player ビルドの terser は `u[A-Z]…` / 大文字と `_` のみ / `__` 始まり以外のプロパティ名（protected の `_xxx` も改名される）を改名する（引用符付きキーも対象）。WGSL は minify されないので、**WGSL に出てくる識別子はビルド時に自動で改名対象から外している**（`WgslLoader` の `onSource` → `configs.ts` の `playerTerser`）。uniform / varying / storage / texture の辞書キーを WGSL の名前として使えるのはこのため
- 逆に、WGSL に出てこない文字列で JS のオブジェクトを引く表（`obj[ 'deferred' ]` や `TYPES[ type ]` のような動的アクセス）は改名で壊れる。文字列で引く表は `Map` で持つ。player ビルドは dev で動いても壊れることがあるので、ランタイムを触ったら player ビルドを実際に開いて確認する
- `.wgsl` の置き場所・include・束縛の前置・HMR は `packages/maxpower/webgpu/CLAUDE.md`
