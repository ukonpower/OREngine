/*-------------------------------
	名前ベース uniform 辞書 → WGSL UBO 反映層

	OREngine（WebGL）は GLP.Uniforms 形式の辞書
	  { 'directionalLight[0].direction': { value: [...], type: '3fv' } }
	を名前ごとに gl.uniform* へ流し込む。WebGPU には名前指定 API が無いので、
	WGSL 側の構造体レイアウト定義からキー → バイトオフセットの表を作り、
	1本の ArrayBuffer へパックして queue.writeBuffer で反映する。
-------------------------------*/

// WGSL の型ごとのサイズ・アラインメント（uniform アドレス空間）
const TYPES = {
	f32: { size: 4, align: 4, count: 1 },
	i32: { size: 4, align: 4, count: 1, int: true },
	u32: { size: 4, align: 4, count: 1, int: true },
	vec2f: { size: 8, align: 8, count: 2 },
	vec3f: { size: 12, align: 16, count: 3 },
	vec4f: { size: 16, align: 16, count: 4 },
	mat3x3f: { size: 48, align: 16, count: 9, columns: 3, rows: 3 },
	mat4x4f: { size: 64, align: 16, count: 16, columns: 4, rows: 4 },
};

// OREngine の UniformType → WGSL 型。CPU 側の型と宣言の突き合わせに使う
export const UNIFORM_TYPE_TO_WGSL = {
	'1f': 'f32', '1fv': 'f32',
	'2f': 'vec2f', '2fv': 'vec2f',
	'3f': 'vec3f', '3fv': 'vec3f',
	'4f': 'vec4f', '4fv': 'vec4f',
	'1i': 'i32', '1iv': 'i32',
	'2i': 'vec2i', '2iv': 'vec2i',
	'3i': 'vec3i', '3iv': 'vec3i',
	'4i': 'vec4i', '4iv': 'vec4i',
	'Matrix3fv': 'mat3x3f',
	'Matrix4fv': 'mat4x4f',
};

const roundUp = ( value, align ) => Math.ceil( value / align ) * align;

// 構造体メンバーのサイズ・アラインメント・相対オフセットを算出する
function measureStruct( fields ) {

	let offset = 0;
	let align = 1;
	const members = [];

	for ( const f of fields ) {

		let mAlign, mSize, inner = null, stride = 0;

		if ( f.fields ) {

			inner = measureStruct( f.fields );

			// uniform アドレス空間では構造体は 16 バイト境界
			mAlign = Math.max( inner.align, 16 );
			mSize = inner.size;

			if ( f.array ) {

				stride = roundUp( inner.size, 16 );
				mSize = stride * f.array;

			}

		} else {

			const t = TYPES[ f.type ];

			if ( ! t ) throw new Error( `unsupported wgsl type: ${f.type}` );

			mAlign = t.align;
			mSize = t.size;

			if ( f.array ) {

				// uniform 内の配列は要素 stride が 16 の倍数
				stride = roundUp( t.size, 16 );
				mAlign = Math.max( mAlign, 16 );
				mSize = stride * f.array;

			}

		}

		offset = roundUp( offset, mAlign );
		members.push( { field: f, offset, inner, stride } );
		offset += mSize;
		align = Math.max( align, mAlign );

	}

	return { size: roundUp( offset, align ), align, members };

}

// 構造体レイアウトを 'name[i].field' 形式のフラットなキー → オフセット表へ展開する
function flatten( measured, base, prefix, entries ) {

	for ( const m of measured.members ) {

		const f = m.field;
		const off = base + m.offset;

		if ( f.fields ) {

			if ( f.array ) {

				for ( let i = 0; i < f.array; i ++ ) {

					flatten( m.inner, off + i * m.stride, `${prefix}${f.name}[${i}].`, entries );

				}

			} else {

				flatten( m.inner, off, `${prefix}${f.name}.`, entries );

			}

		} else if ( f.array ) {

			for ( let i = 0; i < f.array; i ++ ) {

				entries.set( `${prefix}${f.name}[${i}]`, { offset: off + i * m.stride, type: f.type } );

			}

		} else {

			entries.set( `${prefix}${f.name}`, { offset: off, type: f.type } );

		}

	}

}

// GLP.Uniforms の値（number / 配列 / Vector / Matrix）を数値配列へ均す
function toArray( value ) {

	if ( typeof value === 'number' ) return [ value ];
	if ( typeof value === 'boolean' ) return [ value ? 1 : 0 ];
	if ( Array.isArray( value ) ) return value;
	if ( ArrayBuffer.isView( value ) ) return Array.from( value );
	if ( value && Array.isArray( value.elm ) ) return value.elm;
	if ( value && typeof value.x === 'number' ) {

		const a = [ value.x, value.y ];
		if ( typeof value.z === 'number' ) a.push( value.z );
		if ( typeof value.w === 'number' ) a.push( value.w );
		return a;

	}

	throw new Error( `unsupported uniform value: ${JSON.stringify( value )}` );

}

export class UniformBinder {

	constructor( device, layoutDef, label = 'uniforms' ) {

		this.device = device;
		this.measured = measureStruct( layoutDef.fields );
		this.entries = new Map();
		flatten( this.measured, 0, '', this.entries );

		// uniform buffer のサイズは 16 の倍数へ切り上げ
		this.size = roundUp( this.measured.size, 16 );
		this.data = new ArrayBuffer( this.size );
		this.view = new DataView( this.data );

		this.buffer = device.createBuffer( {
			label,
			size: this.size,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		} );

	}

	// キー → オフセットの一覧（検証・デバッグ用）
	get offsets() {

		const o = {};
		for ( const [ k, v ] of this.entries ) o[ k ] = v.offset;
		return o;

	}

	// 辞書を UBO へ反映する。レイアウトに無いキーは配列で返す
	update( uniforms ) {

		const unknown = [];

		for ( const key in uniforms ) {

			const entry = this.entries.get( key );

			if ( ! entry ) {

				unknown.push( key );
				continue;

			}

			this.writeEntry_( entry, toArray( uniforms[ key ].value ) );

		}

		this.device.queue.writeBuffer( this.buffer, 0, this.data );

		return unknown;

	}

	writeEntry_( entry, values ) {

		const t = TYPES[ entry.type ];

		if ( t.columns ) {

			// 行列は列ごとに vec4 境界へ配置し直す（mat3x3f は 9 要素 → 3 列 × 16 バイト）
			for ( let c = 0; c < t.columns; c ++ ) {

				for ( let r = 0; r < t.rows; r ++ ) {

					this.view.setFloat32( entry.offset + c * 16 + r * 4, values[ c * t.rows + r ], true );

				}

			}

			return;

		}

		for ( let i = 0; i < t.count; i ++ ) {

			const v = values[ i ] || 0;

			if ( t.int ) this.view.setInt32( entry.offset + i * 4, v, true );
			else this.view.setFloat32( entry.offset + i * 4, v, true );

		}

	}

}
