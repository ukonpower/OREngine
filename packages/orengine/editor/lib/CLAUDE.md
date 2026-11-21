# 点の編集の部品・エディタの選択と親の付け替え

### 点の編集の部品（`orengine/editor`）
カーブエディタ（タイムラインのキー）と、フィールド UI の点エディタ（ORShorts の PathStroke のパスなど）で共有する、Blender の右クリック選択に合わせた点の操作。点を何で表すか・点の座標をどう書き換えるかは使う側が持ち、部品は選び方・ドラッグの判別・G / R / S の量の計算だけを受け持つ。

- 編集領域（`Editor.enterEditArea( actions )` / `leaveEditArea( actions )`）: ポインタが領域の上にある間、Delete / X・Ctrl+C・Ctrl+V・G / R / S・Shift+D・B・A / Alt+A・Home・W・Esc（`deselect`。選択を外す）を `EditAreaActions` へ回す。メンバーはどれも任意で、持っていない操作のキーは何もしない（ビューポートへも渡さない。点エディタの上の X でエンティティが消えないように）。領域の `pointerenter` / `pointerleave` で呼び、領域が消えるときにも `leaveEditArea` する
- モーダル（`Editor.beginEditModal( modal )` / `endEditModal( modal )`）: 続いている間は、ポインタの位置によらずキーボードを先に受ける（`EditModal.handleKeyDown` が true を返したら消費）。順番は 編集領域のモーダル → 編集領域の上での G / R / S → ビューポートのモーダル変形
- ビューポートの G / R / S（`ModalTransformHandler`）は、ポインタがビューポートの上にあるとき（`Viewport.hovered`）だけ始まる。プロパティパネル等の上で押しても選択中のエンティティは動かない（I キーと同じ扱い）
- `PointTransformModal`: 2D の点の G / R / S。`mapping`（点の座標 ↔ 画面の px）の上で回転・伸縮を計算し、点ごとの行き先の関数 `( point, owner ) => point` を `onChange` に渡す（`owner` は点の属する点。`individual` ならそれを中心に回す）。`axes: "x"` で横にだけ動かす。X / Y の拘束・数値入力、左クリック / Enter で確定、右クリック / Esc で取り消し。作った側が `beginEditModal` で登録し、`onConfirm` / `onCancel` で外す
- `PointerDrag`（`uipower`。`trackPointerDrag` / `dragRect` / `suppressNextContextMenu`）: 押してから離すまでを追い、3px 動くまではクリックとして扱う。右クリックで取り消した操作の後のメニューを止める。uipower の InputNumber（Vector・ValueArray も）とエディタのドラッグで共有する
  - 押した位置からのずれで動かすドラッグ（数値入力の横ドラッグ、Timeline・カーブ表示・キー表示の中ボタンのパン・拡大縮小）は `lock: true`（閾値の後で取るかを決める側は返り値の `lock()`）で Pointer Lock を取り、カーソルを隠して画面端で止まらないようにする。ロック中のずれは movementX / Y を積む。マウス以外・ブラウザに断られたときは clientX / Y の差分のまま続く。ロックは `document.documentElement` の1か所で取り、使っているドラッグが無くなったら外す（Timeline の中ボタンは横を親、縦を子が同じ押下で追うため）
  - `onCancel` を渡すと、押している間の右クリック / Esc / ロックの外れで取り消す（ロック中の Esc はブラウザがロックの解除に使うので、外れたことで受ける）
  - カーソルの下の物を操作するドラッグ（時刻合わせ・矩形選択・キーのドラッグ・ギズモ・G / R / S）はロックしない
- `PointSelection`: 選択は ID の文字列の `Set`。`pressSelection`（右ボタンで押したときの選び方。Shift で足し引き・アクティブ）/ `boxSelection`（矩形選択の結果）/ `isAllSelected`。`BoxSelectWait` は B の後の左ドラッグ1回を矩形選択にする待機で、作ると編集モーダルとして登録され、右クリック・Esc・領域外の左クリック・`end()` で終わる

### エディタの選択と親の付け替え
- 選択は Blender と同じく「選んでいるものの集合＋アクティブ1つ」。editor.json の `selectedEntityIds`（選んだ順）と `selectedEntityId`（アクティブ）に保存する。アクティブは必ず集合に入っている（`Editor` の2つのフィールドの setter が保つ）。窓口は `Editor.selectEntity`（それ1つにする）/ `setSelection` / `toggleEntitySelection`、読むのは `selectedEntities` / `activeEntity`
- 1つだけを相手にする操作（Property パネル・キーの挿入・Timeline の KeyEditor・フォーカス `.`・F2）はアクティブを見る。削除（X）・複製（Shift+D）・G / R / S・ギズモ・親の付け替えは集合を見る。集合を見る操作は、祖先も選ばれているものを外してから扱う（`TransformTargets` の `topmostEntities`。親と一緒に動く・消える・移るため）
- 操作: ビューポートは右クリックで選択、Shift+右クリックで足す・アクティブにする・外す（選んでいてアクティブでなければアクティブにする。Blender の 3D ビューと同じ）。Esc は、ポインタがビューポートの上ならエディタカメラをシーンカメラに合わせ、編集領域（キー・帯・ノート等）の上ならその領域の選択を、それ以外（Hierarchy・Property など）の上ならエンティティの選択を外す。Hierarchy はクリックで選択、Ctrl / Cmd+クリックでビューポートの Shift と同じ足し引き、Shift+クリックでアクティブから押した行までの範囲選択（見えている行の並び。アクティブは変えない）
- 複数の変形: `TransformTargets`（`editor/lib/TransformTargets`）が G / R / S とギズモの共通の土台。中心はワールド位置の平均（Blender の Median Point）、ローカル軸はアクティブのワールド回転。スケールは各エンティティの `scale` の成分に掛け、中心からのずれをアクティブの軸で伸ばす。確定で変わったフィールドを `GroupCommand` にして undo 1回。ギズモは `GizmoTarget`（中心と向き）の上に置き、ドラッグの変化量（移動量・回転・倍率）を返す
- 親の付け替え: Hierarchy の行のドラッグ（選んでいる行ならその選択ごと、選んでいない行ならその行だけ。落とした行の子になる）、Ctrl+P（選んでいるものをアクティブの子に）、Alt+P（root の直下へ）、CLI の `reparent`。どれも `EditorAPI.reparentEntities` → `ReparentEntityCommand`（複数でも undo 1回）で、ワールド座標を保つ（新しい親の逆行列でローカルへ落とし、`TransformUtils` の `decomposeMatrix` で position / euler / scale に分ける。`MTP.Matrix.decompose` はスケールを求めないので使わない）。回転した子を非一様スケールの親から出し入れするとせん断が乗り、TRS では厳密に保てない（位置は保つ）。移した先の兄弟と名前がぶつかれば `uniqueEntityName` で採番する
  - 移せないもの（`EditorAPI.getReparentError`。Hierarchy のドラッグ中は落とせる行だけを枠で示す）: root / script 由来のエンティティ（生成したコンポーネントが持ち主で保存されない）/ Cloner の持ち場・複製（`editorHidden` の部分木）/ 自分自身か子孫の下 / script 由来のエンティティの下（`ProjectSerializer` が script の子を書き出さないので保存で消える）/ 複製の下。Cloner 本体の下へは入れられる（テンプレートになり描かれなくなる）
  - `position` / `euler` / `scale` にキーが打たれていると、ワールド座標を保つよう書き換えても時刻が変わると Animation がキーの値を入れ直す。GUI は message、CLI は `warning` で知らせる
- 親子の点線（Blender の Relationship Lines）: ビューポートで、子の原点から親の原点まで灰色の点線を引く（root の直下・非表示・Cloner のテンプレートには引かない）。Screen のオーバーレイの Relationships（`viewports/<id>/helpers/relationships`）で切り替える。実装は `editor/lib/RelationshipLineRenderer`。点の数ごとの形状を作り置きし、線ごとに画面上の長さから数を選んで伸ばす（毎フレーム頂点を作り直すと GPU のバッファも作り直しになるため）
