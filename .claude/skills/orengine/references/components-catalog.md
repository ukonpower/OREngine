# コンポーネントカタログ

OREngine で利用可能なビルトインコンポーネント一覧。
**見た目のあるオブジェクト（独自 Geometry / Material）は基本的にカスタムコンポーネントで作る**ため、ここに並ぶのは制御系・カメラ系・ユーティリティ系が中心。

利用可能なコンポーネント名は `export class` 名で確認する（操作前に必ず確認。登録名 = クラス名）:
- ビルトイン: `grep -r "export class" packages/orengine/builtin/Components/`
- プロジェクト固有: `grep -r "export class" <projectDir>/Resources/Components/`

## 登録済みビルトイン

| 名前 | グループ | 主要 field（コンポーネント実装の `field()`/`fieldDir()` 呼び出しで確認できる範囲） | 用途 |
|---|---|---|---|
| **Light** | _Built-in | `enabled`, `tag`, `intensity`（+ Camera 継承で DEV 時のみ `fov` / `near` / `far` / `orthWidth` / `orthHeight`） | 向きは `rot`（euler）で指定。`color` / `castShadow` / `angle` / `blend` / `distance` / `decay` は public プロパティだが **field 未登録 → scene.json の `props` では設定不可** |
| **Camera** | _Built-in | `enabled`, `tag`, `fov`, `near`, `far`, `orthWidth`, `orthHeight`（field 登録は `import.meta.env.DEV` ガード付き） | タグ `"camera"` で識別。`displayOut` は public プロパティだが **field 未登録 → props では制御不可** |
| **Mesh** | _Built-in | `enabled`, `tag` のみ | **scene.json の `props` で geometry/material は差し込めない**。カスタムコンポーネント内で `addComponent(MXP.Mesh, { geometry, material })` する前提 |
| **CameraController** | Camera | LookAt 関連 + DoF | **アタッチするだけで `MXP.PostProcessPipeline` + Bloom / FXAA / ColorGrading / Finalize が自動構築**。標準カメラセットの実体 |
| **CameraOrbitAnim** | Camera | `radius`, `speed` 他 | 対象周回アニメ |
| **ShakeViewer** | Camera | `power`, `speed` | カメラ揺れ演出（ディレクトリ名 `CameraShake`、コンポーネント名 `ShakeViewer`） |
| **LookAt** | Camera | `targetName` | 指定エンティティを注視 |
| **OrbitControls** | Camera | - | マウスでカメラ操作（エディタ用途） |
| **ObjectRotate** | Object | 回転速度 | 自動回転 |
| **BLidgeClient** | Utility | - | BLidge 接続 |

## 重要な注意

- **Bloom / FXAA / ColorGrading / Finalize は単独でアタッチできない**。`_PostProcess/` 配下にあり glob のスキャン対象外（先頭 `_` のディレクトリは除外）。`CameraController` を足すと内部で `MXP.PostProcessPipeline` 経由で自動構築される
- **`CustomPostProcess` というコンポーネントは存在しない**（過去の名前）
- **未知のコンポーネント名を scene.json に書いても反映されない**（エラーにもならず `unresolvedComponents` として保持されるだけ）。操作前に自動生成ファイル（`components-catalog.md` 冒頭参照）で実在確認する
- **field 未登録のプロパティ（`Mesh.geometry`, `Camera.displayOut`, `Light.color` 等）は scene.json の `props` では設定できない**。コンポーネントの `index.ts` で `field()` していないパスは silent skip される
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
└─ Light  # 向きは rot（euler）で直接指定する
```

`MXP.Light.lookAt()`（`packages/maxpower/Component/Light/index.ts`）はエンティティを対象に向けた後 X 軸に `+π/2` の補正クォータニオンを掛けている。これは Light の内部的な forward 軸が一般的なエンティティと 90° ずれているためで、**scene.json の `rot` を手で計算する場合もこの補正を加味する**必要がある。正確な向きが必要な場合は、通常の lookAt euler（entity 位置 → target 方向を向く回転）を計算したうえで X に `+90°`（`Math.PI/2`）を加えるか、エディタで実際に回転させてスクリーンショットで確認しながら調整する。

## Mesh コンポーネント単体での使用について

`Mesh` コンポーネントを scene.json 経由でエンティティに追加することは可能だが、`field` 登録は `enabled` / `tag` のみ。**ジオメトリ/マテリアルを props で差し込む手段はない**ため、見える物体を置きたい場合は **必ずカスタムコンポーネント**を作って Geometry / Material / Mesh をその中で組み立てる（`references/component-development.md` 参照）。
