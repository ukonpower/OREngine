import * as MXP from 'maxpower';

import { useWatchSerializable } from "../useWatchSerializable";

export const useSerializableProps = <T, >( exportable: MXP.Serializable | undefined, path: string ): [T|undefined, ( ( value: T ) => void ) | undefined] => {

	const setter = ( value: any ) => {

		exportable?.setPropsValue( path, value );

	};

	const { props } = useWatchSerializable( exportable, [ path ] );

	const value = props && props[ path ];

	return [
		value,
		setter,
	];

};
