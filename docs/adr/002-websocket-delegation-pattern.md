# ADR-002: WebSocket委譲パターン

## ステータス
承認済み

## コンテキスト
外部クライアント（AIエージェント等）がREST API経由でエンティティ作成・フィールド変更等の操作を行う。ブラウザ接続中はブラウザがsource of truth（ADR-001）であるため、REST APIで受けた操作をブラウザで実行する仕組みが必要。

## 決定
REST API → WebSocket → ブラウザ（EditorAPIBridge._dispatch()）→ EditorAPI/CommandManager経由で実行、という委譲パターンを採用する。書き込み操作後はsyncRequestでサーバーのオンメモリ状態を同期する。

## 理由
- ブラウザ側のCommandManagerを経由することで、外部API操作もUndo/Redoの対象になる
- ブラウザのエンジンが保持するランタイム状態（コンポーネントインスタンス、行列キャッシュ等）を直接更新できる
- 代替案「サーバーで処理してブラウザに通知」は、ブラウザ側の複雑な状態（コンポーネントのライフサイクル、イベント発火等）を再現する必要があり実装コストが高い

## 結果
- Fire & Forget方式（executeAction）と同期方式（BridgeRequest/Response）の2パターンが存在する
- WebSocket接続が切れるとAPI操作がフォールバック（サーバー直接処理）に切り替わる
- タイムアウト管理（BridgeRequest: 10秒、syncRequest: 5秒）が必要

## 関連コード
- `server/routes/editor.ts` - REST APIルーティング（委譲処理）
- `server/ws/index.ts` - EditorWSBridge.send(), executeAction(), requestSync()
- `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` - _dispatch()（ブラウザ側アクション実行）
