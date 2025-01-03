import * as GLP from 'glpower';

export type PressedKeys = { [key: string]: boolean }

export class Keyboard extends GLP.EventEmitter {

	public pressedKeys: PressedKeys;

	constructor() {

		super();

		this.pressedKeys = {};

		const onKeyDown = this.onKeyDown.bind( this );
		const onKeyUp = this.onKeyUp.bind( this );

		window.addEventListener( 'keydown', onKeyDown );
		window.addEventListener( 'keyup', onKeyUp );

		const onDispose = () => {

			window.removeEventListener( 'keydown', onKeyDown );
			window.removeEventListener( 'keyup', onKeyUp );

		};

		this.once( 'dispose', onDispose );

	}

	private onKeyDown( e: KeyboardEvent ) {

		this.pressedKeys[ e.key ] = true;

		this.emit( 'keydown', [ e, this.pressedKeys ] );

	}

	private onKeyUp( e: KeyboardEvent ) {

		this.pressedKeys[ e.key ] = false;

		if ( e.key == "Meta" || e.key == "Control" ) {

			const keys = Object.keys( this.pressedKeys );

			for ( let i = 0; i < keys.length; i ++ ) {

				this.pressedKeys[ keys[ i ] ] = false;

			}

		}

		this.emit( 'keyup', [ e, this.pressedKeys ] );

	}

	public dispose() {

		this.emit( 'dispose' );

	}

}
