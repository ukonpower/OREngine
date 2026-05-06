# シーン操作 API リファレンス

ベースURL: `http://localhost:3001/api`

> **オフライン対応**: シーン読み取り・エンティティCRUD・コンポーネント操作・フィールド設定はブラウザ未接続時もサーバー単独で動作する。
> コンポーネント詳細（`fieldsDirectory`）、シェーダーエラー確認、Undo/Redo、エンティティ選択、スクリーンショット、タイムライン、エディタカメラ制御はブラウザ接続が必要（503を返す）。
>
> **`/editor/save` は存在しない**。保存モデルはこのファイル末尾の「保存モデル」を参照。

## プロジェクト管理

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/projects` | プロジェクト一覧 | - |
| POST | `/projects` | プロジェクト作成 | `{ "name": "ProjectName" }` |
| DELETE | `/projects/:name` | プロジェクト削除 | - |
| PUT | `/projects/:name` | プロジェクト名変更 | `{ "newName": "NewName" }` |
| POST | `/projects/:name/duplicate` | プロジェクト複製 | `{ "newName": "CopyName" }` |

## シーン直接 CRUD（scene.json への入出力）

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/projects/:name/scene` | scene.json 全体を返す（in-memory ベース） |
| POST | `/projects/:name/scene` | scene.json 全体を上書き保存（ブラウザ接続中ならフルリロードもブロードキャスト） |

ブラウザ接続中に作業を確実に永続化したい場合の典型パターン:

```bash
SCENE=$(curl -s http://localhost:3001/api/projects/{PROJECT}/scene)
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/scene \
  -H "Content-Type: application/json" \
  -d "$SCENE"
```

## シーン読み取り

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/projects/:p/editor/scene` | シーンツリー取得 |
| GET | `/projects/:p/editor/entity/:uuid` | エンティティ詳細（コンポーネントfields含む） |
| GET | `/projects/:p/editor/search?q=name` | エンティティ名検索 |
| GET | `/projects/:p/editor/components` | 利用可能コンポーネント一覧（ビルトイン+プロジェクト固有） |
| GET | `/projects/:p/editor/entity/:uuid/component/:name` | コンポーネント詳細（fieldsDirectory含む）⚠️ ブラウザ接続時のみ |
| GET | `/projects/:p/editor/status` | ステータス（接続状態等）。`connected: false` ならブラウザ未接続 |
| GET | `/projects/:p/editor/resources` | テクスチャ等のリソース一覧 |

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

> ⚠️ **silent fail に注意**: ブラウザ側 `Serializable.deserialize` は `fields_` Map に存在しない path をスキップする。サーバー側フォールバックは props に何でも書き込むがコンポーネントが参照しなければ無効。**成功レスポンス (`{success:true}`) でも反映ゼロのケースが存在**する。
> 対策: `GET /editor/entity/:uuid/component/:name` で **`fieldsDirectory` の実在 path を確認**してから setField する（ws 接続時のみ取得可）。

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

`path` はコンポーネントが `field()` / `fieldDir()` で公開しているキーと一致する（例: `"power"`, `"radius"`, `"intensity"`）。値や使えるフィールドはコンポーネントの実装に依存する。**未登録の public プロパティ（`Mesh.geometry`, `Camera.displayOut`, `Light.color` 等）には書き込めない**。

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
          "componentName": "Light",
          "fields": {
            "intensity": 1.0
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

Light の場合はサーバー側 `computeLookAtEuler` で `isLight` 判定が入り **+π/2 X 補正が自動適用**される（euler 直指定するより安全）。

## シェーダーエラー確認

```
GET /projects/:p/editor/shader-errors
```

レスポンス例:
```json
{ "errors": [ { "name": "MyShader", "log": "ERROR: 0:15: 'outPos'..." } ] }
```

`errors` が空配列なら問題なし。

## タイムライン制御 ⚠️ ブラウザ接続時のみ

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| POST | `/projects/:p/editor/timeline/play` | タイムライン再生開始 | - |
| POST | `/projects/:p/editor/timeline/stop` | タイムライン停止 | - |
| POST | `/projects/:p/editor/timeline/seek` | 指定フレームにシーク | `{ "frame": 120 }` |
| GET | `/projects/:p/editor/timeline/status` | タイムライン状態取得 | - |

`timeline/status` レスポンス例:
```json
{ "playing": false, "currentFrame": 120, "duration": 3600, "fps": 60 }
```

## スクリーンショット取得 ⚠️ ブラウザ接続時のみ

```
GET /projects/:p/editor/screenshot?format=png
```

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `format` | string | `png` | `png` or `jpeg` |
| `quality` | number | `0.9` | JPEG圧縮品質（0.0〜1.0） |

レスポンス: 画像バイナリ（`Content-Type: image/png` or `image/jpeg`）

**スクリーンショットをファイルに保存して確認する例:**
```bash
# PNG（推奨）
curl -s -o /tmp/orengine_screenshot.png "http://localhost:3001/api/projects/{PROJECT}/editor/screenshot"

# JPEG（サイズを抑えたい場合のみ。ただし alpha flatten で暗いシーンが黒/白になる）
curl -s -o /tmp/orengine_screenshot.jpg "http://localhost:3001/api/projects/{PROJECT}/editor/screenshot?format=jpeg&quality=0.7"
# → Read /tmp/orengine_screenshot.png で画像確認
```

## エディタカメラ制御 ⚠️ ブラウザ接続時のみ

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/projects/:p/editor/camera/position` | カメラ位置・注視点取得 | - |
| POST | `/projects/:p/editor/camera/position` | カメラ位置・注視点設定 | `{ "eye": {x,y,z}, "target": {x,y,z} }` |

`GET camera/position` レスポンス例:
```json
{ "eye": { "x": 5, "y": 3, "z": 5 }, "target": { "x": 0, "y": 0, "z": 0 } }
```

`POST camera/position` リクエスト例:
```json
{ "eye": { "x": 8, "y": 5, "z": 8 }, "target": { "x": 0, "y": 0, "z": 0 } }
```

**カメラ位置の目安:**
- シーン全体俯瞰: `eye: {x:8, y:5, z:8}`, `target: {x:0, y:0, z:0}`
- 正面: `eye: {x:0, y:1, z:5}`, `target: {x:0, y:0, z:0}`
- 真上: `eye: {x:0, y:10, z:0.1}`, `target: {x:0, y:0, z:0}`

## 保存モデル

OREngine API は **明示的な save エンドポイントを持たない**。実態は接続モードで二分される:

| モード | 保存タイミング | scene.json への書き込み |
|---|---|---|
| ws **未接続**（ブラウザを開いていない） | `WRITE_ACTIONS` (createEntity / deleteEntity / addComponent / removeComponent / setField) ごとに自動保存 | サーバーが直接 `project.writeSceneFile()` |
| ws **接続中**（ブラウザを開いている） | 揮発（in-memory のみ） | ユーザーが `Ctrl+S` を押すか、明示的に `POST /api/projects/:p/scene` を叩くまで書かれない |

ブラウザ接続中に作業を確実に永続化したい場合は、上の「シーン直接 CRUD」セクションの GET → POST パターンで明示保存する。

ブラウザが HMR フルリロード（コンポーネントファイル新規追加など）すると、`EditorPage` が `GET /api/projects/:p/scene` で **scene.json を再ロード** する。ws 接続中の API 操作は揮発なので、未保存のものは消える。

## Undo/Redo（ws 接続時のみ）

| メソッド | パス | 説明 |
|---|---|---|
| POST | `/projects/:p/editor/undo` | 元に戻す |
| POST | `/projects/:p/editor/redo` | やり直す |
