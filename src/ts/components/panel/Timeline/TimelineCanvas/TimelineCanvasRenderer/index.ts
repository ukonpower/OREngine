import * as GLP from 'glpower';

export class TimelineCanvasRenderer extends GLP.EventEmitter {

	private wrapperElm: HTMLElement | null;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private resizeObserver: ResizeObserver;
	private viewPort: number[] = [ 0, 0, 0, 0 ];
	private viewPortScale: number = 50;

	constructor() {

		super();

		this.wrapperElm = null;

		this.canvas = document.createElement( 'canvas' );

		this.ctx = this.canvas.getContext( '2d' )!;

		this.resizeObserver = new ResizeObserver( this.onResize.bind( this ) );

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
		this.viewPortScale = scale;
		this.render();

	}

	private onResize() {

		if ( this.wrapperElm ) {

			this.canvas.width = this.wrapperElm.clientWidth;
			this.canvas.height = this.wrapperElm.clientHeight;

		}

		this.render();

	}


	private render() {

		this.ctx.fillStyle = '#000';
		this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		// grid


		const draw = ( distance: number, offset: number, color: string ) => {

			let frame = Math.ceil( this.viewPort[ 0 ] / distance ) * distance;

			this.ctx.beginPath();

			let cnt = 0;

			while ( frame < this.viewPort[ 2 ] && cnt < 100 ) {

				const x = ( frame - this.viewPort[ 0 ] + offset ) / ( this.viewPort[ 2 ] - this.viewPort[ 0 ] ) * this.canvas.width;

				this.ctx.moveTo( x, 0 );
				this.ctx.lineTo( x, this.canvas.height );

				frame += distance;
				cnt ++;

			}

			this.ctx.strokeStyle = color;
			this.ctx.lineWidth = 1;

			this.ctx.stroke();

		};

		draw( this.viewPortScale, 0, "#555" );
		draw( this.viewPortScale, this.viewPortScale / 2, "#333" );

	}

	public dispose() {

		if ( this.wrapperElm ) {

			this.wrapperElm.removeChild( this.canvas );

		}

		this.resizeObserver.disconnect();

	}

}
