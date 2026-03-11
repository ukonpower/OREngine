# Plan: タイムラインAPI・スクリーンショットAPI・カメラ制御API

## 概要
Claude CodeなどのAPI経由ツールからOREngineのシーンを操作・可視化するために、
タイムライン制御・スクリーンショット取得・エディタカメラ制御のREST APIを追加する。
すべてブラウザ接続必須のアクションとして、既存の `handleActionInternal` → WebSocket → `_dispatch` パターンに従う。

## 実装ステップ

### 1. ブラウザ側: タイムラインアクション追加
- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPIBridge/index.ts`
- **変更内容**: `_dispatch()` の switch に4つのcase追加
- **コードスニペット**:
  ```typescript
  case 'timelinePlay': {
      this._engine.play();
      return { success: true };
  }
  case 'timelineStop': {
      this._engine.stop();
      return { success: true };
  }
  case 'timelineSeek': {
      this._engine.seek( params.frame as number );
      return { frame: params.frame };
  }
  case 'getTimelineStatus': {
      return {
          playing: this._engine.frame.playing,
          currentFrame: this._engine.frame.current,
          duration: this._engine.frameSetting.duration,
          fps: this._engine.frameSetting.fps,
      };
  }
  ```

### 2. ブラウザ側: カメラ制御アクション追加
- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPIBridge/index.ts`
- **変更内容**: `_dispatch()` にカメラ制御のcase追加
- **コードスニペット**:
  ```typescript
  case 'setCameraPosition': {
      const eye = params.eye as { x: number, y: number, z: number };
      const target = params.target as { x: number, y: number, z: number };
      const orbitControls = this._editor.editorCamera.orbitControls;
      orbitControls.setPosition(
          new GLP.Vector( eye.x, eye.y, eye.z ),
          new GLP.Vector( target.x, target.y, target.z )
      );
      return { success: true };
  }
  case 'getCameraPosition': {
      const orbitControls = this._editor.editorCamera.orbitControls;
      return {
          eye: { x: orbitControls.eye.x, y: orbitControls.eye.y, z: orbitControls.eye.z },
          target: { x: orbitControls.target.x, y: orbitControls.target.y, z: orbitControls.target.z },
      };
  }
  ```
- **注意点**: `this._editor.editorCamera` へのアクセスが必要。EditorCamera の `orbitControls` は public getter で公開済み。

### 3. ブラウザ側: スクリーンショットアクション追加
- **対象ファイル**: `packages/orengine/ts/Editor/EditorAPIBridge/index.ts`
- **変更内容**: `_dispatch()` にスクリーンショットのcase追加。ただしスクリーンショットは非同期（1フレーム描画後に取得する必要がある）ため、Promiseを返すか、描画完了フックを使う。
- **方針**: `preserveDrawingBuffer: true` をWebGLコンテキストに追加し、`canvas.toDataURL()` で取得する。最もシンプルで確実。
  - パフォーマンス影響は軽微（開発エディタ用途なので問題なし）
- **コードスニペット**:
  ```typescript
  case 'captureScreenshot': {
      const canvas = this._engine.canvas as HTMLCanvasElement;
      const format = (params.format as string) || 'png';
      const quality = (params.quality as number) || 0.9;
      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const dataUrl = canvas.toDataURL( mimeType, quality );
      return { image: dataUrl, width: canvas.width, height: canvas.height, format };
  }
  ```
- **注意点**: `preserveDrawingBuffer` がないとcanvasが描画後クリアされる可能性あり → Step 4で対処

### 4. WebGLコンテキストに preserveDrawingBuffer 追加
- **対象ファイル**: `src/ts/Globals/index.ts`
- **変更内容**: `getContext` 呼び出しに `preserveDrawingBuffer: true` を追加
- **コードスニペット**:
  ```typescript
  export const gl = canvas.getContext( 'webgl2', { antialias: false, preserveDrawingBuffer: true } )!;
  ```
- **注意点**: これにより canvas の内容が描画後も保持され、`toDataURL()` で正しい画像が取得できる

### 5. サーバー側: タイムラインAPIエンドポイント追加
- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: タイムライン制御の4エンドポイントを追加
- **コードスニペット**:
  ```typescript
  // タイムライン制御
  router.post( '/projects/:projectName/editor/timeline/play', ( req, res ) => {
      handleAction( res, req.params.projectName, 'timelinePlay', {} );
  } );

  router.post( '/projects/:projectName/editor/timeline/stop', ( req, res ) => {
      handleAction( res, req.params.projectName, 'timelineStop', {} );
  } );

  router.post( '/projects/:projectName/editor/timeline/seek', ( req, res ) => {
      handleAction( res, req.params.projectName, 'timelineSeek', { frame: req.body.frame } );
  } );

  router.get( '/projects/:projectName/editor/timeline/status', ( req, res ) => {
      handleAction( res, req.params.projectName, 'getTimelineStatus', {} );
  } );
  ```

### 6. サーバー側: スクリーンショットAPIエンドポイント追加
- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: スクリーンショット取得エンドポイント追加
- **コードスニペット**:
  ```typescript
  router.get( '/projects/:projectName/editor/screenshot', ( req, res ) => {
      handleAction( res, req.params.projectName, 'captureScreenshot', {
          format: req.query.format,
          quality: req.query.quality ? parseFloat( req.query.quality as string ) : undefined,
      } );
  } );
  ```
- **注意点**: スクリーンショットのレスポンスはdata URLを含むJSONなのでサイズが大きくなる可能性。WebSocketのタイムアウトをこのアクション用に延長する必要があるかもしれない（デフォルト10秒で通常十分だが）

### 7. サーバー側: カメラ制御APIエンドポイント追加
- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: カメラ位置の取得・設定エンドポイント追加
- **コードスニペット**:
  ```typescript
  router.get( '/projects/:projectName/editor/camera/position', ( req, res ) => {
      handleAction( res, req.params.projectName, 'getCameraPosition', {} );
  } );

  router.post( '/projects/:projectName/editor/camera/position', ( req, res ) => {
      handleAction( res, req.params.projectName, 'setCameraPosition', {
          eye: req.body.eye,
          target: req.body.target,
      } );
  } );
  ```

## 変更対象ファイル一覧
- [x] `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` - _dispatch()にタイムライン・カメラ・スクショのcase追加
- [x] `src/ts/Globals/index.ts` - preserveDrawingBuffer: true 追加
- [x] `server/routes/editor.ts` - 7つのRESTエンドポイント追加
- [x] `packages/orengine/ts/Editor/index.ts` - editorCamera public getter追加（型エラー修正）

## APIエンドポイント一覧

| メソッド | パス | パラメータ | レスポンス |
|---------|------|-----------|-----------|
| POST | `/editor/timeline/play` | なし | `{ success: true }` |
| POST | `/editor/timeline/stop` | なし | `{ success: true }` |
| POST | `/editor/timeline/seek` | `{ frame: number }` | `{ frame: number }` |
| GET | `/editor/timeline/status` | なし | `{ playing, currentFrame, duration, fps }` |
| GET | `/editor/screenshot` | `?format=png&quality=0.9` | `{ image: "data:...", width, height, format }` |
| POST | `/editor/camera/position` | `{ eye: {x,y,z}, target: {x,y,z} }` | `{ success: true }` |
| GET | `/editor/camera/position` | なし | `{ eye: {x,y,z}, target: {x,y,z} }` |

## 考慮事項・リスク

- **preserveDrawingBuffer のパフォーマンス**: 若干のFPS低下の可能性があるが、エディタ用途では問題ない
- **スクリーンショットのデータサイズ**: 高解像度だとBase64が大きくなる。必要に応じてJPEG圧縮（`format=jpeg&quality=0.7`等）を使えるようにしている
- **WebSocketタイムアウト**: スクリーンショットの生成・転送が10秒以内に完了する必要。通常のcanvas.toDataURL()は瞬時なので問題なし
- **カメラモード**: `setCameraPosition` はエディタカメラ（sceneモード）のみ有効。previewモード時は効果がない可能性 → 必要ならモード切替も対応

## テスト方針
- `npm run dev` でエディタを起動し、ブラウザで開いた状態で各APIをcurl等で呼び出して動作確認
- タイムライン: play → status確認（playing=true） → stop → status確認（playing=false） → seek(120) → status確認（currentFrame≈120）
- スクリーンショット: GET /screenshot → data URLが返ること、画像として表示できること
- カメラ: POST camera/position → GET camera/position で設定値が反映されていること
