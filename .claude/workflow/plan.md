# Plan: ヘルパー選択時のワイヤーフレーム色変更

## 概要
ヘルパー（empty, camera, light）はワイヤーフレーム表示のためSelectionOutlineが効かず、選択状態がわかりづらい。ヘルパーのワイヤーフレーム色を選択中にオレンジに変更し、視覚的フィードバックを追加する。

## 実装ステップ

### 1. EntityHelperに選択色切り替え機能を追加
- **対象ファイル**: `packages/orengine/ts/Editor/Helpers/EntityHelper.ts`
- **変更内容**: 元の色を保持するプロパティと、選択状態で色を切り替えるメソッドを追加
- **コードスニペット**:
  ```typescript
  // 新規プロパティ
  private _baseColor: number[];
  private _colorUniform: number[];

  // コンストラクタ内
  const color = this._getColor();
  this._baseColor = color;
  this._colorUniform = [ ...color ];
  // mat の uniforms: { uColor: { value: this._colorUniform, type: '3fv' } }

  // 新規メソッド
  public setSelected( selected: boolean ) {
      const c = selected ? [ 1.0, 0.6, 0.0 ] : this._baseColor;
      this._colorUniform[ 0 ] = c[ 0 ];
      this._colorUniform[ 1 ] = c[ 1 ];
      this._colorUniform[ 2 ] = c[ 2 ];
  }
  ```
- **注意点**: uniformのvalueは参照渡しの配列なので、要素を直接書き換える。選択色`[1.0, 0.6, 0.0]`はSelectionOutlineのアウトライン色と統一。

### 2. HelperManager.render()に選択エンティティIDを渡す
- **対象ファイル**: `packages/orengine/ts/Editor/HelperManager/index.ts`
- **変更内容**: `render()`のシグネチャに`selectedEntityId`を追加し、traverse内で選択ヘルパーの色を切り替え
- **コードスニペット**:
  ```typescript
  public render( cameraMode: string, cameraEntity: MXP.Entity | null, engine: Engine, selectedEntityId: string | null ) {
      // ... 既存のtraverse内、helper取得後に追加:
      helper.setSelected( entity.uuid === selectedEntityId );
  }
  ```

### 3. Editor._animate()の呼び出しを修正
- **対象ファイル**: `packages/orengine/ts/Editor/index.ts`
- **変更内容**: `_helperManager.render()`にselectedEntityIdを渡す
- **コードスニペット**:
  ```typescript
  // L398 変更:
  this._helperManager.render( this._editorCamera.cameraMode, cameraEntity, this._engine, this._selectedEntityId );
  ```

## 変更対象ファイル一覧
- [x] `packages/orengine/ts/Editor/Helpers/EntityHelper.ts` - 選択色切り替え機能追加
- [x] `packages/orengine/ts/Editor/HelperManager/index.ts` - render()にselectedEntityId引数追加
- [x] `packages/orengine/ts/Editor/index.ts` - render()呼び出しにselectedEntityId追加

## 考慮事項・リスク
- **選択色の統一感**: SelectionOutlineのアウトライン色 `[1.0, 0.6, 0.0]`（オレンジ）と統一することで一貫性を保つ
- **パフォーマンス**: 毎フレーム`setSelected()`を呼ぶが、配列要素の代入のみなので影響は軽微

## テスト方針
- エディタでempty/camera/lightエンティティを選択し、ワイヤーフレームがオレンジに変わることを確認
- 選択解除後に元の色に戻ることを確認
- メッシュエンティティの選択時にアウトラインが従来通り表示されることを確認
- `npm run typecheck` でエラーがないことを確認
