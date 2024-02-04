import * as GLP from 'glpower';
import * as MXP from 'maxpower';


export type EditorStateBLidge = {
	blidge?: MXP.BLidge,
	enabled: boolean,
	url: string,
	gltfPath: string
}

export class EditorState extends GLP.EventEmitter {

	public blidgeConnection: EditorStateBLidge;

	public root: MXP.Entity | null;

	public frameTotal: number;
	public frameRate: number;

	constructor() {

		super();

		this.blidgeConnection = {
			enabled: false,
			url: "ws://localhost:3100",
			gltfPath: BASE_PATH + "/scene.glb"
		};

		this.root = null;

		this.frameTotal = 0;
		this.frameRate = 0;

	}

}
