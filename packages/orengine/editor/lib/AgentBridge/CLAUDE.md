# シーン CLI（AgentBridge）

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
- `reparent <entity> <parent>` は GUI の Hierarchy のドラッグ・Ctrl+P と同じ `EditorAPI.reparentEntities` を通す（`packages/orengine/editor/lib/CLAUDE.md`）。移せないときは理由を、`position` / `euler` / `scale` にキーが打たれていれば `warning`（時刻が変わるとキーの値に戻る）を返す
- タブの選択状態・エディタのカメラ・再生時刻は変えない（`shot` も同じ）。編集できる範囲は GUI と同じ（script 由来のエンティティへの子の追加・削除、user 以外が付けたコンポーネントの削除・編集はできない）
- キーフレーム（#193）: フィールドとカーブの結びつきを変える操作（`key-insert` / `key-delete` / `curve-paste` / `curve-unlink` / `curve-link-settings`）はコマンドで、カーブの形（キーの時刻・値・補間・ハンドル）は `curve-get` / `curve-set` の JSON で扱う。実装は `packages/orengine/editor/lib/AgentBridge/KeyFrameCommands`
  - GUI と同じコマンドを通す: `key-insert` / `key-delete` は `KeyFrameField` の `buildInsertKeys` / `buildDeleteKeys`、共有は `buildPasteCurve` / `buildUnlinkCurve` / `buildCurveLinkSettings`、`curve-set` は `EditorAPI.setCurves`。`EditorAPI.insertKeys` / `deleteKeys` はタブの今の時刻に打つので使わず、`--time` をコマに揃えた時刻を `build*` に直接渡す。タブの再生時刻は変えない
  - フィールドの指定は `set` と同じ `<entity> [<component>] <path>`。数値配列の要素1つは `<path>/<番号>`（フィールドの path そのものとして引けなかったときだけ末尾の番号を要素とみなす）。`curve-paste` / `curve-unlink` / `curve-link-settings` は GUI と同じく要素1つ単位なので、数値配列では要素の指定が必須
  - `--time` は秒で、`snapKeyFrameTime` で `timeline/fps` のコマに揃える。キーは番号でなく時刻で指す（1本のカーブの同じ時刻に置けるキーは1つ）。コマから外れたキー（Blender のカーブを `curve-paste --copy` で複製したもの等）は `key-delete` では指せないので `curve-set` で消す
  - Blender（BLidge）のカーブ（`blidge:` で始まる ID）とリンクは読み取り専用（`packages/orengine/editor/lib/KeyFrameField/CLAUDE.md`）。`curves` では `readOnly: true` で、使っている側に BLidge のリンクも出る。`curve-set` と、Blender のリンクがある要素への `key-insert` / `curve-paste` / `curve-unlink` / `curve-link-settings`、`curve-paste --link` で `blidge:` のカーブを指すのはエラー。`curve-get` と `curve-paste --copy` はできる
  - `key-insert --value` は `SetFieldCommand` とキーの挿入を `GroupCommand` で undo 1回にする。`buildInsertKeys` は `KeyFrameKeyRef` の `element`（要素1つだけに打つ）・`value`（フィールドの今の値の代わりにその値で打つ）を受ける
  - カーブの JSON は `{ name?, keys: [ { time, value, interpolation, handleType, left, right } ] }`。時刻とハンドルの x は秒（保存形式の `k` の差分・秒×60 に開かない）、ハンドルは絶対座標。`curve-get` は種類に従って置き直したハンドルを出す。`curve-set` はキーを時刻順に並べて `recalcHandles` で置き直してから `encodeCurve` で書く。自動系（`AUTO_CLAMPED` / `AUTO` / `VECTOR`）は `left` / `right` を省略でき、書いても置き直される。`ALIGNED` / `FREE` は必須。`name` を書かなければ名前を外す（中身ごと差し替え）。時刻はコマに揃えず、`curve-get` で出した時刻が戻ってきたら元の秒×60 を使うので、往復でキー列は変わらない
  - 同じ時刻のキーが2つある・存在しないカーブ ID・キーの無い時刻はエラー（候補にカーブ ID・キーのある時刻を返す）。カーブを新しく作るのは `key-insert` と `curve-paste --copy` だけ。`keys` を空にすると、GUI でキーをすべて消したときと同じくそのカーブを指すリンクも外れる
  - `set <entity> Animation links …` はエラー（検証の無い2つ目の経路になるため）。hidden フィールド全般は弾かない（コンポーネントの `enabled` も hidden）
- `shot <out.png>` は shot 専用の RenderView で描いて PNG を CLI が書き出す。カメラは `--camera <entity>` / `--from x,y,z --to x,y,z`（一時カメラ）/ 省略でシーンカメラ。サイズは editor.json の `resolution/*`（最終出力の解像度。Screen パネルの大きさ・`resolutionScale` には依存しない）で、`--size <幅>x<高さ>` を渡すとその大きさで描く（shot のビューの `size` と step の event の `resolution` だけを変え、renderer の解像度・editor.json は変えない。displayOut のカメラの aspect は event の `resolution` に合うので、比率の違う大きさでも歪まない）。`--time T` は「時刻 T-1/60 → T の2ステップだけ進めて描いた状態」（前フレームを T の直前にしてモーションブラーの速度を合わせるため）で、T まで再生した状態ではない。`--frames N`（`--time` と一緒に指定）を渡すと「T の N コマ前から 1/60 秒ずつ進め、途中のコマも描いた状態」になる（時間方向に積むパスの履歴を溜めるため。最初のコマは前フレームの姿勢を作るだけで描かない。省略時は 1 で上の2ステップと同じ）。`--time` を渡すと実時間（`uTimeE` / `uTimeEF` と event の `timeElapsed`）も各ステップの時刻に揃え、`uDeltaTime` を 1/60 にする（ページを開いてからの時間で、同じ時刻でも撮るたびに絵が変わらないように）。省略時はタブの今の時刻で1ステップ。`--view` はパスのラベル（webgl は `camera/deferred_1`、webgpu は `gBuffer_1` のようなバックエンドごとの生の名前）で、一致しなければ候補が返る。実装は `packages/orengine/editor/lib/AgentBridge/ShotCommand`
- npm scripts には載せていない（外部プロジェクトから同じ形で呼べるように、直接実行を唯一の呼び方にしている）
- コマンド一覧は `npx tsx scripts/scene.ts help`
- dev サーバーの URL は `<OREngine>/tmp/dev-server.json` から読む。同じ OREngine チェックアウトで dev サーバーを2つ立てると後から起動した方で上書きされるので、その場合は `--url` で指定する
