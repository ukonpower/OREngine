# トラブルシューティング

## サーバー未起動

**症状**: `curl: (7) Failed to connect to localhost port 3001: Connection refused`

**対処**:
1. `npm run dev` で開発サーバーを起動
2. 起動完了まで待つ（通常数秒）
3. `curl -sf http://localhost:3001/api/projects` で接続確認

## ブラウザ未接続時の動作

ブラウザ未接続時はサーバー側のSceneDataEditorがフォールバック処理する。
ブラウザを再接続すると、サーバー側の変更がフルリロードでブラウザに反映される。

| 機能 | ブラウザ接続時 | ブラウザ未接続時 |
|------|-------------|---------------|
| シーンツリー取得 | OK | OK |
| エンティティCRUD | OK | OK |
| コンポーネント追加/削除 | OK | OK |
| フィールド設定（position/euler/scale/name） | OK | OK |
| コンポーネントフィールド設定（props） | OK | OK |
| バッチ操作（entities/fields） | OK | OK |
| コンポーネント一覧（built-in含む） | OK | OK |
| エンティティ名検索 | OK | OK |
| Save | OK | OK |
| コンポーネント詳細（fieldsDirectory） | OK | **503**（ランタイム必要） |
| シェーダーエラー確認 | OK | **503**（GPU必要） |
| Undo/Redo | OK | **503** |
| エンティティ選択 | OK | **503** |
| Editor経由リソース操作（materials/textures） | OK | **503**（将来対応予定） |

**対処**: シーン操作の基本機能はブラウザなしでも動作する。コンポーネント詳細やシェーダーエラー確認が必要な場合はブラウザでエディタを開く。

## UUID不正

**症状**: `404` または `Entity not found`

**対処**:
1. `GET /api/projects/:p/editor/scene` でシーンツリーを再取得
2. 正しいUUIDを確認
3. エンティティUUIDとコンポーネントUUIDを混同していないか確認

**注意**: フィールド設定（`/editor/field`, `/editor/fields`）の `targetUuid` は:
- Entityレベルフィールド（position, euler, scale等）→ エンティティUUID
- Componentレベルフィールド（geometry/type等）→ **コンポーネントUUID**（エンティティUUIDではない）

## コンポーネント名が見つからない

**症状**: コンポーネント追加時にエラー

**対処**:
1. `GET /api/projects/:p/editor/components` で利用可能なコンポーネント一覧を取得
2. コンポーネント名の大文字小文字を確認（例: `"Mesh"` であって `"mesh"` ではない）
3. [components-catalog.md](components-catalog.md) で正式名称を確認

## フィールドパスが不正

**症状**: フィールド設定が反映されない

**対処**:
1. `GET /api/projects/:p/editor/entity/:uuid/component/:name` でコンポーネントの `fieldsDirectory` を確認（ブラウザ接続時のみ）
2. `path` はフィールドのキーと完全一致が必要（例: `"geometry/type"` であって `"geometryType"` ではない）
3. 値の型を確認（number[3] が必要なフィールドに string を渡していないか等）

## 保存に失敗する

**症状**: `POST /editor/save` でエラー

**対処**:
1. プロジェクトが存在するか確認: `GET /api/projects`
2. プロジェクト名が正しいか確認
3. ブラウザ接続中に保存する場合、ブラウザ側でエラーが出ていないか確認

## TypeScriptの型エラー（コンポーネント開発時）

**症状**: `npm run typecheck` でエラー

**対処**:
1. importパスが正しいか確認（`glpower`, `maxpower`, `orengine`のエイリアスを使用）
2. `ComponentParams` 型を使用しているか確認
3. `componentList.ts` は自動生成されるため手動編集しないこと

## Stop Conditions

以下の状況では、現在のアプローチを見直す:

- **同じAPIが3回連続失敗**: サーバー状態を確認。`GET /api/projects/:p/editor/status` でステータスチェック
- **UUIDが見つからない**: シーンツリーを再取得。別のエンティティが操作対象かもしれない
- **フィールド設定が反映されない**: コンポーネントのfieldsDirectoryを確認し、正しいパスと型を使っているか検証
- **ブラウザ連携が必要な操作でエラー**: ファイルシステム直接API（`/api/materials`, `/api/textures`等）への切り替えを検討
- **TypeScript型エラーが解消しない**: 既存コンポーネントのコードを参照して正しいパターンを確認
