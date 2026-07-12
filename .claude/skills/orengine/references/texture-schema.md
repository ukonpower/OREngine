# テクスチャ（`.tex`）スキーマリファレンス

> マテリアル / シェーダーを作る独立 API は存在しない。Material はカスタムコンポーネント内で `new MXP.Material({...})` で生成する（`references/component-development.md` 参照）。`.mat` ファイルも廃止された。

生成系テクスチャ（シェーダーでレンダリングするテクスチャ）は `<projectDir>/Resources/Textures/<Name>.tex` という JSON ファイルで定義する。Read/Write/Edit ツールで直接編集する。

## スキーマ

```jsonc
{
	"frag": "./shaders/hash.fs",   // フラグメントシェーダーへの相対パス
	"resolution": [512, 512],       // [width, height]
	"filter": "nearest",            // "nearest" | "linear"
	"updateEveryFrame": false       // true なら毎フレーム再レンダリング
}
```

## ファイル配置

```
<projectDir>/Resources/Textures/
├── MyTexture.tex
└── shaders/
    └── myTexture.fs
```

先頭が `_` のディレクトリ・ファイルは自動スキャン対象外。

## コンポーネント側での参照

```ts
import { Engine } from 'orengine';

// コンポーネントのコンストラクタ内（engine は注入済み参照）
const engine = this.engine as Engine;
const tex = Engine.resources.getTexture( 'MyTexture' );

const material = new MXP.Material( {
	frag, vert,
	uniforms: MXP.UniformsUtils.merge(
		engine.uniforms,
		{ uTex: { value: tex, type: '1i' } },
	),
} );
```

シェーダー側で `uniform sampler2D uTex;` を宣言すれば自動でエディタ UI から値を変更できる（`references/shader-guide.md` 参照）。

## 補足: サーバーAPI

`.tex` ファイルは `server/routes/textures.ts` の REST（`GET/POST/PUT/DELETE /api/projects/:p/textures*`）からも読み書きできる（GUI エディタが内部で使用）。ただしエージェントの作業はファイル直接編集で完結するため、通常このAPIを呼ぶ必要はない。
