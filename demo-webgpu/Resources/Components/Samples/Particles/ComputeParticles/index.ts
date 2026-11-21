import * as MTP from 'mathpower';
import * as MXP from 'maxpower/webgpu';

import computeParticlesWgsl from './shaders/computeParticles.wgsl';
import leadersComputeWgsl from './shaders/leadersCompute.wgsl';
import particlesComputeWgsl from './shaders/particlesCompute.wgsl';

// 群れの先頭の数と、1つの先頭を追う粒の数。demo-webgl の ComputeParticles と同じ値
const LEADERS = 8;
const PER_LEADER = 128;
const PARTICLES = LEADERS * PER_LEADER;

// 粒の箱の大きさ
const PARTICLE_SIZE = 0.05;

// 1ステップで進める時間。タイムラインの1コマ（timeCodeFrame の 1 = 1/60 秒）に合わせる
const STEP_DELTA = 1 / 60;

// シェーダーへ前置する定数
const HEADER = [
	`const LEADERS: u32 = ${LEADERS}u;`,
	`const PER_LEADER: u32 = ${PER_LEADER}u;`,
].join( '\n' ) + '\n\n';

type ComputeState = { pos: number[], vel: number[] }[];

// 初期状態（先頭と粒の pos / vel）。demo-webgl の ComputeParticles と同じ乱数・同じ並びで作る。
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

// GPUCompute のサンプル。群れの先頭（leaders）と、それを追う粒（particles）の2つの計算を storage のピンポンで持ち、
// どちらも前のステップの状態（src）を読んで次の状態（dst）を書く。粒の計算は先頭の storage を storages で読む。
// 粒はインスタンス描画の箱で deferred と shadowMap に描く。
// 撮るたびに同じ絵になるよう、計算はタイムラインの時刻に従う（1コマ進んだら1ステップ、それ以外の時刻の変化では初期状態へ戻す）
export class ComputeParticles extends MXP.Component {

	private _leaders: MXP.GPUCompute;
	private _particles: MXP.GPUCompute;
	private _initialState: ReturnType<typeof createInitialState>;
	private _delta: { value: number, type: '1f' };

	// 最後に計算したコマ（timeCodeFrame を丸めたもの）。まだ1度も計算していなければ null
	private _frame: number | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as MXP.GPUEngine;

		this._initialState = createInitialState();
		this._frame = null;

		// 1回の計算で進める時間。初期状態へ戻したフレームは 0 にして、状態を変えずに計算だけを回す
		this._delta = { value: 0, type: '1f' };

		// gpu

		this._leaders = new MXP.GPUCompute( engine.renderer, {
			name: 'computeParticles/leaders',
			count: LEADERS,
			struct: { name: 'Leader', fields: [ 'pos', 'vel' ] },
			wgsl: HEADER + leadersComputeWgsl,
			uniforms: { uDelta: this._delta },
		} );

		this._particles = new MXP.GPUCompute( engine.renderer, {
			name: 'computeParticles/particles',
			count: PARTICLES,
			struct: { name: 'Particle', fields: [ 'pos', 'vel' ] },
			wgsl: HEADER + particlesComputeWgsl,
			uniforms: { uDelta: this._delta },
			storages: { leaders: this._leaders },
		} );

		// geometry

		const geometry = new MXP.CubeGeometry( {
			width: PARTICLE_SIZE,
			height: PARTICLE_SIZE,
			depth: PARTICLE_SIZE,
		} );

		// material

		const material = new MXP.Material( {
			name: 'computeParticles',
			phase: [ 'deferred', 'shadowMap' ],
			wgsl: HEADER + computeParticlesWgsl,
			storages: { particles: this._particles },
			varyings: { vColor: 'vec3f' },
		} );

		// mesh

		this.entity.addComponent( MXP.Mesh, {
			geometry,
			material,
			instanceCount: PARTICLES,
		} );

		// hot

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/leadersCompute.wgsl', ( m ) => {

				if ( m ) this._leaders.wgsl = HEADER + m.default;

			} );

			import.meta.hot.accept( './shaders/particlesCompute.wgsl', ( m ) => {

				if ( m ) this._particles.wgsl = HEADER + m.default;

			} );

			import.meta.hot.accept( './shaders/computeParticles.wgsl', ( m ) => {

				if ( m ) material.wgsl = HEADER + m.default;

				MXP.requestShaderReload();

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
			// GPUCompute は最初の計算でバッファを作るので、ここでも 0 の時間で計算を回しておく（回さないと止まったままでは何も描かれない）
			this.reset();
			this._delta.value = 0;

		}

		this._frame = frame;

		// 粒は今のステップの先頭を読むので、先頭を先に計算する（登録順に実行される）
		this._leaders.compute();
		this._particles.compute();

	}

	// 両方の計算を初期状態へ戻す
	private reset() {

		const state = this._initialState;

		this._leaders.init( ( i ) => state.leaders[ i ] );
		this._particles.init( ( i ) => state.particles[ i ] );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );
		this._leaders.dispose();
		this._particles.dispose();

	}

}
