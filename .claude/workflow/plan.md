# Plan: ProjectResolverのデフォルトプロジェクト名を修正

## 概要
`plugins/ProjectResolver/index.ts` のフォールバック値が `'default'` になっており、存在しない `projects/default/` を参照してViteエラーが発生する。`vite.config.ts` と同じ `'DemoProject'` に統一する。

## 実装ステップ

### 1. ProjectResolverのデフォルト値を修正
- **対象ファイル**: `plugins/ProjectResolver/index.ts`
- **変更内容**: 11行目のフォールバック値を `'default'` → `'DemoProject'` に変更
- **コードスニペット**:
  ```typescript
  // Before
  const activeProject = process.env.ORENGINE_PROJECT || 'default';
  // After
  const activeProject = process.env.ORENGINE_PROJECT || 'DemoProject';
  ```

## 変更対象ファイル一覧
- [x] `plugins/ProjectResolver/index.ts` - デフォルトプロジェクト名を `'DemoProject'` に修正

## テスト方針
- `npm run dev` でViteを起動し、エラーが解消されることを確認
- `npm run typecheck` でビルドエラーがないことを確認
