# Research: Camera系コンポーネントの統合・簡素化

## タスク概要
Camera, RenderCamera, MainCameraの3つのコンポーネントをシンプルにする。
ユーザーが`Camera`をアタッチするだけでレンダリングされるようにしたい。
PostProcessは別途アタッチする方式にする。

## 現状の構造

### コンポーネント一覧
| ファイル | クラス | 継承元 | 役割 |
|---------|--------|--------|------|
| `packages/maxpower/Component/Camera/index.ts` | `Camera` | Component | 基本カメラ（行列計算、fov/near/far等） |
| `packages/maxpower/Component/Camera/RenderCamera/index.ts` | `RenderCamera` | Camera | GBuffer等レンダーターゲット管理（**実質未使用**） |
| `packages/maxpower/Component/Camera/ShadowMapCamera/index.ts` | `ShadowMapCamera` | Camera | Light用シャドウマップカメラ |
| `src/ts/Resources/Components/Camera/MainCamera/index.ts` | `MainCamera` | Component | Camera + LookAt + ShakeViewer + PostProcessPipeline統合 |
| `packages/maxpower/Component/PostProcessPipeline/index.ts` | `PostProcessPipeline` | Component | PostProcess管理コンポーネント |

### 重要な発見: RenderCameraは実質未使用
- `Renderer`は自前で`RenderCameraTarget`を作成・管理している（`Renderer.createRenderTarget()`）
- `RenderCamera`クラスと`Renderer`内の`RenderCameraTarget`型は**完全重複**（同じGBuffer構成）
- `Renderer.render()`は`RenderCamera`を一切使わず、`cameraEntity.getComponentsByTag<Camera>("camera")[0]`で`Camera`を取得
- `RenderCameraTarget`型は`Renderer/index.ts`と`RenderCamera/index.ts`の**2箇所で定義**されている

### Renderer内でのカメラ使用フロー
```typescript
// Renderer.render() L592
const cameraComponent = cameraEntity.getComponentsByTag<Camera>("camera")[0];
// → Camera基底クラスのみ使用（RenderCameraではない）

// PostProcessPipeline取得 L656
const postProcessManager = cameraEntity.getComponent(PostProcessPipeline);
```

### MainCameraの役割
MainCameraはComponentを継承し、内部でCameraや他コンポーネントを`entity.addComponent()`で追加する「統合コンテナ」:
- `Camera` - カメラ本体
- `LookAt` - ルックアットターゲット
- `ShakeViewer` - カメラシェイク
- `PostProcessPipeline` - FXAA, Bloom, ColorGrading, Finalize

MainCameraはプロジェクト固有（OREngine側`src/ts/`に存在）で、maxpower側のエンジンコアには含まれない。

## 依存関係

### Camera → 依存されている箇所
- `Renderer.render()` → タグ`"camera"`でCameraを取得
- `Renderer.renderCamera()` → Camera.viewMatrix, projectionMatrix等を使用
- `DeferredRenderer.setRenderCamera()` → Camera + RenderCameraTargetを受け取る
- `PipelinePostProcess.setRenderCamera()` → Camera + RenderCameraTargetを受け取る
- `MainCamera` → `entity.addComponent(Camera)`で内部保持
- `ShadowMapCamera` → Cameraを継承
- Renderer内envMapカメラ → `entity.addComponent(Camera)`で6つ作成

### RenderCamera → 依存されている箇所
- **なし** — 実質的にどこからも使われていない
- `RenderCameraTarget`型のみ`Renderer`, `DeferredRenderer`, `PipelinePostProcess`で使用

### PostProcessPipeline → 依存
- `Renderer.render()` L656-678 → `cameraEntity.getComponent(PostProcessPipeline)`で取得しポストプロセス実行
- `MainCamera` → `entity.addComponent(PostProcessPipeline)`で追加

### componentList.ts
MainCameraはUIのコンポーネント追加メニューに登録されている:
```typescript
Camera: { MainCamera: { PostProcess: { Bloom, ... }, MainCamera } }
```

## PostProcessの実行順序（Renderer.render()内）
1. GBuffer（Deferred）描画
2. DeferredRenderer（SSAO, LightShaft, Shading）— Renderer内蔵
3. Forward描画
4. PipelinePostProcess（SSR, MotionBlur, DoF）— Renderer内蔵
5. **ユーザーPostProcessPipeline**（FXAA, Bloom等）— cameraEntity上のPostProcessPipeline
6. UI描画
7. Screen出力

## 設計上の論点

### 1. RenderCameraの扱い
- 完全に削除可能。`RenderCameraTarget`型はRendererに既に存在する
- GBuffer等のレンダーターゲットはRenderer側が管理するのが自然（現状もそうなっている）

### 2. MainCameraをどうするか
MainCameraの現在の役割:
- Camera追加 → Cameraを直接アタッチすれば不要
- LookAt, ShakeViewer追加 → プロジェクト固有。ユーザーが個別にアタッチすればよい
- PostProcessPipeline(FXAA, Bloom等) → ユーザーが個別にアタッチ
- DoF距離計算、near/far設定 → Camera自体に持たせるかユーザー実装

**→ MainCameraは廃止し、Cameraを直接使う方式に移行可能**

### 3. PostProcessの扱い
現在: MainCameraがPostProcessPipelineを内包し、FXAA/Bloom/ColorGrading/Finalizeをハードコード
提案: ユーザーが`PostProcessPipeline`を個別にアタッチし、好きなPostProcessを追加

Rendererは既に`cameraEntity.getComponent(PostProcessPipeline)`でPostProcessを取得する仕組みを持っているので、Cameraアタッチ後にPostProcessPipelineを別途追加すれば動く。

### 4. ShadowMapCameraはそのまま
Light用のシャドウマップカメラは独立した関心事であり、今回の変更対象外。

## 制約・注意点
- Rendererが`getComponentsByTag<Camera>("camera")[0]`でカメラを探索 → Cameraの`_tag = "camera"`は維持必須
- `displayOut`フラグ → Cameraの画面出力ON/OFF制御。ShadowMapCameraはfalseに設定
- シーンJSON（`projects/DemoProject/scene.json`）にMainCameraが使われている可能性 → デシリアライズへの影響確認必要
- componentList.ts → MainCamera廃止時に更新必要
- `scene-builder`スキルの`components-catalog.md` → MainCamera参照があれば更新必要

## 参考になる既存実装
- `PostProcessPipeline`コンポーネント: 既に独立コンポーネントとして存在し、Rendererから参照される仕組みが完成
- `Light`コンポーネント: ShadowMapCameraを内部で管理するパターン（統合コンテナの良い例）
