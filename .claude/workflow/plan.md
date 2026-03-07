# Plan: Materialのuniformをエディタで設定できるようにする

## 概要

Materialのシェーダー（GLSL）からuniform宣言を自動解析し、エディタUIのPropertyパネルで型に応じた入力UIを表示する。

- `float` → 数値入力
- `vec2/vec3/vec4` → ベクトル入力
- `int` → 数値入力
- `sampler2D` → テクスチャリソース選択ドロップダウン

現状は `src/ts/Resources/index.ts` で `uNoiseTex` をglobalUniformsとしてハードコードしているが、これをMaterialResource単位で管理・永続化可能にする。

## 設計方針

### 責務分離: ShaderResourceが解析、MaterialResourceがUI

- **ShaderResource**: ソースコードからuniform宣言（型+名前）を解析・キャッシュする。HMRの `updateSource()` 時に再解析
- **MaterialResource**: ShaderResourceの解析結果を参照して、型に応じた動的フィールドを生成する。解析ロジックは持たない

### GLSL型 → Serializableフィールドのマッピング

| GLSL型 | UniformType | フィールド値の型 | フィールドformat | エディタUI |
|--------|------------|----------------|-----------------|----------|
| `float` | `1f` | `number` | なし | InputNumber |
| `vec2` | `2fv` | `number[]` (長さ2) | `{ type: "vector" }` | Vector (x,y) |
| `vec3` | `3fv` | `number[]` (長さ3) | `{ type: "vector" }` | Vector (x,y,z) |
| `vec4` | `4fv` | `number[]` (長さ4) | `{ type: "vector" }` | Vector (x,y,z,w) |
| `int` | `1i` | `number` | なし | InputNumber (step=1) |
| `sampler2D` | `1i` | `string` (テクスチャ名) | `{ type: "select" }` | InputSelect |

### なぜ `#include` 展開前か

展開前のソースをパースすれば、ユーザー定義のuniformだけが対象になる。`frag_h.part.glsl` 等で自動挿入されるシステムuniform（`uDeferredTexture`, `uModelMatrix`等）を除外する必要がない。

### Serializableフィールドの動的管理

- `removeField()` メソッドを `Serializable` に追加する
- シェーダー変更時に、古いuniformフィールドを `removeField()` で削除し、新しいuniformに対応するフィールドを `field()` で再登録する

### uniformの値の永続化形式（.matファイル）

hiddenフィールドは使わず、個別の `uniforms/xxx` フィールドがそのままexportされる。

```json
{
  "uniforms/uNoiseTex": "noise",
  "uniforms/uColor": [1.0, 0.5, 0.0],
  "uniforms/uIntensity": 2.5,
  "uniforms/uCount": 3
}
```

型情報は永続化しない。読み込み時にシェーダー解析結果からGLSL型を取得し、値の型（string→sampler2D, number→float/int, number[]→vec）で判別する。

### コンストラクタでの保存値読み込み

`data` から `uniforms/` プレフィックスのキーを抽出して `_uniforms` に格納する:

```typescript
const savedUniforms: { [key: string]: any } = {};
if ( data ) {
    for ( const key of Object.keys( data ) ) {
        if ( key.startsWith( "uniforms/" ) ) {
            savedUniforms[ key.slice( "uniforms/".length ) ] = ( data as any )[ key ];
        }
    }
}
this._uniforms = savedUniforms;
```

## 実装ステップ

### 1. Serializable に `removeField()` メソッドを追加

- **対象ファイル**: `packages/maxpower/Serializable/index.ts`
- **変更内容**: `fields_` Mapからフィールドを削除するpublicメソッドを追加
- **状態**: 実装済み

### 2. ShaderResource に全uniform解析機能を追加

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/ShaderResource/index.ts`
- **変更内容**:
  1. ソースから全uniform宣言（型+名前）を抽出する `_parseUniforms()` メソッドを追加
  2. 解析結果を `uniforms: ShaderUniformInfo[]` プロパティとしてキャッシュ
  3. コンストラクタと `updateSource()` の両方で解析を実行
- **状態**: 実装済み

### 3. MaterialResource の uniforms フィールド管理をリファクタ

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts`
- **変更内容**:
  1. hidden `_uniformValues` フィールドを廃止
  2. `_uniforms` の型を `{ [key: string]: any }` に簡略化（型情報不要）
  3. コンストラクタで `data` から `uniforms/` プレフィックスのキーを抽出して `_uniforms` に格納
  4. `_rebuildUniformFields` で個別フィールドがそのままexportされる（値のみ）
  5. `applyUniform` コールバックの `glslType` 引数で型判別（実行時はShaderResourceから取得済み）
- **コードスニペット**:
  ```typescript
  // _uniforms の型を簡略化
  private _uniforms: { [key: string]: any };

  // コンストラクタでのデータ読み込み
  const savedUniforms: { [key: string]: any } = {};
  if ( data ) {
      for ( const key of Object.keys( data ) ) {
          if ( key.startsWith( "uniforms/" ) ) {
              savedUniforms[ key.slice( "uniforms/".length ) ] = ( data as any )[ key ];
          }
      }
  }
  this._uniforms = savedUniforms;

  // _rebuildUniformFields 内のフィールド登録（sampler2D例）
  this.field( fieldPath, () => this._uniforms[ uniformName ] || "", ( v ) => {
      this._uniforms[ uniformName ] = v;
      this._applyUniform( this.material, uniformName, glslType, v );
  }, {
      format: {
          type: "select",
          list: () => [
              { label: "(None)", value: "" },
              ...this._getTextureList()
          ]
      }
  } );
  ```

### 4. Resources.addMaterial() のコールバック追加

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/index.ts`
- **変更内容**: MaterialResourceコンストラクタに `getTextureList` と `applyUniform` コールバックを渡す。`data` の型から `_uniformValues` を削除（不要になった）
- **状態**: コールバック追加は実装済み。`_uniformValues` 廃止の反映が必要

### 5. テクスチャ変更時のuniform再適用

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/index.ts`
- **変更内容**: テクスチャリソースが再ビルドされた時に、そのテクスチャを参照するマテリアルのuniformを更新
- **状態**: 実装済み。ただし `_reapplyTextureUniforms` のexportキー参照を更新する必要あり
- **コードスニペット**:
  ```typescript
  private _reapplyTextureUniforms() {
      this._materialResources.forEach( ( resource ) => {
          const exported = resource.serialize( { mode: "export" } ) as any;
          // uniforms/ プレフィックスのキーからstring値（テクスチャ名）を探す
          for ( const key of Object.keys( exported ) ) {
              if ( ! key.startsWith( "uniforms/" ) ) continue;
              const value = exported[ key ];
              if ( typeof value !== "string" || ! value ) continue;
              const uniformName = key.slice( "uniforms/".length );
              const texture = this._textures.get( value );
              if ( texture ) {
                  resource.material.uniforms[ uniformName ] = { value: texture, type: "1i" };
              }
          }
      } );
  }
  ```

## 変更対象ファイル一覧

- [x] `packages/maxpower/Serializable/index.ts` - `removeField()` メソッド追加
- [x] `packages/orengine/ts/Engine/Resources/ShaderResource/index.ts` - 全uniform解析・キャッシュ機能追加
- [x] `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` - hiddenフィールド廃止、`_uniforms` 簡略化、dataからの読み込み変更
- [x] `packages/orengine/ts/Engine/Resources/index.ts` - `_uniformValues` 型削除、`_reapplyTextureUniforms` 更新

## データフロー

```
HMRでシェーダー更新:
  shaderList HMR → ShaderResource.updateSource()
    → _parseUniforms() で全uniformキャッシュ更新
    → emit("update")
    → MaterialResource._onShaderUpdate()
      → _syncShaderToMaterial() (既存: Material.vert/fragを更新)
      → _rebuildUniformFields()
        → ShaderResource.uniforms を参照（型+名前）
        → 古いフィールド削除 → 型に応じた新しいフィールド生成
        → emit("fields/update") → エディタUI更新

エディタでuniform値変更:
  UI入力 → setField() → MaterialResource setter
    → _uniforms[uniformName] = newValue
    → applyUniform() → material.uniforms[name] = { value, type }
    → 描画時にsetUniforms()でGPUに転送

永続化:
  プロジェクト保存 → exportMaterialConfigs()
    → MaterialResource.serialize({ mode: "export" })
    → { ..., "uniforms/uNoiseTex": "noise", "uniforms/uColor": [1,0.5,0] }
    → .mat ファイルに書き出し

読み込み:
  .mat → MATERIALLIST → addMaterial(name, data)
    → data["uniforms/uNoiseTex"] = "noise" 等を抽出
    → _uniforms = { uNoiseTex: "noise" }
    → _rebuildUniformFields() でフィールド生成 + uniform適用
```

## 考慮事項・リスク

1. **mat3/mat4**: 今回は対象外。システムuniformで使われることが多く、ユーザーが手動設定するケースが少ない。必要になったら拡張
2. **uniform配列**: `uniform float uWeights[8];` のような配列宣言は今回非対応。必要になったら拡張
3. **シェーダー未設定時**: vert/fragが空の場合、uniformは0個。uniformsフォルダ自体が表示されない
4. **globalUniformsとの競合**: `Resources.setGlobalUniforms()` でマテリアルのuniformsにマージされる。MaterialResource経由の設定が後から適用されるため上書きする形になる。これは意図した動作（マテリアル固有の設定が優先）
5. **`removeField` の副作用**: UIが古いフィールドを参照し続ける可能性。`_rebuildUniformFields` 後に `fields/update` イベントを発火してUIを更新する
6. **float/intの適用**: `setUniforms()` は `number` 型の value を `arrayValue.push(v)` で処理するので、`mat.uniforms[name] = { value: 2.5, type: "1f" }` で動作する
7. **vec型の適用**: `setUniforms()` は配列の場合各要素を `push` する。`number[]` をvalueとして渡せば動作する

## テスト方針

- `npm run typecheck` で型エラーがないことを確認
- `npm run dev` で以下を手動確認:
  - AssetViewerでマテリアルを選択 → Propertyパネルに `uniforms/` フォルダが表示される
  - **sampler2D**: ドロップダウンでテクスチャリソースを選択 → 3Dビューに反映
  - **float**: 数値入力で値変更 → 3Dビューに反映
  - **vec3**: x,y,z 各要素を個別に入力 → 3Dビューに反映
  - **int**: 整数入力で値変更 → 3Dビューに反映
  - シェーダーを外部エディタで変更（HMR） → uniformsフィールドが動的に更新される
  - プロジェクト保存後に `.mat` ファイルに `uniforms/xxx` フィールドが含まれる（デフォルト値のものは除外）
  - ページリロード後もuniform設定が保持される
