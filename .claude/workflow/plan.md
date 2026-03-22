# Plan: Renderer Sky設定のデフォルト復元機能

## 概要
エディタでRendererのSky設定を変更した後、デフォルトのシェーダー・色・強度に戻せるようにする。
Serializableフィールドシステムの関数型フィールド（ボタンとして描画される）を活用し、Renderer側に「リセット」フィールドを追加する。React側の変更は不要。

## 設計方針

Serializableフィールドシステムでは、getter が `() => void` 関数を返すフィールドは `Value` コンポーネントで `Button` として描画される（`Value/index.tsx:89-99`）。`SerializeFieldViewValue` は function 型の値を Label なしで返す（`SerializeFieldViewValue/index.tsx:53-56`）。

この仕組みを使い、Renderer の `sky` ディレクトリに関数型フィールドを追加するだけでリセットボタンが自動的にUIに表示される。

## 実装ステップ

### 1. Renderer の skyフィールドにリセットボタンを追加
- **対象ファイル**: `packages/maxpower/Component/Renderer/index.ts`
- **変更内容**: 既存の `skyDir.field("material", ...)` の後に、リセット用の関数型フィールドを追加
- **コードスニペット**:
  ```ts
  skyDir.field( "reset", () => () => {

      this.setField( "sky/skyColor", [ 1.0, 1.0, 1.0 ] );
      this.setField( "sky/groundColor", [ 0.3, 0.3, 0.3 ] );
      this.setField( "sky/intensity", 1.0 );
      this.setField( "sky/material", "" );

  }, { label: "Reset to Default" } );
  ```
- **注意点**:
  - `this.setField()` を使うことで各フィールドの setter が呼ばれ、`noticeField` 経由でUI更新イベントが発火する
  - getter が関数を返す（setter なし）→ 自動的に `readOnly: true, noExport: true` → シリアライズ時に含まれない
  - `opt.label` = `"Reset to Default"` → ボタンのテキストとして使われる

## 変更対象ファイル一覧
- [x] `packages/maxpower/Component/Renderer/index.ts` - skyフィールドにリセットボタン追加

## 考慮事項・リスク
- **デフォルト値のハードコード**: リセット先の値（`[1,1,1]`, `[0.3,0.3,0.3]`, `1.0`, `""`）は `RendererSky` コンストラクタの初期値と一致させる必要がある。将来デフォルト値を変更した場合は両方を更新する必要あり。
- **UI更新の確実性**: `setField` → `noticeField` → `emit("fields/update/...")` の経路でUIが更新されるため、直接的な状態変更（`this.sky.color.set(...)` 等）だけでは不十分。必ず `setField` を使う。

## テスト方針
- エディタのRendererSettings > Sky セクションに「Reset to Default」ボタンが表示されることを確認
- Sky の色・強度・マテリアルを変更後、ボタンクリックで全フィールドがデフォルト値に戻ることを確認
- リセット後にプロジェクトを保存・再読み込みして、デフォルト値が維持されることを確認
- `npm run typecheck` でエラーなし
