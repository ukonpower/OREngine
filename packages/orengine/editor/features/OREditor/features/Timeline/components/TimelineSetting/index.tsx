import { useCallback } from 'react';

import * as MXP from 'maxpower';
import { Button, GraphIcon, PauseIcon, PlayIcon } from 'uipower';

import { Value } from '../../../SerializableField/components/Value';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';
import { useKeyEditor } from '../../features/KeyEditor/hooks/useKeyEditor';
import { useTimeline } from '../../hooks/useTimeline';

import style from './index.module.scss';


// タイムラインの上の1行。再生・停止と、今の時刻・長さ・fps・ループ、キー表示とカーブ表示の切り替えを横に並べる
export const TimelineSetting = () => {

	const { framePlay, glEditor } = useTimeline();
	const { mode, setMode } = useKeyEditor();

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

	// 普段はキー表示で、ボタンがオンの間だけカーブ表示にする（After Effects の Graph Editor ボタンと同じ）
	const onClickGraph = useCallback( () => {

		if ( mode == "curves" ) {

			setMode( "keys" );
			return;

		}

		setMode( "curves" );

	}, [ mode, setMode ] );

	return <div className={style.timelineSetting}>
		<Button square onClick={onClickPlay}>
			{framePlay.playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
		</Button>
		<div className={style.field}>
			<span className={style.name}>current</span>
			<div className={style.input}>
				<Value value={Math.floor( framePlay?.current || 0 )} readOnly />
			</div>
		</div>
		<div className={style.field}>
			<span className={style.name}>duration</span>
			<div className={style.input}>
				<Value value={duration} onChange={( v ) => onChangeTimeline( "timeline/duration", v )}/>
			</div>
		</div>
		<div className={style.field}>
			<span className={style.name}>fps</span>
			<div className={style.input}>
				<Value value={fps} onChange={( v ) => onChangeTimeline( "timeline/fps", v )} />
			</div>
		</div>
		<div className={style.field}>
			<span className={style.name}>loop</span>
			<Value value={loop || false} onChange={( v ) => onChange( v, setLoop )}/>
		</div>
		<Button square active={mode == "curves"} title="Graph Editor" onClick={onClickGraph}>
			<GraphIcon size={14} />
		</Button>
	</div>;

};
