# コンポーネントカタログ

OREngineで利用可能なコンポーネント一覧とフィールド詳細。

## コンポーネント一覧

| コンポーネント名 | 説明 | 主要フィールド |
|----------------|------|--------------|
| **Mesh** | メッシュ描画 | `geometry/type`, `geometry/width`, `geometry/height`, `geometry/depth`, `geometry/radius`, `geometry/widthSegments`, `geometry/heightSegments`, `geometry/floor`, `geometry/radiusTop`, `geometry/radiusBottom`, `geometry/caps`, `material/name` |
| **Light** | ライト | `fov`, `intensity` |
| **Camera** | カメラ（自動追加） | `fov`, `near`, `far` |
| **MainCamera** | メインカメラマーカー | - |
| **PostProcessPipeline** | ポストプロセス | `postprocess` (boolean[4]) |
| **ShakeViewer** | カメラ揺れ | `power`, `speed` |
| **LookAt** | 注視 | - |
| **SkyBox** | スカイボックス | - |
| **ObjectRotate** | 自動回転 | - |
| **OrbitControls** | オービットコントロール | - |
| **Bloom** | ブルーム | - |
| **Blur** | ブラー | - |
| **ColorGrading** | カラーグレーディング | - |
| **FXAA** | アンチエイリアス | - |
| **Glitch** | グリッチ | - |

## Mesh コンポーネント詳細

### geometry/type の値

| 値 | 説明 | 固有フィールド |
|----|------|--------------|
| `"Cube"` | 立方体 | `geometry/width`, `geometry/height`, `geometry/depth` |
| `"Sphere"` | 球体 | `geometry/radius`, `geometry/widthSegments`, `geometry/heightSegments` |
| `"Plane"` | 平面 | `geometry/width`, `geometry/height` |
| `"Cylinder"` | 円柱 | `geometry/radiusTop`, `geometry/radiusBottom`, `geometry/height`, `geometry/caps` |

### material/name の値

| 値 | 説明 |
|----|------|
| `""` | デフォルトマテリアル（None）- 基本的なグレーシェーディング |
| `"MaterialName"` | リソース登録済みの名前付きマテリアル |

名前付きマテリアルはプロジェクトリソースとして事前登録が必要。
バッチAPIで `"material/name": ""` を指定した場合はデフォルトマテリアルが適用される（正常動作）。
利用可能なマテリアル名は `GET /api/materials` または `GET /api/projects/:p/editor/resources` で確認。

## よく使うコンポーネント組み合わせ

### 標準カメラセット
```
Camera + MainCamera + ShakeViewer + PostProcessPipeline
```
- Camera: カメラ基本機能（fov, near, far）
- MainCamera: レンダリングに使用するカメラのマーカー
- ShakeViewer: カメラ揺れ演出（power, speed）
- PostProcessPipeline: ポストエフェクト（`postprocess` boolean[4]で個別ON/OFF）

### 標準ライト
```
Light
```
- euler（回転）でライト方向を制御
- `lookAt` APIで特定座標に向けることも可能
- `fov`: スポットライトの視野角
- `intensity`: 光の強度

### メッシュオブジェクト
```
Mesh
```
- `geometry/type` でジオメトリ形状を選択
- `material/name` でマテリアルを割当（空文字はデフォルト）

### 装飾コンポーネント
```
ObjectRotate  - エンティティを自動回転させる
LookAt        - 常にカメラ方向を向く
OrbitControls - マウスによるカメラ操作
SkyBox        - 環境マップ/スカイボックス
```
