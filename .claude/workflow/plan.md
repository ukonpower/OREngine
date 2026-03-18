# Plan: GIZMOレイキャストの位置ズレ修正

## 概要
`object-fit: contain` によるレターボックス/ピラーボックスの余白を `getNDC()` が考慮していないため、マウス座標→NDC変換がズレている。`getNDC()` にキャンバスバッファのアスペクト比補正を追加して修正する。

## 実装ステップ

### 1. `getNDC()` に `object-fit: contain` のオフセット補正を追加

- **対象ファイル**: `packages/orengine/ts/Editor/PointerHandler/index.ts`
- **変更内容**: `getNDC()` 関数（L47-55）で、`canvasElm.width/height`（バッファサイズ）と `rect.width/height`（CSS矩形サイズ）のアスペクト比を比較し、`object-fit: contain` による余白オフセットを差し引いてからNDC座標を計算する。
- **コードスニペット**:
  ```typescript
  const getNDC = ( e: PointerEvent ): GLP.Vector => {

      const rect = canvasElm.getBoundingClientRect();
      const canvasAspect = canvasElm.width / canvasElm.height;
      const rectAspect = rect.width / rect.height;

      let contentWidth = rect.width;
      let contentHeight = rect.height;
      let offsetX = 0;
      let offsetY = 0;

      if ( rectAspect > canvasAspect ) {

          contentWidth = rect.height * canvasAspect;
          offsetX = ( rect.width - contentWidth ) / 2;

      } else {

          contentHeight = rect.width / canvasAspect;
          offsetY = ( rect.height - contentHeight ) / 2;

      }

      const x = ( ( e.clientX - rect.left - offsetX ) / contentWidth ) * 2 - 1;
      const y = - ( ( e.clientY - rect.top - offsetY ) / contentHeight ) * 2 + 1;

      return new GLP.Vector( x, y );

  };
  ```
- **注意点**: `canvasElm.width / canvasElm.height` は `_baseResolution * _resolutionScale` と同じアスペクト比。均一スケールなのでアスペクト比は不変。

## 変更対象ファイル一覧
- [x] `packages/orengine/ts/Editor/PointerHandler/index.ts` - `getNDC()` に `object-fit: contain` 補正を追加

## 考慮事項・リスク
- **余白領域でのクリック**: NDC が [-1, 1] の範囲外になるが、レイキャストは正しく「ヒットなし」を返すため問題ない
- **OrbitControls への影響**: マウスの相対移動量を使うため、この変更の影響を受けない

## テスト方針
- エディタを起動し、Screenパネルのアスペクト比を16:9以外にリサイズ
- Translate/Rotate/Scale 各ギズモの軸をクリック・ドラッグし、カーソル位置と一致することを確認
- シーン上のオブジェクトのクリック選択がカーソル位置と一致することを確認
- `resolutionScale` を 1/2, 1/4 に変更してもズレがないことを確認
