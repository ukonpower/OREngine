import { buildShaderSource } from '../Bindings';
import { fieldsFromUniforms } from '../resources/UniformBinder';

import basicWgsl from './shaders/basic.wgsl';

import type { MaterialBase } from '../../core/Material';
import type { UniformField } from '../resources/UniformBinder';
import type * as GLP from 'glpower';

export type DrawType = 'TRIANGLES' | 'LINES';

// マテリアルが参加するパス。shadowMapはvsMainだけを使う深度専用パス。
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
	depthTest?: boolean;
	depthWrite?: boolean;
	cullFace?: boolean;
	drawType?: DrawType;
}

// 1マテリアル＝1 WGSLモジュール。フェーズごとのentry pointを持つ
export class Material implements MaterialBase {

	public name: string;
	public wgsl: string;
	public uniforms: GLP.Uniforms;

	public depthTest: boolean;
	public depthWrite: boolean;
	public cullFace: boolean;
	public drawType: DrawType;
	public renderOrder: number;

	public visibilityFlag: MaterialVisibility;

	public readonly fields: UniformField[];

	constructor( params?: MaterialParam ) {

		params = params || {};

		this.name = params.name || 'material';
		this.wgsl = params.wgsl || basicWgsl;
		this.uniforms = params.uniforms || {};

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

	// 宣言部を差し込んだWGSLの完成形
	public get shaderSource() {

		return buildShaderSource( this.wgsl, this.fields );

	}

}
