const rawTextPattern = /\.(?:fs|vs|glsl)(?:\?.*)?$/;

export const load = async ( url, context, nextLoad ) => {

	if ( rawTextPattern.test( url ) ) {

		return {
			format: 'module',
			shortCircuit: true,
			source: 'export default "";',
		};

	}

	return nextLoad( url, context );

};
