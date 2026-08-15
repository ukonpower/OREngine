import type { Geometry } from '../../../core/Geometry';

/*-------------------------------
	Geometry（attributeデータ）→ GPUBuffer

	attribute は名前ごとに別々の Float32Array で持たれているため、
	vertex buffer も1attribute＝1スロットで確保する。
	スロット番号と shaderLocation は下の表の並び順で固定し、
	同じ表から WGSL の VertexInput 宣言も生成する。
-------------------------------*/

const ATTRIBUTES = [
	{ name: 'position', size: 3, format: 'float32x3', wgsl: 'vec3f' },
	{ name: 'normal', size: 3, format: 'float32x3', wgsl: 'vec3f' },
	{ name: 'uv', size: 2, format: 'float32x2', wgsl: 'vec2f' },
] as const;

export const VERTEX_BUFFER_LAYOUT: GPUVertexBufferLayout[] = ATTRIBUTES.map( ( attr, i ) => ( {
	arrayStride: attr.size * 4,
	attributes: [ { shaderLocation: i, offset: 0, format: attr.format } ],
} ) );

export const VERTEX_INPUT_WGSL = `struct VertexInput {
${ATTRIBUTES.map( ( attr, i ) => `\t@location(${i}) ${attr.name}: ${attr.wgsl},` ).join( '\n' )}
};`;

// mappedAtCreation で確保する。writeBuffer と違い4バイト境界を自前で揃えなくてよい
const createBuffer = ( device: GPUDevice, data: ArrayBufferView, usage: GPUBufferUsageFlags, label: string ) => {

	const buffer = device.createBuffer( {
		label,
		size: Math.max( Math.ceil( data.byteLength / 4 ) * 4, 4 ),
		usage,
		mappedAtCreation: true,
	} );

	new Uint8Array( buffer.getMappedRange() ).set( new Uint8Array( data.buffer, data.byteOffset, data.byteLength ) );
	buffer.unmap();

	return buffer;

};

export class GeometryBuffer {

	// ATTRIBUTES と同じ並び。スロット番号がそのまま shaderLocation になる
	public readonly vertexBuffers: GPUBuffer[];
	public readonly indexBuffer: GPUBuffer | null;
	public readonly indexFormat: GPUIndexFormat;
	public readonly drawCount: number;

	constructor( device: GPUDevice, geometry: Geometry, label: string ) {

		const vertCount = Number.isFinite( geometry.vertCount ) ? geometry.vertCount : 0;

		this.vertexBuffers = ATTRIBUTES.map( ( attr ) => {

			const source = geometry.getAttribute( attr.name );

			// シェーダー側は3つのattributeを常に宣言しているため、無い場合はゼロ埋めで埋める
			const array = source ? source.array : new Float32Array( vertCount * attr.size );

			return createBuffer( device, array, GPUBufferUsage.VERTEX, `${label}/${attr.name}` );

		} );

		const index = geometry.getAttribute( 'index' );

		if ( index ) {

			this.indexBuffer = createBuffer( device, index.array, GPUBufferUsage.INDEX, `${label}/index` );
			this.indexFormat = index.array instanceof Uint32Array ? 'uint32' : 'uint16';
			this.drawCount = index.array.length;

		} else {

			this.indexBuffer = null;
			this.indexFormat = 'uint16';
			this.drawCount = vertCount;

		}

	}

	public dispose() {

		this.vertexBuffers.forEach( ( buffer ) => buffer.destroy() );
		this.indexBuffer?.destroy();

	}

}
