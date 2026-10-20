import * as MTP from 'mathpower';
import * as MXP from 'maxpower';
// orengine/builtin の入口は builtin のコンポーネントをすべて登録する glob を持ち、player に全部入るので、Music のモジュールを直接引く
import { Music } from 'orengine/builtin/Components/Utility/Music';

import fragSrc from './shaders/clipColor.fs';

// 帯の数値の何番目を色相に使うか。Chord の楽器の root（根音の半音の数）と同じ並び
const HUE_PARAM = 1;

// 色相（0〜1）の鮮やかな色を out に入れる（彩度 0.7・明度 1 の HSV）
const setHueColor = ( out: MTP.Vector, hue: number ) => {

	const channel = ( n: number ) => {

		const k = ( n + hue * 6 ) % 6;

		return 1 - 0.7 * Math.max( 0, Math.min( k, 4 - k, 1 ) );

	};

	out.set( channel( 5 ), channel( 3 ), channel( 1 ) );

};

// トラックで鳴っている帯で色が変わる立方体（Music の currentClip のサンプル）。
// 帯の数値（Chord の root）を色相にし、帯の頭で光らせる。帯の外では暗い灰色にする
export class ClipColor extends MXP.Component {

	private _track: string;
	private _decay: number;
	private _albedo: MTP.Vector;
	private _emission: MTP.Vector;
	private _material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._track = "Chord";
		this._decay = 3;
		this._albedo = new MTP.Vector();
		this._emission = new MTP.Vector();

		this._material = new MXP.Material( {
			name: "ClipColor",
			phase: [ "shadowMap", "deferred" ],
			frag: MXP.hotGet( "ClipColorFrag", fragSrc ),
			uniforms: {
				uAlbedo: { value: this._albedo, type: "3fv" },
				uEmission: { value: this._emission, type: "3fv" },
			},
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } ),
			material: this._material,
		} );

		// 帯を引くトラックの名前
		this.field( "track", () => this._track, ( v: string ) => this._track = v );

		// 帯の頭からの光の減り方（大きいほど早く消える）
		this.field( "decay", () => this._decay, ( v: number ) => this._decay = v, { min: 0, step: 0.1 } );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/clipColor.fs', ( module ) => {

				if ( module ) {

					this._material.frag = MXP.hotUpdate( "ClipColorFrag", module.default );
					this._material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		let clip = null;

		const music = Music.instance;

		if ( music ) {

			clip = music.currentClip( this._track, event.timeCode );

		}

		if ( ! clip ) {

			this._albedo.set( 0.15, 0.15, 0.15 );
			this._emission.set( 0, 0, 0 );

			return;

		}

		// 根音（半音の数）を 12 で一回りする色相にする
		setHueColor( this._albedo, clip.params[ HUE_PARAM ] / 12 );

		const flash = Math.exp( - clip.since * this._decay );

		this._emission.copy( this._albedo ).multiply( 0.3 + flash * 2 );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
