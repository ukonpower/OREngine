import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import fragSrc from './shaders/spectrumWave.fs';
import vertSrc from './shaders/spectrumWave.vs';

// 鳴っている音のスペクトル（Music が全体の uniform に置く uMusicFreqTex）の形に上の辺が揺れる板。
// スペクトルは再生中の音から取るので、停止中は最後の形のまま止まり、シーンの撮影には反映されない
export class SpectrumWave extends MXP.Component {

	private _color: MTP.Vector;
	private _height: { value: number, type: "1f" };
	private _material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._color = new MTP.Vector( 0.3, 0.6, 1 );
		this._height = { value: 2, type: "1f" };

		// uMusicFreqTex はマテリアルに書かなくても、renderer.globalUniforms から入る
		this._material = new MXP.Material( {
			name: "SpectrumWave",
			phase: [ "deferred" ],
			vert: MXP.hotGet( "SpectrumWaveVert", vertSrc ),
			frag: MXP.hotGet( "SpectrumWaveFrag", fragSrc ),
			uniforms: {
				uColor: { value: this._color, type: "3fv" },
				uHeight: this._height,
			},
		} );

		// 上の辺の頂点の数がスペクトルの細かさになる（テクスチャの 256 段のうち、使う半分の 128 段に合わせる）
		this.entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { width: 8, height: 1, widthSegments: 128 } ),
			material: this._material,
		} );

		this.field( "color", () => this._color.getElm( "vec3" ), ( v: number[] ) => this._color.setFromArray( v ), { format: { type: "color" } } );

		// スペクトルが最大のときの高さ
		this.field( "height", () => this._height.value, ( v: number ) => this._height.value = v, { min: 0, step: 0.1 } );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/spectrumWave.vs', ( module ) => {

				if ( module ) {

					this._material.vert = MXP.hotUpdate( "SpectrumWaveVert", module.default );
					this._material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/spectrumWave.fs', ( module ) => {

				if ( module ) {

					this._material.frag = MXP.hotUpdate( "SpectrumWaveFrag", module.default );
					this._material.requestUpdate();

				}

			} );

		}

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
