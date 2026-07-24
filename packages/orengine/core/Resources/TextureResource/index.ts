
import * as MXP from 'maxpower';

export class TextureResource extends MXP.Serializable {

	public name: string;

	private _frag: string;
	private _resolution: number[];
	private _filter: string;
	private _updateEveryFrame: boolean;
	private _textures: { [key: string]: string };

	constructor( name: string, options: {
		data?: {
			frag?: string;
			resolution?: number[];
			filter?: string;
			updateEveryFrame?: boolean;
			textures?: { [key: string]: string };
		};
	} ) {

		super();
		this.name = name;

		const data = options.data;
		this._frag = data?.frag || "";
		this._resolution = data?.resolution || [ 1024, 1024 ];
		this._filter = data?.filter || "linear";
		this._updateEveryFrame = data?.updateEveryFrame ?? false;
		this._textures = data?.textures || {};

	}

	public get frag() {

		return this._frag;

	}

	public get resolution() {

		return this._resolution;

	}

	public get filter() {

		return this._filter;

	}

	public get updateEveryFrame() {

		return this._updateEveryFrame;

	}

	public get textures() {

		return this._textures;

	}

}
