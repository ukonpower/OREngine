import * as GLP from 'glpower';
import * as MXP from 'maxpower';

type LPD8Line = {
	values: GLP.Vector;
	btn1: number,
	btn2: number,
	btn3: number,
	btn4: number,
	btn1Lerped: number,
	btn2Lerped: number,
	btn3Lerped: number,
	btn4Lerped: number,
	valuesLerped: GLP.Vector;
}

const tmpVector = new GLP.Vector();
const eventEmitter = new GLP.EventEmitter();
const linesValue: LPD8Line[] = [];

for ( let i = 0; i < 2; i ++ ) {

	linesValue.push( {
		values: new GLP.Vector(),
		btn1: 0,
		btn2: 0,
		btn3: 0,
		btn4: 0,
		valuesLerped: new GLP.Vector(),
		btn1Lerped: 0,
		btn2Lerped: 0,
		btn3Lerped: 0,
		btn4Lerped: 0,
	} );

}

export class LPD8 extends MXP.Component {

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

					if ( item.name == "LPD8 mk2" ) {

						this.input = item;

					}

				} );

				if ( this.input ) {

					this.input.onmidimessage = this.onMidiMessage.bind( this ) as any;

				}

				m.outputs.forEach( item => {

					if ( item.name == "LPD8 mk2" ) {

						this.output = item;

					}


				} );

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

		if ( type == 176 && ( 70 <= id && id <= 77 ) ) {

			const offset = 70;

			const lineIndex = Math.floor( ( id - offset ) / 4 );

			const vec = linesValue[ lineIndex ].values;

			const dim = ( id - offset ) % 4;

			if ( dim == 0 ) {

				vec.x = value;

			} else if ( dim == 1 ) {

				vec.y = value;

			} else if ( dim == 2 ) {

				vec.z = value;

			} else {

				vec.w = value;

			}

			eventEmitter.emit( `value`, [ LPD8 ] );
			eventEmitter.emit( `value/${lineIndex + 1}`, [ linesValue[ lineIndex ] ] );
			eventEmitter.emit( `value/${lineIndex + 1}/${dim}`, [ value ] );

		}

		/*-------------------------------
			Buttons
		-------------------------------*/

		if ( type == 153 && ( 36 <= id && id <= 39 ) ) {

			const index = id - 36;

			eventEmitter.emit( "pad", [ LPD8 ] );
			eventEmitter.emit( "pad/2", [ linesValue[ 1 ] ] );
			eventEmitter.emit( `pad/2/${[ "xyzw" ][ index ]}`, [ value ] );

		}

		if ( type == 153 && ( 40 <= id && id <= 43 ) ) {

			const index = id - 40;

			eventEmitter.emit( "pad", [ LPD8 ] );
			eventEmitter.emit( "pad/1", [ linesValue[ 0 ] ] );
			eventEmitter.emit( `pad/1/${[ "xyzw" ][ index ]}`, [ value ] );

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

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		for ( let i = 0; i < 2; i ++ ) {

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

			const btn3 = line.btn3;
			const btn3Lerped = line.btn3Lerped;
			line.btn3Lerped += ( btn3 - btn3Lerped ) * event.timeDelta * 4.0;

			const btn4 = line.btn4;
			const btn4Lerped = line.btn4Lerped;
			line.btn4Lerped += ( btn4 - btn4Lerped ) * event.timeDelta * 4.0;

		}

	}

	// save / load

	private save() {

		const data = {
			lines: linesValue.map( ( line ) => {

				return [ line.values.getElm( "vec4" ), line.btn1, line.btn2 ];

			} ),
		};

		localStorage.setItem( "LPD8", JSON.stringify( data ) );

	}

	private restore() {

		const data = localStorage.getItem( "LPD8" );

	}

}
