# トラブルシューティング

## サーバーログの確認方法

`npm run dev` は express（ファイルI/O API）と vite devサーバーを同一プロセスで起動する。ターミナル出力を直接確認するか、バックグラウンド起動している場合はそのログファイル（起動コマンドで指定したリダイレクト先）を `Read` で確認する。

## サーバー未起動

**症状**: `curl: (7) Failed to connect to localhost port 3001` や、ブラウザで開発ページが表示されない。

**対処**:
1. `npm run dev` で開発サーバーを起動（ユーザーの明示的な指示がある場合のみ。CLAUDE.md 参照）
2. 起動完了まで待つ（通常数秒）
3. `curl -sf http://localhost:3001/api/projects` で疎通確認（このエンドポイントはファイルI/O層として現存する）

## scene.json / editor.json を編集しても反映されない

**症状**: ファイルを保存したのにブラウザ側の表示が変わらない。

**原因候補**:
1. devサーバーが起動していない、または対象プロジェクトを開いていない
2. `host/vite/plugins/ProjectWatchReload/index.ts` の watch 対象は `<projectDir>/scene.json` と `<projectDir>/editor.json` のみ。パスが対象プロジェクトのものと一致しているか確認
3. 直近の API 書き込み（`recentWrites`）と判定されて抑制されている場合があるが、これは同一プロセス内のエディタ自身の保存（Ctrl+S）にのみ適用される。ファイル編集ツールでの書き込みは対象外なので通常は full-reload される

**対処**: vite のログに `full-reload` 相当の出力が出ているか確認する。出ていなければサーバーの再起動（`npm run dev` を再実行）を検討する。

## JSON構文エラー

**症状**: scene.json / editor.json / `.tex` を編集後、シーンが一切読み込まれなくなった。

**原因**: JSON構文が壊れている（末尾カンマ、閉じ括弧不足等）。

**対処**: `python3 -m json.tool <file>` で構文チェックしてから保存する。壊れた場合は `git diff` で差分確認 → `git checkout -- <file>` で復元。

## コンポーネント名が見つからない / 反映されない

**症状**: scene.json に `components` を追加したのにシーンに反映されない。

**対処**:
1. `export class` 名で実在確認: `grep -r "export class" packages/orengine/builtin/Components/`（ビルトイン）/ `grep -r "export class" <projectDir>/Resources/Components/`（プロジェクト固有）
2. コンポーネント名の大文字小文字を確認（例: `"Mesh"` であって `"mesh"` ではない）
3. `references/components-catalog.md` で正式名称を確認
4. カスタムコンポーネント追加直後なら、Vite のリロード完了を待ってから再確認する

未知のコンポーネント名は **エラーにならず** `ProjectSerializer.deserializeEntity` が `unresolvedComponents` として保持するだけで描画されない（`[ProjectSerializer] Component "..." not found in resolver` の warning がブラウザコンソールに出る）。

## props（field）が反映されない

**症状**: scene.json のコンポーネント `props` に値を書いたのに実際の値が変わらない。

**原因**: `Serializable.deserialize()` は `fields_` Map に存在しない path を silent skip する。

**対処**:
1. 対象コンポーネントの `index.ts` を Read し、`this.field(...)` / `this.fieldDir(...)` で実際に登録されているパスを確認する
2. `Mesh.geometry` / `Camera.displayOut` / `Light.color` 等、public プロパティであっても `field()` 未登録なら **props 経由では設定不可**（コンポーネント実装を変更するしかない）

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
2. agent-browser スキルでエディタページを開き、ブラウザコンソール（devtools）のエラーを確認する

## 見た目の確認・ブラウザ側のランタイムエラー確認

専用の観測 API（screenshot / console-errors 等）は存在しない。agent-browser スキルでエディタページ（`http://localhost:<vite-port>`）を開き、スクリーンショットとブラウザコンソールログで直接確認する。

## Stop Conditions

以下の状況では、現在のアプローチを見直す:

- **同じ修正を3回連続で試して改善しない**: scene.json / コンポーネント実装のどちらが原因か切り分ける（コンポーネント単体の field 登録を先に確認）
- **コンポーネント名 / UUID が見つからない**: 自動生成ファイルとシーン木構造を再確認。別のエンティティ/コンポーネントを操作対象にしていないか確認
- **TypeScript型エラーが解消しない**: 既存コンポーネントのコードを参照して正しいパターンを確認
