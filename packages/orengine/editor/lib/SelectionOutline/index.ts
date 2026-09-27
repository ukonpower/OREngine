import * as MXP from 'maxpower';

import { ACTIVE_SELECTION_COLOR, SELECTION_COLOR } from '../SelectionColor';

type OutlinePass = {
	maskTarget: MXP.EditorTarget;
	outline: MXP.EditorRecipe;
};

// 選んだメッシュの輪郭をシーンの上に描く。色で分けるため、ほかの選んだものとアクティブを別々のマスクで描く
export class SelectionOutline {

	private _draw: MXP.EditorDrawContract;
	private _maskMaterial: MXP.MaterialContract;
	private _selectedPass: OutlinePass;
	private _activePass: OutlinePass;

	constructor( draw: MXP.EditorDrawContract ) {

		this._draw = draw;
		this._maskMaterial = draw.materials.mask();
		this._selectedPass = this._createPass( SELECTION_COLOR );
		this._activePass = this._createPass( ACTIVE_SELECTION_COLOR );

	}

	private _createPass( color: number[] ): OutlinePass {

		const maskTarget = this._draw.createTarget();

		return { maskTarget, outline: this._draw.recipes.outline( maskTarget, color ) };

	}

	// アクティブを後に描いて、重なったところはアクティブの色にする
	public render( view: MXP.RenderViewContract, selectedEntities: MXP.Entity[], activeEntity: MXP.Entity | null, cameraEntity: MXP.Entity | null ) {

		if ( ! cameraEntity ) return;

		const others: MXP.Entity[] = [];

		for ( const entity of selectedEntities ) {

			if ( entity === activeEntity ) continue;
			if ( ! entity.getComponent( MXP.Mesh ) ) continue;

			others.push( entity );

		}

		this._renderPass( view, this._selectedPass, others, cameraEntity );

		if ( activeEntity && activeEntity.getComponent( MXP.Mesh ) ) {

			this._renderPass( view, this._activePass, [ activeEntity ], cameraEntity );

		}

	}

	private _renderPass( view: MXP.RenderViewContract, pass: OutlinePass, entities: MXP.Entity[], cameraEntity: MXP.Entity ) {

		if ( entities.length === 0 ) return;

		this._draw.renderEntities( {
			view,
			camera: cameraEntity,
			entities,
			target: pass.maskTarget,
			useSceneDepth: true,
			materialOverride: this._maskMaterial,
			depthCompare: 'lequal',
		} );

		this._draw.renderFullscreen( view, pass.outline, null );

	}

}
