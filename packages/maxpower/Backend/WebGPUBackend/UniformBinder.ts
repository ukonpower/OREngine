/*-------------------------------
	名前ベース uniform 辞書 → WGSL UBO 反映層

	OREngine は 'directionalLight[0].direction' のような名前で uniform を設定するが、
	WebGPU には名前指定のAPIが無い。変換サービスが返す宣言（structs / fields）から
	キー → バイトオフセットの表を作り、1本の ArrayBuffer へパックして反映する。
-------------------------------*/

export type UniformField = {
	name: string,
	type: string,
	count?: number,
};

export type UniformLayout = {
	binding: number | null,
	structs: { [key: string]: UniformField[] },
	fields: UniformField[],
};

export type UniformValue = {
	type: string,
	value: ( number | boolean )[],
};

// GLSL の型ごとのサイズ・アラインメント（WGSL の uniform アドレス空間の規則）
const TYPES: { [key: string]: { size: number, align: number, count: number, int?: boolean, columns?: number, rows?: number, columnStride?: number } } = {
	float: { size: 4, align: 4, count: 1 },
	int: { size: 4, align: 4, count: 1, int: true },
	uint: { size: 4, align: 4, count: 1, int: true },
	// bool は uniform アドレス空間に置けないため変換器が int 化している
	bool: { size: 4, align: 4, count: 1, int: true },
	vec2: { size: 8, align: 8, count: 2 },
	vec3: { size: 12, align: 16, count: 3 },
	vec4: { size: 16, align: 16, count: 4 },
	ivec2: { size: 8, align: 8, count: 2, int: true },
	ivec3: { size: 12, align: 16, count: 3, int: true },
	ivec4: { size: 16, align: 16, count: 4, int: true },
	uvec2: { size: 8, align: 8, count: 2, int: true },
	uvec3: { size: 12, align: 16, count: 3, int: true },
	uvec4: { size: 16, align: 16, count: 4, int: true },
	mat2: { size: 16, align: 8, count: 4, columns: 2, rows: 2, columnStride: 8 },
	mat3: { size: 48, align: 16, count: 9, columns: 3, rows: 3, columnStride: 16 },
	mat4: { size: 64, align: 16, count: 16, columns: 4, rows: 4, columnStride: 16 },
};

type Member = {
	field: UniformField,
	offset: number,
	inner: Measured | null,
	stride: number,
};

type Measured = {
	size: number,
	align: number,
	members: Member[],
};

type Entry = {
	offset: number,
	type: string,
};

const roundUp = ( value: number, align: number ) => Math.ceil( value / align ) * align;

// 構造体メンバーのサイズ・アラインメント・相対オフセットを算出する
const measureStruct = ( fields: UniformField[], structs: { [key: string]: UniformField[] } ): Measured => {

	let offset = 0;
	let align = 1;

	const members: Member[] = [];

	for ( const f of fields ) {

		const nested = structs[ f.type ];

		let mAlign: number;
		let mSize: number;
		let inner: Measured | null = null;
		let stride = 0;

		if ( nested ) {

			inner = measureStruct( nested, structs );
			mAlign = inner.align;
			mSize = inner.size;

			if ( f.count ) {

				stride = inner.size;
				mSize = stride * f.count;

			}

		} else {

			const t = TYPES[ f.type ];

			if ( ! t ) throw new Error( `unsupported uniform type: ${f.type}` );

			mAlign = t.align;
			mSize = t.size;

			if ( f.count ) {

				// uniform 内の配列は要素ストライドが16の倍数
				stride = roundUp( t.size, 16 );
				mAlign = Math.max( mAlign, 16 );
				mSize = stride * f.count;

			}

		}

		offset = roundUp( offset, mAlign );
		members.push( { field: f, offset, inner, stride } );
		offset += mSize;
		align = Math.max( align, mAlign );

	}

	// uniform アドレス空間の構造体は16バイト境界
	align = Math.max( align, 16 );

	return { size: roundUp( offset, align ), align, members };

};

// 構造体レイアウトを 'name[i].field' 形式のフラットなキー → オフセット表へ展開する
const flatten = ( measured: Measured, base: number, prefix: string, entries: Map<string, Entry> ) => {

	for ( const m of measured.members ) {

		const f = m.field;
		const off = base + m.offset;

		if ( m.inner ) {

			if ( f.count ) {

				for ( let i = 0; i < f.count; i ++ ) {

					flatten( m.inner, off + i * m.stride, `${prefix}${f.name}[${i}].`, entries );

				}

			} else {

				flatten( m.inner, off, `${prefix}${f.name}.`, entries );

			}

		} else if ( f.count ) {

			for ( let i = 0; i < f.count; i ++ ) {

				entries.set( `${prefix}${f.name}[${i}]`, { offset: off + i * m.stride, type: f.type } );

			}

		} else {

			entries.set( `${prefix}${f.name}`, { offset: off, type: f.type } );

		}

	}

};

export class UniformBinder {

	public readonly buffer: GPUBuffer;
	public readonly size: number;

	private _device: GPUDevice;
	private _entries: Map<string, Entry>;
	private _data: ArrayBuffer;
	private _view: DataView;
	private _warned: Set<string>;

	constructor( device: GPUDevice, layout: UniformLayout, label: string ) {

		this._device = device;
		this._entries = new Map();
		this._warned = new Set();

		const measured = measureStruct( layout.fields, layout.structs );

		flatten( measured, 0, '', this._entries );

		this.size = roundUp( measured.size, 16 );
		this._data = new ArrayBuffer( this.size );
		this._view = new DataView( this._data );

		this.buffer = device.createBuffer( {
			label,
			size: this.size,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		} );

	}

	// 辞書をUBOへ反映する。レイアウトに無いキーは初回だけ警告して無視する
	public update( uniforms: Map<string, UniformValue>, label: string ) {

		uniforms.forEach( ( uniform, key ) => {

			const entry = this._entries.get( key );

			if ( ! entry ) {

				if ( ! this._warned.has( key ) ) {

					this._warned.add( key );

					console.warn( `[WebGPUBackend] uniform "${key}" は ${label} のレイアウトに存在しません` );

				}

				return;

			}

			this._write( entry, uniform.value );

		} );

		this._device.queue.writeBuffer( this.buffer, 0, this._data );

	}

	private _write( entry: Entry, values: ( number | boolean )[] ) {

		const t = TYPES[ entry.type ];

		if ( t.columns ) {

			// 行列は列ごとにアラインメント境界へ置き直す（mat3 は 9 要素 → 3 列 × 16 バイト）
			for ( let c = 0; c < t.columns; c ++ ) {

				for ( let r = 0; r < t.rows!; r ++ ) {

					this._view.setFloat32( entry.offset + c * t.columnStride! + r * 4, Number( values[ c * t.rows! + r ] ) || 0, true );

				}

			}

			return;

		}

		for ( let i = 0; i < t.count; i ++ ) {

			const v = Number( values[ i ] ) || 0;

			if ( t.int ) {

				this._view.setInt32( entry.offset + i * 4, v, true );

			} else {

				this._view.setFloat32( entry.offset + i * 4, v, true );

			}

		}

	}

}
