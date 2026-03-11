# Research: タイムラインAPI・スクリーンショットAPI・カメラ制御API

## タスク概要
APIから以下を操作可能にする：
1. **タイムライン制御**: 再生・停止・フレームシーク
2. **スクリーンショット取得**: レンダリング結果をAPI経由で取得
3. **エディタカメラ制御**: カメラ位置・lookat位置の設定

## 関連ファイル・シンボル

### サーバー側
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `server/routes/editor.ts` | `handleAction`, `handleActionInternal` | REST APIエンドポイント + アクション実行 |
| `server/ws/index.ts` | `EditorWSBridge` | WebSocket双方向通信ブリッジ |
| `server/index.ts` | Express初期化 | サーバーエントリ |

### ブラウザ側（エンジン）
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Engine/index.ts` | `Engine`, `play()`, `stop()`, `seek()`, `updateOffline()` | タイムライン制御の中核 |
| `packages/orengine/ts/Editor/index.ts` | `Editor`, `_frameLoop`, `editorCamera` | エディタ管理 |
| `packages/orengine/ts/Editor/EditorCamera/index.ts` | `EditorCamera`, `_orbitControls` | エディタカメラ管理 |
| `packages/orengine/ts/Controls/OrbitControls/index.ts` | `OrbitControls`, `setPosition()`, `eye_`, `target_`, `orbit_`, `distance_` | カメラ軌道制御 |
| `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` | `EditorAPIBridge`, `_dispatch()` | WS受信→アクション実行 |
| `packages/orengine/ts/Engine/AssetPreviewManager/index.ts` | `AssetPreviewManager`, `_readFBToDataURL()` | FBからdata URL生成（スクショ参考） |
| `src/ts/Globals/index.ts` | `canvas`, `gl` | WebGL2コンテキスト生成 |

## 依存関係

### アクション実行フロー
```
REST API → handleActionInternal()
  ├─ ブラウザ接続時 → EditorWSBridge.send(action, params) → WS → EditorAPIBridge._dispatch(action, params)
  └─ 未接続時 → handleActionLocal() (SceneDataEditor経由)
```

### タイムライン制御の内部構造
```
Engine.play() → _frame.playing = true
Engine.stop() → _frame.playing = false
Engine.seek(frame) → _time.code = frame/60, _frame.current = frame, emit("update/frame/play")
Engine.update() → _time.code += delta * (playing ? 1 : 0), _frame.current = _time.code * 60
```

### カメラ制御の内部構造
```
EditorCamera._orbitControls.setPosition(eye, target)
  → 球面座標(orbit_.x, orbit_.y, distance_)に変換
  → calc() で行列計算 → entity.position, entity.quaternion 更新
```

### スクリーンショットのデータフロー（新規設計）
```
REST API → WS → ブラウザで canvas/FB からピクセル読み取り → data URL → WS → REST応答
```

## 既存パターン

### 1. アクション追加パターン
新しいアクションを追加するには以下の2箇所を修正：

**ブラウザ側** `EditorAPIBridge._dispatch()` に case 追加：
```typescript
case 'newAction': {
  // 処理
  return result;
}
```

**サーバー側** `server/routes/editor.ts` にエンドポイント追加：
```typescript
router.post('/projects/:projectName/editor/newAction', (req, res) => {
  handleAction(res, req.params.projectName, 'newAction', req.body);
});
```

### 2. ブラウザ接続必須のアクション
タイムライン制御・スクリーンショット・カメラ制御はすべて**ブラウザ接続必須**（WebGL/DOMが必要なため）。
`handleActionInternal` 内でブラウザ未接続時は503を返す既存パターンに従う。

### 3. ConsoleCapture参考パターン
`capturedLogs` 配列にログを蓄積 → `getConsoleErrors` アクションで取得。
スクリーンショットも同様に、ブラウザ側でキャプチャしてデータを返す形式。

## 制約・注意点

### スクリーンショット関連
- **preserveDrawingBuffer 未設定**: `canvas.getContext('webgl2', { antialias: false })` で `preserveDrawingBuffer: true` がない
  - 方法A: `preserveDrawingBuffer: true` を追加（パフォーマンス影響あり）
  - 方法B: レンダリング直後に `gl.readPixels()` で読み取り（AssetPreviewManagerと同じ手法）
  - 方法C: 最終出力FBをバインドして `readPixels()` → Canvas 2D → `toDataURL()`
  - **推奨**: 方法B/C。AssetPreviewManagerの `_readFBToDataURL()` パターンを参考に、最終出力FBから読み取る
- スクリーンショットは1フレーム描画後に取得する必要がある（`requestAnimationFrame` タイミング）

### AssetPreviewManagerの readFB→dataURL パターン
```typescript
// gl.readPixels() → Uint8Array → Canvas2D → toDataURL()
_readFBToDataURL(fb, width, height): string {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  const pixels = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  const canvas2d = document.createElement('canvas');
  canvas2d.width = width; canvas2d.height = height;
  const ctx = canvas2d.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
  return canvas2d.toDataURL();
}
```

### タイムライン制御関連
- `play()`/`stop()`/`seek()` はEngine上の即座のメソッド呼び出し
- `seek()` はフレーム番号ベース（60fpsで `_time.code = frame / 60`）
- DemoMusic コンポーネントが `event.playing` / `event.timeCode` を参照してAudio再生を自動制御
- ループ設定は `Editor._frameLoop` (enabled, start, end) で管理

### カメラ制御関連
- `OrbitControls.setPosition(eye, target)` が主要API
- 球面座標（orbit.x=pitch, orbit.y=yaw, distance）に自動変換される
- エディタカメラモードが "scene" の時のみ OrbitControls が有効
- カメラモード "preview" ではシーン内のカメラが使われる

### WebSocket通信関連
- `bridge.send()` はPromiseベースでタイムアウト10秒
- レスポンスは `{ id, success, data?, error? }` 形式
- ブラウザ未接続時は503エラーを返す既存パターンに従う

### データサイズ注意
- スクリーンショットはBase64 data URLで返す → レンダリング解像度次第でサイズが大きくなる
- WebSocket経由のため、大きな画像のタイムアウトに注意（必要に応じてタイムアウト延長）
- JPEG圧縮やリサイズオプションを提供するとよい

## 参考になる既存実装

| 実装 | 参考ポイント |
|------|------------|
| `getConsoleErrors` アクション | ブラウザ側データ取得→API返却パターン |
| `AssetPreviewManager._readFBToDataURL()` | WebGL FB→data URL変換 |
| `getStatus` アクション | ブラウザ状態取得→API返却パターン |
| `selectEntity` アクション | ブラウザ接続必須アクションのパターン |
| `Engine.play()/stop()/seek()` | タイムライン操作の実装 |
| `OrbitControls.setPosition()` | カメラ位置設定の実装 |

## 実装すべきアクション一覧（案）

### タイムラインAPI
| アクション名 | パラメータ | 説明 |
|-------------|-----------|------|
| `timelinePlay` | なし | 再生開始 |
| `timelineStop` | なし | 再生停止 |
| `timelineSeek` | `{ frame: number }` | 指定フレームにシーク |
| `getTimelineStatus` | なし | 再生状態・現在フレーム・duration・fps取得 |

### スクリーンショットAPI
| アクション名 | パラメータ | 説明 |
|-------------|-----------|------|
| `captureScreenshot` | `{ width?, height?, format?, quality? }` | レンダリング結果のdata URLを返す |

### カメラ制御API
| アクション名 | パラメータ | 説明 |
|-------------|-----------|------|
| `setCameraPosition` | `{ eye: {x,y,z}, target: {x,y,z} }` | カメラ位置と注視点を設定 |
| `getCameraPosition` | なし | 現在のカメラ位置と注視点を取得 |

### RESTエンドポイント（案）
```
POST /api/projects/:name/editor/timeline/play
POST /api/projects/:name/editor/timeline/stop
POST /api/projects/:name/editor/timeline/seek    { frame: number }
GET  /api/projects/:name/editor/timeline/status
GET  /api/projects/:name/editor/screenshot       ?width=&height=&format=&quality=
POST /api/projects/:name/editor/camera/position   { eye, target }
GET  /api/projects/:name/editor/camera/position
```
