import * as MTP from 'mathpower';

import { ComponentParams, ComponentUpdateEvent } from '../../Component';
import { ShadowMapCamera } from '../Camera/ShadowMapCamera';

import type { Camera } from '../Camera';

export type LightType = 'directional' | 'spot'

export class Light extends ShadowMapCamera {

	public lightType: LightType;

	// common

	public color: MTP.Vector;
	public intensity: number;

	public castShadow: boolean;
	public shadowMapSize: MTP.Vector;

	// directional

	// 影を落とす範囲（directional のみ）。基準カメラの near からこの距離までの視錐台を囲む
	public shadowDistance: number;
	private _shadowCenter: MTP.Vector;
	private _shadowDirection: MTP.Vector;
	private _shadowUp: MTP.Vector;
	private _origin: MTP.Vector;

	// spot

	public angle: number;
	public blend: number;
	public distance: number;
	public decay: number;

	// animation

	constructor( params: ComponentParams ) {

		super( params );

		this.lightType = 'spot';
		this.cameraType = "perspective";

		this.color = new MTP.Vector( 1.0, 1.0, 1.0, 0.0 );
		this.intensity = 1;

		// shadow

		this.castShadow = true;
		this.shadowMapSize = new MTP.Vector( 1024, 1024 );

		// directional

		this.shadowDistance = 30;
		this._shadowCenter = new MTP.Vector();
		this._shadowDirection = new MTP.Vector();
		this._shadowUp = new MTP.Vector();
		this._origin = new MTP.Vector();

		// spot

		this.angle = Math.PI * 0.5;
		this.blend = 1;
		this.distance = 30;
		this.decay = 2;

		// field

		this.field( "lightType", () => this.lightType, ( v ) => this.lightType = v, { format: { type: "select", list: [ "directional", "spot" ] } } );
		this.field( "color", () => this.color.getElm( "vec3" ), ( v ) => this.color.setFromArray( v ), { format: { type: "vector" } } );
		this.field( "castShadow", () => this.castShadow, ( v ) => this.castShadow = v );
		this.field( "angle", () => this.angle, ( v ) => {

			this.angle = v;
			this.needsUpdateProjectionMatrix = true;

		} );
		this.field( "blend", () => this.blend, ( v ) => this.blend = v );
		this.field( "shadowDistance", () => this.shadowDistance, ( v ) => this.shadowDistance = v );

		this.field(
			"intensity",
			() => this.intensity,
			( value: number ) => this.intensity = value,
		);

		this.updateProjectionMatrix();

	}

	public updateProjectionMatrix(): void {

		this.fov = this.angle / Math.PI * 180;

		super.updateProjectionMatrix();

	}

	protected prepareRenderImpl( event: ComponentUpdateEvent ): void {

		// directional の view / projection は描画するビューごとに fitShadowToCamera が決める。
		// ここでエンティティ基準に戻すと、ビューの外で描くパス（環境マップ）が直前に描いたシャドウマップと食い違う
		if ( this.lightType === 'directional' ) return;

		super.prepareRenderImpl( event );

	}

	// 基準カメラの視錐台（near 〜 min( far, shadowDistance )）を囲む球から、directional のシャドウ用 view / projection を決める
	public fitShadowToCamera( camera: Camera, shadowMapResolution: number ) {

		const near = camera.near;

		// shadowDistance が near 以下でも球が潰れないよう、最低限の奥行きを残す
		const far = Math.max( Math.min( camera.far, this.shadowDistance ), near + 0.01 );

		// near 面・far 面の、視線から四隅までの距離の2乗
		let nearSpreadSq: number;
		let farSpreadSq: number;

		if ( camera.cameraType === 'perspective' ) {

			const tan = Math.tan( camera.fov * Math.PI / 360 );
			const cornerSq = tan * tan * ( 1 + camera.aspect * camera.aspect );

			nearSpreadSq = near * near * cornerSq;
			farSpreadSq = far * far * cornerSq;

		} else {

			const halfHeight = camera.orthHeight / 2;

			nearSpreadSq = halfHeight * halfHeight * ( 1 + camera.aspect * camera.aspect );
			farSpreadSq = nearSpreadSq;

		}

		// 球の中心は視線上の、near 面の四隅と far 面の四隅までの距離が等しくなる深さ。
		// 視錐台が横に広いとその深さが far より奥になるので、far 面の中心で止める
		let centerDepth = ( far * far - near * near + farSpreadSq - nearSpreadSq ) / ( 2 * ( far - near ) );
		centerDepth = Math.min( Math.max( centerDepth, near ), far );

		const nearDist = centerDepth - near;
		const farDist = far - centerDepth;
		const radius = Math.sqrt( Math.max( nearDist * nearDist + nearSpreadSq, farDist * farDist + farSpreadSq ) );

		this._shadowCenter.set( 0, 0, - centerDepth, 1 ).applyMatrix4( camera.entity.matrixWorld );

		// ライトの向き（エンティティの +Y が光源側、-Z が上）だけで回転を作る。位置は使わない
		this._shadowDirection.set( 0, 1, 0, 0 ).applyMatrix4( this.entity.matrixWorld ).normalize().multiply( - 1 );
		this._shadowUp.set( 0, 0, - 1, 0 ).applyMatrix4( this.entity.matrixWorld ).normalize();
		this.viewMatrix.lookAt( this._origin, this._shadowDirection, this._shadowUp ).inverse();

		// 球の中心をライト空間でテクセル単位に丸める。球の半径はカメラの回転では変わらないので
		// テクセルの大きさが一定になり、カメラを動かしても影の輪郭が揺れない
		const texelSize = radius * 2 / shadowMapResolution;

		this._shadowCenter.applyMatrix4( this.viewMatrix );

		// 光源側へ球の外に半径1つぶん延ばし、画面外から影を落とすキャスターも深度に収める
		const extension = radius;

		const elm = this.viewMatrix.elm;
		elm[ 12 ] = - Math.round( this._shadowCenter.x / texelSize ) * texelSize;
		elm[ 13 ] = - Math.round( this._shadowCenter.y / texelSize ) * texelSize;
		elm[ 14 ] = - ( this._shadowCenter.z + radius + extension );

		this.near = 0;
		this.far = radius * 2 + extension;
		this.projectionMatrix.orthographic( radius * 2, radius * 2, this.near, this.far );

	}

	public lookAt( targetWorldPos: MTP.Vector ) {

		this.entity.lookAt( targetWorldPos );
		this.entity.quaternion.multiply( new MTP.Quaternion( ).setFromEuler( new MTP.Euler( Math.PI / 2 ) ) );

	}

}
