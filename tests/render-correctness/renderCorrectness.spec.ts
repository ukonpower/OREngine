import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

import { runDev } from '../../host/runner';
import { launchHeadlessEditor } from '../../scripts/headlessEditor';

import { furnaceIntegral, quantizeForGBuffer, shade } from './answer';
import { castRay, pixelRay, toWorldMesh } from './raycast';

import type { DirectionalLight, SurfaceParams, Vec3 } from './answer';
import type { CameraInfo, Hit, MeshInfo, WorldMesh } from './raycast';
import type { DevHandle } from '../../host/runner';
import type { HeadlessEditor } from '../../scripts/headlessEditor';
import type { Page } from '@playwright/test';

// 描画の正しさのテスト（npm run render-correctness）。答えとの比べ合いと、同じバックエンドの中での比べ合いを行う。
// バックエンドごとに dev サーバーと headless Chromium を立て、エディタは開かずに Engine だけを立てるハーネス（page/harness.ts）で
// テストシーン（demo-*/scenes/correctness-*.json）を描き、光の計算を終えた絵（lit）を float のまま読む。
// 答えは answer.ts（エンジンの式の書き写し）で、画素の面の位置・法線は raycast.ts で実際のメッシュから出す

const testDir = path.dirname( fileURLToPath( import.meta.url ) );
const rootDir = path.join( testDir, '../..' );

// 結果の置き場（gitignore 済み）。表を作るときに読む
const resultDir = path.join( rootDir, 'tmp/render-correctness' );

// 描く大きさ。forward-mix は orthographic（高さ 5.4）なので 1 単位が 50px になり、対にした物の距離 2.4 が 120px ちょうどになる
const WIDTH = 480;
const HEIGHT = 270;

// 1 シーンを描くコマ数。環境マップの積算は最初のコマで捨てて積み直すので、多くなくてよい
const FRAMES = 30;

// 画素を何個おきに見るか
const PIXEL_STEP = 2;

// 輪郭の近くは 1 画素のずれで別の物に当たるので、視線と法線のなす角が大きい所は見ない
const MIN_DOT_NV = 0.2;

/*-------------------------------
	許す幅

	差が |答え| × REL + ABS を超えた画素を外れとする
-------------------------------*/

// 直接光: 答えはエンジンと同じ式・同じ面なので、残るのは lit のバッファ（半精度。相対 0.05%）と GPU の float の丸めだけ
const DIRECT_TOLERANCE = { rel: 0.01, abs: 0.001 };

// 白い炉の、エンジンの環境光の式（envLighting に一様な 1 を入れた値）との比べ合い。
// 一様な環境ではぼかした環境マップも 1 になるので、残るのは環境マップ（半精度）とミップの補間の丸めだけ
const FURNACE_ENV_TOLERANCE = { rel: 0.01, abs: 0.002 };

// 白い炉の、BRDF を半球で積分した答えとの比べ合い。
// エンジンの環境光は積分ではなく近似（鏡面に置き換わる割合 EF を fresnel(N·V) で決め、拡散・鏡面をその割合で混ぜる）なので、
// 非金属でも答えとずれる。実測（2026-11）のずれは最大 6.6%（粗さ 0.2・N·V 0.2 付近で答えが 1.066、エンジンは 1.0）なので、
// それを少し超える幅にする。近似を変えたら測り直す
const FURNACE_INTEGRAL_TOLERANCE = { rel: 0.1, abs: 0.01 };

// 同じバックエンドの中の比べ合い（deferred と forward の同じ材質）。
// deferred は面の値を 8bit の gBuffer に入れるが、テストシーンの色・粗さは 8bit でちょうど表せる値にしてあるので丸めは無い
const PAIR_TOLERANCE = { rel: 0.01, abs: 0.001 };

// 結果の表に出す行の数（1 物あたり）
const REPORT_POINTS_PER_MESH = 2;

// 積分の格子（片側の数）。粗さ 0.2〜1・N·V 0.21〜0.95 で、64 と 512 の答えが 0.01% 以内に一致することを確かめた値
const FURNACE_GRID = 64;

// 白い炉で画素を何個おきに見るか。画素ごとに積分するので、直接光より間引く
const FURNACE_PIXEL_STEP = 4;

type Backend = {
	name: 'webgl' | 'webgpu';
	projectDir: string;
	// ユーザーの dev サーバー（3000 番台）・scene-shots（3300 / 3310）から離した番号。使用中なら後ろの空き番号へずれる
	port: number;
};

const BACKENDS: Backend[] = [
	{ name: 'webgl', projectDir: path.join( rootDir, 'demo-webgl' ), port: 3320 },
	{ name: 'webgpu', projectDir: path.join( rootDir, 'demo-webgpu' ), port: 3330 },
];

/*-------------------------------
	Scene
-------------------------------*/

type SceneProps = {
	color?: number[];
	roughness?: number;
	metallic?: number;
	pass?: string;
	opacity?: number;
};

type SceneEntity = {
	name: string;
	components?: { name: string, props: SceneProps }[];
	childs?: SceneEntity[];
};

type SceneFile = {
	scene: SceneEntity;
};

const readScene = ( backend: Backend, name: string ) => JSON.parse( fs.readFileSync( path.join( backend.projectDir, 'scenes', `${name}.json` ), 'utf-8' ) ) as SceneFile;

// シーンの Shape の props を名前で引く。省略された値は Shape の既定値（demo の Shape/index.ts）
const shapeSurfaces = ( scene: SceneFile ) => {

	const surfaces = new Map<string, { surface: SurfaceParams, pass: string, opacity: number }>();

	const visit = ( entity: SceneEntity ) => {

		for ( const component of entity.components ?? [] ) {

			if ( component.name !== 'Shape' ) continue;

			const props = component.props;
			const color = props.color ?? [ 0.8, 0.8, 0.8 ];

			surfaces.set( entity.name, {
				surface: {
					albedo: [ color[ 0 ], color[ 1 ], color[ 2 ] ],
					roughness: props.roughness ?? 0.5,
					metallic: props.metallic ?? 0,
					envIntensity: 1,
				},
				pass: props.pass ?? 'deferred',
				opacity: props.opacity ?? 1,
			} );

		}

		for ( const child of entity.childs ?? [] ) {

			visit( child );

		}

	};

	visit( scene.scene );

	return surfaces;

};

/*-------------------------------
	Harness
-------------------------------*/

type SceneDescription = {
	camera: CameraInfo;
	lights: { name: string, direction: number[], color: number[] }[];
	meshes: MeshInfo[];
};

// ハーネスはページの window に置き、テストごとに呼ぶ
const loadHarness = async ( page: Page, devServerUrl: string ) => {

	const blankUrl = new URL( `/@fs${path.join( testDir, 'page/blank.html' )}`, devServerUrl ).toString();
	const harnessUrl = `/@fs${path.join( testDir, 'page/harness.ts' )}`;

	await page.goto( blankUrl );
	await page.evaluate( async ( url ) => {

		// エンジンの .tsx（MaterialOverride など）は @vitejs/plugin-react の変換を通り、ページに React Refresh の前置きが無いと読み込めない。
		// vite は index.html を返すときにこれを差し込むが、素のページには入らないので同じことをする
		const refresh = await import( /* @vite-ignore */ '/@react-refresh' );
		const target = window as unknown as Record<string, unknown>;

		refresh.default.injectIntoGlobalHook( window );
		target.$RefreshReg$ = () => {};

		target.$RefreshSig$ = () => ( type: unknown ) => type;
		target.__vite_plugin_react_preamble_installed__ = true;

		target.harness = await import( /* @vite-ignore */ url );

	}, harnessUrl );

};

type HarnessWindow = {
	harness: {
		setupScene: ( data: unknown, width: number, height: number ) => Promise<void>;
		renderFrames: ( hidden: string[], frames: number ) => Promise<void>;
		setPipelineOverride: ( config: Record<string, boolean> | null ) => void;
		describeScene: () => SceneDescription;
		readLitPixels: ( points: [ number, number ][] ) => Promise<number[][]>;
	};
};

const setupScene = ( page: Page, data: SceneFile ) => page.evaluate( ( [ sceneData, width, height ] ) => ( window as unknown as HarnessWindow ).harness.setupScene( sceneData, width, height ), [ data, WIDTH, HEIGHT ] as const );

const renderFrames = ( page: Page, hidden: string[] ) => page.evaluate( ( [ names, frames ] ) => ( window as unknown as HarnessWindow ).harness.renderFrames( names, frames ), [ hidden, FRAMES ] as const );

const setPipelineOverride = ( page: Page, config: Record<string, boolean> | null ) => page.evaluate( ( c ) => ( window as unknown as HarnessWindow ).harness.setPipelineOverride( c ), config );

const describeScene = ( page: Page ) => page.evaluate( () => ( window as unknown as HarnessWindow ).harness.describeScene() );

const readLitPixels = ( page: Page, points: [ number, number ][] ) => page.evaluate( ( p ) => ( window as unknown as HarnessWindow ).harness.readLitPixels( p ), points );

/*-------------------------------
	Pixels
-------------------------------*/

type PixelHit = {
	x: number;
	y: number;
	hit: Hit;
};

// 画素の中心から光線を飛ばし、当たった面を集める。輪郭の近く（N·V が小さい）は外す
const castPixels = ( camera: CameraInfo, meshes: WorldMesh[], step: number = PIXEL_STEP ) => {

	const pixels: PixelHit[] = [];

	for ( let y = 0; y < HEIGHT; y += step ) {

		for ( let x = 0; x < WIDTH; x += step ) {

			const hit = castRay( pixelRay( camera, x, y, WIDTH, HEIGHT ), meshes );

			if ( ! hit ) continue;

			let dNV = 0;

			for ( let i = 0; i < 3; i ++ ) {

				dNV += hit.normal[ i ] * hit.viewDir[ i ];

			}

			if ( dNV < MIN_DOT_NV ) continue;

			pixels.push( { x, y, hit } );

		}

	}

	return pixels;

};

// readLitPixels に渡す画素の座標
const pixelPoints = ( pixels: PixelHit[] ) => {

	const points: [ number, number ][] = [];

	for ( const pixel of pixels ) {

		points.push( [ pixel.x, pixel.y ] );

	}

	return points;

};

const toLights = ( description: SceneDescription ): DirectionalLight[] => {

	const lights: DirectionalLight[] = [];

	for ( const light of description.lights ) {

		lights.push( {
			direction: [ light.direction[ 0 ], light.direction[ 1 ], light.direction[ 2 ] ],
			color: [ light.color[ 0 ], light.color[ 1 ], light.color[ 2 ] ],
		} );

	}

	return lights;

};

const toWorldMeshes = ( description: SceneDescription ) => {

	const meshes: WorldMesh[] = [];

	for ( const mesh of description.meshes ) {

		meshes.push( toWorldMesh( mesh ) );

	}

	return meshes;

};

/*-------------------------------
	Compare
-------------------------------*/

type Tolerance = { rel: number, abs: number };

type Comparison = {
	mesh: string;
	x: number;
	y: number;
	expected: Vec3;
	actual: Vec3;
	// 外れの大きさ（差 ÷ 許す幅）。1 を超えたら外れ
	ratio: number;
};

const compareValue = ( expected: Vec3, actual: number[], tolerance: Tolerance ) => {

	let ratio = 0;

	for ( let i = 0; i < 3; i ++ ) {

		const allowed = Math.abs( expected[ i ] ) * tolerance.rel + tolerance.abs;
		const diff = Math.abs( actual[ i ] - expected[ i ] );

		ratio = Math.max( ratio, diff / allowed );

	}

	return ratio;

};

type Summary = {
	mesh: string;
	count: number;
	failed: number;
	worst: Comparison | null;
	// 表に出す画素（いちばん明るい画素と、物の中心にいちばん近い画素）
	samples: Comparison[];
};

// 物ごとに、外れの数・いちばん外れた画素・表に出す画素をまとめる
const summarize = ( comparisons: Comparison[], description: SceneDescription ) => {

	const byMesh = new Map<string, Comparison[]>();

	for ( const comparison of comparisons ) {

		let list = byMesh.get( comparison.mesh );

		if ( ! list ) {

			list = [];
			byMesh.set( comparison.mesh, list );

		}

		list.push( comparison );

	}

	const summaries: Summary[] = [];

	for ( const [ mesh, list ] of byMesh ) {

		let failed = 0;
		let worst: Comparison | null = null;
		let brightest: Comparison | null = null;

		for ( const comparison of list ) {

			if ( comparison.ratio > 1 ) failed ++;

			if ( ! worst || comparison.ratio > worst.ratio ) worst = comparison;

			if ( ! brightest || comparison.expected[ 0 ] > brightest.expected[ 0 ] ) brightest = comparison;

		}

		// 物の中心は、画面上で当たった画素の平均の位置
		let cx = 0;
		let cy = 0;

		for ( const comparison of list ) {

			cx += comparison.x / list.length;
			cy += comparison.y / list.length;

		}

		let center: Comparison | null = null;
		let centerDistance = Infinity;

		for ( const comparison of list ) {

			const d = ( comparison.x - cx ) ** 2 + ( comparison.y - cy ) ** 2;

			if ( d < centerDistance ) {

				centerDistance = d;
				center = comparison;

			}

		}

		const samples: Comparison[] = [];

		if ( brightest ) samples.push( brightest );
		if ( center && center !== brightest && samples.length < REPORT_POINTS_PER_MESH ) samples.push( center );

		summaries.push( { mesh, count: list.length, failed, worst, samples } );

	}

	// メッシュの並びはシーンの順
	const order: string[] = [];

	for ( const mesh of description.meshes ) {

		order.push( mesh.name );

	}

	summaries.sort( ( a, b ) => order.indexOf( a.mesh ) - order.indexOf( b.mesh ) );

	return summaries;

};

const writeResult = ( backend: Backend, name: string, result: unknown ) => {

	fs.mkdirSync( resultDir, { recursive: true } );
	fs.writeFileSync( path.join( resultDir, `${backend.name}-${name}.json` ), JSON.stringify( result, null, '\t' ) );

};

const formatVec = ( v: Vec3 ) => `${v[ 0 ].toFixed( 4 )},${v[ 1 ].toFixed( 4 )},${v[ 2 ].toFixed( 4 )}`;

const failureMessage = ( summaries: Summary[] ) => {

	const lines: string[] = [];

	for ( const summary of summaries ) {

		if ( summary.failed === 0 || ! summary.worst ) continue;

		const worst = summary.worst;

		lines.push( `${summary.mesh}: ${summary.failed}/${summary.count} 画素が外れ（最大 ${worst.ratio.toFixed( 2 )} 倍。(${worst.x}, ${worst.y}) 答え ${formatVec( worst.expected )} / 実際 ${formatVec( worst.actual )}）` );

	}

	return lines.join( '\n' );

};

const countFailed = ( summaries: Summary[] ) => {

	let failed = 0;

	for ( const summary of summaries ) {

		failed += summary.failed;

	}

	return failed;

};

// 白い炉の環境マップ。全方向・どの粗さでも 1
const whiteEnv = (): Vec3 => [ 1, 1, 1 ];

// 黒い空の環境マップ
const blackEnv = (): Vec3 => [ 0, 0, 0 ];

/*-------------------------------
	Tests
-------------------------------*/

for ( const backend of BACKENDS ) {

	test.describe( backend.name, () => {

		let devServer: DevHandle | null = null;
		let editor: HeadlessEditor | null = null;

		test.beforeAll( async () => {

			devServer = await runDev( {
				projectDir: backend.projectDir,
				renderer: backend.name,
				port: backend.port,
				apiPort: backend.port + 1,
				cacheDir: path.join( rootDir, 'node_modules/.vite-render-correctness', backend.name ),
				writeDevServerInfo: false,
			} );

			const url = devServer.vite.resolvedUrls?.local[ 0 ];

			if ( ! url ) throw new Error( `${backend.name} の dev サーバーの URL が分かりません` );

			editor = await launchHeadlessEditor();
			await loadHarness( editor.page, url );

		} );

		// 途中で失敗していても、立ち上がったものはすべて止める
		test.afterAll( async () => {

			if ( editor ) await editor.close();
			if ( devServer ) await devServer.close();

		} );

		const page = () => {

			if ( ! editor ) throw new Error( `${backend.name} のブラウザが立っていません` );

			return editor.page;

		};

		/*-------------------------------
			答えとの比べ合い
		-------------------------------*/

		// 平行光 1 本・黒い空。非金属と金属の球（粗さ 0.2〜1.0）
		test( 'pbr-direct: 平行光の答えと一致する', async () => {

			const scene = readScene( backend, 'correctness-pbr-direct' );
			const surfaces = shapeSurfaces( scene );

			await setupScene( page(), scene );
			await renderFrames( page(), [] );

			const description = await describeScene( page() );
			const lights = toLights( description );
			const pixels = castPixels( description.camera, toWorldMeshes( description ) );
			const values = await readLitPixels( page(), pixelPoints( pixels ) );

			const comparisons: Comparison[] = [];

			for ( let i = 0; i < pixels.length; i ++ ) {

				const pixel = pixels[ i ];
				const shape = surfaces.get( pixel.hit.mesh );

				if ( ! shape ) continue;

				const expected = shade( pixel.hit, quantizeForGBuffer( shape.surface ), lights, blackEnv );
				const actual = values[ i ];

				comparisons.push( { mesh: pixel.hit.mesh, x: pixel.x, y: pixel.y, expected, actual: [ actual[ 0 ], actual[ 1 ], actual[ 2 ] ], ratio: compareValue( expected, actual, DIRECT_TOLERANCE ) } );

			}

			const summaries = summarize( comparisons, description );

			writeResult( backend, 'pbr-direct', summaries );

			expect( comparisons.length ).toBeGreaterThan( 0 );
			expect( countFailed( summaries ), failureMessage( summaries ) ).toBe( 0 );

		} );

		// 一様な白い環境だけで照らした球（white furnace）を描き、画素ごとに「エンジンの環境光の式の値」「BRDF を積分した答え」と比べる
		const runFurnace = async () => {

			const scene = readScene( backend, 'correctness-pbr-furnace' );
			const surfaces = shapeSurfaces( scene );

			await setupScene( page(), scene );
			await renderFrames( page(), [] );

			const description = await describeScene( page() );
			const pixels = castPixels( description.camera, toWorldMeshes( description ), FURNACE_PIXEL_STEP );
			const values = await readLitPixels( page(), pixelPoints( pixels ) );

			const env: Comparison[] = [];
			const dielectric: Comparison[] = [];
			const metal: Comparison[] = [];

			for ( let i = 0; i < pixels.length; i ++ ) {

				const pixel = pixels[ i ];
				const shape = surfaces.get( pixel.hit.mesh );

				if ( ! shape ) continue;

				const surface = quantizeForGBuffer( shape.surface );
				const actual: Vec3 = [ values[ i ][ 0 ], values[ i ][ 1 ], values[ i ][ 2 ] ];

				const envExpected = shade( pixel.hit, surface, [], whiteEnv );
				const integralExpected = furnaceIntegral( pixel.hit, surface, FURNACE_GRID );

				env.push( { mesh: pixel.hit.mesh, x: pixel.x, y: pixel.y, expected: envExpected, actual, ratio: compareValue( envExpected, actual, FURNACE_ENV_TOLERANCE ) } );

				const integral: Comparison = { mesh: pixel.hit.mesh, x: pixel.x, y: pixel.y, expected: integralExpected, actual, ratio: compareValue( integralExpected, actual, FURNACE_INTEGRAL_TOLERANCE ) };

				if ( surface.metallic > 0 ) {

					metal.push( integral );

				} else {

					dielectric.push( integral );

				}

			}

			return {
				env: summarize( env, description ),
				dielectric: summarize( dielectric, description ),
				metal: summarize( metal, description ),
			};

		};

		// 非金属: 積分した答えと、エンジンの環境光の式の両方に合う
		test( 'pbr-furnace: 白い環境の答えと一致する（非金属・環境光の式）', async () => {

			const result = await runFurnace();

			writeResult( backend, 'pbr-furnace', result );

			expect( result.dielectric.length ).toBeGreaterThan( 0 );
			expect( countFailed( result.dielectric ), `積分した答え\n${failureMessage( result.dielectric )}` ).toBe( 0 );
			expect( countFailed( result.env ), `環境光の式\n${failureMessage( result.env )}` ).toBe( 0 );

		} );

		// 金属: 1 灯ぶんの反射の式は fresnel の f0 が 0.04 のまま specularColor（= albedo）を掛けるので、白い金属でも直接光は約 4% しか返さない。
		// 一方で環境光の式は金属の EF を 1 にするので、白い炉では 1 になる。同じ物の直接光と環境光で 25 倍ほど食い違う。
		// どちらに寄せるかは判断待ちなので、今は「落ちることが分かっているテスト」にしておく（式を直して通るようになったら test.fail を外す）
		test( '既知の食い違い: 金属の直接光の式と環境光の式が合わない（白い炉・金属）', async () => {

			test.fail( true, '金属の直接光の f0 が 0.04 固定。判断待ち' );

			const result = await runFurnace();

			expect( result.metal.length ).toBeGreaterThan( 0 );
			expect( countFailed( result.metal ), `積分した答え\n${failureMessage( result.metal )}` ).toBe( 0 );

		} );

		/*-------------------------------
			同じバックエンドの中の比べ合い（forward と deferred）
		-------------------------------*/

		test.describe( 'forward-mix', () => {

			let scene: SceneFile;
			let description: SceneDescription;
			let meshes: WorldMesh[];

			test.beforeAll( async () => {

				scene = readScene( backend, 'correctness-forward-mix' );

				await setupScene( page(), scene );

				// ワールド行列は描くときの update で決まるので、1 度描いてからメッシュを読む
				await renderFrames( page(), [] );

				description = await describeScene( page() );
				meshes = toWorldMeshes( description );

			} );

			// orthographic・平行光なので、同じ材質の球を横にずらして置けば、同じだけずらした画素は同じ向き・同じ視線の面になる
			test( '同じ材質の deferred と forward の面の値が一致する', async () => {

				await renderFrames( page(), [] );

				// 対の球の距離 2.4 × 1 単位 50px
				const offset = 2.4 * HEIGHT / 5.4;
				const pairs = [[ 'PairDeferred', 'PairForward' ], [ 'PairMetalDeferred', 'PairMetalForward' ]];

				const points: [ number, number ][] = [];
				const meta: { mesh: string, x: number, y: number }[] = [];

				for ( const pixel of castPixels( description.camera, meshes ) ) {

					for ( const [ deferredName, forwardName ] of pairs ) {

						if ( pixel.hit.mesh !== deferredName ) continue;

						const partnerX = pixel.x + offset;
						const partner = castRay( pixelRay( description.camera, partnerX, pixel.y, WIDTH, HEIGHT ), meshes );

						if ( ! partner || partner.mesh !== forwardName ) continue;

						points.push( [ pixel.x, pixel.y ], [ partnerX, pixel.y ] );
						meta.push( { mesh: forwardName, x: partnerX, y: pixel.y } );

					}

				}

				const values = await readLitPixels( page(), points );
				const comparisons: Comparison[] = [];

				for ( let i = 0; i < meta.length; i ++ ) {

					const deferred = values[ i * 2 ];
					const forward = values[ i * 2 + 1 ];
					const expected: Vec3 = [ deferred[ 0 ], deferred[ 1 ], deferred[ 2 ] ];

					comparisons.push( { ...meta[ i ], expected, actual: [ forward[ 0 ], forward[ 1 ], forward[ 2 ] ], ratio: compareValue( expected, forward, PAIR_TOLERANCE ) } );

				}

				const summaries = summarize( comparisons, description );

				writeResult( backend, 'forward-mix-pair', summaries );

				expect( comparisons.length ).toBeGreaterThan( 0 );
				expect( countFailed( summaries ), failureMessage( summaries ) ).toBe( 0 );

			} );

			// 赤い deferred の球と青い forward の球を交差させ、手前の物の色が出ているかを見る
			test( 'deferred と forward を交差させたとき手前の物が描かれる', async () => {

				await renderFrames( page(), [] );

				// 2 つの面の奥行きの差がこれより小さい画素は、深度の丸めでどちらが出てもよいので見ない
				const DEPTH_MARGIN = 0.02;
				const crossMeshes: WorldMesh[] = [];

				for ( const mesh of meshes ) {

					if ( mesh.name === 'CrossDeferred' || mesh.name === 'CrossForward' ) crossMeshes.push( mesh );

				}

				const points: [ number, number ][] = [];
				const expectedNames: string[] = [];

				for ( const pixel of castPixels( description.camera, crossMeshes ) ) {

					const ray = pixelRay( description.camera, pixel.x, pixel.y, WIDTH, HEIGHT );
					const others: WorldMesh[] = [];

					for ( const mesh of crossMeshes ) {

						if ( mesh.name !== pixel.hit.mesh ) others.push( mesh );

					}

					const other = castRay( ray, others );

					if ( other && Math.abs( other.distance - pixel.hit.distance ) < DEPTH_MARGIN ) continue;

					points.push( [ pixel.x, pixel.y ] );
					expectedNames.push( pixel.hit.mesh );

				}

				const values = await readLitPixels( page(), points );
				const wrong: string[] = [];

				for ( let i = 0; i < points.length; i ++ ) {

					// CrossDeferred は赤、CrossForward は青の albedo
					const value = values[ i ];
					let drawn = 'CrossForward';

					if ( value[ 0 ] > value[ 2 ] ) drawn = 'CrossDeferred';

					if ( drawn !== expectedNames[ i ] ) {

						wrong.push( `(${points[ i ][ 0 ]}, ${points[ i ][ 1 ]}) 手前は ${expectedNames[ i ]} だが ${drawn} の色` );

					}

				}

				writeResult( backend, 'forward-mix-depth', { count: points.length, wrong } );

				expect( points.length ).toBeGreaterThan( 0 );
				expect( wrong.length, wrong.slice( 0, 10 ).join( '\n' ) ).toBe( 0 );

			} );

			// 半透明（opacity 0.5）の球の後ろに deferred の板を置く。背後の分だけが (1 - opacity) の割合で混ざっているか。
			// 4 通りに描いて、半透明の球そのものの色（答えを持たない）を打ち消して比べる:
			//   (全部) − (板なし) = (1 − opacity) × ( (球なし) − (球も板もなし) )
			test( '半透明の後ろの deferred の物が混ざる', async () => {

				const transparent = shapeSurfaces( scene ).get( 'Transparent' )!;
				const keep = 1 - transparent.opacity;

				const points: [ number, number ][] = [];

				for ( const pixel of castPixels( description.camera, meshes ) ) {

					if ( pixel.hit.mesh === 'Transparent' ) points.push( [ pixel.x, pixel.y ] );

				}

				await renderFrames( page(), [] );
				const all = await readLitPixels( page(), points );

				await renderFrames( page(), [ 'Backdrop' ] );
				const noBackdrop = await readLitPixels( page(), points );

				await renderFrames( page(), [ 'Transparent', 'Refraction' ] );
				const noSphere = await readLitPixels( page(), points );

				await renderFrames( page(), [ 'Backdrop', 'Transparent', 'Refraction' ] );
				const neither = await readLitPixels( page(), points );

				const comparisons: Comparison[] = [];

				for ( let i = 0; i < points.length; i ++ ) {

					const expected: Vec3 = [ 0, 0, 0 ];
					const actual: Vec3 = [ 0, 0, 0 ];

					for ( let c = 0; c < 3; c ++ ) {

						expected[ c ] = keep * ( noSphere[ i ][ c ] - neither[ i ][ c ] );
						actual[ c ] = all[ i ][ c ] - noBackdrop[ i ][ c ];

					}

					comparisons.push( { mesh: 'Transparent', x: points[ i ][ 0 ], y: points[ i ][ 1 ], expected, actual, ratio: compareValue( expected, actual, PAIR_TOLERANCE ) } );

				}

				const summaries = summarize( comparisons, description );

				writeResult( backend, 'forward-mix-transparent', summaries );

				expect( comparisons.length ).toBeGreaterThan( 0 );
				expect( countFailed( summaries ), failureMessage( summaries ) ).toBe( 0 );

			} );

			// 屈折（opacity 1）の球は背後を少しずらして読み、color を掛けて出す。背後は板の正面（orthographic・平行光なので一様な色）で、
			// ずらしても板の中に収まるよう置いてあるので、球の画素は「球の無いときの板の値 × color」になる
			test( '屈折の後ろの deferred の物が映る', async () => {

				const refraction = shapeSurfaces( scene ).get( 'Refraction' )!;
				const color = refraction.surface.albedo;

				const points: [ number, number ][] = [];

				for ( const pixel of castPixels( description.camera, meshes ) ) {

					if ( pixel.hit.mesh === 'Refraction' ) points.push( [ pixel.x, pixel.y ] );

				}

				await renderFrames( page(), [] );
				const all = await readLitPixels( page(), points );

				await renderFrames( page(), [ 'Transparent', 'Refraction' ] );
				const behind = await readLitPixels( page(), points );

				const comparisons: Comparison[] = [];

				for ( let i = 0; i < points.length; i ++ ) {

					const expected: Vec3 = [ behind[ i ][ 0 ] * color[ 0 ], behind[ i ][ 1 ] * color[ 1 ], behind[ i ][ 2 ] * color[ 2 ] ];

					comparisons.push( { mesh: 'Refraction', x: points[ i ][ 0 ], y: points[ i ][ 1 ], expected, actual: [ all[ i ][ 0 ], all[ i ][ 1 ], all[ i ][ 2 ] ], ratio: compareValue( expected, all[ i ], PAIR_TOLERANCE ) } );

				}

				const summaries = summarize( comparisons, description );

				writeResult( backend, 'forward-mix-refraction', summaries );

				expect( comparisons.length ).toBeGreaterThan( 0 );
				expect( countFailed( summaries ), failureMessage( summaries ) ).toBe( 0 );

			} );

			// SSAO・SSR を forward の面に掛けるかは、まだ決まっていない（描画の正しさを整える計画の「本人の判断が要ること」）。
			// 今の作りでは、forward の物は gBuffer の段で位置・法線を先に書くので deferred の面の SSAO・SSR には効くが、
			// forward の面そのものには SSAO も SSR も掛からない。合否は付けず、今の振る舞いを数で記録するだけにする
			test( '未決: SSAO・SSR を forward の面に掛けるか（今の振る舞いを SSAO で記録するだけ）', async () => {

				test.info().annotations.push( { type: '未決', description: 'SSAO・SSR が forward の面を扱わない今の作りを仕様にするかは判断待ち。合否は付けない' } );

				const crossMeshes: WorldMesh[] = [];

				for ( const mesh of meshes ) {

					if ( mesh.name === 'CrossDeferred' || mesh.name === 'CrossForward' ) crossMeshes.push( mesh );

				}

				const points: [ number, number ][] = [];
				const names: string[] = [];

				for ( const pixel of castPixels( description.camera, crossMeshes ) ) {

					points.push( [ pixel.x, pixel.y ] );
					names.push( pixel.hit.mesh );

				}

				await setPipelineOverride( page(), null );
				await renderFrames( page(), [] );
				const off = await readLitPixels( page(), points );

				await setPipelineOverride( page(), { ssao: true } );
				await renderFrames( page(), [] );
				const ssao = await readLitPixels( page(), points );

				await setPipelineOverride( page(), null );

				// 交差の近くで SSAO がどれだけ暗くしたか（いちばん暗くなった画素の、SSAO ありの値 ÷ なしの値）
				const darkest = new Map<string, number>();

				for ( let i = 0; i < points.length; i ++ ) {

					const before = off[ i ][ 0 ] + off[ i ][ 1 ] + off[ i ][ 2 ];
					const after = ssao[ i ][ 0 ] + ssao[ i ][ 1 ] + ssao[ i ][ 2 ];

					if ( before <= 0 ) continue;

					const ratio = after / before;
					const current = darkest.get( names[ i ] ) ?? 1;

					darkest.set( names[ i ], Math.min( current, ratio ) );

				}

				const result = {
					ssaoDarkestRatio: Object.fromEntries( darkest ),
				};

				writeResult( backend, 'forward-mix-undecided', result );

				test.info().annotations.push( { type: '記録', description: `SSAO で最も暗くなった画素（あり ÷ なし）: ${JSON.stringify( result.ssaoDarkestRatio )}` } );

			} );

		} );

	} );

}
