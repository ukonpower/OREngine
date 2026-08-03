import { Component, ComponentParams } from "../../Component";
import { Geometry } from "../../Geometry";

import type { MaterialContract } from "../../Contracts/MaterialContract";

const defaultGeometry = new Geometry();

export class Mesh extends Component {

	public geometry: Geometry;
	// materialはバックエンド不透明型。未設定のときはレンダラーが自分の既定マテリアルを使う
	public material: MaterialContract | null;

	constructor( params: ComponentParams<{ geometry?: Geometry; material?: MaterialContract } | void> ) {

		super( params );

		const args = params.args || {};

		this.geometry = args.geometry || defaultGeometry;
		this.material = args.material || null;

	}

}
