import * as MTP from 'mathpower';

import { Mesh } from '../../../core/Components/Mesh';
import { SphereGeometry } from '../../../core/Geometries/SphereGeometry';
import { Material } from '../../Material';

import defaultSkyFrag from './shaders/defaultSky.fs';

import type { EngineContract } from '../../../core/Contracts/EngineContract';
import type { Entity } from '../../../core/Entity';

/*-------------------------------
	空

	レンダラーが所有する半径500の球。
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

	constructor( engine: EngineContract ) {

		this.color = new MTP.Vector( 1.0, 1.0, 1.0 );
		this.groundColor = new MTP.Vector( 0.3, 0.3, 0.3 );
		this._intensity = 1.0;

		this.material = new Material( {
			phase: [ "deferred", "envMap" ],
			frag: defaultSkyFrag,
			cullFace: false,
			uniforms: {
				uSkyColor: { value: this.color, type: "3fv" },
				uGroundColor: { value: this.groundColor, type: "3fv" },
				uSkyIntensity: { value: this._intensity, type: "1f" },
			}
		} );

		this.entity = engine.createEntity( { name: "sky" } );
		this.mesh = this.entity.addComponent( Mesh );
		this.mesh.geometry = new SphereGeometry( { radius: 500, widthSegments: 32, heightSegments: 32 } );
		this.mesh.material = this.material;

	}

	public get intensity(): number {

		return this._intensity;

	}

	public set intensity( v: number ) {

		this._intensity = v;
		this.material.uniforms.uSkyIntensity.value = v;

	}

}
