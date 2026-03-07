# OREngine シェーダーリファレンス

シェーダー開発に必要なuniform、varying、出力変数、モジュールの完全リファレンス。

## シェーダーファイル構成

```
src/ts/Resources/Shaders/{ShaderName}/
  index.vs    # 頂点シェーダー
  index.fs    # フラグメントシェーダー
```

リソース参照名: `"{ShaderName}/vert"`, `"{ShaderName}/frag"`

## 用途別テンプレート

### メッシュ用シェーダー

`POST /api/shaders` に `"template": "mesh"` で自動生成。

**頂点シェーダー (index.vs):**
```glsl
#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	// outPos, outNormal, outUv を変更可能

	#include <vert_out>

}
```

**フラグメントシェーダー (index.fs):**
```glsl
#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	// outColor, outEmission, outRoughness 等を設定

	#include <frag_out>

}
```

### テクスチャ用シェーダー（プロシージャルテクスチャ）

`POST /api/shaders` に `"template": "texture"` で自動生成。
フラグメントシェーダーのみ記述する（頂点はエンジン内蔵の `quad.vs` が使用される）。

**フラグメントシェーダー (index.fs):**
```glsl
#include <common>
#include <frag_h>

layout ( location = 0 ) out vec4 outColor;

void main( void ) {

	// vUv は frag_h で宣言される (0.0〜1.0)
	outColor = vec4( vUv, 0.0, 1.0 );

}
```

> **注意**: `#include <frag_h>` を使わない場合は `in vec2 vUv;` を明示宣言する必要がある。

---

## Uniform 一覧

### 頂点シェーダー（`#include <vert_h>` で宣言）

| Uniform | 型 | 説明 |
|---------|-----|------|
| `uModelMatrix` | mat4 | モデル変換行列 |
| `uViewMatrix` | mat4 | ビュー行列 |
| `uProjectionMatrix` | mat4 | プロジェクション行列 |
| `uNormalMatrix` | mat4 | 法線変換行列 |
| `uModelMatrixPrev` | mat4 | 前フレームのモデル行列 |
| `uModelViewMatrix` | mat4 | モデル×ビュー行列 |
| `uViewMatrixPrev` | mat4 | 前フレームのビュー行列 |
| `uProjectionMatrixPrev` | mat4 | 前フレームのプロジェクション行列 |

### フラグメントシェーダー（`#include <frag_h>` で宣言）

上記全てに加えて:

| Uniform | 型 | 説明 |
|---------|-----|------|
| `uModelMatrixInverse` | mat4 | モデル行列の逆行列 |
| `uCameraPosition` | vec3 | カメラのワールド座標 |
| `uResolution` | vec2 | スクリーン解像度 |

**IS_DEPTH 定義時:**

| Uniform | 型 | 説明 |
|---------|-----|------|
| `uCameraNear` | float | カメラのニアクリップ |
| `uCameraFar` | float | カメラのファークリップ |

**IS_FORWARD 定義時:**

| Uniform | 型 | 説明 |
|---------|-----|------|
| `uDeferredTexture` | sampler2D | ディファードレンダリング結果 |
| `uDeferredResolution` | vec2 | ディファード解像度 |

### 時間 Uniform（`#include <uni_time>` で宣言）

| Uniform | 型 | 説明 |
|---------|-----|------|
| `uTime` | float | 経過時間（秒） |
| `uTimeF` | float | 経過時間（フレーム） |
| `uTimeE` | float | エディタ同期時間（秒） |
| `uTimeEF` | float | エディタ同期時間（フレーム） |

> **注意**: `uCameraPosition`, `uResolution` は頂点シェーダーでは使用不可（`frag_h` 専用）。

---

## Varying 一覧

`#include <vert_h>` / `#include <frag_h>` で宣言される。

| Varying | 型 | 説明 |
|---------|-----|------|
| `vUv` | vec2 | UV座標 |
| `vNormal` | vec3 | ワールド空間法線 |
| `vViewNormal` | vec3 | ビュー空間法線 |
| `vPos` | vec3 | ワールド空間位置 |
| `vMVPosition` | vec3 | モデルビュー位置 |
| `vMVPPosition` | vec3 | スクリーン空間位置 |
| `vVelocity` | vec2 | モーションベクトル |

---

## フラグメント出力変数

`#include <frag_in>` で初期化される変数。`#include <frag_out>` でG-Bufferにパッキングされる。

| 変数 | 型 | デフォルト | 説明 |
|------|-----|-----------|------|
| `outColor` | vec4 | `(1, 1, 1, 1)` | ベースカラー（アルベド） |
| `outNormal` | vec3 | `normalize(vNormal)` | サーフェス法線 |
| `outNormalMap` | vec3 | `(0, 0, 0)` | ノーマルマップ出力 |
| `outEmission` | vec3 | `(0, 0, 0)` | エミッション（発光） |
| `outRoughness` | float | `0.5` | PBRラフネス |
| `outMetalic` | float | `0.0` | PBRメタリック |
| `outEnv` | float | `1.0` | 環境マップ強度 |
| `outPos` | vec3 | `vPos` | ワールド位置出力 |
| `outSSN` | float | `0.0` | スクリーンスペース法線 |

---

## 頂点入力変数

`#include <vert_in>` で初期化される変数。

| 変数 | 型 | ソース | 説明 |
|------|-----|--------|------|
| `outPos` | vec3 | `position` attribute | 頂点位置（変更可能） |
| `outNormal` | vec3 | `normal` attribute | 頂点法線（変更可能） |
| `outUv` | vec2 | `uv` attribute | UV座標（変更可能） |

---

## G-Buffer レイアウト（ディファードレンダリング）

`#include <frag_out>` が出力するG-Bufferの構成:

| ターゲット | 内容 |
|-----------|------|
| `outColor0` | Position XYZ + Emission.X |
| `outColor1` | Normal XYZ + Emission.Y |
| `outColor2` | Base Color XYZ |
| `outColor3` | Roughness, Metallic, SSN, EnvMapIntensity |
| `outColor4` | Velocity XY + Emission.Z |

---

## #include モジュール一覧

### パーツ（シェーダーパイプライン）

| モジュール | 用途 |
|-----------|------|
| `<vert_h>` | 頂点ヘッダー（uniform/varying宣言） |
| `<vert_in>` | 頂点入力初期化 |
| `<vert_out>` | 頂点出力（MVP変換） |
| `<frag_h>` | フラグメントヘッダー（uniform/レイアウト宣言） |
| `<frag_in>` | フラグメント出力変数初期化 |
| `<frag_out>` | G-Bufferへのパッキング出力 |
| `<uni_time>` | 時間uniform挿入 |

### ユーティリティモジュール

| モジュール | 主要関数 |
|-----------|---------|
| `<common>` | `PI`, `TPI`, `sinn(x)`, `linearstep(e0,e1,x)`, `easeInOut(x)`, `easeOut(t,k)`, `hsv2rgb(hsv)`, `srgbToLinear(c)`, `linearToSrgb(c)` |
| `<noise_value>` | `noiseValue(vec3)` → float, `fbm(vec3)` → float |
| `<noise_cyclic>` | `noiseCyc(vec3)` → vec3 |
| `<noise_simplex>` | simplex noise |
| `<rotate>` | `rotate(float rad)` → mat2 |
| `<sdf>` | `sdSphere(p,s)`, `sdBox(p,b)`, `sdTorus(p,t)`, `sdCappedCylinder(p,h,r)`, `sdPyramid(p,h)`, `opSmoothAdd(d1,d2,k)`, `opSmoothSub(d1,d2,k)`, `pmod(p,n)` |
| `<random>` | `random(vec2)` → float, `hash(vec3)` → vec3 |
| `<packing>` | `floatToRGBA(float)` → vec4, `rgbaToFloat(vec4)` → float |
| `<pmrem>` | `getPmrem(sampler2D, vec3 dir, float roughness)` → vec3 |
| `<light>` | ライティング構造体・PBR計算関数 |

### レイマーチング

| モジュール | 用途 |
|-----------|------|
| `<rm_h>` | レイマーチヘッダー |
| `<rm_normal>` | 法線計算 |
| `<rm_ray_obj>` | オブジェクト空間レイ |
| `<rm_ray_world>` | ワールド空間レイ |
| `<rm_out_obj>` | オブジェクト空間出力 |
