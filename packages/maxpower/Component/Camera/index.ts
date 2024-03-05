import * as GLP from 'glpower';

import { Component, ComponentParams, ComponentProps, ComponentUpdateEvent } from "..";

export type CameraType = 'perspective' | 'orthographic'
export interface CameraParam extends ComponentParams {
}

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

	public needsUpdate: boolean;

	public displayOut: boolean;

	public viewPort: GLP.Vector | null;

	constructor( params?: CameraParam ) {

		super( params );

		params = params || {};

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

		this.needsUpdate = true;
		this.displayOut = true;

	}

	public updateProjectionMatrix() {

		this.projectionMatrixPrev.copy( this.projectionMatrix );

		if ( this.cameraType == 'perspective' ) {

			this.projectionMatrix.perspective( this.fov, this.aspect, this.near, this.far );

		} else {

			this.projectionMatrix.orthographic( this.orthWidth, this.orthHeight, this.near, this.far );

		}

		this.needsUpdate = false;

	}

	public updateViewMatrix() {

		if ( this.entity ) {

			this.viewMatrixPrev.copy( this.viewMatrix );
			this.viewMatrix.copy( this.entity.matrixWorld ).inverse();

		}

	}

	protected postUpdateImpl( event: ComponentUpdateEvent ): void {

		this.updateViewMatrix();

		if ( this.needsUpdate ) {

			this.updateProjectionMatrix();

		}

	}

}
