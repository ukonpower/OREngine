

import style from './index.module.scss';

export type PanelProps = {
	noPadding?: boolean;
	children?: React.ReactNode;
}

export const Panel = ( props: PanelProps ) => {

	return <div className={style.panel}>
		<div className={style.content} style={{ padding: props.noPadding ? "0 0" : undefined }}>
			{props.children}
		</div>
	</div>;

};
