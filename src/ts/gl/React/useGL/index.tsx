import { createContext, useEffect, useState } from 'react';

import { GL } from '~/ts/gl';

export const GLContext = createContext<HooksContext<typeof useGL>>( {} );

export const useGL = () => {

	const [ gl, setGL ] = useState<GL>();

	useEffect( () => {

		const gl = new GL();
		setGL( gl );

		return () => {

			gl.dispose();

		};

	}, [] );

	return {
		gl
	};

};
