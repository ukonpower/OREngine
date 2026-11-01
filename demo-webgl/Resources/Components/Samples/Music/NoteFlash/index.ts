import * as MTP from 'mathpower';
import * as MXP from 'maxpower';
// orengine/builtin の入口は builtin のコンポーネントをすべて登録する glob を持ち、player に全部入るので、Music のモジュールを直接引く
import { Music } from 'orengine/builtin/Components/Utility/Music';

import fragSrc from './shaders/noteFlash.fs';

// トラックのノートが鳴り始めるたびに光る立方体（Music の lastNote のサンプル）。
// 時刻に event の timeCode を渡すので、Cloner の複製は持ち場の遅れに合わせて順番に光る
export class NoteFlash extends MXP.Component {

	private _track: string;
	private _decay: number;
	private _color: MTP.Vector;
	private _albedo: MTP.Vector;
	private _emission: MTP.Vector;
	private _material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._track = "Kick";
		this._decay = 6;
		this._color = new MTP.Vector( 1, 0.5, 0.2 );
		this._albedo = new MTP.Vector();
		this._emission = new MTP.Vector();

		this._material = new MXP.Material( {
			name: "NoteFlash",
			phase: [ "shadowMap", "deferred" ],
			frag: MXP.hotGet( "NoteFlashFrag", fragSrc ),
			uniforms: {
				uAlbedo: { value: this._albedo, type: "3fv" },
				uEmission: { value: this._emission, type: "3fv" },
			},
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } ),
			material: this._material,
		} );

		// ノートを引くトラックの名前
		this.field( "track", () => this._track, ( v: string ) => this._track = v );

		// 鳴り始めてからの光の減り方（大きいほど早く消える）
		this.field( "decay", () => this._decay, ( v: number ) => this._decay = v, { min: 0, step: 0.1 } );

		this.field( "color", () => this._color.getElm( "vec3" ), ( v: number[] ) => this._color.setFromArray( v ), { format: { type: "color" } } );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/noteFlash.fs', ( module ) => {

				if ( module ) {

					this._material.frag = MXP.hotUpdate( "NoteFlashFrag", module.default );
					this._material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		let flash = 0;

		const music = Music.instance;

		if ( music ) {

			const note = music.lastNote( this._track, event.timeCode );

			if ( note ) {

				flash = Math.exp( - note.since * this._decay );

			}

		}

		this._albedo.copy( this._color ).multiply( 0.2 );
		this._emission.copy( this._color ).multiply( flash * 2 );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
