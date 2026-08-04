import { buildShaderSource } from '../Bindings';
import { requestShaderReload } from '../hotReload';
import { fieldsFromUniforms } from '../resources/UniformBinder';

import basicWgsl from './shaders/basic.wgsl';

import type { MaterialContract } from '../../core/Contracts/MaterialContract';
import type { MaterialStorage, StorageSource } from '../Bindings';
import type { UniformField } from '../resources/UniformBinder';
import type * as GLP from 'glpower';

// HMRで差し替わるシェーダーソース。playerでは初期値のまま使われる
let hotBasicWgsl = basicWgsl;

if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/basic.wgsl', ( m ) => {

		if ( m ) hotBasicWgsl = m.default;

		requestShaderReload();

	} );

}

export type DrawType = 'TRIANGLES' | 'LINES';

// マテリアルが参加するパス。shadowMapは深度だけを書くパスで、既定ではvsMainしか使わない。
// envMapはキューブ6面へ描く単一ターゲットのパスで、fsForward を使う
export type MaterialPhase = 'shadowMap' | 'deferred' | 'forward' | 'envMap';

export type MaterialVisibility = { [K in MaterialPhase]: boolean }

export interface MaterialParam {
	name?: string;
	// vsMain / fsDeferred / fsForward を定義したWGSL本体。宣言部は Bindings が前置する
	wgsl?: string;
	phase?: MaterialPhase[];
	renderOrder?: number;
	uniforms?: GLP.Uniforms;
	// GPGPU出力。キーがWGSL上の変数名になり、宣言順で group2 の binding1.. に生える
	storages?: { [name: string]: StorageSource };
	depthTest?: boolean;
	depthWrite?: boolean;
	cullFace?: boolean;
	drawType?: DrawType;
}

// 1マテリアル＝1 WGSLモジュール。フェーズごとのentry pointを持つ
export class Material implements MaterialContract {

	public name: string;
	public uniforms: GLP.Uniforms;

	public depthTest: boolean;
	public depthWrite: boolean;
	public cullFace: boolean;
	public drawType: DrawType;
	public renderOrder: number;

	public visibilityFlag: MaterialVisibility;

	public readonly fields: UniformField[];
	public readonly storages: MaterialStorage[];

	private _wgsl: string | null;

	constructor( params?: MaterialParam ) {

		params = params || {};

		this.name = params.name || 'material';
		this._wgsl = params.wgsl || null;
		this.uniforms = params.uniforms || {};
		this.storages = Object.entries( params.storages || {} ).map( ( [ name, source ] ) => ( { name, source } ) );

		this.depthTest = params.depthTest !== undefined ? params.depthTest : true;
		this.depthWrite = params.depthWrite !== undefined ? params.depthWrite : true;
		this.cullFace = params.cullFace !== undefined ? params.cullFace : false;
		this.drawType = params.drawType || 'TRIANGLES';
		this.renderOrder = params.renderOrder ?? 0;

		this.visibilityFlag = { shadowMap: false, deferred: false, forward: false, envMap: false };
		this.setVisibility( params.phase || [ 'shadowMap', 'deferred' ] );

		this.fields = fieldsFromUniforms( this.uniforms );

	}

	public setVisibility( phases: MaterialPhase[] ) {

		this.visibilityFlag = {
			shadowMap: phases.indexOf( 'shadowMap' ) > - 1,
			deferred: phases.indexOf( 'deferred' ) > - 1,
			forward: phases.indexOf( 'forward' ) > - 1,
			envMap: phases.indexOf( 'envMap' ) > - 1,
		};

	}

	// 未指定のマテリアルは既定のWGSLで描く
	public get wgsl() {

		return this._wgsl ?? hotBasicWgsl;

	}

	public set wgsl( value: string ) {

		this._wgsl = value;

	}

	// シャドウパスで深度を書き直すマテリアルか。レイマーチのように面と実体がずれる形は
	// fsShadow を定義して @builtin(frag_depth) を返す
	public get hasShadowFragment() {

		return this.wgsl.includes( 'fn fsShadow' );

	}

	// 宣言部を差し込んだWGSLの完成形
	public get shaderSource() {

		return buildShaderSource( this.wgsl, this.fields, this.storages );

	}

}
