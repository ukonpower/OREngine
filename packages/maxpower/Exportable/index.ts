import { EventEmitter } from "glpower";

export type ExportablePropsOpt = {
} & {
	readOnly?: boolean,
	precision?: number,
	selectList?: string[]
	slideScale?: number,
}

export type ExportableProps = {[key: string]: { value: any, opt?: ExportablePropsOpt, } | ExportableProps}
export type ExportablePropsSerialized = {[key: string]: any }

export class Exportable extends EventEmitter {

	constructor() {

		super();

	}

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

	public setProps( props: ExportablePropsSerialized ) {
	}

	public exportProps(): ExportableProps | null {

		return this.getPropsSerialized();

	}

}
