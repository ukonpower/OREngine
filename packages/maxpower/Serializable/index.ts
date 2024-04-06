import { EventEmitter } from "glpower";

import { ValueOpt } from "~/ts/components/ui/Property/Value";

export type ComponentPropsOpt = {
} & ValueOpt

export type ComponentProps = {[key: string]: { value: any, opt?: ComponentPropsOpt, } | ComponentProps}
export type ComponentSetProps = {[key: string]: any }

export class Serializable extends EventEmitter {

	constructor() {

		super();

	}

	public getProperties(): ComponentProps | null {

		return null;

	}

	public getPropertyValues() {

		const propertyValue:ComponentSetProps = {};

		const _ = ( path: string, props: ComponentProps ): ComponentSetProps => {

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

		_( "", this.getProperties() || {} );

		return propertyValue;

	}

	public setPropertyValues( props: ComponentSetProps ) {
	}

	public export(): ComponentProps | null {

		return this.getPropertyValues();

	}

}
