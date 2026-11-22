# 描画の正しさのテスト（render-correctness）

## 作り
- `renderCorrectness.spec.ts`: バックエンドごとに dev サーバーと headless Chromium を立て、`page/blank.html`（素のページ）を開いて `page/harness.ts` を import する。エディタは起動しない（.tsx を読むので React Refresh の前置きだけをページに入れる）
- `page/harness.ts`（ブラウザ側）: player と同じく Engine だけを立ててシーンを読み、shot の `--time --frames` と同じ進め方（時刻を飛ばして始め、1/60 秒ずつ）で描き、`readRenderImage` で `lit` を読む。カメラ・平行光・Shape のメッシュ（GPU に渡した頂点）も返す
- `raycast.ts`: 画素の中心から光線を飛ばし、実際の三角形に当てて面の位置・法線（頂点の法線の補間）を出す。Shape の球は 48×32 分割で、式の球に当てると粗さ 0.2 のハイライトで 1 割近くずれるため
- `answer.ts`: エンジンの光の式（1 灯ぶんの反射・環境光・gBuffer の 8bit の丸め）の書き写しと、白い炉の答え（BRDF の半球の積分。格子で取るので毎回同じ値）
- 結果は `tmp/render-correctness/<バックエンド>-<テスト>.json`（物ごとの外れの数・いちばん外れた画素・明るい画素と中心の画素）

## テストシーン（demo-webgl / demo-webgpu の `scenes/correctness-*.json`。中身は同じ）
- 色・粗さは 8bit でちょうど表せる値にしてある（deferred は面の値を 8bit の gBuffer に入れるので、forward と比べたときに丸めの差を出さないため）。影・SSAO・SSR・ブルームなどは切ってある
- `correctness-pbr-direct`: 平行光 1 本・黒い空。非金属と金属の球、粗さ 0.2〜1.0
- `correctness-pbr-furnace`: 光なし・一様な白い空（skyColor 0.5・groundColor 1 で全方向 1）。albedo 1 の非金属と金属の球
- `correctness-forward-mix`: orthographic・平行光。同じ材質の deferred と forward の球の対（120px ずらすと同じ向き・同じ視線の面になる）、交差させた赤い deferred と青い forward の球、deferred の板の前の半透明（opacity 0.5）と屈折（opacity 1）の球

## テストと許す幅
- 答えとの比べ合い（pbr-direct・pbr-furnace）: 差が |答え| × rel + abs を超えた画素を外れとする。幅の根拠は spec の定数のコメント
  - 直接光は rel 1%（実測の最大は幅の 2 割ほど）。白い炉は、エンジンの環境光の式の値とは rel 1%、積分した答えとは rel 10%（近似のずれの実測が最大 6.6%）
- 同じバックエンドの中の比べ合い（forward-mix）: deferred と forward の対の画素、交差での手前の色、半透明（4 通りに描いて球そのものの色を打ち消す）、屈折（球の無いときの板の値 × color）
- 既知の食い違い（`test.fail`）: 金属の直接光の式は fresnel の f0 が 0.04 のまま specularColor（= albedo）を掛けるので、白い金属でも直接光は約 4% しか返さない。環境光の式は金属の EF を 1 にするので、白い炉では 1 になる。どちらに寄せるかは判断待ち。式を直して通るようになったら `test.fail` を外す
- 未決（合否なし・記録だけ）: SSAO・SSR を forward の面に掛けるか。今は forward の物は gBuffer の段で位置・法線を先に書くので deferred の面の SSAO・SSR には効くが、forward の面そのものには掛からない。SSAO を入れたときの暗くなり方を annotation と結果の JSON に残す
