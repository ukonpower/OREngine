// プリプロセッサ畳み込み済みの GLSL(ES 3.00) を「naga が受理する Vulkan 方言 GLSL」へ機械変換する。
// 各 transform は spikes/glsl-to-wgsl/REPORT.md の前処理規則 R0〜R8 と 1:1 対応し、
// R9（クリップ空間変換）だけが本実装で追加した規則。
//
// 変換と同時に、サブタスク間の契約であるメタデータ（uniforms / textures / attributes）を組み立てる。
// naga の WGSL 出力を後からパースするのではなく、規則を適用している時点で全情報が揃うため

const OPAQUE_TYPE = /^(sampler|image|texture|atomic_uint)/;
const TEXTURE_BUILTINS = [ 'texture', 'textureLod', 'textureGrad', 'textureSize', 'texelFetch', 'textureProj', 'textureOffset' ];

// sampler 型名 → 契約上の dimension
const SAMPLER_DIMENSION = new Map( [
	[ 'sampler2D', '2d' ],
	[ 'samplerCube', 'cube' ],
] );

// GL のクリップ空間（z∈[-1,1] / Y 上向き）を WebGPU（z∈[0,1] / Y 下向き）へ合わせる
const CLIP_SPACE_FIX = 'gl_Position = vec4( gl_Position.x, - gl_Position.y, ( gl_Position.z + gl_Position.w ) * 0.5, gl_Position.w );';

/*-------------------------------
	ソース走査のユーティリティ
-------------------------------*/

// open の位置（開き括弧のインデックス）から対応する閉じ括弧の位置を返す
const matchBracket = ( code, open, openChar, closeChar ) => {

	let depth = 0;

	for ( let i = open; i < code.length; i ++ ) {

		if ( code[ i ] === openChar ) depth ++;
		else if ( code[ i ] === closeChar && -- depth === 0 ) return i;

	}

	return - 1;

};

const matchParen = ( code, open ) => matchBracket( code, open, '(', ')' );
const matchBrace = ( code, open ) => matchBracket( code, open, '{', '}' );

// 引数リスト本文をトップレベルのカンマで分割する
const splitArgs = ( body ) => {

	const args = [];
	let depth = 0;
	let start = 0;

	for ( let i = 0; i < body.length; i ++ ) {

		const c = body[ i ];

		if ( c === '(' || c === '[' ) depth ++;
		else if ( c === ')' || c === ']' ) depth --;
		else if ( c === ',' && depth === 0 ) {

			args.push( body.slice( start, i ) );
			start = i + 1;

		}

	}

	if ( body.trim() !== '' ) args.push( body.slice( start ) );

	return args;

};

// 名前 name の関数呼び出しをすべて走査し、引数配列を書き換える。rewriteArgs が null を返した呼び出しは素通しする
const rewriteCalls = ( code, name, rewriteArgs ) => {

	const pattern = new RegExp( `\\b${name}\\s*\\(`, 'g' );
	let result = '';
	let last = 0;
	let m;

	while ( ( m = pattern.exec( code ) ) !== null ) {

		const open = m.index + m[ 0 ].length - 1;
		const close = matchParen( code, open );

		if ( close < 0 ) continue;

		const args = rewriteArgs( splitArgs( code.slice( open + 1, close ) ) );

		if ( ! args ) continue;

		result += code.slice( last, m.index ) + `${name}( ${args.join( ', ' )} )`;
		last = close + 1;
		pattern.lastIndex = close + 1;

	}

	return result + code.slice( last );

};

// 関数定義 name の本体（波括弧の中身）だけに fn を適用して差し替える
const rewriteFunctionBody = ( code, name, fn ) => {

	const m = new RegExp( `\\b\\w+\\s+${name}\\s*\\(` ).exec( code );

	if ( ! m ) return code;

	const openBrace = code.indexOf( '{', matchParen( code, m.index + m[ 0 ].length - 1 ) );

	if ( openBrace < 0 ) return code;

	const closeBrace = matchBrace( code, openBrace );

	if ( closeBrace < 0 ) return code;

	return code.slice( 0, openBrace + 1 ) + fn( code.slice( openBrace + 1, closeBrace ) ) + code.slice( closeBrace );

};

/*-------------------------------
	R0: 宣言の正規化
-------------------------------*/

// トップレベルの文をひとつずつ改行で区切る。minify 済みソースは全体が数行に詰まっており、
// 以降の規則が使う行アンカー正規表現がそのままでは当たらない。
// 波括弧・丸括弧の深さを見るので、関数本体や仮引数リストの中は分断しない
const splitTopLevelStatements = ( code ) => {

	const statements = [];
	let brace = 0;
	let paren = 0;
	let start = 0;

	for ( let i = 0; i < code.length; i ++ ) {

		const c = code[ i ];

		if ( c === '(' ) paren ++;
		else if ( c === ')' ) paren --;
		else if ( c === '{' ) brace ++;
		else if ( c === '}' && -- brace === 0 ) {

			// struct 定義の末尾セミコロンは同じ文に含める
			let end = i + 1;

			while ( end < code.length && /\s/.test( code[ end ] ) ) end ++;

			if ( code[ end ] === ';' ) end ++;

			statements.push( code.slice( start, end ) );
			start = end;

		} else if ( c === ';' && brace === 0 && paren === 0 ) {

			statements.push( code.slice( start, i + 1 ) );
			start = i + 1;

		}

	}

	statements.push( code.slice( start ) );

	return statements.map( ( s ) => s.trim() ).filter( ( s ) => s !== '' ).join( '\n' );

};

// カンマ区切りの宣言子を1宣言ずつに開く（`uniform vec3 a, b;` → 2行）
const expandDeclarators = ( code ) => code
	.replace( /^[^\S\n]*uniform\s+(\w+)\s+([^;{]+);[^\S\n]*$/gm, ( raw, type, decls ) => {

		const list = splitArgs( decls );

		return list.length < 2 ? raw : list.map( ( d ) => `uniform ${type} ${d.trim()};` ).join( '\n' );

	} )
	.replace( /^[^\S\n]*(in|out)\s+(\w+)\s+([^;{)]+);[^\S\n]*$/gm, ( raw, dir, type, decls ) => {

		const list = splitArgs( decls );

		return list.length < 2 ? raw : list.map( ( d ) => `${dir} ${type} ${d.trim()};` ).join( '\n' );

	} );

const normalizeDeclarations = ( code ) => expandDeclarators( splitTopLevelStatements( code ) );

/*-------------------------------
	R2: プロファイル
-------------------------------*/

// naga の GLSL フロントエンドは ES プロファイルを受理しないので desktop 460 にする。
// precision 文と shader_minifier の verbatim マーカーもここで落とす
const rewriteVersion = ( code ) => code
	.replace( /^#version .*$/m, '#version 460' )
	.replace( /^[^\S\n]*precision\s+\w+\s+\w+\s*;[^\S\n]*$/gm, '' )
	.replace( /^[^\S\n]*\/\/[[\]][^\S\n]*$/gm, '' );

/*-------------------------------
	uniform 宣言の収集
-------------------------------*/

const UNIFORM_DECL = /^[^\S\n]*(?:layout\s*\([^)]*\)\s*)?uniform\s+(\w+)\s+(\w+)\s*(?:\[\s*(\d+)\s*\])?\s*;[^\S\n]*$/gm;

// トップレベルの uniform 宣言を宣言順に列挙する
const collectUniforms = ( code ) => [ ...code.matchAll( UNIFORM_DECL ) ].map( ( m ) => ( {
	raw: m[ 0 ],
	type: m[ 1 ],
	name: m[ 2 ],
	count: m[ 3 ] ? Number( m[ 3 ] ) : null,
	opaque: OPAQUE_TYPE.test( m[ 1 ] ),
} ) );

/*-------------------------------
	R3: sampler 配列の展開
-------------------------------*/

// sampler 配列を要素ごとの個別 uniform に展開する。WGSL のコア機能に texture 配列が無いため。
// 添字は ShaderParser のループ展開後にすべてリテラルになっている前提
const unrollSamplerArrays = ( code ) => {

	// 展開後の名前 → CPU 側 uniform 辞書のキー（`x_0` → `x[0]`）
	const sourceNames = new Map();

	for ( const u of collectUniforms( code ).filter( ( u ) => u.opaque && u.count !== null ) ) {

		const decls = Array.from( { length: u.count }, ( _, i ) => {

			sourceNames.set( `${u.name}_${i}`, `${u.name}[${i}]` );

			return `uniform ${u.type} ${u.name}_${i};`;

		} ).join( '\n' );

		code = code.replace( u.raw, `\n${decls}\n` );
		code = code.replace( new RegExp( `\\b${u.name}\\s*\\[\\s*(\\d+)\\s*\\]`, 'g' ), ( _, i ) => `${u.name}_${i}` );

	}

	return { code, sourceNames };

};

/*-------------------------------
	R4/R5/R6: combined sampler の分離
-------------------------------*/

// combined sampler を texture / sampler の2オブジェクトへ分離し、
// 使用箇所を samplerXX(tex, smp) のインライン構築へ書き換える
const splitSamplers = ( code, group, sourceNames ) => {

	const samplers = collectUniforms( code ).filter( ( u ) => u.opaque );
	const textures = [];

	// R4: 宣言を2オブジェクトへ分離する。WGSL に combined sampler が無く、
	// naga は SPIR-V の OpTypeSampledImage も受理しないため
	samplers.forEach( ( u, i ) => {

		const texBinding = 1 + i * 2;
		const smpBinding = 2 + i * 2;
		const texType = u.type.replace( /^sampler/, 'texture' );

		code = code.replace( u.raw, [
			'',
			`layout(set = ${group}, binding = ${texBinding}) uniform ${texType} ${u.name}_tex;`,
			`layout(set = ${group}, binding = ${smpBinding}) uniform sampler ${u.name}_smp;`,
			'',
		].join( '\n' ) );

		textures.push( {
			name: sourceNames.get( u.name ) ?? u.name,
			texBinding,
			smpBinding,
			dimension: SAMPLER_DIMENSION.get( u.type ) ?? '2d',
		} );

	} );

	// uniform 宣言として現れた名前だけを置換対象にする（ローカル変数との名前衝突による誤変換を防ぐ）
	const uniformSamplers = new Map( samplers.map( ( u ) => [ u.name, u.type ] ) );

	// R5: sampler を受け取る関数は (texture, sampler) の2引数に開く。
	// glslang は「sampler コンストラクタは使用箇所に現れなければならない」ため関数を跨げない
	const signature = /(\w+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
	const expanded = new Map();
	const paramSamplers = new Map();

	for ( const m of [ ...code.matchAll( signature ) ] ) {

		const params = splitArgs( m[ 3 ] );
		const positions = [];
		const locals = new Map();

		const rewritten = params.map( ( p, i ) => {

			const pm = p.match( /^\s*(?:in\s+)?(\w*sampler\w*)\s+(\w+)\s*$/ );

			if ( ! pm ) return p;

			positions.push( i );
			locals.set( pm[ 2 ], pm[ 1 ] );

			return ` ${pm[ 1 ].replace( /^sampler/, 'texture' )} ${pm[ 2 ]}_tex, sampler ${pm[ 2 ]}_smp`;

		} );

		if ( positions.length === 0 ) continue;

		expanded.set( m[ 2 ], positions );
		paramSamplers.set( m[ 2 ], locals );
		code = code.replace( m[ 0 ], `${m[ 1 ]} ${m[ 2 ]}(${rewritten.join( ',' )}) {` );

	}

	// R6: テクスチャ組み込み関数の第1引数をインライン構築へ置換する。
	// uniform 由来の名前はソース全体、仮引数由来の名前はその関数本体の中だけを対象にする。
	// rewriteCalls は書き換えた呼び出しの引数の中まで再走査しないため、
	// ネストした呼び出し（texture(A, texture(B, uv).xy)）に届くまで変化が無くなるまで回す
	const inlineConstruct = ( src, known ) => {

		for ( let pass = 0; pass < 8; pass ++ ) {

			const before = src;

			for ( const builtin of TEXTURE_BUILTINS ) {

				src = rewriteCalls( src, builtin, ( args ) => {

					const first = args[ 0 ]?.trim();
					const type = known.get( first );

					if ( ! type ) return null;

					return [ `${type}( ${first}_tex, ${first}_smp )`, ...args.slice( 1 ).map( ( a ) => a.trim() ) ];

				} );

			}

			if ( src === before ) break;

		}

		return src;

	};

	code = inlineConstruct( code, uniformSamplers );

	for ( const [ fn, locals ] of paramSamplers ) {

		code = rewriteFunctionBody( code, fn, ( body ) => inlineConstruct( body, locals ) );

	}

	// R5 の呼び出し側展開。sampler 名そのものが渡されている呼び出しだけを2引数へ複製する
	const samplerNames = new Set( [ ...uniformSamplers.keys(), ...[ ...paramSamplers.values() ].flatMap( ( m ) => [ ...m.keys() ] ) ] );

	for ( let pass = 0; pass < 8; pass ++ ) {

		const before = code;

		for ( const [ fn, positions ] of expanded ) {

			code = rewriteCalls( code, fn, ( args ) => {

				// 定義側は書き換え済みで引数が素の識別子にならないため自然に素通りする
				if ( ! positions.every( ( p ) => samplerNames.has( args[ p ]?.trim() ) ) ) return null;

				return args.flatMap( ( a, i ) => positions.includes( i ) ? [ `${a.trim()}_tex`, `${a.trim()}_smp` ] : [ a.trim() ] );

			} );

		}

		if ( code === before ) break;

	}

	return { code, textures };

};

/*-------------------------------
	R7: loose uniform のブロック化
-------------------------------*/

// uniform ブロックの配列は要素ストライドが16バイト必要（std140 の規則で、WGSL も同じ制約を持つ）。
// 4/8バイトの型はそのままだと naga のバリデーションを通らないため vec4 相当へ広げ、参照側に swizzle を足す
const UNIFORM_ARRAY_WIDEN = new Map( [
	[ 'float', { type: 'vec4', swizzle: '.x' } ],
	[ 'int', { type: 'ivec4', swizzle: '.x' } ],
	[ 'uint', { type: 'uvec4', swizzle: '.x' } ],
	[ 'vec2', { type: 'vec4', swizzle: '.xy' } ],
	[ 'ivec2', { type: 'ivec4', swizzle: '.xy' } ],
	[ 'uvec2', { type: 'uvec4', swizzle: '.xy' } ],
] );

const PARAMS_PLACEHOLDER = '/*ORENGINE_PARAMS*/';

// name[...] の添字アクセスを rewrite で書き換える
const rewriteIndexAccess = ( code, name, rewrite ) => {

	const pattern = new RegExp( `\\b${name}\\s*\\[`, 'g' );
	let result = '';
	let last = 0;
	let m;

	while ( ( m = pattern.exec( code ) ) !== null ) {

		const close = matchBracket( code, m.index + m[ 0 ].length - 1, '[', ']' );

		if ( close < 0 ) continue;

		result += code.slice( last, m.index ) + rewrite( code.slice( m.index, close + 1 ) );
		last = close + 1;
		pattern.lastIndex = close + 1;

	}

	return result + code.slice( last );

};

// uniform ブロックに置ける型へ直し、本文の参照を合わせて書き換える関数を返す。
// bool は WGSL の uniform アドレス空間に置けない（host-shareable でない）ため int で持ち、参照側で bool() に戻す
const hostShareable = ( u ) => {

	const array = u.count !== null;

	if ( u.type === 'bool' ) {

		return array
			? { type: 'ivec4', rewrite: ( code ) => rewriteIndexAccess( code, u.name, ( a ) => `bool( ${a}.x )` ) }
			: { type: 'int', rewrite: ( code ) => code.replace( new RegExp( `(?<!\\.)\\b${u.name}\\b`, 'g' ), `bool( ${u.name} )` ) };

	}

	const widen = array ? UNIFORM_ARRAY_WIDEN.get( u.type ) : undefined;

	if ( widen ) return { type: widen.type, rewrite: ( code ) => rewriteIndexAccess( code, u.name, ( a ) => a + widen.swizzle ) };

	return { type: u.type, rewrite: ( code ) => code };

};

// struct 定義を名前 → { 定義の原文, フィールド配列 } で集める
const collectStructs = ( code ) => {

	const structs = new Map();

	for ( const m of code.matchAll( /\bstruct\s+(\w+)\s*\{([^}]*)\}\s*;/g ) ) {

		const fields = [];

		for ( const decl of m[ 2 ].split( ';' ) ) {

			const fm = decl.match( /^\s*(\w+)\s+([\s\S]+)$/ );

			if ( ! fm ) continue;

			for ( const d of splitArgs( fm[ 2 ] ) ) {

				const dm = d.trim().match( /^(\w+)\s*(?:\[\s*(\d+)\s*\])?$/ );

				if ( ! dm ) continue;

				fields.push( dm[ 2 ] ? { name: dm[ 1 ], type: fm[ 1 ], count: Number( dm[ 2 ] ) } : { name: dm[ 1 ], type: fm[ 1 ] } );

			}

		}

		structs.set( m[ 1 ], { raw: m[ 0 ], fields } );

	}

	return structs;

};

// ブロック外の非 opaque uniform を std140 ブロックへまとめる。
// GLSL for Vulkan がブロック外宣言を禁止しているため。本文の参照はフィールド名でそのまま解決される
const wrapLooseUniforms = ( code, group ) => {

	const loose = collectUniforms( code ).filter( ( u ) => ! u.opaque );

	if ( loose.length === 0 ) return { code, uniforms: { binding: null, structs: {}, fields: [] } };

	// メタデータは元の GLSL 型のまま返す。std140 のストライド規則の下で widen 後のレイアウトと一致する
	const fields = loose.map( ( u ) => u.count === null ? { name: u.name, type: u.type } : { name: u.name, type: u.type, count: u.count } );

	// Params が参照する struct を依存順（参照先が先）に集める
	const defined = collectStructs( code );
	const structs = {};
	const referenced = [];

	const visit = ( type ) => {

		if ( structs[ type ] || ! defined.has( type ) ) return;

		structs[ type ] = defined.get( type ).fields;

		for ( const f of structs[ type ] ) visit( f.type );

		referenced.push( type );

	};

	for ( const f of fields ) visit( f.type );

	code = code.replace( loose[ 0 ].raw, `\n${PARAMS_PLACEHOLDER}\n` );

	for ( const u of loose.slice( 1 ) ) code = code.replace( u.raw, '\n' );

	const declared = loose.map( ( u ) => {

		const shareable = hostShareable( u );

		code = shareable.rewrite( code );

		return `\t${shareable.type} ${u.name}${u.count === null ? '' : `[${u.count}]`};`;

	} );

	// Params は最初の loose uniform の位置に入るため、後ろで定義された struct を参照しうる。
	// 定義を前に動かすのは常に安全なので、参照される struct をブロック直前へ引き上げる
	const hoisted = referenced.map( ( type ) => {

		const raw = defined.get( type ).raw;

		code = code.replace( raw, '\n' );

		return raw;

	} );

	const block = [
		...hoisted,
		`layout(set = ${group}, binding = 0) uniform Params {`,
		...declared,
		'};',
	].join( '\n' );

	return { code: code.replace( PARAMS_PLACEHOLDER, block ), uniforms: { binding: 0, structs, fields } };

};

/*-------------------------------
	R8: stage 入出力の location
-------------------------------*/

const STAGE_IO_DECL = /^[^\S\n]*(?:layout\s*\(([^)]*)\)\s*)?((?:(?:flat|smooth|noperspective|centroid|highp|mediump|lowp)\s+)*)(in|out)\s+(\w+)\s+(\w+)\s*(\[\s*\d+\s*\])?\s*;[^\S\n]*$/gm;

// Vulkan 方言は stage 入出力すべてに location を要求するため、明示が無い宣言に空き番号を振る
const addStageLocations = ( code ) => {

	const used = { in: new Set(), out: new Set() };

	for ( const m of code.matchAll( STAGE_IO_DECL ) ) {

		const loc = m[ 1 ]?.match( /location\s*=\s*(\d+)/ );

		if ( loc ) used[ m[ 3 ] ].add( Number( loc[ 1 ] ) );

	}

	const next = { in: 0, out: 0 };
	const inputs = [];

	const take = ( dir ) => {

		while ( used[ dir ].has( next[ dir ] ) ) next[ dir ] ++;

		used[ dir ].add( next[ dir ] );

		return next[ dir ];

	};

	code = code.replace( STAGE_IO_DECL, ( raw, layout, quals, dir, type, name, array ) => {

		const explicit = layout?.match( /location\s*=\s*(\d+)/ );
		const location = explicit ? Number( explicit[ 1 ] ) : take( dir );

		if ( dir === 'in' ) inputs.push( { name, location } );

		return `layout(location = ${location}) ${quals}${dir} ${type} ${name}${array ?? ''};`;

	} );

	return { code, inputs };

};

/*-------------------------------
	R10: 暗黙LODの明示化
-------------------------------*/

// 暗黙LODのテクスチャ組み込みを textureLod 系へ置き換える。
// WGSLは非一様制御フロー（ライトループ等）内の暗黙LODサンプリングを禁止しており（Tintがエラーにする）、
// vertexステージには暗黙LODそのものが無いため、全ステージでLOD 0を明示する。
// bias引数付きの呼び出しはbiasを捨ててLOD 0にする
const IMPLICIT_LOD_CALLS = [
	{ from: 'texture', to: 'textureLod', keep: 2 },
	{ from: 'textureOffset', to: 'textureLodOffset', keep: 3 },
	{ from: 'textureProj', to: 'textureProjLod', keep: 2 },
];

const explicitizeLod = ( code ) => {

	// 引数の中のネストした呼び出しは1回の走査では書き換わらないため、変化が無くなるまで回す
	for ( let pass = 0; pass < 8; pass ++ ) {

		const before = code;

		for ( const { from, to, keep } of IMPLICIT_LOD_CALLS ) {

			const pattern = new RegExp( `\\b${from}\\s*\\(`, 'g' );
			let result = '';
			let last = 0;
			let m;

			while ( ( m = pattern.exec( code ) ) !== null ) {

				const open = m.index + m[ 0 ].length - 1;
				const close = matchParen( code, open );

				if ( close < 0 ) continue;

				const args = splitArgs( code.slice( open + 1, close ) ).map( ( a ) => a.trim() ).slice( 0, keep );

				args.splice( 2, 0, '0.0' );

				result += code.slice( last, m.index ) + `${to}( ${args.join( ', ' )} )`;
				last = close + 1;
				pattern.lastIndex = close + 1;

			}

			code = result + code.slice( last );

		}

		if ( code === before ) break;

	}

	return code;

};

/*-------------------------------
	R9: クリップ空間変換
-------------------------------*/

// GL 用の投影行列のままだと深度クリップと上下反転が起きるため、main の末尾で機械的に吸収する
const injectClipSpaceFix = ( code ) => {

	const m = /\bvoid\s+main\s*\(\s*(?:void\s*)?\)\s*\{/.exec( code );

	if ( ! m ) return code;

	const close = matchBrace( code, m.index + m[ 0 ].length - 1 );

	if ( close < 0 ) return code;

	return `${code.slice( 0, close )}\n${CLIP_SPACE_FIX}\n${code.slice( close )}`;

};

/*-------------------------------
	エントリ
-------------------------------*/

// プリプロセッサ畳み込み済み GLSL に全規則を適用し、変換後ソースと契約メタデータを返す
export const preprocess = ( source, stage ) => {

	const group = stage === 'vertex' ? 0 : 1;

	let code = rewriteVersion( normalizeDeclarations( source ) );

	const unrolled = unrollSamplerArrays( code );
	const split = splitSamplers( unrolled.code, group, unrolled.sourceNames );
	const wrapped = wrapLooseUniforms( explicitizeLod( split.code ), group );
	const located = addStageLocations( wrapped.code );

	code = stage === 'vertex' ? injectClipSpaceFix( located.code ) : located.code;

	return {
		glsl: code,
		group,
		uniforms: wrapped.uniforms,
		textures: split.textures,
		attributes: stage === 'vertex' ? located.inputs : [],
	};

};
