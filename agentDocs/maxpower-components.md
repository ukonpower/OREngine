# maxpower コンポーネントガイド

## コンポーネントの基本概念

maxpower のコンポーネントシステムは Entity-Component アーキテクチャに基づいています。各エンティティに複数のコンポーネントをアタッチすることで、機能を組み合わせることができます。

```typescript
import { Entity, Component } from 'maxpower';

// エンティティの作成
const entity = new Entity();

// コンポーネントの追加
entity.addComponent(Camera);
entity.addComponent(Light);
entity.addComponent(Mesh);
```

## 主要コンポーネントの解説

### Camera コンポーネント

シーンの視点を制御します。

```typescript
// カメラの基本設定
const camera = entity.addComponent(Camera);
camera.fov = 60; // 視野角
camera.near = 0.1; // ニアクリップ面
camera.far = 1000; // ファークリップ面
camera.aspect = 16 / 9; // アスペクト比

// カメラの配置
entity.position.set(0, 5, 10);
camera.lookAt([0, 0, 0]);
```

### Light コンポーネント

ライティングを制御します。

```typescript
const light = entity.addComponent(Light);

// ディレクショナルライト
light.lightType = 'directional';
light.intensity = 1.0;
light.color.set(1, 1, 1);
light.castShadow = true;

// スポットライト設定
light.lightType = 'spot';
light.angle = Math.PI / 4;
light.blend = 0.5;
light.distance = 10;
```

### Mesh コンポーネント

3D モデルの表示を制御します。

```typescript
const mesh = entity.addComponent(Mesh);

// ジオメトリの設定
mesh.geometry = new CubeGeometry();

// マテリアルの設定
mesh.material = new StandardMaterial({
  color: [1, 0, 0], // 赤色
  roughness: 0.5, // 表面の粗さ
  metalness: 0.0, // 金属度
});
```

### PostProcessPipeline コンポーネント

ポストエフェクトを制御します。

```typescript
const postProcess = entity.addComponent(PostProcessPipeline);

// エフェクトの追加
postProcess.addPass(
  new BloomEffect({
    intensity: 1.0,
    threshold: 0.8,
  })
);

postProcess.addPass(
  new ColorGradingEffect({
    brightness: 1.1,
    contrast: 1.2,
  })
);
```

### GPUCompute コンポーネント

GPU 演算を実行します。

```typescript
const compute = entity.addComponent(GPUCompute);

// 計算用シェーダーの設定
compute.setShader(computeShader);
compute.setBuffers({
  position: positionBuffer,
  velocity: velocityBuffer,
});

// 実行
compute.dispatch(numParticles);
```

## コンポーネントのライフサイクル

```typescript
class CustomComponent extends Component {
  // 初期化時
  onInit() {
    // コンポーネントの初期化処理
  }

  // 毎フレーム
  onUpdate(deltaTime: number) {
    // 更新処理
  }

  // 破棄時
  onDestroy() {
    // クリーンアップ処理
  }
}
```

## コンポーネント間の通信

### 直接参照

```typescript
const camera = entity.getComponent(Camera);
const light = entity.getComponent(Light);
```

### イベントシステム

```typescript
// イベントの発行
this.emit('collision', { target: otherEntity });

// イベントのリッスン
this.on('collision', (data) => {
  // イベント処理
});
```

## 拡張とカスタマイズ

### カスタムコンポーネントの作成

```typescript
class CustomComponent extends Component {
  private someValue: number;

  constructor() {
    super();
    this.someValue = 0;
  }

  onUpdate(dt: number) {
    // カスタムロジック
    this.someValue += dt;
  }
}

// 使用
entity.addComponent(CustomComponent);
```

### マテリアルのカスタマイズ

```typescript
class CustomMaterial extends Material {
  constructor() {
    super({
      vert: customVertexShader,
      frag: customFragmentShader,
      uniforms: {
        uCustomValue: { value: 1.0, type: '1f' },
      },
    });
  }
}
```

## パフォーマンスの最適化

- コンポーネントの無効化: `component.enabled = false`
- コンポーネントの遅延初期化
- 不要なコンポーネントの削除
- イベントリスナーの適切な解除
