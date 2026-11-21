import { EventEmitter } from 'basepower';
import * as MTP from 'mathpower';

import { KeyFrameData, scaleKeyFrameTimes } from '../Animation/KeyFrameDecoder';

import type { CurveTable, EngineContract } from '../Contracts/EngineContract';
import type { GLTF, GLTFLoaderContract } from '../Contracts/GLTFLoaderContract';


export type BLidgeNodeType = 'empty' | 'cube' | 'sphere' | 'cylinder' | 'mesh' | 'camera' | 'plane' | 'light' | 'gltf';

// scene

export type BLidgeScene = {
	animations: number[][];
	fcurves: BLidgeCurveParam[];
	root: BLidgeNodeParam;
	frame: BLidgeFrame;
}

// node

// BLidge v2 は既定値（type / visible / position / rotation / scale）のキーを省略して出力する
export type BLidgeNodeParam = {
	name: string,
	type?: BLidgeNodeType,
	param?: BLidgeCameraParam | BLidgeMeshParamRaw | BLidgeLightParamCommon
	children?: BLidgeNodeParam[],
	animation?: BLidgeAnimationAccessor,
	position?: number[],
	rotation?: number[],
	scale?: number[],
	uniforms?: BLidgeAnimationAccessor,
	visible?: boolean,
}

export type BLidgeNode = {
	name: string,
	type: BLidgeNodeType,
	param?: BLidgeCameraParam | BLidgeMeshParam | BLidgeLightParamCommon
	children: BLidgeNode[],
	animations: BLidgeAnimationAccessor,
	position: number[],
	rotation: number[],
	scale: number[],
	uniforms: BLidgeAnimationAccessor,
	visible: boolean,
}

// camera

export type BLidgeCameraParam = {
	fov: number
}

// mesh

export type BLidgeMeshParamRaw = {
	position: string,
	uv: string,
	normal: string,
	index: string,
}

export type BLidgeMeshParam = {
	position: Float32Array,
	uv: Float32Array,
	normal: Float32Array,
	index: Uint16Array,
}

// light

type BLidgeLightParamCommon = {
	type: 'directional' | 'spot'
	color: MTP.IVector3,
	intensity: number,
	shadow_map: boolean,
}

export type BLidgeDirectionalLightParam = {
	type: 'directional'
} & BLidgeLightParamCommon

export type BLidgeSpotLightParam = {
	type: 'spot',
	angle: number,
	blend: number,
} & BLidgeLightParamCommon

export type BLidgeLightParam = BLidgeDirectionalLightParam | BLidgeSpotLightParam;

// animation

export type BLidgeAnimationAccessor = { [key: string]: number }

export type BLidgeCurveAxis = 'x' | 'y' | 'z' | 'w'

// キー列の形式はシーンのカーブの表と同じ（Animation/KeyFrameDecoder）。時刻の単位だけが Blender のフレームで違う
export type BLidgeCurveParam = {
	k: KeyFrameData[];
	axis: BLidgeCurveAxis
}

// アニメーション1つ（position / rotation / color や uniform 1つ）が使うカーブの、シーンのカーブの表での ID。
// 軸の番号（x, y, z, w = 0〜3。数値配列のフィールドの要素の番号）で引き、カーブの無い軸は undefined。
// 軸の名前をキーにしないのは、player の terser がオブジェクトのキーを改名し、JSON から来た軸の名前と食い違うため
export type BLidgeAnimationCurves = ( string | undefined )[];

const AXES: BLidgeCurveAxis[] = [ 'x', 'y', 'z', 'w' ];

// BLidge のカーブをシーンのカーブの表へ入れるときの ID の頭。エディタはこれで始まるカーブを Blender 側の持ち物として編集させない
export const BLIDGE_CURVE_PREFIX = "blidge:";

// message

export type BLidgeMessage = BLidgeSyncSceneMessage | BLidgeSyncTimelineMessage | BLidgeSyncSelectionMessage | BLidgeEventMessage

export type BLidgeSyncSceneMessage = {
	type: "sync/scene",
    data: BLidgeScene;
}

export type BLidgeSyncTimelineMessage = {
	type: "sync/timeline";
	data: BLidgeFrame;
}

export type BLidgeSyncSelectionMessage = {
	type: "sync/selection";
	data: BLidgeSelection;
}

export type BLidgeEventMessage = {
	type: "event";
	data: {
		type: string
	};
}

// frame

export type BLidgeFrame = {
	start: number;
	end: number;
	current: number;
	fps: number;
	playing: boolean;
}

// selection

export type BLidgeSelection = {
	active: { uuid: string, name: string } | null;
	selected: { uuid: string, name: string, type: string }[];
}

type BLidgeConnection = {
	url: string,
	ws: WebSocket,
	gltfPath?: string,
}

export class BLidge extends EventEmitter {

	// ローダーの実体はバックエンド側にあるため、EngineContractのレンダラー型はここでは特定しない
	// 初期値を書かない: static の初期化はクラス外の代入として出力され、rollup が副作用とみなして BLidge を使わないシーンの player にも残すため
	public static gltfLoaderFactory?: ( engine: EngineContract<any> ) => GLTFLoaderContract;

	private _engine: EngineContract;

	// connection

	public connection?: BLidgeConnection;

	// frame

	public frame: BLidgeFrame;

	// animation

	public nodes: BLidgeNode[];
	// シーンのカーブの表に入れるカーブ。時刻はシーンの表と同じ秒×60 に直してある
	public curves: CurveTable;
	// BLidgeNode の animations / uniforms の番号で引く
	public animations: BLidgeAnimationCurves[];
	public root: BLidgeNode | null;

	// gltf

	public gltf?: GLTF;

	// scene

	public currentScene: BLidgeScene | null;

	constructor( engine: EngineContract, url?: string ) {

		super();

		this._engine = engine;

		this.root = null;
		this.nodes = [];
		this.curves = {};
		this.animations = [];

		this.currentScene = null;

		this.frame = {
			start: 0,
			end: 100,
			current: 0,
			fps: 30,
			playing: false,
		};

		if ( url ) {

			this.connect( url );

		}

	}

	/*-------------------------------
		Connect
	-------------------------------*/

	public connect( url: string, gltfPath?: string ) {

		if ( process.env.NODE_ENV === 'development' ) {

			const ws = new WebSocket( url );
			ws.onopen = this.onOpen.bind( this );
			ws.onmessage = this.onMessage.bind( this );
			ws.onclose = this.onClose.bind( this );
			ws.onerror = ( e ) => {

				console.error( e );

				this.emit( 'error' );

			};

			this.connection = {
				url,
				ws,
				gltfPath
			};

		}

	}

	public disconnect() {

		if ( process.env.NODE_ENV === 'development' ) {

			if ( this.connection ) {

				this.connection.ws.close();
				this.connection.ws.onmessage = null;
				this.connection.ws.onclose = null;
				this.connection.ws.onopen = null;
				this.connection = undefined;

			}

		}

	}

	/*-------------------------------
		Load
	-------------------------------*/

	private binaryStringToArrayBuffer( binaryString: string ) {

		const bytes = new Uint8Array( binaryString.length );

		for ( let i = 0; i < binaryString.length; i ++ ) {

			const code = binaryString.charCodeAt( i );
			bytes[ i ] = code;

		}

		return bytes.buffer;

	}

	public async loadScene( data: BLidgeScene, gltfPath?: string ) {

		this.currentScene = data;

		// gltf

		if ( gltfPath ) {

			if ( BLidge.gltfLoaderFactory ) {

				const loader = BLidge.gltfLoaderFactory( this._engine );

				await loader.load( gltfPath ).then( gltf => {

					this.gltf = gltf;

					this.emit( "gltfLoaded", [ gltf ] );

				} );

			} else if ( process.env.NODE_ENV === 'development' ) {

				console.warn( 'BLidge: gltfLoaderFactory not wired' );

			}

		}

		await new Promise( ( r ) => {

			setTimeout( () => {

				r( null );

			}, 100 );

		} );

		// frame

		this.frame.start = data.frame.start;
		this.frame.end = data.frame.end;
		this.frame.fps = data.frame.fps;

		// fcurves: 複数のアニメーションから同じ番号で参照されるので、番号をそのまま ID にして共有させる。
		// キーの時刻は Blender のフレームなので、Animation が評価する秒×60 に直す

		const timeScale = 60 / data.frame.fps;

		this.curves = {};

		for ( let i = 0; i < data.fcurves.length; i ++ ) {

			this.curves[ BLIDGE_CURVE_PREFIX + i ] = { k: scaleKeyFrameTimes( data.fcurves[ i ].k, timeScale ) };

		}

		// actions

		this.animations = [];

		for ( const fcurveIndices of data.animations ) {

			const animation: BLidgeAnimationCurves = [];

			for ( const fcurveIndex of fcurveIndices ) {

				animation[ AXES.indexOf( data.fcurves[ fcurveIndex ].axis ) ] = BLIDGE_CURVE_PREFIX + fcurveIndex;

			}

			this.animations.push( animation );

		}

		// node

		this.nodes = [];

		const _ = ( nodeParam: BLidgeNodeParam ): BLidgeNode => {

			const node: BLidgeNode = {
				name: nodeParam.name,
				children: [],
				animations: nodeParam.animation || {},
				position: nodeParam.position || [ 0, 0, 0 ],
				rotation: nodeParam.rotation || [ 0, 0, 0 ],
				scale: nodeParam.scale || [ 1, 1, 1 ],
				uniforms: nodeParam.uniforms || {},
				type: nodeParam.type || 'empty',
				visible: nodeParam.visible !== false,
			};

			const param = nodeParam.param;

			if ( param && "position" in param ) {

				node.param = {
					position: new Float32Array( this.binaryStringToArrayBuffer( atob( param.position ) ) ),
					normal: new Float32Array( this.binaryStringToArrayBuffer( atob( param.normal ) ) ),
					uv: new Float32Array( this.binaryStringToArrayBuffer( atob( param.uv ) ) ),
					index: new Uint16Array( this.binaryStringToArrayBuffer( atob( param.index ) ) ),
				};

			} else {

				node.param = param;

			}

			if ( nodeParam.children ) {

				nodeParam.children.forEach( item => {

					node.children.push( _( item ) );

				} );

			}

			this.nodes.push( node );

			return node;

		};

		this.root = _( data.root );

		// dispatch event

		this.emit( 'sync/scene', [ this ] );
		this.onSyncTimeline( this.frame );

	}

	private onSyncTimeline( data: BLidgeFrame ) {

		this.frame = data;

		this.emit( 'sync/timeline', [ this.frame ] );

	}

	/*-------------------------------
		WS Events
	-------------------------------*/

	private onOpen( _event: Event ) {
	}

	private onMessage( e: MessageEvent ) {

		if ( process.env.NODE_ENV === 'development' ) {

			const msg = JSON.parse( e.data ) as BLidgeMessage;

			if ( msg.type == 'sync/scene' ) {

				this.loadScene( msg.data, this.connection && this.connection.gltfPath );

			} else if ( msg.type == "sync/timeline" ) {

				this.onSyncTimeline( msg.data );

			} else if ( msg.type == "sync/selection" ) {

				this.emit( 'sync/selection', [ msg.data ] );

			} else if ( msg.type == "event" ) {

				this.emit( "event/" + msg.data.type );

			}

		}

	}

	private onClose( _e:CloseEvent ) {

		this.disconnect();

	}

	/*-------------------------------
		API
	-------------------------------*/

	public setFrame( frame: number ) {

		this.onSyncTimeline( {
			...this.frame,
			playing: true,
			current: frame,
		} );

	}

	/*-------------------------------
		Props
	-------------------------------*/

	public get gltfPrm(): Promise<GLTF> {

		if ( this.gltf ) {

			return Promise.resolve( this.gltf );

		}

		return new Promise( ( resolve ) => {

			this.on( "gltfLoaded", ( gltf: GLTF ) => {

				resolve( gltf );

			} );

		} );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.disconnect();

	}

}
