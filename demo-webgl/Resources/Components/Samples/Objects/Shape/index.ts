import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import fragSrc from './shaders/shape.fs';

import type * as BSP from 'basepower';

// shape フィールドの選択肢。demo-webgpu の Shape と同じ並び
const SHAPES = [ "cube", "sphere", "plane" ];

// pass フィールドの選択肢（描く経路）。demo-webgpu の Shape と同じ並び。
// deferred: gBuffer へ書く / forward: 不透明の forward / transparent: 背後と混ぜる forward /
// refraction: 背後のシーンを読んで、ずらして色を乗せる forward
const PASSES = [ "deferred", "forward", "transparent", "refraction" ];

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
// ライト・マテリアル・forward など builtin の描画の仕組みを確かめるシーンで使う。
// 同じシーン JSON を両 demo で開けるよう、demo-webgpu の Shape と同じフィールドを持つ
export class Shape extends MXP.Component {

	private _shape: string;
	private _pass: string;
	private _envMap: boolean;
	private _renderOrder: number;
	private _color: MTP.Vector;
	private _uniforms: BSP.Uniforms;
	private _mesh: MXP.Mesh;
	private _material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._shape = "cube";
		this._pass = "deferred";
		this._envMap = false;
		this._renderOrder = 0;
		this._color = new MTP.Vector( 0.8, 0.8, 0.8 );

		const roughness = { value: 0.5, type: "1f" as const };
		const metallic = { value: 0, type: "1f" as const };
		const emission = { value: 0, type: "1f" as const };
		const sss = { value: 0, type: "1f" as const };
		const opacity = { value: 1, type: "1f" as const };

		// マテリアルを作り直しても値が残るよう、uniform はすべてのマテリアルで同じものを使う
		this._uniforms = {
			uColor: { value: this._color, type: "3fv" },
			uRoughness: roughness,
			uMetallic: metallic,
			uEmission: emission,
			uSSS: sss,
			uOpacity: opacity,
		};

		this._material = this.createMaterial();

		this._mesh = this.entity.addComponent( MXP.Mesh, {
			geometry: createGeometry( this._shape ),
			material: this._material,
		} );

		this.field( "shape", () => this._shape, ( v: string ) => {

			if ( v === this._shape ) return;

			this._shape = v;
			this._mesh.geometry = createGeometry( v );

		}, { format: { type: "select", list: SHAPES } } );

		// props はコンストラクタの後に入るので、pass と envMap は setter でマテリアルごと差し替える
		this.field( "pass", () => this._pass, ( v: string ) => {

			if ( v === this._pass ) return;

			this._pass = v;
			this.updateMaterial();

		}, { format: { type: "select", list: PASSES } } );

		this.field( "color", () => this._color.getElm( "vec3" ), ( v: number[] ) => this._color.setFromArray( v ), { format: { type: "color" } } );
		this.field( "roughness", () => roughness.value, ( v: number ) => roughness.value = v, { min: 0, max: 1, step: 0.01 } );
		this.field( "metallic", () => metallic.value, ( v: number ) => metallic.value = v, { min: 0, max: 1, step: 0.01 } );

		// 発光の色は color と同じで、その倍率
		this.field( "emission", () => emission.value, ( v: number ) => emission.value = v, { min: 0, step: 0.1 } );

		// SSS の強さ。レンダラーの pipeline/sss/enabled が true のときだけ効く
		this.field( "sss", () => sss.value, ( v: number ) => sss.value = v, { min: 0, max: 1, step: 0.01 } );

		// 背後と混ぜる割合。pass が transparent / refraction のときだけ効く
		this.field( "opacity", () => opacity.value, ( v: number ) => opacity.value = v, { min: 0, max: 1, step: 0.01 } );

		// forward で描く順。小さいものから描き、refraction は先に描かれた透明も背後として読む
		this.field( "renderOrder", () => this._renderOrder, ( v: number ) => {

			this._renderOrder = v;
			this._material.renderOrder = v;

		}, { step: 1, int: true } );

		// envMap フェーズにも描く（球などへの映り込みに入る）
		this.field( "envMap", () => this._envMap, ( v: boolean ) => {

			if ( v === this._envMap ) return;

			this._envMap = v;
			this.updateMaterial();

		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/shape.fs', ( module ) => {

				if ( module ) {

					MXP.hotUpdate( "ShapeFrag", module.default );
					this.updateMaterial();

				}

			} );

		}

	}

	// 今の pass / envMap でマテリアルを作る。参加するフェーズと透明かどうかは作った後に変えないので、変わるたびに作り直す
	private createMaterial() {

		const transparent = this._pass === "transparent" || this._pass === "refraction";

		// 透明の2つは影を落とさない（光を通す物として扱う）
		const phase: MXP.MaterialRenderType[] = [];

		if ( ! transparent ) {

			phase.push( "shadowMap" );

		}

		if ( this._pass === "deferred" ) {

			phase.push( "deferred" );

		} else {

			phase.push( "forward" );

		}

		if ( this._envMap ) {

			phase.push( "envMap" );

		}

		return new MXP.Material( {
			name: "Shape",
			phase,
			frag: MXP.hotGet( "ShapeFrag", fragSrc ),
			// shape.fs の forward の分岐は PASS_<pass の大文字> で選ぶ
			defines: { [ `PASS_${this._pass.toUpperCase()}` ]: "" },
			uniforms: this._uniforms,
			renderOrder: this._renderOrder,
			transparent,
			// 透明は裏の面も描くと表の面と二重に混ざるので、表だけを描く
			cullFace: transparent,
		} );

	}

	// マテリアルを作り直してメッシュへ差し替える
	private updateMaterial() {

		this._material = this.createMaterial();
		this._mesh.material = this._material;

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
