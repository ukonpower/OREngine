# Plan: SelectionOutline uiBuffer 読み書き競合の修正

## 概要
コミット `9067111` で outlinePass の出力先を uiBuffer に変更したことで、同一バッファへの同時読み書き（WebGL undefined behavior）が発生し、アウトラインが正しく表示されなくなった。outlinePass を2パス構成にして読み書きを分離する。

## 実装ステップ

### 1. outlinePass を2パス構成に変更
- **対象ファイル**: `packages/orengine/ts/Editor/SelectionOutline/index.ts`
- **変更内容**:
  1. outlinePass のコンストラクタから `renderTarget: null` を削除（自動で内部バッファが作成される）
  2. render() 内の `_outlinePass.setRendertarget( uiBuffer )` を `_copyPass.setRendertarget( uiBuffer )` に変更
  3. uiBuffer への書き込み用の copyPass を追加（デフォルトシェーダーで uBackBuffer0 → uiBuffer にコピー）
  4. PostProcess の passes を `[ outlinePass, copyPass ]` に変更
  5. `_copyPass` フィールドを追加

- **コードスニペット（コンストラクタ部分）**:
  ```typescript
  private _copyPass: MXP.PostProcessPass;

  // outlinePass: renderTarget を指定しない → 内部バッファが自動作成される
  this._outlinePass = new MXP.PostProcessPass( gl, {
      frag: outlineFrag,
      // renderTarget: null を削除
      uniforms: {
          uMaskTexture: { value: this._selectionBuffer.textures[ 0 ], type: '1i' },
          uOutlineColor: { value: new GLP.Vector( 1.0, 0.6, 0.0 ), type: '3fv' },
      },
  } );

  // copyPass: outlinePass の出力を uiBuffer にコピー
  this._copyPass = new MXP.PostProcessPass( gl, {} );

  this._outlinePostProcess = new MXP.PostProcess( {
      name: "editorOutline",
      passes: [ this._outlinePass, this._copyPass ],
  } );
  ```

- **コードスニペット（render() 部分）**:
  ```typescript
  // 変更前:
  // this._outlinePass.setRendertarget( engine.renderer.renderTarget.uiBuffer );
  // 変更後:
  this._copyPass.setRendertarget( engine.renderer.renderTarget.uiBuffer );
  ```

- **データフロー**:
  - パス1（outlinePass）: uiBuffer(input/backbuffer) → 内部バッファ（エッジ検出＋合成）
  - パス2（copyPass）: 内部バッファ(backbuffer) → uiBuffer（そのままコピー）
  - 読み書きが分離されるため WebGL の undefined behavior が解消

- **注意点**:
  - PostProcessPass のコンストラクタで `renderTarget` を省略すると内部 FBO が自動作成される（L58-60）
  - `renderTarget: null` は「デフォルトFBに出力」の意味なので省略と null は異なる
  - copyPass はデフォルトシェーダー（pass.fs）を使用し、uBackBuffer0 をそのまま出力するだけ

## 変更対象ファイル一覧
- [x] `packages/orengine/ts/Editor/SelectionOutline/index.ts` - outlinePass を2パス構成に変更

## 考慮事項・リスク
- copyPass のオーバーヘッドは最小（フルスクリーンクワッド1枚の追加描画のみ）
- outlinePass の内部バッファは resize() で自動的にリサイズされる
- 他のエディタ描画（Helper, Wireframe, Gizmo）への影響なし

## テスト方針
- `npm run typecheck` でコンパイルエラーがないことを確認
- エディタでオブジェクトを選択し、オレンジ色のアウトラインが正しく表示されることを確認
- Gizmo やワイヤーフレームとの重なりが正常であることを確認
