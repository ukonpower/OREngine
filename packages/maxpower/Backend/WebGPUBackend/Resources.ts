import * as GLP from 'glpower';

import { GL } from '..';

import type { BackendBuffer, BackendCubeFrameBuffer, BackendCubeTexture, BackendFrameBuffer, BackendFrameBufferOption, BackendTexture, BackendTextureImage, BackendTextureSetting, BackendVAO } from '..';

/*-------------------------------
	WebGPU の型・定数
-------------------------------*/

// device は非同期に用意されるため、リソースは参照経由で遅延生成する。
// units は activate() で登録されるテクスチャユニット表で、draw 時の bind group 構築に使う
export type GPUState = {
	device: GPUDevice | null,
	units: ( WebGPUTexture | null )[],
};

export const DEPTH_FORMAT: GPUTextureFormat = 'depth24plus';

// GL の internalFormat → WebGPU のテクスチャフォーマット
const TEXTURE_FORMAT = new Map<number, GPUTextureFormat>( [
	[ GL.RGBA, 'rgba8unorm' ],
	[ GL.RGBA8, 'rgba8unorm' ],
	[ GL.RGBA16F, 'rgba16float' ],
	[ GL.RGBA32F, 'rgba32float' ],
	[ GL.DEPTH_COMPONENT16, DEPTH_FORMAT ],
	[ GL.DEPTH_COMPONENT24, DEPTH_FORMAT ],
	[ GL.DEPTH_COMPONENT32F, DEPTH_FORMAT ],
] );

const BYTES_PER_PIXEL = new Map<GPUTextureFormat, number>( [
	[ 'rgba8unorm', 4 ],
	[ 'rgba16float', 8 ],
	[ 'rgba32float', 16 ],
] );

const FILTER = new Map<number, GPUFilterMode>( [
	[ GL.NEAREST, 'nearest' ],
	[ GL.LINEAR, 'linear' ],
	[ GL.NEAREST_MIPMAP_NEAREST, 'nearest' ],
	[ GL.LINEAR_MIPMAP_LINEAR, 'linear' ],
] );

const WRAP = new Map<number, GPUAddressMode>( [
	[ GL.CLAMP_TO_EDGE, 'clamp-to-edge' ],
	[ GL.REPEAT, 'repeat' ],
	[ GL.MIRRORED_REPEAT, 'mirror-repeat' ],
] );

// rgba32float は線形補間もブレンドもできない
// depthテクスチャもfloatとしてサンプルする際は unfilterable-float + non-filtering でしかバインドできない
export const isUnfilterable = ( format: GPUTextureFormat ) => format === 'rgba32float' || format === DEPTH_FORMAT;

export const isDepth = ( format: GPUTextureFormat ) => format === DEPTH_FORMAT;

/*-------------------------------
	Texture
-------------------------------*/

let textureCount = 0;

export class WebGPUTexture implements BackendTexture {

	public unit: number;
	public size: GLP.Vector;
	public image: HTMLImageElement | HTMLImageElement[] | BackendTextureImage | null;

	// bind group のキャッシュキーに使う識別子。generationはGPUTextureを作り直すたびに進む
	public readonly id: number;
	public generation: number;

	protected _state: GPUState;
	protected _setting: GLP.GLPowerTextureSetting;
	protected _texture: GPUTexture | null;
	protected _sampler: GPUSampler | null;
	protected _needsUpload: boolean;
	protected _flipY: boolean;

	constructor( state: GPUState ) {

		this._state = state;
		this.id = textureCount ++;
		this.generation = 0;
		this.unit = 0;
		this.size = new GLP.Vector( 1, 1 );
		this.image = null;

		this._texture = null;
		this._sampler = null;
		this._needsUpload = false;
		this._flipY = false;

		this._setting = {
			type: GL.UNSIGNED_BYTE,
			internalFormat: GL.RGBA,
			format: GL.RGBA,
			magFilter: GL.NEAREST,
			minFilter: GL.NEAREST,
			generateMipmap: false,
			wrapS: GL.CLAMP_TO_EDGE,
			wrapT: GL.CLAMP_TO_EDGE,
		};

	}

	public get isTexture() {

		return true;

	}

	public get format(): GPUTextureFormat {

		return TEXTURE_FORMAT.get( this._setting.internalFormat ) || 'rgba8unorm';

	}

	// キューブマップは6レイヤーで持つ
	protected get layers() {

		return 1;

	}

	public setting( param?: BackendTextureSetting ) {

		this._setting = { ...this._setting, ...param };

		this._release();

		return this;

	}

	public attach( img: HTMLImageElement | HTMLImageElement[] | BackendTextureImage | null, flipY?: boolean ) {

		this.image = img;
		this._flipY = flipY === true;

		const first = Array.isArray( img ) ? img[ 0 ] : img;

		this.size.set( first ? first.width : 1, first ? first.height : 1 );

		this._release();

		return this;

	}

	// テクスチャ全体へ配列データを書き込む（GL の texSubImage2D 相当）
	public subImage( data: ArrayBufferView, width: number, height: number ) {

		const device = this._state.device;
		const texture = this.getTexture();

		if ( device && texture ) {

			device.queue.writeTexture(
				{ texture },
				data as GPUAllowSharedBufferSource,
				{ bytesPerRow: width * ( BYTES_PER_PIXEL.get( this.format ) || 4 ) },
				{ width, height },
			);

		}

		return this;

	}

	// GL のテクスチャユニットの意味論を模倣し、ユニット表へ自身を登録する
	public activate( unitNumber: number ) {

		this.unit = unitNumber;
		this._state.units[ unitNumber ] = this;

		return this;

	}

	// GPUTexture を必要になった時点で生成し、保留中のアップロードを流す
	public getTexture(): GPUTexture | null {

		const device = this._state.device;

		if ( ! device ) return null;

		if ( ! this._texture ) {

			const depth = isDepth( this.format );

			this._texture = device.createTexture( {
				size: [ Math.max( this.size.x, 1 ), Math.max( this.size.y, 1 ), this.layers ],
				format: this.format,
				usage: depth
					? GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
					: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_SRC | GPUTextureUsage.COPY_DST,
			} );

			this._needsUpload = this.image !== null;

		}

		if ( this._needsUpload ) {

			this._upload( device, this._texture );
			this._needsUpload = false;

		}

		return this._texture;

	}

	public getView(): GPUTextureView | null {

		const texture = this.getTexture();

		return texture && texture.createView();

	}

	public getSampler(): GPUSampler | null {

		const device = this._state.device;

		if ( ! device ) return null;

		if ( ! this._sampler ) {

			// unfilterable なフォーマットへ linear を指定すると bind group が組めない
			const filter = isUnfilterable( this.format ) ? 'nearest' : null;

			this._sampler = device.createSampler( {
				magFilter: filter || FILTER.get( this._setting.magFilter ) || 'nearest',
				minFilter: filter || FILTER.get( this._setting.minFilter ) || 'nearest',
				addressModeU: WRAP.get( this._setting.wrapS ) || 'clamp-to-edge',
				addressModeV: WRAP.get( this._setting.wrapT ) || 'clamp-to-edge',
			} );

		}

		return this._sampler;

	}

	protected _upload( device: GPUDevice, texture: GPUTexture ) {

		const image = this.image;

		if ( ! image ) return;

		const list = Array.isArray( image ) ? image : [ image ];

		for ( let i = 0; i < list.length; i ++ ) {

			const img = list[ i ];

			if ( img instanceof HTMLImageElement || img instanceof HTMLCanvasElement ) {

				device.queue.copyExternalImageToTexture(
					{ source: img, flipY: this._flipY },
					{ texture, origin: [ 0, 0, i ] },
					[ img.width, img.height ],
				);

			} else if ( img.data ) {

				device.queue.writeTexture(
					{ texture, origin: [ 0, 0, i ] },
					img.data,
					{ bytesPerRow: img.width * ( BYTES_PER_PIXEL.get( this.format ) || 4 ) },
					{ width: img.width, height: img.height },
				);

			}

		}

	}

	protected _release() {

		if ( this._texture ) {

			this._texture.destroy();
			this._texture = null;
			this.generation ++;

		}

		this._sampler = null;

	}

	public dispose() {

		this._release();

	}

}

export class WebGPUCubeTexture extends WebGPUTexture implements BackendCubeTexture {

	protected get layers() {

		return 6;

	}

	public getView(): GPUTextureView | null {

		const texture = this.getTexture();

		return texture && texture.createView( { dimension: 'cube' } );

	}

	// レンダーターゲットとして使う面のビュー
	public getFaceView( face: number ): GPUTextureView | null {

		const texture = this.getTexture();

		return texture && texture.createView( { dimension: '2d', baseArrayLayer: face, arrayLayerCount: 1 } );

	}

}

/*-------------------------------
	FrameBuffer
-------------------------------*/

export class WebGPUFrameBuffer implements BackendFrameBuffer {

	public size: GLP.Vector;
	public textures: WebGPUTexture[];
	public depthTexture: WebGPUTexture | null;

	protected _state: GPUState;

	constructor( state: GPUState, opt?: BackendFrameBufferOption ) {

		this._state = state;
		this.size = new GLP.Vector( 1, 1 );
		this.textures = [];
		this.depthTexture = null;

		if ( ! opt || ! opt.disableDepthBuffer ) {

			this.setDepthTexture( new WebGPUTexture( state ).setting( {
				internalFormat: GL.DEPTH_COMPONENT32F,
				format: GL.DEPTH_COMPONENT,
				type: GL.FLOAT,
			} ) );

		}

	}

	public setDepthTexture( depthTexture: BackendTexture | null ) {

		this.depthTexture = depthTexture as WebGPUTexture | null;

	}

	public setTexture( textures: BackendTexture[] ) {

		this.textures = textures as WebGPUTexture[];

		this.textures.forEach( ( t ) => {

			t.attach( { width: this.size.x, height: this.size.y } );

		} );

		return this;

	}

	public setSize( size: GLP.Vector ): WebGPUFrameBuffer

	public setSize( width: number, height: number ): WebGPUFrameBuffer

	public setSize( width_size: number | GLP.Vector, height?: number ): WebGPUFrameBuffer {

		if ( typeof width_size == 'number' ) {

			this.size.x = width_size;

			if ( height !== undefined ) {

				this.size.y = height;

			}

		} else {

			this.size.copy( width_size );

		}

		this.size.floor();

		this.setTexture( this.textures );

		if ( this.depthTexture ) {

			this.depthTexture.attach( { width: this.size.x, height: this.size.y } );

		}

		return this;

	}

	// カラーアタッチメントを0でクリアする
	public clear() {

		const device = this._state.device;

		if ( ! device || this.textures.length === 0 ) return;

		const views = this.textures.map( ( t ) => t.getView() );

		if ( views.some( ( v ) => v === null ) ) return;

		const encoder = device.createCommandEncoder();

		const pass = encoder.beginRenderPass( {
			colorAttachments: views.map( ( view ) => ( {
				view: view!,
				clearValue: { r: 0, g: 0, b: 0, a: 0 },
				loadOp: 'clear' as const,
				storeOp: 'store' as const,
			} ) ),
		} );

		pass.end();

		device.queue.submit( [ encoder.finish() ] );

	}

}

export class WebGPUCubeFrameBuffer extends WebGPUFrameBuffer implements BackendCubeFrameBuffer {

	public currentFace: number;

	constructor( state: GPUState, opt?: BackendFrameBufferOption ) {

		super( state, opt );

		this.currentFace = 0;

	}

	public setTexture( textures: BackendTexture[] ) {

		super.setTexture( textures );

		return this;

	}

	public face( face: number ) {

		this.currentFace = face;

	}

}

/*-------------------------------
	Buffer
-------------------------------*/

export class WebGPUBuffer implements BackendBuffer {

	public array: GLP.TArrayBuffer | null;
	public type: GLP.BufferType;

	private _state: GPUState;
	private _buffer: GPUBuffer | null;

	constructor( state: GPUState ) {

		this._state = state;
		this._buffer = null;
		this.array = null;
		this.type = 'vbo';

	}

	public setData( data: GLP.TArrayBuffer, type: GLP.BufferType = 'vbo' ) {

		this.array = data;
		this.type = type;

		if ( this._buffer ) {

			this._buffer.destroy();
			this._buffer = null;

		}

		return this;

	}

	public getBuffer(): GPUBuffer | null {

		const device = this._state.device;

		if ( ! device || ! this.array ) return null;

		if ( ! this._buffer ) {

			// writeBuffer は4バイト単位でしか書けない
			const size = Math.ceil( this.array.byteLength / 4 ) * 4;

			this._buffer = device.createBuffer( {
				size,
				usage: ( this.type == 'vbo' ? GPUBufferUsage.VERTEX : GPUBufferUsage.INDEX ) | GPUBufferUsage.COPY_DST,
			} );

			device.queue.writeBuffer( this._buffer, 0, this.array as GPUAllowSharedBufferSource );

		}

		return this._buffer;

	}

	public dispose() {

		if ( this._buffer ) {

			this._buffer.destroy();
			this._buffer = null;

		}

	}

}

/*-------------------------------
	VAO
-------------------------------*/

export type VAOAttribute = {
	buffer: WebGPUBuffer,
	size: number,
	count: number,
	instanceDivisor?: number,
};

export class WebGPUVAO implements BackendVAO {

	public attributes: Map<string, VAOAttribute>;
	public indexBuffer: WebGPUBuffer | null;
	public vertCount: number;
	public indexCount: number;
	public instanceCount: number;

	// 頂点レイアウトが同じ pipeline を共有するためのキー
	public layoutKey: string;

	constructor() {

		this.attributes = new Map();
		this.indexBuffer = null;
		this.vertCount = 0;
		this.indexCount = 0;
		this.instanceCount = 0;
		this.layoutKey = '';

	}

	public setAttribute( name: string, buffer: BackendBuffer, size: number, opt?: GLP.AttributeOptions ) {

		const buf = buffer as WebGPUBuffer;

		if ( buf.array === null ) return;

		this.attributes.set( name, {
			buffer: buf,
			size,
			count: buf.array.length / size,
			instanceDivisor: opt && opt.instanceDivisor,
		} );

		this._update();

		return this;

	}

	public setIndex( indexBuffer: BackendBuffer | null ) {

		this.indexBuffer = indexBuffer as WebGPUBuffer | null;

		if ( this.indexBuffer && this.indexBuffer.array ) {

			this.indexCount = this.indexBuffer.array.length;

		}

	}

	private _update() {

		this.vertCount = 0;
		this.instanceCount = 0;

		const keys: string[] = [];

		this.attributes.forEach( ( attribute, name ) => {

			if ( attribute.instanceDivisor === undefined && name != 'index' ) {

				this.vertCount = Math.max( this.vertCount, attribute.count );

			}

			if ( attribute.instanceDivisor !== undefined && attribute.instanceDivisor > 0 ) {

				this.instanceCount = this.instanceCount == 0
					? attribute.count
					: Math.min( this.instanceCount, attribute.count );

			}

			keys.push( `${name}:${attribute.size}:${attribute.buffer.array!.constructor.name}:${attribute.instanceDivisor ?? - 1}` );

		} );

		this.layoutKey = keys.join( ',' );

	}

}
