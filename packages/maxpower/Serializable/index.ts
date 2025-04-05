import * as GLP from 'glpower';
import { SelectList } from 'packages/orengine/tsx/components/Input/InputSelect';
import { ValueOpt } from 'packages/orengine/tsx/components/Value';

interface SerializeFieldFormatVector {
	type: "vector",
}


interface SerializeFieldFormatSelect {
	type: "select",
	list: SelectList | ( () => SelectList )
}

interface SerializeFieldFormatArray {
	type: "array",
	labels?: ( value: SerializeFieldValue, index: number ) => string
}

export type SerializableFieldFormat = SerializeFieldFormatVector | SerializeFieldFormatSelect | SerializeFieldFormatArray

export type SerializableFieldOpt<> = {
	isFolder?: boolean,
	noExport?: boolean,
	hidden?: boolean | ( ( value: SerializeFieldValue ) => boolean ),
	format?: SerializableFieldFormat,
} & ValueOpt

export type SerializeFieldPrimitive = number | string | boolean | null | undefined | ( () => void );
export type SerializeFieldObjective = SerializeFieldPrimitive | SerializeFieldObjective[] | { [key: string]: SerializeFieldObjective };
export type SerializeFieldValue = SerializeFieldObjective | { [key: string]: SerializeFieldValue };
export interface SerializeField {
	[key: string]: SerializeFieldValue
}

export interface SerializeFieldDirectoryFolder {
	type: "folder",
	childs: {[key: string]: SerializeFieldDirectory},
	opt?: SerializableFieldOpt,
}
export interface SerializeFieldDirectoryValue {
	type: "value",
	value: SerializeFieldValue,
	opt?: SerializableFieldOpt,
}

export type SerializeFieldDirectory = SerializeFieldDirectoryFolder | SerializeFieldDirectoryValue

interface SerializeFieldSerializeEvent {
	mode: "view" | "export"
}

type SerializeFieldGetter<T extends SerializeFieldValue> = ( event: SerializeFieldSerializeEvent ) => T;
type SerializeFieldSetter<T extends SerializeFieldValue> = ( value: T ) => void;
interface SerializeFieldProxy {
	get: SerializeFieldGetter<SerializeFieldValue>,
	set: SerializeFieldSetter<SerializeFieldValue>,
	opt?: SerializableFieldOpt
}


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

	public serialize( event?: SerializeFieldSerializeEvent ): SerializeField {

		event = event || { mode: "view" };

		const serialized: SerializeField = {};

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

		const toDirectory = ( serialized: SerializeField ) => {

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

	public deserialize( props: SerializeField ) {

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

	public exportEditor() {

		this.serialize( {
			mode: "export"
		} );

	}

	/*-------------------------------
		Field
	-------------------------------*/

	public field<T extends SerializeFieldValue>( path: string, getter: ( event: SerializeFieldSerializeEvent ) => T, opt?: SerializableFieldOpt ): void;

	public field<T extends SerializeFieldValue>( path: string, getter: ( event: SerializeFieldSerializeEvent ) => T, setter?: ( v: T ) => void, opt?: SerializableFieldOpt ): void;

	public field<T extends SerializeFieldValue>( path: string, getter: ( event: SerializeFieldSerializeEvent ) => T, setter_option?: ( ( v: T ) => void ) | SerializableFieldOpt, option?: SerializableFieldOpt ) {

		const setter = typeof setter_option == "function" ? setter_option : undefined;
		const opt = typeof setter_option == "object" && setter_option || option || {};

		if ( ! setter ) {

			opt.readOnly = true;
			opt.noExport = true;

		}

		const normalizedPath = path.startsWith( "/" ) ? path.slice( 1 ) : path;

		this.fields_.set( normalizedPath, {
			get: getter,
			set: ( ( v: SerializeFieldValue ) => {

				if ( setter ) setter( v as T );

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
