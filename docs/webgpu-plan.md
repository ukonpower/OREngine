# WebGPU対応計画と進捗（2026-08-01時点）

OREngineをWebGPU対応させるための設計・検証結果・進捗の引き継ぎ書。この文書だけで文脈が再現できるように書いてある。

## ゴールと制約

- **64kb intro（playerビルド）はWebGLのまま維持する**。WebGPUはエディタ/通常用途向けで、64kでは使わない（ユーザー確認済み。したがってWebGPU経路のサイズ超過は気にしなくてよい。ただしWebGL playerのpackedサイズは引き続き最重要指標）
- シェーダー・シーン資産はGLSLを単一ソースとして維持し、二重管理を避ける

## 採用した設計（C案: ビルド時切替の中間基盤）

Rendererを「パス編成オーケストレータ」と「バックエンド（描画コマンド実行部）」に分離し、バックエンドをviteのビルド時切替（alias / エントリ分け）でWebGL/WebGPUから選ぶ。

- playerビルドはGLバックエンドを静的importするため、実行時ディスパッチのコストなし・WebGPUコードはバンドルに入らない
- dev/エディタはサイズ不問なので両バックエンドを持ち実行時切替してよい
- 中立APIの形はWebGL寄りに設計し、変換コストはWebGPU側に寄せる（WebGL側のサイズ負担を構造的にゼロへ）

**却下した代替案**: (A) レンダラー丸ごと2実装 — deferredパイプラインの二重管理で同期漏れが必ず起きる。(B) 実行時RHI抽象 — playerに間接化コストが残る。

## 完了済み

### 1. 実現性スパイク（2026-08-01、`spikes/` 配下・未コミット）

詳細は `spikes/webgpu-gbuffer/REPORT.md` と `spikes/glsl-to-wgsl/REPORT.md`（各1コマンドで再実行可能）。結論:

- **gBuffer 5枚MRT（56 bytes/sample）はWebGPUでそのまま通る**。ただしデフォルトlimit 32を超えるため `requestDevice({ requiredLimits: { maxColorAttachmentBytesPerSample } })` の引き上げが必須（Apple/Metal-3実測128）
- **名前ベースuniform辞書→UBOパック層は約200行で成立**（`'directionalLight[0].direction'` 形式・vec3パディング・struct配列stride対応、readback検証済み）。制約: WGSL側の構造体レイアウトをCPU側が事前に知る必要がある → シェーダー変換器がレイアウト表JSONを吐く設計にする
- **GLSL→WGSL自動変換は実現可能性「高」**。前処理9規則（`spikes/glsl-to-wgsl/preprocess.mjs` のR0〜R8）+ glslangValidator + naga-cli で、最難関の deferredShading.fs が手修正ゼロで変換・naga/Tint両方の検証通過。接続点は既存 `host/vite/plugins/ShaderBuilder` の後段（minify済みGLSLを入口にするとサイズ最小）
- WGSL出力はminify済みGLSL比でgzip後2.3倍（WGSL用minifierが存在しないため）。64kで使わない前提なので許容
- 環境副作用: naga-cli 30.0.0 を `cargo install` 済み（`~/.cargo/bin/naga`）

### 2. 封じ込めリファクタ（2026-08-01、**未コミット**）

playerパスの生gl呼び出し（コマンド系）をすべて集約した。機能等価・描画同一を実走で確認済み。

- **`packages/maxpower/Component/Renderer/GLBackend/index.ts`（新規）**: ステート切替（キャッシュ付き）・bindRenderTarget（viewport+FB+drawBuffers）・clear・blit（restrictColor0オプション付き）・draw発行（blending/instancing/index型/GPUタイマークエリ込み）・collectTimerQueries。Renderer本体は316行減でパス編成とuniform設定に専念
- **glpowerリソース層への追加**（サブモジュール `packages/glpower` 内3ファイル、+65行）: `GLPowerTexture.subImage()` / `attach(img, flipY?)` / `GLPowerTransformFeedback.dispatchPoints(vao)` / `GLPowerBuffer.read(out)`
- **消費側の置換**: Modeler（TF焼き込み）・GPUComputePass（テクスチャ初期化）・GLTFLoader（flipY）・editor/lib と SelectionOutline の同サイズblit
- **意図的に残した例外**:
  - `FrameDebugger`（editor debug）— 矩形指定blit＋cube face再アタッチ。GLBackendにeditor専用メソッドを足すとplayerバンドルに死にコードが入る（クラスメソッドはtree-shakeされない）ため生glのまま
  - `SelectionOutline` の `depthFunc`（editor側）
  - リソース生成のgl直渡し（`Renderer.createRenderTarget`・`PostProcessPass(gl)`・`Geometry.createBuffers(gl)`・builtin PostProcess・`MXP.Engine.gl` 等）— Phase 3のDevice抽象の対象
- **サイズ実測**: packed 51,631（ベースライン）→ 52,034 bytes（+403。抽象化の代金、ユーザー了承済み）
- 検証: typecheck/lint exit 0、playerビルド + 実走で描画同一、静的ビルド exit 0

## 次フェーズ（Phase 3: WebGPUバックエンド実装）— 未着手

順序案:

1. **バックエンドインターフェースの確定**: 現GLBackendの公開メソッド（setMaterialState / setBlendEnabled / bindRenderTarget / clear / blit / draw / collectTimerQueries）を共通シグネチャとして固め、リソース生成（テクスチャ/FB/バッファ/プログラム）をDevice抽象に載せるか・glpower相当のwgpupower(仮)を並置するかを決める。スパイクの `spikes/webgpu-gbuffer/uniform-binder.js` と `main.js` が実装の下敷きになる
2. **シェーダー変換のビルド組み込み**: ShaderBuilderの後段に preprocess（R0〜R8、samplerCube型名の一般化とvertex対応が要る）+ naga を接続し、WGSLとuniformレイアウト表JSONを生成
3. **WebGPUバックエンド実装**: gBuffer/deferredパスから縦に1本通す（スパイクで実証済みの範囲から）。Transform Feedback（Modeler/GPUComputePass）はcompute shaderへの置き換えが必要で、ここが機能面の最難所。`GLPowerTransformFeedback.dispatchPoints` / `GLPowerBuffer.read` / `GLPowerTexture.subImage` が置き換え境界
4. **ビルド時切替の配線**: viteのresolve.aliasでバックエンドモジュールを差し替え。playerはGL固定

## 作業時の注意（次セッション向け）

- **未コミットの変更が2リポジトリにまたがる**: 本体（Renderer/GLBackend/消費側6ファイル）と、サブモジュール `packages/glpower`（3ファイル）。コミットはサブモジュール側が先
- ルート直下の `-s`（310KB, 7/19作成）はこの作業と無関係の既存untrackedファイル
- `.handoff/webgpu-spike/`（スパイク委譲時の引き継ぎ書ログ）は次サイクル開始時に削除してよい
- **player実走検証の手順**: `npm run build` → `cd demo/dist/player && python3 -m http.server 8899` → ブラウザで `out.html`（file://不可）。**「2. Play!」ボタンはシェーダーコンパイル中disabledなので、有効化を待ってからクリック**（disabled中のクリックは黙って捨てられる）。agent-browserは `npx agent-browser`（PATH直では見つからない）
- サイズ判断は必ずpackedサイズ（compeko出力）で行う。ベースライン比較の起点: リファクタ後 52,034 bytes
