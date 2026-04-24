import { Geometry } from 'maxpower';

export class CameraHelperGeometry extends Geometry {

	constructor() {

		super();

		this.update( 50, 1.0, 0.1, 10 );

	}

	public update( fov: number, aspect: number, near: number, far: number ) {

		const fovRad = fov * Math.PI / 180;
		const nearH = Math.tan( fovRad / 2 ) * near;
		const nearW = nearH * aspect;
		const farH = Math.tan( fovRad / 2 ) * far;
		const farW = farH * aspect;

		const posArray = new Float32Array( [
			// Near rectangle
			- nearW, nearH, - near, nearW, nearH, - near,
			nearW, nearH, - near, nearW, - nearH, - near,
			nearW, - nearH, - near, - nearW, - nearH, - near,
			- nearW, - nearH, - near, - nearW, nearH, - near,
			// Far rectangle
			- farW, farH, - far, farW, farH, - far,
			farW, farH, - far, farW, - farH, - far,
			farW, - farH, - far, - farW, - farH, - far,
			- farW, - farH, - far, - farW, farH, - far,
			// Connecting edges (near → far)
			- nearW, nearH, - near, - farW, farH, - far,
			nearW, nearH, - near, farW, farH, - far,
			nearW, - nearH, - near, farW, - farH, - far,
			- nearW, - nearH, - near, - farW, - farH, - far,
		] );

		this.setAttribute( 'position', posArray, 3 );
		this.setAttribute( 'normal', new Float32Array( posArray.length ).fill( 0 ), 3 );
		this.requestUpdate();

	}

}
