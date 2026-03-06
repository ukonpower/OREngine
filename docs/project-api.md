# OREngine プロジェクト管理 REST API

プロジェクトの作成・一覧・削除・リネーム・複製、およびシーン/エディタデータの読み書きを行うAPI。

## ベースURL

```
http://localhost:3001/api
```

---

## プロジェクト一覧・作成

### GET /projects

プロジェクト一覧を取得する。

**レスポンス例:**
```json
["DemoProject", "TestProject"]
```

**curl:**
```bash
curl http://localhost:3001/api/projects
```

---

### POST /projects

新規プロジェクトを作成する。scene.json, editor.json, globals.ts, index.ts が自動生成される。

**リクエストボディ:**
```json
{
  "name": "MyProject"
}
```

**レスポンス例（201）:**
```json
{
  "name": "MyProject",
  "path": "/path/to/projects/MyProject"
}
```

**エラー:**
| ステータス | 条件 |
|---|---|
| 400 | 名前が空、`..` `/` `\` を含む |
| 409 | 同名プロジェクトが既に存在 |

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects \
  -H 'Content-Type: application/json' \
  -d '{"name":"MyProject"}'
```

---

## アクティブプロジェクト

### GET /projects/active

現在のアクティブプロジェクト名を取得する。

**レスポンス例:**
```json
{
  "name": "DemoProject"
}
```

**curl:**
```bash
curl http://localhost:3001/api/projects/active
```

---

### POST /projects/active

アクティブプロジェクトを切り替える。Vite HMRでブラウザ側にも通知される。

**リクエストボディ:**
```json
{
  "name": "DemoProject"
}
```

**レスポンス例:**
```json
{
  "name": "DemoProject"
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/active \
  -H 'Content-Type: application/json' \
  -d '{"name":"DemoProject"}'
```

---

## プロジェクト操作

### PUT /projects/:name

プロジェクト名を変更する。アクティブプロジェクトの場合、アクティブ設定も自動更新される。

**リクエストボディ:**
```json
{
  "newName": "RenamedProject"
}
```

**レスポンス例:**
```json
{
  "name": "RenamedProject"
}
```

**エラー:**
| ステータス | 条件 |
|---|---|
| 400 | 名前が不正 |
| 404 | 元のプロジェクトが存在しない |
| 409 | 新しい名前が既に存在 |

**curl:**
```bash
curl -X PUT http://localhost:3001/api/projects/OldName \
  -H 'Content-Type: application/json' \
  -d '{"newName":"NewName"}'
```

---

### DELETE /projects/:name

プロジェクトを削除する。アクティブプロジェクトは削除できない。

**レスポンス例:**
```json
{
  "success": true
}
```

**エラー:**
| ステータス | 条件 |
|---|---|
| 400 | アクティブプロジェクトを削除しようとした |
| 404 | プロジェクトが存在しない |

**curl:**
```bash
curl -X DELETE http://localhost:3001/api/projects/MyProject
```

---

### POST /projects/:name/duplicate

プロジェクトを複製する。

**リクエストボディ:**
```json
{
  "newName": "MyProject_copy"
}
```

**レスポンス例（201）:**
```json
{
  "name": "MyProject_copy"
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/duplicate \
  -H 'Content-Type: application/json' \
  -d '{"newName":"DemoProject_copy"}'
```

---

## シーンデータ

### GET /projects/:name/scene

プロジェクトのシーンデータ（scene.json）を取得する。
ProjectManagerにオンメモリデータがあればそちらを返し、なければファイルから読み込む。

**レスポンス例:**
```json
{
  "name": "DemoProject",
  "scene": {
    "name": "root",
    "uuid": "xxx-xxx",
    "childs": [...]
  }
}
```

**curl:**
```bash
curl http://localhost:3001/api/projects/DemoProject/scene
```

---

### POST /projects/:name/scene

シーンデータを保存する。ファイルへの書き込みとオンメモリ状態の同期の両方を行う。

**リクエストボディ:** SceneFileData（scene.json全体）

**レスポンス例:**
```json
{
  "success": true
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/scene \
  -H 'Content-Type: application/json' \
  -d '{"name":"DemoProject","scene":{"name":"root","uuid":"xxx"}}'
```

---

## エディタデータ

### GET /projects/:name/editor

エディタ設定（editor.json）を取得する。カメラ位置等のエディタ固有の状態。

**レスポンス例:**
```json
{
  "camera/position": [0, 1, 5],
  "camera/target": [0, 0, 0]
}
```

**curl:**
```bash
curl http://localhost:3001/api/projects/DemoProject/editor
```

---

### POST /projects/:name/editor

エディタ設定を保存する。

**リクエストボディ:** editor.json全体

**レスポンス例:**
```json
{
  "success": true
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/projects/DemoProject/editor \
  -H 'Content-Type: application/json' \
  -d '{"camera/position":[0,2,8],"camera/target":[0,0,0]}'
```
