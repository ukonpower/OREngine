import style from './index.module.scss';

export type SegmentedControlOption<T extends string> = {
	value: T;
	label: React.ReactNode;
	title?: string;
};

type SegmentedControlProps<T extends string> = {
	options: SegmentedControlOption<T>[];
	value: T;
	onChange: ( value: T ) => void;
};

// 選択肢を横に並べて1つを選ぶボタン列（iOS の Segmented Control と同じ）。
// トグル1つと違い、選べるものと今どれかが文字で見える。親いっぱいに伸び、選択肢で幅を等分する
export const SegmentedControl = <T extends string>( props: SegmentedControlProps<T> ) => {

	return <div className={style.segmentedControl}>
		{props.options.map( ( option ) => (
			<button
				key={option.value}
				type="button"
				className={style.item}
				data-active={option.value === props.value}
				title={option.title}
				onClick={() => props.onChange( option.value )}
			>
				{option.label}
			</button>
		) )}
	</div>;

};
