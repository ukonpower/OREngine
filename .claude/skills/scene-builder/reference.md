# Scene Builder API リファレンス

ベースURL: `http://localhost:3001/api`

## プロジェクト管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/projects` | プロジェクト一覧 | - |
| POST | `/projects` | プロジェクト作成 | `{ "name": "ProjectName" }` |
| DELETE | `/projects/:name` | プロジェクト削除 | - |
| PUT | `/projects/:name` | プロジェクト名変更 | `{ "newName": "NewName" }` |
| POST | `/projects/:name/duplicate` | プロジェクト複製 | `{ "newName": "CopyName" }` |

## シーン・エディタデータ（Raw JSON）

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/projects/:p/scene` | scene.json 取得 | - |
| POST | `/projects/:p/scene` | scene.json 上書き | JSONボディ全体 |
| GET | `/projects/:p/editor` | editor.json 取得（カメラ位置等） | - |
| POST | `/projects/:p/editor` | editor.json 上書き | JSONボディ全体 |

## シーン読み取り（Editor経由）

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/projects/:p/editor/scene` | シーンツリー取得 |
| GET | `/projects/:p/editor/entity/:uuid` | エンティティ詳細（コンポーネントfields含む） |
| GET | `/projects/:p/editor/search?q=name` | エンティティ名検索 |
| GET | `/projects/:p/editor/components` | 利用可能コンポーネント一覧（シーン内） |
| GET | `/projects/:p/editor/entity/:uuid/component/:name` | コンポーネント詳細（fieldsDirectory含む） |
| GET | `/projects/:p/editor/status` | ステータス（接続状態等） |
| GET | `/projects/:p/editor/resources` | リソース一覧（マテリアル・テクスチャ） |

## エンティティ操作

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| POST | `/projects/:p/editor/entity` | エンティティ作成 | `{ "parentUuid": "0", "name": "Name" }` |
| DELETE | `/projects/:p/editor/entity/:uuid` | エンティティ削除 | - |
| POST | `/projects/:p/editor/entity/:uuid/select` | エンティティ選択 | - |

- `parentUuid` を省略またはルートに追加する場合は `"0"` を指定

## コンポーネント操作

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| POST | `/projects/:p/editor/entity/:uuid/component` | コンポーネント追加 | `{ "componentName": "Mesh" }` |
| DELETE | `/projects/:p/editor/entity/:uuid/component/:name` | コンポーネント削除 | - |

## フィールド設定

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| POST | `/projects/:p/editor/field` | フィールド設定（単一） | `{ "targetUuid": "uuid", "path": "fieldPath", "value": val }` |

**Entityレベルのフィールド** (`targetUuid` = エンティティUUID):

| path | 型 | 例 |
|------|-----|-----|
| `name` | string | `"Floor"` |
| `position` / `pos` | number[3] | `[0, -0.5, 0]` |
| `euler` / `rotation` / `rot` | number[3] | `[-0.8, 0.5, 0]` |
| `scale` | number[3] | `[5, 1, 5]` |

**Componentレベルのフィールド** (`targetUuid` = コンポーネントUUID):

- `path` はコンポーネントの `props` キーと一致する（例: `"geometry/type"`, `"power"`）

## Undo/Redo

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/projects/:p/editor/undo` | 元に戻す（ブラウザ接続時のみ） |
| POST | `/projects/:p/editor/redo` | やり直す（ブラウザ接続時のみ） |

## バッチ操作

### エンティティ一括作成

```
POST /projects/:p/editor/entities
{
  "entities": [
    {
      "name": "EntityName",
      "parentUuid": "0",
      "position": [x, y, z],
      "euler": [rx, ry, rz],
      "scale": [sx, sy, sz],
      "components": [
        {
          "componentName": "Mesh",
          "fields": {
            "geometry/type": "Cube",
            "material/name": ""
          }
        }
      ]
    }
  ]
}
```

レスポンス:
```json
{
  "entities": [
    { "uuid": "new-uuid", "name": "EntityName", "components": [{ "uuid": "comp-uuid", "componentName": "Mesh" }] }
  ]
}
```

### フィールド一括設定

```
POST /projects/:p/editor/fields
{
  "fields": [
    { "targetUuid": "uuid", "path": "fieldPath", "value": val }
  ]
}
```

## セーブ

```
POST /projects/:p/editor/save
```

ブラウザ接続時はブラウザから最新状態を同期してから保存する。

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

## 利用可能なコンポーネント

| コンポーネント名 | 説明 | 主要フィールド |
|----------------|------|--------------|
| **Mesh** | メッシュ描画 | `geometry/type`, `geometry/width`, `geometry/height`, `geometry/depth`, `geometry/radius`, `geometry/widthSegments`, `geometry/heightSegments`, `geometry/floor`, `geometry/radiusTop`, `geometry/radiusBottom`, `geometry/caps`, `material/name` |
| **Light** | ライト | `fov`, `intensity` |
| **Camera** | カメラ（自動追加） | `fov`, `near`, `far` |
| **MainCamera** | メインカメラマーカー | - |
| **PostProcessPipeline** | ポストプロセス | `postprocess` (boolean[4]) |
| **ShakeViewer** | カメラ揺れ | `power`, `speed` |
| **LookAt** | 注視 | - |
| **SkyBox** | スカイボックス | - |
| **ObjectRotate** | 自動回転 | - |
| **OrbitControls** | オービットコントロール | - |
| **Bloom** | ブルーム | - |
| **Blur** | ブラー | - |
| **ColorGrading** | カラーグレーディング | - |
| **FXAA** | アンチエイリアス | - |
| **Glitch** | グリッチ | - |

### Mesh geometry/type の値

| 値 | 説明 |
|----|------|
| `"Cube"` | 立方体 |
| `"Sphere"` | 球体 |
| `"Plane"` | 平面 |
| `"Cylinder"` | 円柱 |

### material/name の値について

| 値 | 説明 |
|----|------|
| `""` | デフォルトマテリアル（None）- 基本的なグレーシェーディング |
| `"MaterialName"` | リソース登録済みの名前付きマテリアル |

名前付きマテリアルはプロジェクトリソースとして事前登録が必要。
バッチAPIで `"material/name": ""` を指定した場合はデフォルトマテリアルが適用される（正常動作）。
利用可能なマテリアル名は `GET /api/materials` または `GET /api/projects/:p/editor/resources` で確認できる。
