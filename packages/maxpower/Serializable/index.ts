import * as GLP from 'glpower';
import { ValueOpt } from 'packages/orengine/tsx/components/Value';

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

export type SerializableFieldFormat = SerializableFieldTypeVector | SerializableFieldTypeSlect

export type SerializableFieldOpt<> = {
	isFolder?: boolean,
	noExport?: boolean,
	hidden?: boolean | ( ( value: SerializeFieldValue ) => boolean ),
	format?: SerializableFieldFormat,
} & ValueOpt

export type SerializeFieldPrimitive = string | number | boolean | null | undefined | ( () => void );
export type SerializeFieldPrimitiveArray = { label: string, value:SerializeFieldPrimitive }[]
export type SerializeFieldValue = SerializeFieldPrimitive | SerializeFieldPrimitiveArray
export type SerializedField = {[key: string]: SerializeFieldValue}

export type SerializeFieldDirectoryFolder= {
	type: "folder",
	childs: {[key: string]: SerializeFieldDirectory},
	opt?: SerializableFieldOpt,
}
export type SerializeFieldDirectoryValue= {
	type: "value",
	value: SerializeFieldValue,
	opt?: SerializableFieldOpt,
}
export type SerializeFieldDirectory = SerializeFieldDirectoryFolder | SerializeFieldDirectoryValue

type SerializeFieldSerializeEvent = {
	mode: "view" | "export"
}

type SerializeFieldGetter<T extends SerializeFieldValue> = ( event: SerializeFieldSerializeEvent ) => T;
type SerializeFieldSetter<T extends SerializeFieldValue> = ( value: T ) => void;
type SerializeFieldProxy = {get: SerializeFieldGetter<SerializeFieldValue>, set: SerializeFieldSetter<SerializeFieldValue>, opt?: SerializableFieldOpt}


export class Serializable extends GLP.EventEmitter {

	public readonly uuid: string;
	public initiator: string;
	private fields_: Map<string, SerializeFieldProxy>;

	constructor() {

		super();

		this.uuid = GLP.ID.genUUID();

		this.fields_ = new Map();

		this.initiator = 'script';

	}

	/*-------------------------------
		Serialize
	-------------------------------*/

	public serialize( event?: SerializeFieldSerializeEvent ): SerializedField {

		event = event || { mode: "view" };

		const serialized: SerializedField = {};

		this.fields_.forEach( ( field, k ) => {

			const opt = this.getFieldOpt( k );

			if ( event.mode == "export" && opt ) {

				if ( opt ) {

					if ( opt.noExport ) return;

				}

			}

			serialized[ k ] = field.get( event );

		} );

		return serialized;

	}

	public serializeToDirectory() {

		const toDirectory = ( serialized: SerializedField ) => {

			const result: SerializeFieldDirectory = {
				type: "folder",
				childs: {},
				opt: {}
			};

			const keys = Object.keys( serialized );

			for ( let i = 0; i < keys.length; i ++ ) {

				const key = keys[ i ];
				const opt = this.getFieldOpt( key );

				if ( ! key ) continue;

				let target:SerializeFieldDirectory = result;

				const splitKeys = key.split( '/' );

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

	/*-------------------------------
		Deserialize
	-------------------------------*/

	public deserialize( props: SerializedField ) {

		const keys = Object.keys( props );

		for ( let i = 0; i < keys.length; i ++ ) {

			const key = keys[ i ];

			const field = this.fields_.get( key );

			if ( field ) {

				field.set( props[ key ] );

			}

		}

	}

	/*-------------------------------
		Export
	-------------------------------*/

	public export() {

		this.serialize( {
			mode: "export"
		} );

	}

	/*-------------------------------
		Field
	-------------------------------*/

	public field<T extends SerializeFieldValue>( path: string, get: ( event: SerializeFieldSerializeEvent ) => T, set?: ( v: T ) => void, opt?: SerializableFieldOpt ) {

		this.fields_.set( path, {
			get: get,
			set: ( ( v: SerializeFieldValue ) => {

				if ( set ) set( v as T );

				this.noticeField( path );

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

	/*-------------------------------
		Set / Get Field
	-------------------------------*/

	public setField( path: string, value: SerializeFieldValue ) {

		this.deserialize( { [ path ]: value } );

	}

	public getField<T extends SerializeFieldValue>( path: string, event?: SerializeFieldSerializeEvent ) {

		const field = this.fields_.get( path );

		if ( field ) {

			event = event || { mode: "view" };

			return field.get( event ) as T;

		}

	}

	public getFieldOpt( path: string ) {

		const field = this.fields_.get( path );

		if ( field ) {

			return field.opt;

		}

	}

	/*-------------------------------
		Notice
	-------------------------------*/

	protected noticeField( path: string ) {

		this.emit( "fields/update/" + path );
		this.emit( "fields/update", [[ path ]] );

	}

}
