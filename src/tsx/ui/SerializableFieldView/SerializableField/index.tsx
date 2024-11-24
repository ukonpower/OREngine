import * as MXP from 'maxpower';
import React from "react"
import { Block } from '../../Block';

import style from './index.module.scss'
import { SerializableFieldValue } from './SerializableFieldValue';

export const SerializableField: React.FC<{fields: MXP.SerializedGroupingFields, basePath?: string}> = (props) => {

	const elmArray: React.ReactNode[] = []
	
	let keys = Object.keys(props.fields)

	for (let i = 0; i < keys.length; i++) {

		const key = keys[i]
		const path = (props.basePath ? props.basePath + "/" : "") + key 
		const componentKeys = "field_" + i + key

		const field = props.fields[key]
		let elm = null

		if( "value" in field ) {

			if( field.opt ) {

				if( (field.opt as MXP.SerializableFieldOpt).hidden === true ) continue
				
			}
			
			elm = <SerializableFieldValue path={path} />
				
		} else {

			elm = <SerializableField fields={field} basePath={path} />
			
		}

		if( elm ) {

			elmArray.push( <Block key={componentKeys} label={key}>{elm}</Block> )
			
		}

	}

	return <div className={style.container}>{elmArray}</div>
	
}