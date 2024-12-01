import { Serializable, SerializedFields } from "maxpower";
import { useState, useMemo, useEffect } from "react";

export const useWatchSerializable = ( serializable: Serializable | undefined, deps?: ( string | undefined )[] ) => {

	const [ field, setField ] = useState<SerializedFields>( );

	const _deps = deps ? [ ...deps ] : [];

	const depsMemo = useMemo( () => {

		return _deps;

	}, _deps ); // eslint-disable-line 

	useEffect( () => {

		if ( serializable === undefined ) return;

		setField( serializable.serialize() );

		const onUpdate = ( updateKeys: string[] ) => {

			let found = depsMemo.length == 0;

			for ( let i = 0; i < depsMemo.length; i ++ ) {

				if ( updateKeys.find( ( k ) => k == depsMemo[ i ] ) ) {

					found = true;
					break;

				}

			}

			if ( found ) {

				setField( serializable.serialize() );

			}

		};

		serializable.on( "fields/update", onUpdate );

		return () => {

			serializable.off( "fields/update", onUpdate );

		};

	}, [ serializable, depsMemo ] );

	return {
		props: field
	};

};
