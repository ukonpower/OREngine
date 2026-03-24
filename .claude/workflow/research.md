# Research: OREngineのエンジン/プロジェクト分離

## タスク概要
OREngineをエンジンとして独立させ、プロジェクトをエンジンリポジトリの外部から作成・管理できる構造にする。現状はエンジンリポジトリ内にプロジェクト固有コード（Components, Shaders, Materials等）が混在しており、分離が必要。

## 現状の問題点

### 1. エンジンコードとプロジェクトコードが同一リポジトリに混在
- `src/ts/Resources/Components/` にプロジェクト固有のコンポーネント（`DemoProject/`, `Samples/`, `Effects/`等）がある
- `src/ts/Resources/Shaders/`, `Materials/`, `Textures/`, `Geometries/` も同様
- `projects/` にシーンデータ（scene.json, editor.json）があるが、そのプロジェクトが使うコンポーネント定義は `src/ts/Resources/` にある

### 2. プロジェクト間でリソースが共有されてしまう
- ResourceManagerが `src/ts/Resources/Components/` 全体をスキャンして `componentList.ts` を自動生成
- 全プロジェクトのコンポーネントが1つのリストに入る
- プロジェクトAのコンポーネントがプロジェクトBのエディタにも表示される

### 3. プロジェクトの独立性がない
- `projects/DemoProject/index.ts` は単に `export { initResouces, initResourceInstances } from '~/ts/Resources'` を再エクスポートするだけ
- プロジェクト固有のリソース初期化ロジックがない
- すべてのプロジェクトが同じ `src/ts/Resources/` を共有

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `src/ts/Resources/index.ts` | `initResouces()`, `initResourceInstances()` | リソース登録の中心。自動生成リストからEngine.resourcesに登録 |
| `projects/*/index.ts` | `initResouces`, `initResourceInstances` | プロジェクトエントリ。現状は `~/ts/Resources` を再エクスポートするだけ |
| `packages/orengine/ts/Engine/index.ts` | `Engine` (extends MXP.Entity) | エンジンコア。`static resources: Resources` を持つ |
| `src/ts/Player/index.ts` | - | プレイヤーエントリ。`~project/index` から initResouces をimport |
| `src/tsx/components/pages/EditorPage/index.tsx` | `EditorPage` | エディタページ。`~/ts/Resources` から直接 initResouces を呼ぶ |
| `plugins/ResourceManager/index.ts` | `ResourceManager` | Viteプラグイン。ディレクトリスキャンで `_data/*.ts` を自動生成 |
| `plugins/ProjectResolver/index.ts` | `ProjectResolver` | `~project/` パスを `projects/{name}/` に解決 |
| `vite.config.ts` | - | 開発設定。ResourceManagerのスキャン対象は `src/ts/Resources/` |
| `vite-player.config.ts` | - | ビルド設定。プレイヤー(64KB Intro)向け |
| `server/Project/index.ts` | `ProjectManager` | `projects/` ディレクトリからプロジェクト管理 |
| `server/routes/*.ts` | 各ルーター | REST API（scene/editor/components/materials/shaders/textures） |
| `tsconfig.json` | - | パスエイリアス定義。`~project/*` → `projects/DemoProject/*` |
| `package.json` | - | npm scripts。workspacesは空配列 |
| `src/ts/Globals/index.ts` | `gl`, `globalUniforms` | グローバルWebGLコンテキスト |

## 依存関係

### エンジン内部の依存（変更不要）
```
glpower (submodule, Math+WebGL wrapper)
  ↑
maxpower (Entity-Component, Renderer, Serializable)
  ↑
orengine (Engine, Editor, React UI)
```

### アプリケーション層の依存（要リファクタリング）
```
src/ts/Resources/index.ts
  ├── imports: _data/componentList.ts (自動生成)
  ├── imports: _data/geometryList.ts (自動生成)
  ├── imports: _data/materialList.ts (自動生成)
  ├── imports: _data/shaderList.ts (自動生成)
  ├── imports: _data/textureList.ts (自動生成)
  ├── imports: ~/ts/Globals (globalUniforms)
  └── uses: Engine.resources (static)

src/ts/Resources/Components/
  ├── Camera/ → maxpower Component
  ├── DemoProject/ → プロジェクト固有（分離対象）
  ├── Samples/ → プロジェクト固有 or 組み込み
  ├── Effects/ → 組み込み？
  ├── Object/ → 組み込み？
  ├── Utility/ (BLidgeClient等) → 組み込み
  └── _PostProcess/ → 組み込み

projects/*/index.ts → src/ts/Resources (再エクスポート)
src/ts/Player/index.ts → ~project/index, ~project/scene.json
src/tsx/EditorPage → ~/ts/Resources
```

### エンジン → プロジェクト の密結合ポイント（解消すべき）
1. `vite.config.ts` のResourceManagerが `./src/ts/Resources/` をハードコード
2. `tsconfig.json` の `~project/*` が `./projects/DemoProject/*` をハードコード
3. `server/Project/index.ts` が `../../projects` をハードコード
4. `src/ts/Player/index.ts` が `~project/scene.json` をimport
5. `src/tsx/EditorPage` が `~/ts/Resources` を直接import

## 既存パターン

### リソース自動生成パターン（ResourceManager）
- **入力**: ディレクトリ内のファイルをスキャン
- **出力**: `_data/*.ts` に export 文を自動生成（`@ts-nocheck`付き）
- **トリガー**: Viteのdev/build起動時 + chokidarによるファイル監視
- **設定**: `componentsDir`, `outputFile`, `exportName`, `type` をオプションで受け取る → **外部パス指定が既に可能な設計**

### プロジェクト解決パターン（ProjectResolver）
- `~project/` → `projects/{ORENGINE_PROJECT}/` に解決
- 環境変数 `ORENGINE_PROJECT` でビルド対象を切替
- **拡張ポイント**: 外部絶対パスへの解決に変更可能

### サーバーのプロジェクト管理パターン
- `ProjectManager(projectsDir)` — コンストラクタでディレクトリを受け取る設計
- REST APIで scene/editor/components/materials/shaders/textures を管理
- **拡張ポイント**: `projectsDir` を環境変数から受け取るように変更可能

## 制約・注意点

### 1. 組み込みリソースとプロジェクトリソースの分離基準
`src/ts/Resources/Components/` の中身を分類する必要がある:
- **エンジン組み込み**: Camera, _PostProcess, Utility/BLidgeClient — エンジン側に残す
- **プロジェクト固有**: DemoProject/, Samples/ — プロジェクト側に移動
- **グレーゾーン**: Effects/, Object/ — 判断が必要

### 2. 64KB Intro ビルドパイプライン
`vite-player.config.ts` + `compeko.js` による極限圧縮がある。プロジェクト分離後も維持が必要:
- MangleManager（変数名難読化）
- ShaderMinifier（GLSL最小化）
- zopfli圧縮 → 自己展開SVG

### 3. HMR（Hot Module Replacement）
`src/ts/Resources/index.ts:119-137` でシェーダーHMRが実装されている。プロジェクト固有シェーダーのHMRも維持する必要がある。

### 4. glpower はgit submodule
`packages/glpower` はgitサブモジュール。npmパッケージ化する場合はサブモジュールから脱却する必要がある。

### 5. 自動生成ファイルの再配置
`_data/*.ts` の生成先がプロジェクト側に変わるため、ResourceManagerプラグインのパス指定を柔軟にする必要がある。

## 分離の方向性

### A案: モノレポ内でプロジェクトを独立ワークスペースに
```
orengine/                 # モノレポ
├── packages/
│   ├── glpower/          # npm workspace パッケージ
│   ├── maxpower/         # npm workspace パッケージ
│   ├── orengine/         # npm workspace パッケージ（Engine + Editor + UI）
│   ├── orengine-server/  # npm workspace パッケージ（開発サーバー）
│   └── orengine-plugins/ # npm workspace パッケージ（Viteプラグイン）
├── projects/
│   └── DemoProject/      # 独立したワークスペース（自分のpackage.json持ち）
│       ├── package.json  # @orengine/* への依存
│       ├── src/Resources/ # プロジェクト固有リソース
│       ├── scenes/
│       └── vite.config.ts
└── package.json          # workspaces 定義
```

### B案: 完全分離（エンジンをnpmパッケージとして配布）
```
# エンジンリポジトリ（npm公開）
orengine/
├── packages/{glpower,maxpower,orengine}/
├── server/
├── plugins/
└── templates/

# プロジェクトリポジトリ（ユーザーが作成）
my-project/
├── package.json          # "orengine": "^x.x.x"
├── src/Resources/
├── scenes/
└── vite.config.ts
```

### C案: ハイブリッド（モノレポ + テンプレート）
- エンジン部分はモノレポのworkspace
- `create-orengine-project` CLIで新規プロジェクトをscaffold
- プロジェクトはモノレポ内にも外にも作れる

## 参考になる既存実装

- **ResourceManager** (`plugins/ResourceManager/index.ts`): スキャンディレクトリはオプションで渡されており（`componentsDir`）、外部から指定可能な設計
- **ProjectResolver** (`plugins/ProjectResolver/index.ts`): `~project/` のパス解決は環境変数ベースで動的
- **ProjectManager** (`server/Project/index.ts`): コンストラクタで `projectsDir` を受け取る設計
- **Engine.resources** (static): `initResouces()` で初期化。プロジェクト側からの追加登録パターンを追加しやすい構造
- **`projects/*/index.ts`**: 既に `initResouces` を re-export する「プロジェクトエントリ」の概念が存在。これを拡張すれば自然に分離できる
