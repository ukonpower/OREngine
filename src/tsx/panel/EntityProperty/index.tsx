import { useMemo } from "react";

import { ComponentView } from "./ComponentView";
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

			return null;

		}

		return engine.findEntityById( selectedEntityId );

	}, [ engine, selectedEntityId ] );

	// componentView

	const componentViewList = useMemo( () => {

		const componentViewList: React.ReactNode[] = [];

		if ( ! selectedEntity ) {

			return null;

		}

		selectedEntity.components.forEach( component => {

			componentViewList.push(
				<ComponentView component={component} />
			);

		} );

		return componentViewList;

	}, [ selectedEntity ] );

	if ( ! selectedEntity ) {

		return null;

	}

	return <div className={style.container}>
		<SerializableFieldView target={selectedEntity}/>
		<Block label="Components">
			{componentViewList}
		</Block>
	</div>;

};
