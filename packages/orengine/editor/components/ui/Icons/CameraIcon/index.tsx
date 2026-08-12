type Props = { size?: number };

export const CameraIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="2" y="6" width="14" height="12" rx="2" fill="#D9D9D9" />
		<path d="M16 10L22 7V17L16 14V10Z" fill="#D9D9D9" />
	</svg>;

};
