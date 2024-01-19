import * as GLP from 'glpower';

import { canvas } from '../Globals';

import { Scene } from './Scene';

export class GL {

	private scene: Scene;

	public canvas: HTMLCanvasElement;
	public canvasWrapElm: HTMLElement | null = null;

	private resolutionScale: number = 1.0;

	private disposed: boolean = false;

	constructor() {

		// canvas

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

	public setWrapperElm( elm: HTMLElement ) {

		this.canvasWrapElm = elm;

		this.resize();

	}

	private resize() {

		const wrapWidth = this.canvasWrapElm ? this.canvasWrapElm.clientWidth : 16;
		const wrapHeight = this.canvasWrapElm ? this.canvasWrapElm.clientHeight : 16;

		let canvasWidth = wrapWidth;
		let canvasHeight = wrapHeight;

		const canvasPixelWidth = 1920;
		const canvasPixelHeight = 1080;

		const canvasAspect = canvasPixelWidth / canvasPixelHeight;

		if ( canvasAspect < wrapWidth / wrapHeight ) {

			canvasWidth = wrapHeight * canvasAspect;

		} else {

			canvasHeight = wrapWidth / canvasAspect;

		}

		this.canvas.style.width = canvasWidth + 'px';
		this.canvas.style.height = canvasHeight + 'px';

		this.canvas.width = canvasPixelWidth * this.resolutionScale;
		this.canvas.height = canvasPixelHeight * this.resolutionScale;

		this.scene.resize( new GLP.Vector( this.canvas.width, this.canvas.height ) );

	}

	public dispose() {

		this.disposed = true;

		this.scene.dispose();

	}

}
