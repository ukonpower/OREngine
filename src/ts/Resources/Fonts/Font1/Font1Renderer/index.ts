
export const PointTypeList = [ 'None', 'End', 'Close', "Line", "Fill" ];

export class Font1Renderer {

	public render( context: CanvasRenderingContext2D, fontPath: number[] ) {

		const canvas = context.canvas;

		context.clearRect( 0, 0, canvas.width, canvas.height );

		const width = canvas.width;
		const height = canvas.height;

		context.fillStyle = '#fff';
		context.strokeStyle = '#fff';
		context.lineWidth = 8;

		let currentType = - 1;

		for ( let i = 0; i < fontPath.length / 3; i ++ ) {

			const ci = i * 3;
			const path = fontPath.slice( ci, ci + 3 );
			const pathType = path[ 0 ];
			const x = path[ 1 ] * width;
			const y = path[ 2 ] * height;

			if ( pathType == 0 ) {

				// none

				context.lineTo( x, y );

			} else if ( pathType == 3 || pathType == 4 ) {

				// line

				context.beginPath();
				context.moveTo( x, y );

				currentType = pathType;

			} else if ( pathType == 1 || pathType == 2 ) {

				// close

				context.lineTo( x, y );

				if ( pathType == 2 ) {

					context.closePath();

				}

				if ( currentType == 3 ) {

					context.stroke();

				} else if ( currentType == 4 ) {

					context.fill();

				}

				currentType = - 1;

			}

		}

		context.closePath();

		const margin = canvas.height * 0.11;

		context.clearRect( 0, 0, canvas.width, margin );

		context.clearRect( 0, canvas.height - margin, canvas.width, margin );


	}

}
