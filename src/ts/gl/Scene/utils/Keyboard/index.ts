import * as GLP from 'glpower';

export class Keyboard extends GLP.EventEmitter {

	public pressedKeys: { [key: string]: boolean };

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

	}

	private onKeyUp( e: KeyboardEvent ) {

		this.pressedKeys[ e.key ] = false;

	}

	public dispose() {

		this.emit( 'dispose' );

	}

}
