import { Vector } from 'mathpower';

export declare interface LerpFunc<T>{
	( a: T, b: T, t: number ): T;
}

export const lerpNumber: LerpFunc<number> = ( a: number, b: number, t: number ) => {

	return a + ( b - a ) * t;

};

export const lerpVector: LerpFunc<Vector> = ( a: Vector, b: Vector, t: number ) =>{

	return a.lerp( b, t );

};
