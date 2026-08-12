import * as BSP from 'basepower';
import * as MTP from 'mathpower';

import { Light } from '../../../core/Components/Light';
import { CLIP_CORRECTION, FRAME_FIELDS, SHADOW_FORMAT } from '../../backend/Bindings';
import { requestShaderReload } from '../../backend/HotReload';
import { UniformBinder, buildStructWgsl } from '../../backend/UniformBinder';

import shadowWgsl from './shaders/shadow.wgsl';

import type { Entity } from '../../../core/Entity';
import type { UniformField } from '../../backend/UniformBinder';

// HMRで差し替わるシェーダーソース。playerでは初期値のまま使われる
let hotShadowWgsl = shadowWgsl;

if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/shadow.wgsl', ( m ) => {

		if ( m ) hotShadowWgsl = m.default;

		requestShaderReload();

	} );

}

/*-------------------------------
	ライトのGPUリソース

	core の Light はデータのみを持つので、シャドウマップとuniform bufferは
	ここ（レンダラー側）が所有する。シャドウマップは種類ごとに1枚の
	depth 2d-array にまとめ、ライトのスロット番号がそのままレイヤー番号になる。
	これでシェーダー側はテクスチャ1つで全ライトを引ける。
-------------------------------*/

export const MAX_LIGHTS = 4;

// レイヤーを揃える必要があるため、Light.shadowMapSize ではなく固定サイズで確保する
const SHADOW_MAP_SIZE = 1024;

const DIRECTIONAL_LIGHT_STRUCT = {
	name: 'DirectionalLight',
	fields: [
		{ name: 'direction', type: 'vec3f' },
		{ name: 'color', type: 'vec3f' },
		{ name: 'shadowMatrix', type: 'mat4x4f' },
		{ name: 'useShadow', type: 'f32' },
	] as UniformField[],
};

const SPOT_LIGHT_STRUCT = {
	name: 'SpotLight',
	fields: [
		{ name: 'position', type: 'vec3f' },
		{ name: 'direction', type: 'vec3f' },
		{ name: 'color', type: 'vec3f' },
		{ name: 'angle', type: 'f32' },
		{ name: 'blend', type: 'f32' },
		{ name: 'distance', type: 'f32' },
		{ name: 'decay', type: 'f32' },
		{ name: 'shadowMatrix', type: 'mat4x4f' },
		{ name: 'useShadow', type: 'f32' },
	] as UniformField[],
};

export const LIGHT_FIELDS: UniformField[] = [
	{ name: 'directionalLight', type: DIRECTIONAL_LIGHT_STRUCT, count: MAX_LIGHTS },
	{ name: 'spotLight', type: SPOT_LIGHT_STRUCT, count: MAX_LIGHTS },
	{ name: 'numLightDir', type: 'i32' },
	{ name: 'numLightSpot', type: 'i32' },
];

// シェーディングパスがライトを引くためのbind group（group2）
export const LIGHT_BIND_GROUP_ENTRIES: GPUBindGroupLayoutEntry[] = [
	{ binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
	{ binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth', viewDimension: '2d-array' } },
	{ binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth', viewDimension: '2d-array' } },
	{ binding: 3, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } },
];

// ライトを読む側のWGSL宣言。シェーディングパスもlightShaftも同じものを使う
export const buildLightWgsl = ( group: number ) => [
	buildStructWgsl( 'LightUniforms', LIGHT_FIELDS ),
	`@group(${group}) @binding(0) var<uniform> lights: LightUniforms;`,
	`@group(${group}) @binding(1) var directionalShadowMap: texture_depth_2d_array;`,
	`@group(${group}) @binding(2) var spotShadowMap: texture_depth_2d_array;`,
	`@group(${group}) @binding(3) var shadowSampler: sampler_comparison;`,
	hotShadowWgsl,
].join( '\n\n' );

// シャドウマップ1枚ぶんの描画先とライト視点のフレームuniform
export type ShadowRender = {
	label: string;
	view: GPUTextureView;
	frameBindGroup: GPUBindGroup;
	frameBinder: UniformBinder;
}

type LightSlot = {
	direction: MTP.Vector;
	position: MTP.Vector;
	color: MTP.Vector;
	shadowMatrix: MTP.Matrix;
	shadow: ShadowRender;
}

export class Lights {

	public readonly bindGroupLayout: GPUBindGroupLayout;
	public readonly bindGroup: GPUBindGroup;

	// 今フレームで描き直すシャドウマップ
	public readonly shadowRenders: ShadowRender[];

	private _binder: UniformBinder;
	private _uniforms: BSP.Uniforms;
	private _directional: LightSlot[];
	private _spot: LightSlot[];
	private _shadowMaps: GPUTexture[];

	// ライト視点のフレームuniformを書くための一時辞書
	private _lightFrameUniforms: BSP.Uniforms;
	private _lightProjectionMatrix: MTP.Matrix;
	private _lightPosition: MTP.Vector;

	constructor( device: GPUDevice, frameLayout: GPUBindGroupLayout ) {

		this._binder = new UniformBinder( device, LIGHT_FIELDS, 'light' );
		this._uniforms = {
			numLightDir: { value: 0, type: '1i' },
			numLightSpot: { value: 0, type: '1i' },
		};

		this._shadowMaps = [ 'directional', 'spot' ].map( ( name ) => device.createTexture( {
			label: `shadowMap/${name}`,
			size: [ SHADOW_MAP_SIZE, SHADOW_MAP_SIZE, MAX_LIGHTS ],
			format: SHADOW_FORMAT,
			usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
		} ) );

		this._directional = [];
		this._spot = [];

		for ( let i = 0; i < MAX_LIGHTS; i ++ ) {

			this._directional.push( this._createSlot( device, frameLayout, 'directionalLight', i ) );
			this._spot.push( this._createSlot( device, frameLayout, 'spotLight', i ) );

		}

		this.bindGroupLayout = device.createBindGroupLayout( {
			label: 'light',
			entries: LIGHT_BIND_GROUP_ENTRIES,
		} );

		this.bindGroup = device.createBindGroup( {
			label: 'light',
			layout: this.bindGroupLayout,
			entries: [
				{ binding: 0, resource: { buffer: this._binder.buffer } },
				{ binding: 1, resource: this._shadowMaps[ 0 ].createView( { dimension: '2d-array' } ) },
				{ binding: 2, resource: this._shadowMaps[ 1 ].createView( { dimension: '2d-array' } ) },
				{ binding: 3, resource: device.createSampler( { label: 'shadow', compare: 'less', magFilter: 'linear', minFilter: 'linear' } ) },
			],
		} );

		this.shadowRenders = [];

		this._lightProjectionMatrix = new MTP.Matrix();
		this._lightPosition = new MTP.Vector();
		this._lightFrameUniforms = {
			uCameraNear: { value: 0.1, type: '1f' },
			uCameraFar: { value: 100, type: '1f' },
			uCameraPosition: { value: this._lightPosition, type: '3fv' },
			uViewMatrix: { value: new MTP.Matrix(), type: 'Matrix4fv' },
			uProjectionMatrix: { value: this._lightProjectionMatrix, type: 'Matrix4fv' },
			uResolution: { value: new MTP.Vector( SHADOW_MAP_SIZE, SHADOW_MAP_SIZE ), type: '2fv' },
		};

	}

	// ライト1灯ぶんのuniform値の置き場と、シャドウマップの描画先を用意する
	private _createSlot( device: GPUDevice, frameLayout: GPUBindGroupLayout, prefix: string, index: number ): LightSlot {

		const isSpot = prefix === 'spotLight';
		const label = `${prefix}[${index}]`;

		const direction = new MTP.Vector();
		const position = new MTP.Vector();
		const color = new MTP.Vector();
		const shadowMatrix = new MTP.Matrix();

		this._uniforms[ `${label}.direction` ] = { value: direction, type: '3fv' };
		this._uniforms[ `${label}.color` ] = { value: color, type: '3fv' };
		this._uniforms[ `${label}.shadowMatrix` ] = { value: shadowMatrix, type: 'Matrix4fv' };
		this._uniforms[ `${label}.useShadow` ] = { value: 0, type: '1f' };

		if ( isSpot ) {

			this._uniforms[ `${label}.position` ] = { value: position, type: '3fv' };
			this._uniforms[ `${label}.angle` ] = { value: 0, type: '1f' };
			this._uniforms[ `${label}.blend` ] = { value: 0, type: '1f' };
			this._uniforms[ `${label}.distance` ] = { value: 0, type: '1f' };
			this._uniforms[ `${label}.decay` ] = { value: 0, type: '1f' };

		}

		const binder = new UniformBinder( device, FRAME_FIELDS, label );

		return {
			direction,
			position,
			color,
			shadowMatrix,
			shadow: {
				label,
				view: this._shadowMaps[ isSpot ? 1 : 0 ].createView( {
					dimension: '2d',
					baseArrayLayer: index,
					arrayLayerCount: 1,
				} ),
				frameBinder: binder,
				frameBindGroup: device.createBindGroup( {
					label,
					layout: frameLayout,
					entries: [ { binding: 0, resource: { buffer: binder.buffer } } ],
				} ),
			},
		};

	}

	// シーン中のライトをスロットへ詰め、uniform bufferへ反映する
	public update( lightEntities: Entity[] ) {

		this.shadowRenders.length = 0;

		let numDirectional = 0;
		let numSpot = 0;

		for ( let i = 0; i < lightEntities.length; i ++ ) {

			const entity = lightEntities[ i ];
			const light = entity.getComponent( Light )!;
			const isSpot = light.lightType === 'spot';

			const index = isSpot ? numSpot : numDirectional;

			if ( index >= MAX_LIGHTS ) continue;

			if ( isSpot ) numSpot ++;
			else numDirectional ++;

			const label = `${isSpot ? 'spotLight' : 'directionalLight'}[${index}]`;
			const slot = ( isSpot ? this._spot : this._directional )[ index ];

			slot.position.set( 0.0, 0.0, 0.0, 1.0 ).applyMatrix4( entity.matrixWorld );
			slot.direction.set( 0.0, 1.0, 0.0, 0.0 ).applyMatrix4( entity.matrixWorld ).normalize();
			slot.color.copy( light.color ).multiply( light.intensity * Math.PI );

			if ( isSpot ) {

				this._uniforms[ `${label}.angle` ].value = Math.cos( light.angle / 2 );
				this._uniforms[ `${label}.blend` ].value = light.blend;
				this._uniforms[ `${label}.distance` ].value = light.distance;
				this._uniforms[ `${label}.decay` ].value = light.decay;

			}

			this._uniforms[ `${label}.useShadow` ].value = light.castShadow ? 1 : 0;

			if ( ! light.castShadow ) continue;

			// シャドウマップの描画とルックアップで同じ行列を使う
			this._lightProjectionMatrix.copy( CLIP_CORRECTION ).multiply( light.projectionMatrix );
			slot.shadowMatrix.copy( this._lightProjectionMatrix ).multiply( light.viewMatrix );

			this._lightPosition.copy( slot.position );
			this._lightFrameUniforms.uViewMatrix.value = light.viewMatrix;
			this._lightFrameUniforms.uCameraNear.value = light.near;
			this._lightFrameUniforms.uCameraFar.value = light.far;

			slot.shadow.frameBinder.update( this._lightFrameUniforms );

			this.shadowRenders.push( slot.shadow );

		}

		this._uniforms.numLightDir.value = numDirectional;
		this._uniforms.numLightSpot.value = numSpot;

		this._binder.update( this._uniforms );

	}

	public dispose() {

		this._binder.dispose();
		this._shadowMaps.forEach( ( texture ) => texture.destroy() );
		this._directional.concat( this._spot ).forEach( ( slot ) => slot.shadow.frameBinder.dispose() );

	}

}
