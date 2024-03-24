import * as GLP from 'glpower';

import { GLTF, GLTFLoader } from '../Loaders/GLTFLoader';

export type BLidgeNodeType = 'empty' | 'cube' | 'sphere' | 'cylinder' | 'mesh' | 'camera' | 'plane' | 'light' | 'gltf';

// scene

export type BLidgeScene = {
    animations: {[key: string]: BLidgeCurveParam[]};
	root: BLidgeNodeParam;
	frame: BLidgeFrame;
}

// node

export type BLidgeNodeParam = {
	name: string,
	class: string,
	type: BLidgeNodeType,
	param?: BLidgeCameraParam | BLidgeMeshParamRaw | BLidgeLightParamCommon
	parent: string,
	children?: BLidgeNodeParam[],
	animation?: BLidgeAnimationAccessor,
	position: number[],
	rotation: number[],
	scale: number[],
	material?: {
		name?: string,
		uniforms?: BLidgeAnimationAccessor
	},
	visible: boolean,
}

export type BLidgeNode = {
	name: string,
	class: string,
	type: BLidgeNodeType,
	param?: BLidgeCameraParam | BLidgeMeshParam | BLidgeLightParamCommon
	parent: string,
	children: BLidgeNode[],
	animation: BLidgeAnimationAccessor,
	position: number[],
	rotation: number[],
	scale: number[],
	material: BLidgeMaterialParam
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
	color: GLP.IVector3,
	intensity: number,
	shadowMap: boolean,
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

// material

export type BLidgeMaterialParam = {
	name: string,
	uniforms: BLidgeAnimationAccessor
}

// animation

export type BLidgeAnimationAccessor = { [key: string]: string }

export type BLidgeCurveAxis = 'x' | 'y' | 'z' | 'w'

export type BLidgeCurveParam = {
    k: BLidgeKeyFrameParam[];
	axis: BLidgeCurveAxis
}

export type BLidgeKeyFrameParam = {
    c: number[];
    h_l?: number[];
    h_r?: number[];
    e: string;
    i: "B" | "L" | "C";
}

// message

export type BLidgeMessage = BLidgeSyncSceneMessage | BLidgeSyncTimelineMessage | BLidgeEventMessage

export type BLidgeSyncSceneMessage = {
	type: "sync/scene",
    data: BLidgeScene;
}

export type BLidgeSyncTimelineMessage = {
	type: "sync/timeline";
	data: BLidgeFrame;
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

type BLidgeConnection = {
	url: string,
	ws: WebSocket,
	gltfPath?: string,
}

export class BLidge extends GLP.EventEmitter {

	// gl

	private gl: WebGL2RenderingContext;

	// connection

	public connection?: BLidgeConnection;

	// frame

	public frame: BLidgeFrame;

	// animation

	public nodes: BLidgeNode[];
	public curveGroups: GLP.FCurveGroup[];
	public root: BLidgeNode | null;

	// gltf

	private gltfLoader: GLTFLoader;
	public gltf?: GLTF;

	// scene

	public currentScene: BLidgeScene | null;

	constructor( gl: WebGL2RenderingContext, url?: string ) {

		super();

		this.gl = gl;

		this.root = null;
		this.nodes = [];
		this.curveGroups = [];

		this.currentScene = null;

		this.frame = {
			start: 0,
			end: 100,
			current: 0,
			fps: 30,
			playing: false,
		};

		this.gltfLoader = new GLTFLoader( gl );

		if ( url ) {

			this.connect( url );

		}

	}

	/*-------------------------------
		Connect
	-------------------------------*/

	public connect( url: string, gltfPath?: string ) {

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

	public disconnect() {

		if ( this.connection ) {

			this.connection.ws.close();
			this.connection.ws.onmessage = null;
			this.connection.ws.onclose = null;
			this.connection.ws.onopen = null;
			this.connection = undefined;

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

	public async loadJsonScene( jsonPath: string, gltfPath?:string ) {

		await new Promise( ( r ) => {

			const req = new XMLHttpRequest();

			req.onreadystatechange = async () => {

				if ( req.readyState == 4 ) {

					if ( req.status == 200 ) {

						await this.loadScene( JSON.parse( req.response ), gltfPath );

						r( null );

					}

				}

			};

			req.open( 'GET', jsonPath );
			req.send( );

		} );

	}

	public async loadScene( data: BLidgeScene, gltfPath?: string ) {

		this.currentScene = data;

		// gltf

		if ( gltfPath ) {

			const loader = new GLTFLoader( this.gl );

			await loader.load( gltfPath ).then( gltf => {

				this.gltf = gltf;

				this.emit( "gltfLoaded", [ gltf ] );

			} );

		}

		// frame

		this.frame.start = data.frame.start;
		this.frame.end = data.frame.end;
		this.frame.fps = data.frame.fps;

		this.curveGroups.length = 0;
		this.nodes.length = 0;

		// actions

		const fcurveGroupNames = Object.keys( data.animations );

		for ( let i = 0; i < fcurveGroupNames.length; i ++ ) {

			const fcurveGroupName = fcurveGroupNames[ i ];
			const fcurveGroup = new GLP.FCurveGroup( fcurveGroupName );

			data.animations[ fcurveGroupName ].forEach( fcurveData => {

				const curve = new GLP.FCurve();

				curve.set( fcurveData.k.map( frame => {

					const interpolation = {
						"B": "BEZIER",
						"C": "CONSTANT",
						"L": "LINEAR",
					}[ frame.i ];

					return new GLP.FCurveKeyFrame(
						{ x: frame.c[ 0 ], y: frame.c[ 1 ] },
						frame.h_l && { x: frame.h_l[ 0 ], y: frame.h_l[ 1 ] },
						frame.h_r && { x: frame.h_r[ 0 ], y: frame.h_r[ 1 ] },
					interpolation as GLP.FCurveInterpolation );

				} ) );

				fcurveGroup.setFCurve( curve, fcurveData.axis );

			} );

			this.curveGroups.push( fcurveGroup );

		}

		// node

		this.nodes.length = 0;

		const _ = ( nodeParam: BLidgeNodeParam ): BLidgeNode => {

			const mat = { name: '', uniforms: {} };

			if ( nodeParam.material ) {

				mat.name = nodeParam.material.name || '';
				mat.uniforms = nodeParam.material.uniforms || {};

			}

			const node: BLidgeNode = {
				name: nodeParam.name,
				class: nodeParam.class,
				parent: nodeParam.parent,
				children: [],
				animation: nodeParam.animation || {},
				position: nodeParam.position || new GLP.Vector(),
				rotation: nodeParam.rotation || new GLP.Vector(),
				scale: nodeParam.scale || new GLP.Vector(),
				material: mat,
				type: nodeParam.type,
				visible: nodeParam.visible,
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

	private onOpen( event: Event ) {
	}

	private onMessage( e: MessageEvent ) {

		const msg = JSON.parse( e.data ) as BLidgeMessage;

		if ( msg.type == 'sync/scene' ) {

			this.loadScene( msg.data, this.connection && this.connection.gltfPath );

		} else if ( msg.type == "sync/timeline" ) {

			this.onSyncTimeline( msg.data );

		} else if ( msg.type == "event" ) {

			this.emit( "event/" + msg.data.type );

		}


	}

	private onClose( e:CloseEvent ) {

		this.disconnect();

	}

	/*-------------------------------
		API
	-------------------------------*/

	public getCurveGroup( name: string ) {

		return this.curveGroups.find( curve => curve.name == name );

	}

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
