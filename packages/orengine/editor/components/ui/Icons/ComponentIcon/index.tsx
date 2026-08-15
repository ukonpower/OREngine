type Props = { size?: number };

export const ComponentIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="12" cy="12" r="4" fill="#D9D9D9" />
		<path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" />
	</svg>;

};
