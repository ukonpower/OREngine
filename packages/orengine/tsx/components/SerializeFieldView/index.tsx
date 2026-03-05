import * as MXP from 'maxpower';
import { SerializeFieldViewContext } from './Context/SerializeFieldViewContext';
import { useSerializeFieldViewContext } from './Hooks/useSerializeFieldViewContext';

import { SerializeFieldViewDir } from './SerializeFieldViewDir';

type SerializeFieldViewProps = {
        target: MXP.Serializable
        filter?: string
};

export const SerializeFieldView: React.FC<SerializeFieldViewProps > = ( props ) => {

	const context = useSerializeFieldViewContext( props );

	let fields = context.target.serializeToDirectory();

	if ( props.filter ) {

		const child = fields.childs[ props.filter ];

		if ( child && child.type === "folder" ) {

			fields = child;

		}

	}

	return <SerializeFieldViewContext.Provider value={context} >
		<SerializeFieldViewDir fields={fields} basePath={props.filter}/>
	</SerializeFieldViewContext.Provider>;

};
