import * as MXP from 'maxpower';

import { useWatchSerializable } from "../useWatchSerializable";

export const useSerializableField = <T extends MXP.SerializeFieldValue>( serializable: MXP.Serializable | undefined, path: string ): [T|undefined, ( ( value: T ) => void )] => {

	const setter = ( value: any ) => {

		serializable?.setField( path, value );

	};

	const { fields: props } = useWatchSerializable( serializable, [ path ] );

	const value = props && props[ path ] as T;

	return [
		value,
		setter,
	];

};
