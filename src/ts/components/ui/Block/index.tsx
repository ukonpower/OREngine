import React, { useCallback } from "react";

import style from './index.module.scss';

type BlockProps = {
	title: React.ReactNode;
	children?: React.ReactNode;
	accordion?: boolean;
};

export const Block = ( props: BlockProps ) => {

	const [ open, setOpen ] = React.useState( ! props.accordion );

	const onClick = useCallback( () => {

		if ( ! props.accordion ) return;

		setOpen( ! open );

	}, [ open, props.accordion ] );

	return <div className={style.block} >
		{props.title && <div className={style.title} onClick={onClick} data-open={open}>{props.title}</div>}
		{ open && <div className={style.content} data-open={open}>
			{props.children}
		</div>}
	</div>;

};
