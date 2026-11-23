import * as MXP from '@or-renderer';
import * as MTP from 'mathpower';
import { Engine, OREngineProjectData } from 'orengine';

import { initResouces, initResourceInstances } from '../../../host/app/Resources/registry';

// 返す形は ../raycast.ts の CameraInfo / MeshInfo と同じ（ここは node 側の tsconfig に入らないので型を import しない）
type CameraInfo = {
	matrixWorld: number[];
	projectionMatrix: number[];
};

type MeshInfo = {
	name: string;
	matrixWorld: number[];
	positions: number[];
	normals: number[];
	indices: number[];
};

/*-------------------------------
	ブラウザ側のハーネス

	../renderCorrectness.spec.ts が dev サーバーの上で import して呼ぶ。エディタは開かず、player と同じく Engine だけを立てて
	シーンを描き、readRenderImage で光の計算を終えた絵（lit）を float のまま読む。
	描き方は shot の --time 1 --frames N と同じ（時刻を飛ばして始め、1/60 秒ずつ進める）
-------------------------------*/

// 1コマぶんの時間。shot の SHOT_STEP_DELTA と同じ
const STEP_DELTA = 1 / 60;

type Harness = {
	engine: Engine;
	view: MXP.RenderView;
	width: number;
	height: number;
};

let harness: Harness | null = null;
let resourcesReady = false;

// requestAnimationFrame を 1 回待つ（webgpu の device の準備など、非同期に進むものを待つ間にメインスレッドを空ける）
const nextFrame = () => new Promise<void>( ( resolve ) => requestAnimationFrame( () => resolve() ) );

const eachEntity = ( entity: MXP.Entity, callback: ( entity: MXP.Entity ) => void ) => {

	callback( entity );

	for ( const child of entity.children ) {

		eachEntity( child, callback );

	}

};

// webgpu の Renderer は device を非同期に取るので、取れるまでは描画が飛ばされる
const waitRendererReady = async ( renderer: unknown ) => {

	const gpuRenderer = renderer as { device?: unknown };

	if ( ! ( 'device' in gpuRenderer ) ) return;

	for ( let i = 0; i < 600; i ++ ) {

		if ( gpuRenderer.device ) return;

		await nextFrame();

	}

	throw new Error( 'webgpu の device が用意できませんでした' );

};

// シーンを読み、width × height で描く準備をする
export const setupScene = async ( sceneData: OREngineProjectData, width: number, height: number ) => {

	if ( ! resourcesReady ) {

		initResouces();
		resourcesReady = true;

	}

	if ( harness ) {

		harness.engine.dispose();

	}

	const engine = new Engine( MXP.createRenderer );
	initResourceInstances( engine );
	engine.setSize( new MTP.Vector( width, height ) );

	// offscreen にして canvas へは出さない（読むのはシーンのバッファ）
	const view = engine.createView( { offscreen: true } ) as MXP.RenderView;

	await engine.load( sceneData );
	await waitRendererReady( engine.renderer );

	harness = { engine, view, width, height };

};

// hidden の名前のエンティティを隠して frames コマ描く。
// 最初に時刻を飛ばすので、環境マップの積算は前の描画の分を捨ててから積み直される（Renderer の isOfflineTimeJump）
export const renderFrames = async ( hidden: string[], frames: number ) => {

	if ( ! harness ) throw new Error( 'setupScene を先に呼んでください' );

	const { engine, view, width, height } = harness;

	eachEntity( engine.root, ( entity ) => {

		if ( entity === engine.root ) return;

		entity.visible = ! hidden.includes( entity.name );

	} );

	const resolution = new MTP.Vector( width, height );

	// 時刻を飛ばす前のコマ。これが無いと最初の描画は「前のコマ」が無く、積算を捨てる合図にならない
	const steps: number[] = [ - 1000 ];

	for ( let i = 0; i < frames; i ++ ) {

		steps.push( i * STEP_DELTA );

	}

	for ( const time of steps ) {

		const event = engine.createEntityUpdateEvent( {
			timeCode: time,
			timeCodeFrame: time * 60,
			timeElapsed: time,
			timeDelta: STEP_DELTA,
			resolution,
			playing: false,
			forceDraw: true,
			offline: true,
		} );

		const uniforms = engine.renderer.globalUniforms;

		uniforms.uTimePrev.value = uniforms.uTime.value;
		uniforms.uTime.value = time;
		uniforms.uTimeF.value = time % 1;
		uniforms.uTimeE.value = time;
		uniforms.uTimeEF.value = ( ( time % 1 ) + 1 ) % 1;
		uniforms.uDeltaTime.value = STEP_DELTA;

		engine.step( event );
		engine.render( view );

	}

	await MXP.waitRenderReady();

	engine.render( view );

};

// ビューのパイプライン設定を一時的に上書きする（null で外す）。テストシーンは SSAO などを切ってあり、入れたときの振る舞いを見るのに使う
export const setPipelineOverride = ( config: MXP.PipelineConfig | null ) => {

	if ( ! harness ) throw new Error( 'setupScene を先に呼んでください' );

	harness.view.pipelineOverride = config;

};

// カメラ・平行光・Shape のメッシュ（GPU に渡したのと同じ頂点）を、答えの計算に渡せる形で返す
export const describeScene = () => {

	if ( ! harness ) throw new Error( 'setupScene を先に呼んでください' );

	const { engine } = harness;

	let camera: CameraInfo | null = null;
	const lights: { name: string, direction: number[], color: number[] }[] = [];
	const meshes: MeshInfo[] = [];

	eachEntity( engine.root, ( entity ) => {

		const cameraComponent = entity.getComponentsByTag<MXP.Camera>( 'camera' )[ 0 ];

		if ( cameraComponent && cameraComponent.displayOut && ! camera ) {

			camera = {
				matrixWorld: [ ...entity.matrixWorld.elm ],
				projectionMatrix: [ ...cameraComponent.projectionMatrix.elm ],
			};

		}

		const light = entity.getComponent( MXP.Light );

		if ( light && light.lightType === 'directional' ) {

			// レンダラーと同じく +Y をライトの向きとする（RenderCore / Lights の direction）
			const direction = new MTP.Vector( 0, 1, 0, 0 ).applyMatrix4( entity.matrixWorld ).normalize();

			lights.push( {
				name: entity.name,
				direction: [ direction.x, direction.y, direction.z ],
				color: [ light.color.x * light.intensity, light.color.y * light.intensity, light.color.z * light.intensity ],
			} );

		}

		const mesh = entity.getComponent( MXP.Mesh );

		if ( mesh && mesh.geometry && entity.name !== '' ) {

			const position = mesh.geometry.getAttribute( 'position' );
			const normal = mesh.geometry.getAttribute( 'normal' );
			const index = mesh.geometry.getAttribute( 'index' );

			if ( position && normal && index ) {

				meshes.push( {
					name: entity.name,
					matrixWorld: [ ...entity.matrixWorld.elm ],
					positions: Array.from( position.array ),
					normals: Array.from( normal.array ),
					indices: Array.from( index.array ),
				} );

			}

		}

	} );

	if ( ! camera ) throw new Error( 'displayOut のカメラがありません' );

	return { camera: camera as CameraInfo, lights, meshes };

};

// 光の計算を終えた絵（lit）の、points（左下原点の画素）の RGBA を返す
export const readLitPixels = async ( points: [ number, number ][] ) => {

	if ( ! harness ) throw new Error( 'setupScene を先に呼んでください' );

	const { engine, view, width, height } = harness;

	const image = await MXP.readRenderImage( engine.renderer, view, 'lit', { x: 0, y: 0, width, height } );
	const values: number[][] = [];

	for ( const [ x, y ] of points ) {

		const offset = ( y * width + x ) * 4;

		values.push( [ image[ offset ], image[ offset + 1 ], image[ offset + 2 ], image[ offset + 3 ] ] );

	}

	return values;

};
