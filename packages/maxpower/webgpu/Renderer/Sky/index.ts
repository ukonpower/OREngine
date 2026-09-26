import * as MTP from 'mathpower';

import { Mesh } from '../../../core/Components/Mesh';
import { SphereGeometry } from '../../../core/Geometries/SphereGeometry';
import { requestShaderReload } from '../../backend/HotReload';
import { Material } from '../../Material';

import defaultSkyWgsl from './shaders/defaultSky.wgsl';

import type { Camera } from '../../../core/Components/Camera';
import type { EngineContract } from '../../../core/Contracts/EngineContract';
import type { Entity } from '../../../core/Entity';

/*-------------------------------
	空

	webgl側の Sky と同じく、レンダラーが所有する半径1の球。描く直前に followCamera / place で
	描画カメラを中心・far の手前まで広げるので、カメラがどこへ動いても外に出ない。
	模様は位置でなく向きから作る（shaderModules/sky.wgsl）。
	deferred（背景として見える）と envMap（環境光の元になる）の両方に参加する。
	マテリアルは差し替え可能で、プロジェクト側のコンポーネントが
	`renderer.sky.mesh.material` を置き換えれば独自の空になる。
-------------------------------*/

export class Sky {

	public readonly entity: Entity;
	public readonly mesh: Mesh;
	public readonly material: Material;
	public readonly color: MTP.Vector;
	public readonly groundColor: MTP.Vector;

	private _intensity: number;
	private _position: MTP.Vector;
	private _positionPrev: MTP.Vector;
	private _scale: MTP.Vector;
	private _viewMatrixPrevInverse: MTP.Matrix;

	constructor( engine: EngineContract ) {

		this.color = new MTP.Vector( 1.0, 1.0, 1.0 );
		this.groundColor = new MTP.Vector( 0.3, 0.3, 0.3 );
		this._intensity = 1.0;
		this._position = new MTP.Vector();
		this._positionPrev = new MTP.Vector();
		this._scale = new MTP.Vector();
		this._viewMatrixPrevInverse = new MTP.Matrix();

		this.material = new Material( {
			name: 'defaultSky',
			phase: [ 'deferred', 'envMap' ],
			wgsl: defaultSkyWgsl,
			uniforms: {
				uSkyColor: { value: this.color, type: '3fv' },
				uGroundColor: { value: this.groundColor, type: '3fv' },
				uSkyIntensity: { value: this._intensity, type: '1f' },
			},
		} );

		this.entity = engine.createEntity( { name: 'sky' } );
		this.mesh = this.entity.addComponent( Mesh );
		this.mesh.geometry = new SphereGeometry( { radius: 1, widthSegments: 32, heightSegments: 32 } );
		this.mesh.material = this.material;

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/defaultSky.wgsl', ( m ) => {

				if ( m ) this.material.wgsl = m.default;

				requestShaderReload();

			} );

		}

	}

	// 空の行列を描画カメラ基準に書き換える。前フレームの位置を viewMatrixPrev から取ると速度計算の平行移動と
	// 打ち消し合い、空の速度はカメラの回転ぶんだけになる（エディタカメラの matrixWorldPrev は使用中しか更新されないので使わない）
	public followCamera( cameraEntity: Entity, camera: Camera ) {

		const cameraMatrix = cameraEntity.matrixWorld.elm;
		const viewMatrixPrevInverse = this._viewMatrixPrevInverse.copy( camera.viewMatrixPrev ).inverse().elm;

		this._position.set( cameraMatrix[ 12 ], cameraMatrix[ 13 ], cameraMatrix[ 14 ] );
		this._positionPrev.set( viewMatrixPrevInverse[ 12 ], viewMatrixPrevInverse[ 13 ], viewMatrixPrevInverse[ 14 ] );

		this.place( this._position, this._positionPrev, camera.far );

	}

	// 空を position 中心に置く。深度もポストエフェクトが読む position も far の手前に揃えるため、大きさは far * 0.99。
	// カメラの entity を持たない envMap の面カメラは、これを直接呼ぶ
	public place( position: MTP.Vector, positionPrev: MTP.Vector, far: number ) {

		const radius = far * 0.99;

		this._scale.set( radius, radius, radius );

		this.entity.matrixWorld.setFromTransform( position, undefined, this._scale );
		this.entity.matrixWorldPrev.setFromTransform( positionPrev, undefined, this._scale );

	}

	public get intensity(): number {

		return this._intensity;

	}

	public set intensity( value: number ) {

		this._intensity = value;
		this.material.uniforms.uSkyIntensity.value = value;

	}

}
