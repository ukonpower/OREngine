import * as MXP from '@or-renderer';
import { BUILTIN_COMPONENTLIST, BUILTIN_GEOMETRYLIST } from 'orengine/builtin';

import { ComponentGroup, GeometryGroup, Engine, buildClassTree } from 'orengine';

import { registerProjectTextures, initResourceInstances } from './registryCommon';

const componentModules = import.meta.glob( [ '@or-resources/Components/**/index.ts', '!**/_*/**' ], { eager: true } );
const geometryModules = import.meta.glob( [ '@or-resources/Geometries/**/index.ts', '!**/_*/**' ], { eager: true } );

type ClassList = {
	[key: string]: any
};

const registerComponents = ( list: ClassList, group: ComponentGroup ) => {

	const keys = Object.keys( list );

	for ( let i = 0; i < keys.length; i ++ ) {

		const name = keys[ i ];
		const value = list[ name ];

		if ( typeof value == "function" ) {

			group.addComponent( name, value );

		} else {

			const newGroup = group.createGroup( name );

			registerComponents( value, newGroup );

		}

	}

};

const registerGeometries = ( list: ClassList, group: GeometryGroup ) => {

	const keys = Object.keys( list );

	for ( let i = 0; i < keys.length; i ++ ) {

		const name = keys[ i ];
		const value = list[ name ];

		if ( typeof value === "function" ) {

			group.addGeometry( name, value as typeof MXP.Geometry );

		} else {

			const newGroup = group.createGroup( name );
			registerGeometries( value, newGroup );

		}

	}

};

export const initResouces = () => {

	MXP.BLidge.gltfLoaderFactory = ( engine ) => new MXP.GLTFLoader( engine );

	Engine.resources.clear();

	/*-------------------------------
		Built-in Components
	-------------------------------*/

	const builtin = Engine.resources.addComponentGroup( "_Built-in" );
	builtin.addComponent( "Light", MXP.Light );
	builtin.addComponent( "Camera", MXP.Camera );
	builtin.addComponent( "Mesh", MXP.Mesh );

	const builtinCompKeys = Object.keys( BUILTIN_COMPONENTLIST );

	for ( let i = 0; i < builtinCompKeys.length; i ++ ) {

		const name = builtinCompKeys[ i ];
		const value = BUILTIN_COMPONENTLIST[ name ];

		const group = Engine.resources.addComponentGroup( name );

		registerComponents( value, group );

	}

	/*-------------------------------
		Built-in Geometries
	-------------------------------*/

	const builtinGeoKeys = Object.keys( BUILTIN_GEOMETRYLIST );

	for ( let i = 0; i < builtinGeoKeys.length; i ++ ) {

		const name = builtinGeoKeys[ i ];
		const value = BUILTIN_GEOMETRYLIST[ name ];

		const group = Engine.resources.addGeometryGroup( name );
		registerGeometries( value, group );

	}

	/*-------------------------------
		Project Components
	-------------------------------*/

	const COMPONENTLIST = buildClassTree( componentModules, 'Components' );
	const rootKeys = Object.keys( COMPONENTLIST );

	for ( let i = 0; i < rootKeys.length; i ++ ) {

		const name = rootKeys[ i ];
		const value = COMPONENTLIST[ name ];

		const group = Engine.resources.addComponentGroup( name );

		registerComponents( value, group );

	}

	/*-------------------------------
		Project Geometries
	-------------------------------*/

	const GEOMETRYLIST = buildClassTree( geometryModules, 'Geometries' );
	const geoKeys = Object.keys( GEOMETRYLIST );

	for ( let i = 0; i < geoKeys.length; i ++ ) {

		const name = geoKeys[ i ];
		const value = GEOMETRYLIST[ name ];

		const group = Engine.resources.addGeometryGroup( name );
		registerGeometries( value, group );

	}

	/*-------------------------------
		Textures
	-------------------------------*/

	registerProjectTextures();

};

export { initResourceInstances };
