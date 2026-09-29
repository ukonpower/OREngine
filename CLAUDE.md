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
dev サーバー起動中、開いているエディタタブ（最後にフォーカスされたもの）でシーンを観測・編集できる。応答は JSON。経路は CLI → dev サーバーの `POST /__agent/<command>`（`host/vite/plugins/AgentBridge`）→ HMR WebSocket → タブ（`packages/orengine/editor/lib/AgentBridge`）。

```bash
npx tsx scripts/scene.ts status              # OREngine 内から
npx tsx orengine/scripts/scene.ts tree       # 外部プロジェクト（submodule 構成）から
npx tsx scripts/scene.ts get root/Camera
npx tsx scripts/scene.ts tree --timeout 30000

npx tsx scripts/scene.ts add-entity root --name KeyLight                  # コンポーネントの無いエンティティを作り uuid を返す（--name 省略時は Empty）
npx tsx scripts/scene.ts add-component root/KeyLight Light                # 名前は components の name
npx tsx scripts/scene.ts set root/KeyLight position 3,3,3                 # エンティティのフィールド
npx tsx scripts/scene.ts set root/KeyLight Light intensity 2              # コンポーネントのフィールド
npx tsx scripts/scene.ts add-entity root --name Box
npx tsx scripts/scene.ts add-component root/Box MyBox
npx tsx scripts/scene.ts remove-component root/Box MyBox
npx tsx scripts/scene.ts reparent root/Box root/KeyLight                   # 親を付け替える（ワールド座標を保つ）。新しいパスを返す
npx tsx scripts/scene.ts remove-entity root/KeyLight/Box
npx tsx scripts/scene.ts undo

npx tsx scripts/scene.ts scenes                                           # シーン一覧（REST を直接読む。タブ・headless 不要）
npx tsx scripts/scene.ts scene-get main                                   # シーンファイルの中身
npx tsx scripts/scene.ts scene-create short1 --from main --open           # 作成（--from で複製）。--open で開く
npx tsx scripts/scene.ts scene-open main                                  # タブのシーンを切り替える
npx tsx scripts/scene.ts scene-delete short1
npx tsx scripts/scene.ts settings timeline                                # renderer / timeline / editor の設定と書ける path
npx tsx scripts/scene.ts set-setting timeline timeline/duration 300

npx tsx scripts/scene.ts key-insert root/Box position --time 0                         # キーを打つ（数値配列は全要素）。初めてなら Animation・カーブ・リンクも作る
npx tsx scripts/scene.ts key-insert root/Box position --time 2 --value 0,3,0           # 値を指定して打つ（set とキーの挿入を undo 1回に）
npx tsx scripts/scene.ts key-insert root/KeyLight Light intensity --time 1 --value 5  # コンポーネントのフィールド
npx tsx scripts/scene.ts key-delete root/Box position/1 --time 2                       # 要素1つ（position/1 = y）
npx tsx scripts/scene.ts curves                                                        # カーブの一覧と使っているフィールド
npx tsx scripts/scene.ts curve-get c2
npx tsx scripts/scene.ts curve-set c2 '{"keys":[{"time":0,"value":0,"interpolation":"BEZIER","handleType":"AUTO_CLAMPED"},{"time":1.5,"value":2,"interpolation":"LINEAR","handleType":"VECTOR"}]}'
npx tsx scripts/scene.ts curve-paste root/Box2 position/1 c2 --link                    # --copy で複製して貼り付け
npx tsx scripts/scene.ts curve-unlink root/Box2 position/1
npx tsx scripts/scene.ts curve-link-settings root/Box position/1 --scale 2 --offset 0.5 --name bounce

npx tsx scripts/scene.ts shot tmp/shot/a.png                              # シーンカメラ・今の時刻の見た目を PNG へ
npx tsx scripts/scene.ts shot tmp/shot/b.png --from 0,3,5 --to 0,0,0 --time 2 --view gBuffer_1   # 一時カメラ・時刻2秒・パス出力（webgpu のラベル）
```

- 観測: `status` / `tree` / `get <entity>` / `components` / `errors` / `settings` / `shot` / `curves` / `curve-get`。書き込み: `add-entity` / `remove-entity` / `reparent` / `add-component` / `remove-component` / `set` / `set-setting` / `undo` / `redo` / `scene-create` / `scene-delete` / `scene-open` / `key-insert` / `key-delete` / `curve-set` / `curve-paste` / `curve-unlink` / `curve-link-settings`
- シーン管理: `scenes` / `scene-get` はファイルを読むだけなので CLI が dev サーバーの REST（`host/server/routes/scene.ts`）を直接叩き、タブも headless も使わない。`scene-create` / `scene-delete` / `scene-open` はタブ経由で、EditorPage の createScene / deleteScene / openScene（Scene パネルと同じ窓口 `SceneSelection`）を `attachAgentBridge` の `getScenes` から呼ぶので、Scene パネルの一覧・表示と食い違わない。作成・削除はその場でファイルに反映され、undo 履歴には載らない。未保存の変更があるタブへの `scene-open`（`scene-create --open`）と、開いているシーンの `scene-delete` はエラー。`--from` の複製は uuid を振り直さない（シーンは1つずつ読み込まれ、uuid で他シーンを引く仕組みが無いため）
- 設定: `settings [renderer|timeline|editor]` / `set-setting <renderer|timeline|editor> <path> <value>`。対象は `engine.renderer`（シーンの `renderer`）/ `engine` の `timeline/*` / `editor`（editor.json の `resolution/*` / `viewports/<id>/resolutionScale`（Screen パネルごとの解像度スケール。エディタカメラで見ている間はパネルの画素数（CSS の大きさ × devicePixelRatio）に、カメラビュー（シーンカメラ・Camera Render）では `resolution/*` に掛かる）/ `frameLoop/*` のみ。選択・カメラ等の UI 状態は触らせない）。書き込みは `set` と同じく `editor.api.setField( …, { merge: false } )` で undo 1回ぶん。出力の `file` が保存先。実装は `packages/orengine/editor/lib/AgentBridge/SceneCommands` / `SettingCommands`
- `<entity>` は uuid か `root/...` の名前パス。存在しないエンティティ・コンポーネント名・フィールド path はエラーになり、候補が返る
- 書き込みはすべて `EditorAPI` を通るので、GUI の Ctrl+Z / `undo` で戻せる（undo 履歴は GUI と共有）
- **書き込み系コマンドは接続先（ユーザーのタブ / headless）によらず、そのたびに `editor.save()` でファイルへ保存する**。タブのままだと Ctrl+S せずに閉じたとき黙って消えるため。タブに CLI 以前の未保存の変更があれば一緒に保存される。応答は保存の POST が終わってから返る（完了は `EditorPage` の `onSave` が返す Promise で待つ）。保存に失敗したらエラーを返す
  - 保存し終えたタブは HMR 経路で `orengine:agent:saved` を送り、dev サーバーは**それ以外のエディタタブ（ユーザーのタブ・headless とも）へ `full-reload` を送る**。API 経由の保存は `ProjectWatchReload` のリロードを `recentWrites` でタブを区別せず抑制するので、保存元以外への通知は AgentBridge が個別に行う。リロードされたタブの未保存の変更は消える（外部からファイルを編集したときと同じ）
- **タブが1つも接続されていなければ headless Chromium で代わりに接続する**（`scripts/headlessEditor.ts`）。Playwright で `--enable-unsafe-webgpu --use-angle=metal` を付けて起動し（無いと WebGPU の canvas が真っ黒になる。#80 の実測）、同じエディタ URL に `?agent-headless` を付けて開く。シーンの読み込みと最初の描画を待ってからコマンドを実行し、1コマンドごとに閉じる。ローカルの Mac 専用（GPU の無い Linux CI では動かない）。Chromium が無ければ `npx playwright install chromium`
  - headless では1コマンドごとにブラウザを閉じる。保存は応答の前に済んでいるので、CLI は応答を受けたらすぐ閉じる。`scene-open` 後の保存で editor.json の `scene` も切り替わるので、次のコマンドの headless は切り替え先のシーンを開く。undo 履歴はコマンドごとに消えるので、`undo` / `redo` は headless では意味を持たない
  - `status` の `connection` が `"headless"` になる（ユーザーのタブなら `"tab"`）
  - ウィンドウサイズは 1920x1080・deviceScaleFactor 1 に固定している。1920x1080 は一般的なデスクトップの画面サイズで、editor.json のパネル配置がそのまま収まる。`shot`（#83）の出力サイズは `resolution/*` で決まり、ウィンドウサイズには依存しない
  - ユーザーのタブが開いていれば headless は起動しない。dev サーバーが起動していなければ headless も起動せずエラーで止まる
- `set` の値はフィールドの型で解釈する: 数値 / ベクトル・色は `1,2,3` か `[1,2,3]` / `true`・`false` / 文字列 / select は選択肢の値 / entity 参照は uuid（`null` で外す）。CLI の `set` は1コマンドが undo 1回ぶん
- `reparent <entity> <parent>` は GUI の Hierarchy のドラッグ・Ctrl+P と同じ `EditorAPI.reparentEntities` を通す（「エディタの選択と親の付け替え」の節）。移せないときは理由を、`position` / `euler` / `scale` にキーが打たれていれば `warning`（時刻が変わるとキーの値に戻る）を返す
- タブの選択状態・エディタのカメラ・再生時刻は変えない（`shot` も同じ）。編集できる範囲は GUI と同じ（script 由来のエンティティへの子の追加・削除、user 以外が付けたコンポーネントの削除・編集はできない）
- キーフレーム（#193）: フィールドとカーブの結びつきを変える操作（`key-insert` / `key-delete` / `curve-paste` / `curve-unlink` / `curve-link-settings`）はコマンドで、カーブの形（キーの時刻・値・補間・ハンドル）は `curve-get` / `curve-set` の JSON で扱う。実装は `packages/orengine/editor/lib/AgentBridge/KeyFrameCommands`
  - GUI と同じコマンドを通す: `key-insert` / `key-delete` は `KeyFrameField` の `buildInsertKeys` / `buildDeleteKeys`、共有は `buildPasteCurve` / `buildUnlinkCurve` / `buildCurveLinkSettings`、`curve-set` は `EditorAPI.setCurves`。`EditorAPI.insertKeys` / `deleteKeys` はタブの今の時刻に打つので使わず、`--time` をコマに揃えた時刻を `build*` に直接渡す。タブの再生時刻は変えない
  - フィールドの指定は `set` と同じ `<entity> [<component>] <path>`。数値配列の要素1つは `<path>/<番号>`（フィールドの path そのものとして引けなかったときだけ末尾の番号を要素とみなす）。`curve-paste` / `curve-unlink` / `curve-link-settings` は GUI と同じく要素1つ単位なので、数値配列では要素の指定が必須
  - `--time` は秒で、`snapKeyFrameTime` で `timeline/fps` のコマに揃える。キーは番号でなく時刻で指す（1本のカーブの同じ時刻に置けるキーは1つ）。コマから外れたキー（BLidge 由来等）は `key-delete` では指せないので `curve-set` で消す
  - `key-insert --value` は `SetFieldCommand` とキーの挿入を `GroupCommand` で undo 1回にする。`buildInsertKeys` は `KeyFrameKeyRef` の `element`（要素1つだけに打つ）・`value`（フィールドの今の値の代わりにその値で打つ）を受ける
  - カーブの JSON は `{ name?, keys: [ { time, value, interpolation, handleType, left, right } ] }`。時刻とハンドルの x は秒（保存形式の `k` の差分・秒×60 に開かない）、ハンドルは絶対座標。`curve-get` は種類に従って置き直したハンドルを出す。`curve-set` はキーを時刻順に並べて `recalcHandles` で置き直してから `encodeCurve` で書く。自動系（`AUTO_CLAMPED` / `AUTO` / `VECTOR`）は `left` / `right` を省略でき、書いても置き直される。`ALIGNED` / `FREE` は必須。`name` を書かなければ名前を外す（中身ごと差し替え）。時刻はコマに揃えず、`curve-get` で出した時刻が戻ってきたら元の秒×60 を使うので、往復でキー列は変わらない
  - 同じ時刻のキーが2つある・存在しないカーブ ID・キーの無い時刻はエラー（候補にカーブ ID・キーのある時刻を返す）。カーブを新しく作るのは `key-insert` と `curve-paste --copy` だけ。`keys` を空にすると、GUI でキーをすべて消したときと同じくそのカーブを指すリンクも外れる
  - `set <entity> Animation links …` はエラー（検証の無い2つ目の経路になるため）。hidden フィールド全般は弾かない（コンポーネントの `enabled` も hidden）
- `shot <out.png>` は shot 専用の RenderView で描いて PNG を CLI が書き出す。カメラは `--camera <entity>` / `--from x,y,z --to x,y,z`（一時カメラ）/ 省略でシーンカメラ。サイズは editor.json の `resolution/*`（最終出力の解像度。Screen パネルの大きさ・`resolutionScale` には依存しない）で、指定はできない。`--time T` は「時刻 T-1/60 → T の2ステップだけ進めて描いた状態」（前フレームを T の直前にしてモーションブラーの速度を合わせるため）で、T まで再生した状態ではない。省略時はタブの今の時刻で1ステップ。`--view` はパスのラベル（webgl は `camera/deferred_1`、webgpu は `gBuffer_1` のようなバックエンドごとの生の名前）で、一致しなければ候補が返る。実装は `packages/orengine/editor/lib/AgentBridge/ShotCommand`
- npm scripts には載せていない（外部プロジェクトから同じ形で呼べるように、直接実行を唯一の呼び方にしている）
- コマンド一覧は `npx tsx scripts/scene.ts help`
- dev サーバーの URL は `<OREngine>/tmp/dev-server.json` から読む。同じ OREngine チェックアウトで dev サーバーを2つ立てると後から起動した方で上書きされるので、その場合は `--url` で指定する

### プロジェクトディレクトリ（demo-webgl・demo-webgpu / 外部プロジェクト共通）
プロジェクトディレクトリの中身は `Resources/` / `scenes/` / `editor.json` / `public/` / `editor/` のみ。HTML / src / vite config 等のボイラープレートはすべて `host/app/` に集約されている。

プロジェクト固有のデータは Vite の `resolve.alias` 経由で参照する:
- `@or-scene` → `<projectDir>/scenes/<scene>.json`（`scene` は `OrengineConfigOptions.scene` / `HostRunOptions.scene`。省略時 `main`）
- `@or-editor` → `<projectDir>/editor.json`
- `@or-resources/*` → `<projectDir>/Resources/*`
- `@or-project-editor/*` → `<projectDir>/editor/*`

### エディタ拡張（`<projectDir>/editor/`）
プロジェクト側からエディタにパネルと API route を足すためのディレクトリ。任意（無くてもよい）。player ビルドのエントリ（`host/app/src/player.ts`）からは辿られないので、ここに何を置いても packed サイズには影響しない（eslint-plugin-boundaries でも player.ts からの import を禁止している）。

- `editor/Panels/<名前>/index.tsx` に `export const panel: PanelDefinition` を置くと、パネルのタブ「+」の一覧に出る。自動認識は `host/app/src/editorPanels.ts` の `import.meta.glob`。先頭が `_` のディレクトリは対象外
- `PanelDefinition` の `category`（`"Tools/Debug"` のような `/` 区切り）を書くと、タブ追加メニューでその階層のサブメニューに入る。省略時はメニューのルート直下。タブ名は `title` のまま
- `editor/server.ts` の default export（`EditorServerExtension`）に express の `Router` が渡され、足した route が `/api/ext/*` に生える。組み込み route の後にマウントされる。node 側は tsx 経由で動くので `.ts` のまま読み込まれる。変更の反映には dev サーバーの再起動が必要
- パネルからは `useOREditor()` で `editor` / `engine` に触れる（選択中エンティティの参照、フィールドの更新など）
- サンプルは `demo-webgl/editor/`（選択中エンティティ名の表示と `/api/ext/hello` の呼び出し）

### フィールド UI（`Resources/Components/**/editor.tsx`）
コンポーネントのフィールドごとに、プロパティパネルの表示を自作の React UI（canvas 含む）に差し替える仕組み。将来のビューポート上のギズモ（コンポーネント側からの3D操作）も同じ `editor.tsx` に足す想定（#157）。

- コンポーネントの `index.ts` の隣に `editor.tsx` を置き、`export const fieldUIs = defineFieldUIs( クラス, { フィールドパス: UI部品 } )` を書く。自動認識は `host/app/src/editorFieldUIs.ts` の `import.meta.glob`（エディタのエントリからだけ辿るので player には入らない）。`index.ts` から `editor.tsx` を import すると eslint-plugin-boundaries でエラーになる（demo-webgl / demo-webgpu の `Resources/**/*.ts` を runtime に分類している）
- 受け渡し: `EditorPage` / `EditorPageStatic` の `fieldUIs` → `OREditor` → `OREditorProvider` の context → `SerializeFieldViewValue` が `findFieldUI`（クラスの完全一致 + パス）で引いて、既定の入力の代わりに描く。型と `defineFieldUIs` は `packages/orengine/editor/features/OREditor/lib/fieldUI.ts`
- 並べ方: 部品だけ渡すと `inline`（既定の入力と同じくラベルの右）。canvas のプレビューなど幅の要る UI は `{ ui: 部品, layout: 'block' }` でラベルの下に行いっぱいに出す
- 見た目は uipower の部品（`Button` の `active` / `square`、`ArrowIcon` の `direction`、`InputNumber` 等）と、デザイントークン（`packages/uipower/styles/_globals.scss` の `var(--or-*)`。余白は `--or-space`、角丸は `--or-radius`、文字は `--or-font-*`）で組み、生の px や色を書かない。スタイルは `editor.tsx` の隣の `*.module.scss` に置ける。外部プロジェクトから `uipower` を import するときは、tsconfig の `paths` に `uipower` を足す（vite 側の alias は host が持っている）
- UI 部品は `FieldUIProps<T>`（`value` / `setValue` / `beginEdit` / `target` / `path` / `opt` / `engine` / `editor`）を受け取るただの React 部品。import でコンポーネント間で再利用する（名前の登録表は無い）
- `useEditorFrame( cb )`: `Editor._animate` の最後に出す `frame` イベントを購読する hook。canvas の描画をエディタのフレームに揃える
- `editor.api.beginEdit( target, path )` → `set` / `commit` / `cancel`: `set` は値を反映するだけで、`commit` で開始時からの変化を SetFieldCommand 1つ（`merge: false`）として積む。`setField` の自動まとめは時間基準（500ms）なので、ドラッグの途中で手を止めると undo が分かれる。それを避けるための窓口
- `CommandManager` は `merge: false` で積んだコマンドに、後続のコマンドをまとめない（確定済みの編集・CLI の `set` に直後の GUI 操作が混ざらないように）

### コンポーネントパネル（`Resources/Components/**/editor.tsx` の `panel`）
特定のコンポーネント専用のパネル。フィールド UI では狭い編集画面（大きな canvas 等）をタブとして置くための仕組み。

- `editor.tsx` で `export const panel = defineComponentPanel( クラス, { id, title, category?, ui } )` を書く。自動認識は `host/app/src/editorPanels.ts` の `import.meta.glob`（`editor/Panels/` と同じ `projectPanels` にまとめて `OREditor` の `panels` へ渡す）。型と `defineComponentPanel` は `packages/orengine/editor/features/OREditor/lib/componentPanel.tsx`
- 中身は `features/OREditor/features/ComponentPanel`: アクティブなエンティティ（`selectedEntityId`）から `entity.getComponent( クラス )`（クラスの完全一致）で引き、`ComponentPanelProps`（`target` / `entity` / `engine` / `editor`）を渡して `Panel` の中に描く。持っていなければ空の表示。コンポーネントの追加・削除は entity の `components` の更新通知で描き直す
- UI は `key={component.uuid}` で描くので、選択が別のコンポーネントに移ると state は作り直される

```tsx
// <projectDir>/editor/Panels/Sample/index.tsx
import { useState } from 'react';

import { type PanelDefinition } from 'orengine/react';
import { Button, Panel } from 'uipower';

const Sample = () => {

	const [ message, setMessage ] = useState( '' );

	const run = async () => {

		const res = await fetch( '/api/ext/hello' );
		const data = await res.json();
		setMessage( data.message );

	};

	return <Panel><Button onClick={run}>Run</Button>{message}</Panel>;

};

export const panel: PanelDefinition = { id: 'sample', title: 'Sample', category: 'Tools', content: <Sample /> };
```

```ts
// <projectDir>/editor/server.ts
import type { EditorServerExtension } from 'orengine/server';

const extension: EditorServerExtension = ( router, ctx ) => {

	router.get( '/hello', ( _req, res ) => {

		// ctx.projectDir 配下でファイルを読む・子プロセスを起動する等
		res.json( { message: ctx.projectDir } );

	} );

};

export default extension;
```

### 点の編集の部品（`orengine/editor`）
カーブエディタ（タイムラインのキー）と、フィールド UI の点エディタ（ORShorts の PathStroke のパスなど）で共有する、Blender の右クリック選択に合わせた点の操作。点を何で表すか・点の座標をどう書き換えるかは使う側が持ち、部品は選び方・ドラッグの判別・G / R / S の量の計算だけを受け持つ。

- 編集領域（`Editor.enterEditArea( actions )` / `leaveEditArea( actions )`）: ポインタが領域の上にある間、Delete / X・Ctrl+C・Ctrl+V・G / R / S・Shift+D・B・A / Alt+A・Home・W を `EditAreaActions` へ回す。メンバーはどれも任意で、持っていない操作のキーは何もしない（ビューポートへも渡さない。点エディタの上の X でエンティティが消えないように）。領域の `pointerenter` / `pointerleave` で呼び、領域が消えるときにも `leaveEditArea` する
- モーダル（`Editor.beginEditModal( modal )` / `endEditModal( modal )`）: 続いている間は、ポインタの位置によらずキーボードを先に受ける（`EditModal.handleKeyDown` が true を返したら消費）。順番は 編集領域のモーダル → 編集領域の上での G / R / S → ビューポートのモーダル変形
- ビューポートの G / R / S（`ModalTransformHandler`）は、ポインタがビューポートの上にあるとき（`Viewport.hovered`）だけ始まる。プロパティパネル等の上で押しても選択中のエンティティは動かない（I キーと同じ扱い）
- `PointTransformModal`: 2D の点の G / R / S。`mapping`（点の座標 ↔ 画面の px）の上で回転・伸縮を計算し、点ごとの行き先の関数 `( point, owner ) => point` を `onChange` に渡す（`owner` は点の属する点。`individual` ならそれを中心に回す）。`axes: "x"` で横にだけ動かす。X / Y の拘束・数値入力、左クリック / Enter で確定、右クリック / Esc で取り消し。作った側が `beginEditModal` で登録し、`onConfirm` / `onCancel` で外す
- `PointerDrag`（`trackPointerDrag` / `dragRect` / `suppressNextContextMenu`）: 押してから離すまでを追い、3px 動くまではクリックとして扱う。右クリックで取り消した操作の後のメニューを止める
- `PointSelection`: 選択は ID の文字列の `Set`。`pressSelection`（右ボタンで押したときの選び方。Shift で足し引き・アクティブ）/ `boxSelection`（矩形選択の結果）/ `isAllSelected`。`BoxSelectWait` は B の後の左ドラッグ1回を矩形選択にする待機で、作ると編集モーダルとして登録され、右クリック・Esc・領域外の左クリック・`end()` で終わる

### キーフレームアニメーション
Entity / Component の SerializeField にキーを打ち、player で再生する仕組み（#177）。

- データは2か所に分けて持つ。カーブ本体はシーン JSON の最上位 `curves`（Engine のフィールド。カーブ ID → `{ name?, k }`）。リンクはエンティティごとの builtin `Animation` コンポーネントの隠しフィールド `links`（`{ "position": [ [ "c1", 倍率, 足し算 ], … ], "Light:intensity": [ "c2", 1, 0 ] }`。コンポーネントのフィールドは `<コンポーネント名>:<パス>`、数値配列は要素ごと）
- キー列 `k` は BLidge v2 の形式で、時刻の単位は秒×60。デコーダ `decodeKeyFrames`（`packages/maxpower/core/Animation/KeyFrameDecoder`）を BLidge と共有している
- 実行時: Animation（order -1）が `updateImpl` で、時刻が変わったときと `curves` / `links` が差し替わったときだけ `setField` で値を入れる。関数フィールドへのリンクはイベントで、再生中に通過したキーの時刻で呼ぶ（シーク・停止中・ループで先頭へ戻ったときは呼ばない）
- `curves` と `links` は書き換えず、編集のたびに表・オブジェクトごと差し替える。Animation も行の状態表示も、差し替わりを見てカーブを作り直す
- 編集: プロパティパネルの行（コンポーネントの `enabled` は見出しのチェックボックス）の上で `I` / `Alt+I`、行の右クリックメニュー、ビューポートの `I`（位置 / 回転 / スケール / 全部）。キーの時刻は `timeline/fps` のコマに揃える。実装は `editor/lib/KeyFrameField`（フィールドの解決・コマンドの組み立て・行の状態）と `editor/lib/KeyFrameCurve`（キー列の編集・自動クランプのハンドル）。初めて打つフィールドは、Animation の追加・カーブ・リンクを `GroupCommand` で undo 1回にまとめる
- ハンドルの種類（自動クランプ / 自動 / ベクトル / 整列 / 自由）はカーブの `h`（キーごとの番号の配列。並びは `KeyFrameCurve` の `KEYFRAME_HANDLE_TYPES`）に持つ。すべて既定（自動クランプ）なら書かない。エディタだけが読み、キー列を編集するたびに種類に従ってハンドルを置き直す（`KeyFrameCurve` の関数は `CurveData` を受けて `CurveData` を返す純関数）
- タイムライン: Timeline パネルの子 feature `Timeline/features/KeyEditor`（左のチャンネル一覧、キー表示 / カーブ表示）。選択中のエンティティの行だけを出し、選んだキーは `<カーブ ID>:<番号>`、ハンドルは `<カーブ ID>:<番号>:<left|right>` で持つ（共有カーブの行はそろって選ばれる。キーを選ぶと両側のハンドルも選ばれた扱い）。編集の確定は `editor.api.setCurves`（最後のキーを消したカーブを指すリンクも外す）
  - 操作は Blender の右クリック選択（Preferences の Select with: Right）に合わせている: 右クリックでキーを選ぶ（Shift で足し引き、何もない所で選択を外す）、キーからの右ドラッグで選んだキーを動かす、何もない所からの右ドラッグで矩形選択（Shift で足す）、左クリックはキーの上でも時刻合わせ、W でキーのメニュー（補間・ハンドル・整列・アクティブのハンドルの写し・コピー・貼り付け・削除）。右ボタンは `KeyEditor` が1か所で受け、キー表示・カーブ表示は中ボタンと wheel だけを受ける。ほかに B の後の左ドラッグ1回が矩形選択、A / Alt+A で全選択 / 全解除、Home で値の範囲を合わせ直す（値の範囲は状態として持ち、自動で合わせ直すのは選択中のエンティティが変わったときだけ）
  - 表示の移動・拡大縮小も Blender の 2D ビューに合わせている: トラックパッドの2本指で縦横にパン、ピンチで縦横そろえて拡大縮小、Ctrl+2本指で縦横それぞれを拡大縮小（指を左・下へで拡大）。マウスはホイールで拡大縮小・Ctrl+ホイールで横・Shift+ホイールで縦にスクロール、中ボタンのドラッグで縦横のパン・Ctrl+中ボタンで縦横それぞれを拡大縮小（右・上へで拡大）。Ctrl はどれも Cmd でもよい（macOS は Ctrl+2本指がアクセシビリティのズームに取られることがあるため。`hasZoomModifier`）。拡大縮小はポインタの位置が基準。横（時刻）は `TimelineControls`、縦はカーブ表示（値の範囲）・キー表示（左のチャンネル一覧の `scrollTop`。縦の拡大縮小は無いので、Ctrl+2本指の縦の量は時刻の拡大縮小に回す）が同じ入力から自分の軸だけを動かす。wheel をパン / 拡大縮小へ読み替えるのは `Timeline/lib/ViewGesture` の1か所（ブラウザはマウスとトラックパッドを区別しないので量の出方で見分け、ピンチ＝ctrlKey 付きの wheel は Ctrl のキーイベントを別に追って Ctrl+2本指と区別する）
  - ドラッグと G / R / S はどちらも `KeyFrameCurve` の `transformKeys`（点の行き先を関数で渡す）を通し、`editor.api.beginEdit( engine, "curves" )` で undo 1回にする。G / R / S のモーダルは `editor/lib/PointTransformModal`（上の「点の編集の部品」。キー表示は `axes: "x"` で時間にだけ動かす）
  - Shift+D は G と同じモーダルで、`transformKeys` の `duplicate`（選んだキーを元の位置に残して複製を動かす）を使う。複製もモーダルの開始時の表から毎回作り直すので、複製と移動が undo 1回になり、取り消すと複製ごと押す前の表に戻る。複製するのはキーだけ（ハンドルだけの選択は対象外）
  - W の Align ▸ Distribute / Straighten Values（`KeyFrameCurve` の `distributeKeys` / `straightenKeys`）: カーブごとに、選んだキーのうち最初と最後（動かさない）を結ぶ直線上へ、Distribute は時刻も値も等間隔に（時刻はコマに揃え、値は揃えた時刻での直線の値）、Straighten Values は時刻そのままで値だけを乗せる。選んだキーが2つ以下のカーブ・Distribute で選んだキーどうしが同じコマに重なるカーブは何もしない。動かした先の選んでいないキーは G と同じく消え、選択は動かした後の番号で選び直す
  - アクティブのキー: 選択とは別に、最後に右クリックで選んだキー1つを `active`（キーの ref）として持ち、白寄りの色（`--or-key-active`）で出す。ハンドルを押したときはその持ち主のキー。キー1つを指さない印（配列の親の行・エンティティの行）を押したときは変えない（Shift なしで選び直したときは外す）。選ばれているがアクティブでないキーの Shift+右クリックは、外さずにアクティブにする（Blender の3Dビューと同じ。選んだ中から写し元を選び直すため）。選択からキーもハンドルも外れたら外す。キーの番号が変わる編集（G / R / S・Shift+D・Align）では、`transformKeys` / `alignKeys` が返す元の番号 → 新しい番号の対応（`indexMap`）で付け替える
  - W の Apply Active Handles（`readHandleOffsets` / `applyHandleOffsets`）: アクティブのキーの左右のハンドルの「キーからのずれ」（区間の長さに合わせた伸縮はしない）と種類を、ほかの選んだキーすべてへ同じずれで写す。自動系は置き直されて形が消えるので、写した側の種類は整列ならそのまま・それ以外は自由にし、補間は Bezier にする。ショートカットは無い
  - キーボード: キーの領域は編集領域（上の「点の編集の部品」）として `Editor.enterEditArea` / `leaveEditArea` で登録する。右クリックでの選び方・B の矩形選択の待機・G / R / S も同じ部品を使い、キー専用なのは ref の作り方・読み方（`KeyEditor/lib/KeySelection`）だけ
- 共有: 行の右クリックメニューで、要素1つ単位にカーブのコピー / リンクして貼り付け（同じカーブ ID を指す）/ 複製して貼り付け / リンクを解除（複製して指し直す）/ リンクの設定（倍率・足し算・カーブの名前の小窓）。どれも undo 1回。実装は `editor/lib/KeyFrameField` の Share 節（`buildPasteCurve` / `buildUnlinkCurve` / `buildCurveLinkSettings`）。数値配列の要素は、右クリックした場所の `data-element`（uipower の `Vector`・`ValueArray` の要素の行）で決まり、要素の外（ラベル・色の見本）では要素ごとのサブメニューになる。行には共有中のカーブの名前（無ければ ID）と使用数を出す
- シーン CLI からは `key-insert` / `key-delete` / `curves` / `curve-get` / `curve-set` / `curve-paste` / `curve-unlink` / `curve-link-settings` で同じ操作ができる（「シーン CLI（AgentBridge）」の節）
- 保存（`Editor.exportEngine`）では、書き出した JSON 全体の `links` から参照されないカーブを外す（`pruneUnusedCurves`）。メモリ上の表には残す
- player ビルドでは、`curves` 配下のキー（カーブ ID・`k`）を terser の改名から外している（`host/vite/sceneScan.ts`）。リンクがカーブ ID を文字列で引くため

### Cloner（テンプレートの複製）
- builtin コンポーネント `Cloner`（`packages/orengine/builtin/Components/Utility/Cloner/`）。付けたエンティティの直下にある user の子すべてを1セットのテンプレートとして、並べ方の数だけ実行時に複製する。テンプレートは描かない（`renderHidden`）。複製は保存しない
- 実行時の構造: Cloner のエンティティの下に持ち場 `ClonerSlot`（script・`editorHidden`、名前は `<親の名前>#<番号>`）を並べ、その下にテンプレートの複製（`cloneEntity`。`cloneSource` が元のエンティティ）を置く。持ち場の位置・回転・大きさが並べ方の持ち場なので、テンプレートの position などは「持ち場からのずれ」になる
- 時間差: `ClonerSlot` は子に渡す event の `timeCodeFrame` / `timeCode` を遅らせる（`delay/loop` が ON ならタイムラインの長さで折り返す）。Animation も時刻で動くコンポーネントも改修なしで遅れ、入れ子の Cloner では遅れが足される。シェーダーのグローバルの `uTime` は遅れない
- フィールド: `layout`（並べ方）/ `params/<名前>`（並べ方の数値。並べ方を切り替えるとフィールドごと入れ替わる）/ `delay/order`（layout / index / center / x / y / z / random）/ `delay/spread`（最初と最後の複製の遅れの差、秒）/ `delay/loop` / `jitter/position` / `jitter/rotation` / `jitter/scale` / `jitter/seed`。計算は `Cloner/slots.ts` の `computeSlots`（純関数）
- テンプレートの同期: テンプレート配下の user のエンティティ・コンポーネントの `fields/update` を、対応する複製へ `setField` で写す。テンプレートの Animation がリンクしているフィールドは写さない（複製の Animation が遅れた時刻で入れる）。子・コンポーネントの増減は複製を作り直す。ほかの Cloner のテンプレートの中にある Cloner は複製を作らない（コピーされた側が作る）
- 並べ方: `ClonerLayout`（`Cloner/layout.ts`。型は `orengine/builtin` から import する）= `{ params, count( params ), place( index, count, params ) → { position, rotation?, scale?, order? } }`。ライブラリの種類 `ClonerLayouts` として、builtin は `packages/orengine/builtin/Library/ClonerLayouts/<名前>/index.ts`（Grid / Line / Circle / Sphere / Random）、プロジェクトは `<projectDir>/Resources/Library/ClonerLayouts/<名前>/index.ts` に `export default` で置く（同名はプロジェクトが上書き）。`order` を返すと `delay/order: layout` でその順に動き出す（返さなければ番号順）
- player ビルドは、シーンの Cloner が使う並べ方だけを焼き込む（`Cloner/player.ts` がライブラリの参照を返す。下の「ライブラリ」）
- エディタ: 複製はヒエラルキー・ルートからの走査（`Entity.traverseEditable`）・シーン CLI に出ない。ビューポートで複製をクリックすると `cloneSource` を選ぶ
- 数の目安は数百まで（複製は普通のエンティティなので1個ずつ描画される）。それ以上はコンポーネント内のインスタンシングで作る

### エディタの選択と親の付け替え
- 選択は Blender と同じく「選んでいるものの集合＋アクティブ1つ」。editor.json の `selectedEntityIds`（選んだ順）と `selectedEntityId`（アクティブ）に保存する。アクティブは必ず集合に入っている（`Editor` の2つのフィールドの setter が保つ）。窓口は `Editor.selectEntity`（それ1つにする）/ `setSelection` / `toggleEntitySelection`、読むのは `selectedEntities` / `activeEntity`
- 1つだけを相手にする操作（Property パネル・キーの挿入・Timeline の KeyEditor・フォーカス `.`・F2）はアクティブを見る。削除（X）・複製（Shift+D）・G / R / S・ギズモ・親の付け替えは集合を見る。集合を見る操作は、祖先も選ばれているものを外してから扱う（`TransformTargets` の `topmostEntities`。親と一緒に動く・消える・移るため）
- 操作: ビューポートは右クリックで選択、Shift+右クリックで足す・アクティブにする・外す（選んでいてアクティブでなければアクティブにする。Blender の 3D ビューと同じ）。Hierarchy はクリックで選択、Ctrl / Cmd+クリックでビューポートの Shift と同じ足し引き、Shift+クリックでアクティブから押した行までの範囲選択（見えている行の並び。アクティブは変えない）
- 複数の変形: `TransformTargets`（`editor/lib/TransformTargets`）が G / R / S とギズモの共通の土台。中心はワールド位置の平均（Blender の Median Point）、ローカル軸はアクティブのワールド回転。スケールは各エンティティの `scale` の成分に掛け、中心からのずれをアクティブの軸で伸ばす。確定で変わったフィールドを `GroupCommand` にして undo 1回。ギズモは `GizmoTarget`（中心と向き）の上に置き、ドラッグの変化量（移動量・回転・倍率）を返す
- 親の付け替え: Hierarchy の行のドラッグ（選んでいる行ならその選択ごと、選んでいない行ならその行だけ。落とした行の子になる）、Ctrl+P（選んでいるものをアクティブの子に）、Alt+P（root の直下へ）、CLI の `reparent`。どれも `EditorAPI.reparentEntities` → `ReparentEntityCommand`（複数でも undo 1回）で、ワールド座標を保つ（新しい親の逆行列でローカルへ落とし、`TransformUtils` の `decomposeMatrix` で position / euler / scale に分ける。`MTP.Matrix.decompose` はスケールを求めないので使わない）。回転した子を非一様スケールの親から出し入れするとせん断が乗り、TRS では厳密に保てない（位置は保つ）。移した先の兄弟と名前がぶつかれば `uniqueEntityName` で採番する
  - 移せないもの（`EditorAPI.getReparentError`。Hierarchy のドラッグ中は落とせる行だけを枠で示す）: root / script 由来のエンティティ（生成したコンポーネントが持ち主で保存されない）/ Cloner の持ち場・複製（`editorHidden` の部分木）/ 自分自身か子孫の下 / script 由来のエンティティの下（`ProjectSerializer` が script の子を書き出さないので保存で消える）/ 複製の下。Cloner 本体の下へは入れられる（テンプレートになり描かれなくなる）
  - `position` / `euler` / `scale` にキーが打たれていると、ワールド座標を保つよう書き換えても時刻が変わると Animation がキーの値を入れ直す。GUI は message、CLI は `warning` で知らせる
- 親子の点線（Blender の Relationship Lines）: ビューポートで、子の原点から親の原点まで灰色の点線を引く（root の直下・非表示・Cloner のテンプレートには引かない）。Screen のオーバーレイの Relationships（`viewports/<id>/helpers/relationships`）で切り替える。実装は `editor/lib/RelationshipLineRenderer`。点の数ごとの形状を作り置きし、線ごとに画面上の長さから数を選んで伸ばす（毎フレーム頂点を作り直すと GPU のバッファも作り直しになるため）

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
- `main` / `release/*` / `gh-pages` 以外のブランチは、PR がマージされたら削除する。リモートは GitHub の「Automatically delete head branches」で自動削除され、`main` / `release/*` は ruleset `protect-main-release` の削除禁止で残る。ローカルのブランチは自動では消えないので、マージ後に `git fetch --prune` してから `git branch -d <branch>` で消す
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
npm run lint         # ESLint実行
npm run typecheck    # TypeScript型チェック + 全scssのコンパイル検証
```

### Storybook / VRT
- stories はコンポーネントと同居させる（`packages/uipower/**/*.stories.tsx` と `packages/orengine/editor/**/*.stories.tsx`）。設定は `.storybook/`（main.ts / vite.config.ts / decorators / fixtures）
- VRT（見た目のスクリーンショット比較テスト）は `tests/vrt/`（Playwright）。見た目に影響する変更をしたら `npm run vrt` で確認し、意図した変更なら `npm run vrt:update` で基準画像を更新する

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
`packages/orengine/editor` の React 層は vibecoding-template-next の feature 設計に合わせる。

```
editor/
├── components/
│   └── pages/    # 画面コンポーネント（features を組み立てる組成層。EditorPage 等）
├── features/     # 機能単位（PascalCase・再帰構造）。トップレベルは OREditor（エディタ本体）と OREngine（エンジン供給）のみ
│   └── {FeatureName}/
│       ├── index.tsx + index.module.scss  # メインコンポーネント（主要UIがある場合のみ）【公開】
│       ├── components/   # 機能専用サブコンポーネント（ComponentName/index.tsx）【公開】
│       ├── hooks/        # カスタムHooks（useXxx.ts 直置き）【公開】
│       ├── providers/    # Context Provider 実装（XxxProvider.tsx 直置き）【公開】
│       ├── contexts/     # React Context 定義（XxxContext.tsx 直置き）【内部】
│       ├── lib/          # 非Reactロジック（レンダラー・純ロジック・型定義）【内部】
│       └── features/     # 子feature（再帰構造。親の内部実装）【内部】
├── hooks/        # feature 横断で共有する Hooks（useLayout）
├── contexts/     # feature 横断で共有する Context 定義
└── lib/          # エディタ中核の非React層（Editor クラス・gizmo・入力等。dir+index.ts 形式）
```

汎用UIコンポーネント（Button / Panel / Input 等）とデザイントークン・共有Sass partial は `uipower` パッケージにあり、editor からは `import { Panel } from 'uipower'` で参照する（相対パスで `packages/uipower` を指さない）。

- 【公開】= feature 外から import してよい、【内部】= feature 内からのみ。依存方向のルールは eslint-plugin-boundaries（`eslint.config.mjs` の editor ブロック）で機械強制されるので、違反は lint エラーで分かる
- ある feature の中でしか使わない機能は、その feature の `features/` に子 feature として置く（例: `OREditor/features/Screen/features/CameraPad`）。複数 feature での共有が必要になった Hooks・Context は editor 直下の `hooks/`・`contexts/` へ昇格する
- feature の主要UIは `{FeatureName}/index.tsx` に置く。`features/Timeline/components/Timeline/` のように feature 名を二重に掘らない
- Context は「定義を `contexts/`、Provider 実装を `providers/`」に分離する。Context 値の生成ロジックは `hooks/useXxxContext.ts` に置く
- 外部への公開面は `packages/orengine/react.tsx` に個別 export で集約する（`features/index.ts` のような中継バレルは作らない）
- scss から共有 partial を参照するときは相対パスではなく `@use 'styles' as *` を使う（uipower の `styles/` が解決先。vite の sass `loadPaths` と `npm run typecheck` の `--load-path` で解決するので、両者は一致させること）

## シェーダー実装の注意（GLSL）
シェーダーはビルド時に `#include <module:名前>` / `#include <part:名前>` を解決した完成形を shader_minifier で一括minifyする方式（`host/vite/plugins` の ShaderBuilder）。dev でも minify が走るのは意図的（minifier による破壊を保存→リロードで即検知するカナリア）。この前提から:

- モジュール/part を個別・断片のまま minify に渡す方式へ戻さない
- include は `#include <module:名前>` / `#include <part:名前>` 形式。`webgl/ShaderParser` の `shaderModules/名前.module.glsl` / `shaderParts/名前.part.glsl` をビルド時に動的解決するので、ファイルを置くだけで登録は不要。解決できない include はビルドエラーになる
- ソースに `//[` `//]`（minifier の verbatim マーカー）を書かない（区間内だけリネームされず宣言側と食い違って壊れる）
- uniform 構造体のフィールド名（CPU側が `'directionalLight[0].direction'` 形式で参照する名前）はローダーが自動抽出して保護している。この形式の参照を増やしたら minify 後の描画を確認する
- minify 結果の構文検証はブラウザ不要で `glslangValidator`（`brew install glslang`）に最終結合形を食わせると確実。デバッグダンプは `tmp/shader-minified/`

## WGSL（WebGPUバックエンド）の注意
WGSLは `.wgsl` ファイルに置き、`import xxxWgsl from './xxx.wgsl'` で読む。ローダーは `host/vite/plugins/WgslLoader` で、GLSL側の ShaderBuilder とは別系統（shader_minifier はGLSL専用なのでWGSLはminifyしない）。

- 置き場所は、使う側と同じディレクトリの `shaders/`。1シェーダー1ファイル
- include は2形式（同じファイルは1回だけ展開される）: 近くのファイルへの分割は `#include "./相対パス.wgsl"`、共有モジュールは `#include <module:名前>`（`<projectDir>/Resources/shaders/名前.wgsl` → エンジンの `packages/maxpower/webgpu/shaderModules/名前.wgsl` の順に解決。探し先は `host/vite/configs.ts` の `wgslModuleDirs`。ファイルを置くだけで登録は不要）
- 束縛の宣言（`@group ... var<uniform>` や uniform struct）と、パス生成時に値が決まる定数（ぼかし重み・カーネル等）はTS側が完成形の先頭に前置する。WGSLファイル側は、外から与えられる名前を冒頭コメントに書いておく
- 新しい `.wgsl` を足しても設定変更は不要（拡張子で拾う）
- `.wgsl` はHMR対応。`.wgsl` を直接 import するモジュールが `import.meta.hot.accept` でソースを差し替え、`webgpu/backend/HotReload` の `requestShaderReload()` で Renderer / EditorDraw が資源を作り直す。複数箇所から import されるモジュール（Bindings / Lights / PostProcess / Material のようなハブ）に `.wgsl` を足したら、そのモジュール自身に accept を書く（書かないとHMRがエントリまで波及してフルリロードに落ちる）
- player ビルドの terser は `u[A-Z]…` / 大文字のみ / `_` 始まり以外のプロパティ名を改名する（引用符付きキーも対象）。WGSL は minify されないので、**WGSL に出てくる識別子はビルド時に自動で改名対象から外している**（`WgslLoader` の `onSource` → `configs.ts` の `playerTerser`）。uniform / varying / storage / texture の辞書キーを WGSL の名前として使えるのはこのため
- 逆に、WGSL に出てこない文字列で JS のオブジェクトを引く表（`obj[ 'deferred' ]` や `TYPES[ type ]` のような動的アクセス）は改名で壊れる。文字列で引く表は `Map` で持つ。player ビルドは dev で動いても壊れることがあるので、ランタイムを触ったら player ビルドを実際に開いて確認する
- HMR対象外（変更はフルリロード）: `standardVertex.wgsl`（コンポーネント側で連結キャプチャされるため）、エディタギズモの `flat.wgsl` / `mask.wgsl`（生成済み Material が配布先に保持されるため）
