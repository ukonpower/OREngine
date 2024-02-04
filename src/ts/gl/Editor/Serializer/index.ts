import * as GLP from 'glpower';
import { BLidgeScene } from 'maxpower';

import { EditorState } from '../EditorState';

const ENGINE_FORMAT_VERSION = "0.0.1";

interface OREnginePlayerData {
	engine: {
		version: string
	},
	frame: {
		total: number,
		rate: number,
	},
	props: any
}

interface OREngineEditorData extends OREnginePlayerData {
	blidge: {
		connection: {
			enabled: boolean,
			url: string,
		},
		scene: BLidgeScene | null,
	},
}

export class Serializer extends GLP.EventEmitter {

	constructor() {

		super();

	}

	public serialize( state: EditorState ): OREngineEditorData {

		const props: any[] = [];


		if ( state.root ) {

			const path = state.root.name;

			state.root.traverse( ( e ) => {

				const path_ = path + "/" + e.name;

				e.components.forEach( ( c, key ) => {

					const property: any = c.export;

					if ( property ) {

						const formattedProps: any = {};

						const keys = Object.keys( property );

						for ( let i = 0; i < keys.length; i ++ ) {

							const k = keys[ i ];

							formattedProps[ k ] = property[ k ].value;

						}

						const path__ = path_ + "/" + key;

						props.push( {
							path: path__,
							p: formattedProps
						} );

					}

				} );

			} );

		}

		const data: OREngineEditorData = {
			engine: {
				version: ENGINE_FORMAT_VERSION
			},
			frame: {
				total: state.frameTotal,
				rate: state.frameRate
			},
			props
		};

		// console.log( JSON.stringify( data, null ) );

		return data;

	}

	public deserialize() {

		this.emit( 'load' );

	}

	public export(): OREnginePlayerData {

		return {};

	}

}
