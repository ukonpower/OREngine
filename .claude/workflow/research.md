# Research: Gizmo表示時にワイヤーフレームが見えなくなる問題

## タスク概要
Gizmoが表示されている状態でワイヤーフレームが見えなくなる。エディタの描画パイプラインにおける描画順序・renderTarget・depthバッファ管理の問題を調査・修正する。

## 全体の描画パイプライン

### engine.update() 内の Renderer.render() (Renderer/index.ts:444-725)
1. **deferred** → `gBuffer` (depth書き込みあり、clearあり)
2. deferred shading (PostProcess) → `shadingBuffer`
3. **forward** → `forwardBuffer` (gBuffer.depth共有、clearなし)
4. pipeline PostProcess
5. camera PostProcess
6. **blitFramebuffer**: backBuffer COLOR → `uiBuffer` にコピー（COLOR_BUFFER_BITのみ）
7. **ui** → `uiBuffer` (gBuffer.depth共有、clearなし)
8. **blitFramebuffer**: `uiBuffer` COLOR → `null`(デフォルトFB)にコピー（COLOR_BUFFER_BITのみ）

### Editor._animate() の後続描画 (Editor/index.ts:367-430)
engine.update()の後に以下が順に呼ばれる:
1. `helperManager.render()` → `uiBuffer` に描画（clearなし）★最近変更
2. `wireframeRenderer.render()` → `null`(デフォルトFB) に描画（clearなし）
3. `gizmoManager.render()` → `null`(デフォルトFB) に描画（clearなし）
4. `selectionOutline.render()` → selectionBuffer → outline PostProcess → null

## 根本原因

### デフォルトFBのdepthバッファがフレーム間でクリアされない問題

1. engine.update() の最後で `blitFramebuffer(uiBuffer → null, COLOR_BUFFER_BIT)` が実行される
   - **COLOR_BUFFER_BIT のみ** コピーされ、デフォルトFBの**depthバッファはクリアされない**
2. ワイヤーフレーム（depthTest=true, depthWrite=false）がデフォルトFBに描画される
3. Gizmo（depthTest=false, **depthWrite=true**）がデフォルトFBに描画される
   - depthTestしないので常に描画されるが、**depthバッファには書き込む**
4. 次フレームで再び blitFramebuffer(COLOR_BUFFER_BITのみ) → depthバッファはGizmoの値が残る
5. ワイヤーフレーム(depthTest=true) が前フレームのGizmo depthに遮られて描画されない

### 追加の問題: HelperManagerのrenderTarget変更

先の変更で HelperManager の renderTarget を `null` → `uiBuffer` に変更したが:
- uiBuffer に描画した後、デフォルトFBへの再blitは行われていない
- そのためHelperが画面に表示されなくなっている可能性がある

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| packages/orengine/ts/Editor/index.ts:367 | Editor._animate() | エディタの描画ループ、描画順序の制御 |
| packages/orengine/ts/Editor/GizmoManager/index.ts:49 | GizmoManager.render() | Gizmo描画（renderTarget=null） |
| packages/orengine/ts/Editor/WireframeRenderer/index.ts:46 | WireframeRenderer.render() | ワイヤーフレーム描画（renderTarget=null） |
| packages/orengine/ts/Editor/HelperManager/index.ts:72 | HelperManager.render() | Helper描画（renderTarget=uiBuffer ←変更済） |
| packages/orengine/ts/Editor/SelectionOutline/index.ts:47 | SelectionOutline.render() | 選択アウトライン描画 |
| packages/orengine/ts/Editor/Helpers/EntityHelper.ts:28 | EntityHelper | Helper マテリアル設定 |
| packages/maxpower/Component/Renderer/index.ts:444 | Renderer.render() | レンダリングパイプライン本体 |
| packages/maxpower/Component/Renderer/index.ts:727 | Renderer.renderCamera() | カメラ描画（FBバインドとclear） |
| packages/maxpower/Material/index.ts:50 | Material constructor | depthTest/depthWrite のデフォルト値 |
| packages/orengine/ts/Editor/Gizmo/TranslateGizmo/index.ts | TranslateGizmo._createAxis() | Gizmoマテリアル(depthTest=false, depthWrite=true) |
| packages/orengine/ts/Editor/Gizmo/RotateGizmo/index.ts | RotateGizmo._createRing() | 同上 |
| packages/orengine/ts/Editor/Gizmo/ScaleGizmo/index.ts | ScaleGizmo._createAxis() | 同上 |

## FBとdepthの共有関係 (Renderer.createRenderTarget: 339-375)

```
gBuffer         : 独自のdepthTexture（シーンの深度情報の源）
shadingBuffer   : depthバッファなし (disableDepthBuffer: true)
forwardBuffer   : gBuffer.depthTexture を共有 (356-357行目)
uiBuffer        : gBuffer.depthTexture を共有 (364-365行目)
デフォルトFB(null): WebGLが自動管理するdepth（シーンとは完全に独立）
```

## 各描画のdepth設定

| 描画 | renderTarget | depthTest | depthWrite | 問題 |
|------|-------------|-----------|------------|------|
| Gizmo shaft/head | null | false | **true**(暗黙デフォルト) | depthに書き込むが次フレームでクリアされない |
| Wireframe | null | true | false(明示) | 前フレームのGizmo depthに遮られる |
| Helper | uiBuffer(変更済) | true | true | uiBuffer→画面の再blitがない |
| SelectionOutline mask | selectionBuffer | - | - | 独立のため影響なし |
| SelectionOutline composite | null | - | - | PostProcessで上書き |

### depthWriteのデフォルト値に注意 (Material/index.ts:64)
```typescript
this.depthWrite = params.depthTest !== undefined ? params.depthTest : true;
```
`params.depthTest` が undefined の場合 depthWrite=true。Gizmoはコンストラクタ後に `mat.depthTest = false` を設定するが、コンストラクタ時の params には depthTest がないため **depthWrite は true のまま**。

## 解決の方向性

### 案1: デフォルトFBへの描画前にdepthをクリアする
blitFramebuffer後、エディタ描画の前にデフォルトFBのdepthをクリアする。
→ ワイヤーフレームやHelperのdepthTestも無意味になる（シーンのdepthがない）
→ ユーザーの要望（シーンオブジェクトに対するdepthTest）を満たせない

### 案2: エディタ描画をすべてuiBufferで行い最後にblitする
Helper、ワイヤーフレーム、Gizmo、アウトラインすべてを `uiBuffer` に描画し、最後にデフォルトFBにblitする。
→ gBuffer.depthTexture を共有しているので、シーンオブジェクトに対するdepthTestが効く
→ 描画順序の管理が統一的になる
→ Gizmoは depthWrite=false にして他の描画に影響を与えないようにする

### 案3: Gizmo の depthWrite を false にするだけ
Gizmoは常に最前面に描画したいのでdepthWrite=falseにする。
→ 他の描画に影響を与えなくなる
→ HelperのdepthTest問題は解決しない（renderTarget=null のまま → シーンdepthがない）

### 推奨: 案2（uiBuffer統一）
- すべてのエディタ描画を `uiBuffer` に統一（gBuffer.depthでシーンに対するdepthTestが効く）
- Gizmo は depthTest=false, depthWrite=false（常に最前面、他に影響なし）
- 最後にまとめて uiBuffer → デフォルトFB に blit
- Engine.render()の最後のblit(uiBuffer→null)は残し、_animate()最後に再度blitする

## 制約・注意点
- `uiBuffer` は `gBuffer.depthTexture` を共有しているため、ここに描画するものは**deferredで確定したシーンdepth**に対してdepthTestが効く
- engine.update() の最後で uiBuffer → null に blit されるが、エディタ描画後に再度 blit する必要がある
- SelectionOutline の outline PostProcess は renderTarget=null で画面直接描画している → uiBuffer に変更するか、最後の blit の後に実行する必要がある
- Renderer.render() 内で `gl.enable/disable(BLEND)` を管理しているため、外部からの renderCamera 呼び出し時のblend状態にも注意
- WireframeRendererのdepthWrite=falseは明示設定済みなので、uiBufferに統一すればdepthTestが正しく機能する
