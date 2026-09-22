type Props = { size?: number };

export const TextureIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="3" width="18" height="18" rx="2" fill="#D9D9D9" />
		<rect x="3" y="3" width="9" height="9" fill="#fff" opacity="0.3" />
		<rect x="12" y="12" width="9" height="9" fill="#fff" opacity="0.3" />
	</svg>;

};
