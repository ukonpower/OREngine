import * as BSP from 'basepower';
import * as MTP from 'mathpower';

import { Serializable } from '../Serializable';

// バックエンド非依存のattributeオプション。webgl側の GLP.AttributeOptions と構造互換
export type AttributeOptions = {
	instanceDivisor?: number;
	usage?: number;
}

type Attribute = {
	array: BSP.TArrayBuffer;
	size: number;
	opt?: AttributeOptions,
}

type DefaultAttributeName = 'position' | 'uv' | 'normal' | 'index';

export class Geometry extends Serializable {

	public vertCount: number;
	public attributes: Map<string, Attribute >;
	public boundingBox: { min: MTP.Vector, max: MTP.Vector } | null;

	// GPUリソース（バッファ/VAO）はRenderer側が所有し、この番号の変化で再構築を検知する
	public updateVersion: number;

	constructor() {

		super();

		this.vertCount = 0;
		this.attributes = new Map();
		this.boundingBox = null;
		this.updateVersion = 0;

	}

	public setAttribute( name: DefaultAttributeName | ( string & {} ), array: BSP.TArrayBuffer, size: number, opt?: AttributeOptions ) {

		this.attributes.set( name, {
			array,
			size,
			opt,
		} );

		this.updateVersion ++;

		this.updateVertCount();

		if ( name === 'position' ) {

			this.computeBoundingBox();

		}

		return this;

	}

	public getAttribute( name: DefaultAttributeName | ( string & {} ) ) {

		return this.attributes.get( name );

	}

	private updateVertCount() {

		this.vertCount = this.attributes.size > 0 ? Infinity : 0;

		this.attributes.forEach( ( attribute, name ) => {

			if ( name == 'index' || attribute.opt && attribute.opt.instanceDivisor ) return;

			this.vertCount = Math.min( attribute.array.length / attribute.size, this.vertCount );

		} );

	}

	public computeBoundingBox() {

		const posAttr = this.attributes.get( 'position' );

		if ( ! posAttr ) {

			this.boundingBox = null;
			return;

		}

		const positions = posAttr.array as Float32Array;
		const min = new MTP.Vector( Infinity, Infinity, Infinity );
		const max = new MTP.Vector( - Infinity, - Infinity, - Infinity );

		for ( let i = 0; i < positions.length; i += 3 ) {

			const x = positions[ i ];
			const y = positions[ i + 1 ];
			const z = positions[ i + 2 ];

			if ( x < min.x ) min.x = x;
			if ( y < min.y ) min.y = y;
			if ( z < min.z ) min.z = z;
			if ( x > max.x ) max.x = x;
			if ( y > max.y ) max.y = y;
			if ( z > max.z ) max.z = z;

		}

		this.boundingBox = { min, max };

	}

	public requestUpdate() {

		this.updateVersion ++;

	}

}
