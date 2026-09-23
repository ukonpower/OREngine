# ビルトインコンポーネント

どのプロジェクトでも使えるコンポーネント。フィールド（path・型・現在値）はここに書き写していないので、`npx tsx scripts/scene.ts components`（全コンポーネントの定義）/ `get <entity>`（付いているものの現在値）で確かめる。パスの書き方は SKILL.md の「最初に」を参照。

登録の実体: `host/app/Resources/registry.ts`（Light / Camera / Mesh）と `packages/orengine/builtin/Components/`（それ以外）。

| 名前 | 実装 | 用途 |
|---|---|---|
| `Camera` | `packages/maxpower/core/Components/Camera` | 描画するカメラ。ピント（DoF）の制御も持つ。tag は `camera` |
| `Light` | `packages/maxpower/core/Components/Light` | ライト（影付き） |
| `Mesh` | `packages/maxpower/core/Components/Mesh` | 描画する形。CLI や JSON から付けても形は入らない（下記） |
| `LookAt` | `builtin/Components/Camera/LookAt` | 注視先へ向ける。field は `target`（entity 参照）。コードからは `setTarget()` |
| `CameraOrbitAnim` | `builtin/Components/Camera/CameraOrbitAnim` | 原点の周りを回るカメラの動き |
| `ShakeViewer` | `builtin/Components/Camera/CameraShake` | カメラの手ぶれ。**ディレクトリ名は `CameraShake` だが登録名は `ShakeViewer`** |
| `OrbitControls` | `builtin/Components/Camera/OrbitControls` | マウス・キーボードでカメラを動かす |
| `ObjectRotate` | `builtin/Components/Object/ObjectRotate` | Y 軸まわりに回し続ける。field は無い（速さは固定） |
| `BLidgeClient` | `builtin/Components/Utility/BLidgeClient` | Blender（BLidge）のシーンを読み込む。ふつうは root に1つ |

`builtin/` は `packages/orengine/builtin/` の略。

## カメラ

ピントは `Camera` だけで決まる（`add-entity --preset Camera` で付く）。注視先へ向けたいときだけ `LookAt` を `add-component` で足す。

- `Camera` のピントの field は `focus/mode` / `focus/target` / `focus/distance` / `focus/speed` / `focus/fNumber`（DoF の絞り。小さいほどボケる）
  - `LookAt` の `target` / `Camera` の `focus/target` は entity 参照で、値は対象の uuid（`tree` で調べる）。BLidge のエンティティの uuid は `blidge:<Blender での名前>`（`demo-webgl/scenes/main.json` では `"blidge:CamLook"` / `"blidge:CamDof"`）
  - `focus/mode`: `auto` = 画面中心の深度（WebGPU のみ。WebGL では `target` と同じ動きになる）/ `target` = `focus/target` のエンティティまでの距離 / `manual` = `focus/distance`
- エンジンのポストプロセスはレンダラーに組み込まれていて、HDR → トーンマップ → SSR / DoF / モーションブラー → FXAA → ブルーム加算 の順に走る。作風のパス（レンズ歪み・色収差など）はエンジンに無く、プロジェクトがシーンカメラの `PostProcessPipeline` にパスを足すコンポーネントで持つ（エンジンの仕上げの後に足した順で走る）。見本は `demo-webgl` / `demo-webgpu` の `Resources/Components/Samples/PostProcess/Finalize`（main シーンのカメラに付いている）。`add` の形はバックエンドで違い、WebGL は `PostProcess` の実体、WebGPU はパスの宣言（`{ name, wgsl }`）を渡す
- レンダラー全体の効果（モーションブラー・SSR・SSAO・DoF・ライトシャフト・トーンマップ・ブルーム等の on/off、空の色）はシーン JSON の `renderer`（`scene-schema.md`）で、CLI では変えられない
- `Camera` の field は `cameraType`（`perspective` / `orthographic`）/ `fov` / `near` / `far` / `orthHeight`（並行投影で見える縦の全幅。横は画面の aspect から決まる）

## ライト

- `Light` の field は `intensity` と、`Camera` から継いだ `fov` 等だけ。**種類（spot / directional）・色・角度・距離・影の有無は field に無く、CLI・シーン JSON では変えられない**。`add-entity --preset Light` で作ったライトはスポットライト（`packages/maxpower/core/Components/Light` の初期値）。変えたいときは同じエンティティに付けるコンポーネントのコードから `getComponent( MXP.Light )` のプロパティを書き換える
- 向き: ライトは**ローカル +Y が光源へ向かう向き**（光は -Y へ進む）。`tree` の `up` で確かめる。コードで向けるなら `light.lookAt( targetWorldPos )`（中で +Y を合わせる補正をしている）。CLI の `set <entity> euler` で向けるときは、`up` が「ライトの位置 − 照らしたい点」の向きになるよう調整する

## Mesh について

`Mesh` の geometry / material はシーン JSON に保存されない（`Mesh` の field は共通の `enabled` / `tag` だけ）。CLI や JSON で `Mesh` を付けても形の無いエンティティになる。見えるものはコンポーネントで作る（`component-development.md`）。

## 共通の注意

- 全コンポーネント共通の field は `enabled` / `tag`
- public プロパティでも `field()` で登録していなければ CLI の `set`・シーン JSON の `props` から変えられない（JSON に書いても無視される）
- 実在しないコンポーネント名をシーン JSON に書くとエラーにはならず、読み込み時に `unresolvedComponents` として保持されるだけ（`errors` の `unresolvedComponents` に出る）
