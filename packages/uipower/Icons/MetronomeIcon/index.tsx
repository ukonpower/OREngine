type Props = { size?: number };

// メトロノームの台形の本体と、斜めに振れた振り子
export const MetronomeIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M9.5 3H14.5L19 21H5L9.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
		<path d="M7 17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M12 17L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;

};
