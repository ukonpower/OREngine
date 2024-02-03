import * as GLP from 'glpower';

const OREngineEditorData = {
	engine: {
		value: "0.0.1"
	},
	frame: {
		total: 900,
		rate: 60,
	},
	blidge: {
		connection: {
			enabled: true,
			port: 3100
		}
	},
};

const OREnginePlayerData = {
	engine: {
		version: "0.0.1"
	},
	blidge: {
	},
	frame: {
		total: 900,
		rate: 60
	}

};

export class FileSystem extends GLP.EventEmitter {

	constructor() {

		super();

	}

}
