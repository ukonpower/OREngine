export namespace Types {

	export type Nullable<T> = {
		[P in keyof T]?: T[P];
	};

	export type RecommendString<T extends string> = T | ( string & {} )

	export type Uniform<T> = {
		value: T
	}

	export type Axis = "x" | "y" | "z" | "w"

}

export type TArrayBuffer = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array| Float32Array

// uniform辞書の共有フォーマット。型名はGL由来だがwebgl/webgpu両バックエンドがこの形で受け取る
export type UniformType =
	'1f' | '1fv' | '2f' | '2fv' | '3f' | '3fv' | '4f' | '4fv' |
	'1i' | '1iv' | '2i' | '2iv' | '3i' | '3iv' | '4i' | '4iv' |
	'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';

export type Uniforms = {[key:string]: {value: any, type: UniformType}}
