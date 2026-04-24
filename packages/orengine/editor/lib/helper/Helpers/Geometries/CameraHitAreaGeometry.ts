import { Geometry } from 'maxpower';

export class CameraHitAreaGeometry extends Geometry {

	constructor() {

		super();

		this.update( 50, 1.0, 0.1, 2.0 );

	}

	public update( fov: number, aspect: number, near: number, far: number ) {

		const fovRad = fov * Math.PI / 180;
		const nearH = Math.tan( fovRad / 2 ) * near;
		const nearW = nearH * aspect;
		const farH = Math.tan( fovRad / 2 ) * far;
		const farW = farH * aspect;

		const positions = new Float32Array( [
			// 0-3: near face
			- nearW, nearH, - near,
			nearW, nearH, - near,
			nearW, - nearH, - near,
			- nearW, - nearH, - near,
			// 4-7: far face
			- farW, farH, - far,
			farW, farH, - far,
			farW, - farH, - far,
			- farW, - farH, - far,
		] );

		const indices = new Uint16Array( [
			// near face
			0, 2, 1, 0, 3, 2,
			// far face
			4, 5, 6, 4, 6, 7,
			// top face
			0, 1, 5, 0, 5, 4,
			// bottom face
			3, 6, 2, 3, 7, 6,
			// left face
			0, 4, 7, 0, 7, 3,
			// right face
			1, 2, 6, 1, 6, 5,
		] );

		this.setAttribute( 'position', positions, 3 );
		this.setAttribute( 'normal', new Float32Array( positions.length ).fill( 0 ), 3 );
		this.setAttribute( 'index', indices, 1 );
		this.requestUpdate();

	}

}
