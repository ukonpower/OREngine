import * as MXP from 'maxpower';

const OUTLINE_COLOR = [ 1.0, 0.6, 0.0 ];

export class SelectionOutline {

	private _draw: MXP.EditorDrawContract;
	private _maskTarget: MXP.EditorTarget;
	private _maskMaterial: MXP.MaterialContract;
	private _outline: MXP.EditorRecipe;
	private _showOutline: boolean;

	constructor( draw: MXP.EditorDrawContract ) {

		this._draw = draw;
		this._maskTarget = draw.createTarget( { useSceneDepth: true } );
		this._maskMaterial = draw.materials.mask();
		this._outline = draw.recipes.outline( this._maskTarget, OUTLINE_COLOR );
		this._showOutline = true;

	}

	public get showOutline() {

		return this._showOutline;

	}

	public set showOutline( v: boolean ) {

		this._showOutline = v;

	}

	public render( selectedEntity: MXP.Entity | null, cameraEntity: MXP.Entity | null ) {

		if ( ! this._showOutline ) return;

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
