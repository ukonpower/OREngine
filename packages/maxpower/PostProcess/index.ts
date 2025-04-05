import * as GLP from 'glpower';

import { Serializable } from '../Serializable';

import { PostProcessPass } from './PostProcessPass';

export type PostProcessParams = {
	name?: string,
	passes?: PostProcessPass[]
}

export class PostProcess extends Serializable {

	public name: string;
	public enabled: boolean;
	protected _passes: PostProcessPass[];

	constructor( params?: PostProcessParams ) {

		super();

		const p = params || {};
		this.name = p.name || "";
		this.enabled = true;
		this._passes = params && params.passes || [];

	}

	public get passes() {

		return this._passes;

	}

	public get hasOutput() {

		return this._passes.length > 0 && this._passes.some( pass=>pass.enabled );

	}

	public get output() {

		for ( let i = this._passes.length - 1; i >= 0; i -- ) {

			const pass = this._passes[ i ];

			if ( ! pass.passThrough && pass.enabled ) {

				return pass.renderTarget;

			}

		}

		return null;

	}

	public resize( resolution: GLP.Vector ): void {

		if ( ! this._passes ) return;

		for ( let i = 0; i < this._passes.length; i ++ ) {

			this._passes[ i ].resize( resolution );

		}

	}

	public dispose() {

		this.emit( "dispose" );

	}

}
