import * as MXP from 'maxpower/webgpu';

import yakiSobaWgsl from './shaders/yakiSoba.wgsl';
import yakiSobaComputeWgsl from './shaders/yakiSobaCompute.wgsl';

// トレイルの長さ（セグメント数）と本数
const SEG = 64;
const TRAILS = 512;
const CUBE_HEIGHT = 0.05;

// シェーダーへ前置する定数
const HEADER = [
	`const SEG: u32 = ${SEG}u;`,
	`const TRAILS: u32 = ${TRAILS}u;`,
	`const CUBE_HEIGHT: f32 = ${CUBE_HEIGHT};`,
].join( '\n' ) + '\n\n';

// demo-webgl の YakiSoba のWebGPU版。GPUCompute（storage bufferピンポン）でトレイルを更新し、
// 頂点シェーダーが instance_index で結果を直接読むインスタンス描画で軌跡を描く
export class YakiSoba extends MXP.Component {

	private _gpu: MXP.GPUCompute;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as MXP.GPUEngine;

		// gpu

		this._gpu = new MXP.GPUCompute( engine.renderer, {
			name: 'yakisoba',
			count: SEG * TRAILS,
			struct: { name: 'TrailPoint', fields: [ 'pos', 'vel' ] },
			wgsl: HEADER + yakiSobaComputeWgsl,
		} );

		this._gpu.init( () => ( {
			pos: [ ( Math.random() - 0.5 ) * 2.0, ( Math.random() - 0.5 ) * 2.0, ( Math.random() - 0.5 ) * 2.0, 0 ],
		} ) );

		// geometry

		const geometry = new MXP.CubeGeometry( {
			width: 0.05,
			height: CUBE_HEIGHT,
			depth: 0.05,
			segmentsHeight: SEG - 1,
		} );

		// material

		const material = new MXP.Material( {
			name: 'yakisoba',
			phase: [ 'deferred', 'shadowMap' ],
			wgsl: HEADER + yakiSobaWgsl,
			storages: { trailPoints: this._gpu },
		} );

		// mesh

		this.entity.addComponent( MXP.Mesh, {
			geometry,
			material,
			instanceCount: TRAILS,
		} );

		// hot

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/yakiSobaCompute.wgsl', ( m ) => {

				if ( m ) this._gpu.wgsl = HEADER + m.default;

			} );

			import.meta.hot.accept( './shaders/yakiSoba.wgsl', ( m ) => {

				if ( m ) material.wgsl = HEADER + m.default;

				MXP.requestShaderReload();

			} );

		}

	}

	protected updateImpl( _event: MXP.ComponentUpdateEvent ): void {

		if ( ! this.entity.isVisibleTraverse() ) {

			return;

		}

		this._gpu.compute();

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );
		this._gpu.dispose();

	}

}
