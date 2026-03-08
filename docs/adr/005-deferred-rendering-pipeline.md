# ADR-005: Deferredレンダリングパイプライン

## ステータス
承認済み

## コンテキスト
3Dシーンのレンダリングにおいて、複数のライト・シャドウ・ポストプロセスエフェクトを効率的に処理する必要がある。また透過オブジェクト・UIレイヤーも混在するシーンを扱う。

## 決定
Deferred + Forward混合パイプラインを採用する。描画順序: shadowMap → envMap → deferred（GBuffer） → deferred shading → forward → pipeline postprocess → camera postprocess → UI → 画面出力。

## 理由
- Deferredレンダリングにより、ライト数に依存しないシェーディングが可能（GBufferにジオメトリ情報を書き込み、後からライティング計算）
- 透過オブジェクトはDeferredでは扱えないため、Forwardパスを併用する
- UIレイヤーは最後に描画し、ポストプロセス（モーションブラー等）の影響を受けないようにする
- 各フェーズをmaterial.phaseで制御することで、オブジェクトごとに描画パスを柔軟に選択できる

## 結果
- マテリアルのphaseフィールド（`["shadowMap", "deferred"]`等）で描画パスを指定する設計
- シェーダーにIS_DEFERRED / IS_FORWARD / IS_DEPTHのdefineが自動追加され、パスごとの分岐が可能
- PostProcessPassチェーンによりSSR、モーションブラー、DOF等のスクリーンスペースエフェクトを順次適用

## 関連コード
- `packages/maxpower/Component/Renderer/index.ts` - Renderer.render()（描画ループ本体）
- `packages/maxpower/Component/Material/index.ts` - Material.visibilityFlag（フェーズ制御）
- `packages/maxpower/Component/PostProcess/index.ts` - PostProcess / PostProcessPass
