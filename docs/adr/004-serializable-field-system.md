# ADR-004: Serializableフィールドシステム

## ステータス
承認済み

## コンテキスト
Entity・Componentの状態をシリアライズ（保存）・デシリアライズ（復元）する仕組みが必要。さらにエディタUIでプロパティパネルとして表示・編集するためのメタ情報（型、範囲、表示形式等）も管理する必要があった。

## 決定
getter/setter方式のフィールド登録API（`field(path, getter, setter, opt)`）を採用する。パスはスラッシュ区切り（`"geometry/type"`）で、フラットなkey-valueとしてシリアライズされる。UIではserializeToDirectory()でフォルダ構造に変換して階層表示する。

## 理由
- getter/setter方式により、内部のデータ表現（privateフィールド）とシリアライズ表現を分離できる。例: 内部はVector3オブジェクトだが、シリアライズは`[x,y,z]`配列
- スラッシュ区切りパスにより、JSON上ではフラットだがUI上では階層表示できる。REST APIからのフィールド操作も`"geometry/type"`のような直感的なパスで指定できる
- フィールドオプション（format, hidden, readOnly等）により、同じフィールド定義からエディタUIを自動生成できる
- setterが省略された場合は自動的にreadOnly/noExportになるため、表示専用フィールドの定義が簡潔
- 代替案「デコレータ方式」はTypeScriptの実験的機能への依存が必要で、ランタイムでの動的フィールド追加が困難

## 結果
- フィールド変更時に"fields/update"イベントが発火し、React側のuseWatchSerializableフックがUIを再描画する
- scene.jsonに保存されるSceneDataComponent.propsは、serialize({mode:"export"})の結果に対応する
- CommandManager（Undo/Redo）はsetField経由でフィールドを操作するため、全てのフィールド変更がUndo対象になる

## 関連コード
- `packages/maxpower/Serializable/index.ts` - Serializableクラス（field, fieldDir, serialize, deserialize, serializeToDirectory）
- `packages/orengine/tsx/components/SerializeFieldView/index.tsx` - フィールドのUI自動生成
- `packages/orengine/tsx/hooks/useWatchSerializable/index.ts` - フィールド変更監視フック
