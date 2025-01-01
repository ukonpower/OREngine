import { useEffect, useRef } from 'react';

import style from './index.module.scss';

type TimerDuration = {
	name: string,
	duration: number
}

export const Timer = () => {

	const elmRef = useRef<HTMLDivElement>( null );

	useEffect( () => {

		let timerDurationList: TimerDuration[] = [];

		const onUpdateTimer = ( list: TimerDuration[] ) => {

			timerDurationList = list;

		};


		// renderer.on( "timer", onUpdateTimer );

		// const updateTimer = window.setInterval( () => {

		// 	if ( elmRef.current === null ) return;

		// 	const elm = elmRef.current;
		// 	elm.innerHTML = "";

		// 	let str = "";

		// 	const total = timerDurationList.reduce( ( a, b ) => a + b.duration, 0 );
		// 	str += `Total: ${( total.toPrecision( 3 ) + "000" ).slice( 0, 4 )} ms<br/>`;

		// 	const sorted = timerDurationList.sort( ( a, b ) => a.name < b.name ? 1 : - 1 );

		// 	for ( let i = 0; i < sorted.length; i ++ ) {

		// 		const v = sorted[ i ];
		// 		const d = ( v.duration.toPrecision( 3 ) + "000" ).slice( 0, 5 );
		// 		const color = `rgb(200 ${( 1.0 - v.duration ) * 200} ${( 1.0 - v.duration ) * 200})`;

		// 		str += `<span style="color: ${color}">${( d )}</span> : \t\t${v.name}<br/>`;

		// 	}

		// 	elm.innerHTML = str;

		// }, 500 );

		return () => {

			// renderer.off( "timer", onUpdateTimer );

			// window.clearInterval( updateTimer );

		};

	}, [] );

	return <div className={style.container}>
		<div className={style.inner} ref={elmRef}></div>
	</div>;

};
