type Props = { size?: number };

export const MeshIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 3L21 8V16L12 21L3 16V8L12 3Z" stroke="#D9D9D9" strokeWidth="1.5" strokeLinejoin="round" />
		<path d="M12 3V21M3 8L21 16M21 8L3 16" stroke="#D9D9D9" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
	</svg>;

};
