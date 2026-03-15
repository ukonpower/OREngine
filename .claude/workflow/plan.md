# Plan: コンポーネント作成マニュアル

## 概要

Samplesコンポーネント群の分析結果を基に、OREngineのコンポーネント作成方針ガイドを作成する。
細かなAPI仕様ではなく「どういう方針でコンポーネントを作るか」を中心にした設計ガイドドキュメント。

**成果物**: `docs/component-guide.md`（1ファイル）

## ドキュメント構成

### 全体構造

```
# コンポーネント作成ガイド

## コンポーネントとは
## はじめに: 最小のコンポーネント
## コンポーネントの3つのカテゴリ
  - ビジュアル（Mesh生成型）
  - 制御（Transform操作型）
  - データ/ユーティリティ
## ライフサイクル
## レンダリングフェーズの選び方
## ユニフォームの扱い方
## Serializableフィールド（エディタ連携）
## シェーダーとHMR
## disposeとリソース管理
## ディレクトリ配置と自動登録
```

## 実装ステップ

### 1. ドキュメントファイルの作成

- **対象ファイル**: `docs/component-guide.md`（新規）
- **変更内容**: 以下の各セクションを含むマニュアルを作成

#### セクション1: コンポーネントとは
- Component基底クラスの継承階層（EventEmitter → Serializable → Component）
- Entityに追加して振る舞いを付与する仕組みであること
- 「1つのコンポーネント = 1つの責務」の原則

#### セクション2: はじめに: 最小のコンポーネント
- ObjectRotateをベースにした最小構成の例
- ファイル配置 → `export class` → 自動登録の流れ
- 「これだけで動く」という最小限を示す

#### セクション3: コンポーネントの3つのカテゴリ
research.mdの分類をそのままガイド化:

**A. ビジュアルコンポーネント（Mesh生成型）**
- 方針: constructorでGeometry + Material + Meshを構築
- いつ使う: 画面に何かを描画したいとき
- 代表例: Dust, GridCross, EyeRings
- 判断ポイント:
  - 不透明 → `deferred` / 半透明・パーティクル → `forward`
  - 大量描画 → インスタンシング
  - 影を落とす → `shadowMap` を追加

**B. 制御コンポーネント（Transform操作型）**
- 方針: updateImplでEntityのTransformを毎フレーム操作
- いつ使う: オブジェクトの動き・カメラ制御
- 代表例: ObjectRotate, CameraOrbitAnim
- 判断ポイント:
  - 通常はupdateImplのみで十分
  - matrixWorld確定後に処理が必要 → finalizeImpl
  - レンダリング直前に最終調整 → beforeRenderImpl
  - 実行順序の制御が必要 → orderプロパティ

**C. データ/ユーティリティコンポーネント**
- 方針: 外部データを取得してuniformに流す
- いつ使う: オーディオ・MIDI等の外部入力を扱うとき
- 代表例: AudioTexture, UniformControls

#### セクション4: ライフサイクル
- updateImpl / postUpdateImpl / finalizeImpl / beforeRenderImpl / afterRenderImpl の役割
- 「どれを使うべきか」のフローチャート的な説明
- orderプロパティによる実行順序制御

#### セクション5: レンダリングフェーズの選び方
- deferred / forward / shadowMap / envMap の判断基準
- 簡潔な判断フロー:
  - 不透明でライティングあり → deferred
  - 半透明・パーティクル・特殊描画 → forward
  - 影を落とす → shadowMap 追加
  - 環境マップに映り込む → envMap 追加

#### セクション6: ユニフォームの扱い方
- Engine.getInstance(gl).uniforms（一括取得）
- globalUniformsから個別選択
- カスタムuniformの追加方法
- 「迷ったらEngine.getInstance(gl).uniformsを使う」

#### セクション7: Serializableフィールド（エディタ連携）
- this.field() の基本パターン
- fieldDir() によるフォルダ構造化
- formatオプション（select等）
- 「エディタから操作したいパラメータにだけfieldを定義する」方針

#### セクション8: シェーダーとHMR
- shaders/ ディレクトリの配置
- hotGet / hotUpdate パターン
- import.meta.hot.accept の書き方
- 「開発効率のためにHMR対応は推奨」

#### セクション9: disposeとリソース管理
- Mesh追加した → removeComponent必須
- タイマー・イベント → this.once("dispose", ...) で解放
- 何も追加していない → dispose不要
- 「追加したものは必ず片付ける」原則

#### セクション10: ディレクトリ配置と自動登録
- ディレクトリ構造の規約
- export class の命名
- `_` プレフィックスでスキャン除外
- 手動登録不要の仕組み

## 変更対象ファイル一覧

- [x] `docs/component-guide.md` - コンポーネント作成ガイド（新規作成）

## 考慮事項・リスク

- **ドキュメントの肥大化**: 方針ガイドに徹し、API仕様の詳細は書かない。コード例は最小限の抜粋に留める
- **既存ドキュメントとの整合**: CLAUDE.mdにはアーキテクチャ概要とコードスタイルが書かれている。重複を避け、component-guide.mdはコンポーネント固有の方針に集中する
- **ADRとの関係**: ADR 003（Entity-Component継承階層）に関連するが、ADRは「なぜその設計にしたか」、本ガイドは「どう使うか」という棲み分け

## テスト方針

- ドキュメント内のコード例が既存のSamplesコンポーネントと一致しているか目視確認
- 記載したディレクトリ構造が実際のプロジェクト構造と一致しているか確認
