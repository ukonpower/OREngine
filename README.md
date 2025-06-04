# OREngine

OREngine(オーアールエンジン)は WebGL 製オレオレ 3D エンジンです。  
64KB Intro Demo の制作のために用いることを想定しています。

![OREngine screen shot](./screenshot/OREngine.png)

## Install

### 1. サブモジュールのインストール / パッケージのインストール

```
npm run init
```

### 2. ShaderMinifier をインストール

[Shader_Minifier](https://github.com/laurentlb/Shader_Minifier)

#### ■ Windows

ShaderMinifier をインストール後、Path を通してください

#### ■ Mac

`shader_minifier.exe` を `/Documents/application/shader_minifier/shader_minifier.exe` を配置

Mono をインストールします  
https://www.mono-project.com/

```
brew install mono
```

## Run

```
npm run dev
```

## Build

```
npm run build
```

## Credits

ビルドしたファイルを 64KB 以下に収めるのは以下のツールなくしては到底実現できませんでした。  
感謝いたします。

- [compeko](https://gist.github.com/0b5vr/09ee96ca2efbe5bf9d64dad7220e923b) by **0b5vr**
- [Shader Minifier](https://github.com/laurentlb/shader-minifier?tab=readme-ov-file) by **Ctrl-Alt-Test**

## Documentation

より詳細な解説は [`docs`](./docs/README.md) ディレクトリにまとめています。
基本的なアーキテクチャやセットアップ手順、Blender との連携方法などを参照できます。

## ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。
