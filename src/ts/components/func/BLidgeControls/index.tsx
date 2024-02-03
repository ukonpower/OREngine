import { useContext, useState } from 'react';

import { PropertyBlock } from '../../ui/Property/PropertyBlock';
import { Value } from '../../ui/Property/Value';

import style from './index.module.scss';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const BLidgeControls = () => {

	const { reflesh } = useContext( EditorContext );

	const { blidge } = useContext( EditorContext );

	const [ url, setUrl ] = useState<string>( "ws://localhost:3100" );

	if ( ! blidge ) return;

	const connection = blidge.connection;
	const connected = blidge.connection !== undefined;

	return <div className={style.blidge}>
		<PropertyBlock label="Connection">
			<Value label='Enabled' value={connected} onChange={( value ) => {

				if ( value == true ) {

					blidge.connect( url );

				} else {

					blidge.disconnect();

				}

				reflesh && reflesh();

			}} />
			<Value label='URL' value={url} onChange={( e ) => {

				setUrl( e as string );

			}} />
			<PropertyBlock label="Status">
				<Value label='Connected' value={String( connected )} readOnly/>
				<Value label='URL' value={connection ? connection.url : "-"} readOnly/>
			</PropertyBlock>
		</PropertyBlock>
	</div>;

};
