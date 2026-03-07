
import { MaterialResource } from 'packages/orengine/ts/Engine/Resources/MaterialResource';

import { SerializeFieldView } from '../../../SerializeFieldView';

type MaterialDetailProps = {
	resource: MaterialResource;
};

export const MaterialDetail = ( { resource }: MaterialDetailProps ) => {

	return <SerializeFieldView target={resource} />;

};
