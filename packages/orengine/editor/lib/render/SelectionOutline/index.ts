import * as MXP from 'maxpower';

const OUTLINE_COLOR = [ 1.0, 0.6, 0.0 ];

export class SelectionOutline {

	private _draw: MXP.EditorDraw;
	private _maskTarget: MXP.EditorTarget;
	private _maskMaterial: MXP.MaterialBase;
	private _outline: MXP.EditorRecipe;

	constructor( draw: MXP.EditorDraw ) {

		this._draw = draw;
		this._maskTarget = draw.createTarget( { useSceneDepth: true } );
		this._maskMaterial = draw.materials.mask();
		this._outline = draw.recipes.outline( this._maskTarget, OUTLINE_COLOR );

	}

	public render( selectedEntity: MXP.Entity | null, cameraEntity: MXP.Entity | null ) {

		if ( ! selectedEntity || ! cameraEntity ) return;

		if ( ! selectedEntity.getComponent( MXP.Mesh ) ) return;

		this._draw.renderEntities( {
			camera: cameraEntity,
			entities: [ selectedEntity ],
			target: this._maskTarget,
			materialOverride: this._maskMaterial,
			depthCompare: 'lequal',
		} );

		this._draw.renderFullscreen( this._outline, null );

	}

}
