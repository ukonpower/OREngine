
import React, { useCallback, useEffect, useRef, useState } from 'react';

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

export interface MIDIMIXLabels {
	buttons?: Record<number, string>;
	values?: Record<number, string>;
}

/*-------------------------------
	Constants
-------------------------------*/

const NATURAL_W = 800;
const NATURAL_H = 520;
const HANDLE_H = 16;

/*-------------------------------
	Helpers
-------------------------------*/

const clamp01 = ( v: number ) => Math.min( 1, Math.max( 0, v ) );

/*-------------------------------
	MIDIKnob
-------------------------------*/

const MIDIKnob: React.FC<{
	id: number; value: number; controller: MIDIMIXController; label?: string;
}> = ( { id, value, controller, label } ) => {

	const valueRef = useRef( value );
	valueRef.current = value;

	const handleChange = useCallback( ( v: number ) => {

		controller.emulateControl( 176, id, v );

	}, [ id, controller ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent ) => {

		e.preventDefault();

		const startY = e.clientY;
		const startValue = valueRef.current;

		const onMove = ( ev: PointerEvent ) => {

			const dy = startY - ev.clientY;
			const sensitivity = ev.shiftKey ? 400 : 150;
			handleChange( clamp01( startValue + dy / sensitivity ) );

		};

		const onUp = () => {

			window.removeEventListener( 'pointermove', onMove );
			window.removeEventListener( 'pointerup', onUp );

		};

		window.addEventListener( 'pointermove', onMove );
		window.addEventListener( 'pointerup', onUp );

	}, [ handleChange ] );

	const onDoubleClick = useCallback( () => handleChange( 0 ), [ handleChange ] );

	const angle = - 135 + value * 270;
	const r = 16;
	const cx = 20;
	const cy = 20;
	const arcTotal = 270;

	const polarToXY = ( deg: number ) => {

		const rad = ( deg - 90 ) * Math.PI / 180;
		return [ cx + r * Math.cos( rad ), cy + r * Math.sin( rad ) ];

	};

	const [ sx, sy ] = polarToXY( - 135 );
	const [ ex, ey ] = polarToXY( angle );
	const largeArc = ( value * arcTotal ) > 180 ? 1 : 0;

	const [ tsx, tsy ] = polarToXY( - 135 );
	const [ tex, tey ] = polarToXY( 135 );

	return (
		<div className={style.knob}>
			<div
				className={style.knob_body}
				onPointerDown={onPointerDown}
				onDoubleClick={onDoubleClick}
				title={value.toFixed( 2 )}
			>
				<svg className={style.knob_svg} viewBox="0 0 40 40">
					<path
						d={`M ${tsx} ${tsy} A ${r} ${r} 0 1 0 ${tex} ${tey}`}
						className={style.knob_track}
					/>
					{value > 0.001 && <path
						d={`M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`}
						className={style.knob_fill}
					/>}
					<circle cx={cx} cy={cy} r={11} className={style.knob_center} />
					<line
						x1={cx}
						y1={cy}
						x2={cx + Math.sin( angle * Math.PI / 180 ) * 10}
						y2={cy - Math.cos( angle * Math.PI / 180 ) * 10}
						className={style.knob_indicator}
					/>
				</svg>
			</div>
			<span className={style.elementLabel} style={label ? undefined : { visibility: 'hidden' }}>{label || '\u00A0'}</span>
		</div>
	);

};

/*-------------------------------
	MIDIFader
-------------------------------*/

const MIDIFader: React.FC<{
	id: number; value: number; controller: MIDIMIXController; label?: string; isMaster?: boolean;
}> = ( { id, value, controller, label, isMaster } ) => {

	const trackRef = useRef<HTMLDivElement>( null );

	const handleChange = useCallback( ( v: number ) => {

		controller.emulateControl( 176, id, v );

	}, [ id, controller ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent ) => {

		e.preventDefault();

		const track = trackRef.current;
		if ( ! track ) return;

		const update = ( clientY: number ) => {

			const rect = track.getBoundingClientRect();
			const usable = rect.height - HANDLE_H;
			const rel = 1 - ( clientY - rect.top - HANDLE_H / 2 ) / usable;
			handleChange( clamp01( rel ) );

		};

		update( e.clientY );

		const onMove = ( ev: PointerEvent ) => update( ev.clientY );

		const onUp = () => {

			window.removeEventListener( 'pointermove', onMove );
			window.removeEventListener( 'pointerup', onUp );

		};

		window.addEventListener( 'pointermove', onMove );
		window.addEventListener( 'pointerup', onUp );

	}, [ handleChange ] );

	const onDoubleClick = useCallback( () => handleChange( 0 ), [ handleChange ] );

	// ハンドル位置: value=0 → bottom:0, value=1 → bottom:100%-handleH
	const handleBottom = `calc(${value * 100}% - ${value * HANDLE_H}px)`;

	return (
		<div className={`${style.fader} ${isMaster ? style.fader__master : ''}`}>
			<div
				ref={trackRef}
				className={style.fader_track}
				onPointerDown={onPointerDown}
				onDoubleClick={onDoubleClick}
				title={value.toFixed( 2 )}
			>
				<div className={style.fader_fill} style={{ height: `${value * 100}%` }} />
				<div className={style.fader_handle} style={{ bottom: handleBottom }} />
			</div>
			<span className={style.elementLabel} style={label ? undefined : { visibility: 'hidden' }}>{label || '\u00A0'}</span>
		</div>
	);

};

/*-------------------------------
	MIDIButton
-------------------------------*/

const MIDIButton: React.FC<{
	id: number; value: number; controller: MIDIMIXController; label?: string;
}> = ( { id, value, controller, label } ) => {

	const active = value > 0.5;

	const onClick = useCallback( () => {

		controller.emulateControl( 144, id, active ? 0 : 1 );

	}, [ id, active, controller ] );

	return (
		<div className={style.btn}>
			<button
				type="button"
				onClick={onClick}
				className={`${style.btn_body} ${active ? style.btn_body__on : ''}`}
			/>
			<span className={style.elementLabel} style={label ? undefined : { visibility: 'hidden' }}>{label || '\u00A0'}</span>
		</div>
	);

};

/*-------------------------------
	Channel data
-------------------------------*/

const CHANNELS: { lineIndex: number; valueIds: [number, number, number, number]; btn1Id: number; btn2Id: number; btn2LabelId: number }[] = [
	{ lineIndex: 0, valueIds: [ 16, 17, 18, 19 ], btn1Id: 1, btn2Id: 2, btn2LabelId: 3 },
	{ lineIndex: 1, valueIds: [ 20, 21, 22, 23 ], btn1Id: 4, btn2Id: 5, btn2LabelId: 5 },
	{ lineIndex: 2, valueIds: [ 24, 25, 26, 27 ], btn1Id: 7, btn2Id: 8, btn2LabelId: 8 },
	{ lineIndex: 3, valueIds: [ 28, 29, 30, 31 ], btn1Id: 10, btn2Id: 11, btn2LabelId: 11 },
	{ lineIndex: 4, valueIds: [ 46, 47, 48, 49 ], btn1Id: 13, btn2Id: 14, btn2LabelId: 14 },
	{ lineIndex: 5, valueIds: [ 50, 51, 52, 53 ], btn1Id: 16, btn2Id: 17, btn2LabelId: 17 },
	{ lineIndex: 6, valueIds: [ 54, 55, 56, 57 ], btn1Id: 19, btn2Id: 20, btn2LabelId: 20 },
	{ lineIndex: 7, valueIds: [ 58, 59, 60, 61 ], btn1Id: 22, btn2Id: 23, btn2LabelId: 23 },
];

/*-------------------------------
	MIDIMIXEmu
-------------------------------*/

export const MIDIMIXEmu: React.FC<{controller: MIDIMIXController, labels?: MIDIMIXLabels}> = ( { controller, labels } ) => {

	const [ _state, setState ] = useState( 0 );
	const [ scale, setScale ] = useState( 1 );
	const [ offset, setOffset ] = useState( { x: 0, y: 0 } );
	const containerRef = useRef<HTMLDivElement>( null );

	// コンテナサイズ監視 → object-fit: contain 的スケーリング
	useEffect( () => {

		const el = containerRef.current;
		if ( ! el ) return;

		const observer = new ResizeObserver( ( [ entry ] ) => {

			const { width, height } = entry.contentRect;
			const sx = width / NATURAL_W;
			const sy = height / NATURAL_H;
			const s = Math.min( sx, sy );
			setScale( s );
			setOffset( {
				x: ( width - NATURAL_W * s ) / 2,
				y: ( height - NATURAL_H * s ) / 2,
			} );

		} );

		observer.observe( el );
		return () => observer.disconnect();

	}, [] );

	useEffect( () => {

		const onChangeValue = () => {

			setState( state => state + 1 );

		};

		controller.on( "value", onChangeValue );
		controller.on( "btn", onChangeValue );

		return () => {

			controller.off( "value", onChangeValue );
			controller.off( "btn", onChangeValue );

		};

	}, [ controller ] );

	const onReset = useCallback( () => {

		const valueIds = [ 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62 ];

		for ( const id of valueIds ) {

			controller.emulateControl( 176, id, 0 );

		}

		const btnIds = [ 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 27 ];

		for ( const id of btnIds ) {

			const line = controller.getLine( Math.floor( ( id - 1 ) / 3 ) );
			const btn = ( id + 2 ) % 3 === 0 ? 1 : 2;
			const isOn = id >= 25
				? ( id === 25 ? controller.side.btn1 : id === 26 ? controller.side.btn2 : controller.side.btn3 ) > 0.5
				: ( btn === 1 ? line.btn1 : line.btn2 ) > 0.5;

			if ( isOn ) {

				controller.emulateControl( 144, id, 1 );

			}

		}

	}, [ controller ] );

	const btnLabel = ( id: number ) => labels?.buttons?.[ id ];
	const valLabel = ( id: number ) => labels?.values?.[ id ];

	return <div ref={containerRef} className={style.container}>
		<div
			className={style.inner}
			style={{ width: NATURAL_W, height: NATURAL_H, transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
		>
			<div className={style.header}>
				<span className={style.title}>MIDI MIX</span>
				<button className={style.resetBtn} onClick={onReset}>RESET</button>
			</div>
			<div className={style.grid}>
				{CHANNELS.map( ( ch ) => {

					const line = controller.getLine( ch.lineIndex );

					return <div key={ch.lineIndex} className={style.channel}>
						<div className={style.channel_num}>{ch.lineIndex + 1}</div>
						<div className={style.channel_knobs}>
							<MIDIKnob id={ch.valueIds[ 0 ]} value={line.values.x} controller={controller} label={valLabel( ch.valueIds[ 0 ] )}/>
							<MIDIKnob id={ch.valueIds[ 1 ]} value={line.values.y} controller={controller} label={valLabel( ch.valueIds[ 1 ] )}/>
							<MIDIKnob id={ch.valueIds[ 2 ]} value={line.values.z} controller={controller} label={valLabel( ch.valueIds[ 2 ] )}/>
						</div>
						<div className={style.channel_buttons}>
							<MIDIButton id={ch.btn1Id} value={line.btn1} controller={controller} label={btnLabel( ch.btn1Id )}/>
							<MIDIButton id={ch.btn2Id} value={line.btn2} controller={controller} label={btnLabel( ch.btn2LabelId )}/>
						</div>
						<MIDIFader id={ch.valueIds[ 3 ]} value={line.values.w} controller={controller} label={valLabel( ch.valueIds[ 3 ] )}/>
					</div>;

				} )}
				<div className={`${style.channel} ${style.channel__master}`}>
					<div className={style.channel_num}>M</div>
					<div className={style.channel_buttons}>
						<MIDIButton id={25} value={controller.side.btn1} controller={controller} label={btnLabel( 25 )}/>
						<MIDIButton id={26} value={controller.side.btn2} controller={controller} label={btnLabel( 26 )}/>
						<MIDIButton id={27} value={controller.side.btn3} controller={controller} label={btnLabel( 27 )}/>
					</div>
					<MIDIFader id={62} value={controller.side.master} controller={controller} label={valLabel( 62 )} isMaster/>
				</div>
			</div>
		</div>
	</div>;

};
