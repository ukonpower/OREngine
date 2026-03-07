import { useCallback } from "react";

import { Engine } from "../../../../ts/Engine";
import { SelectedAssetInfo } from "../../../../ts/Editor";
import { useOREditor } from "../../../hooks/useOREditor";
import { useSerializableField } from "../../../hooks/useSerializableProps";
import { Block } from "../../Block";
import { SerializeFieldView } from "../../SerializeFieldView";
import { ComponentDetail } from "../ComponentExplorer/ComponentDetail";

import style from './index.module.scss';


export const AssetProperty = () => {

	const { editor: gui } = useOREditor();
	const [ selectedAsset ] = useSerializableField<SelectedAssetInfo>( gui, "selectedAsset" );

	const onClose = useCallback( () => {

		gui.setField( "selectedAsset", null );

	}, [ gui ] );

	if ( ! selectedAsset ) return null;

	return <div className={style.container}>
		<div className={style.header}>
			<span className={style.header_title}>{selectedAsset.assetType}: {selectedAsset.name}</span>
			<button className={style.header_close} onClick={onClose}>✕</button>
		</div>
		<div className={style.content}>
			<AssetPropertyView asset={selectedAsset} />
		</div>
	</div>;

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
