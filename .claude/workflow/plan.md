# Plan: ブラウザコンソールエラーのAPI経由チェック機構

## 概要

コンポーネントをアタッチした後、ブラウザ側でランタイムエラー（`console.error`、未キャッチ例外、未処理Promise rejection）が発生していないかをREST API経由でチェックできる仕組みを実装する。

既存の `shaderErrors` パターン（グローバルバッファ → EditorAPIBridge dispatch → REST API）に倣い、最小限の変更で実現する。

## 実装ステップ

### 1. コンソールエラーキャプチャモジュールの作成

- **対象ファイル**: `packages/orengine/ts/Engine/ConsoleCapture/index.ts`（新規作成）
- **変更内容**: `console.error`, `console.warn`, `window.onerror`, `unhandledrejection` をフックし、エラーをリングバッファに蓄積するモジュール。
- **コードスニペット**:
```typescript
export type CapturedLog = {
	type: 'error' | 'warn' | 'uncaughtError' | 'unhandledRejection';
	message: string;
	timestamp: number;
	stack?: string;
};

const MAX_ENTRIES = 100;
export const capturedLogs: CapturedLog[] = [];

// argsを文字列化するヘルパー
function argsToString( args: any[] ): string { /* ... */ }

export function initConsoleCapture(): void {
	// console.error のモンキーパッチ
	const origError = console.error;
	console.error = function( ...args: any[] ) {
		pushLog( { type: 'error', message: argsToString( args ), timestamp: Date.now() } );
		origError.apply( console, args );
	};
	// console.warn も同様
	// window.onerror
	// window.addEventListener('unhandledrejection')
}

function pushLog( log: CapturedLog ): void {
	capturedLogs.push( log );
	if ( capturedLogs.length > MAX_ENTRIES ) capturedLogs.shift();
}

export function clearCapturedLogs(): void {
	capturedLogs.length = 0;
}
```
- **注意点**:
  - リングバッファ（最大100件）でメモリリーク防止
  - 元の `console.error` / `console.warn` は `apply` で呼び出し、通常のコンソール出力は維持
  - `argsToString` ではオブジェクトを `JSON.stringify` で文字列化（循環参照はtry/catchで `String()` にフォールバック）
  - `window.onerror` では `stack` プロパティも保存

### 2. Engine初期化時にConsoleCaptureを起動

- **対象ファイル**: `packages/orengine/ts/Engine/index.ts`
- **変更内容**: Engine のコンストラクタまたは初期化処理で `initConsoleCapture()` を呼び出す。
- **コードスニペット**:
```typescript
import { initConsoleCapture } from './ConsoleCapture';

// Engine constructor or init内で
initConsoleCapture();
```
- **注意点**: アプリ起動時に1回だけ呼ぶ。複数回呼ばれないようガード（`initialized` フラグ）を入れる

### 3. EditorAPIBridge に getConsoleErrors / clearConsoleErrors アクションを追加

- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPIBridge/index.ts`
- **変更内容**: `_dispatch` メソッドの switch 文に2つのアクションを追加。
- **コードスニペット**:
```typescript
import { capturedLogs, clearCapturedLogs } from '../../Engine/ConsoleCapture';

// _dispatch内のswitch文に追加:
case 'getConsoleErrors': {
	return { errors: [ ...capturedLogs ] };
}

case 'clearConsoleErrors': {
	clearCapturedLogs();
	return { success: true };
}
```
- **注意点**: `capturedLogs` はスプレッドでコピーして返す（参照を返すと外部から変更される可能性）

### 4. サーバー側にREST APIエンドポイントを追加

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: `getConsoleErrors` / `clearConsoleErrors` のREST APIルートを追加。既存の `getShaderErrors` と同パターン。
- **コードスニペット**:
```typescript
// handleActionLocal の switch 文で、ブラウザ必須アクションに追加:
case 'getConsoleErrors':
case 'clearConsoleErrors':
	throw new Error( `Action '${action}' requires browser connection` );

// --- コンソールエラー ---
editorRouter.get( '/projects/:projectName/editor/console-errors', ( req, res ) => {
	handleAction( req.params.projectName, 'getConsoleErrors', {}, res );
} );

editorRouter.post( '/projects/:projectName/editor/console-errors/clear', ( req, res ) => {
	handleAction( req.params.projectName, 'clearConsoleErrors', {}, res );
} );
```
- **注意点**: ブラウザ未接続時は503エラー（`requires browser connection`）。`shaderErrors` と同じ制約

## 変更対象ファイル一覧

- [x] `packages/orengine/ts/Engine/ConsoleCapture/index.ts` — 新規: コンソールキャプチャモジュール
- [x] `packages/orengine/ts/Engine/index.ts` — `initConsoleCapture()` の呼び出し追加
- [x] `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` — `getConsoleErrors` / `clearConsoleErrors` アクション追加
- [x] `server/routes/editor.ts` — REST APIエンドポイント追加 + handleActionLocal に追加

## API仕様

### GET `/projects/:projectName/editor/console-errors`
```json
{
  "errors": [
    {
      "type": "error",
      "message": "Cannot read property 'x' of undefined",
      "timestamp": 1710000000000,
      "stack": "Error: Cannot read property..."
    }
  ]
}
```

### POST `/projects/:projectName/editor/console-errors/clear`
```json
{ "success": true }
```

## 使い方（コンポーネントアタッチ後のエラーチェックフロー）

1. `POST /editor/console-errors/clear` — エラーバッファをクリア
2. `POST /editor/entity/:uuid/component` — コンポーネントをアタッチ
3. 1〜2秒待つ（コンポーネントの初期化・最初のupdate/renderサイクルを待つ）
4. `GET /editor/console-errors` — エラーが出ていないかチェック
5. `errors` が空なら問題なし、エラーがあれば内容を確認

## 考慮事項・リスク

- **パフォーマンス**: リングバッファ（100件上限）でメモリ問題を回避。`shift()` のコストはO(n)だが100件なので問題なし
- **エラーの出所の区別**: キャプチャされるエラーはアプリ全体のもの。コンポーネント由来かどうかはタイムスタンプでフィルタする（clearしてからattachして再チェック）
- **モンキーパッチの副作用**: 他のライブラリが `console.error` を上書きしている場合に競合する可能性。OREngineでは現時点で問題なし
- **HMR（Hot Module Replacement）**: Vite HMR でモジュールが再読み込みされた場合、`initConsoleCapture` が再度呼ばれる可能性 → 初期化ガードで防止

## テスト方針

1. ブラウザ開いた状態で `GET /editor/console-errors` → 空の `errors` が返ること
2. ブラウザのコンソールで `console.error('test')` → `GET /editor/console-errors` → `test` が含まれること
3. `POST /editor/console-errors/clear` → `GET /editor/console-errors` → 空になること
4. 存在しないコンポーネントクラスをアタッチしてエラーが出た場合、エラーがキャプチャされること
5. ブラウザ未接続で `GET /editor/console-errors` → 503が返ること
