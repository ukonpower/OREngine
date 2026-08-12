import * as MTP from 'mathpower';

import { Component, ComponentParams } from '../../../core/Component';
import { PostProcess } from '../../render/PostProcess';

export class PostProcessPipeline extends Component {

	private _resolution: MTP.Vector;
	private _postProcesses: PostProcess[];

	constructor( param: ComponentParams ) {

		super( param );

		this._postProcesses = [];
		this._resolution = new MTP.Vector();

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

	// 毎フレーム呼ばれるため、実際に解像度が変わったときだけ各パスへ伝搬する
	// （WebGPUバックエンドでは setSize がテクスチャ再生成を伴い、毎フレーム実行するとメモリを食い潰す）
	public resize( resolution: MTP.Vector ) {

		if ( this._resolution.x == resolution.x && this._resolution.y == resolution.y ) return;

		this._resolution.copy( resolution );

		this.resizePostProcesses();

	}

	private resizePostProcesses() {

		this.postProcesses.forEach( postProcess => {

			postProcess.resize( this._resolution );

		} );

	}

}
