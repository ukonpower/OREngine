# トラブルシューティング

## サーバー未起動

**症状**: `curl: (7) Failed to connect to localhost port 3001: Connection refused`

**対処**:
1. `npm run dev` で開発サーバーを起動
2. 起動完了まで待つ（通常数秒）
3. `curl -sf http://localhost:3001/api/projects` で接続確認

## ブラウザ未接続時の制限

エディタがブラウザで開かれていない場合、一部機能に制限がある:

| 機能 | ブラウザ接続時 | ブラウザ未接続時 |
|------|-------------|---------------|
| エンティティCRUD | OK | OK（scene.json直接操作） |
| フィールド設定 | OK | OK（scene.json直接操作） |
| バッチ操作 | OK | OK（scene.json直接操作） |
| マテリアル/テクスチャ作成（Editor経由） | OK | 制限あり |
| Undo/Redo | OK | 不可 |
| Save | OK（ブラウザ同期後保存） | OK（scene.json直接保存） |

**対処**: シーン操作の基本機能はブラウザなしでも動作する。マテリアル管理が必要な場合はブラウザでエディタを開く。

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
1. `GET /api/projects/:p/editor/entity/:uuid/component/:name` でコンポーネントの `fieldsDirectory` を確認
2. `path` はフィールドのキーと完全一致が必要（例: `"geometry/type"` であって `"geometryType"` ではない）
3. 値の型を確認（number[3] が必要なフィールドに string を渡していないか等）

## 保存に失敗する

**症状**: `POST /editor/save` でエラー

**対処**:
1. プロジェクトが存在するか確認: `GET /api/projects`
2. プロジェクト名が正しいか確認
3. ブラウザ接続中に保存する場合、ブラウザ側でエラーが出ていないか確認

## Stop Conditions

以下の状況では、現在のアプローチを見直す:

- **同じAPIが3回連続失敗**: サーバー状態を確認。`GET /api/projects/:p/editor/status` でステータスチェック
- **UUIDが見つからない**: シーンツリーを再取得。別のエンティティが操作対象かもしれない
- **フィールド設定が反映されない**: コンポーネントのfieldsDirectoryを確認し、正しいパスと型を使っているか検証
- **ブラウザ連携が必要な操作でエラー**: ファイルシステム直接API（`/api/materials`, `/api/textures`等）への切り替えを検討
