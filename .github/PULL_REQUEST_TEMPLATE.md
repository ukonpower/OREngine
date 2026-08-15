<!-- 何をなぜ変えたかを簡潔に -->

## 確認事項

該当しない項目はチェック不要。

- [ ] ランタイム（player に入るコード）を触った場合: `npm run player:build` で packed サイズ（`dist/player/out.html`）を実測し、増減を本文に記載した
- [ ] ランタイムに外部依存を追加していない
- [ ] tree-shaking を壊すパターンを使っていない（`import * as NS` したメンバーの `extends` / `export namespace`）
- [ ] エディタ UI の見た目に影響する場合: `npm run vrt` で確認し、意図した差分は `npm run vrt:update` で基準画像を更新した（現状 macOS ローカル専用）
- [ ] GLSL シェーダーを変更した場合: minify 後の描画を確認した
