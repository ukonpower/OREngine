# WebGPU gBuffer MRT + uniform→UBO 反映層 スパイク結果

使い捨ての実現性検証。エンジンコードには一切触れていない（`spikes/webgpu-gbuffer/` の 4 ファイルのみ）。

## 再実行方法

```bash
cd /Users/ukonpower/Documents/work-space/OREngine/spikes/webgpu-gbuffer && python3 -m http.server 8899
```

ブラウザ（WebGPU 対応版 Chrome）で `http://localhost:8899` を開く。ページが自己検証し、`#result` と console に
PASS/FAIL と実測値、最後に `ALL PASS` / `HAS FAILURES (n)` を出す。手作業のセットアップは不要。

## 結論

**3 項目とも実現可能**。gBuffer の 5 枚 MRT（56 bytes/sample）はそのまま通り、名前ベース uniform 辞書 →
UBO パック層は 200 行程度で書けて `directionalLight[0].direction` 形式のキーも扱えた。GLSL の combined
sampler が texture + sampler に分かれる点も実動作を確認した。

## 検証環境

- Chrome（agent-browser、**headless**）、macOS / Apple Silicon
- adapter: `vendor=apple architecture=metal-3`
- 検証日: 2026-08-01

## 1. limits の実測（最重要項目）

| 項目 | 値 |
|:--|:--|
| `adapter.limits.maxColorAttachmentBytesPerSample` | **128** |
| WebGPU のデフォルト limit | 32 |
| OREngine gBuffer の実需（rgba32float×3 + rgba8unorm×2） | 56 |
| `adapter.limits.maxColorAttachments` | 8 |

デフォルトの 32 では 56 に足りないが、Apple/Metal-3 の adapter は 128 を報告した。
`requestDevice({ requiredLimits: { maxColorAttachmentBytesPerSample: 128 } })` で引き上げ、
**縮小構成へのフォールバックは発動せずに実構成のまま全項目 PASS**。

留意点: これは「限界まで引き上げれば通る」という結果であり、デフォルト limit のままでは通らない。
移植時は device 生成時に `requiredLimits` を明示するのが必須で、かつ **56 を満たさない adapter が
存在しうる**（デフォルトが 32 である以上、下位 GPU では 32〜64 に留まる可能性がある）。その場合の
フォールバックとして rgba32float×3 → rgba16float×3（32 bytes/sample）が成立するかは、スパイクの
コード上に分岐として実装済み（`GBUFFER[].small`）だが、この環境では実行経路に入っていない。
position を fp16 に落とすと精度が足りない可能性があるため、実際に必要になったときは
「position だけ rgba32float、normal/velocity を rgba16float」（16 + 8 + 8 + 4 + 4 = 40）のような
中間案を先に検討すべき。

## 2. 5 枚 MRT の readback 結果

64×64、`depth24plus` 付き、フルスクリーン三角形 1 draw。中心ピクセルを `copyTextureToBuffer` →
`mapAsync` で読み戻して既知定数と比較（float 許容 1e-3 相対、unorm 許容 1/255）。

| index | format | OREngine での用途 | expected | actual |
|:--|:--|:--|:--|:--|
| 0 | rgba32float | position.xyz + emission.x | [1.5, -2.5, 3.5, 0.25] | [1.5, -2.5, 3.5, 0.25] |
| 1 | rgba32float | normal.xyz + emission.y | [0, 1, -1, 2.5] | [0, 1, -1, 2.5] |
| 2 | rgba8unorm | albedo | [0.25, 0.5, 0.75, 1] | [0.251, 0.502, 0.749, 1] |
| 3 | rgba8unorm | roughness/metallic/ssn/env | [0.1, 0.9, 0.35, 0] | [0.102, 0.898, 0.349, 0] |
| 4 | rgba32float | velocity.xy + emission.z | [-123.5, 456.25, 0, 7.75] | [-123.5, 456.25, 0, 7.75] |

全一致。rgba32float は 1 を超える値・負値ともに素通しで、`blend` を指定しなければ render attachment
として問題なく使える。

## 3. UniformBinder（名前ベース辞書 → UBO）

`uniform-binder.js` は「WGSL 側の構造体レイアウト定義」を受け取り、WGSL の uniform アドレス空間の
アラインメント規則からキー → バイトオフセット表を作って `ArrayBuffer` へパックする。

実測したオフセット（すべて手計算の期待値と一致、UBO サイズ 80）:

```
uColor@0  uIntensity@12
directionalLight[0].direction@16  directionalLight[0].color@32
directionalLight[1].direction@48  directionalLight[1].color@64
```

- `uColor`(vec3f) は 12 バイトだが `uIntensity`(f32) が @12 に詰まる — vec3 の後ろの 4 バイトは
  「詰められる」パディングで、常に 16 に切り上がるわけではない
- `directionalLight` は struct 配列。要素サイズは 28 バイトだが uniform アドレス空間では
  **stride が 16 の倍数**に切り上がるため 32。この規則を知らずに 28 で書くと 2 要素目以降が全部ずれる
- struct 自体も 16 バイト境界に置かれるため、`uIntensity` の後ろに 4 バイトの穴が空いて @16 から始まる

異なる辞書値で 2 フレーム描画し、readback で追従を確認:

| | uniform 由来の出力 |
|:--|:--|
| フレーム1 | expected [0, 1, 0.6, 1.5] / actual [0, 1, 0.6, 1.5] |
| フレーム2 | expected [4.5, 1, -9.25, 9] / actual [4.5, 1, -9.25, 9] |

pipeline と bind group は作り直さず、`queue.writeBuffer` で内容だけ差し替えて追従した。

### texture + sampler の bind group 分離

gBuffer[0]（rgba32float）を 2 パス目で `texture_2d<f32>` + `sampler` としてサンプリングし、
書き込んだ定数 [1.5, -2.5, 3.5, 0.25] がそのまま読めることを確認。
group 0 = uniform、group 1 = texture + sampler と分けている。

**注意点**: rgba32float は filterable ではないため、bind group layout に
`sampleType: 'unfilterable-float'` と `sampler: { type: 'non-filtering' }` を明示する必要がある。
`layout: 'auto'` では `texture_2d<f32>` から filterable な `'float'` が推論されてバインドに失敗する。
OREngine の gBuffer は NEAREST サンプリングなので実害はないが、**bind group layout を手書きする
必要がある**という制約は移植コストに効く。

## 設計への示唆

1. **gBuffer 構成はそのまま移植できる**。ただし device 生成時に `maxColorAttachmentBytesPerSample`
   を adapter の実力まで引き上げる処理が必須。エンジン側に「gBuffer が要求する bytes/sample」を
   定数として持ち、adapter が満たさなければフォーマットを落とすフォールバック経路を用意する形になる。
2. **uniform 辞書 → UBO 層は現実的**。ただし WebGL 版と決定的に違うのは、**WGSL 側の構造体レイアウトを
   CPU 側が知っている必要がある**こと。WebGL は `gl.getUniformLocation` で名前を実行時に引けたが、
   WebGPU にその API は無い。したがって「シェーダーから uniform ブロックの宣言を抽出してレイアウト定義を
   生成する」工程がビルド時か実行時のどちらかに必要になる（サブタスク 02 の GLSL→WGSL 変換と同じ
   パーサ資産を使い回せる可能性が高い）。
3. **レイアウトに無いキーは黙って無視されない設計にできる**（今回は `update()` が未知キーの配列を返す）。
   WebGL では未使用 uniform への代入が黙って捨てられていたので、移植時に「WGSL 側で最適化により
   消えた uniform」が大量に検出されるはず。エラーではなく警告として扱う設計が要る。
4. **対応が難しい OREngine の uniform 型**:
   - `Matrix3fv`（mat3x3f）は 9 float だが WGSL では 3 列 × 16 バイト = 48 バイトへ展開が必要。
     今回 binder に列パディング処理を入れた（`writeEntry_` の `columns` 分岐）
   - `1i` / `1iv` などの int 系は f32 と混在すると型ごとの書き分けが必要（実装済みだが未検証）
   - **sampler / texture 系は UBO に入らない**ため、辞書から分離して bind group 側へ振り分ける
     ディスパッチが別途必要。`directionalLightShadowMap[0]` のようなキーはこちら側に落ちる
5. **アラインメント処理のコスト**: レイアウト計算はレイアウト定義ごとに 1 回で済み（オフセット表を
   キャッシュ）、毎フレームは `DataView.setFloat32` × フィールド数 + `writeBuffer` 1 回のみ。
   WebGL の `gl.uniform*` を名前ごとに呼ぶ方式よりむしろ安い。
