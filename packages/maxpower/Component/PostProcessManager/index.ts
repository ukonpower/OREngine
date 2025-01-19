import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { PostProcess } from '../PostProcess';

export class PostProcessManager extends Component {

	private _postProcesses: PostProcess[];

	constructor( param: ComponentParams ) {

		super( param );

		this._postProcesses = this._entity.getComponentsByTag<PostProcess>( 'postprocess' );

	}

	public get postProcesses() {

		return this._postProcesses;

	}

	public add( postProcess: PostProcess ) {

		this._postProcesses.push( postProcess );

		this._postProcesses.sort( ( a, b ) => a.order - b.order );

	}

	public remove( postProcess: PostProcess ) {

		const index = this._postProcesses.indexOf( postProcess );

		if ( index > - 1 ) {

			this._postProcesses.splice( index, 1 );

		}

	}

}
