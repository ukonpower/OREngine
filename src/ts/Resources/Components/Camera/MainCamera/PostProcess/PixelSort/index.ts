import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import pixelSortFrag from './shaders/pixelSort.fs';
import pixelSortMaskFrag from './shaders/pixelSortMask.fs';
import pixelSortRangeFrag from './shaders/pixelSortRange.fs';

import { globalUniforms, gl } from "~/ts/Globals";

export class PixelSort extends MXP.PostProcess {

	constructor() {

		/*-------------------------------
			PixelSort
		-------------------------------*/

		let pixelSortInput = undefined;
		pixelSortInput = undefined;

		const pixelSortResolution = new GLP.Vector( 1920, 1080 );
		const pixelSortUniforms = MXP.UniformsUtils.merge( globalUniforms.time, {
			uThresholdMin: {
				value: 0.2,
				type: '1f'
			},
			uThresholdMax: {
				value: 1,
				type: '1f'
			}
		} );

		// mask

		const pixelSortMask = new MXP.PostProcessPass( gl, {
			name: 'pixelSortMask',
			frag: MXP.hotUpdate( "pixelSortMask", pixelSortMaskFrag ),
			passThrough: true,
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, pixelSortUniforms ),
			fixedResotluion: new GLP.Vector( pixelSortResolution.x, pixelSortResolution.y ),
			backBufferOverride: pixelSortInput
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/pixelSortMask.fs", ( module ) => {

				if ( module ) {

					pixelSortMask.frag = module.default;

				}

				pixelSortMask.requestUpdate();

			} );

		}

		// range

		const pixelSortRange = new MXP.PostProcessPass( gl, {
			name: 'pixelSortRange',
			frag: MXP.hotUpdate( "pixelSortRange", pixelSortRangeFrag ),
			passThrough: true,
			uniforms: MXP.UniformsUtils.merge( {
				uMaskTex: {
					value: pixelSortMask.renderTarget!.textures[ 0 ],
					type: '1i'
				}
			} ),
			fixedResotluion: new GLP.Vector( pixelSortResolution.x, pixelSortResolution.y ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
			] ),
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/pixelSortRange.fs", ( module ) => {

				if ( module ) {

					pixelSortRange.frag = module.default;

				}

				pixelSortRange.requestUpdate();

			} );

		}

		// sort

		const pixelSortRT1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const pixelSortRT2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const pixelSortPasses: MXP.PostProcessPass[] = [];

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
							value: pixelSortRange.renderTarget!.textures[ 0 ],
							type: '1i'
						},
						uMaskTex: {
							value: pixelSortMask.renderTarget!.textures[ 0 ],
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
					backBufferOverride: cnt === 0 ? pixelSortInput : backBufferOverride,
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

				pixelSortPasses.push( pixelSort );

			}

		}

		const lastPass = pixelSortPasses[ pixelSortPasses.length - 1 ];
		lastPass.passThrough = false;

		super( {
			passes: [
				pixelSortMask,
				pixelSortRange,
				...pixelSortPasses
			]
		} );

	}

}
