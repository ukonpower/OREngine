import * as GLP from 'glpower';

import { SceneFrame } from '~/ts/gl/Scene';

export class TimelineCanvasRenderer extends GLP.EventEmitter {

	private wrapperElm: HTMLElement | null;

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private resizeObserver: ResizeObserver;

	private sceneFrame: SceneFrame | null;

	private viewPort: number[];
	private viewPortRange: number[];
	private viewPortScale: number;

	constructor() {

		super();

		this.wrapperElm = null;

		this.canvas = document.createElement( 'canvas' );

		this.ctx = this.canvas.getContext( '2d' )!;

		this.resizeObserver = new ResizeObserver( this.onResize.bind( this ) );

		this.viewPort = [ 0, 0, 0, 0 ];
		this.viewPortRange = [ 0, 0 ];
		this.viewPortScale = 50;

		this.sceneFrame = null;

	}

	public setWrapperElm( elm: HTMLElement ) {

		if ( this.wrapperElm ) {

			this.resizeObserver.observe( this.wrapperElm );

		}

		this.wrapperElm = elm;
		this.resizeObserver.observe( elm );
		this.wrapperElm.appendChild( this.canvas );

		this.onResize();

	}

	public setViewPort( viewPort: number[], scale: number ) {

		this.viewPort = viewPort;
		this.viewPortRange = [ viewPort[ 2 ] - viewPort[ 0 ], viewPort[ 3 ] - viewPort[ 1 ] ];
		this.viewPortScale = scale;
		this.render();

	}

	public setFrame( frame:SceneFrame ) {

		this.sceneFrame = frame;
		this.render();

	}

	private onResize() {

		if ( this.wrapperElm ) {

			this.canvas.width = this.wrapperElm.clientWidth;
			this.canvas.height = this.wrapperElm.clientHeight;

		}

		this.render();

	}

	private frameToPx( frame: number ) {

		return ( frame - this.viewPort[ 0 ] ) / ( this.viewPortRange[ 0 ] ) * this.canvas.width;

	}

	private render() {

		this.ctx.fillStyle = '#000';
		this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		// playarea


		if ( this.sceneFrame ) {

			this.ctx.fillStyle = '#181818';

			const s = this.frameToPx( 0 );
			const e = this.frameToPx( this.sceneFrame.duration );

			this.ctx.fillRect( s, 0, e - s, this.canvas.height );

		}

		// grid

		const drawGrid = ( distance: number, offset: number, color: string ) => {

			let frame = Math.ceil( this.viewPort[ 0 ] / distance ) * distance;

			this.ctx.beginPath();

			let cnt = 0;

			while ( frame < this.viewPort[ 2 ] && cnt < 100 ) {

				const x = this.frameToPx( frame + offset );

				this.ctx.moveTo( x, 0 );
				this.ctx.lineTo( x, this.canvas.height );

				frame += distance;
				cnt ++;

			}

			this.ctx.strokeStyle = color;
			this.ctx.lineWidth = 1;

			this.ctx.stroke();

		};

		drawGrid( this.viewPortScale, 0, "#555" );
		drawGrid( this.viewPortScale, this.viewPortScale / 2, "#333" );

	}

	public dispose() {

		if ( this.wrapperElm ) {

			this.wrapperElm.removeChild( this.canvas );

		}

		this.resizeObserver.disconnect();

	}

}
