import * as MTP from 'mathpower';

import { PostProcessPass } from '../render/PostProcess';

import type { TexProceduralContract, TexProceduralParam } from '../../core/Contracts/TexProceduralContract';
import type { TextureSource } from '../backend/Bindings';
import type { Renderer } from '../render/Renderer';

// .tex のWebGPU実装。WGSLのフルスクリーンパスを固定解像度のテクスチャへ焼く。
// deviceの準備が非同期なため、render()は予約だけを行い、実際の描画は
// Renderer のフレーム先頭（enqueueTexRender の消化）で走る。
// マテリアルへは TextureSource として渡し、エディタのプレビューは createView() を duck-typing で呼ぶ
export class TexProcedural implements TexProceduralContract, TextureSource {

	public sampler: GPUSampler | null;

	private _renderer: Renderer;
	private _param: TexProceduralParam;
	private _pass: PostProcessPass | null;
	private _passSamplers: GPUSampler[] | null;
	private _view: GPUTextureView | null;
	private _disposed: boolean;

	constructor( renderer: Renderer, param: TexProceduralParam ) {

		this._renderer = renderer;
		this._param = param;
		this._pass = null;
		this._passSamplers = null;
		this._view = null;
		this._disposed = false;
		this.sampler = null;

		this.render();

	}

	public get view() {

		return this._view;

	}

	// エディタのプレビュー（EditorDraw.drawTexture）が duck-typing で呼ぶ
	public createView() {

		return this._view;

	}

	// 次のフレーム先頭で描くよう予約する
	public render() {

		this._renderer.enqueueTexRender( this );

	}

	// Renderer のフレーム先頭から呼ばれる
	public encode( device: GPUDevice, encoder: GPUCommandEncoder, frameBindGroup: GPUBindGroup ) {

		if ( this._disposed ) return;

		if ( ! this._pass ) this._build( device );

		const pass = this._pass!;

		// 依存テクスチャを繋ぐ（実体が揃っていないフレームは PostProcessPass 側でスキップされる）
		const deps = this._param.textures || {};
		const keys = Object.keys( deps );

		for ( let i = 0; i < keys.length; i ++ ) {

			const view = ( deps[ keys[ i ] ] as Partial<TextureSource> ).view;

			if ( view ) pass.setInput( keys[ i ], view );

		}

		pass.render( device, encoder, frameBindGroup, this._passSamplers! );

		this._view = pass.targetView;

	}

	// パスと出力テクスチャ・サンプラーを組み立てる（device取得後の初回encode時に一度だけ）
	private _build( device: GPUDevice ) {

		const nearest = this._param.filter === 'nearest';

		this._pass = new PostProcessPass( {
			name: `tex/${this._param.name || 'procedural'}`,
			wgsl: this._param.frag,
			inputs: Object.keys( this._param.textures || {} ),
			uniforms: this._param.uniforms,
			format: 'rgba8unorm',
		}, new MTP.Vector(), new MTP.Vector() );

		this._pass.build( device, this._renderer.uniformLayout! );
		this._pass.setSize( device, this._param.resolution.x, this._param.resolution.y );

		// 依存テクスチャを読むためのサンプラー（PostProcessChainと同じ並び: filtering / non-filtering）
		this._passSamplers = [
			device.createSampler( {
				label: 'texProcedural/linear',
				magFilter: 'linear',
				minFilter: 'linear',
				addressModeU: 'repeat',
				addressModeV: 'repeat',
			} ),
			device.createSampler( { label: 'texProcedural/nearest' } ),
		];

		// マテリアルがこのテクスチャを読むときのサンプラー（webgl側の REPEAT + filter 設定に合わせる）
		this.sampler = device.createSampler( {
			label: `tex/${this._param.name || 'procedural'}`,
			magFilter: nearest ? 'nearest' : 'linear',
			minFilter: nearest ? 'nearest' : 'linear',
			addressModeU: 'repeat',
			addressModeV: 'repeat',
		} );

	}

	public dispose() {

		this._disposed = true;
		this._renderer.cancelTexRender( this );
		this._pass?.dispose();
		this._pass = null;
		this._view = null;
		this.sampler = null;

	}

}
