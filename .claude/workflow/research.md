# Research: Sushiプロジェクトを開くとViteエラーが発生する

## タスク概要
OREngineでSushiプロジェクトを開くと以下のVite pre-transform errorが発生する:
```
Failed to load url /Users/.../projects/default/Resources
Failed to load url /Users/.../projects/default/Resources/Components/Samples/MIDI/MIDIMIX
```
`projects/default/` が参照されているが、そのようなディレクトリは存在しない。

## 根本原因

**ProjectResolverプラグインのデフォルト値が不正。**

| ファイル | デフォルト値 | 正しい値 |
|---------|------------|---------|
| `plugins/ProjectResolver/index.ts:11` | `'default'` | `'DemoProject'` |
| `vite.config.ts:12` | `'DemoProject'` | `'DemoProject'` ✓ |

`ProjectResolver` と `vite.config.ts` の両方が `process.env.ORENGINE_PROJECT` を読んでいるが、フォールバック値が不一致:

- **vite.config.ts**: `process.env.ORENGINE_PROJECT || 'DemoProject'` → ResourceManager用。正しい。
- **ProjectResolver**: `process.env.ORENGINE_PROJECT || 'default'` → `~project/*`エイリアス解決用。**不正。**

`ORENGINE_PROJECT`環境変数が未設定の場合、`~project/*` は `projects/default/*` に解決されるが、`projects/default/` は存在しない（存在するのは `DemoProject`, `Sushi`, `Project0`, `DigitalNexus`）。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `plugins/ProjectResolver/index.ts` | `ProjectResolver` | `~project/*`エイリアスを`projects/{activeProject}/*`に解決するViteプラグイン |
| `vite.config.ts` | `activeProject` | ResourceManagerプラグインへのプロジェクトパス供給 |
| `src/tsx/components/pages/EditorPage/index.tsx` | `EditorPage` | `~project/Resources`と`~project/Resources/Components/Samples/MIDI/MIDIMIX`をimport |

## 依存関係

- `EditorPage` → `~project/Resources` → `ProjectResolver`がパス解決 → `projects/{activeProject}/Resources/`
- `vite.config.ts` → `ResourceManager`プラグイン → `projects/{activeProject}/Resources/`に`_data/*.ts`を自動生成

## 修正方針

**単純な1行修正**: `plugins/ProjectResolver/index.ts` の11行目を修正:

```typescript
// Before
const activeProject = process.env.ORENGINE_PROJECT || 'default';
// After
const activeProject = process.env.ORENGINE_PROJECT || 'DemoProject';
```

## 制約・注意点

- **ビルドタイム vs ランタイムのプロジェクト選択の不一致**: `~project/*`はビルド時に固定されるが、EditorPageはランタイムでURLクエリパラメータからプロジェクトを選択する。これは本件のエラーの直接原因ではないが、構造的課題として残る。
- **Sushiの`_data/`が空**: `ORENGINE_PROJECT=Sushi`でViteを起動すればResourceManagerが自動生成するため、実害はない。デフォルトの`DemoProject`でビルドしている限り、Sushiの`_data/`は空のまま。
- `MIDIMIX`コンポーネントは`DemoProject`と`Sushi`の両方に存在するため、パス解決さえ正しければimportは成功する。
