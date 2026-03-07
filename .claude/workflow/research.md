# Research: Materialへのテクスチャuniform設定をエディタで行えるようにする

## タスク概要
Materialのシェーダー（GLSL）からsampler2Dのuniform宣言を自動解析し、エディタUIでテクスチャリソースを選択・設定できるようにする。現状はハードコードのglobalUniformsでテクスチャを渡しているが、これをMaterialResource単位で管理可能にする。

## 現状の仕組み

### テクスチャuniformの現在の設定方法
- `src/ts/Resources/index.ts:189-194` で `uNoiseTex` を **globalUniforms としてハードコード** している
- `Resources._applyTextureUniforms()` (l.381-404) が `material.uniforms[name] = { value: texture, type: "1i" }` でテクスチャを設定
- `Resources.addMaterial()` (l.266-325) は `data.uniforms?: { [key: string]: string }` を受け取り、`uniformName → textureName` のマッピングとして `_applyTextureUniforms` に渡す
- しかし **MaterialResource はこの uniforms データをSerializableフィールドとして管理していない** → エディタUIに表示されない

### テクスチャの描画時処理
- `setUniforms()` (Renderer/index.ts:1459-1523) がテクスチャを処理
- `'isTexture' in v` で GLPowerTexture を判定 → `v.activate(TextureUnitCounter++)` → `program.setUniform(name, type, [v.unit])`
- つまり `material.uniforms` に `{ value: GLPowerTexture, type: "1i" }` を入れれば動く

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Material/index.ts` | `Material`, `MaterialParam` | Materialクラス本体。`uniforms: GLP.Uniforms` を持つ |
| `packages/glpower/.../GLPowerProgram.ts` | `Uniforms`, `UniformType`, `Uniformable` | uniform型定義。`Uniforms = {[key:string]: {value: any, type: UniformType}}` |
| `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` | `MaterialResource` | マテリアルのSerializable管理。vert/frag/phase等のフィールドあり。**uniformsフィールドなし** |
| `packages/orengine/ts/Engine/Resources/TextureResource/index.ts` | `TextureResource` | テクスチャリソース。Serializableフィールドとしてfrag/resolution/filterを管理 |
| `packages/orengine/ts/Engine/Resources/index.ts` | `Resources` | リソース全体管理。`_textures: Map<string, GLPowerTexture>`, `_applyTextureUniforms()` |
| `packages/maxpower/Serializable/index.ts` | `Serializable`, `field()`, `fieldDir()` | フィールド管理基底クラス。`format: { type: "select", list: [...] }` でドロップダウンUI対応 |
| `packages/maxpower/Utils/ShaderParser/index.ts` | `shaderParse`, `shaderInclude` | シェーダー文字列パース（#include展開、defines挿入、ループ展開）。**uniform解析機能はなし** |
| `packages/maxpower/Component/Renderer/index.ts` | `setUniforms`, `TextureUnitCounter` | uniform→GPU転送。テクスチャは`isTexture`判定でactivate |
| `packages/orengine/tsx/components/SerializeFieldView/index.tsx` | `SerializeFieldView` | Serializableのフィールドを自動UIレンダリング |
| `packages/orengine/tsx/components/Panels/EntityProperty/index.tsx` | `AssetPropertyView` | マテリアルアセット選択時に `SerializeFieldView` で表示 |
| `server/routes/materials.ts` | `materialsRouter` | `.mat` ファイルのCRUD REST API |
| `src/ts/Resources/_data/materialList.ts` | `MATERIALLIST` | ビルド時生成マテリアル設定データ |
| `src/ts/Resources/Materials/*.mat` | - | マテリアル設定JSONファイル。現状uniformsフィールドなし |

## 依存関係

```
.mat ファイル → MATERIALLIST (ビルド時生成) → Resources.addMaterial(name, data)
  → data.uniforms を _applyTextureUniforms() でMaterialインスタンスに適用
  → MaterialResource (Serializable) を生成してエディタUI表示

Resources._textures (Map<string, GLPowerTexture>)
  ← TextureResource + ShaderResource から TexProcedural で生成
  → _applyTextureUniforms() で material.uniforms に GLPowerTexture を設定

MaterialResource → SerializeFieldView → エディタPropertyパネル
```

## 既存パターン

### Serializableフィールド + select形式ドロップダウン
TextureResourceとMaterialResourceの両方で使用されている。例:
```typescript
this.field( "frag", () => this._frag, ( v ) => { ... }, {
    format: {
        type: "select",
        list: () => this._buildShaderSelectList()
    }
});
```
`list` に関数を渡すと動的にリスト生成。`{ label, value }` の配列を返す。

### uniformsマッピング（Resources._applyTextureUniforms）
```typescript
// data.uniforms = { "uNoiseTex": "noise" } (uniformName → textureName)
// → material.uniforms["uNoiseTex"] = { value: textures.get("noise"), type: "1i" }
```

## 制約・注意点

1. **シェーダーパースの複雑さ**: `#include <frag_h>` 等でシステムuniform（uModelMatrix, uViewMatrix等）も展開される。sampler2D解析時にこれらのシステムuniformを除外する必要がある（例: `uDeferredTexture`, `uBackBuffer0`, シャドウマップ等）
2. **パース対象**: vertシェーダーとfragシェーダー両方にsampler2Dがありうるが、fragが主。`shaderInclude()` で展開後のソースをパースするか、展開前の生ソースをパースするかの選択肢がある。**展開前がシンプル**（ユーザー定義のuniformだけ取れる）
3. **テクスチャリソース名 vs GLPowerTexture名**: `_textures` Mapのキーが名前。TextureResourceの名前と一致する
4. **動的更新**: シェーダーが変更されたらuniformリストも更新する必要がある
5. **.matファイルへの永続化**: `uniforms` フィールドを `.mat` JSON に追加する必要がある。サーバーAPIは既にJSONをそのまま保存するので、スキーマ変更不要
6. **globalUniformsとの競合**: `Resources.setGlobalUniforms()` がマテリアルのuniformsにマージされる。テクスチャuniformの優先順位を考慮
7. **Serializableフィールドの動的追加/削除**: `fields_` はMapなのでsetで追加可能。ただし削除のpublic APIはない（`fields_.delete()` は private）。シェーダー変更時のフィールド再構築に検討が必要

## 設計案

### アプローチA: シェーダー自動解析 + 動的フィールド生成

1. **sampler2D解析ユーティリティ**
   - シェーダーソース（`#include`展開前）から `uniform sampler2D <name>;` を正規表現で抽出
   - 正規表現: `/uniform\s+sampler2D\s+(\w+)\s*;/g`

2. **MaterialResourceにuniformsフィールド追加**
   - `_uniforms: { [uniformName: string]: string }` を管理
   - `fieldDir("uniforms")` 配下に各sampler2Dのselectフィールドを動的生成
   - select list = `Resources.textureList` から動的生成 + `(None)` オプション

3. **シェーダー変更時のフィールド再構築**
   - vert/fragのsetter内でsampler2Dを再解析
   - 既存のuniformsマッピングを保持しつつフィールドを再生成

4. **.matファイルの拡張**
   ```json
   {
     "vert": "...", "frag": "...",
     "uniforms": { "uNoiseTex": "noise" }
   }
   ```

### アプローチB: 手動マッピングのみ（シェーダー解析なし）

- uniformsフィールドに手動でキー/値ペアを追加するUI
- シンプルだがUXが劣る

### 推奨: アプローチA
シェーダーの展開前ソースからsampler2Dを解析するのが最もシンプルで、ユーザー定義のuniformだけが対象になる。

## 参考になる既存実装
- `TextureResource.field("frag", ...)` - selectドロップダウンでシェーダー名を選択するパターン
- `MaterialResource._syncShaderToMaterial()` - シェーダー変更時のMaterialインスタンス同期
- `Resources._applyTextureUniforms()` - uniformName→textureName→GLPowerTextureの解決ロジック
- `Serializable.fieldDir()` - フィールドをフォルダ構造にグループ化
