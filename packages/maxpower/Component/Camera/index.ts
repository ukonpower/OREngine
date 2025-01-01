import * as GLP from 'glpower';

import { Component, ComponentParams, ComponentUpdateEvent } from "..";

export type CameraType = 'perspective' | 'orthographic'

export class Camera extends Component {

	public cameraType: CameraType;

	public fov: number;
	public aspect: number;
	public near: number;
	public far: number;

	public orthWidth: number;
	public orthHeight: number;

	public projectionMatrix: GLP.Matrix;
	public viewMatrix: GLP.Matrix;

	public projectionMatrixPrev: GLP.Matrix;
	public viewMatrixPrev: GLP.Matrix;

	public needsUpdateProjectionMatrix: boolean;

	public displayOut: boolean;

	public viewPort: GLP.Vector | null;

	constructor( params: ComponentParams ) {

		super( params );

		this.cameraType = 'perspective';

		this.viewMatrix = new GLP.Matrix();
		this.projectionMatrix = new GLP.Matrix();

		this.viewMatrixPrev = new GLP.Matrix();
		this.projectionMatrixPrev = new GLP.Matrix();

		this.viewPort = null;

		this.fov = 50;
		this.near = 0.1;
		this.far = 1000;
		this.aspect = 1.0;

		this.orthWidth = 1;
		this.orthHeight = 1;

		this.needsUpdateProjectionMatrix = true;
		this.displayOut = true;

		if ( import.meta.env.DEV ) {

			this.field( "fov", () => this.fov, ( v ) => this.fov = v, { noExport: true } );

		}

		this._tag = "camera";

	}

	public updateProjectionMatrix() {

		this.projectionMatrixPrev.copy( this.projectionMatrix );

		if ( this.cameraType == 'perspective' ) {

			this.projectionMatrix.perspective( this.fov, this.aspect, this.near, this.far );

		} else {

			this.projectionMatrix.orthographic( this.orthWidth, this.orthHeight, this.near, this.far );

		}

		this.needsUpdateProjectionMatrix = false;

	}

	public updateViewMatrix() {

		this.viewMatrixPrev.copy( this.viewMatrix );
		this.viewMatrix.copy( this._entity.matrixWorld ).inverse();

	}

	protected postUpdateImpl( event: ComponentUpdateEvent ): void {

		this.updateViewMatrix();

		if ( this.needsUpdateProjectionMatrix ) {

			this.updateProjectionMatrix();

		}

	}

}
