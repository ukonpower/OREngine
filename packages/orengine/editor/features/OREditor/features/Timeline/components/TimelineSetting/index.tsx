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
	const [ duration ] = useSerializableField<number>( glEditor?.engine, "timeline/duration" );
	const [ fps ] = useSerializableField<number>( glEditor?.engine, "timeline/fps" );

	// duration / fps はシーンファイルに入る値なので、EditorAPI を通して undo に載せる（シーン CLI の set-setting と揃える）
	const onChangeTimeline = useCallback( ( path: string, value: MXP.SerializeFieldValue ) => {

		if ( ! glEditor ) return;

		glEditor.api.setField( glEditor.engine, path, value );

	}, [ glEditor ] );

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
				 <Value value={duration} onChange={( v ) => onChangeTimeline( "timeline/duration", v )}/>
			</Label>
			<Label title='fps'>
				 <Value value={fps} onChange={( v ) => onChangeTimeline( "timeline/fps", v )} />
			</Label>
			<Label title='loop'>
				 <Value value={loop || false} onChange={( v ) => onChange( v, setLoop )}/>
			</Label>
		</Panel>
	</div>;

};
