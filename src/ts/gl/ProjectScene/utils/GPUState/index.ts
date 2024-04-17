import { gl } from "~/ts/Globals";

export class GPUState {

	private memoryElm: HTMLElement | null;
	private timerElm: HTMLElement | null;

	private extMemory: any;
	private renderTimeList: {name: string, time: number}[];
	private memoryInterval: number | null;

	constructor() {

		this.memoryElm = null;
		this.timerElm = null;
		this.memoryInterval = null;
		this.renderTimeList = [];

		this.extMemory = gl.getExtension( 'GMAN_webgl_memory' );

	}

	public init( memoryElm: HTMLElement, timerElm: HTMLElement ) {

		this.memoryElm = memoryElm;
		this.timerElm = timerElm;

		this.memoryUpdate();

		if ( this.memoryInterval != null ) window.clearInterval( this.memoryInterval );

		this.memoryInterval = window.setInterval( this.memoryUpdate.bind( this ), 500 );

	}

	public memoryUpdate() {

		if ( this.extMemory && this.memoryElm ) {

			const info = this.extMemory.getMemoryInfo();
			this.memoryElm.innerText = JSON.stringify( info, null, " " );

		}


	}

	public update() {

		if ( this.timerElm ) {

			let body = '';
			let total = 0;

			for ( let i = 0; i < this.renderTimeList.length; i ++ ) {

				const t = this.renderTimeList[ i ];

				body += `${t.name}:\t${( t.time.toPrecision( 3 ) )} <br/>`;

				total += t.time;

			}

			body += 'total: ' + total.toPrecision( 3 );

			this.timerElm.innerHTML = body;

		}

	}

	public setRenderTime( name: string, time: number ) {

		let found = false;
		for ( let i = 0; i < this.renderTimeList.length; i ++ ) {

			const t = this.renderTimeList[ i ];

			if ( t.name == name ) {

				t.time = time;
				found = true;

				break;

			}

		}

		if ( ! found ) {

			this.renderTimeList.unshift( {
				name, time
			} );

		}

	}

}
