import { useOREngineGUI } from "~/tsx/components/OREngineGUI";
import { useSerializableField } from "~/tsx/hooks/useSerializableProps";

export const Property = () => {

	const {editor} = useOREngineGUI()

	const [ selectedEntity ] = useSerializableField<string>( editor, "selectedEntityId" );

	console.log(selectedEntity);
	
	return null

};
