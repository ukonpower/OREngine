import type { Entity } from '../../Entity';
import type { MaterialContract } from '../MaterialContract';
import type * as GLP from 'glpower';

/*-------------------------------
	Handles
-------------------------------*/

// パス出力1枚を指す不透明ハンドル（実体は各バックエンドのテクスチャ）
export interface EditorFrame {
	readonly isEditorFrame: true;
}

// 描画先の不透明ハンドル。blitのsrcとしても使える
export interface EditorTarget extends EditorFrame {
	readonly isEditorTarget: true;
}

// フルスクリーンパスの不透明ハンドル（実体は各バックエンドのシェーダー）
export interface EditorRecipe {
	readonly isEditorRecipe: true;
}

export type EditorRect = {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface EditorRenderEntitiesParam {
	camera: Entity;
	entities: Entity[];
	// null = 画面（uiバッファ）へ重ね描き。ターゲット指定時は毎回クリアして描く
	target: EditorTarget | null;
	materialOverride?: MaterialContract;
	depthCompare?: 'less' | 'lequal';
}

/*-------------------------------
	EditorDrawContract
-------------------------------*/

// エディタ描画がバックエンドに要求するプリミティブ。
// ロジック（ドラッグ計算・ワイヤ変換・選択管理・デバッガUI・プレビューキャッシュ）は共有側に置き、
// 描画だけをこの契約に通す。
export interface EditorDrawContract {

	// シーンの一部を任意ターゲットへ描く（gizmo / helper / wireframe / selection mask）
	renderEntities( opt: EditorRenderEntitiesParam ): void;

	// フルスクリーンパス（outline合成など）
	renderFullscreen( recipe: EditorRecipe, target: EditorTarget | null ): void;

	// 中間バッファを矩形指定で転写する（dstRectは左上原点）
	blit( src: EditorFrame, dst: EditorTarget | null, dstRect?: EditorRect ): void;

	// バックエンドのテクスチャをそのままターゲットへ転写する（AssetPreview用）
	drawTexture( texture: unknown, target: EditorTarget ): void;

	// WebGPUの読み戻しはバッファのマッピングを待つ必要があるため、両バックエンドとも非同期で揃える
	readPixels( target: EditorTarget ): Promise<Uint8Array>;

	// useSceneDepthはシーンdepth共有（outlineの深度テスト用）。sizeを省くと解像度に追従する
	createTarget( opt?: { useSceneDepth?: boolean; size?: GLP.Vector } ): EditorTarget;

	// uiバッファを画面へ出す
	present(): void;

	resize( resolution: GLP.Vector ): void;

	// 各パス完了ごとに不透明ハンドルを通知（FrameDebuggerの観測はこのイベントが正）
	onDrawPass( cb: ( frame: EditorFrame, label: string ) => void ): void;

	// バックエンド言語で実装された固定シェーダーレシピ
	materials: {
		// gizmo / helper / wireframe。colorは参照のまま保持され、書き換えが描画に反映される
		flat( opt: { color: number[]; lines?: boolean; depthTest?: boolean; depthWrite?: boolean } ): MaterialContract;
		// selectionシルエット
		mask(): MaterialContract;
		// XZ平面のグリッド。paramsは [ セルサイズ, 細かい格子の濃さ, フェード距離 ] で、
		// colorともども参照のまま保持され、書き換えが描画に反映される
		grid( opt: { color: number[]; params: number[] } ): MaterialContract;
	};

	recipes: {
		outline( mask: EditorTarget, color: number[] ): EditorRecipe;
	};

}
