
import React, { useEffect } from 'react';

import { InputBoolean } from '../../Input/InputCheckBox';
import { InputNumber } from '../../Input/InputNumber';

import style from './index.module.scss';

import { MIDIMIX } from '~/ts/Resources/Components/_Samples/MIDI/MIDIMIX';

const MIDIButton: React.FC<{id: number, value: number}> = ( props ) => {

	return <InputBoolean checked={props.value > 0.5} onChange={( v ) => {

		MIDIMIX.emulateControl( 144, props.id, v ? 1.0 : 0.0 );

	}}/>;

};

const MIDIValue: React.FC<{value: number, id: number}> = ( props ) => {

	return <InputNumber step={0.05} value={props.value} onChange={( v ) => {

		MIDIMIX.emulateControl( 176, props.id, Math.min( 1.0, Math.max( 0.0, v ) ) );

	}}/>;

};

export const MIDIMIXEmu = () => {

	const [ state, setState ] = React.useState( 0 );

	useEffect( () => {

		const onChangeValue = () => {

			setState( state=>state + 1 );

		};

		MIDIMIX.on( "value", onChangeValue );
		MIDIMIX.on( "btn", onChangeValue );

		return () => {

			MIDIMIX.off( "value", onChangeValue );
			MIDIMIX.off( "btn", onChangeValue );

		};

	}, [] );


	return <div className={style.container}>
		<div className={style.row}>
			<MIDIValue id={16} value={MIDIMIX.getLine( 0 ).values.x}/>
			<MIDIValue id={17} value={MIDIMIX.getLine( 0 ).values.y}/>
			<MIDIValue id={18} value={MIDIMIX.getLine( 0 ).values.z}/>
			<MIDIButton id={1} value={MIDIMIX.getLine( 0 ).btn1}/>
			<MIDIButton id={2} value={MIDIMIX.getLine( 0 ).btn2}/>
			<MIDIValue id={19} value={MIDIMIX.getLine( 0 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={20} value={MIDIMIX.getLine( 1 ).values.x}/>
			<MIDIValue id={21} value={MIDIMIX.getLine( 1 ).values.y}/>
			<MIDIValue id={22} value={MIDIMIX.getLine( 1 ).values.z}/>
			<MIDIButton id={4} value={MIDIMIX.getLine( 1 ).btn1}/>
			<MIDIButton id={5} value={MIDIMIX.getLine( 1 ).btn2}/>
			<MIDIValue id={23} value={MIDIMIX.getLine( 1 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={24} value={MIDIMIX.getLine( 2 ).values.x}/>
			<MIDIValue id={25} value={MIDIMIX.getLine( 2 ).values.y}/>
			<MIDIValue id={26} value={MIDIMIX.getLine( 2 ).values.z}/>
			<MIDIButton id={7} value={MIDIMIX.getLine( 2 ).btn1}/>
			<MIDIButton id={8} value={MIDIMIX.getLine( 2 ).btn2}/>
			<MIDIValue id={27} value={MIDIMIX.getLine( 2 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={28} value={MIDIMIX.getLine( 3 ).values.x}/>
			<MIDIValue id={29} value={MIDIMIX.getLine( 3 ).values.y}/>
			<MIDIValue id={30} value={MIDIMIX.getLine( 3 ).values.z}/>
			<MIDIButton id={10} value={MIDIMIX.getLine( 3 ).btn1}/>
			<MIDIButton id={11} value={MIDIMIX.getLine( 3 ).btn2}/>
			<MIDIValue id={31} value={MIDIMIX.getLine( 3 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={46} value={MIDIMIX.getLine( 4 ).values.x}/>
			<MIDIValue id={47} value={MIDIMIX.getLine( 4 ).values.y}/>
			<MIDIValue id={48} value={MIDIMIX.getLine( 4 ).values.z}/>
			<MIDIButton id={13} value={MIDIMIX.getLine( 4 ).btn1}/>
			<MIDIButton id={14} value={MIDIMIX.getLine( 4 ).btn2}/>
			<MIDIValue id={49} value={MIDIMIX.getLine( 4 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={50} value={MIDIMIX.getLine( 5 ).values.x}/>
			<MIDIValue id={51} value={MIDIMIX.getLine( 5 ).values.y}/>
			<MIDIValue id={52} value={MIDIMIX.getLine( 5 ).values.z}/>
			<MIDIButton id={16} value={MIDIMIX.getLine( 5 ).btn1}/>
			<MIDIButton id={17} value={MIDIMIX.getLine( 5 ).btn2}/>
			<MIDIValue id={53} value={MIDIMIX.getLine( 5 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={54} value={MIDIMIX.getLine( 6 ).values.x}/>
			<MIDIValue id={55} value={MIDIMIX.getLine( 6 ).values.y}/>
			<MIDIValue id={56} value={MIDIMIX.getLine( 6 ).values.z}/>
			<MIDIButton id={19} value={MIDIMIX.getLine( 6 ).btn1}/>
			<MIDIButton id={20} value={MIDIMIX.getLine( 6 ).btn2}/>
			<MIDIValue id={57} value={MIDIMIX.getLine( 6 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={58} value={MIDIMIX.getLine( 7 ).values.x}/>
			<MIDIValue id={59} value={MIDIMIX.getLine( 7 ).values.y}/>
			<MIDIValue id={60} value={MIDIMIX.getLine( 7 ).values.z}/>
			<MIDIButton id={22} value={MIDIMIX.getLine( 7 ).btn1}/>
			<MIDIButton id={23} value={MIDIMIX.getLine( 7 ).btn2}/>
			<MIDIValue id={61} value={MIDIMIX.getLine( 7 ).values.w}/>
		</div>
		<div className={style.row}>
			<MIDIButton id={25} value={MIDIMIX.side.btn1} />
			<MIDIButton id={26} value={MIDIMIX.side.btn2} />
			<MIDIButton id={27} value={MIDIMIX.side.btn3} />
			<MIDIValue id={62} value={MIDIMIX.side.master} />
		</div>
	</div>;

};
