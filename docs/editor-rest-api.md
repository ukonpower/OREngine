# OREngine エディタ操作 REST API

EditorAPIをREST経由で操作するためのAPI。開発サーバー（Express）を通じてブラウザ上のエディタと通信する。

## 前提条件

1. `npm run dev` で開発サーバーを起動する
2. ブラウザでエディタを開く（`http://localhost:3000`）
3. エディタがWebSocketでサーバーに接続される（自動）

ブラウザが接続されている場合、操作はWebSocket経由でブラウザに委譲される（Undo/Redo対応）。
ブラウザが未接続の場合、サーバーのオンメモリ状態で直接処理される（Undo/Redo不可）。

## ベースURL

```
http://localhost:3001/api/projects/{projectName}/editor
```

Viteプロキシ経由でもアクセス可能:
```
http://localhost:3000/api/projects/{projectName}/editor
```

`{projectName}` はプロジェクト名（例: `DemoProject`）。

## エラーレスポンス

全てのエラーは以下の形式で返される:

```json
{
  "error": "エラーメッセージ"
}
```

| ステータスコード | 意味 |
|:---:|---|
| 400 | リクエストエラー（存在しないUUID、不正なパラメータ、ブラウザ側でのエラー等） |

---

## 読み取り系API

### GET /editor/status

エディタの現在の状態を取得する。

**レスポンス例:**
```json
{
  "connected": true,
  "canUndo": true,
  "canRedo": false,
  "selectedEntityId": "a1b2c3d4-..."
}
```

**curl:**
```bash
curl http://localhost:3001/api/projects/DemoProject/editor/status
```

---

### GET /editor/scene

シーンツリー全体を取得する。各エンティティのtransform情報とコンポーネント一覧を含む。

**レスポンス例:**
```json
{
  "uuid": "root-uuid",
  "name": "Scene",
  "position": { "x": 0, "y": 0, "z": 0 },
  "euler": { "x": 0, "y": 0, "z": 0 },
  "scale": { "x": 1, "y": 1, "z": 1 },
  "components": [
    { "uuid": "comp-uuid", "name": "Mesh" }
  ],
  "children": [
    {
      "uuid": "child-uuid",
      "name": "Cube",
      "position": { "x": 1, "y": 0, "z": 0 },
      "euler": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "components": [],
      "children": []
    }
  ]
}
```

**curl:**
```bash
curl http://localhost:3001/api/projects/DemoProject/editor/scene
```

---

### GET /editor/entity/:uuid

特定エンティティの詳細情報を取得する。コンポーネントのフィールド値も含む。

**レスポンス例:**
```json
{
  "uuid": "entity-uuid",
  "name": "Cube",
  "position": { "x": 1, "y": 2, "z": 3 },
  "euler": { "x": 0, "y": 0.5, "z": 0 },
  "scale": { "x": 1, "y": 1, "z": 1 },
  "components": [
    {
      "uuid": "comp-uuid",
      "name": "Mesh",
      "fields": {
        "enabled": true
      }
    }
  ],
  "childrenCount": 0,
  "parentUuid": "parent-uuid"
}
```

**curl:**
```bash
curl http://localhost:3001/api/projects/DemoProject/editor/entity/<uuid>
```

---

### GET /editor/search?q=...

エンティティ名で部分一致検索する。

**パラメータ:**
| パラメータ | 型 | 説明 |
|---|---|---|
| `q` | string | 検索クエリ（大文字小文字を区別しない） |

**レスポンス例:**
```json
[
  {
    "uuid": "camera-uuid",
    "name": "Camera",
    "parentUuid": "root-uuid",
    "components": ["Camera", "MainCamera"]
  }
]
```

**curl:**
```bash
curl 'http://localhost:3001/api/projects/DemoProject/editor/search?q=Camera'
```

---

### GET /editor/components

利用可能なコンポーネントクラスの一覧を取得する。`addComponent`で使用する`componentName`はここの`name`を指定する。

**レスポンス例:**
```json
[
  { "name": "Light", "className": "Light" },
  { "name": "Camera", "className": "Camera" },
  { "name": "Mesh", "className": "Mesh" },
  { "name": "MainCamera", "className": "MainCamera" },
  { "name": "SkyBox", "className": "SkyBox" }
]
```

**curl:**
```bash
curl http://localhost:3001/api/projects/DemoProject/editor/components
```

---

### GET /editor/entity/:uuid/component/:componentName

エンティティに付いている特定コンポーネントの詳細フィールド情報を取得する。
`fields`はフラットなキー/値、`fieldsDirectory`はネストされたディレクトリ構造。

**レスポンス例:**
```json
{
  "uuid": "comp-uuid",
  "name": "Light",
  "fields": {
    "enabled": true,
    "color": [1, 1, 1],
    "intensity": 1.0
  },
  "fieldsDirectory": {
    "type": "folder",
    "childs": {
      "enabled": { "type": "value", "value": true },
      "color": { "type": "value", "value": [1, 1, 1] },
      "intensity": { "type": "value", "value": 1.0 }
    }
  }
}
```

**curl:**
```bash
curl http://localhost:3001/api/projects/DemoProject/editor/entity/<uuid>/component/Light
```

---

## エンティティ操作API

### POST /editor/entity

新しいエンティティを作成する（Undo可能）。

**リクエストボディ:**
```json
{
  "parentUuid": "parent-entity-uuid",
  "name": "New Entity"
}
```

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `parentUuid` | string | Yes | 親エンティティのUUID |
| `name` | string | No | エンティティ名（デフォルト: "New Entity"） |

**レスポンス例:**
```json
{
  "uuid": "new-entity-uuid",
  "name": "New Entity"
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/entity \
  -H 'Content-Type: application/json' \
  -d '{"parentUuid":"<parent-uuid>","name":"MyEntity"}'
```

---

### DELETE /editor/entity/:uuid

エンティティを削除する（Undo可能）。

**curl:**
```bash
curl -X DELETE http://localhost:3001/api/projects/DemoProject/editor/entity/<uuid>
```

---

### POST /editor/entity/:uuid/select

エンティティを選択する。エディタUIの選択状態が更新される。

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/entity/<uuid>/select
```

---

## コンポーネント操作API

### POST /editor/entity/:uuid/component

エンティティにコンポーネントを追加する（Undo可能）。

**リクエストボディ:**
```json
{
  "componentName": "Light"
}
```

`componentName`は`GET /editor/components`で取得できる`name`を指定する。

**レスポンス例:**
```json
{
  "uuid": "new-component-uuid",
  "componentName": "Light"
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/entity/<uuid>/component \
  -H 'Content-Type: application/json' \
  -d '{"componentName":"Light"}'
```

---

### DELETE /editor/entity/:uuid/component/:componentName

エンティティからコンポーネントを削除する（Undo可能）。

**curl:**
```bash
curl -X DELETE http://localhost:3001/api/projects/DemoProject/editor/entity/<uuid>/component/Light
```

---

## フィールド操作API

### POST /editor/field

Serializableオブジェクト（Entity or Component）のフィールド値を変更する（Undo可能）。

**リクエストボディ:**
```json
{
  "targetUuid": "entity-or-component-uuid",
  "path": "position",
  "value": [1, 2, 3]
}
```

| フィールド | 型 | 説明 |
|---|---|---|
| `targetUuid` | string | 対象のEntityまたはComponentのUUID |
| `path` | string | フィールドパス |
| `value` | any | 設定する値 |

**値の型について:**
- `position`, `euler`, `scale`: `[x, y, z]` の数値配列
- `name`: 文字列
- `enabled`: boolean
- その他のフィールドは `GET /editor/entity/:uuid` や `GET /editor/entity/:uuid/component/:name` で現在の値と型を確認できる

**curl:**
```bash
# positionを変更
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/field \
  -H 'Content-Type: application/json' \
  -d '{"targetUuid":"<uuid>","path":"position","value":[1,2,3]}'

# 名前を変更
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/field \
  -H 'Content-Type: application/json' \
  -d '{"targetUuid":"<uuid>","path":"name","value":"NewName"}'
```

---

## Undo/Redo API

ブラウザ接続時のみ使用可能。未接続時は `400` エラーを返す。

### POST /editor/undo

最後の操作を元に戻す。

**レスポンス例:**
```json
{
  "success": true
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/undo
```

---

### POST /editor/redo

元に戻した操作をやり直す。

**レスポンス例:**
```json
{
  "success": true
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/redo
```

---

## セーブAPI

### POST /editor/save

現在のシーンをディスクに保存する。ブラウザ接続中はsyncRequestでスナップショットを取得してから保存する。

**レスポンス例:**
```json
{
  "success": true
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/save
```

---

## 典型的なワークフロー（AIエージェント向け）

```bash
# 1. シーン構造を把握
curl http://localhost:3001/api/projects/DemoProject/editor/scene

# 2. 利用可能なコンポーネントを確認
curl http://localhost:3001/api/projects/DemoProject/editor/components

# 3. エンティティを検索
curl 'http://localhost:3001/api/projects/DemoProject/editor/search?q=Cube'

# 4. エンティティの詳細を確認
curl http://localhost:3001/api/projects/DemoProject/editor/entity/<uuid>

# 5. 新しいエンティティを作成
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/entity \
  -H 'Content-Type: application/json' \
  -d '{"parentUuid":"<root-uuid>","name":"NewLight"}'

# 6. コンポーネントを追加
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/entity/<new-uuid>/component \
  -H 'Content-Type: application/json' \
  -d '{"componentName":"Light"}'

# 7. フィールドを変更
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/field \
  -H 'Content-Type: application/json' \
  -d '{"targetUuid":"<new-uuid>","path":"position","value":[0,5,0]}'

# 8. 保存
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/save

# 9. 問題があればUndo
curl -X POST http://localhost:3001/api/projects/DemoProject/editor/undo
```
