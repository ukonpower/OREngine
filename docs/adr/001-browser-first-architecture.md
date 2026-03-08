# ADR-001: ブラウザファースト設計

## ステータス
承認済み

## コンテキスト
OREngineはブラウザベースの3Dエディタであり、Express サーバー（REST API + WebSocket）とブラウザの両方がシーンデータを操作できる。外部クライアント（AIエージェント等）がREST API経由でシーンを操作するケースも想定する必要がある。このとき「どちらがデータの正（source of truth）か」を決める必要があった。

## 決定
ブラウザ接続中はブラウザをsource of truthとし、REST APIへの書き込み操作はWebSocket経由でブラウザに委譲する。ブラウザ未接続時のみサーバーのオンメモリ状態（ProjectData）で直接処理する。

## 理由
- ブラウザ側にはUndo/Redo機構（CommandManager）がある。サーバーで直接処理するとUndo/Redoの一貫性が崩れる
- ブラウザ側のエンジン（Engine）がリアルタイムレンダリングを行っており、データ変更を即座に反映する必要がある
- サーバーはシーンデータのスナップショットを保持するが、ランタイム状態（行列計算、コンポーネントのライフサイクル等）はブラウザにしかない
- 代替案「サーバーがsource of truth」はUndo/Redo対応とリアルタイム反映の両方を複雑にする

## 結果
- ブラウザ接続中のREST API操作はWebSocket往復分のレイテンシが追加される
- ブラウザ切断中にAPI経由で変更された状態は再接続時にstatePushでブラウザへ同期する必要がある
- サーバーは常にブラウザの状態をsyncRequestで取得して自身の状態を更新する

## 関連コード
- `server/ws/index.ts` - EditorWSBridge（WebSocket通信ブリッジ）
- `server/Project/ProjectData/index.ts` - ProjectData（オンメモリ状態管理）
- `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` - EditorAPIBridge（ブラウザ側WS通信）
