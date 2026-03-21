# Plan: Gizmo「選択のみ」モードの追加

## 概要
エンティティ選択時に必ずGizmo（translate/rotate/scale）が表示される現状を変更し、Gizmoを表示しない「select」モードを追加する。デフォルトをselectモードにする。

## 実装ステップ

### 1. GizmoMode型に'select'を追加
- **対象ファイル**: `packages/orengine/ts/Editor/Gizmo/index.ts`
- **変更内容**: GizmoMode型に`'select'`を追加
- **コードスニペット**:
  ```typescript
  export type GizmoMode = 'select' | 'translate' | 'rotate' | 'scale';
  ```

### 2. GizmoManagerをnullable activeGizmoに対応
- **対象ファイル**: `packages/orengine/ts/Editor/GizmoManager/index.ts`
- **変更内容**:
  - `_activeGizmo`の型を`Gizmo | null`に変更
  - コンストラクタの初期値を`null`、初期モードを`'select'`に
  - `setMode()`で`'select'`時に`_activeGizmo = null`
  - `render()`で`_activeGizmo`がnullの場合は全Gizmo非表示にして早期return
- **コードスニペット**:
  ```typescript
  private _activeGizmo: Gizmo | null;

  constructor() {
      // ...
      this._mode = 'select';
      this._activeGizmo = null;
  }

  public get activeGizmo(): Gizmo | null {
      return this._activeGizmo;
  }

  public setMode( v: GizmoMode ) {
      this._mode = v;
      if ( v === 'translate' ) this._activeGizmo = this._translateGizmo;
      else if ( v === 'rotate' ) this._activeGizmo = this._rotateGizmo;
      else if ( v === 'scale' ) this._activeGizmo = this._scaleGizmo;
      else this._activeGizmo = null;
  }

  public render( ... ) {
      this._translateGizmo.entity.visible = false;
      this._rotateGizmo.entity.visible = false;
      this._scaleGizmo.entity.visible = false;

      if ( !this._activeGizmo ) return;  // selectモード: 早期return

      this._activeGizmo.setTarget( selectedEntity || null, cameraEntity );
      // ...以降は既存通り
  }
  ```

### 3. PointerHandlerのnullチェック追加
- **対象ファイル**: `packages/orengine/ts/Editor/PointerHandler/index.ts`
- **変更内容**: `gizmoManager.activeGizmo`参照箇所（3箇所）にnullチェック追加
- **変更箇所**:
  1. **L90** `onPointerDown`: `if ( gizmoManager.activeGizmo.entity.visible )` → `if ( gizmoManager.activeGizmo && gizmoManager.activeGizmo.entity.visible )`
  2. **L163** `onPointerMove`ドラッグ中: `gizmoManager.activeGizmo.updateDrag(...)` → `gizmoManager.activeGizmo!.updateDrag(...)` (ドラッグ中は必ずactiveGizmoが存在するため`!`で安全)
  3. **L204** `onPointerMove`ホバー: `if ( gizmoManager.activeGizmo.entity.visible )` → `if ( gizmoManager.activeGizmo && gizmoManager.activeGizmo.entity.visible )`
  4. **L281** `onPointerUp`ドラッグ終了: `gizmoManager.activeGizmo.endDrag()` → `gizmoManager.activeGizmo!.endDrag()` (同上)

### 4. KeyboardHandlerにselectモードショートカット追加
- **対象ファイル**: `packages/orengine/ts/Editor/KeyboardHandler/index.ts`
- **変更内容**:
  - `onSetGizmoMode`のコールバック型にGizmoModeを使用
  - `'q'`キーでselectモードに切り替え
- **コードスニペット**:
  ```typescript
  import { GizmoMode } from '../Gizmo';

  onSetGizmoMode: ( mode: GizmoMode ) => void;

  // キーバインド追加
  if ( e.key === 'q' ) callbacks.onSetGizmoMode( 'select' );
  ```

### 5. Screen UIにselectボタン追加
- **対象ファイル**: `packages/orengine/tsx/components/Panels/Screen/index.tsx`
- **変更内容**: gizmoModeボタン配列の先頭に`'select'`を追加
- **コードスニペット**:
  ```tsx
  {( [ "select", "translate", "rotate", "scale" ] as const ).map( ( mode ) => (
      <div
          key={mode}
          className={style.header_gizmoBtn}
          data-active={gizmoMode === mode}
          onClick={() => setGizmoMode && setGizmoMode( mode )}
          title={`${mode} (${mode === 'select' ? 'Q' : mode === 'translate' ? 'W' : mode === 'rotate' ? 'E' : 'R'})`}
      >
          {mode === 'select' ? 'Q' : mode === 'translate' ? 'T' : mode === 'rotate' ? 'R' : 'S'}
      </div>
  ) )}
  ```

## 変更対象ファイル一覧
- [x] `packages/orengine/ts/Editor/Gizmo/index.ts` - GizmoMode型に'select'追加
- [x] `packages/orengine/ts/Editor/GizmoManager/index.ts` - activeGizmo nullable化、selectモード処理
- [x] `packages/orengine/ts/Editor/PointerHandler/index.ts` - activeGizmo nullチェック追加
- [x] `packages/orengine/ts/Editor/KeyboardHandler/index.ts` - 'q'キーショートカット追加、型修正
- [x] `packages/orengine/tsx/components/Panels/Screen/index.tsx` - selectボタン追加

## 考慮事項・リスク
- **PointerHandlerのドラッグ中のnon-null assertion**: `_gizmoDragging === true`の場合、ドラッグ開始時にactiveGizmoが存在したことが保証されるため`!`で安全。ただしドラッグ中にモード変更されるとnullになりうる → ドラッグ中はモード変更しない前提で問題ない（UIがそれを許可しない）
- **シリアライズ互換**: 既存セーブデータには`'translate'`等が保存されており、読み込み時はそのモードが適用される。新規作成時のみデフォルトが`'select'`になる

## テスト方針
- `npm run typecheck` でコンパイルエラーがないこと
- selectモード時にエンティティをクリックして選択できること、Gizmoが表示されないこと
- SelectionOutline（選択アウトライン）はselectモードでも表示されること
- Q/W/E/Rキーでモード切り替えが正常に動作すること
- UIボタンのハイライトが正しく切り替わること
- translate/rotate/scaleモードの動作が従来通りであること
