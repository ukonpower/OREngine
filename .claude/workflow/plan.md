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

```json
{
  "uniforms": {
    "uNoiseTex": { "type": "sampler2D", "value": "noise" },
    "uColor": { "type": "vec3", "value": [1.0, 0.5, 0.0] },
    "uIntensity": { "type": "float", "value": 2.5 },
    "uCount": { "type": "int", "value": 3 }
  }
}
```

型情報を保持することで、読み込み時にGLSL型→UniformType変換が正しくできる。

## 実装ステップ

### 1. Serializable に `removeField()` メソッドを追加

- **対象ファイル**: `packages/maxpower/Serializable/index.ts`
- **変更内容**: `fields_` Mapからフィールドを削除するpublicメソッドを追加
- **コードスニペット**:
  ```typescript
  public removeField( path: string ) {

      const normalizedPath = path.startsWith( "/" ) ? path.slice( 1 ) : path;

      this.fields_.delete( normalizedPath );

  }
  ```

### 2. ShaderResource に全uniform解析機能を追加

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/ShaderResource/index.ts`
- **変更内容**:
  1. ソースから全uniform宣言（型+名前）を抽出する `_parseUniforms()` メソッドを追加
  2. 解析結果を `uniforms: ShaderUniformInfo[]` プロパティとしてキャッシュ
  3. コンストラクタと `updateSource()` の両方で解析を実行
- **コードスニペット**:
  ```typescript
  import * as GLP from 'glpower';

  export type ShaderUniformInfo = {
      name: string;
      type: string; // GLSL型名: "float", "vec2", "vec3", "vec4", "int", "sampler2D"
  };

  export class ShaderResource extends GLP.EventEmitter {

      public name: string;
      public source: string;
      public uniforms: ShaderUniformInfo[];

      constructor( name: string, source: string ) {

          super();
          this.name = name;
          this.source = source;
          this.uniforms = this._parseUniforms( source );

      }

      public updateSource( source: string ) {

          this.source = source;
          this.uniforms = this._parseUniforms( source );
          this.emit( "update" );

      }

      private _parseUniforms( source: string ): ShaderUniformInfo[] {

          const result: ShaderUniformInfo[] = [];
          const regex = /uniform\s+(float|vec2|vec3|vec4|int|sampler2D)\s+(\w+)\s*;/g;

          let match;

          while ( ( match = regex.exec( source ) ) !== null ) {

              result.push( { type: match[ 1 ], name: match[ 2 ] } );

          }

          return result;

      }

  }
  ```
- **注意点**:
  - HMR時: `updateSource()` → `_parseUniforms()` → `emit("update")` → MaterialResourceが `_rebuildUniformFields()` を呼ぶ
  - 解析はソース更新時に1回だけ実行され、結果はキャッシュされる
  - 対象型は `float`, `vec2`, `vec3`, `vec4`, `int`, `sampler2D`。`mat3`, `mat4`等は将来的に拡張可能だが今回は対象外（システムuniformで使われることが多い）

### 3. MaterialResource に uniforms フィールド管理を追加

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts`
- **変更内容**:
  1. コンストラクタの `options` に `getTextureList` と `applyUniform` コールバックを追加
  2. `_uniforms: { [uniformName: string]: { type: string, value: any } }` プロパティを追加
  3. ShaderResourceの `uniforms` を参照して型ごとに動的フィールドを生成する `_rebuildUniformFields()` メソッドを追加
  4. `_onShaderUpdate` で `_rebuildUniformFields()` を呼ぶ
  5. vert/frag変更時にもフィールドを再構築
- **コードスニペット**:
  ```typescript
  import { ShaderResource, ShaderUniformInfo } from '../ShaderResource';

  // GLSL型 → デフォルト値
  const uniformDefaultValue = ( type: string ): any => {

      switch ( type ) {

          case "float": return 0;
          case "vec2": return [ 0, 0 ];
          case "vec3": return [ 0, 0, 0 ];
          case "vec4": return [ 0, 0, 0, 0 ];
          case "int": return 0;
          case "sampler2D": return "";
          default: return 0;

      }

  };

  // GLSL型 → UniformType
  const glslTypeToUniformType = ( type: string ): GLP.UniformType => {

      switch ( type ) {

          case "float": return "1f";
          case "vec2": return "2fv";
          case "vec3": return "3fv";
          case "vec4": return "4fv";
          case "int": return "1i";
          case "sampler2D": return "1i";
          default: return "1f";

      }

  };

  // --- コンストラクタ options の型拡張 ---
  constructor( name: string, material: MXP.Material, options: {
      data?: {
          vert?: string;
          frag?: string;
          // ... 既存のフィールド ...
          uniforms?: { [key: string]: { type: string, value: any } };
      };
      getShader: ( name: string ) => ShaderResource | undefined;
      getShaderList: () => ShaderResource[];
      getTextureList: () => { label: string, value: string }[];
      applyUniform: ( material: MXP.Material, uniformName: string, glslType: string, value: any ) => void;
  } ) {

  // --- 新規プロパティ ---
  private _uniforms: { [key: string]: { type: string, value: any } };
  private _getTextureList: () => { label: string, value: string }[];
  private _applyUniform: ( material: MXP.Material, uniformName: string, glslType: string, value: any ) => void;
  private _registeredUniformFields: string[];

  // --- コンストラクタ内 ---
  this._uniforms = data?.uniforms ? JSON.parse( JSON.stringify( data.uniforms ) ) : {};
  this._getTextureList = options.getTextureList;
  this._applyUniform = options.applyUniform;
  this._registeredUniformFields = [];

  // uniformsフォルダ + 初期フィールド構築
  this._rebuildUniformFields();

  // --- _onShaderUpdate の変更 ---
  this._onShaderUpdate = () => {

      this._syncShaderToMaterial();
      this._rebuildUniformFields();

  };

  // --- 動的フィールド構築メソッド ---
  private _rebuildUniformFields() {

      // 古いフィールドを削除
      for ( const fieldPath of this._registeredUniformFields ) {

          this.removeField( fieldPath );

      }

      this._registeredUniformFields = [];

      // ShaderResourceのキャッシュからuniformを取得
      const allUniforms: ShaderUniformInfo[] = [];
      const seen = new Set<string>();

      const collectUniforms = ( resource: ShaderResource | null ) => {

          if ( ! resource ) return;

          for ( const u of resource.uniforms ) {

              if ( ! seen.has( u.name ) ) {

                  seen.add( u.name );
                  allUniforms.push( u );

              }

          }

      };

      collectUniforms( this._vertResource );
      collectUniforms( this._fragResource );

      if ( allUniforms.length === 0 ) return;

      // uniformsフォルダを登録
      const folderPath = "uniforms/";
      this.field( folderPath, () => null, undefined, { isFolder: true } );
      this._registeredUniformFields.push( folderPath );

      // 各uniformに対して型に応じたフィールドを生成
      for ( const uniformInfo of allUniforms ) {

          const { name: uniformName, type: glslType } = uniformInfo;
          const fieldPath = `uniforms/${uniformName}`;

          // 既存の保存値があればそれを使い、なければデフォルト値
          if ( ! this._uniforms[ uniformName ] ) {

              this._uniforms[ uniformName ] = {
                  type: glslType,
                  value: uniformDefaultValue( glslType ),
              };

          }

          const uniformData = this._uniforms[ uniformName ];

          if ( glslType === "sampler2D" ) {

              // sampler2D → テクスチャ選択ドロップダウン
              this.field( fieldPath, () => uniformData.value || "", ( v ) => {

                  uniformData.value = v;
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

          } else if ( glslType === "vec2" || glslType === "vec3" || glslType === "vec4" ) {

              // vec → ベクトル入力
              this.field( fieldPath, () => uniformData.value, ( v ) => {

                  uniformData.value = v;
                  this._applyUniform( this.material, uniformName, glslType, v );

              }, {
                  format: { type: "vector" }
              } );

          } else if ( glslType === "int" ) {

              // int → 数値入力（step=1）
              this.field( fieldPath, () => uniformData.value, ( v ) => {

                  uniformData.value = v;
                  this._applyUniform( this.material, uniformName, glslType, v );

              }, {
                  step: 1
              } );

          } else {

              // float → 数値入力
              this.field( fieldPath, () => uniformData.value, ( v ) => {

                  uniformData.value = v;
                  this._applyUniform( this.material, uniformName, glslType, v );

              } );

          }

          this._registeredUniformFields.push( fieldPath );

          // 初期値を適用（デフォルト値でない場合）
          this._applyUniform( this.material, uniformName, glslType, uniformData.value );

      }

      // シェーダーに存在しなくなったuniform設定を削除
      const validNames = seen;

      for ( const key of Object.keys( this._uniforms ) ) {

          if ( ! validNames.has( key ) ) {

              delete this._uniforms[ key ];
              delete this.material.uniforms[ key ];

          }

      }

      this.emit( "fields/update", [ allUniforms.map( u => `uniforms/${u.name}` ) ] );

  }
  ```
- **vert/frag変更時の再構築（既存setterに追加）**:
  ```typescript
  this.field( "frag", () => this._frag, ( v ) => {

      this._unbindShaderResource( "frag" );
      this._frag = v;
      this._bindShaderResource( "frag", v );
      this._syncShaderToMaterial();
      this._rebuildUniformFields(); // ← 追加

  }, { /* 既存のformat */ } );

  // vertフィールドも同様に _rebuildUniformFields() を追加
  ```

### 4. uniformsフィールドのシリアライズ対応

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts`
- **変更内容**: `uniforms` 全体を1つのフィールドとしてexport用に登録し、`.mat` ファイルに永続化
- **コードスニペット**:
  ```typescript
  // コンストラクタ内に追加
  this.field( "uniforms", () => {

      // デフォルト値のままのuniformは出力しない（ファイルサイズ削減）
      const result: { [key: string]: { type: string, value: any } } = {};

      for ( const key of Object.keys( this._uniforms ) ) {

          const u = this._uniforms[ key ];
          const defaultVal = uniformDefaultValue( u.type );
          const isDefault = JSON.stringify( u.value ) === JSON.stringify( defaultVal );

          if ( ! isDefault ) {

              result[ key ] = u;

          }

      }

      return Object.keys( result ).length > 0 ? result : undefined;

  }, ( v ) => {

      this._uniforms = ( v as any ) || {};
      this._rebuildUniformFields();

  }, {
      hidden: true,
  } );
  ```
- **注意点**: `hidden: true` でUI非表示。個別のuniformフィールドがUIを担当する。デフォルト値のuniformはexportしない

### 5. Resources.addMaterial() のコールバック追加

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/index.ts`
- **変更内容**: MaterialResourceコンストラクタに `getTextureList` と `applyUniform` コールバックを渡す
- **コードスニペット**:
  ```typescript
  const resource = new MaterialResource( name, material, {
      data,
      getShader: ( n ) => this._shaders.get( n ),
      getShaderList: () => this.shaderList,
      getTextureList: () => {

          const list: { label: string, value: string }[] = [];

          this._textures.forEach( ( _, texName ) => {

              list.push( { label: texName, value: texName } );

          } );

          return list;

      },
      applyUniform: ( mat, uniformName, glslType, value ) => {

          if ( glslType === "sampler2D" ) {

              if ( value ) {

                  const texture = this._textures.get( value );

                  if ( texture ) {

                      mat.uniforms[ uniformName ] = { value: texture, type: "1i" };

                  }

              } else {

                  delete mat.uniforms[ uniformName ];

              }

          } else {

              const uniformType = glslTypeToUniformType( glslType );

              mat.uniforms[ uniformName ] = { value, type: uniformType };

          }

      },
  } );
  ```
- **注意点**: 既存の `this._applyTextureUniforms( material, data.uniforms )` は削除する。MaterialResourceの `_rebuildUniformFields` 内で全uniform適用が行われるため

### 6. テクスチャ変更時のuniform再適用

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/index.ts`
- **変更内容**: テクスチャリソースが再ビルドされた時に、そのテクスチャを参照するマテリアルのuniformを更新
- **コードスニペット**:
  ```typescript
  // rebuildTexture() の末尾、および buildTextureInstances() の末尾に追加
  this._reapplyTextureUniforms();

  // 新規メソッド
  private _reapplyTextureUniforms() {

      this._materialResources.forEach( ( resource ) => {

          const exported = resource.serialize( { mode: "export" } ) as any;
          const uniforms = exported.uniforms;

          if ( ! uniforms ) return;

          for ( const uniformName of Object.keys( uniforms ) ) {

              const u = uniforms[ uniformName ];

              if ( u.type === "sampler2D" && u.value ) {

                  const texture = this._textures.get( u.value );

                  if ( texture ) {

                      resource.material.uniforms[ uniformName ] = { value: texture, type: "1i" };

                  }

              }

          }

      } );

  }
  ```

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
    → _uniforms[uniformName].value = newValue
    → applyUniform() → material.uniforms[name] = { value, type }
    → 描画時にsetUniforms()でGPUに転送

永続化:
  プロジェクト保存 → exportMaterialConfigs()
    → MaterialResource.serialize({ mode: "export" })
    → { ..., uniforms: { "uNoiseTex": { type: "sampler2D", value: "noise" }, "uColor": { type: "vec3", value: [1,0.5,0] } } }
    → .mat ファイルに書き出し
```

## 変更対象ファイル一覧

- [x] `packages/maxpower/Serializable/index.ts` - `removeField()` メソッド追加
- [x] `packages/orengine/ts/Engine/Resources/ShaderResource/index.ts` - 全uniform解析・キャッシュ機能追加
- [x] `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` - 型に応じた動的フィールド生成、uniformsシリアライズ
- [x] `packages/orengine/ts/Engine/Resources/index.ts` - MaterialResourceへのコールバック追加、テクスチャ再ビルド時のuniform再適用

## 考慮事項・リスク

1. **mat3/mat4**: 今回は対象外。システムuniformで使われることが多く、ユーザーが手動設定するケースが少ない。必要になったら拡張
2. **uniform配列**: `uniform float uWeights[8];` のような配列宣言は今回非対応。必要になったら拡張
3. **シェーダー未設定時**: vert/fragが空の場合、uniformは0個。uniformsフォルダ自体が表示されない
4. **globalUniformsとの競合**: `Resources.setGlobalUniforms()` でマテリアルのuniformsにマージされる。MaterialResource経由の設定が後から適用されるため上書きする形になる。これは意図した動作（マテリアル固有の設定が優先）
5. **`removeField` の副作用**: UIが古いフィールドを参照し続ける可能性。`_rebuildUniformFields` 後に `fields/update` イベントを発火してUIを更新する
6. **float/intの適用**: `setUniforms()` は `number` 型の value を `arrayValue.push(v)` で処理するので、`mat.uniforms[name] = { value: 2.5, type: "1f" }` で動作する
7. **vec型の適用**: `setUniforms()` は配列の場合各要素を処理する。ただし `value` が `number[]` の場合は直接 `push` されないので、`Vector` インスタンスか配列要素の個別pushが必要。既存の `setUniforms` の処理を確認し、必要なら `number[]` をそのまま渡せるようにする

## テスト方針

- `npm run typecheck` で型エラーがないことを確認
- `npm run lint` でリントエラーがないことを確認
- `npm run dev` で以下を手動確認:
  - AssetViewerでマテリアルを選択 → Propertyパネルに `uniforms/` フォルダが表示される
  - **sampler2D**: ドロップダウンでテクスチャリソースを選択 → 3Dビューに反映
  - **float**: 数値入力で値変更 → 3Dビューに反映
  - **vec3**: x,y,z 各要素を個別に入力 → 3Dビューに反映
  - **int**: 整数入力で値変更 → 3Dビューに反映
  - シェーダーを外部エディタで変更（HMR） → uniformsフィールドが動的に更新される
  - uniformを追加したシェーダーを保存 → 新しいuniformフィールドが出現
  - uniformを削除したシェーダーを保存 → 対応するuniformフィールドが消える
  - プロジェクト保存後に `.mat` ファイルに `uniforms` フィールドが含まれる（デフォルト値のものは除外）
  - ページリロード後もuniform設定が保持される
