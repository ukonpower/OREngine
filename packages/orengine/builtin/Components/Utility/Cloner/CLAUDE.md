# Cloner

### Cloner（テンプレートの複製）
- builtin コンポーネント `Cloner`（`packages/orengine/builtin/Components/Utility/Cloner/`）。付けたエンティティの直下にある user の子すべてを1セットのテンプレートとして、並べ方の数だけ実行時に複製する。テンプレートは描かない（`renderHidden`）。複製は保存しない
- 実行時の構造: Cloner のエンティティの下に持ち場 `ClonerSlot`（script・`editorHidden`、名前は `<親の名前>#<番号>`）を並べ、その下にテンプレートの複製（`cloneEntity`。`cloneSource` が元のエンティティ）を置く。持ち場の位置・回転・大きさが並べ方の持ち場なので、テンプレートの position などは「持ち場からのずれ」になる
- 時間差: `ClonerSlot` は子に渡す event の `timeCodeFrame` / `timeCode` を遅らせる（`delay/loop` が ON ならタイムラインの長さで折り返す）。Animation も時刻で動くコンポーネントも改修なしで遅れ、入れ子の Cloner では遅れが足される。シェーダーのグローバルの `uTime` は遅れない
- フィールド: `layout`（並べ方）/ `params/<名前>`（並べ方の数値。並べ方を切り替えるとフィールドごと入れ替わる）/ `delay/order`（layout / index / center / x / y / z / random）/ `delay/spread`（最初と最後の複製の遅れの差、秒）/ `delay/loop` / `jitter/position` / `jitter/rotation` / `jitter/scale` / `jitter/seed`。計算は `Cloner/slots.ts` の `computeSlots`（純関数）
- テンプレートの同期: テンプレート配下の user のエンティティ・コンポーネントの `fields/update` を、対応する複製へ `setField` で写す。テンプレートの Animation がリンクしているフィールドは写さない（複製の Animation が遅れた時刻で入れる）。子・コンポーネントの増減は複製を作り直す。ほかの Cloner のテンプレートの中にある Cloner は複製を作らない（コピーされた側が作る）
- 並べ方: `ClonerLayout`（`Cloner/layout.ts`。型は `orengine/builtin` から import する）= `{ params, count( params ), place( index, count, params ) → { position, rotation?, scale?, order? } }`。ライブラリの種類 `ClonerLayouts` として、builtin は `packages/orengine/builtin/Library/ClonerLayouts/<名前>/index.ts`（Grid / Line / Circle / Sphere / Random）、プロジェクトは `<projectDir>/Resources/Library/ClonerLayouts/<名前>/index.ts` に `export default` で置く（同名はプロジェクトが上書き）。`order` を返すと `delay/order: layout` でその順に動き出す（返さなければ番号順）
- player ビルドは、シーンの Cloner が使う並べ方だけを焼き込む（`Cloner/player.ts` がライブラリの参照を返す。ルートの CLAUDE.md の「ライブラリ」の節）
- エディタ: 複製はヒエラルキー・ルートからの走査（`Entity.traverseEditable`）・シーン CLI に出ない。ビューポートで複製をクリックすると `cloneSource` を選ぶ
- 数の目安は数百まで（複製は普通のエンティティなので1個ずつ描画される）。それ以上はコンポーネント内のインスタンシングで作る
