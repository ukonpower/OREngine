import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import pixelSortFrag from './shaders/pixelSort.fs';
import pixelSortMaskFrag from './shaders/pixelSortMask.fs';
import pixelSortRangeFrag from './shaders/pixelSortRange.fs';

import { globalUniforms, gl } from "~/ts/Globals";

export class PixelSort extends MXP.PostProcess {

	private _uniforms: GLP.Uniforms;

	constructor( ) {

		super( {
			name: "PixelSort"
		} );

		const pixelSortRT1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const pixelSortRT2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const rtRange = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
		] );

		const currentResolution = new GLP.Vector( 0, 0 );

		this._uniforms = MXP.UniformsUtils.merge( globalUniforms.time, {
			uThresholdMin: {
				value: 0.2,
				type: '1f'
			},
			uThresholdMax: {
				value: 1,
				type: '1f'
			}
		} );

		const creaetPass = ( resolution: GLP.Vector ) => {

			if ( resolution.x * resolution.y == 0 ) return;
			if ( resolution.x == currentResolution.x || resolution.y == currentResolution.y ) return;

			currentResolution.copy( resolution );

			const pixelSortResolution = resolution.clone();

			// mask

			const maskPass = new MXP.PostProcessPass( gl, {
				name: 'pixelSortMask',
				frag: MXP.hotUpdate( "pixelSortMask", pixelSortMaskFrag ),
				passThrough: true,
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, this._uniforms ),
				fixedResotluion: pixelSortResolution.clone(),
			} );

			if ( import.meta.hot ) {

				import.meta.hot.accept( "./shaders/pixelSortMask.fs", ( module ) => {

					if ( module ) {

						maskPass.frag = module.default;

					}

					maskPass.requestUpdate();

				} );

			}

			// range

			const rangePass = new MXP.PostProcessPass( gl, {
				name: 'pixelSortRange',
				frag: MXP.hotUpdate( "pixelSortRange", pixelSortRangeFrag ),
				passThrough: true,
				uniforms: MXP.UniformsUtils.merge( {
					uMaskTex: {
						value: maskPass.renderTarget!.textures[ 0 ],
						type: '1i'
					}
				} ),
				fixedResotluion: pixelSortResolution.clone(),
				renderTarget: rtRange,
			} );

			if ( import.meta.hot ) {

				import.meta.hot.accept( "./shaders/pixelSortRange.fs", ( module ) => {

					if ( module ) {

						rangePass.frag = module.default;

					}

					rangePass.requestUpdate();

				} );

			}

			// sort

			const sortPasses: MXP.PostProcessPass[] = [];

			const pixelSortBlocks = Math.log2( pixelSortResolution.y );

			let cnt = 0;

			for ( let iBlock = 0; iBlock < pixelSortBlocks; iBlock ++ ) {

				for ( let iSubBlock = 0; iSubBlock <= iBlock; iSubBlock ++ ) {

					const backBufferOverride = cnt % 2 === 0 ? pixelSortRT1.textures : pixelSortRT2.textures;

					const pixelSort: MXP.PostProcessPass = new MXP.PostProcessPass( gl, {
						name: 'pixelSort',
						frag: MXP.hotGet( "pixelSort", pixelSortFrag ),
						uniforms: {
							uRangeTex: {
								value: rangePass.renderTarget!.textures[ 0 ],
								type: '1i'
							},
							uMaskTex: {
								value: maskPass.renderTarget!.textures[ 0 ],
								type: '1i'
							},
							uBlock: {
								value: iBlock,
								type: "1f"
							},
							uSubBlock: {
								value: iSubBlock,
								type: "1f"
							}
						},
						passThrough: true,
						backBufferOverride: cnt === 0 ? undefined : backBufferOverride,
						renderTarget: cnt % 2 === 0 ? pixelSortRT2 : pixelSortRT1,
						fixedResotluion: pixelSortResolution,
					} );

					cnt ++;

					if ( import.meta.hot ) {

						import.meta.hot.accept( "./shaders/pixelSort.fs", ( module ) => {

							if ( module ) {

								pixelSort.frag = module.default;

							}

							pixelSort.requestUpdate();

						} );

					}

					sortPasses.push( pixelSort );

				}

			}

			const lastPass = sortPasses[ sortPasses.length - 1 ];
			lastPass.passThrough = false;

			this._passes = [
				maskPass,
				rangePass,
				...sortPasses
			];

		};

		creaetPass( new GLP.Vector( 1920, 1080 ) );

		const onResize = ( resolution: GLP.Vector ) => {

			creaetPass( resolution );

		};

		this.on( "resize", onResize );

		this.once( "dispose", () => {

			this.off( "resize" );

		} );

	}

	public get uniforms() {

		return this._uniforms;

	}

	public resize( resolution: GLP.Vector ): void {

		this.emit( "resize", [ resolution ] );

		super.resize( resolution );

	}

}
