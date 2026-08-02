import type * as GLP from 'glpower';

/*-------------------------------
	名前ベース uniform 辞書 → WGSL uniform buffer

	OREngine は `uColor` や `directionalLight[0].direction` のような名前で uniform を設定するが、
	WebGPU には名前指定のAPIが無い。フィールド宣言からキー → バイトオフセットの表を作り、
	1本の ArrayBuffer へパックして反映する。
	同じ宣言から WGSL の struct 文字列も生成するため、CPU側のオフセットとシェーダーの
	レイアウトが食い違わない。
-------------------------------*/

export type WgslType = 'f32' | 'i32' | 'vec2f' | 'vec3f' | 'vec4f' | 'mat3x3f' | 'mat4x4f';

// 入れ子structの宣言。type に直接書くことで宣言の出所を1箇所に保つ
export type UniformStruct = {
	name: string;
	fields: UniformField[];
}

export type UniformField = {
	name: string;
	type: WgslType | UniformStruct;
	// 配列にする場合の要素数
	count?: number;
}

// WGSL の uniform アドレス空間におけるサイズ・アラインメント
const TYPES: { [K in WgslType]: { size: number, align: number, count: number, int?: boolean, columns?: number, rows?: number, columnStride?: number } } = {
	f32: { size: 4, align: 4, count: 1 },
	i32: { size: 4, align: 4, count: 1, int: true },
	vec2f: { size: 8, align: 8, count: 2 },
	vec3f: { size: 12, align: 16, count: 3 },
	vec4f: { size: 16, align: 16, count: 4 },
	mat3x3f: { size: 48, align: 16, count: 9, columns: 3, rows: 3, columnStride: 16 },
	mat4x4f: { size: 64, align: 16, count: 16, columns: 4, rows: 4, columnStride: 16 },
};

// GLP.Uniforms の型指定を WGSL の型へ写す
const GLP_TYPE: { [key: string]: WgslType } = {
	'1f': 'f32',
	'1fv': 'f32',
	'2f': 'vec2f',
	'2fv': 'vec2f',
	'3f': 'vec3f',
	'3fv': 'vec3f',
	'4f': 'vec4f',
	'4fv': 'vec4f',
	'1i': 'i32',
	'1iv': 'i32',
	'Matrix3fv': 'mat3x3f',
	'Matrix4fv': 'mat4x4f',
};

type Entry = {
	offset: number;
	type: WgslType;
}

type Member = {
	field: UniformField;
	offset: number;
	inner: Measured | null;
	stride: number;
}

type Measured = {
	size: number;
	align: number;
	members: Member[];
}

const roundUp = ( value: number, align: number ) => Math.ceil( value / align ) * align;

// 構造体メンバーのサイズ・アラインメント・相対オフセットを算出する
const measureStruct = ( fields: UniformField[] ): Measured => {

	let offset = 0;
	let align = 1;

	const members: Member[] = [];

	for ( let i = 0; i < fields.length; i ++ ) {

		const field = fields[ i ];

		let mAlign: number;
		let mSize: number;
		let inner: Measured | null = null;
		let stride = 0;

		if ( typeof field.type != 'string' ) {

			inner = measureStruct( field.type.fields );
			mAlign = inner.align;
			mSize = inner.size;

			if ( field.count ) {

				stride = inner.size;
				mSize = stride * field.count;

			}

		} else {

			const t = TYPES[ field.type ];

			mAlign = t.align;
			mSize = t.size;

			if ( field.count ) {

				// uniform 内の配列は要素ストライドが16の倍数
				stride = roundUp( t.size, 16 );
				mAlign = Math.max( mAlign, 16 );
				mSize = stride * field.count;

			}

		}

		offset = roundUp( offset, mAlign );
		members.push( { field, offset, inner, stride } );
		offset += mSize;
		align = Math.max( align, mAlign );

	}

	// uniform アドレス空間の構造体は16バイト境界
	align = Math.max( align, 16 );

	return { size: roundUp( offset, align ), align, members };

};

// 構造体レイアウトを `name[i].field` 形式のフラットなキー → オフセット表へ展開する
const flatten = ( measured: Measured, base: number, prefix: string, entries: Map<string, Entry> ) => {

	for ( let i = 0; i < measured.members.length; i ++ ) {

		const member = measured.members[ i ];
		const field = member.field;
		const offset = base + member.offset;

		if ( member.inner ) {

			if ( field.count ) {

				for ( let j = 0; j < field.count; j ++ ) {

					flatten( member.inner, offset + j * member.stride, `${prefix}${field.name}[${j}].`, entries );

				}

			} else {

				flatten( member.inner, offset, `${prefix}${field.name}.`, entries );

			}

		} else if ( field.count ) {

			for ( let j = 0; j < field.count; j ++ ) {

				entries.set( `${prefix}${field.name}[${j}]`, { offset: offset + j * member.stride, type: field.type as WgslType } );

			}

		} else {

			entries.set( `${prefix}${field.name}`, { offset, type: field.type as WgslType } );

		}

	}

};

// 名前ベース辞書からフィールド宣言を作る（宣言順＝辞書のキー順）
export const fieldsFromUniforms = ( uniforms: GLP.Uniforms ): UniformField[] => {

	const fields: UniformField[] = [];
	const keys = Object.keys( uniforms );

	for ( let i = 0; i < keys.length; i ++ ) {

		const type = GLP_TYPE[ uniforms[ keys[ i ] ].type ];

		if ( ! type ) {

			throw new Error( `[webgpu] uniform "${keys[ i ]}" の型 ${uniforms[ keys[ i ] ].type} はまだ対応していません` );

		}

		fields.push( { name: keys[ i ], type } );

	}

	return fields;

};

// 入れ子structを宣言順（依存先が先）に集める
const collectStructs = ( fields: UniformField[], out: Map<string, UniformStruct> ) => {

	for ( let i = 0; i < fields.length; i ++ ) {

		const type = fields[ i ].type;

		if ( typeof type == 'string' ) continue;

		collectStructs( type.fields, out );
		out.set( type.name, type );

	}

};

const structBody = ( name: string, fields: UniformField[] ) => {

	const members = fields.map( ( f ) => {

		const type = typeof f.type == 'string' ? f.type : f.type.name;

		return `\t${f.name}: ${f.count ? `array<${type}, ${f.count}>` : type},`;

	} ).join( '\n' );

	return `struct ${name} {\n${members}\n};`;

};

// フィールド宣言から WGSL の struct 定義を組み立てる（入れ子structも一緒に出力する）
export const buildStructWgsl = ( name: string, fields: UniformField[] ) => {

	const nested = new Map<string, UniformStruct>();

	collectStructs( fields, nested );

	const chunks = Array.from( nested.values() ).map( ( s ) => structBody( s.name, s.fields ) );

	chunks.push( structBody( name, fields ) );

	return chunks.join( '\n\n' );

};

export class UniformBinder {

	public readonly buffer: GPUBuffer;
	public readonly size: number;

	private _device: GPUDevice;
	private _entries: Map<string, Entry>;
	private _data: ArrayBuffer;
	private _view: DataView;
	private _warned: Set<string>;
	private _label: string;

	constructor( device: GPUDevice, fields: UniformField[], label: string ) {

		this._device = device;
		this._entries = new Map();
		this._warned = new Set();
		this._label = label;

		const measured = measureStruct( fields );

		flatten( measured, 0, '', this._entries );

		this.size = Math.max( measured.size, 16 );
		this._data = new ArrayBuffer( this.size );
		this._view = new DataView( this._data );

		this.buffer = device.createBuffer( {
			label,
			size: this.size,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		} );

	}

	// 複数の辞書を順に反映してGPUへ書き戻す（後の辞書が同名キーを上書きする）
	public update( ...uniformsList: ( GLP.Uniforms | undefined )[] ) {

		for ( let i = 0; i < uniformsList.length; i ++ ) {

			const uniforms = uniformsList[ i ];

			if ( ! uniforms ) continue;

			const keys = Object.keys( uniforms );

			for ( let j = 0; j < keys.length; j ++ ) {

				const key = keys[ j ];
				const entry = this._entries.get( key );

				if ( ! entry ) {

					if ( ! this._warned.has( key ) ) {

						this._warned.add( key );

						console.warn( `[webgpu] uniform "${key}" は ${this._label} のレイアウトに存在しません` );

					}

					continue;

				}

				this._write( entry, uniforms[ key ].value );

			}

		}

		this._device.queue.writeBuffer( this.buffer, 0, this._data );

	}

	private _write( entry: Entry, value: any ) {

		if ( value == null ) return;

		const t = TYPES[ entry.type ];

		if ( t.columns ) {

			// 行列は列ごとにアラインメント境界へ置き直す（mat3x3f は 9 要素 → 3 列 × 16 バイト）
			const elm = ( value as GLP.Matrix ).elm;

			for ( let c = 0; c < t.columns; c ++ ) {

				for ( let r = 0; r < t.rows!; r ++ ) {

					this._view.setFloat32( entry.offset + c * t.columnStride! + r * 4, elm[ c * t.rows! + r ] || 0, true );

				}

			}

			return;

		}

		const values = typeof value == 'number' || typeof value == 'boolean'
			? [ Number( value ) ]
			: ( value as GLP.Vector ).getElm( `vec${t.count}` as 'vec2' | 'vec3' | 'vec4' );

		for ( let i = 0; i < t.count; i ++ ) {

			const v = Number( values[ i ] ) || 0;

			if ( t.int ) {

				this._view.setInt32( entry.offset + i * 4, v, true );

			} else {

				this._view.setFloat32( entry.offset + i * 4, v, true );

			}

		}

	}

	public dispose() {

		this.buffer.destroy();

	}

}
