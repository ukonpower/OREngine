---
name: orengine
description: >
  OREngineの3Dシーン構築・コンポーネント開発・シェーダー作成を行うワークフロースキル。
  シーンはREST APIで編集し、見た目のあるオブジェクトはカスタムコンポーネント内で
  Geometry + Material + Mesh を組み立てる。
  Use when user asks to "シーンを作って", "エンティティを追加", "オブジェクトを配置",
  "ライトを追加", "カメラを配置", "シーンを修正", "コンポーネントを追加",
  "コンポーネントを作成", "シェーダーを作成", "シェーダーを書いて",
  "シーンを確認", "シーンを保存", or mentions scene construction, entity manipulation,
  component development, shader programming, or 3D object placement in OREngine.
  Do NOT use for general TypeScript/JavaScript questions, GLSL syntax reference,
  or non-OREngine 3D engine work.
allowed-tools: Bash(curl:*), Bash(bash:*), Bash(chmod:*), Read, Write, Edit, Glob, Grep
metadata:
  author: ukonpower
  version: 2.1.0
---

# OREngine スキル

OREngineのシーン構築・コンポーネント開発を行うスキル。

- **シーン編集は REST API**（`scene.json` は直接編集しない）
- **見た目を持つオブジェクトはコンポーネントで作る**（Geometry / Material / Mesh をコンポーネントのコンストラクタで生成）
- **マテリアル / シェーダーを作る独立 API は存在しない**（`.mat` ファイルは廃止）
- **`/editor/save` は存在しない**。保存挙動はブラウザ接続有無で変わる（後述）

## 前提

- 開発サーバーが `http://localhost:3001` で起動していること
- 状態確認: `bash .claude/skills/orengine/scripts/check-server.sh`

## Decision Map

| やりたいこと | フロー |
|---|---|
| シーンに何かを置く / 並べる / 動かす | Flow 1: シーン編集 API |
| 見た目のあるオブジェクト（カスタム形状 / シェーダー付き） | Flow 2: コンポーネント開発 |
| GLSL シェーダーを書く | Flow 3: シェーダー編集 |
| 結果を目で確認する | Flow 4: スクリーンショット |
| 動かない・表示されない | `bash .claude/skills/orengine/scripts/diagnose.sh {PROJECT}` |

参考リファレンス:
- API 仕様: `references/api-scene.md`
- テクスチャ API: `references/api-textures.md`
- ビルトインコンポーネント一覧: `references/components-catalog.md`
- コンポーネント開発ガイド: `references/component-development.md`
- シェーダーガイド: `references/shader-guide.md`
- トラブルシューティング: `references/troubleshooting.md`

## 鉄則: 操作前に状態を 3 つ確認

```bash
# 1. サーバー起動 + ブラウザ接続確認
bash .claude/skills/orengine/scripts/check-server.sh

# 2. ブラウザ接続が必要な操作（screenshot, shader-errors, console-errors, camera/position, timeline）の前に
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/status | python3 -m json.tool
# → connected: false なら「対応プロジェクトをブラウザで開いてください」とユーザーに依頼

# 3. シーン現状とコンポーネント実在確認
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/scene | python3 -m json.tool
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/components | python3 -m json.tool
```

エンティティの UUID・既存コンポーネント・**実在するコンポーネント名**を把握してから操作する。`/editor/components` に無い名前を `addComponent` してもエラーになる。

## Flow 1: シーン編集（REST API）

エンティティ・コンポーネント・トランスフォームの操作はすべて API で行う。

```bash
# 単発作成
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entity \
  -H "Content-Type: application/json" \
  -d '{"parentUuid": "0", "name": "MyEntity"}'

# コンポーネント追加（ビルトイン or 自作）
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entity/{UUID}/component \
  -H "Content-Type: application/json" \
  -d '{"componentName": "Light"}'

# トランスフォームやフィールド設定
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/field \
  -H "Content-Type: application/json" \
  -d '{"targetUuid": "{ENTITY_OR_COMPONENT_UUID}", "path": "position", "value": [0, 1, 0]}'

# 一括作成（推奨）
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entities \
  -H "Content-Type: application/json" \
  -d '{"entities": [...]}'
```

`targetUuid` は対象に応じて使い分ける:
- Entity フィールド (`position`, `euler`, `scale`, `name`) → エンティティ UUID
- Component フィールド (コンポーネント固有のプロパティ) → **コンポーネント UUID**

詳細は `references/api-scene.md`。

## Flow 2: コンポーネント開発（見た目のあるオブジェクト）

**見た目のあるオブジェクトは、対応するカスタムコンポーネントを 1 つ作るのが基本。** Mesh / Geometry / Material は API では作らず、コンポーネントのコンストラクタ内で生成して `addComponent(MXP.Mesh, { geometry, material })` で組み込む。

### ファイル配置

```
projects/{PROJECT}/Resources/Components/{Group}/{Name}/
├── index.ts        # export class XXX extends MXP.Component
├── index.vs        # （任意）頂点シェーダー
└── index.fs        # （任意）フラグメントシェーダー
```

ResourceManager の Vite プラグインがファイル配置を検出して自動登録する。`_data/*` は自動生成なので手動編集禁止。

### 最小サンプル（Geometry + Material + Mesh をコンポーネント化）

```ts
import * as MXP from 'maxpower';
import { Engine } from 'orengine';
import { gl } from '~/ts/Globals';

import frag from './index.fs';
import vert from './index.vs';

export class MyBox extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );

		const material = new MXP.Material( {
			vert,
			frag,
			phase: [ 'deferred', 'shadowMap' ],
			useLight: true,
			uniforms: MXP.UniformsUtils.merge( Engine.getInstance( gl ).uniforms ),
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
3. **コンポーネント登録完了を待ってから** `GET /editor/components` で確認（HMR フルリロードで揮発作業が消えうるため、エンティティ作成より先にこれを終わらせる）
4. シーンに追加: `POST /editor/entity` → `POST /editor/entity/:uuid/component { "componentName": "MyBox" }`
5. ブラウザ接続中なら明示保存（`POST /api/projects/:p/scene` で現状を書き戻す）+ スクリーンショット

詳細パターン（制御コンポーネント・データコンポーネント・ライフサイクル・HMR）は `references/component-development.md`。

## Flow 3: シェーダー編集

GLSL は通常コンポーネントと同じディレクトリに `.vs` / `.fs` で置き、TS から `import` する。

```
projects/{PROJECT}/Resources/Components/{Group}/{Name}/
├── index.ts
├── index.vs
└── index.fs
```

書き方・インクルード（`<vert_h>`, `<frag_out>` 等）は `references/shader-guide.md`。

シェーダー編集後は必ず確認:

```bash
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/shader-errors | python3 -m json.tool
```

`errors` が空でなければ修正してから次の作業へ。

## Flow 4: スクリーンショット確認

シーン構築・変更後は必ず目視確認する。

```bash
# 撮影前に必ずブラウザ接続を確認
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/status

# カメラを見やすい位置に移動
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/camera/position \
  -H "Content-Type: application/json" \
  -d '{"eye": {"x": 5, "y": 3, "z": 5}, "target": {"x": 0, "y": 0, "z": 0}}'

# PNGで撮影（推奨。JPEGは暗いシーンで黒になることがある）
curl -s -o /tmp/orengine_screenshot.png \
  "http://localhost:3001/api/projects/{PROJECT}/editor/screenshot"

# Read /tmp/orengine_screenshot.png で確認
```

サイズを抑えたい場合のみ JPEG (`?format=jpeg&quality=0.7`)。真っ黒に見えたら **PNG で再撮影**。

アニメーションがある場合は `POST /editor/timeline/seek { "frame": N }` で複数時点を撮る。

## Examples

### Example 0: 立方体を 1 個出す（最短レシピ）

ビルトインの `Mesh` コンポーネントは API でジオメトリ/マテリアルを差せない。**カスタムコンポーネントが必須**。

1. `projects/{PROJECT}/Resources/Components/Object/CubeMesh/index.ts` を作成:

```ts
import * as MXP from 'maxpower';
import { Engine } from 'orengine';
import { gl } from '~/ts/Globals';

export class CubeMesh extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );
		const material = new MXP.Material( {
			phase: [ 'deferred', 'shadowMap' ],
			useLight: true,
			uniforms: MXP.UniformsUtils.merge( Engine.getInstance( gl ).uniforms ),
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
```

2. HMR でフルリロード起こる可能性があるので、**コンポーネント登録完了**まで待つ:

```bash
sleep 2
curl -s http://localhost:3001/api/projects/{PROJECT}/editor/components | grep CubeMesh
```

3. シーンに Cube + Light + Camera をバッチ作成:

```bash
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entities \
  -H "Content-Type: application/json" \
  -d '{"entities":[
    {"name":"Cube","parentUuid":"0","components":[{"componentName":"CubeMesh"}]},
    {"name":"Light","parentUuid":"0","position":[3,3,3],"components":[{"componentName":"Light"}]},
    {"name":"MainCamera","parentUuid":"0","position":[5,3,5],"components":[
      {"componentName":"Camera"},
      {"componentName":"CameraController"}
    ]}
  ]}'
```

4. Light を原点に向ける（lookAt API は Light 補正自動）:

```bash
curl -s -X POST http://localhost:3001/api/projects/{PROJECT}/editor/entity/{LIGHT_UUID}/lookAt \
  -H "Content-Type: application/json" \
  -d '{"target":[0,0,0]}'
```

5. ブラウザ接続確認 → PNG でスクショ → Read で確認

ws 接続中はこの時点で in-memory のみ更新されている。**確実に保存したい場合は `POST /api/projects/:p/scene` で明示保存**するか、ユーザーに `Ctrl+S` を依頼する。

### Example 1: ライトとカメラだけのシーン

1. `GET /editor/scene` で現状確認
2. `POST /editor/entities` で Camera エンティティと Light エンティティをまとめて作成
3. ws 接続中なら `POST /api/projects/:p/scene` で明示保存
4. スクリーンショット

### Example 2: 赤い球体を置く

1. `projects/{PROJECT}/Resources/Components/Object/RedSphere/index.ts` を作成
   - `new MXP.SphereGeometry()` + `new MXP.Material({ ... })` を内部で生成して `addComponent(MXP.Mesh, ...)`
2. `npm run typecheck`
3. `POST /editor/entity` でエンティティ作成
4. `POST /editor/entity/:uuid/component { "componentName": "RedSphere" }`
5. 明示保存 + スクリーンショット

### Example 3: カスタムシェーダーで動くオブジェクト

1. コンポーネントディレクトリに `index.vs` / `index.fs` を作成
2. `index.ts` で `import frag from './index.fs'` して Material に渡す
3. `updateImpl` で uniform を更新
4. `GET /editor/shader-errors` で確認
5. シーンへ追加 + スクリーンショット

## Guardrails

- **`scene.json` を直接編集しない**
- **マテリアル / シェーダーを作る独立 API はない**。`.mat` ファイルも存在しない。Material はコンポーネント内で `new MXP.Material(...)` する
- **見た目のあるオブジェクト = カスタムコンポーネント**を基本とする。エディタで Mesh コンポーネントだけ追加して見た目を組み立てる旧フローは廃止
- **コンポーネントの `_data/*` は手動編集しない**（Vite プラグインが上書きする）
- **Component フィールドの `targetUuid` はコンポーネント UUID**（エンティティ UUID と混同しない）
- **未知の field path は silent fail**（成功レスポンスでも反映ゼロ）。`/editor/entity/:uuid/component/:name` の `fieldsDirectory` で実在 path を確認すること（ws 接続時のみ取得可）
- **`/editor/save` は存在しない**。保存挙動はモード依存:
  - ws **未接続**時: `WRITE_ACTIONS` (createEntity/deleteEntity/addComponent/removeComponent/setField) で都度自動保存
  - ws **接続**時: 揮発。確実に保存するには (a) ユーザーに `Ctrl+S` を依頼する or (b) `POST /api/projects/:p/scene` を直接 PUT
- **新規コンポーネントファイル追加 → HMR フルリロードで揮発作業が消えうる**。順序: `(a) component 書く → (b) /editor/components で登録確認 → (c) エンティティ作成`
- **コンポーネント・シェーダー編集後は `npm run typecheck` と `GET /editor/shader-errors` を実行する**
- **ファイル編集後は HMR 反映に 2 秒程度待ってからエラー確認**
- **シーン変更後はスクリーンショット**で目視確認する。ブラウザ未接続時は 503 になる
- 同じ API が 3 回失敗したら `references/troubleshooting.md` を参照する
- プロジェクトが複数ある場合は `check-server.sh` の Browser Connection 欄で接続中プロジェクトを確認してから作業する

## Common Issues

| 症状 | 対処 |
|---|---|
| `ECONNREFUSED` | `npm run dev` でサーバー起動 |
| `503 Service Unavailable` | ブラウザで `http://localhost:3001` を開く（screenshot/shader-errors/console-errors/timeline 系は ws 接続必須） |
| screenshot が真っ黒/真っ白 | PNG で再撮影 (`?format=png` に切替)。JPEG は alpha flatten で暗いシーンが破綻する |
| シェーダーコンパイルエラー | `GET /editor/shader-errors` 確認 → `references/shader-guide.md` |
| field 設定したのに反映されない | `/editor/entity/:uuid/component/:name` で `fieldsDirectory` を確認。**未知の path は silent skip** |
| 直前まで作っていたエンティティが消えた | HMR フルリロード（component 新規追加トリガ）+ ws 接続中は揮発。コンポーネント追加後にエンティティを作り直す |
| カスタムコンポーネントが一覧に出ない | `GET /editor/vite-errors` で transform エラー確認。先頭 `_` のディレクトリは無視される |

詳細は `references/troubleshooting.md`。
