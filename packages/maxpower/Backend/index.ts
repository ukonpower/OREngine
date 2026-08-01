import * as GLP from 'glpower';

import type { Blending, DrawType } from '../Material';

// フォーマット・フィルタ等の定数はGL enum数値をそのまま中立値として扱う（変換はWebGPU側で行う）
export const GL = WebGL2RenderingContext;

export type TimerQueryResult = { name: string, duration: number };

export type BackendTextureSetting = GLP.Types.Nullable<GLP.GLPowerTextureSetting>;

export type BackendTextureImage = {
	width: number,
	height: number,
	data?: any
}

export type BackendFrameBufferOption = {
	disableDepthBuffer?: boolean
}

export interface BackendTexture {

	unit: number;
	size: GLP.Vector;
	readonly isTexture: boolean;

	setting( param?: BackendTextureSetting ): BackendTexture;
	attach( img: HTMLImageElement | HTMLImageElement[] | BackendTextureImage | null, flipY?: boolean ): BackendTexture;
	subImage( data: ArrayBufferView, width: number, height: number ): BackendTexture;
	activate( unitNumber: number ): BackendTexture;
	dispose(): void;

}

export type BackendCubeTexture = BackendTexture;

export interface BackendFrameBuffer {

	size: GLP.Vector;
	textures: BackendTexture[];
	depthTexture: BackendTexture | null;

	setTexture( textures: BackendTexture[] ): BackendFrameBuffer;
	setDepthTexture( depthTexture: BackendTexture | null ): void;
	setSize( size: GLP.Vector ): BackendFrameBuffer;
	setSize( width: number, height: number ): BackendFrameBuffer;
	clear(): void;

}

export interface BackendCubeFrameBuffer extends BackendFrameBuffer {

	setTexture( textures: BackendCubeTexture[] ): BackendCubeFrameBuffer;
	face( face: number ): void;

}

export interface BackendBuffer {

	setData( data: GLP.TArrayBuffer, type?: GLP.BufferType, usage?: number ): BackendBuffer;
	dispose(): void;

}

export interface BackendVAO {

	setAttribute( name: string, buffer: BackendBuffer, size: number, opt?: GLP.AttributeOptions ): BackendVAO | undefined;
	setIndex( indexBuffer: BackendBuffer | null ): void;

}

export interface BackendProgram {

	name: string;

	// 生成に失敗したprogramをキャッシュしないための実体参照
	readonly program: unknown;

	setShader( vertexShaderSrc: string, fragmentShaderSrc: string ): void;
	setUniform( name: string, type: GLP.UniformType, value: ( number | boolean )[] ): void;
	getVAO( id?: string ): BackendVAO | null;

}

// 描画コマンドの発行とGPUリソースの生成を担うバックエンド。実装はビルド時に差し替える
export interface Backend {

	readonly canvas: HTMLCanvasElement;

	// resources

	createTexture(): BackendTexture;
	createCubeTexture(): BackendCubeTexture;
	createFrameBuffer( opt?: BackendFrameBufferOption ): BackendFrameBuffer;
	createCubeFrameBuffer(): BackendCubeFrameBuffer;
	createBuffer(): BackendBuffer;
	createProgram(): BackendProgram;

	// commands

	setMaterialState( cullFace: boolean, depthTest: boolean, depthWrite: boolean ): void;
	setBlendEnabled( enabled: boolean ): void;
	bindRenderTarget( renderTarget: BackendFrameBuffer | null, viewPort?: GLP.Vector | null, canvasSize?: GLP.Vector ): void;
	clear( color: GLP.Vector | null, depth: number | null ): void;
	blit( read: BackendFrameBuffer | null, draw: BackendFrameBuffer | null, width: number, height: number, linear?: boolean, restrictColor0?: boolean ): void;
	draw( program: BackendProgram, vao: BackendVAO, drawType: DrawType, blending: Blending, queryName?: string ): void;
	collectTimerQueries(): TimerQueryResult[] | null;

}
