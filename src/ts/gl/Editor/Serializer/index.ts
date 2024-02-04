import * as GLP from 'glpower';
import { BLidgeScene } from 'maxpower';

import { EditorState } from '../EditorState';

import { blidge } from '~/ts/Globals';

const ENGINE_FORMAT_VERSION = "0.0.1";

interface OREnginePlayerData {
	engine: {
		version: string
	},
	frame: {
		total: number,
		rate: number,
	},
	blidge: {
		scene: BLidgeScene | null,
	},
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

		const data: OREngineEditorData = {
			engine: {
				version: ENGINE_FORMAT_VERSION
			},
			blidge: {
				connection: {
					...state.blidgeConnection
				},
				scene: blidge ? blidge.currentScene : null
			},
			frame: {
				total: state.frameTotal,
				rate: state.frameRate
			}
		};

		return data;

	}

	public deserialize() {

		this.emit( 'load' );

	}

	public export(): OREnginePlayerData {

		return {};

	}

}
