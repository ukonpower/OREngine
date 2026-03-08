# OREngine Serializable フィールドシステム仕様

Serializable クラスによるフィールド登録・シリアライズ・デシリアライズの内部仕様。

**ファイル**: `packages/maxpower/Serializable/index.ts`

---

## Serializable クラス

`EventEmitter` を継承し、UUID の自動生成とフィールドシステムを提供する基底クラス。Entity と Component の両方がこれを継承する。

```
EventEmitter
  └─ Serializable
       ├─ Entity
       └─ Component
```

### 基本プロパティ

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `uuid` | `string` | 自動生成される一意識別子 |
| `initiator` | `string` | インスタンスの作成元（デフォルト: `"script"`） |

---

## フィールド登録 API

### `field<T>( path, getter, setter?, opt? )`

Serializableオブジェクトに読み書き可能なフィールドを登録する。

```typescript
// 読み書き可能
this.field( "speed", () => this._speed, v => this._speed = v );

// 読み取り専用（setter省略 → 自動で readOnly=true, noExport=true）
this.field( "children", () => this.children.map( c => c.uuid ) );

// オプション付き
this.field( "mode", () => this._mode, v => this._mode = v, {
  format: { type: "select", list: [ "auto", "manual" ] }
} );
```

**setter が省略された場合**: 自動的に `readOnly: true` と `noExport: true` が設定される。

### `fieldDir( name, opt? )`

フォルダ（ディレクトリ）を作成し、チェーンで子フィールドを登録する。

```typescript
const settings = this.fieldDir( "settings" );
settings.field( "value", () => this._value, v => this._value = v );
settings.field( "enabled", () => this._enabled, v => this._enabled = v );

// ネスト
const sub = settings.dir( "advanced" );
sub.field( "detail", () => this._detail, v => this._detail = v );
```

結果として `"settings/value"`, `"settings/enabled"`, `"settings/advanced/detail"` というフィールドパスが作られる。

### `removeField( path )`

登録済みフィールドを削除する。

---

## フィールドパス

フィールドはスラッシュ区切りのパスで識別される:

```
"name"                    → フラット
"position"                → フラット
"geometry/type"           → geometry フォルダ内の type
"geometry/width"          → geometry フォルダ内の width
"material/name"           → material フォルダ内の name
"pipeline/motionBlur/enabled" → ネストされたフォルダ
```

`serializeToDirectory()` はこのスラッシュをパースしてフォルダ構造（`SerializeFieldDirectory`）に変換する。これがエディタUIのプロパティパネルの階層表示に使われる。

---

## SerializableFieldOpt

フィールドの表示・振る舞いを制御するオプション:

| オプション | 型 | 説明 |
|-----------|-----|------|
| `isFolder` | `boolean` | フォルダとして表示（`fieldDir` が内部で使用） |
| `noExport` | `boolean` | `serialize({ mode: "export" })` 時に除外 |
| `hidden` | `boolean \| (value) => boolean` | UIで非表示。関数の場合は値に応じて動的に判定 |
| `readOnly` | `boolean` | 読み取り専用（setter がない場合自動設定） |
| `step` | `number` | 数値入力のステップ（`ValueOpt` から継承） |
| `min` / `max` | `number` | 数値入力の範囲（`ValueOpt` から継承） |
| `format` | `SerializableFieldFormat` | UI表示形式（下記参照） |

### format の種類

| type | 説明 | 追加パラメータ |
|------|------|--------------|
| `"vector"` | ベクトル入力（x, y, z, w） | なし |
| `"select"` | セレクトボックス | `list: SelectList \| (() => SelectList)` |
| `"array"` | 配列表示 | `labels?: (value, index) => string` |
| `"entity"` | エンティティ参照ドロップダウン | なし |
| `"component"` | コンポーネント参照ドロップダウン | なし |
| `"resource"` | リソース選択（material/texture/shader） | `resourceType`, `list` |

### SelectList の形式

```typescript
// 文字列配列
["auto", "manual", "custom"]

// value/label ペア
[
  { value: "spot", label: "スポットライト" },
  { value: "directional", label: "ディレクショナル" }
]
```

---

## Serialize / Deserialize

### `serialize( event? )`

全フィールドの getter を呼び出し、フラットな key-value オブジェクトを返す。

```typescript
const data = entity.serialize();
// → { name: "Cube", position: [1, 2, 3], euler: [0, 0.5, 0], scale: [1, 1, 1], ... }

const exportData = entity.serialize({ mode: "export" });
// → noExport: true のフィールドは除外される
```

**モード**:
- `"view"` (デフォルト) - 全フィールドを含む
- `"export"` - `noExport: true` のフィールドを除外

### `deserialize( props )`

key-value オブジェクトを受け取り、対応するフィールドの setter を呼び出す。

```typescript
entity.deserialize({ position: [1, 2, 3], name: "NewName" });
```

登録されていないキーは無視される。

### `setField( path, value )` / `getField<T>( path )`

単一フィールドの読み書き:

```typescript
entity.setField( "position", [1, 2, 3] );
const pos = entity.getField<number[]>( "position" );
```

`setField` は内部的に `deserialize({ [path]: value })` を呼ぶ。

### `serializeToDirectory()`

フラットなシリアライズ結果をフォルダ構造に変換する:

```typescript
const dir = component.serializeToDirectory();
// → {
//     type: "folder",
//     childs: {
//       geometry: {
//         type: "folder",
//         childs: {
//           type: { type: "value", value: "Cube", opt: { format: { type: "select", ... } } },
//           width: { type: "value", value: 1, opt: {} }
//         }
//       },
//       material: { ... }
//     }
//   }
```

**SerializeFieldDirectory の型**:

```typescript
interface SerializeFieldDirectoryFolder {
  type: "folder";
  childs: { [key: string]: SerializeFieldDirectory };
  opt?: SerializableFieldOpt;
}

interface SerializeFieldDirectoryValue {
  type: "value";
  value: SerializeFieldValue;
  opt?: SerializableFieldOpt;
}

type SerializeFieldDirectory = SerializeFieldDirectoryFolder | SerializeFieldDirectoryValue;
```

---

## イベント

フィールドの値が setter 経由で変更されると、以下のイベントが発火する:

```typescript
this.emit( "fields/update/" + path );     // 特定パスの変更通知
this.emit( "fields/update", [[ path ]] ); // 汎用変更通知（パスの配列）
```

React 側では `useWatchSerializable` フックがこれをリッスンして UI を再描画する。

---

## Entity でのフィールド登録

Entity のコンストラクタで以下のフィールドが自動登録される:

```typescript
this.field( "name", () => this.name, value => this.name = value );
this.field( "position", () => this.position.getElm( "vec3" ), value => this.position.setFromArray( value ), { format: { type: "vector" } } );
this.field( "euler", () => this.euler.getElm( "vec3" ), value => this.euler.setFromArray( value ), { format: { type: "vector" } } );
this.field( "scale", () => this.scale.getElm( "vec3" ), value => this.scale.setFromArray( value ), { format: { type: "vector" } } );
this.field( "children", () => this.children.map( c => c.uuid ), { hidden: true } );
this.field( "components", () => [...].map( c => c.uuid ), { hidden: true } );
```

## Component でのフィールド登録

Component のコンストラクタで以下が自動登録される:

```typescript
this.field( "enabled", () => this.enabled, value => this.enabled = value, { hidden: true, noExport: true } );
this.field( "tag", () => this.tag, value => this._tag = value, { readOnly: true, noExport: true, hidden: item => item == "" } );
```

各コンポーネントのサブクラスが独自のフィールドを追加する。例えば Mesh は `geometry/type`, `geometry/width`, `material/name` 等を登録する。

---

## シーンデータとの関係

`scene.json` に保存される `SceneDataComponent.props` は、コンポーネントの `serialize({ mode: "export" })` の結果に対応する。デシリアライズ時は `deserialize( props )` で復元される。

Entity の transform（position, euler, scale）は `SceneDataEntity` の `pos`, `rot`, `scale` フィールドに対応し、Entity の `deserialize()` とは別に `ProjectSerializer` で直接設定される。
