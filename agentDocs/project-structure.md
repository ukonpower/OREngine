# プロジェクト構造

## 概要

OREngine は 3 つの主要なパッケージで構成されています：

- glpower: WebGL の基本機能
- maxpower: 高レベルなコンポーネントシステム
- orengine: エディタとエンジンのメイン機能

## ディレクトリ構造

```
OREngine/
├── packages/                # メインパッケージ群
│   ├── glpower/           # WebGL基本機能
│   │   ├── src/          # ソースコード
│   │   └── examples/     # 使用例
│   │
│   ├── maxpower/         # コンポーネントシステム
│   │   ├── Component/    # 各種コンポーネント
│   │   ├── Entity/       # エンティティシステム
│   │   ├── Geometry/     # ジオメトリ定義
│   │   ├── Material/     # マテリアル定義
│   │   └── PostProcess/  # ポストプロセス効果
│   │
│   └── orengine/         # メインエンジン
│       ├── ts/          # TypeScriptソース
│       └── tsx/         # Reactコンポーネント
│
├── plugins/               # Viteプラグイン
│   ├── MangleManager/    # コード最適化用プラグイン
│   ├── ResourceManager/  # リソース管理用プラグイン
│   └── ShaderMinifier/   # シェーダー最適化用プラグイン
│
├── src/                  # デモ実装
│   ├── ts/              # TypeScriptソース
│   ├── tsx/             # UIコンポーネント
│   └── styles/          # スタイルシート
│
└── tests/               # テストコード
    ├── e2e/            # E2Eテスト
    └── integration/    # 統合テスト
```

## 主要なコンポーネント

### maxpower/Component/

- Camera/ - カメラ機能
- Light/ - ライティング
- Mesh/ - メッシュ描画
- Renderer/ - レンダリングシステム
- GPUCompute/ - GPU 演算
- PostProcessPipeline/ - ポストプロセス

### plugins/ (Vite プラグイン)

- MangleManager - ビルド時のコード最適化
- ResourceManager - アセットのロードと管理
- ShaderMinifierLoader - シェーダーコードの最適化

## 設定ファイル

- vite.config.ts - ビルド設定
- tsconfig.json - TypeScript 設定
- .env - 環境変数

## エントリーポイント

- src/index.html - メインエディタ
- src/player.html - シーンプレビュー
- packages/orengine/index.tsx - エンジンのメインエントリー

## リソース管理

- data/ - シーンデータ
- blend-files/ - Blender ファイル
- src/public/ - 静的アセット
