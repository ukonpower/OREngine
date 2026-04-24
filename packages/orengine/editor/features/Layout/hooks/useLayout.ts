import { useEffect, useState } from "react";

const SPWIDTH = 900;

export const useLayout = () => {

	const [ isSP, setIsSP ] = useState<boolean>( false );

	useEffect( () => {

		let prevX: number | null = null;

		const onResize = () => {

			const currentX = window.innerWidth;

			if ( prevX === null || ( currentX - SPWIDTH ) * ( prevX - SPWIDTH ) <= 0 ) {

				setIsSP( currentX <= SPWIDTH );

			}

			prevX = currentX;

		};

		onResize();

		window.addEventListener( 'resize', onResize );

		return () => {

			window.removeEventListener( 'resize', onResize );

		};

	}, [] );

	return {
		isPC: ! isSP,
		isSP
	};

};
