type Props = { size?: number };

export const MaterialIcon = ( { size = 24 }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="12" cy="12" r="9" fill="#D9D9D9" />
		<ellipse cx="12" cy="10" rx="5" ry="4" fill="#fff" opacity="0.3" />
	</svg>;

};
