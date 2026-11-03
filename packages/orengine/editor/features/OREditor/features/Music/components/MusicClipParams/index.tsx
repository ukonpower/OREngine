import { InputNumber } from 'uipower';

import style from './index.module.scss';

type MusicClipParamsProps = {
	trackName: string;
	// 楽器の index.ts の params。名前の無い数値は出さない
	names: string[];
	values: number[];
	onChange: ( index: number, value: number ) => void;
	onDragStart: () => void;
	onDragEnd: () => void;
};

// 開いている帯の数値（Song.clipParam）。楽器が名前を付けた数値だけを並べる1行
export const MusicClipParams = ( props: MusicClipParamsProps ) => {

	const items = [];

	for ( let i = 0; i < props.names.length; i ++ ) {

		let value = 0;

		if ( props.values[ i ] ) value = props.values[ i ];

		items.push( <label key={i} className={style.item}>
			<span className={style.label}>{props.names[ i ]}</span>
			<div className={style.number}>
				<InputNumber value={value} step={0.01} onChange={( v ) => props.onChange( i, v )} onDragStart={props.onDragStart} onDragEnd={props.onDragEnd} />
			</div>
		</label> );

	}

	return <div className={style.params}>
		<span className={style.track}>{props.trackName}</span>
		{items}
	</div>;

};
