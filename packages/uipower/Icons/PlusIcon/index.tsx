type Props = { size?: number };

// 足す操作の印。文字の「+」はフォントによって上下にずれるので SVG で描く
export const PlusIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
	</svg>;

};
