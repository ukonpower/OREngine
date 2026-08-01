# GLSL ES 3.00 → WGSL トランスパイル: 実現性調査

## 再実行方法

    spikes/glsl-to-wgsl/run.sh

必要な外部ツールは `glslangValidator`（`brew install glslang`）と `naga`（`cargo install naga-cli`）の2つだけ。
どちらも未インストールならスクリプトが名前を出して終了する。npm 依存はゼロ。

ステップ7のサイズ比較だけはリポジトリルートで `npm run build` を一度実行して `tmp/shader-minified/` を
作っておく必要がある（無ければスキップされる）。
ブラウザでの WGSL 検証は `cd spikes/glsl-to-wgsl && python3 -m http.server 8898` して
`http://localhost:8898/validate.html` を開く。

## 検証環境

macOS 25.2.0 / glslang 11.16.3.0 / naga-cli 30.0.0 / Chrome（WebGPU バックエンド Metal, adapter `apple / metal-3`）

## 結論から

**deferredShading.fs は 9 個の機械的な前処理規則だけで WGSL まで到達し、naga と Chrome(Tint) の2つの
独立した実装で検証を通った。シェーダーごとの手修正はゼロだった。**
一方で **WGSL 出力は現行の minify 済み GLSL の gzip 後 2.3〜3.6 倍** で、64kb intro のサイズ予算に直接効く。

## 試したツールチェーンと結果

| # | コマンド | 対象 | 結果 | エラー要旨 |
|:--|:--|:--|:--|:--|
| A | `glslangValidator <f>`（ESSL 検証のみ） | 完全形 GLSL 2本 | **成功** | — |
| B | `glslangValidator -G`（OpenGL SPIR-V） | 完全形 GLSL 2本 | 失敗 | `ES shaders for SPIR-V require version 310 or higher` / `non-opaque uniform variables need a layout(location=L)` |
| C | `glslangValidator -V`（Vulkan SPIR-V） | 完全形 GLSL 2本 | 失敗 | 同上 + `non-opaque uniforms outside a block : not allowed when using GLSL for Vulkan` |
| D | `naga --input-kind glsl` | 完全形 GLSL 2本 | 失敗 | `Invalid version: 300` / `Invalid profile: es` / `uniform/buffer blocks require layout(binding=X)` / `Not implemented: variable qualifier`(sampler2D) |
| E | `glslangValidator -G` | **前処理後**（`#version 310 es`） | 成功 | — |
| F | `naga <gl.spv> <wgsl>` | E の SPIR-V | **失敗（この経路は死んでいる）** | `unsupported execution mode %8` = OpenGL SPIR-V の `OriginLowerLeft` を naga が受理しない |
| G | `glslangValidator -V` | **前処理後**（`#version 460`, combined sampler のまま） | 成功 | — |
| H | `naga <vk.spv> <wgsl>` | G の SPIR-V | 失敗 | `invalid id %14` = `OpLoad` した `OpTypeSampledImage`（combined sampler）を受理しない |
| I | `naga --input-kind glsl` | 前処理後（combined sampler のまま） | 失敗 | `Not implemented: variable qualifier` at `sampler2D` |
| **J** | `naga --input-kind glsl --shader-stage frag` | **全規則適用後** | **成功** | — |
| **K** | `glslangValidator -V` → `naga <spv> <wgsl>` | **全規則適用後** | **成功** | — |
| L | `naga <wgsl>`（validate モード） | J/K の WGSL 4本 | **成功** `Validation successful` ×4 | — |
| M | `device.createShaderModule` + `getCompilationInfo`（Chrome/Tint） | J/K の WGSL 4本 | **PASS 4/4** warnings=0 | — |

### 通る経路は2本ある

- **Path A（推奨）**: 前処理済み GLSL → `naga --input-kind glsl` → WGSL。中間ファイルなし・ツール1本
- **Path B**: 前処理済み GLSL → `glslangValidator -V` → SPIR-V → `naga` → WGSL。glslang が未使用関数を落とす
  ぶん出力は小さいが、関数名が `getPmremMip_u0028_t21_u003b_p1_u003b_vf3_u003b_f1_u003b` のように
  SPIR-V の型シグネチャ入りへマングルされる

OpenGL 方言（`-G`）経由は F の通り naga 側で行き止まり。**Vulkan 方言に寄せるのが唯一の道**。

## 必要と判明した前処理規則

`preprocess.mjs` に実装済み。すべて**ソースの構文を見ればよい機械変換**で、シェーダーごとの判断は要らなかった。

| 規則 | 内容 | 理由 | 機械化 |
|:--|:--|:--|:--|
| R0 | uniform / in / out 宣言を1行1宣言子へ正規化（カンマ区切り宣言子の展開を含む） | R2 以降が行アンカーの正規表現のため。minify 済みソースを入口にすると全部1行に詰まっていて当たらない | 可 |
| R1 | `glslangValidator -E` でプリプロセッサを畳む | `#if NUM_LIGHT_DIR > 0` や `#define saturate(x)` を以降の規則が考えなくて済む。既存ツールに丸投げできる | 可 |
| R2 | `#version 300 es` → `#version 460`、`precision` 文を削除 | naga の GLSL フロントエンドは ES プロファイルを受理しない（`Invalid profile: es`） | 可 |
| R3 | sampler 配列を要素ごとの個別 uniform に展開（`x[0]` → `x_0`） | WGSL のコア機能に texture 配列が無い。OREngine の sampler 配列添字は `LOOP_INDEX` のみで、ループ展開後は全てリテラルなので成立する | 可 |
| R4 | combined sampler を `texture2D X_tex` + `sampler X_smp` の2オブジェクトへ分離 | WGSL に combined sampler が無く、naga は SPIR-V の `OpTypeSampledImage` も受理しない（H） | 可 |
| R5 | sampler を引数に取る関数を `(texture2D, sampler)` の2引数へ開き、呼び出し側も展開 | glslang が `sampler constructor must appear at point of use` で関数を跨がせない。naga の GLSL フロントエンドはそもそも opaque 型の仮引数を構文解析できない | 可 |
| R6 | テクスチャ組み込み関数の第1引数を `sampler2D(X_tex, X_smp)` のインライン構築へ置換 | R4 の帰結。`texture` / `textureLod` / `textureGrad` / `textureSize` / `texelFetch` が対象 | 可 |
| R7 | ブロック外 loose uniform を `layout(set=0, binding=0) uniform Params { ... }` へまとめる | GLSL for Vulkan は非 opaque uniform のブロック外宣言を禁止。**本文の参照はフィールド名でそのまま解決されるので本文の書き換えは不要** | 可 |
| R8 | stage 入出力に `layout(location=N)` を付与 | Vulkan 方言の要求（`SPIR-V requires location for user input/output`） | 可 |

**手修正が必要になった規則は一つも無かった。** R5 が唯一の非自明な変換だが、これも「仮引数の型が sampler なら
2引数に開き、その関数の呼び出し箇所の同位置引数を `_tex`/`_smp` に複製する」という規則で閉じている。

### 資産全体への適用可能性（92 本の構文調査）

変換自体は代表1本のみだが、規則が他へ届くかを構文の出現分布で確認した。

| 観点 | 実測 | 規則で足りるか |
|:--|:--|:--|
| シェーダー総数 | 92（`.fs` 48 / `.vs` 19 / モジュール・part `.glsl` 25） | — |
| sampler 型 | `sampler2D` 81、`samplerCube` 1 | R4/R6 の型名を `sampler*`→`texture*` の一般形にする小改修が要る（`samplerCube(...)` コンストラクタの検証は済み・成功） |
| sampler を仮引数に取る関数 | 9 箇所 / 6 ファイル | R5 でカバー |
| sampler 配列の動的添字 | 0（全て `LOOP_INDEX` = 展開後リテラル） | R3 でカバー |
| vertex シェーダー | 19 | R8 を `out` にも広げる必要あり。vertex ステージ単体の変換は成功を確認済み |
| `gl_FragDepth` / `discard` | 2 / 4 ファイル | 追加規則不要（naga で変換成功を確認） |
| MRT（複数 color 出力） | — | 追加規則不要（`location=0,1` の2出力で成功を確認） |

## 判定: 実現可能性 **高**

根拠:

1. **最も条件の悪い代表シェーダーが完走した**。deferredShading.fs は include 4種・loose uniform・
   combined sampler 9個・sampler を引数に取る関数 5個・構造体配列 uniform・MRT 2出力をすべて含み、
   40本超の資産の中で最も変換が難しい部類。これが手修正ゼロで通った
2. **規則が9個で閉じた**。しかも全部が構文レベルの置換で、シェーダーの意味を理解する必要がない
3. **2つの独立した WGSL 実装で検証済み**。naga のバリデータと Chrome の Tint は別実装で、両方が通った
   （Tint は 4/4 PASS, warnings=0）
4. **ツールチェーンが軽い**。`glslangValidator` と `naga` の2バイナリだけ。どちらも CI に載る

低リスクではない箇所は「vertex シェーダーは代表変換をしていない」「samplerCube の型名一般化が未実装」の
2点だが、どちらも既知で小さい。

## ただし: サイズが 2.3〜3.6 倍になる（64kb intro への最大の影響）

deferredShading.fs 1本での実測（`node measure-size.mjs`）:

| 経路 | raw | gzip | gzip比 |
|:--|--:|--:|--:|
| 現行 WebGL2: shader_minifier 済み GLSL | 4991 | 1950 | 1.00x |
| WGSL: 生GLSL入口 / naga GLSL frontend | 31350 | 6969 | 3.57x |
| WGSL: 生GLSL入口 / SPIR-V 経由 | 28429 | 5929 | 3.04x |
| WGSL: minified入口 / naga GLSL frontend | 19093 | 4611 | 2.36x |
| WGSL: 生GLSL入口 / SPIR-V + 識別子短縮 | 21839 | 5281 | 2.71x |
| **WGSL: minified入口 / frontend + 識別子短縮** | **16987** | **4419** | **2.27x** |

原因は2つ:

- naga の WGSL 出力が SSA 形式で、中間値のたびに `let _e123 = ...;` を吐く。shader_minifier がやる
  式のインライン化と真逆の方向
- WGSL に shader_minifier 相当が存在しない。上表の「識別子短縮」は本スパイクで自作した雑なリネーマ
  （`measure-size.mjs` の `shortenIdentifiers`）による見積もりで、既製ツールではない

緩和策として **minify 済み GLSL を入口にする**（現行パイプラインの後段に接続する）のが最も効き、
3.57x → 2.36x まで落ちる。それでも 2倍超は残る。

注意: この数値は1ファイル単独の gzip で、48本まとめた実バンドルでは共通辞書が効くため比率は変わりうる。
**判断に使う前に `npm run build` の packed サイズで実測すること**（CLAUDE.md のルール）。

## uniform 辞書 → WGSL の対応（サブタスク01 への補足）

R7 の副産物として、**GLSL の uniform 名がそのまま WGSL の構造体フィールド名として保存される**ことが
分かった。名前ベース uniform 辞書の移植にとって好材料。

入力 GLSL:

    struct DirectionalLight { vec3 direction; vec3 color; };
    uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];
    uniform vec3 uCameraPosition;
    uniform sampler2D uEnvMap;

出力 WGSL:

    struct DirectionalLight {
        direction: vec3<f32>,
        color: vec3<f32>,
    }
    struct Params {
        directionalLight: array<DirectionalLight, 1>,
        uDirectionalLightCamera: array<LightCamera, 1>,
        uColor: vec3<f32>,
        uViewMatrix: mat4x4<f32>,
        uCameraMatrix: mat4x4<f32>,
        uCameraPosition: vec3<f32>,
    }
    @group(0) @binding(0) var<uniform> global: Params;
    @group(0) @binding(17) var uEnvMap_tex: texture_2d<f32>;
    @group(0) @binding(18) var uEnvMap_smp: sampler;

つまり `'directionalLight[0].direction'` というキーは、`Params` のフィールド並びから機械的に
バイトオフセットへ落とせる。**前処理器が `Params` のレイアウト表を JSON で吐けば、CPU 側の uniform
反映層はその表を引くだけで済む**。

ただし2点の未確認がある:

- naga は `@size` / `@align` を出力せず WGSL の既定レイアウト規則に委ねている。今回の型構成では
  std140 と一致するが、一致は型ごとに確認が要る
- テクスチャ1枚につき sampler を1個生成しているため binding が 19 個になった。sampler は共有できるので、
  実装時は1個にまとめるほうが bind group 記述のコード量が減る（64k では効く）

## 推奨: 「自動変換＋前処理」を採る

| 評価軸 | 自動変換＋前処理 | WGSL 二重管理 |
|:--|:--|:--|
| 初期コスト | 前処理器 9 規則 ＋ vertex 対応（本スパイクで骨格は動いている） | 92 本の手書き移植 |
| 変更時のコスト | GLSL 1 箇所を直すだけ | 2 箇所を同期。ズレたときサイレントに描画だけ壊れる |
| 出力サイズ | gzip 2.3x（minify 済みを入口にした場合） | 手書きなら詰められるが、WGSL 用 minifier が無いので実際は自動変換と大差ない見込み |
| WebGL2 の維持 | そのまま維持できる（GLSL が単一のソース） | WebGL2 を捨てるか、両方を保守するか |
| リスク | naga のバージョン更新で挙動が変わりうる | 人間の同期漏れ |

決め手は**変更時のコスト**。64kb intro はシェーダーを最後まで触り続ける制作物なので、二重管理は
同期漏れが必ず起きる場所に置くことになる。自動変換なら GLSL が単一のソースのまま WebGL2 と WebGPU の
両方を出せる。

サイズの 2.3 倍は自動変換の欠点だが、これは**二重管理を選んでも WGSL 側には shader_minifier が無いので
ほぼ同じだけ払う**。二重管理はサイズを買えないまま保守コストだけ増やす選択になりやすい。

接続方式は、既存の `host/vite/plugins/ShaderBuilder` の **後段**に前処理＋naga を足すのが良い
（`composeShader` → shader_minifier → 前処理 → naga → WGSL）。minify 済みを入口にできてサイズが
最も小さくなり、`#include` 解決とライト数の埋め込みは既存実装をそのまま使える。

## 制約・未検証

- 変換したのは fragment 2本のみ。vertex シェーダーはステージ単体の最小サンプルでしか確認していない
- `preprocess.mjs` の sampler 名の集合はファイル全体で1つ（スコープを見ていない）。uniform 名と
  ローカル変数名が衝突すると誤変換しうる。実装時はスコープを持たせる必要がある
- R4/R6 は `sampler2D` を決め打ちしている。`samplerCube` は資産に1本あり、型名を一般化する小改修が
  要る（`samplerCube(...)` コンストラクタ自体は naga で成功を確認済み）
- uniform ブロックのバイトオフセットが GLSL の std140 と WGSL 既定レイアウトで一致するかは、今回の
  型構成で目視一致を確認しただけ。CPU 側の書き込みと突き合わせる検証はしていない（サブタスク01 の領分）
- 描画結果の正しさは検証していない。本スパイクが確認したのは「コンパイルが通るところまで」
