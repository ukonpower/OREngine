# レンダリングフローレビュー（2026-07-14）

`Renderer`（maxpower/Component/Renderer）を中心に、冗長な処理・パフォーマンス・コード圧縮（playerバイト数）の観点でレビューした結果と対処方法のまとめ。

対象コード:
- `packages/maxpower/Component/Renderer/index.ts`（本体 1729行）
- `packages/maxpower/Component/Renderer/DeferredRenderer/index.ts`
- `packages/maxpower/Component/Renderer/PipelinePostProcess/index.ts`
- `packages/maxpower/Component/Renderer/PMREMRender/index.ts`
- `packages/maxpower/Component/Renderer/ProgramManager/index.ts`
- `packages/glpower/packages/glpower/src/GLPowerProgram.ts`
- `packages/orengine/core/Engine/index.ts`（呼び出し側）

## フロー概観（毎フレーム）

`Engine.update` → `Renderer.render` で以下が実行される:

1. シーン走査で RenderStack 構築（`getRenderStack`）
2. ライト収集・シャドウ有無でのソート（`collectLight`）
3. shadowMap レンダリング（全キャストライト）
4. envMap 6面レンダリング
5. PMREM（5ミップ × pmrem/blit = 10パス）
6. deferred: gBuffer → normalSelector / lightShaft / SSAO / SSAOBlur×2 / shading
7. forward: renderOrder グループごとに refractionBuffer へ blit コピー → 描画
8. pipeline post: colorCollection / SSR / ssComposite / DoF×3 / motionBlur×3
9. カメラ付属 PostProcessPipeline
10. UI パス（uiBuffer、gBuffer の深度を共有）
11. 画面への blitFramebuffer

---

## 1. バグ性のもの（最優先）

### 1-1. GLステートキャッシュが一度も書き込まれず常にキャッシュミス

- 場所: `packages/maxpower/Component/Renderer/index.ts:1192`, `:1212`（フィールド定義 `:215`）
- 内容: `_glStateCahce`（typo も含む）は `{}` で初期化された後どこからも代入されない。そのため cullFace / depthTest の判定は常に「キャッシュなし」となり、`gl.enable/disable` が全 draw で毎回発行される。キャッシュ機構のコードだけがバイト数を消費し効果ゼロ。
- 対処: 二択。
  - (a) 削除する: 判定を消して素直に毎draw `gl.enable/disable` する（現状と同じ動作・コードは縮む）
  - (b) 直す: state 変更時に `_glStateCahce[type] = { state: material.cullFace }` を書き込む。冗長なGL呼び出しが減る
  - 64k 目線では (b) を最小実装（`{[key:number]: boolean}` に平坦化）で入れるのが妥当。あわせて typo（Cahce→Cache）修正

### 1-2. `renderPostProcess` のクリアマスクが計算だけされて捨てられている

- 場所: `packages/maxpower/Component/Renderer/index.ts:1118-1138`
- 内容: `clear` 変数に `pass.clearColor` / `pass.clearDepth` に応じて COLOR / DEPTH ビットを積んでいるのに、実際の呼び出しは `gl.clear( COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT )` 固定。`clearColor` のみ指定のパスでも深度がクリアされる。現状動いているのは深度を持つポストプロセスパスがないため。
- 対処: `this.gl.clear( clear );` に修正（1行）。

---

## 2. 死んでいるコード（ノーリスク削除・圧縮に直接効く）

| 対象 | 場所 | 内容 |
|---|---|---|
| `emit("drawPass")` | `Renderer/index.ts:1012`, `:1170` | リスナーがどこにもいない（editor 含め購読者ゼロ）のに毎パス毎フレーム発火。削除 |
| `PMREMRender.setRenderer` / `renderProcess` / `postProcessRenderer` | `PMREMRender/index.ts:146-164` ほか | Renderer 側が直接 `renderPostProcess` を呼ぶ経路に一本化済みで未使用。フィールドごと削除 |
| `GLPowerProgram.resetUniforms` | `GLPowerProgram.ts:273-314` | 約40行、呼び出し元なし。削除 |
| `roughness = roughness;` | `PMREMRender/index.ts:68` | no-op 行。削除 |

補足: `emit("timer")` は DEV ガード付きで editor の GPUTimer（`editor/features/GPUTimer`）が使用中のため正当。GPUタイマークエリ関連は `import.meta.env.DEV` ガードで player ビルドから tree-shake される設計になっており問題ない。

---

## 3. パフォーマンス

### 3-1. envMap + PMREM の毎フレーム無条件更新（GPUコスト最大項目）

- 場所: `Renderer/index.ts:715-727`
- 内容: envMap 6面（`renderCamera("envMap")` ×6）+ PMREM 10パスが、シーンが静的でも・envMap に映るのが sky だけでも毎フレーム走る。shadowMap も同様に全キャストライトを毎フレーム再描画。
- 対処案（シンプルな順）:
  1. envMap 更新を N フレームに1回にする（最小実装。動的シーンでも1〜2フレーム遅れの映り込みは知覚されにくい）
  2. dirty フラグ制御: sky のパラメータ変更・envMap phase を持つ entity の行列/マテリアル変化があったフレームだけ更新
  - shadowMap も同じ方針を適用可能だが、動くオブジェクトが影を落とす intro では毎フレームが正解のこともある。まずは envMap から
- 注意: 更新をスキップしても PMREM の swap（`pmremRender.swap()`）との整合を確認すること（スキップ時は swap もスキップ）。

### 3-2. draw 単位のアロケーション（GC負荷）

| 内容 | 場所 | 対処 |
|---|---|---|
| `setUniforms` で毎draw `{ ...globalUniforms, ...material.uniforms, ...override }` の新オブジェクト生成＋全キー走査 | `Renderer/index.ts:1403` | spread をやめ、3つのオブジェクトを順に直接走査する形へ（`setUniforms` を複数回呼ぶ or 引数を可変長に） |
| uniform ごとに `arrayValue` 配列を新規生成 | `Renderer/index.ts:1679` | モジュールスコープの使い回し配列（`length = 0` でリセット）に |
| ライト uniform 名の文字列連結を毎draw実行（`'directionalLight[' + i + '].direction'` 等） | `Renderer/index.ts:1343-1395` | ライトインデックスごとの名前をキャッシュ（配列 or Map に事前生成） |
| `collectLight` でライト1灯につき毎フレーム `new GLP.Vector` ×3 | `Renderer/index.ts:1039-1041` | LightInfo をライトごとに使い回す（前フレームの配列を保持し copy で更新） |
| `renderCamera` 呼び出しごとに `new GLP.Vector()`（resolution 用）と drawParam オブジェクト | `Renderer/index.ts:947` | 既存の `_tmp` 群の流儀に揃えてフィールドで使い回す |
| `getRenderStack` の再帰でentityごとにイベントオブジェクト生成、`_` クロージャも毎フレーム生成 | `Renderer/index.ts:532-572` | 引数 `(entity, visibility)` のプライベートメソッド化（オブジェクトラップをやめる） |
| forward のソートを毎フレーム `slice().sort()`＋コンパレータ内 `getComponent` | `Renderer/index.ts:758-782` | 小規模シーンでは実害小。触るなら renderOrder 取得を1回にまとめる程度で十分 |

- 優先度は中。デモシーン規模では致命傷ではないが、uniform 名キャッシュと Vector 使い回しは安く直せる。
- 良い点（現状維持）: `GLPowerProgram.setUniform` は値キャッシュで差分時のみ GL 呼び出しする設計。program 再生成は `_lightsUpdated`（ライト数変化）時のみで妥当。

---

## 4. コード圧縮（player バイト数）

### 4-1. エディタ専用の override 機構がランタイムに居る

- 場所: `Renderer/index.ts:1562-1588`（`setOverride` / `clearOverrides` / `_overrides` / `_applyEffectiveConfig`）
- 内容: 利用元は `editor/lib/EditorCamera` のみ（エディタカメラ操作中に motionBlur / dof を切る用途）。エディタ都合の機能がランタイムのバイト数を消費している。
- 対処: ランタイムからは削除し、EditorCamera 側で「元の `PipelineConfig` を控えて `applyPipelineConfig` を直接呼ぶ」実装に移す。boundaries 的にも editor の関心事。

### 4-2. 同一実装の重複

| 内容 | 場所 | 対処 |
|---|---|---|
| `clearFrameBuffer` が完全同一で2箇所 | `DeferredRenderer/index.ts:368`, `PipelinePostProcess/index.ts:380` | 共通ヘルパー1本に（maxpower/utils か GLPowerFrameBuffer のメソッドへ） |
| viewport 設定＋framebuffer バインドのロジック重複 | `Renderer/index.ts:927-962`（renderCamera）と `:1081-1114`（renderPostProcess） | `_bindRenderTarget( renderTarget, viewPort, canvasSize )` のようなプライベートメソッドへ集約 |

### 4-3. コンストラクタの field 登録ボイラープレート

- 場所: `Renderer/index.ts:408-455`（pipeline 系5フィールドがほぼ同型）、`:368-406`（sky 系）
- 対処: pipeline 系はキー配列のループで登録する（`['motionBlur','ssr','ssao','dof','lightShaft']` を回して同型の getter/setter を生成）。minify 後・圧縮後の両方で縮む。
- 注意: `Serializable` の field 群は scene.json の読み書きに使われるためランタイムから消せない。あくまで記述の圧縮。

### 4-4. その他

- 上記 2. の死コード削除がそのまま圧縮に効く（`resetUniforms` 約40行、PMREM 残骸約20行など）。
- ライト uniform 名などの長い文字列（`'directionalLight[0].direction'` 形式）は CPU 側が名前で location を引く構成上 minify できない。これは設計の織り込み済みコストで対処不要。

---

## 推奨の着手順

1. **バグ性のもの**（1-1, 1-2）: クリアマスク修正、GLステートキャッシュの修正 or 削除
2. **死コード削除**（2.）: ノーリスクで圧縮に効く
3. **envMap / PMREM の更新制御**（3-1）: パフォーマンス最大項目
4. **override 機構の editor 側への移動＋重複ロジック統合**（4-1, 4-2）
5. **draw 単位のアロケーション削減**（3-2）: 効果は中

検証方針:
- サイズ: 変更ごとに `npm run build` の packed（`dist/player/out.html`）サイズで実測判断
- 描画: minify 後シェーダーの構文検証は `glslangValidator`、見た目はエディタ（dev サーバー）での実走確認
- 型/静的検査: `npm run typecheck` → `npm run lint --fix`
