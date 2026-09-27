type Props = { size?: number };

// 左下から右上へのなめらかな曲線。キーの表示をカーブ（グラフエディタ）に切り替えるボタンの印
export const GraphIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 20C11 20 13 4 21 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
	</svg>;

};
