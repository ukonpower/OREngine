import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { PostProcess } from '../../PostProcess';

export class PostProcessPipeline extends Component {

	private _resolution: GLP.Vector;
	private _postProcesses: PostProcess[];

	constructor( param: ComponentParams ) {

		super( param );

		this._postProcesses = [];
		this._resolution = new GLP.Vector();

	}

	public get postProcesses() {

		return this._postProcesses;

	}

	public add<T extends PostProcess>( newPostProcess: T ) {

		this.postProcesses.push( newPostProcess );

		newPostProcess.resize( this._resolution );

		return newPostProcess;

	}

	public remove( postProcess: PostProcess ) {

		const index = this._postProcesses.indexOf( postProcess );

		if ( index > - 1 ) {

			this._postProcesses.splice( index, 1 );

		}

	}

	public resize( resolution: GLP.Vector ) {

		this._resolution.copy( resolution );

		this.resizePostProcesses();

	}

	private resizePostProcesses() {

		this.postProcesses.forEach( postProcess => {

			postProcess.resize( this._resolution );

		} );

	}

}
