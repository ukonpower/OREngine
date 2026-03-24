# Research: BLidgeClient の JSON シーン読み込み設計

## タスク概要
BLidgeClient が `blidge-scene.json` を読み込む方法を設計する。現状は `scene.json`（OREngineプロジェクト保存形式）を `BLidgeScene` として渡しておりクラッシュする。fetch で動的に読む場合、ファイルが public に存在する必要があるため、配信方法の設計が必要。

## 現状の整理

### ファイルの所在と配信
| ファイル | 場所 | ブラウザからアクセス | 方法 |
|---------|------|-------------------|------|
| `scene.glb` | `src/public/scene.glb` | 可 | Vite publicDir（`src/public`） |
| `blidge-scene.json` | `projects/DemoProject/blidge-scene.json` | 不可 | なし |
| `scene.json` | `projects/DemoProject/scene.json` | API経由のみ | Express `/api/projects/:name/scene` |

### BLidgeClient の2つの読み込みパス
1. **WebSocket（開発時）**: Blender → WebSocket → `BLidge.onMessage()` → `loadScene()` ← 問題なし
2. **JSON（プロダクション）**: ファイルから `BLidgeScene` を読み込む ← **ここが壊れている**

### Player ビルドでの読み込み（参考）
`src/ts/Player/index.ts` では `import SceneData from '~project/scene.json'` で**静的importしてJSにバンドル**している。`~project` は `ProjectResolver` プラグインがビルド時に `projects/{activeProject}` に解決する。

## 関連ファイル・シンボル
| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/BuiltinResources/Components/Utility/BLidgeClient/index.ts` | `BLidgeClient`, `reload()` | JSON/WebSocket でシーンを読み込むコンポーネント |
| `packages/maxpower/BLidge/index.ts` | `BLidge`, `loadScene()` | BLidgeScene を受け取りエンティティツリーを構築 |
| `src/ts/Player/index.ts` | - | Player ビルドのエントリ。`engine.load(SceneData)` |
| `vite.config.ts` | - | `publicDir`: `src/public`、`BASE_PATH` 定義、ProjectResolver 設定 |
| `plugins/ProjectResolver/index.ts` | `ProjectResolver` | `~project/*` → `projects/{activeProject}/*` のビルド時エイリアス解決 |
| `server/routes/scene.ts` | - | `/api/projects/:name/scene` で scene.json を返すAPI |

## 依存関係
- `BLidgeClient` → `BLidge.loadScene()`: JSON 読み込みパス
- `BLidge.loadScene()` → `GLTFLoader.load()`: gltfPath が指定されていれば fetch で GLB を取得
- `scene.glb` は `src/public/` にあり Vite publicDir 経由で配信済み
- `blidge-scene.json` は `projects/*/` にあり配信手段がない

## 設計方針の候補

### 案A: 静的 import に戻す（Vite バンドル）
`import BLidgeSceneData from '~project/blidge-scene.json'` で静的にバンドルする。
- メリット: fetch 不要、publicDir を気にしなくてよい、Player ビルドと同じパターン
- デメリット: パス変更不可（ビルド時固定）、JSONが大きい場合バンドルサイズ増加
- `loadScene` に直接渡すだけなのでシンプル

### 案B: Vite プラグインで projects/ → public/ にコピー
ビルド/dev 起動時に `blidge-scene.json` を `src/public/` にコピーする。
- メリット: fetch で動的に読める、パス変更可能
- デメリット: コピーの仕組みが必要、ファイルの二重管理

### 案C: Express サーバーに API エンドポイント追加
`/api/projects/:name/blidge-scene` で blidge-scene.json を返す。
- メリット: プロジェクトごとに動的に切り替え可能
- デメリット: エディタ（dev サーバー）でしか使えない、Player ビルドでは使えない

### 案D: 静的 import + UIフィールドは廃止
BLidgeClient の JSON パスフィールドを廃止し、`~project/blidge-scene.json` を静的 import して固定で渡す。パスの切り替えは WebSocket モードで行う。
- メリット: 最もシンプル。現状の `scene.glb` も `src/public/` に固定配置されており同じ方針
- デメリット: UIからパス変更できない（が、JSON モード自体がプロダクション用途なので問題ない可能性）

## 参考: scene.glb の扱い
`scene.glb` は `src/public/` に置かれており、`BASE_PATH + "/scene.glb"` で fetch される。OREngine はこのパターンを「プロダクション用の静的アセット」に使っている。BLidgeClient 側でも `gltfPath` をフィールドで変更可能だが、デフォルトはこの固定パス。

## 制約・注意点
- Player ビルド（`vite-player.config.ts`）では静的 import が使われている（バンドル込み）
- エディタ（dev モード）では Express サーバーが動いているのでAPI経由も可能
- プロダクション（ビルド後）では Express サーバーなしなので fetch するには publicDir に置く必要あり
