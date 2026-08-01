#!/bin/bash
# GLSL(ES 3.00) -> WGSL トランスパイル調査の全工程を再実行する。
# 必要なもの: glslangValidator (brew install glslang) / naga (cargo install naga-cli)

set -u
cd "$( dirname "$0" )"
export PATH="$HOME/.cargo/bin:$PATH"

for bin in glslangValidator naga; do

	command -v "$bin" > /dev/null || { echo "missing: $bin"; exit 1; }

done

echo "===== 1. 完全形 GLSL の生成 ====="
node resolve.mjs || exit 1

echo
echo "===== 2. 前処理（規則 R1〜R8）====="
node preprocess.mjs || exit 1

echo
echo "===== 3. 素の完全形を SPIR-V へ（前処理なし・失敗する想定）====="
for f in minimal deferredShading; do

	echo "--- glslangValidator -V $f.full.frag ---"
	glslangValidator -V -o /dev/null "out/$f.full.frag" 2>&1
	echo "exit=$?"

done

echo
echo "===== 4. Path A: 前処理済み GLSL -> naga GLSL frontend -> WGSL ====="
for f in minimal deferredShading; do

	echo "--- $f ---"
	naga --input-kind glsl --shader-stage frag "out/$f.vk.frag" "out/$f.direct.wgsl"
	echo "exit=$?"

done

echo
echo "===== 5. Path B: 前処理済み GLSL -> glslang SPIR-V -> naga -> WGSL ====="
for f in minimal deferredShading; do

	echo "--- $f ---"
	glslangValidator -V -o "out/$f.vk.spv" "out/$f.vk.frag" > /dev/null 2>&1
	echo "glslang exit=$?"
	naga "out/$f.vk.spv" "out/$f.spv.wgsl"
	echo "naga exit=$?"

done

echo
echo "===== 6. 生成 WGSL の検証（naga validate）====="
for f in out/*.wgsl; do

	printf '%-42s ' "$f"
	naga "$f" 2>&1 | tail -1

done

echo
echo "===== 7. サイズ比較（tmp/shader-minified がある場合のみ）====="
node measure-size.mjs || echo "スキップ: リポジトリルートで npm run build を一度実行すると測れます"

echo
echo "ブラウザ(Tint)での検証: python3 -m http.server 8898 して http://localhost:8898/validate.html を開く"
