import * as GLP from 'glpower';

import { Serializable } from '../Serializable';

import type { Backend, BackendBuffer, BackendVAO } from '../Backend';

type Attribute = {
	array: GLP.TArrayBuffer;
	size: number;
	buffer?: BackendBuffer
	opt?: GLP.AttributeOptions,
}

type DefaultAttributeName = 'position' | 'uv' | 'normal' | 'index';

export class Geometry extends Serializable {

	public vertCount: number;
	public attributes: Map<string, Attribute >;
	public vaoCache: Map<BackendVAO, boolean>;
	public boundingBox: { min: GLP.Vector, max: GLP.Vector } | null;

	constructor() {

		super();

		this.vertCount = 0;
		this.attributes = new Map();
		this.vaoCache = new Map();
		this.boundingBox = null;

	}

	public setAttribute( name: DefaultAttributeName | ( string & {} ), array: GLP.TArrayBuffer, size: number, opt?: GLP.AttributeOptions ) {

		const currentAttr = this.attributes.get( name );

		if ( currentAttr && currentAttr.buffer ) {

			currentAttr.buffer.dispose();

		}

		this.attributes.set( name, {
			array,
			size,
			opt,
		} );

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

	public createBuffers( backend: Backend ) {

		this.attributes.forEach( ( attr, key ) => {

			if ( ! attr.buffer ) {

				attr.buffer = backend.createBuffer().setData( attr.array, key == 'index' ? "ibo" : 'vbo', attr.opt && attr.opt.usage );

			}

		} );

	}

	public computeBoundingBox() {

		const posAttr = this.attributes.get( 'position' );

		if ( ! posAttr ) {

			this.boundingBox = null;
			return;

		}

		const positions = posAttr.array as Float32Array;
		const min = new GLP.Vector( Infinity, Infinity, Infinity );
		const max = new GLP.Vector( - Infinity, - Infinity, - Infinity );

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

		this.vaoCache.clear();

	}

	public dispose() {

		this.attributes.forEach( ( attr ) => {

			attr.buffer?.dispose();

		} );

	}

}
