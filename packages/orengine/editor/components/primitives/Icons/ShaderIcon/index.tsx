type Props = { size?: number };

export const ShaderIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4 4H14L20 10V20H4V4Z" fill="#D9D9D9" />
		<path d="M14 4V10H20" fill="#fff" opacity="0.3" />
		<path d="M8 14L10 16L8 18" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<line x1="12" y1="14" x2="16" y2="14" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
	</svg>;

};
