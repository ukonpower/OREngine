# editor の React 層構造

## editor の React 層構造（components / features）
`packages/orengine/editor` の React 層は vibecoding-template-next の feature 設計に合わせる。

```
editor/
├── components/
│   └── pages/    # 画面コンポーネント（features を組み立てる組成層。EditorPage 等）
├── features/     # 機能単位（PascalCase・再帰構造）。トップレベルは OREditor（エディタ本体）と OREngine（エンジン供給）のみ
│   └── {FeatureName}/
│       ├── index.tsx + index.module.scss  # メインコンポーネント（主要UIがある場合のみ）【公開】
│       ├── components/   # 機能専用サブコンポーネント（ComponentName/index.tsx）【公開】
│       ├── hooks/        # カスタムHooks（useXxx.ts 直置き）【公開】
│       ├── providers/    # Context Provider 実装（XxxProvider.tsx 直置き）【公開】
│       ├── contexts/     # React Context 定義（XxxContext.tsx 直置き）【内部】
│       ├── lib/          # 非Reactロジック（レンダラー・純ロジック・型定義）【内部】
│       └── features/     # 子feature（再帰構造。親の内部実装）【内部】
├── hooks/        # feature 横断で共有する Hooks（useLayout）
├── contexts/     # feature 横断で共有する Context 定義
└── lib/          # エディタ中核の非React層（Editor クラス・gizmo・入力等。dir+index.ts 形式）
```

汎用UIコンポーネント（Button / Panel / Input 等）とデザイントークン・共有Sass partial は `uipower` パッケージにあり、editor からは `import { Panel } from 'uipower'` で参照する（相対パスで `packages/uipower` を指さない）。

- 【公開】= feature 外から import してよい、【内部】= feature 内からのみ。依存方向のルールは eslint-plugin-boundaries（`eslint.config.mjs` の editor ブロック）で機械強制されるので、違反は lint エラーで分かる
- ある feature の中でしか使わない機能は、その feature の `features/` に子 feature として置く（例: `OREditor/features/Screen/features/CameraPad`）。複数 feature での共有が必要になった Hooks・Context は editor 直下の `hooks/`・`contexts/` へ昇格する
- feature の主要UIは `{FeatureName}/index.tsx` に置く。`features/Timeline/components/Timeline/` のように feature 名を二重に掘らない
- Context は「定義を `contexts/`、Provider 実装を `providers/`」に分離する。Context 値の生成ロジックは `hooks/useXxxContext.ts` に置く
- 外部への公開面は `packages/orengine/react.tsx` に個別 export で集約する（`features/index.ts` のような中継バレルは作らない）
- scss から共有 partial を参照するときは相対パスではなく `@use 'styles' as *` を使う（uipower の `styles/` が解決先。vite の sass `loadPaths` と `npm run typecheck` の `--load-path` で解決するので、両者は一致させること）
