import * as GLP from 'glpower';

export class TimelineCanvasRenderer extends GLP.EventEmitter {

	private wrapperElm: HTMLElement | null;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private resizeObserver: ResizeObserver;
	private viewPort: number[] = [ 0, 0, 0, 0 ];

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

	public setViewPort( viewPort: number[] ) {

		this.viewPort = viewPort;
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

		// border

		const draw = ( distance: number, color: string ) => {

			let frame = Math.ceil( this.viewPort[ 0 ] / distance ) * distance;

			this.ctx.beginPath();

			while ( frame < this.viewPort[ 2 ] ) {

				const x = ( frame - this.viewPort[ 0 ] ) / ( this.viewPort[ 2 ] - this.viewPort[ 0 ] ) * this.canvas.width;

				this.ctx.moveTo( x, 0 );
				this.ctx.lineTo( x, this.canvas.height );

				frame += distance;

			}

			this.ctx.strokeStyle = color;
			this.ctx.lineWidth = 1;

			this.ctx.stroke();

		};

		draw( 50, "#333" );
		draw( 100, "#555" );

	}

	public dispose() {

		if ( this.wrapperElm ) {

			this.wrapperElm.removeChild( this.canvas );

		}

		this.resizeObserver.disconnect();

	}

}
