import { useContext } from "react";

import style from './index.module.scss';
import { MouseMenuContext } from "./useMouseMenu";


export const MouseMenu = () => {

	const { itemList, containerRef, closeAll } = useContext( MouseMenuContext );

	return (
		<div className={style.mouseMenu} ref={containerRef}>
			{itemList && itemList.length > 0 && <div className={style.hide} onClick={() => {

				closeAll && closeAll();

			}} />}
			{
				itemList && itemList.map( ( content, i ) => {

					const pos = content.pos;

					return <div key={content.id} className={style.menuItem} style={ { left: 0, top: 0, transform: `translate(${pos.x}px, ${pos.y}px)` }}>
						<div className={style.menuItem_inner}>
							<div className={style.menuItem_inner_inner} data-direction={content.direction}>
								{content.elm}
							</div>
						</div>
					</div>;

				} )
			}

		</div>
	);

};
