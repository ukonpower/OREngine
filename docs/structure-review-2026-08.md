# 構造調査レポート（2026-08）

リポジトリ全体のレイヤー構造を調査し、構造的問題を優先度付きで整理したもの。
調査方法: レイヤーごとの依存関係を grep で実測し、重大指摘はファイルを直接確認して裏取り済み。

## レイヤーマップと規模

```
ライブラリ層     basepower(129行) ← mathpower(1,964) ← glpower(1,232) / gpupower(481)
フレームワーク層  maxpower/core(4,220)   Entity / Component / Serializable / Contracts
バックエンド層   maxpower/webgl(5,405 + GLSL 61本) / maxpower/webgpu(5,724 + WGSL 38本)
プロダクト層     orengine/core(1,482) + builtin(1,311) + editor(12,302)
ホスト層        host(1,846: app / server / vite / template) + scripts/run.mjs
プロジェクト     demo-webgl(11コンポーネント) / demo-webgpu(4コンポーネント)
```

守られている規律（実測済み）:

- ライブラリ層のレイヤー違反 import はゼロ（basepower ← mathpower ← glpower / gpupower）
- maxpower/webgl ↔ webgpu の相互 import はゼロ
- webgl/webgpu 切替は `@or-renderer` エイリアス1本に集約され、orengine 層に分岐コードなし
- player ビルド実測（stats.html）で editor 系コードは 0 バイト

## 問題一覧

| # | 優先度 | 項目 | 一言で |
|---|---|---|---|
| 1 | P1 | eslint 境界がエイリアス import に効いていない | 「機械的防止」が名目化している |
| 2 | P1 | maxpower/core → orengine/editor の逆方向 import | ランタイムにエディタUI型が食い込む |
| 3 | P1 | maxpower/core/Geometry の glpower 値依存 | WebGPU ビルドに glpower が混入 |
| 4 | P2 | 責務の置き場所が webgl / webgpu で非対称 | 同じ責務が層の左右で別の場所にある |
| 5 | P2 | バックエンド間の機能非対称 | 同じシーンが同じに映らない |
| 6 | P2 | 「2つの core」と機能の分裂 | BLidge・ビルトイン・登録機構が2箇所に割れる |
| 7 | P3 | 純粋ロジックの二重実装 | GPU 非依存の計算が5件二重化 |
| 8 | P3 | 死蔵コード | Geometry リソース機構ほか削除候補多数 |
| 9 | P3 | 検査の穴 | typecheck 除外・webgl 固定型・テスト1本 |

---

## 1. [P1] eslint 境界がエイリアス import に効いていない

**事実**: eslint-plugin-boundaries の runtime → editor 禁止は、相対パスで書いたときしか検出されない。`import { Editor } from 'orengine/editor'` を runtime 層に書いてもエラーにならない（`eslint --stdin` で実測）。

**直接の原因**: `import/resolver` が `node` のみで、tsconfig paths（`orengine/...` / `maxpower` / `@or-renderer`）を解決できず boundaries が分類不能 → 素通り。

**その原因が生まれた条件**: paths 解決は tsconfig と vite の2系統にあるが、eslint には教えていなかった。

**付随する穴**:

- `player.ts` / `editor.ts` 等のファイル単位 element 記述子はプラグインに無視されている（eslint 実行時に warning が出ている）。player エントリが editor を import しても検出されない
- `host/app`（player エントリとエディタエントリが同居）と `host/vite` が境界の対象外
- React 禁止ルールの `files` が `**/*.ts` のみで、`.tsx` を作れば editor/lib に React を入れられる

**影響**: 「player にエディタが混入しない」保証が、たまたま誰もその import を書いていないことに依存している。問題2が検知されず放置されていたのがその実例。

**対処案**: `eslint-import-resolver-typescript` を導入して paths を解決させ、ファイル記述子を `boundaries/files` 形式に修正。修復すれば問題2も即座に検出される。

## 2. [P1] maxpower/core → orengine/editor の逆方向 import

**事実**: `packages/maxpower/core/Serializable/index.ts:3-4` が React コンポーネントのファイルから型を import している。

```ts
import { SelectList } from 'packages/orengine/editor/components/composites/Input/InputSelect';
import { ValueOpt } from 'packages/orengine/editor/components/composites/Value';
```

**影響**: ランタイムの直列化基盤にエディタUI型が食い込んでいる。型としてしか使われないため esbuild が消して実害は出ていないが、CLAUDE.md の runtime → editor 禁止の明確な違反。`verbatimModuleSyntax` 導入や alias 構成変更で解決不能になる潜在破綻を抱える。

**対処案**: 最低でも `import type` 化。本筋は `SelectList` / `ValueOpt` の型定義を maxpower 側（または basepower）へ移し、editor がそれを参照する向きに反転させる。

## 3. [P1] maxpower/core/Geometry の glpower 値依存

**事実**: `packages/maxpower/core/Geometry/index.ts` が WebGL 専用コードを持つ。

- `:88` `new GLP.GLPowerBuffer( gl )` — 値参照（型消去されない）
- `:20` `vaoCache: Map<GLP.GLPowerVAO, boolean>`
- `:82` `createBuffers( gl: WebGL2RenderingContext )`

`maxpower/webgpu.ts` は `export * from './core'` するため、**WebGPU 専用エントリ経由で glpower が WebGPU バンドルに引き込まれる**。docs/webgpu-plan.md の「Geometry はバックエンド非依存の共有コア」との唯一の実質的矛盾。

**対処案**: WebGPU 側は既に Renderer 所有の `_getGeometryBuffer()`（gpupower の GeometryBuffer）で同じ役割を実現済み。WebGL 側も同じ形（Renderer 所有の `Map<Geometry, リソース>`）に寄せれば core から剥がせる。

## 4. [P2] 責務の置き場所が webgl / webgpu で非対称

**事実**: 同じ責務が層の左右で違う場所にあり、片方を直しても片方に反映されない。

| 責務 | WebGL 側の置き場 | WebGPU 側の置き場 |
|---|---|---|
| Uniforms 辞書 → GPU 変換 | maxpower/webgl/Renderer 内（`setUniforms`） | gpupower 内（`UniformBinder`） |
| Geometry → GPU バッファ | maxpower/core/Geometry 内（問題3の原因） | gpupower 内（`GeometryBuffer`） |
| 生 API 抽象の厚さ | glpower 1,232行（Texture/FBO/VAO 抽象あり） | gpupower 481行（`device.createTexture` 等が maxpower/webgpu の9ファイルに直書き散在） |

**付随する取りこぼし**:

- gpupower の `GeometryBuffer` は attribute が position/normal/uv の3種固定。demo-webgl が多用する `instanceDivisor` 付きカスタム attribute は**黙って無視**される（WebGPU 移植時に無警告で表示が壊れる）
- basepower の `UniformType` 19種に対し gpupower の WGSL 変換テーブルは12種のみ。未対応型は実行時 throw

**対処案**: 方針を1つ決めてから揃える。(a) gpupower を glpower と同じ厚さに育てる、(b) 逆に両方薄くして変換ロジックを maxpower に寄せる、のどちらか。

## 5. [P2] バックエンド間の機能非対称

**事実**: core にあるのに片方のバックエンドでしか機能しないものが複数ある。

- `MaterialOverride`: webgl Renderer だけが読む。webgpu では黙って無視
- `RendererContract.centerDepth`（オートフォーカス）: webgpu のみ実装
- GPUTimer: `emit("timer")` が webgl Renderer にしかなく、**webgpu では永久に無反応**
- `PipelineConfig` 型が両バックエンドで別定義。webgpu 側だけ lightShaft 系4フィールドが既に乖離（scene.json 互換性に影響）
- エディタの Timeline（`TimelineCanvasRenderer`）が `@or-renderer` でなく `'maxpower'` を直接 import して **WebGL レンダラーをもう1つ生成**。WebGPU プロジェクトのエディタでも WebGL バックエンドがロードされる（切替設計の抜け穴）

**対処案**: Contract に載っている機能は両実装を揃えるか、片側限定であることを Contract 上で明示する。Timeline は `@or-renderer` 経由に直すか、2D 描画に降格する。

## 6. [P2] 「2つの core」と機能の分裂

**事実**:

- `EngineContract` を maxpower が定義し orengine が実装する DI 構造自体は成立している。しかし `orengine/core/Engine` は `MXP.Renderer`（= **webgl 具象クラス**）で型付けされ Contract を使っていない。tsconfig の `@or-renderer` も webgl 固定なので、**typecheck は常に webgl 前提**
- BLidge プロトコルは maxpower/core、クライアント `BLidgeClient` は orengine/builtin と、同一機能が2層に分裂
- ビルトインコンポーネントも Camera/Light/Mesh は maxpower/core、CameraController 等は orengine/builtin に分散。登録は `host/app/Resources/registry.ts`（エディタ用）と `host/vite/plugins/PlayerRegistry`（player 用）の**2実装**があり、手動ビルトイン3件（Light/Camera/Mesh）のリストも両方に重複定義。CLAUDE.md「1機能1経路」に反する
- `orengine` エントリは実際には `export * from "./core"` の1行で builtin を含まない（CLAUDE.md の「core + builtin」という記述と不一致）

**対処案**: Engine の型を `RendererContract` に付け替える。登録機構はソース・オブ・トゥルースを一本化（sceneScan の結果から両方を生成する等）。BLidge / ビルトインの置き場は「シーングラフ = maxpower、アプリ = orengine」の線引きを明文化してから移動。

## 7. [P3] 純粋ロジックの二重実装

**事実**: シェーダー25本の GLSL/WGSL 並存は設計判断（docs/webgpu-plan.md「互換はやらない」）として妥当。ただし以下5件は**バックエンド無関係の純 CPU 計算なのに二重化**されている。webgpu 側のコメント自身が「webgl 側と同じ」と自認。

1. DoF CoC 係数計算（`webgl/Renderer/PipelinePostProcess/index.ts:301` / `webgpu/.../index.ts:443`）
2. シーングラフ走査 `_collectRenderStack`（`webgl/Renderer/index.ts:493` / `webgpu/Renderer/index.ts:1127`）
3. SSAO カーネル生成
4. glb バイナリパース（ヘッダ定数・type2Size・属性名変換テーブルが両方に独立存在）
5. pipelineConfig マージ処理（コメント文言まで一字一句同じ。かつ `PipelineConfig` 型は既に乖離開始 → 問題5）

**対処案**: 5件を core（または core/utils）へ引き上げて片方に寄せる。

## 8. [P3] 死蔵コード（削除候補、実測ベース)

- **Geometry リソース機構が丸ごと書き込み専用**: `Resources.getGeometry()` の呼び出し元がリポ全体で0件。登録側（registry.ts の `registerGeometries` / `BUILTIN_GEOMETRYLIST` / builtin/Geometries 4種）だけが生きている。エディタにジオメトリ選択 UI も存在せず、PlayerRegistry はジオメトリを登録しないため player でも動かない
- mathpower の `Animator.ts`（201行）/ `Lerps.ts` / `Easings.ts` の大半: 外部利用ゼロ。実利用は FCurve 系3クラスのみで、約300〜350行が削除可能
- `glpower/GLPowerProgram.ts` の `shaderErrors`: set/delete だけで読み手が存在しない（メモリリーク兼デッドコード）
- `host/server/index.ts`: 参照0。フォールバック先 `../demo` も存在しないディレクトリ
- `orengine/core/Pointer`（222行）/ `Keyboard`（73行）: 実利用は OrbitControls のみで、その OrbitControls もどちらの demo シーンでも未使用
- `host/server/Project/types.ts` の型群: ProjectSerializer の型と完全な二重定義（コメント自身が「同一」と明記）
- 小物: `GLPowerFrameBfferOpt`（typo が公開名）、`Quat` / `Uniformable` / `Types.Uniform` / `EventEmitter.hasEvent` は未使用、mathpower に `smoothstep` が2実装、リポ直下の `stats.html` / `tmp/` がコミット状態

## 9. [P3] 検査の穴

- tsconfig の `exclude` に `host/vite` / `host/runner.ts` / `demo-webgl` が入っており、vite プラグイン群（849行）は typecheck されていない。`demo-webgpu` は exclude されておらず非対称。かつ paths の `@or-scene` 等は demo-webgl 固定なので、demo-webgpu の型解決は誤ったプロジェクトを向く
- `@or-renderer` の paths が webgl 固定 → webgpu 構成の型不整合は typecheck で検出されない（問題6と同根）
- テストは render-flow 1本のみ。ProjectSerializer の往復、`sceneScan.ts` / `PlayerRegistry`（壊れると 64k 成果物が直接壊れる、かつ純関数でテストしやすい）が空白
- `npm test` に相当する集約コマンドがない
- バレル自己参照（mathpower / glpower の `from ".."` / `from "."`）による ESM 循環があり、`import/no-cycle` は未導入

---

## 推奨着手順

1. **問題1（eslint 境界の修復）を最初に**。検知できない状態を直さないと他を掃除しても再発する。修復すれば問題2が自動検出される
2. 問題2・3 は独立に小さく直せる（`import type` 化＋型移動 / Geometry の GPU リソースを Renderer 所有へ）
3. 問題4 は WebGPU 対応を進めるほど効いてくるため、glpower / gpupower の厚さの方針を1つ決めてから揃える
4. 問題8 の死蔵コードは判断不要で削れるものが多く、いつでも着手可能
