# OREngine レンダリングパイプライン仕様

レンダリングパイプラインの描画フェーズ、GBuffer構成、FrameBuffer共有関係の内部仕様。

**ファイル**: `packages/maxpower/Component/Renderer/index.ts`

---

## 全体の描画フロー

`Renderer.render( entity, cameraEntity, event )` が1フレームの描画を行う:

```
entity.onBeforeRender()
  ↓
getRenderStack( entity )        ← シーンツリーからMesh/Lightを収集
  ↓
ライト情報収集・ソート
  ↓
shadowMap 描画               ← castShadow=true のライトごと
  ↓
envMap 描画                  ← 6面キューブマップ + PMREM生成
  ↓
deferred 描画                ← GBufferに出力
  ↓
Deferred Shading (PostProcess)  ← GBuffer → shadingBuffer
  ↓
forward 描画                 ← forwardBuffer（gBuffer.depth共有）
  ↓
Pipeline PostProcess          ← SSR, MotionBlur, DOF等
  ↓
Camera PostProcess            ← カメラ固有のポストプロセス
  ↓
blit: backBuffer → uiBuffer   ← COLOR_BUFFER_BIT のみ
  ↓
ui 描画                      ← uiBuffer（gBuffer.depth共有）
  ↓
blit: uiBuffer → デフォルトFB  ← 画面出力
  ↓
entity.onAfterRender()
```

---

## RenderCameraTarget（FrameBuffer構成）

```typescript
type RenderCameraTarget = {
  gBuffer: GLPowerFrameBuffer;       // GBuffer（5テクスチャ + depth）
  shadingBuffer: GLPowerFrameBuffer; // Deferred Shading出力（2テクスチャ、depth無し）
  forwardBuffer: GLPowerFrameBuffer; // Forward描画（3テクスチャ、gBuffer.depth共有）
  uiBuffer: GLPowerFrameBuffer;     // UI描画（1テクスチャ、gBuffer.depth共有）
  normalBuffer: GLPowerFrameBuffer;  // 法線バッファ（1テクスチャ）
}
```

### FrameBuffer の depth 共有関係

```
gBuffer         : 独自の depthTexture（シーンの深度情報の源）
shadingBuffer   : depth なし（disableDepthBuffer: true）
forwardBuffer   : gBuffer.depthTexture を共有
uiBuffer        : gBuffer.depthTexture を共有
normalBuffer    : 独自の depthTexture
デフォルトFB(null): WebGLが自動管理する depth（シーンとは独立）
```

forwardBuffer と uiBuffer は gBuffer の depth を共有しているため、deferred パスで書き込まれたシーンの深度に対して正しい depth test が機能する。

---

## GBuffer レイアウト

`Renderer.createRenderTarget()` で作成される5つのテクスチャ:

| ターゲット | フォーマット | 内容 |
|-----------|------------|------|
| textures[0] | RGBA32F (NEAREST) | Position XYZ + Emission.X |
| textures[1] | RGBA32F | Normal XYZ + Emission.Y |
| textures[2] | RGBA8 | Base Color XYZ |
| textures[3] | RGBA8 | Roughness, Metallic, SSN, EnvMapIntensity |
| textures[4] | RGBA32F | Velocity XY + Emission.Z |

シェーダー側の出力変数（`#include <frag_out>` でパッキング）:

```glsl
outColor0 = vec4( outPos, outEmission.x );
outColor1 = vec4( outNormal, outEmission.y );
outColor2 = vec4( outColor.xyz, 1.0 );
outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );
outColor4 = vec4( vVelocity, outEmission.z, 1.0 );
```

---

## 描画フェーズ詳細

### 1. Shadow Map

各ライトの `renderTarget`（ライト固有の FBO）に描画。
- `material.visibilityFlag.shadowMap` が true のエンティティのみ
- ライトのビュー/プロジェクション行列を使用
- `castShadow = true` かつ `renderTarget` が存在するライトのみ

### 2. Environment Map

6面キューブマップ（256×256）にシーンを描画し、PMREM（Pre-filtered Mipmap Radiance Environment Map）を生成。
- `material.visibilityFlag.envMap` が true のエンティティのみ
- 6台のカメラ（各面90度FOV）で描画後、PMREMRender で畳み込み

### 3. Deferred（GBuffer書き込み）

`gBuffer` に描画。ブレンディング無効（`gl.disable(BLEND)`）。
- `material.visibilityFlag.deferred` が true のエンティティ
- シェーダーに `IS_DEFERRED` define が追加される
- フラグメントシェーダーの `#include <frag_out>` が5つのカラーバッファに出力

### 4. Deferred Shading

GBuffer をテクスチャとして読み取り、ライティング計算を行うポストプロセス。
- `DeferredRenderer` が管理
- 出力: `shadingBuffer`（RGBA16F × 2）
  - textures[0]: ライティング結果
  - textures[1]: ディファード結果（forward パスの uDeferredTexture として使用）
- SSAO, Light Shaft もこの段階で適用

### 5. Forward

`forwardBuffer` に描画。ブレンディング有効（`gl.enable(BLEND)`）。
- `material.visibilityFlag.forward` が true のエンティティ
- `disableClear: true`（shadingBuffer のカラーを維持）
- forwardBuffer.textures[0] = shadingBuffer.textures[0]（シェーディング結果に重ね描き）
- シェーダーに `IS_FORWARD` define が追加
- `uDeferredTexture`, `uDeferredResolution`, `uEnvMap` が uniform として渡される

### 6. Pipeline PostProcess

`PipelinePostProcess` が管理するスクリーンスペースエフェクト:
- SSR (Screen Space Reflections)
- Motion Blur
- その他のポストプロセス

設定可能なオプション（`PipelineConfig`）:
```typescript
type PipelineConfig = {
  motionBlur?: boolean;
  motionBlurPower?: number;
  ssr?: boolean;
  ssao?: boolean;
  lightShaft?: boolean;
};
```

### 7. Camera PostProcess

`PostProcessPipeline` コンポーネントがカメラに付いている場合、そのポストプロセスを順に実行。
- DOF、ブルーム等のカメラ固有エフェクト

### 8. UI

パイプラインの最終出力を `uiBuffer` に blit（COLOR_BUFFER_BIT のみ）した後、`uiBuffer` に ui フェーズのエンティティを重ね描きする。
- `material.visibilityFlag.ui` が true のエンティティ
- `disableClear: true`（blit した結果を維持）
- gBuffer.depth が共有されているため、シーンの深度に対する depth test が効く

### 9. 画面出力

`uiBuffer` → デフォルトFrameBuffer に blit（COLOR_BUFFER_BIT のみ）して画面に表示。

---

## エディタ描画（Engine.update 後）

エディタモードでは `Renderer.render()` の後に追加の描画が行われる:

```
engine.update()
  ↓ Renderer.render() → uiBuffer → デフォルトFB に blit
  ↓
Editor._animate()
  ↓
helperManager.render()       → uiBuffer に描画（clearなし）
wireframeRenderer.render()   → uiBuffer に描画（clearなし）
gizmoManager.render()        → uiBuffer に描画（clearなし）
selectionOutline.render()    → uiBuffer に描画
  ↓
uiBuffer → デフォルトFB に再 blit
```

全てのエディタ描画は `uiBuffer` で行われるため、gBuffer.depth を共有してシーンに対する depth test が機能する。Gizmo は `depthTest=false`, `depthWrite=false` で常に最前面に描画される。

---

## Material と描画フェーズ

### Material.phase（visibilityFlag）

マテリアルの `.mat` config の `phase` フィールドで描画フェーズを指定:

```json
{ "phase": ["shadowMap", "deferred"] }
```

有効な値:
| phase | 説明 |
|-------|------|
| `"shadowMap"` | シャドウマップに描画される |
| `"deferred"` | GBuffer に描画される（標準的なメッシュ） |
| `"forward"` | フォワードパスで描画（透過等） |
| `"envMap"` | 環境マップに描画される |
| `"ui"` | UI レイヤーに描画される |

**標準構成**: `["shadowMap", "deferred"]`

### シェーダー define

描画フェーズに応じてシェーダーに自動的に define が追加される:
- `deferred` → `IS_DEFERRED`
- `forward` / `envMap` → `IS_FORWARD`
- `shadowMap` → `IS_DEPTH`

---

## PostProcessPass

`PostProcess` は `PostProcessPass` の配列を持ち、順に実行される。各パスはフルスクリーンクアッド（2×2 PlaneGeometry）で描画する。

```
PostProcessPass:
  - 入力: backBuffers（前のパスの出力テクスチャ配列）
  - uniform: uBackBuffer0, uBackBuffer1, ... として自動バインド
  - 出力: renderTarget（指定FBO、null なら画面直接描画）
  - passThrough: true の場合、このパスの出力を次のパスの入力にしない
```

---

## Renderer のフィールド

Renderer は Serializable を継承しており、エディタから以下のパイプライン設定を変更できる:

```
pipeline/
  motionBlur/
    enabled: boolean
    power: number
  ssr/
    enabled: boolean
  ssao/
    enabled: boolean
  lightShaft/
    enabled: boolean
```

`setOverride()` / `clearOverrides()` で一時的な設定変更も可能（プレビュー等で使用）。
