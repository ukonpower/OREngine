
import * as MXP from 'maxpower';
import { ComponentGroup, Engine } from 'orengine';

import { COMPONENTLIST } from './_data/componentList';

type ComponentLIst = {
	[key: string]: ( ComponentLIst | ( typeof MXP.Component ) )
};

export const initResouces = () => {

	/*-------------------------------
		Components
	-------------------------------*/

	Engine.resources.clear();

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

	const light = Engine.resources.addComponentGroup( "Light" );
	light.addComponent( "Light", MXP.Light );

	const rootKeys = Object.keys( COMPONENTLIST );

	for ( let i = 0; i < rootKeys.length; i ++ ) {

		const name = rootKeys[ i ];
		const value = COMPONENTLIST[ name ];

		const group = Engine.resources.addComponentGroup( name );

		_( value, group );

	}

};
