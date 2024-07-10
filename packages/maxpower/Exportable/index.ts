import { Resource } from "~/ts/gl/Resources/Resource";

export type ExportablePropsOpt = {
} & {
	readOnly?: boolean,
	precision?: number,
	selectList?: string[]
	slideScale?: number,
}

export type ExportableProps = {[key: string]: { value: any, opt?: ExportablePropsOpt, } | ExportableProps}
export type ExportablePropsSerialized = {[key: string]: any }

export class Exportable extends Resource {

	constructor() {

		super();

	}

	// get

	public getProps(): ExportableProps | null {

		return null;

	}

	public getPropsSerialized() {

		const propertyValue:ExportablePropsSerialized = {};

		const _ = ( path: string, props: ExportableProps ): ExportablePropsSerialized => {

			Object.keys( props || {} ).forEach( ( key ) => {

				const path_ = path + key;

				const prop = props[ key ];

				if ( "value" in prop ) {

					propertyValue[ path_ ] = props[ key ].value;

				} else {

					_( path_ + "/", prop );

				}

			} );

			return props;

		};

		_( "", this.getProps() || {} );

		return propertyValue;

	}

	// set

	public setProps( props: ExportablePropsSerialized ) {

		this.setPropsImpl( { ...this.getPropsSerialized(), ...props } );

		this.emit( "update/props", [ this.getPropsSerialized() ] );

	}

	public setPropsImpl( props: ExportablePropsSerialized ) {
	}

	// unit

	public getPropValue( path: string ) {

		const props = this.getPropsSerialized();

		return props[ path ];

	}

	public setPropValue( path: string, value: any ) {

		this.setProps( { [ path ]: value } );

	}

}
