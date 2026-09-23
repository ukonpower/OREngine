import * as MXP from 'maxpower/webgpu';

import varyingCubesWgsl from './shaders/varyingCubes.wgsl';

// 格子の一辺の個数と、箱の大きさ・間隔
const GRID = 8;
const BOX_SIZE = 0.2;
const SPACING = 0.3;

// シェーダーへ前置する定数
const HEADER = [
	`const GRID: u32 = ${GRID}u;`,
	`const BOX_SIZE: f32 = ${BOX_SIZE};`,
	`const SPACING: f32 = ${SPACING};`,
].join( '\n' ) + '\n\n';

// マテリアルの varyings のサンプル。インスタンス描画した箱の格子に、
// vsMain で計算したインスタンスごとの色と頂点ごとの明るさをフラグメントへ渡して色を付ける。
// forward を切り替えると、同じ varyings を fsDeferred ではなく fsForward で読んで描く
export class VaryingCubes extends MXP.Component {

	private _mesh: MXP.Mesh;
	private _wgsl: string;
	private _forward: boolean;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._wgsl = HEADER + varyingCubesWgsl;
		this._forward = false;

		const geometry = new MXP.CubeGeometry( {
			width: BOX_SIZE,
			height: BOX_SIZE,
			depth: BOX_SIZE,
		} );

		this._mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material: this.createMaterial(),
			instanceCount: GRID * GRID,
		} );

		// パイプラインは初回描画時のフェーズで作られて後から足されないため、
		// setVisibility ではなくマテリアルごと作り直して切り替える
		this.field( "forward", () => this._forward, v => {

			this._forward = v;
			this._mesh.material = this.createMaterial();

		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/varyingCubes.wgsl', ( m ) => {

				if ( m ) {

					this._wgsl = HEADER + m.default;
					this._mesh.material = this.createMaterial();

				}

				MXP.requestShaderReload();

			} );

		}

	}

	// 今の forward の設定で、varyings を宣言したマテリアルを作る
	private createMaterial() {

		let phase: MXP.MaterialPhase[] = [ 'shadowMap', 'deferred' ];

		if ( this._forward ) {

			phase = [ 'shadowMap', 'forward' ];

		}

		return new MXP.Material( {
			name: 'VaryingCubes',
			phase,
			wgsl: this._wgsl,
			varyings: {
				vColor: 'vec3f',
				vGlow: 'f32',
			},
		} );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
