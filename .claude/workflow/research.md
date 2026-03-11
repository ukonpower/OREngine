# Research: OREngine skill/API設計の改善点

## タスク概要

今回のセッション（新規エンティティへのイケイケビカビカマテリアル設定）で発生した
やりづらかった点を整理し、skill・API設計の改善に活かす。

---

## 発生した問題と原因

### 問題1: バッチAPIのコンポーネント指定プロパティ名が不明瞭

**何が起きたか**
`POST /editor/entities` のバッチ作成で `"name": "Mesh"` と書いたら、
コンポーネントがアタッチされずに `{ "uuid": "..." }` だけの状態になった。

**正しいプロパティ名**: `componentName`（`name` ではない）

**なぜ気づきにくいか**
- `api-scene.md` のバッチAPIのサンプルに `componentName` と書いてあるが、
  コンポーネント操作テーブル（`POST /editor/entity/:uuid/component`）と
  表記が微妙に異なる印象がある
- レスポンスにコンポーネントの `name` が返ってこないため、
  「作成されたが名前が取れていない」のか「アタッチ失敗」なのかが区別できない
- シーンツリー上でも `{ "uuid": "..." }` として出現するため一見「存在する」ように見える

**改善案**
- バッチAPI で `componentName` が指定されなかった場合にエラーを返す（現状: silent失敗）
- レスポンスの components に `componentName` を必ず含めて、成功可否を確認できるようにする

---

### 問題2: シェーダーで使える変数名がドキュメントにない

**何が起きたか**
- 頂点シェーダーで `localPosition` を使ったが存在せず → 正しくは `outPos`
- フラグメントシェーダーで `outMetallic` を使ったが存在せず → 正しくは `outMetalic`（l が1つ）

**実際の定義箇所**
- `packages/maxpower/Utils/ShaderParser/shaderParts/vert_in.part.glsl`:
  ```glsl
  vec3 outPos = position;   // 頂点位置（書き込み可能）
  vec3 outNormal = normal;
  vec2 outUv = uv;
  ```
- `packages/maxpower/Utils/ShaderParser/shaderParts/frag_in.part.glsl`:
  ```glsl
  vec4 outColor = vec4(1.0);
  vec3 outEmission = vec3(0.0);
  float outRoughness = 0.5;
  float outMetalic = 0.0;   // ← Metallic ではなく Metaric（typo）
  vec3 outPos = vPos;
  ```

**なぜ気づきにくいか**
- `shader-guide.md` の「カスタマイズ可能な出力変数」テーブルに `outMetallic` と
  記載されているが、実際のGLSLは `outMetalic`（typo）でドキュメントと実装が乖離
- 頂点シェーダーで書き換え可能な変数（`outPos` 等）がドキュメントに明記されていない

**改善案**
- `shader-guide.md` に `<vert_in>` で展開される変数一覧を追記する
- `outMetalic` のスペルをどちらかに統一する（理想は `outMetallic`）

---

### 問題3: 複数プロジェクトがある際に操作対象を確認しなかった

**何が起きたか**
DemoProject でエンティティを作成したあと「Project0 に追加して欲しかった」と指摘された。

**なぜ起きたか**
- サーバー起動確認時に `["DemoProject", "Project0"]` と2つ見えていたのに
  最初に出てきた DemoProject をそのまま選んでしまった
- skill の冒頭フローに「プロジェクトを確認する」とはあるが、
  複数プロジェクトがある場合に「どちらを使うかユーザーに聞く」とは明記されていない

**改善案**
- skill の鉄則に「複数プロジェクトが存在する場合は操作対象をユーザーに確認する」を追記
- `check-server.sh` の出力に「現在ブラウザで開かれているプロジェクト」を
  表示できると自動判断できる（`/editor/status` API の活用）

---

### 問題4: `GET /editor/resources` が動かなかった

**何が起きたか**
`curl http://localhost:3001/api/projects/DemoProject/editor/resources` が
`{"error": "Unknown action: getResources"}` を返した。

**改善案**
- 動作しないエンドポイントをドキュメントから削除するか `[未実装]` と注記する

---

### 問題5: ブラウザ未接続時のエラーメッセージが不親切

**何が起きたか**
Project0 をブラウザで開く前にAPIを叩いたら `{"error": "Timeout"}` が返った。

**なぜ気づきにくいか**
- 「タイムアウト」という言葉だけでは「ブラウザで開いていないから」とは推測しにくい

**改善案**
- エラーレスポンスを `{"error": "Timeout", "hint": "対象プロジェクトをブラウザで開いてください"}` のように詳細化する

---

## まとめ: 優先度別改善案

| 優先度 | 対象 | 改善内容 |
|--------|------|---------|
| 高 | skill: `shader-guide.md` | `<vert_in>` の書き換え可能変数一覧を追記、`outMetalic` のスペル修正 |
| 高 | skill: `api-scene.md` | バッチAPIで `componentName` を強調・必須明記 |
| 高 | skill: 鉄則 | 複数プロジェクト時に操作対象をユーザー確認するルールを追加 |
| 中 | API: batch entities | `componentName` 未指定時にエラーを返す |
| 中 | API: エラーレスポンス | Timeout 時に hint を付与 |
| 低 | エンジン: GLSL変数 | `outMetalic` → `outMetallic` に統一 |
| 低 | skill: `api-resources.md` | 未実装エンドポイントの注記 |
