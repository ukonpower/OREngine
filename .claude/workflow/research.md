# Research: BLidger FOV反映バグ + CameraControllerコンポーネント作成

## タスク概要
1. **FOVバグ**: Camera系コンポーネント統合（f39f49a）後、BLidgerからのFOVが反映されなくなった
2. **LookAt問題**: MainCamera削除に伴い、LookAtターゲット（"CamLook"エンティティ）の自動設定が失われた
3. **CameraController作成**: LookAtのアタッチやDofTarget設定をスクリプトから行うCameraControllerコンポーネントを作成する

## 根本原因の分析

### FOVバグ: 2つの問題が重なっている

**問題1: タイミング問題（初回ロード時）**
- `onSyncScene`の処理順序:
  1. BLidger追加（コンストラクタで`entity.getComponentsByTag<Camera>("camera")`を呼ぶ）
  2. **この時点でCameraコンポーネントはまだ存在しない**（attachmentsはまだ適用されていない）
  3. `applyAttachments()`でCameraが追加される → デフォルトFOV=50のまま
- WebSocket再同期時はCameraが既に存在するため、BLidgerがFOVを設定できる

**問題2: projectionMatrix更新フラグの問題（再同期時）**
- BLidgerが`camera.fov = cameraParam.fov`を設定するが、`needsUpdateProjectionMatrix = true`を設定しない
- **以前**: MainCameraの`updateCameraParams()`が毎フレーム`needsUpdateProjectionMatrix = true`を設定 → FOV変更が自動反映
- **現在**: Camera.updateImplはアスペクト比変更時のみフラグを立てる → FOV変更が反映されない

### LookAt問題: MainCamera削除による機能喪失

削除されたMainCameraが担っていた機能:
```typescript
// MainCameraコンストラクタ内
this._lookAt = this.entity.addComponent( LookAt );

// sceneCreatedイベントハンドラ内
const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
this._lookAt.setTarget( lookAtTarget );
this._dofTarget = root.findEntityByName( 'CamDof' ) || null;
```
→ 現在、"CamLook"エンティティの検索・LookAtターゲット設定を行うコードが存在しない

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Component/Camera/index.ts` | Camera | カメラ基底クラス。FOV・aspect・projectionMatrix管理 |
| `packages/maxpower/Component/BLidger/index.ts` | BLidger | Blenderデータ→Entity変換。カメラFOV設定（L206-220） |
| `packages/orengine/ts/Controls/LookAt/index.ts` | LookAt | Entity間のLookAt制御コンポーネント（order=9999） |
| `src/ts/Resources/Components/ObjectControls/LookAt/index.ts` | LookAt | LookAtのResources版コピー |
| `src/ts/Resources/Components/ObjectControls/CameraShake/index.ts` | ShakeViewer | カメラシェイクコンポーネント |
| `src/ts/Resources/Components/Utilities/BLidgeClient/index.ts` | BLidgeClient | BLidgeシーン管理。attachments適用（L229-270） |
| `src/ts/Resources/_data/componentList.ts` | COMPONENTLIST | コンポーネント登録リスト |
| `src/ts/Resources/index.ts` | initResouces | リソース初期化 |
| `projects/DemoProject/scene.json` | - | シーン定義。Camera attachments設定 |
| `packages/maxpower/Entity/index.ts` | Entity.lookAt | Entity.lookAt()メソッド |

## 依存関係
- `BLidger` → `Camera`: タグ"camera"でコンポーネント検索、FOV設定
- `BLidgeClient` → `BLidger`: BLidgerコンポーネントをentityに追加
- `BLidgeClient.applyAttachments` → `Camera`: attachmentsからCameraコンポーネントを追加
- `LookAt` → `Camera`: viewMatrix更新（beforeRenderImpl内）
- `LookAt` → `Entity.matrixWorld`: lookAt変換
- MainCamera(削除済) → `LookAt`, `Camera`, `ShakeViewer`: コンポーネント追加・管理

## 既存パターン

### コンポーネント登録パターン
1. `src/ts/Resources/Components/` にコンポーネントクラスを配置
2. `src/ts/Resources/_data/componentList.ts` に登録
3. エディタUIからattachments経由で利用可能になる

### MainCameraが行っていた初期化パターン
- `sceneCreated`イベントをlistenし、BLidgeシーンから名前でエンティティを検索
- "CamLook" → LookAtターゲット
- "CamDof" → DoFフォーカスターゲット

## 制約・注意点

- CameraControllerはResourcesコンポーネントとして作成し、componentListに登録する必要がある
- `scene.json`のattachments設定も更新が必要（CameraControllerを追加）
- LookAtコンポーネントは`order = 9999`で実行される（beforeRender内で最後に実行）
- Camera.fovの`noExport: true`は開発モード専用フィールドの設定であり、FOV自体はBLidgerから設定される
- BLidgerの`rotationOffsetX = -Math.PI / 2`はカメラの座標系補正

## 参考になる既存実装

- 削除されたMainCamera - CameraControllerの機能設計の参考（sceneCreatedイベントリスン、LookAt/DofTarget設定）
- `src/ts/Resources/Components/ObjectControls/CameraShake/index.ts` - ObjectControls配下のコンポーネント配置パターン
