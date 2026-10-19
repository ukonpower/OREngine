import * as MTP from 'mathpower';
import * as MXP from 'maxpower/webgpu';

import shapeWgsl from './shaders/shape.wgsl';

// shape フィールドの選択肢。demo-webgl の Shape と同じ並び
const SHAPES = [ "cube", "sphere", "plane" ];

// 形の名前から Geometry を作る。どれも大きさ 1 で、大きさはエンティティの scale で変える。
// plane は床に使うので XZ 平面（法線 +Y）にする
const createGeometry = ( shape: string ) => {

	if ( shape === "sphere" ) {

		return new MXP.SphereGeometry( { radius: 0.5, widthSegments: 48, heightSegments: 32 } );

	}

	if ( shape === "plane" ) {

		return new MXP.PlaneGeometry( { width: 1, height: 1, floor: true } );

	}

	return new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );

};

// 単色のマテリアル（色・粗さ・金属・発光・SSS）を付けた形を置く。
// ライト・マテリアル・Cloner など builtin の機能を確かめるシーンで使う。
// 同じシーン JSON を両 demo で開けるよう、demo-webgl の Shape と同じフィールドを持つ
export class Shape extends MXP.Component {

	private _shape: string;
	private _color: MTP.Vector;
	private _mesh: MXP.Mesh;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._shape = "cube";
		this._color = new MTP.Vector( 0.8, 0.8, 0.8 );

		const roughness = { value: 0.5, type: "1f" as const };
		const metallic = { value: 0, type: "1f" as const };
		const emission = { value: 0, type: "1f" as const };
		const sss = { value: 0, type: "1f" as const };

		// uniform の並びは Material を作った時点で決まるので、値だけを後から書き換える
		const material = new MXP.Material( {
			name: "Shape",
			phase: [ "shadowMap", "deferred" ],
			wgsl: MXP.standardVertexWgsl + shapeWgsl,
			uniforms: {
				uColor: { value: this._color, type: "3fv" },
				uRoughness: roughness,
				uMetallic: metallic,
				uEmission: emission,
				uSSS: sss,
			}
		} );

		this._mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: createGeometry( this._shape ),
			material,
		} );

		this.field( "shape", () => this._shape, ( v: string ) => {

			if ( v === this._shape ) return;

			this._shape = v;
			this._mesh.geometry = createGeometry( v );

		}, { format: { type: "select", list: SHAPES } } );

		this.field( "color", () => this._color.getElm( "vec3" ), ( v: number[] ) => this._color.setFromArray( v ), { format: { type: "color" } } );
		this.field( "roughness", () => roughness.value, ( v: number ) => roughness.value = v, { min: 0, max: 1, step: 0.01 } );
		this.field( "metallic", () => metallic.value, ( v: number ) => metallic.value = v, { min: 0, max: 1, step: 0.01 } );

		// 発光の色は color と同じで、その倍率
		this.field( "emission", () => emission.value, ( v: number ) => emission.value = v, { min: 0, step: 0.1 } );

		// SSS の強さ。レンダラーの pipeline/sss/enabled が true のときだけ効く
		this.field( "sss", () => sss.value, ( v: number ) => sss.value = v, { min: 0, max: 1, step: 0.01 } );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/shape.wgsl', ( m ) => {

				if ( m ) material.wgsl = MXP.standardVertexWgsl + m.default;

				MXP.requestShaderReload();

			} );

		}

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
