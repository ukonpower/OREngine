import * as MXP from 'maxpower';
import React from "react";

import { Block } from '../../Block';

import style from './index.module.scss';
import { SerializableFieldValue } from './SerializableFieldValue';

export const SerializableField: React.FC<{fields: MXP.SerializedGroupingFields, basePath?: string}> = ( props ) => {

	const elmArray: React.ReactNode[] = [];

	const keys = Object.keys( props.fields );

	for ( let i = 0; i < keys.length; i ++ ) {

		const key = keys[ i ];
		const path = ( props.basePath ? props.basePath + "/" : "" ) + key;
		const componentKeys = "field_" + i + key;

		const field = props.fields[ key ];
		let elm = null;

		if ( "value" in field ) {

			if ( field.opt ) {

				if ( ( field.opt as MXP.SerializableFieldOpt ).hidden === true ) continue;

			}

			elm = <div key={componentKeys}>
				<SerializableFieldValue path={path} />
			</div>;

		} else {

			elm = <div className={style.block} key={componentKeys}>
				<Block accordion label={key}>
					<SerializableField fields={field} basePath={path} />
				</Block>
			</div>;

		}

		if ( elm ) {

			elmArray.push( elm );

		}

	}

	return <div className={style.container}>{elmArray}</div>;

};
