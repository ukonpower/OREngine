# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド
- `npm run dev` - 開発サーバー起動（express + vite）
- `npm run build` - プロダクションビルド
- `npm run lint` - ESLint実行
- `npm run typecheck` - TypeScript型チェック（コーディング後に必ず実行すること）

## アクティブプロジェクト
- ルート直下の `orengine.config.json` の `project` で切替
- 一時切替は `ORENGINE_PROJECT=<name> npm run dev`
- 指定ディレクトリが不在の場合は `scripts/templates/project/` から自動生成される（ルートの `package.json`/`tsconfig.json`/`.gitignore` も自動更新され `npm install` が走る）

## Git
- コミットメッセージは日本語で記述すること

## コードスタイル（eslint-config-mdcs / MrDoob Code Style）
- インデント: **タブ**
- 括弧内スペース: `( value )`, `[ item ]`, `{ key: value }`
- セミコロン必須
- padded-blocks: ブロック・クラス・switchの開始/終了に空行
- import順序: builtin → external → internal → parent → sibling → index → object → type（アルファベット順、グループ間に空行）

## 命名規則
- **クラス/インターフェース/型**: PascalCase（`Entity`, `ComponentUpdateEvent`, `RenderStack`）
- **メソッド/関数/変数**: camelCase（`updateImpl`, `matrixWorld`, `autoMatrixUpdate`）
- **protectedフィールド**: アンダースコアプレフィックス `_`（`_entity`, `_enabled`, `_tag`）
- **privateフィールド**: サフィックス `_` またはプレフィックスなし（`fields_`, `componentsSorted`）
- **ディレクトリ/モジュール**: PascalCase（`Entity/`, `Component/`, `Serializable/`）、各モジュールは `index.ts` をエントリポイントとする
- **Reactコンポーネント**: PascalCase関数コンポーネント（`const Screen = () => {}`）
- **Reactフック**: `use` プレフィックス camelCase（`useOREditor`, `useSerializableField`）
- **SCSSモジュール**: `index.module.scss`、BEM風ネスト（`&_tabs`, `&_right`）
- **パッケージ名前空間**: `import * as GLP from 'glpower'`, `import * as MXP from 'maxpower'`

## TypeScript設定
- strict: true
- noUnusedLocals / noUnusedParameters: true
- `@typescript-eslint/no-explicit-any`: off（anyの使用は許可）
- `@typescript-eslint/no-namespace`: off
- jsx: react-jsx

## パスエイリアス
- `glpower` → `packages/glpower/packages/glpower/src`
- `maxpower` → `packages/maxpower`
- `orengine` / `orengine/*` → `packages/orengine/*`
- `~orengine/*` → `src/*`

## リソース自動生成（Vite プラグイン）

`vite-plugins/ResourceManager` が Vite プラグインとして動作し、以下のファイルを**自動生成**する。手動で編集してはいけない（`npm run dev` または `npm run build` で上書きされる）。

| 自動生成ファイル | スキャン対象ディレクトリ | 条件 |
|-----------------|----------------------|------|
| `<project>/Resources/_data/componentList.ts` | `<project>/Resources/Components/` | `index.ts` に `export class Xxx` があること |
| `<project>/Resources/_data/geometryList.ts` | `<project>/Resources/Geometries/` | 同上 |
| `<project>/Resources/_data/textureList.ts` | `<project>/Resources/Textures/` | `.tex` ファイル（中の `frag` は同ディレクトリからの相対パスで `.fs` を指す） |

**コンポーネントを追加するには**、`<project>/Resources/Components/<グループ>/<名前>/index.ts` に `export class Xxx extends MXP.Component` を置くだけでよい。`componentList.ts` への手動登録は不要。ディレクトリ名が先頭 `_` のものはスキャン対象外。

### Material / Shader の扱い

Material と Shader はエディタUIから編集しない。Component ディレクトリ内に同梱し、TS コードから直接 import する。

```
<project>/Resources/Components/<Group>/<Name>/
├── index.ts          # Component 本体。.vs / .fs を import して Material を生成
└── shaders/
    ├── main.vs
    └── main.fs
```

**ルール**:
- **`Materials` という専用ディレクトリを作らない**。「Material を初期化するだけのコンポーネント」を束ねる構造は禁止。
- Material は**それを使うコンポーネントの `index.ts` 内で生成する**。自分で Mesh も生成する場合は `this.entity.addComponent(MXP.Mesh, { geometry, material })`、GLTF 等で既に存在する Mesh に塗る場合は `this.entity.getComponent(MXP.Mesh).material = this.material` とする。
- コンポーネントのディレクトリ名・クラス名は**対象オブジェクトの意味**で命名する（`OREngineCube`, `SkyBox` など）。`〜Material` という接尾辞は付けない。
- `.vs` / `.fs` ファイルは `import vert from './shaders/main.vs'` で文字列として読み込む（`ShaderMinifierLoader` プラグインが `export default "..."` に変換する）
- Material は Component のコンストラクタ内で `new MXP.Material({ vert, frag, phase, uniforms, ... })` として生成する
- HMR: `import.meta.hot.accept('./shaders/main.fs', ...)` でシェーダーのホットリロードに対応（`MXP.hotGet` / `MXP.hotUpdate` を使うとキャッシュ管理まで面倒を見てくれる）

**参考実装**:
- 自己完結型（Geometry + Material + Mesh を全て生成）: `demo/Resources/Components/Samples/Effects/EyeRings/`, `Samples/Geometry/WireCube/`
- 塗布型（既存 Mesh に Material を塗る）: `demo/Resources/Components/Samples/Objects/OREngineCube/`, `Samples/Objects/OREngineLogo/`
- グローバル差し替え型（`renderer.sky.mesh.material` に適用）: `demo/Resources/Components/Samples/Environment/SkyBox/`

## アーキテクチャ
- **glpower**: WebGL低レベルラッパー（Vector, Matrix, Quaternion, EventEmitter, GLPowerFrameBuffer等）
- **maxpower**: エンジンコア。Entity-Componentシステム、Serializable基底クラスによるシリアライズ/デシリアライズ、Renderer、Geometry、Material、PostProcess
- **orengine**: エディタUI（React）+ Engineクラス。tsx/components以下にパネル・入力・ビューコンポーネント
- **src/**: アプリケーションエントリ。EditorPage, ProjectSelectPage等
- **server/**: Express + WebSocketサーバー。REST API、WebSocketブリッジ、プロジェクト管理
- 継承階層: `EventEmitter` → `Serializable` → `Entity` / `Component`

## 設計ドキュメント（ADR）
`docs/adr/` に設計判断の記録（Architecture Decision Records）がある。ADRには「なぜその設計にしたか」が記述されている。**設計の根幹を変更する場合のみ**、対応するADRを更新または新規追加する。日常的なコード変更ではADRの更新は不要。

- `docs/adr/001-browser-first-architecture.md` - ブラウザファースト設計
- `docs/adr/002-websocket-delegation-pattern.md` - WebSocket委譲パターン
- `docs/adr/003-entity-component-hierarchy.md` - Entity-Component継承階層
- `docs/adr/004-serializable-field-system.md` - Serializableフィールドシステム
- `docs/adr/005-deferred-rendering-pipeline.md` - Deferredレンダリングパイプライン
- `docs/adr/006-gbuffer-layout-and-depth-sharing.md` - GBufferレイアウトとDepth共有
- `docs/adr/007-editor-context-architecture.md` - エディタContext体系

### ADRの参照ルール
- 関連する設計領域のコードを変更する前に、対応するADRを読んで設計意図を理解すること
- ADRには実装の詳細（API仕様、フィールド一覧等）は書かない。実装の詳細はコードが正（source of truth）
- 新しい機能を追加する際、既存のADRの設計原則に反していないか確認すること

### ADRの更新ルール
- **更新が必要な場合**: 設計の根幹（アーキテクチャパターン、データフロー方向、継承構造等）を変更するとき
- **更新が不要な場合**: APIエンドポイント追加、フィールド追加、UIコンポーネント追加、バグ修正、リファクタリング等の日常的な変更
- 新しい設計判断が必要になった場合は、次の番号でADRを新規追加する
- 既存の設計判断を廃止する場合は、ステータスを「廃止」に変更し、後継ADRへの参照を記載する
