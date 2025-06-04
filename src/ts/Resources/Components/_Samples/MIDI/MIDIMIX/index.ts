

import * as GLP from 'glpower';
import * as MXP from 'maxpower';

type MIDIMIXLine = {
	values: GLP.Vector;
	btn1: number,
	btn2: number,
	valuesLerped: GLP.Vector;
	btn1Lerped: number,
	btn2Lerped: number,
}

type MIDIMIXSide = {
	btn1: number,
	btn2: number,
	btn3: number,
	btn1Lerped: number,
	btn2Lerped: number,
	btn3Lerped: number,
	master: number,
	masterLerped: number,
}

const tmpVector = new GLP.Vector();
const eventEmitter = new GLP.EventEmitter();

const linesValue: MIDIMIXLine[] = [];

for ( let i = 0; i < 8; i ++ ) {

	linesValue.push( {
		values: new GLP.Vector(),
		btn1: 0,
		btn2: 0,
		valuesLerped: new GLP.Vector(),
		btn1Lerped: 0,
		btn2Lerped: 0,
	} );

}

const sideValue = {
	btn1: 0,
	btn2: 0,
	btn3: 0,
	btn1Lerped: 0,
	btn2Lerped: 0,
	btn3Lerped: 0,
	master: 0,
	masterLerped: 0,
};

export class MIDIMIX extends MXP.Component {

	public input: MIDIInput | null;
	public output: MIDIOutput | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );


		/*-------------------------------
			MIDI
		-------------------------------*/

		this.input = null;
		this.output = null;

		const connect = () => {

			if ( this._disposed ) return;

			navigator.requestMIDIAccess().then( ( m ) => {

				if ( this._disposed ) return;

				m.inputs.forEach( item => {

					if ( item.name == "MIDI Mix" ) {

						this.input = item;

					}

				} );

				if ( this.input ) {

					this.input.onmidimessage = this.onMidiMessage.bind( this ) as any;

				}

				m.outputs.forEach( item => {

					if ( item.name == "MIDI Mix" ) {

						this.output = item;

					}


				} );

				this.updateLight();

			} ).catch( e => {

				console.error( e );

			} );

		};

		const close = () => {

			if ( this.output ) {

				this.output.close();

			}

			if ( this.input ) {

				this.input.onmidimessage = null;

				this.input.close();

			}

		};

		setTimeout( () => {

			connect();

		}, 100 );

		this.field( "reconnect", () => ( () => {

			close();
			connect();

		} ), undefined, {
			label: "Reconnect",
		} );

		/*-------------------------------
			Emulate
		-------------------------------*/

		const onEmulateControl = ( type: number, id: number, value: number ) => {

			this.onControl( type, id, value );

		};

		eventEmitter.on( "emulateControl", onEmulateControl );

		/*-------------------------------
			Resotre
		-------------------------------*/

		this.restore();

		this.once( "dispose", () => {

			close();

			eventEmitter.off( "emulateControl", onEmulateControl );

		} );

	}

	/*-------------------------------
		Static Methods
	-------------------------------*/

	public static get lines() {

		return linesValue;

	}

	public static get side() {

		return sideValue;

	}

	public static getLine( index: number ) {

		return linesValue[ index ];

	}

	public static emulateControl( type: number, id: number, value: number ) {

		eventEmitter.emit( "emulateControl", [ type, id, value ] );

	}

	public static on( event: string, callback: ( ...args: any[] ) => void ) {

		eventEmitter.on( event, callback );

	}

	public static off( event: string, callback: ( ...args: any[] ) => void ) {

		eventEmitter.off( event, callback );

	}

	/*-------------------------------
		Methods
	-------------------------------*/

	private onControl( type: number, id: number, value: number ) {

		/*-------------------------------
			Values
		-------------------------------*/

		if ( type == 176 && ( 16 <= id && id <= 31 || 46 <= id && id <= 61 ) ) {

			if ( 46 <= id ) id -= 14;

			const lineIndex = Math.floor( ( id - 16 ) / 4 );

			const values = linesValue[ lineIndex ].values;

			const dim = id % 4;

			if ( dim == 0 ) {

				values.x = value;

			} else if ( dim == 1 ) {

				values.y = value;

			} else if ( dim == 2 ) {

				values.z = value;

			} else {

				values.w = value;

			}

			eventEmitter.emit( `value`, [ MIDIMIX ] );
			eventEmitter.emit( `value/${lineIndex + 1}`, [ linesValue[ lineIndex ] ] );
			eventEmitter.emit( `value/${lineIndex + 1}/${dim}`, [ value ] );

		}

		/*-------------------------------
			Master
		-------------------------------*/

		if ( type == 176 && id == 62 ) {

			sideValue.master = value;

			eventEmitter.emit( `value`, [ MIDIMIX ] );
			eventEmitter.emit( `value/master`, [ sideValue.master ] );

		}

		/*-------------------------------
			Buttons
		-------------------------------*/

		if ( type == 144 ) {

			const lineIndex = Math.floor( ( id - 1 ) / 3 );

			if ( lineIndex < 8 ) {

				const line = linesValue[ lineIndex ];

				const btn = ( id + 2 ) % 3 == 0 ? 1 : 2;

				if ( btn == 1 ) {

					line.btn1 = 1.0 - line.btn1;

				} else if ( btn == 2 ) {

					line.btn2 = 1.0 - line.btn2;

				}

				eventEmitter.emit( `btn`, [ MIDIMIX ] );
				eventEmitter.emit( `btn/${lineIndex + 1}`, [ linesValue[ lineIndex ] ] );
				eventEmitter.emit( `btn/${lineIndex + 1}/${btn}`, [ btn == 1 ? line.btn1 : line.btn2 ] );

			}

			if ( lineIndex == 8 ) {

				const side = sideValue;
				let num = 0;
				let value = 0;

				if ( id == 25 ) {

					side.btn1 = 1.0 - side.btn1;
					value = side.btn1;
					num = 1;

				} else if ( id == 26 ) {

					side.btn2 = 1.0 - side.btn2;
					value = side.btn2;
					num = 2;


				} else if ( id == 27 ) {

					side.btn3 = 1.0 - side.btn3;
					value = side.btn3;
					num = 3;

				}

				eventEmitter.emit( `btn`, [ MIDIMIX ] );
				eventEmitter.emit( `btn/side`, [ sideValue ] );
				eventEmitter.emit( `btn/side/${num}`, [ value ] );

			}


			this.updateLight();

		}

		this.save();

	}

	private onMidiMessage( e: MIDIMessageEvent ) {

		if ( ! e.data ) return;

		const type = e.data[ 0 ];
		const id = e.data[ 1 ];
		const value = e.data[ 2 ] / 127;

		this.onControl( type, id, value );

	}

	private updateLight() {

		if ( ! this.output ) return;

		for ( let i = 0; i < 8; i ++ ) {

			const line = linesValue[ i ];

			this.output.send( [ 0x90, 1 + ( i ) * 3.0, line.btn1 * 127 ] );
			this.output.send( [ 0x90, 3 + i * 3, line.btn2 * 127 ] );

		}

		const side = sideValue;
		this.output.send( [ 0x90, 25, side.btn1 * 127 ] );
		// this.output.send( [ 0x90, 26, side.btn2 * 127 ] );
		// this.output.send( [ 0x90, 27, side.btn3 * 127 ] );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		for ( let i = 0; i < 8; i ++ ) {

			const line = linesValue[ i ];

			const values = line.values;
			const valuesLerped = line.valuesLerped;

			valuesLerped.add( tmpVector.copy( values ).sub( valuesLerped ).multiply( event.timeDelta * 4.0 ) );

			const btn1 = line.btn1;
			const btn1Lerped = line.btn1Lerped;
			line.btn1Lerped += ( btn1 - btn1Lerped ) * event.timeDelta * 4.0;

			const btn2 = line.btn2;
			const btn2Lerped = line.btn2Lerped;
			line.btn2Lerped += ( btn2 - btn2Lerped ) * event.timeDelta * 4.0;

		}

		const side = sideValue;

		const master = side.master;
		const masterLerped = side.masterLerped;
		side.masterLerped += ( master - masterLerped ) * event.timeDelta * 4.0;

		const sideBtn1 = side.btn1;
		const sideBtn1Lerped = side.btn1Lerped;
		side.btn1Lerped += ( sideBtn1 - sideBtn1Lerped ) * event.timeDelta * 4.0;

		const sideBtn2 = side.btn2;
		const sideBtn2Lerped = side.btn2Lerped;
		side.btn2Lerped += ( sideBtn2 - sideBtn2Lerped ) * event.timeDelta * 4.0;

		const sideBtn3 = side.btn3;
		const sideBtn3Lerped = side.btn3Lerped;
		side.btn3Lerped += ( sideBtn3 - sideBtn3Lerped ) * event.timeDelta * 4.0;

	}

	// save / load

	private save() {

		const data = {
			lines: linesValue.map( ( line ) => {

				return [ line.values.getElm( "vec4" ), line.btn1, line.btn2 ];

			} ),
			side: [ sideValue.btn1, sideValue.btn2, sideValue.btn3, sideValue.master ]
		};

		localStorage.setItem( "MIDIMIX", JSON.stringify( data ) );

	}

	private restore() {

		let data = localStorage.getItem( "MIDIMIX" );

		if ( import.meta.env.PROD ) {

			data = `{"lines":[[[0,1,1,1],1,1],[[0,1,1,0],1,1],[[0,0,0,0],1,1],[[0,1,1,0],1,1],[[0,1,0,0],1,1],[[0,1,1,0],1,1],[[0,0,0,0],1,1],[[0.43000000000000127,0,0,0],1,1]],"side":[1,1,1,0.7400000000000003]}`;

		}

		if ( data ) {

			const parsed = JSON.parse( data );

			parsed.lines.forEach( ( line: any, i: number ) => {

				linesValue[ i ].values.setFromArray( line[ 0 ] );
				linesValue[ i ].btn1 = line[ 1 ];
				linesValue[ i ].btn2 = line[ 2 ];

				eventEmitter.emit( `value/${i + 1}`, [ linesValue[ i ] ] );
				eventEmitter.emit( `value/${i + 1}/x`, [ line[ 0 ][ 0 ] ] );
				eventEmitter.emit( `value/${i + 1}/y`, [ line[ 0 ][ 1 ] ] );
				eventEmitter.emit( `value/${i + 1}/z`, [ line[ 0 ][ 2 ] ] );
				eventEmitter.emit( `value/${i + 1}/w`, [ line[ 0 ][ 3 ] ] );
				eventEmitter.emit( `btn/${i + i}}`, [ linesValue[ i ] ] );
				eventEmitter.emit( `btn/${i + i}}/1`, [ line.btn1 ] );
				eventEmitter.emit( `btn/${i + i}}/2`, [ line.btn2 ] );

			} );

			const side = parsed.side;

			sideValue.btn1 = side[ 0 ];
			sideValue.btn2 = side[ 1 ];
			sideValue.btn3 = side[ 2 ];
			eventEmitter.emit( `btn/side/1`, [ sideValue.btn1 ] );
			eventEmitter.emit( `btn/side/2`, [ sideValue.btn2 ] );
			eventEmitter.emit( `btn/side/3`, [ sideValue.btn3 ] );

			sideValue.master = side[ 3 ];
			eventEmitter.emit( `value/master`, [ sideValue.master ] );

			eventEmitter.emit( `value`, [ MIDIMIX ] );
			eventEmitter.emit( `btn`, [ MIDIMIX ] );
			eventEmitter.emit( `btn/side`, [ sideValue ] );

		}

		this.updateLight();

	}

}
