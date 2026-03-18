# Research: GIZMOレイキャストの位置ズレ修正

## タスク概要
GIZMOのマウス操作時にレイキャストの位置が大きくズレている。マウスカーソルの位置と実際のレイキャスト判定位置が一致しない問題を修正する。

## 根本原因

### `object-fit: contain` によるNDC計算のズレ

**核心的な問題**: `Canvas/index.module.scss` L13 で `object-fit: contain` が設定されている。

```scss
// packages/orengine/tsx/components/Canvas/index.module.scss
canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;  // ← これが原因
}
```

**問題の構造**:
1. キャンバスバッファサイズ: `_baseResolution` = `1920x1080`（16:9固定）
2. CSSコンテナサイズ: レイアウトにより可変（16:9とは限らない）
3. `object-fit: contain` により、キャンバス内容はアスペクト比を保持してコンテナ内に収まるように表示される
4. コンテナが16:9でない場合、レターボックス（上下余白）またはピラーボックス（左右余白）が発生
5. `getBoundingClientRect()` は余白を含む全CSS矩形を返す
6. NDC計算が余白を考慮していないため、座標がズレる

**具体例**: コンテナが800x800（1:1）の場合
- `object-fit: contain` により、実際の描画領域は800x450、上下に175pxの余白
- マウスY=175（描画領域の上端）→ 現在のNDC.y ≈ 0.56（本来は1.0）
- マウスY=625（描画領域の下端）→ 現在のNDC.y ≈ -0.56（本来は-1.0）

### NDC計算の現在の実装

```typescript
// packages/orengine/ts/Editor/PointerHandler/index.ts L47-55
const getNDC = ( e: PointerEvent ): GLP.Vector => {
    const rect = canvasElm.getBoundingClientRect();
    const x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
    const y = - ( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;
    return new GLP.Vector( x, y );
};
```

`rect.width / rect.height` はCSS矩形サイズであり、`object-fit: contain` によるレターボックスを含む。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/tsx/components/Canvas/index.module.scss` | `.container canvas` | `object-fit: contain` の設定場所 |
| `packages/orengine/ts/Editor/PointerHandler/index.ts` | `getNDC()`, `PointerHandler` | マウス座標→NDC変換、レイキャスト実行 |
| `packages/maxpower/Ray/index.ts` | `Ray.setFromCamera()`, `intersectAABB()` | NDC→ワールド座標レイ生成、AABB衝突判定 |
| `packages/maxpower/Raycaster/index.ts` | `Raycaster.setFromCamera()`, `intersectMesh()` | レイキャスト統合 |
| `packages/orengine/ts/Editor/EditorCamera/index.ts` | `EditorCamera.updateBeforeRender()` | カメラアスペクト比更新 |
| `packages/maxpower/Component/Camera/index.ts` | `Camera.updateProjectionMatrix()` | 投影行列生成 |
| `packages/orengine/ts/Editor/index.ts` | `Editor._resize()`, `_baseResolution` | レンダリング解像度管理 |
| `packages/orengine/ts/Editor/GizmoManager/index.ts` | `GizmoManager.render()` | ギズモ描画 |
| `packages/orengine/ts/Editor/Gizmo/TranslateGizmo/index.ts` | `_projectRayOnAxis()` | 軸投影計算 |
| `packages/orengine/ts/Editor/Gizmo/RotateGizmo/index.ts` | `_getAngleFromRay()` | 回転角計算 |
| `packages/orengine/ts/Editor/Gizmo/ScaleGizmo/index.ts` | `_getAxisProjection()` | スケール距離計算 |

## 依存関係

```
PointerHandler.getNDC()
  → Raycaster.setFromCamera(ndc, cameraEntity)
    → Camera.projectionMatrix (aspect = renderer.resolution.x / resolution.y)
    → Camera.viewMatrix
    → Ray.setFromCamera(ndc, projInv, viewInv)
  → Raycaster.intersectEntities()
    → intersectMesh() → Ray.intersectAABB()
  → Gizmo.startDrag() / updateDrag()
```

- `Camera.aspect` は `engine.renderer.resolution` （= `_baseResolution * _resolutionScale`）から計算
- `getNDC()` は `canvasElm.getBoundingClientRect()` から計算
- これら2つの座標系に不整合がある

## 修正方針

### 方針A: `getNDC()` で `object-fit: contain` のオフセットを補正する（推奨）

`getNDC()` 内で、キャンバスバッファのアスペクト比とCSS矩形のアスペクト比を比較し、実際の描画領域を計算してNDCを補正する。

```typescript
const getNDC = ( e: PointerEvent ): GLP.Vector => {
    const rect = canvasElm.getBoundingClientRect();
    const canvasAspect = canvasElm.width / canvasElm.height;  // バッファアスペクト比
    const rectAspect = rect.width / rect.height;              // CSS矩形アスペクト比

    let contentWidth = rect.width;
    let contentHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if ( rectAspect > canvasAspect ) {
        // ピラーボックス（左右に余白）
        contentWidth = rect.height * canvasAspect;
        offsetX = ( rect.width - contentWidth ) / 2;
    } else {
        // レターボックス（上下に余白）
        contentHeight = rect.width / canvasAspect;
        offsetY = ( rect.height - contentHeight ) / 2;
    }

    const x = ( ( e.clientX - rect.left - offsetX ) / contentWidth ) * 2 - 1;
    const y = - ( ( e.clientY - rect.top - offsetY ) / contentHeight ) * 2 + 1;

    return new GLP.Vector( x, y );
};
```

**メリット**: 変更が `getNDC()` 1箇所のみ。他のレイキャスト・ギズモコードに影響なし。

### 方針B: `object-fit: contain` を廃止し、JSでキャンバスサイズを制御する

CSS `object-fit: contain` を削除し、代わりにJavaScript側でキャンバス要素のCSS幅・高さを明示的にバッファのアスペクト比に合わせて設定する。

**メリット**: `getBoundingClientRect()` が常にバッファと同じアスペクト比になり、NDC計算が単純なまま。
**デメリット**: Canvasコンポーネントのリサイズ管理が複雑になる。ResizeObserver等が必要。

### 推奨: 方針A

変更が最小限で、既存のレイアウトシステムに影響を与えない。

## 制約・注意点

- `_baseResolution` はUIから変更可能（`resolutionDir.field("width", ...)` / `field("height", ...)`）
- `_resolutionScale` はUI上で `1`, `1/2`, `1/4` ... に変更可能だが、均一スケールなのでアスペクト比は変わらない
- `canvasElm.width / canvasElm.height` = `_baseResolution * _resolutionScale` であり、常にバッファの正確なアスペクト比
- ギズモの描画自体は `engine.renderer.renderCamera()` で行われ、投影行列を正しく使っているので描画位置は正しい（問題はレイキャスト側のみ）
- OrbitControlsも同じキャンバスを使うが、OrbitControlsはマウスの相対移動量を使うため `object-fit` の影響を受けにくい

## 座標変換パイプライン全体（正常動作を確認済みの箇所）

- `Ray.setFromCamera()`: NDC→ワールド座標変換 ✅（透視除算正しく実装）
- `Raycaster.intersectMesh()`: ワールド→ローカル変換、AABB判定 ✅
- `Camera.aspect` 更新: `engine.renderer.resolution` から毎フレーム ✅
- `Matrix.perspective()`: 標準的な透視投影行列 ✅
- ギズモの軸投影・回転角・スケール計算: 数学的に正しい ✅

問題は**入口の`getNDC()`のみ**。
