import { useMemo } from "react";

import { Block } from "../../components/ui/Block";
import { useOREditor } from "../OREditor/hooks/useOREditor";
import { SerializeFieldView } from "../SerializableField/components/SerializeFieldView";
import { useSerializableField } from "../SerializableField/hooks/useSerializableProps";

import { ComponentAdd } from "./components/ComponentAdd";
import { ComponentList } from "./components/ComponentList";


export const EntityProperty = () => {

	const { editor: gui, engine } = useOREditor();

	const [ selectedEntityId ] = useSerializableField<string>( gui, "selectedEntityId" );

	const selectedEntity = useMemo( () => {

		if ( ! selectedEntityId ) return undefined;

		return engine.root.findEntityByUUID( selectedEntityId );

	}, [ engine, selectedEntityId ] );

	if ( ! selectedEntity ) return null;

	return <>
		<Block label="Fields" accordion>
			<SerializeFieldView target={selectedEntity} />
		</Block>
		<Block label="Components" accordion>
			<ComponentList entity={selectedEntity}/>
			<ComponentAdd entity={selectedEntity} />
		</Block>
	</>;

};
