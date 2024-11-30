import * as MXP from 'maxpower';
import React from "react";

import { Block } from '../../Block';

import style from './index.module.scss';
import { SerializableFieldValue } from './SerializableFieldValue';

export const SerializableField: React.FC<{fields: MXP.SerializeFieldsAsDirectoryFolder, basePath?: string}> = ( props ) => {

	const elmArray: React.ReactNode[] = [];

	const keys = Object.keys( props.fields.childs );

	for ( let i = 0; i < keys.length; i ++ ) {

		const key = keys[ i ];
		const path = ( props.basePath ? props.basePath + "/" : "" ) + key;
		const componentKeys = "field_" + i + key;

		let elm = null;

		const field = props.fields.childs[ key ];

		const opt = field.opt as MXP.SerializableFieldOpt;

		let hidden = false;

		if ( opt ) {

			if ( typeof opt.hidden === "function" ) {

				hidden = opt.hidden();

			} else {

				hidden = opt.hidden || false;

			}

		}

		if ( hidden ) continue;

		if ( field.type === "value" ) {

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
