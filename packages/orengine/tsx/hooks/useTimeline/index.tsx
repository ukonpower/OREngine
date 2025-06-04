import { useContext } from "react";

import { TimelineContext } from "../../components/Panels/Timeline/Context/TimelineContext";

export const useTimeline = () => {
        const context = useContext( TimelineContext );
        if ( context === null ) {
                throw new Error( "useTimeline must be used within a TimelineProvider" );
        }
        return context;
};
