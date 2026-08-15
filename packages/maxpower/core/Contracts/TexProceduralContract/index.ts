import type * as BSP from 'basepower';
import type * as MTP from 'mathpower';

// Resources に登録できるテクスチャの最小の口。実体はバックエンド固有
export interface TextureContract {

	dispose(): void;

}

// .tex（プロシージャルテクスチャ）が満たす口
export interface TexProceduralContract extends TextureContract {

	render(): void;

}

export interface TexProceduralParam {

	name?: string;
	// webgl は GLSL、webgpu は WGSL のフラグメントソース
	frag: string;
	resolution: MTP.Vector;
	// 'linear' | 'nearest'。省略時は linear
	filter?: string;
	// 依存テクスチャ。キーがシェーダー上の名前になる
	textures?: { [ name: string ]: TextureContract };
	// updateEveryFrame のテクスチャへ渡すエンジンuniform（webgpuはframe uniformsで足りるため未使用）
	uniforms?: BSP.Uniforms;

}
