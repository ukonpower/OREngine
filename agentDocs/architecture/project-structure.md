# プロジェクト構造

## ディレクトリ構成

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

## パッケージの詳細

### glpower パッケージ

WebGL の基本機能を提供する低レベルライブラリです：

- **src/**: コアソースコード
  - WebGL コンテキスト管理
  - シェーダープログラム
  - バッファ操作
  - テクスチャ処理
- **examples/**: 使用例と動作確認用サンプル

### maxpower パッケージ

高レベルな機能を提供するコンポーネントシステムです：

#### Component/

- Camera/ - カメラ機能
- Light/ - ライティング
- Mesh/ - メッシュ描画
- Renderer/ - レンダリングシステム
- GPUCompute/ - GPU 演算
- PostProcessPipeline/ - ポストプロセス

#### Entity/

- エンティティ管理システム
- シーングラフ
- コンポーネント管理

#### Geometry/

- 基本的な形状（Cube, Sphere など）
- カスタムジオメトリ
- ジオメトリユーティリティ

#### Material/

- PBR マテリアル
- カスタムシェーダー
- マテリアルライブラリ

### orengine パッケージ

エンジンのメイン機能とエディタを提供します：

- **ts/**: TypeScript 実装
  - Editor/ - エディタ機能
  - Engine/ - エンジンコア
- **tsx/**: React コンポーネント
  - UI 要素
  - エディタパネル
  - プロパティインスペクタ

## プラグインシステム

### Vite プラグイン

- **MangleManager**: ビルド時のコード最適化
  - 名前の短縮化
  - 未使用コードの削除
- **ResourceManager**: アセット管理
  - リソースのロードと管理
  - キャッシュ制御
  - 依存関係の解決
- **ShaderMinifier**: シェーダーコードの最適化
  - GLSL の圧縮
  - インクルード処理
  - プリプロセッサ制御

## デモとテスト

### src/ (デモ実装)

エンジンの使用例とデモを提供：

- TypeScript による実装例
- UI コンポーネントの使用例
- スタイリングの例

### tests/ (テストコード)

- **e2e/**: エンドツーエンドテスト
  - エディタ機能のテスト
  - 統合シナリオ
- **integration/**: 統合テスト
  - コンポーネント間の連携
  - システム全体の動作

## 設定ファイル

- **vite.config.ts**: ビルド設定

  - プラグインの設定
  - バンドル設定
  - 開発サーバー設定

- **tsconfig.json**: TypeScript 設定

  - コンパイルオプション
  - パス設定
  - 型定義

- **.env**: 環境変数
  - API キー
  - 環境設定
  - デバッグフラグ

## リソース管理

- **data/**: シーンデータ
- **blend-files/**: Blender ファイル
- **src/public/**: 静的アセット
