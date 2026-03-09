# Plan: BLidger FOV反映修正 + CameraControllerコンポーネント作成

## 概要

Camera系コンポーネント統合（f39f49a）でMainCameraを削除した結果、2つの問題が発生:
1. BLidgerからのFOV設定が反映されない（タイミング問題 + projectionMatrix更新フラグ問題）
2. LookAtターゲットの自動設定が失われた

FOVバグをBLidger側で修正。CustomPostProcessを削除し、PostProcess管理・LookAt・DoFをすべて担うCameraControllerコンポーネントを新規作成する。

## 実装ステップ

### 1. BLidgerのFOV設定を修正

- **対象ファイル**: `packages/maxpower/Component/BLidger/index.ts`
- **変更内容**:
  - コンストラクタのカメラFOV設定部分（L206-220）で`needsUpdateProjectionMatrix = true`を追加
  - `updateImpl`にカメラコンポーネントの遅延取得ロジックを追加（初回ロード時のタイミング問題対策）
- **コードスニペット**:
  ```typescript
  // コンストラクタ内（L206-220）既存部分に追加
  if ( this._cameraComponent ) {
    const cameraParam = this.node.param as BLidgeCameraParam;
    this._cameraComponent.fov = cameraParam.fov;
    this._cameraComponent.needsUpdateProjectionMatrix = true; // 追加
  }

  // updateImpl内に追加（タイミング問題対策）
  if ( this.node.type == 'camera' && !this._cameraComponent ) {
    this._cameraComponent = this.entity.getComponentsByTag<Camera>( "camera" )[ 0 ];
    if ( this._cameraComponent ) {
      const cameraParam = this.node.param as BLidgeCameraParam;
      this._cameraComponent.fov = cameraParam.fov;
      this._cameraComponent.needsUpdateProjectionMatrix = true;
    }
  }
  ```

### 2. CameraControllerコンポーネントの作成（CustomPostProcessを統合）

- **対象ファイル**: `src/ts/Resources/Components/ObjectControls/CameraController/index.ts`（新規）
- **設計**: 旧MainCamera + 旧CustomPostProcessの機能を統合
  - LookAtコンポーネントの追加・ターゲット設定（"CamLook"）
  - DoFターゲット設定（"CamDof"）+ DoFパラメータ更新
  - PostProcessPipelineの作成・管理（旧CustomPostProcessの機能）
  - `sceneCreated`イベントのリスン
- **コードスニペット**:
  ```typescript
  import * as GLP from 'glpower';
  import * as MXP from 'maxpower';
  import { Engine } from 'orengine';
  import { LookAt } from '../LookAt';
  import { Bloom } from '../../PostProcess/Bloom';
  import { ColorGrading } from '../../PostProcess/ColorGrading';
  import { FXAA } from '../../PostProcess/FXAA';
  import { Finalize } from '../../PostProcess/Finalize';
  import { gl } from '~/ts/Globals';

  export class CameraController extends MXP.Component {

    private _lookAt: LookAt;
    private _dofTarget: MXP.Entity | null;
    private _tmpVector1: GLP.Vector;
    private _tmpVector2: GLP.Vector;

    constructor( params: MXP.ComponentParams ) {
      super( params );

      // LookAt
      this._lookAt = this.entity.addComponent( LookAt );

      // DoF
      this._dofTarget = null;
      this._tmpVector1 = new GLP.Vector();
      this._tmpVector2 = new GLP.Vector();

      // PostProcessPipeline（旧CustomPostProcessの機能）
      const pipeline = this.entity.addComponent( MXP.PostProcessPipeline );
      const engine = Engine.getInstance( gl );
      const rt = engine.renderer.renderTarget;

      const bloom = new Bloom( rt.shadingBuffer.textures[ 0 ] );
      bloom.threshold = 1.0;
      bloom.brightness = 1;

      pipeline.add( new FXAA() );
      pipeline.add( bloom );
      pipeline.add( new ColorGrading() );
      pipeline.add( new Finalize() );

      // fieldなし。PostProcessは固定構成で直接生成するのみ

      // sceneCreatedイベント
      const onSceneCreated = ( root: MXP.Entity ) => {
        const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
        this._lookAt.setTarget( lookAtTarget );
        this._dofTarget = root.findEntityByName( 'CamDof' ) || null;
      };
      this.entity.on( 'sceneCreated', onSceneCreated );
      this.once( "dispose", () => {
        this.entity.off( 'sceneCreated', onSceneCreated );
      } );

      // 既存シーンからも検索
      const root = this.entity.getRootEntity();
      const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
      this._lookAt.setTarget( lookAtTarget );
      this._dofTarget = root.findEntityByName( 'CamDof' ) || null;
    }

    protected updateImpl( _event: MXP.ComponentUpdateEvent ): void {
      // DoFパラメータ更新
      const camera = this.entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];
      if ( camera && this._dofTarget ) {
        this.entity.matrixWorld.decompose( this._tmpVector1 );
        this._dofTarget.matrixWorld.decompose( this._tmpVector2 );
        camera.dofParams.focusDistance = this._tmpVector1.sub( this._tmpVector2 ).length();
      }
    }

    public dispose(): void {
      super.dispose();
      this.entity.removeComponent( LookAt );
      this.entity.removeComponent( MXP.PostProcessPipeline );
    }
  }
  ```

### 3. CustomPostProcessの削除

- **対象ファイル**: `src/ts/Resources/Components/PostProcess/CustomPostProcess/index.ts`
- **変更内容**: ファイル削除

### 4. componentList.tsの更新

- **対象ファイル**: `src/ts/Resources/_data/componentList.ts`
- **変更内容**:
  - CustomPostProcessのimport・登録を削除
  - CameraControllerをimportし、ObjectControlsグループに追加
  - PostProcessグループが空になるため削除
- **変更後**:
  ```typescript
  import { CameraController } from '../Components/ObjectControls/CameraController/index.ts';
  // CustomPostProcessのimport削除

  ObjectControls: {
    CameraController,
    ShakeViewer,
    LookAt,
    ObjectRotate,
    OrbitControls,
  },
  // PostProcess: { CustomPostProcess }, ← 削除
  ```

### 5. scene.jsonのattachmentsを更新

- **対象ファイル**: `projects/DemoProject/scene.json`
- **変更内容**: CustomPostProcess → CameraControllerに置き換え（propsなし、PostProcessは固定構成）
- **変更後**:
  ```json
  {
    "name": "Camera",
    "components": [
      { "name": "ShakeViewer", "uuid": "10", "props": { "power": 0.15, "speed": 1 } },
      { "name": "Camera", "uuid": "12" },
      { "name": "CameraController", "uuid": "17" }
    ]
  }
  ```

## 変更対象ファイル一覧

- [x] `packages/maxpower/Component/BLidger/index.ts` - FOV設定時にprojectionMatrix更新フラグ追加 + 遅延取得
- [x] `src/ts/Resources/Components/ObjectControls/CameraController/index.ts` - 新規作成（LookAt + DoF + PostProcess）
- [x] `src/ts/Resources/Components/PostProcess/CustomPostProcess/index.ts` - 削除
- [x] `src/ts/Resources/_data/componentList.ts` - CustomPostProcess→CameraControllerに変更
- [x] `projects/DemoProject/scene.json` - CustomPostProcess→CameraControllerに置き換え

## 考慮事項・リスク

- **sceneCreatedイベントのタイミング**: applyAttachments直後にnoticeEventChildsが発火するため、CameraControllerはイベントを受け取れる
- **BLidger遅延FOV設定**: `updateImpl`でのカメラ検索は`_cameraComponent`がnullの間のみ実行

## テスト方針
- `npm run typecheck` で型エラーがないことを確認
- `npm run dev` でエディタ起動 → DemoProjectロード → FOV・LookAt・PostProcessすべて動作確認
