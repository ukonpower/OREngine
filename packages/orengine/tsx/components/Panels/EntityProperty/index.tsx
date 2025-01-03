import { useMemo } from "react";

import { useOREditor } from "../../../hooks/useOREditor";
import { useSerializableField } from "../../../hooks/useSerializableProps";
import { Block } from "../../Block";
import { SerializableFieldView } from "../../SerializableFieldView";

import { ComponentAdd } from "./ComponentAdd";
import { ComponentList } from "./ComponentList";
import style from './index.module.scss';


export const EntityProperty = () => {

	const { editor: gui, engine } = useOREditor();

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
