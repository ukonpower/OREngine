# 設計改善提案

## 1. コンポーネントのライフサイクル管理

### 現状の課題

- 基本的なライフサイクルメソッド（update, beforeRender, afterRender）のみ
- コンポーネントの初期化や有効/無効切り替え時の制御が不十分
- コンポーネント間の依存関係管理の仕組みがない

### 改善案

```typescript
export abstract class Component {
  protected onStart(): void {}
  protected onEnable(): void {}
  protected onDisable(): void {}
  public static dependencies: (typeof Component)[] = [];
}
```

## 2. メモリとリソース管理

### 現状の課題

- dispose()メソッドの実装が不完全
- WebGL リソースの解放タイミングが不明確
- リソース解放のガイドラインがない

### 改善案

```typescript
export abstract class Component {
  public dispose() {
    try {
      this.disposeResources();
      this._disposed = true;
      this.emit('dispose');
    } catch (error) {
      this.onError(error);
    }
  }

  protected abstract disposeResources(): void;
}
```

## 3. コンポーネントの実行順序制御

### 現状の課題

- 単純な order プロパティのみによる制御
- 複雑な依存関係への対応が困難
- 動的な実行順序の変更が難しい

### 改善案

```typescript
export class ComponentManager {
  private updateGroups: Map<number, Set<Component>>;

  public updateAll(event: ComponentUpdateEvent) {
    Array.from(this.updateGroups.keys())
      .sort((a, b) => a - b)
      .forEach((priority) => {
        this.updateGroups.get(priority)!.forEach((component) => {
          component.update(event);
        });
      });
  }
}
```

## 4. エラー処理の強化

### 現状の課題

- コンポーネントのエラー処理が不十分
- エラーからの復帰機能がない
- エラー報告の仕組みが整っていない

### 改善案

```typescript
export abstract class Component {
  protected onError(error: Error): void {
    console.error(`Component ${this.constructor.name} error:`, error);
    // エラーイベントの発行
    this.emit('error', {
      component: this,
      error: error,
    });
  }
}
```

## 5. パフォーマンス最適化

### 現状の課題

- 毎フレーム更新による不要な処理
- 大量のエンティティ/コンポーネントの処理が非効率
- 更新の条件制御が不可能

### 改善案

```typescript
export abstract class Component {
  protected shouldUpdate(): boolean {
    return true;
  }

  public update(event: ComponentUpdateEvent) {
    if (!this.enabled || !this.shouldUpdate()) return;

    try {
      this.updateImpl(event);
    } catch (error) {
      this.onError(error);
    }
  }
}
```

## 実装の影響

### メリット

1. より細かなコンポーネント制御
2. メモリリークの防止
3. パフォーマンスの向上
4. エラーハンドリングの改善
5. 保守性の向上

### 考慮点

1. 既存コードへの影響
2. マイグレーション計画の必要性
3. パフォーマンスオーバーヘッドの検証

## 6. レンダリングパイプラインの最適化

### 現状の課題

- ポストプロセスのリソース管理が不完全
- パイプラインの実行順序の柔軟性が不足
- 条件付きレンダリングの仕組みがない
- パイプラインの最適化機能が不十分

### 改善案

```typescript
export class PostProcessPipeline extends Component {
  private _stages: Map<string, PostProcessStage>;
  private _dependencies: Map<string, Set<string>>;

  // ステージの追加
  public addStage(
    name: string,
    stage: PostProcessStage,
    dependencies: string[] = []
  ) {
    this._stages.set(name, stage);
    this._dependencies.set(name, new Set(dependencies));
  }

  // 条件付きレンダリング
  public setStageCondition(name: string, condition: () => boolean) {
    const stage = this._stages.get(name);
    if (stage) {
      stage.setRenderCondition(condition);
    }
  }

  // リソースの自動解放
  public dispose() {
    this._stages.forEach((stage) => {
      stage.dispose();
    });
    super.dispose();
  }

  // パイプラインの最適化
  private optimizePipeline() {
    // 不要なステージのスキップ
    this._stages.forEach((stage, name) => {
      if (!stage.shouldRender()) {
        this.skipStage(name);
      }
    });

    // リソースの動的リサイズ
    this._stages.forEach((stage) => {
      if (stage.needsResize()) {
        stage.resize(this._resolution);
      }
    });
  }
}

// 新しいステージクラス
export class PostProcessStage {
  private renderCondition: (() => boolean) | null = null;
  private lastRenderTime: number = 0;
  private needsResize: boolean = true;

  public setRenderCondition(condition: () => boolean) {
    this.renderCondition = condition;
  }

  public shouldRender(): boolean {
    return !this.renderCondition || this.renderCondition();
  }

  public markNeedsResize() {
    this.needsResize = true;
  }

  public resize(resolution: GLP.Vector) {
    // リサイズ処理
    this.needsResize = false;
  }

  public dispose() {
    // リソースの解放
  }
}
```

### 改善点

1. リソース管理

   - 自動的なリソース解放
   - リサイズ処理の最適化
   - メモリ使用量の監視

2. 柔軟な実行制御

   - 依存関係に基づいた実行順序
   - 条件付きレンダリング
   - 動的なパイプライン変更

3. パフォーマンス最適化
   - 不要なステージのスキップ
   - リソースの動的管理
   - レンダリングコストの削減

## 7. シェーダーシステムの強化

### 現状の課題

- シェーダーの最適化機能が限定的
- シェーダーのキャッシュ機能が不足
- 条件付きコンパイルの機能が基本的
- エラーハンドリングが不十分

### 改善案

```typescript
export class ShaderSystem {
  private shaderCache: Map<string, CompiledShader>;
  private includeCache: Map<string, string>;
  private optimizationPasses: ShaderOptimizationPass[];

  constructor() {
    this.shaderCache = new Map();
    this.includeCache = new Map();
    this.optimizationPasses = [
      new DeadCodeElimination(),
      new ConstantFolding(),
      new UniformOptimization(),
    ];
  }

  // インテリジェントなキャッシング
  public compile(source: string, defines: Defines): CompiledShader {
    const key = this.generateCacheKey(source, defines);

    if (this.shaderCache.has(key)) {
      return this.shaderCache.get(key)!;
    }

    const compiled = this.compileShader(source, defines);
    this.shaderCache.set(key, compiled);
    return compiled;
  }

  // 高度な条件付きコンパイル
  private processConditionals(shader: string, defines: Defines): string {
    return shader.replace(
      /#ifdef\s+(\w+)([\s\S]+?)(?:#else([\s\S]+?))?#endif/g,
      (_, condition, ifTrue, ifFalse) => {
        return defines[condition] ? ifTrue : ifFalse || '';
      }
    );
  }

  // シェーダー最適化
  private optimizeShader(shader: string): string {
    return this.optimizationPasses.reduce(
      (code, pass) => pass.optimize(code),
      shader
    );
  }

  // エラーハンドリング
  private validateShader(shader: string): void {
    try {
      const gl = this.getContext();
      const testCompile = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(testCompile!, shader);
      gl.compileShader(testCompile!);

      if (!gl.getShaderParameter(testCompile!, gl.COMPILE_STATUS)) {
        throw new Error(
          `シェーダーコンパイルエラー: ${gl.getShaderInfoLog(testCompile!)}`
        );
      }
    } catch (error) {
      throw new Error(`シェーダー検証エラー: ${error.message}`);
    }
  }

  // パフォーマンスモニタリング
  private monitorPerformance(shader: CompiledShader) {
    const metrics = {
      uniformCount: this.countUniforms(shader),
      textureCount: this.countTextures(shader),
      instructionCount: this.estimateInstructions(shader),
    };

    if (metrics.uniformCount > 100 || metrics.instructionCount > 1000) {
      console.warn('シェーダーパフォーマンス警告:', metrics);
    }

    return metrics;
  }
}

// 最適化パスのインターフェース
interface ShaderOptimizationPass {
  optimize(code: string): string;
}

// 最適化の実装例
class DeadCodeElimination implements ShaderOptimizationPass {
  optimize(code: string): string {
    // 未使用の変数と関数の削除
    return code.replace(
      /^(?:const|uniform|varying)\s+\w+\s+\w+(?:;\s*?$[\r\n?|\n]{2})/gm,
      ''
    );
  }
}

class ConstantFolding implements ShaderOptimizationPass {
  optimize(code: string): string {
    // 定数式の事前計算
    return code.replace(/(\d+\.?\d*)\s*[+\-*/]\s*(\d+\.?\d*)/g, (match) =>
      eval(match).toString()
    );
  }
}
```

### 改善点

1. シェーダー最適化

   - デッドコードの除去
   - 定数畳み込み
   - ループの展開最適化
   - 条件分岐の最適化

2. キャッシング機能

   - インクルードファイルのキャッシング
   - コンパイル済みシェーダーのキャッシング
   - キャッシュの自動無効化

3. エラー処理

   - 詳細なエラーメッセージ
   - コンパイル時の検証
   - ランタイムエラーのハンドリング

4. パフォーマンス
   - シェーダーのメトリクス収集
   - 最適化の自動適用
   - パフォーマンス警告の実装

## 8. テスト体制の強化

### 現状の課題

- コンポーネントの単体テストが不足
- パフォーマンステストの体制が不十分
- ビジュアルリグレッションテストが限定的
- テストカバレッジが低い

### 改善案

```typescript
// コンポーネントテストの基盤
export class ComponentTestBed {
  private entity: Entity;
  private component: Component;

  constructor(componentType: typeof Component) {
    this.entity = new Entity();
    this.component = new componentType({ entity: this.entity });
  }

  // ライフサイクルシミュレーション
  public simulateFrames(frames: number) {
    for (let i = 0; i < frames; i++) {
      this.component.update({
        timeElapsed: i * 16.67,
        timeDelta: 16.67,
        timeCode: i,
      });
    }
  }

  // 状態検証
  public assertComponentState(assertion: (component: Component) => boolean) {
    expect(assertion(this.component)).toBe(true);
  }
}

// パフォーマンステストユーティリティ
export class PerformanceTestUtil {
  private measurements: Map<string, number[]>;

  constructor() {
    this.measurements = new Map();
  }

  // パフォーマンス計測
  public measure(name: string, fn: () => void) {
    const start = performance.now();
    fn();
    const end = performance.now();

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }
    this.measurements.get(name)!.push(end - start);
  }

  // 統計の取得
  public getStats(name: string) {
    const measurements = this.measurements.get(name) || [];
    return {
      avg: measurements.reduce((a, b) => a + b, 0) / measurements.length,
      min: Math.min(...measurements),
      max: Math.max(...measurements),
      p95: this.calculatePercentile(measurements, 95),
    };
  }
}

// ビジュアルリグレッションテスト
export class VisualRegressionTest {
  private canvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;
  private snapshots: Map<string, ImageData>;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('webgl')!;
    this.snapshots = new Map();
  }

  // スナップショットの取得
  public takeSnapshot(name: string) {
    const pixels = new Uint8Array(this.canvas.width * this.canvas.height * 4);
    this.context.readPixels(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      this.context.RGBA,
      this.context.UNSIGNED_BYTE,
      pixels
    );
    this.snapshots.set(
      name,
      new ImageData(
        new Uint8ClampedArray(pixels),
        this.canvas.width,
        this.canvas.height
      )
    );
  }

  // スナップショットの比較
  public compareSnapshot(name: string, threshold: number = 0.01) {
    const current = this.snapshots.get(name);
    const reference = loadReferenceSnapshot(name);
    return compareImages(current!, reference, threshold);
  }
}
```

### テスト実装方針

1. ユニットテスト

   - 各コンポーネントの独立したテスト
   - エッジケースの網羅
   - モック/スタブの適切な使用

2. 統合テスト

   - コンポーネント間の相互作用テスト
   - シーングラフの操作テスト
   - イベント伝播のテスト

3. パフォーマンステスト

   - フレームレート測定
   - メモリ使用量モニタリング
   - GPU リソース使用量の追跡

4. ビジュアルテスト
   - レンダリング結果の検証
   - アニメーション効果の確認
   - シェーダーの出力テスト

### CI/CD パイプライン

```yaml
name: Test Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Unit Tests
        run: npm run test:unit

      - name: Integration Tests
        run: npm run test:integration

      - name: Performance Tests
        run: npm run test:performance

      - name: Visual Regression Tests
        run: npm run test:visual

      - name: Upload Coverage
        uses: codecov/codecov-action@v2

      - name: Store Performance Results
        uses: actions/upload-artifact@v2
        with:
          name: performance-results
          path: performance-report.json
```

## 次のステップ

1. プロトタイプ実装による検証
2. パフォーマンステスト
3. マイグレーションガイドの作成
4. ドキュメントの更新
