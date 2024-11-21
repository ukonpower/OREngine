import * as MXP from 'maxpower';
import { createContext } from 'react';
import style from './index.module.scss'

const SerializableFieldViewContext = createContext<ReturnType<typeof useSerializableFieldViewProvider> | undefined>(undefined)

type SerializableFieldViewProps = {
	target: MXP.Serializable
}

const useSerializableFieldViewProvider = (props: SerializableFieldViewProps) => {

	return {
		target: props.target
	}
	
}

export const SerializableFieldView: React.FC<SerializableFieldViewProps > = (props) => {

	const context = useSerializableFieldViewProvider(props)
	
	return <SerializableFieldViewContext.Provider value={context} >
		<div className={style.container}></div>
	</SerializableFieldViewContext.Provider>

}
