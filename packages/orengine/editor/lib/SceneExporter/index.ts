import { Output, BufferTarget, Mp4OutputFormat, CanvasSource } from 'mediabunny';

import * as MTP from 'mathpower';

import { Engine } from '../../../core/Engine';

export interface SceneExporterOption {
	fps: number;
	duration: number;
	resolution: MTP.Vector;
	bitrate?: number;
}

export interface SceneExporterProgress {
	current: number;
	total: number;
	phase: 'encoding' | 'finalizing' | 'done';
}

// シーンを本番同等（シーンカメラ・上書きなし）で描いて MP4 に書き出す
export class SceneExporter {

	private _engine: Engine;

	constructor( engine: Engine ) {

		this._engine = engine;

	}

	public async export(
		option: SceneExporterOption,
		onProgress?: ( progress: SceneExporterProgress ) => void
	): Promise<Blob> {

		const { fps, duration, resolution, bitrate = 8_000_000 } = option;
		const totalFrames = Math.ceil( duration / 60 * fps );
		const canvas = this._engine.canvas;

		const prevResolution = this._engine.renderer.resolution.clone();
		this._engine.setSize( resolution );

		// 書き出し中だけの専用ビュー。offscreen でないので render の最後でエンジンの canvas に出る
		const view = this._engine.createView();

		const target = new BufferTarget();
		const output = new Output( {
			format: new Mp4OutputFormat(),
			target: target,
		} );

		const videoSource = new CanvasSource( canvas as HTMLCanvasElement, {
			codec: 'avc',
			bitrate: bitrate,
			keyFrameInterval: 2,
		} );

		output.addVideoTrack( videoSource );

		try {

			await output.start();

			for ( let f = 0; f < totalFrames; f ++ ) {

				this._engine.updateOffline( f, fps );
				this._engine.render( view );

				await videoSource.add( f / fps, 1 / fps );

				if ( onProgress ) {

					onProgress( {
						current: f + 1,
						total: totalFrames,
						phase: 'encoding',
					} );

				}

				if ( f % 10 === 0 ) {

					await new Promise( r => setTimeout( r, 0 ) );

				}

			}

			if ( onProgress ) {

				onProgress( { current: totalFrames, total: totalFrames, phase: 'finalizing' } );

			}

			await output.finalize();

		} finally {

			view.dispose();
			this._engine.setSize( prevResolution );

		}

		if ( onProgress ) {

			onProgress( { current: totalFrames, total: totalFrames, phase: 'done' } );

		}

		return new Blob( [ target.buffer! ], { type: "video/mp4" } );

	}

	public static download( blob: Blob, filename: string = "scene.mp4" ) {

		const url = URL.createObjectURL( blob );
		const a = document.createElement( "a" );
		a.href = url;
		a.download = filename;
		document.body.appendChild( a );
		a.click();
		document.body.removeChild( a );
		URL.revokeObjectURL( url );

	}

}
