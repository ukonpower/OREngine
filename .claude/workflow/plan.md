# Plan: PostProcessをCustomPostProcessコンポーネントに統合

## 概要

個別のPostProcessクラスをComponent扱いする`@ts-nocheck`ハックを解消する。
`CustomPostProcess`コンポーネント1つに統合し、内部で直接PostProcessインスタンスを生成するシンプルな設計にする。

**データフロー（変更後）:**
```
Camera Entity
  ├─ Camera Component
  └─ CustomPostProcess Component (initiator="user", シリアライズ対象)
       └─ 内部で PostProcessPipeline を作成 (initiator="script", シリアライズ対象外)
            ├─ FXAA      ← 直接 new
            ├─ Bloom      ← 直接 new
            ├─ ColorGrading ← 直接 new
            └─ Finalize   ← 直接 new

Renderer.render() → cameraEntity.getComponent(PostProcessPipeline) → 変更なし
```

## 実装ステップ

### 1. PostProcessPipelineの簡素化

- **対象ファイル**: `packages/maxpower/Component/PostProcessPipeline/index.ts`
- **変更内容**:
  - `static postProcessList` を削除
  - `PostProcessListItem` 型を削除
  - `field("postprocess")` を削除
  - `add()`, `remove()`, `resize()`, `postProcesses` getter はそのまま維持
- **変更後のクラス**: constructorでfield登録をしない以外は既存メソッドそのまま

### 2. CustomPostProcessコンポーネントの作成

- **対象ファイル**: `src/ts/Resources/Components/PostProcess/CustomPostProcess/index.ts`（新規）
- **設計**: ファクトリパターンを使わず、内部で直接PostProcessインスタンスを生成
- **コードスニペット**:
  ```typescript
  import * as GLP from 'glpower';
  import * as MXP from 'maxpower';
  import { Engine } from 'orengine';
  import { gl } from '~/ts/Globals';

  import { Bloom } from '../Bloom';
  import { ColorGrading } from '../ColorGrading';
  import { FXAA } from '../FXAA';
  import { Finalize } from '../Finalize';

  export class CustomPostProcess extends MXP.Component {

    constructor( param: MXP.ComponentParams ) {
      super( param );

      // field("postprocess") で {name, enabled}[] をシリアライズ
      // getter: pipeline.postProcesses から {name, enabled}[] を返す
      // setter: _createPostProcesses() を呼んで再構築
    }

    protected setEntityImpl( entity: MXP.Entity ): void {
      entity.addComponent( MXP.PostProcessPipeline );
      this._createPostProcesses();
    }

    protected unsetEntityImpl( prevEntity: MXP.Entity ): void {
      prevEntity.removeComponent( MXP.PostProcessPipeline );
    }

    private _createPostProcesses() {
      const pipeline = this._entity?.getComponent( MXP.PostProcessPipeline );
      if ( !pipeline ) return;

      const engine = Engine.getInstance( gl );
      const rt = engine.renderer.renderTarget;

      // 直接生成
      const bloom = new Bloom( rt.shadingBuffer.textures[ 0 ] );
      bloom.threshold = 1.0;
      bloom.brightness = 1;

      const postProcesses = [
        new FXAA(),
        bloom,
        new ColorGrading(),
        new Finalize(),
      ];

      // config(deserializeされた設定)に基づいてenabled設定
      postProcesses.forEach( pp => {
        const config = this._postProcessConfig.find( c => c.name === pp.name );
        if ( config ) pp.enabled = config.enabled;
        pipeline.add( pp );
      } );
    }
  }
  ```
- **注意点**: `Engine.getInstance(gl)` で Bloom に必要な `shadingBuffer.textures[0]` を取得。ファクトリ不要

### 3. initResourceInstancesからPostProcess登録を削除

- **対象ファイル**: `src/ts/Resources/index.ts`
- **変更内容**:
  - `MXP.PostProcessPipeline.postProcessList = [...]` のブロックを丸ごと削除
  - PostProcess関連のimport（Bloom, FXAA, ColorGrading, Finalize）を削除
  - `builtin.addComponent( "PostProcessPipeline", MXP.PostProcessPipeline )` を削除

### 4. componentList.tsの更新

- **対象ファイル**: `src/ts/Resources/_data/componentList.ts`
- **変更内容**:
  - `@ts-nocheck` を削除
  - 個別PostProcessクラスのimportをすべて削除
  - `CustomPostProcess` のimportを追加
  - `PostProcess`グループの中身を`CustomPostProcess`のみに変更
- **変更後**:
  ```typescript
  import { CustomPostProcess } from '../Components/PostProcess/CustomPostProcess/index.ts';
  // 既存の非PostProcess importはそのまま

  export const COMPONENTLIST: {[key: string]: any} = {
    // ...
    PostProcess: { CustomPostProcess },
    // ...
  };
  ```

### 5. maxpowerのexport更新

- **対象ファイル**: `packages/maxpower/index.ts`
- **変更内容**: `PostProcessListItem` 型のexportを削除

### 6. シーンJSONの更新

- **対象ファイル**: `projects/DemoProject/scene.json`
- **変更内容**: `"name": "PostProcessPipeline"` → `"name": "CustomPostProcess"`
- **propsフォーマットは変更なし**

### 7. scene-builderスキルの更新

- **対象ファイル**: `.claude/skills/scene-builder/references/components-catalog.md`
- **変更内容**: PostProcessPipelineの記述をCustomPostProcessに変更

## 変更対象ファイル一覧

- [x] `packages/maxpower/Component/PostProcessPipeline/index.ts` - field/static削除で簡素化
- [x] `packages/maxpower/index.ts` - PostProcessListItem export削除（export *で自動）
- [x] `src/ts/Resources/Components/PostProcess/CustomPostProcess/index.ts` - 新規作成
- [x] `src/ts/Resources/index.ts` - PostProcess登録削除、built-in登録削除
- [x] `src/ts/Resources/_data/componentList.ts` - @ts-nocheck削除、CustomPostProcessのみ
- [x] `projects/DemoProject/scene.json` - PostProcessPipeline→CustomPostProcess
- [x] `.claude/skills/scene-builder/references/components-catalog.md` - 更新

## 考慮事項・リスク

### PostProcessPipelineのシリアライズ除外
PostProcessPipelineはCustomPostProcessが`entity.addComponent()`で作成 → `initiator="script"`。fieldなし → `serializeEntity`で `!hasFields && initiator !== "user"` → スキップされる。

### setEntityImplとdeserializeの呼び出し順序
1. `addComponent(CustomPostProcess)` → `setEntityImpl` → PostProcessPipeline作成
2. `deserialize(props)` → field setter → PostProcess生成・enabled設定
順序問題なし。

### Bloom の shadingTexture 取得
`Engine.getInstance(gl).renderer.renderTarget.shadingBuffer.textures[0]` で取得。CustomPostProcessは`src/ts/`（アプリ層）にあるため、Engine/glへの依存は問題なし。

## テスト方針
- `npm run typecheck` で型エラーがないことを確認
- `npm run dev` でエディタが正常起動
- DemoProjectのシーンが正常ロードされ、PostProcessが適用されていることを確認
