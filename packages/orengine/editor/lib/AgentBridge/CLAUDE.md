# シーン CLI（AgentBridge）

### シーン CLI（AgentBridge）
開いているエディタタブ（最後にフォーカスされたもの）でシーンを観測・編集する CLI（`orengine-cli`。package.json の bin で、本体は `scripts/cli`）。応答は JSON。経路は CLI → dev サーバーの `POST /__agent/<command>`（`host/vite/plugins/AgentBridge`）→ HMR WebSocket → タブ（`packages/orengine/editor/lib/AgentBridge`）。外部プロジェクト（submodule 構成）からも `npx orengine-cli` で呼ぶ（外部プロジェクトの package.json に `"bin": { "orengine-cli": "orengine/scripts/cli/bin.js" }` を書く。npx は自分の package の bin を解決するのでインストールは要らない。`file:./orengine` の依存にすると OREngine の devDependencies まで入るので使わない）

```bash
npx orengine-cli status
npx orengine-cli tree --timeout 30000
npx orengine-cli status --project demo-webgpu                     # 立っている dev サーバーをプロジェクトで絞る（無ければそのプロジェクトで自分用を立てる）
npx orengine-cli dev                                              # 立っている dev サーバーの一覧。dev start / dev stop は自分用のもの
npx orengine-cli get root/Camera                                  # 既定は hidden のフィールドと uuid を外した path → 値。--all で詳しい形
npx orengine-cli get root/Camera Camera --field fov               # 値だけ
npx orengine-cli changes                                          # シーン CLI の最後の書き込みから、本人が画面で変えた値

npx orengine-cli add-entity root --name KeyLight                  # コンポーネントの無いエンティティを作り uuid を返す（--name 省略時は Empty）
npx orengine-cli add-component root/KeyLight Light                # 名前は components の name
npx orengine-cli set root/KeyLight position 3,3,3                 # エンティティのフィールド
npx orengine-cli set root/KeyLight Light intensity 2              # コンポーネントのフィールド
npx orengine-cli add-entity root --name Box
npx orengine-cli add-component root/Box MyBox
npx orengine-cli remove-component root/Box MyBox
npx orengine-cli reparent root/Box root/KeyLight                   # 親を付け替える（ワールド座標を保つ）。新しいパスを返す
npx orengine-cli remove-entity root/KeyLight/Box
npx orengine-cli undo

npx orengine-cli scenes                                           # シーン一覧（REST を直接読む。タブ・headless 不要）
npx orengine-cli scene-get main                                   # シーンファイルの中身
npx orengine-cli scene-create short1 --from main --open           # 作成（--from で複製）。--open で開く
npx orengine-cli scene-open main                                  # タブのシーンを切り替える
npx orengine-cli scene-delete short1
npx orengine-cli settings timeline                                # renderer / timeline / editor の設定と書ける path
npx orengine-cli set-setting timeline timeline/duration 300

npx orengine-cli key-insert root/Box position --time 0                         # キーを打つ（数値配列は全要素）。初めてなら Animation・カーブ・リンクも作る
npx orengine-cli key-insert root/Box position --time 2 --value 0,3,0           # 値を指定して打つ（set とキーの挿入を undo 1回に）
npx orengine-cli key-insert root/KeyLight Light intensity --time 1 --value 5  # コンポーネントのフィールド
npx orengine-cli key-delete root/Box position/1 --time 2                       # 要素1つ（position/1 = y）
npx orengine-cli curves                                                        # カーブの一覧と使っているフィールド
npx orengine-cli curve-get c2
npx orengine-cli curve-set c2 '{"keys":[{"time":0,"value":0,"interpolation":"BEZIER","handleType":"AUTO_CLAMPED"},{"time":1.5,"value":2,"interpolation":"LINEAR","handleType":"VECTOR"}]}'
npx orengine-cli curve-paste root/Box2 position/1 c2 --link                    # --copy で複製して貼り付け
npx orengine-cli curve-unlink root/Box2 position/1
npx orengine-cli curve-link-settings root/Box position/1 --scale 2 --offset 0.5 --name bounce

npx orengine-cli shot tmp/shot/a.png                              # シーンカメラ・今の時刻の見た目を PNG へ
npx orengine-cli shot tmp/shot/b.png --from 0,3,5 --to 0,0,0 --time 2 --view gBuffer_1   # 一時カメラ・時刻2秒・パス出力（webgpu のラベル）
npx orengine-cli shot tmp/shot/c.png --time 1 --frames 60 --size 960x540   # 0 秒から 60 コマ進めた 1 秒の状態を 960x540 で
npx orengine-cli shot tmp/shot/d.png --frame 58                   # フレーム番号で（fps によらず 秒 × 60。58 = 0.9667 秒）
npx orengine-cli views                                            # --view に渡せるパスのラベルの一覧
npx orengine-cli frames tmp/seq --start 0 --end 120 --step 2      # 連続したコマ（frame-<番号>.png と番号入りの sheet.png）と、急に変わった箇所（jumps）
npx orengine-cli img diff a.png b.png --out tmp/diff.png          # 手元の PNG の差（dev サーバーを使わない。crop / pixel / stats / sheet も）

npx orengine-cli batch <<'EOF'                                    # 1行1コマンド。途中で失敗したら全部取り消し、成功したら undo 1回・保存1回
add-entity root --name Box
add-component root/Box MyBox
set root/Box MyBox size 2
EOF
```

- 観測: `status` / `tree` / `get <entity>` / `components` / `errors` / `settings` / `changes` / `shot` / `frames` / `views` / `curves` / `curve-get`。手元の PNG: `img`。書き込み: `add-entity` / `remove-entity` / `reparent` / `add-component` / `remove-component` / `set` / `set-setting` / `undo` / `redo` / `scene-create` / `scene-delete` / `scene-open` / `key-insert` / `key-delete` / `curve-set` / `curve-paste` / `curve-unlink` / `curve-link-settings`
- シーン管理: `scenes` / `scene-get` はファイルを読むだけなので CLI が dev サーバーの REST（`host/server/routes/scene.ts`）を直接叩き、タブも headless も使わない。`scene-create` / `scene-delete` / `scene-open` はタブ経由で、EditorPage の createScene / deleteScene / openScene（Scene パネルと同じ窓口 `SceneSelection`）を `attachAgentBridge` の `getScenes` から呼ぶので、Scene パネルの一覧・表示と食い違わない。作成・削除はその場でファイルに反映され、undo 履歴には載らない。未保存の変更があるタブへの `scene-open`（`scene-create --open`）と、開いているシーンの `scene-delete` はエラー。`--from` の複製は uuid を振り直さない（シーンは1つずつ読み込まれ、uuid で他シーンを引く仕組みが無いため）
- **`status`** は1回で今の状態を返す: 接続先（`server`・立っている全部の `servers`）・`connection`・`scene`・`unsaved`・`selection`（アクティブと選択中の名前パス）・`time`（`frame` と `seconds`、尺、`fps`）・`code`（`upToDate` = dev サーバーが送ったコードの更新・リロードをタブが反映し終えているか。CLI が dev サーバーの `GET /__agent` から足す）・`userChanges`（下の `changes` の件数）。タブを待っても準備が終わらなければ、失敗にせず `problem` に理由を入れて返す
  - **フレームは timeline/fps によらず 秒 × 60 で数える**（`Engine` の `frame.current = time.code * 60`。`timeline/duration` も同じ数え方）。`fps` はキーを揃えるコマと再生の刻みだけに効く
- **出力を絞る**: `get` / `settings` / `components` の既定の出力は、hidden のフィールドと uuid を外した短い形（`get` の `fields` は path → 値、`components` は path → `{ default, format?, options? }`）。`--all` で書式・選択肢・hidden・uuid も出す（entity 参照のフィールドへ `set` するときの uuid はここで見る）。`--field <path>` はその値だけを返す（`get <entity> [<component>] --field <path>` / `settings <名前> --field <path>`）。`get <entity> <component>` はそのコンポーネントだけ、`components <Name>` はそのコンポーネントだけ。`initiator` は user 以外のときだけ出す（script 由来は編集できないため）
- **`changes`**（`ChangeTracker`）: シーン CLI が最後に書き込んでから、本人が画面で変えた値（エンティティ・コンポーネント・フィールド・前後の値。エンティティ・コンポーネントごと増えた / 消えたものも）を返し、基準を今にする（`--keep` で残す）。本人が手で詰めた値を、Claude が次の作業の前に知るため
  - 基準は dev サーバーがシーンごとにメモリに持つ（`GET / POST /__agent-baseline/<scene>`。タブがリロードしても、書き込んだのが別のタブでも同じものを見る。dev サーバーを閉じると消え、その後はシーンファイル＝最後の保存を基準にする）
  - 比べるのは保存形式（`editor.exportEngine()`）を uuid のキーで平らにしたもの（`flattenScene`）。名前が変わっても同じものとして比べる
  - シーン CLI の書き込み（`scene-*` 以外。`batch` も）は、その前後で変わった値だけを基準に足す（`trackWrite`）。書き込みは本人の未保存の変更も一緒に保存するが、基準ごと今にすると本人の変更が見えなくなるため
  - `shot` の応答にも `userChanges` を入れ、1件以上なら CLI が stderr で知らせる（撮った絵が急に変わったとき、本人が値を動かしたせいかを見分けるため）
  - キーフレーム（Blender のものも）で動いているフィールドは比べない（`KeyFrameCommands` の `animatedFieldKeys`）。再生時刻で Animation が値を書き換えるので、撮るたびに「変わった」と出てしまうため
- 設定: `settings [renderer|timeline|editor]`（editor は `resolution/*` が editor.json、それ以外が editor.local.json に保存される。ルートの CLAUDE.md の「エディタの設定ファイル」） / `set-setting <renderer|timeline|editor> <path> <value>`。対象は `engine.renderer`（シーンの `renderer`）/ `engine` の `timeline/*` / `editor`（editor.json の `resolution/*` / `viewports/<id>/resolutionScale`（Screen パネルごとの解像度スケール。エディタカメラで見ている間はパネルの画素数（CSS の大きさ × devicePixelRatio）に、カメラビュー（シーンカメラ・Camera Render）では `resolution/*` のアスペクト比のままパネルの画素数に収めた大きさ（`resolution/*` が上限）に掛かる）/ `frameLoop/*` のみ。選択・カメラ等の UI 状態は触らせない）。書き込みは `set` と同じく `editor.api.setField( …, { merge: false } )` で undo 1回ぶん。出力の `file` が保存先。実装は `packages/orengine/editor/lib/AgentBridge/SceneCommands` / `SettingCommands`
- `<entity>` は uuid か `root/...` の名前パス。存在しないエンティティ・コンポーネント名・フィールド path はエラーになり、候補が返る
- 書き込みはすべて `EditorAPI` を通るので、GUI の Ctrl+Z / `undo` で戻せる（undo 履歴は GUI と共有）
- **書き込み系コマンドは接続先（本人のタブ / headless / 自分用）によらず、そのたびに `editor.save()` でファイルへ保存する**。タブのままだと Ctrl+S せずに閉じたとき黙って消えるため。タブに CLI 以前の未保存の変更があれば一緒に保存される。応答は保存の POST が終わってから返る（完了は `EditorPage` の `onSave` が返す Promise で待つ）。保存に失敗したらエラーを返す
  - 保存し終えたタブは HMR 経路で `orengine:agent:saved` を送り、dev サーバーは**それ以外のエディタタブ（ユーザーのタブ・headless とも）へ `full-reload` を送る**。API 経由の保存は `ProjectWatchReload` のリロードを `recentWrites` でタブを区別せず抑制するので、保存元以外への通知は AgentBridge が個別に行う。リロードされるタブに未保存の変更があれば、ブラウザの離脱の確認が出る（外部からファイルを編集したときと同じ。ルートの CLAUDE.md の「未保存の確認」の節）
- **接続先の dev サーバー**（`scripts/cli/servers.ts`）: dev サーバーは起動時に登録簿 `<OREngine>/tmp/dev-servers/<port>.json`（`host/devServerRegistry`。プロジェクト・レンダラー・pid・持ち主 `user` / `cli`）に自分を書き、閉じるときに消す。CLI は全部を読み、pid が居ないものは消して stderr で知らせ、残りに `GET /__agent`（タブの一覧と状態）を聞いて選ぶ
  - 選び方: 本人のタブがある本人の dev サーバーのうち、タブが最後にフォーカスされたもの（本人が今見ているもの）> 本人の dev サーバーの新しいもの > 自分用の dev サーバーの新しいもの。`--project <ディレクトリか名前>` で絞れる。`--url` / `ORENGINE_DEV_URL` で直接指定でき、繋がらなければエラー
  - どれに繋いだかを毎回 stderr の1行（`[orengine-cli] 接続先: <url>（<project> / <renderer> / 本人の dev サーバー|自分用の dev サーバー） ほかに立っている dev サーバー: …`）で出す。`status` の `server` / `servers` にも出る
  - 1台も無ければ（`--project` で絞って無いときも）**自分用の dev サーバー**（`scripts/cli/ownServer.ts`）を CLI から切り離して立てる。ポートは 3400 / 3401 から空きを探す（本人の 3000 番台・BLidge の 3100・scene-shots の 3300 / 3310 から離す）。vite の依存の事前バンドルは `node_modules/.vite-cli/<project>-<renderer>` に分ける。プロジェクトは `--project` > 本人が最後に dev サーバーを立てたプロジェクト（登録簿の `projects.json`）> `ORENGINE_PROJECT` > demo-webgl、レンダラーは `--renderer` > 本人がそのプロジェクトで最後に使ったもの > `ORENGINE_RENDERER` > webgl。headless Chromium でエディタを `?agent-headless=keep` で開いたままにする（undo 履歴がコマンドをまたいで残る。`connection` は `"own"`）。10 分コマンドを受けなければブラウザごと閉じる。`orengine-cli dev stop` で今すぐ閉じる（本人の dev サーバーは止めない）。起動の出力は `tmp/dev-servers/own-<時刻>.log` で、起動に失敗したら CLI が末尾を見せる
- **タブの準備を待ってから送る**（`host/vite/plugins/AgentBridge` の `waitForTab`）: dev サーバーは、選んだタブが次を終えるまでコマンドを送らない（上限は `waitMs`、既定 60 秒。`status` は 15 秒）。CLI に `sleep` を挟ませないため
  - リロード: vite・`ProjectWatchReload`・保存後の他タブへの通知が送る `full-reload` を数え（`server.ws.send` を包む）、タブが切れて再接続（`hello`）するまで待つ。タブの ID は sessionStorage に置くのでリロードしても同じタブとして戻ってくる（切れてから 30 秒、リロードを送っていなければ 3 秒は待つ）
  - リロードを送って 8 秒たっても切れないタブ（未保存の確認で「とどまる」が選ばれたなど）は `stale` にして、理由付きのエラー（HTTP 409）を返す。古いコード・古いシーンのまま撮らせないため。次にタブが読み込み直されると戻る
  - HMR の `update`: 送った数を数え、タブの `vite:afterUpdate` の通知（`orengine:agent:updated`）と突き合わせる
  - シーンの読み込み: タブはエンジンの `loaded` の後、`MXP.waitRenderReady()`（BLidge のエンティティなど、読み込み後に非同期で作られるものを `MXP.addRenderWait` で登録したもの）を待ってから `orengine:agent:ready` を送る。headless はさらに描画を2フレーム待つ（シェーダーのエラーを errors に出すため）。本人のタブは背景だと rAF が止まるのでフレームは待たない
  - 実行中にタブが切れたら、応答は `interrupted: true` のエラー（HTTP 502）。タブも、実行中に `vite:beforeUpdate` / `vite:beforeFullReload` を受けた読み取り系のコマンドは結果を捨てて `interrupted` を返す（古いコードと新しいコードの混ざった shot を返さないため）。CLI は読み取り系なら3回までやり直し、書き込み系は「反映されたかは分からない」エラーにする
  - AgentBridge 自体のモジュールが HMR で読み直されたら、ページごとリロードする（古いモジュールの受付が残って同じ tabId で2つが名乗るため。vite 8 の `hot.decline()` は何もしないので `hot.data` で見分ける）
- **本人の dev サーバーにタブが1つも無ければ、headless Chromium で1コマンドだけ開いて代わりに接続する**（`scripts/headlessEditor.ts`）。Playwright で `--enable-unsafe-webgpu --use-angle=metal` を付けて起動し（無いと WebGPU の canvas が真っ黒になる。#80 の実測）、同じエディタ URL に `?agent-headless` を付けて開く。ローカルの Mac 専用（GPU の無い Linux CI では動かない）。Chromium が無ければ `npx playwright install chromium`
  - 1コマンドごとにブラウザを閉じる。保存は応答の前に済んでいるので、CLI は応答を受けたらすぐ閉じる。`scene-open` で editor.local.json の `scene` が切り替わるので、次のコマンドの headless は切り替え先のシーンを開く。undo 履歴はコマンドごとに消えるので、`undo` / `redo` は意味を持たない（複数の書き込みを1回で戻したいなら `batch`）
  - `status` の `connection` が `"headless"` になる（本人のタブなら `"tab"`、自分用の dev サーバーのページなら `"own"`）
  - ウィンドウサイズは 1920x1080・deviceScaleFactor 1 に固定している。1920x1080 は一般的なデスクトップの画面サイズで、editor.json のパネル配置がそのまま収まる。`shot`（#83）の出力サイズは `resolution/*`（`--size` を渡せばその大きさ）で決まり、ウィンドウサイズには依存しない
- **シーンのデータを壊さない**
  - `scene-create` / `scene-delete` / `scene-open` は、シーンファイルを保存し直さない（その場でファイルに反映済み。開いたシーンを保存し直すと、読み込んだ時点の定義で書き直されて関係ない差分が出るため）。開いたシーンの名前は `EditorPage` の `openScene` が `POST /api/projects/<name>/editor/scene` で editor.local.json の `scene` だけに書く。作成・削除のあとは他のタブをリロードさせる（シーン一覧が古くなるので）
  - **定義に無いフィールドの値**: シーンファイルにあるが、今のコンポーネントの定義に無いフィールドの値（消した・名前を変えたフィールドの残り、読み込み後に足されるフィールド）は、読み込み時に `core/ProjectSerializer` が覚え（`rememberUnknownFields`）、保存で書き戻す（dev サーバーでだけ。production では消えるので player に入らない）。保存のたびに黙って落とさないため。一覧は `unknown-fields`（`errors` の `unknownFields` にも出る）、消すのは `drop-unknown-fields`（開いているシーンの分をすべて消して保存する。undo では戻らない）。フィールドを消したら、使っているシーンを開いて `unknown-fields` で確かめ、`drop-unknown-fields` で消す
  - コンポーネントの既定値を変えても、置き済みのシーンの値は変わらない（シーンは置いた時点の値を持つ。既定値のままかを覚える仕組みは作らない）。変えたいシーンには `set` で入れる
- **`batch`**（タブ側は `BatchCommand`）: 1行1コマンド（先頭の `orengine-cli` は省ける。`#` の行と空行は飛ばす。引用符はシェルと同じく空白を区切らない）をファイルか標準入力から読み、タブで順に実行する。実行の前に全部の名前を確かめ、途中で失敗したら undo 履歴の深さ（`CommandManager.depth`）まで undo で戻してから何番目で失敗したかを返す（ファイルは書かない）。成功したら `CommandManager.collapseSince` で undo 1回ぶんにまとめ、保存は最後に1回。undo で取り消せないもの（`scene-create` / `scene-delete` / `scene-open`）と `undo` / `redo` / `batch` は入れられない。`shot` は入れられ、PNG は行ごとの出力先へ書く
- エディタ URL に `?agent-scene=<name>` を付けると、editor.local.json の `scene` の代わりにそのシーンを開く（`EditorPage` の起動時。名前は `AgentBridge/Protocol` の `AGENT_SCENE_PARAM`）。起動時に開くシーンは「最後に開いたシーン」として書かないので、editor.local.json は書き換わらない（`scene-open`・Scene パネルでの切り替えは書く）。一覧に無いシーン名なら何も開かず console.error を出す（別のシーンを開くと、呼び出し側が取り違えるため）。scene-shots がシーンを順に開き直すのに使う（`scripts/headlessEditor.ts` の `headlessEditorUrl`）
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
- `shot <out.png>` は shot 専用の RenderView で描いて PNG を CLI が書き出す。カメラは `--camera <entity>` / `--from x,y,z --to x,y,z`（一時カメラ）/ 省略でシーンカメラ。サイズは editor.json の `resolution/*`（最終出力の解像度。Screen パネルの大きさ・`resolutionScale` には依存しない）で、`--size <幅>x<高さ>` を渡すとその大きさで描く（shot のビューの `size` と step の event の `resolution` だけを変え、renderer の解像度・editor.json は変えない。displayOut のカメラの aspect は event の `resolution` に合うので、比率の違う大きさでも歪まない）。`--time T` は「時刻 T-1/60 → T の2ステップだけ進めて描いた状態」（前フレームを T の直前にしてモーションブラーの速度を合わせるため）で、T まで再生した状態ではない。`--frames N`（`--time` と一緒に指定）を渡すと「T の N コマ前から 1/60 秒ずつ進め、途中のコマも描いた状態」になる（時間方向に積むパスの履歴を溜めるため。最初のコマは前フレームの姿勢を作るだけで描かない。省略時は 1 で上の2ステップと同じ）。`--frame N` は `--time N/60` と同じ（フレームは 秒 × 60）。`--time` / `--frame` を渡すと実時間（`uTimeE` / `uTimeEF` と event の `timeElapsed`）も各ステップの時刻に揃え、`uDeltaTime` を 1/60 にする（ページを開いてからの時間で、同じ時刻でも撮るたびに絵が変わらないように）。省略時はタブの今の時刻で1ステップ。`--view` はパスのラベル（webgl は `camera/deferred_1`、webgpu は `gBuffer_1` のようなバックエンドごとの生の名前）で、一致しなければ候補が返る。一覧は `views`（今の時刻でシーンカメラのビューを1回描き、その間に出たラベルを集める。名前の無いパスは番号）。
  - コマを進める前と描く前に `MXP.waitRenderReady()` を待つ。コンポーネントが読み込みに時間のかかるもの（外部のメッシュ・画像など）を `MXP.addRenderWait( promise )` で登録していれば、読み込み終えてから撮る（進めてから現れたものは、進めた分の更新を受けていないため）
  - CLI は書き出した PNG の明るさの幅を見て、一色（真っ黒など）なら stderr で知らせ、出力に `flat: true` を入れる（真っ黒の PNG を成功と思い込まないため）
- **`frames <dir> --start <フレーム> --end <フレーム> [--step <コマ>]`**（タブ側は `ShotCommand` の `frames`）: start の1コマ前の姿勢を作ってから、start〜end を 1/60 秒ずつ進めて全部描き（時間方向に積むパスも再生と同じになる）、step コマおきに読み戻して PNG を返す。カメラ・`--size`・`--view` は `shot` と同じで、`--size` の省略時は `resolution/*` の比率のまま幅 480。上限 600 コマ。間に `MXP.waitRenderReady()` を await するので、その間はタブの毎フレームの更新（`engine.update`）を `Editor.holdUpdate()` で止める（タブの時刻で姿勢を上書きされないように）
  - CLI（`scripts/cli/imageCommands.ts`）が `<dir>/frame-<番号4桁>.png` と、左上に番号を書いて並べた `sheet.png`（`--cols` で列数）を書き、隣り合うコマの差（RGB の差の絶対値の平均、0〜255）を出す。`typicalDiff` は差の中央値、`jumps` は差が 1 より大きく中央値の 3 倍より大きいもの（ちらつき・ループの継ぎ目・急な切り替わり）、`largest` は差の大きい5つ、`flat` は一色のコマ。ループの継ぎ目は `--start <尺-2> --end <尺+1>` のように尺をまたいで撮る
- **`img`**（`scripts/cli/image.ts` / `imageCommands.ts`。dev サーバーを使わない）: PNG の読み書きを Node の zlib だけで行い、PIL・ImageMagick・`timeout` が無い端末でも動く（8bit / 16bit・インターレース無しの PNG を読める）
  - `img diff <a> <b> [--out <差の画像>]`: 平均・最大・差のある画素（RGB のどれかが 8 より大きい）の割合と範囲。差の画像は元の絵を暗くして差を赤で重ねる
  - `img crop <in> <x> <y> <幅> <高さ> <out>` / `img pixel <in> <x> <y>`（0〜255 と 0〜1）/ `img stats <in>...`（平均の色・明るさの幅・一色か）/ `img sheet <out> <in>... [--cols <列>]`（同じ大きさの絵を番号付きで並べる）
実装は `packages/orengine/editor/lib/AgentBridge/ShotCommand`
- 呼び方は bin の `orengine-cli` だけ（`scripts/cli/bin.js` が tsx を読み込んで `scripts/cli/index.ts` を実行する）。npm scripts には載せない（外部プロジェクトから同じ形で呼べるように）
- コマンド一覧は `npx orengine-cli help`（一覧の正は `scripts/cli/commands.ts`）
