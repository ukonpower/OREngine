import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../../ts/Engine';
import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { useOREditor } from '../../../../hooks/useOREditor';
import { ComponentIcon } from '../../../Icons/ComponentIcon';
import { FolderIcon } from '../../../Icons/FolderIcon';
import { MaterialIcon } from '../../../Icons/MaterialIcon';
import { ShaderIcon } from '../../../Icons/ShaderIcon';
import { TextureIcon } from '../../../Icons/TextureIcon';
import { Picker } from '../../../Picker';

import { AssetEntry, AssetFolder, AssetItem } from '..';

import style from './index.module.scss';

type AssetGridProps = {
	entries: AssetEntry[];
	selected: AssetItem | null;
	onNavigate: ( folder: AssetFolder ) => void;
	onSelect: ( item: AssetItem ) => void;
};

export const AssetGrid = ( { entries, selected, onNavigate, onSelect }: AssetGridProps ) => {

	const { engine } = useOREditor();
	const { pushContent, closeAll } = useMouseMenu();
	const [ , setPreviewVersion ] = useState( 0 );

	const onClick = useCallback( ( entry: AssetEntry ) => {

		if ( entry.type === "item" ) {

			onSelect( entry );

		} else {

			onNavigate( entry );

		}

	}, [ onSelect, onNavigate ] );

	const onContextMenu = useCallback( ( e: MouseEvent, entry: AssetEntry ) => {

		e.preventDefault();

		if ( entry.type !== "item" || ! pushContent || ! closeAll ) return;

		const item = entry;
		const menuItems = buildContextMenu( item, closeAll );

		pushContent( <Picker label={item.name} list={menuItems} /> );

	}, [ pushContent, closeAll ] );

	useEffect( () => {

		const previewMgr = engine.assetPreviewManager;
		const onUpdate = () => {

			previewMgr.invalidateAll();
			setPreviewVersion( ( v ) => v + 1 );

		};

		Engine.resources.on( "update", onUpdate );
		Engine.resources.on( "update/texture", onUpdate );

		return () => {

			Engine.resources.off( "update", onUpdate );
			Engine.resources.off( "update/texture", onUpdate );

		};

	}, [ engine ] );

	return <div className={style.grid}>
		{entries.map( ( entry, i ) => (

			<div
				key={`${entry.type}-${entry.name}-${i}`}
				className={style.gridItem}
				data-type={entry.type}
				data-asset-type={entry.type === "item" ? entry.assetType : undefined}
				data-selected={entry.type === "item" && selected === entry}
				onClick={() => onClick( entry )}
				onContextMenu={( e ) => onContextMenu( e, entry )}
			>
				<div className={style.gridItem_icon}>
					{entry.type === "folder"
						? <FolderIcon assetType={entry.assetType} />
						: getAssetIcon( entry.assetType, entry, engine )}
				</div>
				<div className={style.gridItem_name}>
					{entry.name}
				</div>
			</div>

		) )}
	</div>;

};

function getAssetIcon( assetType: string, entry: AssetItem, engine: Engine ): ReactNode {

	const previewMgr = engine.assetPreviewManager;

	if ( assetType === "texture" ) {

		const preview = previewMgr.getTexturePreview( entry.name );
		if ( preview ) return <img src={preview} className={style.gridItem_preview} />;

	}

	if ( assetType === "material" ) {

		const preview = previewMgr.getMaterialPreview( entry.name );
		if ( preview ) return <img src={preview} className={style.gridItem_preview} />;

	}

	switch ( assetType ) {

		case "component": return <ComponentIcon />;
		case "material": return <MaterialIcon />;
		case "shader": return <ShaderIcon />;
		case "texture": return <TextureIcon />;
		default: return null;

	}

}

function getApiPath( item: AssetItem ): string | null {

	switch ( item.assetType ) {

		case "material":
			return `/api/materials/${encodeURIComponent( item.name )}`;
		case "shader":
			return `/api/shaders/${encodeURIComponent( item.data.name )}`;
		case "texture":
			return `/api/textures/${encodeURIComponent( item.name )}`;
		case "component":
			return item.path ? `/api/components/${encodeURIComponent( item.path )}` : null;
		default:
			return null;

	}

}

function deleteAsset( item: AssetItem ) {

	switch ( item.assetType ) {

		case "material":
			Engine.resources.removeMaterial( item.name );
			break;
		case "texture":
			Engine.resources.removeTextureResource( item.name );
			break;
		case "shader":
			fetch( `/api/shaders/${encodeURIComponent( item.data.name )}`, { method: 'DELETE' } );
			break;
		case "component":
			if ( item.path ) {

				fetch( `/api/components/${encodeURIComponent( item.path )}`, { method: 'DELETE' } );

			}

			break;

	}

}

function buildContextMenu( item: AssetItem, closeAll: () => void ) {

	const list: { label: string, onClick: () => void }[] = [];

	const apiPath = getApiPath( item );

	if ( apiPath ) {

		list.push( {
			label: "Open in Editor",
			onClick: () => {

				fetch( `${apiPath}/filepath` )
					.then( r => r.json() )
					.then( data => {

						if ( data.absolutePath ) {

							window.open( `vscode://file/${data.absolutePath}`, '_blank' );

						}

					} );

				closeAll();

			},
		} );

	}

	list.push( {
		label: "Delete",
		onClick: () => {

			if ( ! confirm( `Delete "${item.name}"?` ) ) {

				closeAll();
				return;

			}

			deleteAsset( item );
			closeAll();

		},
	} );

	return list;

}
