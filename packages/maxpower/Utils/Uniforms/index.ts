import { Uniforms } from "glpower";

export namespace UniformsUtils {

	export const assign = ( target: Uniforms, ...uniforms: ( Uniforms|undefined )[] ) : Uniforms => {

		for ( let i = 0; i < uniforms.length; i ++ ) {

			if ( uniforms[ i ] != undefined ) {

				Object.assign( target, uniforms[ i ] );

			}

		}

		return target;

	};

	export const merge = ( ...uniforms: ( Uniforms|undefined )[] ) : Uniforms => {

		const res = {};

		return assign( res, ...uniforms );

	};

}
