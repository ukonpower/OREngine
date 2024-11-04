import { Resource } from "../Resource";

export type SerializablePropsOpt = {
	readOnly?: boolean,
	precision?: number,
	selectList?: string[]
	step?: number,
	noExport?: boolean
}


export type SerializeFieldValue = string | number | boolean | null | object;
type SerializeFieldTypeOpt = SerializablePropsOpt;
type SerializeFieldGetter<T extends SerializeFieldValue> = () => T;
type SerializeFieldSetter<T extends SerializeFieldValue> = ( value: T ) => void;
type SerializeFieldProxy = {get: SerializeFieldGetter<SerializeFieldValue>, set?: SerializeFieldSetter<SerializeFieldValue>, opt?: SerializeFieldTypeOpt}

export type SerializedFields = {[key: string]: SerializeFieldValue}

export class Serializable extends Resource {

	private fields: Map<string, SerializeFieldProxy> = new Map();
	public initiator: string;

	constructor() {

		super();

		this.initiator = 'script';
	}

	public deserialize( props: SerializedFields ) {

		this.fields.forEach( ( field, path ) => {

			const value = props[ path ];

			if ( value && field.set ) {

				field.set( value );

			}

		} );

	}

	public serialize(): SerializedFields {

		const res: SerializedFields = {};

		this.fields.forEach( ( field, k ) => {

			const value = field.get();

			if ( value ) {

				res[ k ] = value;

			}

		} );

		return res;

	}

	public field<T extends SerializeFieldValue>( path: string, get: () => T, set?: ( v: T ) => void, opt?: SerializeFieldTypeOpt ) {

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

	public noticePropsChanged( path: string ) {

		this.emit( "update/props/" + path );

	}

}
