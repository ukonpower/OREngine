import { useEffect, useRef } from 'react';

import style from './index.module.scss';

import { renderer } from '~/ts/gl/GLGlobals';

export const Timer = () => {

	const elmRef = useRef<HTMLDivElement>( null );

	useEffect( () => {

		renderer.on( "timer", ( list: {name: string, duration: number}[] ) => {

			if ( elmRef.current === null ) return;

			const elm = elmRef.current;

			elm.innerHTML = "";

			let str = "";

			const sorted = list.sort( ( a, b ) => a.name < b.name ? 1 : - 1 );

			for ( let i = 0; i < sorted.length; i ++ ) {

				const v = sorted[ i ];

				str += `${( v.duration.toPrecision( 3 ) )}:\t\t${v.name} <br/>`;

			}

			elm.innerHTML = str;

		} );

	}, [ ] );

	return <div className={style.timer} ref={elmRef}>
	</div>;

};
