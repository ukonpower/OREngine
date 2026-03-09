# Plan: シーンのMP4動画出力機能

## 概要
OREngineのシーンを設定されたフレーム範囲（duration, fps）に基づいてフレーム単位でオフラインレンダリングし、MP4ファイルとしてブラウザからダウンロードする機能を実装する。

**技術スタック**: WebCodecs API + mediabunny（mp4-muxerの後継、純TypeScript、ゼロ依存、17kB）

## 実装ステップ

### 1. mediabunny パッケージのインストール
- **対象ファイル**: `package.json`
- **変更内容**: `mediabunny` を依存に追加
- **コマンド**: `npm install mediabunny`
- **注意点**: mediabunnyのAPIを確認し、`Muxer` + `ArrayBufferTarget` が使えることを検証する

### 2. Engine にオフラインレンダリング用メソッドを追加
- **対象ファイル**: `packages/orengine/ts/Engine/index.ts`
- **変更内容**: `updateOffline( frame: number, fps: number )` メソッドを追加。壁時計ではなく指定フレームに基づいて時間を設定し、1フレーム分の更新+レンダリングを実行する。
- **コードスニペット**:
  ```typescript
  public updateOffline( frame: number, fps: number ) {

      const timeCode = frame / fps;
      const delta = 1 / fps;

      this._time.delta = delta;
      this._time.current = new Date().getTime();
      this._time.engine += delta;
      this._time.code = timeCode;
      this._frame.current = timeCode * 60; // 内部は60fps基準
      this._frame.playing = true;

      const event = this.createEntityUpdateEvent( { forceDraw: true } );

      this._uniforms.uTime.value = this._time.code;
      this._uniforms.uTimeE.value = this._time.engine;

      const updateTextures = Engine.resources.updateEveryFrameTextures;

      for ( let i = 0; i < updateTextures.length; i ++ ) {

          updateTextures[ i ].render();

      }

      this._root.update( event );

      if ( this.enableRender ) {

          const camera = this._cameraEntity || this._findCameraEntity();

          if ( camera ) {

              this._renderer.render( this._root, camera, event );

          }

      }

  }
  ```
- **注意点**:
  - `_findCameraEntity()` は private なので Engine クラス内に追加する
  - `forceDraw: true` でレンダリングを強制
  - `_frame.playing = true` でアニメーション用のコード分岐が正しく動くようにする

### 3. SceneExporter クラスの作成
- **対象ファイル**: `packages/orengine/ts/Engine/SceneExporter/index.ts`（新規）
- **変更内容**: WebCodecs + mediabunny を使ったMP4エクスポートロジックを実装
- **コードスニペット**:
  ```typescript
  import * as GLP from 'glpower';
  import { Muxer, ArrayBufferTarget } from 'mediabunny';
  import { Engine } from '..';

  export interface SceneExporterOption {
      fps: number;
      duration: number; // フレーム数（60fps基準）
      resolution: GLP.Vector;
      bitrate?: number;
  }

  export interface SceneExporterProgress {
      current: number;
      total: number;
      phase: 'encoding' | 'finalizing' | 'done';
  }

  export class SceneExporter {

      private _engine: Engine;

      constructor( engine: Engine ) {

          this._engine = engine;

      }

      public async export(
          option: SceneExporterOption,
          onProgress?: ( progress: SceneExporterProgress ) => void
      ): Promise<Blob> {

          const { fps, duration, resolution, bitrate = 8_000_000 } = option;
          const totalFrames = Math.ceil( duration / 60 * fps );
          const canvas = this._engine.canvas;

          // 解像度を設定
          const prevResolution = this._engine.renderer.resolution.clone();
          this._engine.setSize( resolution );

          // Muxer設定
          const muxerTarget = new ArrayBufferTarget();
          const muxer = new Muxer( {
              target: muxerTarget,
              video: {
                  codec: "avc",
                  width: resolution.x,
                  height: resolution.y,
              },
              fastStart: "in-memory",
          } );

          // VideoEncoder設定
          const encoder = new VideoEncoder( {
              output: ( chunk, meta ) => muxer.addVideoChunk( chunk, meta ),
              error: ( e ) => console.error( "VideoEncoder error:", e ),
          } );

          encoder.configure( {
              codec: "avc1.42001f",
              width: resolution.x,
              height: resolution.y,
              bitrate: bitrate,
          } );

          // フレームループ
          for ( let f = 0; f < totalFrames; f ++ ) {

              // フレームをレンダリング
              this._engine.updateOffline( f, fps );

              // Canvas → VideoFrame → エンコード
              const frame = new VideoFrame( canvas as HTMLCanvasElement, {
                  timestamp: ( f * 1_000_000 ) / fps,
              } );

              encoder.encode( frame, { keyFrame: f % ( fps * 2 ) === 0 } );
              frame.close();

              // 進捗通知
              if ( onProgress ) {

                  onProgress( {
                      current: f + 1,
                      total: totalFrames,
                      phase: 'encoding',
                  } );

              }

              // UIスレッドをブロックしないよう定期的にyield
              if ( f % 10 === 0 ) {

                  await new Promise( r => setTimeout( r, 0 ) );

              }

          }

          // ファイナライズ
          if ( onProgress ) {

              onProgress( { current: totalFrames, total: totalFrames, phase: 'finalizing' } );

          }

          await encoder.flush();
          muxer.finalize();

          // 解像度を元に戻す
          this._engine.setSize( prevResolution );

          if ( onProgress ) {

              onProgress( { current: totalFrames, total: totalFrames, phase: 'done' } );

          }

          return new Blob( [ muxerTarget.buffer ], { type: "video/mp4" } );

      }

      public static download( blob: Blob, filename: string = "scene.mp4" ) {

          const url = URL.createObjectURL( blob );
          const a = document.createElement( "a" );
          a.href = url;
          a.download = filename;
          document.body.appendChild( a );
          a.click();
          document.body.removeChild( a );
          URL.revokeObjectURL( url );

      }

  }
  ```
- **注意点**:
  - `await new Promise( r => setTimeout( r, 0 ) )` で10フレームごとにUIスレッドに制御を返す
  - エクスポート完了後に解像度を元に戻す
  - keyFrameは `fps * 2` フレーム（約2秒）ごとに挿入

### 4. Editor にエクスポート機能を統合
- **対象ファイル**: `packages/orengine/ts/Editor/index.ts`
- **変更内容**:
  - `SceneExporter` インスタンスを保持
  - `exportMP4()` メソッドを追加（エクスポート中はアニメーションループと干渉しないようにする）
  - エクスポート状態（進捗、実行中フラグ）をSerializableフィールドとして公開
- **コードスニペット**:
  ```typescript
  import { SceneExporter, SceneExporterProgress } from '../Engine/SceneExporter';

  // フィールド追加（constructor内）
  private _sceneExporter: SceneExporter;
  private _isExporting: boolean;
  private _exportProgress: SceneExporterProgress | null;

  // constructor内
  this._sceneExporter = new SceneExporter( engine );
  this._isExporting = false;
  this._exportProgress = null;

  // メソッド追加
  public async exportMP4() {

      if ( this._isExporting ) return;

      this._isExporting = true;
      this._exportProgress = null;
      this.emit( "update/export" );

      const wasPlaying = this._engine.frame.playing;
      this._engine.stop();

      try {

          const blob = await this._sceneExporter.export(
              {
                  fps: this._engine.frameSetting.fps,
                  duration: this._engine.frameSetting.duration,
                  resolution: this._baseResolution.clone(),
              },
              ( progress ) => {

                  this._exportProgress = progress;
                  this.emit( "update/export" );

              }
          );

          SceneExporter.download( blob );

      } catch ( e ) {

          console.error( "Export failed:", e );

      }

      this._isExporting = false;
      this._exportProgress = null;
      this.emit( "update/export" );

      if ( wasPlaying ) {

          this._engine.play();

      }

  }
  ```
- **注意点**:
  - エクスポート中はアニメーションループ（`_animate`）が引き続き動くが、`engine.update()` は `updateOffline()` と並行して呼ばれる。エクスポート中は `_animate` 内の `engine.update()` をスキップするか、`enableRender` を一時的にfalseにする等の制御が必要
  - → `_isExporting` フラグを `_animate` で参照し、`engine.update()` をスキップする

### 5. _animate でエクスポート中の制御を追加
- **対象ファイル**: `packages/orengine/ts/Editor/index.ts`
- **変更内容**: `_animate()` メソッドで `_isExporting` 中は通常の `engine.update()` をスキップ
- **コードスニペット**:
  ```typescript
  private _animate() {

      if ( this._disposed ) return;

      if ( ! this._isExporting ) {

          this._editorCamera.updateBeforeRender( this._engine );
          this._engine.update();

          // ...既存のエディタ描画処理...

      }

      window.requestAnimationFrame( this._animate.bind( this ) );

  }
  ```
- **注意点**: エクスポート中はcanvasの表示がエクスポート中のフレームになるが、これは意図した動作（進捗が視覚的に確認できる）

### 6. エクスポート状態のgetter追加
- **対象ファイル**: `packages/orengine/ts/Editor/index.ts`
- **変更内容**: 外部からエクスポート状態を参照できるようgetterを追加
- **コードスニペット**:
  ```typescript
  public get isExporting() {

      return this._isExporting;

  }

  public get exportProgress() {

      return this._exportProgress;

  }
  ```

### 7. ProjectControl UIにExport MP4ボタンを追加
- **対象ファイル**: `packages/orengine/tsx/components/Panels/ProjectControl/index.tsx`
- **変更内容**: 「Export MP4」ボタンを追加。クリック時に `editor.exportMP4()` を呼ぶ。エクスポート中は進捗表示。
- **コードスニペット**:
  ```tsx
  import { useCallback, useEffect, useState } from 'react';
  import { SceneExporterProgress } from '../../../../ts/Engine/SceneExporter';

  // コンポーネント内
  const [ exportProgress, setExportProgress ] = useState<SceneExporterProgress | null>( null );

  useEffect( () => {

      if ( ! editor ) return;

      const onExportUpdate = () => {

          setExportProgress( editor.exportProgress ? { ...editor.exportProgress } : null );

      };

      editor.on( "update/export", onExportUpdate );

      return () => {

          editor.off( "update/export", onExportUpdate );

      };

  }, [ editor ] );

  // JSX内
  <Button
      onClick={() => {
          if ( editor && !editor.isExporting ) {
              editor.exportMP4();
          }
      }}
      disabled={editor?.isExporting}
  >
      {exportProgress
          ? `Exporting... ${Math.floor( exportProgress.current / exportProgress.total * 100 )}%`
          : 'Export MP4'}
  </Button>
  ```
- **注意点**: `disabled` 属性がButtonコンポーネントでサポートされているか確認が必要

### 8. orengine パッケージからSceneExporterをエクスポート
- **対象ファイル**: `packages/orengine/ts/Engine/index.ts` のエクスポートまたは orengine のエントリポイント
- **変更内容**: `SceneExporter` を外部から利用可能にする
- **注意点**: 既存のエクスポートパターンに合わせる

## 変更対象ファイル一覧
- [x] `package.json` - mediabunny パッケージ追加
- [x] `packages/orengine/ts/Engine/index.ts` - `updateOffline()` メソッド追加
- [x] `packages/orengine/ts/Engine/SceneExporter/index.ts` - **新規作成** SceneExporterクラス
- [x] `packages/orengine/ts/Editor/index.ts` - `exportMP4()`, `_isExporting`, `_exportProgress` 追加、`_animate()` にエクスポート中スキップ処理追加
- [x] `packages/orengine/tsx/components/Panels/ProjectControl/index.tsx` - Export MP4ボタン追加

## 考慮事項・リスク

### preserveDrawingBuffer
- WebGL contextは `preserveDrawingBuffer: false` で生成されているが、`VideoFrame(canvas)` はレンダリング直後（同一同期コンテキスト内）で呼ぶため問題ない
- `updateOffline()` → `new VideoFrame(canvas)` は同一同期処理内で実行される

### WebCodecs API互換性
- Chrome 94+、Edge 94+で利用可能。Firefox 130+（デスクトップのみ）
- Safari 16.4+で対応
- 非対応ブラウザではExportボタンを非表示にするか、`typeof VideoEncoder !== 'undefined'` でガードする

### メモリ使用量
- `ArrayBufferTarget` で全データをメモリに保持する方式。長時間・高解像度の動画では注意
- 600フレーム（20秒@30fps）・1920x1080・8Mbpsで約20MBのMP4が想定される → 問題なし

### エクスポート中のエンジン状態
- エクスポート後に `seek(0)` で先頭に戻す、または元のフレーム位置を復元する処理を追加すべき
- `_time.engine` がエクスポート中に進むが、これは許容範囲（エンジン経過時間は表示用途のみ）

### Temporal効果（SSAO、モーションブラー等）
- `updateOffline()` でフレームを順番にレンダリングするため、temporal効果は正しく蓄積される
- ただし最初の数フレームはtemporal bufferが安定していない可能性あり → 事前に数フレーム「ウォームアップ」レンダリングを入れることを検討

## テスト方針
- `npm run typecheck` で型エラーがないことを確認
- エディタでExport MP4ボタンが表示されることを確認
- 短い duration（例: 30フレーム）でエクスポートを実行し、MP4が正常にダウンロードされることを確認
- ダウンロードしたMP4をブラウザまたはプレーヤーで再生し、映像が正しいことを確認
- エクスポート中の進捗表示が更新されることを確認
- エクスポート完了後、エディタが正常に操作できることを確認
