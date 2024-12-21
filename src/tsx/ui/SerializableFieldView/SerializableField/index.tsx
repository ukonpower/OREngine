import * as MXP from 'maxpower';
import React from "react";

import { Block } from '../../Block';

import style from './index.module.scss';
import { SerializableFieldValue } from './SerializableFieldValue';

export const SerializableField: React.FC<{fields: MXP.SerializeFieldsAsDirectoryFolder, basePath?: string}> = ( props ) => {

	const elmArray: React.ReactNode[] = [];

	const fieldKeys = Object.keys( props.fields.childs );

	for ( let i = 0; i < fieldKeys.length; i ++ ) {

		const fieldKey = fieldKeys[ i ];
		const field = props.fields.childs[ fieldKey ];
		const { opt } = field;

		let hidden = false;

		if ( opt ) {

			if ( typeof opt.hidden === "function" ) {

				hidden = opt.hidden( field.type == "value" ? field.value : null );

			} else {

				hidden = opt.hidden || false;

			}

		}

		if ( hidden ) continue;

		const componentKey = "field" + fieldKey;
		const path = ( props.basePath ? props.basePath + "/" : "" ) + fieldKey;

		let elm = null;

		if ( field.type === "value" ) {

			elm = <SerializableFieldValue key={componentKey} path={path} field={field}/>;

		} else {

			elm = <div className={style.block} key={componentKey}>
				<Block key={componentKey} accordion label={fieldKey} >
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
