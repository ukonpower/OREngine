---
name: orengine
description: >
  OREngine でコンポーネントを開発し、シーンを組むためのワークフロースキル（WebGL / GLSL と WebGPU / WGSL の両バックエンド対応）。
  シーンは dev サーバー経由でエディタタブを操作するシーン CLI（npx tsx scripts/scene.ts）で
  観測・編集する（EditorAPI を通るので undo が効き、保存はユーザーの Ctrl+S）。
  タブが無ければ CLI が headless Chromium で代わりに開き、書き込みはその場で保存する。
  見た目のあるオブジェクトはカスタムコンポーネント内で Geometry + Material + Mesh を組み立てるか、
  BLidge が作った Mesh にマテリアルを差し込む。
  Use when user asks to "シーンを作って", "エンティティを追加", "オブジェクトを配置",
  "ライトを追加", "カメラを配置", "シーンを修正", "コンポーネントを追加",
  "コンポーネントを作成", "シェーダーを作成", "シェーダーを書いて", "WGSL を書いて",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  component development, GLSL / WGSL shader programming, or 3D object placement in OREngine.
  Do NOT use for general TypeScript/JavaScript questions, GLSL / WGSL syntax reference,
  developing the OREngine engine itself, or non-OREngine 3D engine work.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(npx tsx scripts/scene.ts:*), Bash(npx tsx orengine/scripts/scene.ts:*), Bash(npm run typecheck:*), Bash(git diff:*), Bash(python3:*)
metadata:
  author: ukonpower
  version: 5.0.0
---

# OREngine スキル

OREngine でコンポーネントを作り、シーンを組むためのスキル。エンジン自体の開発は対象外。

## 最初に: パスとバックエンド

### パスの書き方

このスキルのパスとコマンドは **OREngine リポジトリのルートから** 書いている。

- OREngine の中で作業しているとき: そのまま（`packages/maxpower/...`、`npx tsx scripts/scene.ts`）
- 外部プロジェクト（OREngine を `orengine/` に submodule で取り込んだ構成。例: ORShorts）: 先頭に `orengine/` を付けて読む（`orengine/packages/maxpower/...`、`npx tsx orengine/scripts/scene.ts`）
- `<projectDir>` はプロジェクトディレクトリ（`Resources/` / `scenes/` / `editor.json` があるところ）。OREngine 内なら `demo-webgl/` / `demo-webgpu/`、ORShorts なら `project/`

### バックエンドの判定

コンポーネントとシェーダーの書き方はバックエンドで違う。作業の前にどちらかを決める。

| 手がかり | WebGL | WebGPU |
|---|---|---|
| 既存コンポーネントの import | `import * as MXP from 'maxpower'` | `import * as MXP from 'maxpower/webgpu'` |
| シェーダーファイル | `.vs` / `.fs`（GLSL） | `.wgsl` |
| プロジェクトの npm scripts / 起動時の環境変数 | `ORENGINE_RENDERER` 無し or `webgl` | `ORENGINE_RENDERER=webgpu`（OREngine の `npm run wgpu`、ORShorts の `npm run dev`） |

- 既存コンポーネントがあるなら、その import が一番確か（プロジェクトのバックエンドは1つ。ORShorts は WebGPU のみ）
- **該当するほうだけ読む**。WebGL なら `references/shader-glsl.md`、WebGPU なら `references/shader-wgsl.md`。`references/component-development.md` も該当するほうのサンプルだけ見ればよい
- WebGPU プロジェクトで `'maxpower'` を import しない（WebGL 版を指す）

## 何をどこで読むか

| やりたいこと | 読むところ |
|---|---|
| シーンに何かを置く / 並べる / 動かす | Flow 1（シーン CLI） |
| 見た目のあるオブジェクトを作る | Flow 2 → `references/component-development.md` |
| シェーダーを書く | `references/shader-glsl.md` / `references/shader-wgsl.md` |
| 結果を確認する | Flow 3（`tree` / `errors` / `shot`） |
| ビルトインのカメラ・ライト等を使う | `references/components-catalog.md` |
| シーン JSON を読む・差分を見る | `references/scene-schema.md` |
| 生成テクスチャ（`.tex`） | `references/texture-schema.md` |
| 動かない・表示されない | `references/troubleshooting.md` |

## 鉄則: 操作前に状態を確認

```bash
npx tsx scripts/scene.ts status       # 接続先（tab / headless）・シーン名・未保存の変更の有無（unsaved）
npx tsx scripts/scene.ts tree         # 全エンティティ（uuid・名前パス・ワールド座標・向き・境界ボックス・コンポーネント）
npx tsx scripts/scene.ts components   # 登録済みコンポーネント名とフィールド定義（path・型・選択肢）
npx tsx scripts/scene.ts get root/Camera
```

エンティティの名前パス / uuid、実在するコンポーネント名、フィールドの path と現在値を CLI で確かめてから編集する。コンポーネントのフィールドはこのスキルに書き写していないので、`components` / `get` で見る。

- `tree` には BLidge / glb が作ったエンティティ（`initiator: "script"`）も出る。これらはシーン JSON に載らない
- CLI が `dev サーバーが起動していません` で止まったら、ユーザーに dev サーバーの起動を頼む（`npm run dev` を勝手に起動しない。JSON の直接編集に切り替えない）。タブが無いだけなら CLI が headless で代わりに繋ぐので、エディタを開いてもらう必要はない
- dev サーバーの URL は `<OREngine>/tmp/dev-server.json` から読まれる。同じ OREngine で dev サーバーを2つ立てていると後から起動したほうになるので、そのときは `--url` で指定する
- コマンド一覧は `npx tsx scripts/scene.ts help`

## Flow 1: シーン編集（シーン CLI）

```bash
npx tsx scripts/scene.ts add-entity root --preset Light --name KeyLight   # --preset は Empty（省略時）/ Light / Camera。uuid と path を返す
npx tsx scripts/scene.ts set root/KeyLight position 3,3,3                 # エンティティのフィールド: name / position / euler / scale
npx tsx scripts/scene.ts set root/KeyLight Light intensity 2              # コンポーネントのフィールドは <component> を挟む
npx tsx scripts/scene.ts add-component root/Box MyBox                     # 名前は components の name
npx tsx scripts/scene.ts remove-component root/Box MyBox
npx tsx scripts/scene.ts remove-entity root/Box
npx tsx scripts/scene.ts undo                                             # / redo
```

書き込みはすべてエディタの `EditorAPI` を通るので、GUI の操作と同じ扱いになる。

### 接続先で保存の扱いが変わる

`status` の `connection` で分かる。

- `"tab"`（ユーザーのタブ）: **CLI は保存しない**。タブにライブで反映され、GUI の Ctrl+Z / `undo` で戻せる（undo 履歴は GUI と共有なので、`undo` はユーザーの操作も戻しうる）。ファイルに確定するのはユーザーの Ctrl+S。作業の区切りで保存を頼む。未保存の変更は `status` の `unsaved: true` で分かる
- `"headless"`（タブが無く CLI が Chromium で開いた）: 書き込み系コマンドのたびに `scenes/<name>.json` へ保存される。1コマンドごとにブラウザを閉じるので `undo` / `redo` は効かない。取り消すには逆の操作（`remove-entity` 等）をする

接続先はコマンドごとに決まり、作業の途中でユーザーがタブを開くと headless から tab へ黙って切り替わる。**保存されたかは最初の `status` ではなく、各書き込みの出力の `connection` / `saved` で判断する**（`{ "connection": "tab", "saved": false, "uuid": ..., ... }` のように先頭に付く）。`saved: false` の変更はユーザーの Ctrl+S まで未保存。

### 書き込みの注意

- `set` の値はフィールドの型で解釈される: 数値 / ベクトル・色は `1,2,3` か `[1,2,3]`（要素数は現在値と同じ）/ `true`・`false` / 文字列 / select は選択肢の値 / entity 参照は対象の uuid（`tree` で調べる。`null` で外す）
- `euler` はラジアン。`position` は親からの相対（`tree` の `position` / `forward` / `up` はワールド）
- 存在しないエンティティ・コンポーネント名・path はエラーになり、`candidates` に候補が出るので選び直す
- 同名の兄弟がいると名前パスが複数に一致してエラーになる。uuid で指定する。`add-entity` の名前が兄弟と衝突すると `Name.001` のように採番されるので、戻り値の `path` を使う
- 編集できる範囲は GUI と同じ。BLidge / glb が作ったエンティティ（`initiator: "script"`）には子を足せず、削除もできない。コンポーネントを付けることはでき、BLidgeClient の `attachments` にエンティティ名で紐づいて保存される（`references/component-development.md` の「BLidge の Mesh に差し込む」）
- **CLI 操作のあとに full-reload を起こす作業をしない**。`scenes/<name>.json` / `editor.json` の書き換えや、コンポーネントファイルの追加・編集はタブをリロードし、未保存の CLI 操作が消える。コンポーネントを作る作業（Flow 2）を先に済ませ、リロード後に CLI で配置する
- `scenes/<name>.json` の直接編集は人間の手段。Claude は CLI を使う
- レンダラー設定（空の色・ポストエフェクトの有無など。シーン JSON の `renderer`）は CLI では変えられない。ユーザーにエディタで変えてもらう

## Flow 2: コンポーネント開発

見た目のあるオブジェクトはコンポーネントで作る。Geometry / Material はシーン JSON の `props` では作れない（`Mesh` を CLI で付けても形は入らない）。マテリアルやシェーダーを単体で作る API・ファイル形式も無い。

作り方は2つある（どちらを使うかの判断は `references/component-development.md`）:

- **自分で Mesh を足す**: コンストラクタで Geometry + Material を作り、`this.entity.addComponent( MXP.Mesh, { geometry, material } )`
- **BLidge の Mesh に差し込む**: Blender（BLidge）が作ったエンティティの `Mesh` を `getComponent` で取り、`mesh.material` を差し替える

### 配置

`<projectDir>/Resources/Components/<グループ>/<名前>/index.ts` に `export class <名前> extends MXP.Component` を置くと自動で登録される（`host/app/Resources/registry.ts` の `import.meta.glob`）。登録名は export したクラス名。先頭が `_` のディレクトリは対象外。シェーダーは同じディレクトリの `shaders/` に置く。

### 最小サンプル（自分で Mesh を足す）

WebGL:

```ts
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

export class CubeMesh extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		const geometry = new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );

		const material = new MXP.Material( {
			name: 'CubeMesh',
			phase: [ 'shadowMap', 'deferred' ],
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

WebGPU（ORShorts の `project/Resources/Components/Objects/CubeMesh` に dispose を足したもの）:

```ts
import * as MXP from 'maxpower/webgpu';

// 1m 角の立方体メッシュを既定マテリアルで描く
export class CubeMesh extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.CubeGeometry( {
			width: 1,
			height: 1,
			depth: 1,
		} );

		const material = new MXP.Material( {
			name: 'CubeMesh',
			phase: [ 'shadowMap', 'deferred' ],
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
```

シェーダーを渡さないと既定のシェーダー（WebGL: `packages/maxpower/webgl/Material/shaders/basic.{vs,fs}`、WebGPU: `packages/maxpower/webgpu/Material/shaders/basic.wgsl`）で描かれる。独自シェーダー・HMR・uniform・ライフサイクルは `references/component-development.md`。

### 手順

1. `index.ts`（と必要ならシェーダー）を作る
2. `npm run typecheck`（外部プロジェクトで script が無ければ、型チェックの方法をユーザーに確認する）
3. dev サーバー起動中ならファイルの追加を検知してタブがリロードされる（タブ上の未保存の変更は消える）
4. `components` に名前が出るのを確かめ、`add-entity` → `add-component <entity> <名前>` で置く
5. `errors` と `shot` で確認する（Flow 3）

## Flow 3: 結果の確認

1. `tree` で位置・向き・境界ボックスを見る。`forward` はローカル -Z（カメラの視線）、`up` はローカル +Y。**ライトは `up` が光源へ向かう向き**（光はその逆向きに進む）
2. `errors` でシェーダーのコンパイルエラー（GLSL / WGSL）・GPU のエラー・コンソールのエラー・解決できなかったコンポーネントを見る
3. 見た目は `shot` で PNG に書き出し、Read で見る。出力先は `tmp/shot/` の下（OREngine・ORShorts とも `tmp/` は gitignore 済み）

```bash
npx tsx scripts/scene.ts shot tmp/shot/scene.png                                   # シーンカメラ・今の時刻
npx tsx scripts/scene.ts shot tmp/shot/cam.png --camera root/MainCamera            # シーン内の別のカメラ
npx tsx scripts/scene.ts shot tmp/shot/top.png --from 0,10,0.01 --to 0,0,0         # 観測用の一時カメラ（シーンには残らない）
npx tsx scripts/scene.ts shot tmp/shot/t2.png --time 2                             # 時刻 2 秒
npx tsx scripts/scene.ts shot tmp/shot/gbuf.png --view gBuffer_1                   # パスの出力（ラベルはバックエンドごとに違う）
```

- `shot` はタブの再生時刻・再生状態・選択・エディタカメラを変えない。観測のためにカメラエンティティを `set` で動かさず、`--from` / `--to` を使う
- 画像サイズはエディタの今の描画解像度で決まり、指定はできない（headless は 1920x1080 のウィンドウで開く）
- `--time T` は「時刻 T-1/60 → T の2ステップだけ進めて描いた状態」で、「T まで再生した状態」ではない。時刻で決まるもの（BLidge のアニメーション・`uTime` を使うシェーダー）と前ステップとの差で決まるもの（モーションブラー）は正しく出るが、GPUCompute やシミュレーションのように経過を積み上げるものは出ない。省略時はタブの今の時刻で1ステップ進める
- `--view` は `final`（省略時。本番と同じ）かパスのラベル。WebGL は `camera/deferred_1`、WebGPU は `gBuffer_1` のような生の名前で、一致しなければエラーの `candidates` に一覧が出る
- stdout には `path` / `width` / `height` / `view` / `time` / `camera` が出る。PNG は出力先にだけ書かれる

## Examples

### 立方体・ライト・カメラを置く

1. Flow 2 のサンプルで `CubeMesh` を作り、`npm run typecheck`
2. `components` に `CubeMesh` が出てから:

```bash
npx tsx scripts/scene.ts add-entity root --name Cube
npx tsx scripts/scene.ts add-component root/Cube CubeMesh
npx tsx scripts/scene.ts add-entity root --preset Light
npx tsx scripts/scene.ts set root/Light position 3,3,3
npx tsx scripts/scene.ts add-entity root --preset Camera --name MainCamera
npx tsx scripts/scene.ts set root/MainCamera position 5,3,5
npx tsx scripts/scene.ts add-component root/MainCamera CameraController
npx tsx scripts/scene.ts set root/MainCamera CameraController lookAt/target <Cube の uuid>
```

3. ライトの向きは `euler` を `set` し、`tree` の `up` が光源側（ライト位置 − 照らしたい点の向き）を向いたかで確かめる
4. `errors` と `shot` で確認し、`connection: "tab"` ならユーザーに Ctrl+S を頼む

### 時間で動くシェーダー

1. コンポーネントの `shaders/` にシェーダーを書き、Material に渡す（`references/shader-glsl.md` / `references/shader-wgsl.md`）。時間は GLSL なら `uTime`、WGSL なら `frame.uTime`
2. `errors` でコンパイルエラーを見る
3. `shot --time` を変えて複数枚撮り、動きを確かめる

## Guardrails

- シーンの編集はシーン CLI。コンポーネント・シェーダー・`.tex` はファイルを直接編集する
- ユーザーのタブでは CLI は保存しない。作業の区切りで Ctrl+S を頼む
- 名前・path・フィールドは CLI（`components` / `get`）で確かめる。推測で `set` しない
- コンポーネント・シェーダーを編集したら `npm run typecheck`、シーンを変えたら `errors` と `shot`
- `npm run dev` を勝手に起動しない
- 同じ問題が3回続けて直らなければ `references/troubleshooting.md` を見る

## Common Issues

| 症状 | 対処 |
|---|---|
| CLI が `dev サーバーが起動していません` / `接続できません` | ユーザーに dev サーバーの起動を頼む |
| CLI が `headless Chromium で開こうとしましたが、失敗しました` | ユーザーに `npx playwright install chromium` を頼む（GPU の無い環境では headless は動かない） |
| CLI の書き込みが消えた | 保存前に full-reload が走った。`status` の `unsaved` を見て、やり直してから Ctrl+S を頼む |
| コンポーネントが一覧に出ない | import やシェーダーの読み込みで失敗している。`npm run typecheck` と `errors` を見る |
| `set` が path のエラーになる | `candidates` か `get` の `fields[].path` から選ぶ。`field()` で登録していないプロパティは CLI でも JSON でも変えられない |

詳細は `references/troubleshooting.md`。
