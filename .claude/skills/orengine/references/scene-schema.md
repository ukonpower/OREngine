# シーン JSON（`scenes/<name>.json`）

`<projectDir>/scenes/<name>.json` を読んで確かめる・差分を見るための資料。Claude はシーンの編集にシーン CLI を使い、このファイルは直接書き換えない（書き換えるとタブが full-reload され、未保存の変更が消える）。

型の定義は `packages/orengine/core/ProjectSerializer/index.ts`（`OREngineProjectData` / `OREngineDataEntity` / `OREngineDataEntityComponent`）。

## 全体

`demo-webgl/scenes/main.json` の形（`scene` の中身は省略）:

```json
{
	"name": "demo-webgl",
	"scene": {
		"name": "root",
		"uuid": "0",
		"components": [ ... ]
	},
	"renderer": {
		"sky/skyColor": [ 1, 1, 1 ],
		"sky/groundColor": [ 0.3, 0.3, 0.3 ],
		"sky/intensity": 1,
		"pipeline/motionBlur/enabled": true,
		"pipeline/motionBlur/power": 1,
		"pipeline/ssr/enabled": true,
		"pipeline/ssao/enabled": true,
		"pipeline/dof/enabled": true,
		"pipeline/lightShaft/enabled": true,
		"pipeline/toneMap/enabled": true,
		"pipeline/bloom/enabled": true,
		"pipeline/bloom/threshold": 1,
		"pipeline/bloom/brightness": 1
	},
	"timeline/duration": 600,
	"timeline/fps": 60
}
```

- 1ファイル = 1シーンで自己完結している。シーン名はファイル名（`name` はエンジンの表示名で、シーン名とは別）
- `scene`: ルートエンティティ。uuid は常に `"0"`
- `renderer`: レンダラーの field（空の色・ポストエフェクトの on/off 等）。キーはバックエンドで違う（`demo-webgpu/scenes/main.json` には `pipeline/lightShaft/intensity` 等が増えている）。CLI の `settings renderer` / `set-setting renderer <path> <value>` で読み書きする
- `timeline/duration` / `timeline/fps`: タイムラインの長さ（フレーム数）と fps。`set-setting timeline timeline/duration <値>` で変える

## エンティティ

```jsonc
{
	"name": "Cube",
	"uuid": "…",                 // UUID v4。CLI の add-entity が作る
	"pos": [ 0, 1, 0 ],          // 省略時 [0, 0, 0]。親からの相対
	"rot": [ 0, 0, 0 ],          // euler（ラジアン）。省略時 [0, 0, 0]。CLI では euler
	"scale": [ 1, 1, 1 ],        // 省略時 [1, 1, 1]
	"components": [ … ],
	"childs": [ … ]              // 子エンティティ
}
```

初期値と同じ `pos` / `rot` / `scale` は保存時に省かれる。

## コンポーネント

```jsonc
{
	"name": "CameraController",  // 登録名（クラス名）
	"uuid": "…",
	"props": {                   // field() で登録した path と値
		"lookAt/target": "blidge:CamLook",
		"focus/mode": "target"
	}
}
```

- `props` のキーは CLI の `get` の `fields[].path` と同じ。field に登録されていないキーは読み込み時に無視される
- 実在しない `name` はエラーにならず `unresolvedComponents` として保持される（`errors` に出る）

## BLidge のエンティティに付けたコンポーネント

BLidge / glb が作ったエンティティ（`tree` で `initiator: "script"`）は `scene` のツリーに載らない。そこに付けたコンポーネントは root の `BLidgeClient` の `props.attachments` に、**エンティティ名**をキーにして保存される。

```json
"attachments": [
	{
		"name": "OREngineCube",
		"components": [
			{ "name": "OREngineCube", "uuid": "056176b4-e208-42ce-bd17-5ea264f09d86" }
		]
	}
]
```

BLidge のエンティティの uuid は `blidge:<Blender での名前>` で、entity 参照の field（`lookAt/target` 等）にはこの形で入る。

## 差分を見る・戻す

```bash
git diff <projectDir>/scenes/
```

タブ上の未保存の操作は `undo`（タブ接続時）で戻す。保存済みのファイルを戻すのはユーザーに確認してから行う。
