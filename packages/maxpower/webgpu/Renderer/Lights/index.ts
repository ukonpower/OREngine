import * as BSP from 'basepower';
import * as MTP from 'mathpower';

import { Light } from '../../../core/Components/Light';
import { CLIP_CORRECTION, FRAME_FIELDS, LIGHT_FIELDS, MAX_LIGHTS, SHADOW_FORMAT, lightBindGroupEntries } from '../../backend/Bindings';
import { UniformBinder } from '../../backend/UniformBinder';

import type { Camera } from '../../../core/Components/Camera';
import type { Entity } from '../../../core/Entity';

/*-------------------------------
	ライトのGPUリソース

	core の Light はデータのみを持つので、シャドウマップとuniform bufferは
	ここ（レンダラー側）が所有する。シャドウマップは種類ごとに1枚の
	depth 2d-array にまとめ、ライトのスロット番号がそのままレイヤー番号になる。
	これでシェーダー側はテクスチャ1つで全ライトを引ける。
	束縛の宣言（uniform の並び・WGSL）は Bindings が持つ。
-------------------------------*/

// レイヤーを揃える必要があるため、Light.shadowMapSize ではなく固定サイズで確保する
const SHADOW_MAP_SIZE = 1024;

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

	// シェーディングパスとライトを使うポストプロセスが group2 で読む
	public readonly bindGroupLayout: GPUBindGroupLayout;
	public readonly bindGroup: GPUBindGroup;

	// prepareScene で描き直す spot のシャドウマップ
	public readonly shadowRenders: ShadowRender[];

	// ビューごとに描き直す directional のシャドウマップ
	public readonly directionalShadowRenders: ShadowRender[];

	private _binder: UniformBinder;
	private _uniforms: BSP.Uniforms;
	private _directional: LightSlot[];
	private _spot: LightSlot[];
	private _directionalShadows: { light: Light, slot: LightSlot }[];
	private _shadowMaps: GPUTexture[];
	private _shadowMapViews: GPUTextureView[];
	private _shadowSampler: GPUSampler;

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

		this._shadowMapViews = this._shadowMaps.map( ( texture ) => texture.createView( { dimension: '2d-array' } ) );
		this._shadowSampler = device.createSampler( { label: 'shadow', compare: 'less', magFilter: 'linear', minFilter: 'linear' } );

		this.bindGroupLayout = device.createBindGroupLayout( {
			label: 'light',
			entries: lightBindGroupEntries( 0 ),
		} );

		this.bindGroup = device.createBindGroup( {
			label: 'light',
			layout: this.bindGroupLayout,
			entries: this.bindGroupEntries( 0 ),
		} );

		this.shadowRenders = [];
		this.directionalShadowRenders = [];
		this._directionalShadows = [];

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

	// ライトの束縛の中身。binding は start から lightBindGroupEntries と同じ並びで振る。
	// group2 の bindGroup も、Renderer が組む forward系の group3 も、この1組を指す
	public bindGroupEntries( start: number ): GPUBindGroupEntry[] {

		return [
			{ binding: start, resource: { buffer: this._binder.buffer } },
			{ binding: start + 1, resource: this._shadowMapViews[ 0 ] },
			{ binding: start + 2, resource: this._shadowMapViews[ 1 ] },
			{ binding: start + 3, resource: this._shadowSampler },
		];

	}

	// シーン中のライトをスロットへ詰め、uniform bufferへ反映する
	public update( lightEntities: Entity[] ) {

		this.shadowRenders.length = 0;
		this.directionalShadowRenders.length = 0;
		this._directionalShadows.length = 0;

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
			// directional は照度 W/m² をそのまま、spot は放射束 W を全方向の放射強度 W/sr（W / 4π）にして渡す。
			// spot の W がコーンに光を集めない（点光源と同じ明るさでコーンの外を切るだけ）のは Blender の約束に合わせている
			slot.color.copy( light.color ).multiply( light.intensity );

			if ( isSpot ) slot.color.multiply( 1 / ( 4 * Math.PI ) );

			if ( isSpot ) {

				this._uniforms[ `${label}.angle` ].value = Math.cos( light.angle / 2 );
				this._uniforms[ `${label}.blend` ].value = light.blend;

			}

			this._uniforms[ `${label}.useShadow` ].value = light.castShadow ? 1 : 0;

			if ( ! light.castShadow ) continue;

			// directional は描くビューのカメラ基準で範囲が変わるので、fitDirectionalShadows でビューごとに書く
			if ( ! isSpot ) {

				this._directionalShadows.push( { light, slot } );
				this.directionalShadowRenders.push( slot.shadow );

				continue;

			}

			this._writeShadow( light, slot );

			this.shadowRenders.push( slot.shadow );

		}

		this._uniforms.numLightDir.value = numDirectional;
		this._uniforms.numLightSpot.value = numSpot;

		this._binder.update( this._uniforms );

	}

	// 描画するビューのカメラに合わせて directional のシャドウ範囲を決め直し、uniform を書き直す
	public fitDirectionalShadows( camera: Camera ) {

		if ( this._directionalShadows.length === 0 ) return;

		for ( const { light, slot } of this._directionalShadows ) {

			light.fitShadowToCamera( camera, SHADOW_MAP_SIZE );

			this._writeShadow( light, slot );

		}

		this._binder.update( this._uniforms );

	}

	// シャドウマップの描画とルックアップで同じ行列を使うよう、両方の uniform へライトの view / projection を写す
	private _writeShadow( light: Light, slot: LightSlot ) {

		this._lightProjectionMatrix.copy( CLIP_CORRECTION ).multiply( light.projectionMatrix );
		slot.shadowMatrix.copy( this._lightProjectionMatrix ).multiply( light.viewMatrix );

		this._lightPosition.copy( slot.position );
		this._lightFrameUniforms.uViewMatrix.value = light.viewMatrix;
		this._lightFrameUniforms.uCameraNear.value = light.near;
		this._lightFrameUniforms.uCameraFar.value = light.far;

		slot.shadow.frameBinder.update( this._lightFrameUniforms );

	}

	public dispose() {

		this._binder.dispose();
		this._shadowMaps.forEach( ( texture ) => texture.destroy() );
		this._directional.concat( this._spot ).forEach( ( slot ) => slot.shadow.frameBinder.dispose() );

	}

}
