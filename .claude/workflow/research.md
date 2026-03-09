# Research: シーンのMP4動画出力機能

## タスク概要
OREngineのシーンを、設定されたフレーム範囲（duration, fps）に基づいてフレーム単位でレンダリングし、MP4ファイルとしてエクスポートする機能を追加する。リアルタイムキャプチャではなく、1フレームずつ正確にレンダリング→エンコードするオフライン書き出し方式。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Engine/index.ts` | `Engine`, `SceneTime`, `FramePlay`, `OREngineProjectFrame` | エンジンコア。`seek(frame)` + `update()` でフレーム単位制御可能 |
| `packages/orengine/ts/Engine/ProjectSerializer/index.ts` | `OREngineProjectFrame` | `{ duration: number, fps: number }` の定義 |
| `packages/maxpower/Component/Renderer/index.ts` | `Renderer` | レンダリングパイプライン。`render()` でシーン描画、`blitFramebuffer` で最終出力 |
| `packages/orengine/ts/Editor/index.ts` | `Editor`, `_animate()` | エディタのアニメーションループ。録画UIのエントリポイント候補 |
| `src/ts/Globals/index.ts` | `canvas`, `gl` | Canvas/WebGL2コンテキスト生成元 |
| `packages/orengine/ts/Engine/AssetPreviewManager/index.ts` | `AssetPreviewManager` | `gl.readPixels` + `canvas.toDataURL` の既存パターン参考 |
| `packages/orengine/tsx/components/Panels/Timeline/` | Timeline UI | フレーム操作UI。録画ボタンの配置候補 |

## 依存関係
- `Editor._animate()` → `Engine.update()` → `Renderer.render()` → `blitFramebuffer` → canvas
- `Engine.seek(frame)` で `_time.code = frame / 60`, `_frame.current = frame` をセット
- `Engine.update()` は `_time.delta` を壁時計から計算。オフラインレンダリング時は固定deltaに差し替える必要あり
- Rendererの最終出力は `rt.uiBuffer` → デフォルトFB（canvas）への `blitFramebuffer`

## 既存パターン

### フレーム制御
- `Engine.seek(frame)`: 任意のフレームにジャンプ可能（`frame / 60` で秒に変換）
- `Engine.update()`: 1フレーム分の更新+レンダリング実行
- `frameSetting`: `{ duration: 600, fps: 30 }` がデフォルト

### ピクセル読み取り
- `AssetPreviewManager._readFBToDataURL()` で `gl.readPixels()` → 2D canvas → `toDataURL()` のパターンが既存

### 外部ウィンドウ出力
- `Editor.openInExternalWindow()` で `createImageBitmap(canvas)` → `transferFromImageBitmap()` のパターンが既存

## 制約・注意点

### Canvas/WebGL制約
- **`preserveDrawingBuffer: false`**（デフォルト）: `canvas.getContext('webgl2', { antialias: false })` で生成。`toDataURL()` や `toBlob()` でcanvasから直接読む場合、レンダリング直後（同一イベントループ内）でないとバッファがクリアされる可能性あり
- **代替策**: `gl.readPixels()` をFrameBufferから直接読む（AssetPreviewManagerのパターン）か、`VideoFrame(canvas)` を `update()` 直後に呼ぶ

### 時間管理の変更が必要
- 現在の `Engine.update()` は壁時計ベースで `delta` を計算: `this._time.delta = (newTime - this._time.current) / 1000`
- オフライン書き出しでは固定delta（`1/fps`）を使う必要がある
- `seek()` + `update()` の組み合わせでは、`update()` 内で壁時計deltaが上書きされるため、**update内のdelta計算をバイパスする仕組み**が必要

### ブラウザ互換性
- WebCodecs API: Chrome系のみ完全サポート（Firefox実験的）
- VideoFrame: Chromeで利用可能
- このプロジェクトはElectron等ではなくブラウザ直接なのでChrome前提で問題なし

## Canvas→MP4出力の技術的選択肢

### 方式1: WebCodecs + mediabunny（推奨）
- **npm**: `mediabunny`（純TypeScript、ゼロ依存、17kB）— **mp4-muxerの後継** (mp4-muxerはdeprecated)
- **GitHub**: [Vanilagy/mediabunny](https://github.com/Vanilagy/mediabunny)
- **公式サイト**: [mediabunny.dev](https://mediabunny.dev/)
- **仕組み**: `VideoFrame(canvas)` → `VideoEncoder.encode()` → muxer → Blob。または `CanvasSource` で高レベルAPI利用可能
- **フレーム単位制御**: 完全対応。`timestamp = (frameNumber * 1e6) / fps` で正確なタイムスタンプ指定
- **WebGL対応**: `VideoFrame(canvas)` はWebGL canvasから直接生成可能（レンダリング直後に呼ぶ必要あり）
- **出力形式**: MP4, WebM, MKV, MOV（H.264/H.265/AV1コーデック）
- **速度**: リアルタイムの5-10倍速以上
- **Tree-shakable設計**

```typescript
// 基本パターン（低レベルAPI: WebCodecs直接使用）
import { Muxer, ArrayBufferTarget } from 'mediabunny';

const muxer = new Muxer({
  target: new ArrayBufferTarget(),
  video: { codec: "avc", width, height },
  fastStart: "in-memory",
});

const encoder = new VideoEncoder({
  output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
  error: (e) => console.error(e),
});

encoder.configure({
  codec: "avc1.42001f",
  width, height,
  bitrate: 8_000_000,
});

// フレームループ
for (let f = 0; f < totalFrames; f++) {
  engine.seek(f * (60 / fps)); // OREngineのフレームは60fps基準
  engine.update(); // レンダリング
  const frame = new VideoFrame(canvas, { timestamp: (f * 1e6) / fps });
  encoder.encode(frame, { keyFrame: f % 30 === 0 });
  frame.close();
}

await encoder.flush();
muxer.finalize();
const blob = new Blob([muxer.target.buffer], { type: "video/mp4" });
```

**mediabunnyには `CanvasSource` という高レベルAPIもあり、Canvasから直接録画可能。**

### 方式2: canvas-record ライブラリ
- **npm**: `canvas-record`
- **仕組み**: 高レベルAPI。`Recorder.step()` でフレーム単位制御
- **出力形式**: MP4, WebM, MKV, MOV, GIF, PNG/JPGシーケンス
- **WebGL対応**: 2D/WebGL/WebGPU対応
- **利点**: APIがシンプル。フォーマット選択が柔軟
- **懸念**: 追加依存が多い。OREngineの制御フローに合わせるカスタマイズが必要

### 方式3: MediaRecorder API（非推奨）
- ブラウザネイティブだがリアルタイムベース
- `captureStream(0)` + `requestFrame()` でフレーム単位制御を試みることは可能だが、壁時計に依存するため正確なフレーム制御が困難
- 出力はWebM（VP8/VP9）のみ。MP4非対応

### 方式4: CCapture.js
- 非リアルタイムフレーム録画の定番
- メンテナンスが停滞（最終更新が古い）
- WebMへの出力はできるがMP4には非対応
- `requestAnimationFrame` をフックしてフレーム制御する仕組み

### 方式5: FFmpeg.wasm
- ブラウザ内でFFmpegを実行
- フレーム画像（PNG/JPEG）をFFmpegに渡してMP4生成
- 重量級（WASMバイナリが大きい）
- 最も柔軟だがオーバーキル

## 推奨アプローチ

**方式1: WebCodecs + mediabunny** を推奨。理由:

1. フレーム単位の完全な制御が可能
2. 依存が軽量（mediabunny は純TypeScript、ゼロ依存、17kB）
3. WebGL canvasから `VideoFrame` を直接生成できる
4. リアルタイムより高速にエンコード可能
5. MP4出力に対応（H.264/H.265/AV1）

### 実装の要点

1. **Engine側**: `update()` にオフラインレンダリングモードを追加。壁時計deltaではなく固定delta（`1/fps`）を使用
2. **録画ループ**: `seek(frame)` → `update({offlineRendering: true})` → `new VideoFrame(canvas)` → `encoder.encode()`
3. **UI**: Timelineパネルに「Export MP4」ボタンを追加。進捗表示付き
4. **ダウンロード**: `Blob` → `URL.createObjectURL()` → `<a>` download

### OREngine固有の注意点
- OREngineのフレーム番号は60fps基準（`frame.current = timeCode * 60`）だが、`frameSetting.fps` は30
- `seek(frame)` のframeは60fps基準の値。30fpsで書き出す場合、`seek(f * 2)` とする（60/30=2フレームごと）
- `update()` 内で `_time.code` が壁時計から再計算されるため、seek後のupdate時にはdelta計算をスキップするか、オフラインモードのフラグが必要

## 参考リンク
- [WebCodecs API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API)
- [How to Save HTML Canvas to MP4 Using WebCodecs API](https://devtails.xyz/adam/how-to-save-html-canvas-to-mp4-using-web-codecs-api)
- [mediabunny (GitHub)](https://github.com/Vanilagy/mediabunny) — mp4-muxerの後継
- [mediabunny 公式サイト](https://mediabunny.dev/)
- [mp4-muxer → mediabunny 移行ガイド](https://vanilagy.github.io/mp4-muxer/MIGRATION-GUIDE.html)
- [canvas-record (GitHub)](https://github.com/dmnsgn/canvas-record)
- [WebCodecs + Canvas 3Dアニメーションキャプチャ](https://sabigara.com/posts/capture-frames-and-encode)
- [Mp4Maker (frame-by-frame mp4)](https://github.com/tlecoz/Mp4Maker)
- [Fast video rendering using web APIs](https://pietrasiak.com/fast-video-rendering-and-encoding-using-web-apis)
