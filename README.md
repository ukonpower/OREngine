# OREngine

OREngine (オーアールエンジン) は 64KB Intro 制作のための 3D エンジンです。TypeScript で実装されており、WebGL / WebGPU のレンダラー、コンポーネントベースのシーン構築、React 製エディタ、64KB 配布形式（自己解凍 HTML）へのビルドパイプラインを備えています。

![OREngine screen shot](./screenshot/OREngine.png)

## デモ

- エディタデモ: https://ukonpower.github.io/OREngine/
- Storybook (エディタ UI カタログ): https://ukonpower.github.io/OREngine/storybook/

## 自分のリポジトリで使う

OREngine は npm パッケージとしては公開しておらず、git submodule として組み込んで利用します。作品リポジトリ側にはプロジェクトデータ（シーン・コンポーネント）と起動スクリプトだけを置き、開発サーバー・エディタ・ビルドはすべて submodule 側の `orengine/host` が提供します。

### 1. セットアップ

Node.js 24 系で動作します。submodule を追加してセットアップスクリプトを実行するだけです。

```bash
git submodule add https://github.com/ukonpower/OREngine.git orengine
(cd orengine && npm install)
npx tsx orengine/scripts/init.ts
npm install
```

`init.ts` が利用側リポジトリに以下を生成します（既存のファイルは上書きしません）。

- `project/` — プロジェクトデータ（`scenes/<name>.json` / `editor.json` / `Resources/` / `public/`。エディタ拡張の `editor/` は必要になったら自分で作ります）
- `tsconfig.json` — パスエイリアスを submodule に向けた TypeScript 設定
- `package.json` — `dev` / `player:build` / `editor:build` の scripts と、実行に必要な `tsx`（依存パッケージはすべて OREngine 側が持ちます）

### 2. 開発

```bash
npm run dev
```

エディタ付き開発サーバーが起動します。`project/scenes/*.json` やコンポーネントのファイルを直接編集すると、変更検知でブラウザが自動リロードされます。シーンはエディタの Scene パネルから切り替え・新規作成できます。

`project/Resources/Components/<グループ>/<名前>/index.ts` に `MXP.Component` を継承したクラスを export すると、コンポーネントとして自動で認識されます。

レンダラーは環境変数で切り替えられます（デフォルトは webgl）。

```bash
ORENGINE_RENDERER=webgpu npm run dev
```

#### エディタ拡張（`project/editor/`）

作品ごとの制作補助ツール（値づくりの補助、外部 API や外部プロセスの呼び出しなど）を、エディタのパネルとサーバーの API route として足せます。`project/editor/` は任意のディレクトリで、player ビルドには一切入りません。

`project/editor/Panels/<名前>/index.tsx` で `panel` を export すると、パネルのタブ「+」の一覧に出ます。

```tsx
import { useState } from 'react';

import { type PanelDefinition } from 'orengine/react';
import { Button, Panel } from 'uipower';

const Sample = () => {

	const [ message, setMessage ] = useState( '' );

	const run = async () => {

		const res = await fetch( '/api/ext/hello' );
		const data = await res.json();
		setMessage( data.message );

	};

	return <Panel><Button onClick={run}>Run</Button>{message}</Panel>;

};

export const panel: PanelDefinition = { id: 'sample', title: 'Sample', content: <Sample /> };
```

`project/editor/server.ts` を置くと、default export に express の `Router` が渡され、足した route が `/api/ext/*` に生えます（サーバーは tsx 上で動くので `.ts` のまま読み込まれます。変更の反映には開発サーバーの再起動が必要です）。

```ts
import type { EditorServerExtension } from 'orengine/server';

const extension: EditorServerExtension = ( router, ctx ) => {

	router.get( '/hello', ( _req, res ) => {

		// ctx.projectDir 配下でファイルを読む・子プロセスを起動する等
		res.json( { message: ctx.projectDir } );

	} );

};

export default extension;
```

### 3. ビルド

```bash
npm run player:build # 64KB 配布形式の自己解凍 HTML → project/dist/player/out.html
npm run editor:build # エディタ込み HTML → project/dist/static/
```

生成された scripts は `orengine/scripts/run.ts` を呼んでいるだけです。プログラムから制御したい場合は `orengine/host` の `runDev` / `runBuildPlayer` / `runBuildStatic` を import して使えます（`renderer` / `port` / `apiPort` / `basePath` / `https` を指定可能）。

### 4. Shader Minifier の準備（player ビルドに必要）

player ビルドのシェーダー圧縮に [Shader Minifier](https://github.com/laurentlb/Shader_Minifier) を使用します。macOS / Linux はセットアップスクリプトで Shader Minifier と Mono を導入できます（`~/Documents/application/shader_minifier/` に配置されます）。

```bash
(cd orengine && npm run shader-minifier:setup)
```

Windows は shader_minifier.exe を取得し、Path を設定してください。配置場所を変えたい場合は、環境変数 `ORENGINE_SHADER_MINIFIER` に実行コマンド全体を指定します。

```bash
ORENGINE_SHADER_MINIFIER="mono /path/to/shader_minifier.exe" npm run player:build
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

WebGPU の dev サーバーは HTTPS で立ち、証明書は自己署名のものが自動生成されます。mkcert 等で作った証明書を使う場合はパスを環境変数で渡します。

```bash
ORENGINE_HTTPS_CERT=/path/to/server.crt ORENGINE_HTTPS_KEY=/path/to/server.key npm run dev
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
