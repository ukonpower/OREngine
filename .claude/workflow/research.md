# Research: Gizmo「選択のみ」モードの追加

## タスク概要
現在、エンティティを選択すると必ずtranslate/rotate/scaleのいずれかのGizmoが表示される。Gizmoを表示せず、ただ選択だけするモード（"select"モード）を追加したい。基本はこのモードにしたい。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/ts/Editor/Gizmo/index.ts` | `GizmoMode`, `Gizmo` interface | Gizmoの型定義。`GizmoMode = 'translate' \| 'rotate' \| 'scale'` |
| `packages/orengine/ts/Editor/GizmoManager/index.ts` | `GizmoManager` | Gizmo管理。`setMode()`, `render()`, `activeGizmo` |
| `packages/orengine/ts/Editor/index.ts` | `Editor` | `field("gizmoMode", ...)` でSerializableフィールド登録（行282-286）。`_animate()`内で毎フレーム`_gizmoManager.render()`呼び出し（行402） |
| `packages/orengine/ts/Editor/PointerHandler/index.ts` | `PointerHandler` | マウス処理。ドラッグ開始時にGizmo軸のレイキャスト（行90-141）、選択処理 |
| `packages/orengine/ts/Editor/KeyboardHandler/index.ts` | `KeyboardHandler` | `w`=translate, `e`=rotate, `r`=scale ショートカット |
| `tsx/components/Panels/Screen/index.tsx` | Screen コンポーネント | GizmoモードUIボタン（行76-88）。`T`/`R`/`S`ボタン |
| `tsx/components/Panels/Screen/index.module.scss` | SCSS | ボタンのスタイル |

## 依存関係

```
KeyboardHandler / Screen UI
  ↓ setGizmoMode(mode)
Editor.setField("gizmoMode", mode)
  ↓
GizmoManager.setMode(mode)
  ↓
GizmoManager._activeGizmo = 対応するGizmoインスタンス
  ↓
GizmoManager.render() → activeGizmo.setTarget() → visible制御
  ↓
PointerHandler: activeGizmo.entity.visible チェック → ドラッグ処理
```

## 既存パターン

### GizmoMode型（変更必須）
```typescript
// packages/orengine/ts/Editor/Gizmo/index.ts
export type GizmoMode = 'translate' | 'rotate' | 'scale';
```
→ `'select'` を追加する必要がある

### GizmoManager.setMode（変更必須）
```typescript
public setMode(v: GizmoMode) {
  this._mode = v;
  if (v === 'translate') this._activeGizmo = this._translateGizmo;
  else if (v === 'rotate') this._activeGizmo = this._rotateGizmo;
  else this._activeGizmo = this._scaleGizmo;
}
```
→ `'select'`時に`_activeGizmo`を`null`にする

### GizmoManager.render（変更必須）
render()内で`_activeGizmo`が存在する前提の処理がある:
- `this._activeGizmo.setTarget(...)` 呼び出し
- `this._activeGizmo.entity.visible` チェック
→ selectモード時はGizmo描画をスキップ

### PointerHandler のドラッグ開始（変更必須）
```typescript
if (gizmoManager.activeGizmo.entity.visible) {
  // Gizmo軸のレイキャスト
}
```
→ `activeGizmo`がnullの場合のガード必要

### キーボードショートカット
```typescript
if (e.key === 'w') callbacks.onSetGizmoMode('translate');
if (e.key === 'e') callbacks.onSetGizmoMode('rotate');
if (e.key === 'r') callbacks.onSetGizmoMode('scale');
```
→ `'q'`キーをselectモードに割り当てるのが自然

### Screen UIボタン（行76-88）
```typescript
{(['translate', 'rotate', 'scale'] as const).map((mode) => (
  <div ... onClick={() => setGizmoMode && setGizmoMode(mode)}>
    {mode === 'translate' ? 'T' : mode === 'rotate' ? 'R' : 'S'}
  </div>
))}
```
→ 配列に`'select'`を追加、表示文字と`title`を設定

## 制約・注意点

1. **`_activeGizmo`のnull安全性**: 現在`_activeGizmo`は常にGizmoインスタンスが入っている前提。selectモードでは`null`にするため、`activeGizmo` getter の戻り型を `Gizmo | null` に変更し、参照箇所すべてにnullチェック必要。
2. **SelectionOutlineは維持**: selectモード時もSelectionOutlineは表示したい（選択されていることは分かるべき）。SelectionOutlineはEditor._animate()で別途render()されるため、GizmoManagerのrender()をスキップするだけでOK。
3. **PointerHandler内のドラッグ処理**: `gizmoManager.activeGizmo`がnullならドラッグ処理全体をスキップ。選択処理（onPointerUp）は影響なし。
4. **シリアライズ互換**: `gizmoMode`フィールドがSerializableで保存される。既存のセーブデータには`'select'`がないが、デフォルト値を`'select'`にすれば新規は対応。既存データは従来値のまま読み込まれる。
5. **Editor初期化時のデフォルト値**: 現在のデフォルトモードを`'select'`にする（「基本はそうしたい」という要件）。

## 変更箇所まとめ

1. `GizmoMode`型に `'select'` を追加
2. `GizmoManager.setMode()` で `'select'` 時に `_activeGizmo = null`
3. `GizmoManager.render()` で `_activeGizmo === null` 時にGizmo描画スキップ
4. `GizmoManager` の `activeGizmo` getter の戻り型を `Gizmo | null` に
5. `PointerHandler` の `activeGizmo` 参照箇所にnullチェック追加
6. `KeyboardHandler` に `'q'` → `'select'` マッピング追加
7. `Screen/index.tsx` にselectボタン追加（先頭に配置）
8. Editor初期化のデフォルトgizmoModeを `'select'` に変更
