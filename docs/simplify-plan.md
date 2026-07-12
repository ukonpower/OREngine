# シンプル化 実装計画

2026-07 に決定した方針に基づく実装計画。方針の背景・議論の経緯はこのドキュメントの「方針」節を正とする。

## 方針（確定）

1. **主役は64kランタイム**（glpower + maxpower + core）。エディタ・serverはランタイムにコードを持ち込まない開発ツール
2. **coreはエディタを知らない**。エディタ側が起動時にEngineへアタッチする一方向の注入
3. **境界はエントリ分割 + eslintで機械化**。バンドルサイズの厳密計測はしない
4. **serverはファイルI/O層のみ残す**。シーン操作REST・観測REST・WSは全廃。エージェントのシーン編集は scene.json のファイル直編集（undoはgit）。ブラウザ反映はviteのファイルwatchリロード。観測が必要になったら agent-browser でエディタ画面を直接見る（専用RESTは再建しない）
5. **developから削る**。エディタのGUI機能は維持し、配置・依存方向・経路の是正に限定

### 解決したい症状と因果

- **壊れやすい**: シーン操作が「ブラウザ経由WSブリッジ / サーバー単独SceneDataEditor」の二重経路で、機能追加のたびに EditorAPI・WSブリッジ・SceneDataEditor・スキルdocs の4箇所の同期が必要だった → 経路をファイル1本にして構造ごと除去する
- **64kバンドル肥大**: player が `orengine` index 経由で editor/lib（EditorAPI・Gizmo・Helper等）を引き込み、Engine が AssetPreviewManager / ConsoleCapture を無条件に静的importしていた → エントリ分割と注入化で遮断する
- **複雑で見通しが悪い**: 上記2つの結果。分離により core+maxpower+glpower だけ読めば作品制作ができる状態に戻す

## フェーズ構成

各フェーズは独立してコミット可能で、途中で止めても状態が悪化しない順序にする。

---

### Phase 1: server の縮小（B/C/WS 全廃 + watchリロード導入）

最大の壊れやすさ発生源を先に消す。ほぼ削除作業。

**削除**

- `server/SceneDataEditor/` — サーバー単独シーン編集（二重経路の片割れ）
- `server/ws/` — WebSocketブリッジ・statePush同期
- `server/headless/` — HeadlessBrowser（観測層の支え）
- `server/routes/editor.ts` — シーン操作・観測のRESTエンドポイント群（951行）
- `vite-plugins/ViteErrorReporter/` — vite-errors API 供給用プラグイン

**修正**

- `server/factory.ts` / `server/index.ts` — 上記への参照を除去。残るルートは `scene.ts` / `components.ts` / `textures.ts` / `projects.ts` のみ
- `vite-configs.ts` — ViteErrorReporter の import と使用箇所を除去
- `packages/orengine/editor/lib/EditorAPIBridge/` — WSクライアント。丸ごと削除し、`editor/lib/index.ts` の export と、UI側の接続処理（useOREditor 等から辿る）を除去

**追加（WSリロードの代替）**

- vite のプラグインまたは `server.watch` で `<projectDir>/scene.json`・`editor.json` の変更を監視し、変更時に `full-reload` を発火する小さな仕組みを `vite-configs.ts` に追加する
- エディタUI自身の Ctrl+S 保存で自分がリロードされてループしないか確認する。問題になる場合は「保存直後の変更イベントを一定時間無視する」等の最小の抑制を入れる（旧実装の clientId 方式は持ち込まない）

**実装時確認事項**

- エディタUIの初期シーンロードがWS(statePush)に依存していないか（REST GET のみで完結するか）を最初に確認する。依存があればREST側に寄せてから削除に入る

**完了条件**

- `npm run typecheck` / `npm run lint` が通る
- `npm run dev` でエディタが起動し、シーン表示・エンティティ選択・プロパティ編集・Ctrl+S 保存ができる
- scene.json を外部エディタで直接書き換えるとブラウザが自動リロードして反映される
- `grep -r "WebSocket" server packages/orengine` がヒットしない

---

### Phase 2: core の浄化（エディタ関心事の追い出し）

**削除**

- `packages/orengine/core/ConsoleCapture/` — 観測層専用だったため移動でなく削除

**core → editor へ移動**（editor/features/ProjectControl 等から利用されているため削除はしない）

- `packages/orengine/core/AssetPreviewManager/` → `packages/orengine/editor/lib/`
- `packages/orengine/core/FrameDebugger/` → 同上
- `packages/orengine/core/GPUState/` → 同上
- `packages/orengine/core/SceneExporter/`（MP4エクスポート） → 同上

**Engine の注入化**

- `Engine` から `AssetPreviewManager` の生成・保持と `initConsoleCapture()` 呼び出しを除去する
- エディタが必要とするフック（レンダラー・glコンテキストへのアクセス）は既存の public プロパティで足りるはず。足りない場合のみ最小のアクセサを追加する（コールバック登録機構のような汎用フックは作らない）

**完了条件**

- `packages/orengine/core/` 以下に「エディタでしか使わないもの」が残っていない
- typecheck / lint が通り、エディタでアセットプレビュー・FrameDebugger・MP4エクスポートが動作する

---

### Phase 3: エントリ分割と境界の機械化

**エントリ再編**

- `packages/orengine/index.ts` から `editor/lib` の re-export を除去し、**ランタイム専用エントリ**にする（core + builtin リストのみ）
- エディタ関連は `orengine/react` と、新設または既存の `orengine/editor` エントリに集約する
- `host/templates/` 内の import を新エントリ構成に追従させる
- `package.json` の exports から死んだパスを除去・修正する（`./player` の旧位置 `packages/orengine/ts/Player/`、`./BuiltinResources/*`）

**eslint 境界ルール**

- eslint-plugin-boundaries を導入し、以下を禁止する
  - `packages/glpower`・`packages/maxpower`・`packages/orengine/core`・`packages/orengine/builtin`・`packages/orengine/player.ts` から `packages/orengine/editor`・`server`・react への import
- 設定が効いていることを、意図的な違反importを一時的に書いて eslint が落ちることで確認する

**完了条件**

- `npm run build`（playerビルド）が成功し、成果物に editor 由来のモジュールが入らない（rollupの出力モジュール一覧か、バンドル内の `EditorAPI` 等のシンボル有無で簡易確認。厳密なサイズ計測はしない）
- 境界違反が lint エラーになる

---

### Phase 4: orengine スキルの改訂

- `.claude/skills/orengine/` を新しい世界観に合わせて書き直す
  - シーン編集: REST でなく **scene.json / editor.json の直接ファイル編集**を正とする。scene.json のスキーマ（entity / component / field の構造、UUIDの扱い）をリファレンスに明記する
  - 反映確認: watchリロードで自動反映されること、見た目の確認が必要な場合は agent-browser を使うことを記載する
  - REST関連のリファレンス・スクリプトを削除する
- リポジトリ内の他ドキュメント（CLAUDE.md のサーバー・API言及）を現状に合わせて更新する

**完了条件**

- スキルの手順どおりに新しいエンティティを1つ scene.json に追加し、ブラウザで反映が確認できる

---

## やらないこと

- エディタGUI機能の削除・縮退（Gizmo・パネル類・Undo/Redo のGUI操作はすべて維持）
- バンドルサイズの計測基盤・しきい値ゲートの整備
- MCP対応（分離完了後、必要になったら別途判断）
- 旧APIとの互換レイヤー・移行措置（CLAUDE.md の方針どおり後方互換は考慮しない）

## 進め方のメモ

- 1フェーズ = 1コミット以上。フェーズ内でも「削除」「移動」「追加」は分けてコミットしてよい
- 各フェーズ完了時に typecheck + lint + dev起動での手動確認を行う
- Phase 1 の「実装時確認事項」だけは着手前に必ず潰す（WS依存の見落としが最大のリスク）
