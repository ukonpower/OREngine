type Props = { size?: number; assetType?: string };

export const FolderIcon = ( { size = 24, assetType }: Props ) => {

	return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="#D9D9D9" />
		{assetType && <g opacity="0.5">
			{getInnerSymbol( assetType )}
		</g>}
	</svg>;

};

function getInnerSymbol( assetType: string ) {

	switch ( assetType ) {

		case "component":
			return <>
				<circle cx="12" cy="13" r="2" fill="#333" />
				<path d="M12 9V10.5M12 15.5V17M8 13H9.5M14.5 13H16" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />
			</>;

		case "material":
			return <circle cx="12" cy="13" r="3.5" fill="#333" />;

		case "shader":
			return <>
				<path d="M9 11.5L11 13.5L9 15.5" stroke="#333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
				<line x1="12.5" y1="11.5" x2="15.5" y2="11.5" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />
			</>;

		case "texture":
			return <>
				<rect x="8.5" y="9.5" width="7" height="7" fill="#333" />
				<rect x="8.5" y="9.5" width="3.5" height="3.5" fill="#555" />
				<rect x="12" y="13" width="3.5" height="3.5" fill="#555" />
			</>;

		default:
			return null;

	}

}
