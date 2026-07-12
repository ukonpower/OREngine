---
name: orengine
description: >
  OREngineの3Dシーン構築・コンポーネント開発・シェーダー作成を行うワークフロースキル。
  シーンは scene.json をファイルとして直接編集し、devサーバー起動中は保存と同時に
  ブラウザが自動リロードされる。見た目のあるオブジェクトはカスタムコンポーネント内で
  Geometry + Material + Mesh を組み立てる。
  Use when user asks to "シーンを作って", "エンティティを追加", "オブジェクトを配置",
  "ライトを追加", "カメラを配置", "シーンを修正", "コンポーネントを追加",
  "コンポーネントを作成", "シェーダーを作成", "シェーダーを書いて",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  component development, shader programming, or 3D object placement in OREngine.
  Do NOT use for general TypeScript/JavaScript questions, GLSL syntax reference,
  or non-OREngine 3D engine work.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(npm run typecheck:*), Bash(git diff:*), Bash(git checkout:*), Bash(python3:*)
metadata:
  author: ukonpower
  version: 3.0.0
---

# OREngine スキル

OREngineのシーン構築・コンポーネント開発を行うスキル。

- **シーン編集は `<projectDir>/scene.json` の直接編集**（REST APIは存在しない）
- **見た目を持つオブジェクトはコンポーネントで作る**（Geometry / Material / Mesh をコンポーネントのコンストラクタで生成）
- **マテリアル / シェーダーを作る独立 API は存在しない**（`.mat` ファイルは廃止）
- **見た目の確認は agent-browser スキル**で行う（専用の観測APIは存在しない）

## Decision Map

| やりたいこと | フロー |
|---|---|
| シーンに何かを置く / 並べる / 動かす | Flow 1: scene.json 直接編集 |
| 見た目のあるオブジェクト（カスタム形状 / シェーダー付き） | Flow 2: コンポーネント開発 |
| GLSL シェーダーを書く | Flow 3: シェーダー編集 |
| 結果を目で確認する | Flow 4: agent-browser でスクリーンショット |
| 動かない・表示されない | `references/troubleshooting.md` |

参考リファレンス:
- scene.json スキーマ: `references/scene-schema.md`
- テクスチャ（`.tex`）スキーマ: `references/texture-schema.md`
- ビルトインコンポーネント一覧: `references/components-catalog.md`
- コンポーネント開発ガイド: `references/component-development.md`
- シェーダーガイド: `references/shader-guide.md`
- トラブルシューティング: `references/troubleshooting.md`

## 鉄則: 操作前に状態を確認

```bash
# シーン現状の確認
cat <projectDir>/scene.json

# 実在するコンポーネント名の確認（ビルトイン / プロジェクト固有）
cat packages/orengine/builtin/_data/builtinComponentList.ts
cat <projectDir>/Resources/_data/componentList.ts
```

エンティティの UUID・既存コンポーネント・**実在するコンポーネント名**を把握してから編集する。`componentList.ts` に無い名前を `scene.json` に書いてもエラーにはならず、静かに無視される（`references/troubleshooting.md` 参照）。

## Flow 1: シーン編集（scene.json 直接編集）

エンティティ・コンポーネント・トランスフォームの操作はすべて `<projectDir>/scene.json` を Read → Edit/Write で行う。スキーマは `references/scene-schema.md` を参照。

1. `Read <projectDir>/scene.json` で現状を把握
2. 追加・変更したいエンティティ/コンポーネントを JSON として組み立てる（UUIDは v4 で新規生成。ルートエンティティのみ `"0"` 固定）
3. `Edit` または `Write` で保存
4. devサーバー起動中ならブラウザが自動で full-reload される（API呼び出し不要）

`pos` / `rot` / `scale` はデフォルト値（`[0,0,0]` / `[0,0,0]` / `[1,1,1]`）と一致する場合は省略可。`components` / `childs` も空なら省略可。

## Flow 2: コンポーネント開発（見た目のあるオブジェクト）

**見た目のあるオブジェクトは、対応するカスタムコンポーネントを 1 つ作るのが基本。** Mesh / Geometry / Material は scene.json の `props` では作れず、コンポーネントのコンストラクタ内で生成して `addComponent(MXP.Mesh, { geometry, material })` で組み込む。

### ファイル配置

```
<projectDir>/Resources/Components/{Group}/{Name}/
├── index.ts        # export class XXX extends MXP.Component
├── index.vs        # （任意）頂点シェーダー
└── index.fs        # （任意）フラグメントシェーダー
```

ResourceManager の Vite プラグインがファイル配置を検出して自動登録する（`_data/*` は自動生成なので手動編集禁止）。

### 最小サンプル（Geometry + Material + Mesh をコンポーネント化）

```ts
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import frag from './index.fs';
import vert from './index.vs';

export class MyBox extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		const geometry = new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );

		const material = new MXP.Material( {
			vert,
			frag,
			phase: [ 'deferred', 'shadowMap' ],
			useLight: true,
			uniforms: MXP.UniformsUtils.merge( engine.uniforms ),
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
```

### 手順

1. `index.ts` を作成（必要なら `index.vs` / `index.fs` も）
2. `npm run typecheck` でエラーがないか確認
3. `<projectDir>/Resources/_data/componentList.ts` に登録されたことを確認（Vite の HMR 再生成を数秒待つ）
4. scene.json にエンティティ・`{ "name": "MyBox", "uuid": "..." }` を追加

詳細パターン（制御コンポーネント・データコンポーネント・ライフサイクル・HMR）は `references/component-development.md`。

## Flow 3: シェーダー編集

GLSL は通常コンポーネントと同じディレクトリに `.vs` / `.fs` で置き、TS から `import` する。

```
<projectDir>/Resources/Components/{Group}/{Name}/
├── index.ts
├── index.vs
└── index.fs
```

書き方・インクルード（`<vert_h>`, `<frag_out>` 等）は `references/shader-guide.md`。

シェーダー編集後は agent-browser スキルでエディタページを開き、ブラウザコンソールと見た目を確認する（`references/shader-guide.md` / `references/troubleshooting.md`）。

## Flow 4: 見た目の確認（agent-browser）

シーン構築・変更後は必ず目で確認する。専用の観測 API は存在しないため agent-browser スキルを使う。

1. devサーバーが起動していることを確認（`http://localhost:<vite-port>` にエディタページがある）
2. agent-browser スキルでページを開く
3. カメラ位置を確認したい場合はエディタ UI 上でマウス操作するか、scene.json 内のカメラエンティティの `pos`/`rot` を調整する
4. スクリーンショットを撮って確認する

アニメーションがある場合はタイムラインUIを操作して複数時点を撮る（専用APIは無い）。

## Examples

### Example 0: 立方体を 1 個出す（最短レシピ）

ビルトインの `Mesh` コンポーネントは `props` でジオメトリ/マテリアルを差せない。**カスタムコンポーネントが必須**。

1. `<projectDir>/Resources/Components/Object/CubeMesh/index.ts` を作成:

```ts
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

export class CubeMesh extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		const geometry = new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );
		const material = new MXP.Material( {
			phase: [ 'deferred', 'shadowMap' ],
			useLight: true,
			uniforms: MXP.UniformsUtils.merge( engine.uniforms ),
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
```

2. HMR での `_data/componentList.ts` 再生成を数秒待ってから登録を確認:

```bash
grep CubeMesh <projectDir>/Resources/_data/componentList.ts
```

3. `<projectDir>/scene.json` に Cube + Light + Camera を追加（Read → Edit）:

```json
{
	"name": "Cube",
	"uuid": "<新規UUID>",
	"components": [ { "name": "CubeMesh", "uuid": "<新規UUID>" } ]
},
{
	"name": "Light",
	"uuid": "<新規UUID>",
	"pos": [3, 3, 3],
	"components": [ { "name": "Light", "uuid": "<新規UUID>" } ]
},
{
	"name": "MainCamera",
	"uuid": "<新規UUID>",
	"pos": [5, 3, 5],
	"components": [
		{ "name": "Camera", "uuid": "<新規UUID>" },
		{ "name": "CameraController", "uuid": "<新規UUID>" }
	]
}
```

4. Light を原点に向ける場合は `rot` を計算して設定する（`references/components-catalog.md` の補正ルール参照）

5. agent-browser でスクリーンショット確認

### Example 1: ライトとカメラだけのシーン

1. `Read <projectDir>/scene.json` で現状確認
2. Camera エンティティと Light エンティティを追記
3. Edit/Write で保存 → 自動 full-reload
4. agent-browser でスクリーンショット

### Example 2: 赤い球体を置く

1. `<projectDir>/Resources/Components/Object/RedSphere/index.ts` を作成
   - `new MXP.SphereGeometry()` + `new MXP.Material({ ... })` を内部で生成して `addComponent(MXP.Mesh, ...)`
2. `npm run typecheck`
3. scene.json にエンティティ + `RedSphere` コンポーネントを追加
4. agent-browser でスクリーンショット確認

### Example 3: カスタムシェーダーで動くオブジェクト

1. コンポーネントディレクトリに `index.vs` / `index.fs` を作成
2. `index.ts` で `import frag from './index.fs'` して Material に渡す
3. `updateImpl` で uniform を更新
4. agent-browser でブラウザコンソールを確認（シェーダーコンパイルエラーは console に出る）
5. シーンへ追加 + スクリーンショット

## Guardrails

- **REST APIは存在しない**。すべてファイル（scene.json / editor.json / コンポーネントファイル / `.tex`）の直接編集で完結する
- **マテリアル / シェーダーを作る独立 API はない**。`.mat` ファイルも存在しない。Material はコンポーネント内で `new MXP.Material(...)` する
- **見た目のあるオブジェクト = カスタムコンポーネント**を基本とする
- **`_data/*` は手動編集しない**（Vite プラグインが上書きする。読み取りは可）
- **未知のコンポーネント名は silent fail**（エラーにならず描画もされない）。`Resources/_data/componentList.ts` / `builtin/_data/builtinComponentList.ts` で実在確認すること
- **未登録の field path も silent fail**（`props` に書いても反映ゼロ）。対象コンポーネントの `index.ts` で `field()` 登録パスを確認すること
- **コンポーネント・シェーダー編集後は `npm run typecheck` を実行する**
- **ファイル編集後は HMR 反映（`_data/componentList.ts` 再生成）に数秒待ってから確認する**
- **シーン変更後は agent-browser でスクリーンショット**して目視確認する
- **`npm run dev` を勝手に起動しない**（ユーザーの明示的な指示がある場合のみ）
- 同じ問題が3回連続で解消しない場合は `references/troubleshooting.md` を参照する

## Common Issues

| 症状 | 対処 |
|---|---|
| `ECONNREFUSED` (devサーバー疎通確認時) | ユーザーに `npm run dev` の起動を依頼、または明示的な指示があれば起動する |
| scene.json 編集がブラウザに反映されない | vite ログの full-reload 出力を確認。`references/troubleshooting.md` |
| コンポーネントが一覧に出ない | `_data/componentList.ts` の再生成を待つ。TypeScript/Viteのtransformエラーが無いか確認 |
| props を設定したのに反映されない | コンポーネント実装の `field()` 登録パスを確認。**未知の path は silent skip** |
| scene.json の JSON構文エラー | `python3 -m json.tool <file>` で検証。壊れたら `git checkout -- <file>` |

詳細は `references/troubleshooting.md`。
