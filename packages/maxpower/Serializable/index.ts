import { Resource } from "../Resource";

type SerializableFieldTypeVector = {
	type: "vector",
}

type SerializableFieldType = SerializableFieldTypeVector

export type SerializableFieldOpt = {
	format?: SerializableFieldType,
	noExport?: boolean,
	hidden?: boolean,
}

export type SerializeFieldValue = string | number | boolean | null | object;
type SerializeFieldGetter<T extends SerializeFieldValue> = () => T;
type SerializeFieldSetter<T extends SerializeFieldValue> = ( value: T ) => void;
type SerializeFieldProxy = {get: SerializeFieldGetter<SerializeFieldValue>, set?: SerializeFieldSetter<SerializeFieldValue>, opt?: SerializableFieldOpt}

export type SerializedFields = {[key: string]: SerializeFieldValue}

export type SerializedGroupingFields = {[key: string]: SerializedGroupingFields | {value: SerializeFieldValue, opt?: SerializableFieldOpt}}

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

		this.serialize( true )
		
	}
	
	public serialize( expt?: boolean ): SerializedFields {

		const res: SerializedFields = {};

		this.fields.forEach( ( field, k ) => {

			let opt = this.getFieldOpt( k)

			if( expt ) {

				if( opt ) {

					if( opt.noExport ) return;
					
				}

			}

			const value = field.get();

			res[ k ] = value;

		} );

		return res;

	}

	public serializeToObject() {

		const toObj = ( serialized: SerializedFields ) => {

			const res: SerializedGroupingFields = {};

			const keys = Object.keys( serialized );

			for ( let i = 0; i < keys.length; i ++ ) {

				const key = keys[ i ];

				if ( ! key ) continue;

				const splitKeys = key.split( '/' );

				let target = res;

				for ( let j = 0; j < splitKeys.length; j ++ ) {

					const splitedKey = splitKeys[ j ];

					if ( ! splitedKey ) continue;

					target = target[ splitedKey ] = ( target[ splitedKey ] || {} ) as SerializedGroupingFields;

				}

				target.value = serialized[ key ] as any;
				target.opt = this.getFieldOpt( key ) as any;

			}

			return res;

		};

		return toObj( this.serialize() );

	}

	public field<T extends SerializeFieldValue>( path: string, get: () => T, set?: ( v: T ) => void, opt?: SerializableFieldOpt ) {

		this.fields.set( path, {
			get: get,
			set: set && ( ( v: SerializeFieldValue ) => {

				set( v as T );

				this.emit( "update/props/" + path, [ v ] );
				this.emit( "update/props", [ v, [ path ]] );

			} ),
			opt
		} );

	}

	public fieldDir( name:string ) {

		const dir = name;

		return {
			dir: ( name: string ) => this.fieldDir( `${dir}/${name}` ),
			field: <T extends SerializeFieldValue>( name: string, get: () => T, set?: ( value: T ) => void ) => {

				this.field( `${dir}/${name}`, get, set );

			}

		};

	}

	public setField( path: string, value: SerializeFieldValue ) {

		this.deserialize( { [ path ]: value } );

	}

	public getFieldOpt( path: string ) {

		const field = this.fields.get( path );

		if ( field ) {

			return field.opt;

		}

	}

	protected noticePropsChanged( path: string | string[] ) {

		const propsSerialized = this.serialize();

		const _path = typeof path == "string" ? [ path ] : path;

		for ( let i = 0; i < _path.length; i ++ ) {

			const pt = _path[ i ];

			this.emit( "update/props/" + path, [ propsSerialized[ pt ] ] );

		}

		this.emit( "update/props", [ propsSerialized, _path ] );

	}

}
