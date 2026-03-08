# ADR-006: GBufferレイアウトとDepth共有

## ステータス
承認済み

## コンテキスト
Deferredレンダリング（ADR-005）のGBufferに書き込むジオメトリ情報のレイアウトを決める必要がある。またForwardパスやUIパスがDeferredパスで書き込まれた深度情報に対して正しくdepth testを行う必要がある。

## 決定
GBufferは5テクスチャ構成とし、forwardBuffer・uiBufferはgBufferのdepthTextureを共有する。

GBufferレイアウト:
- textures[0]: Position XYZ + Emission.X (RGBA32F)
- textures[1]: Normal XYZ + Emission.Y (RGBA32F)
- textures[2]: Base Color XYZ (RGBA8)
- textures[3]: Roughness, Metallic, SSN, EnvMapIntensity (RGBA8)
- textures[4]: Velocity XY + Emission.Z (RGBA32F)

## 理由
- Emissionを3テクスチャに分散しているのは、既存のテクスチャのアルファチャンネル（W成分）を有効活用するため。Emission専用テクスチャを追加するよりMRT数を抑えられる
- Position・Normal・VelocityはRGBA32F（高精度）、BaseColor・マテリアルパラメータはRGBA8（精度不要）で帯域を節約
- depth共有により、ForwardパスのオブジェクトがDeferredパスで描画済みのオブジェクトに対して正しく遮蔽される。UIパスも同様にシーン深度に対するdepth testが機能する
- shadingBufferはdepthなし（disableDepthBuffer: true）。ライティング計算はフルスクリーンパスで行うためdepth testは不要

## 結果
- ForwardパスとUIパスはgBufferの深度を参照するため、Deferredパスの後に実行する必要がある（描画順序の制約）
- エディタのヘルパー・ギズモ・ワイヤーフレーム描画もuiBufferで行い、gBuffer.depthを共有してシーン深度に対する遮蔽が効く
- GizmoはdepthTest=false, depthWrite=falseで常に最前面に描画される（例外）

## 関連コード
- `packages/maxpower/Component/Renderer/index.ts` - createRenderTarget()（FBO構成）、render()（depth共有設定）
- `packages/maxpower/Component/Renderer/ShaderParser/shaderModules/frag_out.module.glsl` - GBufferパッキング
