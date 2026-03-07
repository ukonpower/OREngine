
import * as GLP from 'glpower';

export type ShaderUniformInfo = {
	name: string;
	type: string;
};

export class ShaderResource extends GLP.EventEmitter {

	public name: string;
	public source: string;
	public uniforms: ShaderUniformInfo[];

	constructor( name: string, source: string ) {

		super();
		this.name = name;
		this.source = source;
		this.uniforms = this._parseUniforms( source );

	}

	public updateSource( source: string ) {

		this.source = source;
		this.uniforms = this._parseUniforms( source );
		this.emit( "update" );

	}

	private _parseUniforms( source: string ): ShaderUniformInfo[] {

		const result: ShaderUniformInfo[] = [];
		const regex = /uniform\s+(float|vec2|vec3|vec4|int|sampler2D)\s+(\w+)\s*;/g;

		let match;

		while ( ( match = regex.exec( source ) ) !== null ) {

			result.push( { type: match[ 1 ], name: match[ 2 ] } );

		}

		return result;

	}

}
