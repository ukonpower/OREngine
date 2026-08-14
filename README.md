# OREngine

OREngine (オーアールエンジン) は WebGL 製の軽量 3D エンジンです。64KB Intro Demo の制作を目的としており、TypeScript で実装されています。

![OREngine screen shot](./screenshot/OREngine.png)

## 特徴

- コンポーネントベースの柔軟なアーキテクチャ
- Vite を用いた高速ビルドシステム
- React との統合や Blender 連携に対応

## インストール

### 1. 依存パッケージの取得

```bash
npm install
```

### 2. ShaderMinifier の準備

macOS / Linux はセットアップスクリプトで [Shader_Minifier](https://github.com/laurentlb/Shader_Minifier) と Mono を導入できます（`~/Documents/application/shader_minifier/` に配置されます）。

```bash
npm run shader-minifier:setup
```

Windows は shader_minifier.exe を取得し、Path を設定してください。

配置場所を変えたい場合は、環境変数 `ORENGINE_SHADER_MINIFIER` に実行コマンド全体を指定します。

```bash
ORENGINE_SHADER_MINIFIER="mono /path/to/shader_minifier.exe" npm run player:build
```

shader_minifier が見つからない環境では minify をスキップして生の GLSL にフォールバックします（警告が出ます。packed サイズは本番相当になりません）。

## 実行

```bash
npm run dev
```

## プロジェクト切替

アクティブなプロジェクトは環境変数 `ORENGINE_PROJECT` で指定します（デフォルトは `demo-webgl`）。レンダラーは `ORENGINE_RENDERER`（`webgl` | `webgpu` | `headless`、デフォルトは `webgl`）で切り替えます。

```bash
ORENGINE_PROJECT=<name> npm run dev
```

## 新規プロジェクト作成

`ORENGINE_PROJECT` に未存在の名前を指定して `npm run dev` するだけです。テンプレート（`host/template/project/`）から雛形が生成されます。

## ビルド

player（64k 配布形式の自己解凍 HTML）とエディタ込み HTML をそれぞれビルドできます。

```bash
npm run player:build # dist/player/out.html
npm run editor:build # dist/static/
```

## デモ公開 (GitHub Pages)

`main` または `master` へ push すると `https://<user>.github.io/<repo>/` にデプロイされます。`develop` ブランチは `https://<user>.github.io/<repo>/develop/`、プルリクエストは `https://<user>.github.io/<repo>/pr-<番号>/` にそれぞれ配置されます。ワークフローの設定は `.github/workflows/pages.yml` にあります。

デモ用のビルドでは ShaderMinifier をスキップしているため、`SKIP_SHADER_MINIFIER=true` が環境変数として渡されます。将来的に Storybook を追加した場合は `public/storybook` 以下に成果物を配置することで同じ仕組みでデプロイできます。

## ドキュメント

補足ドキュメントは [`docs`](./docs) ディレクトリにまとめています。

## クレジット

ビルドサイズを 64KB 以下に抑えるにあたり、以下のツールに多大な助力をいただきました。
作者の皆さまに心より感謝いたします。

- [compeko](https://gist.github.com/0b5vr/09ee96ca2efbe5bf9d64dad7220e923b) by **0b5vr**
- [Shader Minifier](https://github.com/laurentlb/shader-minifier?tab=readme-ov-file) by **Ctrl-Alt-Test**

## ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。
