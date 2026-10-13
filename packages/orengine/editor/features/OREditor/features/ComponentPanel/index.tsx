import { useMemo } from 'react';

import * as MXP from 'maxpower';
import { Panel } from 'uipower';

import { useOREditor } from '../../hooks/useOREditor';
import { useSerializableField } from '../SerializableField/hooks/useSerializableProps';
import { useWatchSerializable } from '../SerializableField/hooks/useWatchSerializable';

import style from './index.module.scss';

import type { ComponentPanelUI } from '../../lib/componentPanel';

type ComponentPanelProps = {
	target: abstract new ( ...args: any[] ) => MXP.Component;
	ui: ComponentPanelUI;
	title: string;
};

// アクティブなエンティティから target クラスのコンポーネントを引き、ui に渡して描く
export const ComponentPanel = ( { target, ui: UI, title }: ComponentPanelProps ) => {

	const { editor, engine } = useOREditor();

	const [ selectedEntityId ] = useSerializableField<string>( editor, "selectedEntityId" );

	const entity = useMemo( () => {

		if ( ! selectedEntityId ) return undefined;

		return engine.root.findEntityByUUID( selectedEntityId );

	}, [ engine, selectedEntityId ] );

	// コンポーネントの追加・削除（undo を含む）で描き直すために購読する
	useWatchSerializable( entity, [ "components" ] );

	// フィールド UI と同じくクラスの完全一致で引く（components の Map のキーがクラスそのもの）
	const component = entity?.getComponent( target as typeof MXP.Component );

	if ( ! entity || ! component ) {

		return <Panel>
			<p className={style.empty}>Select an entity with {title}</p>
		</Panel>;

	}

	return <Panel>
		<UI key={component.uuid} target={component} entity={entity} engine={engine} editor={editor} />
	</Panel>;

};
