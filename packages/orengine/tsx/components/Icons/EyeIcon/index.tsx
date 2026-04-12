type Props = { size?: number; visible?: boolean };

export const EyeIcon = ( { size = 24, visible = true }: Props ) => {

	if ( visible ) {

		return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			<circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.5"/>
		</svg>;

	}

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.89 1 12.5A17.89 17.89 0 0 1 5.06 7.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.11 23 11.5A17.89 17.89 0 0 1 19.74 15.74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;

};
