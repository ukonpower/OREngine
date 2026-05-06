# テクスチャ API リファレンス

ベースURL: `http://localhost:3001/api`

> **マテリアル / シェーダーを作る独立 API は存在しない**。Material はカスタムコンポーネント内で `new MXP.Material({...})` で生成する（`references/component-development.md` 参照）。`.mat` ファイルも廃止された。

## ファイルベース API

| メソッド | パス | 説明 | ボディ |
|---------|------|------|--------|
| GET | `/projects/:p/textures` | テクスチャ一覧 | - |
| POST | `/projects/:p/textures` | テクスチャ作成 | `{ "name": "TexName" }` |
| GET | `/projects/:p/textures/:name` | 詳細取得 | - |
| PUT | `/projects/:p/textures/:name` | 更新 | `{ ...config }` |
| DELETE | `/projects/:p/textures/:name` | 削除 | - |
| GET | `/projects/:p/textures/:name/filepath` | ファイル絶対パス取得 | - |
| POST | `/projects/:p/textures/sync` | 同期（不要ファイル削除） | `{ "names": ["Tex1"] }` |

## Editor 経由 API（ブラウザ接続時のみ）

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/projects/:p/editor/resources` | リソース一覧 |
| POST | `/projects/:p/editor/textures` | テクスチャ作成 |
| GET / PUT / DELETE | `/projects/:p/editor/textures/:name` | テクスチャ操作 |

## コンポーネント側での参照

テクスチャをマテリアルで使う場合は、コンポーネント内で読み込んで uniform に渡す:

```ts
import { Engine } from 'orengine';

const tex = Engine.getInstance( gl ).resourceManager.getTexture( 'TexName' );

const material = new MXP.Material( {
	frag, vert,
	uniforms: MXP.UniformsUtils.merge(
		Engine.getInstance( gl ).uniforms,
		{ uTex: { value: tex, type: '1i' } },
	),
} );
```

シェーダー側で `uniform sampler2D uTex;` を宣言すれば自動でエディタ UI から値を変更できる（`references/shader-guide.md` 参照）。
