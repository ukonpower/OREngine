
import * as GLP from 'glpower';

export class ShaderResource extends GLP.EventEmitter {

	public name: string;
	public source: string;

	constructor( name: string, source: string ) {

		super();
		this.name = name;
		this.source = source;

	}

	public updateSource( source: string ) {

		this.source = source;
		this.emit( "update" );

	}

}
