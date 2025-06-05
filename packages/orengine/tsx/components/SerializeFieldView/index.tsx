import * as MXP from 'maxpower';
import { SerializeFieldViewContext } from './Context/SerializeFieldViewContext';
import { useSerializeFieldViewContext } from './Hooks/useSerializeFieldViewContext';

import { SerializeFieldViewDir } from './SerializeFieldViewDir';

type SerializeFieldViewProps = {
        target: MXP.Serializable
};

export const SerializeFieldView: React.FC<SerializeFieldViewProps > = ( props ) => {

	const context = useSerializeFieldViewContext( props );

	const fields = context.target.serializeToDirectory();

	return <SerializeFieldViewContext.Provider value={context} >
		<SerializeFieldViewDir fields={fields}/>
	</SerializeFieldViewContext.Provider>;

};
