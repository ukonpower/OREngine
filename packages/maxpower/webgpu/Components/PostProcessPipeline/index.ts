import * as MTP from 'mathpower';

import { Component } from '../../../core/Component';
import { PostProcessChain, PostProcessPass } from '../../PostProcess';

import type { ComponentParams } from '../../../core/Component';
import type { PostProcessPassParam } from '../../PostProcess';

/*-------------------------------
	プロジェクト側がポストプロセスを差し込む口

	カメラのエンティティに付けると、レンダラーの仕上げが終わったあとに
	追加したパスが順に走り、最後の出力が画面へ出る。

	device はレンダラーの初期化が終わるまで存在しないので、コンポーネントは
	パスの宣言だけを持ち、実体は最初の setSize（＝device が来た時点）で組み立てる。
-------------------------------*/

export class PostProcessPipeline extends Component {

	private _params: PostProcessPassParam[];
	private _chain: PostProcessChain | null;
	private _resolution: MTP.Vector;
	private _passResolution: MTP.Vector;
	private _passPixelSize: MTP.Vector;

	constructor( params: ComponentParams ) {

		super( params );

		this._params = [];
		this._chain = null;
		this._resolution = new MTP.Vector();
		this._passResolution = new MTP.Vector();
		this._passPixelSize = new MTP.Vector();

	}

	// 走らせたいパスを宣言する。順番がそのまま実行順になる
	public add( ...params: PostProcessPassParam[] ) {

		this._params.push( ...params );
		this._chain = null;
		this._resolution.set( 0, 0 );

	}

	// 実際に解像度が変わったときだけ作り直す（毎フレーム走らせるとテクスチャを作り続けてしまう）
	public setSize( device: GPUDevice, frameLayout: GPUBindGroupLayout, width: number, height: number ) {

		if ( this._params.length === 0 ) return;

		if ( ! this._chain ) {

			this._chain = new PostProcessChain( device, frameLayout, this._params.map(
				( param ) => new PostProcessPass( param, this._passResolution, this._passPixelSize ) ) );

			this._resolution.set( 0, 0 );

		}

		if ( this._resolution.x === width && this._resolution.y === height ) return;

		this._resolution.set( width, height );
		this._chain.setSize( device, width, height );

	}

	public render( device: GPUDevice, encoder: GPUCommandEncoder, frameBindGroup: GPUBindGroup, input: GPUTextureView ) {

		if ( ! this._chain ) return input;

		return this._chain.render( device, encoder, frameBindGroup, input );

	}

}
