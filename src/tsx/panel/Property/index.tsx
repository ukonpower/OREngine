import { useMemo } from "react";
import { useOREngineGUI } from "~/tsx/components/OREngineGUI";
import { useSerializableField } from "~/tsx/hooks/useSerializableProps";

export const Property = () => {

	const {gui, engine } = useOREngineGUI()

	const [ selectedEntity ] = useSerializableField<string>( gui, "selectedEntityId" );

	const entity = useMemo(() => {
			
		if( !selectedEntity ) {

			return null;

		}
		
		return engine.findEntityById(selectedEntity)

	},[engine, selectedEntity])

	return entity?.name

};
