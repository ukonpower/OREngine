import { useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../ts/Engine';
import { useOREditor } from '../../../hooks/useOREditor';
import { ComponentCreateForm } from '../ComponentExplorer/ComponentCreateForm';
import { MaterialCreateForm } from '../MaterialExplorer/MaterialCreateForm';
import { ShaderCreateForm } from '../ShaderExplorer/ShaderCreateForm';
import { TextureCreateForm } from '../TextureExplorer/TextureCreateForm';

import { AssetGrid } from './AssetGrid';
import { AssetBreadcrumb } from './AssetBreadcrumb';
import { buildEntries } from './buildEntries';
import style from './index.module.scss';

export type AssetType = "component" | "material" | "shader" | "texture";

export type AssetFolder = {
	type: "folder";
	name: string;
	assetType?: AssetType;
};

export type AssetItem = {
	type: "item";
	name: string;
	assetType: AssetType;
	data: any;
	path?: string;
};

export type AssetEntry = AssetFolder | AssetItem;

export const AssetViewer = () => {

	const { editor } = useOREditor();
	const [ currentPath, setCurrentPath ] = useState<string[]>( [] );
	const [ selected, setSelected ] = useState<AssetItem | null>( null );
	const [ , setUpdateCount ] = useState( 0 );

	useEffect( () => {

		const onUpdate = () => setUpdateCount( c => c + 1 );
		Engine.resources.on( "update", onUpdate );
		return () => { Engine.resources.off( "update", onUpdate ); };

	}, [] );

	const entries = buildEntries( currentPath );

	const onNavigate = useCallback( ( folder: AssetFolder ) => {

		setCurrentPath( prev => [ ...prev, folder.name ] );
		setSelected( null );
		editor.setField( "selectedAsset", null );

	}, [ editor ] );

	const onNavigateTo = useCallback( ( pathIndex: number ) => {

		setCurrentPath( prev => prev.slice( 0, pathIndex ) );
		setSelected( null );
		editor.setField( "selectedAsset", null );

	}, [ editor ] );

	const onSelect = useCallback( ( item: AssetItem ) => {

		setSelected( item );
		editor.setField( "selectedAsset", {
			name: item.name,
			assetType: item.assetType,
			path: item.path,
		} );

	}, [ editor ] );

	const getCreateForm = () => {

		if ( currentPath.length === 0 ) return null;

		switch ( currentPath[ 0 ] ) {

			case "Components":
				return <ComponentCreateForm />;
			case "Materials":
				return <MaterialCreateForm />;
			case "Shaders":
				return <ShaderCreateForm />;
			case "Textures":
				return <TextureCreateForm />;
			default:
				return null;

		}

	};

	return <div className={style.assetViewer}>
		<div className={style.toolbar}>
			<AssetBreadcrumb path={currentPath} onNavigate={onNavigateTo} />
			{getCreateForm()}
		</div>
		<div className={style.content}>
			<AssetGrid
				entries={entries}
				selected={selected}
				onNavigate={onNavigate}
				onSelect={onSelect}
			/>
		</div>
	</div>;

};
