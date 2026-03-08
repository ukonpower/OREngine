# ADR-007: エディタContext体系

## ステータス
承認済み

## コンテキスト
エディタUIはReactで構築されており、複数のパネル（Hierarchy, Screen, EntityProperty, AssetViewer等）がEngine・Editorの状態にアクセスする必要がある。また右クリックメニューやモーダル入力など、パネルを横断するUI操作も存在する。

## 決定
React Contextを3層に分離する:
- OREngineContext: Engineインスタンスのライフサイクル管理
- OREditorContext: Editor + Engine + projectNameを提供（主要コンテキスト）
- MouseMenuContext / InputWindowContext: UI操作用コンテキスト

## 理由
- OREngineContextとOREditorContextを分離することで、Engineのみ使う場面（プレビュー等）とEditor付きの場面（フルエディタ）を区別できる
- ほとんどのパネルコンポーネントはuseOREditor()だけで必要な情報にアクセスできる
- MouseMenuContextを独立させることで、任意のコンポーネントから右クリックメニューを出せる。パネル間の依存が生じない
- InputWindowContextはモバイルでのテキスト/数値入力モーダルを統一的に管理するために分離

## 結果
- パネルコンポーネントはuseOREditor()でeditor, engine, projectNameを取得する統一パターン
- Editorクラス自体がSerializableを継承しているため、エディタ状態（gizmoMode, viewType等）もフィールドシステムで管理される
- useWatchSerializableフックでEditorのフィールド変更を監視し、UIを再描画する

## 関連コード
- `packages/orengine/tsx/components/OREngine/index.tsx` - OREngineContext Provider
- `packages/orengine/tsx/components/OREditor/index.tsx` - OREditorContext / MouseMenuContext / InputWindowContext Provider
- `packages/orengine/tsx/hooks/useOREditor/index.ts` - useOREditor()フック
