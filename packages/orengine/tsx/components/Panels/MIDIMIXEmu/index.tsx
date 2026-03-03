
import React, { useEffect } from 'react';

import { InputBoolean } from '../../Input/InputCheckBox';
import { InputNumber } from '../../Input/InputNumber';

import style from './index.module.scss';

export interface MIDIMIXLine {
	values: { x: number; y: number; z: number; w: number };
	btn1: number;
	btn2: number;
}

export interface MIDIMIXSide {
	btn1: number;
	btn2: number;
	btn3: number;
	master: number;
}

export interface MIDIMIXController {
	getLine( index: number ): MIDIMIXLine;
	side: MIDIMIXSide;
	emulateControl( type: number, id: number, value: number ): void;
	on( event: string, callback: ( ...args: any[] ) => void ): void;
	off( event: string, callback: ( ...args: any[] ) => void ): void;
}

const MIDIButton: React.FC<{id: number, value: number, controller: MIDIMIXController}> = ( props ) => {

	return <InputBoolean checked={props.value > 0.5} onChange={( v ) => {

		props.controller.emulateControl( 144, props.id, v ? 1.0 : 0.0 );

	}}/>;

};

const MIDIValue: React.FC<{value: number, id: number, controller: MIDIMIXController}> = ( props ) => {

	return <InputNumber step={0.05} value={props.value} onChange={( v ) => {

		props.controller.emulateControl( 176, props.id, Math.min( 1.0, Math.max( 0.0, v ) ) );

	}}/>;

};

export const MIDIMIXEmu: React.FC<{controller: MIDIMIXController}> = ( { controller } ) => {

	const [ state, setState ] = React.useState( 0 );

	useEffect( () => {

		const onChangeValue = () => {

			setState( state=>state + 1 );

		};

		controller.on( "value", onChangeValue );
		controller.on( "btn", onChangeValue );

		return () => {

			controller.off( "value", onChangeValue );
			controller.off( "btn", onChangeValue );

		};

	}, [ controller ] );


	return <div className={style.container}>
		<div className={style.row}>
			<MIDIValue id={16} value={controller.getLine( 0 ).values.x} controller={controller}/>
			<MIDIValue id={17} value={controller.getLine( 0 ).values.y} controller={controller}/>
			<MIDIValue id={18} value={controller.getLine( 0 ).values.z} controller={controller}/>
			<MIDIButton id={1} value={controller.getLine( 0 ).btn1} controller={controller}/>
			<MIDIButton id={2} value={controller.getLine( 0 ).btn2} controller={controller}/>
			<MIDIValue id={19} value={controller.getLine( 0 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={20} value={controller.getLine( 1 ).values.x} controller={controller}/>
			<MIDIValue id={21} value={controller.getLine( 1 ).values.y} controller={controller}/>
			<MIDIValue id={22} value={controller.getLine( 1 ).values.z} controller={controller}/>
			<MIDIButton id={4} value={controller.getLine( 1 ).btn1} controller={controller}/>
			<MIDIButton id={5} value={controller.getLine( 1 ).btn2} controller={controller}/>
			<MIDIValue id={23} value={controller.getLine( 1 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={24} value={controller.getLine( 2 ).values.x} controller={controller}/>
			<MIDIValue id={25} value={controller.getLine( 2 ).values.y} controller={controller}/>
			<MIDIValue id={26} value={controller.getLine( 2 ).values.z} controller={controller}/>
			<MIDIButton id={7} value={controller.getLine( 2 ).btn1} controller={controller}/>
			<MIDIButton id={8} value={controller.getLine( 2 ).btn2} controller={controller}/>
			<MIDIValue id={27} value={controller.getLine( 2 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={28} value={controller.getLine( 3 ).values.x} controller={controller}/>
			<MIDIValue id={29} value={controller.getLine( 3 ).values.y} controller={controller}/>
			<MIDIValue id={30} value={controller.getLine( 3 ).values.z} controller={controller}/>
			<MIDIButton id={10} value={controller.getLine( 3 ).btn1} controller={controller}/>
			<MIDIButton id={11} value={controller.getLine( 3 ).btn2} controller={controller}/>
			<MIDIValue id={31} value={controller.getLine( 3 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={46} value={controller.getLine( 4 ).values.x} controller={controller}/>
			<MIDIValue id={47} value={controller.getLine( 4 ).values.y} controller={controller}/>
			<MIDIValue id={48} value={controller.getLine( 4 ).values.z} controller={controller}/>
			<MIDIButton id={13} value={controller.getLine( 4 ).btn1} controller={controller}/>
			<MIDIButton id={14} value={controller.getLine( 4 ).btn2} controller={controller}/>
			<MIDIValue id={49} value={controller.getLine( 4 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={50} value={controller.getLine( 5 ).values.x} controller={controller}/>
			<MIDIValue id={51} value={controller.getLine( 5 ).values.y} controller={controller}/>
			<MIDIValue id={52} value={controller.getLine( 5 ).values.z} controller={controller}/>
			<MIDIButton id={16} value={controller.getLine( 5 ).btn1} controller={controller}/>
			<MIDIButton id={17} value={controller.getLine( 5 ).btn2} controller={controller}/>
			<MIDIValue id={53} value={controller.getLine( 5 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={54} value={controller.getLine( 6 ).values.x} controller={controller}/>
			<MIDIValue id={55} value={controller.getLine( 6 ).values.y} controller={controller}/>
			<MIDIValue id={56} value={controller.getLine( 6 ).values.z} controller={controller}/>
			<MIDIButton id={19} value={controller.getLine( 6 ).btn1} controller={controller}/>
			<MIDIButton id={20} value={controller.getLine( 6 ).btn2} controller={controller}/>
			<MIDIValue id={57} value={controller.getLine( 6 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIValue id={58} value={controller.getLine( 7 ).values.x} controller={controller}/>
			<MIDIValue id={59} value={controller.getLine( 7 ).values.y} controller={controller}/>
			<MIDIValue id={60} value={controller.getLine( 7 ).values.z} controller={controller}/>
			<MIDIButton id={22} value={controller.getLine( 7 ).btn1} controller={controller}/>
			<MIDIButton id={23} value={controller.getLine( 7 ).btn2} controller={controller}/>
			<MIDIValue id={61} value={controller.getLine( 7 ).values.w} controller={controller}/>
		</div>
		<div className={style.row}>
			<MIDIButton id={25} value={controller.side.btn1} controller={controller}/>
			<MIDIButton id={26} value={controller.side.btn2} controller={controller}/>
			<MIDIButton id={27} value={controller.side.btn3} controller={controller}/>
			<MIDIValue id={62} value={controller.side.master} controller={controller}/>
		</div>
	</div>;

};
