# scene.json スキーマリファレンス

> 正はコードの型定義（`packages/orengine/core/ProjectSerializer/index.ts`）である。迷ったらそちらを読む。
> サーバー側の型（`server/Project/types.ts`）も同一構造のミラー。

`<projectDir>/scene.json` は Read/Write/Edit ツールで直接編集する。編集後の反映は devサーバー起動中なら vite watch が検知して自動 full-reload する（API呼び出し不要）。

## トップレベル構造（`OREngineProjectData`）

```jsonc
{
	"name": "New Project",
	"scene": { /* OREngineDataEntity（ルートエンティティ） */ },
	"renderer": { /* Renderer の field。sky/skyColor, pipeline/xxx/enabled 等 */ },
	"timeline/duration": 600,
	"timeline/fps": 60
}
```

- `name`: プロジェクト表示名
- `scene`: ルートエンティティ（`OREngineDataEntity`）。省略不可
- `renderer`: `MXP.Renderer` の `field()` / `fieldDir()` 登録パスをまとめたオブジェクト（例: `sky/skyColor`, `pipeline/motionBlur/enabled`）。既存プロジェクトの値をコピーして調整するのが安全
- `"timeline/duration"` / `"timeline/fps"`: タイムラインの尺とfps。`Engine` の `fieldDir("timeline")` に対応
- それ以外のトップレベルキーも `Engine` の `field()` 登録パス次第で許容される（`[key: string]: unknown`）

## エンティティ（`OREngineDataEntity`）

```ts
interface OREngineDataEntity {
	name: string;
	uuid: string;
	pos?: number[];      // [x, y, z]。省略時は [0, 0, 0]
	rot?: number[];      // [x, y, z]（euler）。省略時は [0, 0, 0]
	scale?: number[];    // [x, y, z]。省略時は [1, 1, 1]
	components?: OREngineDataEntityComponent[];
	childs?: OREngineDataEntity[];
}
```

- `pos` / `rot` / `scale` はデフォルト値と一致する場合は省略してよい（シリアライズ時も省略される）
- `childs` は子エンティティの配列。ネストして木構造を作る
- **ルートエンティティの `uuid` は常に `"0"`**（`server/Project/ProjectData/index.ts` が省略時に補完する。新規プロジェクトでも明示しておくこと）

## コンポーネント（`OREngineDataEntityComponent`）

```ts
interface OREngineDataEntityComponent {
	name: string;                    // コンポーネントのクラス名（ビルトイン or プロジェクト固有）
	uuid: string;
	props?: { [key: string]: any };  // component.field() / fieldDir() で公開されたパスの値
}
```

- `name` に指定できるのは実在するコンポーネント名のみ。実在確認は `packages/orengine/builtin/_data/builtinComponentList.ts`（ビルトイン）と `<projectDir>/Resources/_data/componentList.ts`（プロジェクト固有、自動生成）を Read して確認する。**未知の名前でもエラーにはならず**、`ProjectSerializer.deserializeEntity` が `unresolvedComponents` として保持するだけで反映されない（コンソールに warning が出る）
- `props` のキーはコンポーネント実装側の `this.field(path, ...)` / `this.fieldDir(dir)` で登録されたパスと一致している必要がある。未登録パスは silent skip（`Serializable.deserialize` が `fields_` Map にないキーを無視する）。実装（コンポーネントの `index.ts`）を読んで実在パスを確認すること

## UUID の生成規則

- ルートエンティティ: 常に `"0"`
- それ以外の全エンティティ・コンポーネント: UUID v4（`glpower` の `GLP.ID.genUUID()` と同形式）。生成は `python3 -c "import uuid; print(uuid.uuid4())"` 等で行う
- 既存の UUID と重複しないようにする（シーン内でユニークであればよい。フォーマットは標準 UUID v4 なら何でもよい）

## 実例（`demo/scene.json` 抜粋）

```json
{
	"name": "root",
	"uuid": "0",
	"components": [
		{
			"name": "BLidgeClient",
			"uuid": "1",
			"props": {
				"mode": "json"
			}
		}
	],
	"childs": [
		{
			"name": "Camera",
			"uuid": "4ec0479f-f58f-4644-a7f4-0204813c5c99",
			"components": [
				{ "name": "Camera", "uuid": "3d0e3c4f-7110-43bc-917a-00850232c7b1" },
				{ "name": "CameraController", "uuid": "056176b4-e208-42ce-bd17-5ea264f09d86" }
			]
		}
	]
}
```

## 取り消し

編集を戻したい場合は git を使う。

```bash
git diff demo/scene.json         # 変更差分の確認
git checkout -- demo/scene.json  # 変更を破棄して復元
```

## 反映確認

devサーバー起動中（`npm run dev`）に scene.json を保存すると、`vite-plugins/ProjectWatchReload/index.ts` がファイル変更を検知してブラウザへ `full-reload` を送る。ログに以下が出れば発火している:

```
[vite] page reload demo/scene.json
```

見た目の確認は agent-browser スキルでエディタページ（`http://localhost:<vite-port>`）を開いてスクリーンショットを撮る。専用の観測 API は存在しない。
