# リソース管理 API リファレンス

ベースURL: `http://localhost:3001/api`

## マテリアル管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/materials` | マテリアル一覧 | - |
| POST | `/materials` | マテリアル作成 | `{ "name": "MatName" }` |
| GET | `/materials/:name` | マテリアル詳細取得 | - |
| PUT | `/materials/:name` | マテリアル更新 | `{ ...config }` |
| DELETE | `/materials/:name` | マテリアル削除 | - |
| GET | `/materials/:name/filepath` | ファイル絶対パス取得 | - |
| POST | `/materials/sync` | 同期（不要ファイル削除） | `{ "names": ["Mat1"] }` |

### マテリアル設定フィールド

```json
{
  "name": "MyMaterial",
  "vert": "ShaderName/vert",
  "frag": "ShaderName/frag",
  "phase": ["shadowMap", "deferred"],
  "drawType": "",
  "blending": "",
  "useLight": true,
  "depthTest": true,
  "depthWrite": true,
  "cullFace": false
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `vert` | string | 頂点シェーダー参照（空文字=基本シェーダー） |
| `frag` | string | フラグメントシェーダー参照（空文字=基本シェーダー） |
| `phase` | string[] | レンダリングフェーズ: `"shadowMap"`, `"deferred"`, `"forward"` |
| `drawType` | string | `""`, `"TRIANGLES"`, `"LINES"`, `"POINTS"` |
| `blending` | string | `""`, `"NORMAL"`, `"ADD"`, `"DIFF"` |
| `useLight` | boolean | ライト計算の有効化 |
| `depthTest` | boolean | 深度テスト |
| `depthWrite` | boolean | 深度書き込み |
| `cullFace` | boolean | カリング |

## シェーダー管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/shaders` | シェーダー一覧 | - |
| POST | `/shaders` | シェーダー作成 | `{ "name": "ShaderName", "template": "mesh" }` |
| DELETE | `/shaders/:name` | シェーダー削除 | - |
| GET | `/shaders/:name/filepath` | ディレクトリ絶対パス取得 | - |

### template の値

| 値 | 説明 |
|----|------|
| `"mesh"` | メッシュ用シェーダー（vert_h/frag_h include付き） |
| `"texture"` | テクスチャ用シェーダー（vUv利用） |
| 省略/その他 | 最小テンプレート |

シェーダー作成後のGLSLコード編集は `shader-guide.md` を参照。

## テクスチャ管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/textures` | テクスチャ一覧 | - |
| POST | `/textures` | テクスチャ作成 | `{ "name": "TexName" }` |
| GET | `/textures/:name` | テクスチャ詳細取得 | - |
| PUT | `/textures/:name` | テクスチャ更新 | `{ ...config }` |
| DELETE | `/textures/:name` | テクスチャ削除 | - |
| GET | `/textures/:name/filepath` | ファイル絶対パス取得 | - |
| POST | `/textures/sync` | 同期（不要ファイル削除） | `{ "names": ["Tex1"] }` |

## Editor経由のリソース操作（ブラウザ連携）

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/projects/:p/editor/resources` | リソース一覧 ⚠️ ブラウザ接続時のみ動作 |
| POST | `/projects/:p/editor/materials` | マテリアル作成（Editor経由） |
| GET/PUT/DELETE | `/projects/:p/editor/materials/:name` | マテリアル操作（Editor経由） |
| POST | `/projects/:p/editor/textures` | テクスチャ作成（Editor経由） |
| GET/PUT/DELETE | `/projects/:p/editor/textures/:name` | テクスチャ操作（Editor経由） |
