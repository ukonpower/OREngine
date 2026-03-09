# Plan: Camera系コンポーネントの統合・簡素化

## 概要
Camera, RenderCamera, MainCameraの3コンポーネントを整理し、`Camera`をアタッチするだけでレンダリングされるシンプルな設計にする。PostProcessは`PostProcessPipeline`を別途アタッチし、ユーザーが手動でPostProcessを追加する方式。

**変更方針:**
- `RenderCamera` → 削除（実質未使用、Rendererと完全重複）
- `MainCamera` → 削除（Cameraを直接使う方式に移行）
- `Camera` → aspect自動同期を追加
- `PostProcessPipeline` → PostProcessインスタンスを名前ベースで復元する仕組みを追加
- PostProcess群 → ディレクトリ移動 + postProcessListとして登録

## 実装ステップ

### 1. RenderCameraクラスの削除
- **対象ファイル**: `packages/maxpower/Component/Camera/RenderCamera/index.ts`
- **変更内容**: ファイル/ディレクトリごと削除
- **理由**: Rendererが`Renderer.createRenderTarget()`で同じGBuffer構成を自前管理しており、RenderCameraは一切使われていない
- **注意点**: maxpowerの`index.ts`からexportされていないため外部影響なし

### 2. Cameraにaspect自動同期を追加
- **対象ファイル**: `packages/maxpower/Component/Camera/index.ts`
- **変更内容**: `updateImpl`で`event.resolution`からaspectを自動更新
- **コードスニペット**:
  ```typescript
  protected updateImpl( event: ComponentUpdateEvent ): void {

    const newAspect = event.resolution.x / event.resolution.y;

    if ( this.aspect !== newAspect ) {

      this.aspect = newAspect;
      this.needsUpdateProjectionMatrix = true;

    }

  }
  ```
- **注意点**: ShadowMapCameraはCameraを継承しているが、`displayOut = false`かつaspectはLight側で制御されているため影響なし（ShadowMapCameraが`updateImpl`をオーバーライドしていないか確認要）

### 3. PostProcessPipelineにPostProcess復元機能を追加
- **対象ファイル**: `packages/maxpower/Component/PostProcessPipeline/index.ts`
- **変更内容**: PostProcessインスタンスを名前ベースで保存/復元できるようにfieldを拡張
- **設計**:
  - 静的なファクトリレジストリ `PostProcessPipeline.postProcessList` を追加
  - `field("postprocess")` のシリアライズを `[{name, enabled}]` 形式に変更
  - デシリアライズ時にレジストリから名前でPostProcessインスタンスを生成
- **コードスニペット**:
  ```typescript
  export type PostProcessListItem = {
    name: string;
    create: () => PostProcess;
  }

  export class PostProcessPipeline extends Component {

    // PostProcessファクトリレジストリ
    public static postProcessList: PostProcessListItem[] = [];

    constructor( param: ComponentParams ) {
      super( param );
      // ...

      this.field( "postprocess",
        () => this._postProcesses.map( pp => ({ name: pp.name, enabled: pp.enabled }) ),
        ( v ) => {
          // 既存をクリアして復元
          this._postProcesses = [];
          v.forEach( ( item: {name: string, enabled: boolean} ) => {
            const factory = PostProcessPipeline.postProcessList.find( f => f.name === item.name );
            if ( factory ) {
              const pp = factory.create();
              pp.enabled = item.enabled;
              this._postProcesses.push( pp );
            }
          } );
        },
        // ...
      );
    }
  }
  ```
- **注意点**: シリアライズ形式が `boolean[]` → `{name, enabled}[]` に変わるため、scene.jsonの更新が必要。Rendererのresize処理でPostProcessPipelineのresizeも呼ぶ必要がある（現在はMainCameraがやっていた）

### 4. Renderer側でPostProcessPipeline.resizeを呼ぶ
- **対象ファイル**: `packages/maxpower/Component/Renderer/index.ts`
- **変更内容**: `Renderer.resize()`またはrender時にcameraEntityのPostProcessPipelineも自動リサイズ
- **コードスニペット（render内、既存PostProcessPipeline取得箇所の近く）**:
  ```typescript
  const postProcessManager = cameraEntity.getComponent( PostProcessPipeline );
  if ( postProcessManager ) {
    postProcessManager.resize( this.resolution );
    // ... 既存のPostProcess描画ループ
  }
  ```
- **注意点**: 毎フレーム呼ばれるが、PostProcessPipeline.resize()内部でresolution変化チェックが既にあるため問題なし

### 5. PostProcessクラス群のディレクトリ移動
- **対象**: `src/ts/Resources/Components/Camera/MainCamera/PostProcess/` 配下の全クラスと**共有シェーダー**
  - Bloom, Blur, ColorGrading, FXAA, Finalize, Glitch, OverlayMixer, PixelSort
  - `shaders/gaussBlur.fs` （Bloom, Blurが相対importで参照）
- **移動先**: `src/ts/Resources/Components/PostProcess/`
- **変更内容**: ディレクトリ丸ごと移動（`shaders/`含む）。内部コードの変更なし
- **注意点**: Bloom/Blurの `../shaders/gaussBlur.fs` 相対importはディレクトリ構造が維持されるため壊れない

### 6. MainCameraの削除
- **対象ファイル**: `src/ts/Resources/Components/Camera/MainCamera/index.ts`（ディレクトリごと削除）
- **変更内容**: MainCameraクラスとCamera/ディレクトリを削除
- **注意点**: Step 5でPostProcess群を先に移動してから削除すること

### 7. PostProcess登録とcomponentList更新
- **対象ファイル**: `src/ts/Resources/_data/componentList.ts`, `src/ts/Resources/index.ts`
- **変更内容**:
  - componentList.tsからMainCameraのimportを削除
  - PostProcess群のimportパスを新しい場所に変更
  - COMPONENTLISTからMainCameraカテゴリを削除
  - PostProcess群はCOMPONENTLISTではなく、`PostProcessPipeline.postProcessList`に登録
- **コードスニペット（Resources/index.ts に追加）**:
  ```typescript
  // PostProcess登録
  import { Bloom } from './Components/PostProcess/Bloom';
  import { FXAA } from './Components/PostProcess/FXAA';
  // ...

  MXP.PostProcessPipeline.postProcessList = [
    { name: "FXAA", create: () => new FXAA() },
    { name: "Bloom", create: () => new Bloom( /* srcTexture */ ) },
    { name: "ColorGrading", create: () => new ColorGrading() },
    { name: "Finalize", create: () => new Finalize() },
    // ...
  ];
  ```
- **注意点**: Bloomのコンストラクタは`srcTexture`引数が必要（`shadingBuffer.textures[0]`）。ファクトリ内でRenderer.renderTargetから取得する必要がある。componentList.tsからはPostProcess群を完全に除外（PostProcessはComponentではないため）

### 8. シーンJSONの更新
- **対象ファイル**: `projects/DemoProject/scene.json`
- **変更内容**: Cameraエンティティのcomponentsを更新
- **変更後**:
  ```json
  "components": [
    { "name": "Camera", "uuid": "12" },
    { "name": "ShakeViewer", "uuid": "10", "props": { "power": 0.15, "speed": 1 } },
    {
      "name": "PostProcessPipeline", "uuid": "11",
      "props": {
        "postprocess": [
          { "name": "FXAA", "enabled": true },
          { "name": "Bloom", "enabled": true },
          { "name": "ColorGrading", "enabled": true },
          { "name": "Finalize", "enabled": true }
        ]
      }
    }
  ]
  ```

### 9. scene-builderスキルの更新
- **対象ファイル**: `.claude/skills/scene-builder/references/components-catalog.md`
- **変更内容**: MainCameraの記述を削除/Cameraに変更、PostProcessPipelineの新しいprops形式を記載

## 変更対象ファイル一覧
- [x] `packages/maxpower/Component/Camera/RenderCamera/` - ディレクトリ削除
- [x] `packages/maxpower/Component/Camera/index.ts` - aspect自動同期追加
- [x] `packages/maxpower/Component/PostProcessPipeline/index.ts` - PostProcess名前ベース復元
- [x] `packages/maxpower/Component/Renderer/index.ts` - PostProcessPipeline自動リサイズ
- [x] `src/ts/Resources/Components/PostProcess/` - PostProcess群の移動先（新規）
- [x] `src/ts/Resources/Components/Camera/` - MainCamera削除後、ディレクトリごと削除
- [x] `src/ts/Resources/_data/componentList.ts` - MainCamera削除、PostProcess除外
- [x] `src/ts/Resources/index.ts` - PostProcessList登録追加
- [x] `projects/DemoProject/scene.json` - MainCamera→Camera置換、postprocess形式変更
- [x] `.claude/skills/scene-builder/references/components-catalog.md` - 更新

## 考慮事項・リスク

### Bloomのコンストラクタ引数
Bloomは`srcTexture: GLP.GLPowerTexture`（shadingBuffer.textures[0]）を必要とする。ファクトリ関数内でRenderer.renderTargetにアクセスする必要がある。`Engine.getInstance(gl).renderer.renderTarget`経由で取得可能（MainCameraも同様にやっていた）。

### ShadowMapCameraへの影響
Camera.updateImplにaspect同期を追加するが、ShadowMapCameraはCameraを継承。ShadowMapCameraのaspectはLight側で制御されるべき。対策: ShadowMapCameraで`updateImpl`をオーバーライドして空にするか、Camera側で`displayOut`フラグを見て同期をスキップする。

### MainCameraが持っていた機能の喪失（許容する）
| 機能 | 影響 | 対策 |
|------|------|------|
| near/far設定 (0.5/3000) | デフォルト (0.1/1000) | Cameraのfieldで設定可能 |
| DoF距離計算 | 削除 | 必要なら専用コンポーネントで後で追加 |
| LookAt自動追加 | 削除 | ユーザーが個別アタッチ |
| BLidger sceneCreated連携 | 削除 | 必要なら別コンポーネントで実装 |

## テスト方針
- `npm run typecheck` で型エラーがないことを確認
- `npm run dev` でエディタが正常起動し、カメラ表示が動作することを確認
- DemoProjectのシーンが正常にロードされることを確認
- PostProcessPipelineのデシリアライズで各PostProcessが正しく復元されることを確認
