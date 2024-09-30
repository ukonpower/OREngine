import { Resource } from "../Resource";

export type SerializablePropsOpt = {
	readOnly?: boolean,
	precision?: number,
	selectList?: string[]
	step?: number,
	noExport?: boolean
}

export type SerializableProps = {[key: string]: { value: any, opt?: SerializablePropsOpt } | SerializableProps | undefined}

export type SerializedProps = {[key: string]: any }

type ExportableInitiator = 'user' | 'script' | "god";

export type TypedSerializableProps<T extends Serializable> = T["props"];

export class Serializable extends Resource {

	public initiator?: ExportableInitiator;

	constructor() {

		super();

		this.initiator = 'script';

	}

	public get props(): SerializableProps {

		return {};

	}

	public serialize( isExport = false ): SerializedProps {

		const propertyValue:SerializedProps = {};

		const _ = ( path: string, props: SerializableProps ): SerializedProps => {

			Object.keys( props || {} ).forEach( ( key ) => {

				const path_ = path + key;

				const prop = props[ key ];

				if ( prop === undefined ) return;

				if ( "value" in prop ) {

					const opt = prop.opt as SerializablePropsOpt;

					if ( ! isExport || ! ( opt && opt.noExport ) ) {

						propertyValue[ path_ ] = prop.value;

					}

				} else {

					_( path_ + "/", prop );

				}

			} );

			return props;

		};

		_( "", this.props || {} );

		return propertyValue;

	}

	public deserialize( newSerializedProps: SerializedProps ) {

		const serializableProps:SerializableProps = {};

		const lastPropsSerialized = this.serialize();

		const serializedPaths = Object.keys( lastPropsSerialized );

		for ( let i = 0; i < serializedPaths.length; i ++ ) {

			const path = serializedPaths[ i ];

			const newValue = newSerializedProps[ path ];

			const splitPath = path.split( "/" );

			let targetProps: SerializableProps = serializableProps;

			for ( let i = 0; i < splitPath.length; i ++ ) {

				const dir = splitPath[ i ];

				if ( targetProps[ dir ] === undefined ) {

					targetProps[ dir ] = {};

				}

				if ( i == splitPath.length - 1 ) {

					if ( newValue !== undefined ) {

						targetProps[ dir ].value = newValue;

					} else {

						targetProps[ dir ].value = lastPropsSerialized[ path ];

					}

				}

				targetProps = targetProps[ dir ] as SerializableProps;

			}

		}

		this.deserializer( serializableProps );

		const newPropsSerialized = this.serialize();

		const updatedPaths: string[] = [];

		const keys = Object.keys( lastPropsSerialized );

		for ( let i = 0; i < keys.length; i ++ ) {

			const key = keys[ i ];

			if ( lastPropsSerialized[ key ] !== newPropsSerialized[ key ] ) {

				updatedPaths.push( key );

				this.emit( "update/props/" + key, [ newPropsSerialized[ key ] ] );

			}

		}

		if ( updatedPaths.length > 0 ) {

			this.emit( "update/props", [ newPropsSerialized, updatedPaths ] );

		}

	}

	protected deserializer( props: TypedSerializableProps<this> ) {}

	// change

	protected noticePropsChanged( path: string | string[] ) {

		const propsSerialized = this.serialize();

		const _path = typeof path == "string" ? [ path ] : path;

		for ( let i = 0; i < _path.length; i ++ ) {

			const pt = _path[ i ];

			this.emit( "update/props/" + path, [ propsSerialized[ pt ] ] );

		}

		this.emit( "update/props", [ propsSerialized, _path ] );

	}

	// value

	public getPropsValue<T>( path: string ) {

		const props = this.serialize();

		return props[ path ] as ( T | undefined );

	}

	public setPropsValue( path: string, value: any ) {

		this.deserialize( { [ path ]: value } );

	}

}
