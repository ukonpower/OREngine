import { useState } from 'react';

import style from './index.module.scss';

type TabProps = {
	title: string;
	children?: React.ReactNode;
};

const Tab = ( props: TabProps ) => {

	return <>
		{props.children}
	</>;

};

type PanelContainerChild = React.ReactElement<TabProps> | false | null | undefined;

type PanelContainerProps = {
	children?: PanelContainerChild | PanelContainerChild[];
};

export const PanelContainer = ( props: PanelContainerProps ) => {

	const [ selected, setSelected ] = useState<number>( 0 );

	const rawChilds = props.children || [];
	const childs = ( Array.isArray( rawChilds ) ? rawChilds : [ rawChilds ] ).filter( ( c ): c is React.ReactElement<TabProps> => !! c );

	return <div className={style.panelContainer}>
		<div className={style.header}>
			{childs.map( ( child, index ) => {

				return <div key={index} className={style.header_item} onClick={() => setSelected( index )} data-active={index == selected}>
					<p>
						{child.props.title}
					</p>
				</div>;

			} )}
		</div>
		<div className={style.content}>
			{childs[ selected ]}
		</div>
	</div>;

};

PanelContainer.Tab = Tab;
