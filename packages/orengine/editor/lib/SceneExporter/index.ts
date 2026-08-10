import * as MTP from 'mathpower';
import { Output, BufferTarget, Mp4OutputFormat, CanvasSource } from 'mediabunny';

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

		await output.start();

		for ( let f = 0; f < totalFrames; f ++ ) {

			this._engine.updateOffline( f, fps );

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

		this._engine.setSize( prevResolution );

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
