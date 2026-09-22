type Props = { size?: number; selectable?: boolean };

export const CursorIcon = ( { size = 24, selectable = true }: Props ) => {

	if ( selectable ) {

		return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M5 3L19 12L12.5 13.5L9.5 20L5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
		</svg>;

	}

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5 3L19 12L12.5 13.5L9.5 20L5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
		<line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;

};
