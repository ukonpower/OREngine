
export const gauss = ( x: number, x0: number, sx: number ) => {

	let arg = x - x0;
	arg = - 1. / 2. * arg * arg / sx;

	const a = 1. / ( Math.sqrt( 2. * 3.1415 * sx ) );

	return a * Math.exp( arg );

};

export const gaussWeights = ( length: number ) => {

	return new Array( length ).fill( 0 ).map( ( _, i ) => {

		if ( length == 0 ) return 1;

		const w = ( i - 1 ) / length;

		return gauss( w, 0.0, 0.5 );

	} );

};
