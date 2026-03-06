import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../Engine';
import outlineFrag from '../shaders/outline.fs';
import selectionFrag from '../shaders/selection.fs';
import selectionVert from '../shaders/selection.vs';

export class SelectionOutline {

	private _selectionBuffer: GLP.GLPowerFrameBuffer;
	private _selectionMaterial: MXP.Material;
	private _outlinePostProcess: MXP.PostProcess;

	constructor( engine: Engine ) {

		const gl = engine.renderer.gl;

		this._selectionBuffer = new GLP.GLPowerFrameBuffer( gl )
			.setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] );
		this._selectionBuffer.setSize( engine.renderer.resolution );

		this._selectionMaterial = new MXP.Material( {
			vert: selectionVert,
			frag: selectionFrag,
		} );
		this._selectionMaterial.visibilityFlag = { deferred: false, forward: true, shadowMap: false, envMap: false, ui: false, postprocess: false };

		const outlinePass = new MXP.PostProcessPass( gl, {
			frag: outlineFrag,
			renderTarget: null,
			uniforms: {
				uMaskTexture: { value: this._selectionBuffer.textures[ 0 ], type: '1i' },
				uOutlineColor: { value: new GLP.Vector( 1.0, 0.6, 0.0 ), type: '3fv' },
			},
		} );

		this._outlinePostProcess = new MXP.PostProcess( {
			name: "editorOutline",
			passes: [ outlinePass ],
		} );

	}

	public render( selectedEntity: MXP.Entity | null, cameraEntity: MXP.Entity | null, engine: Engine ) {

		if ( ! selectedEntity || ! cameraEntity ) return;

		const mesh = selectedEntity.getComponent( MXP.Mesh );

		if ( ! mesh ) return;

		const res = engine.renderer.resolution;

		if ( this._selectionBuffer.size.x !== res.x || this._selectionBuffer.size.y !== res.y ) {

			this._selectionBuffer.setSize( res );

		}

		const origMaterial = mesh.material;
		mesh.material = this._selectionMaterial;

		engine.renderer.renderCamera(
			"forward",
			cameraEntity,
			[ selectedEntity ],
			this._selectionBuffer,
			res
		);

		mesh.material = origMaterial;

		engine.renderer.renderPostProcess(
			this._outlinePostProcess,
			undefined,
			res
		);

	}

	public resize( resolution: GLP.Vector ) {

		this._selectionBuffer.setSize( resolution );
		this._outlinePostProcess.resize( resolution );

	}

}
