
import { useCallback, useContext } from 'react';
import { TimelineContext } from '../hooks/useTimeline';
import { useSerializableProps } from '~/tsx/gl/useSerializableProps';
import { Panel } from '~/tsx/ui/Panel';
import { ValueType, Value } from '~/tsx/ui/Value';

import style from './index.module.scss';

export const TimelineSetting = () => {

	const { framePlay, glEditor } = useContext( TimelineContext );

	const onChange = useCallback( ( value: ValueType, setter: ( ( value: any ) => void ) | undefined ) => {

		if ( setter ) {

			setter( value );

		}

	}, [] );

	// loop
	const [ loop, setLoop ] = useSerializableProps<boolean>( glEditor, "frameLoop/enabled" );
	const [ duration, setDuration ] = useSerializableProps<number>( glEditor?.scene, "timeline/duration" );
	const [ fps, setFps ] = useSerializableProps<number>( glEditor?.scene, "timeline/fps" );

	return <div className={style.timelineSetting}>
		<Panel>
			<Value label='current' value={Math.floor( framePlay?.current || 0 )} vertical readOnly />
			<Value label='duration' precision={0} value={duration} vertical onChange={( v ) => onChange( v, setDuration )}/>
			<Value label='fps' precision={0} value={fps} vertical onChange={( v ) => onChange( v, setFps )} />
			<Value label='loop' value={loop || false} labelAutoWidth onChange={( v ) => onChange( v, setLoop )}/>
		</Panel>
	</div>;

};
