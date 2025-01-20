import { get } from 'http';

import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { PostProcess } from '../../PostProcess';

export class PostProcessPipeline extends Component {

	private _resolution: GLP.Vector;
	private _postProcesses: PostProcess[];
	private _postProcessesDict: Map<typeof PostProcess, PostProcess>;

	constructor( param: ComponentParams ) {

		super( param );

		this._postProcesses = [];
		this._postProcessesDict = new Map();
		this._resolution = new GLP.Vector();

		if ( import.meta.env.DEV ) {

			this.field( "postprocess", () => {

				return this._postProcesses.map( postProcess => postProcess.enabled );

			}
			, ( v ) => {

				this._postProcesses.forEach( ( postProcess, i ) => {

					postProcess.enabled = v[ i ];

				} );

			} );

		}

	}

	public get postProcesses() {

		return this._postProcesses;

	}

	public add<T extends typeof PostProcess>( postProcess: T ) {

		const current = this._postProcessesDict.get( postProcess );

		if ( current ) {

			current.dispose();

		}

		const newPostProcess = new postProcess( { pipeline: this } );

		this._postProcessesDict.set( postProcess, newPostProcess );

		this._postProcesses = Array.from( this._postProcessesDict.values() );

		this._postProcesses.sort( ( a, b ) => a.order - b.order );

		newPostProcess.resize( this._resolution );

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
