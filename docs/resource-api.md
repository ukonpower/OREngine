# OREngine リソース管理 REST API

コンポーネント・マテリアル・シェーダーのファイル管理API。
これらのAPIはファイルシステム上のリソースを直接操作する。

## ベースURL

```
http://localhost:3001/api
```

---

## コンポーネント管理

ソースファイル: `src/ts/Resources/Components/` 以下

### GET /components

コンポーネントのツリー構造一覧を取得する。アンダースコア(`_`)で始まるディレクトリは除外される。

**レスポンス例:**
```json
[
  {
    "name": "Camera",
    "path": "Camera",
    "isComponent": false,
    "children": [
      {
        "name": "MainCamera",
        "path": "Camera/MainCamera",
        "isComponent": true,
        "children": []
      }
    ]
  },
  {
    "name": "SkyBox",
    "path": "SkyBox",
    "isComponent": true,
    "children": []
  }
]
```

`isComponent: true` は `index.ts` が存在するディレクトリ。

**curl:**
```bash
curl http://localhost:3001/api/components
```

---

### POST /components

新しいコンポーネントを作成する。テンプレートの `index.ts` が自動生成される。

**リクエストボディ:**
```json
{
  "componentName": "MyComponent",
  "dirPath": "Effects"
}
```

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `componentName` | string | Yes | コンポーネント名（PascalCase推奨） |
| `dirPath` | string | No | 親ディレクトリパス（例: `"Effects"`, `"Camera/Sub"`） |

生成されるテンプレート:
```typescript
import * as MXP from 'maxpower';

export class MyComponent extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

	}

}
```

**レスポンス例（201）:**
```json
{
  "componentName": "MyComponent",
  "path": "Effects/MyComponent"
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/components \
  -H 'Content-Type: application/json' \
  -d '{"componentName":"MyComponent","dirPath":"Effects"}'
```

---

### DELETE /components/:path

コンポーネントを削除する。親ディレクトリが空になった場合は自動削除される。

**curl:**
```bash
curl -X DELETE http://localhost:3001/api/components/Effects/MyComponent
```

**レスポンス例:**
```json
{
  "deleted": true
}
```

---

### GET /components/:path/filepath

コンポーネントの `index.ts` の絶対ファイルパスを取得する。外部エディタでの編集用。

**レスポンス例:**
```json
{
  "absolutePath": "/path/to/src/ts/Resources/Components/Effects/MyComponent/index.ts"
}
```

**curl:**
```bash
curl http://localhost:3001/api/components/Effects/MyComponent/filepath
```

---

## マテリアル管理

ソースファイル: `src/ts/Resources/Materials/` 以下（`.mat` JSON ファイル）

### GET /materials

マテリアル一覧を取得する。再帰的にスキャンされる。

**レスポンス例:**
```json
[
  {
    "name": "Default",
    "config": {
      "shader": "BasicShader"
    }
  }
]
```

**curl:**
```bash
curl http://localhost:3001/api/materials
```

---

### GET /materials/:name

マテリアルの詳細を取得する。

**レスポンス例:**
```json
{
  "name": "Default",
  "config": {
    "shader": "BasicShader"
  }
}
```

**curl:**
```bash
curl http://localhost:3001/api/materials/Default
```

---

### POST /materials

新しいマテリアルを作成する。

**リクエストボディ:**
```json
{
  "name": "MyMaterial",
  "shader": "BasicShader"
}
```

`name` 以外のフィールドが config として保存される。

**レスポンス例（201）:**
```json
{
  "name": "MyMaterial",
  "config": {
    "shader": "BasicShader"
  }
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/materials \
  -H 'Content-Type: application/json' \
  -d '{"name":"MyMaterial","shader":"BasicShader"}'
```

---

### PUT /materials/:name

マテリアルを更新する。

**リクエストボディ:** config オブジェクト全体

**レスポンス例:**
```json
{
  "name": "MyMaterial",
  "config": {
    "shader": "UpdatedShader"
  }
}
```

**curl:**
```bash
curl -X PUT http://localhost:3001/api/materials/MyMaterial \
  -H 'Content-Type: application/json' \
  -d '{"shader":"UpdatedShader"}'
```

---

### DELETE /materials/:name

マテリアルを削除する。

**レスポンス例:**
```json
{
  "deleted": true
}
```

**curl:**
```bash
curl -X DELETE http://localhost:3001/api/materials/MyMaterial
```

---

### GET /materials/:name/filepath

マテリアルファイル（`.mat`）の絶対パスを取得する。

**レスポンス例:**
```json
{
  "absolutePath": "/path/to/src/ts/Resources/Materials/MyMaterial.mat"
}
```

**curl:**
```bash
curl http://localhost:3001/api/materials/MyMaterial/filepath
```

---

## シェーダー管理

ソースファイル: `src/ts/Resources/Shaders/` 以下（各ディレクトリに `index.vs` / `index.fs`）

### GET /shaders

シェーダー一覧を取得する。

**レスポンス例:**
```json
[
  {
    "name": "BasicShader",
    "hasVert": true,
    "hasFrag": true
  }
]
```

**curl:**
```bash
curl http://localhost:3001/api/shaders
```

---

### POST /shaders

新しいシェーダーを作成する。テンプレートの `index.vs` と `index.fs` が自動生成される。

**リクエストボディ:**
```json
{
  "name": "MyShader"
}
```

生成されるテンプレート:

`index.vs`:
```glsl
void main() {
	gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 );
}
```

`index.fs`:
```glsl
void main() {
	outColor0 = vec4( 1.0, 1.0, 1.0, 1.0 );
}
```

**レスポンス例（201）:**
```json
{
  "name": "MyShader",
  "hasVert": true,
  "hasFrag": true
}
```

**curl:**
```bash
curl -X POST http://localhost:3001/api/shaders \
  -H 'Content-Type: application/json' \
  -d '{"name":"MyShader"}'
```

---

### DELETE /shaders/:name

シェーダーを削除する。

**レスポンス例:**
```json
{
  "deleted": true
}
```

**curl:**
```bash
curl -X DELETE http://localhost:3001/api/shaders/MyShader
```

---

### GET /shaders/:name/filepath

シェーダーディレクトリの絶対パスを取得する。

**レスポンス例:**
```json
{
  "absolutePath": "/path/to/src/ts/Resources/Shaders/MyShader"
}
```

**curl:**
```bash
curl http://localhost:3001/api/shaders/MyShader/filepath
```
