
import * as MXP from 'maxpower';

import { TexProcedural } from '../OREngine/utils/TexProcedural';

import { COMPONENTLIST } from './_data/componentList';
import { Font1 } from './Fonts/Font1';
import noiseFrag from './Textures/noise.fs';

import { ComponentGroup } from '.';
import { resource, renderer, gl } from '../Globals';

type ComponentLIst = {
	[key: string]: ( ComponentLIst | ( typeof MXP.Component ) )
};


export const initResouces = () => {

	/*-------------------------------
		Components
	-------------------------------*/

	resource.clear();

	const _ = ( list: ComponentLIst, group: ComponentGroup ) => {

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

	const groupGeometry = resource.addComponentGroup( "Geomety" );
	groupGeometry.addComponent( "Cube", MXP.CubeGeometry );
	groupGeometry.addComponent( "Sphere", MXP.SphereGeometry );
	groupGeometry.addComponent( "Plane", MXP.PlaneGeometry );
	groupGeometry.addComponent( "Ring", MXP.RingGeometry );

	const light = resource.addComponentGroup( "Light" );
	light.addComponent( "Light", MXP.Light );


	const rootKeys = Object.keys( COMPONENTLIST );

	for ( let i = 0; i < rootKeys.length; i ++ ) {

		const name = rootKeys[ i ];
		const value = COMPONENTLIST[ name ];

		const group = resource.addComponentGroup( name );

		_( value, group );

	}

	/*-------------------------------
		Textures
	-------------------------------*/

	resource.addTexture( "noise", new TexProcedural( renderer, {
		frag: noiseFrag,
	} ) );

	/*-------------------------------
		Fonts
	-------------------------------*/

	resource.addFont( new Font1( gl ) );

};
