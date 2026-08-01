# WebGPU対応計画と進捗（2026-08-01時点）

OREngineをWebGPU対応させるための設計・検証結果・進捗の引き継ぎ書。この文書だけで文脈が再現できるように書いてある。

## ゴールと制約

- **64kb intro（playerビルド）はWebGLのまま維持する**。WebGPUはエディタ/通常用途向けで、64kでは使わない（ユーザー確認済み。したがってWebGPU経路のサイズ超過は気にしなくてよい。ただしWebGL playerのpackedサイズは引き続き最重要指標）
- シェーダー・シーン資産はGLSLを単一ソースとして維持し、二重管理を避ける

## 採用した設計（C案: ビルド時切替の中間基盤）

Rendererを「パス編成オーケストレータ」と「バックエンド（描画コマンド実行＋リソース生成）」に分離し、バックエンドをviteのビルド時alias（`@or-backend`）でWebGL/WebGPUから選ぶ。

- playerビルドはGLバックエンド固定のため、実行時ディスパッチのコストなし・WebGPUコードはバンドルに入らない（esbuildでの混入ゼロを確認済み）
- 中立APIの形はWebGL寄り（フォーマット等の定数はGL enum数値のまま）に設計し、変換コストはWebGPU側に寄せる
- **却下した代替案**: (A) レンダラー丸ごと2実装 — deferredパイプラインの二重管理で同期漏れが必ず起きる。(B) 実行時RHI抽象 — playerに間接化コストが残る

## 完了済み

### 1. 実現性スパイク（2026-08-01、`spikes/` 配下）

詳細は `spikes/webgpu-gbuffer/REPORT.md` と `spikes/glsl-to-wgsl/REPORT.md`。gBuffer 5枚MRT（要 `requiredLimits.maxColorAttachmentBytesPerSample` 引き上げ）、名前ベースuniform辞書→UBOパック層、GLSL→WGSL自動変換（前処理規則+naga）のすべてが実現可能と実証。

### 2. 封じ込めリファクタ（コミット `10ae4d3`）

Rendererからコマンド系の生gl呼び出しをGLBackendへ集約。

### 3. Phase 3（2026-08-01、**未コミット**。引き継ぎ書ログ: `.handoff/webgpu-phase3/`）

3サブタスクに分割してopusへ委譲し、レビュー済み。

- **Backendインターフェース化**: `packages/maxpower/Backend/index.ts` に中立インターフェース（コマンド7種＋リソースファクトリ6種）。GLBackendは `packages/maxpower/Backend/GLBackend/` へ移設。`MXP.Engine.gl` は `backend: Backend` に置換（gl直参照の経路は消滅）。editor/Modeler/TexProceduralはGL専用のまま `GLBackend` へのcastで生glを使用。GL enum定数は `MXP.GL`（`= WebGL2RenderingContext`）経由
- **GLSL→WGSL変換サービス**: `host/vite/plugins/WgslTranspiler/`。devサーバーの `POST /__orengine/wgsl` で、shaderParse出力（defines・ライト数・ループ展開済みのminify済みGLSL）をオンデマンド変換（前処理R0〜R9 + glslangValidator -E + naga-cli）。レスポンスはWGSL＋uniformレイアウト＋テクスチャ/attributeバインディング表。R9はクリップ空間差（GL z∈[-1,1]/Y上 → WebGPU z∈[0,1]/Y下）をvertex末尾の `gl_Position` 変換で吸収。一括検証は `npm run build && node scripts/verify-wgsl.mjs`（現在: 必須セット48/48 PASS、demo 34/47、合計89/102）
- **WebGPUBackend**: `packages/maxpower/Backend/WebGPUBackend/`（index/Resources/Program/UniformBinder、約2,000行）。device非同期初期化（ready前のコマンドはスキップ）、GLの「bind→clear→draw×N」をrender passへ写像、GLテクスチャユニット意味論の模倣、bind group layout手書き（rgba32floatは unfilterable-float）、blitはfb間copyTextureToTexture＋画面へはフルスクリーン描画（Y反転）。`@webgpu/types` 導入済みで `any` なし
- **切替配線**: `host/vite/configs.ts` の `sharedResolve(projectDir, backend)`。player/staticは `'webgl'` 固定、devは `ORENGINE_BACKEND=webgpu` でWebGPU。`webgpu-test/` に最小テストプロジェクト（カメラ＋spotライト＋立方体）
- **`npm run wgpu`**: `ORENGINE_BACKEND=webgpu npm run dev` のショートカット。wgpu時はdevサーバーが**HTTPS**で立つ（`@vitejs/plugin-basic-ssl` が証明書を自動生成・キャッシュ。自己署名のため初回はブラウザ警告を通過する）。ネットワークIP経由のアクセスでもsecure context要件を満たすため。`.tex` 手続きテクスチャ（TexProcedural、GL専用）は非GLバックエンドでは警告付きスキップ（`import.meta.env.DEV` で括りplayerビルドには影響ゼロ）
- **実走検証で追加した規則・修正（2026-08-01）**: (a) **R10（暗黙LODの明示化）** — WGSLは非一様制御フロー内の暗黙LODサンプリングを禁止（Tintがエラー）するため、`texture()`/`textureOffset()`/`textureProj()` を全ステージで `textureLod` 系＋LOD 0へ機械置換。deferredShading/ssr/ssao/lightShaft/motionBlurのcreateShaderModule失敗がこれで解消（vertexの暗黙LOD問題も同時に解消）。(b) **depthテクスチャのバインド** — depth24plusをfloatサンプルする場合は `unfilterable-float`＋non-filteringが必須のため、`isUnfilterable` にdepthフォーマットを追加
- **副次修正**: (a) `spikes/` の中間生成物がshader_minifierを落とし**リポジトリ全体がminifyなしでビルドされていた**のを発見、ShaderBuilderの `SKIP_DIRS` に `spikes` を追加して復旧。**packedベースラインは 52,034 → 39,231 bytes に更新**（52k台は故障状態の水増し値だった）。(b) `frag_h.part.glsl` のvarying宣言順をvert_hと一致させた（WGSLはロケーション番号で結線するため、不一致だと法線と位置が入れ替わる）

検証済み: typecheck / lint / `npm run build`（packed 39,231 bytes、WebGPU混入ゼロ） / `npm run build:static` / verify-wgsl すべて通過。

## 実走検証の結果（2026-08-01実施）

`ORENGINE_PROJECT=webgpu-test ORENGINE_BACKEND=webgpu npm run dev` をChrome（agent-browser）で確認。

- **縦一本は成立**: エディタがWebGPUバックエンドで起動し、スカイ＋キューブが gBuffer→deferred shading→PipelinePostProcess（DoFのボケも効いている）→画面 の経路で描画される。WebGPUバリデーションエラーは**ゼロ**。上下反転・カリング异常なし（R9・画面blitのY反転・`frontFace: 'cw'` の整合OK）
- 既知の制約どおりの警告のみ: shadowMapパスのdrawスキップ（fragment出力数3 vs アタッチメント1）、editorのGL専用機能無効化、uniform未使用警告（正常系）
- **キューブが黒く描画される**: shadowMapパスがスキップされ未初期化のシャドウマップをサンプルするため、スポットライトが全面遮蔽扱いになる。下記残課題「出力数不一致への恒久対応」で解消する見込み
- WebGL側のリグレッションなし: `npm run dev`（demoプロジェクト・GL）はエラーゼロで従来どおり完全描画
- **demoプロジェクトもWebGPUでほぼ描画される**（`npm run wgpu`・HTTPS）: OREngineロゴのシーンがライティング・DoF・モーションブラー込みで描画。SkyBoxのみ変換FAIL（minify名衝突、既知）で背景が黒
- uniform警告はプログラム生成ごとに出るためコンソールが騒がしい（約600件）。実害はないが抑制の余地あり

## 残課題（後続フェーズ）

- shadowMap / envMap / PMREM の出力数不一致への恒久対応（ダミーアタッチメント等）→ ライティングの完全動作（現状はこれが原因でキューブが黒い）
- Transform Feedbackのcompute化（Modeler。リポジトリ内に呼び出しゼロのため後回しでよい）
- TexProcedural（`.tex`）・GLTFLoaderテクスチャのWebGPU対応、editor機能（SelectionOutline/FrameDebugger/AssetPreviewManager）のWebGPU対応（現状はGL時のみ生成のガード付き）
- timestamp-queryによる `collectTimerQueries` 実装
- demoシェーダーの変換FAIL（現在 35/47）: ポイントスプライト（dust、WebGPUに機能が無い）、minify済みGLSLの構造体名/変数名衝突をnagaが解釈できない件（SkyBox。shader_minifier側の設定検討）。yakiSoba.vsの暗黙LODはR10で解消済み
- Lightの `lightType` がserialize対象でなくscene.jsonからdirectionalにできない（webgpu-testはspotで作成）

## 作業時の注意（次セッション向け）

- **Phase 3の変更は未コミット**。`git status` の変更＋未追跡（`packages/maxpower/Backend/`、`host/vite/plugins/WgslTranspiler/`、`scripts/verify-wgsl.mjs`、`webgpu-test/`）が一式。glpowerサブモジュールは無変更
- ルート直下の `-s`（310KB, 7/19作成）はこの作業と無関係の既存untrackedファイル
- `.handoff/webgpu-phase3/`（委譲時の引き継ぎ書ログ）は次サイクル開始時に削除してよい
- 環境: naga-cli 30.0.0（`~/.cargo/bin/naga`）、glslangValidator（brew）、`@webgpu/types`（devDependency）
- **player実走検証の手順**: `npm run build` → `cd demo/dist/player && python3 -m http.server 8899` → ブラウザで `out.html`（file://不可）。**「2. Play!」ボタンはシェーダーコンパイル中disabledなので、有効化を待ってからクリック**。agent-browserは `npx agent-browser`
- サイズ判断は必ずpackedサイズ（compeko出力）で行う。ベースライン: **39,231 bytes**（minify復旧後）
