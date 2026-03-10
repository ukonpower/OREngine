# Research: f_draw_t の GPGPU パーティクルコンポーネントを DemoProject に追加

## タスク概要
`/Users/ukonpower/Documents/work-space/f_draw_t` で使っている GPGPU ベースのパーティクルコンポーネントを OREngine の DemoProject に `Samples` コンポーネントとして追加する。orengine スキルを使ってエンティティ配置まで行う。

## 参照元: f_draw_t の Particles コンポーネント

### ファイル構成
```
src/ts/Resources/Components/DrawTokyo/Entities/Particles/
├── index.ts
└── shaders/
    ├── particles.glsl  (GPGPU compute シェーダー)
    ├── particles.vs    (vertex shader - instanced)
    └── particles.fs    (fragment shader - deferred)
```

### 構造の要点
- `MXP.GPUCompute` + `MXP.GPUComputePass` でGPGPU計算
- `size = Vector(64, 64)` → 64×64=4096パーティクル
- `dataLayerCount: 2` → position(w=lifetime) / velocity を別テクスチャで管理
- `MXP.SphereGeometry` をインスタンシングで描画
- `geometry.setAttribute("id", ...)` と `geometry.setAttribute("cuv", ...)` でインスタンスごとにComputeUVを渡す
- マテリアルの phase: `["deferred", "shadowMap"]`

### f_draw_t 固有の依存 (OREngine では不要/変更が必要)

| 依存 | f_draw_t | OREngine 対応 |
|------|----------|--------------|
| `Engine.getInstance(gl).uniforms` | Engineのグローバルuniform | `globalUniforms.time` に置き換え |
| `MIDIMIX.getLine(0).valuesLerped` | MIDI入力 (uMidi) | 固定値 uniform に変更 |
| `BPM.uniforms` | BPMタイミング (uBeatTime) | `globalUniforms.time.uTimeE` を代用 |
| `AudioTexture.uniforms` (static) | 音声テクスチャ (uAudioWaveTex/uAudioFreqTex) | vertex shader から除去 |
| `process.env.NODE_ENV` | HMR判定 | `import.meta.hot` のみに変更 |

## 追加先: OREngine の構造

### 関連ファイル・シンボル
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `src/ts/Resources/_data/componentList.ts` | `COMPONENTLIST` | コンポーネント登録リスト |
| `src/ts/Resources/index.ts` | `initResouces` | コンポーネント登録処理 |
| `src/ts/Globals/index.ts` | `globalUniforms`, `gl` | グローバルuniform・WebGL context |
| `packages/maxpower/Component/GPUCompute/index.ts` | `GPUCompute` | GPGPU計算クラス |
| `packages/maxpower/Component/GPUComputePass/index.ts` | `GPUComputePass` | GPUパスクラス |

### globalUniforms で利用可能なもの
- `globalUniforms.time.uTimeE` - エンジン時間 (float)
- `globalUniforms.time.uTime` - コード時間 (float)

### GPUComputePass の自動追加 uniform
- `uDeltaTime` (1f) - 自動計算されるデルタタイム
- `uGPUSampler0`, `uGPUSampler1` - 出力テクスチャ
- `uGPUResolution` - テクスチャ解像度

## 追加するファイル

```
src/ts/Resources/Components/Samples/Particles/
├── index.ts          ← メインコンポーネント
└── shaders/
    ├── particles.glsl  ← GPGPU compute (uMidi依存を調整)
    ├── particles.vs    ← vertex (uAudioTex参照を除去)
    └── particles.fs    ← fragment (uBeatTime を uTimeE に変更)
```

## シェーダー変更点

### particles.glsl (compute)
- `uMidi.y` → 定数 `0.0` (noise強度)
- `uMidi.x` → 定数 `0.5` (lifetime offset)
- `uniform vec4 uMidi;` を削除

### particles.vs (vertex)
- `uniform sampler2D uAudioWaveTex;` / `uAudioFreqTex;` を削除
- `uniform vec4 uMidi;` を削除 (uMidi参照箇所は定数に)

### particles.fs (fragment)
- `uniform float uBeatTime;` を `uTimeE` で代用
- `uType` は `uType` のままでSerializableField経由で公開検討
- `uMidi` 参照を削除

## componentList.ts への登録

```typescript
// Samples グループに追加
Samples: {
  // ... 既存 ...
  Particles: {
    GPUParticles,
  }
}
```

## 制約・注意点
- コンポーネント名は `GPUParticles` (Particlesは他と衝突の可能性)
- `gl` は `~/ts/Globals` からimport
- HMR は `import.meta.hot` を使う
- `dispose()` で `this.entity.removeComponent(MXP.Mesh)` と `this._gpu.dispose()` を呼ぶ
- `computeUVArray` のサイズは `size.x * size.y` = 4096インスタンス
- インスタンシングのため geometry の `instanceDivisor: 1` が必要
- インスタンスとして `SphereGeometry` を使うため、attributeは `instanceDivisor: 1` で設定

## 参考になる既存実装
- `src/ts/Resources/Components/Samples/Materials/Raymarch/index.ts` - Samplesコンポーネントの基本パターン
- `src/ts/Resources/Components/Samples/Audio/AudioTexture/index.ts` - AudioTexture の構造
- f_draw_t の `Particles/index.ts` - 移植元
