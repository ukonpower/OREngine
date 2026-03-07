# Research: Claude Codeによるシーン作成のAPI改善・知識整理

## タスク概要
今回のシーン作成作業を振り返り、Claude CodeがREST API経由でOREngineのシーンをスムーズに作成できるよう、APIの改善点・不足しているAPI・ドキュメントの改善・知っておくべき知識を洗い出す。

---

## 今回の作業で発生した具体的な問題

### 問題1: geometry/typeの値がPascalCaseだと知らなかった
- `"plane"` `"sphere"` `"cylinder"` と小文字で設定 → 全てジオメトリが生成されなかった
- 正解は `"Cube"` `"Sphere"` `"Plane"` `"Cylinder"`（PascalCase）
- **原因**: ドキュメントにgeometry typeの有効な値リストがない。APIレスポンスにも選択肢が含まれない

### 問題2: テクスチャシェーダーで `vUv` が undeclared
- テクスチャ用フラグメントシェーダーで `vUv` を使おうとしたが、宣言されていなかった
- テクスチャシェーダーは `PostProcessPass` の `quad.vs` で描画され、`out vec2 vUv` を宣言している
- フラグメント側では `#include <frag_h>`（`in vec2 vUv` 含む）を使うか、明示的に `in vec2 vUv;` を宣言する必要がある
- **原因**: テクスチャ用シェーダーの書き方テンプレート・ドキュメントがない

### 問題3: 頂点シェーダーで `uCameraPosition` を使おうとした
- `uCameraPosition` は `#include <frag_h>` で宣言される（フラグメント専用）
- 頂点シェーダーには含まれない
- **原因**: どのuniformがどのシェーダーステージで使えるかのリファレンスがない

### 問題4: APIの1操作ごとに多数のHTTPリクエストが必要
- エンティティ作成 → Meshコンポーネント追加 → position設定 → scale設定 → euler設定 → geometry/type設定 → material/name設定 = **7リクエスト**
- 19エンティティ × 平均7リクエスト = **約130リクエスト**
- さらにMeshコンポーネントのUUID取得のためにGETが必要
- **原因**: バッチAPI・一括作成APIが存在しない

### 問題5: Meshコンポーネントのフィールド設定にコンポーネントUUIDが必要
- `POST /editor/field` の `targetUuid` はEntityではなくComponentのUUID
- コンポーネント追加 → エンティティ詳細GET（ComponentのUUID取得）→ フィールド設定
- **原因**: エンティティ+コンポーネント一括作成ができない

### 問題6: Lightコンポーネントのフィールド名・型が不明
- `color`, `intensity`, `angle`, `blend` 等のフィールド名と型を試行錯誤で特定
- **原因**: コンポーネントのフィールドスキーマをAPIで取得する手段がない

### 問題7: マテリアルconfig形式の知識不足
- uniform形式: `"uniforms/uName": value`
- sampler2Dの値: テクスチャ名（文字列）
- vec3の値: `[r, g, b]` 配列
- **原因**: マテリアルconfigのスキーマがドキュメントにない

---

## 関連ファイル・シンボル

### API実装
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `server/routes/editor.ts` | `editorRouter`, `handleAction()` | エディタREST API |
| `server/routes/components.ts` | `componentsRouter` | コンポーネントファイル管理 |
| `server/routes/materials.ts` | `materialsRouter` | マテリアルファイル管理 |
| `server/routes/shaders.ts` | `shadersRouter` | シェーダー管理 |
| `server/Project/EntityStore/index.ts` | `EntityStore` | オフラインエンティティ操作 |
| `server/Project/ProjectData/index.ts` | `ProjectData` | プロジェクトデータ管理 |

### エンジンコア
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Component/Mesh/index.ts` | `Mesh`, `_createGeometryWithParams()` | ジオメトリ/マテリアル管理 |
| `packages/maxpower/Material/index.ts` | `Material` | シェーダー/uniform管理 |
| `packages/maxpower/Component/Light/index.ts` | `Light` | ライトコンポーネント |
| `packages/maxpower/Component/Camera/index.ts` | `Camera` | カメラ |
| `packages/maxpower/Serializable/index.ts` | `Serializable` | フィールドシリアライズ基盤 |
| `packages/maxpower/Component/index.ts` | `Component` | コンポーネント基底 |
| `packages/maxpower/Utils/ShaderParser/index.ts` | `ShaderParser` | #include解決 |
| `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` | `MaterialResource` | uniform解析 |

---

## 改善提案

### A. バッチAPIの追加（最重要・最大効果）

#### A1. エンティティ一括作成 `POST /editor/entities`
```json
{
  "entities": [
    {
      "name": "Crystal1",
      "parentUuid": "0",
      "position": [4, 1.5, -2],
      "euler": [0, 0, 0.15],
      "scale": [0.6, 3.0, 0.6],
      "components": [
        {
          "componentName": "Mesh",
          "fields": {
            "geometry/type": "Cylinder",
            "geometry/radiusTop": 0.3,
            "geometry/radiusBottom": 0.8,
            "geometry/heightSegments": 16,
            "material/name": "CrystalPillar"
          }
        }
      ]
    }
  ]
}
```
**効果**: 19エンティティで約130リクエスト → 1リクエストに削減

#### A2. フィールド一括設定 `POST /editor/fields`
```json
{
  "fields": [
    { "targetUuid": "xxx", "path": "position", "value": [1,2,3] },
    { "targetUuid": "yyy", "path": "geometry/type", "value": "Sphere" }
  ]
}
```

### B. コンポーネントスキーマAPI

#### `GET /editor/components/:name/schema`
```json
{
  "name": "Mesh",
  "fields": {
    "geometry/type": { "type": "select", "options": ["", "Cube", "Sphere", "Plane", "Cylinder"], "default": "" },
    "geometry/width": { "type": "number", "default": 1, "step": 0.1 },
    "material/name": { "type": "select", "options": ["", "Default", ...], "default": "" }
  }
}
```
**効果**: フィールド名・型・有効値を事前取得可能。試行錯誤が不要に

### C. シェーダーテンプレート改善

#### 現状のテンプレート（最小限で役に立たない）
```glsl
void main() { gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 ); }
```

#### 提案: 用途別テンプレート
```json
POST /api/shaders
{ "name": "MyShader", "template": "mesh" }
// "mesh" | "texture" | "postprocess" | "minimal"
```

### D. ドキュメント追加

#### D1. `docs/shader-reference.md` の新設
- 頂点/フラグメントで使えるuniform一覧
- varying一覧、出力変数一覧
- #include可能なモジュール一覧と関数シグネチャ
- 用途別テンプレート（メッシュ用、テクスチャ用）

#### D2. `docs/component-fields.md` の新設
- 各コンポーネントのフィールドパス・型・有効値・デフォルト値

#### D3. 既存ドキュメント改善
- `docs/editor-rest-api.md`: geometry/type有効値、uniform形式明記
- `docs/resource-api.md`: .mat/.texの完全なスキーマ

### E. CLAUDE.mdへの追記（即効性が高い）

以下の知識をCLAUDE.mdに追記すれば、ドキュメント・API改修なしで改善可能:

1. geometry/type有効値: `"Cube"`, `"Sphere"`, `"Plane"`, `"Cylinder"` (PascalCase)
2. uniform型マッピング: float→number, vec3→[x,y,z], sampler2D→テクスチャ名
3. テクスチャシェーダー: `in vec2 vUv;` 明示宣言 or `#include <frag_h>` 使用
4. 頂点シェーダーで使えないuniform: `uCameraPosition`, `uResolution`
5. Lightフィールド: lightType, color, intensity, castShadow, angle, blend, distance, decay
6. Meshフィールド設定にはコンポーネントUUIDが必要
7. ComponentUpdateEventの主要フィールド: timeDelta, timeElapsed
8. コンポーネントのimport: `import * as GLP from 'glpower'` + `import * as MXP from 'maxpower'`

---

## 既存パターン参考

### Meshフィールドパス一覧
- `geometry/type`: `""` | `"Cube"` | `"Sphere"` | `"Plane"` | `"Cylinder"`
- `geometry/width`, `height`, `depth`: number (Cube)
- `geometry/radius`: number (Sphere)
- `geometry/widthSegments`, `heightSegments`: number (Sphere, Cylinder)
- `geometry/radiusTop`, `radiusBottom`: number (Cylinder)
- `geometry/caps`: boolean (Cylinder)
- `geometry/floor`: boolean (Plane)
- `material/name`: マテリアル名文字列

### Lightフィールドパス一覧
- `lightType`: `"directional"` | `"spot"` (default: "spot")
- `color`: [r, g, b] (default: [1,1,1])
- `intensity`: number (default: 1)
- `castShadow`: boolean (default: true)
- `angle`: number (spot, radians, default: π/2)
- `blend`: number (spot, default: 1)
- `distance`: number (spot, default: 30)
- `decay`: number (spot, default: 2)

### マテリアル .mat config形式
```json
{
  "vert": "ShaderName/vert",
  "frag": "ShaderName/frag",
  "phase": ["shadowMap", "deferred"],
  "drawType": "",
  "blending": "",
  "useLight": true,
  "depthTest": true,
  "depthWrite": true,
  "cullFace": false,
  "uniforms/uFloat": 0,
  "uniforms/uVec3": [1, 0, 0],
  "uniforms/uTexture": "textureName"
}
```

### テクスチャ .tex config形式
```json
{
  "frag": "ShaderName/frag",
  "resolution": [1024, 1024],
  "filter": "linear",
  "updateEveryFrame": false
}
```

### メッシュ用シェーダーテンプレート
```glsl
// index.vs
#include <common>
#include <vert_h>
void main( void ) {
    #include <vert_in>
    // outPos, outNormal, outUv を変更可能
    #include <vert_out>
}
// index.fs
#include <common>
#include <packing>
#include <frag_h>
void main( void ) {
    #include <frag_in>
    // outColor, outEmission, outRoughness, outMetalic, outEnv を設定
    #include <frag_out>
}
```

### テクスチャ用シェーダーテンプレート
```glsl
// index.fs のみ（index.vsは不要、quad.vsが自動使用される）
#include <common>
#include <frag_h>
layout (location = 0) out vec4 outColor;
void main( void ) {
    outColor = vec4( vUv, 0.0, 1.0 );
}
```

### フラグメント出力変数一覧（frag_inで初期化）
| 変数 | 型 | デフォルト | 説明 |
|------|-----|-----------|------|
| outColor | vec4 | (1,1,1,1) | ベースカラー |
| outNormal | vec3 | normalize(vNormal) | 法線 |
| outEmission | vec3 | (0,0,0) | エミッション |
| outRoughness | float | 0.5 | ラフネス |
| outMetalic | float | 0.0 | メタリック |
| outEnv | float | 1.0 | 環境マップ強度 |
| outPos | vec3 | vPos | ワールド位置 |
| outSSN | float | 0.0 | スクリーンスペース法線 |

### 利用可能なシェーダーモジュール
| モジュール | 主要関数 |
|-----------|---------|
| `<common>` | PI, sinn(), hsv2rgb(), easing系, sRGB変換 |
| `<noise_value>` | noiseValue(vec3), fbm(vec3) |
| `<noise_cyclic>` | noiseCyc(vec3) |
| `<rotate>` | rotate(float rad) → mat2 |
| `<sdf>` | sdSphere, sdBox, sdTorus, opSmoothAdd等 |
| `<random>` | random(vec2), hash(vec3) |
| `<packing>` | floatToRGBA, rgbaToFloat |
| `<pmrem>` | getPmrem(sampler2D, vec3, float) |
| `<uni_time>` | uTime, uTimeE, uTimeF, uTimeEF |

---

## 制約・注意点

- バッチAPIの実装にはブラウザファースト設計との整合が必要（WebSocket経由は逐次実行）
- コンポーネントスキーマAPIはブラウザ接続時のみ完全情報取得可能（`serializeToDirectory()`が必要）
- シェーダーテンプレートの変更は`server/routes/shaders.ts`で対応可能（変更箇所は限定的）
- geometry typeのバリデーションは現在Mesh側のswitch文のみ、API側にはない
