# トラブルシューティング

パスとコマンドの書き方は SKILL.md の「最初に」を参照（外部プロジェクトでは `npx tsx orengine/scripts/scene.ts`）。

## まず見るもの

| 知りたいこと | コマンド |
|---|---|
| つながっているか・保存されていない変更があるか | `status` |
| エラー | `errors`（`shader` = GLSL のコンパイルエラー、`gpu` = WebGPU / WGSL のエラー、`console` = コンソールのエラーと未捕捉例外、`unresolvedComponents` = 読み込めなかったコンポーネント） |
| 位置・向き・大きさ | `tree` / `get <entity>` |
| 見た目 | `shot tmp/shot/<名前>.png` |

## シーン CLI のエラー

| メッセージ | 原因と対処 |
|---|---|
| `dev サーバーが起動していません` / `dev サーバーに接続できません` | ユーザーに dev サーバーの起動を頼む（`npm run dev` を勝手に起動しない）。起動後に `status` で確かめる |
| `エディタのタブが無いので headless Chromium で開こうとしましたが、失敗しました` | Playwright の Chromium が無い（ユーザーに `npx playwright install chromium` を頼む）。GPU の無い環境（Linux CI 等）では headless は使えないので、ユーザーにエディタを開いてもらう |
| `headless Chromium で開いたエディタが …ms 以内にタブとして登録されませんでした` | エディタが読み込めていない（ビルドエラー等）。ユーザーにエディタを開いてもらい、エラーを見てもらう |
| `保存に失敗しました` / `保存が …ms 以内に終わりませんでした` | headless での保存が失敗した。`git diff <projectDir>/scenes/` で反映されたか確かめる |
| `エディタのタブが …ms 以内に応答しませんでした` | タブが固まっているかリロード中。少し待って再実行するか `--timeout` を延ばす |
| `不明なコマンドです` | タブや dev サーバーが古い。タブのリロード、だめなら dev サーバーの再起動をユーザーに頼む |
| `エンティティが見つかりません` / `名前パスが N 件に一致しました` | `tree` で名前パス・uuid を確かめる。同名の兄弟がいるときは uuid で指定する |
| `登録されていないコンポーネントです` | `candidates` か `components` の name から選ぶ。作ったばかりなら下の「コンポーネントが一覧に出ない」 |
| `書き換えられるフィールドではありません` | `candidates` か `get` の `fields[].path` から選ぶ。コンポーネントのフィールドは `set <entity> <component> <path> <value>` |
| `スクリプト（BLidge / glb 等）が生成したエンティティなので…` / `initiator が … のコンポーネントなので…` | シーン JSON に載らないものは GUI と同じく編集できない。BLidge のエンティティにはコンポーネントを付けることだけできる |

## CLI で入れた変更が消えた

ユーザーのタブ（`status` の `connection: "tab"`）では CLI は保存しない。保存（Ctrl+S）の前に full-reload（`scenes/<name>.json` / `editor.json` の書き換え、コンポーネントファイルの追加・編集）が走ると消える。やり直してからユーザーに Ctrl+S を頼む。

## コンポーネントが一覧に出ない

`components` に名前が出ない、`add-component` が `登録されていないコンポーネントです` になる。

1. 置き場所が `<projectDir>/Resources/Components/<グループ>/<名前>/index.ts` か、途中に `_` で始まるディレクトリが無いか
2. `export class` しているか。登録名はクラス名（大文字小文字も一致させる）
3. import の失敗（シェーダーファイルのパス違い・`.wgsl` の include 先が無い等）で読み込めていない。`npm run typecheck` と `errors` を見る
4. 作ったばかりなら、タブのリロードが終わってから再確認する

## `set` が効かない・JSON の `props` が反映されない

`field()` で登録していない path は CLI ではエラー、シーン JSON では無視される。`get <entity>` の `fields[].path` か、コンポーネントの `index.ts` の `this.field(...)` / `this.fieldDir(...)` で登録を確かめる。`Mesh` の geometry、`Light` の色・種類など public プロパティでも field に無いものは CLI・JSON では変えられない（コードで変える）。

## 何も描かれない

- `tree` の `bounds` があるか・`visible` か・カメラの視野に入っているか（`shot --from --to` で外から撮る）
- エンティティに `Mesh` があるか（`get` の components）。BLidge の Mesh に差し込む形は、Mesh の無いエンティティでは何も描かない
- `errors` の `shader` / `gpu` にコンパイルエラーが無いか
- WebGPU: `phase` に入れたパスの entry point（`fsDeferred` / `fsForward`）が WGSL にあるか（`shader-wgsl.md`）
- 見た目だけ確かめたいなら、シェーダーを外して既定のマテリアルで描けるか試す

## 型エラー

- import は `maxpower`（WebGL）/ `maxpower/webgpu`（WebGPU）/ `mathpower` / `orengine` のエイリアスで書く。WebGPU のプロジェクトで `maxpower` を import していないか
- コンストラクタの引数型は `MXP.ComponentParams`
- 既存のコンポーネント（demo / プロジェクト内）の書き方と見比べる

## JSON が壊れた

`scenes/<name>.json` / `editor.json` / `.tex` の構文が壊れると読み込めなくなる。`python3 -m json.tool <file>` で確かめ、`git diff` で差分を見る。戻すときはユーザーに確認してから。

## 同じ修正を3回試して直らないとき

- シーンの設定（`get`）とコンポーネントの実装のどちらが原因か切り分ける。field の登録を先に確かめる
- 操作対象を取り違えていないか `tree` / `components` で見直す
- 手本（`demo-webgl` / `demo-webgpu` の `Resources/Components/`）の書き方と比べる
