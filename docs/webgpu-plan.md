# レンダラー分離設計（WebGPU対応 v2、2026-08-02）

OREngineのWebGPU対応の設計書。旧方針（GLSL→WGSL実行時変換＋GL模倣バックエンド、`archive/webgpu-glsl-transpile` ブランチに保全）を破棄し、**レンダラーをバックエンドごとにネイティブで丸ごと持つ**方針に切り替えた。この文書だけで文脈が再現できるように書いてある。

## 決定事項（議論済み・確定）

- プロジェクトはWebGL / WebGPUの**どちらかに固定**する。同一シーンの両対応（互換）はやらない
- 共有するのは**コンポーネントシステムとエディタ**。Material / Renderer はバックエンドごとに別実装で、WebGPU側はWGSL手書き・WebGPUネイティブAPIで自由に設計する
- WebGPU側も**deferredまで構築**する。computeはその後
- **エディタ描画系（Gizmo / Wireframe / SelectionOutline / FrameDebugger / AssetPreview）もWebGPUで動かす**。ロジックは共有し、描画は「プリミティブ契約」（後述のEditorDraw）でバックエンドに委ねる
- Camera / Light は「データ（共有コンポーネント）」と「GPUリソース（レンダラー側が所有）」に分離する
- バックエンド宣言は `orengine.config.json` の `renderer` フィールド
- 64kb intro（playerビルド）はWebGL固定のまま。packedサイズが最重要指標である点は不変

旧方針を破棄した理由: 抽象の切断面をdrawコマンド最下層に置きGL enum語彙で固定したため、WebGPUBackendが「WebGPU上のWebGL2エミュレータ」になり、WebGPUネイティブの形（bind group / render pass / compute / WGSL）を永遠に表現できなかった。互換が要らないと確定した時点で、エミュレーション層と実行時トランスパイラは存在理由を失った。

## 全体構成

```
┌─ 共有コア（バックエンド非依存）─────────────────┐
│ Entity / Component / Serializable / scene.json直列化      │
│ Engine（time・frame・直列化。rendererは契約interface越し） │
│ Geometry（attributeデータ）・Mesh（薄いholder）           │
│ Camera / Light（データのみ）・math（GLP.Vector/Matrix）    │
│ エディタUI＋エディタ描画ロジック（EditorDraw契約を使う側）  │
└──────────────┬─────────────────────┘
      RendererContract ＋ EditorDraw（プリミティブ契約）
       ┌───────┴────────┐
  maxpower/webgl（現行＝64k）      maxpower/webgpu（新規ネイティブ）
  ・現Renderer/Material/GLBackend   ・WGSL手書きMaterial
  ・GLSL＋shader_minifier           ・deferred再構築 → compute
  ・EditorDrawのGL実装              ・EditorDrawのWebGPU実装
```

- コンポーネントは共有の `addComponent` / field直列化だけに依存し、**中で組み立てるMaterialは自分のプロジェクトのバックエンドAPIを直接import**する
- scene.jsonの構造（エンティティ木＋コンポーネント名＋field）はバックエンド非依存なので、エディタUI・タイムラインはそのまま動く

## パッケージ分割

`packages/maxpower/` を内部分割する。エイリアス・既存importを壊さないため、`maxpower` エントリは core＋webgl の再輸出とする（既存コンポーネント・64kパスは無変更で通る）。

```
packages/maxpower/
  core/      Entity, Component, Serializable, Geometry, Mesh, Camera, Light,
             MaterialOverride(データ部), BLidger系, utils(math)
  webgl/     Renderer, Material, PostProcess, PostProcessPipeline, GLBackend,
             GPUCompute / GPUComputePass, Loaders, shader/(ShaderParser含む),
             EditorDrawのGL実装
  webgpu/    新規（B段階以降。Renderer, Material, resources, wgsl builtin,
             EditorDrawのWebGPU実装）
  index.ts   core + webgl を再輸出（現行APIそのまま）
  webgpu.ts  core + webgpu を再輸出（WebGPUプロジェクトのエントリ）
```

- 旧 `Backend/` の中立interface（`Backend` / `BackendTexture` 等）は**解体**する。webgl側はGLBackend実体とGLPower型を直接使う（模倣先が消えたので中立を装う理由がない）。GLBackend自体（生gl呼び出しの集約点）はwebgl内のレイヤリングとして価値があるので残す
- `packages/orengine/builtin/` はGLSL Material前提なので**webgl専用builtin**と位置づける。webgpu用builtinは `maxpower/webgpu/builtin/`（または orengine 側に対応ディレクトリ）を別に持つ

### Mesh / Materialの境界

- `Mesh` は共有コアに置く。`geometry: Geometry`（共有）＋ `material` はバックエンド不透明型（coreに最小の `MaterialBase`（nameのみのinterface）だけ定義し、各バックエンドのMaterialがそれを満たす）
- デフォルトマテリアルの供給はレンダラー側の責務（`mesh.material` は未設定時 `null`。レンダラーが自分の既定Materialへ差し替える）
- これによりエディタのロジック（wireframeのmaterial差し替え、選択メッシュ取得）は共有コアの `Mesh` だけで書ける。`getRenderStack` 依存も消える（エディタはツリーを歩いて `getComponent( Mesh )` すればよい）

### Camera / Lightの分離

- `Camera`: 現状ほぼデータ（fov / near / far / 行列 / dofParams）なのでそのままcoreへ
- `Light`: lightType / color / intensity / angle等のデータ＋シャドウ用行列をcoreへ。`RenderCamera` / `ShadowMapCamera` が持っている `renderTarget: FrameBuffer` は**レンダラーが `Map<Camera | Light, リソース>` で所有**する形に移す
- 直列化fieldはデータコンポーネント側に残るため、scene.jsonは変わらない

## バックエンド宣言と切替配線

- `orengine.config.json`: `{ "project": "demo", "renderer": "webgl" }`（既定 webgl）。一時切替は `ORENGINE_RENDERER=webgpu`（`ORENGINE_PROJECT` と同じ流儀）
- viteエイリアス `@or-renderer` → `maxpower/webgl/index.ts` または `maxpower/webgpu/index.ts`。`host/app/src` のEngine組み立てだけがこれをimportする（プロジェクトのコンポーネントはエイリアス不要、自分のバックエンドを普通にimport）
- player / static ビルドは `webgl` **固定**（現 `@or-backend` と同じ構図。WebGPUコードはplayerバンドルに構文的に到達しない）
- tsconfigの `@or-renderer` はwebglに固定（型チェックのベースライン）。webgpu側は通常ソースとして型チェックされる
- `npm run wgpu` は `ORENGINE_RENDERER=webgpu npm run dev` に付け替え。WebGPUはsecure context必須のためwgpu時のHTTPS起動（basicSsl）は維持

## Engine ↔ レンダラー契約（RendererContract）

Engineが実際に呼んでいる口だけを契約にする（実測: globalUniforms / render / resize / serialize / deserialize / resolution）。

```ts
interface RendererContract extends Serializable {
	globalUniforms: GLP.Uniforms;
	readonly resolution: GLP.Vector;
	readonly canvas: HTMLCanvasElement;
	render( root: Entity, camera: Entity, event: ComponentUpdateEvent ): void;
	resize( resolution: GLP.Vector ): void;
	dispose(): void;
}
```

- Engineは `createRenderer( engine )` ファクトリを受け取って生成する（`@or-renderer` が供給）。`Engine.backend` プロパティは廃止
- 各バックエンドは自分のEngine型エイリアスを輸出する（例 `type GLEngine = Engine<GLRenderer>`）。コンポーネント内で `this.engine as GLEngine` とすれば `engine.renderer` がそのバックエンドの型で見える（現demoの `as Engine` キャストと同じ流儀）
- demo側の追随: YakiSobaの `engine.backend` 参照は `engine.renderer.backend`（GL型）に変更

## EditorDraw契約（プリミティブレベル）

エディタ5機能の実測から、必要な口は閉じた小さい集合。ロジック（ドラッグ計算・ワイヤ変換・選択管理・デバッガUI・プレビューキャッシュ）は共有側に1回だけ書き、描画はこの契約を通す。

実装済み（`packages/maxpower/core/EditorDraw/index.ts`。GL実装は `packages/maxpower/webgl/EditorDraw/`）:

```ts
interface EditorDraw {
	// シーンの一部を任意ターゲットへ描く（gizmo / helper / wireframe / selection mask）
	renderEntities( opt: {
		camera: Entity;
		entities: Entity[];
		// null = 画面（uiバッファ）へ重ね描き。ターゲット指定時は毎回クリアして描く
		target: EditorTarget | null;
		materialOverride?: MaterialBase;      // 契約下のmaterialsで作った不透明ハンドル
		depthCompare?: 'less' | 'lequal';     // 現SelectionOutlineの生gl depthFunc置き換え
	} ): void;

	// フルスクリーンパス（outline合成など）
	renderFullscreen( recipe: EditorRecipe, target: EditorTarget | null ): void;

	// FrameDebugger用: 中間バッファを矩形指定でタイル転写（dstRectは左上原点）
	blit( src: EditorFrame, dst: EditorTarget | null, dstRect?: EditorRect ): void;

	// AssetPreview用。textureはバックエンドのテクスチャ実体（エディタは中身を見ない）
	drawTexture( texture: unknown, target: EditorTarget ): void;
	readPixels( target: EditorTarget ): Uint8Array;

	// ターゲット生成。useSceneDepthはシーンdepth共有（outlineの深度テスト用）
	// sizeを省くと解像度に追従する
	createTarget( opt?: { useSceneDepth?: boolean; size?: GLP.Vector } ): EditorTarget;

	// uiバッファを画面へ出す
	present(): void;

	resize( resolution: GLP.Vector ): void;

	// 各パス完了ごとに不透明ハンドルを通知（FrameDebuggerの観測はイベントが正）
	onDrawPass( cb: ( frame: EditorFrame, label: string ) => void ): void;

	// バックエンド言語で実装された固定シェーダーレシピ
	materials: {
		// gizmo / helper / wireframe。colorは参照のまま保持され書き換えが描画に反映される
		flat( opt: { color: number[]; lines?: boolean; depthTest?: boolean; depthWrite?: boolean } ): MaterialBase;
		mask(): MaterialBase;                                            // selectionシルエット
	};
	recipes: {
		outline( mask: EditorTarget, color: number[] ): EditorRecipe;
	};
}
```

- `EditorTarget` / `EditorFrame` / `EditorRecipe` は不透明ハンドル（実体は各バックエンドのFB / Material）。`EditorTarget` は `EditorFrame` を継承し、blitのsrcにもなる
- 実装はバックエンドが `createEditorDraw( engine )` として輸出し、エディタは `@or-renderer` から取得する。RendererContract 上に口を置くとGL実装がplayerのRendererから静的に到達可能になりpackedが増えるため、既存のバックエンド切替口（`createRenderer` と同じ流儀）に合わせた
- ヒット判定専用メッシュは `mesh.material` を持たない（`visibilityFlag` での区別をやめた）
- FrameDebuggerのラベル文字列は**DOMオーバーレイ**（canvasの親へ重ねる `mix-blend-mode: difference` のdiv）に変更済み。契約からテクスチャアップロードを外して小さく保つため
- 契約で表現できないエディタ機能が将来出たら、その機能だけバックエンド側フル実装に落とせばよい（契約方式と併用可能）
- 段階Aでwebgl実装を書き、既存5機能を契約経由に書き換える。`instanceof GLBackend` ガードは全廃

## webgpuレンダラーの設計方針

- **Material**: WGSL手書き。1マテリアル＝1 WGSLモジュールとし、**フェーズごとのentry point**（`vsMain` / `fsDeferred` / `fsForward` / `fsDepth` …）を持つ。GLのdefines切り替えの代替。shadowMapの「fragment出力数とアタッチメント数の不一致」問題は構造的に消える
- **uniforms**: 名前ベース辞書（`GLP.Uniforms`）のDXは維持。旧UniformBinder（archive参照）を流用してstd140相当に自動パックし、binding宣言はuniforms辞書からWGSL先頭に自動生成・注入する。bind group構成は group0=フレーム（time / camera）、group1=オブジェクト（model行列）、group2=マテリアル（uniforms＋テクスチャ）
- **クリップ空間**: GL規約（z∈[-1,1] / Y上）との差は、webgpu側でprojection行列に補正行列を1回乗算して吸収する（旧R9のようなシェーダー機械書き換えはしない）
- **deferred構成**: webglと同じパス編成（shadowMap → gBuffer MRT5 → shading → forward → PipelinePostProcess）をrender passネイティブで再構築。スパイクで確定済みの制約を引き継ぐ: `maxColorAttachmentBytesPerSample` の引き上げ要求（gBufferは64 bytes/sample。仕様のrender target byte costでrgba8unormは4でなく8）、rgba32floatは `unfilterable-float`、depthサンプルはnon-filtering
- **シェーダー移植**: archiveブランチのトランスパイラ（前処理R0〜R10＋naga）を**一回きりのオフライン移植ツール**として使い初版WGSLを生成 → 手直しして以後は手で保守。実行時変換・devサーバー依存は持たない
- **GPUタイミング**: `timestamp-query` でネイティブ実装（GL側のEXT_disjoint_timer_queryに相当）
- device初期化は非同期。ready前のフレームはスキップ（旧実装の方式を踏襲）

## 撤去するもの（段階A）

`archive/webgpu-glsl-transpile`（= 9ebdfc9）に保全済み。developから削除:

- `packages/maxpower/Backend/WebGPUBackend/`（GL模倣層約2,000行。Resources / UniformBinderは移植時にarchiveから部分流用）
- `host/vite/plugins/WgslTranspiler/`（実行時変換サービス。オフライン移植ツールとしてはarchiveから直接実行）
- `scripts/verify-wgsl.mjs`
- `@or-backend` エイリアス（vite / tsconfig）と `createBackend` 間接化
- `packages/maxpower/Backend/index.ts` の中立interface群（GLBackendへ統合）

`webgpu-test/` プロジェクトは残し、B段階からwebgpuレンダラーのテストプロジェクトとして使う。

## 段階計画

| 段階 | 内容 | 完了ゲート |
|---|---|---|
| **A. 土台と撤去** | A1: maxpowerをcore/webglに内部分割（index.ts再輸出で既存import無変更）。A2: Camera/Lightリソース分離。A3: RendererContract化・`@or-renderer` 配線・config `renderer` 追加。A4: 旧WebGPU資材の撤去。A5: EditorDraw契約定義＋GL実装＋5機能の書き換え | typecheck / lint / `npm run build` packed **39,231bytes から悪化なし** / dev目視 / エディタ5機能動作 |
| **B. webgpu縦一本** | device初期化・WGSL Material・forwardパスでwebgpu-testのキューブ描画（HTTPS dev） | キューブが表示・リサイズ・バリデーションエラーゼロ |
| **C. deferred再構築** | C1: gBuffer→shading→light/shadow。C2: sky / envMap / PMREM。C3: PipelinePostProcess移植（DoF / bloom / SSR / SSAO / motion blur…） | webgpu-testでライティング＋シャドウ、demo相当シーンの見た目一致 |
| **D. EditorDraw webgpu実装** | 4メソッド＋レシピ＋onDrawPassの実装 | エディタ5機能がwebgpuプロジェクトで動作 |
| **E. compute** | GPUComputePassのwebgpu版（compute pass）。Modeler相当が必要になればここで | — |

規模感: Aは大部分が機械的な移動＋契約切り（中）。Cのシェーダー移植が最大（大。オフライン変換で初版生成して圧縮）。B・Dは中。

## 残論点・保留

- webgpu用builtinコンポーネント/PostProcessの置き場所の最終形（`maxpower/webgpu/builtin/` か orengine側か）→ B段階着手時に決める
- `.tex`（TexProcedural）のwebgpu対応 → 当面webgl専用のまま。必要になったらcompute or render passで再実装
- `Modeler`（Transform Feedback）→ 呼び出しゼロのため放置。必要になればE段階でcompute化
- BLidger系をcoreに置く判断はA1で実施時に依存を見て確定（Material依存が残るならwebglへ）
