import * as GLP from 'glpower';

import { canvas } from '../Globals';

import { Editor } from './Editor';
import { Scene } from './Scene';

export class GL extends GLP.EventEmitter {

	public scene: Scene;
	public editor: Editor;

	public canvas: HTMLCanvasElement;
	public canvasWrapElm: HTMLElement | null = null;

	private resolutionScale: number = 1.0;

	private disposed: boolean = false;

	constructor() {

		super();

		// canvas

		this.canvas = canvas;

		// scene

		this.scene = new Scene();

		// editor

		this.editor = new Editor( this.scene );

		// resize

		window.addEventListener( 'resize', this.resize.bind( this ) );

		setTimeout( () => {

			this.resize();

		}, 100 );

		// animate

		this.animate();

	}

	private animate() {

		if ( this.disposed ) return;

		this.scene.update();

		window.requestAnimationFrame( this.animate.bind( this ) );

	}

	public setWrapperElm( elm: HTMLElement ) {

		this.canvasWrapElm = elm;

		this.resize();

	}

	private resize() {

		const wrapWidth = this.canvasWrapElm ? this.canvasWrapElm.clientWidth : 16;
		const wrapHeight = this.canvasWrapElm ? this.canvasWrapElm.clientHeight : 9;
		const wrapAspect = wrapWidth / wrapHeight;

		const canvasPixelWidth = 1920;
		const canvasPixelHeight = 1080;
		const canvasPixelAspect = canvasPixelWidth / canvasPixelHeight;

		let canvasWidth = wrapWidth;
		let canvasHeight = wrapHeight;

		if ( canvasPixelAspect < wrapAspect ) {

			canvasWidth = wrapHeight * canvasPixelAspect;

		} else {

			canvasHeight = wrapWidth / canvasPixelAspect;

		}

		this.canvas.style.width = canvasWidth + 'px';
		this.canvas.style.height = canvasHeight + 'px';

		this.canvas.width = canvasPixelWidth * this.resolutionScale;
		this.canvas.height = canvasPixelHeight * this.resolutionScale;

		this.scene.resize( new GLP.Vector( this.canvas.width, this.canvas.height ) );

	}

	public dispose() {

		this.scene.dispose();

		this.editor.dispose();

		this.disposed = true;

	}

}
