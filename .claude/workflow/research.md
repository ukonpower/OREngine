# Research: PostProcessをCustomPostProcessコンポーネントに統合

## タスク概要

現在のPostProcess管理の問題点を解消するため、個別のPostProcessクラス（Bloom, FXAA等）をエディタUI上で「コンポーネント」として扱うのをやめ、**CustomPostProcess** という単一のComponentを作成する。CustomPostProcessコンポーネントをCameraのEntityに追加すると、PostProcessPipelineにPostProcess効果が追加される仕組みにする。

### 現状の問題点
1. **型の不整合**: PostProcessクラス（`PostProcess extends Serializable`）はComponentではないのに、`componentList.ts`で`@ts-nocheck`付きでComponent扱い
2. **二重登録**: PostProcessが`componentList.ts`（エディタUI用）と`PostProcessPipeline.postProcessList`（ファクトリ用）の2箇所で登録
3. **PostProcessPipeline.postProcessList**: staticなファクトリリストにハードコードされており拡張性が低い

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/PostProcess/index.ts` | `PostProcess` | PostProcess基底クラス（Serializable継承） |
| `packages/maxpower/PostProcess/PostProcessPass/index.ts` | `PostProcessPass` | Material継承、個別のレンダリングパス |
| `packages/maxpower/Component/PostProcessPipeline/index.ts` | `PostProcessPipeline` | PostProcess管理コンポーネント（static postProcessList, field "postprocess"） |
| `src/ts/Resources/index.ts` | `initResouces`, `initResourceInstances` | コンポーネント登録 + PostProcessPipeline.postProcessList設定 |
| `src/ts/Resources/_data/componentList.ts` | `COMPONENTLIST` | エディタUI用コンポーネントリスト（`@ts-nocheck`） |
| **個別PostProcessクラス**（`src/ts/Resources/Components/PostProcess/`） | | |
| `Bloom/index.ts` | `Bloom` | 複雑（7 passes: bright→blur×4→composite）、srcTexture引数が必要 |
| `Blur/index.ts` | `Blur` | 2 passes (v/h gaussian) |
| `ColorGrading/index.ts` | `ColorGrading` | 1 pass |
| `FXAA/index.ts` | `FXAA` | 1 pass |
| `Finalize/index.ts` | `Finalize` | 1 pass |
| `Glitch/index.ts` | `Glitch` | 1 pass, globalUniforms使用 |
| `OverlayMixer/index.ts` | `OverlayMixer` | 1 pass |
| `PixelSort/index.ts` | `PixelSort` | 可変 passes, resize時に動的再生成 |

### シーンデータ（scene.json）での参照

Camera Entityに以下の形でアタッチ:
```json
{
  "name": "PostProcessPipeline",
  "props": {
    "postprocess": [
      { "name": "FXAA", "enabled": true },
      { "name": "Bloom", "enabled": true },
      { "name": "ColorGrading", "enabled": true },
      { "name": "Finalize", "enabled": true }
    ]
  }
}
```

## 依存関係

- `PostProcess` ← `Serializable`（NOT Component）
- `PostProcessPipeline` ← `Component` ← `Serializable`
- `PostProcessPass` ← `Material`
- `Renderer.render()` → `cameraEntity.getComponent(PostProcessPipeline)` → `postProcessManager.postProcesses` をイテレート
- `Bloom` コンストラクタは `renderTarget.shadingBuffer.textures[0]` が必要（`initResourceInstances`で注入）
- `componentList.ts` の `@ts-nocheck` は PostProcess→Component の型不整合を隠蔽

### データフロー
```
Camera Entity
  ├─ Camera Component (viewMatrix, projectionMatrix)
  └─ PostProcessPipeline Component
       ├─ FXAA (PostProcess)
       ├─ Bloom (PostProcess)
       ├─ ColorGrading (PostProcess)
       └─ Finalize (PostProcess)

Renderer.render() → PostProcessPipeline.postProcesses をチェーン実行
```

## 既存パターン

### PostProcessPipeline の Serializable field パターン
- getter: `{name, enabled}[]` を返す
- setter: `PostProcessPipeline.postProcessList`（staticファクトリリスト）から名前で検索して `factory.create()` でインスタンス生成
- レガシー互換: `boolean[]` フォーマットもサポート

### コンポーネント登録パターン
```typescript
// initResouces() で Resources に登録
builtin.addComponent( "PostProcessPipeline", MXP.PostProcessPipeline );
// componentList.ts でグループ化（エディタUI表示用）
PostProcess: { Bloom, FXAA, ... }
```

### コンポーネント復元フロー
```
scene.json → ProjectSerializer.deserializeEntity()
  → resolver.resolve(componentName) → { component: typeof MXP.Component }
  → entity.addComponent(component) → component.deserialize(props)
```

## 制約・注意点

1. **Bloom の特殊性**: `renderTarget.shadingBuffer.textures[0]` が必要。`initResourceInstances`で注入されている。CustomPostProcessでも同様の仕組みが必要
2. **scene.json の後方互換**: 既存のシーンデータでPostProcessPipelineの`postprocess`フィールドを使っている。新しい仕組みに移行する際、scene.jsonの変更が必要
3. **PostProcessの実行順序**: Rendererは`PostProcessPipeline.postProcesses`配列の順序でチェーン実行。順序管理が重要
4. **Renderer統合**: RendererはCamera EntityからPostProcessPipelineを`getComponent(PostProcessPipeline)`で取得。この仕組みは維持する必要がある
5. **componentList.tsの@ts-nocheck**: PostProcessをComponentListから除去すればこのハックも不要になる可能性

## 参考になる既存実装

- **PipelinePostProcess** (`packages/maxpower/Component/Renderer/PipelinePostProcess/index.ts`): Renderer内蔵のPostProcess（SSR, MotionBlur等）。パイプライン固有のPostProcessの管理方法
- **Mesh Component**: Geometry/Material をSerializable fieldで管理するパターン（リソース名ベースの復元）
- **PostProcessPipeline**: 現在のファクトリベース復元パターンの参考
