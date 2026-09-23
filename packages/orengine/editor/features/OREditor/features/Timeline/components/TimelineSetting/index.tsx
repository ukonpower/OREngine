import { useCallback } from 'react';

import * as MXP from 'maxpower';
import { Button, Label, Panel, PauseIcon, PlayIcon } from 'uipower';

import { Value } from '../../../SerializableField/components/Value';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';
import { useTimeline } from '../../hooks/useTimeline';

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

	const onClickPlay = useCallback( () => {

		if ( glEditor ) {

			glEditor.togglePlay();

		}

	}, [ glEditor ] );

	return <div className={style.timelineSetting}>
		<Panel>
			<div className={style.play}>
				<Button onClick={onClickPlay}>
					{framePlay.playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
				</Button>
			</div>
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
