import { EventEmitter, UniformType } from 'basepower';

import { Vector } from "../Math/Vector";

import { EasingFunc, easeInOutCubic } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";

export type AnimatorVariableType = Vector | number;

export declare interface AnimatorVariable<T>{
	time: number;
	duration: number;
	value: T;
	type: UniformType;
	valueStart: T;
	valueEnd: T;
	easingFunc: EasingFunc;
	lerpFunc: LerpFunc<T>;
	animating: boolean
	onFinish?: () => void,
	userData?: any;
}

const getClone = ( target: AnimatorVariableType ) => {

	if ( typeof target == "number" ) {

		return target;

	} else if ( "clone" in target ) {

		return target.clone();

	}

	return target;

};

const getCopy = ( target: AnimatorVariableType, source:AnimatorVariableType ) => {

	if ( typeof target == "number" ) {

		return source;

	} else if ( "clone" in target && typeof source != 'number' ) {

		return target.copy( source );

	}

	return source;

};

const getLerpFunc = <T extends AnimatorVariableType>( value: T ):LerpFunc<T> => {

	if ( typeof value == "number" ) {

		return Lerps.number as any;

	} else {


		return Lerps.vector as any;

	}

};

const getUniformsType = ( value: AnimatorVariableType ) => {

	if ( typeof value == 'number' ) {

		return "1f";

	} else {

		return "4fv";

	}

};

export class Animator extends EventEmitter {

	protected variables: Map<string, AnimatorVariable<AnimatorVariableType>>;

	constructor() {

		super();

		this.variables = new Map();

	}

	public add( name: string, init: AnimatorVariableType, easing: EasingFunc = easeInOutCubic, type?: UniformType ) {

		this.variables.set( name, {
			time: 0,
			duration: 1,
			value: init,
			valueStart: getClone( init ),
			valueEnd: getClone( init ),
			easingFunc: easing,
			lerpFunc: getLerpFunc( init ),
			animating: false,
			type: getUniformsType( init ) || type,
		} );

	}

	public get<T extends AnimatorVariableType>( name: string ): AnimatorVariable<T> | null {

		return this.variables.get( name ) ?? null as any;

	}

	public getValue<T extends AnimatorVariableType>( name: string ): T | null {

		const val = this.get<T>( name );

		if ( val === null ) return null;

		return val.value;

	}

	public setValue<T extends AnimatorVariableType>( name: string, value: T ) {

		const val = this.get<T>( name );

		if ( val === null ) return null;

		val.value = value;

		return val.value;

	}

	public cancel( name: string ) {

		const v = this.variables.get( name );

		if ( ! v ) return;

		v.animating = false;

	}

	public animate( name: string, value: AnimatorVariableType, duration: number = 1, cb?: () => void ) {

		const v = this.variables.get( name );

		if ( ! v ) return;

		v.animating = true;
		v.valueStart = getCopy( v.valueStart, v.value );
		v.valueEnd = getCopy( v.valueEnd, value );
		v.duration = duration;
		v.onFinish = cb;
		v.time = 0;

		if ( duration === 0 ) {

			v.animating = false;
			v.value = getCopy( v.value, value );
			if ( v.onFinish ) v.onFinish();

		}

	}

	public update( deltaTime: number ) {

		this.variables.forEach( v => {

			if ( ! v.animating ) return;

			if ( v.time >= 1.0 ) {

				v.animating = false;
				v.time = 1.0;

			}

			v.value = getCopy( v.value, v.valueStart );
			v.value = v.lerpFunc( v.value, v.valueEnd, v.easingFunc( v.time ) );
			v.time += deltaTime / v.duration;

			if ( v.animating == false ) {

				if ( v.onFinish ) v.onFinish();

			}

		} );

	}

}
