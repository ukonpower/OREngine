type Props = { size?: number; filled?: boolean };

// キーフレームの菱形。filled は塗り（今の時刻にキーがある）、塗り無しは輪郭だけ（アニメーションしている）
export const KeyframeIcon = ( { size = 24, filled = true }: Props ) => {

	let fill = "none";

	if ( filled ) fill = "currentColor";

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 3L21 12L12 21L3 12Z" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
	</svg>;

};
