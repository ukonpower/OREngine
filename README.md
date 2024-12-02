# OREngine

OREngine(オーアールエンジン)はWebGL製オレオレ3Dエンジンです。  
64KB Intro Demoの制作のために用いることを想定しています。

![alt text](./screenshot/OREngine.png)

## Install

### 1. サブモジュールのインストール

```
git submodule init
git submodule update
```

### 2. NPMパッケージのインストール

```
npm install
```

### 3. ShaderMinifierをインストール

[Shader_Minifier](https://github.com/laurentlb/Shader_Minifier)

#### ■ Windows

ShaderMinifierをインストール後、Pathを通してください

#### ■ Mac

`shader_minifier.exe` を `/Documents/application/shader_minifier/shader_minifier.exe` を配置

Monoをインストールします  
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

ビルドしたファイルを64KB以下に収めるのは以下のツールなくしては到底実現できませんでした。
感謝いたします。

- [compeko](https://gist.github.com/0b5vr/09ee96ca2efbe5bf9d64dad7220e923b) by **0b5vr**
- [Shader Minifier](https://github.com/laurentlb/shader-minifier?tab=readme-ov-file) by **Ctrl-Alt-Test**