# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド
- `npm run dev` - 開発サーバー起動（express + vite）
- `npm run build` - プロダクションビルド
- `npm run lint` - ESLint実行
- `npm run typecheck` - TypeScript型チェック（コーディング後に必ず実行すること）

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
- `orengine/*` → `packages/orengine/*`
- `~project/*` → `projects/default/*`
- `~/*` → `src/*`

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

## シーン作成（REST API経由）

### エンティティのバッチ作成
`POST /api/projects/{name}/editor/entities` でエンティティ・コンポーネント・フィールドを一括作成可能。transform（position/euler/scale）とコンポーネント（fields含む）を1リクエストで指定できる。

### Meshコンポーネント
- `geometry/type`: `"Cube"` | `"Sphere"` | `"Plane"` | `"Cylinder"` (**PascalCase必須**)
- `material/name`: マテリアル名（文字列）
- フィールド設定には**コンポーネントUUID**（エンティティUUIDではない）が必要。バッチAPIではこの区別は不要

### Lightコンポーネント
- `lightType`: `"spot"` (default) | `"directional"`
- `color`: [r, g, b]、`intensity`: number、`castShadow`: boolean
- spot専用: `angle`(rad), `blend`, `distance`, `decay`

### マテリアル (.mat) config
- uniform形式: `"uniforms/uName": value`
- 型: float→number, vec2→[x,y], vec3→[x,y,z], vec4→[x,y,z,w], sampler2D→テクスチャ名(string)
- phase: `["shadowMap", "deferred"]` が標準。forward描画は `["forward"]`

### シェーダー作成
- `POST /api/shaders` に `"template": "mesh"` でメッシュ用テンプレート生成
- `"template": "texture"` でテクスチャ用テンプレート生成
- 頂点で使えないuniform: `uCameraPosition`, `uResolution`（frag_h専用）
- テクスチャ用FSには `in vec2 vUv;` を明示宣言するか `#include <frag_h>` を使用
- シェーダーモジュール: GLSLソース `packages/maxpower/Component/Renderer/ShaderParser/shaderModules/` を参照

### コンポーネント作成
- `import * as GLP from 'glpower'` + `import * as MXP from 'maxpower'`
- `ComponentUpdateEvent`: `timeDelta`（秒）, `timeElapsed`（累積秒）, `playing`, `renderer`, `resolution` 等
