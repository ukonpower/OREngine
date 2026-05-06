# コンポーネントカタログ

OREngine で利用可能なビルトインコンポーネント一覧。
**見た目のあるオブジェクト（独自 Geometry / Material）は基本的にカスタムコンポーネントで作る**ため、ここに並ぶのは制御系・カメラ系・ユーティリティ系が中心。

利用可能なコンポーネント名は `GET /api/projects/:p/editor/components` で取得できる（操作前に必ず確認）。

## 登録済みビルトイン（`/editor/components` に常に出る確定リスト）

| 名前 | グループ | 主要 field（`fieldsDirectory` で確認できる範囲） | 用途 |
|---|---|---|---|
| **Light** | _Built-in | `enabled`, `tag`, `intensity`（+ Camera 継承で DEV 時のみ `fov` / `near` / `far` / `orthWidth` / `orthHeight`） | 方向は `POST /editor/entity/:uuid/lookAt` で設定（Light 補正自動）。`color` / `castShadow` / `angle` / `blend` / `distance` / `decay` は public プロパティだが **field 未登録 → API 経由では設定不可** |
| **Camera** | _Built-in | `enabled`, `tag`, `fov`, `near`, `far`, `orthWidth`, `orthHeight`（field 登録は `import.meta.env.DEV` ガード付き） | タグ `"camera"` で識別。`displayOut` は public プロパティだが **field 未登録 → API 経由では制御不可** |
| **Mesh** | _Built-in | `enabled`, `tag` のみ | **API で geometry/material は差し込めない**。カスタムコンポーネント内で `addComponent(MXP.Mesh, { geometry, material })` する前提 |
| **CameraController** | Camera | LookAt 関連 + DoF | **アタッチするだけで `MXP.PostProcessPipeline` + Bloom / FXAA / ColorGrading / Finalize が自動構築**。標準カメラセットの実体 |
| **CameraOrbitAnim** | Camera | `radius`, `speed` 他 | 対象周回アニメ |
| **ShakeViewer** | Camera | `power`, `speed` | カメラ揺れ演出（ディレクトリ名 `CameraShake`、コンポーネント名 `ShakeViewer`） |
| **LookAt** | Camera | `targetName` | 指定エンティティを注視 |
| **OrbitControls** | Camera | - | マウスでカメラ操作（エディタ用途） |
| **ObjectRotate** | Object | 回転速度 | 自動回転 |
| **BLidgeClient** | Utility | - | BLidge 接続 |

## 重要な注意

- **Bloom / FXAA / ColorGrading / Finalize は単独でアタッチできない**。`_PostProcess/` 配下にあり ResourceManager のスキャン対象外。`CameraController` を足すと内部で `MXP.PostProcessPipeline` 経由で自動構築される
- **`CustomPostProcess` というコンポーネントは存在しない**（過去の名前。skill から完全削除済み）
- **未知のコンポーネント名は addComponent で 400 エラー**。操作前に `GET /editor/components` で実在確認
- **field 未登録のプロパティ（`Mesh.geometry`, `Camera.displayOut`, `Light.color` 等）は API 経由で設定できない**。`POST /editor/field` は成功レスポンスを返しても silent skip（後述）
- 全 Component 共通の field は `enabled`, `tag` のみ（`MXP.Component` 基底クラスで登録）

## カメラの定番セット

```
Entity (MainCamera)
├─ Camera           # 描画用カメラ
└─ CameraController # PostProcessPipeline (Bloom/FXAA/CG/Finalize) を自動構築
   └─ (内部で LookAt も自動アタッチ)
```

ShakeViewer や CameraOrbitAnim は必要に応じて追加。

## ライト

```
Entity (Light)
└─ Light  # 方向は POST /editor/entity/:uuid/lookAt { target: [x,y,z] } を使う
```

`euler` 直指定だと Light 内部の +π/2 X 補正が自分側で必要になる。`lookAt` API はサーバー側で `isLight` 判定して補正を入れるので **lookAt を使うのが最も確実**。

## Mesh コンポーネント単体での使用について

`Mesh` コンポーネントを API 経由でエンティティに追加することは可能だが、`field` 登録は `enabled` / `tag` のみ。**ジオメトリ/マテリアルを API で差し込む手段はない**ため、見える物体を置きたい場合は **必ずカスタムコンポーネント**を作って Geometry / Material / Mesh をその中で組み立てる（`references/component-development.md` 参照）。
