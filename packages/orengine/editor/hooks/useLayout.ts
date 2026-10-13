import { useEffect, useState } from "react";

const SPWIDTH = 900;

export const useLayout = () => {

	// effect は描画の後に走るので、初期値も幅から決めないと SP の画面で一度 PC のレイアウトが出てから切り替わる
	const [ isSP, setIsSP ] = useState<boolean>( () => window.innerWidth <= SPWIDTH );

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
