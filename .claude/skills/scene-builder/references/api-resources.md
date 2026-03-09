# リソース管理 API リファレンス

ベースURL: `http://localhost:3001/api`

## マテリアル管理（Editor経由 - ブラウザ連携）

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/projects/:p/editor/resources` | リソース一覧（マテリアル・テクスチャ） | - |
| POST | `/projects/:p/editor/materials` | マテリアル作成 | `{ "name": "MatName", "config": {} }` |
| GET | `/projects/:p/editor/materials/:name` | マテリアル詳細取得 | - |
| PUT | `/projects/:p/editor/materials/:name` | マテリアル更新 | `{ ...config }` |
| DELETE | `/projects/:p/editor/materials/:name` | マテリアル削除 | - |

## テクスチャ管理（Editor経由 - ブラウザ連携）

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| POST | `/projects/:p/editor/textures` | テクスチャ作成 | `{ "name": "TexName", "config": {} }` |
| GET | `/projects/:p/editor/textures/:name` | テクスチャ詳細取得 | - |
| PUT | `/projects/:p/editor/textures/:name` | テクスチャ更新 | `{ ...config }` |
| DELETE | `/projects/:p/editor/textures/:name` | テクスチャ削除 | - |

## マテリアルファイル管理（ファイルシステム直接）

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/materials` | マテリアル一覧（.matファイル走査） | - |
| POST | `/materials` | マテリアルファイル作成 | `{ "name": "MatName", ...config }` |
| GET | `/materials/:name` | マテリアルファイル取得 | - |
| PUT | `/materials/:name` | マテリアルファイル更新 | `{ ...config }` |
| DELETE | `/materials/:name` | マテリアルファイル削除 | - |
| GET | `/materials/:name/filepath` | マテリアルファイル絶対パス取得 | - |
| POST | `/materials/sync` | マテリアル同期（不要ファイル削除） | `{ "names": ["Mat1", "Mat2"] }` |

## テクスチャファイル管理（ファイルシステム直接）

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/textures` | テクスチャ一覧（.texファイル走査） | - |
| POST | `/textures` | テクスチャファイル作成 | `{ "name": "TexName", ...config }` |
| GET | `/textures/:name` | テクスチャファイル取得 | - |
| PUT | `/textures/:name` | テクスチャファイル更新 | `{ ...config }` |
| DELETE | `/textures/:name` | テクスチャファイル削除 | - |
| GET | `/textures/:name/filepath` | テクスチャファイル絶対パス取得 | - |
| POST | `/textures/sync` | テクスチャ同期（不要ファイル削除） | `{ "names": ["Tex1", "Tex2"] }` |

## シェーダー管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/shaders` | シェーダー一覧 | - |
| POST | `/shaders` | シェーダー作成 | `{ "name": "ShaderName", "template": "mesh" }` |
| DELETE | `/shaders/:name` | シェーダー削除 | - |
| GET | `/shaders/:name/filepath` | シェーダーディレクトリ絶対パス取得 | - |

シェーダー `template` の値:

| 値 | 説明 |
|----|------|
| `"mesh"` | メッシュ用シェーダー（vert_h/frag_h include付き） |
| `"texture"` | テクスチャ用シェーダー（vUv利用） |
| 省略/その他 | 最小テンプレート |

## コンポーネントリソース管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/components` | コンポーネントツリー一覧（ファイルシステム走査） | - |
| POST | `/components` | コンポーネント作成（テンプレート生成） | `{ "componentName": "MyComp", "dirPath": "SubDir" }` |
| DELETE | `/components/:path` | コンポーネント削除 | - |
| GET | `/components/:path/filepath` | コンポーネントファイル絶対パス取得 | - |
