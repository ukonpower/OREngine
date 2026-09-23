import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { findSceneCameraEntity } from '../../EditorCamera';
import { FrameDebugger } from '../../FrameDebugger';
import { AgentCommandError, AgentCommandInput, requireArg } from '../Command';
import { entityPath, resolveEntity } from '../EntityQuery';

import type { AgentCommandContext, AgentCommandTable } from '../Command';
import type { AgentOptions } from '../Protocol';

const SHOT_USAGE = 'shot <out.png> [--camera <entity> | --from x,y,z --to x,y,z] [--time <秒>] [--view <final|パス名>]';

// 読み戻す前に shot のビューを描く回数。作ったばかりのビューは履歴 RT（SSAO / lightShaft の temporal など）が
// 空なので、同じステップのまま何回か描いて定常状態に近づける。
// 仮の値: 何回で見た目が落ち着くかは実測していない。実走で確かめたら置き換える
const SHOT_RENDER_COUNT = 4;

// --view <パス名> の転写先。EditorDraw ごとに1つ作って使い回す（契約にターゲットを破棄する口が無いため）
const passTargets = new WeakMap<MXP.EditorDrawContract, MXP.EditorTarget>();

/*-------------------------------
	Options
-------------------------------*/

// "x,y,z" か "[x,y,z]" をベクトルにする
const parseVector = ( options: AgentOptions, name: string ) => {

	const raw = options[ name ];

	if ( typeof raw !== 'string' ) {

		throw new AgentCommandError( `--${name} には x,y,z を指定してください。使い方: ${SHOT_USAGE}` );

	}

	const unwrapped = raw.replace( /^\[(.*)\]$/, '$1' );
	const items = unwrapped.split( ',' );
	const values: number[] = [];

	for ( const item of items ) {

		const value = Number( item );

		if ( item.trim() === '' || ! Number.isFinite( value ) ) {

			throw new AgentCommandError( `--${name} は数値3つで指定してください: ${raw}` );

		}

		values.push( value );

	}

	if ( values.length !== 3 ) {

		throw new AgentCommandError( `--${name} は数値3つで指定してください: ${raw}` );

	}

	return new MTP.Vector( values[ 0 ], values[ 1 ], values[ 2 ] );

};

// 省略時はタブの現在時刻
const parseTime = ( ctx: AgentCommandContext, options: AgentOptions ) => {

	const raw = options.time;

	if ( raw === undefined ) return ctx.engine.time.code;

	const time = Number( raw );

	if ( typeof raw !== 'string' || ! Number.isFinite( time ) ) {

		throw new AgentCommandError( `--time は秒の数値で指定してください: ${raw}` );

	}

	return time;

};

const parseViewName = ( options: AgentOptions ) => {

	const raw = options.view;

	if ( raw === undefined ) return 'final';

	if ( typeof raw !== 'string' ) {

		throw new AgentCommandError( `--view には final かパス名を指定してください。使い方: ${SHOT_USAGE}` );

	}

	return raw;

};

/*-------------------------------
	Camera
-------------------------------*/

type ShotCamera = {
	// null = シーンの displayOut カメラ（ビューの camera を空けておくとレンダラーがそれで描く）
	entity: MXP.Entity | null;
	// 応答に載せる、どのカメラで描いたか
	description: unknown;
	// --from / --to で作った一時カメラだけ持つ
	temporary: MXP.Camera | null;
};

const resolveCamera = ( ctx: AgentCommandContext, options: AgentOptions ): ShotCamera => {

	const hasFromTo = options.from !== undefined || options.to !== undefined;

	if ( options.camera !== undefined && hasFromTo ) {

		throw new AgentCommandError( `--camera と --from / --to は同時に指定できません。使い方: ${SHOT_USAGE}` );

	}

	if ( options.camera !== undefined ) {

		if ( typeof options.camera !== 'string' ) {

			throw new AgentCommandError( `--camera にはエンティティを指定してください。使い方: ${SHOT_USAGE}` );

		}

		const entity = resolveEntity( ctx.engine, options.camera );

		if ( entity.getComponentsByTag<MXP.Camera>( 'camera' ).length === 0 ) {

			throw new AgentCommandError( `カメラのコンポーネントが付いていません: ${entityPath( entity )}` );

		}

		return { entity, description: entityPath( entity ), temporary: null };

	}

	if ( hasFromTo ) {

		const from = parseVector( options, 'from' );
		const to = parseVector( options, 'to' );

		const direction = to.clone();
		direction.sub( from );

		if ( direction.length() === 0 ) {

			throw new AgentCommandError( '--from と --to が同じ位置です' );

		}

		// root の外に置くのでシーンには出ない（エディタカメラと同じ作り）
		const entity = ctx.engine.createEntity( { name: '__agentShotCamera' } );
		const camera = entity.addComponent( MXP.Camera );

		entity.position.copy( from );
		entity.lookAt( to );

		return {
			entity,
			description: { from: [ from.x, from.y, from.z ], to: [ to.x, to.y, to.z ] },
			temporary: camera,
		};

	}

	const sceneCamera = findSceneCameraEntity( ctx.engine.root );

	if ( ! sceneCamera ) {

		throw new AgentCommandError( 'シーンに displayOut のカメラがありません。--camera か --from / --to を指定してください' );

	}

	return { entity: null, description: entityPath( sceneCamera ), temporary: null };

};

// 一時カメラは root の外にあって step で更新されないので、エディタカメラと同じ手順で自前で回す
const updateTemporaryCamera = ( camera: MXP.Camera, engine: Engine, event: MXP.EntityUpdateEvent ) => {

	const entity = camera.entity;

	camera.aspect = engine.renderer.resolution.x / engine.renderer.resolution.y;
	camera.needsUpdateProjectionMatrix = true;

	entity.update( event );
	entity.postUpdate( event );
	entity.updateMatrixRecursive();
	entity.prepareRender( event );

};

/*-------------------------------
	Pass capture
-------------------------------*/

// 購読している間に出たパスを記録し、ラベルが name のものをターゲットへ写す。
// ラベルの付け方は FrameDebugger と同じ（同じラベルの2回目以降は "#n" を付ける）なので、デバッグ表示で見た名前をそのまま使える
class PassCapture {

	public labels: string[];
	public found: boolean;

	private _draw: MXP.EditorDrawContract;
	private _view: MXP.RenderViewContract;
	private _target: MXP.EditorTarget;
	private _name: string;
	private _counts: Map<string, number>;

	constructor( draw: MXP.EditorDrawContract, view: MXP.RenderViewContract, target: MXP.EditorTarget, name: string ) {

		this.labels = [];
		this.found = false;

		this._draw = draw;
		this._view = view;
		this._target = target;
		this._name = name;
		this._counts = new Map();

	}

	// fn の実行中だけパスを拾う
	public during( fn: () => void ) {

		const off = this._draw.onDrawPass( ( frame, label ) => this._push( frame, label ) );

		try {

			fn();

		} finally {

			off();

		}

	}

	private _push( frame: MXP.EditorFrame, label: string ) {

		const base = label || String( this.labels.length );
		const occurrence = this._counts.get( base ) || 0;
		this._counts.set( base, occurrence + 1 );

		let unique = base;

		if ( occurrence > 0 ) {

			unique = base + '#' + occurrence;

		}

		this.labels.push( unique );

		if ( ! this.found && unique === this._name ) {

			this._draw.blit( this._view, frame, this._target );
			this.found = true;

		}

	}

}

/*-------------------------------
	PNG
-------------------------------*/

// 下原点の RGBA8 を上下反転して PNG にし、base64 で返す。
// 画面へは不透明で出している（webgpu は alphaMode: 'opaque'）ので、見た目と揃えるため α は 255 にする
const encodePng = async ( pixels: Uint8Array, width: number, height: number ) => {

	const canvas = document.createElement( 'canvas' );
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext( '2d' )!;
	const image = ctx.createImageData( width, height );
	const rowBytes = width * 4;

	for ( let y = 0; y < height; y ++ ) {

		const src = ( height - 1 - y ) * rowBytes;

		image.data.set( pixels.subarray( src, src + rowBytes ), y * rowBytes );

	}

	for ( let i = 3; i < image.data.length; i += 4 ) {

		image.data[ i ] = 255;

	}

	ctx.putImageData( image, 0, 0 );

	const blob = await new Promise<Blob | null>( ( resolve ) => canvas.toBlob( resolve, 'image/png' ) );

	if ( ! blob ) {

		throw new Error( 'PNG にエンコードできませんでした' );

	}

	const dataUrl = await new Promise<string>( ( resolve, reject ) => {

		const reader = new FileReader();
		reader.onload = () => resolve( reader.result as string );
		reader.onerror = () => reject( reader.error );
		reader.readAsDataURL( blob );

	} );

	return dataUrl.slice( dataUrl.indexOf( ',' ) + 1 );

};

/*-------------------------------
	shot
-------------------------------*/

// 指定したカメラ・時刻で shot 専用のビューに描き、PNG（base64）を返す。
// ユーザーのタブの再生時刻・再生状態・選択・エディタカメラには触れない。共有状態（エンティティの姿勢・uTime など）は
// 指定時刻で上書きするが、次の rAF の engine.update() がユーザーの時刻で計算し直す。
// 描画までは同期で済ませる。背景タブでは rAF が止まり setTimeout も絞られるので、それらを待つ作りにしない
const shot = async ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	// 出力先は CLI が書き出すのでここでは使わないが、描く前に指定漏れを返す
	requireArg( input, 0, SHOT_USAGE );

	const options = input.options;
	const engine = ctx.engine;
	const draw = ctx.editor.draw;

	const time = parseTime( ctx, options );
	const viewName = parseViewName( options );
	const camera = resolveCamera( ctx, options );

	const view = engine.createView( { offscreen: true } );
	view.camera = camera.entity;

	const width = Math.max( Math.floor( engine.renderer.resolution.x ), 1 );
	const height = Math.max( Math.floor( engine.renderer.resolution.y ), 1 );

	let readback: Promise<Uint8Array>;

	FrameDebugger.paused = true;

	try {

		let capture: PassCapture | null = null;

		if ( viewName !== 'final' ) {

			let target = passTargets.get( draw );

			if ( ! target ) {

				target = draw.createTarget();
				passTargets.set( draw, target );

			}

			capture = new PassCapture( draw, view, target, viewName );

		}

		const event = engine.createEntityUpdateEvent( { timeCode: time, timeCodeFrame: time * 60, playing: false, forceDraw: true } );

		// Engine.update と同じく、時刻の uniform と毎フレーム更新のテクスチャを揃えてから step する
		engine.renderer.globalUniforms.uTime.value = time;
		engine.renderer.globalUniforms.uTimeF.value = time % 1;

		const updateTextures = Engine.resources.updateEveryFrameTextures;

		for ( let i = 0; i < updateTextures.length; i ++ ) {

			updateTextures[ i ].render();

		}

		// シャドウ・envMap などのパスは prepareScene（step の中）で出るので、step の間も拾う
		const step = () => engine.step( event );

		if ( capture ) {

			capture.during( step );

		} else {

			step();

		}

		if ( camera.temporary ) {

			updateTemporaryCamera( camera.temporary, engine, event );

		}

		for ( let i = 0; i < SHOT_RENDER_COUNT - 1; i ++ ) {

			engine.render( view );

		}

		if ( capture ) {

			capture.during( () => engine.render( view ) );

			if ( ! capture.found ) {

				throw new AgentCommandError( `--view に一致するパスがありません: ${viewName}（final かパスのラベルを指定してください）`, [ 'final', ...capture.labels ] );

			}

			readback = draw.readPixels( passTargets.get( draw )! );

		} else {

			engine.render( view );

			readback = draw.readView( view );

		}

	} catch ( e ) {

		view.dispose();

		throw e;

	} finally {

		FrameDebugger.paused = false;

		if ( camera.temporary ) {

			camera.temporary.entity.dispose();

		}

	}

	let pixels: Uint8Array;

	try {

		pixels = await readback;

	} finally {

		view.dispose();

	}

	if ( pixels.length !== width * height * 4 ) {

		throw new AgentCommandError( `読み戻したサイズが描画解像度と一致しません（${pixels.length} bytes, ${width}x${height}）。撮影中に Screen の大きさが変わった可能性があります。再実行してください` );

	}

	return {
		png: await encodePng( pixels, width, height ),
		width,
		height,
		view: viewName,
		time,
		camera: camera.description,
	};

};

export const shotCommands: AgentCommandTable = {
	shot,
};
