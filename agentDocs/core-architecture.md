# OREngine コアアーキテクチャ

OREngine は、エンティティコンポーネントシステムをベースにした 3D グラフィックスエンジンです。

## システム構成図

```mermaid
classDiagram
    Engine --|> Entity
    Entity --|> Component
    Component <|-- Camera
    Component <|-- Light
    Component <|-- Mesh
    Component <|-- Renderer
    Renderer <|-- DeferredRenderer
    Renderer <|-- PipelinePostProcess

    class Engine {
        +update()
        +render()
    }

    class Entity {
        +addComponent()
        +getComponent()
        +children[]
    }

    class Component {
        +entity: Entity
        +enabled: boolean
        +update()
    }

    class Camera {
        +projection: Matrix4
        +view: Matrix4
    }

    class Light {
        +color: Vector3
        +intensity: number
    }

    class Mesh {
        +geometry: Geometry
        +material: Material
    }

    class Renderer {
        +render()
        +setSize()
    }
```

## システム概要

### Engine

エンジン全体を管理する中心的なクラスです。シーングラフの更新やレンダリングのライフサイクルを制御します。

### Entity

階層構造を持つシーングラフの基本単位です。複数の Component を保持することができ、3D 空間での位置や回転などの変換を管理します。

### Component

Entity にアタッチされるモジュールのベースクラスです。具体的な機能（レンダリング、カメラ、ライトなど）を実装します。

主要なコンポーネント：

- Camera: シーンのビュー行列とプロジェクション行列を管理
- Light: シーンの照明を制御
- Mesh: 3D モデルの表示を担当
- Renderer: シーンのレンダリングを実行

### レンダリングパイプライン

```mermaid
flowchart TB
    Scene[シーン] --> DR[Deferred Renderer]
    DR --> GBuf[Gバッファ生成]
    GBuf --> Light[ライティング]
    Light --> PP[ポストプロセス]
    PP --> Out[最終出力]

    style Scene fill:#f9f,stroke:#333
    style DR fill:#bbf,stroke:#333
    style GBuf fill:#bfb,stroke:#333
    style Light fill:#fbf,stroke:#333
    style PP fill:#fbb,stroke:#333
    style Out fill:#fff,stroke:#333
```

1. Deferred Renderer がシーンの情報を G バッファに書き込み
2. G バッファの情報を基にライティング計算を実行
3. ポストプロセスパイプラインで画像効果を適用
4. 最終的な画像を出力
