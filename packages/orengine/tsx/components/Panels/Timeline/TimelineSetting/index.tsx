import * as MXP from 'maxpower';
import { useCallback } from 'react';

import { useSerializableField } from '../../../../hooks/useSerializableProps';
import { Label } from '../../../Label';
import { Panel } from '../../../Panel';
import { Value } from '../../../Value';
import { useTimeline } from '../../../../hooks/useTimeline';

import style from './index.module.scss';


export const TimelineSetting = () => {

  const { framePlay, glEditor } = useTimeline();

	const onChange = useCallback( ( value: MXP.SerializeFieldValue, setter: ( ( value: any ) => void ) | undefined ) => {

		if ( setter ) {

			setter( value );

		}

	}, [] );

	// loop
	const [ loop, setLoop ] = useSerializableField<boolean>( glEditor, "frameLoop/enabled" );
	const [ duration, setDuration ] = useSerializableField<number>( glEditor?.engine, "timeline/duration" );
	const [ fps, setFps ] = useSerializableField<number>( glEditor?.engine, "timeline/fps" );

	return <div className={style.timelineSetting}>
		<Panel>
			<Label title='current'>
				 <Value value={Math.floor( framePlay?.current || 0 )} readOnly />
				 </Label>
			<Label title='duration'>
				 <Value value={duration} onChange={( v ) => onChange( v, setDuration )}/>
			</Label>
			<Label title='fps'>
				 <Value value={fps} onChange={( v ) => onChange( v, setFps )} />
			</Label>
			<Label title='loop'>
				 <Value value={loop || false} onChange={( v ) => onChange( v, setLoop )}/>
			</Label>
		</Panel>
	</div>;

};
