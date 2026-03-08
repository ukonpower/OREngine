# ADR-003: Entity-Component継承階層

## ステータス
承認済み

## コンテキスト
3Dエンジンのシーングラフとコンポーネントシステムを設計するにあたり、以下の要件があった:
- EntityとComponentの両方がシリアライズ/デシリアライズ可能であること（シーン保存・復元）
- EntityとComponentの両方がイベントを発火・受信できること（状態変更通知）
- エディタUIがEntityとComponentの両方のフィールドを統一的に表示・編集できること

## 決定
`EventEmitter → Serializable → Entity / Component` の継承階層を採用する。Serializableがフィールドシステム（field/fieldDir/serialize/deserialize）を提供し、EntityとComponentの両方がこれを継承する。

## 理由
- EntityのtransformフィールドもComponentの設定フィールドも、同じfield()APIで登録・シリアライズできる
- エディタUIのSerializeFieldViewコンポーネントが、EntityでもComponentでも同一のロジックでプロパティパネルを描画できる
- EventEmitterを最基底にすることで、フィールド変更通知（"fields/update"イベント）がEntityとComponentの両方で使える
- 代替案「EntityとComponentにそれぞれシリアライズ機能を実装」は重複コードが多く、UIの統一的な扱いが困難

## 結果
- 1つのEntityに同じクラスのコンポーネントは1つだけ（Mapのキーがクラス）
- コンポーネントはorderプロパティでソートされ、update実行順が決まる
- UUIDはSerializableレベルで自動生成されるため、Entity・Component・その他全てのSerializableが一意に識別可能

## 関連コード
- `packages/glpower/packages/glpower/src/utils/EventEmitter/index.ts` - EventEmitter
- `packages/maxpower/Serializable/index.ts` - Serializable
- `packages/maxpower/Entity/index.ts` - Entity
- `packages/maxpower/Component/index.ts` - Component
