# Plan: f_draw_t GPGPU パーティクルを DemoProject に追加

## 概要

f_draw_t の `Particles` コンポーネント（GPGPU + インスタンシング描画）を OREngine の Samples コンポーネントとして移植する。
MIDI/BPM/AudioTexture への依存を除去してスタンドアロンなサンプルとして整理し、orengine スキルで DemoProject のシーンにエンティティを配置する。

## 実装ステップ

### 1. compute シェーダーの作成 (`particles.glsl`)

- **対象ファイル**: `src/ts/Resources/Components/Samples/Particles/shaders/particles.glsl` (新規)
- **変更内容**: f_draw_t の `particles.glsl` から `uMidi` 参照を除去し定数に置き換える
- **コードスニペット**:
  ```glsl
  // uMidi.y → 0.0 (noise強度固定)
  vec3 noise = noiseCyc( ... ) * 0.03;

  // uMidi.x → 0.5 (lifetime初期値固定)
  position = vec4( 0.0, 0.0, 0.0, random( position.xy ) * 0.5 );
  ```
- **注意点**: `uniform vec4 uMidi;` 宣言を削除する

---

### 2. vertex シェーダーの作成 (`particles.vs`)

- **対象ファイル**: `src/ts/Resources/Components/Samples/Particles/shaders/particles.vs` (新規)
- **変更内容**: f_draw_t の `particles.vs` から Audio/MIDI 依存を除去
- **削除する行**:
  ```glsl
  // 削除
  uniform sampler2D uAudioWaveTex;
  uniform sampler2D uAudioFreqTex;
  uniform vec4 uMidi;
  ```
- **uMidi 参照を定数に置き換え**:
  ```glsl
  // 変更前
  outPos.z *= 1.0 + 30.0 * length( vGPUVel.xyz ) * uMidi.w;
  outPos *= 0.01 + mix(id.y, id.y * 0.6, uMidi.w );

  // 変更後 (uMidi.w → 0.0)
  outPos.z *= 1.0 + 30.0 * length( vGPUVel.xyz ) * 0.0;
  outPos *= 0.01 + mix(id.y, id.y * 0.6, 0.0 );
  ```

---

### 3. fragment シェーダーの作成 (`particles.fs`)

- **対象ファイル**: `src/ts/Resources/Components/Samples/Particles/shaders/particles.fs` (新規)
- **変更内容**: `uBeatTime` を `uTimeE` で代用し、`uMidi`/`uAspectRatio` 参照を除去
- **コードスニペット**:
  ```glsl
  // 変更前
  uniform float uBeatTime;
  // ...
  float beat = uBeatTime * 1.0 + vUid * 0.009;

  // 変更後
  // uBeatTime の宣言を削除し、uTimeEを使う
  float beat = uTimeE * 1.0 + vUid * 0.009;
  ```
- **注意点**: `uType` は uniform のまま残す（後述の index.ts で exposed field として公開）

---

### 4. メインコンポーネントの作成 (`index.ts`)

- **対象ファイル**: `src/ts/Resources/Components/Samples/Particles/index.ts` (新規)
- **変更内容**: f_draw_t の `Particles` を OREngine パターンに移植
- **コードスニペット**:
  ```typescript
  import * as GLP from 'glpower';
  import * as MXP from 'maxpower';

  import particlesFrag from './shaders/particles.fs';
  import particlesCompute from './shaders/particles.glsl';
  import particlesVert from './shaders/particles.vs';

  import { gl } from '~/ts/Globals';
  import { globalUniforms } from '~/ts/Globals';

  export class GPUParticles extends MXP.Component {

    private _gpu: MXP.GPUCompute;

    constructor( params: MXP.ComponentParams ) {
      super( params );

      const size = new GLP.Vector( 64, 64 );

      const commonUniforms = MXP.UniformsUtils.merge( globalUniforms.time );

      this._gpu = new MXP.GPUCompute( {
        passes: [
          new MXP.GPUComputePass( gl, {
            name: "particles",
            size,
            dataLayerCount: 2,
            frag: particlesCompute,
            uniforms: commonUniforms,
          } )
        ]
      } );

      this._gpu.passes[ 0 ].initTexture( ( _l, _x, _y ) => {
        return [ 0, 0, 0, Math.random() ];
      } );

      const geometry = new MXP.SphereGeometry( {
        widthSegments: 32,
        heightSegments: 16,
        radius: 0.2
      } );

      const computeUVArray = [];
      const idArray = [];
      for ( let i = 0; i < size.x; i++ ) {
        for ( let j = 0; j < size.y; j++ ) {
          computeUVArray.push( i / size.x, j / size.y );
          idArray.push( Math.random(), Math.random(), Math.random(), Math.random() );
        }
      }

      geometry.setAttribute( "id", new Float32Array( idArray ), 4, { instanceDivisor: 1 } );
      geometry.setAttribute( "cuv", new Float32Array( computeUVArray ), 2, { instanceDivisor: 1 } );

      const mesh = this.entity.addComponent( MXP.Mesh, {
        geometry,
        material: new MXP.Material( {
          phase: [ "deferred", "shadowMap" ],
          frag: MXP.hotGet( 'gpuParticlesFrag', particlesFrag ),
          vert: MXP.hotGet( 'gpuParticlesVert', particlesVert ),
          uniforms: MXP.UniformsUtils.merge(
            commonUniforms,
            this._gpu.passes[ 0 ].outputUniforms,
          ),
        } )
      } );

      // HMR
      if ( import.meta.hot ) {
        import.meta.hot.accept( './shaders/particles.glsl', ( module ) => {
          if ( module ) {
            this._gpu.passes[ 0 ].frag = MXP.hotUpdate( 'gpuParticlesCompute', module.default );
            this._gpu.passes[ 0 ].requestUpdate();
          }
        } );
        import.meta.hot.accept( './shaders/particles.fs', ( module ) => {
          if ( module ) {
            mesh.material.frag = MXP.hotUpdate( 'gpuParticlesFrag', module.default );
            mesh.material.requestUpdate();
          }
        } );
        import.meta.hot.accept( './shaders/particles.vs', ( module ) => {
          if ( module ) {
            mesh.material.vert = MXP.hotUpdate( 'gpuParticlesVert', module.default );
            mesh.material.requestUpdate();
          }
        } );
      }
    }

    protected updateImpl( event: MXP.ComponentUpdateEvent ): void {
      if ( !this.entity.isVisibleTraverse() ) return;
      this._gpu.compute( event.renderer );
    }

    public dispose(): void {
      super.dispose();
      this.entity.removeComponent( MXP.Mesh );
      this._gpu.dispose();
    }

  }
  ```
- **注意点**: コードスタイルに合わせてインデントはタブ、括弧内スペースあり

---

### 5. orengine スキルでシーンに配置

- **対象**: DemoProject の `scene.json`
- **操作内容**: orengine スキルを使って新しいエンティティに `GPUParticles` コンポーネントを追加する
- **配置イメージ**:
  - エンティティ名: `"GPUParticles"`
  - コンポーネント: `GPUParticles`
  - 位置: 原点 (0, 0, 0)

---

## 変更対象ファイル一覧

- [x] `src/ts/Resources/Components/Samples/Particles/shaders/particles.glsl` - 新規作成（compute）
- [x] `src/ts/Resources/Components/Samples/Particles/shaders/particles.vs` - 新規作成（vertex）
- [x] `src/ts/Resources/Components/Samples/Particles/shaders/particles.fs` - 新規作成（fragment）
- [x] `src/ts/Resources/Components/Samples/Particles/index.ts` - 新規作成（コンポーネント本体）
- [x] `projects/DemoProject/scene.json` - エンティティ配置（orengine スキル経由）

> `src/ts/Resources/_data/componentList.ts` は ResourceManager Vite プラグインが自動生成するため手動編集不要。`index.ts` を配置すれば自動で登録される。

## 考慮事項・リスク

- **`uType` uniform**: fragment シェーダーに `uniform float uType;` が残るが、初期値 `0.0` として動作する（コンポーネントの field として公開は今回スコープ外）
- **インスタンシング属性の location**: `cuv` は `layout(location = 3)`、`id` は `layout(location = 4)` で固定されているが、geometry の attribute 追加順序に依存するため、`SphereGeometry` のデフォルト attribute 数（position=0, normal=1, uv=2）の後に続く想定
- **GPUComputePass の gl コンテキスト**: `~/ts/Globals` の `gl` を渡すので問題なし
- **`MXP.hotGet` / `MXP.hotUpdate`**: 既存サンプルと同様のパターンで利用

## テスト方針

- `npm run typecheck` で型エラーがないことを確認
- `npm run dev` でエディタ起動 → DemoProject ロード → パーティクルが画面に描画されることを確認
