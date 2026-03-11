# シーン操作 API リファレンス

ベースURL: `http://localhost:3001/api`

## プロジェクト管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/projects` | プロジェクト一覧 | - |
| POST | `/projects` | プロジェクト作成 | `{ "name": "ProjectName" }` |
| DELETE | `/projects/:name` | プロジェクト削除 | - |
| PUT | `/projects/:name` | プロジェクト名変更 | `{ "newName": "NewName" }` |
| POST | `/projects/:name/duplicate` | プロジェクト複製 | `{ "newName": "CopyName" }` |

## シーン読み取り

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

`parentUuid` を省略またはルートに追加する場合は `"0"` を指定。

## コンポーネント操作

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| POST | `/projects/:p/editor/entity/:uuid/component` | コンポーネント追加 | `{ "componentName": "Mesh" }` |
| DELETE | `/projects/:p/editor/entity/:uuid/component/:name` | コンポーネント削除 | - |

## フィールド設定

### 単一フィールド

```
POST /projects/:p/editor/field
{ "targetUuid": "uuid", "path": "fieldPath", "value": val }
```

### バッチフィールド

```
POST /projects/:p/editor/fields
{
  "fields": [
    { "targetUuid": "uuid", "path": "fieldPath", "value": val }
  ]
}
```

**Entityレベルのフィールド** (`targetUuid` = エンティティUUID):

| path | 型 | 例 |
|------|-----|-----|
| `name` | string | `"Floor"` |
| `position` / `pos` | number[3] | `[0, -0.5, 0]` |
| `euler` / `rotation` / `rot` | number[3] | `[-0.8, 0.5, 0]` |
| `scale` | number[3] | `[5, 1, 5]` |

**Componentレベルのフィールド** (`targetUuid` = コンポーネントUUID):

`path` はコンポーネントの `props` キーと一致する（例: `"geometry/type"`, `"power"`）。

## バッチ エンティティ作成

> ⚠️ コンポーネント指定は **`componentName`** を使うこと。`name` は無効（silent失敗）。

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

## オブジェクトコントロール

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| POST | `/projects/:p/editor/entity/:uuid/lookAt` | エンティティを指定座標に向ける | `{ "target": [x, y, z] }` |

## シェーダーエラー確認

```
GET /projects/:p/editor/shader-errors
```

レスポンス例:
```json
{ "errors": [ { "name": "MyShader", "log": "ERROR: 0:15: 'outPos'..." } ] }
```

`errors` が空配列なら問題なし。

## 保存・Undo/Redo

```
POST /projects/:p/editor/save              # 保存
POST /projects/:p/editor/undo              # 元に戻す（ブラウザ接続時のみ）
POST /projects/:p/editor/redo              # やり直す（ブラウザ接続時のみ）
```
