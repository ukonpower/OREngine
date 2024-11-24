import { useMemo } from "react";
import { useOREngineGUI } from "~/tsx/components/OREngineGUI";
import { useSerializableField } from "~/tsx/hooks/useSerializableProps";

import style from './index.module.scss'
import { SerializableFieldView } from "~/tsx/ui/SerializableFieldView";

export const Property = () => {

	const {gui, engine } = useOREngineGUI()

	const [ selectedEntity ] = useSerializableField<string>( gui, "selectedEntityId" );

	const entity = useMemo(() => {
			
		if( !selectedEntity ) {

			return null;

		}
		
		return engine.findEntityById(selectedEntity)

	},[engine, selectedEntity])

	if( !entity ) {

		return null
		
	}
	
	return <div className={style.container}>
		<SerializableFieldView  target={entity}/>
	</div>

};
