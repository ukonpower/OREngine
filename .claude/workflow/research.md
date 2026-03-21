# Research: Gizmoドラッグ終了時のOrbitControlsカメラ移動問題

## タスク概要
Gizmoをドラッグすると、ドラッグ終了時にOrbitControlsによるカメラ移動が発生してしまう。Gizmoドラッグ中のマウス移動量がOrbitControlsの速度として蓄積され、ドラッグ終了後に適用されることが原因。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Controls/OrbitControls/index.ts` | OrbitControls, updateImpl, mouseVelOrbit_, mouseVelMove_ | カメラの軌道制御。マウス速度を蓄積して毎フレーム適用 |
| `packages/orengine/ts/Editor/PointerHandler/index.ts` | PointerHandler, onPointerDown, onPointerUp | Gizmoドラッグの開始/終了管理。OrbitControls.enabled の切り替え |
| `packages/orengine/ts/Engine/Pointer/index.ts` | Pointer | ポインターイベント抽象化層。EventEmitterでstart/move/endを配信 |
| `packages/orengine/ts/Editor/EditorCamera/index.ts` | EditorCamera | エディタカメラ管理。orbitControlsゲッター |

## 根本原因の詳細

### 1. `enabled = false` がイベントリスナーを無効化しない

OrbitControls の `enabled` setter (L109-130) は `_enabled` フラグを設定するだけ。Pointer の EventEmitter リスナー（onPointerStart/Move/End）は登録されたまま動作し続ける。

```typescript
// L109-130: enabled setter - フラグ設定のみ、リスナー制御なし
public set enabled( value: boolean ) {
    this._enabled = value;
    // ...位置の復元処理のみ（true設定時）
}
```

### 2. `_enabled` フラグがどこでもチェックされない

`_enabled` は getter (L132-136) で返されるだけ。以下の箇所で参照されていない:
- `onPointerStart` (L55-61): `touching = true` を無条件で設定
- `onPointerMove` (L63-83): `mouseVelOrbit_.add(delta)` を無条件で実行
- `onPointerEnd` (L85-91): `touching = false` を無条件で設定
- `updateImpl` (L280-307): `orbit_ += mouseVelOrbit_ * 0.001` を無条件で適用

### 3. イベントフロー（時系列）

| ステップ | 処理 | 状態変化 |
|---------|------|---------|
| pointerdown | PointerHandler: `_gizmoDragging=true`, `enabled=false` (L123-124) | Gizmoドラッグ開始 |
| Pointer emit "start" | OrbitControls: `touching=true` (L59) | **touchingがtrue（enabledチェックなし）** |
| pointermove × N | Pointer emit "move" → OrbitControls: `mouseVelOrbit_.add(delta)` (L76) | **速度が蓄積され続ける** |
| pointerup | PointerHandler: `endDrag()`, `enabled=true` (L281-283) | Gizmoドラッグ終了 |
| 次フレーム | OrbitControls.updateImpl: `orbit_ += mouseVelOrbit_ * 0.001` (L293-295) | **蓄積速度でカメラが動く** |

### 4. `touching` がローカル変数

`touching` (L53) はコンストラクタ内のローカル変数のため、外部からリセットする手段がない。

## 修正方針

**OrbitControlsの3つのイベントハンドラで `_enabled` をチェックする + enabled setter で状態リセット**

1. `onPointerStart` の先頭に `if (!this._enabled) return;` 追加
2. `onPointerMove` の先頭に `if (!this._enabled) return;` 追加
3. `onPointerEnd` の先頭に `if (!this._enabled) return;` 追加
4. `touching` をクラスフィールドに昇格
5. `enabled = false` 設定時に `mouseVelOrbit_`, `mouseVelMove_`, `distanceVel_` をゼロリセット + `touching` を false に

## 制約・注意点
- `touching` はコンストラクタ内ローカル変数 → クラスフィールドへ昇格が必要
- `enabled` setter の `true` 設定時には位置復元処理があり、`false` 設定時の処理追加は安全
- `updateImpl` にもガードを入れる方法もあるが、速度蓄積自体を防ぐのが根本的解決
