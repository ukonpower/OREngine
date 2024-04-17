
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

export const randomSeed = ( s: number ) => {

	// Xorshift128 (init seed with Xorshift32)
	s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
	let x = 123456789 ^ s;
	s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
	let y = 362436069 ^ s;
	s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
	let z = 521288629 ^ s;
	s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
	let w = 88675123 ^ s;
	let t;

	const random = () => {

		t = x ^ ( x << 11 );
		x = y; y = z; z = w;
		// >>>0 means 'cast to uint32'
		w = ( ( w ^ ( w >>> 19 ) ) ^ ( t ^ ( t >>> 8 ) ) ) >>> 0;
		return w / 0x100000000;

	};

	return random;

};
