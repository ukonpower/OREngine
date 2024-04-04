import { useContext } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

import { Panel } from '~/ts/components/ui/Panel';
import { Value } from '~/ts/components/ui/Property/Value';

export const TimelineSetting = () => {

	const { framePlay, frameSetting } = useContext( TimelineContext );

	return <div className={style.timelineSetting}>
		<Panel>
			<Value label='current' value={Math.floor( framePlay?.current || 0 )} vertical readOnly />
			<Value label='duration' value={Math.floor( frameSetting?.duration || 0 )} vertical />
			<Value label='fps' value={Math.floor( frameSetting?.fps || 0 )} vertical />
		</Panel>
	</div>;

};
