# Plan: OREngineのエンジン/プロジェクト分離

## 概要
リソースを **ビルトイン**（エンジン側）と **プロジェクト固有** に分離する。ビルトインリソースは `packages/orengine/` に残してどのプロジェクトでも使えるようにし、プロジェクト固有のリソースは `projects/{name}/Resources/` に配置する。`src/` にはアプリケーションシェル（EditorPage, Player, Globals）だけを残す。

### 変更後のディレクトリ構造
```
OREngine/
├── packages/
│   ├── glpower/
│   ├── maxpower/
│   └── orengine/
│       ├── ts/
│       │   ├── Engine/
│       │   ├── Editor/
│       │   └── ...
│       ├── tsx/
│       └── BuiltinResources/        # ★ 新規: エンジン組み込みリソース
│           ├── Components/
│           │   ├── _PostProcess/     # Bloom, Blur, ColorGrading, Finalize, FXAA, Glitch, OverlayMixer, PixelSort
│           │   ├── Camera/           # CameraController, CameraOrbitAnim, CameraShake, LookAt, OrbitControls
│           │   ├── Utility/          # BLidgeClient, UniformsControls
│           │   └── Object/           # ObjectRotate
│           └── Geometries/
│               ├── Cube/
│               ├── Cylinder/
│               ├── Plane/
│               └── Sphere/
├── plugins/
├── server/
├── src/                              # アプリシェルのみ（Resources は消える）
│   ├── ts/
│   │   ├── Globals/
│   │   └── Player/
│   └── tsx/
│       └── pages/
├── projects/
│   └── DemoProject/                  # プロジェクト固有リソース
│       ├── Resources/
│       │   ├── Components/
│       │   │   ├── DemoProject/      # DemoMusic等
│       │   │   └── Samples/          # Audio, CameraControls, Effects, Geometry, Materials, MIDI, Particles, SPZModel, Text
│       │   ├── Shaders/              # BikabikaShader, ChromaPillar, Maguro等
│       │   ├── Materials/            # ChromaPillarMat, Default, Maguro等
│       │   ├── Textures/             # hash, noise, noiseCyclic等
│       │   ├── Fonts/
│       │   ├── _data/                # 自動生成
│       │   └── index.ts              # initResouces() — ビルトイン + プロジェクト固有を統合
│       ├── index.ts
│       ├── globals.ts
│       ├── scene.json
│       └── editor.json
└── templates/                        # 新規プロジェクト雛形
```

### リソースの分類

| 分類 | 配置先 | 内容 |
|------|--------|------|
| **ビルトイン Components** | `packages/orengine/BuiltinResources/Components/` | `_PostProcess/*`, `Camera/*`, `Utility/*`, `Object/*` |
| **ビルトイン Geometries** | `packages/orengine/BuiltinResources/Geometries/` | `Cube`, `Cylinder`, `Plane`, `Sphere` |
| **プロジェクト Components** | `projects/*/Resources/Components/` | `DemoProject/*`, `Samples/*` |
| **プロジェクト Shaders** | `projects/*/Resources/Shaders/` | 全シェーダー（プロジェクト固有） |
| **プロジェクト Materials** | `projects/*/Resources/Materials/` | 全マテリアル（プロジェクト固有） |
| **プロジェクト Textures** | `projects/*/Resources/Textures/` | 全テクスチャ（プロジェクト固有） |

> ビルトインの Light, Camera, Mesh は既に `maxpower` パッケージ内にクラスがあり、`initResouces()` 内の `builtin` グループで直接登録されている。これはそのまま維持。

## 設計方針

- ビルトインリソースは `packages/orengine/BuiltinResources/` に配置し、`orengine` パッケージのエクスポートとして提供
- `initResouces()` はプロジェクト側に置き、ビルトインリソース（orengineからimport）+ プロジェクト固有リソース（自動生成リスト）を統合して `Engine.resources` に登録
- ResourceManager Viteプラグインは**プロジェクト側のリソースのみスキャン**（ビルトインは静的にimportするのでスキャン不要）
- ビルトインリソースのスキャン・リスト自動生成も ResourceManager で行うが、出力先は `packages/orengine/BuiltinResources/_data/`
- サーバーの各ルートは プロジェクト単位で動的にリソースパスを解決する

---

## 実装ステップ

### Phase 1: ビルトインリソースを orengine パッケージに移動

#### 1-1. BuiltinResources ディレクトリを作成
- **操作**: `packages/orengine/BuiltinResources/` を新規作成
- **移動するもの**:
  - `src/ts/Resources/Components/_PostProcess/` → `packages/orengine/BuiltinResources/Components/_PostProcess/`
  - `src/ts/Resources/Components/Camera/` → `packages/orengine/BuiltinResources/Components/Camera/`
  - `src/ts/Resources/Components/Utility/` → `packages/orengine/BuiltinResources/Components/Utility/`
  - `src/ts/Resources/Components/Object/` → `packages/orengine/BuiltinResources/Components/Object/`
  - `src/ts/Resources/Geometries/` → `packages/orengine/BuiltinResources/Geometries/`

#### 1-2. ビルトインリソースの自動生成リストを作成
- **操作**: `packages/orengine/BuiltinResources/_data/` に自動生成ファイルを配置
- **方針**: vite.config.ts で ResourceManager を追加して `BuiltinResources/Components/` と `BuiltinResources/Geometries/` をスキャン
- **出力ファイル**:
  - `packages/orengine/BuiltinResources/_data/builtinComponentList.ts`
  - `packages/orengine/BuiltinResources/_data/builtinGeometryList.ts`

#### 1-3. ビルトインリソースを orengine パッケージからエクスポート
- **対象ファイル**: `packages/orengine/index.tsx`
- **変更内容**: ビルトインリソースリストのエクスポートを追加
- **コードスニペット**:
  ```typescript
  // packages/orengine/index.tsx に追加
  export { BUILTIN_COMPONENTLIST } from './BuiltinResources/_data/builtinComponentList';
  export { BUILTIN_GEOMETRYLIST } from './BuiltinResources/_data/builtinGeometryList';
  ```

---

### Phase 2: プロジェクト固有リソースをプロジェクトに移動

#### 2-1. DemoProject に Resources ディレクトリを作成
- **操作**: `projects/DemoProject/Resources/` を新規作成し、プロジェクト固有リソースを移動
- **移動するもの**:
  - `src/ts/Resources/Components/DemoProject/` → `projects/DemoProject/Resources/Components/DemoProject/`
  - `src/ts/Resources/Components/Samples/` → `projects/DemoProject/Resources/Components/Samples/`
  - `src/ts/Resources/Components/Effects/` → `projects/DemoProject/Resources/Components/Effects/`
  - `src/ts/Resources/Shaders/` → `projects/DemoProject/Resources/Shaders/`
  - `src/ts/Resources/Materials/` → `projects/DemoProject/Resources/Materials/`
  - `src/ts/Resources/Textures/` → `projects/DemoProject/Resources/Textures/`
  - `src/ts/Resources/Fonts/` → `projects/DemoProject/Resources/Fonts/`（もしあれば）
- **注意点**: `_data/` はディレクトリだけ作成。中身は自動生成される。

#### 2-2. プロジェクトの initResouces() を作成
- **対象ファイル**: `projects/DemoProject/Resources/index.ts`（新規作成）
- **変更内容**: ビルトイン + プロジェクト固有リソースを統合して登録
- **コードスニペット**:
  ```typescript
  import * as MXP from 'maxpower';
  import { ComponentGroup, GeometryGroup, Engine, BUILTIN_COMPONENTLIST, BUILTIN_GEOMETRYLIST } from 'orengine';

  // プロジェクト固有（自動生成）
  import { COMPONENTLIST } from './_data/componentList';
  import { GEOMETRYLIST } from './_data/geometryList';
  import { MATERIALLIST } from './_data/materialList';
  import { SHADERLIST } from './_data/shaderList';
  import { TEXTURELIST } from './_data/textureList';

  export const initResouces = () => {
      Engine.resources.clear();

      // ビルトイン
      const builtin = Engine.resources.addComponentGroup( "_Built-in" );
      builtin.addComponent( "Light", MXP.Light );
      builtin.addComponent( "Camera", MXP.Camera );
      builtin.addComponent( "Mesh", MXP.Mesh );

      // ビルトインコンポーネント（orengine パッケージから）
      registerComponents( BUILTIN_COMPONENTLIST );

      // ビルトインジオメトリ（orengine パッケージから）
      registerGeometries( BUILTIN_GEOMETRYLIST );

      // プロジェクト固有コンポーネント
      registerComponents( COMPONENTLIST );

      // プロジェクト固有ジオメトリ
      registerGeometries( GEOMETRYLIST );

      // シェーダー
      for ( const s of SHADERLIST ) {
          Engine.resources.addShader( s.name, s.source );
      }

      // HMR
      if ( import.meta.hot ) {
          import.meta.hot.accept( './_data/shaderList', ( newModule ) => {
              if ( !newModule ) return;
              for ( const s of newModule.SHADERLIST ) {
                  const shader = Engine.resources.getShader( s.name );
                  if ( shader ) shader.updateSource( s.source );
              }
          } );
      }

      // テクスチャ
      for ( const t of TEXTURELIST ) {
          Engine.resources.addTextureResource( t.name, { ... } );
      }

      // マテリアル
      for ( const name of Object.keys( MATERIALLIST ) ) {
          Engine.resources.addMaterial( name, MATERIALLIST[name] );
      }

      MXP.Mesh.getGeometryList = () => Engine.resources.geometryList;
      MXP.Mesh.getMaterialList = () => Engine.resources.materialList;
      MXP.Mesh.getMaterialInstance = ( name ) => Engine.resources.getMaterialInstance( name );
  };

  export const initResourceInstances = ( glCtx: WebGL2RenderingContext, globalUniforms?: any ) => {
      const engine = Engine.getInstance( glCtx );
      Engine.resources.buildTextureInstances( engine.renderer, glCtx, engine.uniforms );
      if ( globalUniforms?.music ) {
          Engine.resources.setGlobalUniforms( globalUniforms.music, {
              uNoiseTex: { value: Engine.resources.getTexture( "noise" ), type: "1i" }
          } );
      }
  };
  ```
- **注意点**: `registerComponents` と `registerGeometries` はヘルパー関数として抽出する（現在の `_()` や `registerGeometries()` ロジックと同じ）

#### 2-3. プロジェクトエントリを更新
- **対象ファイル**: `projects/DemoProject/index.ts`
- **コードスニペット**:
  ```typescript
  export { initResouces, initResourceInstances } from './Resources';
  ```

#### 2-4. 他のプロジェクト（Sushi, DigitalNexus, Project0）
- 現状すべて同じ `src/ts/Resources` を使っている
- まず DemoProject の Resources をコピーして配置（暫定）
- 各プロジェクトの `index.ts` を自分の `./Resources` を参照するように更新

#### 2-5. src/ts/Resources/ を削除
- Phase 3, 4 の参照更新完了後に削除

---

### Phase 3: ビルド設定の更新

#### 3-1. vite.config.ts — ResourceManagerスキャン設定
- **対象ファイル**: `vite.config.ts`
- **変更内容**: ビルトイン用 + プロジェクト固有用の2系統にResourceManagerを分ける
- **コードスニペット**:
  ```typescript
  const activeProject = process.env.ORENGINE_PROJECT || 'DemoProject';
  const projectResourcesDir = `./projects/${activeProject}/Resources`;
  const builtinResourcesDir = `./packages/orengine/BuiltinResources`;

  plugins: [
      react(),
      ProjectResolver(),
      ShaderMinifierLoader(),

      // ビルトインリソース
      ResourceManager( {
          componentsDir: `${builtinResourcesDir}/Components/`,
          outputFile: `${builtinResourcesDir}/_data/builtinComponentList.ts`,
          exportName: 'BUILTIN_COMPONENTLIST',
      } ),
      ResourceManager( {
          componentsDir: `${builtinResourcesDir}/Geometries/`,
          outputFile: `${builtinResourcesDir}/_data/builtinGeometryList.ts`,
          exportName: 'BUILTIN_GEOMETRYLIST',
      } ),

      // プロジェクト固有リソース
      ResourceManager( {
          componentsDir: `${projectResourcesDir}/Components/`,
          outputFile: `${projectResourcesDir}/_data/componentList.ts`,
          exportName: 'COMPONENTLIST',
      } ),
      ResourceManager( {
          componentsDir: `${projectResourcesDir}/Geometries/`,
          outputFile: `${projectResourcesDir}/_data/geometryList.ts`,
          exportName: 'GEOMETRYLIST',
      } ),
      ResourceManager( {
          componentsDir: `${projectResourcesDir}/Materials/`,
          outputFile: `${projectResourcesDir}/_data/materialList.ts`,
          exportName: 'MATERIALLIST',
          type: 'material',
          shadersDir: `${projectResourcesDir}/Shaders/`,
      } ),
      ResourceManager( {
          componentsDir: `${projectResourcesDir}/Textures/`,
          outputFile: `${projectResourcesDir}/_data/textureList.ts`,
          exportName: 'TEXTURELIST',
          type: 'texture',
          shadersDir: `${projectResourcesDir}/Shaders/`,
      } ),
      ResourceManager( {
          componentsDir: `${projectResourcesDir}/Shaders/`,
          outputFile: `${projectResourcesDir}/_data/shaderList.ts`,
          exportName: 'SHADERLIST',
          type: 'shader',
      } ),
  ],
  ```

#### 3-2. vite-player.config.ts — 同様に更新
- Player ビルドでもビルトイン + プロジェクト固有を解決
- `~project` エイリアスは既にプロジェクト単位で解決されるので大きな変更不要

#### 3-3. tsconfig.json — パスエイリアス確認
- `~project/*` → `./projects/DemoProject/*` は変更なし
- ビルトインリソースは `orengine` パッケージ経由でimportするので追加エイリアス不要

---

### Phase 4: サーバーのプロジェクト対応

#### 4-1. ProjectManager にリソースパス解決を追加
- **対象ファイル**: `server/Project/index.ts`
- **コードスニペット**:
  ```typescript
  getResourcesDir( name: string ): string | null {
      const projectDir = this._resolveProjectDir( name );
      if ( !projectDir ) return null;
      return path.join( projectDir, 'Resources' );
  }
  ```

#### 4-2. components ルートのプロジェクト対応
- **対象ファイル**: `server/routes/components.ts`
- **変更内容**: ハードコードの `COMPONENTS_DIR` を廃止。APIパスを `/projects/:project/components` に変更。
- **コードスニペット**:
  ```typescript
  componentsRouter.get( '/projects/:project/components', ( req, res ) => {
      const resourcesDir = projectManager.getResourcesDir( req.params.project );
      if ( !resourcesDir ) { res.status(404).json({ error: 'Project not found' }); return; }
      const componentsDir = path.join( resourcesDir, 'Components' );
      const tree = scanComponentTree( componentsDir );
      res.json( tree );
  } );
  ```

#### 4-3. shaders, materials, textures ルートも同様にプロジェクト対応
- 各ルートで `SHADERS_DIR`, `MATERIALS_DIR`, `TEXTURES_DIR` のハードコードを廃止
- APIパスに `:project` パラメータを追加

#### 4-4. プロジェクト作成時にテンプレートをコピー
- **対象ファイル**: `server/routes/projects.ts`
- **変更内容**: 新規プロジェクト作成時に `templates/default/` からResources基本構造をコピー
- テンプレートにはビルトインを参照する `Resources/index.ts` と最小限のディレクトリ構造を含める

---

### Phase 5: フロントエンドの更新

#### 5-1. EditorPage のリソース初期化パス変更
- **対象ファイル**: `src/tsx/components/pages/EditorPage/index.tsx`
- **コードスニペット**:
  ```typescript
  // Before:
  import { initResouces, initResourceInstances } from "~/ts/Resources";
  // After:
  import { initResouces, initResourceInstances } from "~project/Resources";
  ```

#### 5-2. EditorPage の initResourceInstances 呼び出し更新
- **変更内容**: `globalUniforms` を引数として渡す
- **コードスニペット**:
  ```typescript
  // Before:
  <OREngine gl={gl} project={projectData} onEngineInit={initResourceInstances}>
  // After:
  <OREngine gl={gl} project={projectData} onEngineInit={(glCtx) => initResourceInstances(glCtx, globalUniforms)}>
  ```

#### 5-3. Player の import パス変更
- **対象ファイル**: `src/ts/Player/index.ts`
- **変更内容**:
  ```typescript
  // Before:
  import { BLidgeClient } from '~/ts/Resources/Components/Utility/BLidgeClient';
  // After:（BLidgeClient はビルトインなので orengine パッケージから）
  import { BLidgeClient } from 'orengine/BuiltinResources/Components/Utility/BLidgeClient';
  ```

#### 5-4. orengine パッケージ内のAPI呼び出し箇所を更新
- **対象**: `packages/orengine/tsx/components/Panels/` 配下のコンポーネント
- **変更内容**: API呼び出しパスにプロジェクト名を含める
  ```typescript
  // Before:
  fetch( '/api/components' )
  // After:
  fetch( `/api/projects/${projectName}/components` )
  ```
- **projectName の取得**: 既存の OREditor context に `projectName` prop が渡されているのでそれを利用

---

### Phase 6: テンプレート作成

#### 6-1. 新規プロジェクトテンプレート
- **対象ディレクトリ**: `templates/default/`
- **内容**:
  ```
  templates/default/
  ├── Resources/
  │   ├── Components/          # 空（プロジェクト固有コンポーネント用）
  │   ├── Shaders/             # 空
  │   ├── Materials/
  │   │   └── Default.mat      # デフォルトマテリアル
  │   ├── Textures/            # 空
  │   ├── Geometries/          # 空（ビルトインの Cube/Sphere 等は orengine から提供）
  │   ├── _data/               # 空（自動生成される）
  │   └── index.ts             # initResouces() テンプレート（ビルトイン登録 + 空のプロジェクトリスト）
  ├── index.ts                 # export from './Resources'
  ├── globals.ts
  ├── scene.json               # 最小構成のシーン
  └── editor.json              # デフォルトエディタ設定
  ```

---

## 変更対象ファイル一覧

### Phase 1: ビルトインリソースの移動
- [x] `packages/orengine/BuiltinResources/Components/_PostProcess/` — `src/ts/Resources/Components/_PostProcess/` から移動
- [x] `packages/orengine/BuiltinResources/Components/Camera/` — 移動
- [x] `packages/orengine/BuiltinResources/Components/Utility/` — 移動
- [x] `packages/orengine/BuiltinResources/Components/Object/` — 移動
- [x] `packages/orengine/BuiltinResources/Geometries/` — `src/ts/Resources/Geometries/` から移動
- [x] `packages/orengine/BuiltinResources/_data/` — 空ディレクトリ作成（自動生成先）
- [x] `packages/orengine/index.tsx` — ビルトインリソースリストのエクスポート追加

### Phase 2: プロジェクト固有リソースの移動
- [x] `projects/DemoProject/Resources/Components/` — DemoProject/, Samples/, Effects/ を移動
- [x] `projects/DemoProject/Resources/Shaders/` — 全シェーダー移動
- [x] `projects/DemoProject/Resources/Materials/` — 全マテリアル移動
- [x] `projects/DemoProject/Resources/Textures/` — 全テクスチャ移動
- [x] `projects/DemoProject/Resources/Fonts/` — フォント移動
- [x] `projects/DemoProject/Resources/_data/` — 空ディレクトリ作成
- [x] `projects/DemoProject/Resources/index.ts` — initResouces() 新規作成（ビルトイン+プロジェクト統合）
- [x] `projects/DemoProject/index.ts` — 自分の `./Resources` からエクスポート
- [x] `projects/Sushi/` — Resources ディレクトリ作成 + index.ts 更新
- [x] `projects/DigitalNexus/` — 同上
- [x] `projects/Project0/` — 同上
- [x] `src/ts/Resources/` — 削除

### Phase 3: ビルド設定
- [x] `vite.config.ts` — ビルトイン用 + プロジェクト用のResourceManager設定
- [x] `vite-player.config.ts` — 同様
- [x] `tsconfig.json` — パスエイリアス確認 + 非アクティブプロジェクト除外

### Phase 4: サーバー
- [x] `server/Project/index.ts` — `getResourcesDir()` 追加
- [x] `server/routes/components.ts` — プロジェクトスコープ化
- [x] `server/routes/shaders.ts` — 同上
- [x] `server/routes/materials.ts` — 同上
- [x] `server/routes/textures.ts` — 同上
- [x] `server/routes/editor.ts` — persistResourceChange, getAvailableComponentsFromFiles プロジェクトスコープ化
- [x] `server/routes/projects.ts` — テンプレートコピー処理追加

### Phase 5: フロントエンド
- [x] `src/tsx/components/pages/EditorPage/index.tsx` — import パス変更 + globalUniforms 引数化
- [x] `src/ts/Player/index.ts` — BLidgeClient の import パス変更
- [x] `packages/orengine/tsx/` 内のAPI呼び出し箇所 — プロジェクトスコープURL化（8ファイル更新）

### Phase 6: テンプレート
- [x] `templates/default/` — 新規プロジェクトテンプレート作成

## 考慮事項・リスク

### 1. ビルトインリソースの ResourceManager スキャン
ビルトインリソースも ResourceManager で自動生成リストを作る。vite.config.ts に 2 つの追加 ResourceManager インスタンスが必要（builtinComponentList, builtinGeometryList）。既存プラグインがそのまま使えるか確認。
- **対策**: ResourceManager は既にディレクトリパスをオプションで受け取るので問題ないはず

### 2. ビルトインコンポーネントの import パスの変化
ビルトインコンポーネント内部で `maxpower` や `glpower` をimportしている。`packages/orengine/BuiltinResources/` に移動しても同じパスエイリアスが使えることを確認。
- **対策**: tsconfig.json の `include` に `packages/orengine/` が含まれているので問題ない

### 3. フロントエンドのAPI呼び出し箇所の洗い出し
`packages/orengine/tsx/` 内で `/api/components`, `/api/shaders`, `/api/materials`, `/api/textures` を呼んでいる箇所をすべて更新する必要がある。
- **対策**: Grep で全API呼び出し箇所を洗い出してから変更

### 4. HMR の維持
シェーダーHMR (`import.meta.hot.accept`) のパスがプロジェクト側に変わる。`_data/shaderList` への相対パスが正しいことを確認。
- **対策**: `projects/DemoProject/Resources/index.ts` 内の HMR コードで `./_data/shaderList` と相対指定すれば問題ない

### 5. 複数プロジェクトの ResourceManager 切替
開発時は `ORENGINE_PROJECT` 環境変数で1プロジェクトに固定。プロジェクト切替時は Vite 再起動が必要。
- **対策**: 現状と同じ制約。将来的にプロジェクト切替UIを改善（将来課題）

### 6. globalUniforms の依存解消
`initResourceInstances` が `~/ts/Globals` の `globalUniforms` に依存。プロジェクト側に移動するとアプリケーション層への逆依存になる。
- **対策**: `initResourceInstances` の引数で `globalUniforms` を渡す設計に変更

## テスト方針
- `npm run dev` でエディタが正常に起動すること
- エディタでコンポーネント一覧にビルトイン + プロジェクト固有の両方が表示されること
- エディタからコンポーネント/シェーダー/マテリアルの新規作成ができ、プロジェクトの Resources/ 配下に生成されること
- シーンの保存・読み込みが正常に動作すること
- シェーダーのHMRが動作すること
- `npm run build` でプレイヤービルドが成功すること
- `npm run typecheck` でエラーがないこと

## 実装順序

1. **Phase 1** → ビルトインリソースを `packages/orengine/BuiltinResources/` に移動
2. **Phase 2** → プロジェクト固有リソースを `projects/DemoProject/Resources/` に移動 + initResouces() 作成
3. **Phase 3** → ビルド設定更新（ここで `npm run dev` が通ることを確認）
4. **Phase 5** → フロントエンドの import / API パス更新
5. **Phase 4** → サーバーのプロジェクト対応
6. **Phase 6** → テンプレート作成（最後、動作確認後）
