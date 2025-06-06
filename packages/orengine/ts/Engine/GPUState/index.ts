import { gl } from "~/ts/gl/GLGlobals";

export class GPUState {

        private _memoryElm: HTMLElement | null;
        private _timerElm: HTMLElement | null;

        private _extMemory: any;
        private _renderTimeList: {name: string, time: number}[];
        private _memoryInterval: number | null;

	constructor() {

                this._memoryElm = null;
                this._timerElm = null;
                this._memoryInterval = null;
                this._renderTimeList = [];

                this._extMemory = gl.getExtension( 'GMAN_webgl_memory' );

	}

        public init( memoryElm: HTMLElement, timerElm: HTMLElement ) {

                this._memoryElm = memoryElm;
                this._timerElm = timerElm;

		this.memoryUpdate();

                if ( this._memoryInterval != null ) window.clearInterval( this._memoryInterval );

                this._memoryInterval = window.setInterval( this.memoryUpdate.bind( this ), 500 );

	}

	public memoryUpdate() {

                if ( this._extMemory && this._memoryElm ) {

                        const info = this._extMemory.getMemoryInfo();
                        this._memoryElm.innerText = JSON.stringify( info, null, " " );

		}


	}

	public update() {

                if ( this._timerElm ) {

			let body = '';
			let total = 0;

                        for ( let i = 0; i < this._renderTimeList.length; i ++ ) {

                                const t = this._renderTimeList[ i ];

				body += `${t.name}:\t${( t.time.toPrecision( 3 ) )} <br/>`;

				total += t.time;

			}

			body += 'total: ' + total.toPrecision( 3 );

                        this._timerElm.innerHTML = body;

		}

	}

	public setRenderTime( name: string, time: number ) {

		let found = false;
                for ( let i = 0; i < this._renderTimeList.length; i ++ ) {

                        const t = this._renderTimeList[ i ];

			if ( t.name == name ) {

				t.time = time;
				found = true;

				break;

			}

		}

		if ( ! found ) {

                        this._renderTimeList.unshift( {
				name, time
			} );

		}

	}

}
