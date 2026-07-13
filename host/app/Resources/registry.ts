import * as MXP from 'maxpower';
import { ComponentGroup, GeometryGroup, Engine, BUILTIN_COMPONENTLIST, BUILTIN_GEOMETRYLIST, buildClassTree } from 'orengine';

type TexModule = {
	name: string;
	frag?: string;
	resolution?: number[];
	filter?: string;
	updateEveryFrame?: boolean;
} | null;

const componentModules = import.meta.glob( [ '@or-resources/Components/**/index.ts', '!**/_*/**' ], { eager: true } );
const geometryModules = import.meta.glob( [ '@or-resources/Geometries/**/index.ts', '!**/_*/**' ], { eager: true } );
const texModules = import.meta.glob<TexModule>( [ '@or-resources/Textures/**/*.tex', '!**/_*', '!**/_*/**' ], { eager: true, import: 'default' } );

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

// .tex モジュール（TexLoaderプラグインがビルド時にfragを解決済み）を登録する
const registerTextures = () => {

	for ( const tex of Object.values( texModules ) ) {

		if ( ! tex ) continue;

		Engine.resources.addTextureResource( tex.name, {
			frag: tex.frag,
			resolution: tex.resolution || [ 1024, 1024 ],
			filter: tex.filter,
			updateEveryFrame: tex.updateEveryFrame,
		} );

	}

};

export const initResouces = () => {

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

	registerTextures();

};

export const initResourceInstances = ( engine: Engine ) => {

	Engine.resources.buildTextureInstances( engine.renderer, engine.gl, engine.uniforms );

};

if ( import.meta.hot ) {

	import.meta.hot.accept( ( newModule ) => {

		newModule?.initResouces?.();
		Engine.resources.emit( "update" );

	} );

}
