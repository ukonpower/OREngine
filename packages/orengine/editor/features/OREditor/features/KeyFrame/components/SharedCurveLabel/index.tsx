import { type SharedCurve } from 'orengine/editor';
import { LinkIcon } from 'uipower';

import style from './index.module.scss';

// 行が共有しているカーブの名前（無ければ ID）と、そのカーブを指しているリンクの数
export const SharedCurveLabel = ( props: { curves: SharedCurve[] } ) => {

	const elms = [];

	for ( const curve of props.curves ) {

		elms.push( <span key={curve.curveId} className={style.curve}>
			<LinkIcon size={10} />{curve.label} ({curve.uses})
		</span> );

	}

	return <span className={style.shared}>{elms}</span>;

};
