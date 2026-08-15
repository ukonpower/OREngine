import * as MTP from 'mathpower';

import type { EditorDrawContract, EditorRecipe, EditorTarget } from '../../core/Contracts/EditorDrawContract';
import type { MaterialContract } from '../../core/Contracts/MaterialContract';
import type { HeadlessEngine, Renderer } from '../Renderer';

// 描画先の不透明ハンドル。sizeを持たないものは解像度に追従する
class HeadlessTarget implements EditorTarget {

	public readonly isEditorFrame = true as const;
	public readonly isEditorTarget = true as const;
	public readonly size: MTP.Vector | null;

	constructor( size?: MTP.Vector ) {

		this.size = size || null;

	}

}

class HeadlessRecipe implements EditorRecipe {

	public readonly isEditorRecipe = true as const;

}

// エディタ描画のno-op実装。ギズモ・アウトライン・プレビューの各呼び出しを黙って捨てる
export class HeadlessEditorDraw implements EditorDrawContract {

	private _resolution: MTP.Vector;

	constructor( renderer: Renderer ) {

		this._resolution = renderer.resolution.clone();

	}

	public renderEntities() {}

	public renderFullscreen() {}

	public blit() {}

	public drawTexture() {}

	// AssetPreviewManager がピクセル配列を走査するので、透明黒で正しいサイズを返す
	public readPixels( target: EditorTarget ): Promise<Uint8Array> {

		const size = ( target as HeadlessTarget ).size || this._resolution;

		return Promise.resolve( new Uint8Array( size.x * size.y * 4 ) );

	}

	public createTarget( opt?: { useSceneDepth?: boolean; size?: MTP.Vector } ): EditorTarget {

		return new HeadlessTarget( opt && opt.size );

	}

	public present() {}

	public resize( resolution: MTP.Vector ) {

		this._resolution.copy( resolution );

	}

	public onDrawPass() {}

	public materials = {
		flat: (): MaterialContract => ( { name: "editorFlat" } ),
		mask: (): MaterialContract => ( { name: "editorMask" } ),
		grid: (): MaterialContract => ( { name: "editorGrid" } ),
	};

	public recipes = {
		outline: (): EditorRecipe => new HeadlessRecipe(),
	};

}

// エディタ描画のheadless実装を組み立てる（@or-rendererの供給口）
export const createEditorDraw = ( engine: HeadlessEngine ): EditorDrawContract => new HeadlessEditorDraw( engine.renderer );
