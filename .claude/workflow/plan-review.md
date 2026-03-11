# Plan Review (Codex)

レビュー日時: 2026-03-11

## 方針の評価

方針自体は「接続中はブラウザ委譲、未接続時は ProjectData を直接編集」で**概ね妥当**。ただし「ブラウザ状態の継続同期」の設計が甘く、そこで要件未達になる。

## 良い点
- SceneDataEditor の実装方針自体は正しい
- ブラウザ接続中はWS委譲を維持する判断は適切

## 懸念点・リスク（5つの重大な問題）

### 1. ブラウザ手動編集のハンドオフが抜けている（根幹の見落とし）
- 計画ではWS委譲後に `syncRequest` でProjectDataを同期するが、**ブラウザで手動編集してそのまま閉じた場合**、サーバーに最新状態が渡らない
- API経由の操作後にしか syncRequest が走らないため、「ブラウザで手動調整→ブラウザ閉じる→API続行」のフローで手動調整分が消失する
- **対策**: ブラウザ側 CommandManager の change イベントからデバウンス付きでサーバーへpush同期する

### 2. UUID方式が間違っている
- 計画では `crypto.randomUUID()` を使うとしているが、実際のUUIDは `GLP.ID.genUUID()` = `00000000`, `00000001`... の**単調増加8桁hex**
- ランダムUUIDを使うと既存データとの衝突や再現性崩れを招く
- **対策**: ProjectData側にhex allocatorを持たせ、既存sceneの最大UUID値から次番を振る

### 3. 再接続時のstatePushでは削除が反映されない
- 現在の `ProjectSerializer.deserializeEntity()` はコンポーネントの追加・更新のみで、「存在しなくなったコンポーネント」を消さない
- `childs` もプロパティが無いと既存子を消さない
- **対策**: 再接続時は差分適用ではなく `Engine.load()` 相当のフルリロードを行う

### 4. オフライン時のレスポンス形式が完全互換にならない
- ブラウザの `getEntity` / `getComponentDetail` は `serialize()` / `serializeToDirectory()` で完全なフィールド情報を返す
- scene.jsonにはexport対象の `props` のみしかなく、デフォルト値やdirectory情報が欠落
- **対策**: オフライン時は `getComponentDetail` を503のまま、`getEntity.components[].fields` は export済み props のみと明示する

### 5. コンポーネント一覧・操作の互換性不足
- built-inの `Light`, `Camera`, `Mesh` が `scanComponentTree` に含まれない
- `addComponent` はブラウザ側では同クラス既存分を削除して置換する動作だが、サーバー側は単純な `push` になっている
- `getResources` / material / texture 系アクションが `handleActionLocal` に含まれていない

## 方針レベルの代替案

Codexの修正提案:
1. **SceneDataEditorの対象を最小集合に絞る**: `getScene`, `create/deleteEntity`, `add/removeComponent`, `setField`, `searchEntities` のみ
2. **ブラウザ→サーバー同期をpush方式に変更**: `requestSync` のpullではなく、ブラウザ側 `CommandManager.change` からのデバウンスpush
3. **再接続時はフルリロード**: `dirty:boolean` より `revision` 管理にし、statePushではフルリロード相当を行う
4. **UUID**: 単調増加hex allocatorを `ProjectData` 側に持たせる
5. **API契約の明確化**: オフライン時は一部のアクションが利用不可・レスポンスが限定的であることを明示

## 追加で必要なテスト
- ブラウザで手動編集のみ実施して閉じ、API 継続後に状態が失われないこと
- ページ再読み込みなしの WS 再接続で removeComponent / 削除が正しく反映されること
- 同一コンポーネントを 2 回追加したときに重複せず置換になること
- UUID が既存最大値から連番で増えること
