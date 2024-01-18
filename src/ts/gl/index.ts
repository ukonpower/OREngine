import * as GLP from 'glpower';

import { canvas } from '../Globals';

import { Scene } from './Scene';

export class GL {

	private scene: Scene;
	public canvas: HTMLCanvasElement;
	private disposed: boolean = false;

	constructor() {

		this.canvas = canvas;

		// scene

		this.scene = new Scene();

		// event

		window.addEventListener( 'resize', this.resize.bind( this ) );

		this.resize();

		// animate

		this.animate();

	}

	private beforeDate?: number;

	private animate() {

		if ( this.disposed ) return;

		// if ( gpuState ) {

		// 	gpuState.update();

		// }

		this.beforeDate = new Date().getTime();

		this.scene.update();

		// if ( gpuState ) {

		// 	const current = new Date().getTime();
		// 	gpuState.setRenderTime( "cpuTotal", ( current - ( this.beforeDate || 0 ) ) );
		// 	this.beforeDate = current;

		// }

		window.requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize() {

		const canvasAspect = window.innerWidth / window.innerHeight;

		let scale = canvasAspect < 1.0 ? Math.min( 1.5, window.devicePixelRatio ) : 1.0;

		scale *= 1.0;

		const width = window.innerWidth;
		const height = window.innerHeight;

		this.canvas.width = width * scale;
		this.canvas.height = height * scale;

		this.scene.resize( new GLP.Vector( this.canvas.width, this.canvas.height ) );

	}

	public dispose() {

		this.disposed = true;

		this.scene.dispose();

	}

}
