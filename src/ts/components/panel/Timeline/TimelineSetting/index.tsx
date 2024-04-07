import { useCallback, useContext } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

import { Panel } from '~/ts/components/ui/Panel';
import { Value, ValueType } from '~/ts/components/ui/Property/Value';

export const TimelineSetting = () => {

	const { framePlay, frameSetting, glEditor } = useContext( TimelineContext );

	const onChane = useCallback( ( value: ValueType, label: string ) => {

		if ( glEditor ) {

			glEditor.scene.setPropValue( 'timeline/' + label, value );

		}

	}, [ glEditor ] );

	return <div className={style.timelineSetting}>
		<Panel>
			<Value label='current' value={Math.floor( framePlay?.current || 0 )} vertical readOnly />
			<Value label='duration' precision={0} value={( frameSetting?.duration || 0 )} vertical onChange={onChane}/>
			<Value label='fps' precision={0} value={( frameSetting?.fps || 0 )} vertical onChange={onChane} />
		</Panel>
	</div>;

};
