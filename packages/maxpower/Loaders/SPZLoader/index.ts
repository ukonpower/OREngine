import * as GLP from 'glpower';

import { Mesh } from '../../Component/Mesh';
import { Entity } from '../../Entity';
import { Geometry } from '../../Geometry';
import { Material } from '../../Material';

import spzFrag from './shaders/spz.fs';
import spzVert from './shaders/spz.vs';

// SPZの座標系タイプ
export enum CoordinateSystem {
	UNSPECIFIED = 0,
	RUB = 1, // Right, Up, Backward (OpenGL/three.js)
	RDF = 2, // Right, Down, Forward (PLY)
	LUF = 3, // Left, Up, Forward (GLB)
	RUF = 4 // Right, Up, Forward (Unity)
}

export type SPZHeader = {
	magic: number;
	version: number;
	numPoints: number;
	shDegree: number;
	fractionalBits: number;
	flags: number;
};

export type SPZResult = {
	scene: Entity;
}

export type SPZLoaderOptions = {
	sourceCoordinateSystem?: CoordinateSystem; // 入力データの座標系
	targetCoordinateSystem?: CoordinateSystem; // 出力データの座標系
	antialias?: boolean;
}

export class SPZLoader extends GLP.EventEmitter {

	private gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		super();

		this.gl = gl;

	}

	public async load( path: string, options: SPZLoaderOptions = {} ): Promise<SPZResult> {

		// デフォルトオプションの設定
		const opts = {
			sourceCoordinateSystem: CoordinateSystem.UNSPECIFIED,
			targetCoordinateSystem: CoordinateSystem.RUB, // OpenGL標準
			antialias: true,
			...options
		};

		// 1. データの取得
		const response = await fetch( path );
		const arrayBuffer = await response.arrayBuffer();

		// 2. SPZヘッダーの解析
		const header = this.parseHeader( arrayBuffer );

		// 3. SPZデータの解析
		const gaussianData = this.parseGaussianData( arrayBuffer, header );

		// 4. 座標系の変換（必要な場合）
		if ( opts.sourceCoordinateSystem !== CoordinateSystem.UNSPECIFIED &&
			opts.targetCoordinateSystem !== CoordinateSystem.UNSPECIFIED &&
			opts.sourceCoordinateSystem !== opts.targetCoordinateSystem ) {

			this.convertCoordinateSystem( gaussianData, opts.sourceCoordinateSystem, opts.targetCoordinateSystem );

		}

		// 5. メッシュの生成
		const entity = this.createGaussianEntity( gaussianData, header, opts );

		return {
			scene: entity
		};

	}

	private parseHeader( arrayBuffer: ArrayBuffer ): SPZHeader {

		const dataView = new DataView( arrayBuffer );

		// SPZヘッダーの解析
		const header: SPZHeader = {
			magic: dataView.getUint32( 0, true ),
			version: dataView.getUint32( 4, true ),
			numPoints: dataView.getUint32( 8, true ),
			shDegree: dataView.getUint8( 12 ),
			fractionalBits: dataView.getUint8( 13 ),
			flags: dataView.getUint8( 14 )
		};

		console.log( header.magic );


		// マジックナンバーの確認 (0x5053474E)
		if ( header.magic !== 0x5053474E ) {

			throw new Error( "Invalid SPZ file format: wrong magic number" );

		}

		// バージョンの確認
		if ( header.version !== 2 ) {

			throw new Error( `Unsupported SPZ version: ${header.version}` );

		}

		return header;

	}

	private parseGaussianData( arrayBuffer: ArrayBuffer, header: SPZHeader ): any {

		// TODO: 実際のSPZデータのパース実装
		// この関数ではarrayBufferからGzipを解凍し、ポジション、スケール、回転、カラー、アルファ、球面調和関数などの
		// ガウシアンスプラットデータを抽出する必要があります

		// 実装例:
		return {
			positions: new Float32Array( header.numPoints * 3 ),
			colors: new Float32Array( header.numPoints * 3 ),
			scales: new Float32Array( header.numPoints * 3 ),
			rotations: new Float32Array( header.numPoints * 4 ),
			alphas: new Float32Array( header.numPoints ),
			sphericalHarmonics: header.shDegree > 0 ? new Float32Array( this.getSHSize( header.shDegree ) * header.numPoints ) : null
		};

	}

	private getSHSize( shDegree: number ): number {

		// 球面調和関数の係数の数を計算
		switch ( shDegree ) {

		case 0: return 1 * 3; // RGB
		case 1: return 4 * 3; // RGB
		case 2: return 9 * 3; // RGB
		case 3: return 16 * 3; // RGB
		default: return 0;

		}

	}

	private convertCoordinateSystem( data: any, sourceSystem: CoordinateSystem, targetSystem: CoordinateSystem ): void {

		// 座標系変換の実装
		// 各座標系間の変換行列を適用してpositions、rotations、その他のベクトルを変換

		// 例: RDF (PLY) から RUB (OpenGL) への変換
		if ( sourceSystem === CoordinateSystem.RDF && targetSystem === CoordinateSystem.RUB ) {

			// Y軸を反転し、Z軸を反転（右手系は維持）
			for ( let i = 0; i < data.positions.length / 3; i ++ ) {

				// Y軸反転
				data.positions[ i * 3 + 1 ] = - data.positions[ i * 3 + 1 ];
				// Z軸反転
				data.positions[ i * 3 + 2 ] = - data.positions[ i * 3 + 2 ];

				// 回転クォータニオンも同様に変換する必要がある
				// TODO: クォータニオンの変換処理

			}

		}

		// 他の座標系間の変換も同様に実装
		// ...

	}

	private createGaussianEntity( gaussianData: any, header: SPZHeader, options: SPZLoaderOptions ): Entity {

		const entity = new Entity();
		entity.name = "SPZGaussianSplat";

		// ガウシアンスプラット用のジオメトリを作成
		const geometry = new Geometry();

		// ジオメトリ属性の設定
		geometry.setAttribute( "position", gaussianData.positions, 3 );
		geometry.setAttribute( "color", gaussianData.colors, 3 );
		geometry.setAttribute( "scale", gaussianData.scales, 3 );
		geometry.setAttribute( "rotation", gaussianData.rotations, 4 );
		geometry.setAttribute( "alpha", gaussianData.alphas, 1 );

		// 球面調和関数の係数を追加（存在する場合）
		if ( gaussianData.sphericalHarmonics ) {

			geometry.setAttribute( "sphericalHarmonics", gaussianData.sphericalHarmonics,
								 this.getSHSize( header.shDegree ) );

		}

		// ガウシアンスプラット用のマテリアルを作成
		const material = new Material( {
			phase: [ "forward" ], // レンダリングフェーズの設定
			frag: spzFrag,
			vert: spzVert,
			drawType: "POINTS", // ポイントとして描画
			uniforms: {
				// ガウシアンスプラットレンダリングに必要なユニフォーム変数
				uSplatSize: { value: 1.0, type: "1f" },
			},
			defines: {
				"USE_GAUSSIAN_SPLAT": "",
				"SH_DEGREE": header.shDegree.toString()
			}
		} );

		// アンチエイリアスフラグをチェック
		if ( ( header.flags & 0x1 ) !== 0 || options.antialias ) {

			material.defines[ "USE_ANTIALIAS" ] = "";

		}

		// 球面調和関数の次数に応じてdefinesを追加
		if ( header.shDegree > 0 ) {

			material.defines[ "USE_SPHERICAL_HARMONICS" ] = "";

		}

		// Meshコンポーネントを追加
		const mesh = entity.addComponent( Mesh );
		mesh.geometry = geometry;
		mesh.material = material;

		return entity;

	}

}
