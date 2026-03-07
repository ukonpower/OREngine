import { ComponentGroup, ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';

import { Engine } from '../../../../ts/Engine';

import { AssetEntry, AssetFolder, AssetItem } from '.';

const ROOT_FOLDERS: AssetFolder[] = [
	{ type: "folder", name: "Components", assetType: "component" },
	{ type: "folder", name: "Materials", assetType: "material" },
	{ type: "folder", name: "Shaders", assetType: "shader" },
	{ type: "folder", name: "Textures", assetType: "texture" },
];

export function buildEntries( currentPath: string[] ): AssetEntry[] {

	if ( currentPath.length === 0 ) return ROOT_FOLDERS;

	const rootFolder = currentPath[ 0 ];

	switch ( rootFolder ) {

		case "Components":
			return buildComponentEntries( currentPath.slice( 1 ) );
		case "Materials":
			return buildMaterialEntries( currentPath.slice( 1 ) );
		case "Shaders":
			return buildShaderEntries( currentPath.slice( 1 ) );
		case "Textures":
			return buildTextureEntries( currentPath.slice( 1 ) );
		default:
			return [];

	}

}

function buildComponentEntries( subPath: string[] ): AssetEntry[] {

	const groups = Engine.resources.componentGroups;

	let currentGroups: ( ComponentGroup | ResouceComponentItem )[] = groups;

	for ( const seg of subPath ) {

		const found = currentGroups.find( g => g.name === seg );

		if ( found && 'child' in found ) {

			currentGroups = ( found as ComponentGroup ).child;

		} else {

			return [];

		}

	}

	const entries: AssetEntry[] = [];

	for ( const item of currentGroups ) {

		if ( 'child' in item ) {

			entries.push( { type: "folder", name: item.name } );

		} else {

			const ci = item as ResouceComponentItem;
			const fullPath = [ ...subPath, ci.name ].join( "/" );
			entries.push( {
				type: "item", name: ci.name,
				assetType: "component", data: ci,
				path: fullPath,
			} );

		}

	}

	return entries;

}

function buildMaterialEntries( subPath: string[] ): AssetEntry[] {

	if ( subPath.length > 0 ) return [];

	return Engine.resources.materialList.map( ( m ): AssetItem => ( {
		type: "item", name: m.name,
		assetType: "material", data: m,
	} ) );

}

function buildShaderEntries( subPath: string[] ): AssetEntry[] {

	const shaders = Engine.resources.shaderList;
	const entries: AssetEntry[] = [];
	const folderSet = new Set<string>();

	for ( const shader of shaders ) {

		const parts = shader.name.split( "/" );

		if ( subPath.length === 0 ) {

			const folderName = parts[ 0 ];

			if ( ! folderSet.has( folderName ) ) {

				folderSet.add( folderName );
				entries.push( { type: "folder", name: folderName } );

			}

		} else if ( parts[ 0 ] === subPath[ 0 ] && parts.length > 1 ) {

			entries.push( {
				type: "item", name: parts.slice( 1 ).join( "/" ),
				assetType: "shader", data: shader,
			} );

		}

	}

	return entries;

}

function buildTextureEntries( subPath: string[] ): AssetEntry[] {

	if ( subPath.length > 0 ) return [];

	return Engine.resources.textureList.map( ( t ): AssetItem => ( {
		type: "item", name: t.name,
		assetType: "texture", data: t,
	} ) );

}
