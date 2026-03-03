
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

	// Built-in

	const builtin = Engine.resources.addComponentGroup( "_Built-in" );
	builtin.addComponent( "Light", MXP.Light );
	builtin.addComponent( "Camera", MXP.Camera );
	builtin.addComponent( "Mesh", MXP.Mesh );
	builtin.addComponent( "PostProcessPipeline", MXP.PostProcessPipeline );

	// Custom

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

	const rootKeys = Object.keys( COMPONENTLIST );

	for ( let i = 0; i < rootKeys.length; i ++ ) {

		const name = rootKeys[ i ];
		const value = COMPONENTLIST[ name ];

		const group = Engine.resources.addComponentGroup( name );

		_( value, group );

	}

};
