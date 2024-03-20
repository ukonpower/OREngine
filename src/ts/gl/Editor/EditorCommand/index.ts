import * as GLP from 'glpower';

type Command = {
	target: any,
	method: string,
}

export class EditorCommand extends GLP.EventEmitter {

	constructor() {

		super();

	}

	public do() {

	}

}
