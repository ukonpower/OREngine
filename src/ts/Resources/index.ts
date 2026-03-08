
import * as MXP from 'maxpower';
import { ComponentGroup, GeometryGroup, Engine } from 'orengine';

import { COMPONENTLIST } from './_data/componentList';
import { GEOMETRYLIST } from './_data/geometryList';
import { MATERIALLIST } from './_data/materialList';
import { SHADERLIST } from './_data/shaderList';
import { TEXTURELIST } from './_data/textureList';

import { globalUniforms } from '~/ts/Globals';

type ClassList = {
	[key: string]: any
};

export const initResouces = () => {

	Engine.resources.clear();

	/*-------------------------------
		Components
	-------------------------------*/

	const builtin = Engine.resources.addComponentGroup( "_Built-in" );
	builtin.addComponent( "Light", MXP.Light );
	builtin.addComponent( "Camera", MXP.Camera );
	builtin.addComponent( "Mesh", MXP.Mesh );
	builtin.addComponent( "PostProcessPipeline", MXP.PostProcessPipeline );

	const _ = ( list: ClassList, group: ComponentGroup ) => {

		const keys = Object.keys( list );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];
			const value = list[ name ];

			if ( typeof value == "function" ) {

				group.addComponent( name, value );

			} else {

				const newGroup = group.createGroup( name );

				_( value, newGroup );

			}

		}

	};

	const rootKeys = Object.keys( COMPONENTLIST );

	for ( let i = 0; i < rootKeys.length; i ++ ) {

		const name = rootKeys[ i ];
		const value = COMPONENTLIST[ name ];

		const group = Engine.resources.addComponentGroup( name );

		_( value, group );

	}

	/*-------------------------------
		Geometries
	-------------------------------*/

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

	const geoKeys = Object.keys( GEOMETRYLIST );

	for ( let i = 0; i < geoKeys.length; i ++ ) {

		const name = geoKeys[ i ];
		const value = GEOMETRYLIST[ name ];

		const group = Engine.resources.addGeometryGroup( name );
		registerGeometries( value, group );

	}

	/*-------------------------------
		Shaders
	-------------------------------*/

	for ( let i = 0; i < SHADERLIST.length; i ++ ) {

		const s = SHADERLIST[ i ];
		Engine.resources.addShader( s.name, s.source );

	}

	if ( import.meta.hot ) {

		import.meta.hot.accept( './_data/shaderList', ( newModule ) => {

			if ( ! newModule ) return;

			for ( const s of newModule.SHADERLIST ) {

				const shader = Engine.resources.getShader( s.name );

				if ( shader ) {

					shader.updateSource( s.source );

				}

			}

		} );

	}

	/*-------------------------------
		Textures
	-------------------------------*/

	for ( let i = 0; i < TEXTURELIST.length; i ++ ) {

		const t = TEXTURELIST[ i ];
		Engine.resources.addTextureResource( t.name, {
			frag: t.frag,
			resolution: t.resolution,
			filter: t.filter,
			updateEveryFrame: t.updateEveryFrame,
		} );

	}

	/*-------------------------------
		Materials
	-------------------------------*/

	const matKeys = Object.keys( MATERIALLIST );

	for ( let i = 0; i < matKeys.length; i ++ ) {

		const name = matKeys[ i ];
		const data = MATERIALLIST[ name ];

		Engine.resources.addMaterial( name, data );

	}

	/*-------------------------------
		Mesh static callbacks
	-------------------------------*/

	MXP.Mesh.getGeometryList = () => Engine.resources.geometryList;
	MXP.Mesh.getMaterialList = () => Engine.resources.materialList;
	MXP.Mesh.getMaterialInstance = ( name ) => Engine.resources.getMaterialInstance( name );


};

export const initResourceInstances = ( glCtx: WebGL2RenderingContext ) => {

	const engine = Engine.getInstance( glCtx );

	Engine.resources.buildTextureInstances( engine.renderer, glCtx, engine.uniforms );

	Engine.resources.setGlobalUniforms( globalUniforms.time, globalUniforms.music, {
		uNoiseTex: {
			value: Engine.resources.getTexture( "noise" ),
			type: "1i"
		}
	} );

};
