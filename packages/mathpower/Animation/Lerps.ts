import { Vector } from "../Math/Vector";

export declare interface LerpFunc<T>{
	( a: T, b: T, t: number ): T;
}

export namespace Lerps {

	export const number: LerpFunc<number> = ( a: number, b: number, t: number ) => {

		return a + ( b - a ) * t;

	};

	export const vector: LerpFunc<Vector> = ( a: Vector, b: Vector, t: number ) =>{

		return a.lerp( b, t );

	};

}
