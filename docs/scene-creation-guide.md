# シーン作成ガイド（REST API経由）

REST API経由でシーンを構築する際の実用リファレンス。

## エンティティのバッチ作成
`POST /api/projects/{name}/editor/entities` でエンティティ・コンポーネント・フィールドを一括作成可能。transform（position/euler/scale）とコンポーネント（fields含む）を1リクエストで指定できる。

## Meshコンポーネント
- `geometry/type`: `"Cube"` | `"Sphere"` | `"Plane"` | `"Cylinder"` (**PascalCase必須**)
- `material/name`: マテリアル名（文字列）
- フィールド設定には**コンポーネントUUID**（エンティティUUIDではない）が必要。バッチAPIではこの区別は不要

## Lightコンポーネント
- `lightType`: `"spot"` (default) | `"directional"`
- `color`: [r, g, b]、`intensity`: number、`castShadow`: boolean
- spot専用: `angle`(rad), `blend`, `distance`, `decay`

## マテリアル (.mat) config
- uniform形式: `"uniforms/uName": value`
- 型: float→number, vec2→[x,y], vec3→[x,y,z], vec4→[x,y,z,w], sampler2D→テクスチャ名(string)
- phase: `["shadowMap", "deferred"]` が標準。forward描画は `["forward"]`

## シェーダー作成
- `POST /api/shaders` に `"template": "mesh"` でメッシュ用テンプレート生成
- `"template": "texture"` でテクスチャ用テンプレート生成
- 頂点で使えないuniform: `uCameraPosition`, `uResolution`（frag_h専用）
- テクスチャ用FSには `in vec2 vUv;` を明示宣言するか `#include <frag_h>` を使用
- シェーダーモジュール: GLSLソース `packages/maxpower/Component/Renderer/ShaderParser/shaderModules/` を参照

## コンポーネント作成
- `import * as GLP from 'glpower'` + `import * as MXP from 'maxpower'`
- `ComponentUpdateEvent`: `timeDelta`（秒）, `timeElapsed`（累積秒）, `playing`, `renderer`, `resolution` 等
