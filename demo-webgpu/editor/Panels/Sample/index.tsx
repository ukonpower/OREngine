import { useState } from 'react';

import { useOREditor, useSerializableField, type PanelDefinition } from 'orengine/react';
import { Block, Button, Panel } from 'uipower';

// プロジェクト側エディタ拡張のサンプル。選択中エンティティ名の表示と、editor/server.ts が生やした route の呼び出し
const Sample = () => {

	const { editor, engine } = useOREditor();
	const [ selectedEntityId ] = useSerializableField<string>( editor, 'selectedEntityId' );
	const [ message, setMessage ] = useState( '' );

	const selectedEntity = selectedEntityId ? engine.root.findEntityByUUID( selectedEntityId ) : undefined;

	const callHello = async () => {

		// 静的ビルド（editor:build）ではサーバーが無いので失敗する
		try {

			const res = await fetch( '/api/ext/hello' );
			const data = await res.json();
			setMessage( data.message );

		} catch {

			setMessage( 'failed' );

		}

	};

	return <Panel>
		<Block label="Selected Entity">{selectedEntity ? selectedEntity.name : '-'}</Block>
		<Block label="Server">
			<Button onClick={callHello}>GET /api/ext/hello</Button>
			{message && <p>{message}</p>}
		</Block>
	</Panel>;

};

export const panel: PanelDefinition = { id: 'sample', title: 'Sample', category: 'Tools', content: <Sample /> };
