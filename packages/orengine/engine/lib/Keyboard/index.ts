import * as GLP from 'glpower';

export type PressedKeys = { [key: string]: boolean }

export class Keyboard extends GLP.EventEmitter {

        private _pressedKeys: PressedKeys;

        constructor() {

		super();

                this._pressedKeys = {};

                const onKeyDown = this._onKeyDown.bind( this );
                const onKeyUp = this._onKeyUp.bind( this );

		window.addEventListener( 'keydown', onKeyDown );
		window.addEventListener( 'keyup', onKeyUp );

		const onDispose = () => {

			window.removeEventListener( 'keydown', onKeyDown );
			window.removeEventListener( 'keyup', onKeyUp );

		};

		this.once( 'dispose', onDispose );

        }

        public get pressedKeys() {
                return this._pressedKeys;
        }

        private _onKeyDown( e: KeyboardEvent ) {

                this._pressedKeys[ e.key ] = true;

                this.emit( 'keydown', [ e, this._pressedKeys ] );

	}

        private _onKeyUp( e: KeyboardEvent ) {

                this._pressedKeys[ e.key ] = false;

		if ( e.key == "Meta" || e.key == "Control" ) {

                        const keys = Object.keys( this._pressedKeys );

			for ( let i = 0; i < keys.length; i ++ ) {

                                this._pressedKeys[ keys[ i ] ] = false;

			}

		}

                this.emit( 'keyup', [ e, this._pressedKeys ] );

	}

	public dispose() {

		this.emit( 'dispose' );

	}

}
