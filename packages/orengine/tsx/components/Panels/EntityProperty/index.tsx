import { useMemo } from "react";

import { ComponentAdd } from "./ComponentAdd";
import { ComponentList } from "./ComponentList";
import style from './index.module.scss';

import { useOREngineGUI } from "~/tsx/components/OREngineGUI";
import { useSerializableField } from "~/tsx/hooks/useSerializableProps";
import { Block } from "~/tsx/ui/Block";
import { SerializableFieldView } from "~/tsx/ui/SerializableFieldView";

export const EntityProperty = () => {

	const { gui, engine } = useOREngineGUI();

	// entity

	const [ selectedEntityId ] = useSerializableField<string>( gui, "selectedEntityId" );

	const selectedEntity = useMemo( () => {

		if ( ! selectedEntityId ) {

			return undefined;

		}

		return engine.findEntityById( selectedEntityId );

	}, [ engine, selectedEntityId ] );

	if ( ! selectedEntity ) {

		return null;

	}

	return <div className={style.container}>
		<Block label="Fields" accordion>
			<SerializableFieldView target={selectedEntity} />
		</Block>
		<Block label="Components" accordion>
			<ComponentList entity={selectedEntity}/>
			<ComponentAdd entity={selectedEntity} />
		</Block>
	</div>;

};
