# Plan: Gizmoドラッグ終了時のOrbitControlsカメラ移動問題の修正

## 概要
Gizmoドラッグ中にOrbitControlsの `_enabled` フラグがイベントハンドラでチェックされないため、マウス移動量が `mouseVelOrbit_` に蓄積され、ドラッグ終了後にカメラが動いてしまう。OrbitControlsのイベントハンドラに `_enabled` ガードを追加し、`enabled = false` 時に内部状態をリセットする。

## 実装ステップ

### 1. `touching` をクラスフィールドに昇格
- **対象ファイル**: `packages/orengine/ts/Controls/OrbitControls/index.ts`
- **変更内容**: コンストラクタ内ローカル変数 `touching` (L53) をクラスのprivateフィールドに昇格させる。`enabled = false` 時にリセットするために外部アクセスが必要。
- **コードスニペット**:
  ```typescript
  // クラスフィールドに追加
  private touching_: boolean = false;

  // コンストラクタ内の let touching = false; を削除し、
  // touching → this.touching_ に置換
  ```

### 2. イベントハンドラに `_enabled` ガードを追加
- **対象ファイル**: `packages/orengine/ts/Controls/OrbitControls/index.ts`
- **変更内容**: `onPointerStart`, `onPointerMove`, `onPointerEnd` の先頭に `if (!this._enabled) return;` を追加
- **コードスニペット**:
  ```typescript
  const onPointerStart = ( _e: PointerEventArgs ) => {
      if ( !this._enabled ) return;  // 追加
      if ( this.touching_ ) return;
      this.touching_ = true;
  };

  const onPointerMove = ( e: PointerEventArgs ) => {
      if ( !this._enabled ) return;  // 追加
      if ( !this.touching_ ) return;
      // ...既存処理
  };

  const onPointerEnd = ( _e: PointerEventArgs ) => {
      if ( !this._enabled ) return;  // 追加
      if ( !this.touching_ ) return;
      this.touching_ = false;
  };
  ```

### 3. `enabled = false` 時に内部状態をリセット
- **対象ファイル**: `packages/orengine/ts/Controls/OrbitControls/index.ts`
- **変更内容**: `enabled` setter の `false` 分岐で速度・touchingをリセット
- **コードスニペット**:
  ```typescript
  public set enabled( value: boolean ) {
      this._enabled = value;
      if ( value ) {
          // ...既存の位置復元処理
      } else {
          this.mouseVelOrbit_.set( 0, 0, 0 );
          this.mouseVelMove_.set( 0, 0, 0 );
          this.distanceVel_ = 0;
          this.touching_ = false;
      }
  }
  ```

## 変更対象ファイル一覧
- [x] `packages/orengine/ts/Controls/OrbitControls/index.ts` - touching フィールド昇格、enabledガード追加、状態リセット

## 考慮事項・リスク
- **リスク**: `touching` の参照箇所が多いため、置換漏れに注意 → コンストラクタ内の全 `touching` を `this.touching_` に統一
- **リスク**: `mouseVelOrbit_.set(0,0,0)` の引数 → Vector クラスの `set` メソッドのシグネチャを確認する

## テスト方針
- Gizmoをドラッグ→離す→カメラが動かないことを確認
- 通常のOrbitControlsによるカメラ操作が正常に動作することを確認
- `npm run typecheck` でコンパイルエラーがないことを確認
