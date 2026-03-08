# Research: テスト充実化

## タスク概要
OREngineプロジェクトのテストを充実させる。現状の把握、優先度の高いテスト対象の特定、テスト戦略の策定を行う。

## 現状のテストカバレッジ

### テスト済み（glpowerのみ）
| ファイル | テスト対象 | フレームワーク |
|---------|----------|-------------|
| `packages/glpower/packages/glpower/tests/Math/Vector.test.ts` | Vector | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Math/Matrix.test.ts` | Matrix | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Math/Quaternion.test.ts` | Quaternion | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Math/Euler.test.ts` | Euler | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Math/Utils.test.ts` | Math Utils | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Animation/Bezier.test.ts` | Bezier | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Animation/FCurve.test.ts` | FCurve | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Animation/FCurveKeyFrame.test.ts` | FCurveKeyFrame | Jest + ts-jest |
| `packages/glpower/packages/glpower/tests/Animation/Easings.test.ts` | Easings | Jest + ts-jest |
| `packages/glpower/tests/Docs.test.ts` | E2Eビジュアルテスト | Jest + Puppeteer |

### 未テスト
- **maxpower パッケージ**: テストなし（Entity, Component, Serializable, Renderer, Geometry, Material等）
- **orengine パッケージ**: テストなし（Engine, Editor, CommandManager, Resources等）
- **server/**: テストなし（REST API, WebSocket, EntityStore等）
- **ルートプロジェクト (src/)**: テストなし

### テスト環境
- **フレームワーク**: Jest 28.x（glpowerのみ）
- **TypeScript**: ts-jest 28.x
- **DOM環境**: jsdom
- **E2E**: Puppeteer + jest-image-snapshot
- **カバレッジ閾値**: 80%（glpower設定）
- **ルートにはテストスクリプトなし**

## 関連ファイル・シンボル（テスト優先度別）

### 優先度1: 純粋ロジック・高テスト可能性

| ファイル | 主要シンボル | 役割 | テストすべき理由 |
|---------|------------|------|----------------|
| `packages/maxpower/Serializable/index.ts` | Serializable, serialize, deserialize, serializeToDirectory, fieldDir | フィールドシステム基盤 | 全Entity/Componentが継承。パス解析ロジックが複雑で境界条件が多い |
| `packages/maxpower/Entity/index.ts` | Entity, update, updateMatrix, addComponent, removeComponent, findEntityByUUID | シーングラフ・コンポーネント管理 | システムの中核。行列計算、コンポーネントorder管理等 |
| `packages/maxpower/Component/index.ts` | Component, update, dispose | コンポーネント基底クラス | ライフサイクル管理 |
| `packages/glpower/packages/glpower/src/utils/EventEmitter/index.ts` | EventEmitter, on, off, emit | イベントシステム基盤 | 全クラスが依存。未テスト |
| `packages/maxpower/Geometry/index.ts` | Geometry, CubeGeometry, SphereGeometry等 | メッシュデータ生成 | 頂点・インデックス計算は純粋関数 |
| `packages/maxpower/Utils/Ray/index.ts` | Ray, Raycaster | 交差判定 | 数学的に検証可能 |

### 優先度2: サーバーサイドロジック

| ファイル | 主要シンボル | 役割 | テストすべき理由 |
|---------|------------|------|----------------|
| `server/Project/EntityStore/index.ts` | EntityStore, findEntity, findParent, findComponent, setField, _setNestedValue | オンメモリエンティティ操作 | 動的パス設定、再帰検索。境界条件多数 |
| `server/routes/editor.ts` | editorRouter, handleActionInternal, バッチAPI | エディタ操作REST API | 3重ループのバッチ処理、部分失敗時のロールバックなし |
| `server/ws/index.ts` | EditorWSBridge, send, requestSync | WebSocket通信 | タイムアウト機構、ペンディング管理 |
| `server/routes/projects.ts` | projectsRouter, validateProjectName | プロジェクト管理 | パストラバーサル対策の検証 |
| `server/routes/materials.ts` | materialsRouter, validateName | マテリアルCRUD | 入力バリデーション |

### 優先度3: エディタロジック（UI非依存部分）

| ファイル | 主要シンボル | 役割 | テストすべき理由 |
|---------|------------|------|----------------|
| `packages/orengine/ts/Engine/index.ts` | Engine | エンジン統合 | シーン・リソース・タイム管理 |
| `packages/orengine/ts/Editor/index.ts` | Editor | エディタ制御 | エンティティ操作、状態管理 |
| `packages/orengine/ts/Editor/CommandManager/index.ts` | CommandManager, execute, undo, redo | Undo/Redo | コマンドパターンの正確性 |
| `packages/orengine/ts/Resources/index.ts` | Resources | リソース管理 | マルチリソース管理 |

## 依存関係

```
EventEmitter (glpower) ← 全クラスが継承
  └─ Serializable (maxpower) ← フィールドシステム基盤
      ├─ Entity (maxpower) ← シーングラフ
      │   ├─ children: Entity[]
      │   └─ components: Map<ComponentClass, Component>
      ├─ Component (maxpower) ← 機能モジュール
      │   ├─ Mesh (Geometry + Material)
      │   ├─ Camera
      │   ├─ Light
      │   └─ Renderer (最複雑)
      └─ Material (maxpower) ← シェーダ設定

EntityStore (server) ← SceneDataEntity ツリー操作（独立、maxpowerに非依存）
EditorWSBridge (server) ← WebSocket通信（独立）
CommandManager (orengine) ← Engine/Editor に依存
```

## 既存パターン

### テストコードスタイル（glpowerの既存テストより）
```typescript
describe( 'Vector', () => {
	let vector: Vector;
	beforeEach( () => {
		vector = new Vector( 1, 2, 3, 4 );
	} );
	it( 'init', () => {
		expect( vector.x ).toBe( 1 );
	} );
} );
```
- MrDoob Code Style（タブインデント、括弧内スペース）
- describe/it/beforeEach パターン
- jest の expect/toBe/toBeCloseTo

### テスト設定（glpower）
- `jest/unit.config.js`: testEnvironment=jsdom, ts-jest, カバレッジ80%
- テストファイル: `tests/` ディレクトリ内、`*.test.ts`

## 複雑で境界条件が多い箇所（テスト最重要ポイント）

### 1. Serializable.serializeToDirectory() のパス解析
- `""` (空文字列), `"/"` (スラッシュのみ), `"a//b"` (連続スラッシュ), `"/a/b/"` (先頭/末尾スラッシュ)
- パス分割 → ツリー構造変換のロジック
- `type: "value"` と `type: "folder"` の判定

### 2. Entity.updateMatrix() の quaternion/euler 同期
- `quaternion.updated` フラグによる方向判定
- 両方同時変更時の動作
- `updateParent=true` での再帰計算
- parent の matrixWorld が未計算の場合

### 3. EntityStore._setNestedValue() の動的オブジェクト生成
- 中間パスが存在しない場合の自動生成
- 既存値が非オブジェクトの場合の上書き
- 空パス、スラッシュのみのパス

### 4. WebSocket ペンディング管理
- 同時複数リクエスト
- タイムアウト発火タイミング
- 接続切断中の送信試行

### 5. バッチAPI の3重ループ
- エンティティ作成 → コンポーネント追加 → フィールド設定
- 途中失敗時の状態（ロールバックなし）
- UUIDの依存チェーン

### 6. Component order ソートと実行順序
- 同一 order のコンポーネント順序
- addComponent 時の既存削除 → 再作成

## 制約・注意点

### テスト環境の課題
- **maxpower/orengine にはテスト環境がない**: テスト設定の新規作成が必要
- **server/ にもテスト環境がない**: supertest 等の導入が必要
- **WebGL依存クラス**: Renderer, Material, GLPower系はモックが必要
- **React UIコンポーネント**: testing-library 等の導入が必要（優先度低）

### アーキテクチャ上の制約
- Entity/Component は EventEmitter を継承 → イベント発火の検証が可能
- Serializable の serialize/deserialize は純粋に近い → テスト容易
- EntityStore はサーバーサイドの独立クラス → モック不要でテスト可能
- Renderer は WebGL2RenderingContext に強く依存 → テスト困難

### テストフレームワークの選択肢
- **案1: Jest統一** - glpowerの既存設定に合わせる。設定の一貫性
- **案2: Vitest導入** - Viteプロジェクトとの親和性が高い。ESM対応が容易。maxpower/orengine/serverに適切

## 参考になる既存実装
- `packages/glpower/jest/unit.config.js` - ユニットテスト設定のテンプレート
- `packages/glpower/packages/glpower/tests/Math/Vector.test.ts` - テストコードの書き方の参考

## テスト戦略提案（優先度順）

### Phase 1: 基盤テスト（最優先・効果最大）
1. **EventEmitter** - 全クラスの基盤。on/off/emit/once の正確性
2. **Serializable** - serialize/deserialize の双方向性、serializeToDirectory のパス解析
3. **Entity 基本操作** - add/remove children、addComponent/removeComponent、findEntityByUUID
4. **EntityStore** - _setNestedValue、findEntity/findParent/findComponent、setField

### Phase 2: コアロジック
5. **Entity.updateMatrix()** - 行列合成、quaternion/euler同期
6. **Component ライフサイクル** - update/dispose 順序
7. **Geometry** - 頂点・インデックス生成の正確性（Cube, Sphere等）
8. **Ray/Raycaster** - AABB・三角形交差判定

### Phase 3: サーバーサイド
9. **REST API エンドポイント** - CRUD操作、バリデーション、エラーレスポンス
10. **バッチAPI** - 複数エンティティ作成、部分失敗
11. **WebSocket通信** - ペンディング管理、タイムアウト
12. **パストラバーサル対策** - 各バリデーション関数

### Phase 4: エディタロジック
13. **CommandManager** - execute/undo/redo の正確性
14. **Resources** - リソースCRUD
