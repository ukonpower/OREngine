import * as MXP from 'maxpower';
import { useContext, useEffect, useState } from "react";

import { Panel } from "../../ui/Panel";

import { HierarchyNode } from './HierarchyNode';

import { GLContext } from '~/ts/gl/useGL';

export const Hierarchy = () => {

	const [ rootEntity, setRoot ] = useState <MXP.Entity>();

	const { gl } = useContext( GLContext );

	useEffect( () => {

		if ( gl ) {

			setTimeout( () => {

				setRoot( gl.scene.root );

			}, 1000 );

		}

	}, [ gl ] );

	return <Panel title="Hierarchy" >
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</Panel>;

};
