# WGSL のファイル・include・HMR

- 置き場所は、使う側と同じディレクトリの `shaders/`。1シェーダー1ファイル
- include は2形式（同じファイルは1回だけ展開される）: 近くのファイルへの分割は `#include "./相対パス.wgsl"`、共有モジュールは `#include <module:名前>`（`<projectDir>/Resources/shaders/名前.wgsl` → エンジンの `packages/maxpower/webgpu/shaderModules/名前.wgsl` の順に解決。探し先は `host/vite/configs.ts` の `wgslModuleDirs`。ファイルを置くだけで登録は不要）
- 束縛の宣言（`@group ... var<uniform>` や uniform struct）と、パス生成時に値が決まる定数（ぼかし重み・カーネル等）はTS側が完成形の先頭に前置する。WGSLファイル側は、外から与えられる名前を冒頭コメントに書いておく
- 新しい `.wgsl` を足しても設定変更は不要（拡張子で拾う）
- `.wgsl` はHMR対応。`.wgsl` を直接 import するモジュールが `import.meta.hot.accept` でソースを差し替え、`webgpu/backend/HotReload` の `requestShaderReload()` で Renderer / EditorDraw が資源を作り直す。複数箇所から import されるモジュール（Bindings / Lights / PostProcess / Material のようなハブ）に `.wgsl` を足したら、そのモジュール自身に accept を書く（書かないとHMRがエントリまで波及してフルリロードに落ちる）

- HMR対象外（変更はフルリロード）: `standardVertex.wgsl`（コンポーネント側で連結キャプチャされるため）、エディタギズモの `flat.wgsl` / `mask.wgsl`（生成済み Material が配布先に保持されるため）
