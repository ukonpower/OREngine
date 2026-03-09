import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { PostProcess } from '../../PostProcess';

export type PostProcessListItem = {
	name: string;
	create: () => PostProcess;
}

export class PostProcessPipeline extends Component {

	public static postProcessList: PostProcessListItem[] = [];

	private _resolution: GLP.Vector;
	private _postProcesses: PostProcess[];

	constructor( param: ComponentParams ) {

		super( param );

		this._postProcesses = [];
		this._resolution = new GLP.Vector();

		this.field( "postprocess",
			() => {

				return this._postProcesses.map( ( postProcess ) => ( { name: postProcess.name, enabled: postProcess.enabled } ) );

			},
			( v ) => {

				this._postProcesses = [];

				v.forEach( ( item: {name: string, enabled: boolean} | boolean, i: number ) => {

					if ( typeof item === 'boolean' ) {

						// legacy format: boolean[]
						const factory = PostProcessPipeline.postProcessList[ i ];

						if ( factory ) {

							const pp = factory.create();
							pp.enabled = item;
							this._postProcesses.push( pp );

						}

						return;

					}

					const factory = PostProcessPipeline.postProcessList.find( f => f.name === item.name );

					if ( factory ) {

						const pp = factory.create();
						pp.enabled = item.enabled;
						this._postProcesses.push( pp );

					}

				} );

				this.resizePostProcesses();

			}, {
				format: {
					type: "array",
					labels: ( _value, i ) => {

						const pp = this._postProcesses[ i ];
						return pp ? pp.name : `PostProcess ${i}`;

					}
				}
			}
		);

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
