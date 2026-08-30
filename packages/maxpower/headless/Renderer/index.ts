import * as MTP from 'mathpower';

import { Serializable } from '../../core/Serializable';
import { TexProcedural } from '../TexProcedural';

import type { EngineContract } from '../../core/Contracts/EngineContract';
import type { RendererContract } from '../../core/Contracts/RendererContract';
import type { PipelineConfig, RenderViewContract } from '../../core/Contracts/RenderViewContract';
import type { Entity } from '../../core/Entity';
import type * as BSP from 'basepower';

// 描画資源を持たないビュー。設定だけ受け取って捨てる
export class RenderView implements RenderViewContract {

	public camera: Entity | null;
	public pipelineOverride: PipelineConfig | null;

	constructor() {

		this.camera = null;
		this.pipelineOverride = null;

	}

	public dispose() {}

}

// グラフィックスコンテキストを一切作らないレンダラー。
// Storybook等でEngineとエディタを本物のまま積み、描画だけを落とすための口
export class Renderer extends Serializable implements RendererContract {

	public readonly canvas: HTMLCanvasElement;
	public readonly resolution: MTP.Vector;
	public globalUniforms: BSP.Uniforms;

	constructor() {

		super();

		// Engine.setSize が width/height を書きに来るのでcanvas自体は要る（getContextは呼ばない）
		this.canvas = document.createElement( "canvas" );
		this.resolution = new MTP.Vector();
		this.globalUniforms = {};

	}

	public createView(): RenderView {

		return new RenderView();

	}

	public prepareScene() {}

	public render() {}

	public present() {}

	public resize( resolution: MTP.Vector ) {

		this.resolution.copy( resolution );

	}

	// Engine.compileShaders から呼ばれる。コンパイルするシェーダーが無いので即解決する
	public compileShaders(): Promise<void> {

		return Promise.resolve();

	}

	public createTexProcedural(): TexProcedural {

		return new TexProcedural();

	}

}

// headlessバックエンドを前提にしたEngineContract型
export type HeadlessEngine = EngineContract<Renderer>;

// 描画しないレンダラーを組み立てる（@or-rendererの供給口）
export const createRenderer = ( _engine: EngineContract ): Renderer => new Renderer();
