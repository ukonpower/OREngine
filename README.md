# OREngine

OREngine (オーアールエンジン) は 64KB Intro 制作のための 3D エンジンです。TypeScript で実装されており、WebGL / WebGPU のレンダラー、コンポーネントベースのシーン構築、React 製エディタ、64KB 配布形式（自己解凍 HTML）へのビルドパイプラインを備えています。

![OREngine screen shot](./screenshot/OREngine.png)

## デモ

- エディタデモ: https://ukonpower.github.io/OREngine/
- Storybook (エディタ UI カタログ): https://ukonpower.github.io/OREngine/storybook/

## 自分のリポジトリで使う

OREngine は npm パッケージとしては公開しておらず、git submodule として組み込んで利用します。作品リポジトリ側にはプロジェクトデータ（シーン・コンポーネント）と起動スクリプトだけを置き、開発サーバー・エディタ・ビルドはすべて submodule 側の `orengine/host` が提供します。

### 1. submodule の追加とセットアップ

Node.js 24 系で動作します。

```bash
git submodule add https://github.com/ukonpower/OREngine.git orengine
(cd orengine && npm install)
npm install -D tsx
```

依存パッケージはすべて OREngine 側が持っているため、利用側リポジトリに必要なのは実行用の `tsx` だけです。

### 2. プロジェクトディレクトリの作成

テンプレートをコピーして始めます。

```bash
cp -r orengine/host/template/project ./project
```

```
project/
├── scene.json    # シーン定義
├── editor.json   # エディタ設定
├── Resources/    # コンポーネント・シェーダー・テクスチャ等
└── public/       # 静的ファイル
```

`Resources/Components/<グループ>/<名前>/index.ts` に `MXP.Component` を継承したクラスを export すると、コンポーネントとして自動で認識されます。

### 3. 起動スクリプト

`orengine/host` の API をプロジェクトディレクトリに向けて呼ぶだけです。tsx 経由で実行します。

```js
// scripts/run.mjs — 実行: npx tsx scripts/run.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );
const projectDir = path.join( repoRoot, 'project' );

const { runDev } = await import( '../orengine/host/index.ts' );

await runDev( { projectDir } );
```

- `runDev( { projectDir } )` — エディタ付き開発サーバーを起動。`scene.json` やコンポーネントのファイルを直接編集すると、変更検知でブラウザが自動リロードされます
- `runBuildPlayer( { projectDir } )` — 64KB 配布形式の自己解凍 HTML を `dist/player/out.html` に出力
- `runBuildStatic( { projectDir } )` — エディタ込み HTML を `dist/static/` に出力

オプションで `renderer: 'webgl' | 'webgpu' | 'headless'`（デフォルトは webgl）、`port` / `apiPort` / `basePath` / `https` を指定できます。

### 4. TypeScript 設定

コンポーネントの型チェックには、利用側リポジトリの `tsconfig.json` でパスエイリアスを submodule に向けます。

```jsonc
{
	"compilerOptions": {
		"moduleResolution": "bundler",
		"baseUrl": ".",
		"paths": {
			"basepower": [ "./orengine/packages/basepower" ],
			"mathpower": [ "./orengine/packages/mathpower" ],
			"glpower": [ "./orengine/packages/glpower" ],
			"maxpower": [ "./orengine/packages/maxpower/webgl" ],
			"maxpower/webgpu": [ "./orengine/packages/maxpower/webgpu" ],
			"orengine": [ "./orengine/packages/orengine/index.ts" ],
			"orengine/*": [ "./orengine/packages/orengine/*" ],
			"@or-renderer": [ "./orengine/packages/maxpower/webgl/index.ts" ],
			"@or-scene": [ "./project/scene.json" ],
			"@or-editor": [ "./project/editor.json" ],
			"@or-resources/*": [ "./project/Resources/*" ]
		}
	}
}
```

tsc も submodule 側のもの（`./orengine/node_modules/.bin/tsc`）を流用できます。

### 5. Shader Minifier の準備（player ビルドに必要）

player ビルドのシェーダー圧縮に [Shader Minifier](https://github.com/laurentlb/Shader_Minifier) を使用します。macOS / Linux はセットアップスクリプトで Shader Minifier と Mono を導入できます（`~/Documents/application/shader_minifier/` に配置されます）。

```bash
(cd orengine && npm run shader-minifier:setup)
```

Windows は shader_minifier.exe を取得し、Path を設定してください。配置場所を変えたい場合は、環境変数 `ORENGINE_SHADER_MINIFIER` に実行コマンド全体を指定します。

```bash
ORENGINE_SHADER_MINIFIER="mono /path/to/shader_minifier.exe" npx tsx scripts/run.mjs
```

Shader Minifier が見つからない環境では minify をスキップして生の GLSL にフォールバックします（警告が出ます。packed サイズは本番相当になりません）。

## OREngine 自体を開発する

このリポジトリを直接 clone して開発する場合のコマンドです。

```bash
npm install
npm run dev   # WebGL レンダラー + demo-webgl で開発サーバー起動
npm run wgpu  # WebGPU レンダラー + demo-webgpu で開発サーバー起動
```

アクティブなプロジェクトとレンダラーは環境変数で切り替えます。`ORENGINE_PROJECT` に未存在の名前を指定すると、テンプレートから新しいプロジェクトが生成されます。

```bash
ORENGINE_PROJECT=<name> npm run dev                        # デフォルトは demo-webgl
ORENGINE_RENDERER=<webgl|webgpu|headless> npm run dev      # デフォルトは webgl
```

### ビルド

```bash
npm run player:build # 64KB 配布形式の自己解凍 HTML → dist/player/out.html
npm run editor:build # エディタ込み HTML → dist/static/
```

player ビルドで出力される `out.html` の packed サイズが 64KB Intro の最重要指標です。

### その他のコマンド

| コマンド | 内容 |
| --- | --- |
| `npm run storybook:dev` | Storybook 開発サーバー (port 6006) |
| `npm run vrt` | スクリーンショット比較テスト (VRT) の実行 |
| `npm run vrt:update` | VRT の基準スクリーンショット更新 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript 型チェック + scss コンパイル検証 |

## ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。

64KB へのパックには [compeko](https://gist.github.com/0b5vr/09ee96ca2efbe5bf9d64dad7220e923b) (0b5vr) と [Shader Minifier](https://github.com/laurentlb/Shader_Minifier) (Ctrl-Alt-Test) を利用しています。
