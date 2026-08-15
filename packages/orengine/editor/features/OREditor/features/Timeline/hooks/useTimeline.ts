import { useContext } from "react";

import { TimelineContext } from "../contexts/TimelineContext";

export const useTimeline = () => {

	const context = useContext( TimelineContext );
	if ( context === null ) {

		throw new Error( "useTimeline must be used within a TimelineProvider" );

	}

	return context;

};
