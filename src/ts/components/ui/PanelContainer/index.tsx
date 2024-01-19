import { useEffect, useState } from 'react';

import { Panel } from '../Panel';

import style from './index.module.scss';

type PanelElmType = React.ReactElement<any, typeof Panel>;

export type PanelProps = {
	children?: PanelElmType | PanelElmType[]
}

export const PanelContainer = ( props: PanelProps ) => {

	const [ selected, setSelected ] = useState<number>( 0 );

	let childs = props.children || [];
	childs = Array.isArray( childs ) ? childs : [ childs ];

	return <div className={style.panel}>
		<div className={style.header}>
			{childs.map( ( child, index ) => {

				return <div key={index} className={style.header_item} onClick={() => setSelected( index )} data-active={index == selected}>
					<p>
						{child.props.title}
					</p>
				</div>;

			} )}
		</div>
		{childs[ selected ]}
	</div>;

};
