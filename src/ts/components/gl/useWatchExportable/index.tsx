import { Exportable, ExportablePropsSerialized } from "maxpower";
import { useEffect, useMemo, useState } from "react";

export const useWatchExportable = ( exportable: Exportable | undefined, deps?: ( string | undefined )[] ) => {

	const [ currentValue, setCurrentValue ] = useState<ExportablePropsSerialized>( );

	const _deps = deps ? [ ...deps ] : [];

	const depsMemo = useMemo( () => {

		return _deps;

	}, _deps ); // eslint-disable-line 

	useEffect( () => {

		if ( exportable === undefined ) return;

		setCurrentValue( exportable.getPropsSerialized() );

		const onUpdate = ( _: any, updateKeys: string[] ) => {

			let found = false || depsMemo.length == 0;

			for ( let i = 0; i < depsMemo.length; i ++ ) {

				if ( updateKeys.find( ( k ) => k == depsMemo[ i ] ) ) {

					found = true;
					break;

				}

			}

			if ( found ) {

				setCurrentValue( exportable.getPropsSerialized() );

			}

		};

		exportable.on( "update/props", onUpdate );

		return () => {

			exportable.off( "update/props", onUpdate );

		};

	}, [ exportable, depsMemo ] );

	return {
		currentValue
	};

};
