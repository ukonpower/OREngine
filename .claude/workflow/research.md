# Research: ブラウザコンソールエラーのAPI経由チェック機構

## タスク概要
コンポーネントをアタッチした後、ブラウザ側でランタイムエラー（console.error等）が発生していないかをAPI越しにチェックする仕組みを設計する。シェーダーエラー以外の一般的なJSランタイムエラーも対象。

## 1. JSからコンソール出力をキャプチャする方法

### 結論: **可能**。以下の3つのアプローチを組み合わせる

### (A) console メソッドのモンキーパッチ
```typescript
const originalError = console.error;
console.error = function( ...args: any[] ) {
    capturedErrors.push( { type: 'error', args, timestamp: Date.now() } );
    originalError.apply( console, args );
};
```
- `console.log`, `console.warn`, `console.error` 等すべてのメソッドで可能
- 元のメソッドを保持し `apply` で呼ぶことで通常の出力も維持
- **全モダンブラウザで動作**

### (B) window.onerror - 未キャッチのランタイムエラー
```typescript
window.onerror = ( message, source, lineno, colno, error ) => {
    capturedErrors.push( { type: 'uncaughtError', message, source, lineno, colno, stack: error?.stack } );
    return false; // falseでコンソールにも表示
};
```
- `console.error` を経由しないスローされたエラーをキャッチ
- クロスオリジンスクリプトは "Script error." のみ（CORS設定が必要）

### (C) window.addEventListener('unhandledrejection') - 未処理Promise
```typescript
window.addEventListener( 'unhandledrejection', ( event ) => {
    capturedErrors.push( { type: 'unhandledRejection', reason: event.reason } );
} );
```
- Promise の `.catch()` がないrejectをキャッチ

### 制限事項
- クロスオリジンスクリプトのエラー詳細取得にはCORS設定が必要（OREngineは同一オリジンなので問題なし）
- iframe は別ウィンドウなので個別にフックが必要（OREngineではiframe不使用のため問題なし）
- 高頻度キャプチャ（レンダーループ内のログ等）はバッファリングが必要

## 2. 既存の類似実装: シェーダーエラー取得システム

### データ蓄積（ブラウザ側）
- `packages/glpower/packages/glpower/src/GLPowerProgram.ts:28`
  - `export const shaderErrors: Map<string, string> = new Map()` でグローバルにエラーを蓄積
  - シェーダーコンパイル成功時に `delete`、失敗時に `set`

### API経由取得（ブラウザ側Bridge）
- `packages/orengine/ts/Editor/EditorAPIBridge/index.ts:494-498`
  - `getShaderErrors` アクションで `GLP.shaderErrors` から取得してレスポンス

### REST APIエンドポイント（サーバー側）
- `server/routes/editor.ts:878-882`
  - `GET /projects/:projectName/editor/shader-errors`
  - WebSocket Bridge経由でブラウザに問い合わせ
  - **ブラウザ未接続時は503エラー**（`requires browser connection`）

## 3. 通信アーキテクチャ

### 概要
```
REST API (server/) → WebSocket Bridge (server/ws/) → Browser (EditorAPIBridge)
```

### フロー
1. REST APIリクエスト → `handleAction()` → `handleActionInternal()`
2. ブラウザ接続時: `bridge.send(projectName, action, params)` でWebSocket経由
3. ブラウザ側 `EditorAPIBridge._handleLegacyRequest()` → `_dispatch()` で処理
4. 結果をWebSocket経由で返却

### 関連ファイル
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `server/routes/editor.ts` | `editorRouter`, `handleAction`, `handleActionInternal` | REST APIルーティング |
| `server/ws/index.ts` | `EditorWSBridge`, `send`, `initWSBridge` | WebSocketブリッジ（サーバー側） |
| `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` | `EditorAPIBridge`, `_dispatch` | WebSocketブリッジ（ブラウザ側） |
| `packages/glpower/packages/glpower/src/GLPowerProgram.ts` | `shaderErrors` | シェーダーエラー蓄積（参考実装） |

## 4. 設計案: consoleErrorsのシェーダーエラーと同パターン実装

既存の `shaderErrors` パターンに倣い、以下のように実装可能：

### ブラウザ側
1. グローバルなエラーバッファ（`Map` or `Array`）を作成
2. アプリ初期化時に `console.error`, `window.onerror`, `unhandledrejection` をフック
3. エラーをバッファに蓄積（上限を設けてメモリリーク防止）
4. `EditorAPIBridge._dispatch` に `getConsoleErrors` アクションを追加
5. オプション: `clearConsoleErrors` で取得後にクリア

### サーバー側
1. `server/routes/editor.ts` に `GET /projects/:projectName/editor/console-errors` を追加
2. `getShaderErrors` と同じ `handleAction` パターンで実装
3. ブラウザ未接続時は503

### API設計案
```
GET /projects/:projectName/editor/console-errors
  → { errors: [{ type: 'error'|'uncaughtError'|'unhandledRejection', message: string, timestamp: number, stack?: string }] }

POST /projects/:projectName/editor/console-errors/clear
  → { success: true }
```

## 5. 制約・注意点

- **パフォーマンス**: レンダーループ中のエラーが大量に蓄積される可能性 → リングバッファ（最新N件のみ保持）が望ましい
- **ブラウザ接続必須**: `shaderErrors` と同様、ブラウザが接続していないと取得不可
- **タイミング**: コンポーネントアタッチ直後のエラーを拾うには、アタッチ後に少し待ってからチェックする必要あり（非同期初期化のため）
- **エラーの区別**: コンポーネント由来のエラーとそれ以外のエラーを区別するのは困難。タイムスタンプベースでフィルタする方法が現実的
- **既存のconsole出力との競合**: OREngineコード内で既に `console.error` を使っている箇所があるため、モンキーパッチ時に二重キャプチャに注意

## 6. 参考になる既存実装

- **`shaderErrors` パターン**: グローバル Map → Bridge dispatch → REST API の完全な参考実装が存在
- `EditorAPIBridge._dispatch` の switch 文にアクション追加するだけで拡張可能
- `server/routes/editor.ts` の `handleAction` に1行追加でエンドポイント追加可能
