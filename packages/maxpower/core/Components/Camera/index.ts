import * as MTP from 'mathpower';

import { Component, ComponentParams, ComponentUpdateEvent } from "../../Component";

export type CameraType = 'perspective' | 'orthographic'

export type DofParams = {
	focusDistance: number;
	kFilmHeight: number;
	// 絞りのF値。小さいほどボケが大きい
	fNumber: number;
}

export class Camera extends Component {

	public cameraType: CameraType;

	public fov: number;
	public aspect: number;
	public near: number;
	public far: number;

	public orthWidth: number;
	public orthHeight: number;

	public projectionMatrix: MTP.Matrix;
	public viewMatrix: MTP.Matrix;

	public projectionMatrixPrev: MTP.Matrix;
	public viewMatrixPrev: MTP.Matrix;
	private _historyInitialized: boolean;

	public needsUpdateProjectionMatrix: boolean;

	public displayOut: boolean;

	public viewPort: MTP.Vector | null;

	public dofParams: DofParams;

	constructor( params: ComponentParams ) {

		super( params );

		this.cameraType = 'perspective';

		this.viewMatrix = new MTP.Matrix();
		this.projectionMatrix = new MTP.Matrix();

		this.viewMatrixPrev = new MTP.Matrix();
		this.projectionMatrixPrev = new MTP.Matrix();
		this._historyInitialized = false;

		this.viewPort = null;

		this.fov = 50;
		this.near = 0.1;
		this.far = 1000;
		this.aspect = 1.0;

		this.orthWidth = 1;
		this.orthHeight = 1;

		this.needsUpdateProjectionMatrix = true;
		this.displayOut = true;

		this.dofParams = {
			focusDistance: 0.5,
			kFilmHeight: 0.008,
			fNumber: 0.3,
		};

		const markDirty = () => {

			this.needsUpdateProjectionMatrix = true;

		};

		this.field( "fov", () => this.fov, ( v ) => {

			this.fov = v;
			markDirty();

		} );

		this.field( "near", () => this.near, ( v ) => {

			this.near = v;
			markDirty();

		} );

		this.field( "far", () => this.far, ( v ) => {

			this.far = v;
			markDirty();

		} );

		this.field( "orthWidth", () => this.orthWidth, ( v ) => {

			this.orthWidth = v;
			markDirty();

		} );

		this.field( "orthHeight", () => this.orthHeight, ( v ) => {

			this.orthHeight = v;
			markDirty();

		} );

		this.field( "fNumber", () => this.dofParams.fNumber, ( v ) => {

			this.dofParams.fNumber = v;

		}, { step: 0.05 } );

		this._tag = "camera";

	}

	public updateProjectionMatrix() {


		if ( this.cameraType == 'perspective' ) {

			this.projectionMatrix.perspective( this.fov, this.aspect, this.near, this.far );

		} else {

			this.projectionMatrix.orthographic( this.orthWidth, this.orthHeight, this.near, this.far );

		}

		this.needsUpdateProjectionMatrix = false;

	}

	public updateViewMatrix() {

		this.viewMatrix.copy( this.entity.matrixWorld ).inverse();

	}

	protected updateImpl( event: ComponentUpdateEvent ): void {

		if ( this.displayOut ) {

			const newAspect = event.resolution.x / event.resolution.y;

			if ( this.aspect !== newAspect ) {

				this.aspect = newAspect;
				this.needsUpdateProjectionMatrix = true;

			}

		}

	}

	protected prepareRenderImpl( _event: ComponentUpdateEvent ): void {

		this.updateViewMatrix();

		if ( this.needsUpdateProjectionMatrix ) {

			this.updateProjectionMatrix();

		}

		if ( ! this._historyInitialized ) {

			this.viewMatrixPrev.copy( this.viewMatrix );
			this.projectionMatrixPrev.copy( this.projectionMatrix );
			this._historyInitialized = true;

		}

	}

	protected commitFrameImpl( _event: ComponentUpdateEvent ): void {

		this.viewMatrixPrev.copy( this.viewMatrix );
		this.projectionMatrixPrev.copy( this.projectionMatrix );

	}

}
