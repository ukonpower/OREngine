# エディタ拡張・フィールド UI・コンポーネントパネル

### エディタ拡張（`<projectDir>/editor/`）
プロジェクト側からエディタにパネルと API route を足すためのディレクトリ。任意（無くてもよい）。player ビルドのエントリ（`host/app/src/player.ts`）からは辿られないので、ここに何を置いても packed サイズには影響しない（eslint-plugin-boundaries でも player.ts からの import を禁止している）。

- `editor/Panels/<名前>/index.tsx` に `export const panel: PanelDefinition` を置くと、パネルのタブ「+」の一覧に出る。自動認識は `host/app/src/editorPanels.ts` の `import.meta.glob`。先頭が `_` のディレクトリは対象外
- `PanelDefinition` の `category`（`"Tools/Debug"` のような `/` 区切り）を書くと、タブ追加メニューでその階層のサブメニューに入る。省略時はメニューのルート直下。タブ名は `title` のまま
- `editor/server.ts` の default export（`EditorServerExtension`）に express の `Router` が渡され、足した route が `/api/ext/*` に生える。組み込み route の後にマウントされる。node 側は tsx 経由で動くので `.ts` のまま読み込まれる。変更の反映には dev サーバーの再起動が必要
- パネルからは `useOREditor()` で `editor` / `engine` に触れる（選択中エンティティの参照、フィールドの更新など）
- サンプルは `demo-webgl/editor/`（選択中エンティティ名の表示と `/api/ext/hello` の呼び出し）

### フィールド UI（`Resources/Components/**/editor.tsx`）
コンポーネントのフィールドごとに、プロパティパネルの表示を自作の React UI（canvas 含む）に差し替える仕組み。将来のビューポート上のギズモ（コンポーネント側からの3D操作）も同じ `editor.tsx` に足す想定（#157）。

- コンポーネントの `index.ts` の隣に `editor.tsx` を置き、`export const fieldUIs = defineFieldUIs( クラス, { フィールドパス: UI部品 } )` を書く。自動認識は `host/app/src/editorFieldUIs.ts` の `import.meta.glob`（エディタのエントリからだけ辿るので player には入らない）。`index.ts` から `editor.tsx` を import すると eslint-plugin-boundaries でエラーになる（demo-webgl / demo-webgpu の `Resources/**/*.ts` を runtime に分類している）
- 受け渡し: `EditorPage` / `EditorPageStatic` の `fieldUIs` → `OREditor` → `OREditorProvider` の context → `SerializeFieldViewValue` が `findFieldUI`（クラスの完全一致 + パス）で引いて、既定の入力の代わりに描く。型と `defineFieldUIs` は `packages/orengine/editor/features/OREditor/lib/fieldUI.ts`
- 並べ方: 部品だけ渡すと `inline`（既定の入力と同じくラベルの右）。canvas のプレビューなど幅の要る UI は `{ ui: 部品, layout: 'block' }` でラベルの下に行いっぱいに出す
- 見た目は uipower の部品（`Button` の `active` / `square`、`ArrowIcon` の `direction`、`InputNumber` 等）と、デザイントークン（`packages/uipower/styles/_globals.scss` の `var(--or-*)`。余白は `--or-space`、角丸は `--or-radius`、文字は `--or-font-*`）で組み、生の px や色を書かない。スタイルは `editor.tsx` の隣の `*.module.scss` に置ける。外部プロジェクトから `uipower` を import するときは、tsconfig の `paths` に `uipower` を足す（vite 側の alias は host が持っている）
- UI 部品は `FieldUIProps<T>`（`value` / `setValue` / `beginEdit` / `target` / `path` / `opt` / `engine` / `editor`）を受け取るただの React 部品。import でコンポーネント間で再利用する（名前の登録表は無い）
- `useEditorFrame( cb )`: `Editor._animate` の最後に出す `frame` イベントを購読する hook。canvas の描画をエディタのフレームに揃える
- `editor.api.beginEdit( target, path )` → `set` / `commit` / `cancel`: `set` は値を反映するだけで、`commit` で開始時からの変化を SetFieldCommand 1つ（`merge: false`）として積む。`setField` の自動まとめは時間基準（500ms）なので、ドラッグの途中で手を止めると undo が分かれる。それを避けるための窓口
- `CommandManager` は `merge: false` で積んだコマンドに、後続のコマンドをまとめない（確定済みの編集・CLI の `set` に直後の GUI 操作が混ざらないように）

### コンポーネントパネル（`Resources/Components/**/editor.tsx` の `panel`）
特定のコンポーネント専用のパネル。フィールド UI では狭い編集画面（大きな canvas 等）をタブとして置くための仕組み。

- `editor.tsx` で `export const panel = defineComponentPanel( クラス, { id, title, category?, ui } )` を書く。自動認識は `host/app/src/editorPanels.ts` の `import.meta.glob`（`editor/Panels/` と同じ `projectPanels` にまとめて `OREditor` の `panels` へ渡す）。型と `defineComponentPanel` は `packages/orengine/editor/features/OREditor/lib/componentPanel.tsx`
- 中身は `features/OREditor/features/ComponentPanel`: アクティブなエンティティ（`selectedEntityId`）から `entity.getComponent( クラス )`（クラスの完全一致）で引き、`ComponentPanelProps`（`target` / `entity` / `engine` / `editor`）を渡して `Panel` の中に描く。持っていなければ空の表示。コンポーネントの追加・削除は entity の `components` の更新通知で描き直す
- UI は `key={component.uuid}` で描くので、選択が別のコンポーネントに移ると state は作り直される

```tsx
// <projectDir>/editor/Panels/Sample/index.tsx
import { useState } from 'react';

import { type PanelDefinition } from 'orengine/react';
import { Button, Panel } from 'uipower';

const Sample = () => {

	const [ message, setMessage ] = useState( '' );

	const run = async () => {

		const res = await fetch( '/api/ext/hello' );
		const data = await res.json();
		setMessage( data.message );

	};

	return <Panel><Button onClick={run}>Run</Button>{message}</Panel>;

};

export const panel: PanelDefinition = { id: 'sample', title: 'Sample', category: 'Tools', content: <Sample /> };
```

```ts
// <projectDir>/editor/server.ts
import type { EditorServerExtension } from 'orengine/server';

const extension: EditorServerExtension = ( router, ctx ) => {

	router.get( '/hello', ( _req, res ) => {

		// ctx.projectDir 配下でファイルを読む・子プロセスを起動する等
		res.json( { message: ctx.projectDir } );

	} );

};

export default extension;
```
