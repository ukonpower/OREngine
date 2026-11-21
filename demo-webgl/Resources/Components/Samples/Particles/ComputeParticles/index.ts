import * as MTP from 'mathpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import computeParticlesFrag from './shaders/computeParticles.fs';
import computeParticlesVert from './shaders/computeParticles.vs';
import leadersCompute from './shaders/leadersCompute.glsl';
import particlesCompute from './shaders/particlesCompute.glsl';

// 群れの先頭の数と、1つの先頭を追う粒の数。demo-webgpu の ComputeParticles と同じ値
const LEADERS = 8;
const PER_LEADER = 128;

// 粒の箱の大きさ
const PARTICLE_SIZE = 0.05;

// 1ステップで進める時間。タイムラインの1コマ（timeCodeFrame の 1 = 1/60 秒）に合わせる
const STEP_DELTA = 1 / 60;

type ComputeState = { pos: number[], vel: number[] }[];

// 初期状態（先頭と粒の pos / vel）。demo-webgpu の ComputeParticles と同じ乱数・同じ並びで作る。
// 先頭はエンティティの原点を中心にした円に並べて円の接線の向きへ打ち出し、上下の速さで軌道を1つずつ逆に傾ける。
// 粒は自分の先頭のまわりに散らし、先頭へ引くばねの強さを粒ごとに変えて pos.w に持たせる（遅れ方がばらけて尾になる）
const createInitialState = () => {

	// 撮影（npm run scene-shots）で撮るたびに同じ絵になるよう、seed を固定した乱数で作る
	const random = MTP.MathUtils.randomSeed( 1 );

	const leaders: ComputeState = [];
	const particles: ComputeState = [];

	for ( let i = 0; i < LEADERS; i ++ ) {

		const angle = i / LEADERS * Math.PI * 2;
		const pos = [ Math.cos( angle ) * 1.4, 0, Math.sin( angle ) * 1.4, 0 ];

		let lift = 0.8;

		if ( i % 2 === 1 ) {

			lift = - 0.8;

		}

		const vel = [ - Math.sin( angle ) * 2.5, lift, Math.cos( angle ) * 2.5, 0 ];

		leaders.push( { pos, vel } );

		for ( let j = 0; j < PER_LEADER; j ++ ) {

			const stiffness = 10 + random() * 20;

			particles.push( {
				pos: [
					pos[ 0 ] + ( random() - 0.5 ) * 0.8,
					pos[ 1 ] + ( random() - 0.5 ) * 0.8,
					pos[ 2 ] + ( random() - 0.5 ) * 0.8,
					stiffness,
				],
				vel: [ vel[ 0 ], vel[ 1 ], vel[ 2 ], 0 ],
			} );

		}

	}

	return { leaders, particles };

};

// GPUCompute のサンプル。群れの先頭（leaders）と、それを追う粒（particles）の2つの計算をテクスチャのピンポンで持ち、
// どちらも前のステップの状態を読んで次の状態を書く。粒の計算は先頭の計算の出力を読む。
// 粒はインスタンス描画の箱で deferred と shadowMap に描く。
// 撮るたびに同じ絵になるよう、計算はタイムラインの時刻に従う（1コマ進んだら1ステップ、それ以外の時刻の変化では初期状態へ戻す）
export class ComputeParticles extends MXP.Component {

	private _gpu: MXP.GPUCompute;
	private _leaders: MXP.GPUComputePass;
	private _particles: MXP.GPUComputePass;
	private _initialState: ReturnType<typeof createInitialState>;
	private _delta: { value: number, type: '1f' };

	// 最後に計算したコマ（timeCodeFrame を丸めたもの）。まだ1度も計算していなければ null
	private _frame: number | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		this._initialState = createInitialState();
		this._frame = null;

		// 1回の計算で進める時間。初期状態へ戻したフレームは 0 にして、状態を変えずに計算だけを回す
		this._delta = { value: 0, type: '1f' };

		// gpu

		this._leaders = new MXP.GPUComputePass( engine.renderer.backend, {
			name: 'computeParticles/leaders',
			size: new MTP.Vector( LEADERS, 1 ),
			dataLayerCount: 2,
			frag: MXP.hotGet( 'computeParticlesLeaders', leadersCompute ),
			uniforms: { uDelta: this._delta },
		} );

		// 粒のテクスチャは1行が1つの先頭の粒（x が先頭の中の番号、y が先頭の番号）。
		// demo-webgpu の storage の並び（先頭の番号 × PER_LEADER + 先頭の中の番号）と同じ順になる
		this._particles = new MXP.GPUComputePass( engine.renderer.backend, {
			name: 'computeParticles/particles',
			size: new MTP.Vector( PER_LEADER, LEADERS ),
			dataLayerCount: 2,
			frag: MXP.hotGet( 'computeParticlesParticles', particlesCompute ),
			uniforms: {
				uDelta: this._delta,
				// 先頭の出力の uniform をそのまま使う。値は先頭の計算のたびに書いた側へ差し替わるので、同じステップの先頭を読む
				uLeaderPos: this._leaders.outputUniforms.uGPUSampler0,
			},
		} );

		// passes の順に計算するので、先頭を先に置く
		this._gpu = new MXP.GPUCompute( { passes: [ this._leaders, this._particles ] } );

		// geometry

		const geometry = new MXP.CubeGeometry( {
			width: PARTICLE_SIZE,
			height: PARTICLE_SIZE,
			depth: PARTICLE_SIZE,
		} );

		// インスタンスごとに、粒のテクスチャで読む位置（テクセルの中心）
		const particleUvArray: number[] = [];

		for ( let i = 0; i < LEADERS; i ++ ) {

			for ( let j = 0; j < PER_LEADER; j ++ ) {

				particleUvArray.push( ( j + 0.5 ) / PER_LEADER, ( i + 0.5 ) / LEADERS );

			}

		}

		geometry.setAttribute( "particleUv", new Float32Array( particleUvArray ), 2, { instanceDivisor: 1 } );

		// material

		const material = new MXP.Material( {
			name: 'computeParticles',
			frag: MXP.hotGet( 'computeParticlesFrag', computeParticlesFrag ),
			vert: MXP.hotGet( 'computeParticlesVert', computeParticlesVert ),
			phase: [ 'deferred', 'shadowMap' ],
			uniforms: MXP.UniformsUtils.merge( {}, this._particles.outputUniforms ),
		} );

		// mesh

		this.entity.addComponent( MXP.Mesh, {
			geometry,
			material,
		} );

		// hot

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/leadersCompute.glsl', ( module ) => {

				if ( module ) {

					this._leaders.frag = MXP.hotUpdate( 'computeParticlesLeaders', module.default );

					this._leaders.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/particlesCompute.glsl', ( module ) => {

				if ( module ) {

					this._particles.frag = MXP.hotUpdate( 'computeParticlesParticles', module.default );

					this._particles.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/computeParticles.fs', ( module ) => {

				if ( module ) {

					material.frag = MXP.hotUpdate( 'computeParticlesFrag', module.default );

					material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/computeParticles.vs', ( module ) => {

				if ( module ) {

					material.vert = MXP.hotUpdate( 'computeParticlesVert', module.default );

					material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! this.entity.isVisibleTraverse() ) {

			return;

		}

		// shot の時刻（秒 × 60）は 1/60 秒の足し引きで作られ、浮動小数の誤差で整数から少しずれるので丸める
		const frame = Math.round( event.timeCodeFrame );

		// 止まっている間は進めない
		if ( frame === this._frame ) {

			return;

		}

		if ( this._frame !== null && frame === this._frame + 1 ) {

			this._delta.value = STEP_DELTA;

		} else {

			// 0 に戻った・巻き戻った・飛んだ（と最初のフレーム）は初期状態へ戻す。
			// demo-webgpu と同じく、ここでも 0 の時間で計算を回す
			this.reset();
			this._delta.value = 0;

		}

		this._frame = frame;

		this._gpu.compute( event.renderer as MXP.Renderer );

	}

	// 両方の計算を初期状態へ戻す。initTexture は読む側のテクスチャへ書く
	private reset() {

		const state = this._initialState;

		this._leaders.initTexture( ( layer, x ) => {

			if ( layer === 0 ) return state.leaders[ x ].pos;

			return state.leaders[ x ].vel;

		} );

		this._particles.initTexture( ( layer, x, y ) => {

			const particle = state.particles[ y * PER_LEADER + x ];

			if ( layer === 0 ) return particle.pos;

			return particle.vel;

		} );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );
		this._gpu.dispose();

	}

}
