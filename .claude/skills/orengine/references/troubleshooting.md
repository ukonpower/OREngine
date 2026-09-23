# トラブルシューティング

## サーバーログの確認方法

`npm run dev` は express（ファイルI/O API）と vite devサーバーを同一プロセスで起動する。ターミナル出力を直接確認するか、バックグラウンド起動している場合はそのログファイル（起動コマンドで指定したリダイレクト先）を `Read` で確認する。

## サーバー未起動

**症状**: シーン CLI が `[scene] dev サーバーが起動していません` / `[scene] dev サーバーに接続できません` で止まる。ブラウザで開発ページが表示されない。

**対処**:
1. `npm run dev` で開発サーバーを起動（ユーザーの明示的な指示がある場合のみ。CLAUDE.md 参照）。指示が無ければユーザーに起動を依頼する
2. 起動完了まで待つ（通常数秒）
3. `npx tsx scripts/scene.ts status` で疎通確認

## シーン CLI のエラー

| メッセージ | 原因と対処 |
|---|---|
| `エディタのタブが接続されていません` | dev サーバーは動いているがエディタページが開かれていない。ユーザーに開いてもらう |
| `エディタのタブが …ms 以内に応答しませんでした` | タブが固まっている・リロード中。少し待って再実行するか `--timeout` を延ばす |
| `不明なコマンドです`（タブ側から返る） | 書き込みコマンドを知らない古いページ / dev サーバー。タブのリロード、それでもだめなら dev サーバーの再起動 |
| `エンティティが見つかりません` / `名前パスが N 件に一致しました` | `tree` で名前パス・uuid を確認する。同名の兄弟がいるときは uuid で指定する |
| `登録されていないコンポーネントです` | `candidates`（または `components`）の name から選ぶ。作ったばかりのコンポーネントが出ないなら下の「コンポーネント名が見つからない」 |
| `書き換えられるフィールドではありません` | `candidates`（または `get` の `fields[].path`）から選ぶ。コンポーネントのフィールドは `set <entity> <component> <path> <value>` |
| `スクリプト（BLidge / glb 等）が生成したエンティティなので…` / `initiator が … のコンポーネントなので…` | シーン JSON に載らないものは GUI と同じく編集できない |

**CLI で入れた変更が消えた**: CLI の書き込みは保存されない。保存（Ctrl+S）の前に full-reload（`scenes/<name>.json` / `editor.json` の書き換え、コンポーネントファイルの追加・編集）が走ると消える。`status` の `unsaved` で未保存の変更の有無を確認できる。やり直してからユーザーに Ctrl+S を依頼する。

## scenes/<name>.json / editor.json を編集しても反映されない

人間が JSON を直接編集したときの話（Claude はシーン CLI を使う）。

**症状**: ファイルを保存したのにブラウザ側の表示が変わらない。

**原因候補**:
1. devサーバーが起動していない、または対象プロジェクトを開いていない
2. `host/vite/plugins/ProjectWatchReload/index.ts` の watch 対象は `<projectDir>/scenes/` 配下の `.json` と `<projectDir>/editor.json` のみ。パスが対象プロジェクトのものと一致しているか確認
3. 直近の API 書き込み（`recentWrites`）と判定されて抑制されている場合があるが、これは同一プロセス内のエディタ自身の保存（Ctrl+S）にのみ適用される。ファイル編集ツールでの書き込みは対象外なので通常は full-reload される

**対処**: vite のログに `full-reload` 相当の出力が出ているか確認する。出ていなければサーバーの再起動（`npm run dev` を再実行）を検討する。

## JSON構文エラー

**症状**: scenes/<name>.json / editor.json / `.tex` を編集後、シーンが一切読み込まれなくなった。

**原因**: JSON構文が壊れている（末尾カンマ、閉じ括弧不足等）。

**対処**: `python3 -m json.tool <file>` で構文チェックしてから保存する。壊れた場合は `git diff` で差分確認 → `git checkout -- <file>` で復元。

## コンポーネント名が見つからない / 反映されない

**症状**: `add-component` が `登録されていないコンポーネントです` になる。scenes/<name>.json に `components` を追加したのにシーンに反映されない。

**対処**:
1. `npx tsx scripts/scene.ts components` で登録名を確認する。ソースからは `export class` 名で実在確認: `grep -r "export class" packages/orengine/builtin/Components/`（ビルトイン）/ `grep -r "export class" <projectDir>/Resources/Components/`（プロジェクト固有）
2. コンポーネント名の大文字小文字を確認（例: `"Mesh"` であって `"mesh"` ではない）
3. `references/components-catalog.md` で正式名称を確認
4. カスタムコンポーネント追加直後なら、Vite のリロード完了を待ってから再確認する

JSON を直接編集した場合、未知のコンポーネント名は **エラーにならず** `ProjectSerializer.deserializeEntity` が `unresolvedComponents` として保持するだけで描画されない（`[ProjectSerializer] Component "..." not found in resolver` の warning がブラウザコンソールに出る）。

## props（field）が反映されない

**症状**: `set` が `書き換えられるフィールドではありません` になる。scenes/<name>.json のコンポーネント `props` に値を書いたのに実際の値が変わらない。

**原因**: CLI は登録されていない path をエラーにする。JSON の直接編集では `Serializable.deserialize()` が `fields_` Map に存在しない path を silent skip する。

**対処**:
1. `npx tsx scripts/scene.ts get <entity>` の `fields[].path` で実在する path を確認する。ソースからは対象コンポーネントの `index.ts` を Read し、`this.field(...)` / `this.fieldDir(...)` で実際に登録されているパスを確認する
2. `Mesh.geometry` / `Camera.displayOut` / `Light.color` 等、public プロパティであっても `field()` 未登録なら **`set` でも props でも設定不可**（コンポーネント実装を変更するしかない）

## TypeScriptの型エラー（コンポーネント開発時）

**症状**: `npm run typecheck` でエラー

**対処**:
1. importパスが正しいか確認（`glpower`, `maxpower`, `orengine` のエイリアスを使用）
2. `ComponentParams` 型を使用しているか確認
3. 登録は `import.meta.glob` による自動検出のため、手動の登録作業は不要

## Viteプラグインエラー（transformエラー）

**症状**: カスタムコンポーネントが登録されない。シーンに配置済みでも描画されない。

**原因**: シェーダーファイル（`.vs`/`.fs`/`.glsl`）のimport/transformが失敗し、コンポーネントのimportチェーンが壊れている。importが壊れたコンポーネントはエンジンに登録されず、デシリアライズ時にスキップされる。

**対処**:
1. `npm run typecheck` でTypeScript側のエラーがないか確認
2. `npx tsx scripts/scene.ts errors` でブラウザ側のエラー（`console` / `unresolvedComponents`）を確認する

## 見た目の確認・ブラウザ側のランタイムエラー確認

- ランタイムのエラーは `npx tsx scripts/scene.ts errors`（シェーダーエラー・WebGPU のエラー・`console.error` と未捕捉例外の直近200件・解決できなかったコンポーネント）
- 位置・向きは `npx tsx scripts/scene.ts tree` / `get`
- 見た目は `npx tsx scripts/scene.ts shot tmp/shot/<名前>.png`（`--camera` / `--from --to` / `--time` / `--view`。使い方は SKILL.md の Flow 4）

## Stop Conditions

以下の状況では、現在のアプローチを見直す:

- **同じ修正を3回連続で試して改善しない**: シーンの設定（`get` で確認）/ コンポーネント実装のどちらが原因か切り分ける（コンポーネント単体の field 登録を先に確認）
- **コンポーネント名 / UUID が見つからない**: `components` / `tree` で再確認。別のエンティティ/コンポーネントを操作対象にしていないか確認
- **TypeScript型エラーが解消しない**: 既存コンポーネントのコードを参照して正しいパターンを確認
