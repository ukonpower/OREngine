import { Component, ComponentParams } from "..";
import { Geometry } from "../../Geometry";

import type { MaterialBase } from "../../Material";

const defaultGeometry = new Geometry();

export class Mesh extends Component {

	public geometry: Geometry;
	// materialはバックエンド不透明型。未設定のときはレンダラーが自分の既定マテリアルを使う
	public material: MaterialBase | null;

	constructor( params: ComponentParams<{ geometry?: Geometry; material?: MaterialBase } | void> ) {

		super( params );

		const args = params.args || {};

		this.geometry = args.geometry || defaultGeometry;
		this.material = args.material || null;

	}

}
