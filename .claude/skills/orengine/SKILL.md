---
name: orengine
description: >
  OREngineの3Dシーン構築・コンポーネント開発・シェーダー作成を行うワークフロースキル。
  シーンは devサーバー経由でエディタタブを操作するシーン CLI（npx tsx scripts/scene.ts）で
  観測・編集する（EditorAPI を通るので undo が効き、保存はユーザーの Ctrl+S）。
  見た目のあるオブジェクトはカスタムコンポーネント内で Geometry + Material + Mesh を組み立てる。
  Use when user asks to "シーンを作って", "エンティティを追加", "オブジェクトを配置",
  "ライトを追加", "カメラを配置", "シーンを修正", "コンポーネントを追加",
  "コンポーネントを作成", "シェーダーを作成", "シェーダーを書いて",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  component development, shader programming, or 3D object placement in OREngine.
  Do NOT use for general TypeScript/JavaScript questions, GLSL syntax reference,
  or non-OREngine 3D engine work.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(npx tsx scripts/scene.ts:*), Bash(npx tsx orengine/scripts/scene.ts:*), Bash(npm run typecheck:*), Bash(git diff:*), Bash(git checkout:*), Bash(python3:*)
metadata:
  author: ukonpower
  version: 4.0.0
---

# OREngine スキル

OREngineのシーン構築・コンポーネント開発を行うスキル。

- **シーンの観測・編集はシーン CLI**（`npx tsx scripts/scene.ts <command>`。外部プロジェクトからは `npx tsx orengine/scripts/scene.ts`）。dev サーバー＋開いているエディタタブが必要
- **CLI の書き込みは保存しない**。タブにライブで反映され undo も効くが、ファイルに確定するのはユーザーの Ctrl+S
- `scenes/<name>.json` の直接編集は人間の手段。Claude は CLI を使う（JSON を書き換えるとタブが full-reload され、未保存の変更が消える）
- **見た目を持つオブジェクトはコンポーネントで作る**（Geometry / Material / Mesh をコンポーネントのコンストラクタで生成）
- **マテリアル / シェーダーを作る独立 API は存在しない**（`.mat` ファイルは廃止）
- **見た目の確認は agent-browser スキル**で行う（スクリーンショットを撮るコマンドはまだ無い。状態の数値的な確認は CLI の `tree` / `get` / `errors`）

## Decision Map

| やりたいこと | フロー |
|---|---|
| シーンに何かを置く / 並べる / 動かす | Flow 1: シーン CLI |
| 見た目のあるオブジェクト（カスタム形状 / シェーダー付き） | Flow 2: コンポーネント開発 |
| GLSL シェーダーを書く | Flow 3: シェーダー編集 |
| 結果を確認する | Flow 4: CLI の `tree` / `errors` ＋ agent-browser でスクリーンショット |
| 動かない・表示されない | `references/troubleshooting.md` |

参考リファレンス:
- scenes/<name>.json スキーマ: `references/scene-schema.md`
- テクスチャ（`.tex`）スキーマ: `references/texture-schema.md`
- ビルトインコンポーネント一覧: `references/components-catalog.md`
- コンポーネント開発ガイド: `references/component-development.md`
- シェーダーガイド: `references/shader-guide.md`
- トラブルシューティング: `references/troubleshooting.md`

## 鉄則: 操作前に状態を確認

```bash
npx tsx scripts/scene.ts status       # 接続先のタブ・シーン名・未保存の変更の有無（unsaved）
npx tsx scripts/scene.ts tree         # 全エンティティ（uuid・名前パス・ワールド座標・前方ベクトル・コンポーネント）
npx tsx scripts/scene.ts components   # 登録済みコンポーネント名とフィールド定義（path・型・選択肢）
npx tsx scripts/scene.ts get root/Camera
```

エンティティの名前パス / uuid、実在するコンポーネント名、フィールドの path と現在値を CLI で把握してから編集する。`tree` には BLidge / glb 由来のエンティティ（`initiator: "script"`。シーン JSON に載らない）も出る。

CLI が `dev サーバーが起動していません` / `エディタのタブが接続されていません` で止まったら、ユーザーに dev サーバーの起動とエディタを開くことを依頼する（`npm run dev` を勝手に起動しない。JSON の直接編集に切り替えない）。

## Flow 1: シーン編集（シーン CLI）

エンティティ・コンポーネント・トランスフォームの操作は CLI の書き込みコマンドで行う。すべてエディタの `EditorAPI` を通るので GUI の操作と同じ扱いになる（GUI の Ctrl+Z / `undo` で戻せる）。

```bash
npx tsx scripts/scene.ts add-entity root --preset Light --name KeyLight   # --preset は Empty（省略時）/ Light / Camera。uuid を返す
npx tsx scripts/scene.ts set root/KeyLight position 3,3,3                 # エンティティのフィールド: name / position / euler / scale / visible
npx tsx scripts/scene.ts set root/KeyLight Light intensity 2              # コンポーネントのフィールドは <component> を挟む
npx tsx scripts/scene.ts add-component root/Box MyBox
npx tsx scripts/scene.ts remove-component root/Box MyBox
npx tsx scripts/scene.ts remove-entity root/Box
npx tsx scripts/scene.ts undo                                             # / redo
```

1. `tree` / `get` / `components` で現状と名前を確認する
2. 書き込みコマンドで操作する。存在しないエンティティ・コンポーネント名・path はエラーになり、`candidates` に候補が出るので選び直す
3. `get` / `tree` で結果を確認する（`position` は親からの相対、`tree` の `position` / `forward` はワールド）
4. 作業が終わったら、**タブで Ctrl+S して保存するようユーザーに伝える**（CLI は保存しない。`status` の `unsaved: true` が未保存の印）

- `set` の値はフィールドの型で解釈される: 数値 / ベクトル・色は `1,2,3` か `[1,2,3]`（要素数は現在値と同じ）/ `true`・`false` / 文字列 / select・resource は選択肢の値。path は `get` の `fields[].path` と同じ
- `euler` はラジアン
- 同名の兄弟がいると名前パスが複数に一致してエラーになる。`add-entity` の戻り値の uuid か、`tree` の uuid で指定する
- `add-entity` の名前が兄弟と衝突すると `Name.001` のように採番される。戻り値の `path` を使う
- 編集できる範囲は GUI と同じ。script 由来のエンティティに子を足す・削除する、user 以外が付けたコンポーネントを外す・書き換えることはできない
- undo 履歴は GUI と共有している。`undo` はユーザーの GUI 操作も戻しうる
- **CLI 操作の後に full-reload を起こす作業をしない**: `scenes/<name>.json` / `editor.json` の書き換えやコンポーネントファイルの追加・編集はタブをリロードし、未保存の CLI 操作が消える。コンポーネントの追加（Flow 2）を先に済ませ、リロード後に CLI で配置する

## Flow 2: コンポーネント開発（見た目のあるオブジェクト）

**見た目のあるオブジェクトは、対応するカスタムコンポーネントを 1 つ作るのが基本。** Mesh / Geometry / Material は scenes/<name>.json の `props` では作れず、コンポーネントのコンストラクタ内で生成して `addComponent(MXP.Mesh, { geometry, material })` で組み込む。

### ファイル配置

```
<projectDir>/Resources/Components/{Group}/{Name}/
├── index.ts        # export class XXX extends MXP.Component
├── index.vs        # （任意）頂点シェーダー
└── index.fs        # （任意）フラグメントシェーダー
```

`import.meta.glob`（`host/app/Resources/registry.ts`）がファイル配置を検出して自動登録する。登録名は export されたクラス名。先頭が `_` のディレクトリはスキャン対象外。

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
3. devサーバー起動中なら Vite がファイル追加を検知して自動で登録・リロードする（タブ上の未保存の変更は消える）
4. `components` に `MyBox` が出ることを確認し、`add-entity` → `add-component <entity> MyBox` でシーンに置く

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

## Flow 4: 結果の確認

1. `npx tsx scripts/scene.ts tree` で位置・向き（`forward` はローカル -Z、ライトは `up` が光源へ向かう向き）・境界ボックスを確認する
2. `npx tsx scripts/scene.ts errors` でシェーダーエラー・コンソールのエラー・解決できなかったコンポーネントを確認する
3. 見た目は agent-browser スキルでエディタページ（`http://localhost:<vite-port>`）を開いてスクリーンショットを撮る。カメラの位置はカメラエンティティに `set` で調整する

アニメーションがある場合はタイムラインUIを操作して複数時点を撮る（時刻を指定して撮るコマンドはまだ無い）。

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

2. `npm run typecheck` でエラーがないことを確認（登録は Vite の glob が自動で行う）

3. `components` に `CubeMesh` が出るのを確認してから、CLI で Cube + Light + Camera を置く:

```bash
npx tsx scripts/scene.ts add-entity root --name Cube
npx tsx scripts/scene.ts add-component root/Cube CubeMesh
npx tsx scripts/scene.ts add-entity root --preset Light
npx tsx scripts/scene.ts set root/Light position 3,3,3
npx tsx scripts/scene.ts add-entity root --preset Camera --name MainCamera
npx tsx scripts/scene.ts set root/MainCamera position 5,3,5
npx tsx scripts/scene.ts add-component root/MainCamera CameraController
```

4. Light を原点に向ける場合は `euler` を計算して `set` する（`references/components-catalog.md` の補正ルール参照）。`tree` の `up` で向きを確かめる

5. `errors` と agent-browser のスクリーンショットで確認し、ユーザーに Ctrl+S での保存を依頼する

### Example 1: ライトとカメラだけのシーン

1. `tree` で現状確認
2. `add-entity root --preset Camera` / `add-entity root --preset Light` → `set` で位置・向きを決める
3. `tree` / agent-browser で確認
4. ユーザーに Ctrl+S での保存を依頼する

### Example 2: 赤い球体を置く

1. `<projectDir>/Resources/Components/Object/RedSphere/index.ts` を作成
   - `new MXP.SphereGeometry()` + `new MXP.Material({ ... })` を内部で生成して `addComponent(MXP.Mesh, ...)`
2. `npm run typecheck`
3. リロード後、`add-entity` → `add-component <entity> RedSphere`
4. agent-browser でスクリーンショット確認

### Example 3: カスタムシェーダーで動くオブジェクト

1. コンポーネントディレクトリに `index.vs` / `index.fs` を作成
2. `index.ts` で `import frag from './index.fs'` して Material に渡す
3. `updateImpl` で uniform を更新
4. `errors` でシェーダーコンパイルエラーを確認する
5. `add-entity` / `add-component` でシーンへ追加 + スクリーンショット

## Guardrails

- **シーンの編集はシーン CLI で行う**。コンポーネントファイル・`.tex` はファイルの直接編集。`scenes/<name>.json` の直接編集は人間の手段（Claude が書き換えるとタブが full-reload され、ユーザーの未保存の変更も消える）
- **CLI は保存しない**。作業の区切りでユーザーに Ctrl+S を依頼する
- **マテリアル / シェーダーを作る独立 API はない**。`.mat` ファイルも存在しない。Material はコンポーネント内で `new MXP.Material(...)` する
- **見た目のあるオブジェクト = カスタムコンポーネント**を基本とする
- **名前・path は CLI で確かめる**。CLI は未知のコンポーネント名・path をエラーにして候補を返す（JSON の直接編集では silent skip になる）
- **コンポーネント・シェーダー編集後は `npm run typecheck` を実行する**
- **シーン変更後は `errors` と agent-browser のスクリーンショット**で確認する
- **`npm run dev` を勝手に起動しない**（ユーザーの明示的な指示がある場合のみ）
- 同じ問題が3回連続で解消しない場合は `references/troubleshooting.md` を参照する

## Common Issues

| 症状 | 対処 |
|---|---|
| CLI が `dev サーバーが起動していません` / `接続できません` | ユーザーに `npm run dev` の起動を依頼、または明示的な指示があれば起動する |
| CLI が `エディタのタブが接続されていません` | ユーザーにエディタページを開くよう依頼する |
| CLI の書き込みが消えた | 保存前に full-reload（JSON の書き換え・コンポーネントファイルの追加・編集）が走った。`status` の `unsaved` で確認し、やり直してから Ctrl+S を依頼 |
| コンポーネントが一覧に出ない | TypeScript/Viteのtransformエラーが無いか確認（importが壊れたコンポーネントは登録されない） |
| `set` が path のエラーになる | `candidates` か `get` の `fields[].path` から選ぶ。`field()` 未登録のプロパティはコンポーネント実装を変えるしかない |

詳細は `references/troubleshooting.md`。
