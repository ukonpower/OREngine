import * as MXP from 'maxpower';

// WebGPUバックエンドの縦一本を通すための最小メッシュ（デフォルトのbasicシェーダーを使う）
export class Cube extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entity.addComponent( MXP.Mesh, {
			geometry: new MXP.CubeGeometry( { width: 2, height: 2, depth: 2 } ),
			material: new MXP.Material( { name: "Cube" } ),
		} );

	}

}
