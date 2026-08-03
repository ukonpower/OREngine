/*-------------------------------
	WebGPU 実現性スパイク: gBuffer 相当の 5 枚 MRT + 名前ベース uniform → UBO 反映層

	ページ自身が readback（copyTextureToBuffer → mapAsync）で自己検証し、
	#result に PASS / FAIL と実測値を出す。
-------------------------------*/

import { UniformBinder, UNIFORM_TYPE_TO_WGSL } from './uniform-binder.js';

const SIZE = 64;
const CENTER = SIZE / 2;

const resultEl = document.getElementById( 'result' );
let failures = 0;

/*-------------------------------
	出力ヘルパ
-------------------------------*/

function line( text ) {

	resultEl.textContent += text + '\n';
	console.log( text );

}

function log( name, pass, detail ) {

	if ( ! pass ) failures ++;
	line( `${pass ? 'PASS' : 'FAIL'}: ${name}${detail ? ` — ${detail}` : ''}` );

}

function note( text ) {

	line( `NOTE: ${text}` );

}

/*-------------------------------
	readback
-------------------------------*/

const BYTES_PER_PIXEL = { rgba32float: 16, rgba16float: 8, rgba8unorm: 4 };

function decodeHalf( h ) {

	const s = ( h & 0x8000 ) ? - 1 : 1;
	const e = ( h >> 10 ) & 0x1f;
	const f = h & 0x3ff;

	if ( e === 0 ) return s * Math.pow( 2, - 14 ) * ( f / 1024 );
	if ( e === 31 ) return f ? NaN : s * Infinity;
	return s * Math.pow( 2, e - 15 ) * ( 1 + f / 1024 );

}

// テクスチャ中心 1 ピクセルを GPU から読み戻す
async function readCenterPixel( device, texture, format ) {

	const bpp = BYTES_PER_PIXEL[ format ];
	const bytesPerRow = Math.ceil( SIZE * bpp / 256 ) * 256;

	const staging = device.createBuffer( {
		size: bytesPerRow * SIZE,
		usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
	} );

	const enc = device.createCommandEncoder();
	enc.copyTextureToBuffer(
		{ texture },
		{ buffer: staging, bytesPerRow, rowsPerImage: SIZE },
		{ width: SIZE, height: SIZE, depthOrArrayLayers: 1 },
	);
	device.queue.submit( [ enc.finish() ] );

	await staging.mapAsync( GPUMapMode.READ );
	const copy = staging.getMappedRange().slice( 0 );
	staging.unmap();
	staging.destroy();

	const dv = new DataView( copy );
	const base = CENTER * bytesPerRow + CENTER * bpp;
	const out = [];

	for ( let i = 0; i < 4; i ++ ) {

		if ( format === 'rgba32float' ) out.push( dv.getFloat32( base + i * 4, true ) );
		else if ( format === 'rgba16float' ) out.push( decodeHalf( dv.getUint16( base + i * 2, true ) ) );
		else out.push( dv.getUint8( base + i ) / 255 );

	}

	return out;

}

function near( actual, expected, tol ) {

	return Math.abs( actual - expected ) <= tol;

}

function compare( actual, expected, format ) {

	const tol = format === 'rgba8unorm'
		? 1 / 255 + 1e-6
		: expected.map( v => 1e-3 * Math.max( 1, Math.abs( v ) ) );

	return actual.every( ( v, i ) => near( v, expected[ i ], Array.isArray( tol ) ? tol[ i ] : tol ) );

}

const fmt = a => `[${a.map( v => Number( v.toFixed( 4 ) ) ).join( ', ' )}]`;

/*-------------------------------
	gBuffer 定義（OREngine の createRenderTarget() 対応）
-------------------------------*/

const GBUFFER = [
	{ role: 'position.xyz + emission.x', full: 'rgba32float', small: 'rgba16float', value: [ 1.5, - 2.5, 3.5, 0.25 ] },
	{ role: 'normal.xyz + emission.y', full: 'rgba32float', small: 'rgba16float', value: [ 0.0, 1.0, - 1.0, 2.5 ] },
	{ role: 'albedo', full: 'rgba8unorm', small: 'rgba8unorm', value: [ 0.25, 0.5, 0.75, 1.0 ] },
	{ role: 'roughness/metallic/ssn/env', full: 'rgba8unorm', small: 'rgba8unorm', value: [ 0.1, 0.9, 0.35, 0.0 ] },
	{ role: 'velocity.xy + emission.z', full: 'rgba32float', small: 'rgba16float', value: [ - 123.5, 456.25, 0.0, 7.75 ] },
];

const GBUFFER_BYTES_FULL = 16 * 3 + 4 * 2;

/*-------------------------------
	uniform レイアウト（WGSL 側の宣言と 1 対 1）
-------------------------------*/

const UNIFORM_LAYOUT = {
	fields: [
		{ name: 'uColor', type: 'vec3f' },
		{ name: 'uIntensity', type: 'f32' },
		{ name: 'directionalLight', array: 2, fields: [
			{ name: 'direction', type: 'vec3f' },
			{ name: 'color', type: 'vec3f' },
		] },
	],
};

// WGSL のアラインメント規則から手計算した期待オフセット
const EXPECTED_OFFSETS = {
	uColor: 0,
	uIntensity: 12,
	'directionalLight[0].direction': 16,
	'directionalLight[0].color': 32,
	'directionalLight[1].direction': 48,
	'directionalLight[1].color': 64,
};
const EXPECTED_UBO_SIZE = 80;

const uniformsFrameA = {
	uColor: { value: [ 1.0, 0.5, 0.25 ], type: '3fv' },
	uIntensity: { value: 2.0, type: '1f' },
	'directionalLight[0].direction': { value: [ 0.0, - 1.0, 0.0 ], type: '3fv' },
	'directionalLight[0].color': { value: [ 1.0, 0.9, 0.8 ], type: '3fv' },
	'directionalLight[1].direction': { value: [ 0.5, 0.0, - 0.5 ], type: '3fv' },
	'directionalLight[1].color': { value: [ 0.2, 0.4, 0.6 ], type: '3fv' },
};

const uniformsFrameB = {
	uColor: { value: [ - 3.0, 4.0, 0.0 ], type: '3fv' },
	uIntensity: { value: 0.25, type: '1f' },
	'directionalLight[0].direction': { value: [ 0.0, 7.5, 0.0 ], type: '3fv' },
	'directionalLight[0].color': { value: [ - 2.0, 0.0, 0.0 ], type: '3fv' },
	'directionalLight[1].direction': { value: [ 11.0, 0.0, 0.0 ], type: '3fv' },
	'directionalLight[1].color': { value: [ 0.0, 0.0, - 9.25 ], type: '3fv' },
	uNotDeclared: { value: 1.0, type: '1f' },
};

// pass2 の WGSL が uniform から組み立てる値。CPU 側の期待値計算と同じ式
function expectedFromUniforms( u ) {

	const v = k => u[ k ].value;
	return [
		v( 'uColor' )[ 0 ] + v( 'directionalLight[0].direction' )[ 1 ],
		v( 'uColor' )[ 1 ] * u.uIntensity.value,
		v( 'directionalLight[1].color' )[ 2 ],
		v( 'directionalLight[0].color' )[ 0 ] + v( 'directionalLight[1].direction' )[ 0 ],
	];

}

/*-------------------------------
	WGSL
-------------------------------*/

const VS = /* wgsl */`
@vertex fn vs( @builtin(vertex_index) i: u32 ) -> @builtin(position) vec4f {
	var p = array<vec2f, 3>( vec2f( -1.0, -3.0 ), vec2f( -1.0, 1.0 ), vec2f( 3.0, 1.0 ) );
	return vec4f( p[ i ], 0.0, 1.0 );
}
`;

const gbufferShader = () => /* wgsl */`
${VS}
struct FragOut {
	@location(0) c0: vec4f,
	@location(1) c1: vec4f,
	@location(2) c2: vec4f,
	@location(3) c3: vec4f,
	@location(4) c4: vec4f,
};
@fragment fn fs() -> FragOut {
	var o: FragOut;
${GBUFFER.map( ( g, i ) => `\to.c${i} = vec4f( ${g.value.map( v => v.toFixed( 5 ) ).join( ', ' )} );` ).join( '\n' )}
	return o;
}
`;

const shadingShader = () => /* wgsl */`
${VS}
struct DirectionalLight {
	direction: vec3f,
	color: vec3f,
};
struct Uniforms {
	uColor: vec3f,
	uIntensity: f32,
	directionalLight: array<DirectionalLight, 2>,
};
@group(0) @binding(0) var<uniform> u: Uniforms;
@group(1) @binding(0) var gTexture: texture_2d<f32>;
@group(1) @binding(1) var gSampler: sampler;

struct Out {
	@location(0) fromUniform: vec4f,
	@location(1) fromTexture: vec4f,
};
@fragment fn fs() -> Out {
	var o: Out;
	o.fromUniform = vec4f(
		u.uColor.x + u.directionalLight[ 0 ].direction.y,
		u.uColor.y * u.uIntensity,
		u.directionalLight[ 1 ].color.z,
		u.directionalLight[ 0 ].color.x + u.directionalLight[ 1 ].direction.x
	);
	o.fromTexture = textureSampleLevel( gTexture, gSampler, vec2f( 0.5, 0.5 ), 0.0 );
	return o;
}
`;

/*-------------------------------
	本体
-------------------------------*/

function createTarget( device, format, label ) {

	return device.createTexture( {
		label,
		size: [ SIZE, SIZE ],
		format,
		usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC | GPUTextureUsage.TEXTURE_BINDING,
	} );

}

async function main() {

	/*-------------------------------
		1. device 取得と limits の実測
	-------------------------------*/

	if ( ! navigator.gpu ) {

		log( 'no adapter', false, 'navigator.gpu が存在しない（WebGPU 非対応 or non-secure context）' );
		return;

	}

	const adapter = await navigator.gpu.requestAdapter();

	if ( ! adapter ) {

		log( 'no adapter', false, 'requestAdapter() が null を返した' );
		return;

	}

	const info = adapter.info || {};
	note( `adapter: vendor=${info.vendor || '?'} architecture=${info.architecture || '?'} device=${info.device || '?'} description=${info.description || '?'}` );

	const adapterMax = adapter.limits.maxColorAttachmentBytesPerSample;
	note( `adapter.limits.maxColorAttachmentBytesPerSample = ${adapterMax}（WebGPU default = 32 / OREngine gBuffer 実需 = ${GBUFFER_BYTES_FULL}）` );
	note( `adapter.limits.maxColorAttachments = ${adapter.limits.maxColorAttachments}` );

	const fullGBufferSupported = adapterMax >= GBUFFER_BYTES_FULL;
	const requiredLimits = fullGBufferSupported ? { maxColorAttachmentBytesPerSample: adapterMax } : {};

	const device = await adapter.requestDevice( { requiredLimits } );

	device.addEventListener( 'uncapturederror', e => {

		log( 'uncaptured GPU error', false, String( e.error.message ).replace( /\s+/g, ' ' ).slice( 0, 400 ) );

	} );

	log( 'device 取得', true, `requiredLimits.maxColorAttachmentBytesPerSample=${requiredLimits.maxColorAttachmentBytesPerSample ?? '(未指定 = default 32)'} / device 実効値=${device.limits.maxColorAttachmentBytesPerSample}` );

	const formatKey = fullGBufferSupported ? 'full' : 'small';

	if ( fullGBufferSupported ) {

		log( `gBuffer 実構成 ${GBUFFER_BYTES_FULL} bytes/sample`, true, 'rgba32float×3 + rgba8unorm×2 をそのまま使用' );

	} else {

		note( `設計制約の発見: adapter が ${GBUFFER_BYTES_FULL} bytes/sample を満たさない（上限 ${adapterMax}）。rgba32float×3 → rgba16float×3 の縮小構成（32 bytes/sample）で続行する` );
		log( `gBuffer 縮小構成へフォールバック`, true, `rgba16float×3 + rgba8unorm×2 = ${8 * 3 + 4 * 2} bytes/sample` );

	}

	const formats = GBUFFER.map( g => g[ formatKey ] );
	note( `gBuffer formats = ${formats.join( ', ' )}` );

	/*-------------------------------
		2. gBuffer 相当の 5 枚 MRT レンダーパス
	-------------------------------*/

	const targets = formats.map( ( f, i ) => createTarget( device, f, `gBuffer${i}` ) );
	const depth = device.createTexture( {
		label: 'gBufferDepth',
		size: [ SIZE, SIZE ],
		format: 'depth24plus',
		usage: GPUTextureUsage.RENDER_ATTACHMENT,
	} );

	const gbufferModule = device.createShaderModule( { code: gbufferShader() } );

	const gbufferPipeline = device.createRenderPipeline( {
		layout: 'auto',
		vertex: { module: gbufferModule, entryPoint: 'vs' },
		fragment: {
			module: gbufferModule,
			entryPoint: 'fs',
			// rgba32float は blend 不可なので blend は指定しない
			targets: formats.map( format => ( { format } ) ),
		},
		primitive: { topology: 'triangle-list' },
		depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' },
	} );

	{

		const enc = device.createCommandEncoder();
		const pass = enc.beginRenderPass( {
			colorAttachments: targets.map( t => ( {
				view: t.createView(),
				clearValue: { r: 0, g: 0, b: 0, a: 0 },
				loadOp: 'clear',
				storeOp: 'store',
			} ) ),
			depthStencilAttachment: {
				view: depth.createView(),
				depthClearValue: 1.0,
				depthLoadOp: 'clear',
				depthStoreOp: 'store',
			},
		} );
		pass.setPipeline( gbufferPipeline );
		pass.draw( 3 );
		pass.end();
		device.queue.submit( [ enc.finish() ] );

	}

	log( '5 枚 MRT レンダーパス（depth24plus 付き）', true, `${SIZE}x${SIZE}, colorAttachments=5, draw(3)` );

	/*-------------------------------
		3. readback による自己検証
	-------------------------------*/

	for ( let i = 0; i < GBUFFER.length; i ++ ) {

		const g = GBUFFER[ i ];
		const format = formats[ i ];
		const actual = await readCenterPixel( device, targets[ i ], format );
		const ok = compare( actual, g.value, format );

		log( `gBuffer[${i}] ${format} (${g.role})`, ok, `expected ${fmt( g.value )} actual ${fmt( actual )}` );

	}

	/*-------------------------------
		4. 名前ベース uniform 辞書 → UBO 反映層
	-------------------------------*/

	const binder = new UniformBinder( device, UNIFORM_LAYOUT, 'shadingUniforms' );

	{

		const offsets = binder.offsets;
		const bad = Object.entries( EXPECTED_OFFSETS ).filter( ( [ k, v ] ) => offsets[ k ] !== v );
		const sizeOk = binder.size === EXPECTED_UBO_SIZE;

		log( 'UBO レイアウト（vec3 パディング + struct 配列 stride）', bad.length === 0 && sizeOk,
			`size=${binder.size}(expected ${EXPECTED_UBO_SIZE}) ${Object.entries( offsets ).map( ( [ k, v ] ) => `${k}@${v}` ).join( ' ' )}${bad.length ? ` / mismatch: ${bad.map( ( [ k, v ] ) => `${k} expected ${v}` ).join( ', ' )}` : ''}` );

	}

	{

		// 辞書側の型宣言が WGSL 側の型と一致しているか
		const mismatch = [];
		for ( const key in uniformsFrameA ) {

			const entry = binder.entries.get( key );
			const wgsl = UNIFORM_TYPE_TO_WGSL[ uniformsFrameA[ key ].type ];
			if ( entry && wgsl !== entry.type ) mismatch.push( `${key}: dict=${wgsl} wgsl=${entry.type}` );

		}

		log( 'GLP.UniformType → WGSL 型の突き合わせ', mismatch.length === 0, mismatch.length ? mismatch.join( ', ' ) : '全キー一致' );

	}

	const uniformBindGroupLayout = device.createBindGroupLayout( {
		entries: [ { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } } ],
	} );

	// GLSL の combined sampler (sampler2D) は WebGPU では texture と sampler に分かれる
	const unfilterable = formats[ 0 ] === 'rgba32float';
	const textureBindGroupLayout = device.createBindGroupLayout( {
		entries: [
			{ binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: unfilterable ? 'unfilterable-float' : 'float' } },
			{ binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: { type: unfilterable ? 'non-filtering' : 'filtering' } },
		],
	} );

	const shadingModule = device.createShaderModule( { code: shadingShader() } );

	const shadingPipeline = device.createRenderPipeline( {
		layout: device.createPipelineLayout( { bindGroupLayouts: [ uniformBindGroupLayout, textureBindGroupLayout ] } ),
		vertex: { module: shadingModule, entryPoint: 'vs' },
		fragment: {
			module: shadingModule,
			entryPoint: 'fs',
			targets: [ { format: 'rgba32float' }, { format: 'rgba32float' } ],
		},
		primitive: { topology: 'triangle-list' },
	} );

	const uniformBindGroup = device.createBindGroup( {
		layout: uniformBindGroupLayout,
		entries: [ { binding: 0, resource: { buffer: binder.buffer } } ],
	} );

	const sampler = device.createSampler( { magFilter: 'nearest', minFilter: 'nearest' } );
	const textureBindGroup = device.createBindGroup( {
		layout: textureBindGroupLayout,
		entries: [
			{ binding: 0, resource: targets[ 0 ].createView() },
			{ binding: 1, resource: sampler },
		],
	} );

	const outUniform = createTarget( device, 'rgba32float', 'shadingUniformOut' );
	const outTexture = createTarget( device, 'rgba32float', 'shadingTextureOut' );

	const drawShading = () => {

		const enc = device.createCommandEncoder();
		const pass = enc.beginRenderPass( {
			colorAttachments: [ outUniform, outTexture ].map( t => ( {
				view: t.createView(),
				clearValue: { r: 0, g: 0, b: 0, a: 0 },
				loadOp: 'clear',
				storeOp: 'store',
			} ) ),
		} );
		pass.setPipeline( shadingPipeline );
		pass.setBindGroup( 0, uniformBindGroup );
		pass.setBindGroup( 1, textureBindGroup );
		pass.draw( 3 );
		pass.end();
		device.queue.submit( [ enc.finish() ] );

	};

	// フレーム1
	const unknownA = binder.update( uniformsFrameA );
	drawShading();
	const frameA = await readCenterPixel( device, outUniform, 'rgba32float' );
	const expectedA = expectedFromUniforms( uniformsFrameA );
	log( 'UniformBinder フレーム1', compare( frameA, expectedA, 'rgba32float' ), `expected ${fmt( expectedA )} actual ${fmt( frameA )}` );

	// フレーム2（同じ pipeline / bind group のまま辞書の値だけ差し替え）
	const unknownB = binder.update( uniformsFrameB );
	drawShading();
	const frameB = await readCenterPixel( device, outUniform, 'rgba32float' );
	const expectedB = expectedFromUniforms( uniformsFrameB );
	log( 'UniformBinder フレーム2（値の追従）', compare( frameB, expectedB, 'rgba32float' ), `expected ${fmt( expectedB )} actual ${fmt( frameB )}` );

	log( 'フレーム間で出力が変化した', ! compare( frameA, expectedB, 'rgba32float' ), `frame1 ${fmt( frameA )} → frame2 ${fmt( frameB )}` );

	log( 'レイアウト外キーの検出', unknownA.length === 0 && unknownB.length === 1 && unknownB[ 0 ] === 'uNotDeclared',
		`frame1 unknown=${JSON.stringify( unknownA )} frame2 unknown=${JSON.stringify( unknownB )}` );

	// texture + sampler 分離（gBuffer[0] を 2 パス目でサンプリング）
	const sampled = await readCenterPixel( device, outTexture, 'rgba32float' );
	log( `texture + sampler の bind group 分離（${formats[ 0 ]} を sampleType=${unfilterable ? 'unfilterable-float' : 'float'} でサンプル）`,
		compare( sampled, GBUFFER[ 0 ].value, formats[ 0 ] ),
		`expected ${fmt( GBUFFER[ 0 ].value )} actual ${fmt( sampled )}` );

}

try {

	await main();

} catch ( e ) {

	log( 'unexpected exception', false, String( e && e.stack || e ).replace( /\s+/g, ' ' ).slice( 0, 600 ) );

}

// uncapturederror は非同期に届くことがあるので 1 tick 待ってから総合判定を出す
await new Promise( r => setTimeout( r, 100 ) );

line( '' );
line( failures === 0 ? 'ALL PASS' : `HAS FAILURES (${failures})` );
