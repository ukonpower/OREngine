import { Resource } from "~/ts/gl/Resources/Resource";

export type ExportablePropsOpt = {
} & {
	readOnly?: boolean,
	precision?: number,
	selectList?: string[]
	slideScale?: number,
}

type ExportableInitiator = 'user' | 'script' | "god";
export type ExportableProps = {[key: string]: { value: any, opt?: ExportablePropsOpt, } | ExportableProps | undefined}
export type ExportablePropsSerialized = {[key: string]: any }

export class Exportable extends Resource {

	public initiator?: ExportableInitiator;

	constructor() {

		super();
		this.initiator = 'script';

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

				if ( prop === undefined ) return;

				if ( "value" in prop ) {

					propertyValue[ path_ ] = prop.value;

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

		this.emit( "update/props", [ this.getPropsSerialized(), Object.keys( props ) ] );

	}

	public setPropsImpl( props: ExportablePropsSerialized ) {
	}

	// unit

	public getPropValue<T>( path: string ) {

		const props = this.getPropsSerialized();

		return props[ path ] as ( T | undefined );

	}

	public setPropValue( path: string, value: any ) {

		this.setProps( { [ path ]: value } );

	}

	public prop<T>( path: string ) {

		return {
			path,
			value: this.getPropValue<T>( path ),
			set: ( value: T ) => this.setPropValue( path, value )
		};

	}

}
