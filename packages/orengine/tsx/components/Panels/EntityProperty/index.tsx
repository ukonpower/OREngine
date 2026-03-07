import { useMemo } from "react";

import { Engine } from "../../../../ts/Engine";
import { SelectedAssetInfo } from "../../../../ts/Editor";
import { useOREditor } from "../../../hooks/useOREditor";
import { useSerializableField } from "../../../hooks/useSerializableProps";
import { Block } from "../../Block";
import { SerializeFieldView } from "../../SerializeFieldView";
import { ComponentDetail } from "../ComponentExplorer/ComponentDetail";

import { ComponentAdd } from "./ComponentAdd";
import { ComponentList } from "./ComponentList";
import style from './index.module.scss';


export const EntityProperty = () => {

	const { editor: gui, engine } = useOREditor();

	const [ propertyTarget ] = useSerializableField<"entity" | "asset">( gui, "propertyTarget" );
	const [ selectedEntityId ] = useSerializableField<string>( gui, "selectedEntityId" );
	const [ selectedAsset ] = useSerializableField<SelectedAssetInfo>( gui, "selectedAsset" );

	const selectedEntity = useMemo( () => {

		if ( ! selectedEntityId ) return undefined;

		return engine.findEntityByUUID( selectedEntityId );

	}, [ engine, selectedEntityId ] );

	if ( propertyTarget === "entity" && selectedEntity ) {

		return <div className={style.container}>
			<Block label="Fields" accordion>
				<SerializeFieldView target={selectedEntity} />
			</Block>
			<Block label="Components" accordion>
				<ComponentList entity={selectedEntity}/>
				<ComponentAdd entity={selectedEntity} />
			</Block>
		</div>;

	}

	if ( propertyTarget === "asset" && selectedAsset ) {

		return <div className={style.container}>
			<AssetPropertyView asset={selectedAsset} />
		</div>;

	}

	return null;

};

const AssetPropertyView = ( { asset }: { asset: SelectedAssetInfo } ) => {

	if ( ! asset ) return null;

	switch ( asset.assetType ) {

		case "material": {

			const resource = Engine.resources.getMaterial( asset.name );
			if ( ! resource ) return null;

			return <Block label={`Material: ${asset.name}`} accordion>
				<SerializeFieldView target={resource} />
			</Block>;

		}

		case "texture": {

			const resource = Engine.resources.getTextureResource( asset.name );
			if ( ! resource ) return null;

			return <Block label={`Texture: ${asset.name}`} accordion>
				<SerializeFieldView target={resource} />
			</Block>;

		}

		case "component": {

			const item = Engine.resources.getComponent( asset.name );
			if ( ! item ) return null;

			return <Block label={`Component: ${asset.name}`} accordion>
				<ComponentDetail item={item} componentPath={asset.path} />
			</Block>;

		}

		case "shader":
			return <Block label={`Shader: ${asset.name}`} accordion>
				<p style={{ padding: 5, fontSize: 10, color: '#777' }}>
					Open in external editor to edit shader source.
				</p>
			</Block>;

		default:
			return null;

	}

};
