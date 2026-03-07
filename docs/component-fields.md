# OREngine コンポーネントフィールド一覧

REST API でフィールドを設定する際のパス・型・有効値リファレンス。

`POST /api/projects/{name}/editor/field` の `path` と `value` に使用する。
`targetUuid` はコンポーネントのUUID（エンティティUUIDではない）。

---

## Mesh

| フィールドパス | 型 | デフォルト | 説明 |
|--------------|-----|-----------|------|
| `geometry/type` | string (select) | `""` | ジオメトリタイプ |
| `geometry/width` | number | 1 | 幅（Cube, Plane） |
| `geometry/height` | number | 1 | 高さ（Cube, Cylinder） |
| `geometry/depth` | number | 1 | 奥行き（Cube） |
| `geometry/radius` | number | 0.5 | 半径（Sphere） |
| `geometry/widthSegments` | number | 8 | 横分割数（Sphere, Cylinder） |
| `geometry/heightSegments` | number | 8 | 縦分割数（Sphere, Cylinder） |
| `geometry/radiusTop` | number | 1 | 上面半径（Cylinder） |
| `geometry/radiusBottom` | number | 1 | 下面半径（Cylinder） |
| `geometry/caps` | boolean | true | キャップの有無（Cylinder） |
| `geometry/floor` | boolean | false | 床面モード（Plane） |
| `material/name` | string (select) | `""` | マテリアル名 |

### geometry/type 有効値

| 値 | 説明 | 使用パラメータ |
|-----|------|--------------|
| `""` | なし | - |
| `"Cube"` | 直方体 | width, height, depth |
| `"Sphere"` | 球体 | radius, widthSegments, heightSegments |
| `"Plane"` | 平面 | width, height, floor |
| `"Cylinder"` | 円柱 | height, radiusTop, radiusBottom, widthSegments, heightSegments, caps |

> **注意**: 値は **PascalCase** 必須。`"cube"` や `"sphere"` は無効。

---

## Light

`Light` は `ShadowMapCamera` → `Camera` を継承。

| フィールドパス | 型 | デフォルト | 説明 |
|--------------|-----|-----------|------|
| `lightType` | string (select) | `"spot"` | ライトタイプ |
| `color` | number[3] | `[1, 1, 1]` | ライト色 (RGB) |
| `intensity` | number | 1 | 明るさ |
| `castShadow` | boolean | true | シャドウキャスト |
| `angle` | number | π/2 (≈1.5708) | スポットライト角度（ラジアン） |
| `blend` | number | 1 | スポットライトエッジ柔らかさ |
| `distance` | number | 30 | スポットライト最大距離 |
| `decay` | number | 2 | 距離減衰指数 |

### lightType 有効値

| 値 | 説明 |
|-----|------|
| `"spot"` | スポットライト（デフォルト） |
| `"directional"` | ディレクショナルライト |

---

## Camera

| フィールドパス | 型 | デフォルト | 説明 |
|--------------|-----|-----------|------|
| `cameraType` | string | `"perspective"` | カメラタイプ |
| `fov` | number | 50 | 視野角（度、perspective時） |
| `near` | number | 0.1 | ニアクリップ |
| `far` | number | 1000 | ファークリップ |
| `aspect` | number | 1.0 | アスペクト比 |
| `orthWidth` | number | 1 | 正投影の幅 |
| `orthHeight` | number | 1 | 正投影の高さ |

---

## Entity（transform）

エンティティのtransformはエンティティUUIDに対して設定する（コンポーネントUUIDではない）。

| フィールドパス | 型 | デフォルト | 説明 |
|--------------|-----|-----------|------|
| `name` | string | `"New Entity"` | エンティティ名 |
| `position` | number[3] | `[0, 0, 0]` | ワールド位置 [x, y, z] |
| `euler` | number[3] | `[0, 0, 0]` | オイラー角（ラジアン） [x, y, z] |
| `scale` | number[3] | `[1, 1, 1]` | スケール [x, y, z] |

> エイリアス: `pos` = `position`, `rot` / `rotation` = `euler`

---

## マテリアル (.mat) config

`POST /api/projects/{name}/editor/materials` や `PUT /api/projects/{name}/editor/materials/{name}` で使用。

| フィールド | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `vert` | string | `""` | 頂点シェーダー名（例: `"MyShader/vert"`） |
| `frag` | string | `""` | フラグメントシェーダー名（例: `"MyShader/frag"`） |
| `phase` | string[] | `["shadowMap", "deferred"]` | レンダーフェーズ |
| `drawType` | string | `""` | 描画タイプ（`""`, `"TRIANGLES"`, `"LINES"`, `"POINTS"`） |
| `blending` | string | `""` | ブレンディング（`""`, `"NORMAL"`, `"ADD"`, `"DIFF"`） |
| `useLight` | boolean | true | ライティング使用 |
| `depthTest` | boolean | true | 深度テスト |
| `depthWrite` | boolean | true | 深度書き込み |
| `cullFace` | boolean | false | 背面カリング |
| `uniforms/{name}` | any | - | カスタムuniform値 |

### phase 有効値

`"shadowMap"`, `"deferred"`, `"forward"`, `"envMap"`, `"ui"`

### uniform 型マッピング

| GLSL型 | JSON値の形式 | 例 |
|--------|------------|-----|
| `float` | number | `0.5` |
| `int` | number | `1` |
| `vec2` | number[2] | `[1.0, 0.5]` |
| `vec3` | number[3] | `[1.0, 0.0, 0.5]` |
| `vec4` | number[4] | `[1.0, 0.0, 0.5, 1.0]` |
| `sampler2D` | string（テクスチャ名） | `"noise"` |

---

## テクスチャ (.tex) config

| フィールド | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `frag` | string | - | フラグメントシェーダー名（例: `"Noise/frag"`） |
| `resolution` | number[2] | `[1024, 1024]` | テクスチャ解像度 |
| `filter` | string | `"linear"` | フィルター（`"linear"` / `"nearest"`） |
| `updateEveryFrame` | boolean | false | 毎フレーム再レンダリング |
