import * as GLP from 'glpower';

import { Component, ComponentParams } from "..";
import { SerializableProps } from '../../Serializable';

export type GeometryParam = {
}

type Attribute = {
	array: GLP.TArrayBuffer;
	size: number;
	buffer?: GLP.GLPowerBuffer
	opt?: GLP.AttributeOptions,
}

type DefaultAttributeName = 'position' | 'uv' | 'normal' | 'index';


export class Geometry extends Component {

	public vertCount: number;
	public attributes: Map<string, Attribute >;
	public vaoCache: Map<GLP.GLPowerVAO, boolean>;

	constructor( params?: ComponentParams ) {

		super( params );

		this.vertCount = 0;
		this.attributes = new Map();
		this.vaoCache = new Map();

	}

	public static get tag() {

		return "geometry";

	}


	public getProps(): SerializableProps | null {

		return {
			vertCount: {
				value: this.vertCount,
				opt: {
					readOnly: true,
					precision: 1
				},
			}
		};

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

	public createBuffers( gl: WebGL2RenderingContext ) {

		this.attributes.forEach( ( attr, key ) => {

			if ( ! attr.buffer ) {

				attr.buffer = new GLP.GLPowerBuffer( gl ).setData( attr.array, key == 'index' ? "ibo" : 'vbo', attr.opt && attr.opt.usage );

			}

		} );

	}

	public requestUpdate() {

		this.vaoCache.clear();

	}

	public dispose() {

		super.dispose();

		this.attributes.forEach( ( attr ) => {

			attr.buffer?.dispose();

		} );

	}

}
