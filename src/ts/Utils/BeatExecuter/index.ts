import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { BPM } from '~/ts/Resources/Components/DrawTokyo/System/BPM';

export class BeatExecuter extends GLP.EventEmitter {

	public enabled: boolean;
	private _duration: number;
	private _appendedSerializable: MXP.Serializable | null;

	constructor() {

		super();

		this.enabled = true;

		this._duration = 16;

		this._appendedSerializable = null;

		const onBeat = ( beats: number[], beat: number ) => {

			if ( beat == this._duration && this.enabled ) {

				this.emit( "exec", [ beats, beat ] );

			}

		};

		BPM.on( "beat/1", onBeat );
		BPM.on( "beat/2", onBeat );
		BPM.on( "beat/4", onBeat );
		BPM.on( "beat/8", onBeat );
		BPM.on( "beat/16", onBeat );
		BPM.on( "beat/32", onBeat );

		const onDispose = () => {

			BPM.off( "beat/1", onBeat );
			BPM.off( "beat/2", onBeat );
			BPM.off( "beat/4", onBeat );
			BPM.off( "beat/8", onBeat );
			BPM.off( "beat/16", onBeat );
			BPM.off( "beat/32", onBeat );

		};

		this.once( "dispose", onDispose );

	}

	public appendSerializeField( serializable: MXP.Serializable, key?: string ) {

		serializable.field(
			key || "duration",
			() => this._duration,
			( v ) => this._duration = v,
			{
				format: {
					type: "select",
					list: [
						{ label: "1", value: 1 },
						{ label: "2", value: 2 },
						{ label: "4", value: 4 },
						{ label: "8", value: 8 },
						{ label: "16", value: 16 },
						{ label: "32", value: 32 },
					]
				}
			}
		);

		this._appendedSerializable = serializable;

	}

	public set duration( value: number ) {

		this._duration = value;

		if ( this._appendedSerializable ) {

			this._appendedSerializable.setField( "duration", value );

		}


	}

	public get duration() {

		return this._duration;

	}

	public dispose() {

		this.emit( "dispose" );

	}

}
