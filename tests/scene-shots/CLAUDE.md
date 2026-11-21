# scene-shots の内部の流れ

- 流れ（`tests/scene-shots/sceneShots.spec.ts`）: バックエンドごとに `runDev` で dev サーバーを立て、headless Chromium（`scripts/headlessEditor.ts` の `launchHeadlessEditor`。フラグはシーン CLI の headless と同じ）を開いたまま、`?agent-scene=<name>` 付きの URL でシーンを順に開き直し、AgentBridge の HTTP（`POST /__agent/shot` / `errors`）で撮る。終わったら（途中で失敗しても）ブラウザと dev サーバーを閉じる
  - 開き直したら、通信が落ち着く（`networkidle`）のを待ち、さらにページのフレームが30回まわるまで待ってから撮る。BLidge のシーンは通信の後も画像のデコードと 100ms のタイマーを挟んでからカメラを作り、初回はシェーダーのコンパイルでメインスレッドが塞がるため（CPU を 8 倍に絞った実測で、フレームを待たないと「displayOut のカメラがありません」で失敗する）
- ユーザーが別に `npm run dev` を立てていても衝突しない: ポートは webgl が 3300 / 3301、webgpu が 3310 / 3311 から空きを探す（ユーザーのタブがこの dev サーバーに繋がるとコマンドがそちらへ送られるので、既定の 3000 番台から離す）。`tmp/dev-server.json` は書かない（`runDev` の `writeDevServerInfo: false`）。vite の依存の事前バンドルは `node_modules/.vite-scene-shots/<バックエンド>` に分ける（`cacheDir`。プロジェクト・レンダラーの違う dev サーバーが同じ置き場を使うと、起動した側が作り直して入れ替え、動いている側の配信を壊すため）。シーンは開くだけで保存しないので、editor.json もシーンファイルも変わらない
