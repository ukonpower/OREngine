# OREngine

OREngine (オーアールエンジン) は WebGL 製の軽量 3D エンジンです。64KB Intro Demo の制作を目的としており、TypeScript で実装されています。

![OREngine screen shot](./screenshot/OREngine.png)

## 特徴

- コンポーネントベースの柔軟なアーキテクチャ
- Vite を用いた高速ビルドシステム
- React との統合や Blender 連携に対応

## インストール

### 1. サブモジュールと依存パッケージの取得

```bash
npm run init
```

### 2. ShaderMinifier の準備

[Shader_Minifier](https://github.com/laurentlb/Shader_Minifier) を取得し、実行ファイルへのパスを通してください。

#### Windows

ShaderMinifier をインストール後、Path を設定します。

#### macOS

`shader_minifier.exe` を `/Documents/application/shader_minifier/shader_minifier.exe` に配置し、Mono をインストールします。

```bash
brew install mono
```

## 実行

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## ドキュメント

アーキテクチャの詳細やセットアップ手順、Blender との連携方法などは [`docs`](./docs/README.md) ディレクトリにまとめています。

## ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。
