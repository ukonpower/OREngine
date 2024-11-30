import { Resource } from "../Resource";

type SerializableFieldTypeVector = {
	type: "vector",
}

type SerializableFieldTypeSlect = {
	type: "select",
	list: ( {
		value: any,
		label: string,
	} | string )[]
}

export type SerializableFieldType = SerializableFieldTypeVector | SerializableFieldTypeSlect

export type SerializableFieldOpt = {
	isFolder?: boolean,
	format?: SerializableFieldType,
	noExport?: boolean,
	hidden?: boolean | ( () => boolean ),
	deps?: ReturnType<Serializable["createDeps"]>[]
}

export type SerializeFieldValue = string | number | boolean | null | object;
type SerializeFieldGetter<T extends SerializeFieldValue> = ( event: SerializeFieldSerializeEvent ) => T;
type SerializeFieldSetter<T extends SerializeFieldValue> = ( value: T ) => void;
type SerializeFieldProxy = {get: SerializeFieldGetter<SerializeFieldValue>, set?: SerializeFieldSetter<SerializeFieldValue>, opt?: SerializableFieldOpt}

export type SerializedFields = {[key: string]: SerializeFieldValue}

type SerializeFieldSerializeEvent = {
	mode: "view" | "export"
}


export type SerializeFieldsAsDirectoryFolder= {
	type: "folder",
	childs: {[key: string]: SerializeFieldsAsDirectory},
	opt?: SerializableFieldOpt,
}

export type SerializeFieldsAsDirectoryValue= {
	type: "value",
	value: SerializeFieldValue,
	opt?: SerializableFieldOpt,
}

export type SerializeFieldsAsDirectory = SerializeFieldsAsDirectoryFolder | SerializeFieldsAsDirectoryValue

export class Serializable extends Resource {

	private fields: Map<string, SerializeFieldProxy> = new Map();
	public initiator: string;

	constructor() {

		super();

		this.initiator = 'script';

	}

	public deserialize( props: SerializedFields ) {

		const keys = Object.keys( props );

		for ( let i = 0; i < keys.length; i ++ ) {

			const key = keys[ i ];

			const field = this.fields.get( key );

			if ( field ) {

				field.set && field.set( props[ key ] );

			}

		}

	}

	public export() {

		this.serialize( {
			mode: "export"
		} );

	}

	public serialize( event?: SerializeFieldSerializeEvent ): SerializedFields {

		event = event || { mode: "view" };

		const res: SerializedFields = {};

		this.fields.forEach( ( field, k ) => {

			const opt = this.getFieldOpt( k );

			if ( event.mode == "export" ) {

				if ( opt ) {

					if ( opt.noExport ) return;

				}

			}

			const value = field.get( event );

			res[ k ] = value;

		} );

		return res;

	}

	public serializeToDirectory() {

		const toDirectory = ( serialized: SerializedFields ) => {

			const result: SerializeFieldsAsDirectory = {
				type: "folder",
				childs: {},
				opt: {}
			};

			const keys = Object.keys( serialized );

			for ( let i = 0; i < keys.length; i ++ ) {

				const key = keys[ i ];
				const opt = this.getFieldOpt( key );

				if ( ! key ) continue;

				const splitKeys = key.split( '/' );

				let target:SerializeFieldsAsDirectory = result;

				for ( let j = 0; j < splitKeys.length; j ++ ) {

					const splitedKey = splitKeys[ j ];

					if ( ! splitedKey ) continue;
					if ( target.type == "value" ) continue;

					if ( ! target.childs[ splitedKey ] ) {

						if ( j == splitKeys.length - 1 ) {

							target.childs[ splitedKey ] = {
								type: "value",
								value: null,
								opt
							};

						} else {

							target.childs[ splitedKey ] = {
								type: "folder",
								childs: {},
								opt
							};

						}

					}

					target = target.childs[ splitedKey ];

				}

				if ( target.type == "value" ) {

					target.value = serialized[ key ] as any;

				}

			}

			return result;

		};

		return toDirectory( this.serialize() );

	}

	public field<T extends SerializeFieldValue>( path: string, get: ( event: SerializeFieldSerializeEvent ) => T, set?: ( v: T ) => void, opt?: SerializableFieldOpt ) {

		this.fields.set( path, {
			get: get,
			set: set && ( ( v: SerializeFieldValue ) => {

				set( v as T );

				this.emit( "fields/update/" + path, [ v ] );
				this.emit( "fields/update", [ v, [ path ]] );

			} ),
			opt
		} );

	}

	public fieldDir( name:string, opt?: SerializableFieldOpt ) {

		const dir = name;

		this.field( dir + "/", () => null, undefined, { ...opt, isFolder: true } );

		return {
			dir: ( name: string ) => this.fieldDir( `${dir}/${name}` ),
			field: <T extends SerializeFieldValue>( name: string, get: () => T, set?: ( value: T ) => void, opt?: SerializableFieldOpt ) => {

				this.field( `${dir}/${name}`, get, set, opt );

			},
		};

	}

	public setField( path: string, value: SerializeFieldValue ) {

		this.deserialize( { [ path ]: value } );

	}

	public getField<T extends SerializeFieldValue>( path: string, event?: SerializeFieldSerializeEvent ) {

		const field = this.fields.get( path );

		const e = event || { mode: "view" };

		if ( field ) {

			return field.get( e ) as T;

		}

	}

	public getFieldOpt( path: string ) {

		const field = this.fields.get( path );

		if ( field ) {

			return field.opt;

		}

	}

	protected noticeField( path: string | string[] ) {

		const propsSerialized = this.serialize();

		const _path = typeof path == "string" ? [ path ] : path;

		for ( let i = 0; i < _path.length; i ++ ) {

			const pt = _path[ i ];

			this.emit( "fields/update/" + path, [ propsSerialized[ pt ] ] );

		}

		this.emit( "fields/update", [ propsSerialized, _path ] );

	}

	public listenField( path: string, cb: () =>void ) {

		let currentValue: any = null;

		const onChange = () => {

			const newValue = JSON.stringify( this.getField( path ) );

			if ( newValue !== currentValue ) {

				currentValue = newValue;

				cb();

			}

		};

		this.on( "field/update/" + path, onChange );

		return {
			off: () => this.off( "field/update/" + path, onChange )
		};

	}

	public createDeps( path: string ) {

		return ( cb: () => void ) => {

			return this.listenField( path, cb );

		};

	}

}
