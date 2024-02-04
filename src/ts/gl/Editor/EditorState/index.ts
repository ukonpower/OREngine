import * as GLP from 'glpower';
import * as MXP from 'maxpower';


export type EditorStateBLidge = {
	blidge?: MXP.BLidge,
	enabled: boolean,
	url: string,
	gltfPath: string
}

export class EditorState extends GLP.EventEmitter {

	public root: MXP.Entity | null;

	public frameTotal: number;
	public frameRate: number;

	constructor() {

		super();

		this.root = null;

		this.frameTotal = 0;
		this.frameRate = 0;

	}

}
