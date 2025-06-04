
import { useMouseMenu } from "../../hooks/useMouseMenu";

import { MouseMenuContext } from "./Context/MouseMenuContext";
import { MouseMenuItemContext } from "./Context/MouseMenuItemContext";
import style from './index.module.scss';


export const MouseMenu = () => {

	const { itemList, containerRef, closeAll } = useMouseMenu();

	return (
		<div className={style.mouseMenu} ref={containerRef}>
			{itemList && itemList.length > 0 && <div className={style.hide} onClick={() => {

				if ( ! closeAll ) return;

				closeAll();

			}} />}
			{
				itemList && itemList.map( ( item, i ) => {

					const pos = item.pos;

					return <MouseMenuItemContext.Provider value={item} key={item.id}>
						<div className={style.menuItem} style={ { left: 0, top: 0, transform: `translate(${pos.x}px, ${pos.y}px)` }}>
							<div className={style.menuItem_inner}>
								<div className={style.menuItem_inner_inner} data-direction={item.direction}>
									{item.elm}
								</div>
							</div>
						</div>
					</MouseMenuItemContext.Provider>;

				} )
			}

		</div>
	);

};
