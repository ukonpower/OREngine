import { setupCameraPostProcess } from '@or-renderer';
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { LookAt } from '../LookAt';

export class CameraController extends MXP.Component {

	private _lookAt: LookAt;
	private _dofTarget: MXP.Entity | null;
	private _tmpVector1: GLP.Vector;
	private _tmpVector2: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// LookAt

		this._lookAt = this.entity.addComponent( LookAt );

		// DoF

		this._dofTarget = null;
		this._tmpVector1 = new GLP.Vector();
		this._tmpVector2 = new GLP.Vector();

		// カメラ標準ポストプロセス（実体はバックエンドごとの実装に委ねる）

		const removeCameraPostProcess = setupCameraPostProcess( this.engine as any, this.entity );

		// sceneCreated

		const onSceneCreated = ( root: MXP.Entity ) => {

			const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
			this._lookAt.setTarget( lookAtTarget );

			this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

		};

		this.entity.on( 'sceneCreated', onSceneCreated );

		this.once( "dispose", () => {

			this.entity.off( 'sceneCreated', onSceneCreated );

			removeCameraPostProcess();

		} );

		// search existing scene tree

		const root = this.entity.getRootEntity();
		const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
		this._lookAt.setTarget( lookAtTarget );
		this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

	}

	protected prepareRenderImpl( _event: MXP.ComponentUpdateEvent ): void {

		const camera = this.entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( camera && this._dofTarget ) {

			this.entity.matrixWorld.decompose( this._tmpVector1 );
			this._dofTarget.matrixWorld.decompose( this._tmpVector2 );
			camera.dofParams.focusDistance = this._tmpVector1.sub( this._tmpVector2 ).length();

		}

	}

	public dispose(): void {

		super.dispose();

		this.entity.removeComponent( LookAt );

	}

}
