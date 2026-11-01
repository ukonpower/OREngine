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
npx tsx scripts/scene.ts shot tmp/shot/c.png --time 1 --frames 60 --size 960x540   # 0 秒から 60 コマ進めた 1 秒の状態を 960x540 で
```

- 観測: `status` / `tree` / `get <entity>` / `components` / `errors` / `settings` / `shot` / `curves` / `curve-get`。書き込み: `add-entity` / `remove-entity` / `reparent` / `add-component` / `remove-component` / `set` / `set-setting` / `undo` / `redo` / `scene-create` / `scene-delete` / `scene-open` / `key-insert` / `key-delete` / `curve-set` / `curve-paste` / `curve-unlink` / `curve-link-settings`
- シーン管理: `scenes` / `scene-get` はファイルを読むだけなので CLI が dev サーバーの REST（`host/server/routes/scene.ts`）を直接叩き、タブも headless も使わない。`scene-create` / `scene-delete` / `scene-open` はタブ経由で、EditorPage の createScene / deleteScene / openScene（Scene パネルと同じ窓口 `SceneSelection`）を `attachAgentBridge` の `getScenes` から呼ぶので、Scene パネルの一覧・表示と食い違わない。作成・削除はその場でファイルに反映され、undo 履歴には載らない。未保存の変更があるタブへの `scene-open`（`scene-create --open`）と、開いているシーンの `scene-delete` はエラー。`--from` の複製は uuid を振り直さない（シーンは1つずつ読み込まれ、uuid で他シーンを引く仕組みが無いため）
- 設定: `settings [renderer|timeline|editor]` / `set-setting <renderer|timeline|editor> <path> <value>`。対象は `engine.renderer`（シーンの `renderer`）/ `engine` の `timeline/*` / `editor`（editor.json の `resolution/*` / `viewports/<id>/resolutionScale`（Screen パネルごとの解像度スケール。エディタカメラで見ている間はパネルの画素数（CSS の大きさ × devicePixelRatio）に、カメラビュー（シーンカメラ・Camera Render）では `resolution/*` のアスペクト比のままパネルの画素数に収めた大きさ（`resolution/*` が上限）に掛かる）/ `frameLoop/*` のみ。選択・カメラ等の UI 状態は触らせない）。書き込みは `set` と同じく `editor.api.setField( …, { merge: false } )` で undo 1回ぶん。出力の `file` が保存先。実装は `packages/orengine/editor/lib/AgentBridge/SceneCommands` / `SettingCommands`
- `<entity>` は uuid か `root/...` の名前パス。存在しないエンティティ・コンポーネント名・フィールド path はエラーになり、候補が返る
- 書き込みはすべて `EditorAPI` を通るので、GUI の Ctrl+Z / `undo` で戻せる（undo 履歴は GUI と共有）
- **書き込み系コマンドは接続先（ユーザーのタブ / headless）によらず、そのたびに `editor.save()` でファイルへ保存する**。タブのままだと Ctrl+S せずに閉じたとき黙って消えるため。タブに CLI 以前の未保存の変更があれば一緒に保存される。応答は保存の POST が終わってから返る（完了は `EditorPage` の `onSave` が返す Promise で待つ）。保存に失敗したらエラーを返す
  - 保存し終えたタブは HMR 経路で `orengine:agent:saved` を送り、dev サーバーは**それ以外のエディタタブ（ユーザーのタブ・headless とも）へ `full-reload` を送る**。API 経由の保存は `ProjectWatchReload` のリロードを `recentWrites` でタブを区別せず抑制するので、保存元以外への通知は AgentBridge が個別に行う。リロードされたタブの未保存の変更は消える（外部からファイルを編集したときと同じ）
- **タブが1つも接続されていなければ headless Chromium で代わりに接続する**（`scripts/headlessEditor.ts`）。Playwright で `--enable-unsafe-webgpu --use-angle=metal` を付けて起動し（無いと WebGPU の canvas が真っ黒になる。#80 の実測）、同じエディタ URL に `?agent-headless` を付けて開く。シーンの読み込みと最初の描画を待ってからコマンドを実行し、1コマンドごとに閉じる。ローカルの Mac 専用（GPU の無い Linux CI では動かない）。Chromium が無ければ `npx playwright install chromium`
  - headless では1コマンドごとにブラウザを閉じる。保存は応答の前に済んでいるので、CLI は応答を受けたらすぐ閉じる。`scene-open` 後の保存で editor.json の `scene` も切り替わるので、次のコマンドの headless は切り替え先のシーンを開く。undo 履歴はコマンドごとに消えるので、`undo` / `redo` は headless では意味を持たない
  - `status` の `connection` が `"headless"` になる（ユーザーのタブなら `"tab"`）
  - ウィンドウサイズは 1920x1080・deviceScaleFactor 1 に固定している。1920x1080 は一般的なデスクトップの画面サイズで、editor.json のパネル配置がそのまま収まる。`shot`（#83）の出力サイズは `resolution/*`（`--size` を渡せばその大きさ）で決まり、ウィンドウサイズには依存しない
  - ユーザーのタブが開いていれば headless は起動しない。dev サーバーが起動していなければ headless も起動せずエラーで止まる
- エディタ URL に `?agent-scene=<name>` を付けると、editor.json の `scene` の代わりにそのシーンを開く（`EditorPage` の起動時。名前は `AgentBridge/Protocol` の `AGENT_SCENE_PARAM`）。開くだけでは保存しないので editor.json は書き換わらない（`scene-open` は書き込み系なので保存し、`scene` を書き換える）。一覧に無いシーン名なら何も開かず console.error を出す（別のシーンを開くと、呼び出し側が取り違えるため）。scene-shots がシーンを順に開き直すのに使う（`scripts/headlessEditor.ts` の `headlessEditorUrl`）
- `set` の値はフィールドの型で解釈する: 数値 / ベクトル・色は `1,2,3` か `[1,2,3]` / `true`・`false` / 文字列 / select は選択肢の値 / entity 参照は uuid（`null` で外す）。CLI の `set` は1コマンドが undo 1回ぶん
- `reparent <entity> <parent>` は GUI の Hierarchy のドラッグ・Ctrl+P と同じ `EditorAPI.reparentEntities` を通す（「エディタの選択と親の付け替え」の節）。移せないときは理由を、`position` / `euler` / `scale` にキーが打たれていれば `warning`（時刻が変わるとキーの値に戻る）を返す
- タブの選択状態・エディタのカメラ・再生時刻は変えない（`shot` も同じ）。編集できる範囲は GUI と同じ（script 由来のエンティティへの子の追加・削除、user 以外が付けたコンポーネントの削除・編集はできない）
- キーフレーム（#193）: フィールドとカーブの結びつきを変える操作（`key-insert` / `key-delete` / `curve-paste` / `curve-unlink` / `curve-link-settings`）はコマンドで、カーブの形（キーの時刻・値・補間・ハンドル）は `curve-get` / `curve-set` の JSON で扱う。実装は `packages/orengine/editor/lib/AgentBridge/KeyFrameCommands`
  - GUI と同じコマンドを通す: `key-insert` / `key-delete` は `KeyFrameField` の `buildInsertKeys` / `buildDeleteKeys`、共有は `buildPasteCurve` / `buildUnlinkCurve` / `buildCurveLinkSettings`、`curve-set` は `EditorAPI.setCurves`。`EditorAPI.insertKeys` / `deleteKeys` はタブの今の時刻に打つので使わず、`--time` をコマに揃えた時刻を `build*` に直接渡す。タブの再生時刻は変えない
  - フィールドの指定は `set` と同じ `<entity> [<component>] <path>`。数値配列の要素1つは `<path>/<番号>`（フィールドの path そのものとして引けなかったときだけ末尾の番号を要素とみなす）。`curve-paste` / `curve-unlink` / `curve-link-settings` は GUI と同じく要素1つ単位なので、数値配列では要素の指定が必須
  - `--time` は秒で、`snapKeyFrameTime` で `timeline/fps` のコマに揃える。キーは番号でなく時刻で指す（1本のカーブの同じ時刻に置けるキーは1つ）。コマから外れたキー（Blender のカーブを `curve-paste --copy` で複製したもの等）は `key-delete` では指せないので `curve-set` で消す
  - Blender（BLidge）のカーブ（`blidge:` で始まる ID）とリンクは読み取り専用（「キーフレームアニメーション」の節）。`curves` では `readOnly: true` で、使っている側に BLidge のリンクも出る。`curve-set` と、Blender のリンクがある要素への `key-insert` / `curve-paste` / `curve-unlink` / `curve-link-settings`、`curve-paste --link` で `blidge:` のカーブを指すのはエラー。`curve-get` と `curve-paste --copy` はできる
  - `key-insert --value` は `SetFieldCommand` とキーの挿入を `GroupCommand` で undo 1回にする。`buildInsertKeys` は `KeyFrameKeyRef` の `element`（要素1つだけに打つ）・`value`（フィールドの今の値の代わりにその値で打つ）を受ける
  - カーブの JSON は `{ name?, keys: [ { time, value, interpolation, handleType, left, right } ] }`。時刻とハンドルの x は秒（保存形式の `k` の差分・秒×60 に開かない）、ハンドルは絶対座標。`curve-get` は種類に従って置き直したハンドルを出す。`curve-set` はキーを時刻順に並べて `recalcHandles` で置き直してから `encodeCurve` で書く。自動系（`AUTO_CLAMPED` / `AUTO` / `VECTOR`）は `left` / `right` を省略でき、書いても置き直される。`ALIGNED` / `FREE` は必須。`name` を書かなければ名前を外す（中身ごと差し替え）。時刻はコマに揃えず、`curve-get` で出した時刻が戻ってきたら元の秒×60 を使うので、往復でキー列は変わらない
  - 同じ時刻のキーが2つある・存在しないカーブ ID・キーの無い時刻はエラー（候補にカーブ ID・キーのある時刻を返す）。カーブを新しく作るのは `key-insert` と `curve-paste --copy` だけ。`keys` を空にすると、GUI でキーをすべて消したときと同じくそのカーブを指すリンクも外れる
  - `set <entity> Animation links …` はエラー（検証の無い2つ目の経路になるため）。hidden フィールド全般は弾かない（コンポーネントの `enabled` も hidden）
- `shot <out.png>` は shot 専用の RenderView で描いて PNG を CLI が書き出す。カメラは `--camera <entity>` / `--from x,y,z --to x,y,z`（一時カメラ）/ 省略でシーンカメラ。サイズは editor.json の `resolution/*`（最終出力の解像度。Screen パネルの大きさ・`resolutionScale` には依存しない）で、`--size <幅>x<高さ>` を渡すとその大きさで描く（shot のビューの `size` と step の event の `resolution` だけを変え、renderer の解像度・editor.json は変えない。displayOut のカメラの aspect は event の `resolution` に合うので、比率の違う大きさでも歪まない）。`--time T` は「時刻 T-1/60 → T の2ステップだけ進めて描いた状態」（前フレームを T の直前にしてモーションブラーの速度を合わせるため）で、T まで再生した状態ではない。`--frames N`（`--time` と一緒に指定）を渡すと「T の N コマ前から 1/60 秒ずつ進め、途中のコマも描いた状態」になる（時間方向に積むパスの履歴を溜めるため。最初のコマは前フレームの姿勢を作るだけで描かない。省略時は 1 で上の2ステップと同じ）。`--time` を渡すと実時間（`uTimeE` / `uTimeEF` と event の `timeElapsed`）も各ステップの時刻に揃え、`uDeltaTime` を 1/60 にする（ページを開いてからの時間で、同じ時刻でも撮るたびに絵が変わらないように）。省略時はタブの今の時刻で1ステップ。`--view` はパスのラベル（webgl は `camera/deferred_1`、webgpu は `gBuffer_1` のようなバックエンドごとの生の名前）で、一致しなければ候補が返る。実装は `packages/orengine/editor/lib/AgentBridge/ShotCommand`
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

- 編集領域（`Editor.enterEditArea( actions )` / `leaveEditArea( actions )`）: ポインタが領域の上にある間、Delete / X・Ctrl+C・Ctrl+V・G / R / S・Shift+D・B・A / Alt+A・Home・W・Esc（`deselect`。選択を外す）を `EditAreaActions` へ回す。メンバーはどれも任意で、持っていない操作のキーは何もしない（ビューポートへも渡さない。点エディタの上の X でエンティティが消えないように）。領域の `pointerenter` / `pointerleave` で呼び、領域が消えるときにも `leaveEditArea` する
- モーダル（`Editor.beginEditModal( modal )` / `endEditModal( modal )`）: 続いている間は、ポインタの位置によらずキーボードを先に受ける（`EditModal.handleKeyDown` が true を返したら消費）。順番は 編集領域のモーダル → 編集領域の上での G / R / S → ビューポートのモーダル変形
- ビューポートの G / R / S（`ModalTransformHandler`）は、ポインタがビューポートの上にあるとき（`Viewport.hovered`）だけ始まる。プロパティパネル等の上で押しても選択中のエンティティは動かない（I キーと同じ扱い）
- `PointTransformModal`: 2D の点の G / R / S。`mapping`（点の座標 ↔ 画面の px）の上で回転・伸縮を計算し、点ごとの行き先の関数 `( point, owner ) => point` を `onChange` に渡す（`owner` は点の属する点。`individual` ならそれを中心に回す）。`axes: "x"` で横にだけ動かす。X / Y の拘束・数値入力、左クリック / Enter で確定、右クリック / Esc で取り消し。作った側が `beginEditModal` で登録し、`onConfirm` / `onCancel` で外す
- `PointerDrag`（`uipower`。`trackPointerDrag` / `dragRect` / `suppressNextContextMenu`）: 押してから離すまでを追い、3px 動くまではクリックとして扱う。右クリックで取り消した操作の後のメニューを止める。uipower の InputNumber（Vector・ValueArray も）とエディタのドラッグで共有する
  - 押した位置からのずれで動かすドラッグ（数値入力の横ドラッグ、Timeline・カーブ表示・キー表示の中ボタンのパン・拡大縮小）は `lock: true`（閾値の後で取るかを決める側は返り値の `lock()`）で Pointer Lock を取り、カーソルを隠して画面端で止まらないようにする。ロック中のずれは movementX / Y を積む。マウス以外・ブラウザに断られたときは clientX / Y の差分のまま続く。ロックは `document.documentElement` の1か所で取り、使っているドラッグが無くなったら外す（Timeline の中ボタンは横を親、縦を子が同じ押下で追うため）
  - `onCancel` を渡すと、押している間の右クリック / Esc / ロックの外れで取り消す（ロック中の Esc はブラウザがロックの解除に使うので、外れたことで受ける）
  - カーソルの下の物を操作するドラッグ（時刻合わせ・矩形選択・キーのドラッグ・ギズモ・G / R / S）はロックしない
- `PointSelection`: 選択は ID の文字列の `Set`。`pressSelection`（右ボタンで押したときの選び方。Shift で足し引き・アクティブ）/ `boxSelection`（矩形選択の結果）/ `isAllSelected`。`BoxSelectWait` は B の後の左ドラッグ1回を矩形選択にする待機で、作ると編集モーダルとして登録され、右クリック・Esc・領域外の左クリック・`end()` で終わる

### キーフレームアニメーション
Entity / Component の SerializeField にキーを打ち、player で再生する仕組み（#177）。

- データは2か所に分けて持つ。カーブ本体はシーン JSON の最上位 `curves`（Engine のフィールド。カーブ ID → `{ name?, k }`）。リンクはエンティティごとの builtin `Animation` コンポーネントの隠しフィールド `links`（`{ "position": [ [ "c1", 倍率, 足し算 ], … ], "Light:intensity": [ "c2", 1, 0 ] }`。コンポーネントのフィールドは `<コンポーネント名>:<パス>`、数値配列は要素ごと）
- キー列 `k` は BLidge v2 の形式で、時刻の単位は秒×60。デコーダは `decodeKeyFrames`（`packages/maxpower/core/Animation/KeyFrameDecoder`）
- 実行時: Animation（order -1）が `updateImpl` で、時刻が変わったときと `curves` / `links` が差し替わったときだけ `setField` で値を入れる。関数フィールドへのリンクはイベントで、再生中に通過したキーの時刻で呼ぶ（シーク・停止中・ループで先頭へ戻ったときは呼ばない）
- `curves` と `links` は書き換えず、編集のたびに表・オブジェクトごと差し替える。Animation も行の状態表示も、差し替わりを見てカーブを作り直す
- 編集: プロパティパネルの行（コンポーネントの `enabled` は見出しのチェックボックス）の上で `I` / `Alt+I`、行の右クリックメニュー、ビューポートの `I`（位置 / 回転 / スケール / 全部）。キーの時刻は `timeline/fps` のコマに揃える。実装は `editor/lib/KeyFrameField`（フィールドの解決・コマンドの組み立て・行の状態）と `editor/lib/KeyFrameCurve`（キー列の編集・自動クランプのハンドル）。初めて打つフィールドは、Animation の追加・カーブ・リンクを `GroupCommand` で undo 1回にまとめる
- ハンドルの種類（自動クランプ / 自動 / ベクトル / 整列 / 自由）はカーブの `h`（キーごとの番号の配列。並びは `KeyFrameCurve` の `KEYFRAME_HANDLE_TYPES`）に持つ。すべて既定（自動クランプ）なら書かない。エディタだけが読み、キー列を編集するたびに種類に従ってハンドルを置き直す（`KeyFrameCurve` の関数は `CurveData` を受けて `CurveData` を返す純関数）
- タイムライン: Timeline パネルの子 feature `Timeline/features/KeyEditor`（左のチャンネル一覧、キー表示 / カーブ表示）。選択中のエンティティの行だけを出し、選んだキーは `<カーブ ID>:<番号>`、ハンドルは `<カーブ ID>:<番号>:<left|right>` で持つ（共有カーブの行はそろって選ばれる。キーを選ぶと両側のハンドルも選ばれた扱い）。編集の確定は `editor.api.setCurves`（最後のキーを消したカーブを指すリンクも外す）
  - 操作は Blender の右クリック選択（Preferences の Select with: Right）に合わせている: 右クリックでキーを選ぶ（Shift で足し引き、何もない所で選択を外す）、キーからの右ドラッグで選んだキーを動かす、何もない所からの右ドラッグで矩形選択（Shift で足す）、左クリックはキーの上でも時刻合わせ、W でキーのメニュー（補間・ハンドル・整列・アクティブのハンドルの写し・コピー・貼り付け・削除）。右ボタンは `KeyEditor` が1か所で受け、キー表示・カーブ表示は中ボタンと wheel だけを受ける。ほかに B の後の左ドラッグ1回が矩形選択、A / Alt+A で全選択 / 全解除（Esc も全解除）、Home で値の範囲を合わせ直す（値の範囲は状態として持ち、自動で合わせ直すのは選択中のエンティティが変わったときだけ）
  - 表示の移動・拡大縮小も Blender の 2D ビューに合わせている: トラックパッドの2本指で縦横にパン（Shift なら縦にだけ。macOS のマウスの Shift+ホイールがトラックパッドと見分けられない量で来ても縦になるように）、ピンチで縦横そろえて拡大縮小、Ctrl+2本指で縦横それぞれを拡大縮小（指を左・下へで拡大）。マウスはホイールで拡大縮小・Ctrl+ホイールで横・Shift+ホイールで縦にスクロール、中ボタンのドラッグで縦横のパン・Ctrl+中ボタンで縦横それぞれを拡大縮小（右・上へで拡大）。Ctrl はどれも Cmd でもよい（macOS は Ctrl+2本指がアクセシビリティのズームに取られることがあるため。`hasZoomModifier`）。拡大縮小はポインタの位置が基準。横（時刻）は `TimelineControls`、縦はカーブ表示（値の範囲）・キー表示（左のチャンネル一覧の `scrollTop`。縦の拡大縮小は無いので、Ctrl+2本指の縦の量は時刻の拡大縮小に回す）が同じ入力から自分の軸だけを動かす。wheel をパン / 拡大縮小へ読み替えるのは `OREditor/lib/viewGesture` の1か所（Music パネルと共有）（ブラウザはマウスとトラックパッドを区別しないので量の出方で見分け、ピンチ＝ctrlKey 付きの wheel は Ctrl のキーイベントを別に追って Ctrl+2本指と区別する）
  - ドラッグと G / R / S はどちらも `KeyFrameCurve` の `transformKeys`（点の行き先を関数で渡す）を通し、`editor.api.beginEdit( engine, "curves" )` で undo 1回にする。G / R / S のモーダルは `editor/lib/PointTransformModal`（上の「点の編集の部品」。キー表示は `axes: "x"` で時間にだけ動かす）
  - Shift+D は G と同じモーダルで、`transformKeys` の `duplicate`（選んだキーを元の位置に残して複製を動かす）を使う。複製もモーダルの開始時の表から毎回作り直すので、複製と移動が undo 1回になり、取り消すと複製ごと押す前の表に戻る。複製するのはキーだけ（ハンドルだけの選択は対象外）
  - W の Align ▸ Distribute / Straighten Values（`KeyFrameCurve` の `distributeKeys` / `straightenKeys`）: カーブごとに、選んだキーのうち最初と最後（動かさない）を結ぶ直線上へ、Distribute は時刻も値も等間隔に（時刻はコマに揃え、値は揃えた時刻での直線の値）、Straighten Values は時刻そのままで値だけを乗せる。選んだキーが2つ以下のカーブ・Distribute で選んだキーどうしが同じコマに重なるカーブは何もしない。動かした先の選んでいないキーは G と同じく消え、選択は動かした後の番号で選び直す
  - アクティブのキー: 選択とは別に、最後に右クリックで選んだキー1つを `active`（キーの ref）として持ち、白寄りの色（`--or-key-active`）で出す。ハンドルを押したときはその持ち主のキー。キー1つを指さない印（配列の親の行・エンティティの行）を押したときは変えない（Shift なしで選び直したときは外す）。選ばれているがアクティブでないキーの Shift+右クリックは、外さずにアクティブにする（Blender の3Dビューと同じ。選んだ中から写し元を選び直すため）。選択からキーもハンドルも外れたら外す。キーの番号が変わる編集（G / R / S・Shift+D・Align）では、`transformKeys` / `alignKeys` が返す元の番号 → 新しい番号の対応（`indexMap`）で付け替える
  - W の Apply Active Handles（`readHandleOffsets` / `applyHandleOffsets`）: アクティブのキーの左右のハンドルの「キーからのずれ」（区間の長さに合わせた伸縮はしない）と種類を、ほかの選んだキーすべてへ同じずれで写す。自動系は置き直されて形が消えるので、写した側の種類は整列ならそのまま・それ以外は自由にし、補間は Bezier にする。ショートカットは無い
  - キーボード: キーの領域は編集領域（上の「点の編集の部品」）として `Editor.enterEditArea` / `leaveEditArea` で登録する。右クリックでの選び方・B の矩形選択の待機・G / R / S も同じ部品を使い、キー専用なのは ref の作り方・読み方（`KeyEditor/lib/KeySelection`）だけ
- BLidge（Blender）のアニメーションも同じ経路で再生する。BLidge 側に評価する処理は無い
  - カーブ: `BLidge.loadScene` が fcurve を `blidge:<fcurve の番号>`（`MXP.BLIDGE_CURVE_PREFIX`）の ID のカーブにする。キーの時刻は Blender のフレームなので、`scaleKeyFrameTimes` で `60 / fps` 倍して秒×60 に直す（dx とハンドルの x）。`BLidgeClient` の `updateImpl` が、シーンの `curves` の `blidge:` のカーブを今の BLidge のカーブに入れ替える。表は編集のたびに差し替わり、undo では sync より前の表に戻ることもあるので、表が差し替わるたびに確かめて入れ直す（子の Animation より先に走る）
  - リンク: `BLidgeClient` が sync のたびに、BLidge のエンティティへ `BLidgeAnimation`（`BLidgeClient/animation.ts`。`Animation` のサブクラス、initiator は script）を付け直し、`buildBLidgeLinks` で作ったリンクを入れる。対応は position → `position`、rotation → `euler`（カメラは x に足し算 −π/2）、scale → `scale`、hide → `visible`（倍率 −1・足し算 1）、color → `Light:color`、power → `Light:intensity`、uniform → `BLidger:uniforms/<名前>`。リンクのキーは配列の中の文字列で作る（player の terser はオブジェクトのキーを改名するため、`links.position` のようには書かない）
  - 回転: Blender の回転は YZX の順のオイラー角なので、BLidger がエンティティの `euler.order` を `YZX` にして値をそのまま持つ（XYZ へ直すと軸ごとのリンクで表せない）。`MTP.Euler.setFromRotationMatrix` は YZX の順を保って分け直すので、ギズモ・LookAt が quaternion を書いても食い違わない
  - 優先: `BLidgeAnimation` は order 0 で、ユーザーの `Animation`（-1）の後に値を入れる。Blender にカーブのある要素は Blender の値が勝つ。クラスが別なので、同じエンティティにユーザーの Animation（BLidgeClient の attachments で保存される）と両方付く。コンポーネントは名前でなくクラスで引く（`linkComponent` の上書き。player のコンポーネントの登録はシーン JSON に名前が載ったものだけで、`Light` / `BLidger` が無いことがあるため）
  - uniform: 値は `BLidger.uniforms`（`4fv`。値の Vector は入れ替えない）に入る。マテリアルの uniforms へ写して使う（`Object.assign( material.uniforms, blidger.uniforms )`）。フィールド `uniforms/<名前>` は readOnly・noExport
  - 保存しない: `BLidgeAnimation` は script なので attachments にも載らず、`blidge:` のカーブはどのリンクからも指されないので保存時の `pruneUnusedCurves` で外れる
  - 編集させない（Blender で付けたキーは Blender 側でしか触らない）: `KeyFrameField` の `buildInsertKeys` は Blender のリンクがある要素には打たない（全部そうなら Error。`I` の「All」等では残りの要素にだけ打つ）。カーブの共有の操作（貼り付け・解除・リンクの設定）はその要素では Error、`blidge:` のカーブのリンクしての貼り付けも Error（複製しての貼り付けはユーザーのカーブになるのでできる）。`blidge:` のカーブを書き換える表の差し替え（`buildSetCurves` など `buildCommand` を通るもの）も Error。KeyEditor は `BLidgeAnimation` のリンクを読み取り専用の行（`KeyChannel.readOnly`、識別子は `#blidge:<対象>`）として出し、`blidge:` のカーブのキーは選択に入れない（選べなければ、選択を対象にする編集は届かない）。キーの貼り付けも読み取り専用の行には入れない
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

### Music（音）
- builtin コンポーネント `Music`（`packages/orengine/builtin/Components/Utility/Music/`）。トラックごとに楽器の GLSL から曲の全サンプルを WebGL2 の transform feedback で作り、Web Audio で混ぜてタイムラインに合わせて鳴らす（#271 / #272 / #273 / #274 / #275）。シーンに1つ置く（2つ目からは鳴らさない）。ほかのコンポーネントは `Music.instance`（無ければ `null`）で今の曲を引く。webgl だけで、webgpu のプロジェクトでは置いても鳴らさない
- フィールド: `bpm`（曲全体で1つ。途中で変えない。秒 = 拍 × 60 / BPM、小節は4拍）/ `tracks`（トラックごとに `[ 名前, 楽器, 音量, パン, 帯 ]`。terser がオブジェクトのキーを改名するので、Animation の `links` と同じくキーを持たない配列。型は `Music/instrument.ts` の `MusicTrackData`）/ `reverb/length`（残響の素の秒）/ `reverb/wet`（残響の量）。曲の長さは `timeline/duration`、サンプリングレートは端末の `AudioContext.sampleRate`
- 帯（DAW のクリップ）: `[ 前の帯からの拍, 長さ, 中の時間の始まり, 数値, ノート ]`（`MusicClipData`。最初の帯の開始は曲の頭からの拍。開始を差分で持つのは、繰り返したフレーズが同じ文字列になり deflate で潰れるため）。数値を使わない帯は4つ目から省き、ノートの帯では数値の代わりに `[]` を置く。名前・色は持たない。音は帯の中でだけ鳴り、帯の終わりで切る（余韻も残さない）
  - 中の時間: 帯の頭で「中の時間の始まり」から曲と同じ速さで進む（`Song.clipBeat` = 中の時間の始まり ＋ 帯の頭からの拍）。動かすと中の音も一緒にずれ、右端を伸ばすと先へ続き、左端で頭を削ると中の音はその場に残って始まりが変わる（0 より前には戻さない）
  - 重なり: 1つのトラックの帯は重なってよく、重なった区間は後に始まる帯（開始が同じなら並びの後ろ）が鳴る。重ならなくなった所では下の帯が続きの中の時間から鳴る。区間の解決は `Music/clips.ts` の `resolveClipSegments`（純関数。生成と Music パネルの両方が使う）だけで行う
  - 数値: 帯ごとに4つ（GLSL の `Song.clipParam`、vec4。書かなかった数値は 0）。同じ楽器のまま帯ごとに鳴り方を変える（例: Kick の帯ごとにキックの種類の音量を変える）。名前は楽器の `index.ts` の `params`（最大4つ。Music パネルの表示にだけ使い、名前の無い数値はパネルに出さない）
  - ノート: ノートの楽器のトラックの帯は5つ目に `[ 前のノートからの拍, 長さ（拍）, 音高 ]`（`MusicNoteData`。音高は MIDI の番号で 69 = A4 = 440Hz）の配列を持つ。ノートごとの強さ（velocity）は持たない。強弱は楽器の側で帯の中の拍から作るか、帯の数値で付ける。時刻は帯の中の時間で、最初のノートは中の時間の 0 から。同じ時刻の和音は差分 0。開始を差分で持つのは帯と同じ理由（Demo4 の Lead・Bass の 356 ノートで deflate 後 225B、帯の中の時間の絶対値だと 999B）
- 楽器: ライブラリの種類 `Instruments`（下の「ライブラリ」）。`<projectDir>/Resources/Library/Instruments/<名前>/` に `index.ts`（`Instrument` = `{ shader, maxNotes?, release?, params? }` を `export default`。型は `orengine/builtin`。`maxNotes`（省略時 1）と `release`（秒、省略時 0）はノートの楽器だけが使う）と `index.glsl` を置く。builtin は `packages/orengine/builtin/Library/Instruments/`（拍ごとにクリックを鳴らす `Metronome`）。player は `Music/player.ts` がトラックの楽器を返し、使う楽器だけを焼き込む
- .glsl には `vec2 trackSound( Song s )`（コードの楽器）か `vec2 noteSound( Note n, float t )`（ノートの楽器）のどちらか一方だけを書く（どちらを書いたかでトラックの鳴らし方が決まり、トラックの側に種類は持たない。判定は `Music/instrument.ts` の `instrumentSoundKind`）。ShaderBuilder が楽器の `index.glsl`（パスの `/Library/Instruments/<名前>/index.glsl` で見分ける）の先頭に `#include <module:music>`（`Song` の `beatSec` / `clipBeat` / `clipParam`、`saw` / `whiteNoise` / `noteFreq`、uniform の `uBlockTime` / `uSampleRate` / `uBPM` / `uClipBeat` / `uClipParam`）を、後ろに `#include <part:music_main>`（1頂点1サンプルの main。`trackSound` を呼ぶ）を足すので、楽器の側では music の include も main も書かない。`noise_value` などほかのモジュールは楽器の側で include してよい。`noteSound` と `trackSound` の両方・どちらも無い楽器・コンパイルできない楽器はそのトラックだけ無音にし、エラーは dev でだけ `console.error` に出す（シーン CLI の `errors`・scene-shots に出る）
  - 楽器は帯の中の時刻だけで書く。`Song` に曲の頭からの時刻は無く、`uBlockTime`（`music_note.part.glsl` がノートを引くのに使う）も楽器の側では読まない。帯の中身が置いた位置によらず同じ音になるので、エディタは帯を動かしたとき作り直さずに音を移す（下の「作り直す範囲」）
  - コードの楽器: `trackSound` は帯の中でだけ呼ばれるので、どこで鳴らすかは書かず、帯の中の拍 `s.clipBeat` と帯の数値 `s.clipParam` で書く
  - ノートの楽器: `noteSound` はノート1つぶんの音で、`t` はノートが鳴り始めてからの秒。`Note` は `pitch` / `length`（秒。帯の終わりで切ったあと）/ `clipParam`（ノートのある帯の数値）。ShaderBuilder が `noteSound` の定義を見つけたら、`music` の後ろに `#include <module:music_note>`（`Note`・`noteRelease`）、`music_main` の前に `#include <part:music_note>`（エンジンの `trackSound`。枠ごとに今鳴っているノートを1つ探して `noteSound` を足し合わせる）も足す。`Note` を `music` モジュールに置かないのは、コードの楽器に使わない struct が入るだけで minifier が楽器ごとに型名を配り直し、music シーンの packed が 148B 増えたため。楽器の側でも `trackSound` を書くと定義が2つになり、「両方ある」として無音になる
  - 余韻: ノートの終わりから `release` 秒までは鳴っている扱いで `noteSound` が呼ばれる。減り方は `noteRelease( n, t )`（ノートを離してからの秒、鳴らしている間は 0）で書く（例: `exp( - noteRelease( n, t ) * 8.0 )`）
- minify: 楽器は、ほかのシェーダーとは別の回で shader_minifier にかける（`runBatchMinify`）。minifier は1回の中で型名・変数名を出現数で配り直すので、同じ回に入れると楽器を足すだけで Music を置かないシーンのシェーダーまで変わり packed が増える（main で +84B を実測）。`trackSound` / `noteSound` は改名させない（Music が完成形の文字列からどちらを定義したかを読む）
- ノートの変換（`Music/notes.ts` の `resolveNotes`。純関数）: 帯・BPM・楽器が変わって作り直すときに、区間（`resolveClipSegments`）ごとにその区間を鳴らす帯のノートを拾い、曲の頭からの秒に直す。開始が区間の外（帯の外・上の帯に隠れた所）のノートは落とし、区間の終わり（帯の終わり・隠れる前から鳴っていたノートは上の帯の始まり）で長さを切る。余韻も区間の終わりで切る。開始の順に `maxNotes` 個の枠へ割り当て、空いた枠（前のノートの余韻まで終わった枠）が無ければ一番早く始まったノートをその時刻で切って枠を譲らせる（ボイススティール。サンプルごとにシェーダーで選ぶと、一度落としたノートが途中から鳴り直すため）。同じ時刻に枠より多いノートがあると、先のノートは鳴る前に切られて消える。変換したノート（`MusicNote`: 開始・長さ・止める時刻・音高・枠・帯の番号）はトラックごとに CPU 側に持つ（`Music` の `MusicTrack.notes`。絵から音を引く読み口 #275 が読む）
  - テクスチャ（`buildNoteTexture`）: RGBA32F で、1行が1つの枠・枠の中は開始の順。ノート1つに1画素（`( 開始, 止める時刻, 長さ, 音高 )`）。行の長さは一番多い枠に揃え、空きは開始 1e9 で埋める。シェーダー（`music_note.part.glsl`）は枠ごとに二分探索で「開始が今以前の最後のノート」を引き、止める時刻より前なら鳴らす。ノートを編集してもテクスチャを入れ直すだけでコンパイルし直さない
- 生成（`Music/generator.ts`）: `BLOCK_SAMPLES`（131072 サンプル）のかたまりごとに、トラックの区間（`resolveClipSegments`）ごとに描画を分けて、トラックごとの AudioBuffer（2ch）に書く。区間の範囲・中の拍・帯の数値は描画ごとの uniform（`uBlockTime` / `uClipBeat` / `uClipParam`）で渡す（帯の数だけ uniform の配列を持つと上限に当たるため）。描く頂点の数は区間の長さで、`GLPowerTransformFeedback.dispatchPoints( vao, count )` は頭の count 個だけを書く。かたまりは先に無音にしてから区間を書くので、帯の外は無音になる。シェーダーは中身ごとに1つコンパイルして使い回す。エディタでは再生位置のかたまりから前後へ交互に作り、8ms ごとに描画を譲る。player では PlayerRegistry が、Music を置いたシーンのレジストリにだけ `attachMusicLoading`（`Music/loading.ts`）を足し、`Engine.compileShaders` に全トラックの生成をつないで今の進捗バーに載せる（置かないシーンの player にはこのコードが入らない）
- メモリ: 1トラックで 長さ × sampleRate × 2ch × 4B を持つ（158 秒・48kHz で約 61MB）
- 作り直す範囲: 楽器の .glsl の保存 → その楽器のトラックだけ作り直す（ShaderBuilder が楽器のシェーダーのモジュールだけを self-accept で差し替えて `orengine:instrument` を出し、Music がライブラリの楽器を差し替える。更新が index.ts まで伝わると registry の glob を通ってページ全体の読み直しになるため）。帯・ノート → そのトラックだけ作り直す（コンパイルはしない。帯の配列が差し替わったら中身の文字列を比べ、同じなら作り直さない。エディタでは下の「移す」）。BPM・曲の長さ → 全トラックを作り直す（コンパイルはしない）。音量・パン → ノードの値を書き換えるだけ
  - 移す（エディタだけ）: 帯だけが変わったトラックは、作り終えた音を今の帯の位置へ写す（`Music/move.ts` の `planClipMove`）。前と今の区間を比べ、同じ中身（帯の数値・ノートの文字列が同じ）の帯の、帯の中の同じ拍の音を写し、移せる音の無い所（右端を伸ばした先・上の帯が退いて出てきた下の帯・まだ作っていないかたまり）だけを作り直す。ノートの楽器は、区間の頭より前に始まったノートを落とし区間の終わりで長さを切るので、帯の中の範囲がまったく同じ区間からだけ写す（左端を削った帯は作り直す）。写すとサンプルの丸めの分（1 サンプル以内）だけ作り直した音とずれる。写した範囲はすぐ `update/music` に `track`（そのトラックの番号）付きで出し、Music パネルの帯の波形の素（`MusicTrackPeaks`）はそのトラックだけを読み直す。Timeline の波形の1本の足し直しと、再生中の source の張り直しは、変化が 200ms 止まってから1回だけ行う（ドラッグの間に毎回すると、全トラックの足し直しで重く、音も途切れ続けるため）
  - エディタでは、作り直しは設定の変化が 200ms 止まってから始める（`REGENERATE_DELAY`。帯・ノート・数値のドラッグは tracks・bpm を毎フレーム差し替えるため）。変化を見つけたら走っている生成も止め、待っている間は前の音のまま鳴らす。区間・変換したノート（読み口）は待たずに入れ替わる。player は読み込み後に tracks が変わらないので待たない
- ミックス（`Music/mixer.ts`）: トラックごとに `AudioBufferSourceNode → GainNode（音量）→ StereoPannerNode（パン）` を、全体の GainNode と ConvolverNode（リバーブ。ノイズ × exp(−7 × 頭からの割合) の残響の素）→ 残響の量の GainNode → 全体の GainNode へ分ける。全体の音量は持たず、トラックの音量で合わせる
- 再生: 全トラックの source を同じ `when` / `offset` で start する。更新のたびに鳴っている位置と `event.timeCode` を比べ、0.1 秒以上ずれたら張り直す（シーク・ループ・BLidge の同期もこれで拾う）。作り終えたかたまりを鳴らすときも張り直す（再生中の buffer の書き換えを拾うとは限らないため）。`event.offline`（shot・書き出し）の更新では音に触れない。AudioContext は全 Music で1つを使い回し、ブラウザの自動再生の制限のため `pointerdown` / `keydown` のたびに `resume` する（player の Play ボタンの操作の中で始まる。`autoPlay` では鳴らないことがある）
- 波形表示: Music が作るたびに Engine から `update/music`（`MusicOutput`: tracks と同じ並びのトラックの AudioBuffer と音量、変わったサンプルの範囲）を出し、`Editor` が `editor/lib/MusicWaveform` でトラックを音量を掛けて足した1本（パン・リバーブは反映しない目安）にして `audioBuffer` に持ち、足し直したら editor の `update/audioBuffer` を出す。Timeline・AudioView はそれを受けて描く。音量だけが変わったときは、Music はサンプルの範囲を空（`start === end`）にして出し、`MusicWaveform` は変更が 200ms 止まってから曲全体を1回だけ足し直す（数値のドラッグで毎フレーム曲全体を足し直さないため）。`track` 付き（帯を動かして写した）ときも、変わった範囲を溜めて 200ms 止まってから足し直す。パンの変更は出さない。同じイベントで、トラックごとの波形の素（256 サンプルごとの振れ幅の最大。`MusicTrackPeaks`、`editor.musicTrackPeaks`）も持ち、Music パネルが帯の波形を描く
- 確かめる曲: demo-webgl の `scenes/music.json`（osc Demo4 の曲を楽器ごとの10トラックに分け、セクションを帯で置いたもの。セクションごとの鳴り方の違い（キックの種類・パッドの音量など）は帯の数値で受ける）。Lead・Bass はノートの楽器で、Demo4 のメロディ・根音を帯の中のノートに置いている。Demo4 の発振器・左右の振りはノートの頭で巻き戻さず帯の中の時刻で回り続けるので、2つの楽器は `noteSound` の中で帯の中の拍を `uClipBeat` と `aIndex` から読む（`t` だけで書くと Lead が 2.7dB 大きくなる）
- 絵から音を引く読み口（#275）: `music.lastNote( トラック名, event.timeCode )` → `{ since, pitch, length }` | null（その時刻までに鳴り始めた最後のノート。`since` は鳴り始めてからの秒、`length` は帯の終わりと `maxNotes` の枠を奪われた時刻で切った長さ（秒））、`music.currentClip( トラック名, event.timeCode )` → `{ since, params }` | null（その時刻に鳴っている帯。`since` は帯の頭からの秒、`params` は帯の数値4つ）。探索は `Music/readout.ts` の純関数（`findLastNote` / `findCurrentClip`）
  - `lastNote` が見るのは変換したあとのノート（`MusicTrack.notes`。帯の外・隠れた区間で落としたノート、鳴る前に枠を奪われた和音の音は含まない）。同じ時刻に鳴り始めた和音は一番低い音を返す。コードの楽器のトラックは常に null（音はシェーダーの中でしか分からないため。帯は `currentClip` で引く）
  - `currentClip` は重なった区間では実際に鳴っている帯（`resolveClipSegments` の区間）を返す。上の帯が終わって下の帯が続きから鳴り出したときも、`since` は下の帯の頭から数える
  - 時刻に event の `timeCode` を渡すので、Cloner の持ち場の中では遅れた時刻で引ける（複製は改修なしで順番に光る）。頭より前の時刻（`delay/loop` が OFF の遅れ）は null
  - トラックは名前で引く（名前は曲の中で重ならない）。生成の状態（区間・変換したノート）は `refresh_` で作るので、webgl で Music が鳴らせるときだけ引ける（webgpu では常に null）
  - コンポーネントからは `import { Music } from 'orengine/builtin/Components/Utility/Music'` で引く。`orengine/builtin` の入口は builtin のコンポーネントをすべて登録する glob を持ち、値を import すると player に builtin が全部入る（`Instrument` のような型だけの import は消えるので構わない）
- スペクトル: `MusicMixer` が全体の GainNode の後（全トラック・リバーブ込み）に AnalyserNode（`fftSize` 512）をつなぎ、Music が再生中の更新ごとに `getByteFrequencyData` を 256×1 のテクスチャ（R8・linear・clamp）へ入れて `renderer.globalUniforms.uMusicFreqTex` に置く（名前は osc Demo4 と同じ）。どのシェーダーでも `uniform sampler2D uMusicFreqTex;` と書けば引け、マテリアルの uniforms には書かない。停止中は最後の値のまま、shot・scene-shots（`event.offline`）には反映されず、Cloner の遅れにも乗らない。Music が無いシーン・webgpu では作らない（そのシーンのシェーダーが引いても中身は決まらない）
- 読み口のサンプル（demo-webgl）: `scenes/music-lastNote.json`（`Samples/Music/NoteFlash`。ノートの楽器 `KickNote` のノートで光る立方体を Cloner で遅らせて並べる）、`scenes/music-currentClip.json`（`Samples/Music/ClipColor`。コードの楽器 `Chord` の帯の数値 root を色相にする。帯の重なりもある）、`scenes/music-spectrum.json`（`Samples/Music/SpectrumWave`。`uMusicFreqTex` で上の辺が揺れる板。再生しないと動かないので scene-shots の PNG は平らなまま）

#### Music パネル（エディタ）
- `features/OREditor/features/Music`（パネルの id は `music`、タブ追加メニューの Audio）。シーンの `Music.instance` のトラックと帯を編集する（無ければ空の表示）。Music はエディタのフレームごとに確かめ、入れ替わったら `key` で作り直す（表示範囲・選択も捨てる）。上がトラックと帯のタイムライン、その下の1行が開いている帯の数値（楽器が名前を付けた数値だけ）、ノートの帯を開いているときは下半分がピアノロール（下の「ピアノロール」）
- 並び: 上の段の左の角に BPM、右に小節の目盛り（押した位置へ再生位置を合わせる）。行は左に見出し（名前・鳴らし方 Note / Code・音量・パン）、右にレーン。コードの帯には生成した波形を、帯が鳴らしている区間だけに出す。ノートの帯にはノートの縮図（帯のノートの一番低い音から高い音までを帯の高さに広げたもの）を出す。重なった帯は勝つ帯を手前に行の高さいっぱいで描き、下の帯の重なった部分は隠れて押せない。曲の終わりより後ろは暗くする
- 帯の操作は DAW に揃える（Music パネルの上だけ左クリックで選ぶ）: クリックで選ぶ・開く（Shift で足し引き）、何もない所のダブルクリックで置く（長さは直前に置いた・長さを変えた帯と同じ。最初は1小節）、真ん中のドラッグで動かす（押した帯の頭を1拍に吸着し、選んだ帯がそろって動く）、Alt+ドラッグでコピーして動かす、右端のドラッグで長さ、左端のドラッグで頭を削る、Delete / Backspace で消す、Esc で選択を外す（何もない所を押したときと同じく開いている帯も閉じる）、Ctrl+D（macOS は Cmd+D）で選んだ帯の範囲のすぐ後ろへ並べる（並べた側が選ばれるので、押した回数だけ続く）。コピーは元とつながらない
- トラックの見出し: 一覧の下の「+」で楽器の一覧（`getLibraryItemNames( "Instruments" )`）からトラックを足す（名前は楽器名）、右クリックメニューで楽器の変更（帯とノートは残す）と削除、ドラッグで並べ替え（Hierarchy の行と同じく落とす先の行を枠で示す）、名前のダブルクリックで名前の入力。名前がぶつかったら `Kick 2` のように番号を振る（`lib/clipEdit` の `uniqueTrackName`）
- メトロノーム: 上の段の角の BPM の隣のボタンで ON / OFF。editor.json の `music/metronome` に保存し（ミュート・ソロと同じく `MusicMonitor` で `Music.monitor` に入れる。undo には載せない）、Music パネルを閉じていても鳴る。音は builtin の楽器 `Metronome` と同じクリックを CPU で1小節ぶん作り（`Music/metronome.ts`）、ループして鳴らす。トラックではないので生成・波形表示・スペクトル・リバーブには入らず、`AudioContext.destination` へ直接出す。拍は `MusicMixer.songStartTime`（曲の頭が鳴る時刻）から測るので、ON / OFF ではトラックを張り直さない。呼ぶのは `import.meta.env.DEV` の中だけなので player には入らない
- 表示の移動・拡大縮小は Timeline と同じ読み替え（`OREditor/lib/viewGesture` と `OREditor/hooks/useViewWheel`。Timeline と共有するため OREditor 直下に置いている）。横は拍の表示範囲、縦は行のスクロール（ピアノロールは音高のスクロール）。中ボタンのドラッグで縦横のパン、Ctrl+中ボタンで横の拡大縮小
- 編集はどれも EditorAPI を通して undo 1回（ドラッグ・数値入力のドラッグは `beginEdit( music, "tracks" )`）。帯の編集は `lib/clipEdit`（tracks を曲の頭からの拍の帯に置き直して編集し、開始の順に並べ直して差分の形へ戻す純関数）。選択は帯の番号（`<トラック>:<帯>`）で持ち、並べ直した後の番号へ付け替える
- キー: タイムラインの部分（`MusicTimeline` の `.main`）は編集領域（`Editor.enterEditArea`）として登録し、`EditAreaActions.handleKeyDown` で Delete / Backspace・Ctrl+D を、`deselect` で Esc を受ける（`handleKeyDown` は G / R / S などの割り当てより先に渡る。消費したキーはほかのショートカットへ渡さない）。X・Shift+D などほかの割り当ては Music パネルの上では何もしない。ピアノロールは別の編集領域で、wheel・中ボタンのドラッグもタイムラインとロールが別々に受ける

#### ピアノロール（Music パネルの下半分）
- `Music/components/MusicRoll`。開いた帯1つの中だけを編集する。横は帯の中の時間（小節の目盛り。押した位置へ再生位置を合わせる）、縦は音の高さ（MIDI の 0〜127。行の高さは scss の `--music-key-height` で、JS は並べた全体の高さから測る）。帯の外（中の時間の始まりより前・帯の終わりより後ろ）は斜線で、そこに始まるノートは薄く出る（鳴らない）。左の鍵盤の列はタイムラインの見出しの列と同じ幅で、時間の軸の左端がそろう。表示の移動・拡大縮小はタイムラインと同じ読み替えで、縦は音高のスクロール
- 操作は DAW に揃える（`hooks/useMusicNoteEditing`。左クリック選択。`PointSelection` / `PointTransformModal` は使わない）: クリックで選ぶ（選んだノートをその高さで一度鳴らす。Shift で足し引き）、何もない所からの左ドラッグで矩形選択（Shift で足す）、Ctrl+A で全選択、Esc で選択を外す、何もない所のダブルクリックで置く（グリッドの手前の目・押した高さ。長さは直前に置いた・長さを変えたノートと同じで、最初は 1/4 拍）、Cmd（macOS。ほかは Ctrl。macOS の Ctrl+クリックは右クリック扱いになるため）を押している間はポインタの下に置き先を半透明で出し、押したとき・押したまま高さが変わったときにその高さで鳴らし、Cmd / Ctrl+クリックでそこに置く、ノートのダブルクリック・Delete / Backspace で消す、本体のドラッグで動かす（押したノートの頭をグリッドに、縦は半音に吸着。高さが変わるたびに鳴らし直す）、右端のドラッグで長さ（グリッドに吸着。下限はグリッドの1目）、Alt+ドラッグでコピーして動かす、↑ / ↓ で半音・Shift+↑ / ↓ で1オクターブ・← / → でグリッド1つぶん（グリッドなしなら 1/4 拍。矢印は選んでいるノートがあるときだけ受け、無ければタイムラインのコマ送りへ渡す）、Ctrl+D で選んだ範囲を小節に切り上げた長さだけ後ろへ並べる、Ctrl+C / Ctrl+V で再生位置（グリッドの手前の目）へ貼る（コピーは帯をまたいで貼れる）、Q で選んだノートの開始をグリッドの近い目に揃える。どれも元とつながらないコピーで、編集はどれも undo 1回（ドラッグは `beginEdit( music, "tracks" )`）
- グリッド: ロールの左上の select で 1/4・1/8・1/16・1/32・None（既定 1/16。1/4 = 1拍）。editor.json の `music/grid`（1小節を何分割するか。0 はなし）に保存する。帯の吸着（1拍）には効かない。グリッドなしでも時刻は 1/128 拍に丸める（差分に直しても小数の誤差が積もらないよう 2 の累乗の分数にする）
- 編集は `lib/noteEdit`（帯の中の拍の絶対値に置き直して編集し、開始の順・同じ開始は低い音から並べ直して差分の形へ戻す純関数）。開いている帯のノートの差し替えは `lib/clipEdit` の `setActiveNotes`。選択はノートの番号で持ち、並べ直した後の番号へ付け替える。開く帯が変わったら（clipKey が変わったら）ロールを `key` で作り直す
- 試聴（`lib/notePreview` の `MusicNotePreview`）: 鍵盤のクリック・ノートを選んだときに、その1音（長さ1拍＋`release`）を、曲の生成と同じ `MusicGenerator` の transform feedback で作って鳴らす（曲のバッファには混ぜない）。トラックの音量・パンだけを掛け、リバーブは掛けない。鳴らし始めの帯の中の拍を渡すので、帯の中の時刻で鳴り方が変わる楽器（Demo4 の Lead）も置いた所と同じに聞こえる。エディタだけの機能なので player に入る Music には持たせず、パネルが初めて鳴らすときに作り、閉じたら捨てる

### エディタの選択と親の付け替え
- 選択は Blender と同じく「選んでいるものの集合＋アクティブ1つ」。editor.json の `selectedEntityIds`（選んだ順）と `selectedEntityId`（アクティブ）に保存する。アクティブは必ず集合に入っている（`Editor` の2つのフィールドの setter が保つ）。窓口は `Editor.selectEntity`（それ1つにする）/ `setSelection` / `toggleEntitySelection`、読むのは `selectedEntities` / `activeEntity`
- 1つだけを相手にする操作（Property パネル・キーの挿入・Timeline の KeyEditor・フォーカス `.`・F2）はアクティブを見る。削除（X）・複製（Shift+D）・G / R / S・ギズモ・親の付け替えは集合を見る。集合を見る操作は、祖先も選ばれているものを外してから扱う（`TransformTargets` の `topmostEntities`。親と一緒に動く・消える・移るため）
- 操作: ビューポートは右クリックで選択、Shift+右クリックで足す・アクティブにする・外す（選んでいてアクティブでなければアクティブにする。Blender の 3D ビューと同じ）。Esc は、ポインタがビューポートの上ならエディタカメラをシーンカメラに合わせ、編集領域（キー・帯・ノート等）の上ならその領域の選択を、それ以外（Hierarchy・Property など）の上ならエンティティの選択を外す。Hierarchy はクリックで選択、Ctrl / Cmd+クリックでビューポートの Shift と同じ足し引き、Shift+クリックでアクティブから押した行までの範囲選択（見えている行の並び。アクティブは変えない）
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
- 流れ（`tests/scene-shots/sceneShots.spec.ts`）: バックエンドごとに `runDev` で dev サーバーを立て、headless Chromium（`scripts/headlessEditor.ts` の `launchHeadlessEditor`。フラグはシーン CLI の headless と同じ）を開いたまま、`?agent-scene=<name>` 付きの URL でシーンを順に開き直し、AgentBridge の HTTP（`POST /__agent/shot` / `errors`）で撮る。終わったら（途中で失敗しても）ブラウザと dev サーバーを閉じる
  - 開き直したら、通信が落ち着く（`networkidle`）のを待ち、さらにページのフレームが30回まわるまで待ってから撮る。BLidge のシーンは通信の後も画像のデコードと 100ms のタイマーを挟んでからカメラを作り、初回はシェーダーのコンパイルでメインスレッドが塞がるため（CPU を 8 倍に絞った実測で、フレームを待たないと「displayOut のカメラがありません」で失敗する）
- ユーザーが別に `npm run dev` を立てていても衝突しない: ポートは webgl が 3300 / 3301、webgpu が 3310 / 3311 から空きを探す（ユーザーのタブがこの dev サーバーに繋がるとコマンドがそちらへ送られるので、既定の 3000 番台から離す）。`tmp/dev-server.json` は書かない（`runDev` の `writeDevServerInfo: false`）。vite の依存の事前バンドルは `node_modules/.vite-scene-shots/<バックエンド>` に分ける（`cacheDir`。プロジェクト・レンダラーの違う dev サーバーが同じ置き場を使うと、起動した側が作り直して入れ替え、動いている側の配信を壊すため）。シーンは開くだけで保存しないので、editor.json もシーンファイルも変わらない
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
- player ビルドの terser は `u[A-Z]…` / 大文字と `_` のみ / `__` 始まり以外のプロパティ名（protected の `_xxx` も改名される）を改名する（引用符付きキーも対象）。WGSL は minify されないので、**WGSL に出てくる識別子はビルド時に自動で改名対象から外している**（`WgslLoader` の `onSource` → `configs.ts` の `playerTerser`）。uniform / varying / storage / texture の辞書キーを WGSL の名前として使えるのはこのため
- 逆に、WGSL に出てこない文字列で JS のオブジェクトを引く表（`obj[ 'deferred' ]` や `TYPES[ type ]` のような動的アクセス）は改名で壊れる。文字列で引く表は `Map` で持つ。player ビルドは dev で動いても壊れることがあるので、ランタイムを触ったら player ビルドを実際に開いて確認する
- HMR対象外（変更はフルリロード）: `standardVertex.wgsl`（コンポーネント側で連結キャプチャされるため）、エディタギズモの `flat.wgsl` / `mask.wgsl`（生成済み Material が配布先に保持されるため）
