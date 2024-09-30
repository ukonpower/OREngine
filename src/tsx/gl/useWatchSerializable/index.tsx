import { Serializable, SerializedProps } from "maxpower";
import { useState, useMemo, useEffect } from "react";

export const useWatchSerializable = ( exportable: Serializable | undefined, deps?: ( string | undefined )[] ) => {

	const [ props, setProps ] = useState<SerializedProps>( );

	const _deps = deps ? [ ...deps ] : [];

	const depsMemo = useMemo( () => {

		return _deps;

	}, _deps ); // eslint-disable-line 

	useEffect( () => {

		if ( exportable === undefined ) return;

		setProps( exportable.serialize() );

		const onUpdate = ( _: any, updateKeys: string[] ) => {

			let found = false || depsMemo.length == 0;

			for ( let i = 0; i < depsMemo.length; i ++ ) {

				if ( updateKeys.find( ( k ) => k == depsMemo[ i ] ) ) {

					found = true;
					break;

				}

			}

			if ( found ) {

				setProps( exportable.serialize() );

			}

		};

		exportable.on( "update/props", onUpdate );

		return () => {

			exportable.off( "update/props", onUpdate );

		};

	}, [ exportable, depsMemo ] );

	return {
		props
	};

};
