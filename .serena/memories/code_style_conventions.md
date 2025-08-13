# OREngine コードスタイルと規約

## TypeScript設定
- **Target**: ES2020
- **Module**: ESNext
- **Strict mode**: 有効
- **JSX**: react-jsx
- **Bundle mode**: 有効

## ESLint設定
- **インデント**: タブ文字 (tab)
- **Import order**: アルファベット順、グループ別整理
- **未使用変数**: 許可 (@typescript-eslint/no-unused-vars: off)
- **any型**: 許可 (@typescript-eslint/no-explicit-any: off)
- **空行**: 複数の空行禁止

## Import順序ルール
1. builtin
2. external  
3. internal
4. parent
5. sibling
6. index
7. object
8. type

各グループ間には必ず空行を入れる。

## パスエイリアス
- `glpower` -> `./packages/glpower/packages/glpower/src`
- `maxpower` -> `./packages/maxpower`
- `orengine/*` -> `./packages/orengine/*`
- `~/*` -> `./src/*`

## ファイル命名規則
- TypeScriptファイル: `.ts`, `.tsx`
- コンポーネント: PascalCase
- ユーティリティ: camelCase

## 除外設定
- `dist/` ディレクトリ
- `packages/glpower/` (サブモジュール)