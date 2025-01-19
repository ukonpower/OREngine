import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { PostProcess } from '../../PostProcess';

export class PostProcessPipeline extends Component {

	private _postProcesses: PostProcess[];
	private _resolution: GLP.Vector;

	constructor( param: ComponentParams ) {

		super( param );

		this._postProcesses = [];

		this._resolution = new GLP.Vector();

	}

	public get postProcesses() {

		return this._postProcesses;

	}

	public add( postProcess: PostProcess ) {

		this._postProcesses.push( postProcess );

		this._postProcesses.sort( ( a, b ) => a.order - b.order );

		postProcess.resize( this._resolution );

	}

	public remove( postProcess: PostProcess ) {

		const index = this._postProcesses.indexOf( postProcess );

		if ( index > - 1 ) {

			this._postProcesses.splice( index, 1 );

		}

	}

	public resize( resolution: GLP.Vector ) {

		this._resolution.copy( resolution );

		this.postProcesses.forEach( postProcess => {

			postProcess.resize( resolution );

		} );

	}

}
